// Đinh Khang 丁康 (def-kit model: src/chars/defkit.js header), fine voxels (src/chars/parts.js FV) on the shared rig,
// kit scale 1.06. The river warrior of the guardians (comic token DINH_KHANG): a young swimmer's build — broad shoulders
// and back, a narrow waist, long muscled bare arms. A square young face, thick straight brows over steady eyes, a
// strong nose, a set mouth; cropped black hair, short and tousled on top, close at the sides. A sleeveless indigo tunic
// open in a deep V at the throat (a jade bead on a cord at the breastbone), its edges faded paler, belted with a
// twisted rope (the knot and its two ends at the left hip), the tunic skirt split front and back (panels: chains); short
// indigo trousers to the knee, bare calves, bare feet. Dark-blue tattoos (voxels painted into the skin): a river dragon's
// scaled coil with waves on the upper arms and over the shoulder caps, a crest of waves on each side of the collarbone.
// Grey-blue cloth wraps at the wrists (a loose end each: chains). Weapons: right hand a curved single-edged river blade
// (đao) — rope-wrapped grip, a bronze ring pommel, a small round guard, a blade widening toward a clipped point, dark
// spine, bright edge; left hand a hooked paddle-knife — a broad short paddle blade, its neck running on into a spike
// with a hook bent back toward the hand. The đao is the weapon joint's; kit.js hangs the hook-knife on the left hand.
import { vox, B, P, md } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, hand, bareArm, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xc08a62, skinD: 0x936242, skinH: 0xd8a47a, lip: 0x8e4c3a, eye: 0x120a08, iris: 0x2e1c10, scl: 0xece2d0,
  hair: 0x0e0b0a, hairH: 0x28201c,
  ink: 0x1e2e5a, inkL: 0x34508a,                                       // tattoo blue
  indigo: 0x26326a, indigoD: 0x1c2654, indigoL: 0x34428a, fade: 0x6a78a8,
  rope: 0xb89a62, ropeD: 0x7e6638,
  wrapC: 0x8a96a4, wrapD: 0x5e6a7a,
  jade: 0x3aa078, jadeL: 0x7ad0a4,
  grip: 0x3a2a1c, bronze: 0xa8783a, bronzeD: 0x684820, bronzeL: 0xd4a85a,
  steel: 0xc2ccd8, edge: 0xf4f9ff, spine: 0x5e6878, fuller: 0x8a94a2,
};
const cloth = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.indigoL : md(x - y * 2 + z, 9) === 0 ? C.indigoD : C.indigo);
/** Tattoo pattern over skin at (u along the limb, v around it): a scaled coil (rows of arcs) bordered by a wave crest;
 *  null = bare skin. */
const tattoo = (u, v) => {
  const coil = Math.abs(v - 3 * Math.sin(u * 0.45)) < 2.6;
  if (coil) return md(u + (md(Math.floor(v), 2) ? 1 : 0), 3) === 0 ? C.ink : md(u, 3) === 1 ? C.inkL : null;
  const wave = Math.abs(v - 3 * Math.sin(u * 0.45) - 4.4 + Math.abs(md(u, 4) - 2)) < 0.8;
  return wave ? C.ink : null;
};

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: the tunic skirt (sides only below the belt: the front and back panels are chains), the twisted rope belt and
  // its knot on the left hip
  T.hips = [
    B([-11, -10, -8], [11, 6, 8], C.indigoD),
    B([-12, -14, -9], [12, -1, 9], (x, y, z) => (Math.abs(z) > 4 && y < -5 ? null : y === -14 ? C.fade : cloth(x, y, z))),
    B([-12, -1, -9], [12, 3, 9], cloth),
    B([-13, 1, -10], [13, 4, 10], (x, y, z) => (md(x + z + y, 3) === 0 ? C.ropeD : C.rope)),
    B([9, -1, 6], [13, 5, 11], (x, y, z) => (md(x + y + z, 2) ? C.rope : C.ropeD)),
  ];
  // waist: narrow, the tunic close over it
  T.spine = [B([-10, -6, -8], [10, 14, 8], cloth)];
  // chest: broad, the sleeveless tunic — deep armholes (bare shoulders: the upper arms carry the deltoids), a V open at
  // the throat to the breastbone (bare skin, a wave crest tattooed each side, the jade bead on its cord), faded edges
  const vee = (x, y) => Math.abs(x + 0.5) < (y - 7) * 0.62;
  T.chest = [
    B([-15, -4, -10], [15, 17, 10], (x, y, z) => {
      if (z > 6 && y > 7 && vee(x, y)) return y > 16 && Math.abs(x + 0.5) < 4 ? null : Math.abs(x + 0.5) > (y - 7) * 0.62 - 1.2 ? C.skinD : C.skin;
      if (z > 6 && y > 7 && Math.abs(x + 0.5) < (y - 7) * 0.62 + 1.2) return C.fade;
      if (Math.abs(x) > 12 && y > 9) return y > 13 ? C.skin : C.fade;
      return cloth(x, y, z);
    }),
    // the shoulder tops: skin, a wave crest in ink over each collarbone
    B([-15, 14, -9], [15, 18, 9], (x, y, z) => (Math.abs(x) < 6 ? null : Math.abs(x) < 9 ? C.indigo : C.skin)),
    P([-15, 15, -9], [15, 18, 11], (x, y, z) => {
      const ax = Math.abs(x + 0.5);
      if (ax < 9) return null;
      return Math.abs(y - 16 - Math.round(Math.sin((ax + z) * 0.7))) < 1 && md(ax + z, 3) ? C.ink : null;
    }),
    P([-6, 11, 9], [6, 17, 11], (x, y) => {
      const ax = Math.abs(x + 0.5);
      return ax > 2.5 && Math.abs(y - 12 - (ax - 2.5) * 0.6) < 0.7 ? C.inkL : null;
    }),
    // cord and jade bead
    P([-4, 13, 9], [4, 17, 11], (x, y) => (Math.abs(Math.abs(x + 0.5) - (y - 12) * 0.9) < 0.6 ? C.ropeD : null)),
    B([-1, 10, 9], [1, 13, 11], (x, y) => (y === 12 ? C.jadeL : C.jade)),
    B([-6, 14, -6], [6, 25, 6], -1),
  ];
  T.neck = [B([-5, -2, -5], [5, 6, 5], C.skinD), P([-5, 1, 4], [5, 6, 5], C.skin)];
  return T;
}

function limbs(T) {
  const sk = { skin: C.skin, skinD: C.skinD, skinH: C.skinH };
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // bare muscled arm, the dragon coil tattooed round its upper half and over the shoulder cap (on the outside)
    T['upperArm' + s] = [
      ...bareArm(sk, null),
      B([-5, 0, -5], [6, 4, 6], (x, y, z) => (Math.abs(x) + Math.abs(z) > 8 ? null : y > 2 && Math.abs(x) + Math.abs(z) > 6 ? null : C.skin)),
      P([-6, -18, -6], [7, 4, 7], (x, y, z) => {
        const out = x * sx;                                                 // + = the arm's outer side
        if (out < -1 && z > -2) return null;
        const v = Math.atan2(z, out) * 4.5 + (y > 0 ? 0 : 0);
        return tattoo(-y + 4, v);
      }),
    ];
    // bare forearm, tapered, the grey-blue cloth wrap at the wrist
    T['foreArm' + s] = [
      B([-4, -22, -4], [5, 1, 5], (x, y, z) => (Math.abs(x) + Math.abs(z) > (y > -8 ? 7 : 6) ? null : z > 2 && y > -10 ? C.skinH : x * sx > 2 ? C.skinD : C.skin)),
      B([-5, -23, -5], [6, -14, 6], (x, y, z) => (Math.abs(x) + Math.abs(z) > 8 ? null : md(y + ((x + z) >> 1), 3) === 0 ? C.wrapD : C.wrapC)),
    ];
    T['hand' + s] = hand(sx, C.skin, C.skinD);
    // short indigo trousers to the knee, a faded hem
    T['thigh' + s] = [
      B([-7, -36, -7], [7, 2, 7], (x, y) => (y < -33 ? C.fade : md(y + (x & 1), 6) === 0 ? C.indigoD : C.indigo)),
      B([-8, -30, -8], [8, -20, 8], (x, y) => (md(y - x, 5) === 0 ? C.indigoD : C.indigo)),
    ];
    // bare calves (a calf swell behind), a cord at the ankle
    T['shin' + s] = [
      B([-5, -34, -5], [5, 0, 5], (x, y, z) => (Math.abs(x) + Math.abs(z) > 7 ? null : z > 2 ? C.skinH : x * sx > 2 ? C.skinD : C.skin)),
      B([-5, -18, -7], [5, -4, -3], (x, y, z) => (Math.abs(x) > 3 ? null : C.skin)),
      B([-6, -4, -6], [6, 2, 6], (x, y) => (y < -2 ? C.fade : C.indigo)),
      B([-5, -32, -5], [5, -30, 5], (x, y, z) => (md(x + z, 2) ? C.rope : C.ropeD)),
    ];
    // bare foot
    T['foot' + s] = [...boot(C.skin, C.skinD, C.skinD), P([-6, 0, 12], [7, 2, 17], (x) => (md(x, 3) === 0 ? C.skinD : null))];
  }
  return T;
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const hair = (x, y, z) => (md(x * 3 + z + y * 2, 7) === 0 ? C.hairH : C.hair);
  // cropped: short tousled tufts on top (hashed heights), close at the sides and nape
  const top = (x, y, z) => {
    const k = hash01(x + 13, z + 13, 7);
    if (y === 17 && k < 0.5) return null;
    return hair(x, y, z);
  };
  return [
    // a square young face, a strong jaw
    B([-6, 3, -6], [7, 14, 6], C.skin),
    B([-6, 0, -4], [7, 3, 5], C.skin), B([-7, 2, -5], [8, 6, 5], C.skin),
    ...symH(4, 7, 4, 6, 5, 6, C.skinH),
    ...symH(6, 8, 1, 4, 2, 5, C.skinD),
    // close-cropped hair over the crown and nape, short at the temples, tufts on top
    B([-7, 6, -7], [8, 15, -3], hair),
    B([-7, 13, -7], [8, 16, 6], (x, y, z) => (z > 4 && y === 13 ? null : hair(x, y, z))),
    B([-6, 16, -6], [7, 18, 5], top),
    ...symH(6, 8, 9, 14, -3, 3, C.hair, false),
    ...symH(7, 8, 6, 10, -1, 2, C.skin, false), ...symH(7, 8, 7, 9, 0, 1, C.skinD),
    // thick straight brows, steady eyes (white, the iris, the lid), a strong nose, a set mouth
    ...symH(1, 6, 11, 12, 5, 7, C.hair, false), ...symH(1, 4, 12, 13, 5, 6, C.hair, false),
    ...symH(2, 5, 7, 9, 5, 6, C.scl), ...symH(2, 4, 7, 9, 5, 6, C.iris), ...symH(2, 3, 7, 9, 5, 6, C.eye),
    ...symH(2, 5, 9, 10, 5, 6, C.eye),
    B([-1, 5, 6], [2, 9, 8], C.skinH), B([-1, 4, 6], [2, 5, 8], C.skin), P([-1, 4, 7], [0, 5, 8], C.skinD), P([1, 4, 7], [2, 5, 8], C.skinD),
    P([-2, 3, 5], [3, 4, 6], C.lip),
  ];
}

// ---------------------------------------------------------------- weapons (shaft +Z, origin = the grip centre)
const SV = 0.01, O = { off: [-0.5, -0.5, 0], jitter: 0.04, ao: 0.3 };
/** Rope-wrapped grip z −0.11 … 0.07 and a bronze ring pommel. */
const gripBoxes = () => [B([-1, -1, -11], [2, 2, 7], (x, y, z) => (md(z + x + y, 2) ? C.grip : C.ropeD))];
const ring = () => B([-3, 0, -18], [4, 1, -11], (x, y, z) => (Math.hypot(x, z + 14.5) > 3.6 || Math.hypot(x, z + 14.5) < 1.8 ? null : C.bronze));

/** [{geo, mat}] of the curved river blade: grip (body), bronze fittings (metal), the blade (blade, index 2: kit.js and the
 *  twin view read it). The blade runs z 0.11 … 0.88 m, curving back toward its spine (−x), the edge on +x. */
export function daoGeo() {
  const grip = vox(gripBoxes(), SV, O);
  const fit = vox([
    ring(),
    B([-4, -4, 7], [5, 5, 9], (x, y) => (Math.hypot(x, y) > 4.4 ? null : Math.hypot(x, y) > 3.4 ? C.bronzeD : C.bronze)),
    B([-2, -2, 9], [3, 3, 11], C.bronzeD),
  ], SV, O);
  const boxes = [];
  for (let z = 11; z < 88; z++) {
    const u = (z - 11) / 77, c = -Math.round(7 * u * u), hw = 2 + Math.round(1.6 * u);
    let lo = c - hw, hi = c + hw;
    if (u > 0.86) lo += Math.round((u - 0.86) / 0.14 * (hi - lo));          // the clipped point: the spine sweeps down to the edge
    for (let x = lo; x <= hi; x++) {
      const col = x === hi ? C.edge : x === lo && u <= 0.86 ? C.spine : x === lo + 1 && u < 0.8 ? C.fuller : C.steel;
      boxes.push(B([x, x <= lo + 1 && u < 0.86 ? -1 : 0, z], [x + 1, 1, z + 1], col));
    }
  }
  const blade = vox(boxes, SV, { off: [-0.5, -0.5, 0], jitter: 0.03, ao: 0.2 });
  return [{ geo: grip, mat: 'body' }, { geo: fit, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

/** The hooked paddle-knife (left hand), the same three meshes: a broad short paddle blade z 0.1 … 0.6, the neck running
 *  on into a spike to 0.8 with a hook bent back toward the hand on the spine side (−x). */
export function hookGeo() {
  const grip = vox(gripBoxes(), SV, O);
  const fit = vox([ring(), B([-3, -2, 7], [4, 3, 10], (x, y, z) => (z === 9 ? C.bronzeL : C.bronze))], SV, O);
  const boxes = [], put = (x, z, c, t = 0) => boxes.push(B([x, -t, z], [x + 1, 1, z + 1], c));
  for (let z = 10; z < 80; z++) {
    const u = (z - 10) / 50;
    const hw = z < 60 ? Math.max(2, Math.round(5 * Math.pow(Math.sin(Math.min(1, u * 1.2) * Math.PI * 0.62 + 0.25), 1.2))) : 1;
    for (let x = -hw; x <= hw; x++) put(x, z, x === hw ? C.edge : x === -hw ? (z < 60 ? C.spine : C.edge) : Math.abs(x) < 1 && z < 56 ? C.fuller : C.steel, x < hw && z < 64 ? 1 : 0);
  }
  for (let k = 0; k <= 26; k++) {                                       // the hook: an arc off the spike's top, bent back
    const a = (k / 26) * Math.PI * 0.95, x = Math.round(-1 - 6 * Math.sin(a)), z = Math.round(73 + 6 * Math.cos(a));
    put(x, z, k > 16 ? C.edge : C.steel, k < 20 ? 1 : 0); put(x + (k > 13 ? 1 : 0), z - (k < 13 ? 1 : 0), C.steel);
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
/** Tunic panel (front / back): indigo, the edges and hem faded pale. */
const panel = (i, n) => vox([B([-4, -8, 0], [4, 0, 1], (x, y) => (i === n - 1 && y <= -7 ? (y === -8 && x & 1 ? null : C.fade)
  : x === -4 || x === 3 ? C.fade : cloth(x, y, i)))], FV * 1.2, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.2 });
/** Rope end: a twist, the tip frayed. */
const rope = (i, n) => vox([B([-1, -6, -1], [1, 0, 1], (x, y, z) => (i === n - 1 && y <= -4 ? (hash01(x + 3, z + 3, y + 9) < 0.4 ? null : C.rope)
  : md(y + x + z, 2) ? C.rope : C.ropeD))], 0.011, { jitter: 0.04, ao: 0.15 });
/** Wrist wrap's loose end. */
const wrapEnd = (i, n) => vox([B([-1, -5, 0], [2, 0, 1], (x, y) => (i === n - 1 && y === -5 && x ? null : md(y, 3) ? C.wrapC : C.wrapD))],
  0.011, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.1 });

export const DINHKHANG_DEF = {
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, weapon: daoGeo() }),
  chains() {
    const legs = [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]];
    return [
      { joint: 'hips', anchor: [0, -0.01, 0.12], rest: [0, -1, 0.1], n: 3, len: 0.1, stiff: 0.12, drag: 0.14, wind: 0.5, face: [0, 0, 1], cone: 70, sway: 0.1,
        seg: panel, hit: legs },
      { joint: 'hips', anchor: [0, -0.01, -0.12], rest: [0, -1, -0.12], n: 3, len: 0.1, stiff: 0.12, drag: 0.14, wind: 0.6, face: [0, 0, -1], cone: 70, sway: 0.12,
        seg: panel, hit: ['hips', ...legs] },
      // the rope belt's two ends from the knot on the left hip
      ...[0, 1].map((k) => ({ joint: 'hips', anchor: [0.14, 0.02, 0.1 - k * 0.025], rest: [0.2, -1, 0.15], n: 3, len: 0.065, stiff: 0.08, drag: 0.12,
        wind: 0.8, cone: 70, sway: 0.15, face: [1, 0, 0], seg: rope, hit: [['thighL', 0.03]] })),
      // the wrist wraps' loose ends
      ...['foreArmL', 'foreArmR'].map((joint) => ({ joint, anchor: [0, -0.2, -0.06], rest: [0, -0.4, -1], n: 2, len: 0.05, stiff: 0.05, drag: 0.1, wind: 1.6,
        cone: 120, sway: 0.3, seg: wrapEnd })),
      // a cord tassel at each pommel ring (the hook-knife rides the left hand: its frame is the knife's, kit.js): jade and
      // foam-white on the đao, rope on the hook
      ...[['weapon', C.jade, C.jadeL, 0xe8eef0], ['handL', C.rope, C.ropeD, C.rope]].flatMap(([joint, c, h, d]) => [0, 1, 2].map((k) => ({
        joint, anchor: [(k - 1) * 0.008, 0, -0.17], rest: [(k - 1) * 0.3, -1, -0.3], n: 3, len: 0.04, stiff: 0.05, drag: 0.12, wind: 0.8, cone: 130,
        sway: 0.15, face: [1, 0, 0], seg: strand(c, h, d) }))),
    ];
  },
};

// ---------------------------------------------------------------- HUD portrait (20 × 20): cropped tousled black hair, a
// square young face with thick brows; the sleeveless indigo tunic open at the throat, the jade bead, bare shoulders
// inked with blue waves
export const FACE = [
  '.......K.KK.K.......',
  '.....KKKKKKKKKK.....',
  '....KKKKKKKKKKKK....',
  '...KKKKKKKKKKKKKK...',
  '...KKSKSSKSSKSSKK...',
  '...KSSSSSSSSSSSSK...',
  '..SKKKKKSSSSKKKKKS..',
  '..SSSWEESSSSEEWSSS..',
  '..sSSSSSSSSSSSSSSs..',
  '...SSSSSSssSSSSSS...',
  '...SSSSSSssSSSSSS...',
  '...sSSSSSSSSSSSSs...',
  '....SSSSMMMMSSSS....',
  '.....sSSSSSSSSs.....',
  '......ssssssss......',
  '.SSSSIIfSSSSfIISSSS.',
  'SNSNSIIIfSSfIIISNSNS',
  'SSNSIIIIIfJfIIIIISNS',
  'NSSNIIiIIIfIIIiIINSS',
  'SNSIIIIIiIIIIIIIIISN',
];
export const PAL = { K: '#0e0b0a', S: '#c08a62', s: '#936242', W: '#ece2d0', E: '#120a08', M: '#8e4c3a', I: '#26326a', i: '#161e44',
  f: '#6a78a8', J: '#3aa078', N: '#1e2e5a' };
