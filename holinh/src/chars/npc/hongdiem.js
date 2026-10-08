// Mã Hồng Diễm (紅艷) — the hunters' rider, who follows the signals sent from inside the palace (Màn III, VI): sword
// class, quicker than the others (her windups and recoveries × 0.85: FAST below). NPC entry (contract: src/chars/npc/
// index.js) with her own model def (src/chars/npc/kit.js header; fine voxels, chars/parts.js FV), scale 1.0, and a 20×20
// portrait.
// Look (comic token HONG_DIEM): an athletic woman assassin, not a court lady — the build the shared rig gives the men,
// narrowed (holinh/DESIGN.md §3): slimmer shoulders and arms, a fitted waist, a modest line at the chest, never
// exaggerated. A fine oval face with a pointed chin, sharp brows that rise outward, dark eyes with a shadow under them
// (cold, and wounded), red lips; black hair drawn tight off the brow into a HIGH PONYTAIL (a long chain) tied with a
// crimson cord, two short side locks. Dark crimson riding armour of small fitted lamellar laced in black, a standing
// crimson collar edged black, small one-tier shoulder plates, a black waist cinch, a short split lamellar skirt for the
// saddle over black leggings, knee-high black riding boots with crimson tops; black leather bracers and riding gloves.
// Chains: the ponytail, the cord's two tails, a crimson scarf end from the collar, a crimson cloak in two panels.
// Weapon: a narrow single-edged saber with a gentle curve (the edge convex, the point clipped back to the spine), a
// small bronze guard, a black wrapped grip, a bronze pommel and a red tassel.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as SWORD from '../../../../src/chars/npc/sword.js';
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

const HV = 0.0125;
const C = {
  skin: 0xe2b490, skinD: 0xc49270, skinH: 0xf0c6a4, lip: 0xa8323a, mouth: 0x3a1410, eye: 0x0c0a0a, iris: 0x2e1a12,
  scl: 0xeee6dc, shadow: 0xb88468,
  hair: 0x0c0a0c, hairH: 0x262028,
  crim: 0x7a1622, crimD: 0x4a0c14, crimL: 0xa82634, lace: 0x0c0808,
  scarf: 0x9a1c26, scarfD: 0x5e0e16, scarfL: 0xc0323c,
  black: 0x141012, blackL: 0x2a2226, leather: 0x221816, leatherL: 0x3a2c26, boot: 0x181210, bootD: 0x0a0806,
  bronze: 0x8a6a3a, bronzeL: 0xc09a5a,
  steel: 0xcad2dc, edge: 0xf6f9ff, ridge: 0x7a8494, grip: 0x161214, gripH: 0x30282a, tassel: 0xc0242c, tasselL: 0xe24a48,
};
/** Fitted crimson lamellar laced in black: the seams are the black lacing, every plate's lip a brighter crimson. */
function lam(a, b, o) {
  const rowH = o.rowH ?? 2, pw = o.pw ?? 3, seam = (x, y, z) => md(x + z + (Math.floor((y - a[1]) / rowH) & 1) * (pw >> 1), pw) === 0;
  return lamellar(a, b, { base: C.crim, rowH, pw, ...o }).map((bx, i) => ({ ...bx, c: (x, y, z) => {
    const c = bx.c(x, y, z);
    if (c == null || (o.trim != null && c === o.trim && y === a[1])) return c;
    return seam(x, y, z) ? C.lace : i === 0 ? ((y - a[1]) % rowH === rowH - 1 ? C.crimD : C.crim) : C.crimL;
  } }));
}
const hairP = (x, y, z) => (md(x * 3 + z + y, 5) === 0 ? C.hairH : C.hair);
const legging = (x, y) => (md(y + (x & 1), 7) === 0 ? C.blackL : C.black);

// ---------------------------------------------------------------- body (FV, centred on the joints; narrowed)
function torso() {
  const T = {};
  // hips: a short lamellar skirt split front and back for the saddle, the black cinch with a small bronze plaque
  T.hips = [
    B([-11, -10, -7], [11, 6, 7], C.black),
    ...lam([-13, -17, -9], [13, -2, 9], { trim: C.lace, jag: true }),
    B([-5, -18, 4], [5, -4, 11], -1), B([-5, -18, -11], [5, -4, -4], -1),
    B([-13, -3, -10], [13, 4, 10], (x, y) => (y === -3 || y === 3 ? C.crimL : C.black)),
    B([-2, -2, 10], [3, 3, 11], (x, y) => (y === -2 || y === 2 ? C.bronze : C.bronzeL)),
  ];
  T.spine = [
    B([-8, -6, -7], [8, 14, 7], C.black),
    ...lam([-8, -4, -7], [8, 10, 7], {}),
    B([-9, -6, -8], [9, -2, 8], C.black),                                           // the waist cinch
    B([-9, 10, -8], [9, 14, 8], (x, y) => (y === 10 ? C.lace : C.crim)),
  ];
  // chest: fitted lamellar, a gentle fullness at the front, the standing crimson collar edged black over a black inner
  // collar, the cloak's two bronze rings
  T.chest = [
    B([-12, -4, -9], [12, 18, 9], C.black),
    ...lam([-11, -3, -9], [11, 5, 9], {}),
    ...lam([-13, 5, -10], [13, 16, 10], { trim: C.lace }),
    ...lam([-9, 7, 9], [9, 14, 11], { lipX: false }),
    B([-8, 15, -8], [8, 21, 8], (x, y) => (y === 20 ? C.lace : C.crim)),
    B([-6, 19, -6], [6, 22, 6], C.black),
    B([-5, 15, -5], [5, 25, 5], -1),
    ...[-1, 1].map((sx) => mirX(B([9, 15, -11], [12, 18, -8], C.bronzeL), sx)),
  ];
  T.neck = [B([-4, -2, -4], [4, 6, 4], C.skinD), P([-4, 1, 3], [4, 6, 4], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // slim arms: a fitted crimson sleeve, black leather bracers, riding gloves
    T['upperArm' + s] = [
      B([-5, -24, -5], [5, 2, 5], (x, y, z) => (Math.abs(x + 0.5) + Math.abs(z + 0.5) > 8 ? null : md(y, 6) === 0 ? C.crimD : C.crim)),
      ...lam([-5, -8, -5], [5, 0, 5], { trim: C.lace }),
    ];
    T['foreArm' + s] = bracer(C.black, [C.leather, C.lace, C.crimL]);
    T['hand' + s] = glove(sx, C.black, C.leatherL);
    // black leggings, a short lamellar tasset at the hip
    T['thigh' + s] = [
      B([-6, -36, -6], [6, 2, 6], legging),
      ...lam([-4, -10, -6], [8, 0, 7], { trim: C.lace, jag: true }).map((b) => mirX(b, sx)),
    ];
    // knee-high riding boots, crimson-topped, a strap at the ankle
    T['shin' + s] = [
      B([-6, -34, -6], [6, 0, 6], C.boot),
      B([-7, -4, -7], [7, 2, 7], (x, y) => (y === -4 ? C.lace : C.crim)),
      B([-6, -6, -6], [6, -4, 6], C.leatherL),
      B([-6, -30, -6], [6, -28, 6], C.leather),
      B([-6, -34, -6], [6, -32, 6], C.bootD),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD, { trim: C.crimL });
  }
  return T;
}

/** Small one-tier shoulder plates under a crimson cap. +x = outward. */
function pauldron(sx) {
  return [
    ...lam([-3, 2, -8], [8, 9, 8], { trim: C.lace }),
    B([-3, 8, -8], [7, 11, 8], (x, y) => (y === 10 ? C.crimL : C.crim)),
  ].map((b) => mirX(b, sx));
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0)
function head() {
  return [
    // a fine oval face, a pointed chin, small ears
    B([-6, 2, -6], [7, 13, 6], C.skin),
    B([-5, 0, -4], [6, 3, 5], C.skin), B([-2, -1, -2], [3, 1, 5], C.skin),
    B([-7, 6, -2], [8, 9, 1], C.skinD),
    ...symH(3, 6, 4, 6, 5, 6, C.skinH),
    // dark eyes with a shadow under them, sharp brows rising outward
    ...symH(1, 5, 7, 8, 5, 6, C.scl), ...symH(2, 4, 7, 8, 5, 6, C.iris), ...symH(2, 3, 7, 8, 5, 6, C.eye),
    ...symH(1, 5, 8, 9, 5, 6, C.hair), ...symH(2, 5, 6, 7, 5, 6, C.shadow),
    ...symH(1, 3, 9, 10, 5, 7, C.hair, false), ...symH(3, 6, 10, 11, 5, 7, C.hair, false),
    // a small straight nose, red lips
    B([0, 5, 6], [1, 8, 7], C.skinH), P([0, 5, 6], [1, 6, 7], C.skinD),
    P([-1, 2, 4], [2, 3, 6], C.lip), P([0, 2, 4], [1, 3, 6], C.mouth),
    // hair drawn tight off the brow, two short side locks, the high knot and its crimson cord
    B([-7, 10, -7], [8, 15, 4], hairP), B([-7, 2, -7], [8, 13, -3], hairP), B([-6, 15, -6], [7, 16, 2], hairP),
    B([-7, 3, -3], [-6, 12, 2], hairP), B([7, 3, -3], [8, 12, 2], hairP),
    B([-2, 15, -7], [3, 20, -2], hairP), B([-2, 17, -7], [3, 18, -2], C.scarfL), B([-1, 20, -6], [2, 21, -3], C.hairH),
  ];
}

// ---------------------------------------------------------------- the saber (weapon joint: blade +Z, origin = the grip)
function weaponGeo() {
  const hilt = vox([
    B([-2, -2, -12], [2, 2, -9], (x, y, z) => (z === -12 ? C.bronzeL : C.bronze)),
    B([-1, -1, -9], [1, 1, 8], (x, y, z) => (md(z + x + y, 3) ? C.grip : C.gripH)),
    B([-4, -2, 8], [4, 2, 10], (x, y, z) => (z === 8 ? C.bronze : C.bronzeL)),                    // small oval guard
    B([-2, -2, 10], [2, 2, 11], C.bronze),
  ], 0.01, { jitter: 0.04, ao: 0.3 });
  // blade at 0.008: back on −X, edge on +X, curving gently toward the back; the point clipped from the edge
  const bv = 0.008, z0 = Math.round(0.11 / bv), z1 = Math.round(0.9 / bv), boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0), sh = -Math.round(u * u * 7), w = u < 0.86 ? 4 : Math.max(1, Math.round((1 - u) / 0.14 * 4));
    const a = sh - 1, b = a + w;
    for (let x = a; x < b; x++) boxes.push(B([x, -1, z], [x + 1, 1, z + 1], x === b - 1 ? C.edge : x === a ? C.ridge : C.steel));
  }
  const blade = vox(boxes, bv, { jitter: 0.02, ao: 0.15 });
  return [{ geo: hilt, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
const tail = (i, n) => {
  const w = i < 2 ? 3 : i < n - 2 ? 2 : 1, last = i === n - 1;
  return vox([B([-w, -6, -w], [w, 0, w], (x, y, z) => (last && y < -3 && hash01(x + 3, z + 3, 7) < 0.5 ? null
    : (Math.abs(x + 0.5) > w - 1 && Math.abs(z + 0.5) > w - 1) && w > 1 ? null : md(x + z + y, 4) === 0 ? C.hairH : C.hair))],
  0.012, { jitter: 0.05, ao: 0.2 });
};
const cord = () => vox([B([-1, -5, 0], [1, 0, 1], C.scarfL)], 0.01, { off: [0, 0, -0.5], jitter: 0.03, ao: 0.15 });
const cape = (i, n) => {
  const w = 5 + Math.round(i * 0.5), last = i === n - 1;
  return vox([B([-w, -9, 0], [w, 0, 1], (x, y) => (last && y < -6 && hash01(x, i, 3) < 0.3 ? null : x === -w || x === w - 1 ? C.crimD
    : md(y + i * 9, 9) === 0 ? C.scarfD : C.scarf)), B([-w, -9, -1], [w, 0, 0], (x, y) => (last && y < -7 ? null : C.crimD))],
  FV, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.18 });
};
const scarf = (i, n) => vox([B([-3, -7, 0], [3, 0, 1], (x, y) => (i === n - 1 && y < -5 && x & 1 ? null : x === -3 || x === 2 ? C.scarfD : C.scarfL))],
  FV, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.18 });
const strand = (i, n) => vox([B([-1, -6, -1], [1, 0, 1], (x, y, z) => (i === n - 1 && y < -3 && hash01(x + 3, z + 3, 7) < 0.5 ? null : md(x + z, 2) ? C.tassel : C.tasselL))],
  0.01, { jitter: 0.05, ao: 0.2 });

export const DEF = {
  scale: 1.0,
  reach: { tip: 0.9, butt: 0.13 },
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains: () => [
    // the high ponytail: from the knot at the crown, back and down past the shoulder blades
    { joint: 'head', anchor: [0, 19 * HV, -5 * HV], rest: [0, -0.35, -1], n: 7, len: 0.07, stiff: 0.1, drag: 0.12, wind: 1.2, cone: 100, sway: 0.25,
      seg: tail, hit: ['head', 'chest', ['spine', 0.01]] },
    ...[-1, 1].map((sx) => ({ joint: 'head', anchor: [sx * 2 * HV, 17 * HV, -7 * HV], rest: [sx * 0.3, -1, -0.4], n: 3, len: 0.05, stiff: 0.06, drag: 0.1,
      wind: 1.4, cone: 110, sway: 0.25, face: [1, 0, 0], seg: cord, hit: ['head'] })),
    // the crimson cloak in two panels from the shoulder rings, and the scarf end hanging from the collar
    ...[-0.07, 0.07].map((x) => ({ joint: 'chest', anchor: [x, 0.21, -0.13], rest: [x, -1, -0.2], n: 6, len: 0.12, stiff: 0.15, drag: 0.22, wind: 1.2,
      cone: 80, sway: 0.2, seg: cape, hit: ['chest', 'hips', 'thighL', 'thighR', 'kneeL', 'kneeR'] })),
    { joint: 'chest', anchor: [0.05, 0.24, 0.1], rest: [0.15, -1, 0.4], n: 4, len: 0.09, stiff: 0.1, drag: 0.16, wind: 1.3, cone: 90, sway: 0.25,
      face: [0, 0, 1], seg: scarf, hit: [['chest', 0.02], ['spine', 0.02], ['hips', 0.02]] },
    ...[0, 1, 2].map((k) => ({ joint: 'weapon', anchor: [(k - 1) * 0.006, 0, -0.12], rest: [(k - 1) * 0.2, -1, -0.2], n: 3, len: 0.05, stiff: 0.05, drag: 0.12,
      wind: 0.8, cone: 140, sway: 0.15, face: [1, 0, 0], seg: strand })),
  ],
};

/** Quicker than the men: the same four moves, windups and recoveries cut to 0.85. */
const FAST = { ...SWORD, attacks: SWORD.attacks.map((a) => ({ ...a, windup: Math.round(a.windup * 0.85), recover: Math.round(a.recover * 0.85) })) };

const PORTRAIT = {
  face: [
    '.........KKr........',
    '........KKKKr.......',
    '......KKKKKKKK......',
    '.....KKKKKKKKKK.....',
    '....KKKKKKKKKKKK....',
    '....KKSSSSSSSSKK....',
    '....KSKKSSSSKKSK....',
    '....KSSSKSSKSSSK....',
    '....KSWEESSEEWSK....',
    '....KSssSSSSssSK....',
    '....KSSSSSsSSSSK....',
    '....KSSSSSSSSSSK....',
    '.....SSSSMMSSSS.....',
    '......SSSSSSSS......',
    '.......sSSSSs.......',
    '....RRRRSssSRRRR....',
    '..RRrRRRRKKRRRRrRR..',
    '.RRrRRrRRKKRRrRRrRR.',
    'RRrRRrRRrKKrRRrRRrRR',
    'RrRRrRRrRKKRrRRrRRrR',
  ],
  pal: { K: '#0c0a0c', r: '#c0323c', S: '#e2b490', s: '#c49270', W: '#eee6dc', E: '#2e1a12', M: '#a8323a',
    R: '#7a1622' },
};

export const NPC = {
  id: 'hongdiem', name: { zh: 'Mã Hồng Diễm', en: 'Mã Hồng Diễm' }, courtesy: { zh: '紅艷', en: 'the crimson rider' }, seal: '紅艷',
  portrait: PORTRAIT, kit: npcKit(DEF, FAST),
};
