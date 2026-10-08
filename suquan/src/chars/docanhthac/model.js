// 杜景碩 Đỗ Cảnh Thạc (def-kit model: src/chars/defkit.js header), fine voxels (chars/parts.js FV) on the shared rig, the
// biggest man on the field (kit scale 1.16). A veteran of the old Ngô army gone to ground in the Đỗ Động marshes: a
// horned helmet — a bowl of soot-black lacquer ribbed in bronze, a bronze brow band studded along its rim, lamellar
// cheek guards and neck flap, two great swept buffalo horns of dark bronze curling out and up from the temples, and a
// heavy violet horsehair plume from the crown socket falling down his back (chains). A broad, hard face: a heavy brow
// ridge over small glaring eyes, an old scar from the right brow through the eye to the cheek (the lid half shut), a
// broad flattened nose, a scowl, a black beard cut square at the jaw with three thick locks (chains). Soot-black
// lacquered lamellar laced in violet cord, bronze studs along every row lip, two bronze breast discs tied by a violet
// cord crossed between them, a high black collar rimmed in bronze; massive layered pauldrons (three tiers, bronze rims,
// a row of studs, an upturned bronze flange); violet sleeves; black bracers banded in bronze; the bronze belt whose
// plaque is a drum face (Đông Sơn: a twelve-rayed sun inside rings), a violet sash knotted at the left hip (tails:
// chains); black lamellar tassets over a violet underskirt and trousers, black greaves with bronze knee cops, heavy
// black boots. Behind: one broad cloak, black with a violet border and lining, notched along its hem by old fights (a
// chain). Weapon: the phương thiên kích — a black-lacquered shaft wound with violet cord, bronze bands and butt, a plain
// ringed bronze socket, a dark steel spear point, the crescent in dark bronze (bright worn edge, a dark inner face, a
// hook at each horn, a pierced row), a short back spike, a violet tassel.
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xa8704c, skinD: 0x7c4c32, skinH: 0xbc845c, scar: 0xd49c88, lip: 0x5a2820, mouth: 0x1a0808, eye: 0x0a0606, scl: 0xd8ccc0,
  beard: 0x121012, beardH: 0x2c262a,
  black: 0x1e1c22, blackD: 0x111014, blackL: 0x34303a,
  bronze: 0x8a5a2a, bronzeD: 0x4e3016, bronzeL: 0xc08848,
  violet: 0x5c2484, violetD: 0x34124e, violetL: 0x8e48c0,
  leather: 0x241a18, boot: 0x141216, bootD: 0x0b0a0c,
  shaft: 0x141218, shaftH: 0x221e28, steel: 0x9aa2ae, steelD: 0x5a626e, edge: 0xdce2ea,
  cres: 0x6a4420, cresD: 0x3a2410, cresE: 0xd0a060,
};
/** Violet lacing: on a lamellar volume a cord runs down every 6th column through the tucked row, crossing the lips. */
const laced = (a, b, rowH) => P(a, b, (x, y) => (md(x, 6) === 0 && md(y - a[1], rowH) === rowH - 2 ? C.violetL : md(x, 6) === 0 ? C.violet : null));
/** Bronze studs along the lip rows of a lamellar volume (every 4th column, offset). */
const studs = (a, b, rowH) => P([a[0] - 1, a[1], a[2] - 1], [b[0] + 1, b[1], b[2] + 1], (x, y, z) => (md(y - a[1], rowH) === 0 && md(x + z + 2, 4) === 0 ? C.bronzeL : null));
const armour = (a, b, o) => [...lamellar(a, b, { base: C.black, ...o }), laced(a, b, o.rowH), studs(a, b, o.rowH)];
const robe = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.violetL : md(x - y * 2 + z, 9) === 0 ? C.violetD : C.violet);

// ---------------------------------------------------------------- body (FV, centred on the joints)
/** The drum-face plaque at depth z: bronze rings round a twelve-rayed sun, centred at (0, cy), radius 6. */
function drumFace(cy, z) {
  return B([-6, cy - 6, z], [6, cy + 6, z + 2], (x, y) => {
    const dx = x + 0.5, dy = y + 0.5 - cy, r = Math.hypot(dx, dy), a = Math.atan2(dx, dy);
    if (r > 6.2) return null;
    if (r > 5.3 || Math.abs(r - 3.6) < 0.45) return C.bronzeD;
    if (r < 3.2 && (r < 1.2 || Math.abs(md(a * 12 / (2 * Math.PI) + 0.5, 1) - 0.5) < 0.12 * (3.2 - r))) return C.bronzeL;
    return C.bronze;
  });
}

function torso() {
  const T = {};
  // hips: violet underskirt, black lamellar skirt round the sides and back (the front open for the stride), the bronze
  // belt with its drum-face plaque, the violet sash knot at the left hip
  T.hips = [
    B([-12, -10, -8], [12, 6, 8], C.violetD),
    B([-14, -14, -10], [14, -1, 10], (x, y, z) => (z > 6 && y < -6 ? null : robe(x, y, z))),
    ...armour([-15, -17, -11], [15, -2, 5], { rowH: 3, pw: 4, trim: C.bronze, jag: true, lipZ: false }),
    B([-15, -2, -11], [15, 5, 11], (x, y, z) => (y === -2 || y === 4 ? C.bronzeD : y === 1 && md(x + z, 5) === 0 ? C.bronzeL : C.bronze)),
    drumFace(1, 11),
    B([8, -4, 9], [13, 3, 12], C.violet), P([9, -1, 11], [12, 0, 12], C.violetL),
  ];
  // waist: laced lamellar, a violet band under the cuirass
  T.spine = [
    B([-11, -6, -9], [11, 14, 9], C.blackD),
    ...armour([-11, -4, -9], [11, 10, 9], { rowH: 2, pw: 3 }),
    B([-12, 10, -10], [12, 14, 10], (x, y) => (y === 10 ? C.violetD : md(x, 5) === 0 ? C.violetL : C.violet)),
  ];
  // chest: the cuirass in laced, studded rows, two bronze breast discs tied by a crossed violet cord, the high collar
  const disc = (cx) => B([cx - 4, 5, 12], [cx + 4, 13, 14], (x, y) => {
    const r = Math.hypot(x + 0.5 - cx, y + 0.5 - 9);
    return r > 4 ? null : r > 3.2 ? C.bronzeD : r < 1 ? C.bronzeL : C.bronze;
  });
  T.chest = [
    B([-15, -4, -11], [15, 18, 11], C.blackD),
    ...armour([-15, -3, -11], [15, 5, 11], { rowH: 2, pw: 3 }),
    ...armour([-16, 5, -12], [16, 17, 12], { rowH: 3, pw: 4, trim: C.bronze }),
    disc(-7), disc(7),
    B([-4, 6, 12], [4, 12, 13], (x, y) => (Math.abs(Math.abs(x + 0.5) - (y - 5.5) * 0.6) < 0.8 ? C.violetL : null)),
    B([-9, 16, -9], [9, 22, 9], (x, y) => (y === 21 ? C.bronzeL : y === 16 ? C.bronzeD : md(x, 4) === 0 ? C.blackL : C.black)),
    B([-6, 15, -6], [6, 26, 6], -1),                                                          // neck hole
    ...[-1, 1].map((sx) => mirX(B([8, 14, -14], [12, 18, -12], C.bronze), sx)),               // cloak rings
  ];
  T.neck = [B([-5, -2, -5], [5, 6, 5], C.skinD), P([-5, 1, 4], [5, 6, 5], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    T['upperArm' + s] = [B([-6, -24, -6], [6, 2, 6], robe), B([-7, -20, -7], [7, -8, 7], robe),
      ...armour([-6, -17, -6], [6, -5, 6], { rowH: 2, pw: 3, trim: C.bronze })];
    T['foreArm' + s] = bracer(C.violetD, [C.black, C.blackD, C.bronze]);
    T['hand' + s] = glove(sx, C.leather, C.bronzeD);
    // violet trousers under black tassets (bronze lips, studs, jagged hem) over the outside and front of the thigh
    T['thigh' + s] = [
      B([-7, -36, -7], [7, 2, 7], robe), B([-8, -31, -8], [8, -20, 8], robe),
      ...[...lamellar([-5, -19, -8], [10, 0, 9], { base: C.black, rowH: 2, pw: 3, trim: C.bronze, jag: true }),
        laced([-5, -19, -8], [10, 0, 9], 2)].map((b) => mirX(b, sx)),
    ];
    // boot shaft, trousers tucked under a violet garter, a black greave with a bronze ridge, a bronze knee cop
    T['shin' + s] = [
      B([-6, -34, -6], [6, 0, 6], C.boot),
      B([-7, -7, -7], [7, 2, 7], robe), B([-7, -9, -7], [7, -7, 7], C.violetD),
      B([-6, -31, 2], [6, -10, 8], (x, y) => (Math.abs(x + 0.5) < 1 ? C.bronze : y === -11 || Math.abs(x + 0.5) > 5 ? C.blackD : md(y, 4) === 0 ? C.blackL : C.black)),
      B([-3, -9, 6], [3, 1, 9], (x, y) => (y === -9 ? C.bronzeD : y === -4 && Math.abs(x + 0.5) < 1 ? C.bronzeL : C.bronze)),
      B([-7, -34, -7], [7, -32, 7], C.bootD),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD, { trim: C.bronze });
  }
  return T;
}

/** Massive shoulders: three tiers of black lamellar laced violet, bronze rims and studs, an upturned bronze flange on
 *  top. +x outward. */
function pauldron(sx) {
  return [
    ...armour([-5, 6, -10], [8, 13, 10], { rowH: 3, pw: 4, trim: C.bronze }),
    ...armour([-2, -1, -12], [11, 6, 12], { rowH: 3, pw: 4, trim: C.bronze }),
    ...armour([1, -7, -12], [13, -1, 12], { rowH: 3, pw: 4, trim: C.bronze, jag: true }),
    B([6, 12, -10], [11, 14, 10], C.bronze), B([9, 14, -10], [12, 16, 10], C.bronzeL),
  ].map((b) => mirX(b, sx));
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const helm = (x, y, z) => (md(Math.round(Math.atan2(x, z) * 4), 3) === 0 ? C.bronze : y === 12 ? C.blackD : md(x + y, 5) === 0 ? C.blackL : C.black);
  const flap = (x, y, z) => (md(y, 3) === 0 ? C.bronzeD : md(x + z + (Math.floor(y / 3) & 1) * 2, 4) === 0 ? C.blackD : C.black);
  const beardP = (x, y, z) => (md(x * 3 + y + z, 5) === 0 ? C.beardH : C.beard);
  const horn = (sx) => Array.from({ length: 11 }, (_, i) => {
    const x = 9 + i, y = 14 + Math.round(i * i * 0.1), z = -1 - Math.round(i * 0.3), w = i < 4 ? 2 : i < 8 ? 1 : 0;
    return mirX(B([x, y - w, z - w], [x + 1, y + w + 1, z + w + 1], i > 8 ? C.bronzeL : i > 5 ? C.bronze : C.bronzeD), sx, 1);
  });
  return [
    // a broad hard face and square jaw, cheekbones, ears
    B([-7, 2, -6], [8, 13, 6], C.skin), B([-8, -1, -5], [9, 5, 5], C.skin),
    ...symH(4, 7, 5, 7, 5, 6, C.skinH), B([-8, 5, -2], [9, 9, 1], C.skinD),
    // heavy brow ridge over small glaring eyes; the scar through the right brow, eye and cheek (that lid half shut)
    B([-6, 9, 5], [7, 11, 7], C.skinD), ...symH(1, 6, 10, 11, 6, 8, C.beard, false), P([0, 9, 5], [1, 12, 7], C.skinD),
    ...symH(2, 5, 7, 9, 5, 6, C.scl), ...symH(3, 4, 7, 9, 5, 6, C.eye), ...symH(2, 5, 8, 9, 5, 6, C.skinD),
    P([-5, 8, 5], [-1, 9, 6], C.skinD), P([-4, 7, 5], [-3, 8, 6], C.eye),
    ...[[-6, 12], [-5, 11], [-4, 10], [-4, 9], [-3, 8], [-3, 7], [-3, 6], [-2, 5], [-2, 4]].map(([x, y]) => P([x, y, 5], [x + 1, y + 1, 8], C.scar)),
    // broad flattened nose, a scowl
    B([-2, 4, 6], [3, 9, 8], C.skin), B([-3, 3, 6], [4, 5, 8], C.skinH), P([-2, 3, 7], [-1, 4, 8], C.mouth), P([2, 3, 7], [3, 4, 8], C.mouth),
    P([-3, 1, 5], [4, 2, 6], C.mouth), P([-3, 2, 5], [-2, 3, 6], C.lip), P([3, 2, 5], [4, 3, 6], C.lip),
    // black beard cut square at the jaw (the three locks are chains), moustache, sideburns
    B([-4, 2, 6], [5, 3, 8], beardP), ...symH(4, 6, 0, 3, 5, 8, beardP, false),
    B([-9, -6, -4], [10, 4, 8], (x, y, z) => (z > 7 + Math.min(0, y) * 0.2 || (y >= 1 && z > 4 && Math.abs(x) < 4) ? null : beardP(x, y, z))),
    B([-9, 3, -4], [-7, 10, 3], beardP), B([8, 3, -4], [10, 10, 3], beardP),
    // the helmet: ribbed black bowl and dome, bronze crown socket, bronze brow band studded on its rim, cheek guards and
    // neck flap, the buffalo horns
    B([-9, 12, -8], [10, 19, 8], helm), B([-7, 19, -6], [8, 21, 6], helm), B([-4, 21, -3], [5, 22, 3], C.blackL),
    B([-2, 22, -2], [3, 24, 2], C.bronze), B([-1, 24, -1], [2, 25, 1], C.bronzeL),
    B([-9, 11, 6], [10, 13, 9], (x, y) => (y === 12 && md(x, 3) === 0 ? C.bronzeL : y === 11 ? C.bronzeD : C.bronze)),
    B([-11, 2, -8], [-9, 13, 5], flap), B([10, 2, -8], [12, 13, 5], flap), B([-9, 0, -10], [10, 13, -7], flap),
    ...horn(-1), ...horn(1),
  ];
}

// ---------------------------------------------------------------- phương thiên kích (weapon joint: +Z, origin = rear grip)
function weaponGeo() {
  // shaft at 0.02 (z −0.94 … 1.44): black lacquer wound with violet cord (a spiral), black cord at both grips, bronze
  // bands, a bronze butt spike
  const shaft = vox([
    B([-1, -1, -42], [1, 1, 72], (x, y, z) => ((z > -6 && z < 8) || (z > 18 && z < 30) ? (md(z + x + y, 2) ? C.blackD : C.leather)
      : md(z + (x + 1) * 2 + (y + 1), 9) < 2 ? C.violet : ((z >> 1) & 1) ? C.shaftH : C.shaft)),
    ...[-36, -8, 12, 34, 54].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.bronzeL : C.bronzeD))),
    B([-2, -2, -44], [2, 2, -41], C.bronze), B([-1, -1, -47], [1, 1, -44], C.bronzeL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // the socket at 0.012 (z 1.42 … 1.62): a plain bronze sleeve in raised rings, swelling to a collar under the blades
  const socket = vox([
    B([-4, -4, 118], [4, 4, 136], (x, y, z) => {
      const w = z < 130 ? 2.6 + (z - 118) * 0.1 : 3.8;
      if (Math.max(Math.abs(x + 0.5), Math.abs(y + 0.5)) > w) return null;
      return md(z, 4) === 0 ? C.bronzeL : md(z, 4) === 1 ? C.bronzeD : C.bronze;
    }),
  ], 0.012, { jitter: 0.05, ao: 0.35 });
  // blades at 0.011, flat in X: the spear point on the axis (z 1.6 … 2.24), the crescent on +y (an outer circle touching
  // the shaft minus an offset inner one, a hook curling back at each horn, a pierced row), a short back spike on −y
  const bv = 0.011, steel = [], cres = [], z0 = Math.round(1.6 / bv), z1 = Math.round(2.24 / bv);
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0), w = Math.max(0.6, 4.2 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.2 + 0.08)), 0.7) * (1 - 0.6 * u));
    const a = Math.round(-w), b = Math.max(a + 1, Math.round(w));
    steel.push(B([-1, a, z], [1, b, z + 1], (x, y) => (Math.abs(y + 0.5) < 0.9 && u < 0.8 ? C.steelD : y === a || y === b - 1 ? C.edge : C.steel)));
  }
  const cz = Math.round(1.76 / bv), R = 15, cy = R + 1, d = 0.58 * R, r = 0.86 * R;
  for (let dz = -R; dz <= R; dz++) for (let y = 2; y <= cy + R; y++) {
    const o = Math.hypot(y - cy, dz), i = Math.hypot(y - cy - d, dz);
    if (o > R || i < r) continue;
    if (Math.abs(dz) % 6 === 3 && Math.abs(o - (R + r - d) / 2 - 1) < 0.9) continue;                // the pierced row
    cres.push(B([-1, y, cz + dz], [1, y + 1, cz + dz + 1], i < r + 1.3 ? C.cresE : o > R - 1 ? C.cresD : C.cres));
  }
  for (const s of [-1, 1]) for (let k = 0; k < 4; k++) {                                              // hooks at the horns
    const z = cz + s * (R - 2 + k), y = cy + 8 + k * 2 - (k > 2 ? 3 : 0);
    cres.push(B([-1, y, z], [1, y + 2, z + 1], k > 1 ? C.cresE : C.cres));
  }
  for (let k = 0; k < 6; k++) steel.push(B([-1, -3 - k, cz - 3 + k], [1, -2 - k, cz + k], k > 3 ? C.edge : C.steel));   // back spike
  cres.push(B([-2, -3, cz - 3], [2, 3, cz + 3], C.bronzeD), B([-2, -1, cz - 1], [2, 1, cz + 1], C.violetL));            // boss + gem
  return [{ geo: shaft, mat: 'body' }, { geo: socket, mat: 'metal' }, { geo: vox(cres, bv, { jitter: 0.04, ao: 0.2 }), mat: 'metal' },
    { geo: vox(steel, bv, { jitter: 0.03, ao: 0.2 }), mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
/** The cloak: black, a violet border down both edges and along the hem, violet lining, the hem notched by old cuts. */
function cloakSeg(i, n) {
  const w = 15 + i, last = i === n - 1, out = [];
  for (let y = -13; y < 0; y++) for (let x = -w; x < w; x++) {
    const X = Math.abs(x + 0.5);
    if (last && y < -10 + (md(x + 3, 9) < 2 ? 4 : 0)) continue;
    const c = X > w - 4 || (last && y < -7) ? (X > w - 1.5 ? C.violetL : C.violet) : md(x * 3 + y + i * 13, 17) === 0 ? C.blackL : C.black;
    out.push(B([x, y, 0], [x + 1, y + 1, 2], c), B([x, y, -1], [x + 1, y + 1, 0], C.violetD));
  }
  return vox(out, FV, { jitter: 0.02, ao: 0.16 });
}
/** The violet horsehair plume: a thick tail of strands tapering to a frayed end. */
const plumeSeg = (i, n) => {
  const w = i < 2 ? 3 : 2, last = i === n - 1;
  return vox([B([-w, -8, -w], [w, 0, w], (x, y, z) => {
    const k = hash01(x + 5, z + 5, 13);
    if (last && -y > 3 + k * 5) return null;
    if ((x === -w || x === w - 1) && (z === -w || z === w - 1)) return null;
    return k < 0.45 ? C.violetL : k > 0.85 ? C.violetD : C.violet;
  })], FV, { jitter: 0.05, ao: 0.22 });
};
const lockSeg = (i, n) => {
  const w = i === 0 ? 2 : 1;
  return vox([B([-w, -6, -w], [w, 0, w], (x, y, z) => (i === n - 1 && y < -3 && (x || z) ? null : md(x + y + z, 4) === 0 ? C.beardH : C.beard))], HV, { jitter: 0.05, ao: 0.3 });
};
const sashSeg = (i, n) => vox([B([-2, -7, 0], [2, 0, 1], (x, y) => (i === n - 1 && y < -5 && x !== -1 ? null : x === -2 ? C.violetD : C.violet))],
  FV, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.15 });
const strand = (i, n) => {                                  // the halberd's violet tassel
  const w = i === 0 ? 3 : 2, last = i === n - 1;
  return vox([B([-w, -7, -w], [w, 0, w], (x, y, z) => {
    const k = hash01(x + 9, z + 9, 7);
    if (last && -y > 3 + k * 5) return null;
    if ((x === -w || x === w - 1) && (z === -w || z === w - 1) && i > 0) return null;
    return k < 0.3 ? C.violetL : k > 0.8 ? C.violetD : C.violet;
  })], 0.014, { jitter: 0.06, ao: 0.25 });
};

export const DOCANHTHAC_DEF = {
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const out = [];
    // the cloak from the rings behind the shoulders (one broad, heavy sheet), the sash tails at the left hip
    out.push({ joint: 'chest', anchor: [0, 0.2, -0.17], rest: [0, -1, -0.18], n: 7, len: 0.165, stiff: 0.18, drag: 0.22, wind: 1, cone: 76, sway: 0.16,
      face: [0, 0, -1], seg: cloakSeg, hit: ['chest', 'hips', 'thighL', 'thighR', 'kneeL', 'kneeR'] });
    for (const dz of [0, 0.02]) out.push({ joint: 'hips', anchor: [0.13, -0.02, 0.1 + dz], rest: [0.25, -1, 0.1], n: 4, len: 0.075, stiff: 0.1, drag: 0.15, wind: 0.7,
      cone: 75, sway: 0.12, face: [0, 0, 1], seg: sashSeg, hit: [['thighL', 0.025]] });
    // the violet plume from the crown socket down his back, three beard locks
    for (const sx of [-1, 0, 1]) out.push({ joint: 'head', anchor: [sx * 1.2 * HV, 24 * HV, -0.5 * HV], rest: [sx * 0.15, -0.35, -1], n: 6, len: 0.07,
      stiff: 0.1, drag: 0.12, wind: 1.3, cone: 100, sway: 0.25, seg: plumeSeg, hit: ['head', ['chest', 0.03]] });
    for (const [x, rx] of [[-4, -0.2], [0, 0], [4, 0.2]]) out.push({ joint: 'head', anchor: [x * HV, -5 * HV, 4 * HV], rest: [rx, -1, 0.25], n: 2, len: 0.05,
      stiff: 0.32, drag: 0.2, wind: 0.25, grav: 1.3, cone: 38, face: [0, 0, 1], seg: lockSeg, hit: [['chest', 0.02]] });
    // the halberd's violet tassel under the socket
    for (let k = 0; k < 5; k++) {
      const a = k * 1.2566, ox = Math.cos(a) * 0.016, oy = Math.sin(a) * 0.016;
      out.push({ joint: 'weapon', anchor: [ox, oy, 1.4], rest: [ox * 12, oy * 4 - 1, -0.35], n: 3, len: 0.065, stiff: 0.06 + k * 0.004, drag: 0.14, wind: 0.7, cone: 125,
        sway: 0.12, face: [1, 0, 0], seg: strand });
    }
    return out;
  },
};

// ---------------------------------------------------------------- HUD portrait (20 × 20): the horned black-and-bronze
// helmet with its violet plume, a heavy brow, the scar through the right eye, the square black beard, black lamellar
// laced violet with the bronze collar
export const FACE = [
  'hh......VVVV......hh',
  'hhh....VVvvVV....hhh',
  '.hhh..KKAAAAKK..hhh.',
  '..hhhKKKKAAKKKKhhh..',
  '...hhAKKKAAKKKAhh...',
  '....AAAAAAAAAAAA....',
  '...KKSSSSSSSSSSKK...',
  '...KKHHHSSSSHHHKK...',
  '...KSxESSSSSSEWSK...',
  '...KSSxSSssSSSSSK...',
  '...KSSSxSssSSSSSK...',
  '...KHHHHHHHHHHHHK...',
  '...KHHHMMMMMMHHHK...',
  '...KHHHHHHHHHHHHK...',
  '....HHHHHHHHHHHH....',
  '....HHH.HHHH.HHH....',
  'KKKKAAAAAAAAAAAAKKKK',
  'KkKvKKKKAAKKKKKvKkKK',
  'KKvKKAAKKKKKKAAKvKKK',
  'KvKKAAAAKKKKAAAAKvKK',
];
export const PAL = { h: '#8a5a2a', V: '#8e48c0', v: '#5c2484', K: '#1e1c22', k: '#34303a', A: '#a8743a', S: '#a8704c', s: '#7c4c32',
  H: '#121012', x: '#d49c88', E: '#0a0606', W: '#d8ccc0', M: '#5a2820' };
