// Tây Phù Liệt (西扶烈, ≈ 966) laid out along +Z, ≈ 400 m from the Đinh camp to the sandbar in the Red River — the DW8
// stage shape on flat delta country: a camp and a bamboo-walled hamlet, open paddies cut by a dike line, an earthen
// fort with a timber gate, then the river at its back. Format: src/world/maps/index.js header (sim: zones / route /
// gates / water; render: sky / light / dress / build). Dressing helpers: ../viet.js.
//   Doanh trại họ Đinh   Đinh camp             z -186 … -150  h 0    bamboo fence, straw tents, 丁 standards; story start
//   Xóm lũy tre          bamboo hamlet         z -150 … -102  h 0    lũy tre, stilt houses, a banyan by the shrine, areca
//                                                                   palms; a cổng làng at either end of the lane
//   Đồng chiêm           rice paddies          z -102 …  -42  h 0    dikes and rice cells, buffalo, haystacks (free arena)
//   (dike line)          z ≈ -42, h ≈ 1.1 on its crest: a low earth wall right across the field, two outposts (đồn)
//                        on its south face at x ±34, barricade gate 'dike' on the road
//   Bãi trước thành      fort approach         z  -42 …   12  h 0    burning haystacks, stakes before the rampart
//   Thành Tây Phù Liệt   the fort              z   21 …  112  h 0    earthen rampart (thành đất, h 5.5) on three sides,
//                                                                   the gatehouse + doors 'fortGate' (z 17); inside: the
//                                                                   warlord's hall (west), granaries (east), huts; the
//                                                                   river gate 'riverGate' (doors, z 112) in the north
//                                                                   palisade
//   Bến sông Cái         the landing           z  112 …  148  h 0    jetties, moored boats, reeds, the river shrine
//   Bãi cạn              the shoal ford        z  148 …  188         x ±12 across the river: a silt shoal just proud of the water
//   Bãi giữa sông        mid-river sandbar     z  188 …  224  h 0    reeds; Nguyễn Siêu's dragon boats wait on the far
//                                                                   channel beyond it (anchor 'boats')
// The Red River (sông Cái / Nhị Hà) runs across the map ('x'), ochre with silt, 40 m of deep water; past the sandbar the
// far channel is the map's own water (build(): the ground cut down, a plane to the horizon), a strip carries the river
// on past the grid's flanks. Dusk: a low orange sun up-river over the north-west; long shadows toward the camp.
// Sets (story `set`): 'ram' — the battering ram rolls up and beats on the fort gate; 'burn' — the fort's granaries,
// huts and palisade catch fire after it falls (free / trial: already burning). A new battle resets both.
import * as THREE from 'three';
import { boxesGeometry, shade } from '../../../../src/core/voxel.js';
import { lit } from '../../../../src/world/castle.js';
import { GATES } from '../../../../src/world/map.js';
import {
  bambooScreen, villageGate, earthWall, stakes, granary, longHall, gateTower, jetty, buffalo, banana, fishTrap,
  stiltHouse, hut, banyan, areca, paddy, boat, bronzeDrum, rampart, shrine, haystack, reedFlags, bambooFence,
} from '../viet.js';

const RIVER_Z = 168, HW = 20;                          // the river's centre at the ford, its deep half width
const river = (x) => RIVER_Z + 3 * Math.sin(x * 0.018);
const DIKE_Z = -42, WALL_Z = 17, RGATE_Z = 112;        // the dike line, the fort's south rampart, the river gate
const FAR_Z = 226;                                      // past here: the far channel (no rock, map water)
const WY = -0.2;
/** The paddies' ground: flat, with the levee of the dike line swelling 1.1 m under its wall. */
const FIELD = (x, z) => 1.1 * Math.exp(-(((z - DIKE_Z) / 4.5) ** 2));

// hamlet stilt houses [x, z] (west side faces +x, east side −x): footprints 9 × 6.6 m
const HOUSES = [[-23, -138], [-23, -122], [-24, -108], [23, -140], [23, -125], [24, -110]];
const GRANARIES = [[40, 36], [40, 52], [40, 68]];
const HUTS = [[-42, 34], [-42, 48], [-42, 61]];
const HALL = [-29, 86];                                 // the hall terrace centre (front: the steps on its east face)
const TENTS = [[-21, -180], [21, -180], [-21, -168], [21, -168]];

export default {
  id: 'tayphuliet',
  name: { zh: 'Tây Phù Liệt', en: 'Tây Phù Liệt' },
  grid: [-120, -200, 120, 240],
  pieces: [
    { id: 'camp', rect: [-28, -186, 28, -148], h: 0, edge: 1.5, rise: 1.6 },
    { id: 'hamlet', rect: [-34, -152, 34, -100], h: 0, edge: 1, rise: 1.4 },
    { id: 'field', rect: [-60, -102, 60, 12], h: FIELD, edge: 2.5, rise: 1.4 },
    { id: 'gateway', rect: [-4.5, 8, 4.5, 24], h: 0, rise: 3 },
    { id: 'fort', rect: [-50, 21, 50, 116], h: 0, rise: 3 },
    { id: 'landing', rect: [-62, 112, 62, 152], h: 0, edge: 2, rise: 1.4 },
    { id: 'ford', rect: [-12, 146, 12, 192], h: 0 },
    { id: 'sandbar', rect: [-40, 186, 40, 224], h: 0, edge: 3, rise: 1.2 },
  ],
  carve: [
    [-35, -150.8, -4.4, -149.4], [4.4, -150.8, 35, -149.4],            // the hamlet's bamboo hedge, south (cổng làng gap)
    [-61, -101.4, -4.4, -100], [4.4, -101.4, 61, -100],                // … and north, onto the paddies
    [-61, DIKE_Z - 1.4, -6.6, DIKE_Z + 1.4], [6.6, DIKE_Z - 1.4, 61, DIKE_Z + 1.4],   // the dike line's earth wall
    [-64, RGATE_Z - 1.5, -7.2, RGATE_Z + 1.5], [7.2, RGATE_Z - 1.5, 64, RGATE_Z + 1.5],   // the fort's north palisade
  ],
  props: [
    ...TENTS.map(([x, z]) => [x - 2.7, z - 3.2, x + 2.7, z + 3.2]),
    ...HOUSES.map(([x, z]) => [x - 4.8, z - 3.4, x + 4.8, z + 3.4]),
    [-14.3, -146.3, -11.7, -143.7], [-19, -147, -16.4, -144.6],          // the banyan's trunk, the shrine under it
    [-41, -49, -27, DIKE_Z - 1.2], [27, -49, 41, DIKE_Z - 1.2],          // the two outposts (đồn) on the dike's south face
    [HALL[0] - 7.4, HALL[1] - 12.4, HALL[0] + 8.8, HALL[1] + 12.4],       // the hall terrace and its steps
    ...GRANARIES.map(([x, z]) => [x - 4, z - 3.2, x + 4, z + 3.2]),
    ...HUTS.map(([x, z]) => [x - 3, z - 2.6, x + 3, z + 2.6]),
    [-53, 124, -48, 128.5], [47.5, 124, 54.5, 131],                       // the river shrine, the ferryman's hut
    [-120, FAR_Z, 120, 240],                                              // the far channel: map water, no rock
  ],
  zones: [
    { id: 'camp', name: { zh: 'Doanh trại họ Đinh', en: 'Đinh Camp' }, x: 0, z: -168, w: 56, d: 36 },
    { id: 'hamlet', name: { zh: 'Xóm lũy tre', en: 'Bamboo Hamlet' }, x: 0, z: -126, w: 68, d: 48 },
    { id: 'paddies', name: { zh: 'Đồng chiêm', en: 'Rice Paddies' }, x: 0, z: -72, w: 120, d: 60 },
    { id: 'approach', name: { zh: 'Bãi trước thành', en: 'Before the Fort' }, x: 0, z: -15, w: 120, d: 54 },
    { id: 'fort', name: { zh: 'Thành Tây Phù Liệt', en: 'Tây Phù Liệt Fort' }, x: 0, z: 66, w: 100, d: 92 },
    { id: 'landing', name: { zh: 'Bến sông Cái', en: 'Red River Landing' }, x: 0, z: 130, w: 124, d: 36 },
    { id: 'ford', name: { zh: 'Bãi cạn', en: 'The Shoal Ford' }, x: 0, z: 168, w: 26, d: 40 },
    { id: 'sandbar', name: { zh: 'Bãi giữa sông', en: 'Mid-River Sandbar' }, x: 0, z: 206, w: 80, d: 36 },
  ],
  route: [[0, -180], [0, -150], [0, -126], [0, -101], [0, -72], [0, DIKE_Z], [0, -15], [0, 8], [0, WALL_Z], [0, 28], [0, 50],
    [0, 78], [0, 100], [0, RGATE_Z], [0, 130], [0, 148], [0, 168], [0, 188], [0, 206], [0, 216]],
  gates: {
    dike: { rect: [-8.6, DIKE_Z - 1.8, 8.6, DIKE_Z + 1.8], name: { zh: 'Cửa đê', en: 'Dike Gate' }, kind: 'barricade', at: [0, DIKE_Z, 0, 6.6] },
    fortGate: { rect: [-6.5, WALL_Z - 1.5, 6.5, WALL_Z + 1.5], name: { zh: 'Cổng thành', en: 'Fort Gate' }, kind: 'doors' },
    riverGate: { rect: [-9, RGATE_Z - 2, 9, RGATE_Z + 2], name: { zh: 'Cửa bến', en: 'River Gate' }, kind: 'doors' },
  },
  // dike: the barricade · outL / outR: before the two outposts · gate: the fort gate · hall: the foot of the hall's steps
  // · rgate: the river gate · ben: the bank at the ford head · shoal: the middle of the ford · boats: Nguyễn Siêu's boats (north shore of the sandbar)
  anchors: { dike: [0, DIKE_Z], outL: [-34, -54], outR: [34, -54], gate: [0, WALL_Z], hall: [-18, 86], rgate: [0, RGATE_Z],
    ben: [0, 138], shoal: [0, 168], boats: [0, 219] },
  // story: the head of the Đinh ranks, looking up the camp lane at the hamlet gate; free: the paddies
  spawn: { story: { x: 0, z: -172, yaw: 0, tilt: -0.07 }, free: { x: 0, z: -72, yaw: 0 } },
  water: { along: 'x', c: river, dc: (x) => 3 * 0.018 * Math.cos(x * 0.018), hw: HW, bed: [2.2, 0.4], fords: [[-13, 13, -0.08]], y: WY, stones: 0,
    tint: { deep: 0x3a2412, shallow: 0x7a5232, sun: [1, 0.62, 0.32] } },
  // dusk up-river: the sun a low orange disc in the north-west over the water, the haze warm and smoky
  sky: {
    sunElev: 0.045, sunAz: -0.38, sunCore: [4.6, 2.8, 1.3],
    haze: 0x8a6c64, hazeWarm: 0xd08040, glow: 0xf4a052, skyMid: 0x9a7068, skyTop: 0x3c3858,
    hznSun: 0xff8a2c, hznAway: 0xb07868, cloudRose: 0xc0704e, cloudShade: 0x4a3c48, cloudLit: 0xffb064,
    dust: [12, 44, 1.1, 0.06], dustLit: 0xc8864a, dustShade: 0x5a4a50, apCool: 0x7a6e8e,
  },
  fog: [36, 290],
  post: { sat: 1.22, rays: 1.1, rayTint: [1.0, 0.62, 0.3], exposure: 1.4 },
  light: { hemi: [0x9a8494, 0x6a5a40, 2.3], sun: [0xffa050, 3.7], rim: [0xff8040, 1.8], dir: [-0.4, 0.42, 0.81], fire: 0xff7a30, fill: [-400, -390, 0.8] },
  castle: null,
  terrain: {
    pave: () => -0.4,                                                          // country lanes and beaten earth
    bare: (x, z) => (z > 20 && z < 112 && Math.abs(x) < 50) || (z > -186 && z < -150 && Math.abs(x) < 26) || (z > 112 && z < 147 && Math.abs(x) < 14) || (z > 144 && z < 194 && Math.abs(x) < 15),
    rock: () => -9,                                                            // no bare rock: earth and grass
    scorch: { n: 30, area: [-48, -38, 48, 110], spots: [[0, 10, 1.1], [-6, 14, 0.9], [7, 13, 0.9], ...GRANARIES.map(([x, z]) => [x - 4, z, 1.0])] },
    rubble: [-50, -40, 50, 112],
    pines: [500, 600],
    mountains: { peakA: -0.85, peak: 30 },                                     // Tản Viên (Ba Vì), far up-river
    cliff: { rock: 0x6e5a40, dark: 0x4a3a2a, top: 0x5e6a34, moss: 0x4a5a2a, grassy: 0x6a7438 },
  },
  // burning haystacks and a wagon on the approach
  fires: [[-30, -22, 1.1], [34, -10, 1.2], [-44, 2, 1.0], [22, -32, 1.0], [-14, -4, 0.9]],
  // firelight: camp braziers, field fires, the gate braziers, the hall's braziers, the landing, the sandbar torches
  lightSites: [[-6, 1.9, -160, 26, 10], [6, 1.9, -160, 26, 10], [-30, 2.2, -22, 30, 11], [34, 2.2, -10, 30, 11], [22, 2.2, -32, 26, 10],
    [-7, 2, 10, 32, 12], [7, 2, 10, 32, 12], [-19, 2, 78, 30, 11], [-19, 2, 94, 30, 11], [-6, 2, 136, 28, 11], [6, 2, 136, 28, 11],
    [-8, 2, 206, 26, 10], [8, 2, 212, 26, 10], [-6, 1.9, -104, 22, 9]],
  hq: HALL,
  minimap: { walls: [[-58, 13, -5.6, 21], [5.6, 13, 58, 21], [-58, 13, -50, 113], [50, 13, 58, 113]] },

  dress(k) {
    const { r, mats, props, shade: sh } = k;
    const dinh = k.banner('丁', { bg: '#8a1e14', fg: '#f2d68a', border: '#3a0e08', w: 128, h: 256, seed: 31 });
    const nguyen = k.banner('阮', { bg: '#1c3468', fg: '#f0e6c8', border: '#0c1630', w: 160, h: 320, seed: 32 });
    const huucong = k.banner('右公', { bg: '#24488a', fg: '#f4ecd4', border: '#0e1a3a', w: 128, h: 256, seed: 33 });
    const reedPennant = k.banner('', { bg: '#e8dcc0', fg: '#000', border: '#a3261a', w: 64, h: 128, seed: 34 });

    // ---- the Đinh camp: a bamboo fence round it, straw tents, standards, braziers, a bronze drum, reed-flower pennants
    bambooFence(k, [[-30, -150.5], [-30, -188], [30, -188], [30, -150.5]]);
    TENTS.forEach(([x, z]) => k.tent(x, z, 0, r.chance(0.5) ? 0xb8a070 : 0x9a8458, 5, 6));
    for (const sx of [-1, 1]) {
      k.standard(sx * 9, -183, 1.25, dinh, 10, [0, -160]);
      k.standard(sx * 25, -156, 1.05, mats.ally, 8, [0, -170]);
      k.lamp(sx * 6, -160, 0.6);
      k.flag(sx * 12, k.ground(sx * 12, -152), -152, 3.2, reedPennant);
    }
    bronzeDrum(k, -4, -184, 0, 1.5); k.commandTable(4, -183, 0.1);
    k.supplies(-25, -186, 0, 6); k.supplies(25, -186, 0, 5); k.shieldRack(-26, -172, Math.PI / 2); k.shieldRack(26, -172, -Math.PI / 2);
    for (let i = 0; i < 4; i++) reedFlags(k, (i < 2 ? -1 : 1) * r.range(12, 16), r.range(-186, -176), { n: 10, r: 1.2 });

    // ---- the bamboo hamlet: lũy tre round it, the two village gates, stilt houses either side of the lane, the banyan
    // by the shrine, areca palms, haystacks and a buffalo
    bambooScreen(k, [[-6, -150], [-36, -151], [-37, -101], [-6, -100.6]], { gap: 2.0, h: 10 });
    bambooScreen(k, [[6, -150], [36, -151], [37, -101], [6, -100.6]], { gap: 2.0, h: 10 });
    bambooScreen(k, [[-37, -101], [-62, -101.2]]); bambooScreen(k, [[37, -101], [62, -101.2]]);
    villageGate(k, 0, -150.1, 0, 8.8); villageGate(k, 0, -100.7, 0, 8.8);
    HOUSES.forEach(([x, z]) => stiltHouse(k, x, z, x < 0 ? -Math.PI / 2 : Math.PI / 2, 1));
    banyan(k, -13, -145, 1.05); shrine(k, -17.7, -145.8, Math.PI / 2, 1);
    for (let z = -146; z < -102; z += 9) for (const sx of [-1, 1]) areca(k, sx * r.range(10.5, 12.5), z + r.range(-2, 2), r.range(8, 11));
    for (const [x, z] of [[-30, -131], [29, -116], [-29, -114], [30, -147]]) haystack(k, x, z, r.range(0.8, 1));
    buffalo(k, 15, -131, 0.6); fishTrap(k, -15.5, k.ground(-15.5, -116), -116, 0.4);
    for (const [x, z] of [[-14, -112], [16, -142]]) k.supplies(x, z, r.range(0, 3), 3);
    k.lamp(-6, -104, 0.5);
    for (const [x, z] of [[-9, -104], [9, -104]]) k.standard(x, z, 1.05, mats.foe, 8);   // the Nguyễn scouts' standards

    // ---- the paddies: dikes and rice cells, buffalo and haystacks, foe standards on the far dikes
    paddy(k, [-58, -98, -6, -50], { cell: 6.5, rice: 0.55 }); paddy(k, [6, -98, 58, -50], { cell: 6.5, rice: 0.55 });
    for (const [x, z, yaw] of [[-40, -84, 0.6], [44, -70, -1.2], [-18, -62, 2.4]]) buffalo(k, x, z, yaw, 0.95);
    for (const [x, z] of [[-52, -92], [50, -88], [-50, -58], [52, -56], [24, -94]]) haystack(k, x, z, r.range(0.9, 1.1));
    for (const [x, z] of [[-48, -76], [48, -80], [-20, -96], [20, -90]]) k.standard(x, z, 1.05, r.chance(0.3) ? huucong : mats.foe, 8);
    // the dike line: an earth wall across the levee, the barricade on the road, an outpost (đồn) at either flank
    earthWall(k, [[-60, DIKE_Z], [-6.8, DIKE_Z]]); earthWall(k, [[6.8, DIKE_Z], [60, DIKE_Z]]);
    k.barricade('dike');
    k.burn(-3, DIKE_Z - 0.4, 1.0, 'dike'); k.burn(3.5, DIKE_Z + 0.2, 0.9, 'dike');
    for (const sx of [-1, 1]) {
      const x = sx * 34;
      for (let q = 0; q < 3; q++) props.push({ s: [14 - q * 1.6, 0.8, 7.4 - q * 0.8], p: [x, k.ground(x, -46) + 0.4 + q * 0.8, -45.6], c: sh(0x7a5c3e, 1 - q * 0.05) });
      bambooFence(k, [[x - 6.6, -42.4], [x - 6.6, -49], [x + 6.6, -49], [x + 6.6, -42.4]], { h: 2.2 });
      k.tower(x + sx * 3, -45.6, 7, 1.3);
      k.standard(x - sx * 4, -47, 1.1, huucong, 8.5, [x, -60]);
      k.lamp(x - sx * 3, -51.5, 0.6);
    }
    for (const [x, z] of [[-14, -46], [14, -46]]) k.lamp(x, z, 0.55);

    // ---- the approach: chông tre before the rampart, burning haystacks (def.fires), carts, foe standards
    stakes(k, [[-50, 11.5], [-7, 11.5]], { depth: 1.6 }); stakes(k, [[7, 11.5], [50, 11.5]], { depth: 1.6 });
    for (const [x, z, yaw, b] of [[-24, -30, 0.6, 1], [28, -20, -0.4, 0], [-38, -8, 2.1, 0], [12, -2, 1.2, 1]]) k.cart(x, z, yaw, !!b);
    for (const [x, z] of [[-40, -30], [42, -34], [-50, -12], [50, -4], [-20, 4], [24, 6]]) k.standard(x, z, 1.1, r.chance(0.3) ? huucong : mats.foe, 8.5);
    for (const sx of [-1, 1]) k.lamp(sx * 7, 10, 0.7);

    // ---- the fort: the earthen rampart on three sides, corner towers, the gatehouse, the river gate and palisade
    rampart(k, [[-54, WALL_Z], [-5.6, WALL_Z]], { h: 5.5, w: 8 }); rampart(k, [[5.6, WALL_Z], [54, WALL_Z]], { h: 5.5, w: 8 });
    rampart(k, [[-54, WALL_Z], [-54, RGATE_Z + 1]], { h: 5.5, w: 8 }); rampart(k, [[54, WALL_Z], [54, RGATE_Z + 1]], { h: 5.5, w: 8 });
    for (const [x, z] of [[-54, WALL_Z], [54, WALL_Z], [-54, RGATE_Z], [54, RGATE_Z]]) k.tower(x, z, 9.5, 1.6);
    gateTower(k, 0, WALL_Z, 0, 9, { h: 6.4 });
    gateTower(k, 0, RGATE_Z, 0, 14, { h: 5.6 });
    k.palisade([[-54, RGATE_Z], [-7.6, RGATE_Z]]); k.palisade([[7.6, RGATE_Z], [54, RGATE_Z]]);
    k.flag(-6, 6.4 + 1.2, WALL_Z - 1.6, 4, mats.pennant); k.flag(6, 6.4 + 1.2, WALL_Z - 1.6, 4, mats.pennant);
    for (let x = -50; x <= 50; x += 12) if (Math.abs(x) > 8) k.flag(x, 5.6, WALL_Z + 0.5, 3.2, mats.pennant);
    k.cloth(nguyen, 4.4, 7, 'drape', -11, 5.5, WALL_Z - 2.6, Math.PI);       // the great 阮 drape on the rampart face
    k.cloth(huucong, 3.4, 6, 'drape', 11, 5.5, WALL_Z - 2.6, Math.PI);
    // archers along the rampart walk, facing the approach (static: the real fight is on the ground)
    const walk = [];
    for (let x = -50; x < 50; x += 2.4) if (Math.abs(x) > 9) walk.push({ x: x + r.range(-0.4, 0.4), y: 5.6, z: WALL_Z + r.range(-0.8, 0.4), yaw: Math.PI + r.range(-0.25, 0.25), ph: r.range(0, 6.28) });
    k.troops('foe', walk);
    // inside: the hall (facing the court), bronze drums on its terrace, the great standards, braziers; granaries; huts
    longHall(k, HALL[0], HALL[1], -Math.PI / 2, { w: 24, d: 14, h: 0.9 });
    for (const dz of [-8, 8]) bronzeDrum(k, HALL[0] + 5.5, HALL[1] + dz, 0, 1.5, k.ground(HALL[0], HALL[1]) + 0.9);
    k.standard(-17, 72, 1.3, nguyen, 11, [0, 72]); k.standard(-17, 100, 1.3, huucong, 11, [0, 100]);
    for (const dz of [-8, 8]) k.lamp(-19, HALL[1] + dz, 0.75);
    GRANARIES.forEach(([x, z]) => granary(k, x, z, Math.PI / 2, 1.15));
    HUTS.forEach(([x, z]) => hut(k, x, z, -Math.PI / 2, 1.05));
    for (const [x, z] of [[-30, 40], [-24, 58], [26, 30], [30, 84], [12, 100], [-6, 64]]) k.supplies(x, z, r.range(0, 3), r.int(3, 6));
    for (const [x, z, yaw] of [[24, 96, 0.3], [-36, 104, 1.4]]) k.cart(x, z, yaw);
    for (const [x, z] of [[18, 40], [-18, 40], [20, 104], [-40, 106], [40, 104]]) k.standard(x, z, 1.1, r.chance(0.35) ? huucong : mats.foe, 8.5);
    k.shieldRack(-47, 76, Math.PI / 2); k.shieldRack(47, 86, -Math.PI / 2); k.shieldRack(-12, 107, Math.PI);
    for (const [x, z] of [[0, 104], [16, 60], [-10, 30]]) k.lamp(x, z, 0.6);
    for (const [x, z] of [[33, 44], [33, 60], [-47, 41]]) areca(k, x, z, r.range(8, 10));

    // ---- the landing: jetties and boats on the river, reeds, the river shrine, the ferryman's hut, nets and traps
    k.reeds();
    for (const x of [-46, -30, 30, 46]) jetty(k, x, 141, 0, 19, { y: 0.3 });
    for (const [x, z, yaw, o] of [[-38, 156, Math.PI / 2, { len: 10 }], [-22, 160, Math.PI / 2 + 0.1, { len: 9, roof: true }], [38, 154, Math.PI / 2, { len: 11, dragon: true }],
      [22, 158, -Math.PI / 2, { len: 8 }], [-60, 162, 1.3, { len: 9 }], [62, 160, -1.9, { len: 10, dragon: true }]]) boat(k, x, WY - 0.15, z, yaw, o);
    // Nguyễn Siêu's dragon war boats along the sandbar's south shore, flanking the ford
    for (const [x, z, yaw] of [[-28, 184, Math.PI / 2], [30, 185, -Math.PI / 2], [-52, 182, 1.4], [56, 183, -1.6]]) boat(k, x, WY - 0.15, z, yaw, { len: 12, dragon: true });
    shrine(k, -50.5, 126, Math.PI / 2, 1.5); k.lamp(-46, 124, 0.5);
    hut(k, 51, 127.5, -Math.PI / 2, 1.1); fishTrap(k, 44, k.ground(44, 122), 122, 1.2); fishTrap(k, -40, k.ground(-40, 134), 134, -0.4);
    for (const [x, z] of [[-58, 118], [58, 118], [-56, 140], [57, 142]]) areca(k, x, z, r.range(8, 11));
    for (const sx of [-1, 1]) { k.lamp(sx * 6, 136, 0.6); k.standard(sx * 15, 144, 1.1, sx < 0 ? nguyen : mats.foe, 8.5, [0, 130]); }
    for (let i = 0; i < 10; i++) reedFlags(k, (r.chance(0.5) ? -1 : 1) * r.range(16, 58), r.range(140, 146), { n: 12, r: 1.4 });

    // ---- the sandbar: reed stands, torches at the boats' landing, banana groves on the high silt beyond the field
    for (let i = 0; i < 16; i++) {
      const x = (r.chance(0.5) ? -1 : 1) * r.range(14, 38), z = r.range(192, 222);
      if (k.routeDist(x, z) > 9) reedFlags(k, x, z, { n: 14, r: 1.8 });
    }
    for (let i = 0; i < 26; i++) { const x = (r.chance(0.5) ? -1 : 1) * r.range(44, 110), z = r.range(194, 222); if (k.inAt(x, z) < -2) banana(k, x, z, r.range(0.9, 1.2)); }
    for (let i = 0; i < 30; i++) { const x = (r.chance(0.5) ? -1 : 1) * r.range(44, 110), z = r.range(190, 224); if (k.inAt(x, z) < -2) reedFlags(k, x, z, { n: 10, r: 2 }); }
    for (const [x, z] of [[-8, 206], [8, 212], [-6, 220], [6, 222]]) k.fire(...k.brazier(x, z, 0.5));
    for (const [x, z] of [[-14, 216], [14, 218]]) k.standard(x, z, 1.25, x < 0 ? nguyen : huucong, 10, [0, 200]);
    // the far channel: the warlord's fleet waiting, sails furled, more boats out on the water
    for (const [x, z, yaw, o] of [[-8, 231, Math.PI / 2, { len: 14, dragon: true }], [11, 233, -Math.PI / 2, { len: 13, dragon: true }],
      [-30, 236, 1.4, { len: 12, dragon: true }], [32, 238, -1.7, { len: 12, dragon: true }], [-60, 250, 1.2, { len: 9 }], [70, 262, -1.3, { len: 9 }],
      [0, 270, 1.6, { len: 10 }]]) boat(k, x, WY - 0.15, z, yaw, o);

    // ---- beyond the field: lũy tre and villages on the raised land either side, paddies' edges, distant hamlets
    bambooScreen(k, [[-66, -186], [-66, -104]], { gap: 2.6 }); bambooScreen(k, [[66, -186], [66, -104]], { gap: 2.6 });
    bambooScreen(k, [[-68, -96], [-68, 10]], { gap: 3 }); bambooScreen(k, [[68, -96], [68, 10]], { gap: 3 });
    bambooScreen(k, [[-68, 118], [-68, 146]], { gap: 2.6 }); bambooScreen(k, [[68, 118], [68, 146]], { gap: 2.6 });
    for (const [x, z, yaw] of [[-82, -140, 0.4], [-90, -60, 1.2], [84, -150, -0.6], [92, -40, -1.1], [-86, 60, 1.5], [88, 80, -1.4], [-92, 130, 1.3], [94, 136, -1.2]]) {
      if (k.inAt(x, z) < -3) stiltHouse(k, x, z, yaw, 1);
    }
    for (let i = 0; i < 40; i++) { const x = (r.chance(0.5) ? -1 : 1) * r.range(72, 112), z = r.range(-190, 140); if (k.inAt(x, z) < -4) areca(k, x, z, r.range(8, 12)); }
    for (let i = 0; i < 12; i++) { const x = (r.chance(0.5) ? -1 : 1) * r.range(74, 110), z = r.range(-180, 120); if (k.inAt(x, z) < -6) banyan(k, x, z, r.range(0.8, 1.1)); }

    // ---- the field: wrecks, arrows, the fallen's gear, torch posts along the road, reserve armies off the walk field
    k.wrecks();
    k.arrows([-50, -100, 50, 150], 60);
    k.debris([-50, -100, 50, 140], 120);
    k.torchPosts(-150, 146);
    for (const [x, z, f] of [[-12, -194, 0], [14, -194, 0], [-74, -120, 1.4], [74, -128, -1.4]]) k.formation('ally', x, z, f, r.int(8, 12), r.int(4, 6));
    for (const [x, z, f] of [[-74, 50, 1.5], [74, 70, -1.5], [-70, 120, 1.2], [72, 124, -1.2], [-56, 214, 0.5], [58, 210, -0.5]]) k.formation('foe', x, z, f, r.int(8, 12), r.int(4, 6));
    k.aftermath({ fallen: [[-46, 46, -95, -46, 18], [-46, 46, -38, 10, 22], [-44, 44, 24, 108, 20], [-40, 40, 114, 144, 10]],
      standards: [10, -46, -96, 46, 140], dust: { n: 30, area: [-56, -150, 56, 150], wall: [6, -50, 50, WALL_Z - 6] } });
    k.farFires([[-90, -10], [96, 30], [-84, 96], [80, -110], [-30, 290], [60, 300]]);
  },

  // the fort's two gates (own leaves: swing open with the sim gate), the battering ram (set 'ram'), the fort burning
  // after it falls (set 'burn'), and the river beyond the grid: the far channel and the strip past both flanks
  build(root, k) {
    const mat = lit(), mesh = (boxes, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(boxesGeometry(boxes.map((b) => ({ ...b, p: [b.p[0] - x, b.p[1] - y, b.p[2] - z] }))), mat);
      m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; root.add(m);
      return m;
    };
    // ---- water past the field: cut the ground under the far channel, then a silty plane to the horizon
    const ground = root.getObjectByName('ground');
    if (ground) {
      const pos = ground.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const z = pos.getZ(i), t = Math.min(1, Math.max(0, (z - FAR_Z + 1) / 5));
        if (t > 0) pos.setY(i, pos.getY(i) - t * t * (3 - 2 * t) * 1.4);
      }
      pos.needsUpdate = true; ground.geometry.computeVertexNormals(); ground.geometry.computeBoundingSphere();
    }
    const wmat = new THREE.MeshStandardMaterial({ color: 0x5c3c22, roughness: 0.32, metalness: 0.18 });
    const sheet = (x0, z0, x1, z1) => {
      const g = new THREE.PlaneGeometry(x1 - x0, z1 - z0); g.rotateX(-Math.PI / 2);
      const m = new THREE.Mesh(g, wmat); m.position.set((x0 + x1) / 2, WY - 0.02, (z0 + z1) / 2); m.receiveShadow = true; m.name = 'far-water';
      root.add(m);
    };
    sheet(-1600, FAR_Z + 2, 1600, 1600);
    for (const sx of [-1, 1]) sheet(sx < 0 ? -1600 : 120, river(sx * 120) - HW - 2.5, sx < 0 ? -120 : 1600, river(sx * 120) + HW + 2.5);

    // ---- gate leaves: hinged at the posts, swinging inward (fort gate) / outward to the river (river gate)
    const leaf = (w, h, dir) => {
      const b = [], x0 = dir > 0 ? 0 : -w;
      for (let x = 0; x < w - 0.01; x += 0.5) b.push({ s: [0.46, h * (0.97 + ((x * 7.3) % 0.06)), 0.32], p: [x0 + x + 0.25, h / 2, 0], c: shade(0x5a3a24, 0.85 + ((x * 3.7) % 0.25)) });
      for (const y of [0.7, h * 0.5, h - 0.7]) b.push({ s: [w - 0.2, 0.3, 0.42], p: [x0 + w / 2, y, -0.12], c: 0x3a2618 });
      for (let x = 0.4; x < w; x += 0.9) for (const y of [0.7, h * 0.5, h - 0.7]) b.push({ s: [0.12, 0.12, 0.1], p: [x0 + x, y, -0.36], c: 0x8a8070 });
      return b;
    };
    const piece = (boxes) => { const m = new THREE.Mesh(boxesGeometry(boxes), mat); m.castShadow = m.receiveShadow = true; root.add(m); return m; };
    const doors = [
      { id: 'fortGate', hinge: 4.5, w: 4.5, h: 5.0, z: WALL_Z },
      { id: 'riverGate', hinge: 7, w: 7, h: 4.4, z: RGATE_Z },
    ].map((d) => {
      const L = piece(leaf(d.w, d.h, 1)), R = piece(leaf(d.w, d.h, -1));
      L.position.set(-d.hinge, 0, d.z); R.position.set(d.hinge, 0, d.z);
      return { ...d, open: 1, L, R };
    });

    // ---- the battering ram: a log slung under a thatched frame on four wheels, rolled up to the fort gate
    const ram = [];
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      ram.push({ s: [0.3, 3.2, 0.3], p: [sx * 1.4, 1.8, sz * 2.4], c: 0x4a3020 }, { s: [0.3, 1.2, 1.2], p: [sx * 1.6, 0.6, sz * 2.4], c: 0x3a2618 });
    }
    for (const sx of [-1, 1]) ram.push({ s: [0.24, 0.24, 5.4], p: [sx * 1.4, 3.3, 0], c: 0x3a2618 });
    for (let q = 0; q < 4; q++) ram.push({ s: [3.6 - q * 0.6, 0.3, 6], p: [0, 3.5 + q * 0.3, 0], c: shade(0x9a8250, 1 - q * 0.05) });
    const ramFrame = mesh(ram, 0, 0, 0);
    const logB = [{ s: [0.7, 0.7, 7.2], p: [0, 2.0, 0.6], c: 0x5a3e28 }, { s: [0.9, 0.9, 0.7], p: [0, 2.0, 4.1], c: 0x6a6258 }];
    for (const sz of [-1.4, 1.4]) logB.push({ s: [0.08, 1.3, 0.08], p: [0, 2.8, sz], c: 0x8a7a5a });
    const ramLog = mesh(logB, 0, 0, 0);
    const RAM_Z = WALL_Z - 5.5;
    for (const m of [ramFrame, ramLog]) { m.position.set(0, 0, RAM_Z); m.visible = false; }

    // ---- the fort burning: granaries, huts, the palisade by the river gate, the rampart towers (parked light sites
    // come on with their fire)
    const P = [];
    const park = (x, y, z, i, d, t) => { const s = { x: 9e3, y: k.ground(x, z) + y, z: 9e3, i: 0, d, k: 0, at: [x, z], full: i, t }; k.sites.push(s); P.push(s); };
    let burnT = -1, ramT = -1, lastFrame = 0, ramGone = false;
    const lit0 = (t) => () => burnT >= t;
    GRANARIES.forEach(([x, z], i) => {
      const t = 1 + i * 2.5, gy = k.ground(x, z);
      k.fire(x, gy + 4.6, z, 1.9, true, lit0(t)); k.fire(x + 1.5, gy + 3.6, z - 2, 1.2, false, lit0(t + 1));
      park(x, 4, z, 60, 18, t);
    });
    HUTS.forEach(([x, z], i) => { const t = 4 + i * 2; k.fire(x, k.ground(x, z) + 3, z, 1.5, true, lit0(t)); park(x, 3, z, 44, 15, t); });
    for (const [x, z, s, t] of [[-24, RGATE_Z - 0.5, 1.3, 6], [26, RGATE_Z - 0.5, 1.4, 7.5], [-40, RGATE_Z - 0.5, 1.1, 9], [12, 34, 1.0, 3], [-20, 52, 1.1, 5]]) {
      k.fire(x, k.ground(x, z) + 0.6, z, s, s > 1.2, lit0(t)); park(x, 2, z, 36, 13, t);
    }
    const reset = () => { burnT = -1; ramT = -1; ramGone = false; };
    return {
      sets: { ram() { if (ramT < 0) ramT = 0; }, burn() { if (burnT < 0) burnT = 0; } },
      update(dt, game) {
        if (game.frame < lastFrame) reset();                                    // a new battle
        lastFrame = game.frame;
        if (game.mode !== 'story' && burnT < 0) burnT = 30;                     // free / trial: the fort has fallen
        if (burnT >= 0) burnT += dt;
        for (const s of P) { const on = burnT >= s.t; s.x = on ? s.at[0] : 9e3; s.z = on ? s.at[1] : 9e3; s.i = s.full * Math.min(1, Math.max(0, (burnT - s.t) * 0.8)); }
        // the ram: rolls up over 3 s, then pulls back and slams the gate every 1.7 s until the gate gives
        let shake = 0;
        const show = ramT >= 0 && !ramGone && game.mode === 'story';
        ramFrame.visible = ramLog.visible = show;
        if (show) {
          ramT += dt;
          const roll = Math.min(1, ramT / 3), base = RAM_Z - 8 * (1 - roll * (2 - roll));
          ramFrame.position.z = base;
          const ph = ramT > 3 ? ((ramT - 3) % 1.7) / 1.7 : 0, swing = ph < 0.8 ? -1.4 * Math.sin(ph / 0.8 * Math.PI / 2) : -1.4 + 1.4 * ((ph - 0.8) / 0.2) ** 2;
          ramLog.position.z = base + swing;
          if (ramT > 3 && ph > 0.97) shake = 0.05;
          if (GATES.fortGate?.open && ramT > 1) ramGone = true;
        }
        for (const d of doors) {
          const target = GATES[d.id]?.open ? 1 : 0;
          d.open = game.frame < 2 ? target : d.open + (target - d.open) * Math.min(1, dt * 2.2);
          const a = d.open * (2 - d.open) * 1.45 + (d.id === 'fortGate' ? shake * (1 - d.open) : 0);
          d.L.rotation.y = -a; d.R.rotation.y = a;
        }
      },
    };
  },
};
