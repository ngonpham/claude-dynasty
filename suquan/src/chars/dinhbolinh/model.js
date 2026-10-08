// 丁部領 (def-shaped model on Zhao Yun's spear kit: kit.js), fine voxels (src/chars/parts.js FV) on the shared rig. The
// young lord of Hoa Lư who will be 萬勝王: a sun-tanned face with a strong square jaw, level eyes under brows that lift
// at the ends, a short moustache and a small chin tuft. No helmet: a crimson khăn wound round the head (its folds cross
// in a chevron over the brow, gold hems), the hair drawn up into a topknot (búi tó) ringed by a small gold crown of
// sun rays with a gold pin through it; the wrap's two gold-tipped tails stream behind. Crimson lacquered lamellar with
// gold lips over a madder-red tunic: a cuirass bearing the bronze-drum sun of Đông Sơn in gold (a many-pointed star
// in rings) on the breast, gold shoulder straps, rounded crimson shoulder guards with gold caps, the tunic's crossed
// collar edged in gold. Black-lacquer belt with a gold sun buckle; a gold-brocade sash knotted on the left hip (its
// tails swing), the tunic skirt split front and back into gold-hemmed panels. Bare forearms in black-lacquer bracers,
// bare hands; dark trousers under crimson tassets; cream leg wraps (xà cạp) banded crimson, lacquered shin plates; bare
// feet on leather sandals. A red cloak from the shoulders with the gold sun on its back. Weapon: the reed-banner spear
// (thương cờ lau) — crimson-lacquered shaft banded in gold with black cord grips and a bronze butt cap, a bronze socket
// ringed like a drum, a broad leaf blade with a raised ridge; under it a pale white-gold reed plume (bông lau: soft
// strands that float on the wind) and a small crimson swallow-tail pennant bearing a gold 丁.
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, hand, bracer, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xc48a64, skinD: 0x96643f, skinH: 0xd8a27c, lip: 0x7e4232, mouth: 0x2a1210, eye: 0x120a08, iris: 0x3a2414, scl: 0xece0cc,
  hair: 0x141010, hairH: 0x2e2622,
  red: 0xc82e20, redD: 0x7e1a12, redL: 0xec5638,                       // crimson lacquer
  tunic: 0x9e2a1e, tunicD: 0x681a12, tunicL: 0xbc402c,                 // madder-dyed cloth
  gold: 0xd0a040, goldD: 0x7c5a1c, goldL: 0xf2d070,
  black: 0x1c1514, blackL: 0x3a2e2a,
  pants: 0x2a1e1a, pantsD: 0x1a1210, wrap: 0xd6c6a2, wrapD: 0xa8946e,
  leather: 0x4c3222, leatherL: 0x6c4a32,
  shaft: 0x7a1810, shaftH: 0x9a2416, bronze: 0xa8783a, bronzeD: 0x684820, bronzeL: 0xd8aa5a,
  steel: 0xc8d0da, edge: 0xf6f9fc, fuller: 0x7a8492,
  reed: 0xf2ead2, reedH: 0xfff9ea, reedD: 0xcdb98a,
};
const tunic = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.tunicL : md(x - y * 2 + z, 9) === 0 ? C.tunicD : C.tunic);
const brocade = (x, y, z) => (md(x + z + (y & 1) * 2, 4) === 0 ? C.goldD : md(x - z + y, 5) === 0 ? C.goldL : C.gold);
/** The Đông Sơn sun of the bronze drums at radius r, angle a of a disc of radius R: a many-pointed star in a gold boss,
 *  a bright ring and a dark rim round it (null outside). */
export const sun = (r, a, R = 6) => {
  if (r > R + 0.4) return null;
  if (r > R - 0.7) return C.goldD;
  if (r > R - 1.6) return C.goldL;
  return r < 1.4 + 2.4 * (R / 6) * Math.pow(Math.max(0, Math.cos(a * 6)), 4) ? C.goldL : C.gold;
};
/** The sun as a relief on a front face: voxels in the plane z (the boss one deeper), centred on (0, cy). */
const sunBoxes = (R, cy, z) => {
  const out = [], n = Math.ceil(R);
  for (let y = -n; y <= n; y++) for (let x = -n; x <= n; x++) {
    const r = Math.hypot(x, y), c = sun(r, Math.atan2(y, x), R);
    if (c != null) out.push(B([x, y + cy, z], [x + 1, y + cy + 1, r < 1.4 ? z + 3 : z + 2], c));
  }
  return out;
};

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: the tunic skirt (sides only below the belt: the front and back panels are chains), black-lacquer belt with
  // gold studs and the gold sun buckle, the brocade sash knot on the left hip
  T.hips = [
    B([-12, -10, -8], [12, 6, 8], C.tunicD),
    B([-14, -15, -10], [14, -1, 10], (x, y, z) => (Math.abs(z) > 5 && y < -5 ? null : y === -15 ? C.gold : tunic(x, y, z))),
    B([-14, -1, -10], [14, 5, 10], (x, y, z) => (y === -1 || y === 4 ? C.goldD : y === 1 && md(x + z, 4) === 0 ? C.gold : C.black)),
    ...sunBoxes(4, 2, 10),
    B([10, -5, 8], [15, 4, 13], brocade), P([10, 0, 12], [15, 1, 13], C.goldL),
  ];
  // waist: crimson belly lamellar over the tunic, a brocade band under the cuirass
  T.spine = [
    B([-11, -6, -9], [11, 14, 9], tunic),
    ...lamellar([-11, -4, -9], [11, 9, 9], { base: C.red, rowH: 2, pw: 3, trim: C.gold }),
    B([-12, 9, -10], [12, 13, 10], (x, y, z) => (y === 9 || y === 12 ? C.goldD : brocade(x, y, z))),
  ];
  // chest: crimson lacquered cuirass with gold lips, the gold drum-sun on the breast, gold shoulder straps, the tunic's
  // crossed collar round the neck (left panel over right, gold-edged), black-lacquer edging round the armholes
  const collar = (x, y, z) => {
    if (z < 6) return y === 20 ? C.goldL : C.tunic;
    const d = x + (y - 15) * 0.9;
    if (y >= 15 && x > -(y - 14) && x < y - 14 && d < 3) return C.tunicD;
    return Math.abs(d - 3) < 1.2 ? C.gold : C.tunic;
  };
  T.chest = [
    B([-15, -4, -11], [15, 18, 11], tunic),
    ...lamellar([-14, -3, -11], [14, 5, 11], { base: C.red, rowH: 2, pw: 3 }),
    ...lamellar([-15, 5, -12], [15, 16, 12], { base: C.red, rowH: 3, pw: 4, trim: C.gold }),
    ...sunBoxes(6, 9, 12),
    ...[-1, 1].flatMap((sx) => [mirX(B([9, 14, -13], [13, 17, 13], C.gold), sx), mirX(B([10, 15, -14], [12, 16, 14], C.goldD, true), sx)]),
    B([-16, 3, -9], [-14, 14, 9], C.black), B([14, 3, -9], [16, 14, 9], C.black),
    B([-9, 15, -9], [9, 21, 9], collar),
    B([-6, 15, -6], [6, 25, 6], -1),
  ];
  T.neck = [B([-5, -2, -5], [5, 6, 5], C.skinD), P([-5, 1, 4], [5, 6, 5], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // tunic sleeve to the elbow (gold band at the cuff), a crimson lamellar guard over the outside
    T['upperArm' + s] = [
      B([-6, -22, -6], [6, 2, 6], tunic),
      B([-7, -24, -7], [7, -20, 7], (x, y, z) => (y === -21 ? C.goldL : brocade(x, y, z))),
      ...lamellar([2, -12, -5], [7, -2, 5], { base: C.red, rowH: 2, pw: 3, trim: C.gold, lipZ: false }).map((b) => mirX(b, sx)),
    ];
    T['foreArm' + s] = bracer(C.skin, [C.black, C.blackL, C.gold]);
    T['hand' + s] = hand(sx, C.skin, C.skinD);
    // dark trousers, crimson tassets over the outside of the thigh
    T['thigh' + s] = [
      B([-7, -36, -7], [7, 2, 7], (x, y) => (md(y + (x & 1), 6) === 0 ? C.pantsD : C.pants)),
      B([-8, -31, -8], [8, -20, 8], (x, y) => (md(y - x, 5) === 0 ? C.pantsD : C.pants)),
      ...lamellar([-4, -17, -7], [9, 0, 8], { base: C.red, rowH: 2, pw: 3, trim: C.gold, jag: true }).map((b) => mirX(b, sx)),
    ];
    // cream leg wraps wound on the diagonal, crimson garters, a lacquered shin plate, gold knee boss
    T['shin' + s] = [
      B([-6, -34, -6], [6, 0, 6], (x, y, z) => (md(y + (x + z) * 0.5 | 0, 4) === 0 ? C.wrapD : C.wrap)),
      B([-7, -4, -7], [7, 2, 7], C.pants), B([-7, -6, -7], [7, -4, 7], C.red), B([-7, -33, -7], [7, -31, 7], C.red),
      ...lamellar([-5, -27, 3], [5, -9, 7], { base: C.red, rowH: 3, pw: 3, trim: C.gold }),
      B([-2, -8, 6], [2, 0, 9], (x, y) => (y === -8 ? C.goldD : C.gold)),
    ];
    // bare foot on a leather sandal: sole, a strap over the instep, a toe strap
    T['foot' + s] = [
      ...boot(C.skin, C.skinD, C.leather),
      P([-7, -1, 2], [8, 2, 6], C.leatherL), P([-7, -5, 9], [8, -3, 12], C.leatherL),
    ];
  }
  return T;
}

/** Rounded crimson shoulder guards: lacquered rows with gold lips under a gold-rimmed cap. Authored with +x outward. */
const pauldron = (sx) => [
  ...lamellar([-1, -5, -8], [8, 1, 8], { base: C.red, rowH: 3, pw: 4, trim: C.gold, jag: true }),
  ...lamellar([-3, 1, -8], [7, 5, 8], { base: C.red, rowH: 2, pw: 4 }),
  B([-4, 5, -8], [7, 7, 8], (x, y, z) => (x === 6 || Math.abs(z + 0.5) > 7 ? (md(x + z, 3) ? C.gold : C.goldL) : y === 6 ? C.red : C.redD)),
].map((b) => mirX(b, sx));

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const hair = (x, y, z) => (md(x * 3 + z + y * 2, 7) === 0 ? C.hairH : C.hair);
  // khăn: crimson cloth, folds crossing in a chevron over the brow, gold hems top and bottom
  const khan = (x, y, z) => {
    if (y === 12) return C.gold;
    if (y === 17) return C.goldD;
    const f = z > 3 ? y - Math.abs(x - 0.5) * 0.6 : y + (x + z) * 0.4;
    return md(Math.round(f), 3) === 0 ? C.redD : md(Math.round(f), 3) === 1 ? C.red : C.redL;
  };
  return [
    // skull, a strong square jaw, cheekbones
    B([-6, 3, -6], [7, 14, 6], C.skin),
    B([-6, 0, -4], [7, 4, 5], C.skin), B([-7, 2, -5], [8, 6, 5], C.skin),
    ...symH(4, 7, 5, 7, 5, 6, C.skinH),
    ...symH(6, 8, 1, 4, 3, 5, C.skinD),
    // hair: the nape and short sideburns under the wrap
    B([-7, 4, -7], [8, 13, -3], hair), ...symH(6, 8, 6, 11, -3, 2, C.hair, false),
    ...symH(7, 8, 6, 10, -1, 2, C.skinD),                                          // ears
    // brows lifting at the ends, level eyes (white, dark iris toward the nose, the lid), a brow-ridge shade
    ...symH(1, 4, 10, 11, 5, 7, C.hair, false), ...symH(4, 7, 11, 12, 5, 7, C.hair, false),
    ...symH(2, 5, 7, 9, 5, 6, C.scl), ...symH(2, 4, 7, 9, 5, 6, C.iris), ...symH(2, 3, 7, 9, 5, 6, C.eye),
    ...symH(2, 6, 9, 10, 5, 6, C.skinD), ...symH(5, 6, 8, 9, 5, 6, C.eye),
    P([0, 9, 5], [1, 11, 6], C.skinD),
    // straight nose, a firm mouth, a short moustache and a small chin tuft
    B([-1, 6, 6], [2, 9, 8], C.skinH), B([-1, 4, 7], [2, 6, 9], C.skin), P([-1, 4, 8], [0, 5, 9], C.skinD), P([1, 4, 8], [2, 5, 9], C.skinD),
    P([-2, 2, 5], [3, 3, 6], C.lip),
    B([-2, 3, 6], [3, 4, 7], C.hair), ...symH(3, 4, 3, 4, 5, 7, C.hair, false),
    B([0, -1, 4], [1, 1, 6], C.hair),
    // the wrap round the head (over the brow and the crown's rim), the knot at the back (tails: chains)
    B([-7, 12, -7], [8, 18, 7], khan),
    B([-6, 18, -6], [7, 19, 5], khan),
    B([-2, 11, -9], [3, 16, -7], C.redD), P([-2, 13, -9], [3, 14, -8], C.gold),
    // topknot ringed by the gold sun-ray crown (a red gem in front), the gold pin through it
    B([-2, 18, -3], [3, 23, 2], hair),
    B([-3, 18, -4], [4, 21, 3], (x, y) => (y === 20 ? C.goldL : C.gold)),
    B([-3, 21, -4], [4, 23, 3], (x, y, z) => ((x === -3 || x === 3 || z === -4 || z === 2) && md(x + z, 2) === 0 ? (y === 22 ? C.goldL : C.gold) : null)),
    P([0, 19, 2], [1, 20, 3], C.redL),
    B([-6, 21, -1], [7, 22, 0], C.goldL), B([-7, 20, -2], [-6, 23, 1], C.gold), B([6, 20, -2], [7, 23, 1], C.gold),
  ];
}

// ---------------------------------------------------------------- reed-banner spear (weapon joint: shaft +Z, origin = rear grip)
function weaponGeo() {
  // shaft at 0.02 (z −0.8 … 1.46): crimson lacquer, gold bands, black cord at both grips, a bronze butt cap
  const cord = (z) => (z > -6 && z < 8) || (z > 22 && z < 34);
  const shaft = vox([
    B([-1, -1, -40], [1, 1, 73], (x, y, z) => (cord(z) ? (md(z + x + y, 2) ? C.black : C.leather) : ((z >> 1) & 1) ? C.shaftH : C.shaft)),
    ...[-34, -14, 14, 44, 66].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.gold : C.goldD))),
    B([-2, -2, -40], [2, 2, -36], C.bronze), B([-1, -1, -43], [1, 1, -40], C.bronzeL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // bronze socket at 0.012 (z 1.44 … 1.64), ringed like a drum: bands of raised rings and a toothed collar
  const socket = vox([
    B([-3, -3, 120], [3, 3, 137], (x, y, z) => (md(z, 4) === 0 ? C.bronzeL : md(z, 4) === 2 ? C.bronzeD : C.bronze)),
    B([-4, -4, 122], [4, 4, 125], (x, y, z) => (md(x + y, 2) ? C.bronzeL : C.bronze)),
    B([-4, -4, 131], [4, 4, 133], C.bronzeD),
    B([-2, -2, 137], [2, 2, 139], C.gold),
  ], 0.012, { jitter: 0.05, ao: 0.35 });
  // the leaf blade at 0.011 (z 1.53 … 2.04): broad at a third, a raised dark ridge, bright edges, a bronze-gold root
  const bv = 0.011, z0 = Math.round(1.53 / bv), z1 = Math.round(2.04 / bv), boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0);
    const w = Math.max(1, Math.round(8 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.35 + 0.08)), 0.7) * (1 - u * 0.25)));
    boxes.push(B([-w, -1, z], [w, 1, z + 1], (x) => (u < 0.06 ? C.gold : Math.abs(x + 0.5) >= w - 1 ? C.edge : Math.abs(x + 0.5) < 1 ? C.fuller : C.steel)));
    if (u > 0.04 && u < 0.85) boxes.push(B([-1, -2, z], [1, 2, z + 1], (x, y) => (y === -2 || y === 1 ? C.fuller : C.steel)));
  }
  const blade = vox(boxes, bv, { jitter: 0.03, ao: 0.2 });
  return [{ geo: shaft, mat: 'body' }, { geo: socket, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
/** Reed-flower strand: soft pale fluff, every (x, z) column its own white-gold, the tip thinning to wisps. */
const reed = (i, n) => {
  const w = i === 0 ? 2 : i === n - 1 ? 1 : 2, last = i === n - 1;
  return vox([B([-w, -7, -w], [w, 0, w], (x, y, z) => {
    const k = hash01(x + 9, z + 9 + i * 3, y + 20);
    if (k < (last ? 0.45 : 0.18)) return null;
    return k > 0.82 ? C.reedD : k > 0.5 ? C.reedH : C.reed;
  })], 0.013, { jitter: 0.08, ao: 0.15 });
};
// 丁 in 8 × 11 (row 0 = top) on the pennant's first two segments
const DINH = ['XXXXXXXX', 'XXXXXXXX', '....XX..', '....XX..', '....XX..', '....XX..', '....XX..', '....XX..', '....XX..', '.X..XX..', '..XXX...'];
/** Swallow-tail pennant hanging off the shaft: crimson, a gold border at the hoist, 丁 in gold, the end forked. */
const pennant = (i, n) => {
  const last = i === n - 1;
  return vox([B([0, -6, 0], [13, 0, 1], (x, y) => {
    const g = DINH[i * 6 - y - 2]?.[x - 3];
    if (last && y <= -3 && Math.abs(x - 6) < (-2 - y) * 1.4) return null;
    if (g === 'X') return C.goldL;
    return x === 0 ? C.gold : x === 12 ? C.redD : C.red;
  })], 0.012, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.15 });
};
/** Cloak: red, the edges curling toward the body, the gold drum-sun high on the back, a gold hem. */
const cloak = (i, n) => {
  const w = 7 + i, last = i === n - 1;
  return vox([B([-w, -6, 0], [w, 0, 1], (x, y) => {
    if (last && y === -6 && hash01(x, i, 7) < 0.35) return null;
    if (last && y >= -5 && y <= -4) return y === -5 ? C.gold : C.goldD;
    if (i === 1) { const r = Math.hypot(x + 0.5, y + 3), c = sun(r, Math.atan2(y + 3, x + 0.5), 3.3); if (c != null) return c; }
    return x === -w || x === w - 1 ? C.redD : md(x + y * 3, 7) === 0 ? C.tunic : C.red;
  }), B([-w, -6, 1], [-w + 1, 0, 2], C.redD), B([w - 1, -6, 1], [w, 0, 2], C.redD)], 0.025, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.25 });
};
/** Tunic panel (front / back): madder, gold-edged, a gold hem. */
const panel = (i, n) => vox([B([-4, -8, 0], [4, 0, 1], (x, y) => (i === n - 1 && y <= -7 ? (y === -8 && x & 1 ? null : C.gold)
  : x === -4 || x === 3 ? C.gold : tunic(x, y, i)))], FV * 1.2, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.2 });
/** Wrap / sash tail: a cloth strip c (shaded edge d), the end in e. */
const tail = (c, d, e) => (i, n) => vox([B([-2, -6, 0], [2, 0, 1], (x, y) => (i === n - 1 && y <= -4 ? (y === -6 && (x === -2 || x === 1) ? null : e) : x === -2 ? d : c))],
  FV, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.15 });

export const DINHBOLINH_DEF = {
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const legs = [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]];
    return [
      { joint: 'chest', anchor: [0, 0.235, -0.165], rest: [0, -1, 0.12], n: 6, len: 0.135, stiff: 0.16, drag: 0.22, wind: 1.2, cone: 80, sway: 0.22,
        seg: cloak, hit: ['chest', 'hips', ...legs] },
      { joint: 'hips', anchor: [0, -0.01, 0.14], rest: [0, -1, 0.1], n: 3, len: 0.115, stiff: 0.12, drag: 0.14, wind: 0.4, face: [0, 0, 1], cone: 70, sway: 0.08,
        seg: panel, hit: legs },
      { joint: 'hips', anchor: [0, -0.01, -0.14], rest: [0, -1, -0.12], n: 3, len: 0.115, stiff: 0.12, drag: 0.14, wind: 0.4, face: [0, 0, -1], cone: 70, sway: 0.08,
        seg: panel, hit: ['hips', ...legs] },
      // the wrap's two tails from the knot behind; the sash's two from the knot on the left hip
      ...[-1, 1].map((sx) => ({ joint: 'head', anchor: [sx * 1.5 * HV, 13.5 * HV, -9 * HV], rest: [sx * 0.25, -1, -0.45], n: 4, len: 0.07,
        stiff: 0.05, drag: 0.08, wind: 1.9, cone: 110, sway: 0.5, face: [0, 0, -1], seg: tail(C.red, C.redD, C.gold), hit: ['head', ['chest', 0.03]] })),
      ...[0, 1].map((k) => ({ joint: 'hips', anchor: [0.15 + k * 0.015, -0.01, 0.115 - k * 0.03], rest: [0.25, -1, 0.15], n: 3, len: 0.075,
        stiff: 0.08, drag: 0.12, wind: 0.7, cone: 70, sway: 0.15, face: [1, 0, 0], seg: tail(C.gold, C.goldD, C.red), hit: [['thighL', 0.03]] })),
      // bông lau: the reed plume round the socket, light and floating
      ...Array.from({ length: 7 }, (_, k) => {
        const a = k * 0.8976, ox = Math.cos(a) * 0.02, oy = Math.sin(a) * 0.02;
        return { joint: 'weapon', anchor: [ox, oy, 1.45], rest: [ox * 14, oy * 6 - 1, -0.5], n: 3, len: 0.07, stiff: 0.04 + k * 0.004, drag: 0.1, wind: 1.6,
          grav: 0.6, cone: 140, sway: 0.3, face: [1, 0, 0], seg: reed };
      }),
      // the 丁 pennant, below the plume
      { joint: 'weapon', anchor: [0, 0.015, 1.12], rest: [0, -1, -0.15], n: 3, len: 0.072, stiff: 0.1, drag: 0.1, wind: 1.4, cone: 120, sway: 0.25,
        face: [1, 0, 0], seg: pennant },
    ];
  },
};

// ---------------------------------------------------------------- HUD portrait (20 × 20): the gold sun-ray crown on the
// topknot, the crimson wrap with its gold hem, a tanned square-jawed face, lifted brows, short moustache; crimson
// lamellar with the gold drum-sun, the red cloak at the shoulders
export const FACE = [
  '.......Y.YY.Y.......',
  '.......YYYYYY.......',
  '.....RRRRRRRRRR.....',
  '....RRrRRRRRRrRR....',
  '...RrRRRrRRrRRRrR...',
  '...RRRrRRRRRRrRRR...',
  '...YYYYYYYYYYYYYY...',
  '...KSSSSSSSSSSSSK...',
  '..SKKKSSSSSSSSKKKS..',
  '..SSSKKKSSSSKKKSSS..',
  '..sSSWEESSSSEEWSSs..',
  '..SsSSSSSssSSSSSsS..',
  '...SsSSSSssSSSSsS...',
  '...SSSKKKKKKKKSSS...',
  '....SSSSMMMMSSSS....',
  '.....sSSSKKSSSs.....',
  '..CCYYYssssssYYYCC..',
  '.CCRRRYYggggYYRRRCC.',
  'CCRRrRRYgYYgYRRrRRCC',
  'CRRrRRRRYggYRRRRrRRC',
];
export const PAL = { Y: '#e0b04a', K: '#141010', R: '#b8281e', r: '#741812', S: '#c48a64', s: '#96643f', W: '#ece0cc', E: '#120a08',
  M: '#7e4232', g: '#f2d070', C: '#8a1c16' };
