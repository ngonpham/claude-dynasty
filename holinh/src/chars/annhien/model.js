// An Nhiên 安然 (def-shaped model on Zhao Yun's spear kit: kit.js), fine voxels (src/chars/parts.js FV) on the shared
// rig. The Left General's daughter, the face of the game (comic token AN_NHIEN): a young Vietnamese warrior woman, slim
// and athletic — narrower shoulders, a cinched waist, slimmer limbs than the men's, never exaggerated. An oval face with
// a small pointed chin, clear fierce eyes (dark lashes, a lifted outer corner) under fine straight brows, a small firm
// mouth; the hair centre-parted and smoothed back, two long locks framing the cheeks, and one long braid from the nape
// down her back to the waist (a chain, tied off in cinnabar cord). A red headband (khăn đỏ) round the brow, its knot
// behind and two tails streaming. Red-brown fitted lamellar with leather lips over a white-cream under-robe: the
// robe's crossed collar (left over right, a cinnabar edge) at the throat, its sleeves white to the elbow under small
// red-brown guards; leather shoulder straps riveted in bronze, small rounded red-brown shoulder caps; a leather belt
// cinched at the waist (bronze buckle), red-brown lamellar skirt panels front and back over the cream robe's hem
// (chains); red-brown leather bracers, bare hands; dark trousers under short tassets, cream leg wraps banded red-brown,
// short leather boots. Weapon: the spear-sword (thương) — a red-lacquered shaft banded in bronze with black cord grips,
// a steel socket and a small swept bronze guard, a long narrow leaf blade with a raised ridge; under it a small white
// reed plume (bông lau, the motif of legitimacy) that floats on the wind.
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, hand, bracer, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xdcab88, skinD: 0xb07e5c, skinH: 0xecc09e, blush: 0xd89a84, lip: 0xb24a40, eye: 0x100808, iris: 0x3a2014, scl: 0xf2e8da,
  hair: 0x100c0c, hairH: 0x2c2226,
  red: 0xcc2a20, redD: 0x84160f, redL: 0xec4c34,                       // the headband, cinnabar trim
  rb: 0x8c3624, rbD: 0x5a1e14, rbL: 0xa84a32,                          // red-brown lacquered leather lamellar
  robe: 0xece2c8, robeD: 0xc8b896, robeL: 0xfaf4e4,                    // white-cream under-robe
  leather: 0x4a2e1e, leatherD: 0x2e1c12, leatherL: 0x6c4630,
  pants: 0x241c1c, pantsD: 0x161010, wrap: 0xd8ccae, wrapD: 0xaa9a78,
  bronze: 0xb08040, bronzeD: 0x6c4c1e, bronzeL: 0xdcb062,
  shaft: 0x9a1c12, shaftH: 0xbc2a1a, cord: 0x141010,
  steel: 0xccd4de, edge: 0xf6f9fc, fuller: 0x7c8694,
  reed: 0xf4eedc, reedH: 0xfffbf0, reedD: 0xd2c6a4,
};
const robe = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.robeL : md(x - y * 2 + z, 9) === 0 ? C.robeD : C.robe);
const leather = (x, y, z) => (md(x + z + y * 2, 7) === 0 ? C.leatherL : C.leather);

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: the cream robe at the sides below the belt (front and back: the lamellar skirt panels, chains), the leather
  // belt cinched with a bronze buckle and a small pouch on the right hip
  T.hips = [
    B([-11, -10, -7], [11, 6, 7], C.robeD),
    B([-12, -16, -8], [12, -1, 8], (x, y, z) => (Math.abs(z) > 4 && y < -5 ? null : y === -16 ? C.rbD : robe(x, y, z))),
    B([-12, -1, -8], [12, 4, 8], (x, y, z) => (y === -1 || y === 3 ? C.leatherD : leather(x, y, z))),
    B([-2, -1, 8], [3, 4, 10], (x, y) => (y === -1 || y === 3 ? C.bronzeD : x === 0 ? C.bronzeL : C.bronze)),
    B([-14, -6, -2], [-11, 1, 4], (x, y) => (y === 0 ? C.leatherD : C.leatherL)), P([-14, -2, 3], [-12, 0, 4], C.bronze),
  ];
  // waist: narrow, red-brown belly lamellar over the robe, a leather band under the cuirass
  T.spine = [
    B([-9, -6, -7], [9, 14, 7], robe),
    ...lamellar([-9, -4, -7], [9, 9, 7], { base: C.rb, rowH: 2, pw: 3, trim: C.leatherL }),
    B([-10, 9, -8], [10, 12, 8], (x, y) => (y === 9 ? C.leatherD : C.leather)),
  ];
  // chest: the fitted red-brown cuirass (a gentle front, leather lips), riveted leather straps over the shoulders, the
  // robe's crossed collar at the throat (left panel over right, a cinnabar edge), leather-edged armholes
  const collar = (x, y, z) => {
    if (z < 5) return y === 20 ? C.redD : C.robe;
    const d = x + (y - 15) * 0.9;
    if (y >= 15 && x > -(y - 14) && x < y - 14 && d < 3) return C.robeD;
    return Math.abs(d - 3) < 1.2 ? C.red : C.robe;
  };
  T.chest = [
    B([-13, -4, -9], [13, 18, 9], robe),
    ...lamellar([-12, -3, -9], [12, 5, 9], { base: C.rb, rowH: 2, pw: 3 }),
    ...lamellar([-13, 5, -10], [13, 15, 10], { base: C.rb, rowH: 3, pw: 3, trim: C.leatherL }),
    B([-9, 7, 10], [9, 13, 11], (x, y) => ((Math.abs(x + 0.5) > 7.5 && (y === 7 || y === 12)) ? null : md(x + (y > 9 ? 1 : 0), 3) === 0 ? C.rbD : y === 9 ? C.rbL : C.rb)),
    ...[-1, 1].flatMap((sx) => [mirX(B([7, 13, -11], [10, 17, 11], leather), sx), mirX(B([8, 14, 11], [9, 15, 12], C.bronzeL), sx),
      mirX(B([8, 14, -12], [9, 15, -11], C.bronze), sx)]),
    B([-14, 3, -8], [-12, 14, 8], C.leatherD), B([12, 3, -8], [14, 14, 8], C.leatherD),
    B([-8, 15, -8], [8, 21, 8], collar),
    B([-5, 15, -5], [5, 25, 5], -1),
  ];
  T.neck = [B([-4, -2, -4], [4, 6, 4], C.skinD), P([-4, 1, 3], [4, 6, 4], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // the robe's white sleeve, gathered in folds at the elbow, a small red-brown guard over the outside
    T['upperArm' + s] = [
      B([-5, -23, -5], [5, 2, 5], robe),
      B([-6, -24, -6], [6, -20, 6], (x, y, z) => (Math.abs(x) + Math.abs(z) > 9 ? null : md(y + x + z, 3) === 0 ? C.robeD : C.robeL)),
      ...lamellar([2, -11, -4], [6, -1, 4], { base: C.rb, rowH: 2, pw: 3, trim: C.leatherL, lipZ: false }).map((b) => mirX(b, sx)),
    ];
    T['foreArm' + s] = bracer(C.robe, [C.rb, C.rbD, C.leatherL]);
    T['hand' + s] = hand(sx, C.skin, C.skinD);
    // dark trousers, a short red-brown tasset over the outside of the thigh
    T['thigh' + s] = [
      B([-6, -36, -6], [6, 2, 6], (x, y) => (md(y + (x & 1), 6) === 0 ? C.pantsD : C.pants)),
      B([-7, -30, -7], [7, -20, 7], (x, y) => (md(y - x, 5) === 0 ? C.pantsD : C.pants)),
      ...lamellar([-3, -12, -6], [8, 0, 7], { base: C.rb, rowH: 2, pw: 3, trim: C.leatherL, jag: true }).map((b) => mirX(b, sx)),
    ];
    // cream leg wraps wound on the diagonal, red-brown garters, a short leather boot
    T['shin' + s] = [
      B([-5, -34, -5], [5, 0, 5], (x, y, z) => (y < -26 ? C.leather : md(y + ((x + z) >> 1), 4) === 0 ? C.wrapD : C.wrap)),
      B([-6, -4, -6], [6, 2, 6], C.pants), B([-6, -6, -6], [6, -4, 6], C.rb),
      B([-6, -27, -6], [6, -25, 6], (x, y) => (y === -27 ? C.leatherD : C.rb)),
    ];
    T['foot' + s] = boot(C.leather, C.leatherD, C.leatherD, { trim: C.rb });
  }
  return T;
}

/** Small rounded red-brown shoulder caps, leather-lipped. Authored with +x outward. */
const pauldron = (sx) => [
  ...lamellar([-1, -4, -6], [6, 1, 6], { base: C.rb, rowH: 2, pw: 3, trim: C.leatherL, jag: true }),
  B([-2, 1, -6], [6, 3, 6], (x, y, z) => (x === 5 || Math.abs(z + 0.5) > 5 ? C.leatherL : y === 2 ? C.rbL : C.rb)),
].map((b) => mirX(b, sx));

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const hair = (x, y, z) => (md(x * 3 + z + y * 2, 7) === 0 ? C.hairH : C.hair);
  // khăn đỏ: a red band round the brow, a darker fold through its middle, the knot behind (tails: chains)
  const band = (x, y, z) => (y === 14 ? (md(x + z, 4) === 0 ? C.red : C.redD) : md(x - z + y, 5) === 0 ? C.redL : C.red);
  return [
    // an oval face, a narrow soft jaw, a small pointed chin
    B([-6, 3, -6], [7, 15, 6], C.skin),
    B([-5, 1, -4], [6, 3, 5], C.skin), B([-3, 0, -2], [4, 1, 5], C.skin), B([-6, 3, -5], [7, 5, 6], C.skin),
    ...symH(4, 6, 5, 6, 5, 6, C.blush), ...symH(5, 6, 1, 3, 3, 5, C.skinD),
    // hair: back of the head down to the nape, over the crown above the band (centre-parted), long locks framing the
    // cheeks; ears half hidden
    B([-7, 2, -7], [8, 19, -2], hair),
    B([-6, 16, -6], [7, 19, 6], (x, y, z) => (x === 0 && z > 1 && y === 18 ? C.hairH : hair(x, y, z))),
    B([-5, 19, -5], [6, 20, 4], hair),
    ...symH(7, 8, 5, 9, -1, 2, C.skinD),
    ...symH(6, 8, 2, 13, 1, 5, C.hair, false), ...symH(6, 7, 1, 2, 2, 4, C.hair, false), ...symH(7, 8, 4, 13, -2, 1, C.hair, false),
    // fine straight brows lifting at the outer end, clear wide eyes (white, the dark iris toward the nose, a dark lash
    // line flicked up at the outer corner), a straight small nose
    ...symH(1, 5, 11, 12, 5, 7, C.hair, false), ...symH(5, 7, 12, 13, 5, 7, C.hair, false),
    ...symH(2, 5, 6, 9, 5, 6, C.scl), ...symH(2, 4, 6, 9, 5, 6, C.iris), ...symH(2, 3, 7, 9, 5, 6, C.eye),
    ...symH(2, 6, 9, 10, 5, 6, C.eye), ...symH(6, 7, 10, 11, 5, 6, C.eye),
    B([-1, 5, 6], [2, 8, 7], C.skinH), P([-1, 4, 5], [0, 5, 7], C.skinD), P([1, 4, 5], [2, 5, 7], C.skinD),
    // a small firm mouth
    P([-1, 3, 5], [2, 4, 6], C.lip), P([-2, 3, 5], [-1, 4, 6], C.skinD), P([2, 3, 5], [3, 4, 6], C.skinD),
    // the band, its knot behind
    B([-7, 13, -7], [8, 16, 7], band),
    B([-2, 12, -9], [3, 16, -7], C.redD), P([-1, 13, -9], [2, 15, -8], C.red),
    // the braid's root gathered at the nape, a cinnabar cord round it
    B([-2, 3, -9], [3, 9, -7], hair), B([-2, 3, -10], [3, 5, -7], C.red),
  ];
}

// ---------------------------------------------------------------- the spear-sword (weapon joint: shaft +Z, origin = rear grip)
function weaponGeo() {
  // shaft at 0.02 (z −0.8 … 1.46): red lacquer, bronze bands, black cord at both grips, a bronze butt cap
  const cord = (z) => (z > -6 && z < 8) || (z > 22 && z < 34);
  const shaft = vox([
    B([-1, -1, -40], [1, 1, 73], (x, y, z) => (cord(z) ? (md(z + x + y, 2) ? C.cord : C.leather) : ((z >> 1) & 1) ? C.shaftH : C.shaft)),
    ...[-34, -8, 36, 66].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.bronzeL : C.bronze))),
    B([-2, -2, -40], [2, 2, -36], C.bronze), B([-1, -1, -43], [1, 1, -40], C.bronzeL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // steel socket at 0.012 (z 1.44 … 1.6), banded; a small bronze guard swept up toward the blade
  const socket = vox([
    B([-2, -2, 120], [3, 3, 133], (x, y, z) => (md(z, 4) === 0 ? C.fuller : C.steel)),
    B([-3, -3, 121], [4, 4, 124], C.bronze),
    B([-6, -2, 130], [7, 3, 132], (x) => (Math.abs(x - 0.5) > 4.5 ? C.bronzeL : C.bronze)),
    B([-7, -1, 132], [-5, 2, 134], C.bronzeL), B([6, -1, 132], [8, 2, 134], C.bronzeL),
  ], 0.012, { off: [-0.5, -0.5, 0], jitter: 0.05, ao: 0.35 });
  // the long narrow leaf blade at 0.011 (z 1.58 … 2.08): straight for most of its run, a raised ridge, bright edges
  const bv = 0.011, z0 = Math.round(1.58 / bv), z1 = Math.round(2.08 / bv), boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0);
    const w = u < 0.08 ? 3 + Math.round(u * 25) : u < 0.6 ? 5 : Math.max(1, Math.round(5 * Math.pow(1 - (u - 0.6) / 0.4, 0.75)));
    boxes.push(B([-w, -1, z], [w, 1, z + 1], (x) => (Math.abs(x + 0.5) >= w - 1 ? C.edge : Math.abs(x + 0.5) < 1 ? C.fuller : C.steel)));
    if (u < 0.88) boxes.push(B([-1, -2, z], [1, 2, z + 1], (x, y) => (y === -2 || y === 1 ? C.fuller : C.steel)));
  }
  const blade = vox(boxes, bv, { jitter: 0.03, ao: 0.2 });
  return [{ geo: shaft, mat: 'body' }, { geo: socket, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
/** The braid: three strands plaited (each row's highlight steps across and back), tapering, tied off in cinnabar cord
 *  with a short loose tuft. */
const braid = (i, n) => {
  const last = i === n - 1, out = [];
  for (let y = -6; y < 0; y++) {
    const r = i * 6 - y, w = last ? (y < -2 ? 1 : 2) : i === 0 ? 3 : 2;
    if (last && y === -2) { out.push(B([-2, y, -2], [2, y + 1, 2], C.red)); continue; }
    if (last && y < -2) {
      out.push(B([-w, y, -w], [w, y + 1, w], (x, yy, z) => (hash01(x + 5, z + 5, yy + 9) < 0.35 ? null : C.hair)));
      continue;
    }
    const k = md(r, 4), sx = k === 0 ? -1 : k === 2 ? 1 : 0;
    out.push(B([-w, y, -w], [w, y + 1, w], (x) => (x === sx * (w - 1) || md(x - sx + r, 3) === 0 ? C.hairH : C.hair)));
  }
  return vox(out, FV, { jitter: 0.02, ao: 0.25 });
};
/** Reed-flower strand: soft pale fluff, every (x, z) column its own white, the tip thinning to wisps. */
const reed = (i, n) => {
  const w = 1, last = i === n - 1;
  return vox([B([-w, -6, -w], [w, 0, w], (x, y, z) => {
    const k = hash01(x + 9, z + 9 + i * 3, y + 20);
    if (k < (last ? 0.5 : 0.22)) return null;
    return k > 0.82 ? C.reedD : k > 0.5 ? C.reedH : C.reed;
  })], 0.012, { jitter: 0.08, ao: 0.15 });
};
/** Lamellar skirt panel (front / back): red-brown rows with leather lips, the cream robe's hem showing below. */
const panel = (i, n) => vox([B([-4, -8, 0], [4, 0, 1], (x, y) => {
  if (i === n - 1 && y <= -6) return y === -8 && x & 1 ? null : C.robe;
  if (x === -4 || x === 3) return C.leather;
  return md(y + i * 8, 3) === 0 ? C.leatherL : md(x + (md(Math.floor((y + i * 8) / 3), 2) ? 1 : 0), 3) === 0 ? C.rbD : C.rb;
})], FV * 1.2, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.2 });
/** Band tail: a red cloth strip, the end darker. */
const tail = (i, n) => vox([B([-2, -6, 0], [2, 0, 1], (x, y) => (i === n - 1 && y <= -4 ? (y === -6 && (x === -2 || x === 1) ? null : C.redD) : x === -2 ? C.redD : C.red))],
  FV, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.15 });

export const ANNHIEN_DEF = {
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const legs = [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]];
    return [
      { joint: 'hips', anchor: [0, -0.01, 0.12], rest: [0, -1, 0.1], n: 3, len: 0.11, stiff: 0.12, drag: 0.14, wind: 0.5, face: [0, 0, 1], cone: 70, sway: 0.1,
        seg: panel, hit: legs },
      { joint: 'hips', anchor: [0, -0.01, -0.12], rest: [0, -1, -0.12], n: 3, len: 0.11, stiff: 0.12, drag: 0.14, wind: 0.6, face: [0, 0, -1], cone: 70, sway: 0.12,
        seg: panel, hit: ['hips', ...legs] },
      // the long braid from the nape down her back to the waist: weighty, it swings late
      { joint: 'head', anchor: [0, 4 * HV, -9.5 * HV], rest: [0, -1, -0.25], n: 7, len: 0.07, stiff: 0.07, drag: 0.1, wind: 0.6, grav: 1.2, cone: 95, sway: 0.12,
        face: [0, 0, -1], seg: braid, hit: ['head', ['chest', 0.035], ['hips', 0.03]] },
      // the band's two tails from the knot behind
      ...[-1, 1].map((sx) => ({ joint: 'head', anchor: [sx * 1.5 * HV, 14.5 * HV, -9 * HV], rest: [sx * 0.3, -0.7, -1], n: 4, len: 0.07,
        stiff: 0.04, drag: 0.07, wind: 2.2, cone: 110, sway: 0.55, face: [0, 0, -1], seg: tail, hit: ['head', ['chest', 0.03]] })),
      // bông lau: the small white reed plume under the socket, light and floating
      ...Array.from({ length: 5 }, (_, k) => {
        const a = k * 1.2566, ox = Math.cos(a) * 0.012, oy = Math.sin(a) * 0.012;
        return { joint: 'weapon', anchor: [ox, oy, 1.45], rest: [ox * 14, oy * 6 - 1, -0.5], n: 2, len: 0.055, stiff: 0.04 + k * 0.004, drag: 0.1, wind: 1.6,
          grav: 0.6, cone: 140, sway: 0.3, face: [1, 0, 0], seg: reed };
      }),
    ];
  },
};

// ---------------------------------------------------------------- HUD portrait (20 × 20): the red headband (its tails
// streaming to the right), centre-parted black hair with long locks framing an oval face, clear eyes under fine brows;
// the cream crossed collar in the red-brown cuirass, the braid falling over her left shoulder
export const FACE = [
  '.......KKKKKK.......',
  '.....KKKKhKKKKK.....',
  '....KKKKKhKKKKKK....',
  '...RRRRRRRRRRRRRR...',
  '...RrRRRRrRRRRrRRRr.',
  '...KSSSSSSSSSSSSKRrR',
  '..KKSKKKSSSSKKKSKK.r',
  '..KKSWEESSSSEEWSKK..',
  '..KKSSSSSSSSSSSSKK..',
  '..KKSpSSSSsSSSSpSKK.',
  '..KK.SSSSSsSSSSS.KK.',
  '..KK..SSSMMMSSS..KK.',
  '..KK...sSSSSSs...KK.',
  '..K.....ssss.....KK.',
  '.........ss......KK.',
  '..BBBWWrsssrWWBBKKB.',
  '.BBbBBWWrssrWWBBKKBB',
  'BBbBBBBWWrrWWBBbKBBB',
  'BbBBBBBBWWWWBBBBrBbB',
  'BBBbBBBBBWWBBBBbBBBB',
];
export const PAL = { K: '#100c0c', h: '#2c2226', R: '#cc2a20', r: '#84160f', S: '#dcab88', s: '#b07e5c', p: '#d89a84', W: '#ece2c8',
  E: '#100808', M: '#b24a40', B: '#8c3624', b: '#5a1e14' };
