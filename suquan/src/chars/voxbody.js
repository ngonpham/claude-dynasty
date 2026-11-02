// Voxel bodies converted from Higgsfield 3D models (suquan/tools/glb2vox.py → suquan/src/chars/vox/<id>.js). A VOX
// record is { pal: [0xRRGGBB, …], parts: { joint: base64 }, head: base64 }: per rig joint, runs along x of 5 bytes
// (int8 y, int8 z, int8 x0, uint8 length, uint8 palette index) in fine voxels (chars/parts.js FV = 0.0125 m), already
// laid in that joint's local rest frame (+x the officer's left, +y up, +z forward). withVox swaps a def's hand-authored
// body for the converted one and keeps everything the mesh cannot give the rig: the closed grips (hands), the weapon,
// the chains (cloth / hair secondary motion); pauldrons are dropped (the converted shoulders already carry them).
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

/** VOX → { parts: { joint: boxes }, head: boxes } (fine voxels). */
export function decodeVox(VOX) {
  const parts = {};
  for (const j in VOX.parts) parts[j] = boxes(VOX.parts[j], VOX.pal);
  return { parts, head: boxes(VOX.head, VOX.pal) };
}

/** A def's build() with the converted body: VOX parts + head, the def's own hands, weapon and voxel sizes kept. */
export function withVox(build, VOX) {
  let cache = null;
  return () => {
    const b = build();
    cache ||= decodeVox(VOX);
    return { ...b, parts: { ...cache.parts, handL: b.parts.handL, handR: b.parts.handR }, head: cache.head, bv: FV, hv: FV, pauldron: undefined };
  };
}
