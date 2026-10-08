// Hoa Lư (華閭, 951) laid out along +Z, ≈ 370 m from the Đinh hall to the Ngô kings' command — a DW8 stage played as a
// SORTIE: the hero starts inside the karst-ringed citadel and fights outward, through its own gate, across the Ngô siege
// lines to the royal camp. The limestone towers of Hoa Lư – Tràng An frame every view; the HOME map (title / select).
//   Thành Hoa Lư   the citadel        z -172 … -128  h 0   a valley pocket among karsts: stilt houses, the Đinh hall
//                                                          precinct behind a temple gate (tam quan), bronze drums, reed
//                                                          stands (cờ lau), bamboo; story start, title / select stage
//   Bến Sào Khê    the river landing  z -132 …  -76  h 0   the Sào Khê crosses the valley: a plank bridge (anchor
//                                                          'landing'), two stepping-stone fords, Ngô dragon boats that
//                                                          slipped in along the river (set 'boats' burns them), Đinh sampans
//   Cổng thành     the gate yard      z  -80 …  -44  h 0   the muster yard behind the rampart; the wall (z -42 … -32) is
//                                                          rammed earth linking two karst towers, crossbowmen on its walk;
//                                                          the gatehouse (gateTower + the doors here: gate 'hoalu', anchor
//                                                          'gate' = the passage's middle)
//   Lũy vây nhà Ngô the siege lines   z  -32 …   76  h 0   paddies and dikes outside the wall (free-mode arena), burnt
//                                                          siege wrecks, the Ngô palisade across z 60 with bamboo stakes
//                                                          and its barricade (gate 'siege', anchor 'siege'); behind it the
//                                                          hostage pole on its mound (anchor 'pole'; sets 'hostage' /
//                                                          'freed' raise and lower it)
//   (ramp)                            z   68 …  100  h 0→5 up onto the low rise the Ngô camp stands on
//   Doanh trại Ngô the Ngô camp       z   98 …  150  h 5   palisaded, tents in ochre and black, its front barricade (gate
//                                                          'camp', anchor 'campgate')
//   Ngự doanh      the royal command  z  148 …  200  h 5   the kings' pavilion on its terrace under yellow parasols, war
//                                                          drums, the great 吳 banner (anchor 'dais'); Ngô Xương Văn
// Morning: a low golden sun ahead-right of the sortie, mist lying in the valleys, the karsts standing out of it in
// layers. Format: src/world/maps/index.js header (engine); Vietnamese dressing helpers: ../viet.js.
import * as THREE from 'three';
import { boxesGeometry, shade } from '../../../../src/core/voxel.js';
import { lit } from '../../../../src/world/castle.js';
import { GATES } from '../../../../src/world/map.js';
import * as V from '../viet.js';

const RIVER_Z = -104, RHW = 5.5;                    // Sào Khê: centre at the bridge, deep half width
const WALL_Z = -37, WALL_D = 10, WALL_H = 7;        // the rampart: centre line, thickness (faces at -42 / -32), height
const PASS = 7.2, GT_W = 22, GT_H = 8;              // gate passage width, gatehouse width / height
const SIEGE_Z = 60;                                 // the Ngô palisade line
const CAMP_H = 5, CAMP_Z = 98;                      // the Ngô camp plateau height, its front palisade line
const POLE = [-9, 72];                              // the hostage pole (on its mound behind the palisade)
const DAIS = [0, 192];                              // the royal pavilion terrace

// the river: straight under the bridge, meandering to either side
const riverC = (x) => RIVER_Z + 6 * Math.sin(x * 0.045 + 0.4) * Math.min(1, (x / 24) ** 2);
const smooth = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };

// stilt houses in the citadel [x, z, yaw (door toward the road), scale] — solid footprints
const HOUSES = [[-26, -160, -Math.PI / 2, 1], [-27, -141, -Math.PI / 2, 0.95], [26, -157, Math.PI / 2, 1], [27, -139, Math.PI / 2, 0.9]];
const houseFoot = ([x, z, , s]) => [x - 6.2 * s, z - 3.6 * s, x + 6.2 * s, z + 3.6 * s];

export default {
  id: 'hoalu',
  name: { zh: 'Hoa Lư', en: 'Hoa Lư Citadel' },
  grid: [-140, -230, 140, 236],
  pieces: [
    { id: 'citadel', rect: [-36, -172, 36, -128], h: 0, edge: 3, rise: 20 },
    { id: 'saokhe', rect: [-52, -132, 52, -76], h: 0, edge: 3, rise: 16 },
    { id: 'yard', rect: [-38, -80, 38, -44], h: 0, edge: 2, rise: 22 },
    { id: 'gateway', rect: [-PASS / 2, -46, PASS / 2, -28], h: 0, rise: 3 },
    { id: 'apron', rect: [-40, -32, 40, -12], h: 0, edge: 2, rise: 10 },
    { id: 'field', rect: [-62, -16, 62, 76], h: 0, edge: 3, rise: 8 },
    { id: 'ramp', path: [[0, 68, 13, 0], [0, 84, 11.5, 2.2], [0, 100, 12, CAMP_H]], edge: 1.5, rise: 8 },
    { id: 'camp', rect: [-44, 98, 44, 150], h: CAMP_H, edge: 2.5, rise: 10 },
    { id: 'royal', ell: [0, 174, 30, 26], h: CAMP_H, edge: 1.5, rise: 12 },
  ],
  // the bridge's sides over the deep water; the Ngô palisade arms either side of their barricade; the camp's front
  // palisade either side of its gate
  carve: [[-12, RIVER_Z - RHW, -2.7, RIVER_Z + RHW], [2.7, RIVER_Z - RHW, 12, RIVER_Z + RHW],
    [-72, SIEGE_Z - 1.5, -10, SIEGE_Z + 1.5], [10, SIEGE_Z - 1.5, 72, SIEGE_Z + 1.5],
    [-52, CAMP_Z - 1.5, -12, CAMP_Z + 1.5], [12, CAMP_Z - 1.5, 52, CAMP_Z + 1.5]],
  // solid set pieces: the rampart either side of the gatehouse and its two bastions, the stilt houses, the hall precinct
  // behind the temple gate, the hostage mound, the Ngô watchtowers at both barricades, the royal terrace
  props: [[-50, WALL_Z - WALL_D / 2, -PASS / 2 - 0.1, WALL_Z + WALL_D / 2], [PASS / 2 + 0.1, WALL_Z - WALL_D / 2, 50, WALL_Z + WALL_D / 2],
    [-GT_W / 2 - 0.4, WALL_Z - 5.8, -PASS / 2 - 0.1, WALL_Z + 5.8], [PASS / 2 + 0.1, WALL_Z - 5.8, GT_W / 2 + 0.4, WALL_Z + 5.8],
    ...HOUSES.map(houseFoot), [-24, -200, 24, -174],
    [POLE[0] - 3, POLE[1] - 3, POLE[0] + 3, POLE[1] + 3],
    [10.5, SIEGE_Z + 1.5, 15.5, SIEGE_Z + 6], [-15.5, SIEGE_Z + 1.5, -10.5, SIEGE_Z + 6],
    [13, CAMP_Z + 1.5, 18, CAMP_Z + 6], [-18, CAMP_Z + 1.5, -13, CAMP_Z + 6],
    [DAIS[0] - 10, DAIS[1] - 5.5, DAIS[0] + 10, DAIS[1] + 6]],
  zones: [
    { id: 'citadel', name: { zh: 'Thành Hoa Lư', en: 'Hoa Lư Citadel' }, x: 0, z: -150, w: 72, d: 44 },
    { id: 'saokhe', name: { zh: 'Bến Sào Khê', en: 'Sào Khê Landing' }, x: 0, z: -104, w: 104, d: 56 },
    { id: 'yard', name: { zh: 'Cổng thành', en: 'The Citadel Gate' }, x: 0, z: -60, w: 76, d: 32 },
    { id: 'field', name: { zh: 'Lũy vây nhà Ngô', en: 'Ngô Siege Lines' }, x: 0, z: 22, w: 124, d: 108 },
    { id: 'camp', name: { zh: 'Doanh trại nhà Ngô', en: 'Ngô Camp' }, x: 0, z: 124, w: 88, d: 52 },
    { id: 'royal', name: { zh: 'Ngự doanh', en: 'Royal Command' }, x: 0, z: 174, r: 26 },
  ],
  route: [[0, -162], [0, -140], [0, -126], [0, -114], [0, RIVER_Z], [0, -94], [0, -78], [0, -56], [0, WALL_Z], [0, -24], [-3, 0], [3, 24],
    [0, 46], [0, SIEGE_Z], [0, 72], [0, 84], [0, CAMP_Z + 2], [0, 124], [0, 150], [0, 176]],
  gates: {
    hoalu: { rect: [-7, WALL_Z - 1.5, 7, WALL_Z + 1.5], name: { zh: 'Cổng thành Hoa Lư', en: 'Hoa Lư Gate' }, kind: 'doors' },
    siege: { rect: [-13, SIEGE_Z - 1.5, 13, SIEGE_Z + 1.5], name: { zh: 'Lũy chắn nhà Ngô', en: 'Ngô Siege Barricade' }, kind: 'barricade', at: [0, SIEGE_Z, 0, 9.5] },
    camp: { rect: [-14, CAMP_Z - 1.5, 14, CAMP_Z + 1.5], name: { zh: 'Cửa doanh trại', en: 'Camp Barricade' }, kind: 'barricade', at: [0, CAMP_Z, 0, 10.5] },
  },
  // gate: the citadel gate's passage · landing: the bridge over the Sào Khê · pole: the hostage pole · siege / campgate:
  // the two barricades · dais: the royal pavilion terrace's front
  anchors: { gate: [0, WALL_Z], landing: [0, RIVER_Z], pole: POLE, siege: [0, SIEGE_Z], campgate: [0, CAMP_Z], dais: [DAIS[0], DAIS[1] - 6] },
  // story: the head of the Đinh ranks in the citadel's court, facing the river and the gate tower between the karsts;
  // free: the paddies outside the wall
  spawn: { story: { x: 0, z: -146, yaw: 0, tilt: -0.08 }, free: { x: 0, z: 20, yaw: 0 } },
  water: {
    along: 'x', c: riverC, hw: RHW, bed: [1.7, 0.45], fords: [[-34, -24], [-4.6, 4.6, -1.0], [24, 34]], y: -0.2, stones: 30,
    tint: { deep: 0x1a2a26, shallow: 0x56604a, sun: [1, 0.8, 0.52] },
    // the plank bridge spans real water: the render bed drops under it (the sim keeps the deck walkable)
    bedHeight(x, z, h) {
      const wet = 1 - smooth(RHW - 1, RHW + 3, Math.abs(z - riverC(x)));
      return Math.abs(x) <= 12 && wet > 0 ? Math.min(h, -this.bed[0] * wet) : h;
    },
  },
  // morning: the sun low ahead-right, pale gold through mist; the haze lies thick in the valleys (dust = ground mist)
  sky: {
    sunElev: 0.13, sunAz: 0.85, sunCore: [4.6, 4.0, 3.0],
    haze: 0xa2acb6, hazeWarm: 0xe0be8c, glow: 0xffe2b4, skyMid: 0xacb8c8, skyTop: 0x5878a4,
    hznSun: 0xffcc84, hznAway: 0xc8c6c0, cloudRose: 0xe6c0a2, cloudShade: 0x8a90a4, cloudLit: 0xfff0d0,
    dust: [8.0, 36.0, 2.6, 0.1], dustLit: 0xe8d6b6, dustShade: 0x8a96a8, apCool: 0x96a4bc,
  },
  fog: [30, 300],
  // key: the brazier by the citadel's court (the select officer's warm key); fill: the kings' pavilion faces the hero
  // with the sun behind it — a warm fill eases in on the royal approach
  light: { hemi: [0xbccce4, 0x8a8058, 2.3], sun: [0xffe0b4, 3.9], rim: [0xffc890, 1.3], dir: [0.62, 0.52, 0.58], fire: 0xff9a4a, key: [-9, -142], fill: [150, 182, 1.2] },
  post: { exposure: 1.24, sat: 1.18, rays: 1.0, rayTint: [1.0, 0.84, 0.58], bloom: 0.6, highTint: [1.1, 1.02, 0.84], shadowTint: [0.8, 0.94, 1.2] },
  castle: null,
  terrain: {
    pave: (x, z) => (Math.hypot(x, z + 150) < 12 ? 0.55 : 0)                  // the citadel's court
      + (z > -80 && z < -44 && Math.abs(x) < 14 ? 0.45 : 0)                   // the worn yard before the gate
      + (Math.hypot(x, z - 178) < 13 ? 0.6 : 0),                              // the royal parade ground
    bare: (x, z) => (z > 94 && Math.abs(x) < 46) || (z > -82 && z < -42 && Math.abs(x) < 30),   // the Ngô camp, the yard
    rock: (h, x, z) => h - (z > 84 ? CAMP_H : 0) - 2,
    scorch: { n: 20, area: [-52, -20, 52, 150], spots: [[0, SIEGE_Z - 1, 0.9], [6, SIEGE_Z, 0.8], [-20, 126, 0.8], [24, 112, 0.7], [-4, CAMP_Z + 1, 0.8]] },
    rubble: [-50, -126, 50, 196],
    pines: [400, 500],                                                        // karst shrubs, not pine forest
    // pale limestone: grey-white strata, dark rain streaks, green-crowned tops and mossy shelves
    cliff: { rock: 0x8c877c, dark: 0x57534a, top: 0x5a6a3c, moss: 0x48622e, grassy: 0x62783a },
    mountains: { peakA: 0.05, peak: 16 },
  },
  // burnt Ngô siege gear on the paddies and in the camp: [x, z, scale]
  fires: [[-34, 8, 1.1], [36, 30, 1.2], [-46, 44, 1.0], [30, -6, 1.0], [-28, 122, 1.1], [32, 134, 1.0]],
  // firelight: the citadel's court braziers, the gate (inside and out), siege wrecks, both barricades, the pavilion steps
  lightSites: [[-9, 1.9, -142, 26, 10], [9, 1.9, -142, 26, 10], [-6, 1.9, -48, 28, 10], [6, 1.9, -48, 28, 10], [-6, 1.9, -26, 26, 10], [6, 1.9, -26, 26, 10],
    [-34, 2.2, 8, 26, 10], [36, 2.2, 30, 28, 11], [-4, 2.2, SIEGE_Z - 0.5, 28, 11], [5, 2.2, SIEGE_Z, 26, 10], [-6, 2.2, CAMP_Z - 0.5, 26, 10],
    [-28, 2.2, 122, 24, 10], [-7, 3.1, DAIS[1] - 6.6, 30, 12], [7, 3.1, DAIS[1] - 6.6, 30, 12]],
  hq: [0, 188],
  stage: { title: [0, -152], select: [0, -139] },   // the citadel's court: the key-art pair before the river and the gate tower
  minimap: { walls: [[-50, WALL_Z - WALL_D / 2, -PASS / 2, WALL_Z + WALL_D / 2], [PASS / 2, WALL_Z - WALL_D / 2, 50, WALL_Z + WALL_D / 2]] },

  dress(k) {
    const { r, mats, props, poles, shade: sh } = k;
    const dinh = k.banner('丁', { bg: '#a3261a', fg: '#f2d68a', border: '#4a120a', w: 160, h: 320, seed: 31 });
    const ngo = k.banner('吳', { bg: '#c99a1e', fg: '#1a0d06', border: '#2a1a0a', w: 160, h: 320, seed: 32 });
    const namtan = k.banner('南晉', { bg: '#1c1610', fg: '#e8c050', border: '#c99a1e', w: 128, h: 256, seed: 33 });
    const thiensach = k.banner('天策', { bg: '#1c1610', fg: '#e8c050', border: '#c99a1e', w: 128, h: 256, seed: 34 });
    const yellow = k.banner('', { bg: '#c89a24', fg: '#000', border: '#6a4a10', w: 64, h: 128, tatter: false, seed: 35 });

    // ---- karst towers: they frame every view. Near ones stand out of the valley walls, a second rank behind, a far
    // ring toward the grid rim (bases settle onto the outer plain there); skipped wherever they would touch the fight
    const halfW = (z) => (z < -128 ? 36 : z < -76 ? 52 : z < -44 ? 38 : z < -16 ? 40 : z < 76 ? 62 : z < 98 ? 14 : z < 150 ? 44 : 30);
    for (let z = -224; z <= 230; z += r.range(11, 17)) for (const sx of [-1, 1]) {
      const hw = halfW(z), near = r.range(13, 24), rr = r.range(6, 10.5);
      V.karstRange(k, [[sx * (hw + near + rr), z + r.range(-4, 4), r.range(22, 46), rr, r.range(-0.4, 0.4)]]);
      if (r.chance(0.7)) { const rr2 = r.range(9, 15); V.karstRange(k, [[sx * Math.min(128, hw + near + rr + r.range(22, 44)), z + r.range(-6, 6), r.range(36, 66), rr2, r.range(-0.3, 0.3)]]); }
    }
    for (let i = 0; i < 9; i++) V.karstRange(k, [[r.range(-90, 90), r.range(212, 230), r.range(40, 70), r.range(10, 16)]]);   // the far north
    for (let i = 0; i < 7; i++) V.karstRange(k, [[r.range(-80, 80), r.range(-226, -210), r.range(36, 60), r.range(9, 14)]]);  // behind the hall
    // the two towers the rampart runs into, either side of the gate
    for (const sx of [-1, 1]) V.karst(k, sx * 55, WALL_Z - 1, { h: 46, r: 8.5, lean: sx * 0.2 });

    // ---- Thành Hoa Lư: the hall precinct behind its temple gate, stilt houses along the court, bronze drums, reeds
    { const gy = k.ground(0, -186);
      props.push({ s: [44, 0.5, 26], p: [0, gy + 0.25, -187], c: 0x6a5e4c });                     // the precinct's beaten court
      V.stiltHouse(k, 0, -188, Math.PI, 1.7);                                                     // the Đinh hall
      V.stiltHouse(k, -15, -185, Math.PI - 0.15, 1.05); V.stiltHouse(k, 15, -185, Math.PI + 0.15, 1.05);
      V.bambooHedge(k, [[-23, -176], [-8, -176]], { h: 8 }); V.bambooHedge(k, [[8, -176], [23, -176]], { h: 8 });
      V.templeGate(k, 0, -175.5, Math.PI, 1.15);
      for (const sx of [-1, 1]) { k.standard(sx * 9, -178, 1.25, dinh, 10.5, [0, -150]); V.areca(k, sx * 21, -180, r.range(8, 10)); }
      V.banyan(k, -19, -196, 1.3); V.bamboo(k, 20, -196, { n: 12, h: 11, spread: 2 }); }
    for (const h of HOUSES) V.stiltHouse(k, h[0], h[1], h[2], h[3]);
    for (const [x, z] of [[-31, -151], [31, -149], [-32, -131], [32, -131], [-31, -168], [31, -168]]) V.bamboo(k, x, z, { n: r.int(8, 12), h: r.range(9, 12), spread: 1.8 });
    for (const [x, z, h] of [[-20, -168, 9], [20, -168, 10], [-32, -158, 8.5], [32, -146, 9]]) V.areca(k, x, z, h);
    V.banyan(k, 30, -130, 1.1);
    // the war drums of the Đinh: two bronze drums on a low platform by the court, a frame drum beside them
    { const gy = k.ground(-13, -152);
      props.push({ s: [5.4, 0.4, 3.2], p: [-13.5, gy + 0.2, -152], c: 0x6a5e50 });
      V.bronzeDrum(k, -15, -152, 0, 1.5, gy + 0.4); V.bronzeDrum(k, -12, -152, 0.4, 1.2, gy + 0.4); }
    V.bronzeDrum(k, 13, -152, 0.2, 1.4);
    // reed stands with white plumes — the reed-flower banners of Đinh Bộ Lĩnh's boyhood — round the court and on the banks
    for (const [x, z] of [[-30, -137], [30, -165], [-17, -132], [18, -131], [-33, -146], [33, -134]]) V.reedFlags(k, x, z, { n: 16, r: 1.8 });
    for (const [x, z] of [[-6, -136], [6, -136], [-9, -142], [9, -142]]) k.lamp(x, z, 0.6);
    for (const sx of [-1, 1]) { k.standard(sx * 16, -133, 1.15, mats.ally, 9, [0, -146]); k.standard(sx * 22, -149, 1.1, dinh, 9.5, [0, -150]); }
    for (const [x, z] of [[-29, -150], [29, -131]]) V.haystack(k, x, z, 1);
    V.shrine(k, 24, -147, -Math.PI / 2, 1);
    for (const [x, z, yaw] of [[-24, -131, 0.3], [23, -165, -0.2]]) k.supplies(x, z, yaw, r.int(4, 6));

    // ---- Bến Sào Khê: reeds and white plumes on the banks, lotus in the still reaches, boats; the plank bridge: build
    k.reeds();
    for (const x of [-46, -40, -18, -12, 14, 19, 40, 47]) for (const sd of [-1, 1]) {
      const z = riverC(x) + sd * (RHW + r.range(2.5, 5));
      if (k.inAt(x, z) > 0.5 && Math.abs(x) > 7) V.reedFlags(k, x, z, { n: 12, r: 1.6 });
    }
    for (const x of [-44, -16, 18, 44]) V.lotus(k, x, -0.2, riverC(x) + r.range(-1.5, 1.5), 2.2);
    // Đinh sampans moored by the fords; the Ngô dragon boats that slipped in at the landing (they burn: set 'boats')
    for (const [x, yaw] of [[-40, Math.PI / 2 + 0.1], [42, -Math.PI / 2 + 0.1]]) V.boat(k, x, -0.25, riverC(x) + r.range(-1, 1), yaw, { len: 8 });
    for (const [x, yaw] of [[-15, Math.PI / 2 - 0.12], [16, -Math.PI / 2 + 0.08]]) V.boat(k, x, -0.3, riverC(x) + 0.6, yaw, { len: 11, dragon: true });
    for (const [x, z, yaw] of [[-30, -122, 0.4], [30, -86, -0.6], [-34, -86, 2.6]]) k.cart(x, z, yaw);
    for (const [x, z] of [[-6, -116], [6, -116], [-6, -92], [6, -92]]) k.lamp(x, z, 0.55);
    for (const [x, z] of [[-42, -124], [42, -122], [-44, -84], [44, -86]]) k.standard(x, z, 1.1, mats.ally);
    for (const [x, z] of [[-22, -88], [24, -90]]) k.standard(x, z, 1.05, mats.foe);              // the boat party's flags

    // ---- Cổng thành: the rampart and gatehouse (doors: build), Đinh crossbowmen on the walk, the yard's muster
    V.rampart(k, [[-50, WALL_Z], [-GT_W / 2, WALL_Z]], { h: WALL_H, w: WALL_D });
    V.rampart(k, [[GT_W / 2, WALL_Z], [50, WALL_Z]], { h: WALL_H, w: WALL_D });
    V.gateTower(k, 0, WALL_Z, { pass: PASS, depth: WALL_D, h: GT_H, w: GT_W });
    k.flag(-GT_W / 2 + 1, GT_H + 0.3, WALL_Z + 4.5, 5.5, mats.allyFlag); k.flag(GT_W / 2 - 1, GT_H + 0.3, WALL_Z + 4.5, 5.5, mats.allyFlag);
    for (let x = -46; x < 46; x += 8.5) if (Math.abs(x) > GT_W / 2 + 2) k.flag(x + r.range(-1, 1), WALL_H + 0.2, WALL_Z + 1.8, 3.2, r.chance(0.35) ? dinh : mats.allyFlag);
    const guard = [];
    for (let x = -47; x < 47; x += r.range(1.4, 2.6)) {
      if (Math.abs(x) < GT_W / 2 + 0.5) continue;
      guard.push({ x, y: WALL_H + 0.3, z: WALL_Z + r.range(0.6, 1.8), yaw: r.range(-0.25, 0.25), ph: r.range(0, 6.28) });
    }
    for (let x = -7; x <= 7; x += 1.6) guard.push({ x: x + r.range(-0.3, 0.3), y: GT_H + 0.3, z: WALL_Z + 4.6, yaw: r.range(-0.2, 0.2), ph: r.range(0, 6.28) });
    k.troops('ally', guard);
    for (const [x, z] of [[-6, -48], [6, -48]]) k.lamp(x, z, 0.75);
    for (const [x, z] of [[-6, -26], [6, -26]]) k.lamp(x, z, 0.7);
    k.tower(-34, -48, 6, 1.3, mats.allyFlag); k.tower(34, -50, 6, 1.3, mats.allyFlag);
    for (const [x, z, yaw] of [[-30, -70, Math.PI / 2], [30, -64, -Math.PI / 2], [-14, -76, 0.2]]) k.shieldRack(x, z, yaw);
    for (const [x, z, yaw] of [[-33, -58, Math.PI / 2], [33, -74, -Math.PI / 2], [18, -77, 0]]) k.supplies(x, z, yaw, r.int(5, 7));
    V.bronzeDrum(k, -10, -47, 0, 1.3);
    k.drum(12, -47.5, 0.3);
    for (const sx of [-1, 1]) k.standard(sx * 12, -53, 1.2, dinh, 10, [0, -70]);
    // the Ngô scaling ladders still up against the outer face, two thrown over into the yard
    for (const x of [-40, -27, 19, 33, 44]) V.ladder(k, x + r.range(-1, 1), WALL_Z + WALL_D / 2 + 2.3, Math.PI, WALL_H);
    for (const x of [-22, 26]) V.ladder(k, x, WALL_Z - WALL_D / 2 - 2.2, 0, WALL_H, { lean: 0.32 });
    for (const sx of [-1, 1]) V.bamboo(k, sx * 37, -54, { n: 9, h: 10 });

    // ---- Lũy vây nhà Ngô: paddies off the road, siege wrecks, the Ngô flank camps, the palisade, stakes and barricade
    V.paddy(k, [-60, -12, -9, 52], { cell: 6, rice: 0.65 });
    V.paddy(k, [9, -12, 60, 52], { cell: 6, rice: 0.6 });
    for (const [x, z, yaw] of [[-34, 8, 2.2], [36, 30, 0.8], [30, -6, 1.6]]) k.cart(x, z, yaw, true);
    for (let z = -6; z <= 50; z += 8) for (const sx of [-1, 1]) if (r.chance(0.75)) k.tent(sx * (56 + r.range(-1.5, 1.5)), z + r.range(-1, 1), Math.PI / 2 + r.range(-0.15, 0.15), r.chance(0.5) ? 0xa88a3a : 0x3a3228, 4.4, 5.4);
    for (const [x, z] of [[-50, -10], [50, -8], [-52, 30], [52, 26], [-24, 54], [26, 54], [-46, 56], [46, 56]]) k.standard(x, z, 1.05, r.chance(0.25) ? mats.pennant : mats.foe);
    for (const [x, z, yaw] of [[-48, 18, Math.PI / 2], [48, 40, -Math.PI / 2]]) k.supplies(x, z, yaw, 6);
    V.stakes(k, [[-62, SIEGE_Z - 3.2], [-12, SIEGE_Z - 3.2]]); V.stakes(k, [[12, SIEGE_Z - 3.2], [62, SIEGE_Z - 3.2]]);
    k.palisade([[-72, SIEGE_Z], [-10.5, SIEGE_Z]]); k.palisade([[10.5, SIEGE_Z], [72, SIEGE_Z]]);
    k.tower(-13, SIEGE_Z + 3.7, 6.5, 1.3); k.tower(13, SIEGE_Z + 3.7, 6.5, 1.3);
    k.barricade('siege');
    k.burn(-3, SIEGE_Z + 0.5, 1.0, 'siege'); k.burn(5, SIEGE_Z, 1.1, 'siege');
    for (const [x, z] of [[-4, SIEGE_Z - 4.5], [5, SIEGE_Z - 4.5]]) k.standard(x, z, 1.15, ngo, 9.5, [0, 20]);
    // behind the line: tents, the hostage mound and its rope-men (the pole itself: build)
    for (let x = -56; x <= 56; x += 9) if (Math.abs(x) > 18) k.tent(x + r.range(-1.5, 1.5), 70 + r.range(-2, 2), r.range(-0.2, 0.2), r.chance(0.5) ? 0xa88a3a : 0x3a3228, 4.6, 5.4);
    { const [px, pz] = POLE, gy = k.ground(px, pz);
      for (let i = 0; i < 4; i++) props.push({ s: [5.8 - i * 1.1, 0.4, 5.8 - i * 1.1], p: [px, gy + 0.2 + i * 0.38, pz], r: [0, i * 0.3, 0], c: sh(0x7a6044, 0.9 + i * 0.04) });
      const men = [];
      for (const [dx, dz, yaw] of [[-2.6, 1.8, 1.9], [2.4, 2.2, -2.0], [-1.8, -2.6, 0.5], [2.6, -2.2, -0.6]]) men.push({ x: px + dx, y: gy + 0.3, z: pz + dz, yaw, ph: r.range(0, 6.28) });
      k.troops('foe', men);
      k.standard(px + 4.5, pz + 3, 1.0, namtan, 8, [0, 40]); }

    // ---- the ramp and the Ngô camp: front palisade and barricade, towers, tents, drums, 吳 standards
    k.palisade([[-52, CAMP_Z], [-12.5, CAMP_Z]]); k.palisade([[12.5, CAMP_Z], [52, CAMP_Z]]);
    k.palisade([[-46, CAMP_Z + 2], [-46, 150]]); k.palisade([[46, CAMP_Z + 2], [46, 150]]);
    k.tower(-15.5, CAMP_Z + 3.8, 7, 1.35); k.tower(15.5, CAMP_Z + 3.8, 7, 1.35);
    k.barricade('camp');
    k.burn(-4, CAMP_Z, 1.0, 'camp'); k.burn(4, CAMP_Z + 0.5, 1.1, 'camp');
    for (const [x, z] of [[-16, 82], [16, 84]]) k.standard(x, z, 1.1, mats.foe, 9, [0, 80]);
    for (let z = 106; z < 146; z += 7.5) for (const sx of [-1, 1]) k.tent(sx * (39 + r.range(-1.5, 1.5)), z + r.range(-1, 1), Math.PI / 2 + r.range(-0.15, 0.15), r.chance(0.55) ? 0xb8922e : 0x2e2820, 4.8, 5.8);
    for (const sx of [-1, 1]) for (let z = 108; z < 140; z += 12) k.tent(sx * (24 + r.range(-1, 1)), z + r.range(-1, 1), r.range(-0.2, 0.2), r.chance(0.5) ? 0xb8922e : 0x2e2820, 4.2, 5);
    for (const [x, z, yaw] of [[-30, 104, 0.2], [30, 104, -0.2], [-14, 146, Math.PI], [14, 146, Math.PI]]) k.supplies(x, z, yaw, r.int(5, 7));
    for (const [x, z, yaw] of [[-33, 116, Math.PI / 2], [33, 128, -Math.PI / 2]]) k.shieldRack(x, z, yaw);
    for (const [x, z] of [[-10, 108], [10, 108], [-10, 140], [10, 140], [-30, 128], [30, 116]]) k.lamp(x, z, 0.6);
    for (const [x, z] of [[-42, 101], [42, 101], [-42, 147], [42, 147], [-18, 124], [18, 124]]) k.standard(x, z, 1.1, mats.foe, 8.5, [0, 124]);
    k.drum(-32, 140, Math.PI / 2 + 0.3); k.drum(32, 110, -Math.PI / 2 - 0.3);
    k.commandTable(-22, 134, 0.2);
    for (const [x, z, yaw] of [[-30, 152, 0.2], [30, 150, -0.3]]) k.cart(x, z, yaw);

    // ---- Ngự doanh: the kings' pavilion on its terrace, yellow parasols, drums, the great banners
    { const [x, z] = DAIS, gy = k.ground(x, z);
      props.push({ s: [20, 1.3, 11.5], p: [x, gy + 0.65, z], c: 0x6e5e4a }, { s: [20.2, 0.12, 0.2], p: [x, gy + 1.3, z - 5.75], c: 0xb89048 });
      for (let q = 0; q < 3; q++) {
        const top = 0.43 * (q + 1), d = 1.4 - q * 0.45;
        props.push({ s: [7 - q * 0.3, top, d], p: [x, gy + top / 2, z - 5.75 - d / 2 + 0.01 * q], c: sh(0x5e5040, 1 + q * 0.05) });
      }
      k.pagoda(x, gy + 1.3, z + 0.5, 13, 8, 2, 1);
      // yellow drapes hung under the eaves, lanterns, the kings' parasols at the terrace corners
      for (const lx of [-4.2, 4.2]) k.cloth(yellow, 2.2, 2.6, 'drape', x + lx - 1.1, gy + 4.4, z - 3.9, Math.PI);
      for (const lx of [-4.6, -1.5, 1.5, 4.6]) k.lantern(x + lx, gy + 4.2, z - 3.4, 1.1);
      for (const sx of [-1, 1]) V.parasol(k, x + sx * 8.2, gy + 1.3, z - 3.6, 1.1, 0xd4a424);
      k.drum(x - 6.2, z - 4.4, -Math.PI / 2 + 0.4, gy + 1.3); k.drum(x + 6.2, z - 4.4, Math.PI / 2 - 0.4, gy + 1.3);
      for (const sx of [-1, 1]) V.bronzeDrum(k, x + sx * 3.4, z - 4.6, 0.3, 1.1, gy + 1.3); }
    for (const sx of [-1, 1]) k.lamp(sx * 7, DAIS[1] - 6.6, 0.85);
    { const x = -14, z = 196, gy = k.ground(x, z), P = 18;                                          // the great 吳 banner
      poles.push({ s: [0.4, P, 0.4], p: [x, gy + P / 2, z], c: 0x2e1d15 }, { s: [5.6, 0.3, 0.3], p: [x + 2.6, gy + P - 0.5, z], c: 0x2e1d15 }, { s: [0.3, 1.4, 0.3], p: [x, gy + P + 0.7, z], c: 0xd8b050 });
      k.cloth(ngo, 5, 10, 'hang', x + 0.2, gy + P - 0.7, z, 0.1); }
    k.standard(12, 196, 1.3, namtan, 11, [0, 170]); k.standard(17, 193, 1.2, thiensach, 10.5, [0, 170]);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + 0.25, x = Math.sin(a) * 28, z = 174 + Math.cos(a) * 24;
      if (Math.abs(x) < 14 && z < 160) continue;                                                    // the approach stays open
      k.standard(x, z, 1.1, r.chance(0.3) ? yellow : mats.foe, 8.5, [0, 174]);
    }
    k.palisade([[-30, 199], [-12, 204], [12, 204], [30, 199]]);
    for (const [x, z] of [[-14, 172], [14, 172], [-20, 186], [20, 186]]) k.lamp(x, z, 0.65);

    // ---- the field: wrecks, arrows, the fallen's gear, torches along the road
    k.wrecks();
    k.arrows([-50, -80, 50, 150], 46);
    k.debris([-56, -76, 56, 196], 110);
    k.torchPosts(-128, -80);

    // ---- reserve armies off the walkable ground: the Đinh on the karst shoulders over the citadel and the yard, the Ngô
    // host on the low hills either side of the siege lines and behind their camp
    for (const [x, z, f] of [[-50, -150, 1.2], [50, -146, -1.2], [-62, -100, 1.3], [62, -96, -1.3], [-52, -62, 1.4]]) k.formation('ally', x, z, f, r.int(8, 12), r.int(4, 6));
    for (const [x, z, f] of [[-76, 10, Math.PI / 2 + 0.3], [76, 22, -Math.PI / 2 - 0.3], [-74, 52, Math.PI / 2], [74, 60, -Math.PI / 2],
      [-56, 120, Math.PI / 2 + 0.4], [58, 132, -Math.PI / 2 - 0.4], [0, 214, Math.PI], [-26, 210, Math.PI]]) k.formation('foe', x, z, f, r.int(9, 14), r.int(4, 7));
    k.aftermath({ fallen: [[-40, 40, -76, -46, 8], [-55, 55, -10, 55, 22], [-36, 36, 104, 146, 12], [-44, 44, -120, -90, 6]],
      standards: [7, -55, -10, 55, 140], dust: { n: 34, area: [-60, -130, 60, 150], wall: [8, -45, 45, WALL_Z + WALL_D / 2 + 14] } });
    k.farFires([[-88, 40], [92, 70], [-96, 150], [84, 180], [30, 228]], 2.8);
  },

  // set pieces: the plank bridge over the Sào Khê, the gate's doors (gate 'hoalu'), the name board, the hostage pole
  // (sets 'hostage' raise / 'freed' lower), the burning Ngô dragon boats (set 'boats')
  build(root, k) {
    // the render bed under the bridge (the deck spans water; the sim deck stays walkable)
    { const bed = root.getObjectByName('ground').geometry, pos = bed.attributes.position;
      for (let i = 0; i < pos.count; i++) pos.setY(i, this.water.bedHeight(pos.getX(i), pos.getZ(i), pos.getY(i)));
      pos.needsUpdate = true; bed.computeVertexNormals(); bed.computeBoundingSphere(); }
    const mat = lit(), mesh = (boxes, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(boxesGeometry(boxes.map((b) => ({ ...b, p: [b.p[0] - x, b.p[1] - y, b.p[2] - z] }))), mat);
      m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; root.add(m);
      return m;
    };
    // ---- the plank bridge: deck, posts and rails, piles into the river, stone footings at both heads
    { const b = [], Z0 = RIVER_Z - 9.5, Z1 = RIVER_Z + 9.5, y0 = (z) => k.ground(0, z) + 0.1;
      let q = 0;
      for (let z = Z0; z < Z1; z += 0.56, q++) b.push({ s: [5.4 + (q % 3) * 0.12, 0.14, 0.5], p: [(q % 2) * 0.08, y0(z) - 0.07, z], r: [0, ((q * 7) % 5 - 2) * 0.012, 0], c: shade(0x6e5434, 0.8 + ((q * 13) % 7) / 20) });
      for (const sx of [-1, 1]) for (let z = Z0; z < Z1 - 0.1; z += 1.6) {
        const za = z, zb = Math.min(Z1, z + 1.6), ya = y0(za), yb = y0(zb), L = Math.hypot(zb - za, yb - ya), pitch = -Math.atan2(yb - ya, zb - za), zm = (za + zb) / 2, ym = (ya + yb) / 2;
        b.push({ s: [0.2, 1.15, 0.2], p: [sx * 2.65, ya + 0.5, za], c: 0x4a3222 });
        for (const [dy, t, c] of [[1.0, 0.14, 0x6a5a30], [0.55, 0.1, 0x4a3222], [-0.25, 0.4, 0x3a2818]]) b.push({ s: [dy < 0 ? 0.24 : t, t, L + 0.04], p: [sx * (dy < 0 ? 2.72 : 2.65), ym + dy, zm], r: [pitch, 0, 0], c });
      }
      for (let z = RIVER_Z - RHW + 0.5; z < RIVER_Z + RHW; z += 2.8) for (const sx of [-1, 1]) b.push({ s: [0.36, 3.4, 0.36], p: [sx * 2.3, y0(z) - 1.8, z], c: 0x2e2018 });
      for (let z = Z0; z < Z1; z += 0.8) for (const sx of [-1, 1]) {
        if (Math.abs(z - RIVER_Z) < RHW - 0.5) continue;
        const x = sx * (3.1 + ((z * 7.3) % 1.2)), s = 0.5 + ((z * 3.1) % 0.4);
        b.push({ s: [s * 1.6, s, s * 1.3], p: [x, k.ground(x, z) + s * 0.2, z], r: [0, z % 1.5, 0.2 * sx], c: shade(0x8a867a, 0.8 + ((z * 5.7) % 0.3)) });
      }
      mesh(b); }
    // ---- the gate's doors: two studded leaves hinged at the passage sides near its outer face, swinging in (to -Z)
    const gx = PASS / 2, DH = 5.8, hz = WALL_Z + WALL_D / 2 - 1.2;
    const doors = [-1, 1].map((sx) => {
      const lb = [], w = gx - 0.25, cxl = -sx * w / 2;
      lb.push({ s: [w, DH, 0.32], p: [cxl, DH / 2, 0], c: 0x4b2e1a });
      for (let y = 0.9; y < DH - 0.3; y += 1.4) lb.push({ s: [w - 0.1, 0.22, 0.1], p: [cxl, y, 0.2], c: 0x2a221c });
      for (let q = 0; q < 4; q++) lb.push({ s: [0.14, DH - 0.2, 0.06], p: [-sx * (0.4 + q * (w - 0.8) / 3), DH / 2, 0.18], c: 0x3a2014 });
      for (let y = 0.6; y < DH - 0.4; y += 0.7) for (let q = 0; q < 4; q++) lb.push({ s: [0.13, 0.13, 0.08], p: [-sx * (0.5 + q * (w - 1.0) / 3), y, 0.2], c: 0xb89048 });
      lb.push({ s: [0.5, 0.5, 0.12], p: [-sx * (w - 0.6), DH * 0.48, 0.24], c: 0xc8a048 });
      const m = new THREE.Mesh(boxesGeometry(lb), lit());
      m.position.set(sx * (gx - 0.15), 0, hz); m.castShadow = m.receiveShadow = true;
      root.add(m);
      return m;
    });
    // ---- the name board over the gate: 華閭 in gold on black lacquer (the gatehouse's board, outer face)
    { const c = document.createElement('canvas'); c.width = 512; c.height = 176;
      const g = c.getContext('2d');
      g.fillStyle = '#1a1210'; g.fillRect(0, 0, 512, 176); g.strokeStyle = '#b08a40'; g.lineWidth = 12; g.strokeRect(10, 10, 492, 156);
      g.fillStyle = '#e0bc68'; g.font = 'bold 118px "Kaiti SC","STKaiti","KaiTi","Songti SC",serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('華閭', 256, 94);
      const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 1.1), new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: 0.15, roughness: 0.7 }));
      m.position.set(0, k.ground(0, WALL_Z) + Math.min(6, GT_H - 1.6) + 1.45, WALL_Z + WALL_D / 2 + 0.24);
      root.add(m); }
    // ---- the hostage pole: a tall bamboo pole on the mound with a crossbar; the boy bound under it (a small figure in
    // pale clothes, no harm shown). Lowered (lying back over the mound) until 'hostage', raised, then lowered for 'freed'.
    const [px, pz] = POLE, pgy = k.ground(px, pz) + 1.5, PL = 11;
    const pole = [];
    for (let y = 0; y < PL; y += 1.5) { pole.push({ s: [0.24, 1.46, 0.24], p: [0, y + 0.75, 0], c: shade(0x8a8a44, 0.9 + (y % 3) * 0.04) }, { s: [0.3, 0.08, 0.3], p: [0, y + 1.5, 0], c: 0x5a5a28 }); }
    pole.push({ s: [2.4, 0.16, 0.16], p: [0, PL - 1.2, 0], c: 0x6a5a30 }, { s: [0.5, 0.7, 0.18], p: [0, PL + 0.2, 0], c: 0xc8a030 });   // crossbar, a yellow pennon tip
    const boy = [
      { s: [0.42, 0.5, 0.26], p: [0, PL - 2.05, -0.2], c: 0xd8ccb0 }, { s: [0.44, 0.12, 0.28], p: [0, PL - 2.32, -0.2], c: 0x8a2a1c },   // tunic, red sash
      { s: [0.3, 0.32, 0.28], p: [0, PL - 1.6, -0.2], c: 0xc8916a }, { s: [0.34, 0.14, 0.32], p: [0, PL - 1.4, -0.2], c: 0x2a1a12 },     // head, hair knot
      { s: [0.32, 0.08, 0.3], p: [0, PL - 1.5, -0.2], c: 0xa82a1c },                                                                // red head-wrap
      { s: [0.13, 0.5, 0.13], p: [-0.12, PL - 2.6, -0.2], c: 0x4a3a2a }, { s: [0.13, 0.5, 0.13], p: [0.12, PL - 2.6, -0.2], c: 0x4a3a2a },   // legs
      { s: [0.12, 0.42, 0.12], p: [-0.3, PL - 1.95, -0.16], c: 0xd8ccb0, r: [0, 0, 0.35] }, { s: [0.12, 0.42, 0.12], p: [0.3, PL - 1.95, -0.16], c: 0xd8ccb0, r: [0, 0, -0.35] },
      { s: [0.5, 0.06, 0.34], p: [0, PL - 1.95, -0.12], c: 0x9a8a5a }, { s: [0.5, 0.06, 0.34], p: [0, PL - 2.45, -0.12], c: 0x9a8a5a },   // the ropes
    ];
    const at = (boxes) => { const m = new THREE.Mesh(boxesGeometry(boxes), mat); m.position.set(px, pgy, pz); m.castShadow = m.receiveShadow = true; root.add(m); return m; };
    const pm = at(pole), bm = at(boy);
    const LOW = 1.35;                                                                  // lowered: lying back toward +Z (away from the wall)
    const lean = (a) => { pm.rotation.x = a; bm.rotation.x = a; };
    // ---- the Ngô dragon boats' fires (lit by 'boats')
    let boats = false;
    for (const x of [-15, 16]) for (const dx of [-2.5, 1.5]) k.fire(x + dx, -0.1, riverC(x) + 0.6, 1.3, true, () => boats);
    let open = 1, up = 0, target = 0, lastFrame = Infinity;
    const reset = () => { boats = false; up = target = 0; bm.visible = false; };
    reset(); lean(LOW);
    return {
      sets: {
        hostage() { target = 1; bm.visible = true; },
        freed() { target = 0; bm.visible = false; },
        boats() { boats = true; },
      },
      update(dt, game) {
        if (game && game.frame < lastFrame) reset();                                   // a new battle
        if (game) lastFrame = game.frame;
        open += ((GATES.hoalu?.open ? 1 : 0) - open) * Math.min(1, dt * 1.4);           // heavy leaves: ≈ 2 s to swing
        const e = open * (2 - open);
        doors[0].rotation.y = e * Math.PI * 0.47; doors[1].rotation.y = -e * Math.PI * 0.47;
        up += (target - up) * Math.min(1, dt * 0.9);
        lean(LOW * (1 - up * up * (3 - 2 * up)));
      },
    };
  },
};
