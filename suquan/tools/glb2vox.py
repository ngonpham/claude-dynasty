#!/usr/bin/env python3
"""Rigged GLB (Higgsfield / Meshy image-to-3D, A-pose, humanoid skin) → a voxel body for the engine's def kits.

    python3 -I suquan/tools/glb2vox.py model.glb out.js [--name ID] [--v 0.0125] [--colors 128] [--fine out-hi.js]

The engine's officers are voxel parts riding the shared rig (src/hero/rig.js: hips, spine, chest, neck, head, upper /
fore arms, hands, thighs, shins, feet), every joint at rest axis-aligned with the root (+x left, +y up, +z forward),
limbs hanging straight down. A Meshy mesh stands in an A-pose on its own skeleton, so the converter:
  1. reads the GLB by hand (JSON + BIN chunks; positions, uv, JOINTS_0 / WEIGHTS_0, the skin's inverse binds, the base
     colour texture — PNG / JPEG through Pillow);
  2. re-poses the skin into the engine's rest pose (linear blend skinning): each arm / leg chain is turned so its bone
     points straight down, the rest stays put;
  3. scales the figure to the engine's height and maps every Meshy bone onto an engine joint (BONES below), then lays
     each vertex group into its joint's local frame, stretching limbs along the bone so the elbows, wrists, knees and
     ankles land on the rig's (DIM in rig.js) — hands still meet the weapon grips, feet still meet the IK targets;
  4. voxelises the surface (dense barycentric samples, colour from the texture at the sample's uv) at FV = 0.0125 m per
     joint (--fine also writes a second record at FV / 2 for the player's own officer in battle, kit.model(rig, { hero: true })) — a vertex with ≥ 30 % weight on a bone also lands in that joint, so bent elbows / knees overlap instead of
     gaping — quantises the colours to a small palette and writes runs.
The output module exports VOX = { pal: [0xRRGGBB…], parts: { joint: 'base64 runs' }, head: '…' } for suquan/src/chars/
voxbody.js, which turns it back into def-kit boxes. Hands are not taken from the mesh (open A-pose hands): the kits keep
their own closed grips. Needs numpy + Pillow."""
import base64, json, struct, sys, os
import numpy as np
from PIL import Image
import io

FV = 0.0125
VSIZE = FV           # the voxel size being written (main: --v / --fine)
NCOL = 128
# engine rest skeleton (pose units = metres before the kit scale; src/hero/rig.js createRig + DIM)
DIM = dict(thigh=0.44, shin=0.44, upper=0.29, fore=0.27, spine=0.12, chest=0.2, neck=0.24, headUp=0.04,
           shoulderX=0.235, shoulderY=0.2, hipX=0.11, hipY=-0.05)
HIPS_Y = 0.9
REST = {}
REST['hips'] = np.array([0, HIPS_Y, 0.0])
REST['spine'] = REST['hips'] + [0, 0.06, 0]
REST['chest'] = REST['spine'] + [0, DIM['spine'] + 0.08, 0]
REST['neck'] = REST['chest'] + [0, DIM['neck'], 0]
REST['head'] = REST['neck'] + [0, DIM['headUp'], 0]
for s, sx in (('R', -1), ('L', 1)):
    REST['upperArm' + s] = REST['chest'] + [sx * DIM['shoulderX'], DIM['shoulderY'], -0.01]
    REST['foreArm' + s] = REST['upperArm' + s] + [0, -DIM['upper'], 0]
    REST['hand' + s] = REST['foreArm' + s] + [0, -DIM['fore'], 0]
    REST['thigh' + s] = REST['hips'] + [sx * DIM['hipX'], DIM['hipY'], 0]
    REST['shin' + s] = REST['thigh' + s] + [0, -DIM['thigh'], 0]
    REST['foot' + s] = REST['shin' + s] + [0, -DIM['shin'], 0]
HEAD_TOP = 1.70        # the engine officers' crown (pose units): ≈ 1.84 m at the default HERO_SCALE 1.08

# Meshy / Mixamo-style bone names (lower-cased, prefixes stripped) → engine joint. Matched by suffix keywords.
def engine_joint(name):
    n = name.lower().replace('mixamorig:', '').replace('mixamorig', '').replace('_', '').replace(' ', '')
    side = 'L' if ('left' in n or n.endswith('l') and n[-2:] in ('.l',)) else 'R' if 'right' in n else ''
    if not side and (n.startswith('l') and n[1:2].isupper()): side = 'L'
    core = n.replace('left', '').replace('right', '')
    if 'head' in core and 'top' not in core and 'end' not in core: return 'head'
    if 'headtop' in core or 'headend' in core or core in ('eye', 'jaw'): return 'head'
    if 'neck' in core: return 'neck'
    if 'toe' in core or 'foot' in core: return 'foot' + side if side else None
    if 'upleg' in core or 'thigh' in core: return 'thigh' + side if side else None
    if core.endswith('leg') or 'calf' in core or 'shin' in core or 'knee' in core: return 'shin' + side if side else None
    if 'forearm' in core or 'lowerarm' in core: return 'foreArm' + side if side else None
    if 'hand' in core or 'thumb' in core or 'index' in core or 'middle' in core or 'ring' in core or 'pinky' in core or 'finger' in core:
        return 'hand' + side if side else None
    if core.endswith('arm') or 'upperarm' in core: return 'upperArm' + side if side else None
    if 'shoulder' in core or 'clavicle' in core: return 'chest'
    if 'spine2' in core or 'spine02' in core or 'chest' in core or 'spine1' in core or 'spine01' in core: return 'chest'
    if 'spine' in core: return 'spine'
    if 'hip' in core or 'pelvis' in core or 'root' in core: return 'hips'
    return None


# ---------------------------------------------------------------- GLB
def read_glb(path):
    data = open(path, 'rb').read()
    magic, ver, length = struct.unpack_from('<III', data, 0)
    assert magic == 0x46546C67, 'not a GLB'
    off, js, bin_ = 12, None, None
    while off < length:
        clen, ctype = struct.unpack_from('<II', data, off)
        chunk = data[off + 8: off + 8 + clen]
        if ctype == 0x4E4F534A: js = json.loads(chunk)
        elif ctype == 0x004E4942: bin_ = chunk
        off += 8 + clen
    return js, bin_


CT = {5120: np.int8, 5121: np.uint8, 5122: np.int16, 5123: np.uint16, 5125: np.uint32, 5126: np.float32}
NC = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}


def accessor(js, bin_, i):
    a = js['accessors'][i]
    bv = js['bufferViews'][a['bufferView']]
    dt, nc = CT[a['componentType']], NC[a['type']]
    start = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    stride = bv.get('byteStride', 0)
    isz = np.dtype(dt).itemsize * nc
    if stride and stride != isz:
        rows = [np.frombuffer(bin_, dt, nc, start + k * stride) for k in range(a['count'])]
        arr = np.array(rows)
    else:
        arr = np.frombuffer(bin_, dt, a['count'] * nc, start).reshape(a['count'], nc)
    if a.get('normalized'):
        arr = arr.astype(np.float32) / np.iinfo(dt).max
    return arr.astype(np.float64) if dt == np.float32 else arr


def node_matrix(n):
    if 'matrix' in n: return np.array(n['matrix'], dtype=np.float64).reshape(4, 4).T
    t = np.array(n.get('translation', [0, 0, 0]), dtype=np.float64)
    q = n.get('rotation', [0, 0, 0, 1]); s = np.array(n.get('scale', [1, 1, 1]), dtype=np.float64)
    x, y, z, w = q
    R = np.array([[1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
                  [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
                  [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)]])
    M = np.eye(4); M[:3, :3] = R * s; M[:3, 3] = t
    return M


def world_matrices(js):
    nodes = js['nodes']; parent = {}
    for i, n in enumerate(nodes):
        for c in n.get('children', []): parent[c] = i
    W = {}
    def get(i):
        if i in W: return W[i]
        M = node_matrix(nodes[i])
        W[i] = (get(parent[i]) @ M) if i in parent else M
        return W[i]
    for i in range(len(nodes)): get(i)
    return W, parent


def texture_image(js, bin_, prim):
    mat = js['materials'][prim.get('material', 0)] if 'materials' in js else {}
    t = mat.get('pbrMetallicRoughness', {}).get('baseColorTexture')
    if not t: return None, mat.get('pbrMetallicRoughness', {}).get('baseColorFactor', [0.7, 0.7, 0.7, 1])
    img = js['images'][js['textures'][t['index']]['source']]
    bv = js['bufferViews'][img['bufferView']]
    raw = bin_[bv.get('byteOffset', 0): bv.get('byteOffset', 0) + bv['byteLength']]
    return np.asarray(Image.open(io.BytesIO(raw)).convert('RGB')), None


# ---------------------------------------------------------------- re-pose + map
def rot_between(a, b):
    a = a / np.linalg.norm(a); b = b / np.linalg.norm(b)
    v = np.cross(a, b); c = float(np.dot(a, b))
    if np.linalg.norm(v) < 1e-9: return np.eye(3)
    vx = np.array([[0, -v[2], v[1]], [v[2], 0, -v[0]], [-v[1], v[0], 0]])
    return np.eye(3) + vx + vx @ vx * (1 / (1 + c))


def convert(path, preview=None):
    js, bin_ = read_glb(path)
    W, parent = world_matrices(js)
    skin = js['skins'][0]
    joints = skin['joints']
    IB = accessor(js, bin_, skin['inverseBindMatrices']).reshape(-1, 4, 4).transpose(0, 2, 1)
    names = [js['nodes'][j].get('name', str(j)) for j in joints]
    eng = [engine_joint(n) for n in names]
    # bind-pose joint positions (world): inverse of the inverse bind
    bindW = np.array([np.linalg.inv(m) for m in IB])
    jpos = bindW[:, :3, 3]
    # spine chains are named either way up (Meshy: Hips → Spine02 → Spine01 → Spine): the lowest spine bone is the
    # engine's spine, every one above it the chest
    sp = sorted([i for i, n in enumerate(names) if 'spine' in n.lower()], key=lambda i: jpos[i][1])
    for k, i in enumerate(sp): eng[i] = 'spine' if k == 0 else 'chest'

    meshes = []
    for mi, mesh_node in enumerate(n for n in js['nodes'] if 'mesh' in n):
        for prim in js['meshes'][mesh_node['mesh']]['primitives']:
            A = prim['attributes']
            P = accessor(js, bin_, A['POSITION'])
            UV = accessor(js, bin_, A['TEXCOORD_0']) if 'TEXCOORD_0' in A else None
            J = accessor(js, bin_, A['JOINTS_0']).astype(int)
            Wt = accessor(js, bin_, A['WEIGHTS_0']).astype(np.float64)
            I = accessor(js, bin_, prim['indices']).reshape(-1, 3).astype(int)
            tex, factor = texture_image(js, bin_, prim)
            meshes.append((P, UV, J, Wt, I, tex, factor))

    # --- figure frame: glTF up +Y, the figure facing +Z with its left on +X (the engine's root frame); g scales the
    # figure to the engine's crown
    allP = np.concatenate([m[0] for m in meshes])
    y0, y1 = allP[:, 1].min(), allP[:, 1].max()
    g = HEAD_TOP / (y1 - y0)

    def head_of(e):
        """Bind-pose head (world) of the bone group mapped to engine joint e: its topmost bone in the hierarchy."""
        idx = [i for i, x in enumerate(eng) if x == e]
        for i in idx:
            pj = parent.get(joints[i])
            if pj is None or pj not in joints or eng[joints.index(pj)] != e: return jpos[i]
        return jpos[idx[0]] if idx else None

    H = {e: head_of(e) for e in REST}
    for need in ('hips', 'neck', 'head', 'upperArmL', 'upperArmR', 'thighL', 'thighR'):
        assert H[need] is not None, f'no bone maps to {need}'
    # torso (hips, spine, chest, neck): one affine map, hip sockets → the rig's thighs, shoulder sockets → its shoulders
    my0 = (H['thighL'][1] + H['thighR'][1]) / 2; my1 = (H['upperArmL'][1] + H['upperArmR'][1]) / 2
    ey0 = REST['thighL'][1]; ey1 = REST['upperArmL'][1]
    kT = (ey1 - ey0) / ((my1 - my0) * g)
    kx = float(np.clip(DIM['shoulderX'] / ((H['upperArmL'][0] - H['upperArmR'][0]) / 2 * g), 0.85, 1.3))
    def torso(p):
        q = np.empty_like(p)
        q[:, 0] = (p[:, 0] - (H['hips'][0])) * g * kx
        q[:, 1] = ey0 + (p[:, 1] - my0) * g * kT
        q[:, 2] = (p[:, 2] - H['hips'][2]) * g
        return q
    head_y = torso(H['head'][None])[0, 1]
    # limb chains: each bone turned straight down about its head, laid on the rig joint, stretched to the rig's length
    R = {e: np.eye(3) for e in REST}
    LEN = {'upperArm': DIM['upper'], 'foreArm': DIM['fore'], 'thigh': DIM['thigh'], 'shin': DIM['shin']}
    stretch = {}
    down = np.array([0, -1.0, 0])
    for s in 'LR':
        for top, mid, end in (('upperArm', 'foreArm', 'hand'), ('thigh', 'shin', 'foot')):
            a, b, c = H.get(top + s), H.get(mid + s), H.get(end + s)
            if a is None or b is None or c is None: continue
            R[top + s] = rot_between(b - a, down)
            R[mid + s] = rot_between(c - b, down)
            R[end + s] = R[mid + s]
            stretch[top + s] = float(np.clip(LEN[top] / (np.linalg.norm(b - a) * g), 0.75, 1.35))
            stretch[mid + s] = float(np.clip(LEN[mid] / (np.linalg.norm(c - b) * g), 0.75, 1.35))
    # the sole: the rig's foot sits 0.0875 m under the ankle (chars/parts.js boot); squash the mesh's foot height to it
    foot_k = {s: float(np.clip(0.0875 / max(1e-3, (H['foot' + s][1] - y0) * g), 0.5, 1.2)) for s in 'LR' if H.get('foot' + s) is not None}

    def local(e, pts):
        """Sample points (bind world) of group e → that engine joint's local rest frame (pose units)."""
        if e in ('hips', 'spine', 'chest', 'neck'):
            return torso(pts) - REST[e]
        if e == 'head':
            q = (pts - H['head']) * g
            q[:, 1] += head_y - REST['head'][1]
            q[:, 0] += torso(H['head'][None])[0, 0]
            return q
        q = (pts - H[e]) @ R[e].T * g
        if e in stretch: q[:, 1] *= stretch[e]
        if e.startswith('foot'): q[:, 1] *= foot_k[e[-1]]
        return q

    vox = {}           # joint → dict[(x,y,z)] = rgb accumulators
    def put(e, pts, cols):
        d = vox.setdefault(e, {})
        q = np.floor(pts / VSIZE).astype(int)
        for (x, y, z), c in zip(map(tuple, q), cols):
            k = (x, y, z)
            if k in d: d[k][0] += c; d[k][1] += 1
            else: d[k] = [c.astype(np.float64).copy(), 1]

    rng = np.random.default_rng(1)
    for P, UV, J, Wt, I, tex, factor in meshes:
        # per-vertex membership: engine joint of each influence
        for e in REST:
            if e.startswith('hand'): continue                     # the kits keep their own closed grips
            gidx = [i for i, x in enumerate(eng) if x == e]
            if not gidx: continue
            w = np.zeros(len(P))
            for k in range(J.shape[1]): w += Wt[:, k] * np.isin(J[:, k], gidx)
            sel_v = w >= 0.3
            dom = np.zeros(len(P), bool)
            # dominant joint (summed by engine joint)
            tri = I[np.any(sel_v[I], axis=1)]
            if not len(tri): continue
            a, b, c = P[tri[:, 0]], P[tri[:, 1]], P[tri[:, 2]]
            area = 0.5 * np.linalg.norm(np.cross(b - a, c - a), axis=1) * g * g
            n = np.maximum(1, np.ceil(area / (VSIZE * VSIZE * 0.12))).astype(int)
            ti = np.repeat(np.arange(len(tri)), n)
            u = rng.random(len(ti)); v = rng.random(len(ti)); flip = u + v > 1; u[flip] = 1 - u[flip]; v[flip] = 1 - v[flip]
            pts = a[ti] + (b[ti] - a[ti]) * u[:, None] + (c[ti] - a[ti]) * v[:, None]
            if tex is not None and UV is not None:
                ua, ub, uc = UV[tri[ti, 0]], UV[tri[ti, 1]], UV[tri[ti, 2]]
                uv = ua + (ub - ua) * u[:, None] + (uc - ua) * v[:, None]
                hgt, wid = tex.shape[:2]
                px = np.clip((uv[:, 0] % 1) * wid, 0, wid - 1).astype(int); py = np.clip((uv[:, 1] % 1) * hgt, 0, hgt - 1).astype(int)
                cols = tex[py, px]
            else:
                cols = np.tile(np.array(factor[:3]) * 255, (len(pts), 1))
            put(e, local(e, pts), cols.astype(np.float64))
    # palette: median-cut over every voxel colour
    keys = [(e, k) for e in vox for k in vox[e]]
    cols = np.array([vox[e][k][0] / vox[e][k][1] for e, k in keys]).clip(0, 255).astype(np.uint8)
    im = Image.fromarray(cols.reshape(1, -1, 3), 'RGB').quantize(colors=NCOL, method=Image.Quantize.MEDIANCUT)
    pal = im.getpalette()[:NCOL * 3]
    idx = np.asarray(im).reshape(-1)
    out = {}
    for (e, k), ci in zip(keys, idx): out.setdefault(e, []).append((*k, int(ci)))
    for e in out: out[e] = solid(out[e])
    info = dict(g=round(g, 3), kT=round(kT, 3), kx=round(kx, 3), stretch={k: round(v, 2) for k, v in stretch.items()}, foot=foot_k)
    return out, [pal[i] << 16 | pal[i + 1] << 8 | pal[i + 2] for i in range(0, len(pal), 3)], info


def solid(vs):
    """Fill a part's shell: every cell the outside cannot reach (a 2D flood per horizontal slice, from its rim) becomes
    a voxel, coloured like the shell voxel nearest above it — the mesher then draws only the outer skin (no
    inner faces, no AO speckle from the hollow)."""
    a = np.array(vs)
    lo = a[:, :3].min(0) - 1; hi = a[:, :3].max(0) + 2
    dims = tuple(hi - lo)
    occ = np.zeros(dims, bool); col = np.full(dims, -1, int)
    ix = a[:, :3] - lo
    occ[ix[:, 0], ix[:, 1], ix[:, 2]] = True; col[ix[:, 0], ix[:, 1], ix[:, 2]] = a[:, 3]
    # parts are cut open where they meet their neighbours (a sleeve, a trouser leg), so flood each horizontal slice in
    # 2D: the outside of a tube is whatever its slice's rim reaches
    out_ = np.zeros(dims, bool)
    out_[0, :, :] = out_[-1, :, :] = out_[:, :, 0] = out_[:, :, -1] = True
    out_ &= ~occ
    while True:
        g = out_.copy()
        g[1:] |= out_[:-1]; g[:-1] |= out_[1:]; g[:, :, 1:] |= out_[:, :, :-1]; g[:, :, :-1] |= out_[:, :, 1:]
        g &= ~occ
        if (g == out_).all(): break
        out_ = g
    inner = ~out_ & ~occ
    # one colour for the whole interior (it is never seen): long runs, a small file
    col[inner] = int(np.bincount(a[:, 3]).argmax())
    filled = np.argwhere(occ | inner)
    return [(int(x + lo[0]), int(y + lo[1]), int(z + lo[2]), int(col[x, y, z])) for x, y, z in filled]


def runs(vs):
    """[(x, y, z, c)] → bytes of runs along x: int8 y, int8 z, int8 x0, uint8 len, uint8 c (5 bytes each)."""
    d = {}
    for x, y, z, c in vs: d[(y, z, x)] = c
    out = bytearray(); last = None
    for (y, z, x) in sorted(d):
        c = d[(y, z, x)]
        if last and last[0] == y and last[1] == z and last[2] + last[3] == x and last[4] == c and last[3] < 255:
            last[3] += 1
        else:
            if last: out += struct.pack('<bbbBB', *last)
            last = [y, z, x, 1, c]
    if last: out += struct.pack('<bbbBB', *last)
    return out


def write(dst, name, parts, pal, v):
    head = parts.pop('head', [])
    for e, vs in parts.items():
        lo = np.min(np.array(vs)[:, :3], 0); hi = np.max(np.array(vs)[:, :3], 0)
        assert lo.min() >= -128 and hi.max() < 127, f'{e} out of int8 range {lo} {hi}'
    enc = {e: base64.b64encode(runs(vs)).decode() for e, vs in parts.items()}
    with open(dst, 'w') as f:
        f.write(f'// {name}: voxel body ({v * 1000:g} mm voxels) converted from a Higgsfield (Meshy image-to-3D) rigged GLB by\n'
                f'// suquan/tools/glb2vox.py — generated data, do not edit by hand (re-run the tool). Decoder: suquan/src/chars/voxbody.js.\n')
        f.write('export const VOX = ' + json.dumps({'v': v, 'pal': pal, 'parts': enc, 'head': base64.b64encode(runs(head)).decode()}, separators=(',', ':')) + ';\n')
    return sum(len(x) for x in parts.values()) + len(head)


def main():
    global VSIZE, NCOL
    args = sys.argv[1:]
    src, dst = args[0], args[1]
    opt = lambda k, d=None: args[args.index(k) + 1] if k in args else d
    name = opt('--name', os.path.splitext(os.path.basename(dst))[0])
    NCOL = int(opt('--colors', 128))
    VSIZE = float(opt('--v', FV))
    parts, pal, info = convert(src)
    n = write(dst, name, parts, pal, VSIZE)
    print(f'{dst}: {n} voxels at {VSIZE}, {len(pal)} colours; {info}')
    if opt('--fine'):
        VSIZE = FV / 2
        parts, pal, info = convert(src)
        n = write(opt('--fine'), name, parts, pal, VSIZE)
        print(f'{opt("--fine")}: {n} voxels at {VSIZE}, {len(pal)} colours')


if __name__ == '__main__':
    main()
