// 匡越 Khuông Việt — Ngô Chân Lưu, Zen master (def-kit model: src/chars/defkit.js header), fine voxels (chars/parts.js
// FV) on the shared rig, slight and upright, no pauldrons (the def has no `pauldron`: buildDef makes no helper joints).
// A shaved head (a cooler scalp tone over the warm face, a rounded crown), long earlobes, a calm face: eyes lowered to a
// dark lid line under soft arched brows, a straight nose, a small closed smile. The áo cà sa: a saffron-brown robe of
// sewn rice-field patches (điền tướng: panels in three dyes, dark seams, rows staggered) wrapped over the LEFT shoulder
// and across under the right arm — a diagonal edge bound in a darker band, the right shoulder and arm in the grey
// under-robe — fastened at the left breast with a bronze ring, wrapped round the hips down to the knees; the grey robe
// falls on to the ankles, its hem banded; wide grey sleeves with dark cuffs. A long mala of wooden beads (tràng hạt)
// hangs in a U on the chest with a large guru bead whose tassel swings (a chain); a short mala round the left wrist;
// a saffron cord knotted at the right hip (its tails: chains). Bare feet in straw sandals (woven soles, straps across
// the instep and round the heel). Behind: the cà sa's long fall from the left shoulder to the calves (a chain, the
// patchwork running on). Weapon: the phất trần — a short lacquered red-brown handle banded in gold, a gold pommel, a
// flared bronze ferrule and the root bundle of white horsehair, the long plume itself seven springing strands (chains)
// — and the stream of golden light it casts while he strikes (weapon1: additive, its opacity set by the kit's view hook)
// along the line the rig's weapon takes, so hit shapes, the ribbon and what is drawn agree.
import * as THREE from 'three';
import { vox, B, P, md } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, hand, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xdcae88, skinD: 0xb4805e, skinH: 0xecc4a0, scalp: 0xc4a693, lip: 0xa86a58, lid: 0x2a1c16, brow: 0x3a2a20,
  K: 0xc06e2c, Kd: 0xa65a22, Kl: 0xd28438, seam: 0x7c3e18, Kb: 0x5e2c12,                    // cà sa saffron-brown
  G: 0x8a8a86, Gd: 0x666662, Gl: 0xa4a49e,                                                    // grey under-robe
  bead: 0x5a3418, beadL: 0x8a5a30, beadD: 0x341c0c, A: 0xb08a40, Al: 0xdcb868, Ad: 0x7a5a24,
  straw: 0xc4a466, strawD: 0x947a42, strawL: 0xdcc486,
  lacq: 0x5a1a12, lacqH: 0x7a2a1a, hair: 0xdcdad4, hairD: 0xb6b2aa, hairL: 0xe8e6e0,
  light: 0xffd088, lightH: 0xffffff, lightD: 0xd88a2a,                                         // the light stream
};
/** Rice-field patchwork: panels 7 wide × 9 tall in three dyes, dark seams, every other column of panels shifted. */
export const kasaya = (u, v) => {
  const pu = Math.floor(u / 7), w = v + (pu & 1) * 4, pv = Math.floor(w / 9);
  if (md(u, 7) === 0 || md(w, 9) === 0) return C.seam;
  const h = hash01(pu, pv, 5);
  return h < 0.3 ? C.Kd : h > 0.75 ? C.Kl : C.K;
};
const robe = (x, y, z) => (md(x * 2 + z + y, 11) === 0 ? C.Gl : md(x - z + y * 3, 13) === 0 ? C.Gd : C.G);
/** The cà sa's diagonal edge on the torso: covered right of bx(y) (x = his left), the left shoulder to under the right arm. */
const bx = (y) => -2 - (20 - y) * 1.17;
const drape = (x, y, z) => {
  const d = x + 0.5 - bx(y);
  return d < 0 ? robe(x, y, z) : d < 2 ? C.Kb : kasaya(x + z, y);
};
const rad = (x, z) => Math.hypot(x + 0.5, z + 0.5);

// ---------------------------------------------------------------- body (FV, centred on the joints)
/** The mala on the chest: beads on a U from the sides of the neck to the guru bead at the sternum (its tassel: a chain). */
function mala() {
  const out = [];
  for (let k = 0; k <= 18; k++) {
    const a = -1 + 2 * k / 18, x = Math.round(7.5 * a), y = Math.round(3 + 15 * a * a), c = k % 6 === 3 ? C.beadL : C.bead;
    out.push(B([x - 1, y - 1, 9], [x + 1, y + 1, 11], (xx, yy) => (xx === x - 1 && yy === y - 1 ? C.beadD : c)));
  }
  out.push(B([-2, 0, 9], [2, 3, 12], (x, y) => (y === 2 && x > -1 ? C.beadL : C.bead)));
  return out;
}

function torso() {
  const T = {};
  // hips: the cà sa wrapped round the hips (patchwork), the saffron cord with its knot at the right hip
  T.hips = [
    B([-12, -10, -8], [12, 6, 8], C.G),
    B([-14, -15, -10], [14, 4, 10], (x, y, z) => kasaya(x + z + 40, y)),
    B([-14, 4, -10], [14, 6, 10], (x, y, z) => (md(x + z + y, 3) === 0 ? C.Kb : C.Kd)),
    B([-10, 1, 9], [-6, 6, 12], C.Kd), P([-9, 3, 11], [-7, 5, 12], C.Kl),
  ];
  // waist: the cà sa over the robe
  T.spine = [B([-10, -6, -8], [10, 16, 8], C.G), B([-11, -6, -9], [11, 16, 9], (x, y, z) => kasaya(x + z + 20, y + 30))];
  // chest: slim, the cà sa over the left shoulder and across under the right arm, the grey robe on the right shoulder
  // (a dark band round the neck), soft round shoulders, the bronze ring at the left breast, the mala
  T.chest = [
    B([-12, -4, -8], [12, 18, 8], C.G),
    B([-13, -4, -9], [13, 19, 9], drape),
    B([-18, 11, -9], [18, 19, 9], (x, y, z) => {
      const ax = Math.abs(x + 0.5);
      if (ax > 14 && (y > 17 || Math.abs(z + 0.5) > 7.5)) return null;
      if (ax > 16 && y > 15) return null;
      return drape(x, y, z);
    }),
    B([-7, 17, -7], [7, 20, 7], (x, y, z) => (rad(x, z) < 5.6 ? null : C.Gd)),                 // neck band
    B([-6, 15, -6], [6, 26, 6], -1),                                                          // neck hole
    B([8, 10, 9], [14, 16, 11], (x, y) => {                                                   // the ring at the left breast
      const r = Math.hypot(x + 0.5 - 11, y + 0.5 - 13);
      return r > 3 || r < 1.6 ? null : r > 2.5 ? C.Ad : C.A;
    }),
    ...mala(),
  ];
  T.neck = [B([-4, -2, -4], [4, 6, 4], (x, y, z) => (z > 2 ? C.skin : C.skinD))];
  return T;
}

function limbs(T) {
  T.upperArmL = [B([-6, -24, -6], [6, 2, 6], (x, y, z) => kasaya(x + z + 60, y)), B([-7, -24, -7], [7, -14, 7], (x, y, z) => kasaya(x + z + 60, y))];
  T.upperArmR = [B([-6, -24, -6], [6, 2, 6], robe), B([-7, -24, -7], [7, -14, 7], robe)];
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // wide grey sleeve flaring to an open cuff banded dark, the robe's inner sleeve at the wrist
    T['foreArm' + s] = [
      B([-7, -14, -7], [7, 2, 7], robe),
      B([-10, -22, -10], [10, -12, 10], (x, y, z) => (rad(x, z) > 9.2 - (y + 22) * 0.2 ? null : y < -19 ? C.Gd : robe(x, y, z))),
      B([-8, -22, -8], [8, -17, 8], (x, y, z) => (rad(x, z) < 7 ? -1 : null)),
      B([-5, -22, -5], [5, -8, 5], C.Gd),
    ];
    T['hand' + s] = hand(sx, C.skin, C.skinD);
    // the cà sa to the knee over each thigh (its hem banded), the grey robe on to the ankle, a dark hem
    T['thigh' + s] = [
      B([-9, -36, -9], [9, 2, 9], (x, y, z) => robe(x, y, z)),
      B([-10, -30, -10], [10, 2, 10], (x, y, z) => (rad(x, z) > 10 ? null : y < -27 ? C.Kb : kasaya(x + z + 80, y))),
    ];
    T['shin' + s] = [
      B([-8, -29, -8], [8, 2, 8], robe),
      B([-9, -31, -9], [9, -29, 9], (x, y, z) => (rad(x, z) > 9 ? null : C.Gd)),
      B([-4, -35, -4], [4, -29, 4], C.skinD),                                                 // bare ankle
    ];
    // straw sandal: woven sole under a bare foot (toes forward), a strap across the instep and one round the heel
    T['foot' + s] = [
      B([-6, -7, -5], [7, -5, 17], (x, y, z) => {
        const w = z > 9 ? 6 - Math.floor((z - 9) / 3) : 6;
        if (Math.abs(x) > w) return null;
        return y === -7 ? C.strawD : md(x + z, 3) === 0 ? C.strawL : md(x - z, 4) === 0 ? C.strawD : C.straw;
      }),
      B([-5, -5, -4], [6, 0, 16], (x, y, z) => {
        const w = z > 9 ? 5 - Math.floor((z - 9) / 3) : 5;
        if (Math.abs(x) > w || y > (z > 8 ? -3 : z > 2 ? -1 : 0)) return null;
        return z > 13 && y === -3 && md(x, 2) === 0 ? C.skinD : C.skin;
      }),
      B([-6, -5, 7], [7, -2, 10], (x, y) => (y === -2 ? C.strawL : C.straw)),
      B([-6, -5, -5], [7, -1, -2], C.straw),
      B([-4, -1, -4], [5, 3, 4], C.skinD),
    ];
  }
  T.handL.push(B([-5, 2, -5], [5, 5, 5], (x, y, z) => (rad(x, z) > 4.8 || rad(x, z) < 3 || y === 4 ? null : md(Math.round(Math.atan2(x + 0.5, z + 0.5) * 2.2), 2) ? C.bead : C.beadL)));   // wrist mala
  return T;
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const scalp = (x, y, z) => (hash01(x, y, z + 61) < 0.12 ? C.skinD : C.scalp);
  return [
    // a round shaved head: face, crown, back; a soft jaw and chin; long earlobes
    B([-6, 0, -5], [7, 2, 5], C.skin), B([-3, -1, -3], [4, 0, 4], C.skin),
    B([-7, 2, -7], [8, 10, 6], (x, y, z) => (z < -2 || y > 8 ? scalp(x, y, z) : C.skin)),
    B([-7, 10, -7], [8, 13, 6], (x, y, z) => (z > 4 && y < 11 ? C.skin : scalp(x, y, z))),
    B([-6, 13, -6], [7, 15, 5], scalp), B([-4, 15, -4], [5, 16, 3], scalp),
    B([-8, 2, -2], [-7, 10, 1], C.skinD), B([8, 2, -2], [9, 10, 1], C.skinD),
    B([-9, 1, -2], [-7, 4, 1], C.skin), B([8, 1, -2], [10, 4, 1], C.skin),                   // earlobes
    // calm face: lowered eyes (a dark lid line, the shade under it), soft arched brows, straight nose, a small smile
    ...symH(4, 6, 4, 6, 5, 6, C.skinH),
    ...symH(2, 5, 7, 8, 5, 6, C.lid), ...symH(2, 5, 6, 7, 5, 6, C.skinD),
    ...symH(1, 5, 9, 10, 5, 6, C.brow), ...symH(5, 6, 8, 9, 5, 6, C.brow),
    B([0, 4, 6], [1, 8, 7], C.skin), P([-1, 4, 5], [2, 5, 6], C.skinD), B([0, 4, 7], [1, 5, 8], C.skinH),
    P([-1, 2, 5], [2, 3, 6], C.lip), ...symH(2, 3, 3, 4, 5, 6, C.skinD),
  ];
}

// ---------------------------------------------------------------- phất trần + light (weapon joint: +Z, origin = the hand)
function weaponGeo() {
  const fv = 0.011, w = [];
  // handle: red-brown lacquer with a faint spiral sheen, gold bands, a gold pommel with a bead; the flared bronze ferrule
  w.push(B([-1, -1, -10], [1, 1, 23], (x, y, z) => (md(z + x * 2 + y, 6) === 0 ? C.lacqH : C.lacq)),
    ...[-4, 8, 19].map((z) => B([-2, -2, z], [2, 2, z + 2], C.A)),
    B([-2, -2, -13], [2, 2, -10], C.A), B([-1, -1, -15], [1, 1, -13], C.Al),
    B([-3, -3, 23], [3, 3, 28], (x, y, z) => (Math.max(Math.abs(x + 0.5), Math.abs(y + 0.5)) > 1.5 + (z - 23) * 0.3 ? null : z === 27 ? C.Al : C.A)));
  // the plume's root bundle: white horsehair flaring out of the ferrule (the long strands are chains)
  w.push(B([-5, -5, 27], [5, 5, 40], (x, y, z) => {
    const r = Math.hypot(x + 0.5, y + 0.5), R = 2.6 + (z - 27) * 0.14;
    if (r > R) return null;
    const k = hash01(x + 7, y + 7, 3);
    return k < 0.25 ? C.hairL : k > 0.8 ? C.hairD : C.hair;
  }));
  const whisk = vox(w, fv, { off: [-0.5, -0.5, 0], jitter: 0.03, ao: 0.22 });
  // the light: five horsehair-fine strands of gold streaming from the plume (0.55 … 1.9 m), splayed and bowed, each on
  // its own depth plane, bright cores, tapered ends
  const bv = 0.014, lb = [];
  for (const [base, bend, end, layer] of [[-0.05, 0.1, 1.9, 0], [0.04, -0.07, 1.78, 1], [0.1, 0.12, 1.68, -1], [-0.11, -0.09, 1.62, 1], [0.0, 0.03, 1.84, -1]]) {
    for (let i = 0; i < 44; i++) {
      const u = i / 43, z = Math.round((0.55 + (end - 0.55) * u) / bv);
      const y = Math.round((base * (1 - u) + 4 * bend * u * (1 - u)) / bv), width = Math.max(1, Math.round((0.01 + 0.018 * (1 - u)) / bv));
      lb.push(B([layer, y - width, z], [layer + 1, y + width + 1, z + 1], (_, yy) => (Math.abs(yy - y) < 1 ? C.lightH : Math.abs(yy - y) >= width ? C.lightD : C.light)));
    }
  }
  const light = vox(lb, bv, { jitter: 0, ao: 0 });
  const lightMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending,
    depthWrite: false, side: THREE.DoubleSide, fog: false });
  return [{ geo: whisk, mat: 'body' }, { geo: light, mat: lightMat }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
/** The cà sa's fall down the back from the left shoulder: patchwork running on (global row g = y − 12 i), a dark band
 *  down both edges and along the hem, grey lining. */
function fallSeg(i, n) {
  const w = Math.round(11 + i * 0.6), last = i === n - 1;
  return vox([
    B([-w, -12, 0], [w, 0, 1], (x, y) => (Math.abs(x + 0.5) > w - 2 || (last && y < -9) ? C.Kb : kasaya(x + 50, y - i * 12))),
    B([-w + 1, -12, -1], [w - 1, 0, 0], C.Gd),
  ], FV, { off: [0, 0, -0.5], jitter: 0.03, ao: 0.18 });
}
/** The grey robe's front panel between the legs: soft folds, the hem banded dark. */
const panelSeg = (i, n) => vox([B([-6, -10, 0], [6, 0, 1], (x, y) => (i === n - 1 && y < -7 ? C.Gd : robe(x, y - i * 10, 0))),
  B([-5, -10, -1], [5, 0, 0], C.Gd)], FV, { off: [0, 0, -0.5], jitter: 0.03, ao: 0.18 });
/** A strand of the whisk's plume: white horsehair, each column its own shade, tapering and fraying at the end. */
const plumeSeg = (i, n) => {
  const w = i < 2 ? 2 : 1, last = i === n - 1;
  return vox([B([-w, -7, -w], [w, 0, w], (x, y, z) => {
    const k = hash01(x + 9, z + 9, i);
    if (last && -y > 2 + k * 5) return null;
    return k < 0.3 ? C.hairL : k > 0.8 ? C.hairD : C.hair;
  })], 0.011, { jitter: 0.05, ao: 0.2 });
};
/** The mala's tassel: a cord bead, then a saffron silk tassel. */
const tasselSeg = (i, n) => vox([B([-1, -6, -1], [1, 0, 1], (x, y) => (i === 0 ? (y > -3 ? C.beadL : C.bead) : y < -4 && x ? null : C.Kl))],
  FV, { jitter: 0.04, ao: 0.15 });
const cordSeg = (i, n) => vox([B([-1, -6, -1], [1, 0, 1], (x, y) => (i === n - 1 && y < -4 ? C.Kl : C.Kd))], FV, { jitter: 0.04, ao: 0.15 });

export const KHUONGVIET_DEF = {
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, weapon: weaponGeo() }),   // no pauldron: none
  chains() {
    const out = [];
    // the cà sa's fall from the left shoulder (heaviest), the robe's front panel, the cord tails, the mala tassel
    out.push({ joint: 'chest', anchor: [0.04, 0.22, -0.12], rest: [-0.05, -1, -0.1], n: 7, len: 0.14, stiff: 0.16, drag: 0.22, wind: 1, cone: 76, sway: 0.18,
      seg: fallSeg, hit: ['chest', 'hips', 'thighL', 'thighR', 'kneeL', 'kneeR'] });
    out.push({ joint: 'hips', anchor: [0, -0.04, 0.13], rest: [0, -1, 0.1], n: 5, len: 0.12, stiff: 0.12, drag: 0.15, wind: 0.4, face: [0, 0, 1], cone: 68, sway: 0.08,
      seg: panelSeg, hit: [['thighL', 0.035], ['thighR', 0.035], ['kneeL', 0.035], ['kneeR', 0.035]] });
    for (const dx of [0, 0.02]) out.push({ joint: 'hips', anchor: [-0.1 + dx, 0.04, 0.13], rest: [-0.15, -1, 0.15], n: 3, len: 0.07, stiff: 0.1, drag: 0.14, wind: 0.6,
      cone: 70, sway: 0.1, face: [0, 0, 1], seg: cordSeg, hit: [['thighR', 0.02]] });
    out.push({ joint: 'chest', anchor: [0, 0.0, 0.13], rest: [0, -1, 0.2], n: 2, len: 0.06, stiff: 0.2, drag: 0.2, wind: 0.3, grav: 1.2, cone: 45, face: [0, 0, 1],
      seg: tasselSeg, hit: [['hips', 0.02]] });
    // the whisk's plume: seven strands round the root bundle, springing on along the handle and trailing every stroke
    for (let k = 0; k < 7; k++) {
      const a = k * 0.8976, ox = k ? Math.cos(a) * 0.022 : 0, oy = k ? Math.sin(a) * 0.022 : 0;
      out.push({ joint: 'weapon', anchor: [ox, oy, 0.42], rest: [ox * 6, oy * 6, 1], n: 5, len: 0.075, stiff: 0.2 + k * 0.006, drag: 0.1, wind: 0.6, grav: 0.55,
        cone: 75, sway: 0.08, face: [1, 0, 0], seg: plumeSeg });
    }
    return out;
  },
};

// ---------------------------------------------------------------- HUD portrait (20 × 20): a golden halo behind the
// shaved head, long earlobes, lowered eyes under soft brows, a small smile; the saffron cà sa over his left shoulder,
// the grey robe on his right, the wooden mala across the chest
export const FACE = [
  '......YYYYYYYY......',
  '....YYy......yYY....',
  '...Yy..hHHHHh..yY...',
  '..Yy.hHHHHHHHHh.yY..',
  '..Y.hHHHHHHHHHHh.Y..',
  '.Yy.HHHHHHHHHHHH.yY.',
  '.Y..SSSSSSSSSSSS..Y.',
  '.Y.sSbbbSSSSbbbSs.Y.',
  '.Y.sSSSSSSSSSSSSs.Y.',
  '.Y.sSLLLSSSSLLLSs.Y.',
  '.Yy.SSSSSssSSSSS.yY.',
  '..Ys.SSSSSSSSSSS.sY.',
  '..YsssSSSmmmmSSsssY.',
  '...Y.ssSSSSSSSSs.Y..',
  '....YyssssssssyY....',
  '...GGGGGsssssKKKKK..',
  '..GGGGGGGwwKKkKKKKK.',
  '.GGGGGGGgwKKKKkKKKKK',
  'GGGGGGGGgKwKKKKAKKKK',
  'GGGGGGGgKKKwwKKKkKKK',
];
export const PAL = { Y: '#e8b850', y: '#a87a30', h: '#b89684', H: '#c4a693', S: '#dcae88', s: '#b4805e', b: '#6a4a34', L: '#2a1c16',
  m: '#a86a58', w: '#8a5a30', G: '#8a8a86', g: '#666662', K: '#c06e2c', k: '#7c3e18', A: '#dcb868' };
