// 阮匐 (def-kit model: src/chars/defkit.js header), fine voxels (src/chars/parts.js FV) on the shared rig, a size up (kit
// scale 1.1) and broad. The buffalo-herd's companion grown into the realm's strong arm: a weathered dark-tan face, a
// heavy brow knotted over deep-set eyes, a broad flat nose, a short black beard and moustache framing a set mouth. A
// jade-green khăn wound low and tight (a bronze-studded band over the brow, the knot behind trailing two tails). Dark
// buffalo-hide lamellar laced with bronze lips: a deep cuirass with a round bronze boss bearing a pair of buffalo horns
// (the Đông Sơn crescent), a jade sash slung as a baldric from the right shoulder to the left hip; massive layered hide
// shoulder guards studded with bronze rivets; bare, heavily muscled arms with bronze armlets, rawhide wrist wraps and
// bare fists. A wide hide belt with a bronze buckle under a jade sash wound twice (its tails hang at the right hip), the
// jade tunic skirt in front and behind (panels: chains), hide tassets; dark trousers rolled to the knee, rawhide leg
// wraps, bare feet on sandals. Weapon: the đại đao — a dark ironwood shaft banded in bronze with rawhide grips, a carved
// bronze dragon head as the guard whose jaws hold a broad heavy chopping blade (edge = local +Y, a straight back curving
// to the point, the belly swelling deep), a jade tassel under the jaws.
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, hand, bareArm, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xa86c46, skinD: 0x7c4c30, skinH: 0xc0825a, lip: 0x5e2a1e, mouth: 0x1e0a08, eye: 0x0c0806, iris: 0x2e1a0e, scl: 0xe6d8c4,
  hair: 0x120e0c, hairH: 0x2c2420,
  hide: 0x5e3c24, hideD: 0x3c2616, hideL: 0x7c5434,                    // dark buffalo hide
  bronze: 0xb08040, bronzeD: 0x6c4c22, bronzeL: 0xdcae5c,
  jade: 0x2e8a5c, jadeD: 0x1c5a3a, jadeL: 0x5cc08a,
  pants: 0x2c2620, pantsD: 0x1a1612, raw: 0xb89a70, rawD: 0x8a7050,
  leather: 0x3e2a1c, wood: 0x3a2418, woodH: 0x52341f,
  steel: 0xc0c8d2, edge: 0xf4f8fc, steelD: 0x68707c,
};
const cloth = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.jadeL : md(x - y * 2 + z, 9) === 0 ? C.jadeD : C.jade);
const studs = (x, y, z) => (md(x + z, 4) === 0 && md(y, 3) === 1 ? C.bronzeL : null);
/** Bronze boss with the buffalo-horn crescent (Đông Sơn style) on a front face at z, centred (0, cy), radius 5. */
const boss = (cy, z) => {
  const out = [];
  for (let y = -5; y <= 5; y++) for (let x = -5; x <= 5; x++) {
    const r = Math.hypot(x, y);
    if (r > 5.4) continue;
    const horn = Math.abs(Math.hypot(x, y + 3.2) - 4.2) < 0.75 && y > -2.5;     // two horns sweeping up from the brow
    out.push(B([x, y + cy, z], [x + 1, y + cy + 1, horn || r < 1.3 ? z + 3 : z + 2], horn ? C.bronzeL : r > 4.4 ? C.bronzeD : r < 1.3 ? C.bronzeL : C.bronze));
  }
  return out;
};

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: the jade skirt (sides only below the belt: front and back panels are chains), a wide hide belt with bronze
  // studs and a bronze buckle, the jade sash wound over it (knot on the right hip)
  T.hips = [
    B([-13, -10, -9], [13, 6, 9], C.jadeD),
    B([-15, -15, -11], [15, -1, 11], (x, y, z) => (Math.abs(z) > 6 && y < -5 ? null : y === -15 ? C.bronze : cloth(x, y, z))),
    B([-15, -1, -11], [15, 4, 11], (x, y, z) => (y === -1 ? C.hideD : md(x + z, 5) === 0 && y === 1 ? C.bronzeL : C.hide)),
    B([-16, 4, -12], [16, 7, 12], (x, y, z) => (md(x - z + y, 5) === 0 ? C.jadeD : C.jade)),
    B([-4, -2, 11], [5, 5, 13], (x, y) => (y === -2 || y === 4 ? C.bronzeD : C.bronze)), P([-2, 0, 12], [3, 3, 13], C.bronzeL),
    B([-16, 0, 4], [-11, 8, 13], (x, y, z) => (md(x + y + z, 3) ? C.jade : C.jadeL)),
  ];
  // waist: hide belly lamellar over the tunic
  T.spine = [
    B([-12, -6, -10], [12, 14, 10], C.jadeD),
    ...lamellar([-12, -5, -10], [12, 14, 10], { base: C.hide, rowH: 2, pw: 3, trim: C.bronze }),
  ];
  // chest: a deep hide cuirass with bronze lips, the horned bronze boss, the jade baldric from the right shoulder to the
  // left hip, a jade tunic collar, bronze rivets on the shoulder straps
  T.chest = [
    B([-16, -4, -12], [16, 19, 12], C.hideD),
    ...lamellar([-16, -4, -12], [16, 18, 12], { base: C.hide, rowH: 3, pw: 4, trim: C.bronze }),
    B([-17, -5, -13], [17, 20, 13], (x, y, z) => (Math.abs(x + (y - 7) * 1.05) < 3.2 ? (Math.abs(x + (y - 7) * 1.05) > 2.2 ? C.jadeD : cloth(x, y, z)) : null)),
    ...boss(9, 13),
    ...[-1, 1].flatMap((sx) => [mirX(B([9, 15, -14], [14, 19, 14], C.hideL), sx), mirX(B([9, 15, -14], [14, 19, 14], studs, true), sx)]),
    B([-9, 16, -9], [9, 22, 9], (x, y) => (y === 21 ? C.jadeL : C.jade)),
    B([-6, 15, -6], [6, 25, 6], -1),
  ];
  T.neck = [B([-6, -2, -6], [6, 6, 6], C.skinD), P([-6, 1, 5], [6, 6, 6], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // bare muscled arm, a bronze armlet; under the shoulder guard a jade sleeve cap
    T['upperArm' + s] = [...bareArm(C, [C.bronze, C.bronzeD, C.bronzeL]), B([-6, -6, -6], [7, 3, 7], cloth)];
    // bare forearm: thick at the elbow, rawhide wraps at the wrist
    T['foreArm' + s] = [
      B([-4, -23, -4], [5, 1, 5], (x, y, z) => (Math.abs(x) + Math.abs(z) > 6 + (y > -10 ? 1 : 0) ? null : z > 2 && y > -12 ? C.skinH : x > 2 ? C.skinD : C.skin)),
      B([-5, -23, -5], [6, -15, 6], (x, y, z) => (Math.abs(x) + Math.abs(z) > 8 ? null : md(y + x, 3) === 0 ? C.rawD : C.raw)),
    ];
    T['hand' + s] = hand(sx, C.skin, C.skinD);
    // dark trousers, hide tassets over the outside of the thigh
    T['thigh' + s] = [
      B([-8, -36, -8], [8, 2, 8], (x, y) => (md(y + (x & 1), 6) === 0 ? C.pantsD : C.pants)),
      ...lamellar([-4, -18, -8], [10, 0, 9], { base: C.hide, rowH: 3, pw: 4, trim: C.bronze, jag: true }).map((b) => mirX(b, sx)),
    ];
    // the trousers rolled at the knee, bare calf in rawhide wraps
    T['shin' + s] = [
      B([-6, -34, -6], [6, 0, 6], (x, y, z) => (y < -12 ? (md(y + ((x + z) >> 1), 4) === 0 ? C.rawD : C.raw) : z > 2 ? C.skinH : C.skin)),
      B([-7, -4, -7], [7, 2, 7], C.pants), B([-7, -6, -7], [7, -4, 7], C.pantsD),
    ];
    T['foot' + s] = [...boot(C.skin, C.skinD, C.leather), P([-7, -1, 2], [8, 2, 6], C.leather), P([-7, -5, 9], [8, -3, 12], C.leather)];
  }
  return T;
}

/** Massive layered hide shoulder guards, bronze-lipped, studded with bronze rivets. Authored with +x outward. */
const pauldron = (sx) => [
  ...lamellar([-1, -7, -10], [10, 0, 10], { base: C.hide, rowH: 3, pw: 4, trim: C.bronze, jag: true }),
  ...lamellar([-3, 0, -10], [9, 6, 10], { base: C.hide, rowH: 3, pw: 4, trim: C.bronze }),
  B([-4, 6, -9], [8, 8, 9], (x, y, z) => (md(x + z, 3) === 0 ? C.bronzeL : C.hideL)),
  B([-4, -7, -11], [11, 8, 11], studs, true),
].map((b) => mirX(b, sx));

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const beard = (x, y, z) => (md(x * 3 + y + z, 4) === 0 ? C.hairH : C.hair);
  const khan = (x, y, z) => (md(x + 2 * y + z, 6) === 0 ? C.jadeD : md(x - y, 7) === 0 ? C.jadeL : C.jade);
  return [
    // broad skull, a heavy jaw, wide cheekbones, ears
    B([-7, 2, -6], [8, 14, 6], C.skin),
    B([-7, -1, -5], [8, 4, 5], C.skin),
    ...symH(4, 7, 5, 7, 5, 6, C.skinH),
    ...symH(7, 8, 6, 10, -2, 1, C.skinD),
    // deep-set eyes under a knotted brow: thick brows sloping down to the nose, the lids in shade
    ...symH(2, 6, 7, 8, 5, 6, C.scl), ...symH(2, 4, 7, 8, 5, 6, C.iris), ...symH(2, 3, 7, 8, 5, 6, C.eye),
    ...symH(1, 6, 8, 9, 5, 6, C.skinD), ...symH(1, 6, 6, 7, 5, 6, C.skinD),
    ...symH(1, 3, 9, 11, 5, 7, C.hair, false), ...symH(3, 7, 10, 12, 5, 7, C.hair, false),
    P([0, 9, 5], [1, 12, 6], C.skinD),
    // broad flat nose
    B([-2, 5, 6], [3, 9, 8], C.skin), B([-2, 4, 6], [3, 6, 9], C.skinH), P([-2, 4, 8], [-1, 5, 9], C.mouth), P([2, 4, 8], [3, 5, 9], C.mouth),
    // short black beard round the jaw and chin, moustache, a set mouth in it
    B([-8, -3, -3], [9, 4, 7], (x, y, z) => (y >= 1 && (z > 3 || Math.abs(x) < 6) ? null : hash01(x, y, z) < 0.12 && y < -1 ? null : beard(x, y, z))),
    B([-3, 3, 6], [4, 4, 8], beard), ...symH(3, 5, 1, 4, 5, 8, C.hair, false),
    P([-2, 1, 6], [3, 2, 7], C.lip), P([-1, 2, 6], [2, 3, 7], C.mouth),
    B([-8, 4, -4], [-7, 12, 2], beard), B([8, 4, -4], [9, 12, 2], beard),
    // the jade khăn wound low: a bronze-studded band over the brow, the cloth over the crown, the knot behind
    B([-8, 12, -8], [9, 15, 7], (x, y, z) => (y === 12 ? (z > 0 && md(x, 3) === 0 ? C.bronzeL : C.bronzeD) : khan(x, y, z))),
    B([-7, 15, -7], [8, 19, 6], khan), B([-5, 19, -5], [6, 20, 4], khan),
    B([-8, 4, -8], [9, 12, -6], khan),
    B([-2, 11, -10], [3, 15, -8], C.jadeD), P([-2, 12, -10], [3, 13, -9], C.bronze),
  ];
}

// ---------------------------------------------------------------- đại đao (weapon joint: shaft +Z, origin = rear grip)
function weaponGeo() {
  // shaft at 0.02 (z −0.9 … 1.4): dark ironwood, bronze rings, rawhide wraps at both grips, a bronze butt spike
  const grip = (z) => (z > -6 && z < 8) || (z > 25 && z < 38);
  const shaft = vox([
    B([-1, -1, -42], [1, 1, 70], (x, y, z) => (grip(z) ? (md(z + x + y, 2) ? C.raw : C.rawD) : md(z + x, 6) === 0 ? C.woodH : C.wood)),
    ...[-36, -14, 16, 46, 62].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.bronzeL : C.bronzeD))),
    B([-2, -2, -42], [2, 2, -39], C.bronze), B([-1, -1, -46], [1, 1, -42], C.bronzeL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // carved bronze dragon head at 0.012 (z 1.36 … 1.6) facing up the blade: a ringed neck, brow and snout on the spine
  // side, jaws round the blade's root, a curled crest, jade eyes
  const carve = (x, y, z) => (md(z + Math.abs(x) + y, 3) === 0 ? C.bronzeD : md(x + z, 5) === 0 ? C.bronzeL : C.bronze);
  const dragon = vox([
    B([-3, -3, 113], [3, 3, 121], (x, y, z) => (md(z, 3) === 0 ? C.bronzeD : C.bronze)),
    B([-5, -6, 121], [5, 5, 129], carve),
    B([-4, -7, 129], [4, -1, 135], carve), B([-4, 3, 129], [4, 6, 133], C.bronzeD),
    B([-3, -1, 129], [3, 3, 133], C.mouth),
    B([-6, -4, 124], [-5, -2, 127], C.jadeL), B([5, -4, 124], [6, -2, 127], C.jadeL),
    B([-1, -10, 116], [1, -6, 129], (x, y, z) => (md(z + y, 3) ? C.bronzeL : null)),
    B([-6, -8, 117], [-4, -5, 122], C.bronzeD), B([4, -8, 117], [6, -5, 122], C.bronzeD),
  ], 0.012, { jitter: 0.05, ao: 0.35 });
  // the broad blade at 0.011 (z 1.46 … 2.2, 2 voxels thick): a straight back curving at the point, the belly swelling
  // to ≈ 0.3 m, a bright edge band, a dark line along the back, a bronze collar at the root
  const bv = 0.011, z0 = Math.round(1.46 / bv), z1 = Math.round(2.2 / bv), L = z1 - z0, boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / L, back = Math.round(-2 - 9 * Math.pow(Math.max(0, u - 0.6) / 0.4, 2));
    const f = back + Math.max(1, Math.round(22 * Math.pow(Math.sin(Math.PI * (0.1 + 0.9 * u)), 0.6) * (1 - 0.2 * u) + 3 * (1 - u)));
    boxes.push(B([-1, back, z], [1, f, z + 1], (_, y) => (u < 0.05 ? C.bronze : y >= f - 2 ? C.edge : y <= back + 1 ? C.steelD : C.steel)));
  }
  const blade = vox(boxes, bv, { jitter: 0.03, ao: 0.2 });
  return [{ geo: shaft, mat: 'body' }, { geo: dragon, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
/** Cloth tail: a jade strip, the end in a bronze-weighted fringe. */
const tail = (i, n) => vox([B([-2, -7, 0], [2, 0, 1], (x, y) => (i === n - 1 && y <= -5 ? (y === -7 && x & 1 ? null : C.bronze) : x === -2 ? C.jadeD : C.jade))],
  FV, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.15 });
/** Tunic panel w half-width: jade with dark borders and a bronze hem. */
const panel = (w) => (i, n) => vox([B([-w, -9, 0], [w, 0, 1], (x, y) => (i === n - 1 && y <= -8 ? (y === -9 && x & 1 ? null : C.bronze)
  : x === -w || x === w - 1 ? C.jadeD : cloth(x, y, i)))], FV * 1.2, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.2 });
/** Jade silk tassel strand. */
const tassel = (i, n) => vox([B([-1, -6, -1], [2, 0, 2], (x, y, z) => (i === n - 1 && y < -3 && hash01(x + 3, z + 3, y) < 0.4 ? null : md(x + z, 3) === 0 ? C.jadeL : md(x - z, 4) === 0 ? C.jadeD : C.jade))],
  0.012, { jitter: 0.06, ao: 0.2 });

export const NGUYENBAC_DEF = {
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const legs = [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]];
    return [
      { joint: 'hips', anchor: [0, -0.02, 0.15], rest: [0, -1, 0.1], n: 3, len: 0.125, stiff: 0.13, drag: 0.16, wind: 0.4, face: [0, 0, 1], cone: 70, sway: 0.08,
        seg: panel(6), hit: legs },
      { joint: 'hips', anchor: [0, -0.02, -0.15], rest: [0, -1, -0.12], n: 3, len: 0.125, stiff: 0.13, drag: 0.16, wind: 0.5, face: [0, 0, -1], cone: 70, sway: 0.1,
        seg: panel(8), hit: ['hips', ...legs] },
      // the khăn's tails from the knot behind, the sash's from the right hip
      ...[-1, 1].map((sx) => ({ joint: 'head', anchor: [sx * 1.5 * HV, 13 * HV, -9.5 * HV], rest: [sx * 0.2, -1, -0.4], n: 4, len: 0.07, stiff: 0.06,
        drag: 0.08, wind: 1.8, cone: 110, sway: 0.45, face: [0, 0, -1], seg: tail, hit: ['head', ['chest', 0.03]] })),
      ...[0, 1].map((k) => ({ joint: 'hips', anchor: [-0.17, 0.03, 0.1 - k * 0.04], rest: [-0.2, -1, 0.1], n: 4, len: 0.075, stiff: 0.08, drag: 0.12,
        wind: 0.7, cone: 70, sway: 0.15, face: [-1, 0, 0], seg: tail, hit: [['thighR', 0.03]] })),
      // the jade tassel under the dragon's jaws
      ...Array.from({ length: 5 }, (_, k) => {
        const a = k * 1.2566 + 0.4, ox = Math.cos(a) * 0.015, oy = Math.sin(a) * 0.015;
        return { joint: 'weapon', anchor: [ox, oy, 1.34], rest: [ox * 10, oy * 5 - 1, -0.3], n: 3, len: 0.072, stiff: 0.05 + k * 0.005, drag: 0.12, wind: 0.8,
          cone: 130, sway: 0.15, face: [1, 0, 0], seg: tassel };
      }),
    ];
  },
};

// ---------------------------------------------------------------- HUD portrait (20 × 20): the jade wrap with its bronze
// band, knotted brows over deep eyes, a broad dark-tan face in a short black beard; hide lamellar, the jade baldric
export const FACE = [
  '....................',
  '......JJJJJJJJ......',
  '....JJJjJJJJjJJJ....',
  '...JJjJJJJJJJJjJJ...',
  '...JJJJJJJJJJJJJJ...',
  '...BbBbBbBbBbBbBB...',
  '...KSSSSSSSSSSSSK...',
  '..sKKKKSSSSSSKKKKs..',
  '..sSSKKKSssSKKKSSs..',
  '..SSsWEESSSSEEWsSS..',
  '..SSssSSSSSSSSssSS..',
  '..KSSSSSnnnnSSSSSK..',
  '..KKSSSsmmmmsSSSKK..',
  '..KKKKKKKKKKKKKKKK..',
  '...KKKKKMMMMKKKKK...',
  '....KKKKKKKKKKKK....',
  'HHHHHHKKKKKKKKHJJHHH',
  'HhHHHHHHssssHJJHhHHH',
  'HHbHhHHHHHHJJHHHHbHH',
  'HhHHHHHHHHJJbbHHhHHH',
];
export const PAL = { J: '#2e8a5c', j: '#1c5a3a', B: '#b08040', b: '#dcae5c', K: '#120e0c', S: '#a86c46', s: '#7c4c30', W: '#e6d8c4', E: '#0c0806',
  M: '#5e2a1e', n: '#c0825a', m: '#1e0a08', H: '#5e3c24', h: '#3c2616' };
