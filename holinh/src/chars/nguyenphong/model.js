// Nguyên Phong 元風 on Huang Zhong's bow kit (kit.js): his own def-shaped body (fine voxels, src/chars/parts.js FV,
// built with hero/model.js buildDef) on the shared rig in bow mode (src/hero/rig.js header: the weapon joint is the bow —
// origin = the grip in the left hand, +Z = the arrow line, limbs along local ±Y). The orphan hunter of the mountains
// (comic token NGUYEN_PHONG), lean and young: a sun-browned face, bright eyes under level brows, a crooked half smile;
// tousled black hair half tied up — a small knot at the crown bound with a leather thong, ragged bangs over the brow,
// loose locks at the nape and the temples (chains). Layered cloth in moss green and earth brown: a brown under-tunic,
// a moss-green over-tunic open at the sides, a green scarf wound round the neck as a loose hood fold, its tail behind
// (a chain); a leather strap from the right shoulder to the left hip carrying the quiver on his back (bark-brown, rawhide
// bands, grey-brown fletchings over the right shoulder); a rope-and-leather belt with two pouches, a short hunting knife
// in a leather sheath on the right hip. Leather bracers on both forearms, an archer's glove on the drawing hand; brown
// trousers in moss-and-brown wrapped leggings; bare feet in straw sandals. Weapon: a plain hunting bow of dark wood, a
// leather-wrapped grip, horn nock caps, nothing else. Secondary (render-only): skirt panels, scarf tail, hair locks, plus
// the bowstring (through the right hand while it holds the nock) and the nocked arrow, flaming through fire shots, as
// Huang Zhong's (src/chars/huangzhong/model.js createHzSecondary).
import * as THREE from 'three';
import { vox, B, P, md, lamellar, buildDef } from '../../../../src/hero/model.js';
import { chainSet } from '../../../../src/hero/secondary.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, hand, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xc8946c, skinD: 0x9c6a48, skinH: 0xdcaa82, lip: 0x9a5444, eye: 0x120a08, iris: 0x3a2412, scl: 0xefe4d2,
  hair: 0x110d0b, hairH: 0x2e2420,
  moss: 0x587a36, mossD: 0x48662c, mossL: 0x668a40,                    // moss-green over-tunic, scarf
  earth: 0x6c4a2e, earthD: 0x5a3c24, earthL: 0x7a5636,                 // earth-brown under-tunic, trousers
  hide: 0x5c3c24, hideD: 0x3a2414, hideL: 0x7e5634,                    // leather
  wrap: 0x7a7050, wrapD: 0x575036,
  straw: 0xc8a85e, strawD: 0x94783c,
  bow: 0x3a2616, bowH: 0x543820, horn: 0xdacdb0, grip: 0x6a4428,
  bark: 0x4a3420, rawhide: 0xc8b48a, feather: 0xb0a690, featherD: 0x6a6050,
  bone: 0xd8ccae, steel: 0xc6ced8,
};
const cloth = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.mossL : md(x - y * 2 + z, 9) === 0 ? C.mossD : C.moss);
const earth = (x, y, z) => (md(x * 3 - y + z * 2, 10) === 0 ? C.earthL : md(x + y * 2 - z, 8) === 0 ? C.earthD : C.earth);
/** The quiver strap's line across the chest: from the right shoulder down to the left hip (x at chest height y). */
const strap = (y) => -8 + (18 - y) * 0.95;

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: the brown under-tunic at the sides (panels front and back: chains), a rope belt over a leather one, two
  // pouches at the front left, the knife sheath on the right hip (horn handle up)
  T.hips = [
    B([-11, -10, -8], [11, 6, 8], C.earthD),
    B([-13, -15, -9], [13, -1, 9], (x, y, z) => (Math.abs(z) > 4 && y < -5 ? null : y === -15 ? C.earthD : earth(x, y, z))),
    B([-13, -1, -9], [13, 2, 9], (x, y, z) => (md(x + z, 5) === 0 ? C.hideL : C.hide)),
    B([-14, 2, -10], [14, 4, 10], (x, y, z) => (md(x + z + y, 2) ? C.straw : C.strawD)),
    B([5, -6, 9], [10, 0, 12], (x, y) => (y === -1 ? C.hideD : C.hideL)), P([7, -3, 11], [8, -1, 12], C.bone),
    B([10, -5, 6], [13, 0, 10], C.hide),
    B([-16, -18, -1], [-13, 1, 4], (x, y) => (y === -18 ? C.hideD : y > -2 ? C.hideD : md(y, 6) === 0 ? C.hideL : C.hide)),
    B([-16, 1, 0], [-13, 9, 3], (x, y) => (y === 1 ? C.steel : md(y, 2) ? C.bone : C.hideD)),
  ];
  // waist: the moss over-tunic belted over the brown under-tunic
  T.spine = [
    B([-10, -6, -8], [10, 14, 8], earth),
    B([-10, -6, -8], [10, 14, 8], (x, y, z) => (Math.abs(x) > 7 && Math.abs(z) < 6 ? null : cloth(x, y, z))),
  ];
  // chest: the moss over-tunic (its front edges crossing, brown under-tunic showing at the open sides), the leather
  // quiver strap from the right shoulder to the left hip (a horn toggle where it crosses the breast)
  T.chest = [
    B([-14, -4, -10], [14, 18, 10], earth),
    B([-14, -4, -10], [14, 17, 10], (x, y, z) => (Math.abs(x) > 11 && Math.abs(z) < 7 && y < 12 ? null
      : z > 7 && Math.abs(x + (y - 14) * 0.7 - 1) < 1.1 ? C.mossD : cloth(x, y, z))),
    B([-15, -5, -11], [15, 20, 11], (x, y) => (Math.abs(x - strap(y)) < 2.6 ? (Math.abs(x - strap(y)) > 1.6 ? C.hideD : C.hideL) : null)),
    B([-3, 9, 11], [1, 13, 13], (x, y) => (y === 9 || y === 12 ? C.hideD : C.bone)),
    B([-5, 15, -5], [5, 25, 5], -1),
  ];
  // the green scarf wound round the neck, loose folds over the collarbones and a hood fold behind
  T.neck = [
    B([-4, -2, -4], [4, 6, 4], C.skinD), P([-4, 1, 3], [4, 6, 4], C.skin),
    B([-8, -6, -8], [8, 1, 7], (x, y, z) => {
      if (Math.abs(x) < 4 && Math.abs(z) < 4) return null;
      return md(x + z * 2 + y * 3, 5) === 0 ? C.mossD : md(x - z + y, 7) === 0 ? C.mossL : C.moss;
    }),
    B([-7, -4, -10], [7, 4, -6], (x, y, z) => (md(x + y, 4) === 0 ? C.mossD : C.moss)),
  ];
  return T;
}

function limbs(T) {
  for (const [s] of [['R', -1], ['L', 1]]) {
    // brown sleeve to the elbow, rolled into a moss cuff
    T['upperArm' + s] = [
      B([-5, -24, -5], [5, 2, 5], earth),
      B([-6, -24, -6], [6, -20, 6], (x, y, z) => (Math.abs(x) + Math.abs(z) > 9 ? null : md(x + z + y, 3) === 0 ? C.mossD : C.moss)),
      B([-6, -2, -6], [6, 3, 6], (x, y, z) => (Math.abs(x) + Math.abs(z) > 9 ? null : cloth(x, y, z))),
    ];
    T['foreArm' + s] = bracer(C.skin, [C.hide, C.hideD, C.hideL], s === 'L');
    // brown trousers
    T['thigh' + s] = [
      B([-6, -36, -6], [6, 2, 6], (x, y) => (md(y + (x & 1), 6) === 0 ? C.earthD : C.earth)),
      B([-7, -30, -7], [7, -20, 7], (x, y) => (md(y - x, 5) === 0 ? C.earthD : C.earth)),
    ];
    // wrapped leggings knee to ankle, moss and brown bands on the diagonal, a cord tie under the knee
    T['shin' + s] = [
      B([-5, -32, -5], [5, 0, 5], (x, y, z) => (md(y + ((x + z) >> 1), 5) < 2 ? C.wrapD : md(y + ((x - z) >> 1), 7) === 0 ? C.mossD : C.wrap)),
      B([-6, -4, -6], [6, 2, 6], C.earth), B([-6, -6, -6], [6, -5, 6], C.straw),
      B([-4, -35, -4], [4, -32, 4], C.skin),
    ];
    // bare foot in a straw sandal: the sole, a strap over the instep, a toe loop, the ankle tie
    T['foot' + s] = [
      ...boot(C.skin, C.skinD, C.straw),
      P([-7, -1, 2], [8, 2, 6], C.strawD), P([-7, -5, 10], [8, -3, 12], C.straw), B([-5, -1, -5], [6, 1, -3], C.strawD),
    ];
  }
  T.handL = hand(1, C.skin, C.skinD);
  T.handR = glove(-1, C.hide, C.hideL);
  return T;
}

/** A single stiff leather guard on the bow (left) shoulder; none on the drawing arm. +x = outward. */
const pauldron = (sx) => (sx < 0 ? [] : [
  ...lamellar([0, -3, -6], [7, 2, 6], { base: C.hide, rowH: 2, pw: 4, trim: C.hideD, jag: true }),
  B([-1, 2, -6], [6, 3, 6], (x, y, z) => (md(x + z, 3) ? C.hideL : C.hideD)),
]);

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const hair = (x, y, z) => (md(x * 3 + z + y * 2, 7) === 0 ? C.hairH : C.hair);
  // tousled crown: the outer shell broken by uneven tufts (hashed per column), longer at the back
  const crown = (x, y, z) => {
    const k = hash01(x + 11, z + 11, 3);
    if (y >= 18 && k < 0.45) return null;
    if (y === 19 && k < 0.8) return null;
    return hair(x, y, z);
  };
  // ragged bangs: each column over the brow falls to its own length
  const bangs = (x, y) => (y < 13 - Math.floor(hash01(x + 7, 2, 9) * 2) - (md(x, 3) === 0 ? 1 : 0) ? null : hair(x, y, 6));
  return [
    // a lean young face, a firm but narrow jaw
    B([-6, 3, -6], [7, 14, 6], C.skin),
    B([-5, 1, -4], [6, 3, 5], C.skin), B([-3, 0, -3], [4, 1, 5], C.skin), B([-6, 3, -5], [7, 5, 6], C.skin),
    ...symH(4, 6, 5, 7, 5, 6, C.skinH), ...symH(5, 6, 2, 4, 3, 5, C.skinD),
    // hair: thick over the crown and back, falling past the ears; tufts sticking out at the temples
    B([-7, 3, -8], [8, 18, -2], hair),
    B([-7, 13, -7], [8, 20, 7], crown),
    ...symH(6, 8, 6, 15, -2, 3, C.hair, false), ...symH(8, 9, 10, 15, -4, 1, C.hair, false),
    B([-6, 9, 6], [7, 15, 7], bangs),
    ...symH(7, 8, 6, 10, -1, 2, C.skin, false), ...symH(7, 8, 7, 9, 0, 1, C.skinD),
    // level brows, bright eyes (white, dark iris, the lid), a straight nose, a crooked half smile
    ...symH(1, 6, 10, 11, 5, 7, C.hair, false),
    ...symH(2, 5, 7, 9, 5, 6, C.scl), ...symH(2, 4, 7, 9, 5, 6, C.iris), ...symH(2, 3, 7, 9, 5, 6, C.eye),
    ...symH(2, 6, 9, 10, 5, 6, C.eye),
    B([-1, 5, 6], [2, 9, 7], C.skinH), P([-1, 4, 5], [0, 5, 7], C.skinD), P([1, 4, 5], [2, 5, 7], C.skinD),
    P([-1, 3, 5], [2, 4, 6], C.lip), P([2, 4, 5], [3, 5, 6], C.lip), P([-2, 3, 5], [-1, 4, 6], C.skinD),
    // the half-up knot at the back of the crown, bound with a leather thong
    B([-2, 17, -6], [3, 22, -1], hair), B([-3, 17, -7], [4, 19, 0], (x, y, z) => (md(x + z, 2) ? C.hide : C.hideL)),
    B([-1, 22, -5], [2, 23, -2], hair),
  ];
}

// ---------------------------------------------------------------- the hunting bow (weapon joint: origin = grip, +Z = arrow line, limbs ±Y)
export const BOW = { v: 0.02, R: 42, brace: -0.13 };   // voxel, limb length (voxels: 0.84 m), string plane z (m) behind the grip
/** Limb profile z (voxels) at |y| = u·R: a plain self bow, the limbs bending back evenly to the string plane at the nocks. */
const bowZ = (u) => Math.round(-6.5 * (1 - Math.pow(Math.cos(Math.min(1, u) * Math.PI / 2), 1.15)));
function bowGeo() {
  const { R } = BOW, boxes = [];
  for (let y = -R; y <= R; y++) {
    const u = Math.abs(y) / R, z = bowZ(u), grip = Math.abs(y) <= 4;
    const th = grip ? 2 : u < 0.55 ? 2 : 1;
    boxes.push(B([-1, y, z - th], [1, y + 1, z + 1], grip ? (md(y, 2) ? C.grip : C.hideD) : md(y * 3 + z, 7) === 0 ? C.bowH : C.bow));
    if (grip && Math.abs(y) === 4) boxes.push(B([-1, y, z - 3], [2, y + 1, z + 2], C.hideD));
  }
  for (const s of [1, -1]) {                                           // horn nock caps
    const y = s * R, z = bowZ(1);
    boxes.push(B([-1, s > 0 ? y : y - 2, z - 1], [1, s > 0 ? y + 3 : y + 1, z + 1], C.horn));
  }
  return vox(boxes, BOW.v, { jitter: 0.04, ao: 0.3 });
}
/** String tips in bow-local metres. */
const TIPS = [new THREE.Vector3(0, (BOW.R + 2) * BOW.v, BOW.brace), new THREE.Vector3(0, -(BOW.R + 1) * BOW.v, BOW.brace)];

/** Quiver (axis +Y): bark-brown, rawhide bands, a sheaf of grey-brown fletchings out of the top. */
function quiverGeo() {
  const boxes = [B([-3, 0, -3], [4, 25, 4], (x, y) => (md(y, 9) === 1 ? C.rawhide : md(x * 2 + y, 5) === 0 ? C.hideD : C.bark))];
  for (let k = 0; k < 7; k++) {
    const x = -2 + (k % 3) * 2, z = -2 + Math.floor(k / 3) * 2, h = 28 + (k % 3);
    boxes.push(B([x, 25, z], [x + 1, h, z + 1], C.bowH));
    boxes.push(B([x - 1, h - 4, z], [x + 2, h + 1, z + 1], (xx, y) => (y === h - 4 ? C.featherD : md(xx + y, 3) ? C.feather : C.featherD)));
  }
  return vox(boxes, 0.019, { off: [-0.5, 0, -0.5], jitter: 0.04 });
}

/** His body, head and bow (hero/model.js buildDef), the quiver slung across his back from the left hip to over the right
 *  shoulder (on the chest joint). → { meshes, material } */
export function createModel(rig) {
  const m = buildDef(rig, { parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: [{ geo: bowGeo(), mat: 'body' }] });
  const sling = new THREE.Object3D();
  sling.position.set(0.13, -0.2, -0.16); sling.rotation.set(-0.15, 0, 0.62);
  rig.joints.chest.add(sling);
  const q = new THREE.Mesh(quiverGeo(), m.material);
  q.castShadow = true; q.receiveShadow = true;
  sling.add(q); m.meshes.quiver = q;
  return m;
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
const panel = (i, n) => vox([B([-4, -8, 0], [4, 0, 1], (x, y) => (i === n - 1 && y <= -7 ? (y === -8 && x & 1 ? null : C.earthD)
  : x === -4 || x === 3 ? C.mossD : cloth(x, y, i)))], FV * 1.2, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.2 });
/** The scarf's tail: a moss strip, frayed at the end. */
const scarf = (i, n) => vox([B([-3, -7, 0], [3, 0, 1], (x, y) => (i === n - 1 && y <= -5 && hash01(x + 4, y + 9, 3) < 0.4 ? null
  : x === -3 ? C.mossD : md(y + x, 5) === 0 ? C.mossL : C.moss))], FV, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.15 });
/** A loose lock of hair: a few strands, the tip ragged. */
const lock = (i, n) => vox([B([-1, -6, -1], [1, 0, 1], (x, y, z) => {
  const k = hash01(x + 5, z + 5, i + 3);
  if (i === n - 1 && -y > 2 + k * 4) return null;
  return k < 0.3 ? C.hairH : C.hair;
})], 0.012, { jitter: 0.06, ao: 0.25 });
/** Belt rope end: a straw-coloured twist, a knot at the tip. */
const rope = (i, n) => vox([B([-1, -6, -1], [1, 0, 1], (x, y) => (i === n - 1 && y <= -4 ? C.strawD : md(y + x, 2) ? C.straw : C.strawD))],
  0.011, { jitter: 0.04, ao: 0.15 });

/** Chains, bowstring and nocked arrow. hero (hero.js; the select / title models pass none): whose state lights the fire
 *  arrow. */
export function createSecondary(scene, rig, mat, hero) {
  const j = rig.joints, legs = [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]];
  const body = chainSet(scene, rig, mat, [
    { joint: 'hips', anchor: [0, -0.01, 0.12], rest: [0, -1, 0.1], n: 3, len: 0.11, stiff: 0.12, drag: 0.14, wind: 0.5, face: [0, 0, 1], cone: 70, sway: 0.1,
      seg: panel, hit: legs },
    { joint: 'hips', anchor: [0, -0.01, -0.12], rest: [0, -1, -0.12], n: 3, len: 0.11, stiff: 0.12, drag: 0.14, wind: 0.6, face: [0, 0, -1], cone: 70, sway: 0.12,
      seg: panel, hit: ['hips', ...legs] },
    // the scarf's tail from the hood fold behind the neck, off the left shoulder
    { joint: 'neck', anchor: [0.03, -0.02, -0.12], rest: [0.3, -1, -0.6], n: 4, len: 0.08, stiff: 0.05, drag: 0.08, wind: 1.8, cone: 100, sway: 0.4,
      face: [0, 0, -1], seg: scarf, hit: ['head', ['chest', 0.04]] },
    // loose locks: three at the nape, one at each temple
    ...[-1, 0, 1].map((k) => ({ joint: 'head', anchor: [k * 3 * HV, 6 * HV, -8.5 * HV], rest: [k * 0.3, -1, -0.4], n: 3, len: 0.05, stiff: 0.06,
      drag: 0.1, wind: 1.4, cone: 90, sway: 0.3, seg: lock, hit: ['head', ['chest', 0.03]] })),
    ...[-1, 1].map((sx) => ({ joint: 'head', anchor: [sx * 7.5 * HV, 11 * HV, 3 * HV], rest: [sx * 0.3, -1, 0.1], n: 2, len: 0.045, stiff: 0.08,
      drag: 0.1, wind: 1.2, cone: 60, sway: 0.2, seg: lock, hit: ['head'] })),
    // the belt rope's two ends at the left hip
    ...[0, 1].map((k) => ({ joint: 'hips', anchor: [0.15, 0.03, 0.06 - k * 0.025], rest: [0.2, -1, 0.15], n: 3, len: 0.06, stiff: 0.08, drag: 0.12,
      wind: 0.8, cone: 70, sway: 0.15, face: [1, 0, 0], seg: rope, hit: [['thighL', 0.03]] })),
  ]);

  const strMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.35, 1.28, 1.1) });   // bright: the string reads against the sky
  const unit = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  const str = [0, 1].map(() => { const m = new THREE.Mesh(unit, strMat); m.matrixAutoUpdate = false; m.frustumCulled = false; scene.add(m); return m; });
  const arrowGeo = vox([B([0, 0, 0], [1, 1, 44], (x, y, z) => (z > 40 ? 0xb8bec6 : z < 5 ? C.feather : C.bowH)), B([-1, 0, 0], [2, 1, 4], C.feather),
    B([0, -1, 0], [1, 2, 4], C.featherD), B([-1, 0, 40], [2, 1, 43], 0xa8aeb6)], 0.022, { off: [-0.5, -0.5, 0], jitter: 0, ao: 0.1 });
  const arrow = new THREE.Mesh(arrowGeo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, flatShading: true }));
  arrow.matrixAutoUpdate = false; scene.add(arrow);
  const flame = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.2), new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 1.6, 0.35), transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false }));
  flame.matrixAutoUpdate = false; scene.add(flame);
  const handP = new THREE.Vector3(), loc = new THREE.Vector3(), t0 = new THREE.Vector3(), t1 = new THREE.Vector3(), nock = new THREE.Vector3();
  const inv = new THREE.Matrix4(), m4b = new THREE.Matrix4(), m4c = new THREE.Matrix4(), _x = new THREE.Vector3(), _y = new THREE.Vector3(), _z = new THREE.Vector3();
  const seg = (m, a, b, w) => {                                        // segment mesh from a to b (world), thickness w
    _y.subVectors(b, a); const len = _y.length(); _y.normalize();
    _x.set(1, 0, 0); if (Math.abs(_y.x) > 0.9) _x.set(0, 0, 1);
    _z.crossVectors(_x, _y).normalize(); _x.crossVectors(_y, _z);
    m.matrix.makeBasis(_x.multiplyScalar(w), _y.multiplyScalar(len), _z.multiplyScalar(w)).setPosition(a); m.matrixWorldNeedsUpdate = true;
  };
  const FIRE = new Set(['c6', 'jc']);
  return {
    reset: body.reset,
    update(dt) {
      const t = body.update(dt);
      // the string through the right hand when it holds the nock (behind the bow, on the arrow line), else straight
      const W = j.weapon.matrixWorld;
      inv.copy(W).invert();
      j.handR.getWorldPosition(handP);
      loc.copy(handP).applyMatrix4(inv);
      const drawn = loc.z < BOW.brace - 0.04 && Math.abs(loc.x) < 0.16 && Math.abs(loc.y) < 0.16;
      t0.copy(TIPS[0]).applyMatrix4(W); t1.copy(TIPS[1]).applyMatrix4(W);
      const sc = rig.root.scale.y;
      if (drawn) {
        nock.set(0, 0, loc.z).applyMatrix4(W);
        seg(str[0], nock, t0, 0.016 * sc); seg(str[1], t1, nock, 0.016 * sc);
        arrow.matrix.copy(W).multiply(m4b.makeTranslation(0, 0, loc.z - 0.02)); arrow.matrixWorldNeedsUpdate = true;
        const fire = hero && ((hero.state === 'attack' && FIRE.has(hero.move)) || hero.state === 'musou');
        flame.visible = !!fire;
        if (fire) {
          const k = 1 + 0.25 * Math.sin(t * 40);
          flame.matrix.copy(W).multiply(m4b.makeTranslation(0, 0, loc.z + 0.98 * sc)).multiply(m4c.makeScale(k, k, k));
          flame.matrixWorldNeedsUpdate = true;
        }
      } else { seg(str[0], t1, t0, 0.016 * sc); flame.visible = false; }
      str[1].visible = drawn; arrow.visible = drawn;
    },
  };
}

// ---------------------------------------------------------------- HUD portrait (20 × 20): tousled black hair with the
// small knot on top and ragged bangs, a sun-browned face with level brows and a half smile; the green scarf at the
// throat, moss over-tunic, the leather strap across, fletchings over his right shoulder
export const FACE = [
  '.........KK.K.......',
  '......K.KhhK..K.....',
  '....KKKKKKKKKKKK....',
  '...KKKKKKKKKKKKKKK..',
  '..KKKKKKKKKKKKKKKKK.',
  '..KKKSKKSKKKSKKSKKK.',
  '..KKSSSSSSSSSSSSSKK.',
  '..KKKKKKSSSSKKKKKK..',
  '..KSSWEESSSSEEWSSKK.',
  '..KSSSSSSSSSSSSSSK..',
  '..KsSSSSSSssSSSSSsK.',
  '...SSSSSSSssSSSSS...',
  '...sSSSSSSSSSSSSs...',
  '....SSSSMMMMMSSS....',
  '.....sSSSSSSSSs.....',
  'FF..GGGGssssGGGG....',
  'FFgGGGGGGGGGGGGGGg..',
  'FgGGHHgGGGGGGGgGGGg.',
  'gGGGGgHHGGGGGGGGgGG.',
  'GGGgGGGGHHGGGGGGGgGG',
];
export const PAL = { K: '#110d0b', h: '#7e5634', S: '#c8946c', s: '#9c6a48', W: '#efe4d2', E: '#120a08', M: '#9a5444',
  G: '#587a36', g: '#3a5424', H: '#5c3c24', F: '#b0a690' };
