// Quèn Thành's own dressing helpers and set pieces (Màn I; the field: ./quenthanh.js). Render only, like the shared kit
// (../viet.js): helpers push boxes through the dressing kit k and draw every random number from k.r in call order;
// buildSet(root, k) makes the meshes the story moves (story:set → sets[name]) and steps them in update(dt, game).
//   horse(k, x, z, yaw, o)          a tethered war horse of the Đinh lines (o = { col, cloth = true })
//   horseLine(k, x, z0, z1, side)   a hitching rail along z at x with horses facing it (side = +1: they stand on its +X side)
//   reedStandard(k, x, z, o)        cờ lau: a tall bamboo pole crowned with a great tuft of white reed plumes and a short
//                                   cinnabar streamer — the Đinh host's standard (o = { h = 8, s = 1 })
//   buildSet(root, k)               the set pieces: the stockade's wooden gate (gate 'congo': the leaves crash inward when
//                                   the story opens it), the twelve warlord banners round the yard (set 'banners': the next
//                                   four come down one by one, keeper by keeper), the great reed banner (set 'reed': it
//                                   rises at the yard's heart), the Đinh shield line on the left flank (set 'shields':
//                                   the mantlets swing up; free mode stands with them up), the yielded sword (set 'yield':
//                                   laid in the mud at Hàng Tướng's feet, a white reed plume between him and the hero),
//                                   and white storks wheeling over the karsts. A new battle (frame back to 0) resets it.
import * as THREE from 'three';
import { boxesGeometry, shade } from '../../../../src/core/voxel.js';
import { makeRng } from '../../../../src/core/rng.js';
import { lit } from '../../../../src/world/castle.js';
import { GATES } from '../../../../src/world/map.js';
import * as V from '../viet.js';

export const PAL_Z = 16, GW = 6;                     // the stockade's front palisade line; half width of its gate
// the twelve banners in three keepers' groups (west, east, north): the order they come down in
export const BANNERS = [[-42, 30], [-46, 48], [-46, 68], [-42, 86], [42, 30], [46, 48], [46, 68], [42, 86], [-30, 100], [-19, 104], [19, 104], [30, 100]];
export const YARD = [0, 64];                         // the yard's heart (the banners face it)
export const REED = [-9, 70];                        // the great reed banner (off the road)
export const SHIELD_X = 66, SHIELD_Z = [-98, -58];   // the Đinh shield line across the left-flank valley
const ease = (u) => u * u * (3 - 2 * u);
const clamp01 = (v) => Math.max(0, Math.min(1, v));

// ---------------------------------------------------------------- dressing helpers
const HORSE = [0x5a3420, 0x3a2418, 0x7a5a3a, 0x8a8478, 0x2a1e18];
/** A war horse standing at a rail: bay / black / dun / grey, crimson saddle cloth, head a little down. Faces +Z of yaw. */
export function horse(k, x, z, yaw = 0, { col = HORSE[k.r.int(0, HORSE.length - 1)], cloth = true } = {}) {
  const gy = k.ground(x, z), L = k.local(x, gy, z, yaw), D = shade(col, 0.7), graze = k.r.chance(0.35);
  L(0, 1.32, 0, [0.62, 0.66, 1.7], col);                                                        // barrel
  L(0, 1.42, -0.62, [0.6, 0.6, 0.5], col); L(0, 1.4, 0.62, [0.58, 0.62, 0.5], col);              // haunch, chest
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    L(sx * 0.2, 0.55, sz * 0.66, [0.17, 1.1, 0.19], sz < 0 ? D : col);                           // legs
    L(sx * 0.2, 0.05, sz * 0.66 + 0.03, [0.2, 0.1, 0.24], 0x1e1814);                              // hooves
  }
  const ny = graze ? 1.25 : 1.75, nz = graze ? 1.15 : 1.0, hy = graze ? 0.75 : 2.05, hz = graze ? 1.55 : 1.35;
  L(0, ny, nz, [0.32, 0.8, 0.42], col, [graze ? 1.1 : 0.55, 0, 0]);                              // neck
  L(0, hy, hz, [0.28, 0.32, 0.68], col, [graze ? 1.2 : 0.35, 0, 0]);                             // head
  L(0, ny + 0.3, nz - 0.18, [0.1, 0.62, 0.3], 0x1a1410, [graze ? 1.1 : 0.55, 0, 0]);             // mane
  L(0, 1.2, -1.0, [0.14, 0.9, 0.16], 0x1a1410, [-0.3, 0, 0]);                                     // tail
  if (cloth) {
    L(0, 1.68, -0.05, [0.72, 0.1, 0.8], 0x2a1a12);                                                // saddle
    for (const sx of [-1, 1]) L(sx * 0.33, 1.38, -0.05, [0.06, 0.6, 0.9], 0x8e2418);              // crimson cloth
    L(0, 1.75, 0.3, [0.5, 0.14, 0.12], 0x4a2a18);
  }
}

/** A hitching rail along z at x (posts every 4 m, a pole), horses tethered on its `side` facing it. */
export function horseLine(k, x, z0, z1, side = 1) {
  const R = k.r;
  for (let z = z0; z <= z1 + 0.01; z += 4) k.props.push({ s: [0.2, 1.4, 0.2], p: [x, k.ground(x, z) + 0.7, z], c: 0x3a2818 });
  k.props.push({ s: [0.14, 0.14, z1 - z0 + 0.6], p: [x, k.ground(x, (z0 + z1) / 2) + 1.25, (z0 + z1) / 2], c: 0x5a4026 });
  for (let z = z0 + 1.2; z < z1 - 0.8; z += R.range(1.9, 2.5)) horse(k, x + side * R.range(1.5, 1.9), z + R.range(-0.2, 0.2), side > 0 ? -Math.PI / 2 + R.range(-0.2, 0.2) : Math.PI / 2 + R.range(-0.2, 0.2));
  for (let i = 0; i < 4; i++) k.props.push({ s: [0.9, 0.5, 0.7], p: [x + side * R.range(3.5, 5), k.ground(x, z0) + 0.25, R.range(z0, z1)], r: [0, R.range(0, 3), 0], c: shade(0xb8a060, R.range(0.8, 1.05)) });   // fodder
}

/** Cờ lau: a tall bamboo pole crowned with a great tuft of white reed plumes and a short cinnabar streamer. */
export function reedStandard(k, x, z, { h = 8, s = 1 } = {}) {
  const R = k.r, gy = k.topAt(x, z);
  for (let y = 0; y < h; y += 1.4) k.props.push({ s: [0.16 * s, 1.36, 0.16 * s], p: [x, gy + y + 0.7, z], c: shade(0x8a8a44, R.range(0.85, 1.05)) }, { s: [0.21 * s, 0.07, 0.21 * s], p: [x, gy + y + 1.4, z], c: 0x5a5a28 });
  for (let i = 0; i < 14; i++) {                                                                  // the plume tuft, flung downwind
    const a = R.range(0, 6.28), tl = R.range(0.2, 0.75);
    k.props.push({ s: [0.22 * s, R.range(0.9, 1.5) * s, 0.16 * s], p: [x + Math.sin(a) * 0.25 * s + 0.2, gy + h + R.range(0, 0.8) * s, z + Math.cos(a) * 0.25 * s], r: [Math.cos(a) * tl, R.range(0, 3), -Math.sin(a) * tl - 0.25], c: shade(0xf4eee2, R.range(0.9, 1.04)) });
  }
  k.props.push({ s: [0.06, 1.8 * s, 0.3 * s], p: [x + 0.45, gy + h - 1.2 * s, z], r: [0, 0, -0.35], c: 0xb02a1a });   // streamer
}

// ---------------------------------------------------------------- set pieces
/** A pusher kit for meshes of our own: local(…) writes into `out` (V.localQ frame), r = its own rng. */
const kitInto = (out, seed) => ({ r: makeRng(seed), local: (x0, y0, z0, yaw) => V.localQ(out, x0, y0, z0, yaw) });
const meshOf = (boxes, mat = lit()) => { const m = new THREE.Mesh(boxesGeometry(boxes), mat); m.castShadow = m.receiveShadow = true; return m; };

export function buildSet(root, k) {
  const r = makeRng(967);

  // ---- the wooden gate of the stockade: two leaves of split logs under the gatehouse, hinged at the jambs; Tả Tướng's
  // blow breaks the bar and they crash inward (+Z) into the yard
  const leaves = [-1, 1].map((sx) => {
    const lb = [], w = GW - 0.15, h = 4.3;
    for (let x = 0.22; x < w; x += 0.46) lb.push({ s: [0.44, h - r.range(0, 0.4), 0.3], p: [-sx * x, h / 2, 0], c: shade(0x5a4028, r.range(0.75, 1.1)) });   // logs
    for (let x = 0.22; x < w; x += 0.46) lb.push({ s: [0.2, 0.4, 0.2], p: [-sx * x, h + 0.05, 0], r: [0, 0.78, 0], c: 0x7a6040 });                         // sharpened tops
    for (const y of [0.9, 2.4, 3.7]) lb.push({ s: [w, 0.26, 0.18], p: [-sx * w / 2, y, 0.24], c: 0x3a2818 });                                             // cross bars (yard side)
    lb.push({ s: [0.18, h * 1.05, 0.16], p: [-sx * w / 2, h / 2, 0.3], r: [0, 0, sx * 0.8], c: 0x3a2818 });                                                // brace
    for (const y of [0.9, 2.4, 3.7]) for (let q = 0; q < 4; q++) lb.push({ s: [0.12, 0.34, 0.06], p: [-sx * (0.6 + q * (w - 1.2) / 3), y, -0.18], c: 0x8a8448 });   // rattan lashings
    lb.push({ s: [1.2, 1.2, 0.08], p: [-sx * w * 0.55, 2.4, -0.19], c: 0x4a5228 });                                                                         // a green 雄 placard
    const pivot = new THREE.Group(); pivot.position.set(sx * GW, k.ground(sx * GW, PAL_Z), PAL_Z);
    pivot.add(meshOf(lb)); root.add(pivot);
    return { pivot, sx };
  });
  const bar = meshOf([{ s: [GW * 2 + 0.6, 0.4, 0.4], p: [0, 2.4, -0.5], c: 0x2e2018 }]);                                                                   // the gate bar
  bar.position.set(0, k.ground(0, PAL_Z), PAL_Z); root.add(bar);

  // ---- the twelve banners: tall poles (static) and, per banner, a yard of crossbar + tattered cloth that comes down
  const COLS = [['#4e5a2e', '#ece2c4'], ['#6a3a1a', '#ece2c4'], ['#5a5030', '#e8d8a8'], ['#3a4228', '#d8c890'], ['#7a5a2a', '#1e1a10'], ['#4a3a24', '#e6dcc0']];
  const flags = BANNERS.map(([x, z], i) => {
    const gy = k.topAt(x, z), P = r.range(13, 15), yaw = Math.atan2(YARD[0] - x, YARD[1] - z) + r.range(-0.3, 0.3), cx = Math.cos(yaw), cz = -Math.sin(yaw);
    const [bg, fg] = COLS[i % COLS.length], W = 2.6, H = 6.2;
    k.poles.push({ s: [0.26, P, 0.26], p: [x, gy + P / 2, z], c: 0x2e2218 }, { s: [0.44, 0.5, 0.44], p: [x, gy + 0.25, z], c: 0x5a4a38 },
      { s: [0.16, 1.1, 0.16], p: [x, gy + P + 0.55, z], c: 0xb8b0a0 }, { s: [0.5, 0.18, 0.5], p: [x, gy + P + 1.1, z], c: 0x8a3a1e });   // pole, socket, spike, rust tassel
    const g = new THREE.Group(); g.position.set(x, gy + P - 0.3, z); root.add(g);
    g.add(meshOf([{ s: [W + 0.5, 0.18, 0.18], p: [cx * W / 2, 0, cz * W / 2], r: [0, yaw, 0], c: 0x2e2218 },
      { s: [0.16, 0.6, 0.16], p: [cx * (W + 0.25), -0.1, cz * (W + 0.25)], c: 0x6b5a2a }]));
    const c = k.cloth(k.banner('雄', { bg, fg, border: '#1e1a10', w: 128, h: 300, seed: 60 + i }), W, H, 'hang', cx * 0.12, -0.1, cz * 0.12, yaw);
    g.add(c);                                                                           // (re-parented: it rides the yard down)
    return { g, c, y0: gy + P - 0.3, gy, H, start: -1 };
  });

  // ---- the great reed banner: a white field, the 丁 in cinnabar, a crown of reed plumes; it rises out of the earth
  const reed = new THREE.Group(); root.add(reed);
  { const [x, z] = REED, gy = k.topAt(x, z), P = 17, W = 3.4, H = 8, yaw = Math.PI + 0.25, b = [], L = V.localQ(b, 0, 0, 0, yaw), R = makeRng(31);
    for (let y = 0; y < P; y += 1.5) b.push({ s: [0.3, 1.46, 0.3], p: [0, y + 0.75, 0], c: shade(0x8a8a44, R.range(0.85, 1.05)) }, { s: [0.38, 0.1, 0.38], p: [0, y + 1.5, 0], c: 0x5a5a28 });
    L(W / 2, P - 0.4, 0, [W + 0.6, 0.22, 0.22], 0x3a2818);                            // crossbar (faces the gate)
    for (let i = 0; i < 22; i++) {                                                     // the plume crown
      const a = R.range(0, 6.28), tl = R.range(0.2, 0.8);
      L(Math.sin(a) * 0.35, P + R.range(0.3, 1.4), Math.cos(a) * 0.35, [0.3, R.range(1.2, 2.0), 0.22], shade(0xf6f0e4, R.range(0.9, 1.04)), [Math.cos(a) * tl, R.range(0, 3), -Math.sin(a) * tl]);
    }
    reed.add(meshOf(b));
    const c = k.cloth(k.banner('丁', { bg: '#efe8d8', fg: '#a3261a', border: '#a3261a', w: 160, h: 320, tatter: false, seed: 77 }), W, H, 'hang', 0.12 * Math.cos(yaw), P - 0.5, -0.12 * Math.sin(yaw), yaw);
    reed.add(c);
    reed.position.set(x, gy, z);
    reed.userData.gy = gy; }

  // ---- the Đinh shield line across the left-flank valley: woven mantlets that swing up off the ground, facing +X
  const shields = [];
  for (let z = SHIELD_Z[0], i = 0; z <= SHIELD_Z[1]; z += 4.4, i++) {
    const b = [], W = 3.4, H = 2.5, R = makeRng(400 + i);
    for (let q = 0; q < 9; q++) b.push({ s: [W, H / 9 + 0.02, 0.14], p: [0, 0.2 + q * H / 9, 0], c: shade(q % 2 ? 0x8a7a48 : 0x6e6438, R.range(0.8, 1.1)) });
    for (const sx of [-1, 1]) b.push({ s: [0.16, H + 0.4, 0.16], p: [sx * W * 0.44, H / 2, 0.1], c: 0x3e2c1e });
    b.push({ s: [1.0, 1.0, 0.06], p: [0, H * 0.55, -0.1], c: 0x8e2418 }, { s: [0.5, 0.5, 0.04], p: [0, H * 0.55, -0.14], c: 0xe0c070 });   // a red roundel, a gold boss
    for (let q = 0, N = R.int(1, 5); q < N; q++) b.push({ s: [0.03, 0.03, 0.8], p: [R.range(-1.4, 1.4), R.range(0.6, H), -0.4], r: [R.range(-0.2, 0.2), R.range(-0.3, 0.3), 0], c: 0x4a3524 });   // arrows in it
    const x = SHIELD_X + r.range(-0.6, 0.6), pivot = new THREE.Group(), tilt = new THREE.Group();
    pivot.position.set(x, k.ground(x, z), z); pivot.rotation.y = -Math.PI / 2 + r.range(-0.12, 0.12);   // its front (−Z local) faces +X
    tilt.add(meshOf(b)); pivot.add(tilt); root.add(pivot);
    shields.push(tilt);
  }

  // ---- the yielded sword: a straight sword in the mud, its scabbard beside, and a white reed plume between the two men
  const sword = new THREE.Group(); root.add(sword);
  { const b = [];
    b.push({ s: [0.07, 0.03, 1.05], p: [0, 0.06, 0.25], c: 0xc8ccd0 }, { s: [0.03, 0.035, 1.0], p: [0, 0.075, 0.25], c: 0xe8ecf0 },   // blade
      { s: [0.32, 0.08, 0.08], p: [0, 0.07, -0.3], c: 0xb89048 }, { s: [0.06, 0.06, 0.3], p: [0, 0.07, -0.48], c: 0x3a2014 },        // guard, grip
      { s: [0.1, 0.1, 0.1], p: [0, 0.07, -0.65], c: 0xb89048 },                                                                      // pommel
      { s: [0.12, 0.08, 1.1], p: [0.32, 0.05, 0.1], r: [0, 0.18, 0], c: 0x2a1e14 }, { s: [0.14, 0.09, 0.1], p: [0.38, 0.05, 0.5], r: [0, 0.18, 0], c: 0xb89048 });   // scabbard
    for (let i = 0; i < 6; i++) b.push({ s: [0.5, 0.04, 0.4], p: [r.range(-0.4, 0.5), 0.02, r.range(-0.6, 0.8)], r: [0, r.range(0, 3), 0], c: 0x3a3022 });   // mud
    // the reed plume, laid down a step toward the hero (stalk + seed head)
    b.push({ s: [0.04, 0.04, 1.6], p: [-0.9, 0.05, 0.6], r: [0, 0.6, 0], c: 0x9a9456 }, { s: [0.24, 0.16, 0.7], p: [-1.35, 0.1, 1.25], r: [0, 0.6, 0.2], c: 0xf2ece0 });
    sword.add(meshOf(b)); sword.visible = false; }

  // ---- white storks wheeling over the karsts: two loose V flocks on slow circles (one mesh each)
  const flocks = [[-58, 40, -20, 46, 0.05, 7], [54, 46, 120, 52, -0.04, 5], [10, 52, -150, 70, 0.03, 4]].map(([cx, y, cz, rad, w, n], i) => {
    const b = [], K = kitInto(b, 800 + i);
    V.storkFlock(K, rad, 0, 0, n, { spread: 5, yaw: w > 0 ? Math.PI : 0, s: 1.6 });
    const g = new THREE.Group(); g.position.set(cx, y, cz); g.add(meshOf(b)); root.add(g);
    return { g, w, y, ph: i * 2.1 };
  });

  // ---- state
  let T = 0, lastFrame = Infinity, next = 0, raise = -1, shieldT = -1, yieldWant = false;
  const reset = () => {
    next = 0; raise = -1; shieldT = -1; yieldWant = false; sword.visible = false; reed.visible = false;
    for (const f of flags) { f.start = -1; f.g.position.y = f.y0; f.c.scale.y = 1; }
  };
  reset();
  let open = 0;
  return {
    sets: {
      banners() {                                                                     // the next keeper's four come down
        for (let j = 0; j < 4 && next < flags.length; j++, next++) flags[next].start = T + j * 0.9;
      },
      reed() { if (raise < 0) { raise = T; reed.visible = true; } },
      shields() { if (shieldT < 0) shieldT = T; },
      yield() { yieldWant = true; },
    },
    update(dt, game) {
      T += dt;
      if (game && game.frame < lastFrame) reset();                                   // a new battle
      if (game) lastFrame = game.frame;
      // the gate: the bar snaps, the leaves crash inward (free mode: lying open)
      open += ((GATES.congo?.open ? 1 : 0) - open) * Math.min(1, dt * 2.6);
      const e = open * open;
      for (const l of leaves) l.pivot.rotation.set(e * 1.4, l.sx * e * 0.3, l.sx * e * 0.08);
      bar.visible = open < 0.2; bar.rotation.z = open * 0.6;
      // the banners: the yard slides down the pole (≈ 2.4 s), the cloth crumples at the foot
      for (const f of flags) if (f.start >= 0) {
        const u = ease(clamp01((T - f.start) / 2.4)), s = 1 - 0.78 * ease(clamp01((T - f.start - 1.6) / 1.0));
        f.g.position.y = f.y0 + (f.gy + f.H * s + 0.4 - f.y0) * u; f.c.scale.y = s;
      }
      // the great reed banner rises out of the yard (≈ 3.5 s)
      if (raise >= 0) reed.position.y = reed.userData.gy - 18 * (1 - ease(clamp01((T - raise) / 3.5)));
      // the shield line: up on the set (free mode: always up), each mantlet a beat after the one before
      const up = shieldT >= 0 ? T - shieldT : game?.mode === 'free' ? 99 : -1;
      shields.forEach((s, i) => { s.rotation.x = 1.45 * (1 - ease(clamp01((up - i * 0.15) / 0.6))); });
      // the yielded sword: laid at Hàng Tướng's feet, toward the hero (or on the mound's front without an actor)
      if (yieldWant) {
        yieldWant = false;
        const a = game?.actors?.get('hangtuong'), h = game?.hero;
        const ax = a ? a.x : 0, az = a ? a.z : 150, dx = (h ? h.x : ax) - ax, dz = (h ? h.z : az - 4) - az, l = Math.hypot(dx, dz) || 1;
        const x = ax + dx / l * 1.3, z = az + dz / l * 1.3;
        sword.position.set(x, k.ground(x, z), z); sword.rotation.y = Math.atan2(dx, dz) + Math.PI / 2; sword.visible = true;
      }
      for (const f of flocks) { f.g.rotation.y = T * f.w + f.ph; f.g.position.y = f.y + Math.sin(T * 0.4 + f.ph) * 1.5; }
    },
  };
}
