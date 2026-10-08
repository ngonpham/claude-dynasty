// Máu Lạnh (冷血) — the hunters' river killer, who hunts the water roads (Màn IV, netted by the village): sword class.
// NPC entry (contract: src/chars/npc/index.js) with his own model def (src/chars/npc/kit.js header; fine voxels,
// chars/parts.js FV), compact (scale 1.02), and a 20×20 portrait.
// Look (comic token MAU_LANH, ch. 9 panels): a compact bald killer with nothing on his face — a smooth pale scalp with a
// faint sheen, no visible brows but a thin pale line, heavy-lidded narrow eyes, a straight nose, a flat closed mouth.
// Layered pale blue-grey wraps: a quilted tunic crossed right over left with a darker lapel, short quilted shoulder
// pads, a dark sash wound twice and knotted (its two ends hang), the tunic's front and back skirts hanging below it;
// fitted sleeves, the forearms bound in dark cloth wraps, bare pale hands; dark loose trousers bound at the shin in
// wraps, soft dark boots. Weapons: a hooked blade in the sword hand — a long straight blade ending in a hook bent back
// over the spine, a crescent guard round the hand, a dark wrapped grip and a spiked pommel — and a second, shorter hook
// held in the left fist as a static model part (on the hand joint: it goes wherever the left hand goes), a short iron
// chain hanging from its pommel.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as SWORD from '../../../../src/chars/npc/sword.js';
import { vox, B, P, md, mirX } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, hand, boot, symH } from '../../../../src/chars/parts.js';

const HV = 0.013;
const C = {
  skin: 0xd8bca4, skinD: 0xb49a84, skinH: 0xeed8c4, scalpH: 0xf4e4d4, lip: 0x9a7668, mouth: 0x4a2c26, eye: 0x100c0c,
  scl: 0xd4cec4, brow: 0x9a8676, lid: 0xa88e7a,
  wrap: 0x62748a, wrapD: 0x435064, wrapL: 0x8a9cb0,
  dark: 0x24282e, darkD: 0x15181c, darkL: 0x383e46, sash: 0x1a1c22, sashL: 0x30343e,
  band: 0x2c3036, bandL: 0x4a5058, boot: 0x22242a, bootD: 0x121418,
  steel: 0xaab2bc, steelD: 0x5e6670, edge: 0xeaf0f6, grip: 0x1c1a18, gripH: 0x3a3430, chain: 0x5a6068, chainL: 0x8a929c,
};
const quilt = (x, y, z) => (md(x + y + z, 6) === 0 || md(x - y - z, 6) === 0 ? C.wrapD : hash01(x + 11, y, z) < 0.08 ? C.wrapL : C.wrap);
const trousers = (x, y) => (md(y + (x & 1), 7) === 0 ? C.darkL : C.dark);
/** Cloth wraps wound on a slant: a dark band every 3 voxels, the light edge of each turn. */
const wound = (dark, light) => (x, y, z) => { const f = md(y * 2 + x + (z > 0 ? 0 : 1), 6); return f === 0 ? light : f === 3 ? C.darkD : dark; };

// ---------------------------------------------------------------- body (FV, centred on the joints)
/** A diagonal lapel across the chest from (x0, y0) to (x1, y1): the dark edge of the crossed tunic. */
function lapel(x0, y0, x1, y1, zf) {
  const out = [], n = Math.abs(y1 - y0);
  for (let i = 0; i <= n; i++) {
    const y = Math.round(y0 + (y1 - y0) * i / n), x = Math.round(x0 + (x1 - x0) * i / n);
    out.push(B([x - 2, y, 9], [x + 2, y + 1, zf], C.wrapD));
  }
  return out;
}

function torso() {
  const T = {};
  // hips: the tunic over dark trousers, the dark sash wound twice, its knot on the right hip
  T.hips = [
    B([-12, -10, -8], [12, 6, 8], C.dark),
    B([-13, -9, -9], [13, -1, 9], quilt),
    B([-14, -2, -10], [14, 6, 10], (x, y) => (y === -2 || y === 2 ? C.sashL : C.sash)),
    B([-14, -1, 6], [-9, 5, 12], (x, y) => (y === 2 ? C.sashL : C.sash)),
  ];
  T.spine = [
    B([-11, -6, -9], [11, 14, 9], quilt),
    B([-12, -6, -10], [12, 2, 10], (x, y) => (y === -6 || y === 1 ? C.sashL : C.sash)),
  ];
  // chest: the quilted tunic, crossed right over left (the dark lapel runs from his left shoulder down to his right
  // ribs), a second layer standing at the collar
  T.chest = [
    B([-14, -4, -10], [14, 18, 10], quilt),
    B([-15, 6, -11], [15, 17, 11], quilt),
    ...lapel(8, 17, -9, -2, 12),
    B([-8, 15, -8], [8, 21, 8], (x, y) => (y === 20 ? C.wrapL : C.wrapD)),
    B([-6, 15, -6], [6, 25, 6], -1),
  ];
  T.neck = [B([-5, -2, -5], [5, 6, 5], C.skinD), P([-5, 1, 4], [5, 6, 5], C.skin)];
  return T;
}

/** The off-hand hook, authored on the hand joint at FV: a grip through the fist along +Z, a short blade, the hook bent
 *  back outward (+x) at its end, an iron ring at the pommel (the chain hangs from it). */
function offHook() {
  const out = [B([2, -1, -6], [4, 1, 6], (x, y, z) => (md(z, 2) ? C.grip : C.gripH)), B([1, -2, 6], [5, 2, 8], C.steelD),
    B([1, -2, -9], [5, 2, -6], (x, y, z) => (z === -9 ? C.chainL : C.chain))];
  for (let z = 8; z < 34; z++) out.push(B([2, -1, z], [5, 1, z + 1], (x) => (x === 2 ? C.edge : x === 4 ? C.steelD : C.steel)));
  const cx = 8.5, cz = 34;
  for (let z = 30; z < 40; z++) for (let x = 2; x < 16; x++) {
    const r = Math.hypot(x + 0.5 - cx, z + 0.5 - cz);
    if (r < 3.4 || r > 6.4 || (z < cz && x < 12)) continue;
    out.push(B([x, -1, z], [x + 1, 1, z + 1], r > 5.4 ? C.edge : C.steel));
  }
  return out;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    T['upperArm' + s] = [
      B([-6, -24, -6], [6, 2, 6], (x, y, z) => (Math.abs(x + 0.5) + Math.abs(z + 0.5) > 9 ? null : quilt(x, y, z))),
    ];
    T['foreArm' + s] = [
      B([-4, -23, -4], [5, 1, 5], C.wrap),
      B([-5, -21, -5], [6, -2, 6], (x, y, z) => (Math.abs(x - 0.5) + Math.abs(z - 0.5) > 8 ? null : wound(C.band, C.bandL)(x, y, z))),
    ];
    T['hand' + s] = sx > 0 ? [...hand(sx, C.skin, C.skinD), ...offHook()] : hand(sx, C.skin, C.skinD);
    T['thigh' + s] = [
      B([-8, -36, -8], [8, 2, 8], trousers),
      B([-9, -30, -9], [9, -18, 9], (x, y, z) => (Math.abs(x + 0.5) + Math.abs(z + 0.5) > 14 ? null : trousers(x, y))),   // loose at the knee
    ];
    T['shin' + s] = [
      B([-6, -34, -6], [6, 0, 6], C.dark),
      B([-7, -30, -7], [7, -4, 7], (x, y, z) => (Math.abs(x + 0.5) + Math.abs(z + 0.5) > 11 ? null : wound(C.wrapD, C.wrap)(x, y, z))),
      B([-6, -34, -6], [6, -30, 6], C.boot),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD);
  }
  return T;
}

/** Short quilted shoulder pads (cloth, not armour). +x = outward. */
function pauldron(sx) {
  return [
    B([-4, 3, -9], [7, 11, 9], (x, y, z) => (y === 3 ? C.wrapD : quilt(x, y, z))),
    B([2, -3, -10], [9, 6, 10], (x, y, z) => (y === -3 ? C.wrapD : quilt(x, y, z))),
  ].map((b) => mirX(b, sx));
}

// ---------------------------------------------------------------- head (HV voxels, chin y 0)
function head() {
  return [
    // a smooth bald head, a little narrow; the scalp catches the light
    B([-6, 2, -6], [7, 14, 6], C.skin),
    B([-5, 14, -5], [6, 16, 5], C.skin), B([-3, 16, -3], [4, 17, 3], C.skin),
    B([-5, 0, -4], [6, 3, 5], C.skin), B([-3, -1, -2], [4, 1, 5], C.skin),
    B([-7, 6, -2], [8, 9, 1], C.skinD),
    P([-2, 14, -3], [3, 17, 4], C.scalpH), P([-4, 12, 0], [5, 15, 6], C.skinH),
    ...symH(3, 6, 4, 6, 5, 6, C.skinD),
    // no brows to speak of, heavy lids over narrow eyes, a straight nose, a flat closed mouth
    ...symH(2, 5, 10, 11, 5, 6, C.brow),
    ...symH(2, 5, 7, 8, 5, 6, C.scl), ...symH(2, 4, 7, 8, 5, 6, C.eye), ...symH(1, 5, 8, 9, 5, 6, C.lid),
    B([0, 5, 6], [1, 9, 7], C.skinH), P([-1, 5, 5], [2, 6, 6], C.skinD),
    P([-2, 2, 4], [3, 3, 6], C.lip), P([-1, 2, 4], [2, 3, 6], C.mouth),
  ];
}

// ---------------------------------------------------------------- the hooked blade (weapon joint: blade +Z, origin = the grip)
function weaponGeo() {
  const hilt = vox([
    B([-1, -1, -9], [1, 1, 8], (x, y, z) => (md(z + x + y, 2) ? C.grip : C.gripH)),
    B([-2, -2, -11], [2, 2, -9], C.steelD),
    ...[0, 1, 2, 3].map((k) => { const t = k < 2 ? -1 : 0; return B([t, t, -12 - k * 2], [1, 1, -10 - k * 2], k === 3 ? C.edge : C.steel); }),   // the pommel spike
  ], 0.01, { jitter: 0.04, ao: 0.3 });
  const bv = 0.008, boxes = [];
  // the crescent guard round the hand: a moon across the blade's root, its horns pointing forward
  for (let x = -9; x < 10; x++) {
    const z = 10 + Math.round((x * x) / 14);
    boxes.push(B([x, -1, z], [x + 1, 1, z + 2], Math.abs(x) > 7 ? C.edge : C.steelD));
  }
  // the straight blade (z 0.1 … 0.74), then the hook bent back over the spine (toward −X) and down again
  const z0 = Math.round(0.1 / bv), z1 = Math.round(0.74 / bv);
  for (let z = z0; z < z1; z++) for (let x = -2; x < 2; x++) boxes.push(B([x, -1, z], [x + 1, 1, z + 1], x === 1 ? C.edge : x === -2 ? C.steelD : C.steel));
  const cx = -6, cz = z1;
  for (let z = cz - 8; z < cz + 11; z++) for (let x = -18; x < 3; x++) {
    const r = Math.hypot(x + 0.5 - cx, z + 0.5 - cz);
    if (r < 4 || r > 8 || (z < cz && x > cx - 3)) continue;
    boxes.push(B([x, -1, z], [x + 1, 1, z + 1], r > 7 ? C.edge : C.steel));
  }
  const blade = vox(boxes, bv, { jitter: 0.02, ao: 0.15 });
  return [{ geo: hilt, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
const skirt = (w) => (i, n) => vox([B([-w, -8, 0], [w, 0, 1], (x, y) => (i === n - 1 && y === -8 && x & 1 ? null
  : x === -w || x === w - 1 ? C.wrapD : quilt(x, y + i * 8, 0)))], 0.015, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.18 });
const sashEnd = (i, n) => vox([B([-2, -7, 0], [2, 0, 1], (x, y) => (i === n - 1 && y < -5 && x & 1 ? null : y === -1 ? C.sashL : C.sash))],
  0.014, { off: [0, 0, -0.5], jitter: 0.04, ao: 0.18 });
const link = (i) => vox([B([-1, -4, -1], [1, 0, 1], (x, y, z) => ((i & 1 ? Math.abs(x + 0.5) : Math.abs(z + 0.5)) < 1 && y > -4 && y < -1 ? null : C.chainL)),
  B([-1, -4, -1], [1, -3, 1], C.chain)], 0.008, { jitter: 0.03, ao: 0.2 });

export const DEF = {
  scale: 1.02,
  reach: { tip: 0.82, butt: 0.15 },
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains: () => [
    // the tunic's front and back skirts below the sash, the sash's two ends from the knot on the right hip
    { joint: 'hips', anchor: [0, -0.07, 0.12], rest: [0, -1, 0.1], n: 4, len: 0.12, stiff: 0.12, drag: 0.14, wind: 0.5, face: [0, 0, 1], cone: 70, sway: 0.08,
      seg: skirt(6), hit: [['thighL', 0.02], ['thighR', 0.02], ['kneeL', 0.02], ['kneeR', 0.02]] },
    { joint: 'hips', anchor: [0, -0.07, -0.12], rest: [0, -1, -0.1], n: 4, len: 0.12, stiff: 0.12, drag: 0.14, wind: 0.5, face: [0, 0, -1], cone: 70, sway: 0.08,
      seg: skirt(6), hit: [['thighL', 0.02], ['thighR', 0.02], ['kneeL', 0.02], ['kneeR', 0.02]] },
    ...[-0.13, -0.1].map((x, k) => ({ joint: 'hips', anchor: [x, 0.0, 0.1 + k * 0.02], rest: [-0.2, -1, 0.15], n: 4, len: 0.09, stiff: 0.1, drag: 0.15, wind: 0.8,
      face: [0, 0, 1], cone: 80, sway: 0.15, seg: sashEnd, hit: [['thighR', 0.02], ['kneeR', 0.02]] })),
    // a short iron chain from the off-hand hook's pommel
    { joint: 'handL', anchor: [0.04, 0, -0.11], rest: [0, -1, 0], n: 5, len: 0.032, stiff: 0.02, drag: 0.08, wind: 0.2, cone: 150, sway: 0.1, seg: link },
  ],
};

const PORTRAIT = {
  face: [
    '....................',
    '.......SSSSSS.......',
    '.....SSHHHHSSSS.....',
    '....SSSHHHSSSSSS....',
    '....SSSSSSSSSSSS....',
    '...sSSSSSSSSSSSSs...',
    '...sSSSSSSSSSSSSs...',
    '...sSbbbSSSSbbbSs...',
    '..ssSllllSSllllSss..',
    '..ssSWEESSSSEEWSss..',
    '...sSSSSSSSSSSSSs...',
    '...sSSSSSssSSSSSs...',
    '....sSSSSSSSSSSs....',
    '....sSSSMMMMSSSs....',
    '.....sSSSSSSSSs.....',
    '......sssSSsss......',
    '...wwwDsssssDwww....',
    '..wwqwwDDDDDDwwqww..',
    '.wwqwwqwwDDwwqwwqww.',
    'wqwwqwwqwDDwwqwwqwwq',
  ],
  pal: { S: '#d8bca4', s: '#b49a84', H: '#f4e4d4', b: '#9a8676', l: '#a88e7a', W: '#d4cec4', E: '#100c0c', M: '#9a7668',
    w: '#62748a', q: '#435064', D: '#24282e' },
};

export const NPC = {
  id: 'maulanh', name: { zh: 'Máu Lạnh', en: 'Máu Lạnh' }, courtesy: { zh: '冷血', en: 'the river hook' }, seal: '冷血',
  portrait: PORTRAIT, kit: npcKit(DEF, SWORD),
};
