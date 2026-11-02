#!/usr/bin/env python3
"""Wire a converted Higgsfield voxel body (suquan/src/chars/vox/<id>.js) into an officer / NPC model module: wraps its
def build() in voxbody.js withVox (idempotent).  python3 suquan/tools/wirevox.py <id> [<id> …]"""
import re, sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
for cid in sys.argv[1:]:
    npc = os.path.exists(os.path.join(ROOT, f'suquan/src/chars/npc/{cid}.js'))
    p = os.path.join(ROOT, f'suquan/src/chars/npc/{cid}.js' if npc else f'suquan/src/chars/{cid}/model.js')
    s = open(p, encoding='utf8').read()
    if 'withVox' in s: print(cid, 'already wired'); continue
    pre = '../' if npc else '../'
    imp = f"import {{ withVox }} from '{pre}voxbody.js';\nimport {{ VOX }} from '{pre}vox/{cid}.js';\n"
    m = re.search(r"import \{[^}]*\} from '[./]*/src/chars/parts\.js';\n", s)
    s = s[:m.end()] + imp + s[m.end():]
    note = '  // body: the Higgsfield model voxelised (../vox, suquan/tools/glb2vox.py); hands, weapon and chains stay authored here\n'
    if cid == 'dinhlien':
        s = s.replace("const m = buildDef(rig, { parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: [{ geo: bowGeo(), mat: 'metal' }] });",
                      "const m = buildDef(rig, withVox(() => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: [{ geo: bowGeo(), mat: 'metal' }] }), VOX)());   // body: the Higgsfield model voxelised (../vox)")
    else:
        s, n = re.subn(r"(\n)(  build: )(\(\) => \(\{ parts: limbs\(torso\(\)\), head: head\(\)[^\n]*?\}\)),", lambda mm: mm.group(1) + note + mm.group(2) + 'withVox(' + mm.group(3) + ', VOX),', s, count=1)
        assert n == 1, cid
    open(p, 'w', encoding='utf8').write(s)
    print(cid, 'wired', p)
