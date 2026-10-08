// Dương Hoàng hậu (楊后, Dương Vân Nga) — the queen of Hoa Lư who keeps the court whole after 979 (Màn II escort, Màn VI
// the 49th-day rite); sword class, but she never fights (role 'npc' only: she follows or holds). NPC entry (contract:
// src/chars/npc/index.js) with her own model def (src/chars/npc/kit.js header; fine voxels, chars/parts.js FV), at a
// woman's size (scale 1.0), and a 20×20 portrait.
// A regal queen in her late thirties, slim and upright (narrow shoulders, no armour): an oval face, pale, composed and
// sorrowful — the eyes a little lowered under brows that lift at their inner ends, a small red mouth, a red mark between
// the brows. Black hair drawn up from a centre parting into a high court bun ringed in gold, a gold phoenix hairpin
// rising at its front (spread wings, a red gem), a gold pin across it hung with gold bead strings that end in red drops
// (chains). The black-and-red lacquered phoenix robe: a red outer robe sown with gold phoenix-and-cloud embroidery,
// the crossed collar and every edge trimmed in black lacquer-sheen silk with a gold line, a white inner collar in the V;
// a high black sash with gold edges; wide red sleeves whose cuffs droop below the wrists (chains), white inner cuffs;
// the robe's skirt in four long panels to the ground, the back one trailing behind her with a gold phoenix across it
// (chains); small black shoes with curled gold-trimmed toes. The class weapon is a folded court fan held at rest: black
// lacquer guards inlaid with gold, the red-and-gold leaves showing at its edge, a gold rivet, a red silk tassel — in the
// sword idle she holds it closed before her in both hands.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as SWORD from '../../../../src/chars/npc/sword.js';
import { vox, B, P, md } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, hand, boot, symH } from '../../../../src/chars/parts.js';

const HV = 0.0125;
const C = {
  skin: 0xe4b896, skinD: 0xc0916e, skinH: 0xf0cbac, blush: 0xe0a088, lip: 0xb02a24, lash: 0x1a1010, eye: 0x140c0a, iris: 0x3a2418, scl: 0xf0e8dc,
  hair: 0x0e0b0b, hairH: 0x2a2224,
  red: 0xa81e18, redD: 0x6c120e, redL: 0xcc3424,                        // the outer robe
  gold: 0xd8a83e, goldD: 0x8a6420, goldL: 0xf6d878,
  black: 0x120d0d, blackL: 0x3c2c2c, blackS: 0x5a4648,                  // black lacquer-sheen silk
  white: 0xf2ede2, whiteD: 0xcac2b2,
  gem: 0xd02a2a,
};
/** The red outer robe with gold phoenix-and-cloud embroidery: small curled gold motifs in a staggered lattice. */
const robe = (x, y, z) => {
  const cx = md(x + z + (md(Math.floor(y / 7), 2) ? 4 : 0), 8), cy = md(y, 7);
  if ((cx === 2 && cy === 3) || (cx === 3 && cy === 4) || (cx === 4 && cy === 3)) return C.gold;
  if (cx === 3 && cy === 2) return C.goldD;
  return md(x * 2 + y + z * 3, 11) === 0 ? C.redL : md(x - y * 2 + z, 9) === 0 ? C.redD : C.red;
};
/** Black lacquer-sheen trim with a gold line on its lower edge (row y0). */
const trim = (y0) => (x, y, z) => (y === y0 ? C.gold : md(x + y + z, 5) === 0 ? C.blackS : md(x - z, 3) === 0 ? C.blackL : C.black);

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: the robe flaring from a high waist (the skirt panels are chains), a black trim band at the waist seam
  T.hips = [
    B([-11, -10, -8], [11, 6, 8], C.redD),
    B([-13, -16, -10], [13, 3, 10], robe),
    B([-13, 3, -10], [13, 6, 10], trim(3)),
  ];
  // waist: the robe under the high black sash (gold edges), the sash's knot plate in front
  T.spine = [
    B([-10, -6, -8], [10, 14, 8], robe),
    B([-11, 5, -9], [11, 13, 9], (x, y, z) => (y === 5 || y === 12 ? C.gold : trim(-99)(x, y, z))),
    B([-3, 6, 9], [4, 12, 10], (x, y) => (y === 6 || y === 11 || x === -3 || x === 3 ? C.goldD : C.gold)), P([-1, 8, 9], [2, 10, 10], C.gem),
  ];
  // chest: slim, the robe's black lapels (gold-edged) meeting in a V over the white inner collar
  const collar = (x, y, z) => {
    if (z < 7) return null;
    const lap = (d) => (d < 1.5 ? (md(x + y, 5) === 0 ? C.blackS : C.black) : d < 2.4 ? C.gold : null);
    if (y < 8) return lap(Math.abs(x + 0.5 - (8 - y) * 0.9));                    // below the V the left lapel crosses over
    const hw = (y - 8) * 0.6, ax = Math.abs(x + 0.5);
    return ax < hw - 1 ? C.white : lap(Math.abs(ax - hw + 0.5));
  };
  T.chest = [
    B([-12, -4, -10], [12, 18, 10], robe),
    B([-12, -4, -11], [12, 18, 11], collar, true),
    B([-8, 16, -8], [8, 22, 8], (x, y, z) => (z > 4 && Math.abs(x + 0.5) < 3.5 ? (y === 21 ? C.whiteD : C.white) : y === 21 ? C.gold : C.black)),   // standing collar
    B([-5, 15, -5], [5, 25, 5], -1),
  ];
  T.neck = [B([-4, -2, -4], [4, 7, 4], C.skinD), P([-4, 1, 3], [4, 7, 4], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // red sleeves, slim at the shoulder and widening to the wrist; at the wrist a black trimmed cuff, the white inner sleeve and the hand
    T['upperArm' + s] = [B([-5, -10, -5], [6, 2, 6], robe), B([-7, -24, -7], [7, -10, 7], robe), B([-6, -12, -6], [7, -9, 7], robe)];   // sloping shoulder, the sleeve widening
    T['foreArm' + s] = [
      B([-8, -20, -8], [8, 1, 8], robe),
      B([-8, -24, -8], [8, -20, 8], trim(-24)),
      B([-5, -26, -5], [5, -24, 5], (x, y, z) => (Math.abs(x) + Math.abs(z) > 7 ? null : C.white)),
    ];
    T['hand' + s] = hand(sx, C.skin, C.skinD);
    // the robe's skirt over each leg (four long panels hang over it: chains), a black hem banded in gold at the ankle
    T['thigh' + s] = [B([-9, -36, -9], [9, 2, 9], robe)];
    T['shin' + s] = [
      B([-9, -31, -9], [9, 0, 9], robe),
      B([-10, -35, -10], [10, -31, 10], (x, y, z) => (y === -32 ? C.gold : trim(-99)(x, y, z))),
    ];
    T['foot' + s] = boot(C.black, C.blackL, C.black, { curl: true, trim: C.gold });
  }
  return T;
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const hair = (x, y, z) => (md(x * 3 + z + y * 2, 7) === 0 ? C.hairH : C.hair);
  return [
    // an oval face: a narrow jaw and a soft chin, ears under the hair
    B([-5, 3, -6], [6, 14, 6], C.skin),
    B([-4, 1, -4], [5, 3, 5], C.skin), B([-2, 0, -2], [3, 1, 5], C.skin),
    ...symH(3, 5, 4, 6, 5, 6, C.blush),
    ...symH(6, 7, 6, 9, -2, 1, C.skinD),
    // composed, sorrowful eyes: lowered under shaded lids, the lash at the outer corner, thin brows lifting at their
    // inner ends
    ...symH(1, 4, 7, 8, 5, 6, C.scl), ...symH(1, 3, 7, 8, 5, 6, C.iris), ...symH(1, 2, 7, 8, 5, 6, C.eye), ...symH(4, 5, 7, 8, 5, 6, C.lash),
    ...symH(1, 4, 8, 9, 5, 6, C.skinD),
    ...symH(1, 2, 10, 11, 5, 6, C.hairH), ...symH(2, 5, 9, 10, 5, 6, C.hairH),
    P([0, 10, 5], [1, 11, 6], C.gem),                                                   // the red mark between the brows
    // a fine nose, a small red mouth
    B([0, 5, 6], [1, 8, 7], C.skinH), P([0, 4, 6], [1, 5, 7], C.skinD),
    P([-1, 2, 5], [2, 3, 6], C.lip),
    // the hair from a centre parting, smoothed back over the ears to the nape
    B([-6, 11, -7], [7, 15, 6], (x, y, z) => (x === 0 && z > 0 && y > 12 ? C.skinD : y < 13 && z > 3 && Math.abs(x) < 5 ? null : hair(x, y, z))),
    B([-6, 3, -7], [7, 11, -2], hair), B([-6, 6, -2], [-5, 12, 3], hair), B([6, 6, -2], [7, 12, 3], hair),
    B([-5, 15, -6], [6, 17, 3], (x, y, z) => ((Math.abs(x) > 4 || z === -6 || z === 2) && y === 16 ? null : hair(x, y, z))),
    // the high court bun: a rounded knot set high on the crown, a gold ring at its base
    B([-3, 17, -5], [4, 26, 2], (x, y, z) => (Math.hypot(x / 3.6, (y - 21) / 4.6, (z + 1.5) / 3.6) > 1.05 ? null : hair(x, y, z))),
    B([-3, 17, -5], [4, 18, 2], (x, y, z) => (Math.abs(x) + Math.abs(z + 1.5) > 5 ? null : md(x + z, 2) ? C.gold : C.goldL)),
    // the gold phoenix hairpin at the front of the bun: a body, a crest, spread wings, a red gem
    B([-1, 18, 2], [2, 26, 4], (x, y) => (y > 23 ? C.goldL : C.gold)), P([0, 21, 3], [1, 22, 4], C.gem),
    ...[-1, 1].flatMap((sx) => Array.from({ length: 4 }, (_, i) => B([sx > 0 ? 2 + i : -2 - i, 21 + i, 2], [sx > 0 ? 3 + i : -1 - i, 24 + i, 3], i === 3 ? C.goldL : C.gold))),
    B([0, 26, 2], [1, 28, 3], C.goldL),
    // the gold pin across the bun (its bead strings hang from both ends: chains), side combs
    B([-7, 21, -3], [8, 22, -1], C.goldL), B([-8, 20, -3], [-7, 23, -1], C.gold), B([7, 20, -3], [8, 23, -1], C.gold),
    B([-5, 14, 4], [-2, 16, 6], C.gold), B([3, 14, 4], [6, 16, 6], C.gold),
  ];
}

// ---------------------------------------------------------------- the folded fan (weapon joint: +Z, origin = the grip)
function weaponGeo() {
  // 0.008 voxels, z −0.13 … 0.22: black lacquer guards inlaid with a gold line, the red-and-gold leaves at the edges and
  // the top, widening toward the top; a gold rivet at the pivot end
  const v = 0.008, z0 = Math.round(-0.13 / v), z1 = Math.round(0.22 / v), boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0), w = Math.round(1.5 + 2.5 * u);
    boxes.push(B([-w, -1, z], [w + 1, 2, z + 1], (x, y) => {
      if (z >= z1 - 2 || ((x === -w || x === w) && y === 0)) return md(x + z, 2) ? C.red : C.gold;                  // the leaves' edges
      if (y === 0) return C.redD;
      return x === 0 && u > 0.15 && u < 0.9 ? C.gold : md(x + z, 6) === 0 ? C.blackS : C.black;
    }));
  }
  const fan = vox(boxes, v, { jitter: 0.02, ao: 0.2 });
  const rivet = vox([B([-1, -2, z0 - 1], [2, 3, z0 + 2], C.goldL)], v, { jitter: 0.02, ao: 0.1 });
  return [{ geo: fan, mat: 'body' }, { geo: rivet, mat: 'metal' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
// the gold phoenix for the trailing back panel: a crested head, a long neck, spread wings, a sweeping tail (15 × 12)
const PHOENIX = [
  '......XX.......',
  '.....XXX.......',
  '......X........',
  'XX....XX....XX.',
  '.XXX..XX..XXX..',
  '..XXXXXXXXXX...',
  '...XXXXXXXX....',
  '.....XXXX......',
  '......XX.......',
  '.....X..X......',
  '....X....X.....',
  '...X......X....',
];
/** Robe panel w half-width (widening by `flare` per segment): red embroidered, black edges, a black-and-gold hem; the
 *  back panel (bird) carries the phoenix across segments 2-3. */
const panel = (w0, flare, bird = false) => (i, n) => {
  const w = w0 + Math.round(i * flare), last = i === n - 1;
  return vox([B([-w, -8, 0], [w, 0, 1], (x, y) => {
    if (last && y <= -6) return y === -8 && x & 1 ? null : y === -6 ? C.gold : C.black;
    if (x === -w || x === w - 1) return C.black;
    if (bird) { const by = (i - 2) * 8 - y - 1, bx = x + 7; if (by >= 0 && by < PHOENIX.length && bx >= 0 && bx < 15 && PHOENIX[by][bx] === 'X') return C.goldL; }
    return robe(x, y + i * 8, 0);
  })], FV * 1.2, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.18 });
};
/** The drooping sleeve cuff: red, a black-and-gold hem. */
const cuff = (i, n) => vox([B([-7, -6, 0], [7, 0, 1], (x, y) => (i === n - 1 && y <= -4 ? (y === -4 ? C.gold : C.black) : x === -7 || x === 6 ? C.black : robe(x, y - i * 6, 3)))],
  FV, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.18 });
/** A string of gold beads ending in a red drop. */
const beads = (i, n) => vox([B([-1, -6, -1], [1, 0, 1], (x, y) => (i === n - 1 && y < -3 ? C.gem : md(y, 2) ? C.goldL : C.goldD))], 0.007, { jitter: 0.02, ao: 0.1 });
/** Red silk tassel strand. */
const tassel = (i, n) => vox([B([-1, -6, -1], [2, 0, 2], (x, y, z) => (i === n - 1 && y < -3 && hash01(x + 3, z + 3, y) < 0.4 ? null
  : md(x + z, 3) === 0 ? C.redL : C.red))], 0.01, { jitter: 0.05, ao: 0.2 });

const DEF = {
  scale: 1.0,
  reach: { tip: 0.22, butt: 0.13 },
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, weapon: weaponGeo() }),
  chains() {
    const legs = [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]];
    return [
      // the robe's four skirt panels to the ground; the back one longest, trailing behind her
      { joint: 'hips', anchor: [0, -0.1, 0.13], rest: [0, -1, 0.06], n: 6, len: 0.13, stiff: 0.14, drag: 0.18, wind: 0.4, face: [0, 0, 1], cone: 60, sway: 0.06,
        seg: panel(6, 0.4), hit: legs },
      { joint: 'hips', anchor: [0, -0.06, -0.13], rest: [0, -1, -0.3], n: 8, len: 0.13, stiff: 0.14, drag: 0.2, wind: 0.5, face: [0, 0, -1], cone: 75, sway: 0.08,
        seg: panel(8, 0.5, true), hit: ['hips', ...legs] },
      ...[-1, 1].map((sx) => ({ joint: 'hips', anchor: [sx * 0.13, -0.1, 0], rest: [sx * 0.12, -1, 0], n: 6, len: 0.13, stiff: 0.14, drag: 0.18, wind: 0.5,
        face: [sx, 0, 0], cone: 60, sway: 0.08, seg: panel(6, 0.3), hit: [[sx > 0 ? 'thighL' : 'thighR', 0.03], [sx > 0 ? 'kneeL' : 'kneeR', 0.03]] })),
      // the sleeves' drooping cuffs
      ...['L', 'R'].map((s) => ({ joint: 'foreArm' + s, anchor: [0, -0.24, -0.06], rest: [0, -1, -0.2], n: 3, len: 0.075, stiff: 0.1, drag: 0.16, wind: 0.6,
        cone: 80, sway: 0.1, face: [1, 0, 0], seg: cuff })),
      // the gold bead strings from the ends of the hairpin
      ...[-1, 1].flatMap((sx) => [0, 1].map((k) => ({ joint: 'head', anchor: [sx * (7.5 + k * 0.5) * HV, 20 * HV, (-2 - k) * HV], rest: [sx * 0.1, -1, 0], n: 3,
        len: 0.035, stiff: 0.05, drag: 0.08, wind: 0.6, cone: 80, sway: 0.2, face: [1, 0, 0], seg: beads, hit: ['head'] }))),
      // the fan's red tassel from its rivet
      ...[0, 1].map((k) => ({ joint: 'weapon', anchor: [(k - 0.5) * 0.008, 0, -0.135], rest: [(k - 0.5) * 0.2, -1, -0.2], n: 3, len: 0.045, stiff: 0.05,
        drag: 0.12, wind: 0.8, cone: 130, sway: 0.15, face: [1, 0, 0], seg: tassel })),
    ];
  },
};

// 20×20 portrait: the gold phoenix pin rising from the high black bun, a gold ring at its base, an oval pale face with
// lowered eyes, a red brow mark and a small red mouth; the red phoenix robe with its black lapels and white inner collar
const FACE = [
  '.........YY.........',
  '.......YYrrYY.......',
  '........KYYK........',
  '.....GYYKKKKYYG.....',
  '......KKKKKKKK......',
  '.....YYYYYYYYYY.....',
  '....KKKKKpKKKKKK....',
  '....KKSSSSSSSSKK....',
  '....KSSSSrSSSSSK....',
  '....KSHHSSSSHHSK....',
  '....KSWEESSEEWSK....',
  '....KSSSSssSSSSK....',
  '....KbSSSssSSSbK....',
  '.....SSSSSSSSSS.....',
  '......SSSMMSSS......',
  '.......sSSSSs.......',
  '...RRRKKsSSsKKRRR...',
  '..RRyRRKKWWKKRRyRR..',
  '.RRRRyRRKWWKRRRRyRR.',
  'RRyRRRRRRKKRRRyRRRRR',
];
const PAL = { Y: '#d8a83e', r: '#d02a2a', G: '#f6d878', K: '#0e0b0b', p: '#3a2a2a', S: '#e4b896', s: '#c0916e', H: '#1a1010',
  W: '#f2ede2', E: '#140c0a', M: '#b02a24', b: '#e0a088', R: '#a81e18', y: '#d8a83e' };

export const NPC = {
  id: 'duonghau', name: { zh: 'Dương Hoàng hậu', en: 'Queen Dương' }, courtesy: { zh: '楊后', en: 'Dương Vân Nga' }, seal: '楊后',
  portrait: { face: FACE, pal: PAL }, kit: npcKit(DEF, SWORD),
};
