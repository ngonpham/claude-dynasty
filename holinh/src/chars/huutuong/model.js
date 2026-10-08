// 右將 Hữu Tướng, the Right General (def-kit model: src/chars/defkit.js header), fine voxels (src/chars/parts.js FV) on
// the shared rig at the default size — a lean, long-boned veteran (narrow waist, spare shoulders), built from the
// comic's HUU_TUONG token. A long weathered face, hollow cheeks under high cheekbones, grave deep-set eyes beneath
// straight heavy brows, a long straight nose, a thin set mouth, a short grey-black stubble over the jaw and lip; an old
// pale scar from his left brow (it notches the brow) past the outer corner of the eye down the cheekbone. Shoulder-
// length black hair streaked with grey (heaviest at the temples), half of it gathered in a small knot behind the crown
// with a leather tie, the rest loose: a fringe of strands over the brow, the sides over the ears, the back falling to
// the shoulders (strands: chains). Near-black brown leather lamellar riveted in iron — a cuirass of deep rows with an
// iron rivet on every plate lip, a round iron heart-mirror (hộ tâm kính) ringed in rivets, the dark-indigo under-robe's
// crossed collar at the throat, the indigo cloak folded over both shoulders and fastened by iron rings behind them —
// modest two-tier leather shoulder guards, dark sleeves under leather arm guards, leather bracers lipped in iron, black
// gloves. A broad leather belt riveted in iron with a plain square iron buckle, leather tassets round the sides and
// back, a leather fauld in front (a chain); dark trousers tucked into tall riding boots with a strap and buckle. Behind:
// the long indigo cloak, darker border, worn at the hem (a chain). Weapon: the trường đao — a long dark ash haft wound
// in black cord at both grips and banded in iron, an iron butt spike, a dark iron disc guard with a collar, and a slim
// curved single-edged blade (edge = local +Y, the curve sweeping back toward the spine at the point, a dark line along
// the back, a bright edge band), a red-and-white cord tassel knotted under the guard (chains).
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xae7a56, skinD: 0x86583c, skinH: 0xc28e68, scar: 0xd8a490, lip: 0x6a3428, mouth: 0x1e0c0a, eye: 0x0c0908, scl: 0xd8ccc0,
  stub: 0x5e4a40, stubL: 0x7a6a62,                                       // grey-black stubble over the skin
  hair: 0x131113, hairH: 0x2a2629, grey: 0x8a8884, greyL: 0xb6b4ae,
  lea: 0x3a2a20, leaD: 0x221812, leaL: 0x4e3a2c, glove: 0x1c1614,
  iron: 0x5a5e66, ironD: 0x34363c, ironL: 0x9aa0aa, rivet: 0x70747c,
  ind: 0x283a6c, indD: 0x18244a, indL: 0x3a5292,                        // the indigo-blue cloak
  robe: 0x1e2232, robeD: 0x12141e, robeL: 0x2c3246,                     // dark-indigo under-robe, sleeves
  pants: 0x221f1e, pantsD: 0x151312, boot: 0x1c1612, bootD: 0x100c0a,
  ash: 0x2e2018, ashH: 0x44301f, cord: 0x141012, cordL: 0x2a2224,
  steel: 0xbcc4ce, edge: 0xf2f6fa, back: 0x5c646e, red: 0xb02a22, redD: 0x7a1814, white: 0xe6e0d4, whiteD: 0xb4ac9e,
};
const hairP = (x, y, z) => {
  const s = md(x * 3 + (z >> 1), 11);
  if (Math.abs(x) >= 7 && y < 13) return hash01(x, y, z) < 0.55 ? C.greyL : C.grey;     // grey heaviest at the temples
  return s === 0 || s === 6 ? C.grey : s === 3 ? C.greyL : hash01(x, y, z + 5) < 0.12 ? C.hairH : C.hair;
};
const cloth = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.indL : md(x - y * 2 + z, 9) === 0 ? C.indD : C.ind);
const robe = (x, y, z) => (md(x * 2 + y + z * 3, 13) === 0 ? C.robeL : C.robe);
/** Iron rivets on the lip of every other lamellar row (one per two plates), a paint over the lips just outside a box. */
const rivets = (a, b, rowH, pw = 4) => P([a[0] - 1, a[1], a[2] - 1], [b[0] + 1, b[1], b[2] + 1],
  (x, y, z) => (md(y - a[1], rowH * 2) === rowH && md(x + z + 2, pw * 2) === 0 ? C.rivet : null));
const leather = (a, b, o) => [...lamellar(a, b, { base: C.lea, ...o }), rivets(a, b, o.rowH, o.pw)];

// ---------------------------------------------------------------- body (FV, centred on the joints)
/** The heart-mirror at depth z: an iron disc, a bright rim, a ring of rivets and a raised boss, centred (0, cy). */
function mirror(cy, z) {
  return B([-5, cy - 5, z], [5, cy + 5, z + 2], (x, y, zz) => {
    const dx = x + 0.5, dy = y + 0.5 - cy, r = Math.hypot(dx, dy);
    if (r > 5) return null;
    const rivet = Math.abs(r - 3.3) < 0.6 && md(Math.round(Math.atan2(dx, dy) * 8 / Math.PI), 2) === 0;
    if (zz === z + 1) return rivet || r < 1.6 ? C.ironL : null;
    return r > 4.2 ? C.ironL : C.iron;
  });
}

function torso() {
  const T = {};
  // hips: the dark under-robe's skirt (front cut for the stride: the fauld is a chain), leather tassets round the sides
  // and back, the riveted belt and its square iron buckle
  T.hips = [
    B([-11, -10, -8], [11, 6, 8], C.robeD),
    B([-13, -15, -10], [13, -1, 10], (x, y, z) => (z > 5 && y < -6 ? null : y === -15 ? C.robeD : robe(x, y, z))),
    ...leather([-14, -17, -10], [14, -2, 5], { rowH: 3, pw: 4, trim: C.iron, jag: true, lipZ: false }),
    B([-14, -2, -10], [14, 4, 10], (x, y, z) => (y === -2 || y === 3 ? C.leaD : y === 0 && md(x + z, 4) === 0 ? C.ironL : C.lea)),
    B([-3, -3, 10], [3, 5, 12], (x, y) => (Math.abs(x + 0.5) > 2 || y === -3 || y === 4 ? C.ironL : C.iron)), P([-1, 0, 11], [1, 2, 12], C.ironD),
  ];
  // waist: lean, leather belly rows over the robe, a dark band under the cuirass
  T.spine = [
    B([-10, -6, -8], [10, 14, 8], C.leaD),
    ...leather([-10, -4, -8], [10, 10, 8], { rowH: 2, pw: 3 }),
    B([-11, 10, -9], [11, 14, 9], (x, y) => (y === 10 ? C.leaD : robe(x, y, 0))),
  ];
  // chest: the cuirass (two bands of rows), the heart-mirror, the robe's crossed collar, a leather collar rim; the cloak
  // folded over the tops of both shoulders and its iron rings behind
  T.chest = [
    B([-14, -4, -10], [14, 18, 10], C.leaD),
    ...leather([-14, -3, -10], [14, 5, 10], { rowH: 2, pw: 3 }),
    ...leather([-15, 5, -11], [15, 17, 11], { rowH: 3, pw: 4, trim: C.iron }),
    mirror(9, 11),
    B([-7, 13, 9], [7, 19, 12], (x, y) => (Math.abs(x + 0.5) < (y - 11) * 0.9 ? (Math.abs(x + 0.5) > (y - 11) * 0.9 - 1.6 ? C.indD : C.robeL) : null)),
    B([-9, 16, -9], [9, 21, 9], (x, y, z) => (y === 20 ? C.leaL : z > 3 && Math.abs(x + 0.5) < 5 ? null : C.lea)),
    ...[-1, 1].map((sx) => mirX(B([5, 16, -12], [15, 20, -2], (x, y, z) => (y === 16 && hash01(x, y, z) < 0.3 ? null : cloth(x, y, z))), sx)),
    ...[-1, 1].map((sx) => mirX(B([7, 14, -13], [11, 18, -11], (x, y) => (y === 14 || y === 17 ? C.ironL : C.iron)), sx)),
    B([-6, 15, -6], [6, 26, 6], -1),                                                          // neck hole
  ];
  T.neck = [B([-5, -2, -5], [5, 6, 5], C.skinD), P([-5, 1, 4], [5, 6, 5], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // dark sleeve, a leather arm guard riveted in iron
    T['upperArm' + s] = [
      B([-5, -24, -5], [6, 2, 6], robe), B([-6, -20, -6], [7, -9, 7], robe),
      ...leather([-6, -17, -6], [7, -6, 7], { rowH: 2, pw: 3, trim: C.iron }),
    ];
    T['foreArm' + s] = bracer(C.robeD, [C.lea, C.leaD, C.iron]);
    T['hand' + s] = glove(sx, C.glove, C.leaD);
    // dark trousers, leather tassets over the outside of the thigh
    T['thigh' + s] = [
      B([-7, -36, -7], [7, 2, 7], (x, y) => (md(y + (x & 1), 6) === 0 ? C.pantsD : C.pants)),
      ...leather([-4, -18, -8], [9, 0, 8], { rowH: 3, pw: 4, trim: C.iron, jag: true }).map((b) => mirX(b, sx)),
    ];
    // tall riding boots to under the knee (a darker cuff, a strap with an iron buckle), the trousers bagging over them
    T['shin' + s] = [
      B([-6, -34, -6], [6, -5, 6], (x, y, z) => (z > 3 && md(y, 7) === 0 ? C.bootD : C.boot)),
      B([-7, -7, -7], [7, -4, 7], C.bootD),
      B([-7, -4, -7], [7, 2, 7], (x, y) => (md(y + (x & 1), 4) === 0 ? C.pantsD : C.pants)),
      B([-7, -16, -7], [7, -14, 7], (x, y, z) => (Math.abs(x) + Math.abs(z) > 9 ? null : C.leaL)),
      mirX(B([5, -17, -2], [7, -13, 2], (x, y) => (y === -17 || y === -14 ? C.ironL : C.iron)), sx),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD, { trim: C.leaL });
  }
  return T;
}

/** Modest leather shoulder guards: two tiers of riveted rows, iron-lipped. +x outward. */
const pauldron = (sx) => [
  ...leather([-2, -5, -9], [9, 1, 9], { rowH: 3, pw: 4, trim: C.iron, jag: true }),
  ...leather([-4, 1, -9], [8, 7, 9], { rowH: 3, pw: 4, trim: C.iron }),
  B([-4, 7, -8], [7, 9, 8], (x, y, z) => (md(x + z, 3) === 0 ? C.ironL : C.leaL)),
].map((b) => mirX(b, sx));

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const scarAt = [[2, 12], [3, 11], [4, 10], [5, 9], [5, 8], [6, 7], [6, 6], [6, 5], [5, 4], [5, 3]];
  return [
    // a long lean face: narrow jaw, hollow cheeks under high cheekbones, ears
    B([-7, 2, -6], [8, 14, 6], C.skin), B([-6, -2, -4], [7, 3, 5], C.skin), B([-4, -3, -2], [5, -2, 4], C.skin),
    ...symH(4, 7, 6, 7, 5, 6, C.skinH), ...symH(4, 7, 2, 5, 5, 6, C.skinD),
    ...symH(7, 8, 5, 10, -2, 1, C.skinD),
    // stubble over the jaw, chin and upper lip (under the lips and the scar)
    P([-8, -4, -4], [9, 5, 7], (x, y, z) => (y > 3 || (y > 1 && Math.abs(x) > 3 && z > 4) ? null : (z > 1 || Math.abs(x) > 4) && hash01(x, y, z) < 0.6
      ? (hash01(z, x, y) < 0.3 ? C.stubL : C.stub) : null)),
    // grave deep-set eyes under straight heavy brows; the lids in shade
    ...symH(2, 5, 7, 8, 5, 6, C.scl), ...symH(3, 4, 7, 8, 5, 6, C.eye), ...symH(2, 5, 8, 9, 5, 6, C.skinD), ...symH(2, 5, 6, 7, 5, 6, C.skinD),
    ...symH(1, 6, 9, 11, 5, 7, (x, y) => (y === 10 && Math.abs(x) > 3 ? C.grey : C.hair), false),
    P([0, 9, 5], [1, 12, 6], C.skinD),
    // a long straight nose, a thin set mouth
    B([-1, 5, 6], [2, 9, 7], C.skin), B([-1, 4, 6], [2, 6, 8], C.skinH), P([-1, 4, 7], [0, 5, 8], C.skinD), P([1, 4, 7], [2, 5, 8], C.skinD),
    P([-2, 1, 4], [3, 2, 6], C.lip), P([-2, 2, 4], [3, 3, 6], C.mouth),
    // the old scar from the left brow past the eye's outer corner down the cheekbone
    ...scarAt.map(([x, y]) => P([x, y, 4], [x + 1, y + 1, 8], C.scar)),
    // hair: crown and back, a fringe of loose strands over the brow, the sides falling over the ears, the knot behind
    B([-8, 11, -8], [9, 17, 7], (x, y, z) => (z > 4 && y < 13 && Math.abs(x) < 6 && !(y === 12 && md(x, 4) === 1) ? null : hairP(x, y, z))),
    B([-7, 17, -7], [8, 19, 6], hairP), B([-4, 19, -4], [5, 20, 3], hairP),
    B([-8, 2, -9], [9, 13, -5], hairP),
    B([-9, 3, -6], [-7, 13, 4], hairP), B([8, 3, -6], [10, 13, 4], hairP),
    B([-3, 10, 6], [-1, 12, 7], hairP), B([2, 9, 6], [3, 12, 7], hairP),
    B([-2, 15, -11], [3, 19, -7], hairP), P([-2, 15, -10], [3, 16, -8], C.lea), P([-2, 18, -11], [3, 19, -9], C.lea),
  ];
}

// ---------------------------------------------------------------- trường đao (weapon joint: shaft +Z, origin = rear grip)
function weaponGeo() {
  // haft at 0.02 (z −0.92 … 1.38): dark ash, black cord at both grips, iron bands, an iron butt spike
  const grip = (z) => (z > -6 && z < 8) || (z > 24 && z < 38);
  const shaft = vox([
    B([-1, -1, -43], [1, 1, 69], (x, y, z) => (grip(z) ? (md(z + x + y, 2) ? C.cord : C.cordL) : md(z + x, 7) === 0 ? C.ashH : C.ash)),
    ...[-38, -12, 14, 44, 62].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.ironL : C.ironD))),
    B([-2, -2, -46], [2, 2, -43], C.iron), B([-1, -1, -49], [1, 1, -46], C.ironL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // the guard at 0.011 (z 1.36 … 1.46): a ringed iron collar, a dark iron disc (oval, longer along the edge), a bright rim
  const guard = vox([
    B([-3, -3, 124], [3, 4, 131], (x, y, z) => (md(z, 3) === 0 ? C.ironL : C.ironD)),
    B([-4, -6, 131], [4, 8, 133], (x, y) => {
      const r = Math.hypot((x + 0.5) / 4, (y - 0.5) / 7);
      return r > 1 ? null : r > 0.82 ? C.ironL : C.ironD;
    }),
    B([-2, -2, 133], [2, 4, 135], C.iron),
  ], 0.011, { jitter: 0.04, ao: 0.3 });
  // the blade at 0.011 (z 1.48 … 2.2, 2 voxels thick): slim, the centre line sweeping back toward −Y (the spine) along
  // its length, the edge on +Y, a clipped point on the back; dark spine line, bright edge band
  const bv = 0.011, z0 = Math.round(1.48 / bv), z1 = Math.round(2.2 / bv), boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0), c = -8 * u * u;
    const back = Math.round(c - 2 + (u > 0.86 ? (u - 0.86) / 0.14 * 4.5 : 0)), front = Math.round(c + 4.5 - 1.2 * u - (u > 0.9 ? (u - 0.9) / 0.1 * 1.8 : 0));
    if (front <= back) continue;
    boxes.push(B([-1, back, z], [1, front, z + 1], (_, y) => (u < 0.03 ? C.ironD : y >= front - 2 ? C.edge : y === back ? C.back : C.steel)));
  }
  const blade = vox(boxes, bv, { jitter: 0.03, ao: 0.2 });
  return [{ geo: shaft, mat: 'body' }, { geo: guard, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
/** The cloak: indigo, a darker border down both edges and along the hem, dark lining, a few worn notches at the hem. */
function cloakSeg(i, n) {
  const w = 13 + i, last = i === n - 1, out = [];
  for (let y = -13; y < 0; y++) for (let x = -w; x < w; x++) {
    const X = Math.abs(x + 0.5);
    if (last && y < -11 + (hash01(x, 7, 3) < 0.25 ? 3 : 0)) continue;
    const c = X > w - 3 || (last && y < -8) ? C.indD : cloth(x, y - i * 13, 0);
    out.push(B([x, y, 0], [x + 1, y + 1, 2], c), B([x, y, -1], [x + 1, y + 1, 0], C.robeD));
  }
  return vox(out, FV, { jitter: 0.02, ao: 0.16 });
}
/** The front fauld: leather rows riveted in iron, the last one iron-lipped. */
const fauldSeg = (i, n) => vox([B([-6, -10, 0], [6, 0, 2], (x, y) => {
  const row = md(y, 3) === 0, last = i === n - 1 && y === -10;
  return last ? C.iron : row ? (md(x + i, 4) === 0 ? C.ironL : C.leaL) : md(x + (Math.floor(y / 3) & 1) * 2, 4) === 0 ? C.leaD : C.lea;
})], FV, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.2 });
/** A lock of shoulder-length hair: black streaked grey (by column), tapering and frayed at the end. */
const hairSeg = (i, n) => vox([B([-2, -6, -1], [2, 0, 1], (x, y, z) => {
  if (i === n - 1 && y < -3 && hash01(x + 4, z + 4, 9) < 0.5) return null;
  const s = md(x * 3 + i, 7);
  return s === 0 ? C.grey : s === 4 ? C.greyL : hash01(x, y + i * 6, z) < 0.15 ? C.hairH : C.hair;
})], HV, { jitter: 0.05, ao: 0.25 });
/** The tassel: red and white cord strands (k picks the colour), a knot at the top, frayed ends. */
const tassel = (k) => (i, n) => vox([B([-1, -6, -1], [2, 0, 2], (x, y, z) => {
  if (i === n - 1 && y < -3 && hash01(x + 3, z + 3, y + k) < 0.45) return null;
  const red = k & 1;
  return i === 0 && y > -2 ? C.redD : md(x + z + y, 3) === 0 ? (red ? C.redD : C.whiteD) : red ? C.red : C.white;
})], 0.011, { jitter: 0.05, ao: 0.2 });

export const HUUTUONG_DEF = {
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const legs = [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]];
    const out = [];
    // the cloak from the rings behind the shoulders (long, to the calves), the front fauld
    out.push({ joint: 'chest', anchor: [0, 0.2, -0.16], rest: [0, -1, -0.16], n: 6, len: 0.16, stiff: 0.16, drag: 0.2, wind: 1.1, cone: 76, sway: 0.18,
      face: [0, 0, -1], seg: cloakSeg, hit: ['chest', 'hips', 'thighL', 'thighR', 'kneeL', 'kneeR'] });
    out.push({ joint: 'hips', anchor: [0, -0.02, 0.14], rest: [0, -1, 0.1], n: 2, len: 0.125, stiff: 0.14, drag: 0.16, wind: 0.3, face: [0, 0, 1], cone: 66, sway: 0.05,
      seg: fauldSeg, hit: legs });
    // loose shoulder-length hair: five locks down the back, one in front of each ear
    for (const x of [-6, -3, 0, 3, 6]) out.push({ joint: 'head', anchor: [x * HV, 5 * HV, -8 * HV], rest: [x * 0.04, -1, -0.3], n: 3, len: 0.055,
      stiff: 0.1, drag: 0.12, wind: 1.2, cone: 80, sway: 0.2, face: [0, 0, -1], seg: hairSeg, hit: ['head', ['chest', 0.03]] });
    for (const sx of [-1, 1]) out.push({ joint: 'head', anchor: [sx * 8.5 * HV, 4 * HV, 1 * HV], rest: [sx * 0.25, -1, 0.1], n: 2, len: 0.05,
      stiff: 0.12, drag: 0.12, wind: 0.9, cone: 60, sway: 0.12, face: [sx, 0, 0], seg: hairSeg, hit: ['head', ['chest', 0.03]] });
    // the red-and-white cord tassel under the guard
    for (let k = 0; k < 4; k++) {
      const a = k * 1.5708 + 0.3, ox = Math.cos(a) * 0.014, oy = Math.sin(a) * 0.014;
      out.push({ joint: 'weapon', anchor: [ox, oy, 1.35], rest: [ox * 10, oy * 5 - 1, -0.3], n: 3, len: 0.065, stiff: 0.05 + k * 0.005, drag: 0.12, wind: 0.8,
        cone: 130, sway: 0.15, face: [1, 0, 0], seg: tassel(k) });
    }
    return out;
  },
};

// ---------------------------------------------------------------- HUD portrait (20 × 20): shoulder-length black hair
// streaked grey, the scar through his left brow down the cheek, grave eyes, grey-black stubble on a long jaw; the indigo
// cloak over dark riveted leather, the robe's collar, the iron heart-mirror
export const FACE = [
  '....................',
  '......KKKKKKKK......',
  '....KKKgKKKKKgKK....',
  '...KKgKKKKKKKKKgK...',
  '...KgKKKKKKKKKKKgK..',
  '..KKKSSSSSSSSSSSKK..',
  '..KgSbbbSSSSbbxSgK..',
  '..KKSsWESSSSEWsxKK..',
  '..KgSSSSSnSSSSSxgK..',
  '..KKsSSSSnnSSSSxKK..',
  '..KgssSSSSSSSSsxgK..',
  '..KKsdSSmmmmSSdsKK..',
  '..KgKddddddddddKgK..',
  '..KKK.dddddddd.KKK..',
  '..KgK...ssss...KgK..',
  '..KK...ssssss...KK..',
  'IIIKLLLLUssULLLLKIII',
  'IiIILlLLLUULLLlLIIiI',
  'IIiILLrLLOOLLrLLIiII',
  'IIIILlLLOooOLLlLIIII',
];
export const PAL = { K: '#131113', g: '#9a9892', S: '#ae7a56', s: '#86583c', n: '#c28e68', b: '#1e1a1c', W: '#d8ccc0', E: '#0c0908',
  x: '#d8a490', d: '#5e4a40', m: '#6a3428', I: '#283a6c', i: '#18244a', L: '#2c201a', l: '#1a120e', U: '#2c3246', r: '#9aa0aa',
  O: '#5a5e66', o: '#9aa0aa' };
