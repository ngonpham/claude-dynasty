// Ngô Xương Văn (吳昌文), Nam Tấn Vương — the Ngô court's king (ch. I, Hoa Lư 951), co-ruler with his elder brother Ngô
// Xương Ngập; sword class. NPC entry (contract: src/chars/npc/index.js) with his own model def (src/chars/npc/kit.js
// header; fine voxels, chars/parts.js FV) and 20×20 portrait.
// Look: a young king of the Ngô house, not a Wei warlord — a smooth, beardless face with level brows and a firm mouth,
// hair gathered into a topknot under a gold crown: a black lacquered cap ringed by a gold band, a flame plaque with a
// red gem at the front and two upswept gold wing plates at the sides, yellow cap ribbons behind. Black lacquer lamellar
// (rows of small plates with gold lips) over a robe of imperial ochre-yellow crossed at the chest (右衽), a gold
// dragon roundel where the lapels meet; wide ochre sleeves with black cuffs, gold bracers; pauldrons of black lacquer
// with gold dragon-head bosses set with jade; a black belt with gold plaques; ochre skirt panels over black trousers,
// black boots with gold trim. Chains: a long ochre cloak with a gold dragon-scale band down its back and a dark
// lining, the robe's front and side panels, the cap ribbons, the sword's yellow tassel. Weapon: a straight jian, bright
// steel with a dark ridge, a bronze-gold bar guard, a yellow cord grip, a black pommel capped in gold.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as SWORD from '../../../../src/chars/npc/sword.js';
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

const HV = 0.013;
const C = {
  skin: 0xd8a47e, skinD: 0xb07c5a, skinH: 0xeabb94, lip: 0xa05a48, mouth: 0x2a100c, eye: 0x0c0a0a, scl: 0xeae2d6,
  hair: 0x0e0c0c, hairH: 0x2a2624,
  gold: 0xd0a040, goldD: 0x7a5a1a, goldL: 0xf0cc6a,
  black: 0x16120e, blackD: 0x0a0806, blackL: 0x2e261c,
  och: 0xc8961e, ochD: 0x8a6412, ochL: 0xe8bc48, lining: 0x3a1a10,
  jade: 0x3a9a82, red: 0xb8281e,
  leather: 0x2a1e16, leatherL: 0x46342a, boot: 0x14110e, bootD: 0x0a0806,
  steel: 0xd4dbe4, edge: 0xf8fbff, ridge: 0x7e8796, grip: 0xc89a24, gripH: 0xe8c048,
};
const robe = (x, y, z) => (md(x * 5 + y * 3 + z * 7, 23) === 0 ? C.goldL : md(x - y * 2 + z, 9) === 0 ? C.ochD : C.och);   // gold thread
const hairP = (x, y, z) => (md(x * 3 + z + y, 5) === 0 ? C.hairH : C.hair);

// ---------------------------------------------------------------- body
/** A diagonal ochre lapel across the chest from (x0, y0) to (x1, y1): gold piping outside, black inside. */
function lapel(x0, y0, x1, y1, zf, dir) {
  const out = [], n = Math.abs(y1 - y0);
  for (let i = 0; i <= n; i++) {
    const y = Math.round(y0 + (y1 - y0) * i / n), x = Math.round(x0 + (x1 - x0) * i / n);
    out.push(B([x - 3, y, 10], [x + 4, y + 1, zf], (xx) => (xx === x + 3 * dir ? C.goldL : xx === x - 3 * dir ? C.black : C.och)));
  }
  return out;
}

function torso() {
  const T = {};
  T.hips = [
    B([-12, -10, -8], [12, 6, 8], C.ochD),
    B([-13, -6, -9], [13, -1, 9], robe),
    B([-15, -1, -11], [15, 5, 11], (x, y, z) => (y === -1 || y === 4 ? C.goldD : y === 2 && md(x + z, 4) === 0 ? C.goldL : C.black)),
    B([-4, -2, 11], [5, 6, 13], (x, y) => (y === -2 || y === 5 || x === -4 || x === 4 ? C.goldD : C.gold)),
    P([-2, 0, 12], [3, 4, 13], C.jade),
  ];
  T.spine = [
    B([-11, -6, -9], [11, 14, 9], C.blackD),
    ...lamellar([-12, -5, -10], [12, 10, 10], { base: C.black, rowH: 2, pw: 3, trim: C.gold }),
    B([-12, 10, -10], [12, 14, 10], (x, y) => (y === 10 || y === 13 ? C.goldD : md(x, 5) === 0 ? C.ochL : C.och)),   // ochre sash
  ];
  // chest: black lacquer lamellar, the ochre robe crossed over it, a gold dragon roundel where the lapels meet
  const roundel = [];
  for (let y = 0; y < 9; y++) for (let x = -4; x < 5; x++) {
    const r = Math.hypot(x - 0.5, y - 4);
    if (r <= 4.3) roundel.push(B([x, y + 2, 13], [x + 1, y + 3, r < 2.4 ? 16 : 15], r > 3.4 ? C.goldD : (md(x + y, 3) === 0 ? C.red : C.goldL)));
  }
  T.chest = [
    B([-15, -4, -11], [15, 18, 11], C.blackD),
    ...lamellar([-15, -3, -11], [15, 5, 11], { base: C.black, rowH: 2, pw: 3, trim: C.goldD }),
    ...lamellar([-16, 5, -12], [16, 17, 12], { base: C.black, rowH: 3, pw: 4, trim: C.gold }),
    ...lapel(-9, 17, 1, 4, 13, 1),
    ...lapel(9, 17, -5, -3, 14, -1),
    ...roundel,
    ...[-1, 1].flatMap((sx) => [mirX(B([9, 15, -13], [13, 19, 13], C.black), sx), mirX(B([10, 16, -14], [12, 18, 14], C.gold, true), sx)]),
    B([-9, 16, -9], [9, 22, 9], (x, y) => (y === 21 ? C.goldL : y === 16 ? C.ochD : C.och)),      // standing ochre collar
    B([-6, 15, -6], [6, 25, 6], -1),
  ];
  T.neck = [B([-5, -2, -5], [5, 6, 5], C.skinD), P([-5, 1, 4], [5, 6, 5], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    T['upperArm' + s] = [
      B([-6, -24, -6], [6, 2, 6], robe), B([-7, -20, -7], [7, -4, 7], robe),
      B([-8, -24, -8], [8, -20, 8], (x, y) => (y === -21 ? C.goldL : C.black)),
    ];
    T['foreArm' + s] = bracer(C.skinD, [C.gold, C.goldD, C.goldL]);
    T['hand' + s] = glove(sx, C.leather, C.leatherL);
    T['thigh' + s] = [
      B([-7, -36, -7], [7, 2, 7], (x, y) => (md(y + (x & 1), 6) === 0 ? C.blackL : C.black)),
      ...lamellar([-5, -21, -7], [9, 0, 8], { base: C.och, rowH: 4, pw: 5, trim: C.goldL, jag: true }).map((b) => mirX(b, sx)),
    ];
    T['shin' + s] = [
      B([-6, -34, -6], [6, 0, 6], C.boot),
      B([-7, -7, -7], [7, 2, 7], C.black), B([-7, -9, -7], [7, -7, 7], C.gold),
      B([-4, -28, 5], [4, -10, 8], (x, y) => (md(y, 4) === 0 ? C.goldD : C.black)),
      B([-7, -34, -7], [7, -32, 7], C.bootD),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD, { curl: true, trim: C.gold });
  }
  return T;
}

/** Pauldrons: black lacquer tiers with gold lips, a gold dragon-head boss set with jade on the outside. +x = outward. */
function pauldron(sx) {
  const boss = [];
  for (let y = 0; y < 9; y++) for (let z = -4; z < 6; z++) {
    const r = Math.hypot(y - 4, z - 0.5);
    if (r <= 4.4) boss.push(B([11, y, z], [r < 1.6 ? 14 : 13, y + 1, z + 1], r > 3.4 ? C.goldD : r < 1.6 ? C.jade : C.goldL));
  }
  boss.push(B([11, 3, 4], [15, 6, 7], C.gold), B([13, 6, 5], [15, 8, 6], C.goldL));                // the dragon's snout and horn
  return [
    ...lamellar([-6, 6, -10], [7, 14, 10], { base: C.black, rowH: 3, pw: 4, trim: C.gold }),
    ...lamellar([-2, -5, -12], [11, 6, 12], { base: C.black, rowH: 4, pw: 5, trim: C.goldL }),
    B([-5, 13, -9], [6, 15, 9], (x) => (x === -5 || x === 5 ? C.goldD : C.ochL)),
    ...boss,
  ].map((b) => mirX(b, sx));
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0)
function head() {
  return [
    // a young, full face: rounder jaw than a warlord's, smooth cheeks, ears
    B([-6, 2, -6], [7, 13, 6], C.skin),
    B([-5, 0, -4], [6, 3, 5], C.skin), B([-3, -1, -2], [4, 1, 5], C.skin),
    B([-7, 5, -2], [8, 9, 1], C.skinD),
    ...symH(3, 6, 4, 7, 5, 6, C.skinH),
    // level eyes, straight dark brows
    ...symH(1, 5, 7, 8, 5, 6, C.scl), ...symH(2, 4, 7, 8, 5, 6, C.eye),
    ...symH(1, 5, 8, 9, 5, 6, C.skinD),
    ...symH(1, 5, 10, 11, 5, 7, C.hair, false),
    // nose, a firm closed mouth, no beard
    B([0, 6, 6], [2, 9, 8], C.skinH), B([1, 4, 7], [2, 7, 9], C.skin),
    P([0, 5, 7], [1, 7, 8], C.skinD),
    P([-2, 2, 5], [3, 3, 6], C.lip), P([-1, 2, 5], [2, 3, 6], C.mouth),
    // hair swept up into the topknot
    B([-7, 9, -7], [8, 14, 4], hairP), B([-7, 2, -7], [8, 13, -3], hairP),
    B([-7, 5, -3], [-6, 11, 0], hairP), B([7, 5, -3], [8, 11, 0], hairP),
    // the crown: black lacquered cap over the topknot, the gold band, the front flame plaque with a red gem, the two
    // upswept wing plates at the sides
    B([-5, 13, -6], [6, 19, 3], (x, y) => (y === 18 ? C.blackL : C.black)),
    B([-6, 13, -7], [7, 15, 4], (x, y) => (y === 13 ? C.goldD : C.gold)),
    B([-2, 14, 3], [3, 21, 5], (x, y) => (y >= 19 && (x === -2 || x === 2) ? null : y === 14 ? C.goldD : C.goldL)),
    B([-1, 16, 4], [2, 18, 6], C.red),
    ...[-1, 1].flatMap((sx) => Array.from({ length: 6 }, (_, i) => mirX(B([6 + i, 15 + i, -3], [8 + i, 16 + i, 1], i === 5 ? C.goldL : C.gold), sx, 1))),
    B([-1, 19, -3], [2, 22, 0], C.gold), B([0, 22, -2], [1, 23, -1], C.goldL),                   // the gold pin through the knot
  ];
}

// ---------------------------------------------------------------- the jian (weapon joint: blade +Z, origin = the grip)
function weaponGeo() {
  const hilt = vox([
    B([-2, -2, -13], [2, 2, -9], (x, y, z) => (z === -13 ? C.goldL : C.black)), B([-1, -1, -14], [1, 1, -13], C.goldL),
    B([-1, -1, -9], [1, 1, 8], (x, y, z) => (md(z + x + y, 2) ? C.grip : C.gripH)),
    B([-5, -2, 8], [5, 2, 11], (x, y, z) => (z === 8 ? C.goldD : C.gold)),                        // bar guard
    B([-1, -2, 11], [1, 2, 12], C.goldD),
  ], 0.01, { jitter: 0.04, ao: 0.3 });
  const bv = 0.008, z0 = Math.round(0.12 / bv), z1 = Math.round(0.96 / bv), boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0), w = u < 0.9 ? 3.6 - u * 0.6 : Math.max(0.5, (1 - u) * 30);
    const a = Math.round(-w), b = Math.max(a + 1, Math.round(w));
    boxes.push(B([a, -1, z], [b, 1, z + 1], (x) => (x === a || x === b - 1 ? C.edge : x === -1 || x === 0 ? C.ridge : C.steel)));
  }
  const blade = vox(boxes, bv, { jitter: 0.02, ao: 0.15 });
  return [{ geo: hilt, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
const capeSeg = (i, n) => {                                     // ochre outside, a gold dragon-scale band down the back
  const w = Math.round(7 + (i * 2) / (n - 1)), last = i === n - 1;
  const band = (x, y) => Math.abs(x + 0.5) < 2.5 && md(y + (Math.abs(x) & 1) * 2 + i * 3, 4) < 2;
  return vox([B([-w, -7, 0], [w, 0, 1], (x, y) => (last && y === -7 && hash01(x, i, 5) < 0.4 ? null : last && y >= -6 && y <= -5 ? C.goldL
    : x === -w || x === w - 1 ? C.ochD : band(x, y) ? C.goldL : C.och)),
  B([-w, -7, -1], [w, 0, 0], (x, y) => (last && y === -7 ? null : C.lining))], 0.025, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.18 });
};
const panel = (w) => (i, n) => vox([B([-w, -8, 0], [w, 0, 1], (x, y) => (i === n - 1 && y <= -7 ? (y === -8 && x & 1 ? null : C.goldL)
  : x === -w || x === w - 1 ? C.black : robe(x, y + i * 8, 0)))], 0.015, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.18 });
const ribbon = () => vox([B([-1, -6, 0], [1, 0, 1], C.ochL)], 0.012, { off: [0, 0, -0.5], jitter: 0.03, ao: 0.15 });
const strand = (i, n) => vox([B([-1, -6, -1], [1, 0, 1], (x, y, z) => (i === n - 1 && y < -3 && hash01(x + 3, z + 3, 7) < 0.5 ? null : md(x + z, 2) ? C.och : C.ochL))],
  0.01, { jitter: 0.05, ao: 0.2 });

export const DEF = {
  scale: 1.06,
  reach: { tip: 0.96, butt: 0.14 },
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains: () => [
    { joint: 'chest', anchor: [0, 0.25, -0.16], rest: [0, -1, 0.15], n: 7, len: 0.17, stiff: 0.16, drag: 0.22, wind: 1.1, cone: 80, sway: 0.2,
      seg: capeSeg, hit: ['chest', 'hips', 'thighL', 'thighR', 'kneeL', 'kneeR'] },
    { joint: 'hips', anchor: [0, -0.07, 0.15], rest: [0, -1, 0.12], n: 4, len: 0.12, stiff: 0.12, drag: 0.14, wind: 0.5, face: [0, 0, 1], cone: 70, sway: 0.08,
      seg: panel(5), hit: [['thighL', 0.02], ['thighR', 0.02], ['kneeL', 0.02], ['kneeR', 0.02]] },
    ...[-1, 1].map((sx) => ({ joint: 'hips', anchor: [sx * 0.155, -0.07, 0.0], rest: [sx * 0.25, -1, 0], n: 4, len: 0.12, stiff: 0.12, drag: 0.14, wind: 0.6,
      face: [sx, 0, 0], cone: 70, sway: 0.1, seg: panel(4), hit: [[sx > 0 ? 'thighL' : 'thighR', 0.03], [sx > 0 ? 'kneeL' : 'kneeR', 0.03]] })),
    ...[-1, 1].map((sx) => ({ joint: 'head', anchor: [sx * 5.5 * HV, 15 * HV, -2 * HV], rest: [sx * 0.15, -1, -0.25], n: 4, len: 0.07, stiff: 0.06, drag: 0.1,
      wind: 1.4, cone: 100, sway: 0.25, face: [sx, 0, 0], seg: ribbon, hit: ['head', ['chest', 0.01]] })),
    ...[0, 1, 2].map((k) => ({ joint: 'weapon', anchor: [(k - 1) * 0.006, 0, -0.14], rest: [(k - 1) * 0.2, -1, -0.2], n: 3, len: 0.05, stiff: 0.05, drag: 0.12,
      wind: 0.8, cone: 140, sway: 0.15, face: [1, 0, 0], seg: strand })),
  ],
};

const PORTRAIT = {
  face: [
    '.........YY.........',
    '..Y.....YRRY.....Y..',
    '..YY...YYRRYY...YY..',
    '...YYKKKKKKKKKKYY...',
    '....YYYYYYYYYYYY....',
    '....KKSSSSSSSSKK....',
    '...KKSSSSSSSSSSKK...',
    '...KSKKKKSSKKKKSK...',
    '...SSSWESSSSEWSSS...',
    '...SSSSSSssSSSSSS...',
    '....SSSSSssSSSSS....',
    '....sSSSSSSSSSSs....',
    '.....sSSSMMSSSs.....',
    '......sSSSSSSs......',
    '.......ssSSss.......',
    '....OOKKSSSSKKOO....',
    '..OOOOKYKKKKYKOOOO..',
    '.OOoOOOKYYYYKOOOoOO.',
    'OOoOOOOKKGGKKOOOOoOO',
    'OOOoOOOOKGGKOOOOoOOO',
  ],
  pal: { Y: '#f0cc6a', R: '#b8281e', K: '#16120e', S: '#d8a47e', s: '#b07c5a', W: '#eae2d6', E: '#0c0a0a', M: '#a05a48',
    O: '#c8961e', o: '#8a6412', G: '#3a9a82' },
};

export const NPC = {
  id: 'ngoxuongvan', name: { zh: 'Ngô Xương Văn', en: 'Ngô Xương Văn' }, courtesy: { zh: '吳昌文', en: 'Nam Tấn Vương' }, seal: '南晉',
  portrait: PORTRAIT, kit: npcKit(DEF, SWORD),
};
