// 范白虎 Phạm Bạch Hổ (def-kit model: src/chars/defkit.js header), fine voxels (chars/parts.js FV) on the shared rig, a
// size up (kit scale 1.13, the scale Zhang Fei's moveset bakes into its ground spots). The old warlord of Đằng Châu
// wears the white tiger his mother dreamed of: a WHITE TIGER PELT (white fur, black brush-stroke stripes, the 王 mark on
// its brow) as a hood — the tiger's head over his own, ice-blue eyes, its muzzle jutting over his forehead and its upper
// fangs hanging past his brows, round ears, fluffy cheek ruffs, the hood falling round his ears and nape — and as a
// mantle down his back to the calves (a chain; its hind paws flap at the hem). The forelegs come over his shoulders as
// fur pauldrons on steel and cross his chest to a knot at the sternum, the two paws hanging with ivory claws. A square,
// weathered tan face: deep-set stern eyes, crow's feet, thick grey brows, a broad nose, a drooping grey moustache and
// a full salt-and-pepper beard (its points are chains). Steel-grey lamellar lipped in silver over a dark-blue áo whose
// crossed collar shows at the throat; a black belt studded in silver with a silver TIGER-HEAD plate (ice-blue eyes,
// fangs, 王), the áo's front flap swinging below it (a chain); blue sleeves under steel arm guards, the left forearm
// bare with a silver-lipped leather bracer; baggy blue trousers under steel tassets, off-white leg wraps (xà cạp)
// wound to the knee, steel knee cops, low leather shoes. Weapon: the serpent spear — a dark ironwood shaft ringed in
// silver, white cord at the grips, a silver viper head (scaled wedge skull, ice-blue eyes, fangs) whose open jaws issue
// a broad wavy silver blade with a pale-blue fuller, and a white horsehair tassel under it.
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xb27c56, skinD: 0x8a5a3c, skinH: 0xc8916a, lip: 0x6e3a2c, mouth: 0x241010, eye: 0x0c0a0a, scl: 0xe2dace,
  beard: 0x77746f, beardD: 0x34312e, beardL: 0xbcb8b0,
  fur: 0xd6dbe0, furD: 0xa8b0ba, furL: 0xe4e8ec, stripe: 0x1c1e24, lining: 0x8a7e6c,
  tEye: 0x58b6e6, tNose: 0x7e6266, fang: 0xece4d0, maw: 0x4a2226,
  steel: 0x6c7482, steelD: 0x454b57, steelL: 0x949eae, silver: 0xbcc5d2, silverD: 0x86909e, silverL: 0xdce4ee,
  blue: 0x223258, blueD: 0x151f38, blueL: 0x33477a,
  wrap: 0xcbc5b6, wrapD: 0x989284, leather: 0x3a2a20, leatherL: 0x5a4434, boot: 0x2a201a, bootD: 0x17120e,
  shaft: 0x2a221e, shaftH: 0x3c302a, steelB: 0xd0d8e2, edge: 0xf4f8fc, fuller: 0x7c9cc0, ice: 0x8ad0f4,
};
/** White tiger fur: wavy black stripes across the hang (y) that thin out toward the flanks and break here and there,
 *  sparse light tufts. */
const furP = (x, y, z) => {
  const s = y * 0.62 + Math.sin(x * 0.42 + y * 0.17) * 1.3 + Math.abs(x) * 0.1 + z * 0.15, k = Math.floor(s / 6.2);
  if (md(s, 6.2) < 0.95 - Math.abs(x) * 0.02 && hash01(k, x >> 2, 3) > 0.3) return C.stripe;
  return hash01(x, y, z) < 0.14 ? C.furL : hash01(z, x, y) < 0.08 ? C.furD : C.fur;
};
const beardP = (x, y, z) => (md(x * 3 + y + z, 5) === 0 ? C.beardL : md(x + y * 2 - z, 7) === 0 ? C.beardD : C.beard);
const robe = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.blueL : md(x - y * 2 + z, 9) === 0 ? C.blueD : C.blue);
const silverP = (x, y, z) => (md(x + y * 2 + z, 6) === 0 ? C.silverL : md(x * 3 - y + z, 5) === 0 ? C.silverD : C.silver);

// ---------------------------------------------------------------- body (FV, centred on the joints)
/** A foreleg of the pelt across the chest (sx: from which shoulder), a striped band 5 voxels wide, proud of the plates. */
function foreleg(sx) {
  const ax = sx * 12.5, ay = 16.5, bx = sx * 1.5, by = 7.5, L2 = (bx - ax) ** 2 + (by - ay) ** 2;
  return B([-16, 5, 11], [16, 18, 13], (x, y, z) => {
    const px = x + 0.5, py = y + 0.5, t = Math.max(0, Math.min(1, ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / L2));
    if (Math.hypot(px - ax - t * (bx - ax), py - ay - t * (by - ay)) > 2.6 || z > 12 || Math.abs(px) > 13) return null;
    return furP(x * 2, y * 2 + sx * 5, z);
  });
}

function torso() {
  const T = {};
  // hips: the áo's skirt (the front cut short for the stride; the flap is a chain), black belt with silver studs, the
  // silver tiger-head plate
  T.hips = [
    B([-12, -10, -8], [12, 6, 8], C.blueD),
    B([-14, -15, -10], [14, -1, 10], (x, y, z) => (z > 5 && y < -6 ? null : y === -15 ? C.silverD : robe(x, y, z))),
    B([-15, -1, -11], [15, 5, 11], (x, y, z) => (y === -1 || y === 4 ? C.leatherL : y === 1 && md(x + z, 4) === 0 ? C.silverL : C.leather)),
    B([-6, -3, 11], [6, 6, 13], (x, y, z) => (Math.abs(x + 0.5) > 5 || y === -3 ? C.silverD : silverP(x, y, z))),
    B([-6, 6, 11], [-3, 8, 12], C.silver), B([3, 6, 11], [6, 8, 12], C.silver),                                // ears
    P([-4, 1, 12], [-1, 3, 13], C.tEye), P([1, 1, 12], [4, 3, 13], C.tEye),                                  // eyes
    P([-3, 5, 12], [3, 6, 13], C.stripe), P([-2, 3, 12], [2, 4, 13], C.stripe), P([0, 3, 12], [1, 6, 13], C.stripe),   // 王
    B([-2, -2, 13], [2, 1, 14], C.silverL), P([-1, 0, 13], [1, 1, 14], C.stripe),                            // muzzle, nose
    B([-2, -4, 12], [-1, -3, 13], C.fang), B([1, -4, 12], [2, -3, 13], C.fang),
  ];
  // waist: steel belly lamellar over the áo, a blue band with a silver line under the cuirass
  T.spine = [
    B([-11, -6, -9], [11, 14, 9], C.blueD),
    ...lamellar([-11, -4, -9], [11, 10, 9], { base: C.steel, rowH: 2, pw: 3 }),
    B([-12, 10, -10], [12, 14, 10], (x, y) => (y === 12 ? C.silverD : robe(x, y, 0))),
  ];
  // chest: steel lamellar lipped in silver, the áo's crossed collar at the throat, a fur ruff round the neck (the
  // pelt's neck: the mantle hangs from it), the forelegs crossed to a knot, two paws with ivory claws
  T.chest = [
    B([-15, -4, -11], [15, 18, 11], C.blueD),
    ...lamellar([-15, -3, -11], [15, 5, 11], { base: C.steel, rowH: 2, pw: 3 }),
    ...lamellar([-16, 5, -12], [16, 17, 12], { base: C.steel, rowH: 3, pw: 4, trim: C.silver }),
    B([-7, 13, 9], [7, 19, 13], (x, y) => (Math.abs(x + 0.5) < (y - 11) * 0.9 ? (Math.abs(x + 0.5) > (y - 11) * 0.9 - 1.6 ? C.silverD : C.blue) : null)),   // crossed collar
    B([-9, 16, -9], [9, 22, 9], (x, y, z) => (z > 3 && Math.abs(x + 0.5) < 6 ? null : hash01(x, y, z) < 0.15 && y === 21 ? null : furP(x, y * 2, z))),
    B([-6, 15, -6], [6, 25, 6], -1),                                                                         // neck hole
    foreleg(-1), foreleg(1),
    B([-3, 5, 12], [3, 10, 14], (x, y, z) => (hash01(x, y, z) < 0.2 ? C.furD : C.fur)),                      // the knot
    ...[-1, 1].flatMap((sx) => [mirX(B([1, 0, 12], [5, 6, 13], (x, y, z) => furP(x, y * 2 + 3, z)), sx),
      mirX(B([1, -1, 12], [5, 0, 13], (x) => (md(x, 2) ? C.fang : null)), sx)]),                            // paws, claws
  ];
  T.neck = [B([-5, -2, -5], [5, 6, 5], C.skinD), P([-5, 1, 4], [5, 6, 5], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // blue sleeve under a steel arm guard (the pauldron's fur rides above)
    T['upperArm' + s] = [
      B([-6, -24, -6], [6, 2, 6], robe), B([-7, -20, -7], [7, -9, 7], robe),
      ...lamellar([-6, -16, -6], [6, -4, 6], { base: C.steel, rowH: 2, pw: 3, trim: C.silver }),
    ];
    T['hand' + s] = glove(sx, C.leather, C.leatherL);
    // baggy blue trousers, a steel tasset over the outside of the thigh
    T['thigh' + s] = [
      B([-7, -36, -7], [7, 2, 7], (x, y) => (md(y + (x & 1), 6) === 0 ? C.blueD : C.blue)),
      B([-8, -30, -8], [8, -18, 8], robe),
      ...lamellar([-5, -16, -7], [9, 0, 8], { base: C.steel, rowH: 2, pw: 3, trim: C.silver, jag: true }).map((b) => mirX(b, sx)),
    ];
    // xà cạp: off-white wraps wound up to the knee (diagonal turns), the trousers bagging over them, a steel knee cop
    T['shin' + s] = [
      B([-6, -33, -6], [6, -5, 6], (x, y, z) => (md(y + Math.round(Math.atan2(x + 0.5, z + 0.5) * 1.9), 4) === 0 ? C.wrapD : C.wrap)),
      B([-7, -7, -7], [7, 2, 7], robe),
      B([-3, -8, 5], [3, 1, 8], (x, y) => (y === -8 || Math.abs(x + 0.5) > 2 ? C.silverD : y > -2 ? C.silver : C.steel)),
      B([-6, -34, -6], [6, -32, 6], C.leatherL),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD, { trim: C.leatherL });
  }
  T.foreArmR = bracer(C.blue, [C.steel, C.steelD, C.silver]);
  T.foreArmL = bracer(C.skin, [C.leather, C.bootD, C.silver], false);
  return T;
}

/** The pelt's shoulders: a rounded white fur cap with a ragged fringe over two tiers of steel lamellar. +x outward. */
function pauldron(sx) {
  return [
    ...lamellar([-3, -4, -10], [9, 3, 10], { base: C.steel, rowH: 3, pw: 4, trim: C.silver, jag: true }),
    B([-6, 1, -11], [11, 11, 11], (x, y, z) => (Math.hypot((x + 0.5 - 2) / 8.5, (y + 0.5 - 2) / 8.5, (z + 0.5) / 11) > 1 ? null
      : y < 3 && hash01(x, y, z) < 0.45 ? null : furP(x, y * 2, z))),
  ].map((b) => mirX(b, sx));
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  return [
    // square weathered face, broad jaw, cheekbones, ears under the hood
    B([-7, 1, -6], [8, 12, 6], C.skin), B([-7, -1, -4], [8, 2, 5], C.skin),
    ...symH(4, 7, 5, 7, 5, 6, C.skinH), B([-8, 4, -2], [9, 8, 1], C.skinD), B([-8, 8, -5], [9, 12, 4], C.skinD),
    // deep-set stern eyes, crow's feet, a furrow; thick grey brows drooping at the ends
    ...symH(2, 5, 7, 8, 5, 6, C.scl), ...symH(3, 4, 7, 8, 5, 6, C.eye), ...symH(2, 5, 8, 9, 5, 6, C.skinD),
    ...symH(6, 7, 6, 8, 5, 6, C.skinD), P([0, 8, 5], [1, 11, 6], C.skinD),
    ...symH(1, 5, 9, 11, 5, 7, beardP, false), ...symH(5, 7, 8, 10, 5, 7, C.beardL, false),
    // broad nose, a drooping grey moustache over the mouth, the full salt-and-pepper beard round the jaw, sideburns
    B([-1, 4, 6], [2, 8, 8], C.skin), B([-2, 3, 6], [3, 5, 8], C.skinH), P([-2, 3, 7], [-1, 4, 8], C.mouth), P([2, 3, 7], [3, 4, 8], C.mouth),
    P([-2, 1, 5], [3, 2, 6], C.mouth), P([-2, 2, 5], [3, 3, 6], C.lip),
    B([-4, 2, 6], [5, 4, 8], beardP), ...symH(4, 6, -1, 3, 5, 8, beardP, false),
    B([-8, -7, -4], [9, 4, 8], (x, y, z) => {
      const w = y > -1 ? 8 : 8 + y * 0.6, X = Math.abs(x);
      if (X > w || z > 7 + Math.min(0, y) * 0.25 || (y >= 1 && z > 4 && X < 4)) return null;
      return y < -2 && hash01(x, y, z) < 0.15 ? null : beardP(x, y, z);
    }),
    B([-9, 2, -4], [-7, 9, 3], beardP), B([8, 2, -4], [10, 9, 3], beardP),
    // the tiger hood: crown and nape, side flaps round the ears, round ears with black tips
    B([-9, 11, -8], [10, 19, 7], (x, y, z) => (Math.abs(x) > 7 && y > 16 ? null : furP(x, y, z))),
    B([-7, 19, -7], [8, 21, 6], furP),
    B([-10, 3, -8], [-8, 13, 3], furP), B([9, 3, -8], [11, 13, 3], furP), B([-9, -1, -10], [10, 13, -6], furP),
    B([-7, 19, -3], [-4, 21, 1], (x, y) => (y === 20 ? C.stripe : C.fur)), B([5, 19, -3], [8, 21, 1], (x, y) => (y === 20 ? C.stripe : C.fur)),
    P([-6, 19, 0], [-5, 20, 1], C.tNose), P([6, 19, 0], [7, 20, 1], C.tNose),
    // the tiger's face over his brow: forehead with the 王 mark, ice-blue eyes lined in black, white cheek ruffs, the
    // jutting muzzle and nose, the dark upper jaw and its fangs hanging past his brows
    B([-7, 14, 6], [8, 20, 9], (x, y, z) => (y > 17 && Math.abs(x) > 4 ? null : furP(x, y, z))),
    P([-2, 19, 8], [3, 20, 9], C.stripe), P([-2, 17, 8], [3, 18, 9], C.stripe), P([0, 17, 8], [1, 20, 9], C.stripe),
    ...symH(3, 6, 15, 17, 8, 9, C.tEye), ...symH(4, 5, 15, 17, 8, 9, C.stripe), ...symH(2, 7, 17, 18, 8, 9, C.stripe),
    B([-10, 11, 3], [-7, 17, 7], (x, y, z) => (hash01(x, y, z) < 0.2 ? C.furD : C.furL)), B([8, 11, 3], [11, 17, 7], (x, y, z) => (hash01(x, y, z) < 0.2 ? C.furD : C.furL)),
    B([-4, 12, 8], [5, 15, 11], (x, y, z) => (y === 14 && md(x, 3) === 0 ? C.stripe : C.furL)),
    B([-1, 14, 10], [2, 15, 11], C.tNose), B([-5, 11, 6], [6, 12, 10], C.maw),
    B([-4, 9, 8], [-2, 12, 10], C.fang), B([3, 9, 8], [5, 12, 10], C.fang),
  ];
}

// ---------------------------------------------------------------- serpent spear (weapon joint: shaft +Z, origin = rear grip)
function weaponGeo() {
  // shaft at 0.02 (z −0.86 … 1.52): dark ironwood, white cord crossed at both grips, silver rings, a silver butt spike
  const shaft = vox([
    B([-1, -1, -40], [1, 1, 76], (x, y, z) => ((z > -6 && z < 8) || (z > 18 && z < 30) ? (md(z + (x ^ y), 3) ? C.wrap : C.wrapD)
      : md(z, 9) === 0 ? C.shaftH : C.shaft)),
    ...[-30, -14, 10, 32, 50, 66].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.silverL : C.silverD))),
    B([-2, -2, -40], [2, 2, -37], C.silver), B([-1, -1, -43], [1, 1, -40], C.silverL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // silver viper head at 0.012 (z 1.4 … 1.64): a ringed neck, a wedge skull widest behind the eyes, scale rows, brow
  // ridges, ice-blue eyes, the open mouth (the blade's root) and two fangs
  const scale = (x, y, z) => (md(z + (y > 0 ? x : -x), 3) === 0 ? C.silverD : md(x + z, 5) === 0 ? C.silverL : C.silver);
  const viper = vox([
    B([-3, -3, 116], [3, 3, 122], (x, y, z) => (md(z, 2) ? C.silver : C.silverD)),
    B([-6, -4, 122], [6, 5, 137], (x, y, z) => {
      const w = z < 128 ? 3 + (z - 122) * 0.45 : 5.7 - (z - 128) * 0.42, top = 4 - Math.max(0, z - 130) * 0.4;
      if (Math.abs(x + 0.5) > w || y > top || y < -3) return null;
      return z >= 131 && y >= -1 && y <= 0 ? C.mouth : scale(x, y, z);
    }),
    B([-5, 3, 124], [-2, 5, 130], C.silverL), B([2, 3, 124], [5, 5, 130], C.silverL),
    B([-6, 1, 126], [-4, 3, 129], C.ice), B([4, 1, 126], [6, 3, 129], C.ice),
    B([-3, -1, 133], [-2, 1, 136], C.fang), B([2, -1, 133], [3, 1, 136], C.fang),
  ], 0.012, { jitter: 0.05, ao: 0.35 });
  // the blade at 0.011 (z 1.6 … 2.22), flat in Y: a broad root out of the jaws, the centre line winding 2½ half-waves
  // and settling, a needle point; pale-blue fuller along the wave, bright edges
  const bv = 0.011, z0 = Math.round(1.6 / bv), z1 = Math.round(2.22 / bv), boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0), cx = 3 * Math.sin(u * Math.PI * 2.5) * (1 - 0.5 * u);
    const w = Math.max(0.6, 4.8 * (1 - Math.pow(u, 1.6)) + (u < 0.06 ? 1.6 : 0));
    const a = Math.round(cx - w), b = Math.round(cx + w);
    boxes.push(B([a, -1, z], [Math.max(a + 1, b), 1, z + 1], (x) => (Math.abs(x + 0.5 - cx) < 0.9 && u < 0.85 ? C.fuller : x === a || x === b - 1 ? C.edge : C.steelB)));
  }
  const blade = vox(boxes, bv, { jitter: 0.03, ao: 0.2 });
  return [{ geo: shaft, mat: 'body' }, { geo: viper, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
/** The pelt down his back: striped fur widening to the hips, ragged edges, suede lining; the last segment ends in the two
 *  hind legs (paws at the corners, claws) round a ragged hem. Global row g = y − 12 i keeps the stripes running on. */
function mantleSeg(i, n) {
  const w = 11 + i * 1.2, last = i === n - 1, out = [];
  for (let y = -12; y < 0; y++) for (let x = -Math.ceil(w) - 1; x < Math.ceil(w) + 1; x++) {
    const X = Math.abs(x + 0.5), g = y - i * 12, leg = last && X > w - 4.5;
    if (X > w + (leg ? 1 : 0) - (hash01(x, g, 1) < 0.35 ? 1 : 0)) continue;
    if (last && !leg && y < -6 + Math.round(hash01(x, 0, 2) * 3)) continue;
    const c = leg && y < -9 ? (md(x, 2) && y === -12 ? C.fang : C.furL) : furP(x, g, 0);
    out.push(B([x, y, 0], [x + 1, y + 1, 1], c), B([x, y, -1], [x + 1, y + 1, 0], C.lining));
  }
  return vox(out, FV, { off: [0, 0, -0.5], jitter: 0.03, ao: 0.16 });
}
/** The áo's front flap: blue, a silver-grey band at the hem. */
const flapSeg = (i, n) => vox([B([-7, -10, 0], [7, 0, 1], (x, y) => (i === n - 1 && y < -7 ? (y === -10 ? C.blueD : C.silverD) : robe(x, y - i * 10, 0))),
  B([-6, -10, -1], [6, 0, 0], C.blueD)], FV, { off: [0, 0, -0.5], jitter: 0.03, ao: 0.16 });
/** A beard point: salt-and-pepper, tapering. */
const beardSeg = (i, n) => {
  const w = i === 0 ? 2 : 1;
  return vox([B([-w, -6, -w], [w, 0, w], (x, y, z) => (i === n - 1 && y < -3 && (x || z) ? null : beardP(x, y + i * 6, z)))], HV, { jitter: 0.05, ao: 0.3 });
};
/** White horsehair tassel strand: grey-white columns, frayed ends. */
const strand = (i, n) => {
  const w = i === 0 ? 3 : 2, last = i === n - 1;
  return vox([B([-w, -7, -w], [w, 0, w], (x, y, z) => {
    const k = hash01(x + 9, z + 9, 11);
    if (last && -y > 3 + k * 5) return null;
    if ((x === -w || x === w - 1) && (z === -w || z === w - 1) && i > 0) return null;
    return k < 0.3 ? C.furL : k > 0.8 ? C.furD : C.fur;
  })], 0.014, { jitter: 0.06, ao: 0.25 });
};

export const PHAMBACHHO_DEF = {
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const out = [];
    // the pelt mantle from the ruff to the calves (heavy), the áo's front flap, three beard points
    out.push({ joint: 'chest', anchor: [0, 0.24, -0.15], rest: [0, -1, -0.16], n: 6, len: 0.15, stiff: 0.17, drag: 0.22, wind: 1, cone: 78, sway: 0.16,
      seg: mantleSeg, hit: ['chest', 'hips', 'thighL', 'thighR', 'kneeL', 'kneeR'] });
    out.push({ joint: 'hips', anchor: [0, -0.02, 0.15], rest: [0, -1, 0.12], n: 3, len: 0.125, stiff: 0.12, drag: 0.16, wind: 0.4, face: [0, 0, 1], cone: 66, sway: 0.06,
      seg: flapSeg, hit: [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]] });
    for (const [x, rx] of [[-4, -0.25], [0, 0], [4, 0.25]]) {
      out.push({ joint: 'head', anchor: [x * HV, -6 * HV, 4 * HV], rest: [rx, -1, 0.3], n: 2, len: 0.05, stiff: 0.3, drag: 0.2, wind: 0.3, grav: 1.2, cone: 40,
        face: [0, 0, 1], seg: beardSeg, hit: [['chest', 0.02]] });
    }
    // the spear's white horsehair tassel under the viper head
    for (let k = 0; k < 5; k++) {
      const a = k * 1.2566, ox = Math.cos(a) * 0.016, oy = Math.sin(a) * 0.016;
      out.push({ joint: 'weapon', anchor: [ox, oy, 1.38], rest: [ox * 12, oy * 4 - 1, -0.35], n: 3, len: 0.07, stiff: 0.05 + k * 0.004, drag: 0.12, wind: 0.8, cone: 130,
        sway: 0.15, face: [1, 0, 0], seg: strand });
    }
    return out;
  },
};

// ---------------------------------------------------------------- HUD portrait (20 × 20): the white tiger hood (black
// stripes, the 王 mark, ice-blue eyes, its muzzle and fangs over his brow), a weathered face under thick grey brows,
// the grey beard, the pelt's forelegs crossing steel lamellar over the blue áo
export const FACE = [
  '..KWW..........WWK..',
  '..WWWWWWWWWWWWWWWW..',
  '..WWWKWWKKKKWWKWWW..',
  '.WWKWWWWWKKWWWWWKWW.',
  '.WWWKBBWWKKKWBBKWWW.',
  '.WKWWWwwwnnwwwWWWKW.',
  '.WWWWwwMMMMMMwwWWWW.',
  '.WwWWSFSSSSSSFSWWwW.',
  '.WWsSLLLSSSSLLLSsWW.',
  '.WwsSOESSSSSSEOSswW.',
  '.WWsSSSSSssSSSSSsWW.',
  '.WwGSSSSSssSSSSSGwW.',
  '.WWGGLGGGGGGGGLGGWW.',
  '.WwGGGGGMMMMGGGGGwW.',
  '.WWGGLGGGGGGGGLGGWW.',
  '..WwGGGgGGGGgGGGwW..',
  '..WWWGGGLGGLGGGWWW..',
  'IIWWWIGGGGGGGGIWWWII',
  'IiIWWWIUGGGGUIWWWIiI',
  'IIIIWWWIUUUUIWWWIIII',
];
export const PAL = { W: '#d6dbe0', w: '#a8b0ba', K: '#1c1e24', B: '#58b6e6', n: '#7e6266', M: '#4a2226', F: '#ece4d0',
  S: '#b27c56', s: '#8a5a3c', O: '#e2dace', E: '#0c0a0a', L: '#bcb8b0', G: '#77746f', g: '#34312e', I: '#6c7482', i: '#949eae', U: '#223258' };
