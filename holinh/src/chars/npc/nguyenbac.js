// Nguyễn Bặc (阮匐), Định Quốc Công — the founder's oldest companion, who opens the sealed order in 979 (Màn II: ally /
// escort; a speaker everywhere); polearm class. NPC entry (contract: src/chars/npc/index.js) with his own model def
// (src/chars/npc/kit.js header; fine voxels, chars/parts.js FV), a size up (scale 1.1), and a 20×20 portrait.
// suquan's young Nguyễn Bặc (suquan/src/chars/nguyenbac/model.js) a dozen years on and grey with them: the same broad
// dark-tan face and flat nose, the brow still knotted, but the beard and moustache iron-grey and grown long and square,
// the deep-set eyes steady under grey brows. No khăn now: the grey hair drawn up into a court topknot under a small
// bronze crown with a bronze pin across it. Dark bronze court armor over a dark robe: a cuirass of dark-bronze plates
// with brighter lips and the horned bronze boss of his youth on the breast, bronze-capped shoulder guards, a dark
// robe's crossed collar (bronze-edged) at the neck and its wide sleeves to the bracer; a black belt with a bronze buckle
// and, hung at the left hip, the square lacquered seal case (black lacquer, red cords, a bronze clasp) that holds the
// queen's seal; the robe's long front and back panels to the shin (chains), dark trousers, black boots. Weapon: the đại
// đao of his younger self, darker — a blackened ironwood shaft in dark-bronze rings, a dark bronze dragon head whose
// jaws hold the broad chopping blade (edge = local +Y), a jade-green tassel under the jaws.
import { npcKit } from '../../../../src/chars/npc/kit.js';
import * as POLEARM from '../../../../src/chars/npc/polearm.js';
import { vox, B, P, md, mirX, lamellar } from '../../../../src/hero/model.js';
import { hash01 } from '../../../../src/core/rng.js';
import { FV, glove, bracer, boot, symH } from '../../../../src/chars/parts.js';

const HV = 0.013;
const C = {
  skin: 0x9e6644, skinD: 0x744830, skinH: 0xb47a56, lip: 0x5a2a1e, mouth: 0x1e0a08, eye: 0x0c0806, iris: 0x2a1a0e, scl: 0xe0d4c0,
  grey: 0x8a8884, greyD: 0x5e5c58, greyL: 0xb6b4ae,                     // iron-grey hair and beard
  bronze: 0x7a5a2a, bronzeD: 0x4a3618, bronzeL: 0xb08a48,               // dark bronze court armor
  robe: 0x26201e, robeD: 0x16120f, robeL: 0x3a322c,                     // the dark robe
  lac: 0x14100c, red: 0x9a2418, redD: 0x5e1610,
  jade: 0x2e8a5c, jadeD: 0x1c5a3a, jadeL: 0x5cc08a,
  pants: 0x1e1a16, pantsD: 0x12100c, boot: 0x14110e, bootD: 0x0a0806, leather: 0x2e2018, leatherL: 0x4a3426,
  wood: 0x241812, woodH: 0x342418, raw: 0x6a5640, rawD: 0x4a3c2c,
  steel: 0xaab2bc, edge: 0xeef2f6, steelD: 0x5a626c,
};
const robe = (x, y, z) => (md(x * 2 + y + z * 3, 11) === 0 ? C.robeL : md(x - y * 2 + z, 9) === 0 ? C.robeD : C.robe);
/** Dark-bronze plate lamellar (the lips brighter bronze). */
const plates = (a, b, o) => lamellar(a, b, { base: C.bronze, ...o });
/** The bronze boss with the buffalo-horn crescent of his youth, on a front face at z, centred (0, cy), radius 5. */
const boss = (cy, z) => {
  const out = [];
  for (let y = -5; y <= 5; y++) for (let x = -5; x <= 5; x++) {
    const r = Math.hypot(x, y);
    if (r > 5.4) continue;
    const horn = Math.abs(Math.hypot(x, y + 3.2) - 4.2) < 0.75 && y > -2.5;
    out.push(B([x, y + cy, z], [x + 1, y + cy + 1, horn || r < 1.3 ? z + 3 : z + 2], horn ? C.bronzeL : r > 4.4 ? C.bronzeD : r < 1.3 ? C.bronzeL : C.bronze));
  }
  return out;
};

// ---------------------------------------------------------------- body (FV, centred on the joints)
function torso() {
  const T = {};
  // hips: the dark robe below the belt (front / back panels: chains), a black belt with a bronze buckle, bronze faulds at
  // the sides, the square lacquered seal case hung at the left hip on red cords
  T.hips = [
    B([-13, -10, -9], [13, 6, 9], C.robeD),
    B([-15, -18, -11], [15, -1, 11], (x, y, z) => (Math.abs(z) > 6 && y < -5 ? null : y === -18 ? C.bronzeD : robe(x, y, z))),
    ...[-1, 1].flatMap((sx) => plates([10, -14, -8], [16, -1, 8], { rowH: 3, pw: 3, trim: C.bronzeL, jag: true, lipZ: false }).map((b) => mirX(b, sx))),
    B([-16, -1, -12], [16, 4, 12], (x, y, z) => (y === -1 || y === 3 ? C.bronzeD : md(x + z, 5) === 0 && y === 1 ? C.bronzeL : C.lac)),
    B([-4, -2, 11], [5, 5, 13], (x, y) => (y === -2 || y === 4 ? C.bronzeD : C.bronze)), P([-2, 0, 12], [3, 3, 13], C.bronzeL),
    // the seal case: a lacquered cube with a bronze-edged lid and clasp, slung on red cords from the belt
    B([16, -2, 4], [18, 3, 6], C.red), B([15, -12, 1], [23, -3, 10], (x, y, z) => (y === -4 ? C.bronzeD : (x === 15 || x === 22 || z === 1 || z === 9) && y > -5 ? C.bronze
      : md(x + y + z, 9) === 0 ? C.robeL : C.lac)),
    B([18, -8, 10], [20, -5, 11], C.bronzeL), B([22, -10, 3], [23, -5, 8], (x, y, z) => (md(y + z, 2) ? C.red : C.redD)),
  ];
  T.spine = [
    B([-12, -6, -10], [12, 14, 10], C.robeD),
    ...plates([-12, -4, -10], [12, 10, 10], { rowH: 2, pw: 3, trim: C.bronzeL }),
    B([-13, 10, -11], [13, 14, 11], (x, y) => (y === 10 ? C.bronzeD : md(x, 5) === 0 ? C.bronzeL : C.lac)),
  ];
  // chest: a deep cuirass of dark bronze plates, the horned boss, the robe's crossed collar edged in bronze at the neck
  const collar = (x, y, z) => {
    if (z < 6) return y === 21 ? C.bronzeL : C.robe;
    const d = x + (y - 15) * 0.9;
    if (y >= 15 && x > -(y - 14) && x < y - 14 && d < 3) return C.robeD;
    return Math.abs(d - 3) < 1.2 ? C.bronzeL : C.robe;
  };
  T.chest = [
    B([-16, -4, -12], [16, 19, 12], C.robeD),
    ...plates([-15, -3, -12], [15, 5, 12], { rowH: 2, pw: 3, trim: C.bronzeD }),
    ...plates([-16, 5, -13], [16, 17, 13], { rowH: 3, pw: 4, trim: C.bronzeL }),
    ...boss(10, 13),
    ...[-1, 1].flatMap((sx) => [mirX(B([9, 15, -14], [14, 19, 14], C.bronzeD), sx), mirX(B([10, 16, -15], [13, 18, 15], C.bronzeL, true), sx)]),
    B([-9, 16, -9], [9, 22, 9], collar),
    B([-6, 15, -6], [6, 25, 6], -1),
  ];
  T.neck = [B([-6, -2, -6], [6, 6, 6], C.skinD), P([-6, 1, 5], [6, 6, 6], C.skin)];
  return T;
}

function limbs(T) {
  for (const [s, sx] of [['R', -1], ['L', 1]]) {
    // the robe's wide sleeves to the bracer, a bronze band at the elbow; dark-bronze bracers; leather gloves
    T['upperArm' + s] = [
      B([-7, -24, -7], [7, 2, 7], robe), B([-8, -22, -8], [8, -8, 8], robe),
      B([-8, -24, -8], [8, -22, 8], (x, y) => (y === -23 ? C.bronzeL : C.bronzeD)),
    ];
    T['foreArm' + s] = [...bracer(C.robeD, [C.bronze, C.bronzeD, C.bronzeL]), B([-6, -6, -6], [7, 1, 7], (x, y, z) => (Math.abs(x) + Math.abs(z) > 9 ? null : robe(x, y, z)))];
    T['hand' + s] = glove(sx, C.leather, C.leatherL);
    // dark trousers, a bronze tasset on the outer thigh
    T['thigh' + s] = [
      B([-8, -36, -8], [8, 2, 8], (x, y) => (md(y + (x & 1), 6) === 0 ? C.pantsD : C.pants)),
      ...plates([-4, -18, -8], [10, 0, 9], { rowH: 3, pw: 4, trim: C.bronzeL, jag: true }).map((b) => mirX(b, sx)),
    ];
    // black boots to the knee with a bronze top band
    T['shin' + s] = [
      B([-6, -34, -6], [6, 0, 6], C.boot),
      B([-7, -8, -7], [7, 2, 7], C.pants), B([-7, -10, -7], [7, -8, 7], C.bronzeD),
      B([-5, -28, 5], [5, -11, 7], (x, y) => (md(y, 4) === 0 ? C.bootD : C.boot)),
      B([-7, -34, -7], [7, -32, 7], C.bootD),
    ];
    T['foot' + s] = boot(C.boot, C.bootD, C.bootD, { trim: C.bronzeD });
  }
  return T;
}

/** Bronze-capped court shoulder guards: two tiers of dark-bronze plates, a raised rim. Authored with +x outward. */
const pauldron = (sx) => [
  B([-4, 8, -9], [9, 12, 9], (x, y, z) => (y === 8 || Math.abs(z) === 9 ? C.bronzeD : md(x + z, 4) === 0 ? C.bronzeL : C.bronze)),
  B([-2, 12, -7], [7, 14, 7], C.bronze),
  ...plates([-2, 1, -11], [11, 8, 11], { rowH: 3, pw: 4, trim: C.bronzeL }),
  ...plates([2, -6, -11], [13, 1, 11], { rowH: 3, pw: 4, trim: C.bronzeL, jag: true }),
].map((b) => mirX(b, sx));

// ---------------------------------------------------------------- head (HV voxels, chin y 0, columns centred on 0)
function head() {
  const grey = (x, y, z) => (md(x * 3 + y * 7 + z, 11) === 0 ? C.greyL : md(x * 2 + z, 5) === 0 ? C.greyD : C.grey);     // beard: long strands
  const hair = (x, y, z) => (md(x * 3 + y, 4) === 0 ? C.greyD : md(x * 5 + z + y, 13) === 0 ? C.greyL : C.grey);          // combed back
  return [
    // broad skull, a heavy jaw, wide cheekbones, ears; the lines of age under the eyes
    B([-7, 2, -6], [8, 14, 6], C.skin),
    B([-7, -1, -5], [8, 4, 5], C.skin),
    ...symH(4, 7, 5, 7, 5, 6, C.skinH), ...symH(3, 6, 5, 6, 5, 6, C.skinD),
    ...symH(7, 8, 6, 10, -2, 1, C.skinD),
    // deep-set, unwavering eyes under knotted grey brows
    ...symH(2, 5, 7, 8, 5, 6, C.scl), ...symH(2, 4, 7, 8, 5, 6, C.iris), ...symH(2, 3, 7, 8, 5, 6, C.eye),
    ...symH(1, 6, 8, 9, 5, 6, C.skinD),
    ...symH(1, 3, 9, 11, 5, 7, C.greyD, false), ...symH(3, 7, 10, 12, 5, 7, C.grey, false),
    P([0, 9, 5], [1, 12, 6], C.skinD), P([-3, 12, 5], [4, 13, 6], C.skinD),                    // the frown, a furrow
    // broad flat nose
    B([-2, 5, 6], [3, 9, 8], C.skin), B([-2, 4, 6], [3, 6, 9], C.skinH), P([-2, 4, 8], [-1, 5, 9], C.mouth), P([2, 4, 8], [3, 5, 9], C.mouth),
    // iron-grey moustache and a long square beard falling to the collar, sideburns up to the hair
    B([-8, -7, -3], [9, 4, 7], (x, y, z) => (y >= 1 && (z > 3 || Math.abs(x) < 6) ? null : y < -3 && Math.abs(x) > 5 ? null : hash01(x, y, z) < 0.1 && y < -4 ? null : grey(x, y, z))),
    B([-4, 3, 6], [5, 4, 8], grey), ...symH(3, 6, 0, 4, 5, 8, C.grey, false),
    P([-2, 1, 6], [3, 2, 7], C.lip), P([-1, 2, 6], [2, 3, 7], C.mouth),
    B([-8, 4, -4], [-7, 12, 2], grey), B([8, 4, -4], [9, 12, 2], grey),
    // the grey hair combed back from a high brow, drawn up into the topknot
    B([-8, 11, -8], [9, 17, 3], hair), B([-7, 17, -7], [8, 19, 2], hair), B([-8, 4, -8], [9, 12, -5], hair),
    B([-8, 12, 2], [9, 14, 6], (x, y) => (y === 12 ? null : hair(x, y, 0))),
    B([-3, 18, -5], [4, 23, 1], hair),
    // the small bronze crown over the knot and the bronze pin across it
    B([-4, 19, -6], [5, 22, 2], (x, y, z) => (y === 21 ? C.bronzeL : md(x + z, 3) === 0 ? C.bronzeL : C.bronze)),
    B([-1, 22, 0], [2, 24, 2], C.bronzeL),
    B([-8, 21, -3], [9, 22, -1], C.bronzeL), B([-9, 20, -3], [-8, 23, -1], C.bronze), B([8, 20, -3], [9, 23, -1], C.bronze),
  ];
}

// ---------------------------------------------------------------- đại đao (weapon joint: shaft +Z, origin = rear grip)
function weaponGeo() {
  // shaft at 0.02 (z −0.9 … 1.4): blackened ironwood, dark-bronze rings, worn rawhide grips, a bronze butt spike
  const grip = (z) => (z > -6 && z < 8) || (z > 25 && z < 38);
  const shaft = vox([
    B([-1, -1, -42], [1, 1, 70], (x, y, z) => (grip(z) ? (md(z + x + y, 2) ? C.raw : C.rawD) : md(z + x, 6) === 0 ? C.woodH : C.wood)),
    ...[-36, -14, 16, 46, 62].map((z) => B([-2, -2, z], [2, 2, z + 2], (x, y, zz) => (zz === z ? C.bronzeL : C.bronzeD))),
    B([-2, -2, -42], [2, 2, -39], C.bronze), B([-1, -1, -46], [1, 1, -42], C.bronzeL),
  ], 0.02, { jitter: 0.04, ao: 0.3 });
  // the dark bronze dragon head at 0.012 (z 1.36 … 1.6): ringed neck, brow and snout, jaws round the blade's root, jade eyes
  const carve = (x, y, z) => (md(z + Math.abs(x) + y, 3) === 0 ? C.bronzeD : md(x + z, 5) === 0 ? C.bronzeL : C.bronze);
  const dragon = vox([
    B([-3, -3, 113], [3, 3, 121], (x, y, z) => (md(z, 3) === 0 ? C.bronzeD : C.bronze)),
    B([-5, -6, 121], [5, 5, 129], carve),
    B([-4, -7, 129], [4, -1, 135], carve), B([-4, 3, 129], [4, 6, 133], C.bronzeD),
    B([-3, -1, 129], [3, 3, 133], C.mouth),
    B([-6, -4, 124], [-5, -2, 127], C.jadeL), B([5, -4, 124], [6, -2, 127], C.jadeL),
    B([-1, -10, 116], [1, -6, 129], (x, y, z) => (md(z + y, 3) ? C.bronzeL : null)),
    B([-6, -8, 117], [-4, -5, 122], C.bronzeD), B([4, -8, 117], [6, -5, 122], C.bronzeD),
  ], 0.012, { jitter: 0.05, ao: 0.35 });
  // the broad blade at 0.011 (z 1.46 … 2.2): a straight back curving at the point, the belly swelling deep, a bright edge
  // band, a dark line along the back
  const bv = 0.011, z0 = Math.round(1.46 / bv), z1 = Math.round(2.2 / bv), L = z1 - z0, boxes = [];
  for (let z = z0; z < z1; z++) {
    const u = (z - z0) / L, back = Math.round(-2 - 9 * Math.pow(Math.max(0, u - 0.6) / 0.4, 2));
    const f = back + Math.max(1, Math.round(22 * Math.pow(Math.sin(Math.PI * (0.1 + 0.9 * u)), 0.6) * (1 - 0.2 * u) + 3 * (1 - u)));
    boxes.push(B([-1, back, z], [1, f, z + 1], (_, y) => (u < 0.05 ? C.bronze : y >= f - 2 ? C.edge : y <= back + 1 ? C.steelD : C.steel)));
  }
  const blade = vox(boxes, bv, { jitter: 0.03, ao: 0.2 });
  return [{ geo: shaft, mat: 'body' }, { geo: dragon, mat: 'metal' }, { geo: blade, mat: 'blade' }];
}

// ---------------------------------------------------------------- chain segments (local −Y along the chain)
/** Robe panel w half-width: the dark robe, bronze-edged, a bronze hem. */
const panel = (w) => (i, n) => vox([B([-w, -9, 0], [w, 0, 1], (x, y) => (i === n - 1 && y <= -8 ? (y === -9 && x & 1 ? null : C.bronzeL)
  : x === -w || x === w - 1 ? C.bronzeD : robe(x, y, i)))], FV * 1.2, { off: [0, 0, -0.5], jitter: 0.05, ao: 0.2 });
/** Jade silk tassel strand. */
const tassel = (i, n) => vox([B([-1, -6, -1], [2, 0, 2], (x, y, z) => (i === n - 1 && y < -3 && hash01(x + 3, z + 3, y) < 0.4 ? null
  : md(x + z, 3) === 0 ? C.jadeL : md(x - z, 4) === 0 ? C.jadeD : C.jade))], 0.012, { jitter: 0.06, ao: 0.2 });

const DEF = {
  scale: 1.1,
  reach: { tip: 2.2, butt: 0.92 },
  build: () => ({ parts: limbs(torso()), head: head(), bv: FV, hv: HV, pauldron, weapon: weaponGeo() }),
  chains() {
    const legs = [['thighL', 0.03], ['thighR', 0.03], ['kneeL', 0.03], ['kneeR', 0.03]];
    return [
      // the robe's long front and back panels, to the shin
      { joint: 'hips', anchor: [0, -0.02, 0.15], rest: [0, -1, 0.08], n: 5, len: 0.125, stiff: 0.14, drag: 0.16, wind: 0.4, face: [0, 0, 1], cone: 70, sway: 0.08,
        seg: panel(7), hit: legs },
      { joint: 'hips', anchor: [0, -0.02, -0.15], rest: [0, -1, -0.1], n: 5, len: 0.125, stiff: 0.14, drag: 0.16, wind: 0.5, face: [0, 0, -1], cone: 70, sway: 0.1,
        seg: panel(9), hit: ['hips', ...legs] },
      // the jade tassel under the dragon's jaws
      ...Array.from({ length: 5 }, (_, k) => {
        const a = k * 1.2566 + 0.4, ox = Math.cos(a) * 0.015, oy = Math.sin(a) * 0.015;
        return { joint: 'weapon', anchor: [ox, oy, 1.34], rest: [ox * 10, oy * 5 - 1, -0.3], n: 3, len: 0.072, stiff: 0.05 + k * 0.005, drag: 0.12, wind: 0.8,
          cone: 130, sway: 0.15, face: [1, 0, 0], seg: tassel };
      }),
    ];
  },
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

// 20×20 portrait: the bronze crown and pin on the grey topknot, grey hair combed back, knotted grey brows over deep eyes,
// a dark-tan face in a long iron-grey beard; the dark robe's bronze-edged collar, dark bronze plates, the horned boss
const FACE = [
  '........BbB.........',
  '.....bBBBBBBBb......',
  '......GGGgGGG.......',
  '....GGgGGGGGgGG.....',
  '...GGGGgGGGGGGgG....',
  '...GSSSSSSSSSSSSG...',
  '...gSSSSSSSSSSSSg...',
  '..sgGGGGSSSSGGGGgs..',
  '..sSSgWEESSEEWgSSs..',
  '..SSssSSSSSSSSssSS..',
  '..GSSSSSnnnnSSSSSG..',
  '..GGSSSsmmmmsSSSGG..',
  '..GGGGGGGGGGGGGGGG..',
  '...GGGgGMMMMGgGGG...',
  '...GGGGGGGGGGGGGG...',
  '....GgGGGGGGGGgG....',
  'RRRRRbGGGgGGGGbRRRRR',
  'RHHHHHbGGGGGGbHHHHHR',
  'HhHHHHHbGGGGbHHHhHHH',
  'HHHhHHHHBbbBHHHHHhHH',
];
const PAL = { B: '#7a5a2a', b: '#b08a48', G: '#8a8884', g: '#5e5c58', S: '#9e6644', s: '#744830', W: '#e0d4c0', E: '#0c0806',
  n: '#b47a56', m: '#1e0a08', M: '#5a2a1e', R: '#26201e', H: '#5e4424', h: '#3a2a14' };

export const NPC = {
  id: 'nguyenbac', name: { zh: 'Nguyễn Bặc', en: 'Nguyễn Bặc' }, courtesy: { zh: '阮匐', en: 'Định Quốc Công' }, seal: '阮匐',
  portrait: { face: FACE, pal: PAL }, kit: allyString(npcKit(DEF, POLEARM), [
    ['n1', 'chop', { shape: 'arc', range: 3.4, ang: 70, dmg: 28, kb: 'push', force: 6, hitstop: 4 }, 'n2', 'c1'],
    ['n2', 'sweep', { shape: 'circle', range: 3.6, dmg: 24, kb: 'blow', force: 8, lift: 3, every: 8 }, 'n1', 'c1'],
    ['c1', 'charge', { shape: 'line', len: 3.2, width: 1.6, off: 0.4, dmg: 30, kb: 'blow', force: 10, hitstop: 4, every: 6 }],
  ]),
};
