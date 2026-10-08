// Kiều Công Hãn (矯公罕) — warlord of Phong Châu (ch. IV): polearm class. NPC entry (contract: src/chars/npc/index.js);
// model def as src/chars/defkit.js (fine voxels, src/chars/parts.js FV) on the shared rig, a size up (scale 1.12).
// A highland lord of the old Văn Lang country, grandson of Kiều Công Tiễn: forest-jade lacquered lamellar laced over
// bronze, a round bronze breast mirror cast with the twelve-rayed star of the Đông Sơn drums, broad lamellar pauldrons
// rimmed in bronze; a rounded bronze helmet with a tall red horsehair crest running front to back (and loose red strands
// springing from its crown: chains), bronze cheek plates; a hard square face, heavy brows, a black moustache and a
// short beard. A jade cloak hangs from both shoulders, a band of Đông Sơn tangent circles at its hem and the long-beaked
// bird of the drums in bronze thread across its back. Weapon: a heavy long-hafted qua (戈, dagger-axe) — a black-lacquered
// shaft bound in bronze, a broad bronze blade set across the head (edge on −X, a long lower "hồ" down the shaft), a
// short bronze finial point, a red tassel under the head.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as POLEARM from '../../../../src/chars/npc/polearm.js';
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
const C = {
  skin: 0xbd8a64, skinD: 0x8e5e40, skinH: 0xd09c74, lip: 0x6a3428, mouth: 0x241008, eye: 0x0a0808, iris: 0x2a1a10, scl: 0xe4d8c4,
  beard: 0x141010, beardH: 0x2e2622,
  jade: 0x2e6a4a, jadeD: 0x1a3e2c, jadeL: 0x4e8e66, lace: 0x10180f,
  bronze: 0xa8783a, bronzeD: 0x684820, bronzeL: 0xdcac5c, verd: 0x5a9a80,
  red: 0xb02c1e, redD: 0x6a1a10, redL: 0xd8462c,
  black: 0x1c1a16, blackL: 0x34302a, leather: 0x3a2a1c, leatherL: 0x5a4030, boot: 0x1d1917, bootD: 0x121010,
  cloth: 0x2a3a2e, clothD: 0x1a241c,
};
const jadeCloth = (x, y, z) => (md(x * 2 + y + z * 3, 13) === 0 ? C.jadeL : md(x - y * 2 + z, 9) === 0 ? C.jadeD : C.jade);
const beardP = (x, y, z) => (md(x * 3 + y + z, 4) === 0 ? C.beardH : C.beard);
const bronzeP = (x, y, z) => (md(x + y * 2 + z, 7) === 0 ? C.verd : md(x - y + z, 5) === 0 ? C.bronzeL : C.bronze);   // a little verdigris

/** Round bronze breast mirror: a disc (radius R voxels) with the drum face — a twelve-rayed star, two rings. */
function mirror(cx, cy, z, R) {
  const out = [];
  for (let y = -R; y <= R; y++) for (let x = -R; x <= R; x++) {
    const d = Math.hypot(x, y);
    if (d > R + 0.3) continue;
    const a = Math.atan2(y, x), ray = Math.abs(Math.cos(a * 6)) > 0.82 && d < R * 0.55;
    const c = d > R - 0.8 ? C.bronzeD : Math.abs(d - R * 0.72) < 0.6 ? C.bronzeL : ray || d < 1.2 ? C.bronzeL : d < R * 0.6 ? C.bronze : C.bronzeD;
    out.push(B([cx + x, cy + y, z], [cx + x + 1, cy + y + 1, z + (d < R * 0.55 ? 2 : 1)], c));
  }
  return out;
}

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: a long jade lamellar skirt round the back and sides, a front apron of red cloth under a bronze-studded belt,
  // a bronze dagger at the left hip
  T.hips = [
    B([-12, -10, -8], [12, 6, 8], C.clothD),
    ...lamellar([-15, -22, -11], [15, -1, 2], { base: C.jade, rowH: 3, pw: 3, trim: C.bronze, jag: true }),
    ...lamellar([-14, -12, 2], [14, -1, 11], { base: C.jade, rowH: 3, pw: 3, trim: C.bronze }),
    B([-5, -20, 9], [6, -1, 12], (x, y) => (y === -20 ? C.redD : md(y, 4) === 0 ? C.redL : C.red)),
    B([-15, -1, -11], [15, 5, 11], (x, y, z) => (y === -1 || y === 4 ? C.bronzeD : y === 2 && md(x + z, 3) === 0 ? C.bronzeL : C.black)),
    B([-4, -3, 11], [5, 6, 13], (x, y) => (y === -3 || y === 5 || x === -4 || x === 4 ? C.bronzeD : C.bronzeL)),
    P([-1, 0, 12], [2, 3, 13], C.red),
    B([13, -16, -3], [16, 2, 1], (x, y) => (y > -3 ? C.bronzeL : C.bronzeD)),                       // dagger scabbard
  ];
  T.spine = [
    B([-11, -6, -9], [11, 14, 9], C.clothD),
    ...lamellar([-11, -4, -9], [11, 10, 9], { base: C.jade, rowH: 2, pw: 3 }),
    B([-12, 10, -10], [12, 14, 10], (x, y) => (y === 10 ? C.bronzeD : md(x, 4) === 0 ? C.bronzeL : C.bronze)),
  ];
  // chest: jade lamellar laced in black over a bronze-rimmed cuirass, the breast mirror, bronze shoulder straps, a high
  // bronze collar
  T.chest = [
    B([-15, -4, -11], [15, 18, 11], C.jadeD),
    ...lamellar([-15, -3, -11], [15, 5, 11], { base: C.jade, rowH: 2, pw: 3 }),
    ...lamellar([-16, 5, -12], [16, 17, 12], { base: C.jade, rowH: 3, pw: 4, trim: C.bronze }),
    ...mirror(0, 10, 12, 6),
    ...[-1, 1].flatMap((sx) => [mirX(B([9, 15, -13], [13, 19, 13], C.bronze), sx), mirX(B([10, 16, -14], [12, 18, 14], C.bronzeD, true), sx)]),
    B([-10, 16, -10], [10, 24, 10], (x, y) => (y === 23 ? C.bronzeL : y === 16 || y === 20 ? C.bronzeD : C.bronze)),   // collar
    B([-7, 15, -7], [7, 27, 7], -1),
    B([-12, -2, -14], [12, 16, -12], (x, y) => (md(y, 4) === 0 ? C.jadeD : C.jade)),              // back plate
  ];
  T.neck = [B([-5, -2, -5], [5, 6, 5], C.skinD), P([-5, 1, 4], [5, 6, 5], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // dark jade sleeves under lamellar, a bronze armlet; bronze-banded bracers; leather gauntlets
    T['upperArm' + s] = [
      B([-6, -24, -6], [6, 2, 6], jadeCloth), B([-7, -19, -7], [7, -7, 7], jadeCloth),
      ...lamellar([-6, -18, -6], [6, -3, 6], { base: C.jade, rowH: 2, pw: 3, trim: C.bronze }),
      B([-7, -24, -7], [7, -21, 7], (x, y) => (y === -22 ? C.bronzeL : C.bronzeD)),
    ];
    T['foreArm' + s] = bracer(C.clothD, [C.bronze, C.bronzeD, C.bronzeL]);
    T['hand' + s] = glove(sx, C.leather, C.leatherL);
    // dark trousers wrapped at the shin, jade lamellar tassets over the thighs
    T['thigh' + s] = [
      B([-7, -36, -7], [7, 2, 7], (x, y) => (md(y + (x & 1), 6) === 0 ? C.clothD : C.cloth)),
      ...lamellar([-5, -19, -7], [9, 0, 8], { base: C.jade, rowH: 2, pw: 3, trim: C.bronze, jag: true }).map((b) => mirX(b, sx)),
      ...lamellar([-7, -16, 5], [7, 0, 9], { base: C.jade, rowH: 2, pw: 3, trim: C.bronze, lipX: false }),
    ];
    // wrapped leggings, bronze greave plates in front, bronze knee discs
    T['shin' + s] = [
      B([-6, -34, -6], [6, 0, 6], (x, y) => (md(y - x, 4) === 0 ? C.clothD : C.cloth)),
      B([-7, -30, 3], [7, -9, 8], (x, y) => (md(y, 5) === 0 ? C.bronzeD : y === -10 ? C.bronzeL : C.bronze)),
      B([-3, -10, 7], [4, -3, 10], (x, y) => (Math.abs(x - 0.5) + Math.abs(y + 6.5) < 4 ? C.bronzeL : null)),
      B([-7, -34, -7], [7, -32, 7], C.bootD),
    ];
    T['foot' + s] = [...boot(C.boot, C.bootD, C.bootD, { trim: C.bronze })];
  }
  return T;
}

/** Broad jade lamellar pauldron under a bronze cap with a raised rim (the same both sides). Authored with +x outward. */
function pauldron(sx) {
  return [
    B([-4, 10, -9], [9, 14, 9], (x, y, z) => (y === 10 || Math.abs(z) === 9 ? C.bronzeD : bronzeP(x, y, z))),
    B([-2, 14, -7], [7, 16, 7], bronzeP),
    ...lamellar([-3, 4, -11], [11, 10, 11], { base: C.jade, rowH: 3, pw: 4, trim: C.bronze }),
    ...lamellar([0, -2, -12], [13, 4, 12], { base: C.jade, rowH: 3, pw: 4, trim: C.bronze }),
    ...lamellar([3, -8, -12], [15, -2, 12], { base: C.jade, rowH: 3, pw: 4, trim: C.bronzeL, jag: true }),
    B([12, 4, -3], [14, 9, 3], C.bronzeL), P([13, 5, -1], [14, 8, 1], C.red),
  ].map((b) => mirX(b, sx));
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const helm = (x, y, z) => (y === 12 ? C.bronzeD : md(Math.round(Math.atan2(x - 0.5, z) * 4) + y, 5) === 0 ? C.bronzeL : bronzeP(x, y, z));
  const crest = [];
  for (let z = -8; z < 10; z++) {                                     // red horsehair crest, front to back, tallest mid-crown
    const t = (z + 8) / 17, h = Math.round(4 + 4 * Math.sin(Math.PI * Math.min(1, t * 1.1)));
    crest.push(B([-1, 21, z], [2, 21 + h, z + 1], (x, y) => (y === 21 ? C.bronzeD : (x + y + z) % 3 === 0 ? C.redL : y > 21 + h - 2 ? C.redD : C.red)));
  }
  return [
    // a square, weathered face: broad jaw, hard cheekbones
    B([-7, 2, -6], [8, 13, 6], C.skin),
    B([-8, 0, -5], [9, 6, 5], C.skin),
    ...symH(4, 7, 5, 7, 5, 6, C.skinH),
    ...symH(3, 4, 2, 6, 5, 6, C.skinD),
    // deep-set eyes under heavy straight brows
    ...symH(1, 5, 8, 10, 5, 6, C.scl), ...symH(2, 4, 8, 10, 5, 6, C.iris), ...symH(2, 3, 8, 9, 5, 6, C.eye),
    ...symH(1, 6, 10, 12, 5, 7, C.beard, false),
    P([0, 10, 5], [1, 12, 6], C.skinD),
    // broad nose
    B([0, 5, 6], [1, 10, 7], C.skin), B([-1, 4, 6], [2, 6, 8], C.skin), P([-1, 4, 7], [0, 5, 8], C.skinD), P([1, 4, 7], [2, 5, 8], C.skinD),
    // set mouth, a heavy black moustache and a short square beard round the jaw
    P([-2, 2, 5], [3, 3, 6], C.mouth), P([-2, 1, 5], [3, 2, 6], C.lip),
    B([-4, 3, 6], [5, 5, 8], beardP), B([-5, 1, 5], [-3, 4, 8], beardP), B([4, 1, 5], [6, 4, 8], beardP),
    B([-8, -4, -3], [9, 3, 7], (x, y, z) => (z > 4 && y >= 1 && Math.abs(x - 0.5) < 4 ? null : hash01(x, y, z) < 0.08 && y < -2 ? null : beardP(x, y, z))),
    B([-8, 3, -4], [-6, 10, 3], beardP), B([7, 3, -4], [9, 10, 3], beardP),
    // rounded bronze helmet: bowl, crown, a brow band with a raised bronze sun boss, the crest
    B([-9, 12, -8], [10, 18, 8], helm), B([-8, 18, -7], [9, 20, 7], helm), B([-5, 20, -4], [6, 21, 4], C.bronze),
    B([-9, 12, 7], [10, 14, 9], (x, y) => (y === 12 ? C.bronzeD : C.bronzeL)),
    B([-2, 13, 9], [3, 17, 10], (x, y) => (Math.abs(x - 0.5) + Math.abs(y - 15) < 3 ? C.bronzeL : null)), P([0, 14, 9], [1, 16, 10], C.red),
    ...crest,
    // bronze cheek plates, a jade-lamellar neck guard round the back
    B([-11, 3, -4], [-9, 13, 4], bronzeP), B([10, 3, -4], [12, 13, 4], bronzeP),
    B([-11, 3, 3], [-9, 13, 5], C.bronzeD), B([10, 3, 3], [12, 13, 5], C.bronzeD),
    B([-10, 1, -10], [11, 13, -7], (x, y) => (md(y, 3) === 0 ? C.jadeD : C.jade)),
  ];
}

// ---------------------------------------------------------------- qua 戈 (weapon joint: shaft +Z, origin = rear grip)
function weaponGeo() {
  // shaft at 0.02 (z −0.84 … 2.2): black lacquer banded in bronze, cord wraps at both grips, a bronze butt cap
  const shaft = vox([
    B([-1, -1, -42], [1, 1, 110], (x, y, z) => ((z > -6 && z < 8) || (z > 18 && z < 34) ? (md(z + x + y, 2) ? C.redD : C.leather)
      : ((z >> 1) & 1) ? C.blackL : C.black)),
    ...[-36, -12, 12, 40, 66, 88, 100].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.bronzeL : C.bronzeD))),
    B([-2, -2, -42], [2, 2, -38], C.bronze), B([-1, -1, -45], [1, 1, -42], C.bronzeL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // the head at 0.012: a socket collar, the broad blade (yuan) across the shaft out to −X, curving down at the tip, a
  // long lower edge (hu) running down the shaft, the tang stub on +X, a bronze finial point on top
  const v = 0.012, z0 = Math.round(2.0 / v), out = [];
  out.push(B([-3, -3, z0 - 10], [3, 3, z0 + 12], (x, y, z) => (md(z, 4) === 0 ? C.bronzeD : bronzeP(x, y, z))));          // socket
  for (let x = -40; x < -2; x++) {                                     // the blade: broad at the root, tapering, tip drooping
    const u = (-x - 2) / 38, w = Math.round(8 - 5 * u), droop = Math.round(6 * u * u);
    out.push(B([x, -1, z0 - w - droop], [x + 1, 1, z0 + w - droop], (xx, y, z) => (z === z0 - w - droop || z === z0 + w - droop - 1 ? C.bronzeL
      : Math.abs(z - (z0 - droop)) < 2 && u < 0.8 ? C.bronzeD : bronzeP(xx, y, z))));
  }
  for (let z = z0 - 30; z < z0 - 6; z++) {                             // the hu: an edge running down the shaft
    const w = Math.round(3 + 4 * (z - z0 + 30) / 24);
    out.push(B([-3 - w, -1, z], [-2, 1, z + 1], (x) => (x === -3 - w ? C.bronzeL : bronzeP(x, 0, z))));
  }
  out.push(B([3, -1, z0 - 3], [9, 1, z0 + 3], (x) => (x === 8 ? C.bronzeL : C.bronzeD)));                                // tang
  for (let z = z0 + 12; z < z0 + 26; z++) { const w = Math.max(0, Math.round(2 - (z - z0 - 12) / 6)); out.push(B([-w - 1, -1, z], [w + 1, 1, z + 1], z > z0 + 22 ? C.bronzeL : C.bronze)); }   // finial
  out.push(B([-4, -3, z0 - 34], [4, 3, z0 - 31], C.bronzeD));                                                            // binding band
  const headG = vox(out, v, { jitter: 0.04, ao: 0.25 });
  return [{ geo: shaft, mat: 'body' }, { geo: headG, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
const strand = (c, h, d, vs, w0 = 2) => (i, n) => {
  const w = i === 0 ? w0 + 1 : w0, last = i === n - 1;
  return vox([B([-w, -7, -w], [w, 0, w], (x, y, z) => {
    const k = hash01(x + 9, z + 9, 7);
    if (last && -y > 3 + k * 5) return null;
    if ((x === -w || x === w - 1) && (z === -w || z === w - 1) && i > 0) return null;
    return last && -y > 3 + k * 3 ? d : k < 0.3 ? h : k > 0.8 ? d : c;
  })], vs, { jitter: 0.06, ao: 0.25 });
};
// Đông Sơn bird (chim Lạc) for the cloak's back: a long beak, a crest, spread wings — 13 × 7, row 0 = top
const BIRD = ['....XX.......', 'XXXXXXX......', '...XXXXX..XX.', '..XXXXXXXXX..', '.XXX.XXXXX...', 'XX....XX.X...', '......X..X...'];
// jade cloak panels flaring below the belt: the bird across segments 1-2, a band of tangent circles at the hem
const cape = (side) => (i, n) => {
  const boxes = [], width = 6 + Math.round(i * 0.45);
  for (let row = 0; row < 11; row++) {
    const w = width + Math.floor(row / 4);
    for (let x = -w; x <= w; x++) {
      if (i === n - 1 && row > 8 && Math.abs(x) < 2) continue;
      let c = Math.abs(x) >= w - 1 ? C.jadeD : row % 5 === 0 ? C.jadeD : C.jade;
      const by = (i - 1) * 11 + row - 3, bx = side > 0 ? x + 8 : 4 - x;                 // the bird spans both panels
      if (by >= 0 && by < BIRD.length && bx >= 0 && bx < 13 && BIRD[by][bx] === 'X') c = C.bronzeL;
      if (i === n - 1 && row > 5 && row < 9) c = (md(x, 4) === 0 || row === 7 && md(x, 4) !== 2) ? C.bronze : C.jadeD;   // tangent circles
      boxes.push(B([x, -row - 1, 0], [x + 1, -row, 2], c));
    }
  }
  return vox(boxes, FV, { jitter: 0.025, ao: 0.17 });
};

export const DEF = {
  scale: 1.12,
  reach: { tip: 2.5, butt: 0.88 },
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const out = [];
    // loose red horsehair springing from the crest's crown, streaming back
    for (let k = 0; k < 4; k++) {
      out.push({ joint: 'head', anchor: [(k - 1.5) * 0.6 * HV, 28 * HV, (-2 - k * 2) * HV], rest: [(k - 1.5) * 0.2, 0.5, -1], n: 5, len: 0.075,
        stiff: 0.12, drag: 0.1, wind: 1.3, cone: 110, sway: 0.25, grav: 0.8, face: [1, 0, 0], seg: strand(C.red, C.redL, C.redD, 0.014, 3), hit: ['head'] });
    }
    // jade cloak: two panels from the shoulders
    for (const x of [-0.075, 0.075]) {
      out.push({ joint: 'chest', anchor: [x, 0.25, -0.16], rest: [x * 0.8, -1, -0.12], n: 6, len: 0.14, stiff: 0.16, drag: 0.22, wind: 1.1, cone: 80, sway: 0.2,
        seg: cape(Math.sign(x)), hit: ['chest', 'hips', 'thighL', 'thighR', 'kneeL', 'kneeR'] });
    }
    // the qua's red tassel under the head
    for (let k = 0; k < 4; k++) {
      const a = k * 1.5708, ox = Math.cos(a) * 0.016, oy = Math.sin(a) * 0.016;
      out.push({ joint: 'weapon', anchor: [ox, oy, 1.6], rest: [ox * 12, oy * 4 - 1, -0.35], n: 3, len: 0.07, stiff: 0.05 + k * 0.004, drag: 0.12, wind: 0.8, cone: 130, sway: 0.15,
        face: [1, 0, 0], seg: strand(C.red, C.redL, C.redD, 0.014) });
    }
    return out;
  },
};

// 20×20 portrait: the bronze helmet under its red crest, heavy brows, black moustache and beard, the jade-and-bronze
// collar, the bronze breast mirror at the bottom edge
const FACE = [
  '.........RR.........',
  '........RrRR........',
  '........RRrR........',
  '......BBBRRBBB......',
  '.....BBbBBBBbBB.....',
  '....BbBBBBBBBBbB....',
  '...BBLLLLLLLLLLBB...',
  '...BBSSSSSSSSSSBB...',
  '...BSKKKSSSSKKKSB...',
  '...BSSWESSSSEWSSB...',
  '...BSSSSSssSSSSSB...',
  '...bSsSSSssSSSsSb...',
  '...bSsKKKKKKKKsSb...',
  '....sSKKSMMSKKSs....',
  '....sKKKKKKKKKKs....',
  '.....KKKKKKKKKK.....',
  '...JJBBKKKKKKBBJJ...',
  '..JJjJBBBBBBBBJjJJ..',
  '.JJjJJJBYBBYBJJJjJJ.',
  'JJjJJJJJBYYBJJJJJjJJ',
];
const PAL = { R: '#c8301e', r: '#6a1a10', B: '#b07e3c', b: '#6a4820', L: '#e0b060', S: '#c8946a', s: '#946040', K: '#16120e',
  W: '#e4d8c4', E: '#0a0808', M: '#7a3a2a', J: '#2e6a4a', j: '#173826', Y: '#f0c870' };

export const NPC = {
  id: 'kieuconghan', name: { zh: 'Kiều Công Hãn', en: 'Kiều Công Hãn' }, courtesy: { zh: '矯公罕', en: 'Phong Châu' }, seal: '峰州',
  portrait: { face: FACE, pal: PAL }, kit: npcKit(DEF, POLEARM),
};
