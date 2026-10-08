// Đinh Tiên Hoàng (丁先皇) — Đinh Bộ Lĩnh grown into the founder-emperor of Đại Cồ Việt (c. 967, Màn I: the ally who
// drives through the gap at Quèn Thành); polearm class. NPC entry (contract: src/chars/npc/index.js) with his own model
// def (src/chars/npc/kit.js header; fine voxels, chars/parts.js FV), a size up (scale 1.12), and a 20×20 portrait.
// The young lord of suquan's 丁部領 (suquan/src/chars/dinhbolinh/model.js) some twelve years on, and heavier for them:
// broad shoulders, a square face weathered darker, the brows that lift at the ends now knotted over commanding eyes, a
// short moustache and a short square beard, a pale old scar across the left cheekbone and a nick through the right brow.
// A black lacquered helmet with a gold rim and gold ridges, a gold plaque bearing the drum-sun over the brow, gold-edged
// cheek guards and a black neck guard; from a gold socket on the crown springs the white reed plume (bông lau) he pinned
// there at Quèn Thành. Black lacquer lamellar with gold lips: the cuirass with the gold Đông Sơn sun on the breast (as
// on his young crimson one), gold shoulder straps, layered black pauldrons rimmed in gold with gold sun bosses; a crimson
// tunic showing at the collar, the sleeves and the split skirt (panels: chains); a black belt with a gold sun buckle;
// gold bracers; dark trousers under black tassets, black boots with gold greaves. A long red cape from the shoulders,
// the gold sun on its back. Weapon: the reed-banner spear of his youth made grander — a black-lacquered shaft banded in
// gold with crimson cord grips and a gold butt cap, a gold socket ringed like a drum, a broad leaf blade with a raised
// ridge; under it a fuller plume of white reed and the small crimson swallow-tail pennant with its gold 丁.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as POLEARM from '../../../../src/chars/npc/polearm.js';
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

const HV = 0.013;
const C = {
  skin: 0xb88058, skinD: 0x8a5a3a, skinH: 0xcc9670, scar: 0xd8aa88, lip: 0x7a4030, mouth: 0x241008, eye: 0x100a08, iris: 0x34200e, scl: 0xe8dcc6,
  hair: 0x161210, hairH: 0x34302c,
  black: 0x17130f, blackD: 0x0b0907, blackL: 0x332a22,                  // black lacquer
  gold: 0xd4a43e, goldD: 0x7c5a1c, goldL: 0xf4d272,
  red: 0xb82a1e, redD: 0x701810, redL: 0xdc4630,                        // cape and tunic
  pants: 0x221a16, pantsD: 0x140f0c, leather: 0x3a2618, leatherL: 0x5a3e2a, boot: 0x16110e, bootD: 0x0a0806,
  steel: 0xc8d0da, edge: 0xf6f9fc, fuller: 0x7a8492,
  reed: 0xf4eedc, reedH: 0xfffbf0, reedD: 0xd2c29a,
};
const tunic = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.redL : md(x - y * 2 + z, 9) === 0 ? C.redD : C.red);
/** The Đông Sơn sun of the bronze drums (radius r, angle a; disc radius R): a many-pointed star in a gold boss. */
const sun = (r, a, R = 6) => {
  if (r > R + 0.4) return null;
  if (r > R - 0.7) return C.goldD;
  if (r > R - 1.6) return C.goldL;
  return r < 1.4 + 2.4 * (R / 6) * Math.pow(Math.max(0, Math.cos(a * 6)), 4) ? C.goldL : C.gold;
};
/** The sun as a relief on a front face at z, centred on (cx, cy). */
const sunBoxes = (R, cy, z, cx = 0) => {
  const out = [], n = Math.ceil(R);
  for (let y = -n; y <= n; y++) for (let x = -n; x <= n; x++) {
    const r = Math.hypot(x, y), c = sun(r, Math.atan2(y, x), R);
    if (c != null) out.push(B([x + cx, y + cy, z], [x + cx + 1, y + cy + 1, r < 1.4 ? z + 3 : z + 2], c));
  }
  return out;
};

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: the crimson tunic skirt at the sides (front / back panels: chains), black lacquer belt with gold studs and the
  // gold sun buckle, black lamellar faulds round the back
  T.hips = [
    B([-13, -10, -9], [13, 6, 9], C.redD),
    B([-15, -15, -11], [15, -1, 11], (x, y, z) => (Math.abs(z) > 6 && y < -5 ? null : y === -15 ? C.gold : tunic(x, y, z))),
    ...lamellar([-15, -16, -12], [15, -1, -6], { base: C.black, rowH: 3, pw: 3, trim: C.gold, jag: true }),
    B([-16, -1, -12], [16, 5, 12], (x, y, z) => (y === -1 || y === 4 ? C.goldD : y === 1 && md(x + z, 4) === 0 ? C.goldL : C.black)),
    ...sunBoxes(4, 2, 12),
  ];
  T.spine = [
    B([-12, -6, -10], [12, 14, 10], C.redD),
    ...lamellar([-12, -4, -10], [12, 9, 10], { base: C.black, rowH: 2, pw: 3, trim: C.gold }),
    B([-13, 9, -11], [13, 13, 11], (x, y) => (y === 9 || y === 12 ? C.goldD : md(x, 4) === 0 ? C.goldL : C.gold)),   // gold band
  ];
  // chest: a deep black cuirass with gold lips, the gold sun on the breast, gold shoulder straps, the crimson collar
  T.chest = [
    B([-16, -4, -12], [16, 19, 12], C.blackD),
    ...lamellar([-15, -3, -12], [15, 5, 12], { base: C.black, rowH: 2, pw: 3, trim: C.goldD }),
    ...lamellar([-16, 5, -13], [16, 17, 13], { base: C.black, rowH: 3, pw: 4, trim: C.gold }),
    ...sunBoxes(6.5, 10, 13),
    ...[-1, 1].flatMap((sx) => [mirX(B([9, 15, -14], [14, 19, 14], C.gold), sx), mirX(B([10, 16, -15], [13, 18, 15], C.goldD, true), sx)]),
    B([-9, 16, -9], [9, 22, 9], (x, y) => (y === 21 ? C.goldL : y === 16 ? C.redD : C.red)),          // the tunic collar
    B([-6, 15, -6], [6, 25, 6], -1),
    ...[-1, 1].map((sx) => mirX(B([11, 15, -14], [15, 19, -10], (x, y) => (y === 18 ? C.goldL : C.gold)), sx)),   // cape clasps
  ];
  T.neck = [B([-6, -2, -6], [6, 6, 6], C.skinD), P([-6, 1, 5], [6, 6, 6], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // crimson sleeve under a black lamellar guard, gold cuff band; gold bracers; black leather gauntlets
    T['upperArm' + s] = [
      B([-6, -24, -6], [6, 2, 6], tunic), B([-7, -19, -7], [7, -7, 7], tunic),
      ...lamellar([-6, -17, -6], [6, -3, 6], { base: C.black, rowH: 2, pw: 3, trim: C.gold }),
      B([-7, -24, -7], [7, -21, 7], (x, y) => (y === -22 ? C.goldL : C.goldD)),
    ];
    T['foreArm' + s] = bracer(C.redD, [C.gold, C.goldD, C.goldL]);
    T['hand' + s] = glove(sx, C.black, C.blackL);
    // dark trousers, black tassets with gold lips over the outer thigh and the front
    T['thigh' + s] = [
      B([-8, -36, -8], [8, 2, 8], (x, y) => (md(y + (x & 1), 6) === 0 ? C.pantsD : C.pants)),
      ...lamellar([-5, -20, -8], [10, 0, 9], { base: C.black, rowH: 3, pw: 3, trim: C.gold, jag: true }).map((b) => mirX(b, sx)),
      ...lamellar([-7, -15, 5], [7, 0, 9], { base: C.black, rowH: 3, pw: 3, trim: C.goldD, lipX: false }),
    ];
    // black boots to the knee, gold greave plates in front, a gold knee disc
    T['shin' + s] = [
      B([-6, -34, -6], [6, 0, 6], C.boot),
      B([-7, -6, -7], [7, 2, 7], C.black), B([-7, -8, -7], [7, -6, 7], C.gold),
      B([-6, -30, 4], [6, -9, 8], (x, y) => (md(y, 5) === 0 ? C.goldD : y === -10 ? C.goldL : C.gold)),
      B([-3, -10, 7], [4, -3, 10], (x, y) => (Math.abs(x - 0.5) + Math.abs(y + 6.5) < 4 ? C.goldL : null)),
      B([-7, -34, -7], [7, -32, 7], C.bootD),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD, { trim: C.gold });
  }
  return T;
}

/** Layered black pauldrons rimmed in gold under a gold-lipped cap, a gold sun boss on the outside. +x = outward. */
function pauldron(sx) {
  const boss = [];
  for (let y = -4; y <= 4; y++) for (let z = -4; z <= 4; z++) {
    const r = Math.hypot(y, z), c = sun(r, Math.atan2(y, z), 4);
    if (c != null) boss.push(B([12, y + 4, z], [r < 1.4 ? 15 : 14, y + 5, z + 1], c));
  }
  return [
    B([-4, 10, -9], [9, 14, 9], (x, y, z) => (y === 10 || Math.abs(z) === 9 ? C.goldD : md(x + z, 5) === 0 ? C.blackL : C.black)),
    B([-2, 14, -7], [7, 16, 7], (x, y, z) => (Math.abs(z) > 5 ? C.gold : C.black)),
    ...lamellar([-3, 4, -11], [11, 10, 11], { base: C.black, rowH: 3, pw: 4, trim: C.gold }),
    ...lamellar([0, -2, -12], [13, 4, 12], { base: C.black, rowH: 3, pw: 4, trim: C.gold }),
    ...lamellar([3, -8, -12], [15, -2, 12], { base: C.black, rowH: 3, pw: 4, trim: C.goldL, jag: true }),
    ...boss,
  ].map((b) => mirX(b, sx));
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const beard = (x, y, z) => (md(x * 3 + y + z, 4) === 0 ? C.hairH : C.hair);
  const helm = (x, y, z) => (y === 12 ? C.gold : md(Math.round(Math.atan2(x - 0.5, z) * 4), 4) === 0 && y < 19 ? C.goldD : md(x + y + z, 7) === 0 ? C.blackL : C.black);
  return [
    // a broad square face: heavy jaw, hard cheekbones, ears under the cheek guards
    B([-7, 2, -6], [8, 13, 6], C.skin),
    B([-7, 0, -5], [8, 5, 5], C.skin), B([-3, -1, -2], [4, 1, 5], C.skin),
    ...symH(4, 7, 5, 7, 5, 6, C.skinH),
    ...symH(5, 8, 1, 4, 3, 5, C.skinD),
    // commanding eyes under brows that lift at the ends, knotted at the middle; the lids shaded
    ...symH(2, 5, 7, 9, 5, 6, C.scl), ...symH(2, 4, 7, 9, 5, 6, C.iris), ...symH(2, 3, 7, 9, 5, 6, C.eye),
    ...symH(2, 6, 9, 10, 5, 6, C.skinD),
    ...symH(1, 4, 10, 11, 5, 7, C.hair, false), ...symH(4, 7, 11, 12, 5, 7, C.hair, false),
    P([0, 9, 5], [1, 12, 6], C.skinD),
    // old scars: a pale line down across the left cheekbone, a nick through the right brow
    P([4, 6, 5], [5, 7, 6], C.scar), P([5, 5, 5], [6, 6, 6], C.scar), P([5, 4, 5], [6, 5, 6], C.scar), P([6, 3, 5], [7, 4, 6], C.scar),
    P([-4, 10, 6], [-3, 12, 7], C.scar),
    // straight nose
    B([-1, 6, 6], [2, 10, 8], C.skinH), B([-1, 4, 7], [2, 6, 9], C.skin), P([-1, 4, 8], [0, 5, 9], C.skinD), P([1, 4, 8], [2, 5, 9], C.skinD),
    // a set mouth, the short moustache, a short square beard round the jaw and chin
    P([-2, 2, 5], [3, 3, 6], C.lip), P([-1, 2, 5], [2, 3, 6], C.mouth),
    B([-3, 3, 6], [4, 4, 8], beard), ...symH(3, 5, 2, 4, 5, 7, C.hair, false),
    B([-7, -3, -3], [8, 3, 7], (x, y, z) => (y >= 1 && (z > 3 || Math.abs(x) < 5) ? null : hash01(x, y, z) < 0.1 && y < -1 ? null : beard(x, y, z))),
    B([-7, 3, -4], [-6, 10, 2], beard), B([7, 3, -4], [8, 10, 2], beard),
    // the black helmet: bowl with gold ridges, a gold rim over the brow, the gold plaque with the drum-sun, a low peak
    B([-8, 12, -8], [9, 18, 8], helm), B([-7, 18, -7], [8, 20, 7], helm), B([-5, 20, -5], [6, 21, 5], C.black),
    B([-8, 12, 7], [9, 14, 9], (x, y) => (y === 12 ? C.goldD : C.goldL)),
    ...(() => { const out = []; for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) { const r = Math.hypot(x, y), c = sun(r, Math.atan2(y, x), 3.2); if (c != null) out.push(B([x, y + 17, 8], [x + 1, y + 18, r < 1.4 ? 11 : 10], c)); } return out; })(),
    // the plume socket on the crown, gold
    B([-2, 21, -2], [3, 25, 3], (x, y) => (y === 24 ? C.goldL : md(y, 2) ? C.gold : C.goldD)),
    // gold-edged black cheek guards, a black lamellar neck guard round the back
    B([-10, 2, -4], [-8, 13, 4], (x, y, z) => (z === 3 || y === 2 ? C.gold : C.black)), B([9, 2, -4], [11, 13, 4], (x, y, z) => (z === 3 || y === 2 ? C.gold : C.black)),
    B([-10, 1, -10], [11, 13, -7], (x, y) => (y === 1 ? C.gold : md(y, 3) === 0 ? C.blackL : C.black)),
  ];
}

// ---------------------------------------------------------------- reed-banner spear (weapon joint: shaft +Z, origin = rear grip)
function weaponGeo() {
  // shaft at 0.02 (z −0.86 … 1.5): black lacquer, gold bands, crimson cord at both grips, a gold butt cap
  const cord = (z) => (z > -6 && z < 8) || (z > 22 && z < 34);
  const shaft = vox([
    B([-1, -1, -43], [1, 1, 75], (x, y, z) => (cord(z) ? (md(z + x + y, 2) ? C.red : C.redD) : ((z >> 1) & 1) ? C.blackL : C.black)),
    ...[-36, -18, 12, 40, 56, 68].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.goldL : C.gold))),
    B([-2, -2, -43], [2, 2, -39], C.gold), B([-1, -1, -46], [1, 1, -43], C.goldL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // gold socket at 0.012 (z 1.46 … 1.7), ringed like a drum
  const socket = vox([
    B([-3, -3, 122], [3, 3, 141], (x, y, z) => (md(z, 4) === 0 ? C.goldL : md(z, 4) === 2 ? C.goldD : C.gold)),
    B([-4, -4, 124], [4, 4, 127], (x, y) => (md(x + y, 2) ? C.goldL : C.gold)),
    B([-4, -4, 134], [4, 4, 136], C.goldD),
    B([-2, -2, 141], [2, 2, 143], C.goldL),
  ], 0.012, { jitter: 0.05, ao: 0.35 });
  // the leaf blade at 0.011 (z 1.58 … 2.16): broad at a third, a raised ridge, bright edges, a gold root
  const bv = 0.011, z0 = Math.round(1.58 / bv), z1 = Math.round(2.16 / bv), boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0);
    const w = Math.max(1, Math.round(9 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.35 + 0.08)), 0.7) * (1 - u * 0.25)));
    boxes.push(B([-w, -1, z], [w, 1, z + 1], (x) => (u < 0.06 ? C.gold : Math.abs(x + 0.5) >= w - 1 ? C.edge : Math.abs(x + 0.5) < 1 ? C.fuller : C.steel)));
    if (u > 0.04 && u < 0.85) boxes.push(B([-1, -2, z], [1, 2, z + 1], (x, y) => (y === -2 || y === 1 ? C.fuller : C.steel)));
  }
  const blade = vox(boxes, bv, { jitter: 0.03, ao: 0.2 });
  return [{ geo: shaft, mat: 'body' }, { geo: socket, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
/** Reed-flower strand: soft white fluff, every (x, z) column its own white-gold, the tip thinning to wisps. */
const reed = (v) => (i, n) => {
  const w = i === 0 ? 2 : i === n - 1 ? 1 : 2, last = i === n - 1;
  return vox([B([-w, -7, -w], [w, 0, w], (x, y, z) => {
    const k = hash01(x + 9, z + 9 + i * 3, y + 20);
    if (k < (last ? 0.45 : 0.18)) return null;
    return k > 0.82 ? C.reedD : k > 0.5 ? C.reedH : C.reed;
  })], v, { jitter: 0.08, ao: 0.15 });
};
// 丁 in 8 × 11 (row 0 = top) on the pennant's first two segments
const DINH = ['XXXXXXXX', 'XXXXXXXX', '....XX..', '....XX..', '....XX..', '....XX..', '....XX..', '....XX..', '....XX..', '.X..XX..', '..XXX...'];
/** Swallow-tail pennant: crimson, a gold border at the hoist, 丁 in gold, the end forked. */
const pennant = (i, n) => {
  const last = i === n - 1;
  return vox([B([0, -6, 0], [13, 0, 1], (x, y) => {
    const g = DINH[i * 6 - y - 2]?.[x - 3];
    if (last && y <= -3 && Math.abs(x - 6) < (-2 - y) * 1.4) return null;
    if (g === 'X') return C.goldL;
    return x === 0 ? C.gold : x === 12 ? C.redD : C.red;
  })], 0.012, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.15 });
};
/** Long red cape: the edges darker, the gold drum-sun high on the back, a gold hem. */
const cape = (i, n) => {
  const w = 8 + i, last = i === n - 1;
  return vox([B([-w, -6, 0], [w, 0, 1], (x, y) => {
    if (last && y === -6 && hash01(x, i, 7) < 0.35) return null;
    if (last && y >= -5 && y <= -4) return y === -5 ? C.gold : C.goldD;
    if (i === 1) { const r = Math.hypot(x + 0.5, y + 3), c = sun(r, Math.atan2(y + 3, x + 0.5), 4.2); if (c != null) return c; }
    return x === -w || x === w - 1 ? C.redD : md(x + y * 3, 7) === 0 ? C.redL : C.red;
  }), B([-w, -6, 1], [-w + 1, 0, 2], C.redD), B([w - 1, -6, 1], [w, 0, 2], C.redD)], 0.025, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.25 });
};
/** Tunic panel (front / back): crimson, gold-edged, a gold hem. */
const panel = (i, n) => vox([B([-5, -8, 0], [5, 0, 1], (x, y) => (i === n - 1 && y <= -7 ? (y === -8 && x & 1 ? null : C.gold)
  : x === -5 || x === 4 ? C.gold : tunic(x, y, i)))], FV * 1.2, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.2 });

const DEF = {
  scale: 1.12,
  reach: { tip: 2.16, butt: 0.92 },
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const legs = [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]];
    return [
      { joint: 'chest', anchor: [0, 0.245, -0.17], rest: [0, -1, 0.12], n: 7, len: 0.135, stiff: 0.16, drag: 0.22, wind: 1.2, cone: 80, sway: 0.22,
        seg: cape, hit: ['chest', 'hips', ...legs] },
      { joint: 'hips', anchor: [0, -0.01, 0.15], rest: [0, -1, 0.1], n: 3, len: 0.12, stiff: 0.12, drag: 0.14, wind: 0.4, face: [0, 0, 1], cone: 70, sway: 0.08,
        seg: panel, hit: legs },
      // bông lau on the helmet: a white reed plume from the crown socket, rising, then streaming back on the wind
      ...Array.from({ length: 5 }, (_, k) => {
        const a = (k - 2) * 0.45;
        return { joint: 'head', anchor: [Math.sin(a) * 1.2 * HV, 25 * HV, -Math.cos(a) * 0.6 * HV], rest: [Math.sin(a) * 0.35, 0.75, -0.65], n: 4, len: 0.065,
          stiff: 0.2, drag: 0.1, wind: 1.5, grav: 0.45, cone: 80, sway: 0.3, face: [1, 0, 0], seg: reed(0.012), hit: ['head'] };
      }),
      // the reed plume round the spear's socket, fuller than his young one
      ...Array.from({ length: 9 }, (_, k) => {
        const a = k * 0.6981, ox = Math.cos(a) * 0.022, oy = Math.sin(a) * 0.022;
        return { joint: 'weapon', anchor: [ox, oy, 1.5], rest: [ox * 14, oy * 6 - 1, -0.5], n: 3, len: 0.075, stiff: 0.04 + k * 0.004, drag: 0.1, wind: 1.6,
          grav: 0.6, cone: 140, sway: 0.3, face: [1, 0, 0], seg: reed(0.013) };
      }),
      // the 丁 pennant below the plume
      { joint: 'weapon', anchor: [0, 0.015, 1.16], rest: [0, -1, -0.15], n: 3, len: 0.072, stiff: 0.1, drag: 0.1, wind: 1.4, cone: 120, sway: 0.25,
        face: [1, 0, 0], seg: pennant },
    ];
  },
};

/** Ally string (src/actors/actors.js friend(): an ally swings kit.moves n1 → n2 …, now and then the charge; npcKit gives
 *  only the boss table): the class clips again as hero-style moves with soldier hit specs (src/hero/moves.js header),
 *  the hit window and lunge of each clip's boss attack. list = [[id, clip, hit, next, charge], ...]. */
function allyString(kit, list) {
  for (const [id, clipId, hit, next, charge] of list) {
    const b = kit.moves[clipId], [f0, f1] = b.hits[0].f;
    kit.moves[id] = { id, frames: b.frames, cancel: f1 + 10, tell: f0, lunge: b.lunge, hits: [{ f: [f0, f1], every: 0, hitstop: 3, ...hit }], next, charge };
    kit.clips[id] = kit.clips[clipId];
  }
  return kit;
}

// 20×20 portrait: the white reed plume over the black helmet with its gold rim and sun plaque, the knotted brows, a scar
// on the cheek, short moustache and square beard; the black-and-gold cuirass with its sun, the red cape at the shoulders
const FACE = [
  '.......WwWWw........',
  '........WWwW........',
  '.........YY.........',
  '.....KKKKYYKKKK.....',
  '....KKKKYggYKKKK....',
  '...KKYKKKYYKKKYKK...',
  '...YYYYYYYYYYYYYY...',
  '..KSSSSSSSSSSSSSSK..',
  '..KSHHHSSSSSSHHHSK..',
  '..KSSWEESSSSEEWSSK..',
  '..KSSSSSSssSSSxSSK..',
  '..YSSSSSSssSSxSSSY..',
  '..YsSHHHHHHHHSSSsY..',
  '...sHHSSMMMMSSHHs...',
  '....HHHHHHHHHHHH....',
  '.....HHHHHHHHHH.....',
  '..RRKKYYKKKKYYKKRR..',
  '.RRKKKKKYggYKKKKKRR.',
  'RRKKYKKYgYYgYKKYKKRR',
  'RKKKKKKKYggYKKKKKKKR',
];
const PAL = { W: '#f4eedc', w: '#d2c29a', Y: '#d4a43e', g: '#f4d272', K: '#17130f', S: '#b88058', s: '#8a5a3a', H: '#161210',
  E: '#100a08', M: '#7a4030', x: '#d8aa88', R: '#b82a1e' };

export const NPC = {
  id: 'dinhtienhoang', name: { zh: 'Đinh Tiên Hoàng', en: 'Đinh Tiên Hoàng' }, courtesy: { zh: '丁先皇', en: 'Đinh Bộ Lĩnh' }, seal: '丁先皇',
  portrait: { face: FACE, pal: PAL }, kit: allyString(npcKit(DEF, POLEARM), [
    ['n1', 'chop', { shape: 'arc', range: 3.4, ang: 70, dmg: 28, kb: 'push', force: 6, hitstop: 4 }, 'n2', 'c1'],
    ['n2', 'sweep', { shape: 'circle', range: 3.6, dmg: 24, kb: 'blow', force: 8, lift: 3, every: 8 }, 'n1', 'c1'],
    ['c1', 'charge', { shape: 'line', len: 3.2, width: 1.6, off: 0.4, dmg: 30, kb: 'blow', force: 10, hitstop: 4, every: 6 }],
  ]),
};
