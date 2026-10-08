// 丁璉 on Huang Zhong's bow kit (kit.js): his own def-shaped body (fine voxels, src/chars/parts.js FV, built with
// hero/model.js buildDef) on the shared rig in bow mode (src/hero/rig.js header: the weapon joint is the bow — origin =
// the grip in the left hand, +Z = the arrow line, limbs along local ±Y). Đinh Bộ Lĩnh's eldest, young and lithe: a
// smooth face, bright wide-set eyes under arched brows, a straight nose, a quick smile at one corner; the hair in a
// topknot held by a bronze ring, an amber khăn wound as a broad band round the brow, its long tails streaming. An
// amber-orange tunic under a brown leather jerkin of lamellar with bronze lips, a leather baldric across the chest
// carrying a quiver on his back (lacquered brown, bronze bands, a sheaf of fletchings over the right shoulder); one
// stiff leather guard on the bow shoulder, none on the drawing arm; long leather bracers, an archer's glove on the
// right hand; an amber sash with a bronze buckle, the tunic skirt front and back (panels: chains); brown trousers in
// amber-banded leg wraps, short leather boots. Weapon: a recurve war bow — dark red-brown lacquer, amber bands, a
// leather-wrapped grip, bronze-bird finials (the birds of the Đông Sơn drums), a bronze-steel edge along the back of
// each limb for the bow's slashes. Secondary (render-only): khăn and sash tails, skirt panels, plus the bowstring
// (through the right hand while it holds the nock) and the nocked arrow, flaming through fire shots, as Huang Zhong's
// (src/chars/huangzhong/model.js createHzSecondary).
import * as THREE from 'three';
import { vox, B, P, md, lamellar, buildDef } from '../../../../src/hero/model.js';
import { chainSet } from '../../../../src/hero/secondary.js';
import { FV, hand, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

export const HV = 0.013;
export const C = {
  skin: 0xd8a47e, skinD: 0xac7652, skinH: 0xeab890, lip: 0xa85a48, eye: 0x120a08, iris: 0x3e2410, scl: 0xf0e6d6,
  hair: 0x120e0c, hairH: 0x2c2420,
  amber: 0xe07a1e, amberD: 0x96480e, amberL: 0xffa040,
  hide: 0x6a4428, hideD: 0x442a18, hideL: 0x8c5e38,
  bronze: 0xb8843a, bronzeD: 0x70501e, bronzeL: 0xe4b460,
  pants: 0x4a3222, pantsD: 0x2e1e14, boot: 0x3a2618, bootD: 0x24160e,
  bow: 0x3a1610, bowH: 0x5a2618, edge: 0xeef3f8, edgeD: 0x98a4b2, feather: 0xf2efe8,
};
const cloth = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.amberL : md(x - y * 2 + z, 9) === 0 ? C.amberD : C.amber);
/** The baldric's line across the chest: from the left shoulder down to the right hip (x at chest height y). */
const strap = (y) => 7 - (y - 18) * 0.85;

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  T.hips = [
    B([-11, -10, -8], [11, 6, 8], C.amberD),
    B([-13, -15, -9], [13, -1, 9], (x, y, z) => (Math.abs(z) > 4 && y < -5 ? null : y === -15 ? C.bronze : cloth(x, y, z))),
    B([-13, -1, -9], [13, 5, 9], (x, y, z) => (y === -1 || y === 4 ? C.amberD : md(x + z + y, 4) === 0 ? C.amberL : C.amber)),
    B([-3, -1, 9], [4, 5, 11], (x, y) => (y === -1 || y === 4 ? C.bronzeD : C.bronze)),
  ];
  T.spine = [
    B([-10, -6, -8], [10, 14, 8], cloth),
    ...lamellar([-10, -4, -8], [10, 13, 8], { base: C.hide, rowH: 2, pw: 3, trim: C.bronze }),
  ];
  // the leather jerkin with bronze lips over the amber tunic, the baldric from the left shoulder to the right hip (a
  // bronze boss where it crosses the breast), an amber collar
  T.chest = [
    B([-14, -4, -10], [14, 18, 10], cloth),
    ...lamellar([-13, -3, -10], [13, 16, 10], { base: C.hide, rowH: 3, pw: 3, trim: C.bronze }),
    B([-15, -5, -11], [15, 20, 11], (x, y) => (Math.abs(x - strap(y)) < 2.6 ? (Math.abs(x - strap(y)) > 1.6 ? C.hideD : C.hideL) : null)),
    B([2, 9, 11], [7, 14, 13], (x, y) => (x === 2 || x === 6 || y === 9 || y === 13 ? C.bronzeD : C.bronzeL)),
    B([-8, 16, -8], [8, 21, 8], (x, y) => (y === 20 ? C.amberL : C.amber)),
    B([-5, 15, -5], [5, 25, 5], -1),
  ];
  T.neck = [B([-4, -2, -4], [4, 6, 4], C.skinD), P([-4, 1, 3], [4, 6, 4], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    T['upperArm' + s] = [
      B([-5, -24, -5], [5, 2, 5], cloth),
      B([-6, -24, -6], [6, -21, 6], (x, y) => (y === -22 ? C.bronze : C.amberD)),
    ];
    T['foreArm' + s] = bracer(C.skin, [C.hide, C.hideD, C.bronze], s === 'L');
    T['thigh' + s] = [
      B([-6, -36, -6], [6, 2, 6], (x, y) => (md(y + (x & 1), 6) === 0 ? C.pantsD : C.pants)),
      B([-7, -30, -7], [7, -20, 7], (x, y) => (md(y - x, 5) === 0 ? C.pantsD : C.pants)),
    ];
    // amber-banded leg wraps over the calf, a short leather boot
    T['shin' + s] = [
      B([-5, -34, -5], [5, 0, 5], (x, y, z) => (y < -24 ? C.boot : md(y + ((x + z) >> 1), 4) === 0 ? C.amber : C.pants)),
      B([-6, -26, -6], [6, -24, 6], C.bootD),
      B([-6, -4, -6], [6, 2, 6], C.pants),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD, { trim: C.bronze });
  }
  T.handL = hand(1, C.skin, C.skinD);
  T.handR = glove(-1, C.hide, C.hideL);
  return T;
}

/** One stiff leather guard on the bow (left) shoulder, bronze-lipped; none on the drawing arm. +x = outward. */
const pauldron = (sx) => (sx < 0 ? [] : [
  ...lamellar([-1, -4, -7], [7, 3, 7], { base: C.hide, rowH: 3, pw: 4, trim: C.bronze, jag: true }),
  B([-2, 3, -7], [6, 5, 7], (x, y, z) => (md(x + z, 3) ? C.hideL : C.bronzeL)),
]);

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const hair = (x, y, z) => (md(x * 3 + z + y * 2, 7) === 0 ? C.hairH : C.hair);
  return [
    // a smooth young face, a rounded chin
    B([-6, 3, -6], [7, 14, 6], C.skin),
    B([-5, 0, -4], [6, 3, 5], C.skin), B([-6, 2, -5], [7, 5, 6], C.skin),
    ...symH(4, 6, 4, 6, 5, 6, C.skinH),
    // hair at the nape and temples under the band, ears
    B([-7, 4, -7], [8, 15, -2], hair), ...symH(6, 8, 7, 12, -2, 2, C.hair, false),
    ...symH(7, 8, 6, 10, -1, 2, C.skin, false), ...symH(7, 8, 7, 9, 0, 1, C.skinD),
    // arched brows, bright wide-set eyes, a straight nose, a smile lifting one corner
    ...symH(2, 6, 11, 12, 5, 7, C.hair, false), ...symH(1, 2, 10, 11, 5, 7, C.hair, false), ...symH(6, 7, 10, 11, 5, 7, C.hair, false),
    ...symH(2, 6, 7, 9, 5, 6, C.scl), ...symH(3, 5, 7, 9, 5, 6, C.iris), ...symH(3, 4, 7, 9, 5, 6, C.eye),
    ...symH(2, 6, 9, 10, 5, 6, C.eye),
    B([-1, 5, 6], [2, 9, 8], C.skinH), B([-1, 4, 6], [2, 5, 8], C.skin), P([-1, 4, 7], [0, 5, 8], C.skinD), P([1, 4, 7], [2, 5, 8], C.skinD),
    P([-2, 2, 5], [3, 3, 6], C.lip), P([3, 3, 5], [4, 4, 6], C.lip),
    // hair over the crown, the topknot in its bronze ring
    B([-6, 14, -6], [7, 17, 5], hair), B([-2, 17, -4], [3, 22, 1], hair),
    B([-3, 18, -5], [4, 20, 2], (x, y, z) => (md(x + z, 2) ? C.bronze : C.bronzeL)),
    // the amber khăn: a broad band round the brow and temples, the knot behind (tails: chains)
    B([-7, 11, -7], [8, 15, 7], (x, y, z) => (y === 11 || y === 14 ? C.amberD : md(x + z + y, 5) === 0 ? C.amberL : C.amber)),
    B([-2, 10, -9], [3, 15, -7], C.amberD),
  ];
}

// ---------------------------------------------------------------- the war bow (weapon joint: origin = grip, +Z = arrow line, limbs ±Y)
export const BOW = { v: 0.02, R: 42, brace: -0.13 };   // voxel, limb length (voxels: 0.84 m), string plane z (m) behind the grip
/** Limb profile z (voxels) at |y| = u·R: the limb sweeps back toward the string, the outer quarter recurving forward. */
const bowZ = (u) => Math.round(13 * Math.pow(Math.cos(Math.min(1, u) * Math.PI / 2), 1.3) - 13 + (u > 0.72 ? ((u - 0.72) / 0.28) ** 1.6 * 6.5 : 0));
function bowGeo() {
  const { R } = BOW, boxes = [];
  for (let y = -R; y <= R; y++) {
    const u = Math.abs(y) / R, z = bowZ(u), grip = Math.abs(y) <= 4;
    const band = !grip && Math.abs(y) % 12 === 6;
    boxes.push(B([-1, y, z - (grip ? 2 : u < 0.5 ? 2 : 1)], [1, y + 1, z + 1], grip ? C.hide : band ? C.amber : md(y, 4) ? C.bow : C.bowH));
    if (grip && Math.abs(y) === 4) boxes.push(B([-2, y, z - 3], [2, y + 1, z + 2], C.bronze));
    if (u > 0.16 && u < 0.78) {                                        // the edge along the limb's back (toward the target)
      const ew = Math.max(1, Math.round(3 * Math.sin((u - 0.16) / 0.62 * Math.PI)));
      boxes.push(B([0, y, z + 1], [1, y + 1, z + 1 + ew], (x, yy, zz) => (zz === z + ew ? C.edge : C.edgeD)));
    }
  }
  for (const s of [1, -1]) {                                           // bronze bird finials: body, a long beak forward, a crest
    const y = s * R, z = bowZ(1), lo = s > 0 ? y : y - 3, hi = s > 0 ? y + 4 : y + 1;
    boxes.push(B([-1, lo, z - 2], [2, hi, z + 2], C.bronze));
    boxes.push(B([0, s > 0 ? y + 2 : y - 2, z + 2], [1, s > 0 ? y + 3 : y - 1, z + 6], C.bronzeL));
    boxes.push(B([0, s > 0 ? y + 4 : y - 4, z - 3], [1, s > 0 ? y + 6 : y - 2, z], C.bronzeD));
  }
  return vox(boxes, BOW.v, { jitter: 0.04, ao: 0.3 });
}
/** String tips in bow-local metres. */
const TIPS = [new THREE.Vector3(0, (BOW.R + 1) * BOW.v, BOW.brace), new THREE.Vector3(0, -BOW.R * BOW.v, BOW.brace)];

/** Quiver (axis +Y): brown lacquer banded in bronze, a sheaf of white fletchings out of the top. */
function quiverGeo() {
  const boxes = [B([-3, 0, -3], [4, 26, 4], (x, y) => (md(y, 8) === 1 ? C.bronze : md(x + y, 5) === 0 ? C.hideD : C.hide))];
  for (let k = 0; k < 7; k++) {
    const x = -2 + (k % 3) * 2, z = -2 + Math.floor(k / 3) * 2, h = 29 + (k % 2) * 2;
    boxes.push(B([x, 26, z], [x + 1, h, z + 1], C.bowH));
    boxes.push(B([x - 1, h - 4, z], [x + 2, h + 1, z + 1], (xx, y) => (y === h - 4 ? C.amber : C.feather)));
  }
  return vox(boxes, 0.019, { off: [-0.5, 0, -0.5], jitter: 0.04 });
}

/** His body, head and bow (hero/model.js buildDef), the quiver slung across his back from the left hip to over the right
 *  shoulder (on the chest joint). → { meshes, material } */
export function createDinhLienModel(rig) {
  const m = buildDef(rig, { parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: [{ geo: bowGeo(), mat: 'metal' }] });
  const sling = new THREE.Object3D();
  sling.position.set(0.13, -0.2, -0.16); sling.rotation.set(-0.15, 0, 0.62);
  rig.joints.chest.add(sling);
  const q = new THREE.Mesh(quiverGeo(), m.material);
  q.castShadow = true; q.receiveShadow = true;
  sling.add(q); m.meshes.quiver = q;
  return m;
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
const tail = (c, d, e) => (i, n) => vox([B([-2, -7, 0], [2, 0, 1], (x, y) => (i === n - 1 && y <= -5 ? (y === -7 && (x === -2 || x === 1) ? null : e) : x === -2 ? d : c))],
  FV, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.15 });
const panel = (i, n) => vox([B([-4, -8, 0], [4, 0, 1], (x, y) => (i === n - 1 && y <= -7 ? (y === -8 && x & 1 ? null : C.bronze)
  : x === -4 || x === 3 ? C.amberD : cloth(x, y, i)))], FV * 1.2, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.2 });

/** Chains, bowstring and nocked arrow. hero (hero.js; the select / title models pass none): whose state lights the fire
 *  arrow. */
export function createDinhLienSecondary(scene, rig, mat, hero) {
  const j = rig.joints, legs = [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]];
  const body = chainSet(scene, rig, mat, [
    { joint: 'hips', anchor: [0, -0.01, 0.12], rest: [0, -1, 0.1], n: 3, len: 0.11, stiff: 0.12, drag: 0.14, wind: 0.5, face: [0, 0, 1], cone: 70, sway: 0.1,
      seg: panel, hit: legs },
    { joint: 'hips', anchor: [0, -0.01, -0.12], rest: [0, -1, -0.12], n: 3, len: 0.11, stiff: 0.12, drag: 0.14, wind: 0.6, face: [0, 0, -1], cone: 70, sway: 0.12,
      seg: panel, hit: ['hips', ...legs] },
    ...[-1, 1].map((sx) => ({ joint: 'head', anchor: [sx * 1.5 * HV, 12.5 * HV, -9 * HV], rest: [sx * 0.25, -0.8, -1], n: 5, len: 0.075, stiff: 0.04,
      drag: 0.07, wind: 2.2, cone: 110, sway: 0.55, face: [0, 0, -1], seg: tail(C.amber, C.amberD, C.amberL), hit: ['head', ['chest', 0.03]] })),
    ...[0, 1].map((k) => ({ joint: 'hips', anchor: [0.13, 0.02, 0.1 - k * 0.03], rest: [0.2, -1, 0.15], n: 3, len: 0.075, stiff: 0.08, drag: 0.12,
      wind: 0.8, cone: 70, sway: 0.15, face: [1, 0, 0], seg: tail(C.amber, C.amberD, C.bronze), hit: [['thighL', 0.03]] })),
  ]);

  const strMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.5, 1.38, 1.15) });   // bright: the string reads against the sky
  const unit = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  const str = [0, 1].map(() => { const m = new THREE.Mesh(unit, strMat); m.matrixAutoUpdate = false; m.frustumCulled = false; scene.add(m); return m; });
  const arrowGeo = vox([B([0, 0, 0], [1, 1, 44], (x, y, z) => (z > 40 ? 0xd8dde4 : z < 5 ? C.feather : C.bowH)), B([-1, 0, 0], [2, 1, 4], C.feather),
    B([0, -1, 0], [1, 2, 4], C.amber), B([-1, 0, 40], [2, 1, 43], 0xc8ced6)], 0.022, { off: [-0.5, -0.5, 0], jitter: 0, ao: 0.1 });
  const arrow = new THREE.Mesh(arrowGeo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, flatShading: true }));
  arrow.matrixAutoUpdate = false; scene.add(arrow);
  const flame = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.2), new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 1.0, 0.25), transparent: true,
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
        seg(str[0], nock, t0, 0.018 * sc); seg(str[1], t1, nock, 0.018 * sc);
        arrow.matrix.copy(W).multiply(m4b.makeTranslation(0, 0, loc.z - 0.02)); arrow.matrixWorldNeedsUpdate = true;
        const fire = hero && ((hero.state === 'attack' && FIRE.has(hero.move)) || hero.state === 'musou');
        flame.visible = !!fire;
        if (fire) {
          const k = 1 + 0.25 * Math.sin(t * 40);
          flame.matrix.copy(W).multiply(m4b.makeTranslation(0, 0, loc.z + 0.98 * sc)).multiply(m4c.makeScale(k, k, k));
          flame.matrixWorldNeedsUpdate = true;
        }
      } else { seg(str[0], t1, t0, 0.018 * sc); flame.visible = false; }
      str[1].visible = drawn; arrow.visible = drawn;
    },
  };
}

// ---------------------------------------------------------------- HUD portrait (20 × 20): the topknot in its bronze ring,
// the broad amber band, a young smooth face with arched brows; the leather jerkin, the baldric, fletchings over the shoulder
export const FACE = [
  '........KKKK........',
  '.......bBBBBb.......',
  '.......KKKKKK.......',
  '.....KKKKKKKKKK.....',
  '....KKKKKKKKKKKK....',
  '...AAAAAAAAAAAAAA...',
  '...AaAAAaAAaAAAaA...',
  '...AAAAAAAAAAAAAA...',
  '..SKSKKKKSSKKKKSKS..',
  '..SSSWEESSSSEEWSSS..',
  '..sSSSSSSSSSSSSSSs..',
  '...SSSSSSssSSSSSS...',
  '...sSSSSSssSSSSSs...',
  '....SSSSSSSSSSSS....',
  '.....SSSMMMMMSS.....',
  '......sSSSSSSs......',
  'FF..AAAAssssAAAA....',
  'FFHHHHLLAAAAAAHHHH..',
  'FHHhHHHLLHHHHHHhHH..',
  'HHhHHHHHLLHHHHHHhHH.',
];
export const PAL = { K: '#120e0c', b: '#e4b460', B: '#b8843a', A: '#e07a1e', a: '#96480e', S: '#d8a47e', s: '#ac7652', W: '#f0e6d6', E: '#120a08',
  M: '#a85a48', F: '#f2efe8', H: '#6a4428', h: '#442a18', L: '#8c5e38' };
