// 巫鈴 Thầy Mo Cun (def-kit model: src/chars/defkit.js header), fine voxels (src/chars/parts.js FV) on the shared rig,
// slight and a little stooped at the default size, no pauldrons (the def has no `pauldron`: buildDef makes no helper
// joints); built from the comic's THAY_MO token. An old Mường shaman: a lean weathered face, high cheekbones over hollow
// cheeks, narrow calm eyes in a web of crow's feet under bushy white brows, a long nose, a drooping white moustache and
// a long grey-white beard (its strands: chains) over the chest; grey-white hair showing at the temples and nape under an
// indigo head-cloth wound in thick turns (a red-and-white embroidered stripe in the last turn, the tail hanging behind:
// a chain). The ritual robe: deep indigo, long to the ankles, the right flap crossed over the left with a broad band of
// Mường embroidery down the crossing edge — red borders, white and yellow diamonds on a dark ground — and the same bands
// round the chest, the wide sleeve cuffs and the hem, a zig-zag band above the hem; a woven sash of red, yellow, black
// and white stripes wound twice, its tails hanging at the left hip (chains), a small woven ritual bag at the right hip;
// a cord of dark seeds round the neck with a little bronze bell. Bare feet on leather-thonged sandals. Behind: the
// robe's back panel to the ankles (a chain). Weapon: the gậy chuông — a gnarled staff of dark wood (it wanders and
// knots along its length, bark-ridged, worn pale at the grip), its head a knuckled burl with a short crossbar of bound
// wood from which three small bronze bells hang on red cords, with two red cord tassels (all chains) — and the cinnabar
// thread it draws while he strikes (weapon1: additive, opacity set by the kit's view hook) running on from the staff's
// head along the line the rig's weapon takes, so hit shapes, the ribbon and what is drawn agree.
import * as THREE from 'three';
import { vox, B, P, md } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, hand, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xb48660, skinD: 0x8a6044, skinH: 0xc89a74, lip: 0x7a4436, mouth: 0x2a1410, eye: 0x120c0a, scl: 0xd6cabc,
  wh: 0xdcdad4, whD: 0xaeaca6, whL: 0xeeece6,                               // grey-white hair, brows, beard
  ind: 0x24305e, indD: 0x161e40, indL: 0x34447a,                            // indigo robe and head-cloth
  ew: 0xe8e2d0, er: 0xb02a22, ey: 0xd8a838, ek: 0x14141c,                   // embroidery: white, red, yellow, black
  wood: 0x4e3622, woodD: 0x34220f, woodL: 0x6e5034, woodP: 0x8a6c4a,       // the staff (P: worn pale at the grip)
  bronze: 0xb08440, bronzeD: 0x6a4c22, bronzeL: 0xdcb468,
  thong: 0x4a3020, sole: 0x6a4c30, seed: 0x2a1a12,
  thread: 0xff5a30, threadH: 0xffe0b0, threadD: 0xb01a10,                 // the cinnabar thread
};
const robe = (x, y, z) => (md(x * 2 + y + z * 3, 13) === 0 ? C.indL : md(x - y * 2 + z, 11) === 0 ? C.indD : C.ind);
/** Mường embroidery band, v = 0 … 6 across it (u along it): red borders, a dark ground with alternating white / yellow
 *  diamonds, small red dots between them. */
export const band = (u, v) => {
  if (v <= 0 || v >= 6) return C.er;
  const k = md(u, 6) - 2.5, d = Math.abs(k) + Math.abs(v - 3);
  if (d <= 1.6) return md(Math.floor(u / 6), 2) ? C.ey : C.ew;
  if (d > 2.4 && v === 3) return C.er;
  return C.ek;
};
/** Zig-zag band (v = 0 … 3): a yellow line zig-zagging on indigo, red edge. */
const zig = (u, v) => (v === 0 ? C.er : Math.abs(md(u, 6) - 3) === v ? C.ey : C.indD);
const rad = (x, z) => Math.hypot(x + 0.5, z + 0.5);
/** Around a limb: u along the circumference from the angle. */
const around = (x, z, k = 3) => Math.round(Math.atan2(x + 0.5, z + 0.5) * k);

// ---------------------------------------------------------------- body (FV, centred on the joints)
/** The crossing edge of the robe: from the left shoulder down across the chest to under the right arm (x = his left
 *  is +x), d = distance across the band (0 … 6 = the embroidery). */
const edge = (x, y) => x + 0.5 - (-1 + (y - 18) * 0.85);

function torso() {
  const T = {};
  // hips: the robe's skirt, the woven sash wound twice, the knot and the ritual bag
  const sash = (x, y, z) => [C.er, C.er, C.ey, C.ek, C.ew, C.er, C.ek, C.ey][md(y + 2, 8)] ?? C.er;
  T.hips = [
    B([-11, -10, -8], [11, 6, 8], C.indD),
    B([-13, -15, -10], [13, -1, 10], (x, y, z) => (z > 6 && y < -6 ? null : robe(x, y, z))),
    B([-13, -2, -10], [13, 5, 10], (x, y, z) => (md(x + z, 9) === 0 ? C.ek : sash(x, y, z))),
    B([7, -4, 9], [12, 4, 12], (x, y) => (md(y, 3) === 0 ? C.ey : C.er)),                     // the knot at the left hip
    B([-16, -12, -3], [-12, -2, 5], (x, y, z) => (y === -3 ? C.er : md(x + y + z, 3) === 0 ? C.ek : md(y, 3) === 0 ? C.ey : C.thong)),   // the bag
    B([-15, -2, -2], [-13, 6, 1], C.thong),
  ];
  // waist: the robe, the edge band running on down his right front
  T.spine = [
    B([-10, -6, -8], [10, 16, 8], robe),
    B([-10, -6, 8], [-3, 16, 9], (x, y) => band(y, x + 10)),
  ];
  // chest: slight, soft round shoulders; the crossing edge band, an embroidered band round the chest, the collar band,
  // the seed necklace with its little bronze bell
  T.chest = [
    B([-12, -4, -8], [12, 18, 8], robe),
    B([-17, 11, -8], [17, 18, 8], (x, y, z) => (Math.abs(x + 0.5) > 14 && y > 16 ? null : robe(x, y, z))),
    B([-12, -4, 8], [12, 18, 9], (x, y) => { const d = edge(x, y); return d >= 0 && d < 7 ? band(y, Math.floor(d)) : null; }),
    P([-13, 1, -9], [13, 8, 10], (x, y, z) => band(x + z, y - 1)),
    B([-7, 16, -7], [7, 19, 7], (x, y, z) => (rad(x, z) < 5.4 ? null : band(around(x, z, 6), y - 16 + 2))),
    ...Array.from({ length: 13 }, (_, k) => {
      const a = -1 + k / 6, x = Math.round(6 * a), y = Math.round(10 + 6 * a * a);
      return B([x, y, 9], [x + 1, y + 1, 10], k % 3 ? C.seed : C.bronzeD);
    }),
    B([-1, 6, 9], [2, 10, 11], (x, y) => (y === 9 ? C.bronzeD : y === 6 ? C.bronzeL : C.bronze)),
    B([-6, 15, -6], [6, 26, 6], -1),                                                          // neck hole
  ];
  T.neck = [B([-4, -2, -4], [4, 6, 4], (x, y, z) => (z > 2 ? C.skin : C.skinD))];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    T['upperArm' + s] = [B([-6, -24, -6], [6, 2, 6], robe), B([-7, -24, -7], [7, -14, 7], robe)];
    // wide sleeve flaring to an open cuff in an embroidery band, the thin wrist inside
    T['foreArm' + s] = [
      B([-7, -14, -7], [7, 2, 7], robe),
      B([-10, -22, -10], [10, -12, 10], (x, y, z) => (rad(x, z) > 9.2 - (y + 22) * 0.2 ? null : y < -15 ? band(around(x, z, 5), y + 22) : robe(x, y, z))),
      B([-8, -22, -8], [8, -17, 8], (x, y, z) => (rad(x, z) < 7 ? -1 : null)),
      B([-3, -22, -3], [4, -8, 4], C.skinD),
    ];
    T['hand' + s] = hand(sx, C.skin, C.skinD);
    // the robe on to the ankle: indigo, a zig-zag band, the embroidered hem
    T['thigh' + s] = [B([-9, -36, -9], [9, 2, 9], (x, y, z) => robe(x, y, z))];
    T['shin' + s] = [
      B([-8, -29, -8], [8, 2, 8], (x, y, z) => (y < -22 ? band(around(x, z, 5), y + 29) : y < -18 ? zig(around(x, z, 5), y + 22) : robe(x, y, z))),
      B([-4, -35, -4], [4, -29, 4], C.skinD),                                                 // bare ankle
    ];
    // bare foot on a leather sole, a thong between the toes and a strap round the heel
    T['foot' + s] = [
      B([-6, -7, -5], [7, -5, 17], (x, y, z) => {
        const w = z > 9 ? 6 - Math.floor((z - 9) / 3) : 6;
        return Math.abs(x) > w ? null : y === -7 ? C.thong : C.sole;
      }),
      B([-5, -5, -4], [6, 0, 16], (x, y, z) => {
        const w = z > 9 ? 5 - Math.floor((z - 9) / 3) : 5;
        if (Math.abs(x) > w || y > (z > 8 ? -3 : z > 2 ? -1 : 0)) return null;
        return z > 13 && y === -3 && md(x, 2) === 0 ? C.skinD : C.skin;
      }),
      B([-5, -5, 6], [6, -2, 8], (x, y) => (Math.abs(x) + (y + 5) < 4 || Math.abs(x) > 4 ? C.thong : null)),
      B([-5, -5, -5], [6, -2, -3], C.thong),
      B([-4, -1, -4], [5, 3, 4], C.skinD),
    ];
  }
  return T;
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const white = (x, y, z) => (md(x * 3 + y + z, 5) === 0 ? C.whD : md(x + y * 2 - z, 7) === 0 ? C.whL : C.wh);
  const cloth = (x, y, z) => {                       // the head-cloth's turns: diagonal folds, an embroidered last turn
    const t = y + Math.round(Math.atan2(x + 0.5, z + 0.5) * 1.6);
    if (y === 15) return md(x + z, 4) < 2 ? C.er : C.ew;
    return md(t, 4) === 0 ? C.indD : md(t, 4) === 2 ? C.indL : C.ind;
  };
  return [
    // a lean old face: narrow jaw, high cheekbones over hollow cheeks, ears
    B([-7, 2, -6], [8, 12, 6], C.skin), B([-6, -1, -4], [7, 3, 5], C.skin),
    ...symH(4, 7, 6, 8, 5, 6, C.skinH), ...symH(4, 7, 3, 6, 5, 6, C.skinD),
    ...symH(7, 8, 4, 9, -2, 1, C.skinD),
    // narrow calm eyes in crow's feet, bushy white brows, a furrow
    ...symH(2, 5, 7, 8, 5, 6, C.scl), ...symH(3, 5, 7, 8, 5, 6, C.eye), ...symH(2, 5, 8, 9, 5, 6, C.skinD),
    ...symH(5, 7, 7, 8, 5, 6, C.skinD), ...symH(5, 6, 6, 7, 5, 6, C.skinD), P([0, 8, 5], [1, 11, 6], C.skinD),
    ...symH(1, 6, 9, 11, 5, 7, white, false), ...symH(5, 7, 8, 10, 5, 7, C.whL, false),
    // a long nose, the drooping white moustache, the long beard round the jaw and down below the chin (strands: chains)
    B([-1, 4, 6], [2, 9, 7], C.skin), B([-1, 3, 6], [2, 5, 8], C.skinH), P([-1, 3, 7], [0, 4, 8], C.skinD), P([1, 3, 7], [2, 4, 8], C.skinD),
    P([-2, 1, 5], [3, 2, 6], C.mouth),
    B([-4, 2, 6], [5, 3, 8], white), ...symH(3, 5, -2, 3, 5, 8, white, false),
    B([-8, -8, -4], [9, 3, 8], (x, y, z) => {
      const w = y > -1 ? 8 : 8 + y * 0.75, X = Math.abs(x);
      if (X > w || z > 7 + Math.min(0, y) * 0.2 || (y >= 0 && z > 4 && X < 5)) return null;
      return y < -4 && hash01(x, y, z) < 0.18 ? null : white(x, y, z);
    }),
    B([-8, 2, -4], [-6, 8, 2], white), B([7, 2, -4], [9, 8, 2], white),
    // grey-white hair at the temples and the nape under the cloth
    B([-8, 4, -8], [9, 11, -5], white), B([-9, 7, -5], [-7, 11, 3], white), B([8, 7, -5], [10, 11, 3], white),
    // the indigo head-cloth wound in thick turns, a flat crown, the knot behind
    B([-9, 11, -9], [10, 17, 8], (x, y, z) => (rad(x, z) > 9.6 || (y < 12 && z > 6 && Math.abs(x) < 6) ? null : cloth(x, y, z))),
    B([-8, 17, -8], [9, 19, 7], (x, y, z) => (rad(x, z) > 8.6 ? null : cloth(x, y, z))),
    B([-2, 12, -11], [3, 17, -8], (x, y) => (md(y, 2) ? C.indD : C.ind)),
  ];
}

// ---------------------------------------------------------------- gậy chuông + thread (weapon joint: +Z, origin = the hand)
function weaponGeo() {
  // the staff at 0.014 (z −0.42 … 0.8): gnarled — the centre wanders, knots swell along it, bark ridges, worn pale at the
  // grip; the head: a knuckled burl and a crossbar bound in red cord (the bells and tassels hang from it: chains)
  const sv = 0.014, w = [], za = Math.round(-0.42 / sv), zb = Math.round(0.8 / sv);
  for (let z = za; z < zb; z++) {
    const cx = Math.round(Math.sin(z * 0.19) * 0.9), cy = Math.round(Math.cos(z * 0.13 + 1) * 0.9);
    const knot = md(z + 4, 13) < 2, r = knot ? 2 : 1, grip = z > -4 && z < 10;
    w.push(B([cx - r, cy - r, z], [cx + r + 1, cy + r + 1, z + 1], (x, y) => {
      if (r === 2 && Math.abs(x - cx) === 2 && Math.abs(y - cy) === 2) return null;
      return grip ? (md(x + y + z, 3) ? C.woodP : C.woodL) : md(x * 2 + y + z, 5) === 0 ? C.woodD : knot ? C.woodL : C.wood;
    }));
  }
  w.push(B([-3, -3, zb - 2], [4, 4, zb + 4], (x, y, z) => (Math.hypot(x, y, (z - zb - 1) * 0.9) > 3.6 ? null : md(x + y + z, 3) === 0 ? C.woodD : C.wood)));
  w.push(B([-6, -1, zb - 3], [7, 2, zb], (x) => (Math.abs(x) < 2 ? C.er : md(x, 3) === 0 ? C.woodD : C.wood)));
  w.push(B([-1, -1, zb + 4], [2, 2, zb + 7], C.woodL), B([1, 0, zb + 6], [3, 1, zb + 8], C.wood));
  const staff = vox(w, sv, { off: [-0.5, -0.5, 0], jitter: 0.04, ao: 0.3 });
  // the thread: three cinnabar strands winding round each other from the staff's head (0.82 … 1.86 m), bright cores
  const bv = 0.012, lb = [];
  for (const [ph, amp, end] of [[0, 0.03, 1.86], [2.1, 0.026, 1.78], [4.2, 0.022, 1.7]]) {
    for (let i = 0; i < 60; i++) {
      const u = i / 59, z = Math.round((0.82 + (end - 0.82) * u) / bv);
      const y = Math.round(Math.sin(u * 9 + ph) * amp * (0.4 + u) / bv), x = Math.round(Math.cos(u * 9 + ph) * amp * 0.6 * (0.4 + u) / bv);
      const wd = u > 0.9 ? 0 : 1;
      lb.push(B([x, y - wd, z], [x + 1, y + wd + 1, z + 1], (_, yy) => (yy === y ? C.threadH : C.thread)));
    }
  }
  const thread = vox(lb, bv, { jitter: 0, ao: 0 });
  const threadMat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending,
    depthWrite: false, side: THREE.DoubleSide, fog: false });
  return [{ geo: staff, mat: 'body' }, { geo: thread, mat: threadMat }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
/** The robe's back panel: indigo, the zig-zag and embroidered bands at the hem (global row g = y − 12 i). */
function backSeg(i, n) {
  const w = Math.round(11 + i * 0.7), last = i === n - 1;
  return vox([
    B([-w, -12, 0], [w, 0, 1], (x, y) => (last && y < -5 ? band(x, y + 12) : last && y < -1 ? zig(x, y + 5) : robe(x, y - i * 12, 0))),
    B([-w + 1, -12, -1], [w - 1, 0, 0], C.indD),
  ], FV, { off: [0, 0, -0.5], jitter: 0.03, ao: 0.18 });
}
/** The robe's front panel between the legs, its hem embroidered. */
const panelSeg = (i, n) => vox([B([-6, -10, 0], [6, 0, 1], (x, y) => (i === n - 1 && y < -3 ? band(x, y + 10) : robe(x, y - i * 10, 0))),
  B([-5, -10, -1], [5, 0, 0], C.indD)], FV, { off: [0, 0, -0.5], jitter: 0.03, ao: 0.18 });
/** A strand of the long white beard. */
const beardSeg = (i, n) => {
  const w = i === 0 ? 2 : 1;
  return vox([B([-w, -7, -w], [w, 0, w], (x, y, z) => (i === n - 1 && y < -4 && (x || z) ? null : md(x * 3 + y + z + i, 5) === 0 ? C.whD : md(x + y, 4) === 0 ? C.whL : C.wh))],
    HV, { jitter: 0.05, ao: 0.28 });
};
/** The head-cloth's tail and the sash's tails: a cloth strip, its end in a red-and-yellow fringe. */
const tailSeg = (base) => (i, n) => vox([B([-2, -7, 0], [2, 0, 1], (x, y) => (i === n - 1 && y <= -5 ? (y === -7 && x & 1 ? null : y === -5 ? C.ey : C.er)
  : x === -2 ? C.indD : base))], FV, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.15 });
/** A bell on its cord: a red cord, then (last) a small bronze bell — a flared rim, a dark mouth, a clapper bead. */
const bellSeg = (i, n) => {
  if (i < n - 1) return vox([B([0, -5, 0], [1, 0, 1], C.er)], 0.008, { off: [-0.5, 0, -0.5], jitter: 0.03, ao: 0.1 });
  return vox([B([-4, -9, -4], [5, 0, 5], (x, y, z) => {
    const r = Math.hypot(x, z), R = y > -2 ? 1 : 2.2 + (-y - 2) * 0.32;
    if (r > R + 0.4) return null;
    if (y === -9) return r < R - 1 ? (r < 0.8 ? C.bronzeD : C.ek) : C.bronzeL;
    return y === -3 ? C.bronzeD : r > R - 0.6 && md(y, 3) === 0 ? C.bronzeL : C.bronze;
  })], 0.008, { jitter: 0.04, ao: 0.3 });
};
/** A red cord tassel strand. */
const cordSeg = (i, n) => vox([B([-1, -6, -1], [1, 0, 1], (x, y, z) => (i === n - 1 && y < -3 && hash01(x + 2, z + 2, y) < 0.4 ? null : md(x + z + y, 3) === 0 ? C.threadD : C.er))],
  0.01, { jitter: 0.05, ao: 0.2 });

export const THAYMO_DEF = {
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, weapon: weaponGeo() }),   // no pauldron: none
  chains() {
    const out = [];
    // the robe's back panel (long, to the ankles), the front panel, the sash tails at the left hip, the head-cloth's tail
    out.push({ joint: 'chest', anchor: [0, 0.18, -0.11], rest: [0, -1, -0.1], n: 7, len: 0.14, stiff: 0.16, drag: 0.22, wind: 0.9, cone: 74, sway: 0.15,
      seg: backSeg, hit: ['chest', 'hips', 'thighL', 'thighR', 'kneeL', 'kneeR'] });
    out.push({ joint: 'hips', anchor: [0, -0.04, 0.13], rest: [0, -1, 0.1], n: 5, len: 0.12, stiff: 0.12, drag: 0.15, wind: 0.4, face: [0, 0, 1], cone: 68, sway: 0.08,
      seg: panelSeg, hit: [['thighL', 0.035], ['thighR', 0.035], ['kneeL', 0.035], ['kneeR', 0.035]] });
    for (const dx of [0, 0.025]) out.push({ joint: 'hips', anchor: [0.1 + dx, 0.0, 0.13], rest: [0.15, -1, 0.15], n: 4, len: 0.075, stiff: 0.1, drag: 0.14,
      wind: 0.6, cone: 70, sway: 0.1, face: [0, 0, 1], seg: tailSeg(dx ? C.ey : C.er), hit: [['thighL', 0.02]] });
    out.push({ joint: 'head', anchor: [0, 14 * HV, -11 * HV], rest: [0.1, -1, -0.5], n: 4, len: 0.07, stiff: 0.07, drag: 0.08, wind: 1.6, cone: 110, sway: 0.4,
      face: [0, 0, -1], seg: tailSeg(C.ind), hit: ['head', ['chest', 0.03]] });
    // the long white beard: five strands from the chin over the chest
    for (const [x, rx] of [[-4, -0.2], [-2, -0.08], [0, 0], [2, 0.08], [4, 0.2]]) {
      out.push({ joint: 'head', anchor: [x * HV, -7 * HV, (5 - Math.abs(x) * 0.3) * HV], rest: [rx, -1, 0.3], n: 3, len: 0.055, stiff: 0.24, drag: 0.18,
        wind: 0.5, grav: 1.1, cone: 45, face: [0, 0, 1], seg: beardSeg, hit: [['chest', 0.025]] });
    }
    // the staff's head: three bronze bells on red cords from the crossbar, two red cord tassels by the burl
    for (const [ox, len] of [[-0.06, 0.05], [0, 0.07], [0.06, 0.05]]) out.push({ joint: 'weapon', anchor: [ox, 0, 0.77], rest: [0, -1, 0], n: 2, len,
      stiff: 0.02, drag: 0.1, wind: 0.5, grav: 1.2, cone: 170, face: [1, 0, 0], seg: bellSeg });
    for (const oy of [-0.02, 0.02]) out.push({ joint: 'weapon', anchor: [0, oy, 0.8], rest: [0, oy * 10, -1], n: 3, len: 0.06, stiff: 0.04, drag: 0.12, wind: 0.8,
      cone: 140, sway: 0.15, face: [1, 0, 0], seg: cordSeg });
    return out;
  },
};

// ---------------------------------------------------------------- HUD portrait (20 × 20): the indigo head-cloth with its
// red-and-white stripe, white hair at the temples, bushy white brows over narrow eyes, high cheekbones, the long white
// beard over the indigo robe and its embroidered collar band
export const FACE = [
  '....................',
  '.....IIIIIIIIII.....',
  '...IIiIIIIIIIiIII...',
  '..IIIIiIIIIIIiIIII..',
  '..IIiIIIIIIIIIIiII..',
  '..RWRWRWRWRWRWRWRW..',
  '..WWSSSSSSSSSSSSWW..',
  '..WWWWWSSSSSWWWWWW..',
  '..WSsLESSSSSSELsSW..',
  '..WSnnSSSSsSSSnnSW..',
  '..WSssSSSnnSSSssSW..',
  '...SsSWWWWWWWWSsS...',
  '...WWWWWmmmmWWWWW...',
  '...WWWWWWWWWWWWWW...',
  '....WWWWWWWWWWWW....',
  'IIIiiWWWWWWWWWWiiIII',
  'IIRYRWWWWWWWWWWRYRII',
  'IiIRWRWWWWWWWWRWRIiI',
  'IIIIRIIWWWWWWIIRIIII',
  'IiIIIIiIWWWWIIIIIiII',
];
export const PAL = { I: '#24305e', i: '#161e40', R: '#b02a22', W: '#dcdad4', S: '#b48660', s: '#8a6044', n: '#c89a74', L: '#d6cabc',
  E: '#120c0a', m: '#2a1410', Y: '#d8a838' };
