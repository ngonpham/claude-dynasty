// Voxel bodies converted from Higgsfield 3D models (suquan/tools/glb2vox.py → suquan/src/chars/vox/<id>.js). A VOX
// record is { v: voxel size (m), pal: [0xRRGGBB, …], parts: { joint: base64 }, head: base64 }: per rig joint, runs along
// x of 5 bytes (int8 y, int8 z, int8 x0, uint8 length, uint8 palette index), already laid in that joint's local rest
// frame (+x the officer's left, +y up, +z forward). withVox swaps a def's hand-authored body for the converted one and
// keeps everything the mesh cannot give the rig: the closed grips (hands), the weapon, the chains (cloth / hair secondary
// motion); pauldrons are dropped (the converted shoulders already carry them). A playable officer may carry a second,
// finer record (v = FV / 2, vox/<id>.hi.js, fetched on demand by loadFine) for kit.model(rig, { hero: true }) — the
// player's own officer in battle, built under the loading card (≈ 1.1 M vertices, 1-3 s to mesh) — while the same kit as an actor (an ally, a boss) or on the menu
// stage keeps the lighter one.
import { B } from '../../../src/hero/model.js';
import { FV } from '../../../src/chars/parts.js';

const bytes = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
const s8 = (v) => (v > 127 ? v - 256 : v);

/** Runs → def boxes (B) in palette colours. */
function boxes(b64, pal) {
  const d = bytes(b64), out = [];
  for (let i = 0; i + 4 < d.length; i += 5) {
    const y = s8(d[i]), z = s8(d[i + 1]), x = s8(d[i + 2]);
    out.push(B([x, y, z], [x + d[i + 3], y + 1, z + 1], pal[d[i + 4]]));
  }
  return out;
}

/** VOX → { v, parts: { joint: boxes }, head: boxes }. */
export function decodeVox(VOX) {
  const parts = {};
  for (const j in VOX.parts) parts[j] = boxes(VOX.parts[j], VOX.pal);
  return { v: VOX.v || FV, parts, head: boxes(VOX.head, VOX.pal) };
}

/** FV-authored boxes re-gridded k times finer (a colour function samples the coarse cell it falls in). */
const finer = (list, k) => k === 1 ? list : list.map((b) => ({ ...b, a: b.a.map((q) => q * k), b: b.b.map((q) => q * k),
  c: typeof b.c === 'function' ? (x, y, z) => b.c(Math.floor(x / k), Math.floor(y / k), Math.floor(z / k)) : b.c }));

const FINE = {};
/** Fetch officer id's fine record (suquan/src/chars/vox/<id>.hi.js, ≈ 1-2 MB) before his battle is built: the flow
 *  awaits it under the loading card (suquan/src/main.js deploy), so only the officer being played is ever downloaded.
 *  Missing / failed = the standard record is used. */
export async function loadFine(id) {
  if (FINE[id] !== undefined) return;
  try { FINE[id] = (await import(`./vox/${id}.hi.js`)).VOX; } catch { FINE[id] = null; }
}

/** Officer id's fine record is fetched (and usable). */
export const fineReady = (id) => !!FINE[id];

/** A def's build(o) with the converted body: VOX parts + head (officer id's fine record for o.hero once loadFine has
 *  fetched it), the def's own hands (re-gridded to the body's voxel), weapon and chains kept. */
export function withVox(build, VOX, id) {
  const cache = new Map();
  return (o) => {
    const b = build(o), rec = (o?.hero && id && FINE[id]) || VOX;
    if (!cache.has(rec)) cache.set(rec, decodeVox(rec));
    const d = cache.get(rec), k = Math.round(FV / d.v);
    return { ...b, parts: { ...d.parts, handL: finer(b.parts.handL, k), handR: finer(b.parts.handR, k) }, head: d.head, bv: d.v, hv: d.v, pauldron: undefined };
  };
}
