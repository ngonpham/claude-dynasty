// Local dressing for Màn IV «Cầu Gãy Trên Dòng Sâu» (maps/caugay.js): the river people's things the shared kit lacks —
// the fishermen and villagers (nón lá, rolled trousers), nets drying on bamboo racks, the square lift net (vó) over the
// shallows, the bamboo weir (đăng) across a reach, the tavern (quán nhỏ: a long thatched eating house, open front,
// benches, the hearth, jars along the back wall), and box-list builders for the moving set pieces (a kit that writes
// into a plain array, so the shared coffin / bier / boat helpers can make a mesh the map's build() then moves).
// Same contract as ../viet.js: every helper pushes boxes { s, p, r?, c } (render only) and draws randomness from k.r in
// call order; a solid prop on the walk field still needs a def.props footprint.
//   frame(out, x0, y0, z0, yaw)        a local box pusher into `out` (x across, z along yaw) — the engine's k.local
//   boxKit(out, r)                     a stand-in dressing kit on a flat ground at 0 that writes into `out` (for meshes)
//   villager(out, x, y, z, yaw, o)     a fisherman / villager, ≈ 1.6 m: o = { hat = true (nón lá), shirt, pants, pose:
//                                      'stand' | 'pull' (arms forward, leaning back on a rope) | 'pole' (a bamboo pole held
//                                      level) | 'row' (seated, an oar) | 'bell' (an arm raised), s = 1, woman = false }
//   netRack(k, x, z, yaw, len)         bamboo trestles and a pole hung with brown nets drying, floats along the head rope
//   liftNet(k, x, y, z, yaw, s)        vó: a square net on two crossed bent bamboo arms, lowered toward the water
//   weir(k, pts, o)                    đăng: a bamboo fish weir — close stakes and a woven screen along a polyline (o = { h = 1.8 })
//   tavern(k, x, z, yaw)               the long eating house (front = local -z): a raised plank floor (hollow under the
//                                      trapdoor: the map's build adds lid + cellar), posts, woven back and side walls,
//                                      the thatch, benches and tables, the clay hearth (fire: the map), jars, a cloth sign
//   TAVERN                             its dimensions { W, D, FLOOR, hole: [lx, lz, w, d] (the cellar trapdoor, local) }
import { shade } from '../../../../src/core/voxel.js';

const TAU = Math.PI * 2;

/** The engine's local box pusher (dressing.js `local`), into any array. */
export const frame = (out, x0, y0, z0, yaw) => {
  const cs = Math.cos(yaw), sn = Math.sin(yaw);
  return (lx, ly, lz, s, c, rr = [0, 0, 0]) => out.push({ s, p: [x0 + lx * cs + lz * sn, y0 + ly, z0 - lx * sn + lz * cs], r: [rr[0], yaw + rr[1], rr[2]], c });
};

/** A dressing-kit stand-in on flat ground (y 0) writing into `out`: enough for V.coffin / coffinBier / boat / bellPost. */
export const boxKit = (out, r) => ({
  r, props: out, glow: out, shade,
  local: (x0, y0, z0, yaw) => frame(out, x0, y0, z0, yaw),
  ground: () => 0, topAt: () => 0, inAt: () => -9,
});

const SKIN = 0xc28a62, HAIR = 0x1c1410, HAT = 0xd8c48a, HATD = 0xa8925a;

/** Thatch: a stepped hipped roof of straw courses (as suquan's), ridge along local x when wide. */
export function thatch(L, w, d, y, h, col = 0xb39a5c) {
  const N = 6;
  for (let i = 0; i < N; i++) {
    const u = i / N, ww = w * (1 - u * 0.5), dd = d * (1 - u * 0.85);
    L(0, y + h * u + h / N / 2, 0, [ww, h / N + 0.02, dd], shade(col, 1 - u * 0.12 + (i % 2) * 0.04));
  }
  L(0, y + h + 0.12, 0, [w * 0.5, 0.3, 0.35], shade(col, 0.7));                                  // ridge bundle
}

/** A villager / fisherman (faces local +z): rolled trousers, a loose shirt, a sash; the nón lá or a head-cloth. */
export function villager(out, x, y, z, yaw = 0, { hat = true, shirt = 0x4a4e5a, pants = 0x2e2a26, pose = 'stand', s = 1, woman = false } = {}) {
  const L = frame(out, x, y, z, yaw), sit = pose === 'row', lean = pose === 'pull' ? -0.25 : 0;
  const hip = sit ? 0.5 * s : 0.86 * s;
  if (sit) for (const sx of [-1, 1]) L(sx * 0.12 * s, 0.32 * s, 0.22 * s, [0.15 * s, 0.16 * s, 0.5 * s], pants);
  else for (const sx of [-1, 1]) {
    L(sx * 0.12 * s, 0.62 * s, 0, [0.16 * s, 0.5 * s, 0.17 * s], pants);                          // trousers rolled to the knee
    L(sx * 0.12 * s, 0.2 * s, 0, [0.12 * s, 0.4 * s, 0.13 * s], SKIN);                            // bare shins
  }
  const ty = hip + 0.34 * s;
  L(0, ty, lean * 0.4, [0.44 * s * (woman ? 0.9 : 1), 0.62 * s, 0.26 * s], shirt, [lean, 0, 0]);  // shirt
  L(0, hip + 0.06 * s, 0, [0.46 * s, 0.1 * s, 0.28 * s], shade(shirt, 0.6));                      // sash
  const hy = ty + 0.46 * s, hz = lean * 0.75;
  L(0, hy, hz, [0.24 * s, 0.26 * s, 0.24 * s], SKIN);                                            // head
  if (woman) L(0, hy + 0.04 * s, hz - 0.12 * s, [0.22 * s, 0.2 * s, 0.12 * s], HAIR);              // hair knot
  if (hat) {                                                                                      // nón lá: four shrinking courses
    for (let i = 0; i < 4; i++) L(0, hy + 0.14 * s + i * 0.07 * s, hz, [(0.78 - i * 0.2) * s, 0.07 * s, (0.78 - i * 0.2) * s], i % 2 ? HATD : HAT, [0, i * 0.4, 0]);
  } else L(0, hy + 0.13 * s, hz, [0.27 * s, 0.08 * s, 0.27 * s], 0x5a3a2a);                      // head-cloth
  // arms
  const ay = ty + 0.2 * s;
  if (pose === 'pull' || pose === 'pole') {
    for (const sx of [-1, 1]) L(sx * 0.26 * s, ay - 0.05 * s, 0.25 * s, [0.11 * s, 0.11 * s, 0.5 * s], shirt, [-0.2, 0, 0]);
    if (pose === 'pole') L(0, ay - 0.05 * s, 0.5 * s, [3.2 * s, 0.09 * s, 0.09 * s], 0x9aa050);    // the bamboo pole, held level
  } else if (pose === 'row') {
    L(0.24 * s, ay - 0.1 * s, 0.28 * s, [0.11 * s, 0.11 * s, 0.5 * s], shirt, [-0.4, 0, 0]);
    L(0.4 * s, ay - 0.3 * s, 0.7 * s, [0.08 * s, 0.08 * s, 2.4 * s], 0x6a4a2c, [0.55, 0.3, 0]);  // the oar
  } else if (pose === 'bell') {
    L(0.26 * s, ay + 0.3 * s, 0.05 * s, [0.11 * s, 0.55 * s, 0.11 * s], shirt);
    L(-0.26 * s, ay - 0.18 * s, 0, [0.11 * s, 0.5 * s, 0.11 * s], shirt);
  } else for (const sx of [-1, 1]) L(sx * 0.27 * s, ay - 0.2 * s, 0, [0.11 * s, 0.5 * s, 0.11 * s], shirt);
}

/** Nets drying: two A-frame trestles, a pole between them, net panels (brown mesh) hanging down to knee height. */
export function netRack(k, x, z, yaw = 0, len = 6) {
  const gy = k.ground(x, z), L = k.local(x, gy, z, yaw), R = k.r, BAM = 0x8a9048;
  for (const sx of [-len / 2, len / 2]) for (const t of [-0.3, 0.3]) L(sx, 1.15, t, [0.09, 2.4, 0.09], BAM, [t, 0, 0]);
  L(0, 2.25, 0, [len + 0.6, 0.09, 0.09], BAM);
  for (let q = 0; q < Math.floor(len / 1.4); q++) {
    const px = -len / 2 + 0.7 + q * 1.4, h = R.range(1.4, 1.8), c = shade(0x5a4a38, R.range(0.8, 1.1));
    L(px, 2.2 - h / 2, 0.04, [1.3, h, 0.03], c);
    for (let m = 0; m < 4; m++) L(px, 2.2 - (m + 0.5) * h / 4, 0.06, [1.3, 0.025, 0.04], shade(c, 0.7));   // mesh lines
    L(px, 2.22, 0.08, [0.12, 0.12, 0.12], 0xc8b070);                                               // a float on the head rope
  }
}

/** Vó: the square lift net of the river people — two bent bamboo arms crossed over the net, a long pole back to a
 *  post on the bank; the net hangs just above the water (y = water height). */
export function liftNet(k, x, y, z, yaw = 0, s = 1) {
  const L = k.local(x, y, z, yaw), BAM = 0x9aa050, NET = 0x4e4436;
  L(0, 0.15 * s, 0, [3.6 * s, 0.03, 3.6 * s], NET);                                               // the net, a shallow sag
  for (let q = -2; q <= 2; q++) { L(q * 0.72 * s, 0.17 * s, 0, [0.03, 0.03, 3.6 * s], shade(NET, 0.7)); L(0, 0.17 * s, q * 0.72 * s, [3.6 * s, 0.03, 0.03], shade(NET, 0.7)); }
  for (const a of [Math.PI / 4, -Math.PI / 4]) for (const side of [-1, 1]) L(Math.cos(a) * side * 1.25 * s, 1.1 * s, Math.sin(a) * side * 1.25 * s, [0.08, 0.08, 2.9 * s], BAM, [0.62 * side, a + Math.PI / 2, 0]);
  L(0, 2.2 * s, 0, [0.14, 0.14, 0.14], 0x6a5a3a);                                                  // the crossing knot
  L(0, 1.6 * s, -3.4 * s, [0.1, 0.1, 7.2 * s], BAM, [-0.3, 0, 0]);                                 // the lifting pole to the bank
  L(0, 0.7 * s, -6.6 * s, [0.2, 1.8 * s, 0.2], 0x4a3624);                                           // its post
}

/** Đăng: a fish weir of close bamboo stakes and a woven screen between them, standing in the shallows. */
export function weir(k, pts, { h = 1.8 } = {}) {
  const { r: R, props } = k;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1], len = Math.hypot(bx - ax, bz - az), yaw = Math.atan2(bx - ax, bz - az);
    for (let d = 0; d < len; d += 0.9) {
      const x = ax + (bx - ax) * d / len, z = az + (bz - az) * d / len, gy = k.ground(x, z), hh = h * R.range(0.85, 1.15);
      props.push({ s: [0.1, hh, 0.1], p: [x, gy + hh / 2, z], r: [R.range(-0.06, 0.06), 0, R.range(-0.06, 0.06)], c: shade(0x8a8a48, R.range(0.8, 1.1)) });
    }
    const mx = (ax + bx) / 2, mz = (az + bz) / 2, gy = k.ground(mx, mz);
    props.push({ s: [0.05, h * 0.62, len], p: [mx, gy + h * 0.36, mz], r: [0, yaw, 0], c: shade(0xa08a52, R.range(0.85, 1.05)) });
    props.push({ s: [0.07, 0.07, len], p: [mx, gy + h * 0.7, mz], r: [0, yaw, 0], c: 0x6a5a34 });
  }
}

// ---------------------------------------------------------------- the tavern
export const TAVERN = { W: 21, D: 9, FLOOR: 0.95, hole: [-3.2, -1.6, 2.2, 1.6] };

/** Quán nhỏ: front (local -z) open between its posts; inside a raised plank floor with a trapdoor hole (lid + cellar:
 *  the map's build), three tables and benches, the clay hearth at the west end, jars and baskets along the back. */
export function tavern(k, x, z, yaw = 0) {
  const gy = k.ground(x, z), L = k.local(x, gy, z, yaw), R = k.r, { W, D, FLOOR: F } = TAVERN, [hx, hz, hw, hd] = TAVERN.hole;
  const WOOD = 0x5a4026, WD = 0x3a2818, PLANK = 0x7a5a3a, WALL = 0xa48a58;
  // the plinth: four low walls of packed earth + boards (hollow, so the cellar under the trapdoor shows), then the floor
  // in slabs round the hole
  L(0, F / 2, D / 2 - 0.2, [W, F, 0.4], 0x6a5440); L(0, F / 2, -D / 2 + 0.2, [W, F, 0.4], 0x6a5440);
  for (const sx of [-1, 1]) L(sx * (W / 2 - 0.2), F / 2, 0, [0.4, F, D], 0x6a5440);
  L(0, 0.07, 0, [W - 0.8, 0.14, D - 0.8], 0x2a2018);                                              // the cellar floor under the boards
  const fl = (x0, x1, z0, z1) => L((x0 + x1) / 2, F - 0.05, (z0 + z1) / 2, [x1 - x0, 0.12, z1 - z0], shade(PLANK, R.range(0.9, 1.05)));
  fl(-W / 2, hx - hw / 2, -D / 2, D / 2); fl(hx + hw / 2, W / 2, -D / 2, D / 2);
  fl(hx - hw / 2, hx + hw / 2, -D / 2, hz - hd / 2); fl(hx - hw / 2, hx + hw / 2, hz + hd / 2, D / 2);
  for (let q = -W / 2 + 0.6; q < W / 2; q += 0.6) L(q, F + 0.015, 0, [0.03, 0.02, D], shade(PLANK, 0.7));   // board seams
  L(0, F * 0.5, -D / 2 - 0.5, [W - 2, 0.2, 0.9], PLANK); L(0, F * 0.2, -D / 2 - 1.1, [W - 2, 0.2, 0.7], PLANK);   // two steps along the front
  // posts (front row open), the back wall woven, the side walls half-open
  for (let i = 0; i <= 6; i++) {
    const px = -W / 2 + 0.3 + i * (W - 0.6) / 6;
    L(px, F + 1.6, -D / 2 + 0.3, [0.32, 3.2, 0.32], WOOD); L(px, F + 1.6, D / 2 - 0.3, [0.32, 3.2, 0.32], WOOD);
  }
  L(0, F + 3.15, -D / 2 + 0.3, [W, 0.3, 0.36], WD); L(0, F + 3.15, D / 2 - 0.3, [W, 0.3, 0.36], WD);   // plates
  L(0, F + 1.55, D / 2 - 0.2, [W - 0.4, 3.0, 0.14], shade(WALL, 0.95));                           // woven back wall
  for (let q = -W / 2 + 0.5; q < W / 2; q += 0.5) L(q, F + 1.55, D / 2 - 0.29, [0.04, 3.0, 0.03], shade(WALL, 0.75));
  for (const sx of [-1, 1]) L(sx * (W / 2 - 0.2), F + 2.0, 0, [0.14, 2.2, D - 0.4], shade(WALL, 0.9));   // side walls, open below
  L(0, F + 0.55, -D / 2 + 0.3, [W - 1, 0.12, 0.12], WD);                                          // a low rail along the front
  thatch(L, W + 3.6, D + 4.2, F + 3.3, 3.4, 0xa89058);
  // inside: three long tables with benches (east half), the hearth (west end: a clay stove, a pot), jars on the back wall
  for (let t = 0; t < 3; t++) {
    const tx = 0.6 + t * 3.1;
    L(tx, F + 0.72, 0.4, [1.0, 0.1, 3.6], shade(PLANK, 1.05));
    for (const sz of [-1.2, 1.2]) L(tx, F + 0.36, 0.4 + sz * 1.3, [0.9, 0.72, 0.12], WD);
    for (const sx of [-1, 1]) L(tx + sx * 0.95, F + 0.42, 0.4, [0.36, 0.08, 3.4], PLANK);
    for (let b = 0; b < 3; b++) L(tx + R.range(-0.25, 0.25), F + 0.82, 0.4 + R.range(-1.4, 1.4), [0.2, 0.1, 0.2], R.chance(0.5) ? 0xe8e2d6 : 0x3a5a7a);   // bowls
  }
  { const sx = -W / 2 + 2.2, sz = 1.2;                                                             // the hearth
    L(sx, F + 0.45, sz, [1.9, 0.9, 1.5], 0x8a5a3a); L(sx, F + 0.92, sz, [1.6, 0.1, 1.2], 0x5a3a26);
    L(sx, F + 1.15, sz, [0.8, 0.45, 0.8], 0x2a2220); L(sx, F + 1.42, sz, [0.9, 0.08, 0.9], 0x3a302a);   // the soup pot
    L(sx + 0.9, F + 0.25, sz - 0.6, [0.6, 0.5, 0.4], 0x4a3020);                                    // a stack of firewood
    L(sx + 1.6, F + 1.0, sz + 0.8, [0.12, 2, 0.12], WOOD); }                                       // the pestle post
  { const px = -W / 2 + 4.6, pz = 2.4;                                                              // the rice mortar and its pestle (the three beats)
    L(px, F + 0.3, pz, [0.7, 0.6, 0.7], 0x6a5a48); L(px + 0.1, F + 1.0, pz, [0.14, 1.5, 0.14], 0x8a6a40, [0, 0, 0.18]); }
  for (let q = 0; q < 9; q++) {                                                                    // jars along the back wall
    const jx = -W / 2 + 1.2 + q * 2.1 + R.range(-0.3, 0.3), js = R.range(0.75, 1.05);
    L(jx, F + 0.42 * js, D / 2 - 0.9, [0.6 * js, 0.84 * js, 0.6 * js], shade(0x6a4a30, R.range(0.8, 1.1)));
    L(jx, F + 0.9 * js, D / 2 - 0.9, [0.36 * js, 0.12, 0.36 * js], 0x3a2a1c);
  }
  for (let q = 0; q < 4; q++) L(W / 2 - 1.2 - q * 0.8, F + 0.25, -D / 2 + 1.0, [0.6, 0.5, 0.6], shade(0xa08a52, R.range(0.85, 1.05)));   // baskets by the door
  // under the eaves at the front: a bamboo blind half rolled, a cloth sign board (店: the map's cloth), a lantern row
  L(W / 2 - 3, F + 2.9, -D / 2 - 0.1, [3.4, 0.4, 0.2], 0x9a8a50);
}

/** The bamboo float frame (khung tre) hidden under a coffin: a raft of green culms lashed in two layers. Into a box list
 *  (local, the raft's top at y = 0). */
export function raft(out, r) {
  const L = frame(out, 0, 0, 0, 0);
  for (let q = 0; q < 9; q++) L(-1.6 + q * 0.4, -0.3, 0, [0.34, 0.34, 3.4], shade(q % 3 ? 0xb8a848 : 0x8aa040, r.range(0.85, 1.05)));
  for (const z of [-1.3, 0, 1.3]) L(0, -0.06, z, [3.6, 0.16, 0.2], 0x7a8a3a);
  for (const z of [-1.3, 1.3]) for (const x of [-1.5, 1.5]) L(x, -0.1, z, [0.16, 0.3, 0.3], 0xb09868);   // rope lashings
}

/** Box lists for a reed thicket a set piece can stand among (dense plumes round x, z in `out`, ground 0). */
export function plumeClump(out, r, x, z, n = 18, rad = 1.6) {
  for (let i = 0; i < n; i++) {
    const a = r.range(0, TAU), d = Math.sqrt(r.range(0, 1)) * rad, px = x + Math.sin(a) * d, pz = z + Math.cos(a) * d, h = r.range(1.6, 2.6);
    out.push({ s: [0.05, h, 0.05], p: [px, h / 2, pz], c: shade(0x9a9456, r.range(0.85, 1.1)) });
    out.push({ s: [0.24, 0.8, 0.2], p: [px, h + 0.3, pz], r: [0.3, r.range(0, 3), -0.2], c: shade(0xf2ece0, r.range(0.9, 1.04)) });
  }
}

