// Đỗ Động Giang (≈ 967) laid out along +Z, ≈ 390 m from the Đinh siege camp to Đỗ Cảnh Thạc's hall — the river-and-marsh
// country of today's Thanh Oai: flat, waterlogged, every dry strip fortified. A DW stage of three rings, each a stubborn
// chokepoint: the bamboo palisade at the head of a causeway over the reed marsh, the rammed-earth rampart and its gate,
// the raised earthen mound of the citadel. The siege has dragged on past a year: scorched paddies, wrecked mantlets,
// burnt stilt houses, the Đinh camps' fires ringing the horizon.
//   Trại vây quân Đinh  Đinh siege camp     z -200 … -150  h 0    palisade, tents, 丁 / 萬勝 banners, drums; story start
//   Đồng chiêm          flooded paddies     z -152 …  -94  h 0    dikes, flooded cells either side (props + build water),
//                                                               the Đinh siege line's wrecked mantlets, chông in the mud
//   Đầm lau             reed marsh          z  -98 …  -45  h 0    the water band (along x, deep z ≈ -81 … -53) crossed by a
//                                                               10 m earth causeway (ford x -5 … 5, deck +1.2 m); stilt
//                                                               houses and boats on the water; the outer bamboo palisade
//                                                               on the north bank, barricade gate 'raotre' (z -47)
//   Lũy ngoài           outer ring          z  -49 …   31  h 0    burnt hamlet, reed-marsh pools on both flanks (the reed
//                                                               ambush); free-mode arena (0, -8)
//   (rampart)           the middle ring     z   30 …   37        thành đất across the field and up both flanks, a timber
//                                                               gatehouse over gate 'cuagiua' (custom leaves, build): the
//                                                               sappers' brush fire (set 'sappers') burns it open
//   Lũy giữa            middle ring yard    z   30 …  112  h 0    the garrison: stilt houses, granary, shrine, lotus pond
//   (ramp)              up to the citadel   z  106 …  140  h 0→5  barricade gate 'cuatrong' at z 128
//   Thành nội           the citadel mound   z  134 …  190  h 5    rimmed earthen platform: Đỗ's timber hall, violet 杜
//                                                               banners, war drums, the dueling ground (anchor 'duel')
// Stormy dusk: a low smoulder of sunset under the storm, straight up the field behind the citadel; rain (build) that the
// 'calm' set eases off; every warm light is a fire. Format: src/world/maps/index.js header; helpers: ../viet.js.
import * as THREE from 'three';
import { boxesGeometry, shade } from '../../../../src/core/voxel.js';
import { makeRng, hash01 } from '../../../../src/core/rng.js';
import { lit } from '../../../../src/world/castle.js';
import { GATES, ground } from '../../../../src/world/map.js';
import { WIND } from '../../../../src/world/dressing.js';
import {
  bamboo, bambooHedge, bambooFence, reedFlags, stiltHouse, hut, banyan, areca, paddy, lotus, boat, bronzeDrum, rampart,
  templeGate, shrine, haystack, karstRange, chong, mantlet, ruinedStiltHouse, timberHall, gateHouse, stump,
} from '../viet.js';

const MZ = (x) => -68 + 3 * Math.sin(x * 0.035 + 0.8);   // the marsh's centre line z(x) (deep half width HW)
const HW = 13, WY = -0.2;                                // deep half width, water surface
const PAL_Z = -47;                                       // the outer bamboo palisade (north bank)
const RAM_Z = 33.5, RAM_H = 5, GAP = 5.5;                // middle rampart centre line, height, half gap of its gate
const MOUND_H = 5, DUEL = [0, 158], HALL = [0, 181];
// flooded paddy cells / reed-marsh pools / the lotus pond: solid (props) and dry of rock; build() lays still water on them
const POOLS = [[-50, -148, -25, -129], [-50, -122, -28, -101], [25, -150, 50, -134], [27, -127, 50, -104],
  [-62, -41, -43, 24], [43, -39, 62, 26], [18, 86, 38, 103]];
const inPool = (x, z, pad = 0) => POOLS.some(([a, b, c, d]) => x > a - pad && x < c + pad && z > b - pad && z < d + pad);
// solid footprints on walkable ground: houses [x, z] of the burnt hamlet and the garrison
const RUINS = [[-31, -24, -Math.PI / 2], [31, 6, Math.PI / 2]];
const HOUSES = [[-33, 52, -Math.PI / 2], [-34, 82, -Math.PI / 2], [33, 60, Math.PI / 2]];
const hfoot = ([x, z, yaw]) => (yaw < 0 ? [x - 5, z - 3.6, x + 6.8, z + 3.6] : [x - 6.8, z - 3.6, x + 5, z + 3.6]);

export default {
  id: 'dodong',
  name: { zh: 'Đỗ Động Giang', en: 'Đỗ Động River' },
  grid: [-124, -224, 124, 224],
  pieces: [
    { id: 'camp', rect: [-34, -200, 34, -150], h: 0, edge: 2, rise: 4 },
    { id: 'paddy', rect: [-50, -152, 50, -94], h: 0, edge: 1.5, rise: 3 },
    { id: 'marsh', rect: [-66, -98, 66, -45], h: 0, edge: 2, rise: 3 },
    { id: 'outer', rect: [-62, -49, 62, 31], h: 0, edge: 1.5, rise: 3.5 },
    { id: 'middle', rect: [-46, 30, 46, 112], h: 0, edge: 1.5, rise: 3.5 },
    { id: 'ramp', path: [[4, 106, 8.5, 0], [2, 120, 7.5, 2.2], [0.5, 134, 7.5, 4.6], [0, 140, 8, MOUND_H]], rise: 2.5 },
    { id: 'mound', ell: [0, 162, 32, 28], h: MOUND_H, edge: 1.5, drop: 999 },   // a rim all round, then the fall-away
  ],
  // the Đinh camp's front either side of its gate; the outer palisade either side of the causeway head
  carve: [[-36, -151.2, -8.5, -148.8], [8.5, -151.2, 36, -148.8], [-68, PAL_Z - 1.2, -7, PAL_Z + 1.2], [7, PAL_Z - 1.2, 68, PAL_Z + 1.2]],
  props: [...POOLS,
    [-68, RAM_Z - 3.5, -GAP, RAM_Z + 3.5], [GAP, RAM_Z - 3.5, 68, RAM_Z + 3.5],        // the rampart either side of its gate
    [-56, RAM_Z + 3.5, -47, 112], [47, RAM_Z + 3.5, 56, 112],                           // …and up both flanks
    [9, PAL_Z, 12.4, PAL_Z + 3.4], [-12.4, PAL_Z, -9, PAL_Z + 3.4],                      // the palisade's gate towers
    ...RUINS.map(hfoot), ...HOUSES.map(hfoot),
    [31.5, 72.5, 38.5, 79.5],                                                            // granary hut
    [-34.5, 94, -29.5, 106],                                                             // the clan shrine's gate (tam quan)
    [25.5, 41.5, 30.5, 46.5],                                                            // the banyan's trunk
    [-8.6, HALL[1] - 6.6, 8.6, HALL[1] + 5.6],                                           // the hall on its plinth
    [-11.8, 169.8, -8.2, 172.2], [8.2, 169.8, 11.8, 172.2], [-5.6, 171.4, -4.4, 172.6],   // war drums, the bronze drum
    [-10.5, -186.2, -5.5, -181.8],                                                       // the Đinh command table
  ],
  zones: [
    { id: 'traivay', name: { zh: 'Trại vây quân Đinh', en: 'Đinh Siege Camp' }, x: 0, z: -175, w: 68, d: 50 },
    { id: 'dongchiem', name: { zh: 'Đồng chiêm', en: 'Flooded Paddies' }, x: 0, z: -123, w: 100, d: 54 },
    { id: 'damlau', name: { zh: 'Đầm lau', en: 'Reed Marsh' }, x: 0, z: -72, w: 128, d: 48 },
    { id: 'luyngoai', name: { zh: 'Lũy ngoài', en: 'Outer Ring' }, x: 0, z: -9, w: 120, d: 78 },
    { id: 'luygiua', name: { zh: 'Lũy giữa', en: 'Middle Ring' }, x: 0, z: 72, w: 92, d: 76 },
    { id: 'thanhnoi', name: { zh: 'Thành nội', en: 'The Citadel' }, x: 0, z: 162, r: 29 },
  ],
  route: [[0, -190], [0, -150], [0, -122], [0, -96], [0, -66], [0, PAL_Z], [-4, -22], [-2, 8], [0, RAM_Z], [4, 60], [6, 88],
    [4, 106], [2, 120], [0.5, 134], [0, 148], [0, 168]],
  gates: {
    raotre: { rect: [-9, PAL_Z - 1.6, 9, PAL_Z + 1.6], name: { zh: 'Rào tre ngoài', en: 'Outer Bamboo Palisade' }, kind: 'barricade', at: [0, PAL_Z, 0, 6.6] },
    // the middle gate: a timber gate under its gatehouse (build() swings / burns the leaves; no kit barricade)
    cuagiua: { rect: [-7.5, RAM_Z - 2.2, 7.5, RAM_Z + 2.2], name: { zh: 'Cổng lũy giữa', en: 'Middle Rampart Gate' }, kind: 'barricade', at: [0, RAM_Z, 0, GAP] },
    cuatrong: { rect: [-11, 126.5, 12, 129.5], name: { zh: 'Cổng thành nội', en: 'Citadel Gate' }, kind: 'barricade', at: [1.1, 128, 0, 8] },
  },
  // causeway: the deck's middle · palisade: its gate · gate2: the middle gate's outer face (the sappers' post is
  // ['gate2', 0, -5]) · ramp: the citadel gate · duel: the dueling ground before the hall · hall: the hall's steps
  anchors: { causeway: [0, -67], palisade: [0, PAL_Z], gate2: [0, RAM_Z - 3.5], ramp: [1.1, 128], duel: DUEL, hall: [0, HALL[1] - 7] },
  // story: at the head of the Đinh van inside the camp gate, the paddies, the marsh and the far citadel up the lane;
  // free: the outer ring
  spawn: { story: { x: 0, z: -166, yaw: 0, tilt: -0.08 }, free: { x: 0, z: -8, yaw: 0 } },
  water: { along: 'x', c: MZ, dc: (x) => 3 * 0.035 * Math.cos(x * 0.035 + 0.8), hw: HW, bed: [1.6, 0.45], y: WY,
    fords: [[-5, 5, -1.2]], stones: 0, tint: { deep: 0x0c1216, shallow: 0x2a3430, sun: [0.85, 0.5, 0.3] } },
  // stormy dusk: the sun a smouldering slot under the cloud deck up the field (behind the citadel), slate haze close in
  sky: {
    sunElev: 0.03, sunAz: 0.2, sunCore: [2.4, 1.35, 0.7],
    haze: 0x434858, hazeWarm: 0x7a5244, glow: 0xb87048, skyMid: 0x363a4a, skyTop: 0x0e1016,
    hznSun: 0xd0703a, hznAway: 0x4c3c46, cloudRose: 0x5e3e3e, cloudShade: 0x15171f, cloudLit: 0xa86c4c,
    dust: [10, 42, 1.4, 0.07], dustLit: 0x6e5248, dustShade: 0x2e3242, apCool: 0x4e566e,
  },
  fog: [24, 215],
  light: { hemi: [0x66708a, 0x2e2622, 2.0], sun: [0xd88a58, 1.7], rim: [0xc87a4a, 1.1], dir: [0.25, 0.55, 0.8], fire: 0xff7a30,
    fill: [-400, -390, 0.7] },
  post: { exposure: 1.55, sat: 1.06, bloom: 0.75, rays: 0.35, rayTint: [1.0, 0.62, 0.36], shadowTint: [0.8, 0.9, 1.2], highTint: [1.12, 0.98, 0.84] },
  castle: null,
  terrain: {
    pave: (x, z) => -0.5 + (Math.hypot(x - DUEL[0], z - DUEL[1]) < 13 ? 1.1 : 0)                   // country tracks; the dueling ground
      + (Math.hypot(x, z + 172) < 9 ? 0.6 : 0),                                                     // the camp's muster square
    bare: (x, z) => inPool(x, z, 1) || (z < -150 && Math.abs(x) < 34) || (z > 130 && z < 192 && Math.abs(x) < 33)
      || (z > 30 && z < 112 && Math.abs(x) < 46 && Math.abs(x) > 12),
    rock: (h, x, z) => h - (z > 108 ? Math.min(MOUND_H, (z - 108) / 6) : 0) - 2,
    scorch: { n: 40, area: [-48, -150, 48, 110], spots: [[-31, -24, 1.2], [31, 6, 1.1], [0, PAL_Z - 2, 1.0], [0, RAM_Z - 6, 1.1], [-20, -138, 0.9], [18, -116, 0.9]] },
    rubble: [-46, -196, 46, 186],
    pines: [400, 500],
    cliff: { rock: 0x5c4a3a, dark: 0x3a2e26, top: 0x4c5a30, moss: 0x3c4a2a, grassy: 0x4e5e32 },   // muddy dikes with grass tops
    mountains: { peakA: -1.1, peak: 16 },                                                           // Ba Vì far off to the west
  },
  // burning wrecks: the siege's leftovers in the paddies, the burnt hamlet, the rampart foot
  fires: [[-20, -138, 1.1], [18, -116, 1.2], [-15, -104, 1.0], [-26, -10, 1.3], [24, -30, 1.1], [27, 16, 1.2], [-22, 60, 1.0], [24, 110, 1.0]],
  lightSites: [[-7, 1.9, -156, 30, 11], [7, 1.9, -156, 30, 11], [-12, 1.9, -180, 26, 10], [-20, 2.2, -138, 28, 11], [18, 2.2, -116, 28, 11],
    [-15, 2.2, -104, 24, 10], [-7.5, 1.9, -90, 30, 12], [7.5, 1.9, -90, 30, 12], [-2, 2.2, PAL_Z - 0.5, 30, 11], [5, 2.2, PAL_Z, 28, 11],
    [-26, 2.4, -10, 30, 12], [24, 2.2, -30, 26, 11], [27, 2.4, 16, 28, 11], [-9, 7.2, RAM_Z - 2, 26, 12], [9, 7.2, RAM_Z - 2, 26, 12],
    [-11, 1.9, 58, 26, 10], [12, 1.9, 82, 26, 10], [-22, 2.2, 60, 24, 10], [-7, 1.9, 116, 24, 10], [8, 1.9, 118, 24, 10],
    [-13, 1.9, 150, 30, 12], [13, 1.9, 150, 30, 12], [-14, 1.9, 168, 30, 12], [14, 1.9, 168, 30, 12], [0, 3.6, 175.5, 26, 10]],
  hq: [0, 176],
  minimap: { walls: [[-68, RAM_Z - 3, -GAP, RAM_Z + 3], [GAP, RAM_Z - 3, 68, RAM_Z + 3], [-54, RAM_Z + 3, -48, 112], [48, RAM_Z + 3, 54, 112]] },

  dress(k) {
    const { r, mats, props, poles, shade: sh } = k;
    const dinh = k.banner('丁', { bg: '#8a1e14', fg: '#f2d68a', border: '#3a0e08', w: 160, h: 320, seed: 31 });
    const vanthang = k.banner('萬勝', { bg: '#a3261a', fg: '#f6e2a0', border: '#e0b040', w: 160, h: 320, seed: 32 });
    const doBig = k.banner('杜', { bg: '#3a1452', fg: '#f0d58a', border: '#c8a050', w: 160, h: 320, seed: 33 });
    const doDrape = k.banner('杜', { bg: '#2a0e3c', fg: '#e8c878', border: '#8a6a30', w: 128, h: 256, tatter: false, seed: 34 });
    const reedWhite = k.banner('', { bg: '#e6dcc4', fg: '#000', border: '#b8a878', w: 64, h: 128, seed: 35 });   // Đinh reed-plume pennants
    const bigPole = (x, z, P, mat, yaw, w = 5, h = 10) => {
      const gy = k.ground(x, z), cx = Math.cos(yaw), cz = -Math.sin(yaw);
      poles.push({ s: [0.4, P, 0.4], p: [x, gy + P / 2, z], c: 0x2e1d15 }, { s: [w + 0.6, 0.3, 0.3], p: [x + cx * w / 2, gy + P - 0.5, z + cz * w / 2], r: [0, yaw, 0], c: 0x2e1d15 },
        { s: [0.3, 1.4, 0.3], p: [x, gy + P + 0.7, z], c: 0xc9a040 });
      k.cloth(mat, w, h, 'hang', x + cx * 0.2, gy + P - 0.7, z + cz * 0.2, yaw);
    };

    // ---- Trại vây quân Đinh: palisade round three sides and either side of the gate, gate towers, tents, the king's
    // pavilion tent with the 萬勝 banner, drums (lacquer and bronze), reed plumes, mantlets and ladders stacked for the assault
    k.palisade([[-35.5, -149], [-35.5, -201.5], [35.5, -201.5], [35.5, -149]]);
    k.palisade([[-35, -150], [-9.5, -150]]); k.palisade([[9.5, -150], [35, -150]]);
    k.tower(-11, -151.5, 5.5, 1.3, mats.allyFlag); k.tower(11, -151.5, 5.5, 1.3, mats.allyFlag);
    for (let z = -196; z <= -160; z += 7.2) for (const sx of [-1, 1]) k.tent(sx * (28 + r.range(-1, 1)), z + r.range(-1, 1), Math.PI / 2 + r.range(-0.1, 0.1), r.chance(0.4) ? 0x6a3a2a : 0x8a7a5a, 4.6, 5.6);
    for (const sx of [-1, 1]) for (let z = -197; z <= -186; z += 6.5) k.tent(sx * 17 + r.range(-1, 1), z, r.range(-0.15, 0.15), r.chance(0.5) ? 0x7a2a1c : 0x8a7a5a, 4.2, 5);
    k.tent(0, -194, 0, 0x8a2418, 9, 7.5);                                                              // Đinh Bộ Lĩnh's pavilion tent
    bigPole(-6.5, -189, 15, vanthang, 0.1); bigPole(6.5, -189, 15, dinh, Math.PI - 0.1);
    for (const sx of [-1, 1]) { k.standard(sx * 22, -153.5, 1.1, mats.ally, 8.5, [0, -170]); k.standard(sx * 24, -198, 1.1, mats.ally, 8.5, [0, -180]); k.standard(sx * 12, -176, 1.05, mats.ally, 8, [0, -170]); }
    k.commandTable(-8, -184, 0.15);
    for (const [x, z] of [[-7, -156], [7, -156], [-12, -180], [12, -186], [-14.5, -152], [14.5, -152]]) k.lamp(x, z, 0.6);
    k.drum(14, -170, -Math.PI / 2 - 0.25); k.drum(-15, -164, Math.PI / 2 + 0.2);
    bronzeDrum(k, 3.5, -183, 0.4, 1.3);
    for (const [x, z] of [[-17, -153], [17, -153], [-30, -182], [30, -170]]) reedFlags(k, x, z, { n: 12, r: 1.3 });
    for (const [x, z] of [[-24, -158], [-19, -156], [24, -160], [20, -157]]) k.flag(x, k.ground(x, z), z, 4.2, reedWhite);   // cờ lau
    for (const [x, z, yaw] of [[-31, -190, Math.PI / 2], [31, -178, -Math.PI / 2], [-22, -199, 0], [22, -199, 0]]) k.supplies(x, z, yaw, r.int(5, 7));
    for (const [x, z, yaw] of [[-31, -170, Math.PI / 2], [31, -190, -Math.PI / 2]]) k.shieldRack(x, z, yaw);
    for (const [x, z] of [[-26, -165], [25, -184]]) for (let q = 0; q < 3; q++) mantlet(k, x + q * 0.5, z + q * 0.9, Math.PI + r.range(-0.2, 0.2), 0.95);   // stacked spares
    for (let i = 0; i < 4; i++) {                                                                      // bamboo scaling ladders, stacked
      const x = 29 + r.range(-1, 1), z = -160 + i * 0.6, L = k.local(x, k.ground(x, z) + 0.15 + i * 0.12, z, 0);
      for (const sx of [-0.4, 0.4]) L(sx, 0, 0, [0.12, 0.12, 7], 0x8a8448);
      for (let q = -3.2; q < 3.3; q += 0.6) L(0, 0, q, [0.8, 0.08, 0.08], 0x6e6a38);
    }

    // ---- Đồng chiêm: dikes and stubble in the walkable cells, the flooded cells either side (water: build), the Đinh
    // siege line's wrecked mantlets, burnt carts, stumps; chông in the mud before the marsh
    paddy(k, [-24, -146, -6, -98], { cell: 6, rice: 0.35 });
    paddy(k, [6, -146, 24, -98], { cell: 6, rice: 0.35 });
    for (const [x0, z0, x1, z1] of POOLS.slice(0, 4)) {
      for (let x = x0 + 1.5; x < x1 - 1; x += 1.6) for (let z = z0 + 1.5; z < z1 - 1; z += 1.4) if (r.chance(0.55)) props.push({ s: [0.08, r.range(0.2, 0.45), 0.08], p: [x + r.range(-0.3, 0.3), 0.2, z + r.range(-0.3, 0.3)], c: sh(0x8a8448, r.range(0.7, 1.05)) });   // drowned stubble
      for (const [ax, az, bx, bz] of [[x0, z0, x1, z0], [x0, z1, x1, z1], [x0, z0, x0, z1], [x1, z0, x1, z1]])   // mud dikes round the cell
        props.push({ s: [Math.max(0.6, bx - ax + 0.6), 0.32, Math.max(0.6, bz - az + 0.6)], p: [(ax + bx) / 2, 0.12, (az + bz) / 2], c: sh(0x5a4a34, r.range(0.85, 1.05)) });
    }
    for (let x = -22; x <= 22; x += 4.2) if (Math.abs(x) > 5 && r.chance(0.8)) mantlet(k, x + r.range(-0.6, 0.6), -112 + r.range(-1.5, 1.5), Math.PI + r.range(-0.3, 0.3), r.range(0.9, 1.05));
    for (const [x, z, yaw] of [[-20, -138, 2.2], [18, -116, 0.8], [-15, -104, 1.4], [12, -140, 2.6]]) k.cart(x, z, yaw, true);
    for (const [x, z] of [[-40, -96], [42, -100], [-55, -126], [56, -140], [-58, -110]]) stump(k, x, z, 1.1);
    chong(k, [-48, -95, -7, -88], { n: 60, h: 1.5, lean: 0.6 }); chong(k, [7, -95, 48, -88], { n: 60, h: 1.5, lean: 0.6 });
    for (const [x, z] of [[-36, -150], [36, -148], [-8, -100], [8, -100]]) k.standard(x, z, 1.05, mats.ally, 8);
    for (const [x, z] of [[-30, -97], [30, -98]]) k.standard(x, z, 1.05, mats.foe, 8);

    // ---- Đầm lau: reeds on both banks, the causeway (bamboo revetments, fascines), stilt houses and boats on the water,
    // chông in the shallows, the outer bamboo palisade with its barricade gate and towers
    k.reeds();
    for (const sx of [-1, 1]) for (let z = -84; z < -50; z += 0.45) {                                 // revetment stakes along the deck
      const x = sx * 5.15 + r.range(-0.1, 0.1), gy = k.ground(x, z), h = r.range(1.2, 1.8);
      props.push({ s: [0.14, h, 0.14], p: [x, gy + h / 2 - 0.5, z], c: sh(r.chance(0.3) ? 0x9a9450 : 0x6e7a3a, r.range(0.7, 1)) });
    }
    for (const sx of [-1, 1]) for (let z = -83; z < -51; z += 2.6) props.push({ s: [0.5, 0.45, 2.5], p: [sx * 5.4, k.ground(sx * 5.4, z) + 0.15, z + 1.3], c: sh(0x6a6034, r.range(0.8, 1.05)) });   // fascines
    for (const [x, z] of [[-7.5, -90], [7.5, -90], [-8, -51], [8, -51]]) k.lamp(x, z, 0.7);
    for (const [x, z, yaw, s] of [[-22, -62, 0.25, 1.1], [-38, -72, -0.2, 1.15], [-56, -64, 0.4, 1.05], [24, -74, -0.3, 1.1], [42, -63, 0.15, 1.15], [60, -71, -0.5, 1.05]]) stiltHouse(k, x, z, yaw, s);
    for (const [x, z, yaw, o] of [[-14, -73, 0.3, {}], [16, -60, -0.4, { roof: false }], [-30, -79, 1.3, {}], [33, -78, 2.0, { roof: false }], [-48, -57, 0.7, { dragon: true, len: 12 }], [52, -58, 2.6, { dragon: true, len: 12 }]])
      boat(k, x, WY, z, yaw, o);
    for (const [x, z, yaw] of [[11, -69, 0.9], [-12, -59, 2.2]]) boat(k, x, WY - 0.45, z, yaw, { roof: false });   // half sunk
    chong(k, [-30, -56, -8, -52], { n: 30, h: 1.6, lean: 0.5, y: -0.6 }); chong(k, [8, -56, 30, -52], { n: 30, h: 1.6, lean: 0.5, y: -0.6 });
    bambooFence(k, [[-68, PAL_Z], [-7.6, PAL_Z]], { h: 3.2 }); bambooFence(k, [[7.6, PAL_Z], [68, PAL_Z]], { h: 3.2 });
    bambooFence(k, [[-68, PAL_Z + 0.9], [-7.6, PAL_Z + 0.9]], { h: 2.4 }); bambooFence(k, [[7.6, PAL_Z + 0.9], [68, PAL_Z + 0.9]], { h: 2.4 });
    k.barricade('raotre');
    k.burn(-2, PAL_Z - 0.5, 1.1, 'raotre'); k.burn(4, PAL_Z, 1.0, 'raotre');
    k.tower(-10.7, PAL_Z + 1.7, 6, 1.3); k.tower(10.7, PAL_Z + 1.7, 6, 1.3);
    for (const x of [-56, -40, -24, 24, 40, 56]) k.flag(x + r.range(-2, 2), k.ground(x, PAL_Z + 1.6), PAL_Z + 1.6, 3.6, r.chance(0.5) ? mats.foe : mats.pennant);
    for (const [x, z] of [[-15, -43], [15, -43]]) k.standard(x, z, 1.1, doBig, 9, [0, -70]);

    // ---- Lũy ngoài: the burnt hamlet (two stilt houses still smouldering), haystacks, stumps, broken inner fence lines,
    // the reed-marsh pools on both flanks (the ambush lies in their reeds), chông along their edges
    for (const h of RUINS) ruinedStiltHouse(k, ...h, 1.1);
    for (const [x, z] of [[-36, -6], [37, -16], [-14, 22], [36, 22]]) haystack(k, x, z, r.range(0.8, 1.1));
    for (const [x, z] of [[-18, -36], [20, -2], [-38, 12], [12, 26]]) stump(k, x, z, 1);
    bambooFence(k, [[-40, -14], [-26, -16]], { h: 2.2 }); bambooFence(k, [[18, -40], [34, -38]], { h: 2.2 }); bambooFence(k, [[26, 20], [40, 22]], { h: 2.2 });
    for (const [x0, z0, x1, z1] of POOLS.slice(4, 6)) {
      for (let z = z0 + 2; z < z1 - 1; z += 2.6) for (let x = x0 + 1.5; x < x1 - 1; x += 2.8) if (r.chance(0.62)) reedFlags(k, x + r.range(-0.8, 0.8), z + r.range(-0.8, 0.8), { n: r.int(7, 12), r: 1.2 });
      const ex = x0 < 0 ? x1 : x0;                                                                      // the pool's lane-side edge
      for (let z = z0 + 1; z < z1; z += 0.9) props.push({ s: [0.9, 0.3, 1.0], p: [ex, 0.1, z], c: sh(0x4a3e2c, r.range(0.85, 1.1)) });
      chong(k, [ex - 1.2, z0 + 2, ex + 1.2, z1 - 2], { n: 34, h: 1.3, lean: 0.7, yaw: x0 < 0 ? -Math.PI / 2 : Math.PI / 2 });
    }
    for (const [x, z] of [[-40, -46], [40, -44], [-40, 26], [40, 28], [-24, 4], [22, -20]]) k.standard(x, z, 1.05, r.chance(0.25) ? mats.pennant : mats.foe, 8);
    for (const [x, z] of [[-9, -30], [9, -12], [-8, 14]]) k.lamp(x, z, 0.6);

    // ---- the middle rampart: thành đất across the field and up both flanks, the timber gatehouse over the gate, brush
    // and scaling ladders at its foot (the Đinh assault), the garrison along the wall walk, violet flags
    rampart(k, [[-70, RAM_Z], [-GAP - 0.4, RAM_Z]], { h: RAM_H, w: 6.4 }); rampart(k, [[GAP + 0.4, RAM_Z], [70, RAM_Z]], { h: RAM_H, w: 6.4 });
    rampart(k, [[-51, RAM_Z + 3], [-51, 114]], { h: RAM_H - 0.5, w: 6 }); rampart(k, [[51, RAM_Z + 3], [51, 114]], { h: RAM_H - 0.5, w: 6 });
    gateHouse(k, 0, RAM_Z, 0, { gap: GAP * 2, h: RAM_H, s: 1 });
    for (const lx of [-30, -19, 17, 29]) {                                                           // ladders against the face
      const lean = 0.32, len = RAM_H / Math.cos(lean) + 0.6, zc = RAM_Z - 3.1 - Math.sin(lean) * len / 2, yc = Math.cos(lean) * len / 2 - 0.2;
      for (const sx of [-0.42, 0.42]) poles.push({ s: [0.13, len, 0.13], p: [lx + sx, yc, zc], r: [-lean, 0, 0], c: 0x8a8448 });
      for (let q = 0.5; q < len - 0.3; q += 0.55) poles.push({ s: [0.86, 0.08, 0.08], p: [lx, Math.cos(lean) * q - 0.2, RAM_Z - 3.1 - Math.sin(lean) * q], c: 0x6e6a38 });
    }
    { const garrison = [];
      for (let x = -66; x < 66; x += r.range(1.6, 3.4)) if (Math.abs(x) > 12) garrison.push({ x, y: k.ground(x, RAM_Z) + RAM_H + 0.25, z: RAM_Z + r.range(-0.6, 0.8), yaw: Math.PI + r.range(-0.3, 0.3), ph: r.range(0, 6.28) });
      for (const sx of [-1, 1]) for (let z = 44; z < 110; z += r.range(3, 6)) garrison.push({ x: sx * 51 + r.range(-0.5, 0.5), y: RAM_H - 0.25, z, yaw: -sx * Math.PI / 2 + r.range(-0.3, 0.3), ph: r.range(0, 6.28) });
      k.troops('foe', garrison); }
    for (let x = -62; x <= 62; x += 12) if (Math.abs(x) > 14) k.flag(x + r.range(-1.5, 1.5), RAM_H + 0.3, RAM_Z + 1.4, 3.4, r.chance(0.6) ? mats.foe : mats.pennant);
    k.cloth(doDrape, 3, 5.6, 'drape', -GAP - 3.6 + 1.5, RAM_H + 3.2, RAM_Z - 1.95, Math.PI);
    k.cloth(doDrape, 3, 5.6, 'drape', GAP + 3.6 + 1.5, RAM_H + 3.2, RAM_Z - 1.95, Math.PI);
    for (const sx of [-1, 1]) k.fire(sx * 9, RAM_H + 1.1, RAM_Z - 1.8, 0.45, false);                    // the gatehouse's watch fires
    for (const sx of [-1, 1]) props.push({ s: [0.9, 0.3, 0.9], p: [sx * 9, RAM_H + 0.9, RAM_Z - 1.8], c: 0x35302c });

    // ---- Lũy giữa: the garrison's stilt houses, granary, the Đỗ clan shrine's gate and shrine, the lotus pond, a
    // banyan, areca palms, haystacks, violet tents and standards, braziers
    for (const h of HOUSES) stiltHouse(k, ...h, 1.05);
    hut(k, 35, 76, Math.PI / 2, 1.1);
    templeGate(k, -32, 100, Math.PI / 2, 0.95); shrine(k, -40, 100, Math.PI / 2, 1.2);
    lotus(k, 28, WY + 0.32, 95, 7);
    for (let i = 0; i < 26; i++) { const [x0, z0, x1, z1] = POOLS[6], x = r.range(x0, x1), z = i % 2 ? z0 : z1; props.push({ s: [1.2, 0.3, 0.9], p: [x, 0.1, z], c: sh(0x4a3e2c, r.range(0.85, 1.1)) }); }
    banyan(k, 28, 44, 1.05);
    for (const [x, z, h] of [[-41, 66, 9], [-40, 72, 10], [41, 50, 9], [40, 86, 8.5], [-42, 110, 9], [42, 108, 10]]) areca(k, x, z, h);
    for (const [x, z] of [[-24, 96], [22, 70], [-40, 40]]) haystack(k, x, z, 1);
    for (const [x, z, yaw] of [[-22, 44, 0.2], [20, 52, -0.3], [-20, 74, 0.4], [-14, 108, 0.1]]) k.tent(x, z, yaw, r.chance(0.5) ? 0x3e2a4a : 0x6a5a4a, 4.2, 5.2);
    for (const [x, z, yaw] of [[-40, 44, Math.PI / 2], [40, 40, -Math.PI / 2], [-12, 110, Math.PI]]) k.supplies(x, z, yaw, r.int(5, 7));
    for (const [x, z] of [[-11, 58], [12, 82], [-9, 90], [14, 46]]) k.lamp(x, z, 0.6);
    for (const [x, z] of [[-16, 40], [18, 40], [-18, 100], [20, 108], [-30, 66], [30, 90]]) k.standard(x, z, 1.05, r.chance(0.3) ? doBig : mats.foe, 8);
    k.drum(-16, 88, Math.PI / 2 + 0.3);

    // ---- the ramp: braziers on the verges, bamboo on the banks, the citadel's barricade with its two towers
    for (const [x, z] of [[-7, 116], [8, 118], [-6, 132], [7.5, 132]]) k.lamp(x, z, 0.55);
    k.barricade('cuatrong');
    k.burn(-1, 128.4, 1.0, 'cuatrong'); k.burn(5, 127.6, 1.0, 'cuatrong');
    k.tower(-12.5, 126, 6, 1.3); k.tower(14, 126, 6, 1.3);
    for (const [x, z] of [[-12, 113], [14, 112], [-11, 140], [12, 141]]) k.standard(x, z, 1.1, doBig, 9, [2, 122]);

    // ---- Thành nội: Đỗ Cảnh Thạc's hall on its plinth, the two great 杜 banners, war drums and a bronze drum before it,
    // braziers round the dueling ground, standards and a bamboo fence along the rim, lanterns under the eaves
    timberHall(k, HALL[0], HALL[1], 0, 1);
    for (const lx of [-5.5, -2, 2, 5.5]) k.lantern(lx, MOUND_H + 5.0, HALL[1] - 6.2, 1.1);
    bigPole(-13, 182, 18, doBig, 0.2, 5, 10); bigPole(13, 182, 18, doBig, Math.PI - 0.2, 5, 10);
    k.drum(-10, 171, Math.PI / 2 - 0.3); k.drum(10, 171, -Math.PI / 2 + 0.3);
    bronzeDrum(k, -5, 172, 0.3, 1.4);
    for (let i = 0; i < 8; i++) {                                                                     // braziers round the dueling ground
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8, x = DUEL[0] + Math.sin(a) * 15.5, z = DUEL[1] + Math.cos(a) * 13;
      if (z > 168 && Math.abs(x) < 8) continue;
      k.lamp(x, z, 0.75);
    }
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2 + 0.22, x = Math.sin(a) * 27.5, z = 162 + Math.cos(a) * 24;
      if (z < 142 && Math.abs(x) < 12) continue;                                                     // the ramp's arrival
      k.standard(x, z, 1.1, r.chance(0.35) ? doBig : mats.foe, 8.5, DUEL);
    }
    { const rim = [];
      for (let a = -2.35; a <= 2.35 + 1e-6; a += 0.12) rim.push([Math.sin(a) * 33.2, 162 + Math.cos(a) * 29.2]);
      bambooFence(k, rim, { h: 2.8 }); }
    for (const [x, z, yaw] of [[-20, 176, 0.4], [20, 176, -0.4], [-24, 160, Math.PI / 2]]) k.supplies(x, z, yaw, r.int(4, 6));
    k.shieldRack(22, 162, -Math.PI / 2); k.shieldRack(-20, 150, Math.PI / 2 + 0.3);

    // ---- the field: wrecks, arrows, the fallen's gear, torch posts, bamboo on the dikes, karst far off in the rain
    k.wrecks();
    k.arrows([-46, -148, 46, 186], 44);
    k.debris([-46, -148, 46, 186], 120);
    k.torchPosts(-150, 110);
    const hedge = (pts) => bambooHedge(k, pts, { gap: 3.4, h: 9 });
    hedge([[-40, -205], [-40, -155]]); hedge([[40, -205], [40, -155]]);
    hedge([[-56, -150], [-56, -100]]); hedge([[56, -150], [56, -100]]);
    hedge([[-67, -40], [-67, 26]]); hedge([[67, -38], [67, 26]]);
    hedge([[-60, 46], [-60, 108]]); hedge([[60, 46], [60, 108]]);
    hedge([[-14, 114], [-10, 136]]); hedge([[16, 112], [12, 136]]);
    for (const [x, z] of [[-80, 140], [86, 120], [-84, -20], [90, 40], [-70, 190], [64, 200]]) bamboo(k, x, z, { n: 9, h: 10, spread: 2 });
    karstRange(k, [[-104, 120, 26, 9], [-112, 60, 18, 7], [100, 170, 22, 8]]);

    // ---- reserve armies off the walkable ground: the Đinh host behind its camp and in the siege lines on both flanks,
    // Đỗ's men behind the middle ring's flank walls and on the citadel's back
    for (const [x, z, f] of [[-30, -212, 0], [0, -213, 0], [30, -212, 0], [-66, -170, 0.8], [66, -168, -0.8], [-70, -128, 1.0], [72, -122, -1.0]]) k.formation('ally', x, z, f, r.int(10, 15), r.int(5, 7));
    for (const [x, z, f] of [[-66, 70, Math.PI / 2], [66, 80, -Math.PI / 2], [-60, 130, Math.PI / 2 + 0.5], [60, 132, -Math.PI / 2 - 0.5], [0, 204, Math.PI], [-26, 200, Math.PI - 0.3]]) k.formation('foe', x, z, f, r.int(9, 13), r.int(4, 6));
    k.aftermath({ fallen: [[-24, 24, -146, -98, 18], [-40, 40, -44, 28, 20], [-30, 30, 38, 104, 12], [-20, 20, 140, 172, 6]],
      standards: [8, -42, -146, 42, 104], dust: { n: 18, area: [-50, -150, 50, 110], wall: [5, -40, 40, RAM_Z - 3] } });
    // the Đinh siege camps' fires ringing Đỗ Động in the rain, and Đỗ's own beyond the citadel
    k.farFires([[-96, -150], [98, -120], [-104, -40], [100, 10], [-98, 90], [104, 120], [-60, 216], [70, 214]], 2.8);
  },

  build(root, k) {
    return buildSet(root, k);
  },
};

// ---------------------------------------------------------------- set pieces (build)
// · still water on the flooded paddy cells, the marsh pools and the lotus pond (POOLS: solid map props, no rock there)
// · rain: streaks round the hero, slanting with the wind; set 'calm' eases it to a drizzle
// · the middle gate: two plank-and-bamboo leaves under the gatehouse (gate 'cuagiua'); set 'sappers' lights the brush
//   the Đinh sappers piled at its foot, and when the story opens the gate the burnt leaves crash outward, charred
// A new battle (frame back to 0) resets the set; free mode stands with the gate burnt open.
function buildSet(root, k) {
  const r = makeRng(967);

  // ---- still water: a dark sheet a hand above the mud, faintly sky-lit (no env map: the fires' specular carries it)
  const wb = [];
  for (const [x0, z0, x1, z1] of POOLS) wb.push({ s: [x1 - x0, 0.06, z1 - z0], p: [(x0 + x1) / 2, ground((x0 + x1) / 2, (z0 + z1) / 2) + 0.05, (z0 + z1) / 2], c: 0x2c3a40 });
  const water = new THREE.Mesh(boxesGeometry(wb), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.16, metalness: 0.2, emissive: 0x0c141c, emissiveIntensity: 1 }));
  water.receiveShadow = true; water.name = 'pools';
  root.add(water);

  // ---- rain (one instanced draw): N streaks in a 56 m box round the hero, fixed in the world as he moves
  const N = 520, BOX = 56, TOP = 22, rain = new THREE.InstancedMesh(new THREE.BoxGeometry(0.03, 1.2, 0.03),
    new THREE.MeshBasicMaterial({ color: 0xa8b4c8, transparent: true, opacity: 0.32, depthWrite: false }), N);
  rain.frustumCulled = false; rain.name = 'rain';
  root.add(rain);
  const drops = Array.from({ length: N }, (_, i) => [hash01(i, 1, 9) * BOX, hash01(i, 2, 9) * BOX, hash01(i, 3, 9), 0.8 + hash01(i, 4, 9) * 0.4]);
  const wrap = (v) => ((v % BOX) + BOX) % BOX - BOX / 2;

  // ---- the middle gate: leaves hinged at the jambs, falling outward (−Z) when burnt through
  const leaves = [-1, 1].map((sx) => {
    const lb = [], w = GAP - 0.15, h = 4.4;
    for (let x = 0.2; x < w; x += 0.42) lb.push({ s: [0.4, h - r.range(0, 0.3), 0.22], p: [-sx * x, h / 2, 0], c: shade(0x5a4430, r.range(0.8, 1.1)) });   // planks
    for (const y of [0.8, 2.3, 3.8]) lb.push({ s: [w, 0.24, 0.16], p: [-sx * w / 2, y, -0.18], c: 0x3a2818 });                                           // cross bars
    lb.push({ s: [0.16, h * 1.02, 0.14], p: [-sx * w / 2, h / 2, -0.24], r: [0, 0, sx * 0.72], c: 0x3a2818 });                                            // brace
    for (const y of [0.8, 2.3, 3.8]) for (let q = 0; q < 4; q++) lb.push({ s: [0.12, 0.3, 0.06], p: [-sx * (0.6 + q * (w - 1.2) / 3), y, -0.28], c: 0x8a8448 });   // rattan lashings
    const mat = lit(), m = new THREE.Mesh(boxesGeometry(lb), mat);
    const pivot = new THREE.Group(); pivot.position.set(sx * GAP, ground(sx * GAP, RAM_Z - 1.6), RAM_Z - 1.6);
    pivot.add(m); m.castShadow = true; m.receiveShadow = true;
    root.add(pivot);
    return { pivot, mat, sx };
  });
  // the sappers' brush piles at the gate foot: reed bundles and green bamboo, fires switched on by the set / the open gate
  let sapT = -1e9, T = 0, lastFrame = 0, calmT = -1e9;
  const burning = () => sapT > -1e8 || GATES.cuagiua?.open;
  for (let i = 0; i < 9; i++) {
    const x = -GAP + 0.8 + i * (GAP * 2 - 1.6) / 8 + r.range(-0.3, 0.3), z = RAM_Z - 2.6 + r.range(-0.4, 0.4), L = k.local(x, ground(x, z), z, r.range(0, 3));
    L(0, 0.3, 0, [1.3, 0.6, 0.7], shade(0x8a7a44, r.range(0.8, 1.1)), [0, 0, r.range(-0.3, 0.3)]);
    L(0.2, 0.75, 0.1, [1.0, 0.5, 0.5], shade(0x6e6a38, r.range(0.8, 1.1)), [0.3, 0, 0]);
  }
  for (const [x, s, smoke] of [[-3.6, 1.2, true], [-0.6, 1.5, true], [2.6, 1.3, false], [4.6, 0.9, false]]) k.fire(x, ground(x, RAM_Z - 2.6) + 0.3, RAM_Z - 2.6, s, smoke, burning);
  const site = { x: 0, y: ground(0, RAM_Z - 3) + 2.4, z: RAM_Z - 3, i: 0, d: 16, k: 0 };
  k.sites.push(site);
  const CHAR = new THREE.Color(0x2a221e), WHITE = new THREE.Color(1, 1, 1), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), p = new THREE.Vector3(), s3 = new THREE.Vector3();
  let fall = 0, char = 0;

  return {
    sets: {
      sappers() { if (sapT < -1e8) sapT = T; },
      calm() { if (calmT < -1e8) calmT = T; },
    },
    update(dt, game) {
      T += dt;
      if (game.frame < lastFrame) { sapT = calmT = -1e9; fall = char = 0; }                         // a new battle
      lastFrame = game.frame;
      // the gate: chars while the brush burns, crashes outward once the story opens it
      const open = !!GATES.cuagiua?.open;
      char = Math.min(1, char + (burning() ? dt / 40 : 0) + (open ? dt : 0));
      fall += ((open ? 1 : 0) - fall) * Math.min(1, dt * 2.2);
      for (const l of leaves) {
        l.pivot.rotation.set(-fall * 1.42, l.sx * fall * 0.25, 0);
        l.mat.color.copy(WHITE).lerp(CHAR, char * 0.85);
      }
      site.i = burning() ? 46 * (0.9 + 0.1 * Math.sin(T * 9)) : 0;
      // rain: falls ≈ 17 m/s, slanted downwind; thins to a drizzle over 6 s once calmed
      const h = game.hero, calm = calmT > -1e8 ? Math.min(1, (T - calmT) / 6) : 0, n = Math.round(N * (1 - calm * 0.8));
      rain.count = n;
      q.setFromEuler(e.set(WIND.z * 0.22, 0, -WIND.x * 0.22));
      for (let i = 0; i < n; i++) {
        const [ox, oz, ph, sp] = drops[i], x = h.x + wrap(ox - h.x), z = h.z + wrap(oz - h.z), gy = ground(x, z);
        const u = (T * 17 * sp / TOP + ph) % 1, y = gy + TOP * (1 - u);
        rain.setMatrixAt(i, m4.compose(p.set(x + WIND.x * u * 3, y, z + WIND.z * u * 3), q, s3.set(1, 1, 1)));
      }
      rain.instanceMatrix.needsUpdate = true;
    },
  };
}
