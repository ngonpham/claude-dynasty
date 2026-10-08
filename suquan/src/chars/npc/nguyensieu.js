// Nguyễn Siêu (阮超), "Nguyễn Hữu Công" — warlord of Tây Phù Liệt (ch. II): polearm class.
// NPC entry (contract: src/chars/npc/index.js): his own voxel def (src/chars/defkit.js header for build / chains / scale /
// reach; fine voxels: src/chars/parts.js FV) on the shared rig, kit scale 1.1, and a 20×20 portrait.
// A river lord of the delta, not an iron-helmed northern general: a broad, sun-browned face with a heavy moustache and a
// short square beard under a white cloth head-wrap (khăn) wound in diagonal folds, a bronze clasp at its front knot, a
// topknot bound high at the back and a blue plume of egret-dyed feathers springing from the knot. Indigo-lacquered
// rattan lamellar with steel-blue plate lips over a blue tunic; on the chest a round bronze plate cast with the Đông Sơn
// sun-star and its rings; two-tier lamellar shoulder flaps with steel lips and small bronze bosses; a broad white sash
// with blue ends; bare tanned forearms with indigo bracers; indigo trousers bound with wrapped leggings (xà cạp), straw-
// soled sandals; a long river-blue cloak in three panels. Weapon: a long-hafted spear-glaive (đại đao cán dài) — a
// red-brown lacquered shaft with bronze bands, a bronze collar with a little crescent guard, a long single-edged blade
// sweeping back to its point, a butt spike, and a white horsehair tassel under the collar.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as POLEARM from '../../../../src/chars/npc/polearm.js';
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, hand, bracer, boot, symH } from '../../../../src/chars/parts.js';

const HV = 0.013;
const C = {
  skin: 0xc8916a, skinD: 0xa0704e, skinH: 0xd8a47c, lip: 0x8a4a3a, mouth: 0x2a0e0a, eye: 0x0c0a0a, scl: 0xe4dccc,
  beard: 0x16110e, beardH: 0x2e2620,
  wrap: 0xe8e4da, wrapD: 0xb8b2a6, wrapL: 0xf8f6f0,
  ind: 0x1e2a5a, indD: 0x111832, indL: 0x2e3e7a,
  steel: 0x6a86b0, steelL: 0x9ab4d8, steelD: 0x46607e,
  bronze: 0x9a7a3a, bronzeD: 0x5e4822, bronzeL: 0xd0a850,
  tunic: 0x22407e, tunicD: 0x162a56,
  sash: 0xdcdee4, sashD: 0xa8acb6, sashB: 0x2e6ad8,
  legwrap: 0x8a8272, legwrapD: 0x5a5448, sandal: 0x5a3e26, sole: 0x3a2818,
  cloak: 0x24448a, cloakD: 0x16285a, cloakL: 0x3a62b0,
  plume: 0x2e6ad8, plumeL: 0x7aa8f0, plumeW: 0xeef2fa,
  shaft: 0x4a1e14, shaftH: 0x6a2a1a, edge: 0xf2f4f6, blade: 0xb8c2cc, bladeD: 0x6a7480,
};
/** Indigo lamellar with steel-blue plate lips (dark seams kept, the trim row kept). */
function plates(a, b, o) {
  const rowH = o.rowH ?? 3, pw = o.pw ?? 4, seam = (x, y, z) => md(x + z + (Math.floor((y - a[1]) / rowH) & 1) * (pw >> 1), pw) === 0;
  return lamellar(a, b, o).map((bx, i) => (i === 0 ? bx : { ...bx, c: (x, y, z) => {
    const c = bx.c(x, y, z);
    return c == null || (o.trim != null && c === o.trim && y === a[1]) ? c : seam(x, y, z) ? C.indD : C.steel;
  } }));
}
const tunic = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.tunicD : C.tunic);
const beardP = (x, y, z) => (md(x * 3 + y + z, 4) === 0 ? C.beardH : C.beard);

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: blue tunic, an indigo lamellar skirt open in front, the broad white sash knotted on the left hip
  T.hips = [
    B([-12, -10, -8], [12, 6, 8], C.tunicD),
    ...plates([-15, -24, -11], [15, -2, 11], { base: C.ind, rowH: 3, pw: 3, trim: C.steelL, jag: true }),
    B([-9, -25, 5], [9, -8, 13], -1),
    B([-8, -22, 8], [8, -2, 10], tunic),                                               // tunic flap in the opening
    B([-16, -3, -12], [16, 5, 12], (x, y) => (y === -3 || y === 4 ? C.sashD : md(x + y, 7) === 0 ? C.sashD : C.sash)),
    B([10, -14, 9], [14, 0, 12], (x, y) => (y < -10 ? C.sashB : C.sash)),              // the sash ends, blue-dyed
    B([13, -12, 6], [16, 1, 9], (x, y) => (y < -8 ? C.sashB : C.sashD)),
  ];
  T.spine = [
    B([-11, -6, -9], [11, 14, 9], C.tunicD),
    ...plates([-11, -4, -9], [11, 10, 9], { base: C.ind, rowH: 2, pw: 3 }),
    B([-12, 10, -10], [12, 14, 10], (x, y) => (y === 10 ? C.indD : md(x, 5) === 0 ? C.steelL : C.steel)),
  ];
  // chest: indigo cuirass, steel-lipped rows, the round bronze Đông Sơn plate (a 12-ray star, two rings, a rim), a
  // raised collar of blue tunic, the cloak's bronze fibulae on the shoulders
  const disc = [];
  for (let y = 1; y < 18; y++) for (let x = -8; x < 9; x++) {
    const dx = x + 0.5, dy = y + 0.5 - 9.5, r = Math.hypot(dx, dy);
    if (r > 8.2) continue;
    const a = Math.atan2(dy, dx), ray = Math.abs(Math.sin(a * 6)) > 0.8 && r < 4.6;
    const c = r > 7.3 ? C.bronzeD : r > 6.4 ? C.bronzeL : r > 5.5 && r < 6.0 ? C.bronzeD : r < 1.5 ? C.bronzeL : ray ? C.bronzeL : r > 4.6 && r < 5.0 ? C.bronzeL : C.bronze;
    disc.push(B([x, y, 12], [x + 1, y + 1, r < 1.5 ? 15 : 14], c));
  }
  T.chest = [
    B([-15, -4, -11], [15, 18, 11], C.indD),
    ...plates([-15, -3, -11], [15, 5, 11], { base: C.ind, rowH: 2, pw: 3 }),
    ...plates([-16, 5, -12], [16, 17, 12], { base: C.ind, rowH: 3, pw: 4, trim: C.steelD }),
    ...disc,
    B([-9, 16, -9], [9, 22, 9], (x, y) => (y === 21 ? C.tunicD : C.tunic)),            // tunic collar
    B([-6, 15, -6], [6, 25, 6], -1),
    ...[-1, 1].map((sx) => mirX(B([11, 15, -13], [15, 19, -9], (x, y) => (y === 18 ? C.bronzeL : C.bronze)), sx)),   // cloak fibulae
  ];
  T.neck = [B([-5, -2, -5], [5, 6, 5], C.skinD), P([-5, 1, 4], [5, 6, 5], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // short blue tunic sleeves under a lamellar band; bare tanned forearms in indigo bracers; bare hands
    T['upperArm' + s] = [
      B([-6, -24, -6], [6, 2, 6], tunic), B([-7, -12, -7], [7, -6, 7], C.tunicD),
      ...plates([-6, -10, -6], [6, -1, 6], { base: C.ind, rowH: 2, pw: 3, trim: C.steelL }),
      B([-5, -25, -5], [6, -12, 6], (x, y, z) => (Math.abs(x) + Math.abs(z) > 8 ? null : x > 2 || z < -2 ? C.skinD : C.skin)),
    ];
    T['foreArm' + s] = bracer(C.skin, [C.ind, C.indD, C.steelL]);
    T['hand' + s] = hand(sx, C.skin, C.skinD);
    // indigo trousers, a lamellar tasset on the outer thigh
    T['thigh' + s] = [
      B([-7, -36, -7], [7, 2, 7], (x, y) => (md(y + (x & 1), 6) === 0 ? C.indD : C.ind)),
      B([-8, -31, -8], [8, -20, 8], (x, y) => (md(y - x, 5) === 0 ? C.indD : C.ind)),
      ...plates([-5, -15, -7], [9, 0, 8], { base: C.ind, rowH: 2, pw: 3, trim: C.steelL, jag: true }).map((b) => mirX(b, sx)),
    ];
    // xà cạp: the shin bound in a diagonal cloth wrap over the trouser, a bronze knee stud
    T['shin' + s] = [
      B([-6, -34, -6], [6, 0, 6], C.ind),
      B([-7, -31, -7], [7, -6, 7], (x, y, z) => (Math.abs(x) + Math.abs(z) > 10 ? null : md(y + x + z, 4) === 0 ? C.legwrapD : C.legwrap)),
      B([-7, -6, -7], [7, 2, 7], C.ind), P([-1, -4, 6], [2, -1, 7], C.bronzeL),
      B([-5, -35, -5], [6, -31, 6], C.skinD),                                          // bare ankle
    ];
    T['foot' + s] = [...boot(C.skin, C.skinD, C.sole), B([-6, -6, 1], [7, -4, 3], C.sandal), B([-1, -6, 3], [2, -3, 10], C.sandal)];   // sandal straps
  }
  return T;
}

/** Two tiers of steel-lipped lamellar flaps over the shoulder, a small bronze boss. Authored with +x outward. */
function pauldron(sx) {
  const boss = [];
  for (let y = 0; y < 6; y++) for (let z = -3; z < 3; z++) {
    const r = Math.hypot(y - 2.5, z + 0.5);
    if (r <= 2.8) boss.push(B([12, y, z], [r < 1.2 ? 15 : 14, y + 1, z + 1], r > 2.1 ? C.bronzeD : C.bronzeL));
  }
  return [
    ...plates([-4, 5, -10], [9, 13, 10], { base: C.ind, rowH: 3, pw: 4, trim: C.steelL }),
    ...plates([2, -6, -12], [12, 6, 12], { base: C.ind, rowH: 3, pw: 4, trim: C.bronze, jag: true }),
    B([-3, 13, -10], [9, 15, 10], C.steelD),
    ...boss,
  ].map((b) => mirX(b, sx));
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  // the head-wrap: cloth bands wound on a slant (a fold line every 3 voxels, shaded under each fold)
  const wrap = (x, y, z) => { const f = md(y * 2 + Math.round(x * 0.6) + (z > 0 ? 0 : 1), 6); return f === 0 ? C.wrapD : f === 5 ? C.wrapL : C.wrap; };
  return [
    // broad skull and jaw, high cheekbones, ears
    B([-7, 2, -6], [8, 13, 6], C.skin),
    B([-7, 0, -4], [8, 5, 5], C.skin), B([-3, -1, -2], [4, 1, 5], C.skin),
    B([-8, 5, -2], [9, 9, 1], C.skinD),
    ...symH(4, 7, 6, 8, 4, 6, C.skinH), ...symH(4, 7, 3, 6, 4, 6, C.skinD),
    // eyes under heavy level brows, a frown line
    ...symH(2, 5, 7, 8, 5, 6, C.scl), ...symH(2, 4, 7, 8, 5, 6, C.eye), ...symH(1, 5, 8, 9, 5, 6, C.skinD),
    ...symH(1, 6, 9, 11, 5, 7, C.beard, false),
    P([0, 9, 5], [1, 11, 6], C.skinD),
    // broad nose
    B([-1, 5, 6], [2, 10, 8], C.skinH), B([-1, 4, 7], [3, 6, 9], C.skin), P([-1, 4, 8], [0, 5, 9], C.mouth), P([2, 4, 8], [3, 5, 9], C.mouth),
    // heavy moustache sweeping down past the mouth, a short square beard, sideburns into the wrap
    B([-7, 0, -4], [8, 3, 6], beardP, true), B([-3, -4, 1], [4, 0, 7], beardP),
    P([-2, 2, 5], [3, 3, 6], C.lip), P([-1, 2, 5], [2, 3, 6], C.mouth),
    B([-4, 3, 6], [5, 5, 8], C.beard), B([-5, 0, 5], [-3, 4, 8], beardP), B([4, 0, 5], [6, 4, 8], beardP),
    B([-8, 3, -3], [-6, 10, 2], beardP), B([7, 3, -3], [9, 10, 2], beardP),
    // the white khăn: wound bands from the brow up, a domed crown, the front knot with its bronze clasp, a tail of cloth
    // at the back, the topknot bound high behind
    B([-8, 10, -8], [9, 17, 8], wrap), B([-7, 17, -7], [8, 19, 7], wrap), B([-5, 19, -5], [6, 20, 5], C.wrapL),
    B([-2, 12, 7], [3, 17, 10], (x, y) => (y === 16 ? C.wrapL : C.wrapD)),
    B([-1, 13, 9], [2, 16, 11], (x, y) => (y === 14 ? C.bronzeL : C.bronze)),
    B([-3, 17, -9], [4, 23, -3], wrap), B([-2, 23, -8], [3, 25, -4], C.wrapD),
    B([-1, 4, -10], [2, 12, -8], (x, y) => (md(y, 3) === 0 ? C.wrapD : C.wrap)),
  ];
}

// ---------------------------------------------------------------- the spear-glaive (weapon joint: shaft +Z, origin = rear grip)
function weaponGeo() {
  // shaft at 0.02 (z −0.6 … 1.94): red-brown lacquer, bronze bands, cord-wrapped grips, a bronze butt spike
  const shaft = vox([
    B([-1, -1, -30], [1, 1, 97], (x, y, z) => ((z > -6 && z < 8) || (z > 22 && z < 34) ? (md(z + x + y, 2) ? 0x2a1a12 : 0x3e2a1c)
      : ((z >> 1) & 1) ? C.shaftH : C.shaft)),
    ...[-24, 14, 44, 70, 90].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.bronzeL : C.bronze))),
    B([-2, -2, -31], [2, 2, -28], C.bronze), B([-1, -1, -36], [1, 1, -31], C.bronzeL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // head at 0.011 (z 1.86 … 2.62): bronze collar and a small crescent guard, then a long single-edged blade with its
  // back on −X, the cutting edge bellying out on +X and sweeping back to the point
  const v = 0.011, boxes = [], z0 = Math.round(1.86 / v), zg = Math.round(1.96 / v), p1 = Math.round(2.62 / v);
  boxes.push(B([-3, -3, z0], [3, 3, zg], (x, y, z) => (md(z, 4) === 0 ? C.bronzeD : C.bronze)), B([-4, -4, zg - 3], [4, 4, zg], C.bronzeL));
  for (let k = -6; k <= 6; k++) boxes.push(B([k, -1, zg + Math.round(Math.abs(k) * 0.5)], [k + 1, 1, zg + Math.round(Math.abs(k) * 0.5) + 2], C.bronze));   // crescent guard
  for (let z = zg + 2; z < p1; z++) {
    const u = (z - zg - 2) / (p1 - zg - 2), back = -1 - Math.round(3 * u * u), belly = Math.round(1.5 + 6.5 * Math.sin(Math.PI * Math.pow(u, 0.75)) - 4 * u * u);
    const a = back, b = Math.max(a + 1, belly);
    for (let x = a; x < b; x++) boxes.push(B([x, -1, z], [x + 1, 1, z + 1], x === b - 1 ? C.edge : x === a ? C.bladeD : u < 0.7 && x === a + 1 ? C.bladeD : C.blade));
  }
  const headG = vox(boxes, v, { jitter: 0.03, ao: 0.2 });
  return [{ geo: shaft, mat: 'body' }, { geo: headG, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
const strand = (cols, v, w0 = 2) => (i, n) => {
  const w = i === 0 ? w0 + 1 : w0, last = i === n - 1, c = cols[Math.min(cols.length - 1, i)];
  return vox([B([-w, -7, -w], [w, 0, w], (x, y, z) => {
    const k = hash01(x + 9, z + 9, 7);
    if (last && -y > 3 + k * 5) return null;
    if ((x === -w || x === w - 1) && (z === -w || z === w - 1) && i > 0) return null;
    return k < 0.25 ? C.plumeL : c;
  })], v, { jitter: 0.06, ao: 0.25 });
};
const cloak = (i, n) => {
  const boxes = [], width = 6 + Math.round(i * 0.5);
  for (let row = 0; row < 11; row++) {
    const w = width + Math.floor(row / 4);
    for (let x = -w; x <= w; x++) {
      if (i === n - 1 && row > 7 && (Math.abs(x) < 2 || Math.abs(x) > w - 2)) continue;
      const c = Math.abs(x) >= w - 1 ? C.cloakD : i === n - 1 && row > 6 ? C.cloakL : row % 5 === 0 ? C.cloakD : C.cloak;
      boxes.push(B([x, -row - 1, 0], [x + 1, -row, 2], c));
    }
  }
  return vox(boxes, FV, { jitter: 0.025, ao: 0.17 });
};
const tassel = (i) => {
  const b = [];
  for (let y = -8; y < 0; y++) for (let x = -2; x < 2; x++) for (let z = -2; z < 2; z++) if (hash01(x + i * 7, y, z + 3) > 0.35) b.push(B([x, y, z], [x + 1, y + 1, z + 1], i > 1 && y < -5 ? C.wrapD : C.wrapL));
  return vox(b, 0.011, { jitter: 0.04, ao: 0.2 });
};

const DEF = {
  scale: 1.1,
  reach: { tip: 2.62, butt: 0.72 },
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const out = [];
    // the egret plume from the front knot of the head-wrap: blue at the root, pale blue and white at the tips
    const PL = strand([C.plume, C.plume, C.plumeL, C.plumeW], 0.013, 2);
    for (let k = 0; k < 4; k++) {
      const a = (k - 1.5) * 0.35;
      out.push({ joint: 'head', anchor: [Math.sin(a) * 1.2 * HV, 17 * HV, 9 * HV], rest: [Math.sin(a) * 0.5, 1, -0.55], n: 4, len: 0.07,
        stiff: 0.22, drag: 0.12, wind: 1.2, cone: 70, sway: 0.25, face: [1, 0, 0], seg: PL, hit: ['head'] });
    }
    // the long river-blue cloak: three panels off the back of the shoulders
    for (const x of [-0.11, 0, 0.11]) {
      out.push({ joint: 'chest', anchor: [x, 0.23, -0.155], rest: [x * 0.8, -1, -0.2], n: 7, len: 0.13, stiff: 0.15, drag: 0.22, wind: 1.15, cone: 80, sway: 0.2,
        seg: cloak, hit: ['chest', 'hips', 'thighL', 'thighR', 'kneeL', 'kneeR'] });
    }
    // a white horsehair tassel under the glaive's collar
    out.push({ joint: 'weapon', anchor: [0, 0.02, 1.86], rest: [0, -1, -0.3], n: 3, len: 0.07, stiff: 0.05, drag: 0.12, wind: 0.9, cone: 130, sway: 0.2,
      face: [1, 0, 0], seg: tassel });
    return out;
  },
};

const PORTRAIT = {
  face: [
    '.........bB.........',
    '........bBb.........',
    '.......WWbWW........',
    '.....WWwWWWwWW......',
    '....WwWWWYWWwWW.....',
    '...WWWwWWYWWWwWW....',
    '...wWWWWWWWWWWWw....',
    '...SSSSSSSSSSSSSS...',
    '...SKKKSSSSSKKKSS...',
    '...SSWESSSSSEWSSs...',
    '...SSSSSSssSSSSSs...',
    '...sSSSSSssSSSSs....',
    '....sKKKKSSKKKKs....',
    '....KKKKMMMKKKKK....',
    '.....KKKKKKKKKK.....',
    '......KKKKKKKK......',
    '...IIiTTKKKKTTiII...',
    '..IIiIITYYYYTIIiII..',
    '.IIiIIIYYyyYYIIIiII.',
    'IIiIIIIIYYYYIIIIIiII',
  ],
  pal: { B: '#2e6ad8', b: '#7aa8f0', W: '#ece8de', w: '#b8b2a6', Y: '#c8a050', y: '#5e4822', S: '#c8916a', s: '#a0704e',
    K: '#16110e', E: '#0c0a0a', M: '#8a4a3a', I: '#1e2a5a', i: '#6a86b0', T: '#22407e' },
};

export const NPC = {
  id: 'nguyensieu', name: { zh: 'Nguyễn Siêu', en: 'Nguyễn Siêu' }, courtesy: { zh: '阮超', en: 'Tây Phù Liệt' }, seal: '右公',
  portrait: PORTRAIT, kit: npcKit(DEF, POLEARM),
};
