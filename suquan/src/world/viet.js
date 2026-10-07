// Vietnamese set-dressing helpers for the 十二使君 fields: Đại Việt / Giao Châu of the 10th century in the engine's voxel
// language. Every helper takes the dressing kit k (src/world/maps/index.js header: k.props box list { s, p, r?, c },
// k.glow, k.r the layout rng, k.ground / k.topAt / k.inAt) and pushes merged boxes — render only, never sim state. Like
// the kit, every random draw comes from k.r in call order, so a map's layout stays deterministic.
// Walkability is the map def's job (pieces / carve / props rects): a solid prop that stands on walkable ground needs a
// def.props footprint; scenery off the walk field (k.inAt(x, z) < -2) needs none.
//   karst(k, x, z, o)            limestone tower (Tràng An / Hoa Lư): sheer grey-white flanks, dark rain streaks, green
//                                ledges and a shaggy crown              o = { h = 30, r = 7, lean = 0 }
//   karstRange(k, list)          many towers: [[x, z, h, r], …] (skips any that would touch the walk field)
//   bamboo(k, x, z, o)           a clump of culms with leafy tops       o = { n = 9, h = 9, spread = 1.4 }
//   bambooHedge(k, pts, o)       lũy tre: a village's bamboo wall along a polyline (o = { gap = 1.6, h = 8 })
//   bambooFence(k, pts, o)       rào tre: a sharpened bamboo palisade, two rails (o = { h = 2.6 })
//   reedFlags(k, x, z, o)        bông lau: tall reeds with pale plumes — Đinh Bộ Lĩnh's childhood banners (o = { n = 14, r = 1.6 })
//   stiltHouse(k, x, z, yaw, s)  nhà sàn: piles, woven walls, a steep hipped thatch roof, a ladder
//   hut(k, x, z, yaw, s)         a ground hut: mud-and-wattle walls under thatch
//   banyan(k, x, z, s)           cây đa: buttress trunk, hanging aerial roots, broad dark canopy
//   areca(k, x, z, h)            cây cau: a slim ringed trunk and a fan of fronds
//   paddy(k, rect, o)            ruộng lúa: low earth dikes on a grid with water / rice in the cells (o = { cell = 6, rice = 0.6 })
//   boat(k, x, y, z, yaw, o)     a river boat (o = { len = 9, dragon = false, roof = true }); dragon = a war boat with a
//                                carved dragon prow, shields and oars
//   bronzeDrum(k, x, z, yaw, s, y)  trống đồng: the Đông Sơn bronze drum, star-and-ring face, frogs on the rim
//   rampart(k, pts, o)           thành đất: a rammed-earth wall along a polyline, grassy crown, timber parapet (o = { h = 5, w = 6 })
//   templeGate(k, x, z, yaw, s)  tam quan: three-bay gate, red columns, curved dark-tile roofs with upturned ridge ends
//   shrine(k, x, z, yaw, s)      miếu: a small roadside shrine with an incense urn (lit by a glow box)
//   haystack(k, x, z, s)         a round rice-straw stack on its pole
//   lotus(k, x, z, r)            lotus pads and buds on still water (sits at the water's surface height y)
import { shade } from '../../../src/core/voxel.js';

const TAU = Math.PI * 2;

// ---------------------------------------------------------------- rock
/** Limestone tower: stacked, slightly offset tiers that bulge and pinch (sheer karst walls), pale grey-white rock with
 *  dark vertical streaks, moss on the ledges, a shaggy green crown. */
export function karst(k, x, z, { h = 30, r = 7, lean = 0 } = {}) {
  const { r: R, props } = k, gy = k.topAt(x, z) - 1;
  const tiers = Math.max(4, Math.round(h / 3.2)), th = h / tiers;
  let cx = x, cz = z;
  for (let i = 0; i < tiers; i++) {
    const u = i / tiers, rad = r * (1 - 0.55 * u ** 1.4) * R.range(0.85, 1.12) * (u > 0.15 && u < 0.5 ? R.range(0.9, 1.05) : 1);
    cx += lean * th * 0.2 + R.range(-0.4, 0.4); cz += R.range(-0.4, 0.4);
    const y = gy + i * th, yaw = R.range(0, TAU);
    // two crossed slabs per tier: an irregular octagon-ish mass
    for (let q = 0; q < 2; q++) {
      const w = rad * 2 * R.range(0.8, 1), d = rad * 2 * R.range(0.7, 0.95);
      props.push({ s: [w, th + 0.4, d], p: [cx, y + th / 2, cz], r: [R.range(-0.04, 0.04), yaw + q * 0.78, R.range(-0.04, 0.04)], c: shade(0x9c978c, R.range(0.78, 1.08)) });
    }
    // rain streaks: thin dark slabs proud of the face
    for (let s = 0, N = R.int(1, 3); s < N; s++) {
      const a = R.range(0, TAU), rr = rad * 0.92;
      props.push({ s: [R.range(0.5, 1.4), th + 0.5, 0.3], p: [cx + Math.sin(a) * rr, y + th / 2, cz + Math.cos(a) * rr], r: [0, a, 0], c: shade(0x4e4c46, R.range(0.8, 1.1)) });
    }
    // a mossy ledge with a shrub or two
    if (i > 0 && R.chance(0.55)) {
      const a = R.range(0, TAU), rr = rad * 0.85;
      props.push({ s: [R.range(1.5, 3.2), 0.5, R.range(1.2, 2)], p: [cx + Math.sin(a) * rr, y + 0.2, cz + Math.cos(a) * rr], r: [0, a, 0], c: shade(0x4a6a2c, R.range(0.8, 1.1)) });
      if (R.chance(0.6)) props.push({ s: [1.2, 1.1, 1.2], p: [cx + Math.sin(a) * (rr + 0.4), y + 0.9, cz + Math.cos(a) * (rr + 0.4)], r: [0, R.range(0, 3), 0], c: shade(0x3a5a24, R.range(0.8, 1.15)) });
    }
  }
  // crown: a heap of dark green shrub blocks
  const top = gy + h, cr = r * 0.5;
  for (let q = 0, N = R.int(5, 9); q < N; q++) {
    const a = R.range(0, TAU), rr = R.range(0, cr), s = R.range(1.2, 2.6);
    props.push({ s: [s, s * R.range(0.6, 1), s], p: [cx + Math.sin(a) * rr, top + s * 0.25, cz + Math.cos(a) * rr], r: [0, R.range(0, 3), 0], c: shade(0x34522a, R.range(0.75, 1.15)) });
  }
}

/** Many towers: [[x, z, h, r], …]; any whose foot would reach the walk field is skipped (keeps the fight clear). */
export function karstRange(k, list) {
  for (const [x, z, h, r, lean = 0] of list) {
    if (k.inAt(x, z) > -(r + 2)) continue;
    karst(k, x, z, { h, r, lean });
  }
}

// ---------------------------------------------------------------- bamboo, reeds
function culm(k, x, y, z, h, tx, tz) {
  const { r: R, props } = k, col = R.chance(0.25) ? 0x8a9a3a : 0x5a7e34;
  const seg = 1.5, n = Math.ceil(h / seg);
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n, px = x + tx * h * u * u, pz = z + tz * h * u * u;
    props.push({ s: [0.13, seg - 0.06, 0.13], p: [px, y + i * seg + seg / 2, pz], r: [tz * 1.2 * u, 0, -tx * 1.2 * u], c: shade(col, R.range(0.85, 1.1)) });
    props.push({ s: [0.17, 0.07, 0.17], p: [px, y + (i + 1) * seg, pz], c: shade(0x4a5a26, 0.9) });     // node ring
  }
  // leafy top: feathery sprays
  const tx1 = x + tx * h, tz1 = z + tz * h, ty = y + h;
  for (let q = 0; q < 4; q++) {
    const a = R.range(0, TAU), d = R.range(0.3, 1.3);
    props.push({ s: [R.range(1, 1.8), 0.35, R.range(0.5, 0.9)], p: [tx1 + Math.sin(a) * d, ty - R.range(0, 1.6), tz1 + Math.cos(a) * d], r: [R.range(-0.3, 0.3), a, R.range(-0.4, 0.4)], c: shade(0x5e8a32, R.range(0.75, 1.1)) });
  }
}

export function bamboo(k, x, z, { n = 9, h = 9, spread = 1.4 } = {}) {
  const R = k.r, gy = k.topAt(x, z);
  for (let i = 0; i < n; i++) {
    const a = R.range(0, TAU), d = R.range(0, spread), px = x + Math.sin(a) * d, pz = z + Math.cos(a) * d;
    const lean = 0.05 + d / spread * 0.12;
    culm(k, px, gy - 0.1, pz, h * R.range(0.7, 1.15), Math.sin(a) * lean, Math.cos(a) * lean);
  }
  k.props.push({ s: [spread * 1.6, 0.4, spread * 1.6], p: [x, gy + 0.1, z], r: [0, R.range(0, 3), 0], c: shade(0x5a4a2c, 0.9) });   // root mound + litter
}

/** Lũy tre: clumps every `gap` m along a polyline (a village wall of bamboo). */
export function bambooHedge(k, pts, { gap = 1.6, h = 8 } = {}) {
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1], L = Math.hypot(bx - ax, bz - az);
    for (let d = 0; d < L; d += gap) {
      const t = d / L;
      bamboo(k, ax + (bx - ax) * t + k.r.range(-0.4, 0.4), az + (bz - az) * t + k.r.range(-0.4, 0.4), { n: k.r.int(4, 7), h: h * k.r.range(0.8, 1.15), spread: 0.9 });
    }
  }
}

/** Rào tre: sharpened bamboo stakes, tied to two rails, along a ground-following polyline. */
export function bambooFence(k, pts, { h = 2.6 } = {}) {
  const { r: R, props } = k;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1], L = Math.hypot(bx - ax, bz - az), yaw = Math.atan2(bx - ax, bz - az);
    for (let d = 0; d < L; d += 0.3) {
      if (R.chance(0.04)) continue;
      const x = ax + (bx - ax) * d / L, z = az + (bz - az) * d / L, gy = k.ground(x, z), hh = h * R.range(0.85, 1.15);
      props.push({ s: [0.16, hh, 0.16], p: [x, gy + hh / 2, z], r: [R.range(-0.1, 0.1), yaw, R.range(-0.12, 0.12)], c: shade(R.chance(0.3) ? 0xa09a52 : 0x7e8a40, R.range(0.8, 1.1)) });
      props.push({ s: [0.09, 0.3, 0.09], p: [x, gy + hh + 0.12, z], c: 0xc8b878 });                       // cut, sharpened tip
    }
    for (let d = 0; d < L - 0.5; d += 3) {
      const l = Math.min(3, L - d), x = ax + (bx - ax) * (d + l / 2) / L, z = az + (bz - az) * (d + l / 2) / L, gy = k.ground(x, z);
      for (const ry of [0.7, h * 0.7]) props.push({ s: [0.12, 0.12, l], p: [x, gy + ry, z], r: [0, yaw, 0], c: 0x6a6a30 });
    }
  }
}

/** Bông lau: a stand of tall reeds with pale feathery plumes (the reed-flower banners of Đinh Bộ Lĩnh's boyhood). */
export function reedFlags(k, x, z, { n = 14, r = 1.6 } = {}) {
  const { r: R, props } = k;
  for (let i = 0; i < n; i++) {
    const a = R.range(0, TAU), d = R.range(0, r), px = x + Math.sin(a) * d, pz = z + Math.cos(a) * d, gy = k.ground(px, pz);
    const h = R.range(1.8, 3.2), tx = R.range(-0.15, 0.15), tz = R.range(-0.15, 0.15);
    props.push({ s: [0.06, h, 0.06], p: [px, gy + h / 2, pz], r: [tz, 0, -tx], c: shade(0x8a8a4a, R.range(0.85, 1.1)) });
    const hx = px + tx * h, hz = pz + tz * h;
    props.push({ s: [0.22, 0.75, 0.22], p: [hx - tz * 0.3, gy + h + 0.25, hz + tx * 0.3], r: [tz + 0.25, R.range(0, 3), -tx], c: shade(0xe8e0cc, R.range(0.88, 1.05)) });
    props.push({ s: [0.5, 0.06, 0.12], p: [px, gy + h * 0.5, pz], r: [0, R.range(0, 3), 0.5], c: shade(0x7a8a40, R.range(0.85, 1.1)) });   // a blade leaf
  }
}

// ---------------------------------------------------------------- houses
/** Stepped hipped roof of straw thatch (5-6 courses), eave overhang ov, ridge along local z. */
function thatch(L, w, d, y, h, col = 0xb39a5c) {
  const N = 6;
  for (let i = 0; i < N; i++) {
    const u = i / N, ww = w * (1 - u * 0.85), dd = d * (1 - u * 0.55);
    L(0, y + h * u + h / N / 2, 0, [ww, h / N + 0.02, dd], shade(col, 1 - u * 0.12 + (i % 2) * 0.04));
  }
  L(0, y + h + 0.12, 0, [0.35, 0.3, d * 0.5], shade(col, 0.7));                                          // ridge bundle
}

export function stiltHouse(k, x, z, yaw = 0, s = 1) {
  const gy = k.topAt(x, z), L = k.local(x, gy, z, yaw), R = k.r;
  const W = 6 * s, D = 9 * s, FH = 1.8 * s, WH = 2.1 * s;
  for (const px of [-1, 0, 1]) for (const pz of [-1, -0.33, 0.33, 1]) L(px * (W / 2 - 0.3), FH / 2, pz * (D / 2 - 0.3), [0.3 * s, FH, 0.3 * s], 0x4a3624);   // piles
  L(0, FH + 0.1, 0, [W + 0.4, 0.22, D + 0.4], 0x5e4430);                                                  // floor
  for (const sx of [-1, 1]) L(sx * W / 2, FH + WH / 2 + 0.2, 0, [0.14, WH, D], shade(0xa48a58, R.range(0.9, 1.05)));   // woven side walls
  for (const sz of [-1, 1]) L(0, FH + WH / 2 + 0.2, sz * D / 2, [W, WH, 0.14], shade(0x9a8050, R.range(0.9, 1.05)));
  L(0, FH + 0.95 * s, -D / 2 - 0.08, [1.1 * s, 1.6 * s, 0.1], 0x2a1c12);                                  // doorway
  for (const sx of [-1, 1]) L(sx * W / 4, FH + 1.3 * s, D / 2 + 0.08, [0.9 * s, 0.6 * s, 0.1], 0x2a1c12);  // window shutters
  thatch(L, W + 2.4 * s, D + 2.6 * s, FH + WH + 0.1, 3.6 * s);
  // ladder + a little veranda
  L(0, FH * 0.5, -D / 2 - 1.1 * s, [1.0 * s, 0.12, 2.2 * s], 0x5a4030, [0.75, 0, 0]);
  for (let i = 0; i < 4; i++) L(0, 0.35 + i * 0.45 * s, -D / 2 - 1.75 * s + i * 0.38 * s, [1.0 * s, 0.08, 0.16], 0x6a4c34);
}

export function hut(k, x, z, yaw = 0, s = 1) {
  const gy = k.topAt(x, z), L = k.local(x, gy, z, yaw), R = k.r, W = 4.5 * s, D = 5.5 * s, H = 2 * s;
  L(0, H / 2, 0, [W, H, D], shade(0x9a7a56, R.range(0.9, 1.05)));                                         // mud walls
  L(0, 0.12, 0, [W + 0.3, 0.24, D + 0.3], 0x6a5440);                                                       // plinth
  L(0, H * 0.4, -D / 2 - 0.05, [1 * s, H * 0.8, 0.12], 0x2a1c12);                                          // door
  thatch(L, W + 1.6 * s, D + 1.8 * s, H, 2.6 * s);
}

// ---------------------------------------------------------------- trees
export function banyan(k, x, z, s = 1) {
  const gy = k.topAt(x, z), { r: R, props } = k, H = 7 * s;
  props.push({ s: [2.2 * s, H, 2 * s], p: [x, gy + H / 2, z], r: [0, R.range(0, 3), 0], c: 0x5a4a3a });       // trunk
  for (let q = 0; q < 5; q++) {                                                                          // buttress roots
    const a = q / 5 * TAU + R.range(-0.2, 0.2);
    props.push({ s: [0.7 * s, 1.6 * s, 2.4 * s], p: [x + Math.sin(a) * 1.2 * s, gy + 0.6 * s, z + Math.cos(a) * 1.2 * s], r: [0.3, a, 0], c: shade(0x5a4a3a, R.range(0.85, 1.05)) });
  }
  for (let q = 0; q < 6; q++) {                                                                          // limbs
    const a = q / 6 * TAU + R.range(-0.3, 0.3), l = R.range(4, 6.5) * s;
    props.push({ s: [0.8 * s, 0.8 * s, l], p: [x + Math.sin(a) * l / 2, gy + H - 0.6 * s, z + Math.cos(a) * l / 2], r: [-0.25, a, 0], c: 0x544434 });
  }
  for (let q = 0; q < 16; q++) {                                                                         // canopy
    const a = R.range(0, TAU), d = R.range(0, 6.5 * s), cs = R.range(2.4, 4) * s;
    props.push({ s: [cs, cs * 0.6, cs], p: [x + Math.sin(a) * d, gy + H + R.range(0.2, 2.6) * s - d * 0.12, z + Math.cos(a) * d], r: [0, R.range(0, 3), 0], c: shade(0x2e4a24, R.range(0.75, 1.15)) });
  }
  for (let q = 0; q < 14; q++) {                                                                         // hanging aerial roots
    const a = R.range(0, TAU), d = R.range(2, 6) * s, l = R.range(2.5, H - 1);
    props.push({ s: [0.12, l, 0.12], p: [x + Math.sin(a) * d, gy + H - 0.4 - l / 2, z + Math.cos(a) * d], c: shade(0x6a5a44, R.range(0.85, 1.1)) });
  }
}

export function areca(k, x, z, h = 9) {
  const gy = k.topAt(x, z), { r: R, props } = k, lean = R.range(-0.08, 0.08);
  for (let i = 0; i < h; i++) props.push({ s: [0.32, 1, 0.32], p: [x + lean * i, gy + i + 0.5, z], c: i % 2 ? 0x8a8070 : 0x7a7062 });
  const tx = x + lean * h, ty = gy + h;
  for (let q = 0; q < 7; q++) {
    const a = q / 7 * TAU + R.range(-0.2, 0.2);
    props.push({ s: [0.5, 0.12, 3], p: [tx + Math.sin(a) * 1.3, ty - 0.2, z + Math.cos(a) * 1.3], r: [0.55, a, 0], c: shade(0x4e7a2e, R.range(0.85, 1.1)) });
  }
  props.push({ s: [0.6, 0.8, 0.6], p: [tx, ty - 0.6, z], c: 0x6a8a3a });                                 // crownshaft
}

// ---------------------------------------------------------------- fields and water
/** Rice paddies over [x0, z0, x1, z1]: dikes on a `cell` m grid (a little wobble), each cell green with young rice or a
 *  sheet of sky-grey water. Flat: walkable ground stays walkable (they sit 2-25 cm above it). */
export function paddy(k, [x0, z0, x1, z1], { cell = 6, rice = 0.6 } = {}) {
  const { r: R, props } = k;
  for (let x = x0; x < x1; x += cell) for (let z = z0; z < z1; z += cell) {
    const cx = x + cell / 2, cz = z + cell / 2, gy = k.ground(cx, cz);
    const wet = !R.chance(rice);
    props.push({ s: [cell - 0.5, 0.04, cell - 0.5], p: [cx, gy + 0.03, cz], c: wet ? shade(0x7a8a88, R.range(0.9, 1.05)) : shade(0x6a9a3a, R.range(0.85, 1.12)) });
    if (!wet) for (let q = 0; q < 6; q++) props.push({ s: [cell * 0.8, 0.22, 0.25], p: [cx, gy + 0.12, cz - cell * 0.35 + q * cell * 0.14], c: shade(0x7aaa44, R.range(0.85, 1.1)) });
    props.push({ s: [cell, 0.22, 0.45], p: [cx, k.ground(cx, z) + 0.1, z], c: shade(0x7a6a48, R.range(0.9, 1.05)) });      // dikes
    props.push({ s: [0.45, 0.22, cell], p: [x, k.ground(x, cz) + 0.1, cz], c: shade(0x7a6a48, R.range(0.9, 1.05)) });
  }
}

export function lotus(k, x, y, z, r = 4) {
  const { r: R, props } = k;
  for (let q = 0, N = Math.round(r * r * 1.2); q < N; q++) {
    const a = R.range(0, TAU), d = Math.sqrt(R.range(0, 1)) * r, s = R.range(0.5, 1.1);
    props.push({ s: [s, 0.04, s], p: [x + Math.sin(a) * d, y + 0.02, z + Math.cos(a) * d], r: [0, R.range(0, 3), 0], c: shade(0x3e6a2e, R.range(0.85, 1.15)) });
    if (R.chance(0.15)) props.push({ s: [0.22, 0.4, 0.22], p: [x + Math.sin(a) * d, y + 0.35, z + Math.cos(a) * d], c: R.chance(0.5) ? 0xe89aac : 0xf4e8e0 });
  }
}

export function boat(k, x, y, z, yaw = 0, { len = 9, dragon = false, roof = true } = {}) {
  const L = k.local(x, y, z, yaw), W = len * 0.24, wood = dragon ? 0x5a2a1a : 0x5a4430;
  L(0, 0.3, 0, [W * 0.7, 0.5, len * 0.82], wood);                                                         // hull
  for (const sx of [-1, 1]) L(sx * W * 0.42, 0.65, 0, [0.22, 0.6, len * 0.78], shade(wood, 1.1), [0, 0, sx * 0.2]);
  L(0, 0.55, len * 0.45, [W * 0.4, 0.4, len * 0.14], wood, [-0.35, 0, 0]);                                // bow rise
  L(0, 0.55, -len * 0.45, [W * 0.45, 0.4, len * 0.14], wood, [0.35, 0, 0]);                               // stern rise
  if (dragon) {
    L(0, 1.5, len * 0.53, [0.6, 1.8, 0.6], 0xb8902c, [-0.3, 0, 0]);                                         // dragon neck
    L(0, 2.4, len * 0.62, [0.7, 0.6, 1.3], 0xd8a83a);                                                       // head
    L(0, 2.75, len * 0.58, [0.15, 0.6, 0.15], 0xe8c860, [0.5, 0, 0]);                                        // horn
    L(0, 2.2, len * 0.72, [0.5, 0.25, 0.4], 0x8a1e14);                                                      // open jaw
    L(0, 1.4, -len * 0.53, [0.4, 1.4, 0.4], 0xb8902c, [0.5, 0, 0]);                                          // tail
    for (let i = -3; i <= 3; i++) for (const sx of [-1, 1]) {
      L(sx * W * 0.5, 1.05, i * len * 0.1, [0.12, 0.7, 0.7], i % 2 ? 0xa82a1a : 0xd8b050);                   // shields on the rail
      L(sx * W * 0.85, 0.5, i * len * 0.1 + 0.2, [1.6, 0.08, 0.18], 0x6a4a2a, [0, 0, sx * -0.4]);              // oars
    }
  } else if (roof) {
    for (let i = 0; i < 5; i++) L(0, 1.1 + Math.sin(i / 4 * Math.PI) * 0.5, -len * 0.18 + i * 0.5, [W * 0.75, 0.12, 0.5], shade(0x8a7448, 1 - i * 0.03));   // bamboo canopy
  }
}

// ---------------------------------------------------------------- bronze, earthworks, temples
/** Trống đồng (Đông Sơn bronze drum): flared barrel and foot, a face of concentric rings round a 12-ray star, four
 *  little frogs on the rim. Seated on the ground (or y), facing up. s ≈ 1 → 0.8 m across. */
export function bronzeDrum(k, x, z, yaw = 0, s = 1, y = k.ground(x, z)) {
  const L = k.local(x, y, z, yaw), B = 0x8a6a34, BD = 0x5a4420, BL = 0xc8a050, R0 = 0.42 * s;
  L(0, 0.12 * s, 0, [R0 * 2.1, 0.24 * s, R0 * 2.1], BD);                                                  // foot
  L(0, 0.42 * s, 0, [R0 * 1.75, 0.4 * s, R0 * 1.75], B);                                                  // waist
  L(0, 0.72 * s, 0, [R0 * 2.05, 0.25 * s, R0 * 2.05], shade(B, 1.08));                                    // shoulder
  for (let q = 0; q < 4; q++) L(0, 0.45 * s, 0, [R0 * 2.0, 0.6 * s, R0 * 2.0], q % 2 ? BD : B, [0, q * Math.PI / 8, 0]);   // rounded by turns
  L(0, 0.86 * s, 0, [R0 * 2.1, 0.04, R0 * 2.1], shade(BL, 0.85));                                         // the face
  for (let i = 0; i < 3; i++) L(0, 0.88 * s + i * 0.002, 0, [R0 * (1.6 - i * 0.45), 0.02, R0 * (1.6 - i * 0.45)], i % 2 ? BD : BL, [0, i * 0.4, 0]);   // rings
  for (let q = 0; q < 6; q++) L(0, 0.9 * s, 0, [R0 * 0.08, 0.02, R0 * 0.7], 0xf0d070, [0, q * Math.PI / 6, 0]);   // the star's rays
  for (let q = 0; q < 4; q++) {                                                                            // frogs
    const a = q * Math.PI / 2 + Math.PI / 4;
    L(Math.sin(a) * R0 * 0.85, 0.94 * s, Math.cos(a) * R0 * 0.85, [0.1 * s, 0.08 * s, 0.14 * s], BL, [0, a, 0]);
  }
}

/** Thành đất: a rammed-earth wall along a ground-following polyline — battered earth body in three courses, a grassy
 *  crown and a timber parapet of posts and rails on top. Solid: give the def a carve / props footprint along it. */
export function rampart(k, pts, { h = 5, w = 6 } = {}) {
  const { r: R, props } = k;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1], Lg = Math.hypot(bx - ax, bz - az), yaw = Math.atan2(bx - ax, bz - az);
    for (let d = 0; d < Lg; d += 3) {
      const l = Math.min(3.2, Lg - d + 0.2), x = ax + (bx - ax) * (d + l / 2) / Lg, z = az + (bz - az) * (d + l / 2) / Lg, gy = k.ground(x, z);
      for (let c = 0; c < 3; c++) props.push({ s: [w * (1 - c * 0.22), h / 3 + 0.05, l], p: [x, gy + h / 6 + c * h / 3, z], r: [0, yaw, 0], c: shade(0x7a5a3a, R.range(0.85, 1.05) - c * 0.04) });
      props.push({ s: [w * 0.58, 0.3, l], p: [x, gy + h + 0.1, z], r: [0, yaw, 0], c: shade(0x5a6a32, R.range(0.85, 1.1)) });   // grass crown
      const cx = Math.cos(yaw), cz = -Math.sin(yaw);
      for (const sd of [-1, 1]) {
        props.push({ s: [0.22, 1.5, 0.22], p: [x + cx * sd * w * 0.26, gy + h + 0.85, z + cz * sd * w * 0.26], c: 0x4a3424 });
        props.push({ s: [0.14, 0.16, l], p: [x + cx * sd * w * 0.26, gy + h + 1.3, z + cz * sd * w * 0.26], r: [0, yaw, 0], c: 0x5a4030 });
      }
    }
  }
}

/** Curved roof of dark tile: two slopes in stepped slabs, a ridge beam with upturned dragon-tail ends. */
function tileRoof(L, w, d, y, h, col = 0x4a3a34) {
  for (let i = 0; i < 4; i++) {
    const u = i / 4;
    L(0, y + h * u + h / 8, 0, [w * (1 - u * 0.7), h / 4 + 0.02, d * (1 - u * 0.5)], shade(col, 1 - u * 0.1));
  }
  L(0, y + h + 0.15, 0, [w * 0.35, 0.3, 0.4], shade(col, 0.8));
  for (const sx of [-1, 1]) L(sx * w * 0.2, y + h + 0.45, 0, [0.3, 0.6, 0.3], 0x6a5a50, [0, 0, sx * -0.6]);   // upturned ends
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) L(sx * w * 0.5, y + 0.25, sz * d * 0.5, [0.3, 0.5, 0.3], shade(col, 0.85), [sz * 0.5, 0, sx * -0.5]);   // flared eaves
}

export function templeGate(k, x, z, yaw = 0, s = 1) {
  const gy = k.topAt(x, z), L = k.local(x, gy, z, yaw), RED = 0x9a2a1a;
  L(0, 0.2, 0, [11 * s, 0.4, 3.6 * s], 0x7a7066);                                                           // stone base
  for (const cx of [-5, -1.7, 1.7, 5]) L(cx * s, 2.1 * s, 0, [0.5 * s, 3.8 * s, 0.5 * s], RED);              // columns
  L(0, 4.1 * s, 0, [11.4 * s, 0.4 * s, 1.4 * s], 0x6a2016);                                                 // lintel
  tileRoof(L, 6 * s, 4.2 * s, 4.3 * s, 1.7 * s);                                                            // middle bay, raised
  for (const sx of [-1, 1]) tileRoof((lx, ly, lz, sz, c, rr) => L(lx + sx * 3.6 * s, ly - 0.9 * s, lz, sz, c, rr), 3.6 * s, 3.6 * s, 4.3 * s, 1.3 * s);
  L(0, 3.5 * s, -0.75 * s, [2.4 * s, 0.7 * s, 0.1], 0x2a1a10);                                              // name board
}

export function shrine(k, x, z, yaw = 0, s = 1) {
  const gy = k.topAt(x, z), L = k.local(x, gy, z, yaw);
  L(0, 0.35 * s, 0, [1.8 * s, 0.7 * s, 1.6 * s], 0x8a8278);
  L(0, 1.15 * s, 0, [1.5 * s, 0.9 * s, 1.3 * s], 0xb8a890);
  L(0, 1.0 * s, -0.66 * s, [0.6 * s, 0.6 * s, 0.05], 0x2a1a10);
  tileRoof(L, 2.3 * s, 2.0 * s, 1.6 * s, 0.7 * s, 0x5a3a2a);
  L(0, 0.3 * s, -1.2 * s, [0.5 * s, 0.6 * s, 0.5 * s], 0x6a5a3a);                                           // incense urn
  k.glow.push({ s: [0.08, 0.25, 0.08], p: [x, gy + 0.75 * s, z], c: 0xff9040 });
}

export function haystack(k, x, z, s = 1) {
  const gy = k.topAt(x, z), { r: R, props } = k;
  for (let i = 0; i < 5; i++) props.push({ s: [2.4 * s * (1 - i * 0.17), 0.6 * s, 2.4 * s * (1 - i * 0.17)], p: [x, gy + 0.3 * s + i * 0.55 * s, z], r: [0, R.range(0, 3), 0], c: shade(0xc8a85a, R.range(0.85, 1.05)) });
  props.push({ s: [0.12, 1.2 * s, 0.12], p: [x, gy + 3.2 * s, z], c: 0x5a4030 });
}
