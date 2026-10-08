// Mặt Sẹo (疤面) — the hunters' brute, who hunts the men who hold the seals (Màn II, V, VI): polearm class. NPC entry
// (contract: src/chars/npc/index.js) with his own model def (src/chars/npc/kit.js header; fine voxels, chars/parts.js
// FV) on the shared rig, a size up (scale 1.14), and a 20×20 portrait.
// Look (comic token MAT_SEO): a heavy, muscled killer who stands like a dog about to bite — the head carried low and
// forward of the shoulders (the head and neck geometry sit 2 voxels forward, 1 down), a thick trapezius mass under the
// cloak's gathered collar. A broad, sun-dark square face, heavy brows, a frown line, black stubble along the jaw; one
// deep diagonal scar from his left brow (it breaks the brow) over the bridge of the nose to his right cheek, paler and
// pinker than the skin round it. The head is shaved to a dark stubble, a short rough topknot tied with a red-brown
// cord. Black iron scale armour of small overlapping plates (dull grey lips, a few brighter scuffs), three-tier scale
// pauldrons riveted under an iron rim, a scale skirt over dark trousers, a leather baldric across the chest, a heavy belt
// with an iron buckle; iron-banded bracers over dark sleeves, leather gloves, knee boots with iron greave strips. Chains:
// a ragged charcoal cloak in three panels (frayed edges, a torn hem, a few moth holes) and two dirty red rags knotted
// under the weapon's head. Weapon: a cleaver-glaive — a broad rectangular chopping blade like a giant butcher's cleaver
// (a thick dark spine, a square clipped tip, a hole near the spine, the edge notched from use) on a socket with iron
// langets, a dark haft bound with iron bands and cord grips, an iron butt cap. The flat is dull iron, only the edge glints.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as POLEARM from '../../../../src/chars/npc/polearm.js';
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, boot, symH } from '../../../../src/chars/parts.js';

const HV = 0.013;
const C = {
  skin: 0xa8734e, skinD: 0x83563a, skinH: 0xbc8860, scar: 0xdca08a, scarD: 0x9a5e48, lip: 0x6e3a2c, mouth: 0x200c08,
  eye: 0x0a0808, scl: 0xd8ccb8, stub: 0x5a3e2c, stubD: 0x3a281c, scalp: 0x4a3a30, scalpD: 0x2e2420,
  hair: 0x121010, hairH: 0x2a2624, cord: 0x7a2a1a,
  iron: 0x2a2c30, ironD: 0x121315, ironL: 0x4c5158, ironH: 0x767c84,
  cloak: 0x221e1c, cloakD: 0x141210, cloakL: 0x34302c,
  cloth: 0x2c2622, clothD: 0x1a1614, leather: 0x2e2218, leatherL: 0x48362a,
  boot: 0x1c1712, bootD: 0x0e0c0a,
  haft: 0x2e221c, haftH: 0x40302a, wrapG: 0x1e1814, wrapGH: 0x3a2e24, rag: 0x6a2418, ragD: 0x441610,
  steel: 0x7e868e, steelD: 0x545a62, edge: 0xd2d8de, back: 0x2e3238,
};
/** Black iron scale: lamellar rows of small plates whose lips read dull grey, dark seams, a few scuffed bright plates. */
function scales(a, b, o) {
  const rowH = o.rowH ?? 2, pw = o.pw ?? 3, seam = (x, y, z) => md(x + z + (Math.floor((y - a[1]) / rowH) & 1) * (pw >> 1), pw) === 0;
  return lamellar(a, b, { base: C.iron, rowH, pw, ...o }).map((bx, i) => (i === 0 ? bx : { ...bx, c: (x, y, z) => {
    const c = bx.c(x, y, z);
    if (c == null || (o.trim != null && c === o.trim && y === a[1])) return c;
    return seam(x, y, z) ? C.ironD : hash01(x + 40, y, z + 40) < 0.1 ? C.ironH : C.ironL;
  } }));
}
const cloth = (x, y) => (md(y + (x & 1), 6) === 0 ? C.clothD : C.cloth);
const cloakP = (x, y, z) => (hash01(x + 9, y, z) < 0.15 ? C.cloakL : md(x + y, 5) === 0 ? C.cloakD : C.cloak);
const hairP = (x, y, z) => (md(x * 3 + y + z, 4) === 0 ? C.hairH : C.hair);

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: a scale skirt open at the front over a dark cloth flap, the heavy belt and its iron buckle
  T.hips = [
    B([-13, -10, -9], [13, 6, 9], C.clothD),
    ...scales([-15, -23, -11], [15, -3, 11], { trim: C.ironL, jag: true }),
    B([-8, -24, 6], [8, -8, 13], -1),
    B([-7, -21, 8], [7, -3, 10], cloth),
    B([-16, -3, -12], [16, 5, 12], (x, y) => (y === -3 || y === 4 ? C.leatherL : C.leather)),
    B([-3, -2, 12], [4, 5, 14], (x, y) => (x === -3 || x === 3 || y === -2 || y === 4 ? C.ironL : C.ironD)),
  ];
  T.spine = [
    B([-12, -6, -10], [12, 14, 10], C.ironD),
    ...scales([-12, -4, -10], [12, 10, 10], {}),
    B([-13, 10, -11], [13, 14, 11], (x, y) => (y === 10 ? C.ironD : md(x, 6) === 0 ? C.ironL : C.iron)),
  ];
  // chest: a deep scale cuirass, the hunch (a trapezius mass behind the neck under the cloak's gathered collar), the
  // leather baldric from his left shoulder across to the right hip
  const strap = [];
  for (let y = -2; y < 18; y++) {
    const x = Math.round(-12 + (y + 2) * 1.2);
    strap.push(B([x - 2, y, 12], [x + 2, y + 1, 14], md(y, 6) === 0 ? C.ironL : C.leather));
  }
  T.chest = [
    B([-16, -4, -12], [16, 18, 11], C.ironD),
    ...scales([-16, -3, -12], [16, 7, 11], {}),
    ...scales([-17, 7, -13], [17, 18, 12], { trim: C.ironL }),
    ...strap,
    B([-12, 15, -15], [12, 24, -3], cloakP),                                       // the hunch under the gathered cloak
    B([-15, 16, -14], [15, 22, 4], cloakP),                                        // the cloak gathered round the shoulders
    B([-7, 15, -6], [7, 25, 7], -1),
    ...[-1, 1].map((sx) => mirX(B([11, 16, -15], [15, 20, -11], (x, y) => (y === 19 ? C.ironH : C.iron)), sx)),   // cloak rings
  ];
  T.neck = [B([-6, -2, -3], [6, 6, 8], C.skinD), P([-6, 1, 6], [6, 6, 8], C.skin)];   // a bull neck, carried forward
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // thick arms in dark sleeves, a scale band under the pauldron, a leather band at the elbow
    T['upperArm' + s] = [
      B([-7, -24, -7], [7, 2, 7], (x, y, z) => (Math.abs(x + 0.5) + Math.abs(z + 0.5) > 11 ? null : cloth(x, y))),
      ...scales([-7, -12, -7], [7, -1, 7], { trim: C.ironL }),
      B([-8, -25, -8], [8, -21, 8], (x, y, z) => (Math.abs(x + 0.5) + Math.abs(z + 0.5) > 13 ? null : y === -22 ? C.leatherL : C.leather)),
    ];
    // heavy bracers: iron plates with leather straps and a few bright rivets, a dark sleeve showing at the elbow
    T['foreArm' + s] = [
      B([-4, -23, -4], [5, 1, 5], C.cloth),
      B([-6, -21, -6], [7, -3, 7], (x, y, z) => (Math.abs(x - 0.5) + Math.abs(z - 0.5) > 10 ? null : y === -21 || y === -4 ? C.ironL
        : md(y, 6) === 0 ? C.leatherL : z > 3 && md(x + y, 5) === 0 ? C.ironH : C.iron)),
    ];
    T['hand' + s] = glove(sx, C.leather, C.leatherL);
    T['thigh' + s] = [
      B([-8, -36, -8], [8, 2, 8], cloth),
      ...scales([-5, -16, -8], [10, 0, 9], { trim: C.ironL, jag: true }).map((b) => mirX(b, sx)),
    ];
    T['shin' + s] = [
      B([-7, -34, -7], [7, 0, 7], C.boot),
      B([-8, -7, -8], [8, 2, 8], (x, y) => (y === -7 ? C.leather : C.leatherL)),                     // folded boot top
      B([-4, -29, 6], [5, -7, 9], (x, y) => (md(y, 5) === 0 ? C.ironL : C.iron)),                 // iron greave strip
      ...[-24, -15].map((y) => B([-8, y, -8], [8, y + 2, 8], C.leather)),
      B([-8, -34, -8], [8, -32, 8], C.bootD),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD, { trim: C.leatherL });
  }
  return T;
}

/** Big three-tier scale pauldrons under a riveted iron rim. +x = outward. */
function pauldron(sx) {
  const rivets = [-9, -4, 1, 6].map((z) => B([13, 0, z], [15, 2, z + 2], C.ironH));
  return [
    ...scales([-5, 6, -11], [9, 15, 11], { trim: C.ironL }),
    ...scales([0, -7, -13], [13, 6, 13], { trim: C.ironL, jag: true }),
    B([-4, 14, -11], [10, 17, 11], (x, y) => (y === 16 ? C.ironL : C.iron)),
    B([11, 4, -13], [14, 7, 13], (x, y) => (y === 6 ? C.ironL : C.ironD)),
    ...rivets,
  ].map((b) => mirX(b, sx));
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0; carried 2 forward, 1 down)
function head() {
  const stub = (x, y, z) => (hash01(x + 7, y, z + 7) < 0.4 ? C.stubD : C.stub);
  const scalp = (x, y, z) => (hash01(x + 3, y + 5, z) < 0.35 ? C.scalpD : C.scalp);
  const scar = [];
  for (let k = 0; k <= 9; k++) {                      // his left brow (+x, high) → the nose bridge → his right cheek
    const x = 4 - k, y = 12 - k;
    scar.push(P([x - 1, y - 1, 3], [x + 1, y, 10], C.scarD), P([x, y, 3], [x + 2, y + 1, 10], C.scar));
  }
  const boxes = [
    // a broad square skull and jaw, heavy cheekbones, ears
    B([-7, 2, -6], [8, 13, 6], C.skin),
    B([-7, 0, -4], [8, 5, 5], C.skin), B([-4, -1, -2], [5, 1, 5], C.skin),
    B([-8, 5, -2], [9, 9, 1], C.skinD),
    ...symH(4, 7, 6, 8, 4, 6, C.skinH), ...symH(4, 7, 3, 6, 4, 6, C.skinD),
    // a broad flattened nose, heavy brows pulled down, a frown line
    B([-1, 5, 6], [2, 10, 8], C.skinH), B([-1, 4, 7], [3, 6, 9], C.skin), P([-1, 4, 8], [0, 5, 9], C.mouth), P([2, 4, 8], [3, 5, 9], C.mouth),
    ...symH(1, 7, 9, 11, 5, 7, C.hair, false),
    P([0, 9, 5], [1, 11, 8], C.skinD),
    // black stubble over the jaw, the hard mouth
    P([-7, 0, -4], [8, 5, 6], stub), P([-4, -1, -2], [5, 1, 6], stub), P([-8, 3, -3], [9, 9, 2], stub),
    ...scar,
    ...symH(2, 5, 7, 8, 5, 6, C.scl), ...symH(2, 4, 7, 8, 5, 6, C.eye), ...symH(1, 5, 8, 9, 5, 6, C.skinD),
    P([-2, 2, 4], [3, 3, 6], C.lip), P([-1, 2, 4], [2, 3, 6], C.mouth),
    // shaved to a dark stubble, a short rough topknot bound with a red-brown cord, loose ends sticking up
    B([-7, 13, -6], [8, 15, 5], scalp), B([-6, 15, -5], [7, 16, 4], scalp),
    P([-8, 9, -7], [9, 13, 0], scalp), B([-7, 4, -7], [8, 13, -5], scalp),
    B([-2, 15, -5], [3, 18, -1], hairP), B([-2, 16, -5], [3, 17, -1], C.cord),
    B([-1, 18, -4], [2, 21, -2], hairP), B([1, 19, -3], [3, 22, -2], C.hair), B([-2, 18, -5], [-1, 20, -4], C.hairH),
  ];
  return boxes.map((bx) => ({ ...bx, a: [bx.a[0], bx.a[1] - 1, bx.a[2] + 2], b: [bx.b[0], bx.b[1] - 1, bx.b[2] + 2],
    c: typeof bx.c === 'function' ? (x, y, z) => bx.c(x, y + 1, z - 2) : bx.c }));
}

// ---------------------------------------------------------------- the cleaver-glaive (weapon joint: shaft +Z, origin = rear grip)
function weaponGeo() {
  // haft at 0.02 (z −0.7 … 1.62): dark wood, iron bands, cord-wrapped grips, an iron butt cap
  const shaft = vox([
    B([-1, -1, -31], [1, 1, 81], (x, y, z) => ((z > -6 && z < 8) || (z > 24 && z < 36) ? (md(z + x + y, 2) ? C.wrapG : C.wrapGH)
      : ((z >> 2) & 1) ? C.haftH : C.haft)),
    ...[-26, -12, 12, 40, 58, 72].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.ironL : C.iron))),
    B([-2, -2, -33], [2, 2, -29], C.iron), B([-1, -1, -35], [1, 1, -33], C.ironL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // socket and langets at 0.012 (z 1.42 … 1.68)
  const v = 0.012, zs = Math.round(1.42 / v), zb = Math.round(1.66 / v), zt = Math.round(2.3 / v);
  const iron = vox([
    B([-2, -2, zs], [2, 2, zb - 8], (x, y, z) => (md(z, 5) === 0 ? C.ironL : C.iron)),
    B([-3, -3, zb - 8], [3, 3, zb + 1], (x, y, z) => (z === zb - 8 || z === zb ? C.ironL : C.ironD)),
  ], v, { jitter: 0.04, ao: 0.25 });
  // the blade (z 1.66 … 2.30): a thick dark spine on −X, a broad flat to the edge on +X, widening a little to a square
  // tip whose spine corner is clipped; a hole near the spine; the edge notched
  const boxes = [], edge = [], notch = new Set([zb + 9, zb + 10, zb + 24, zb + 38, zb + 39, zb + 46]);
  for (let z = zb; z < zt; z++) {
    const u = (z - zb) / (zt - zb), e = 14 + Math.round(u * 3), clip = zt - z < 6 ? (6 - (zt - z)) * 2 : 0;
    for (let x = -3 + clip; x < e; x++) {
      if (notch.has(z) && x >= e - 2) continue;
      if (Math.hypot(x - 2, z - (zt - 9)) < 2.2) continue;                                       // the hole
      const c = x === e - 1 ? C.edge : x <= -2 ? C.back : x <= 0 || Math.hypot(x - 2, z - (zt - 9)) < 3.3 ? C.steelD
        : hash01(x + 30, z, 3) < 0.12 ? C.steelD : C.steel;
      (c === C.edge ? edge : boxes).push(B([x, x <= -2 ? -2 : -1, z], [x + 1, x <= -2 ? 2 : 1, z + 1], c));
    }
  }
  // the flat is dull iron (metal), only the honed edge takes the bright blade material
  return [{ geo: shaft, mat: 'body' }, { geo: iron, mat: 'metal' }, { geo: vox(boxes, v, { jitter: 0.03, ao: 0.2 }), mat: 'metal' },
    { geo: vox(edge, v, { jitter: 0.02, ao: 0.1 }), mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
const cloak = (i, n) => {
  const boxes = [], width = 6 + Math.round(i * 0.6);
  for (let row = 0; row < 11; row++) {
    const w = width + Math.floor(row / 4);
    for (let x = -w; x <= w; x++) {
      const k = hash01(x + 20, row + i * 11, 3);
      if (Math.abs(x) >= w - 1 && k < 0.35) continue;                       // frayed edges
      if (i === n - 1 && row > 3 && k < (row - 3) / 7) continue;              // the torn hem
      if (i > 1 && k > 0.975) continue;                                       // moth holes
      boxes.push(B([x, -row - 1, 0], [x + 1, -row, 2], k < 0.1 ? C.cloakL : row % 4 === 0 ? C.cloakD : C.cloak));
    }
  }
  return vox(boxes, FV, { jitter: 0.03, ao: 0.17 });
};
const rag = (i, n) => vox([B([-2, -6, 0], [2, 0, 1], (x, y) => (i === n - 1 && y < -3 && hash01(x + 5, y + 5, i) < 0.5 ? null
  : md(x + y, 3) === 0 ? C.ragD : C.rag))], 0.012, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.18 });

export const DEF = {
  scale: 1.14,
  reach: { tip: 2.3, butt: 0.7 },
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const out = [];
    for (const x of [-0.12, 0, 0.12]) {
      out.push({ joint: 'chest', anchor: [x, 0.25, -0.18], rest: [x * 0.8, -1, -0.22], n: 7, len: 0.13, stiff: 0.15, drag: 0.22, wind: 1.1, cone: 80, sway: 0.2,
        seg: cloak, hit: ['chest', 'hips', 'thighL', 'thighR', 'kneeL', 'kneeR'] });
    }
    for (const k of [-1, 1]) {
      out.push({ joint: 'weapon', anchor: [k * 0.012, 0, 1.44], rest: [k * 0.3, -1, -0.2], n: 3, len: 0.07, stiff: 0.05, drag: 0.12, wind: 0.9, cone: 130,
        sway: 0.2, face: [1, 0, 0], seg: rag });
    }
    return out;
  },
};

const PORTRAIT = {
  face: [
    '.........KK.........',
    '........KrrK........',
    '......hhhKKhhh......',
    '....hhhhhhhhhhhh....',
    '...hhhhhhhhhhhhhh...',
    '...hSSSSSSSSSXSSh...',
    '...SKKKKSSSSXKKKS...',
    '...SSWESSSSXSEWSS...',
    '..sSSSSSSSSXSSSSSs..',
    '..sSSSSSSXsSSSSSSs..',
    '...SSSSSXssSSSSSS...',
    '...tSSSXSSSSSSSSt...',
    '...ttXSSMMMMSSStt...',
    '....tttttttttttt....',
    '.....tttttttttt.....',
    '..CC..tttttttt..CC..',
    '.CCCIiiIssssIiiICCC.',
    'CCIiIiIiILLIiIiIiICC',
    'CIiIiIiIiILLiIiIiIiC',
    'IiIiIiIiIiILLiIiIiIi',
  ],
  pal: { K: '#121010', r: '#7a2a1a', h: '#4a3a30', S: '#a8734e', s: '#83563a', X: '#dca08a', W: '#d8ccb8', E: '#0a0808',
    M: '#6e3a2c', t: '#3a281c', C: '#221e1c', I: '#2a2c30', i: '#4c5158', L: '#2e2218' },
};

export const NPC = {
  id: 'matseo', name: { zh: 'Mặt Sẹo', en: 'Mặt Sẹo' }, courtesy: { zh: '疤面', en: 'the scarred hunter' }, seal: '疤面',
  portrait: PORTRAIT, kit: npcKit(DEF, POLEARM),
};
