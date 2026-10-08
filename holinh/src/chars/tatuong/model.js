// 左將 Tả Tướng, the Left General (def-kit model: src/chars/defkit.js header), fine voxels (src/chars/parts.js FV) on the
// shared rig, towering and broad (kit scale 1.13, the scale Zhang Fei's moveset bakes into its ground spots), built
// from the comic's TA_TUONG token. A big square weathered face, stern and fatherly: thick black brows drawn level over
// steady eyes with deep crow's feet, a broad nose, a wide moustache, and a great full black beard that covers the jaw
// to the ears and falls in five heavy points over the breastplate (chains). The hair is pulled up hard into a topknot
// bound by a bronze crown-ring with a pin through it, black at the crown, the temples iron-grey. Heavy bronze-red
// lamellar laced dark, its lips in bronze: a deep cuirass of wide rows, a broad bronze gorget round the neck, a leather harness whose
// straps cross over the chest to a big bronze ring at the sternum; massive three-tier shoulders lipped in bronze with an
// upturned bronze flange; dark-red sleeves, heavy bracers (bronze-red plates in three bands, bronze rims, a raised
// ridge); a broad leather war-belt hung with square bronze plaques and a bronze buckle shaped as a drum face; bronze-red
// tassets round the sides and back over a dark-red war-skirt, a front flap (a chain); dark-red trousers, bronze-ridged
// greaves strapped over tall black boots. Behind: a heavy red cloak to the calves, a darker band at the hem (a chain).
// Weapon: the giáo lớn — a long dark shaft ringed in bronze, red cord at both grips, a bronze butt cap; a ringed bronze
// socket; a broad leaf-shaped iron blade (wide in X, the widest third of the way up, a raised dark midrib, bright
// edges, a needle point); a red horsehair tassel under the socket (chains).
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xa86e4a, skinD: 0x7e4e32, skinH: 0xbe845c, lip: 0x5e2a20, mouth: 0x1e0a08, eye: 0x0c0808, iris: 0x2e1a10, scl: 0xdcd0c2,
  beard: 0x110e0e, beardH: 0x2c2422, grey: 0x7a7672,
  arm: 0x922e1c, armD: 0x5c1a10, armL: 0xb0442a,                         // bronze-red lamellar
  bronze: 0xb07a3a, bronzeD: 0x6a4420, bronzeL: 0xd8a85a,
  red: 0x9a1e1a, redD: 0x64100e, redL: 0xc0342a,                        // the cloak, cords, tassel
  robe: 0x4a1a14, robeD: 0x2e0e0a, robeL: 0x62261c,                     // dark-red sleeves, skirt, trousers
  leather: 0x2a1a12, leatherL: 0x46301e, boot: 0x181210, bootD: 0x0e0a08,
  shaft: 0x1e1614, shaftH: 0x30241e, iron: 0xa8b0ba, ironD: 0x5c646e, edge: 0xeef2f6,
};
const robe = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.robeL : md(x - y * 2 + z, 9) === 0 ? C.robeD : C.robe);
const cloth = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.redL : md(x - y * 2 + z, 9) === 0 ? C.redD : C.red);
const beardP = (x, y, z) => (md(x * 3 + y + z, 5) === 0 ? C.beardH : C.beard);
/** Dark lacing: a cord down every 5th column of a lamellar volume, bronze where it crosses a lip. */
const laced = (a, b, rowH) => P(a, b, (x, y) => (md(x, 5) === 2 ? (md(y - a[1], rowH) === 0 ? C.bronzeD : C.armD) : null));
const armour = (a, b, o) => [...lamellar(a, b, { base: C.arm, ...o }), laced(a, b, o.rowH)];

// ---------------------------------------------------------------- body (FV, centred on the joints)
/** The drum-face buckle at depth z: bronze rings round a ten-rayed star, centred (0, cy), radius 4.5. */
function drum(cy, z) {
  return B([-5, cy - 5, z], [5, cy + 5, z + 2], (x, y, zz) => {
    const dx = x + 0.5, dy = y + 0.5 - cy, r = Math.hypot(dx, dy), a = Math.atan2(dx, dy);
    if (r > 4.7) return null;
    const ray = r < 2.8 && Math.abs(md(a * 10 / (2 * Math.PI) + 0.5, 1) - 0.5) < 0.16 * (3 - r);
    if (zz === z + 1) return r > 4 || ray || r < 0.9 ? C.bronzeL : null;
    return Math.abs(r - 3.3) < 0.4 ? C.bronzeD : C.bronze;
  });
}
/** A harness strap over the chest from a shoulder (sx) to the sternum ring, 3 voxels wide, proud of the plates. */
function strap(sx) {
  const ax = sx * 12.5, ay = 17.5, bx = 0, by = 9, L2 = (bx - ax) ** 2 + (by - ay) ** 2;
  return B([-16, 6, 12], [16, 19, 14], (x, y) => {
    const px = x + 0.5, py = y + 0.5, t = Math.max(0, Math.min(1, ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / L2));
    const d = Math.hypot(px - ax - t * (bx - ax), py - ay - t * (by - ay));
    return d > 1.6 ? null : d > 1.1 ? C.leather : md(x + y, 4) === 0 ? C.bronzeL : C.leatherL;
  });
}

function torso() {
  const T = {};
  // hips: the dark-red war-skirt (front cut for the stride: the flap is a chain), bronze-red tassets round the sides and
  // back, the broad war-belt with square bronze plaques and the drum-face buckle
  T.hips = [
    B([-13, -10, -9], [13, 6, 9], C.robeD),
    B([-15, -15, -11], [15, -1, 11], (x, y, z) => (z > 6 && y < -6 ? null : robe(x, y, z))),
    ...armour([-16, -18, -12], [16, -2, 6], { rowH: 3, pw: 4, trim: C.bronze, jag: true, lipZ: false }),
    B([-16, -3, -12], [16, 6, 12], (x, y, z) => (y === -3 || y === 5 ? C.leatherL : C.leather)),
    P([-17, -2, -13], [17, 5, 13], (x, y, z) => (md(x + z + 3, 7) < 3 && y > -2 && y < 5 && Math.abs(x + 0.5) > 5 ? (y === -1 || y === 4 ? C.bronzeD : C.bronze) : null)),
    drum(1, 12),
  ];
  // waist: wide rows over the robe, a red band under the cuirass
  T.spine = [
    B([-12, -6, -10], [12, 14, 10], C.armD),
    ...armour([-12, -4, -10], [12, 10, 10], { rowH: 2, pw: 3 }),
    B([-13, 10, -11], [13, 14, 11], (x, y) => (y === 10 ? C.bronzeD : md(x, 5) === 0 ? C.redL : C.red)),
  ];
  // chest: the deep cuirass (two bands of rows), the harness crossing to the bronze sternum ring, the broad gorget
  T.chest = [
    B([-16, -4, -12], [16, 18, 12], C.armD),
    ...armour([-16, -3, -12], [16, 5, 12], { rowH: 2, pw: 3 }),
    ...armour([-17, 5, -13], [17, 17, 13], { rowH: 3, pw: 4, trim: C.bronze }),
    strap(-1), strap(1),
    B([-4, 5, 12], [4, 13, 15], (x, y, z) => {
      const r = Math.hypot(x + 0.5, y + 0.5 - 9);
      return r > 4 || (r < 2.2 && z > 12) ? null : z === 14 && r < 3 ? null : r > 3.2 ? C.bronzeD : C.bronzeL;
    }),
    B([-11, 15, -11], [11, 22, 11], (x, y, z) => (y === 21 ? C.bronzeL : y === 15 ? C.bronzeD : md(x + z, 4) === 0 ? C.bronzeD : C.bronze)),
    ...[-1, 1].map((sx) => mirX(B([8, 14, -15], [12, 18, -13], C.bronze), sx)),               // cloak rings
    B([-7, 15, -7], [7, 26, 7], -1),                                                          // neck hole
  ];
  T.neck = [B([-6, -2, -6], [6, 6, 6], C.skinD), P([-6, 1, 5], [6, 6, 6], C.skin)];
  return T;
}

/** Heavy bracer: three bands of bronze-red plates, bronze rims, a raised ridge on the back of the forearm. */
const heavyBracer = () => [
  B([-4, -23, -4], [5, 1, 5], C.robe),
  ...[-22, -15, -8].map((y) => B([-6, y, -6], [7, y + 7, 7], (x, yy, z) => {
    if (Math.abs(x) + Math.abs(z) > 10) return null;
    return yy === y || yy === y + 6 ? C.bronze : md(x + z, 4) === 0 ? C.armD : C.arm;
  })),
  B([-2, -21, 6], [3, -3, 8], (x, y) => (md(y, 4) === 0 ? C.bronzeL : C.bronze)),
];

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    T['upperArm' + s] = [B([-6, -24, -6], [7, 2, 7], robe), B([-7, -20, -7], [8, -8, 8], robe),
      ...armour([-7, -17, -7], [8, -5, 8], { rowH: 2, pw: 3, trim: C.bronze })];
    T['foreArm' + s] = heavyBracer();
    T['hand' + s] = glove(sx, C.leather, C.bronzeD);
    // dark-red trousers, bronze-red tassets over the outside and front of the thigh
    T['thigh' + s] = [
      B([-8, -36, -8], [8, 2, 8], robe), B([-9, -31, -9], [9, -20, 9], robe),
      ...[...lamellar([-5, -20, -9], [11, 0, 10], { base: C.arm, rowH: 3, pw: 4, trim: C.bronze, jag: true }), laced([-5, -20, -9], [11, 0, 10], 3)].map((b) => mirX(b, sx)),
    ];
    // tall black boots, the trousers tucked under a red garter, a bronze-ridged greave strapped over the front
    T['shin' + s] = [
      B([-6, -34, -6], [7, 0, 7], C.boot),
      B([-8, -7, -8], [8, 2, 8], robe), B([-8, -9, -8], [8, -7, 8], C.redD),
      B([-6, -31, 3], [7, -10, 9], (x, y) => (Math.abs(x) < 1 ? C.bronzeL : y === -11 || Math.abs(x) > 5 ? C.bronzeD : md(y, 4) === 0 ? C.armD : C.arm)),
      B([-3, -10, 7], [4, 1, 10], (x, y) => (y === -10 ? C.bronzeD : C.bronze)),
      B([-7, -24, -7], [8, -22, 7], (x, y, z) => (z > 2 ? null : C.leatherL)),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD, { trim: C.bronze });
  }
  return T;
}

/** Massive three-tier shoulders: bronze-red rows laced and lipped in bronze, an upturned bronze flange. +x outward. */
const pauldron = (sx) => [
  ...armour([-5, 6, -11], [9, 13, 11], { rowH: 3, pw: 4, trim: C.bronze }),
  ...armour([-2, -1, -12], [12, 6, 12], { rowH: 3, pw: 4, trim: C.bronze }),
  ...armour([1, -8, -12], [14, -1, 12], { rowH: 3, pw: 4, trim: C.bronze, jag: true }),
  B([6, 12, -11], [11, 14, 11], C.bronze), B([9, 14, -11], [12, 16, 11], C.bronzeL),
].map((b) => mirX(b, sx));

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const hairP = (x, y, z) => (Math.abs(x) > 6 && y < 14 ? (hash01(x, y, z) < 0.5 ? C.grey : C.beardH) : md(x + 2 * y + z, 6) === 0 ? C.beardH : C.beard);
  return [
    // a big square face: broad jaw, heavy cheekbones, ears
    B([-8, 2, -6], [9, 14, 6], C.skin), B([-8, -1, -5], [9, 4, 5], C.skin),
    ...symH(4, 8, 5, 7, 5, 6, C.skinH), B([-9, 5, -2], [10, 10, 1], C.skinD),
    // steady eyes, deep crow's feet, a furrow; thick level brows
    ...symH(2, 5, 7, 8, 5, 6, C.scl), ...symH(3, 4, 7, 8, 5, 6, C.eye), ...symH(2, 5, 8, 9, 5, 6, C.skinD),
    ...symH(5, 7, 6, 7, 5, 6, C.skinD), ...symH(6, 7, 8, 9, 5, 6, C.skinD), P([0, 9, 5], [1, 12, 6], C.skinD),
    ...symH(1, 7, 9, 11, 5, 7, beardP, false),
    // broad nose, a wide moustache over a set mouth
    B([-1, 4, 6], [2, 9, 8], C.skin), B([-2, 3, 6], [3, 5, 8], C.skinH), P([-2, 3, 7], [-1, 4, 8], C.mouth), P([2, 3, 7], [3, 4, 8], C.mouth),
    P([-2, 1, 5], [3, 2, 6], C.lip),
    B([-5, 2, 6], [6, 4, 8], beardP), ...symH(5, 7, -1, 3, 5, 8, beardP, false),
    // the great beard: over the jaw to the ears and down below the chin (the five points are chains), sideburns
    B([-10, -9, -5], [11, 4, 9], (x, y, z) => {
      const w = y > -2 ? 10 : 10 + (y + 2) * 0.7, X = Math.abs(x);
      if (X > w || z > 8 + Math.min(0, y) * 0.3 || (y >= 1 && z > 4 && X < 5)) return null;
      return y < -5 && hash01(x, y, z) < 0.2 ? null : beardP(x, y, z);
    }),
    B([-10, 3, -5], [-8, 11, 3], beardP), B([9, 3, -5], [11, 11, 3], beardP),
    // hair pulled up hard: crown and back, grey at the temples, the topknot in its bronze crown-ring, the pin
    B([-9, 11, -8], [10, 18, 6], (x, y, z) => (z > 4 && y < 13 && Math.abs(x) < 7 ? null : hairP(x, y, z))),
    B([-7, 18, -7], [8, 20, 5], hairP), B([-8, 4, -9], [9, 11, -6], hairP),
    B([-3, 20, -4], [4, 24, 3], hairP), B([-2, 24, -3], [3, 26, 2], hairP),
    B([-4, 20, -5], [5, 23, 4], (x, y, z) => (Math.abs(x) < 3 && Math.abs(z + 0.5) < 3.5 ? null : y === 22 ? C.bronzeL : C.bronze)),
    B([-7, 22, -1], [8, 23, 0], (x) => (Math.abs(x) > 5 ? C.bronzeL : C.bronzeD)),
  ];
}

// ---------------------------------------------------------------- giáo lớn (weapon joint: shaft +Z, origin = rear grip)
function weaponGeo() {
  // shaft at 0.02 (z −0.86 … 1.48): dark wood, red cord at both grips, bronze rings, a bronze butt cap
  const shaft = vox([
    B([-1, -1, -40], [1, 1, 74], (x, y, z) => ((z > -6 && z < 8) || (z > 18 && z < 30) ? (md(z + (x ^ y), 3) ? C.red : C.redD)
      : md(z, 9) === 0 ? C.shaftH : C.shaft)),
    ...[-30, -14, 10, 32, 50, 64].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.bronzeL : C.bronzeD))),
    B([-2, -2, -43], [2, 2, -40], C.bronze), B([-1, -1, -45], [1, 1, -43], C.bronzeL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // the socket at 0.012 (z 1.44 … 1.62): ringed bronze, swelling to a collar under the blade
  const socket = vox([
    B([-4, -4, 120], [4, 4, 135], (x, y, z) => {
      const w = z < 130 ? 2.4 + (z - 120) * 0.1 : 3.6;
      if (Math.max(Math.abs(x + 0.5), Math.abs(y + 0.5)) > w) return null;
      return md(z, 4) === 0 ? C.bronzeL : md(z, 4) === 1 ? C.bronzeD : C.bronze;
    }),
  ], 0.012, { jitter: 0.05, ao: 0.35 });
  // the broad leaf blade at 0.011 (z 1.6 … 2.22), flat in Y: swelling to ≈ 0.15 m a third of the way up, a raised dark
  // midrib, bright edges, a needle point
  const bv = 0.011, z0 = Math.round(1.6 / bv), z1 = Math.round(2.22 / bv), boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0), w = Math.max(0.6, 7 * Math.pow(Math.sin(Math.PI * Math.pow(u, 0.7)), 0.8) + 2 * Math.pow(1 - u, 6));
    const a = Math.round(-w), b = Math.max(a + 1, Math.round(w));
    boxes.push(B([a, -1, z], [b, 1, z + 1], (x) => (x === a || x === b - 1 ? C.edge : C.iron)));
    if (u < 0.85) boxes.push(B([-1, -2, z], [1, 2, z + 1], C.ironD));                           // the midrib
  }
  const blade = vox(boxes, bv, { jitter: 0.03, ao: 0.2 });
  return [{ geo: shaft, mat: 'body' }, { geo: socket, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
/** The heavy red cloak: a darker band along the edges and the hem, dark-red lining. */
function cloakSeg(i, n) {
  const w = 15 + i, last = i === n - 1, out = [];
  for (let y = -13; y < 0; y++) for (let x = -w; x < w; x++) {
    const X = Math.abs(x + 0.5);
    if (last && y < -11 && md(x, 5) === 0) continue;
    const c = X > w - 2 ? C.redD : last && y < -8 ? (y === -9 ? C.bronzeD : C.redD) : cloth(x, y - i * 13, 0);
    out.push(B([x, y, 0], [x + 1, y + 1, 2], c), B([x, y, -1], [x + 1, y + 1, 0], C.robeD));
  }
  return vox(out, FV, { jitter: 0.02, ao: 0.16 });
}
/** The war-skirt's front flap: dark red, a bronze band at the hem. */
const flapSeg = (i, n) => vox([B([-7, -10, 0], [7, 0, 1], (x, y) => (i === n - 1 && y < -7 ? (y === -10 ? C.bronzeD : C.bronze) : robe(x, y - i * 10, 0))),
  B([-6, -10, -1], [6, 0, 0], C.robeD)], FV, { off: [0, 0, -0.5], jitter: 0.03, ao: 0.16 });
/** A beard point: thick black, tapering. */
const beardSeg = (i, n) => {
  const w = i === 0 ? 3 : 2;
  return vox([B([-w, -7, -w], [w, 0, w], (x, y, z) => (i === n - 1 && y < -4 && (Math.abs(x + 0.5) > 1 || z !== 0) ? null : beardP(x, y + i * 7, z)))],
    HV, { jitter: 0.05, ao: 0.3 });
};
/** Red horsehair tassel strand. */
const strand = (i, n) => {
  const w = i === 0 ? 3 : 2, last = i === n - 1;
  return vox([B([-w, -7, -w], [w, 0, w], (x, y, z) => {
    const k = hash01(x + 9, z + 9, 5);
    if (last && -y > 3 + k * 5) return null;
    if ((x === -w || x === w - 1) && (z === -w || z === w - 1) && i > 0) return null;
    return k < 0.3 ? C.redL : k > 0.8 ? C.redD : C.red;
  })], 0.014, { jitter: 0.06, ao: 0.25 });
};

export const TATUONG_DEF = {
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const out = [];
    // the heavy red cloak from the rings behind the shoulders, the skirt's front flap
    out.push({ joint: 'chest', anchor: [0, 0.2, -0.18], rest: [0, -1, -0.18], n: 6, len: 0.165, stiff: 0.18, drag: 0.22, wind: 1, cone: 76, sway: 0.15,
      face: [0, 0, -1], seg: cloakSeg, hit: ['chest', 'hips', 'thighL', 'thighR', 'kneeL', 'kneeR'] });
    out.push({ joint: 'hips', anchor: [0, -0.02, 0.16], rest: [0, -1, 0.12], n: 3, len: 0.125, stiff: 0.12, drag: 0.16, wind: 0.4, face: [0, 0, 1], cone: 66, sway: 0.06,
      seg: flapSeg, hit: [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]] });
    // five heavy beard points over the breastplate
    for (const [x, rx] of [[-6, -0.3], [-3, -0.12], [0, 0], [3, 0.12], [6, 0.3]]) {
      out.push({ joint: 'head', anchor: [x * HV, -8 * HV, (5 - Math.abs(x) * 0.4) * HV], rest: [rx, -1, 0.35], n: 2, len: 0.06, stiff: 0.3, drag: 0.2, wind: 0.3,
        grav: 1.3, cone: 40, face: [0, 0, 1], seg: beardSeg, hit: [['chest', 0.03]] });
    }
    // the red horsehair tassel under the socket
    for (let k = 0; k < 5; k++) {
      const a = k * 1.2566, ox = Math.cos(a) * 0.016, oy = Math.sin(a) * 0.016;
      out.push({ joint: 'weapon', anchor: [ox, oy, 1.42], rest: [ox * 12, oy * 4 - 1, -0.35], n: 3, len: 0.07, stiff: 0.05 + k * 0.004, drag: 0.12, wind: 0.8, cone: 130,
        sway: 0.15, face: [1, 0, 0], seg: strand });
    }
    return out;
  },
};

// ---------------------------------------------------------------- HUD portrait (20 × 20): the topknot in its bronze
// ring, grey temples, thick level brows over steady eyes, a broad nose and the great black beard spilling over the
// bronze gorget, bronze-red lamellar, the red cloak at the shoulders
export const FACE = [
  '........AAAA........',
  '........KKKK........',
  '.......AaaaaA.......',
  '.....KKKKKKKKKK.....',
  '....KKKKKKKKKKKK....',
  '...gKSSSSSSSSSSKg...',
  '...gSKKKKSSKKKKSg...',
  '...KSsWESSSSEWsSK...',
  '...KsSSSSSnSSSSSsK..',
  '...KSSSSSnnnSSSSK...',
  '...KKKKKKKKKKKKKK...',
  '..KKKKKMmmmmMKKKKK..',
  '..KKKKKKKKKKKKKKKK..',
  '..KKKKKKKKKKKKKKKK..',
  '...KKKKKKKKKKKKKK...',
  'RR..KKKKKKKKKKKK..RR',
  'RRAAAKKKKKKKKKKAAARR',
  'RrRRRRAKKKKKKARRRRrR',
  'RRrRRRRAKKKKARRRRrRR',
  'RrRRbRRRAKKARRbRRRrR',
];
export const PAL = { A: '#d8a85a', a: '#b07a3a', K: '#110e0e', g: '#7a7672', S: '#a86e4a', s: '#7e4e32', n: '#be845c', W: '#dcd0c2', E: '#0c0808',
  M: '#2c2422', m: '#5e2a20', R: '#8c3a22', r: '#5a2214', b: '#d8a85a' };
