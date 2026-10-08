// Hoạn Quan Tổng Quản (宦官) — the palace's chief eunuch, the traitor inside (final boss, Màn VI): sword class. NPC
// entry (contract: src/chars/npc/index.js) with his own model def (src/chars/npc/kit.js header; fine voxels,
// chars/parts.js FV), slender (scale 1.02), and a 20×20 portrait.
// Look (comic token HOAN_QUAN, ch. 8 / 15 / 17 panels): an elegant palace official, not a fighter — narrow shoulders, no
// armour at all. A pale smooth oval face without a hair of beard, fine arched brows, narrow eyes that give nothing
// away, a thin smile turned up at both corners. A black gauze court cap (mũ ô sa): the low front over the brow, the
// raised rounded crown behind, two small oval wings standing out at the sides of the back, the gauze dithered dark grey.
// A dark-violet court robe scattered with gold thread, its collar crossed right over left with gold piping over a white
// under-collar; wide sleeves that hang below the forearm, gold-edged; a stiff court belt of gold plaques on black
// lacquer standing off the robe, a gold front plaque; the robe falls to the shins in four panels (chains); black court
// boots on white soles. On the ring finger of his LEFT hand, the story's key detail: a gold ring set with a bright green
// stone, big enough to read at play distance. Weapon: a thin straight jian, bright steel with a dark ridge, a gold bar
// guard, a violet cord grip, a gold pommel, a violet tassel.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as SWORD from '../../../../src/chars/npc/sword.js';
import { vox, B, P, md } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, hand, boot, symH } from '../../../../src/chars/parts.js';

const HV = 0.013;
const C = {
  skin: 0xeed8c4, skinD: 0xd0b49e, skinH: 0xf8e8da, lip: 0xb46a6a, mouth: 0x5a2a28, eye: 0x0e0a0c, scl: 0xe6e0d8,
  hair: 0x0e0c0e, hairH: 0x262228,
  cap: 0x0c0a0e, capL: 0x2a2630, capD: 0x050406,
  vio: 0x3e1e5a, vioD: 0x24103a, vioL: 0x5e3486,
  gold: 0xc8a040, goldD: 0x7a5c1e, goldL: 0xecc864,
  white: 0xe8e2d6, whiteD: 0xb8b0a2, black: 0x141016,
  jade: 0x2ee07a, jadeD: 0x139a4a,
  boot: 0x121012, bootD: 0x08080a, sole: 0xd8d0c0,
  steel: 0xdce4ee, edge: 0xfafcff, ridge: 0x8a94a4, grip: 0x3a1e56, gripH: 0x5e3486, tassel: 0x6a2a9a, tasselL: 0x9a5ac8,
};
const robe = (x, y, z) => (md(x * 5 + y * 3 + z * 7, 23) === 0 ? C.goldL : md(x - y * 2 + z, 9) === 0 ? C.vioD : C.vio);   // gold thread
const gauze = (x, y, z) => (md(x + y + z, 2) === 0 && hash01(x + 5, y, z + 5) < 0.6 ? C.capL : C.cap);
const round = (r) => (x, z) => Math.abs(x + 0.5) + Math.abs(z + 0.5) <= r;

// ---------------------------------------------------------------- body (FV, centred on the joints; slender)
/** A diagonal violet lapel across the chest from (x0, y0) to (x1, y1): gold piping outside, white under-collar inside. */
function lapel(x0, y0, x1, y1, zf, dir) {
  const out = [], n = Math.abs(y1 - y0);
  for (let i = 0; i <= n; i++) {
    const y = Math.round(y0 + (y1 - y0) * i / n), x = Math.round(x0 + (x1 - x0) * i / n);
    out.push(B([x - 3, y, 8], [x + 4, y + 1, zf], (xx) => (xx === x + 3 * dir ? C.goldL : xx === x - 3 * dir ? C.white : C.vio)));
  }
  return out;
}

function torso() {
  const T = {};
  // hips: the robe, and the stiff court belt standing off it: gold plaques on black lacquer, the big front plaque
  T.hips = [
    B([-12, -10, -8], [12, 6, 8], robe),
    B([-13, -10, -9], [13, -1, 9], robe),
    B([-15, -1, -11], [15, 3, 11], (x, y, z) => (y === -1 || y === 2 ? C.goldD : md(x + z, 5) < 3 ? C.gold : C.black)),
    B([-4, -2, 11], [4, 4, 12], (x, y) => (x === -4 || x === 3 || y === -2 || y === 3 ? C.goldD : C.goldL)),
  ];
  T.spine = [B([-10, -6, -8], [10, 14, 8], robe)];
  // chest: the robe crossed right over left on narrow shoulders, the white under-collar showing at the neck
  T.chest = [
    B([-13, -4, -9], [13, 18, 9], robe),
    B([-14, 8, -10], [14, 17, 10], robe),
    ...lapel(-8, 17, 2, 2, 11, 1),
    ...lapel(8, 17, -6, -3, 12, -1),
    B([-7, 16, -7], [7, 21, 7], (x, y) => (y === 20 ? C.goldL : y >= 18 ? C.white : C.vio)),
    B([-5, 15, -5], [5, 25, 5], -1),
  ];
  T.neck = [B([-4, -2, -4], [4, 6, 4], C.skinD), P([-4, 1, 3], [4, 6, 4], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // wide sleeves: the upper arm in the robe, the sleeve swelling past the elbow and hanging below the forearm in a
    // gold-edged bell, the white inner cuff at the wrist
    T['upperArm' + s] = [B([-6, -24, -6], [6, 2, 6], (x, y, z) => (round(9)(x, z) ? robe(x, y, z) : null))];
    T['foreArm' + s] = [
      B([-8, -20, -8], [8, 1, 8], (x, y, z) => (!round(12)(x, z) ? null : y === -20 ? C.goldL : robe(x, y, z))),
      B([-7, -28, -10], [7, -8, -3], (x, y, z) => (!round(12)(x, z + 3) ? null : y === -28 || x === -7 || x === 6 ? C.goldL : robe(x, y, z))),
      B([-4, -21, -4], [5, -18, 5], C.white),
    ];
    // bare pale hands; on the left, the gold ring with its bright green stone
    T['hand' + s] = sx > 0 ? [...hand(sx, C.skin, C.skinD), B([1, -2, 1], [2, 0, 6], C.gold), B([0, -2, 5], [3, 1, 7], (x, y) => (x === 1 && y === -1 ? C.jade : y === 0 ? C.jade : C.jadeD))]
      : hand(sx, C.skin, C.skinD);
    // the robe to the shins, black boots on white soles under it
    T['thigh' + s] = [B([-8, -36, -8], [8, 2, 8], robe)];
    T['shin' + s] = [
      B([-6, -34, -6], [6, 0, 6], C.boot),
      B([-8, -16, -8], [8, 1, 8], (x, y, z) => (y === -16 ? C.goldL : robe(x, y, z))),
      B([-6, -34, -6], [6, -32, 6], C.bootD),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.sole, { trim: C.black });
  }
  return T;
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0)
function head() {
  const wing = [];
  for (const sx of [-1, 1]) for (let i = 0; i < 6; i++) {           // the small oval side wings of the ô sa, off the back crown
    const h = i === 0 || i === 5 ? 1 : 2, x = sx > 0 ? 8 + i : -8 - i;
    wing.push(B([x, 17 - (h > 1 ? 1 : 0), -5], [x + 1, 18 + (h > 1 ? 1 : 0), -3], i === 5 ? C.capL : gauze));
  }
  return [
    // a pale smooth oval face, no beard
    B([-6, 2, -6], [7, 13, 6], C.skin),
    B([-5, 0, -4], [6, 3, 5], C.skin), B([-2, -1, -2], [3, 1, 5], C.skin),
    B([-7, 6, -2], [8, 9, 1], C.skinD),
    ...symH(3, 6, 4, 6, 5, 6, C.skinH),
    // fine arched brows, narrow eyes turned up at the outer corner, a straight fine nose
    ...symH(2, 5, 10, 11, 5, 6, C.hair), ...symH(5, 6, 9, 10, 5, 6, C.hair),
    ...symH(2, 5, 7, 8, 5, 6, C.scl), ...symH(2, 4, 7, 8, 5, 6, C.eye), ...symH(1, 5, 8, 9, 5, 6, C.skinD), ...symH(5, 6, 8, 9, 5, 6, C.eye),
    B([0, 5, 6], [1, 9, 7], C.skinH), P([-1, 5, 5], [2, 6, 6], C.skinD),
    // the thin smile: a fine line, both corners turned up
    P([-1, 2, 4], [2, 3, 6], C.lip), ...symH(2, 3, 3, 4, 5, 6, C.lip),
    // neat black hair under the cap at the temples and the back
    B([-7, 4, -7], [8, 12, -3], (x, y, z) => (md(x + y, 4) === 0 ? C.hairH : C.hair)), B([-7, 9, -3], [8, 12, 2], C.hair),
    // the ô sa: the low front over the brow, the raised rounded crown behind, the wings
    B([-7, 11, -7], [8, 16, 5], (x, y, z) => (y === 11 ? C.capD : gauze(x, y, z))),
    B([-6, 16, -6], [7, 17, 4], gauze),
    B([-6, 15, -8], [7, 22, -1], (x, y, z) => ((y > 19 && (x < -4 || x > 4)) || (y > 20 && (z < -6 || z > -3)) ? null : gauze(x, y, z))),
    ...wing,
  ];
}

// ---------------------------------------------------------------- the jian (weapon joint: blade +Z, origin = the grip)
function weaponGeo() {
  const hilt = vox([
    B([-2, -2, -13], [2, 2, -9], (x, y, z) => (z === -13 ? C.goldL : C.gold)), B([-1, -1, -14], [1, 1, -13], C.goldL),
    B([-1, -1, -9], [1, 1, 8], (x, y, z) => (md(z + x + y, 2) ? C.grip : C.gripH)),
    B([-5, -2, 8], [5, 2, 11], (x, y, z) => (z === 8 ? C.goldD : C.gold)),
    B([-1, -2, 11], [1, 2, 12], C.goldD),
  ], 0.01, { jitter: 0.04, ao: 0.3 });
  const bv = 0.008, z0 = Math.round(0.12 / bv), z1 = Math.round(0.94 / bv), boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0), w = u < 0.9 ? 3.0 - u * 0.6 : Math.max(0.5, (1 - u) * 25);
    const a = Math.round(-w), b = Math.max(a + 1, Math.round(w));
    boxes.push(B([a, -1, z], [b, 1, z + 1], (x) => (x === a || x === b - 1 ? C.edge : x === -1 || x === 0 ? C.ridge : C.steel)));
  }
  const blade = vox(boxes, bv, { jitter: 0.02, ao: 0.15 });
  return [{ geo: hilt, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
const panel = (w) => (i, n) => vox([B([-w, -8, 0], [w, 0, 1], (x, y) => (i === n - 1 && y <= -7 ? (y === -8 && x & 1 ? null : C.goldL)
  : x === -w || x === w - 1 ? C.vioD : robe(x, y + i * 8, 0)))], 0.015, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.18 });
const strand = (i, n) => vox([B([-1, -6, -1], [1, 0, 1], (x, y, z) => (i === n - 1 && y < -3 && hash01(x + 3, z + 3, 7) < 0.5 ? null : md(x + z, 2) ? C.tassel : C.tasselL))],
  0.01, { jitter: 0.05, ao: 0.2 });

export const DEF = {
  scale: 1.02,
  reach: { tip: 0.94, butt: 0.14 },
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, weapon: weaponGeo() }),
  chains: () => [
    // the robe below the belt: front, back and both sides, to the shins
    ...[[0, 0.12, [0, 0, 1], 6], [0, -0.12, [0, 0, -1], 6]].map(([x, z, face, w]) => ({ joint: 'hips', anchor: [x, -0.04, z], rest: [0, -1, z], n: 5, len: 0.12,
      stiff: 0.12, drag: 0.16, wind: 0.5, face, cone: 70, sway: 0.08, seg: panel(w),
      hit: [['thighL', 0.02], ['thighR', 0.02], ['kneeL', 0.02], ['kneeR', 0.02]] })),
    ...[-1, 1].map((sx) => ({ joint: 'hips', anchor: [sx * 0.15, -0.04, 0], rest: [sx * 0.2, -1, 0], n: 5, len: 0.12, stiff: 0.12, drag: 0.16, wind: 0.6,
      face: [sx, 0, 0], cone: 70, sway: 0.1, seg: panel(5), hit: [[sx > 0 ? 'thighL' : 'thighR', 0.03], [sx > 0 ? 'kneeL' : 'kneeR', 0.03]] })),
    ...[0, 1, 2].map((k) => ({ joint: 'weapon', anchor: [(k - 1) * 0.006, 0, -0.14], rest: [(k - 1) * 0.2, -1, -0.2], n: 3, len: 0.05, stiff: 0.05, drag: 0.12,
      wind: 0.8, cone: 140, sway: 0.15, face: [1, 0, 0], seg: strand })),
  ],
};

const PORTRAIT = {
  face: [
    '.......KKKKKK.......',
    '......KkKKKkKK......',
    '......KKKkKKKK......',
    '.KKk..KkKKKKkK..kKK.',
    '..KKKKKKKKKKKKKKKK..',
    '.....KKKKKKKKKK.....',
    '.....hSSSSSSSSh.....',
    '.....SKKSSSSKKS.....',
    '.....SSSSSSSSSS.....',
    '.....SWEESSEEWS.....',
    '.....SSSSSSSSSS.....',
    '.....sSSSSsSSSSs....',
    '.....sSSSSSSSSs.....',
    '......SMSSSSMS......',
    '.......SMMMMS.......',
    '........SSSS........',
    '....VVVVGWWGVVVV....',
    '..VVvVVVVGWGVVVVvV..',
    '.VVvVVVvVVGGVVvVVvV.',
    'VVvVVVvVVVGGVVVvVVvV',
  ],
  pal: { K: '#0c0a0e', k: '#2a2630', h: '#0e0c0e', S: '#eed8c4', s: '#d0b49e', W: '#e6e0d8', E: '#0e0a0c', M: '#b46a6a',
    V: '#3e1e5a', v: '#5e3486', G: '#ecc864' },
};

export const NPC = {
  id: 'hoanquan', name: { zh: 'Hoạn Quan Tổng Quản', en: 'The Chief Eunuch' }, courtesy: { zh: '宦官', en: 'Hoa Lư palace' }, seal: '宦官',
  portrait: PORTRAIT, kit: npcKit(DEF, SWORD),
};
