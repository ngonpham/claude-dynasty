// 降將 Hàng Tướng, the Yielded General (def-kit model: src/chars/defkit.js header), fine voxels (src/chars/parts.js FV) on
// the shared rig, broad and heavy (kit scale 1.14), built from the comic's HANG_TUONG token. A former rival's general,
// worn by the road: a broad weathered face, a heavy brow ridge over level, steady eyes (humble, resolute), a broad
// nose, a short black beard trimmed close round the jaw and a moustache; the temples shaved to the scalp (a blue-grey
// stubble over the skin, the ears bare), a single strip of black hair from the brow back to a topknot tied with a
// leather cord. Weathered green-brown lamellar laced in dark leather, its rows lipped in tarnished bronze: a broad
// cuirass, a leather baldric across the chest from the right shoulder to the left hip that carries the HORSE BOW slung on
// his back (a short recurved bow of dark horn-backed wood, bone tips, a leather grip, its string: static, on the
// chest), two-tier shoulders, olive sleeves under lamellar arm guards, leather bracers lipped in bronze; a broad leather
// sash wound twice and knotted at the right front (tails: chains) over a green-brown lamellar skirt and a dark under-
// robe, tassets on the thighs; dark trousers bound with leg wraps into heavy boots. Behind: a green cloak, worn and
// faded at the hem (a chain), hanging behind the bow. Weapon: the trường kích — a long haft wrapped in dark-green cord
// over black (a spiral), iron bands, an iron butt spike; a ringed iron socket; a slender iron spear point; on +Y a
// crescent axe-blade (its convex edge outward, bright, the inner face dark, two piercings) joined to the socket at both
// horns; a short hooked back spike on −Y; a bone-white horsehair tassel under the socket (chains).
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xa2704c, skinD: 0x7a4e34, skinH: 0xb8845e, scalp: 0x8e7464, scalpD: 0x6a5850, lip: 0x5a2a20, mouth: 0x1c0a08, eye: 0x0c0806,
  scl: 0xd6cabc, hair: 0x121010, hairH: 0x2a2624,
  arm: 0x56622e, armD: 0x363e1c, armL: 0x707c44,                         // weathered green-brown lamellar
  brz: 0x86703c, brzD: 0x54461e, brzL: 0xae9454,                         // tarnished bronze lips
  green: 0x34502c, greenD: 0x22361c, greenL: 0x4a6a3a, fade: 0x5e7050,  // the cloak (fade: sun-bleached hem)
  lea: 0x5a3a22, leaD: 0x3a2414, leaL: 0x7a5434,                         // sash, baldric, bracers, cords
  robe: 0x3a2a1c, robeD: 0x24180e, pants: 0x2e281e, pantsD: 0x1c1812, wrap: 0x6a6046, wrapD: 0x4a4230,
  boot: 0x1c1612, bootD: 0x100c0a,
  horn: 0x3a2414, hornL: 0x5a3a20, bone: 0xdcd2b8, string: 0xd8d0bc,
  haft: 0x141614, cordG: 0x22402a, cordL: 0x34583a,
  iron: 0x8a929c, ironD: 0x50565e, ironL: 0xb0b8c2, edge: 0xdce2ea,
  tassel: 0xe6e0d0, tasselD: 0xbab2a0,
};
const robe = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.robeD : C.robe);
/** Dark-leather lacing: a cord down every 6th column of a lamellar volume. */
const laced = (a, b, rowH) => P(a, b, (x, y) => (md(x + 3, 6) === 0 ? (md(y - a[1], rowH) === rowH - 1 ? C.leaL : C.leaD) : null));
const armour = (a, b, o) => [...lamellar(a, b, { base: C.arm, ...o }), laced(a, b, o.rowH)];

// ---------------------------------------------------------------- body (FV, centred on the joints)
/** A strap from (ax, ay) to (bx, by) on the front at depth z, w voxels wide, proud of the plates. */
function strap(ax, ay, bx, by, z, w = 1.7) {
  const L2 = (bx - ax) ** 2 + (by - ay) ** 2;
  return B([Math.min(ax, bx) - 3, Math.min(ay, by) - 3, z], [Math.max(ax, bx) + 3, Math.max(ay, by) + 3, z + 2], (x, y) => {
    const px = x + 0.5, py = y + 0.5, t = Math.max(0, Math.min(1, ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / L2));
    const d = Math.hypot(px - ax - t * (bx - ax), py - ay - t * (by - ay));
    return d > w ? null : d > w - 0.6 ? C.leaD : md(Math.round(t * 40), 9) === 0 ? C.brzL : C.lea;
  });
}
/** The horse bow on his back (chest frame): a short recurved bow from above the right shoulder to the left hip, flat
 *  against the back at z −15 … −13, bone tips, a leather grip, the string. */
function bow() {
  const out = [], A = [-15, 33], Bp = [13, -30], dx = Bp[0] - A[0], dy = Bp[1] - A[1], L = Math.hypot(dx, dy), nx = dy / L, ny = -dx / L;
  for (let i = 0; i <= 90; i++) {
    const u = i / 90, t = u * 2 - 1, at = Math.abs(t);
    const d = 7 * (1 - t * t) - (at > 0.72 ? ((at - 0.72) / 0.28) ** 2 * 4.5 : 0);            // the limbs, the tips curling back
    const x = Math.round(A[0] + dx * u + nx * d), y = Math.round(A[1] + dy * u + ny * d);
    const c = at > 0.86 ? C.bone : at < 0.1 ? (md(i, 2) ? C.leaL : C.lea) : md(i, 7) === 0 ? C.hornL : C.horn;
    out.push(B([x - 1, y - 1, -15], [x + 1, y + 1, -13], c));
    if (at < 0.86 && i % 1 === 0) {                                                             // the string, tip to tip
      const sx = Math.round(A[0] + dx * u - nx * 0.5), sy = Math.round(A[1] + dy * u - ny * 0.5);
      if (at < 0.84) out.push(B([sx, sy, -14], [sx + 1, sy + 1, -13], C.string));
    }
  }
  return out;
}

function torso() {
  const T = {};
  // hips: the dark under-robe, green-brown lamellar skirt round the sides and back (front open), the broad leather sash
  // wound twice, its knot at the right front
  T.hips = [
    B([-13, -10, -9], [13, 6, 9], C.robeD),
    B([-15, -15, -11], [15, -1, 11], (x, y, z) => (z > 6 && y < -6 ? null : robe(x, y, z))),
    ...armour([-16, -18, -12], [16, -2, 6], { rowH: 3, pw: 4, trim: C.brz, jag: true, lipZ: false }),
    B([-16, -3, -12], [16, 6, 12], (x, y, z) => (y === 1 ? C.leaD : md(x - z + y * 2, 9) === 0 ? C.leaL : C.lea)),
    B([-11, -4, 11], [-5, 4, 14], (x, y, z) => (md(x + y + z, 3) === 0 ? C.leaD : C.leaL)),
  ];
  // waist: lamellar over the robe, a leather band under the cuirass
  T.spine = [
    B([-12, -6, -10], [12, 14, 10], C.armD),
    ...armour([-12, -4, -10], [12, 10, 10], { rowH: 2, pw: 3 }),
    B([-13, 10, -11], [13, 14, 11], (x, y) => (y === 10 || y === 13 ? C.leaD : C.lea)),
  ];
  // chest: the broad cuirass in laced rows, a dark leather collar, the baldric from the right shoulder to the left hip,
  // the bow on his back
  T.chest = [
    B([-16, -4, -12], [16, 18, 12], C.armD),
    ...armour([-16, -3, -12], [16, 5, 12], { rowH: 2, pw: 3 }),
    ...armour([-17, 5, -13], [17, 17, 13], { rowH: 3, pw: 4, trim: C.brz }),
    B([-10, 16, -10], [10, 21, 10], (x, y, z) => (y === 20 ? C.leaL : md(x + z, 5) === 0 ? C.leaD : C.lea)),
    strap(-13, 18, 14, -3, 13), strap(13, 16, -10, -3, -15, 1.6),
    ...bow(),
    ...[-1, 1].map((sx) => mirX(B([7, 15, -15], [11, 19, -13], (x, y) => (y === 15 || y === 18 ? C.brzL : C.brz)), sx)),   // cloak rings
    B([-6, 15, -6], [6, 26, 6], -1),                                                          // neck hole
  ];
  T.neck = [B([-6, -2, -6], [6, 6, 6], C.skinD), P([-6, 1, 5], [6, 6, 6], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    T['upperArm' + s] = [B([-6, -24, -6], [7, 2, 7], robe), B([-7, -20, -7], [8, -8, 8], robe),
      ...armour([-7, -17, -7], [8, -5, 8], { rowH: 2, pw: 3, trim: C.brz })];
    T['foreArm' + s] = bracer(C.robe, [C.lea, C.leaD, C.brz]);
    T['hand' + s] = glove(sx, C.leaD, C.lea);
    // dark trousers, green-brown tassets over the outside and front of the thigh
    T['thigh' + s] = [
      B([-8, -36, -8], [8, 2, 8], (x, y) => (md(y + (x & 1), 6) === 0 ? C.pantsD : C.pants)),
      ...armour([-5, -19, -9], [10, 0, 9], { rowH: 3, pw: 4, trim: C.brz, jag: true }).map((b) => mirX(b, sx)),
    ];
    // leg wraps wound from the boot to the knee, the trousers bagging over them, heavy boots
    T['shin' + s] = [
      B([-6, -34, -6], [7, -16, 7], C.boot),
      B([-6, -17, -6], [7, -5, 7], (x, y, z) => (md(y + Math.round(Math.atan2(x + 0.5, z + 0.5) * 1.9), 4) === 0 ? C.wrapD : C.wrap)),
      B([-7, -7, -7], [8, 2, 8], (x, y) => (md(y + (x & 1), 4) === 0 ? C.pantsD : C.pants)),
      B([-7, -18, -7], [8, -16, 8], C.bootD),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD, { trim: C.leaD });
  }
  return T;
}

/** Two-tier shoulders: green-brown rows laced in leather, lipped in bronze, a leather edge on top. +x outward. */
const pauldron = (sx) => [
  ...armour([-3, 1, -11], [10, 8, 11], { rowH: 3, pw: 4, trim: C.brz }),
  ...armour([0, -6, -12], [12, 1, 12], { rowH: 3, pw: 4, trim: C.brz, jag: true }),
  B([-3, 8, -10], [9, 10, 10], (x, y, z) => (md(x + z, 4) === 0 ? C.leaD : C.lea)),
].map((b) => mirX(b, sx));

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const beard = (x, y, z) => (md(x * 3 + y + z, 5) === 0 ? C.hairH : C.hair);
  const scalp = (x, y, z) => (hash01(x, y, z + 31) < 0.35 ? C.scalpD : C.scalp);
  return [
    // broad weathered face and jaw, cheekbones, ears bare under the shaved temples
    B([-8, 2, -6], [9, 13, 6], C.skin), B([-8, -1, -5], [9, 4, 5], C.skin),
    ...symH(4, 7, 5, 7, 5, 6, C.skinH), B([-8, 5, -2], [9, 9, 1], C.skinD),
    B([-9, 4, -2], [-7, 10, 1], C.skin), B([8, 4, -2], [10, 10, 1], C.skin), P([-9, 5, -1], [-8, 9, 0], C.skinD), P([9, 5, -1], [10, 9, 0], C.skinD),
    // the shaved skull: temples, sides and back in stubble, a high crown
    B([-8, 9, -7], [9, 16, 6], (x, y, z) => (z > 4 && y < 12 ? null : scalp(x, y, z))), B([-7, 16, -6], [8, 18, 5], scalp), B([-7, 4, -8], [8, 13, -6], scalp),
    // heavy brow ridge over level, steady eyes, a furrow
    B([-6, 9, 5], [7, 11, 7], C.skinD), ...symH(1, 6, 10, 11, 6, 8, C.hair, false), P([0, 9, 5], [1, 12, 7], C.skinD),
    ...symH(2, 5, 7, 9, 5, 6, C.scl), ...symH(3, 4, 7, 9, 5, 6, C.eye), ...symH(2, 5, 8, 9, 5, 6, C.skinD), ...symH(5, 6, 6, 7, 5, 6, C.skinD),
    // broad nose, a closed resolute mouth
    B([-1, 4, 6], [2, 9, 8], C.skin), B([-2, 3, 6], [3, 5, 8], C.skinH), P([-2, 3, 7], [-1, 4, 8], C.mouth), P([2, 3, 7], [3, 4, 8], C.mouth),
    P([-2, 1, 5], [3, 2, 6], C.mouth), P([-2, 2, 5], [3, 3, 6], C.lip),
    // the short black beard trimmed close round the jaw, the moustache, short sideburns
    B([-4, 2, 6], [5, 3, 8], beard), ...symH(3, 5, 0, 3, 5, 8, beard, false),
    B([-9, -3, -4], [10, 4, 8], (x, y, z) => (z > 7 + Math.min(0, y) * 0.3 || (y >= 0 && z > 4 && Math.abs(x) < 4) || Math.abs(x) > 9 + Math.min(0, y) ? null : beard(x, y, z))),
    B([-9, 3, -3], [-7, 9, 2], beard), B([8, 3, -3], [10, 9, 2], beard),
    // the strip of hair from the brow back to the crown, the topknot tied with a leather cord
    B([-3, 12, -6], [4, 19, 7], (x, y, z) => (z > 5 && y < 13 ? null : md(x + z, 4) === 0 ? C.hairH : C.hair)),
    B([-3, 17, -6], [4, 22, 1], C.hair), B([-2, 22, -5], [3, 25, 0], (x, y) => (y === 24 ? C.hairH : C.hair)),
    P([-3, 19, -6], [4, 21, 1], C.lea), B([-1, 20, 1], [2, 21, 3], C.leaL),
  ];
}

// ---------------------------------------------------------------- trường kích (weapon joint: +Z, origin = rear grip)
function weaponGeo() {
  // haft at 0.02 (z −0.94 … 1.44): black wrapped in a dark-green cord spiral, leather at both grips, iron bands and spike
  const shaft = vox([
    B([-1, -1, -42], [1, 1, 72], (x, y, z) => ((z > -6 && z < 8) || (z > 18 && z < 30) ? (md(z + x + y, 2) ? C.leaD : C.lea)
      : md(z + (x + 1) * 2 + (y + 1), 6) < 3 ? (md(z, 6) === 0 ? C.cordL : C.cordG) : C.haft)),
    ...[-36, -8, 12, 34, 54].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.ironL : C.ironD))),
    B([-2, -2, -44], [2, 2, -41], C.iron), B([-1, -1, -47], [1, 1, -44], C.ironL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // the socket at 0.012 (z 1.42 … 1.62): ringed iron, a collar under the blades
  const socket = vox([
    B([-4, -4, 118], [4, 4, 136], (x, y, z) => {
      const w = z < 130 ? 2.6 + (z - 118) * 0.1 : 3.8;
      if (Math.max(Math.abs(x + 0.5), Math.abs(y + 0.5)) > w) return null;
      return md(z, 5) === 0 ? C.ironL : md(z, 5) === 1 ? C.ironD : C.iron;
    }),
  ], 0.012, { jitter: 0.05, ao: 0.35 });
  // blades at 0.011, flat in X: the slender spear point on the axis (z 1.6 … 2.24); on +y the crescent axe-blade (outer
  // circle minus an inner one shifted toward the shaft: the convex edge outward, both horns meeting the socket), two
  // piercings; a short hooked back spike on −y
  const bv = 0.011, steel = [], cres = [], z0 = Math.round(1.6 / bv), z1 = Math.round(2.24 / bv);
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0), w = Math.max(0.6, 3.4 * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.1 + 0.1)), 0.7) * (1 - 0.5 * u));
    const a = Math.round(-w), b = Math.max(a + 1, Math.round(w));
    steel.push(B([-1, a, z], [1, b, z + 1], (x, y) => (Math.abs(y + 0.5) < 0.9 && u < 0.8 ? C.ironD : y === a || y === b - 1 ? C.edge : C.iron)));
  }
  const cz = Math.round(1.74 / bv), R = 16, oy = 3, iy = -4, r = 15.2;
  for (let dz = -R; dz <= R; dz++) for (let y = 2; y <= oy + R; y++) {
    const o = Math.hypot(y - oy, dz), i = Math.hypot(y - iy, dz);
    if (o > R || i < r) continue;
    if (Math.abs(Math.abs(dz) - 5) < 1.2 && Math.abs(y - 13.5) < 1.1) continue;                     // two piercings
    cres.push(B([-1, y, cz + dz], [1, y + 1, cz + dz + 1], o > R - 1.3 ? C.edge : i < r + 1.2 ? C.ironD : C.iron));
  }
  for (let k = 0; k < 7; k++) steel.push(B([-1, -3 - k, cz - 2 + Math.round(k * k * 0.12)], [1, -2 - k, cz + 2 + Math.round(k * k * 0.12)], k > 4 ? C.edge : C.iron));   // back spike
  cres.push(B([-2, -3, cz - 3], [2, 3, cz + 3], C.ironD));
  return [{ geo: shaft, mat: 'body' }, { geo: socket, mat: 'metal' }, { geo: vox(cres, bv, { jitter: 0.04, ao: 0.2 }), mat: 'blade' },
    { geo: vox(steel, bv, { jitter: 0.03, ao: 0.2 }), mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
/** The green cloak: a darker border, faded toward the hem, notched by wear, dark lining. */
function cloakSeg(i, n) {
  const w = 13 + i, last = i === n - 1, out = [];
  for (let y = -13; y < 0; y++) for (let x = -w; x < w; x++) {
    const X = Math.abs(x + 0.5), g = y - i * 13;
    if (last && y < -10 + (md(x * 7, 11) < 3 ? 3 : 0)) continue;
    const fade = hash01(x, g, 2) < (i / n) * 0.45;
    const c = X > w - 2 ? C.greenD : fade ? C.fade : md(x * 3 + g, 17) === 0 ? C.greenL : C.green;
    out.push(B([x, y, 0], [x + 1, y + 1, 2], c), B([x, y, -1], [x + 1, y + 1, 0], C.greenD));
  }
  return vox(out, FV, { jitter: 0.02, ao: 0.16 });
}
/** The sash tails: leather strips, the ends cut square. */
const sashSeg = (i, n) => vox([B([-2, -7, 0], [2, 0, 1], (x, y) => (i === n - 1 && y < -5 ? C.leaD : x === -2 ? C.leaD : C.lea))],
  FV, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.15 });
/** Bone-white horsehair tassel strand. */
const strand = (i, n) => {
  const w = i === 0 ? 3 : 2, last = i === n - 1;
  return vox([B([-w, -7, -w], [w, 0, w], (x, y, z) => {
    const k = hash01(x + 9, z + 9, 3);
    if (last && -y > 3 + k * 5) return null;
    if ((x === -w || x === w - 1) && (z === -w || z === w - 1) && i > 0) return null;
    return k > 0.75 ? C.tasselD : C.tassel;
  })], 0.014, { jitter: 0.06, ao: 0.25 });
};

export const HANGTUONG_DEF = {
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const out = [];
    // the green cloak from the rings behind the shoulders, hanging behind the bow; the sash tails at the right front
    out.push({ joint: 'chest', anchor: [0, 0.2, -0.21], rest: [0, -1, -0.2], n: 6, len: 0.16, stiff: 0.18, drag: 0.22, wind: 1, cone: 76, sway: 0.15,
      face: [0, 0, -1], seg: cloakSeg, hit: [['chest', 0.03], 'hips', 'thighL', 'thighR', 'kneeL', 'kneeR'] });
    for (const dx of [0, 0.025]) out.push({ joint: 'hips', anchor: [-0.1 + dx, -0.01, 0.16], rest: [-0.1, -1, 0.15], n: 4, len: 0.075, stiff: 0.1, drag: 0.15,
      wind: 0.6, cone: 70, sway: 0.1, face: [0, 0, 1], seg: sashSeg, hit: [['thighR', 0.025]] });
    // the bone-white tassel under the socket
    for (let k = 0; k < 5; k++) {
      const a = k * 1.2566, ox = Math.cos(a) * 0.016, oy = Math.sin(a) * 0.016;
      out.push({ joint: 'weapon', anchor: [ox, oy, 1.4], rest: [ox * 12, oy * 4 - 1, -0.35], n: 3, len: 0.065, stiff: 0.06 + k * 0.004, drag: 0.14, wind: 0.7, cone: 125,
        sway: 0.12, face: [1, 0, 0], seg: strand });
    }
    return out;
  },
};

// ---------------------------------------------------------------- HUD portrait (20 × 20): the topknot over a strip of
// black hair, the shaved temples, a heavy brow over level eyes, the short black beard; green-brown lamellar, the leather
// baldric, the green cloak, the bow's bone tip over his right shoulder
export const FACE = [
  '.........KK.........',
  '........KKKK........',
  '.........LL.........',
  '......ttKKKKtt......',
  '.....tttKKKKttt.....',
  '....ttttKKKKtttt....',
  '....tSSSSSSSSSSt....',
  '...sSdddSSSSdddSs...',
  '...sSWESSSSSSEWSs...',
  '...SSSSSSnnSSSSSS...',
  '...sSSSSnnnnSSSSs...',
  '...KSSKKKKKKKKSSK...',
  '...KKKKKmmmmKKKKK...',
  '....KKKKKKKKKKKK....',
  'b.....KKKKKKKK......',
  'bb...sssssssss......',
  'GbAAAAAAAAAAAAAAAAGG',
  'GGbAAaLAAAAAAaAAAAGG',
  'GgGAaAALAAAAaAAAAgGG',
  'GGGAAAAAALAAAAAAAGGG',
];
export const PAL = { K: '#121010', L: '#5a3a22', t: '#8e7464', S: '#a2704c', s: '#7a4e34', d: '#3a2418', W: '#d6cabc', E: '#0c0806',
  n: '#b8845e', m: '#5a2a20', b: '#dcd2b8', G: '#34502c', g: '#22361c', A: '#56622e', a: '#86703c' };
