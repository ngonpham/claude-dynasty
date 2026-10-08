// 黎桓 (def-kit model: src/chars/defkit.js header), fine voxels (src/chars/parts.js FV) on the shared rig, a touch smaller
// and lean (kit scale 1.03). The orphan of Ái Châu risen in Đinh Liễn's service, young and quick: a clean-shaven narrow
// face, keen eyes under straight dark brows, a firm small mouth; bare-headed, the hair drawn up into a tight topknot
// bound in black cord and run through by a long gold pin, two indigo ribbons falling from it. An indigo tunic under a
// short black-lacquer lamellar vest with ochre-gold lips and an ochre-gold sun boss on the breast, ochre trim round the
// collar; small black-lacquer shoulder caps; the tunic sleeves tight to the forearm in black-lacquer bracers banded in
// gold, leather gloves. An ochre sash wound at the waist (its tails at the left hip) over a black belt, the tunic skirt
// split front and back (panels: chains); indigo trousers, black-lacquer greaves, dark leg wraps, sandals. Weapons: a
// pair of straight swords — black-cord grips, a gold cap pommel, a round gold guard like a little drum, a long bright
// blade with a dark fuller; an ochre tassel on the right pommel, an indigo one on the left. The right sword is the
// weapon joint's; kit.js hangs the second on the left hand (the same geometry).
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xd09a74, skinD: 0xa4704e, skinH: 0xe2b08a, lip: 0x9a5444, eye: 0x120a08, iris: 0x34200f, scl: 0xefe4d2,
  hair: 0x110d0c, hairH: 0x2a2220,
  ochre: 0xd09a30, ochreD: 0x86601a, ochreL: 0xf2c454,
  black: 0x1a1618, blackL: 0x34303a,
  indigo: 0x2c3a7a, indigoD: 0x1a2350, indigoL: 0x46589e,
  leather: 0x3e2a20, leatherL: 0x5e4232, wrap: 0x3a3440,
  grip: 0x161214, steel: 0xc6d0dc, edge: 0xf6faff, fuller: 0x707a88,
};
const cloth = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.indigoL : md(x - y * 2 + z, 9) === 0 ? C.indigoD : C.indigo);

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: the tunic skirt (sides only below the belt: panels front and back are chains), a black belt, the ochre sash
  // wound over it, its knot on the left hip
  T.hips = [
    B([-11, -10, -8], [11, 6, 8], C.indigoD),
    B([-13, -15, -9], [13, -1, 9], (x, y, z) => (Math.abs(z) > 4 && y < -5 ? null : y === -15 ? C.ochre : cloth(x, y, z))),
    B([-13, -1, -9], [13, 2, 9], C.black),
    B([-14, 2, -10], [14, 6, 10], (x, y, z) => (md(x + z + y, 4) === 0 ? C.ochreD : y === 5 ? C.ochreL : C.ochre)),
    B([9, -2, 6], [14, 6, 12], (x, y, z) => (md(x + y + z, 3) ? C.ochre : C.ochreL)),
  ];
  // waist: lacquered belly plates over the tunic
  T.spine = [
    B([-10, -6, -8], [10, 14, 8], cloth),
    ...lamellar([-10, -3, -8], [10, 13, 8], { base: C.black, rowH: 2, pw: 3, trim: C.ochre }),
  ];
  // chest: the short black-lacquer vest with ochre lips over the indigo tunic, the ochre sun boss, ochre-edged collar
  const boss = [];
  for (let y = -4; y <= 4; y++) for (let x = -4; x <= 4; x++) {
    const r = Math.hypot(x, y);
    if (r > 4.3) continue;
    boss.push(B([x, y + 9, 11], [x + 1, y + 10, r < 1.5 ? 14 : 13], r > 3.4 ? C.ochreD : r < 1.5 || md(Math.round(Math.atan2(y, x) * 8 / Math.PI), 2) ? C.ochreL : C.ochre));
  }
  T.chest = [
    B([-14, -4, -10], [14, 18, 10], cloth),
    ...lamellar([-13, -3, -10], [13, 16, 10], { base: C.black, rowH: 3, pw: 3, trim: C.ochre }),
    ...boss,
    ...[-1, 1].flatMap((sx) => [mirX(B([8, 13, -11], [12, 17, 11], C.ochre), sx), mirX(B([9, 14, -12], [11, 16, 12], C.ochreD, true), sx)]),
    B([-8, 16, -8], [8, 21, 8], (x, y, z) => (y === 20 ? C.ochreL : z > 5 && Math.abs(x + (y - 16) * 0.8 - 2) < 1.2 ? C.ochre : C.indigo)),
    B([-5, 15, -5], [5, 25, 5], -1),
  ];
  T.neck = [B([-4, -2, -4], [4, 6, 4], C.skinD), P([-4, 1, 3], [4, 6, 4], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // tight indigo sleeve, a lacquered guard over the outside
    T['upperArm' + s] = [
      B([-5, -24, -5], [5, 2, 5], cloth),
      ...lamellar([1, -12, -4], [6, -3, 4], { base: C.black, rowH: 2, pw: 3, trim: C.ochre, lipZ: false }).map((b) => mirX(b, sx)),
    ];
    T['foreArm' + s] = bracer(C.indigoD, [C.black, C.blackL, C.ochre]);
    T['hand' + s] = glove(sx, C.leather, C.leatherL);
    // indigo trousers
    T['thigh' + s] = [
      B([-6, -36, -6], [6, 2, 6], (x, y) => (md(y + (x & 1), 6) === 0 ? C.indigoD : C.indigo)),
      B([-7, -30, -7], [7, -20, 7], (x, y) => (md(y - x, 5) === 0 ? C.indigoD : C.indigo)),
      ...lamellar([-3, -14, -6], [8, 0, 7], { base: C.black, rowH: 2, pw: 3, trim: C.ochre, jag: true }).map((b) => mirX(b, sx)),
    ];
    // dark leg wraps, a lacquered greave with an ochre rim, an ochre garter
    T['shin' + s] = [
      B([-5, -34, -5], [5, 0, 5], (x, y, z) => (md(y + ((x + z) >> 1), 4) === 0 ? C.black : C.wrap)),
      B([-6, -4, -6], [6, 2, 6], C.indigo), B([-6, -6, -6], [6, -4, 6], C.ochre),
      ...lamellar([-4, -28, 2], [4, -8, 6], { base: C.black, rowH: 4, pw: 3, trim: C.ochre }),
    ];
    T['foot' + s] = [...boot(C.skin, C.skinD, C.leather), P([-7, -1, 2], [8, 2, 6], C.leather), P([-7, -5, 9], [8, -3, 12], C.leather)];
  }
  return T;
}

/** Small black-lacquer shoulder caps with ochre lips. Authored with +x outward. */
const pauldron = (sx) => [
  ...lamellar([-1, -3, -6], [6, 3, 6], { base: C.black, rowH: 3, pw: 3, trim: C.ochre, jag: true }),
  B([-2, 3, -6], [6, 4, 6], (x, y, z) => (md(x + z, 3) ? C.ochre : C.ochreL)),
].map((b) => mirX(b, sx));

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const hair = (x, y, z) => (md(x * 3 + z + y * 2, 7) === 0 ? C.hairH : C.hair);
  return [
    // a narrow young face, a pointed chin
    B([-6, 3, -6], [7, 14, 6], C.skin),
    B([-5, 1, -4], [6, 3, 5], C.skin), B([-3, 0, -2], [4, 1, 5], C.skin), B([-6, 3, -5], [7, 5, 6], C.skin),
    ...symH(4, 6, 5, 7, 5, 6, C.skinH),
    // hair swept back from a clean hairline over the crown and nape; ears, short sideburns
    B([-7, 4, -7], [8, 16, 6], (x, y, z) => {
      if (z >= 4 && y < 13) return null;
      if (Math.abs(x) >= 6 && z > -3 && y < 10) return null;
      if (z > -2 && y < 9 && Math.abs(x) < 6) return null;
      return hair(x, y, z);
    }),
    ...symH(6, 7, 6, 11, 2, 4, C.hair, false),
    ...symH(7, 8, 6, 10, -1, 2, C.skin, false), ...symH(7, 8, 7, 9, 0, 1, C.skinD),
    // straight dark brows, keen eyes (white, the dark iris toward the nose, the lid line), the outer corner tapered
    ...symH(1, 6, 10, 11, 5, 7, C.hair, false),
    ...symH(2, 5, 7, 9, 5, 6, C.scl), ...symH(2, 4, 7, 9, 5, 6, C.iris), ...symH(2, 3, 7, 9, 5, 6, C.eye),
    ...symH(2, 6, 9, 10, 5, 6, C.eye), ...symH(5, 6, 8, 9, 5, 6, C.skinD),
    // straight nose, a small firm mouth
    B([-1, 6, 6], [2, 9, 8], C.skinH), B([-1, 4, 6], [2, 6, 8], C.skin), P([-1, 4, 7], [0, 5, 8], C.skinD), P([1, 4, 7], [2, 5, 8], C.skinD),
    P([-1, 2, 5], [2, 3, 6], C.lip),
    // the tight topknot bound in black cord, the long gold pin through it
    B([-3, 16, -4], [4, 22, 2], hair),
    B([-3, 16, -4], [4, 18, 2], (x, y, z) => (md(x + z, 2) ? C.black : C.blackL)),
    B([-2, 22, -3], [3, 23, 1], hair),
    B([-8, 19, -2], [9, 20, -1], C.ochreL), B([-9, 18, -3], [-8, 21, 0], C.ochre), B([8, 19, -2], [9, 20, -1], C.ochre),
  ];
}

// ---------------------------------------------------------------- straight sword (shaft +Z, origin = the grip centre)
const SV = 0.01;
/** [{geo, mat}] of one sword: grip (body), gold fittings (metal), the blade (blade, index 2: kit.js and the twin view
 *  read it). The blade runs z 0.13 … 0.9 m. */
export function swordGeo() {
  const o = { off: [-0.5, -0.5, 0], jitter: 0.04, ao: 0.3 };
  const grip = vox([B([-1, -1, -11], [2, 2, 7], (x, y, z) => (md(z - x + y, 2) ? C.grip : C.blackL))], SV, o);
  const fit = vox([
    B([-2, -2, -14], [3, 3, -11], (x, y, z) => (z === -14 ? C.ochreL : C.ochre)),                // pommel cap
    B([-4, -4, 7], [5, 5, 10], (x, y) => (Math.hypot(x, y) > 4.4 ? null : Math.hypot(x, y) > 3.4 ? C.ochreD : md(x + y, 2) ? C.ochre : C.ochreL)),   // round guard
    B([-2, -2, 10], [3, 3, 13], C.ochreD),                                                        // collar
  ], SV, o);
  const boxes = [];
  for (let z = 13; z < 90; z++) {
    const u = (z - 13) / 77, hw = u < 0.86 ? (u < 0.5 ? 3 : 3 - (u > 0.7 ? 1 : 0)) : Math.max(0, Math.round(2 - (u - 0.86) * 18));
    boxes.push(B([-hw, 0, z], [hw + 1, 1, z + 1], (x) => (Math.abs(x) === hw && hw ? C.edge : x === 0 && u < 0.8 ? C.fuller : C.steel)));
    if (hw > 1) boxes.push(B([-1, -1, z], [2, 2, z + 1], (x) => (x === 0 && u < 0.8 ? C.fuller : C.steel)));
  }
  const blade = vox(boxes, SV, { off: [-0.5, -0.5, 0], jitter: 0.03, ao: 0.2 });
  return [{ geo: grip, mat: 'body' }, { geo: fit, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
const strand = (c, h, d) => (i, n) => vox([B([-1, -7, -1], [1, 0, 1], (x, y, z) => {
  const k = hash01(x + 9, z + 9, 5);
  if (i === n - 1 && -y > 3 + k * 5) return null;
  return k < 0.3 ? h : k > 0.8 ? d : c;
})], 0.011, { jitter: 0.06, ao: 0.25 });
/** Tunic panel (front / back): indigo, ochre-edged, an ochre hem. */
const panel = (i, n) => vox([B([-4, -8, 0], [4, 0, 1], (x, y) => (i === n - 1 && y <= -7 ? (y === -8 && x & 1 ? null : C.ochre)
  : x === -4 || x === 3 ? C.ochreD : cloth(x, y, i)))], FV * 1.2, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.2 });
const ribbon = (c, d) => (i, n) => vox([B([-1, -6, 0], [1, 0, 1], i === n - 1 ? d : c)], 0.012, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.1 });

export const LEHOAN_DEF = {
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: swordGeo() }),
  chains() {
    const legs = [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]];
    return [
      { joint: 'hips', anchor: [0, -0.01, 0.12], rest: [0, -1, 0.1], n: 3, len: 0.11, stiff: 0.12, drag: 0.14, wind: 0.5, face: [0, 0, 1], cone: 70, sway: 0.1,
        seg: panel, hit: legs },
      { joint: 'hips', anchor: [0, -0.01, -0.12], rest: [0, -1, -0.12], n: 3, len: 0.11, stiff: 0.12, drag: 0.14, wind: 0.6, face: [0, 0, -1], cone: 70, sway: 0.12,
        seg: panel, hit: ['hips', ...legs] },
      // the topknot's two indigo ribbons, the sash's two ochre tails on the left hip
      ...[-1, 1].map((sx) => ({ joint: 'head', anchor: [sx * 1.5 * HV, 18 * HV, -4.5 * HV], rest: [sx * 0.3, -0.5, -1], n: 5, len: 0.07,
        stiff: 0.03, drag: 0.06, wind: 2.4, cone: 105, sway: 0.6, seg: ribbon(C.indigoL, C.ochre), hit: ['head', ['chest', 0.02]] })),
      ...[0, 1].map((k) => ({ joint: 'hips', anchor: [0.15, 0.02, 0.1 - k * 0.03], rest: [0.2, -1, 0.15], n: 3, len: 0.075, stiff: 0.08, drag: 0.12,
        wind: 0.8, cone: 70, sway: 0.15, face: [1, 0, 0], seg: ribbon(C.ochre, C.ochreD), hit: [['thighL', 0.03]] })),
      // a tassel at each pommel (the left sword rides the left hand: its frame is the sword's, kit.js)
      ...[['weapon', C.ochre, C.ochreL, C.ochreD], ['handL', C.indigo, C.indigoL, C.indigoD]].flatMap(([joint, c, h, d]) => [0, 1, 2].map((k) => ({
        joint, anchor: [(k - 1) * 0.008, 0, -0.14], rest: [(k - 1) * 0.3, -1, -0.3], n: 3, len: 0.045, stiff: 0.05, drag: 0.12, wind: 0.8, cone: 130,
        sway: 0.15, face: [1, 0, 0], seg: strand(c, h, d) }))),
    ];
  },
};

// ---------------------------------------------------------------- HUD portrait (20 × 20): the black-bound topknot with
// its long gold pin, a young clean-shaven face, straight brows and keen eyes; the black-lacquer vest with ochre lips
// over the indigo tunic
export const FACE = [
  '........KKKK........',
  '..YYYYYYKKKKYYYYYY..',
  '........bbbb........',
  '......KKKKKKKK......',
  '....KKKKKKKKKKKK....',
  '...KKKKKKKKKKKKKK...',
  '...KKSSSSSSSSSSKK...',
  '...KSSSSSSSSSSSSK...',
  '..sKSKKKKSSKKKKSKs..',
  '..sSSWEESSSSEEWSSs..',
  '..SSSSSSSSSSSSSSSS..',
  '...SSSSSSssSSSSSS...',
  '...SSSSSSssSSSSSS...',
  '....SSSSSSSSSSSS....',
  '.....SSSSMMSSSS.....',
  '......sSSSSSSs......',
  '....IIIYsssssYIII...',
  '..IIBBBYYIIYYBBBII..',
  '.IIBBYBBBYYBBBYBBII.',
  'IIBBBBYBBBBBBYBBBBII',
];
export const PAL = { K: '#110d0c', Y: '#f2c454', b: '#34303a', S: '#d09a74', s: '#a4704e', W: '#efe4d2', E: '#120a08', M: '#9a5444',
  I: '#2c3a7a', B: '#1a1618' };
