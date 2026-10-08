// Nữ Cận Vệ (女衛) — the queen's woman guard (Màn II and VI: the ally who holds Hồng Diễm at the foot of the stair); sword
// class. NPC entry (contract: src/chars/npc/index.js) with her own model def (src/chars/npc/kit.js header; fine voxels,
// chars/parts.js FV), lean and a little under a man's size (scale 1.03), and a 20×20 portrait.
// An athletic guard in her middle years, built for speed, not show: a lean face with high cheekbones and a firm jaw,
// level alert eyes under straight brows, the mouth set; the hair pulled back hard into a tight bun bound with red cord
// (its two ends hang behind: chains), a red cord band over the brow. Tight black-and-red lamellar: black lacquer plates
// laced in red, red lips, a red-bordered breastplate with a small bronze boss; close-fitting black shoulder caps edged
// in red; a red sash wound at the waist, its ends at the right hip (chains); black lamellar tassets over the hips, the
// short red tunic skirt behind (chain); black leggings bound at the shin, black boots with red tops; black bracers laced
// red, leather gloves. Weapons: twin sabers (song đao) — a slightly curved single-edged blade, a black cord grip, a round
// blackened-iron guard, a red tassel on each pommel; the right is the class weapon, the left a matching saber held in
// the left hand as a static model part (the weapon meshes again on handL, held forward and low in a natural grip). Her
// idle is the guard's alert stance (both sabers ready) instead of the class's planted-sword rest.
import * as THREE from 'three';
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as SWORD from '../../../../src/chars/npc/sword.js';
import { clip, P as RP } from '../../../../src/hero/rig.js';
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

const HV = 0.0125;
const C = {
  skin: 0xcc9670, skinD: 0xa06c4c, skinH: 0xdcaa84, lip: 0x8c3c30, eye: 0x100a08, iris: 0x2e1c10, scl: 0xece2d2,
  hair: 0x0f0c0c, hairH: 0x2c2426,
  black: 0x161212, blackD: 0x0b0909, blackL: 0x302828,
  red: 0xb0221a, redD: 0x6a140e, redL: 0xd8402e,
  bronze: 0xa8783a, bronzeL: 0xd8aa5a,
  leather: 0x2e2018, leatherL: 0x4a3426, boot: 0x141010, bootD: 0x0a0808,
  iron: 0x3a3a40, ironL: 0x5c5c66, grip: 0x161214,
  steel: 0xc8d0da, edge: 0xf6faff, back: 0x6a7482,
};
const tunic = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.redL : md(x - y * 2 + z, 9) === 0 ? C.redD : C.red);
/** Black lacquer lamellar laced in red: the seams red instead of dark, the lips red-lipped black. */
const plates = (a, b, o) => lamellar(a, b, { base: C.black, ...o }).map((bx, i) => (i === 0 ? { ...bx, c: (x, y, z) => {
  const c = bx.c(x, y, z);
  return c == null ? c : md(x + z + (Math.floor((y - a[1]) / (o.rowH ?? 3)) & 1) * ((o.pw ?? 4) >> 1), o.pw ?? 4) === 0 ? C.redD : c;
} } : bx));

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: black tassets laced red at the front and sides, the red tunic skirt behind (chain), the red sash wound over
  // a black belt (its ends hang at the right hip: chains)
  T.hips = [
    B([-11, -10, -8], [11, 6, 8], C.blackD),
    ...plates([-13, -17, -2], [13, -1, 10], { rowH: 3, pw: 3, trim: C.red, jag: true }),
    ...plates([-13, -14, -9], [-9, -1, 2], { rowH: 3, pw: 3, trim: C.red, lipZ: false }), ...plates([9, -14, -9], [13, -1, 2], { rowH: 3, pw: 3, trim: C.red, lipZ: false }),
    B([-13, -1, -10], [13, 5, 10], (x, y, z) => (y === -1 || y === 4 ? C.redD : md(x + y + z, 5) === 0 ? C.redL : C.red)),
    B([-14, -2, 3], [-10, 6, 11], (x, y, z) => (md(x + y + z, 3) ? C.red : C.redD)),          // the sash knot, right hip
  ];
  T.spine = [
    B([-10, -6, -8], [10, 14, 8], C.redD),
    ...plates([-10, -4, -8], [10, 11, 8], { rowH: 2, pw: 3, trim: C.red }),
    B([-11, 11, -9], [11, 14, 9], (x, y) => (y === 11 ? C.redD : C.red)),
  ];
  // chest: slim, tight lamellar to the collar, a red-bordered breastplate with a small bronze boss, red shoulder straps,
  // a red tunic collar
  const boss = [];
  for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) {
    const r = Math.hypot(x, y);
    if (r <= 3.3) boss.push(B([x, y + 10, 12], [x + 1, y + 11, r < 1.3 ? 14 : 13], r > 2.4 ? C.redD : r < 1.3 ? C.bronzeL : C.bronze));
  }
  T.chest = [
    B([-13, -4, -10], [13, 18, 10], C.blackD),
    ...plates([-13, -3, -10], [13, 5, 10], { rowH: 2, pw: 3, trim: C.red }),
    ...plates([-14, 5, -11], [14, 17, 11], { rowH: 3, pw: 3, trim: C.red }),
    B([-8, 5, 11], [9, 16, 12], (x, y) => (x === -8 || x === 8 || y === 5 || y === 15 ? C.red : md(x + y, 4) === 0 ? C.blackL : C.black)),   // breastplate
    ...boss,
    ...[-1, 1].flatMap((sx) => [mirX(B([8, 15, -12], [12, 18, 12], C.red), sx), mirX(B([9, 16, -13], [11, 17, 13], C.redD, true), sx)]),
    B([-8, 16, -8], [8, 21, 8], (x, y) => (y === 20 ? C.redL : C.red)),
    B([-5, 15, -5], [5, 25, 5], -1),
  ];
  T.neck = [B([-4, -2, -4], [4, 7, 4], C.skinD), P([-4, 1, 3], [4, 7, 4], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // red sleeves under a black lamellar guard; black bracers laced red; leather gloves
    T['upperArm' + s] = [
      B([-5, -24, -5], [5, 2, 5], tunic),
      ...plates([-5, -14, -5], [6, -2, 5], { rowH: 2, pw: 3, trim: C.red }).map((b) => mirX(b, sx)),
    ];
    T['foreArm' + s] = bracer(C.red, [C.black, C.redD, C.red]);
    T['hand' + s] = glove(sx, C.leather, C.leatherL);
    // black leggings, close to the leg
    T['thigh' + s] = [B([-6, -36, -6], [6, 2, 6], (x, y) => (md(y + (x & 1), 6) === 0 ? C.blackL : C.black))];
    // the shin bound in black wraps, black boots with red tops
    T['shin' + s] = [
      B([-5, -34, -5], [5, 0, 5], (x, y, z) => (md(y + ((x + z) >> 1), 4) === 0 ? C.blackL : C.black)),
      B([-6, -17, -6], [6, -14, 6], C.red), B([-6, -34, -6], [6, -17, 6], C.boot),
      B([-6, -34, -6], [6, -32, 6], C.bootD),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD, { trim: C.red });
  }
  return T;
}

/** Close black shoulder caps, two tiers laced red, a red edge. Authored with +x outward. */
const pauldron = (sx) => [
  ...plates([-2, 1, -8], [8, 6, 8], { rowH: 3, pw: 3, trim: C.red }),
  ...plates([1, -5, -9], [10, 1, 9], { rowH: 3, pw: 3, trim: C.red, jag: true }),
  B([-3, 6, -7], [7, 8, 7], (x, y, z) => (Math.abs(z) > 5 || x === 6 ? C.red : C.black)),
].map((b) => mirX(b, sx));

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const hair = (x, y, z) => (md(x * 3 + z + y * 2, 7) === 0 ? C.hairH : C.hair);
  return [
    // a lean face: high cheekbones, a firm narrow jaw, ears
    B([-5, 3, -6], [6, 13, 6], C.skin),
    B([-5, 1, -4], [6, 4, 5], C.skin), B([-2, 0, -2], [3, 1, 5], C.skin),
    ...symH(3, 6, 6, 7, 5, 6, C.skinH), ...symH(4, 6, 3, 5, 4, 5, C.skinD),
    ...symH(6, 7, 6, 9, -2, 1, C.skinD),
    // level, alert eyes, straight dark brows
    ...symH(1, 4, 7, 8, 5, 6, C.scl), ...symH(1, 3, 7, 8, 5, 6, C.iris), ...symH(1, 2, 7, 8, 5, 6, C.eye),
    ...symH(1, 5, 8, 9, 5, 6, C.hair),
    ...symH(1, 5, 10, 11, 5, 7, C.hair, false),
    // straight nose, a set mouth
    B([0, 5, 6], [1, 9, 7], C.skinH), P([0, 4, 6], [1, 5, 7], C.skinD),
    P([-1, 2, 5], [2, 3, 6], C.lip),
    // the hair pulled back hard: smooth over the crown and sides, the red cord band over the brow
    B([-6, 11, -7], [7, 15, 5], hair), B([-6, 3, -7], [7, 11, -2], hair), B([-6, 7, -2], [-5, 12, 2], hair), B([6, 7, -2], [7, 12, 2], hair),
    B([-5, 15, -6], [6, 16, 3], hair),
    B([-6, 11, -7], [7, 12, 6], (x, y, z) => (z > 4 || x === -6 || x === 6 || z === -7 ? C.red : null)),
    // the tight bun high at the back, bound in red cord
    B([-3, 13, -10], [4, 19, -5], (x, y, z) => ((x === -3 || x === 3) && (y === 13 || y === 18) ? null : hair(x, y, z))),
    B([-4, 15, -10], [5, 17, -4], (x, y, z) => (md(x + z, 2) ? C.red : C.redD)),
  ];
}

// ---------------------------------------------------------------- the saber (weapon joint: blade +Z, origin = the grip)
function weaponGeo() {
  const hilt = vox([
    B([-2, -2, -12], [2, 2, -9], (x, y, z) => (z === -12 ? C.ironL : C.iron)),
    B([-1, -1, -9], [1, 1, 8], (x, y, z) => (md(z + x + y, 2) ? C.grip : C.redD)),
    B([-4, -4, 8], [4, 4, 10], (x, y) => (Math.abs(x + 0.5) + Math.abs(y + 0.5) > 5 ? null : md(x + y, 2) ? C.iron : C.ironL)),   // round guard
    B([-1, -2, 10], [1, 2, 11], C.ironL),
  ], 0.01, { jitter: 0.04, ao: 0.3 });
  // the blade at 0.008 (z 0.11 … 0.86): the back on −X, the edge on +X, curving back toward the tip, a clipped point
  const bv = 0.008, z0 = Math.round(0.11 / bv), z1 = Math.round(0.86 / bv), boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / (z1 - z0), bend = Math.round(-7 * u * u);
    const w = u < 0.86 ? 4 + Math.round(u * 1.5) : Math.max(1, Math.round((1 - u) * 38)), a = bend - 2, b = Math.max(a + 1, a + w);
    boxes.push(B([a, -1, z], [b, 1, z + 1], (x) => (x === b - 1 ? C.edge : x === a ? C.back : C.steel)));
  }
  const blade = vox(boxes, bv, { jitter: 0.02, ao: 0.15 });
  return [{ geo: hilt, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
const panel = (w) => (i, n) => vox([B([-w, -8, 0], [w, 0, 1], (x, y) => (i === n - 1 && y <= -7 ? (y === -8 && x & 1 ? null : C.redD)
  : x === -w || x === w - 1 ? C.redD : tunic(x, y + i * 8, 0)))], FV * 1.2, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.18 });
const tail = (i, n) => vox([B([-2, -6, 0], [2, 0, 1], (x, y) => (i === n - 1 && y <= -5 ? (y === -6 && x & 1 ? null : C.redD) : x === -2 ? C.redD : C.red))],
  FV, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.15 });
const cord = (i, n) => vox([B([-1, -6, -1], [1, 0, 1], (x, y) => (i === n - 1 && y < -4 ? C.redD : C.red))], 0.008, { jitter: 0.03, ao: 0.15 });
const tassel = (i, n) => vox([B([-1, -6, -1], [2, 0, 2], (x, y, z) => (i === n - 1 && y < -3 && hash01(x + 3, z + 3, y) < 0.4 ? null
  : md(x + z, 3) === 0 ? C.redL : C.red))], 0.01, { jitter: 0.05, ao: 0.2 });

const DEF = {
  scale: 1.03,
  reach: { tip: 0.86, butt: 0.12 },
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains: () => [
    // the short red tunic skirt behind, the sash ends at the right hip, the bun's red cord ends, the right saber's tassel
    { joint: 'hips', anchor: [0, -0.05, -0.12], rest: [0, -1, -0.15], n: 3, len: 0.11, stiff: 0.12, drag: 0.14, wind: 0.5, face: [0, 0, -1], cone: 70, sway: 0.1,
      seg: panel(7), hit: ['hips', ['thighL', 0.02], ['thighR', 0.02]] },
    ...[0, 1].map((k) => ({ joint: 'hips', anchor: [-0.15, 0.02, 0.09 - k * 0.04], rest: [-0.2, -1, 0.1], n: 4, len: 0.07, stiff: 0.08, drag: 0.12, wind: 0.8,
      cone: 70, sway: 0.15, face: [-1, 0, 0], seg: tail, hit: [['thighR', 0.03]] })),
    ...[-1, 1].map((sx) => ({ joint: 'head', anchor: [sx * 0.8 * HV, 16 * HV, -10 * HV], rest: [sx * 0.2, -1, -0.4], n: 3, len: 0.05, stiff: 0.05, drag: 0.08,
      wind: 1.4, cone: 110, sway: 0.4, face: [1, 0, 0], seg: cord, hit: ['head', ['chest', 0.02]] })),
    ...[0, 1].map((k) => ({ joint: 'weapon', anchor: [(k - 0.5) * 0.008, 0, -0.12], rest: [(k - 0.5) * 0.2, -1, -0.2], n: 3, len: 0.05, stiff: 0.05,
      drag: 0.12, wind: 0.8, cone: 130, sway: 0.15, face: [1, 0, 0], seg: tassel })),
  ],
};

/** Ally string (src/actors/actors.js friend(): an ally swings kit.moves n1 → n2 …, now and then the charge; npcKit gives
 *  only the boss table): the class clips again as hero-style moves with soldier hit specs (src/hero/moves.js header),
 *  the hit window and lunge of each clip's boss attack. list = [[id, clip, hit, next, charge], ...]. */
function allyString(kit, list) {
  for (const [id, clipId, hit, next, charge] of list) {
    const b = kit.moves[clipId], [f0, f1] = b.hits[0].f;
    kit.moves[id] = { id, frames: b.frames, cancel: f1 + 10, tell: f0, lunge: b.lunge, hits: [{ f: [f0, f1], every: 0, hitstop: 3, ...hit }], next, charge };
    kit.clips[id] = kit.clips[clipId];
  }
  return kit;
}

// ---------------------------------------------------------------- kit: the class set + the ally string, the second saber, an alert idle
const kit = allyString(npcKit(DEF, SWORD), [
  ['n1', 'slash', { shape: 'arc', range: 2.8, ang: 120, dmg: 22, kb: 'push', force: 5 }, 'n2', 'c1'],
  ['n2', 'whirl', { shape: 'circle', range: 2.8, dmg: 18, kb: 'spin', force: 4, every: 11 }, 'n1', 'c1'],
  ['c1', 'wave', { shape: 'line', len: 5, width: 1.4, dmg: 26, kb: 'blow', force: 8, hitstop: 4 }],
]);
// the left saber: the weapon meshes again on the left hand, held forward and low (blade turned 40° down from the
// forearm's forward axis, the edge out)
const LEFT_Q = new THREE.Quaternion().setFromEuler(new THREE.Euler(40 * Math.PI / 180, 0, Math.PI / 2));
const model = kit.model;
kit.model = (rig) => {
  const m = model(rig);
  for (let i = 0; m.meshes['weapon' + i]; i++) {
    const w = m.meshes['weapon' + i], s = new THREE.Mesh(w.geometry, w.material);
    s.castShadow = true; s.receiveShadow = true; s.quaternion.copy(LEFT_Q);
    rig.joints.handL.add(s); m.meshes['sabreL' + i] = s;
  }
  return m;
};
// idle: the guard's stance, feet apart, the right saber up before her, the left hand low and free with its own saber
const READY = { hips: [0, 0.84, 0], hipsR: [2, -24, 0], spine: [6, -6, 0], chest: [4, -6, 0], head: [0, 8, 0],
  footL: [0.17, 0.08, 0.14, 0, 18], footR: [-0.19, 0.08, -0.14, 0, -30],
  spear: [-0.28, 1.08, 0.3, 8, 22, 90], gripR: 0, gripL: 0.5, lfree: 1, armL: [-14, 0, 30, 60] };
kit.clips.idle = clip([[0, RP(READY)], [0.5, RP({ ...READY, hips: [0, 0.832, 0], chest: [2, -6, 0] })], [1, RP(READY)]], true);

// 20×20 portrait: the tight black bun bound in red, the red brow cord, a lean face with level alert eyes; the black
// lamellar laced red, the red collar and shoulder straps, the bronze boss on the breastplate
const FACE = [
  '....................',
  '........KRRK........',
  '.......KKRRKK.......',
  '......KKKKKKKK......',
  '.....KKKKKKKKKK.....',
  '....KKKKKKKKKKKK....',
  '....RRRRRRRRRRRR....',
  '....KSSSSSSSSSSK....',
  '....KSHHHSSHHHSK....',
  '....KSWEESSEEWSK....',
  '....KSSSSssSSSSK....',
  '....KhSSSssSSShK....',
  '.....SSSSSSSSSS.....',
  '......SSSMMSSS......',
  '.......sSSSSs.......',
  '........sSSs........',
  '...KKRRRRSSRRRRKK...',
  '..KRKKKKRRRRKKKKRK..',
  '.KKKrKKKKbbKKKKrKKK.',
  'KKrKKKrKKbbKKrKKKrKK',
];
const PAL = { K: '#161212', R: '#b0221a', r: '#6a140e', S: '#cc9670', s: '#a06c4c', h: '#dcaa84', H: '#0f0c0c', W: '#ece2d2', E: '#100a08',
  M: '#8c3c30', b: '#d8aa5a' };

export const NPC = {
  id: 'nucanve', name: { zh: 'Nữ Cận Vệ', en: 'The Queen\'s Guard' }, courtesy: { zh: '女衛', en: 'Guard of the inner palace' }, seal: '女衛',
  portrait: { face: FACE, pal: PAL }, kit,
};
