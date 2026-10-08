// Hoa Lư by night, 979 (華閭, Màn II «Đêm Vỡ Hoa Lư») laid out along +Z, ≈ 376 m from the outer citadel gate to the back
// wall of the sealed store — the palace precinct the night the king died. Format: src/world/maps/index.js header; kit:
// ../viet.js (十二使君's Vietnamese helpers + this game's coffins, candles, storks) and ./demhoalu-set.js (the palace
// walls, the timber gallery, the store, the candle rack and every run-time set piece). One level (h 0): the precinct is
// walled courts; outside the walls the limestone climbs into the karst towers that were Hoa Lư's real ramparts.
//   Ngoại thành     the guards' quarter   z -188 … -126  x ±36  barracks halls, weapon racks, the watch bell that did
//                                                              not ring; the outer gate in the south wall (z -192, off
//                                                              the walk) stands open — set 'sealNgoai' shuts it; start
//   (cửa trại)      gate 'cuaTrai'        z -128           the quarter's inner gate under a timber gate tower
//   Hành lang gỗ    the long gallery      z -128 …  -40  x ±11  red columns (carve) at x ±7 every 6 m, lean-to tile
//                                                              roofs over the side aisles, oil lamps on every column —
//                                                              set 'snuff' puts them out one by one; the secret door
//                                                              stands open in the west wall (anchor 'cuaNgam')
//   (cửa sân rồng)  gate 'cuaSan'         z  -42           the gate tower into the court
//   Sân rồng        the dragon court      z  -42 …   46  x ±48  flagstones, bronze drums, the main hall on its terrace
//                                                              (z 12 … 30, x ±15), side halls with archers on the roofs;
//                                                              the west and east gates (x ±50, z -2, off the walk) — sets
//                                                              'sealTay' / 'sealDong' shut them
//   (cửa nội cung)  gate 'cuaNoi'         z   46           behind the main hall, on the axis
//   Nội cung        the queen's quarters  z   44 …  126  x ±40  the queen's hall on the west side behind violet curtains
//                                                              (anchor 'hau': the defend point before its steps), a rock
//                                                              garden on the east, the hidden panel in the east wall
//                                                              (anchor 'matdao', set 'matdao')
//   (cửa kho)       gate 'cuaKho'         z  126           the sealed store's lacquered doors (cinnabar seal strips)
//   Kho kín         the sealed store      z  124 …  188  x ±26  an open high hall over the 99 coffins (three blocks of 3 ×
//                                                              11, lost in incense haze), the tiered rack of 99 candles,
//                                                              the altar with the old seal box (anchor 'altar') — sets
//                                                              'candles' (rank by rank) and 'seven' (seven shadows)
// Night ([PHẢN] → [LINH]): a sickly green moon high to the north-west over the karsts, violet-black sky, violet shadows;
// warm pools only where lamps and braziers still burn. Engine gates 'cuaTrai', 'cuaSan', 'cuaNoi', 'cuaKho' (kind
// 'doors': the leaves are build()'s) shut at a story's start and open on beats; the three sealed gates are set pieces.
import * as V from '../viet.js';
import { palaceWall, gallery, violet, curtainScreen, storeHall, candleRack, candleStand, buildSet, LAC } from './demhoalu-set.js';
import { WIND } from '../../../../src/world/dressing.js';

const Z_OUT = -192, Z_TRAI = -128, Z_SAN = -42, Z_NOI = 46, Z_KHO = 126;          // wall lines (gate centres)
const HALL = [0, 21], HALL_W = 30, HALL_D = 16;                                  // the main hall (terrace centre, size)
const QH = [-32, 92];                                                            // the queen's hall (faces +x)
const HAU = [-21, 92], MATDAO = [40.3, 112], ALTAR = [0, 146];
const SIDE = [[-43, -26], [-43, 22], [43, -26], [43, 22]];                       // the court's side halls (centres)
const GAL = [-122, -46];                                                         // the gallery's column run (z)
const COFFIN_X = [-11, 0, 11], COFFIN_Z0 = 151, COFFIN_GAP = [2.5, 3.3];          // three blocks of 3 × 11 = 99
const STORE = { hw: 22, z0: 134, z1: 186 };
const colCarve = (x, z, r = 0.32) => [x - r, z - r, x + r, z + r];

export default {
  id: 'demhoalu',
  name: { zh: 'Đêm Vỡ Hoa Lư', en: 'The Night Hoa Lư Broke' },
  grid: [-132, -232, 132, 226],
  pieces: [
    { id: 'ngoai', rect: [-36, -188, 36, -126], h: 0, rise: 12 },
    { id: 'hanhlang', rect: [-11, -129, 11, -40], h: 0, rise: 12 },
    { id: 'sanrong', rect: [-48, -43, 48, 46], h: 0, rise: 14 },
    { id: 'noicung', rect: [-40, 45, 40, 126], h: 0, rise: 14 },
    { id: 'kho', rect: [-26, 125, 26, 188], h: 0, rise: 16 },
  ],
  // the gallery's columns, the store's columns, the main hall's stone dragons, the incense urns of the court
  carve: [...[-7, 7].flatMap((x) => { const c = []; for (let z = GAL[0]; z <= GAL[1]; z += 6) c.push(colCarve(x, z)); return c; }),
    ...[-STORE.hw, STORE.hw].flatMap((x) => { const c = []; for (let z = STORE.z0; z <= STORE.z1; z += 6.5) c.push(colCarve(x, z, 0.4)); return c; }),
    [-4.4, 10.2, -3.2, 12.6], [3.2, 10.2, 4.4, 12.6]],
  // solid set pieces: every wall run (and the gate towers' posts in them), the outer gate's bastions and passage, the
  // barracks, the bell frame, the main hall and the four side halls, the queen's hall and her curtain screens, the rock
  // garden, the store's candle rack, altar and the three coffin blocks
  props: [
    [-44, Z_OUT - 1, -3.6, Z_OUT + 4.6], [3.6, Z_OUT - 1, 44, Z_OUT + 4.6], [-3.6, Z_OUT - 4, 3.6, Z_OUT + 3.6],   // outer wall + gate passage
    [-44, Z_TRAI - 1.6, -4.6, Z_TRAI + 1.6], [4.6, Z_TRAI - 1.6, 44, Z_TRAI + 1.6], [-40, -190, -36.2, -126], [36.2, -190, 40, -126],
    [-56, Z_SAN - 1.6, -4.6, Z_SAN + 1.6], [4.6, Z_SAN - 1.6, 56, Z_SAN + 1.6],
    [-56, Z_NOI - 1.6, -4.6, Z_NOI + 1.6], [4.6, Z_NOI - 1.6, 56, Z_NOI + 1.6],
    [-44, Z_KHO - 1.6, -4.6, Z_KHO + 1.6], [4.6, Z_KHO - 1.6, 44, Z_KHO + 1.6],
    [-54, -44, -48.2, -6.4], [-54, 2.4, -48.2, 48], [48.2, -44, 54, -6.4], [48.2, 2.4, 54, 48],          // court side walls, gates at z -2
    [-54, -6.4, -48.2, 2.4], [48.2, -6.4, 54, 2.4],                                                     // (the sealed gates: off the walk)
    [-44, 44, -40.2, 128], [40.2, 44, 44, MATDAO[1] - 1.2], [40.2, MATDAO[1] + 1.2, 44, 128],         // inner palace side walls (the panel's gap)
    [MATDAO[0] + 0.3, MATDAO[1] - 1.2, 44, MATDAO[1] + 1.2],
    [-30, 124, -26.2, 192], [26.2, 124, 30, 192], [-30, 188.2, 30, 192],                              // the store's walls
    [-34.4, -178.4, -23.4, -161.6], [-34.4, -152.4, -23.4, -135.6], [23.4, -178.4, 34.4, -161.6], [23.4, -152.4, 34.4, -135.6],   // barracks
    [-21, -183, -17, -179],                                                                            // the watch bell frame
    [-HALL_W / 2 - 0.2, HALL[1] - HALL_D / 2 - 1.6, HALL_W / 2 + 0.2, HALL[1] + HALL_D / 2 + 0.2],
    ...SIDE.map(([x, z]) => [x - 4.2 - (x < 0 ? 0 : 1.4), z - 9.2, x + 4.2 + (x < 0 ? 1.4 : 0), z + 9.2]),
    [QH[0] - 5.4, QH[1] - 8.4, QH[0] + 6.4, QH[1] + 8.4], [-25.6, 82.4, -24.4, 85.6], [-25.6, 98.4, -24.4, 101.6],
    [21, 60, 31, 70],                                                                                  // the rock garden's basin
    ...[[34, 54], [33, 74], [-36, 56], [36, 120], [-36, 120], [-30, -36], [30, -36], [-32, 40], [32, 40]].map(([x, z]) => [x - 1, z - 1, x + 1, z + 1]),   // trunks and clumps
    [-3.9, 135.6, 3.9, 141.4], [-2.4, 144.6, 2.4, 147.6],                                              // candle rack, altar
    ...COFFIN_X.map((x) => [x - 3.2, COFFIN_Z0 - 1.5, x + 3.2, COFFIN_Z0 + 10 * COFFIN_GAP[1] + 1.5]),
  ],
  zones: [
    { id: 'ngoai', name: { zh: 'Ngoại thành · trại cấm vệ', en: 'Outer Citadel · Guards\' Quarter' }, x: 0, z: -157, w: 72, d: 62 },
    { id: 'hanhlang', name: { zh: 'Hành lang gỗ', en: 'The Timber Gallery' }, x: 0, z: -85, w: 22, d: 86 },
    { id: 'sanrong', name: { zh: 'Sân rồng', en: 'The Dragon Court' }, x: 0, z: 2, w: 96, d: 88 },
    { id: 'noicung', name: { zh: 'Cung Hoàng hậu', en: 'The Queen\'s Quarters' }, x: 0, z: 86, w: 80, d: 80 },
    { id: 'kho', name: { zh: 'Kho kín', en: 'The Sealed Store' }, x: 0, z: 157, w: 52, d: 62 },
  ],
  route: [[0, -176], [0, -150], [0, Z_TRAI], [0, -100], [0, -70], [0, Z_SAN], [0, -24], [-6, -4], [-24, 8], [-25, 34], [-8, 39], [0, Z_NOI],
    [0, 64], [-4, 82], [0, 104], [0, Z_KHO], [0, 133]],
  gates: {
    cuaTrai: { rect: [-6, Z_TRAI - 1.5, 6, Z_TRAI + 1.5], name: { zh: 'Cửa trại cấm vệ', en: 'Guards\' Quarter Gate' }, kind: 'doors' },
    cuaSan: { rect: [-6, Z_SAN - 1.5, 6, Z_SAN + 1.5], name: { zh: 'Cửa sân rồng', en: 'Dragon Court Gate' }, kind: 'doors' },
    cuaNoi: { rect: [-6, Z_NOI - 1.5, 6, Z_NOI + 1.5], name: { zh: 'Cửa nội cung', en: 'Inner Palace Gate' }, kind: 'doors' },
    cuaKho: { rect: [-6, Z_KHO - 1.5, 6, Z_KHO + 1.5], name: { zh: 'Cửa kho kín', en: 'The Sealed Store\'s Doors' }, kind: 'doors' },
  },
  // story positions (holinh/src/story/demhoalu.js): the gates, the secret door in the gallery, the court, the main hall's
  // steps, the queen's steps (defend point), the hidden panel, the store's floor and its altar
  anchors: { start: [0, -164], cuaNgoai: [0, -188], bell: [-19, -176], cuaTrai: [0, Z_TRAI], cuaNgam: [-8, -86], cuaSan: [0, Z_SAN],
    court: [0, -16], cuaTay: [-48, -2], cuaDong: [48, -2], dien: [0, 8], cuaNoi: [0, Z_NOI], hau: HAU, matdao: [MATDAO[0] - 2.5, MATDAO[1]],
    cuaKho: [0, Z_KHO], kho: [0, 131], altar: ALTAR },
  // story: the head of the guards' ranks in the quarter, the gallery gate ahead; free: the dragon court
  spawn: { story: { x: 0, z: -166, yaw: 0, tilt: -0.06 }, free: { x: 0, z: -14, yaw: 0 } },
  water: null,
  // night: a high green-white moon to the north-west, violet-black overhead, the far horizon a bruised wine colour
  sky: {
    sunElev: 0.2, sunAz: -0.62, sunCore: [1.7, 2.4, 1.8],
    haze: 0x16121f, hazeWarm: 0x34304a, glow: 0x7a9a86, skyMid: 0x110c1c, skyTop: 0x040208,
    hznSun: 0x2c4238, hznAway: 0x2c1424, cloudRose: 0x1c1626, cloudShade: 0x07050b, cloudLit: 0x6a8676,
    dust: [14, 60, 1.0, 0.05], dustLit: 0x3a4a44, dustShade: 0x1c1420, apCool: 0x2e2a4e,
  },
  fog: [26, 220],
  light: { hemi: [0x4c4a7a, 0x1e161e, 1.9], sun: [0x9ec6a8, 2.0], rim: [0xa898e0, 1.0], dir: [-0.45, 0.78, -0.42], fire: 0xff8a3a, fill: [128, 160, 0.8] },
  post: { exposure: 1.62, sat: 1.06, shadowTint: [0.86, 0.78, 1.4], highTint: [1.22, 0.96, 0.7], rays: 0.15, rayTint: [0.6, 0.85, 0.66],
    bloom: 1.0, bloomThreshold: 1.2, hazeCool: [0.07, 0.05, 0.12], hazeWarm: [0.2, 0.12, 0.08], sunGlow: [0.5, 0.72, 0.56] },
  castle: null,
  terrain: {
    pave: () => 1.4,                                                                // flagstones and beaten courts everywhere inside
    bare: (x, z) => !(x > 18 && x < 36 && z > 54 && z < 76),                      // grass only in the queen's garden
    rock: (h) => h - 2,
    rubble: [-30, -180, 30, -50],
    pines: [400, 500],                                                             // karst shrubs, not pine forest
    cliff: { rock: 0x86827a, dark: 0x4e4a46, top: 0x46563a, moss: 0x3c5230, grassy: 0x50623a },
    mountains: { peakA: -0.6, peak: 30 },
  },
  // firelight: braziers in the quarter, the gallery's mouth, the court's braziers and drums, the main hall's steps, the
  // queen's steps, the store's doors (the gallery lamps and the candles are build()'s own, switched by the sets)
  lightSites: [[-8, 1.9, -158, 26, 11], [8, 1.9, -158, 26, 11], [-6, 1.9, -134, 24, 10], [6, 1.9, -134, 24, 10], [0, 2.4, -186, 18, 9],
    [-6, 1.9, -36, 26, 10], [6, 1.9, -36, 26, 10], [-22, 1.9, -20, 26, 11], [22, 1.9, -20, 26, 11], [-9, 2.2, 9, 30, 11], [9, 2.2, 9, 30, 11],
    [-36, 2, -2, 22, 10], [36, 2, -2, 22, 10], [-6, 1.9, 52, 24, 10], [-20, 2.2, 86, 30, 11], [-20, 2.2, 98, 30, 11], [-6, 1.9, 120, 24, 10], [6, 1.9, 120, 24, 10]],
  hq: [-21, 92],

  dress(k) {
    const { r, mats, props } = k;
    WIND.set(0.2, 0, 0.98).normalize();                                             // a slow night draught up the precinct
    const dinh = k.banner('丁', { bg: '#7a1c14', fg: '#e8c870', border: '#2a0e08', w: 128, h: 256, seed: 41 });
    const purple = violet(k);
    const off = (x, z, m = 3) => k.inAt(x, z) < -m;

    // ---- karst towers round the whole precinct (Hoa Lư's real ramparts), a near rank, a far rank, the north wall of them
    const halfW = (z) => (z < -126 ? 44 : z < -40 ? 20 : z < 46 ? 56 : z < 126 ? 46 : 32);
    for (let z = -226; z <= 222; z += r.range(12, 18)) for (const sx of [-1, 1]) {
      const hw = halfW(z), rr = r.range(6, 10);
      V.karstRange(k, [[sx * (hw + r.range(10, 22) + rr), z + r.range(-4, 4), r.range(26, 50), rr, r.range(-0.35, 0.35)]]);
      if (r.chance(0.75)) { const r2 = r.range(9, 15); V.karstRange(k, [[sx * Math.min(122, hw + 40 + r.range(0, 30)), z + r.range(-6, 6), r.range(40, 72), r2, r.range(-0.3, 0.3)]]); }
    }
    for (let i = 0; i < 9; i++) V.karstRange(k, [[r.range(-100, 100), r.range(204, 222), r.range(46, 76), r.range(10, 16)]]);
    for (let i = 0; i < 7; i++) V.karstRange(k, [[r.range(-90, 90), r.range(-228, -208), r.range(36, 60), r.range(9, 14)]]);

    // ---- Ngoại thành: the outer wall and its gate (open: build), the quarter's inner wall, barracks, the watch bell
    V.rampart(k, [[-44, Z_OUT + 1.4], [-11.5, Z_OUT + 1.4]], { h: 6.5, w: 6 }); V.rampart(k, [[11.5, Z_OUT + 1.4], [44, Z_OUT + 1.4]], { h: 6.5, w: 6 });
    V.citadelGate(k, 0, Z_OUT, { pass: 7.2, depth: 8, h: 7, w: 22, yaw: Math.PI });
    palaceWall(k, [[-40, Z_TRAI], [-4.6, Z_TRAI]]); palaceWall(k, [[4.6, Z_TRAI], [40, Z_TRAI]]);
    palaceWall(k, [[-38.5, -188], [-38.5, Z_TRAI]]); palaceWall(k, [[38.5, -188], [38.5, Z_TRAI]]);
    V.gateTower(k, 0, Z_TRAI, 0, 9.2, { h: 5.5 });
    for (const [x, z] of [[-29, -170], [-29, -144]]) V.timberHall(k, x, z, -Math.PI / 2, 0.95);
    for (const [x, z] of [[29, -170], [29, -144]]) V.timberHall(k, x, z, Math.PI / 2, 0.95);
    V.bellPost(k, -19, -181, 0, 1.4);                                               // the watch bell that never rang
    for (const [x, z, yaw] of [[-20, -160, Math.PI / 2], [20, -152, -Math.PI / 2], [-20, -138, Math.PI / 2], [20, -176, -Math.PI / 2]]) k.shieldRack(x, z, yaw);
    for (const [x, z, yaw] of [[-21, -150, 0.3], [21, -164, -0.2], [14, -184, 0.1]]) k.supplies(x, z, yaw, r.int(4, 6));
    for (const [x, z] of [[-8, -158], [8, -158], [-6, -134], [6, -134]]) k.lamp(x, z, 0.65);
    for (const sx of [-1, 1]) { k.standard(sx * 14, -132, 1.05, mats.ally, 8, [0, -150]); k.standard(sx * 16, -184, 1.05, dinh, 8.5, [0, -170]); }
    k.drum(13, -137, -0.4);
    k.torchPosts(-182, -132);

    // ---- Hành lang gỗ: the two galleries (lamps: build), the corridor's head and foot gates, the secret door, cloth
    const lamps = [...gallery(k, GAL[0], GAL[1], -1), ...gallery(k, GAL[0], GAL[1], 1)].sort((a, b) => a[2] - b[2]);
    this._lamps = lamps;
    { const z = -86, L = k.local(-11.7, 0, z, 0);                                    // the secret door: a narrow leaf stood open, black within
      L(0, 1.3, 0, [0.3, 2.6, 1.5], 0x030204); L(0.6, 1.3, -0.95, [1.2, 2.6, 0.12], 0x3a281c, [0, 0.9, 0]); L(0, 2.75, 0, [0.4, 0.2, 1.9], 0x2a1c14); }
    for (const sx of [-1, 1]) for (let z = GAL[0] + 9; z < GAL[1]; z += 24) k.cloth(dinh, 1.2, 2.4, 'drape', sx * 11.45, 4.0, z - sx * 0.6, sx > 0 ? -Math.PI / 2 : Math.PI / 2);
    palaceWall(k, [[-52, Z_SAN], [-4.6, Z_SAN]], { h: 5 }); palaceWall(k, [[4.6, Z_SAN], [52, Z_SAN]], { h: 5 });
    V.gateTower(k, 0, Z_SAN, 0, 9.2, { h: 6 });
    V.reedPlumes(k, -13.5, -110, { n: 10, r: 1.2 }); V.reedPlumes(k, 13.5, -64, { n: 10, r: 1.2 });

    // ---- Sân rồng: walls and the sealed side gates, the side halls (archers on the roofs), the main hall on its terrace
    // with the dragon stair, bronze drums, braziers, the 丁 standards, storks asleep on the ridges
    palaceWall(k, [[-50, Z_SAN], [-50, -6.4]], { h: 5 }); palaceWall(k, [[-50, 2.4], [-50, Z_NOI]], { h: 5 });
    palaceWall(k, [[50, Z_SAN], [50, -6.4]], { h: 5 }); palaceWall(k, [[50, 2.4], [50, Z_NOI]], { h: 5 });
    V.citadelGate(k, -51.5, -2, { pass: 7.4, depth: 4, h: 6, w: 16, yaw: -Math.PI / 2 });
    V.citadelGate(k, 51.5, -2, { pass: 7.4, depth: 4, h: 6, w: 16, yaw: Math.PI / 2 });
    for (const [x, z] of SIDE) V.longHall(k, x, z, x < 0 ? -Math.PI / 2 : Math.PI / 2, { w: 18, d: 8.4, h: 0.8 });
    V.longHall(k, HALL[0], HALL[1], 0, { w: HALL_W, d: HALL_D, h: 1.4 });
    { const L = k.local(0, 0, 11.4, 0);                                             // stone dragons along the stair
      for (const sx of [-1, 1]) { L(sx * 3.8, 0.5, 0, [0.9, 1.0, 2.4], 0x7a7066); L(sx * 3.8, 1.2, -0.9, [0.7, 0.8, 0.8], 0x8a8070); L(sx * 3.8, 1.5, -1.3, [0.4, 0.4, 0.5], 0x6a6258); } }
    const drums = [[-12, -8, 1.6], [12, -8, 1.6], [-24, -28, 1.3], [24, -28, 1.3]];
    for (const [x, z, s] of drums) { props.push({ s: [2.6 * s / 1.6, 0.5, 2.6 * s / 1.6], p: [x, 0.25, z], c: 0x5a4a3a }); V.bronzeDrum(k, x, z, r.range(0, 3), s, 0.5); }
    k.drum(-30, 8, 0.6); k.drum(30, 8, -0.6);
    for (const [x, z] of [[-22, -20], [22, -20], [-9, 9], [9, 9], [-36, -2], [36, -2], [-6, -36], [6, -36]]) k.lamp(x, z, 0.75);
    for (const sx of [-1, 1]) for (const z of [-34, -10, 6]) k.standard(sx * 34, z, 1.15, z === -10 ? mats.ally : dinh, 9.5, [0, -6]);
    for (const sx of [-1, 1]) props.push({ s: [1.2, 1.1, 1.2], p: [sx * 3.8, 0.55, 11.4 - 3.4], c: 0x6a5a40 });   // incense urns at the stair foot
    for (const sx of [-1, 1]) k.fire(sx * 3.8, 1.2, 8, 0.22, true);
    const archers = [];                                                             // raiders' bowmen on the side halls' ridges
    for (const [x, z] of SIDE) for (let d = -7; d <= 7; d += r.range(2.2, 3.4)) archers.push({ x: x + (x < 0 ? 1.2 : -1.2), y: 8.7, z: z + d, yaw: x < 0 ? Math.PI / 2 : -Math.PI / 2, ph: r.range(0, 6.28) });
    for (let x = -10; x <= 10; x += 4.5) archers.push({ x, y: 9.4, z: HALL[1] - 1, yaw: Math.PI, ph: r.range(0, 6.28) });
    k.troops('foe', archers);
    for (const [x, y, z, yaw] of [[6, 9.55, HALL[1] + 0.3, 0.4], [-9, 9.55, HALL[1], 2.6], [-43, 8.85, -21, 1.2], [43, 8.85, 26, -1.8], [-19, 3.8, -181, 0.3]]) V.stork(k, x, y, z, yaw, { s: 0.9 });
    for (const [x, z] of [[-30, -36], [30, -36], [-32, 40], [32, 40]]) V.areca(k, x, z, r.range(8, 10));

    // ---- Nội cung: the inner wall behind the hall, the queen's hall with violet curtains, lanterns, her standards; the
    // rock garden with a frangipani-dark tree; the east wall with the hidden panel (build)
    palaceWall(k, [[-52, Z_NOI], [-4.6, Z_NOI]], { h: 5 }); palaceWall(k, [[4.6, Z_NOI], [52, Z_NOI]], { h: 5 });
    V.gateTower(k, 0, Z_NOI, 0, 9.2, { h: 6 });
    palaceWall(k, [[-42, Z_NOI], [-42, Z_KHO]]); palaceWall(k, [[42, Z_NOI], [42, MATDAO[1] - 1.1]]); palaceWall(k, [[42, MATDAO[1] + 1.1], [42, Z_KHO]]);
    V.timberHall(k, QH[0], QH[1], -Math.PI / 2, 1);
    for (const [dz, w] of [[-3, 2.6], [0, 3.0], [3, 2.6]]) k.cloth(purple, w, 4.0, 'drape', QH[0] + 4.8, 5.0, QH[1] + dz + w / 2, Math.PI / 2);   // violet over the front bays
    curtainScreen(k, -25, 84, -Math.PI / 2, 2.4, purple); curtainScreen(k, -25, 100, -Math.PI / 2, 2.4, purple);
    for (const dz of [-6, -2, 2, 6]) k.lantern(QH[0] + 6.1, 4.3, QH[1] + dz, 0.9);
    for (const [x, z] of [[-20, 86], [-20, 98]]) k.lamp(x, z, 0.7);
    for (const sx of [-1, 1]) V.parasol(k, -23.2, 0, QH[1] + sx * 4.2, 1.0, 0x7a2a8a);
    k.standard(-30, 106, 1.1, dinh, 9, [-20, 92]); k.standard(-30, 78, 1.1, dinh, 9, [-20, 92]);
    { const gx = 26, gz = 65;                                                         // the rock garden
      props.push({ s: [9.6, 0.6, 9.6], p: [gx, 0.3, gz], c: 0x6a6258 }, { s: [8.6, 0.12, 8.6], p: [gx, 0.6, gz], c: 0x1c2a2c });
      V.karst(k, gx, gz, { h: 4.6, r: 1.6, lean: 0.2 }); V.areca(k, 33, 74, 8); V.banyan(k, 34, 54, 0.6); }
    for (const [x, z] of [[-6, 52], [6, 52], [-6, 120], [6, 120], [14, 96]]) k.lamp(x, z, 0.6);
    V.stork(k, QH[0], 10.85, QH[1] + 1.5, -1.2, { s: 0.85 }); V.stork(k, QH[0] + 1.5, 7.95, QH[1] - 5.5, 2.2, { s: 0.8 });
    for (const [x, z] of [[-36, 56], [36, 120], [-36, 120]]) V.bamboo(k, x, z, { n: 7, h: 8, spread: 1.2 });
    V.reedPlumes(k, 36, 86, { n: 12, r: 1.4 });

    // ---- Kho kín: the doors' wall, the store hall, 99 coffins, the candle rack (flames: build), the altar, candle stands
    // between the rows, incense urns
    palaceWall(k, [[-40, Z_KHO], [-4.6, Z_KHO]], { h: 5.4 }); palaceWall(k, [[4.6, Z_KHO], [40, Z_KHO]], { h: 5.4 });
    V.gateTower(k, 0, Z_KHO, 0, 9.2, { h: 6.4 });
    palaceWall(k, [[-28, Z_KHO], [-28, 190]], { h: 5 }); palaceWall(k, [[28, Z_KHO], [28, 190]], { h: 5 });
    storeHall(k, STORE.hw, STORE.z0, STORE.z1);
    for (const x of COFFIN_X) V.coffinHall(k, x, COFFIN_Z0, 3, 11, { gap: COFFIN_GAP });
    this._rack = candleRack(k, 0, 136, 11, 9);
    V.altar(k, ALTAR[0], ALTAR[1], 0, 0.9);
    { const L = k.local(ALTAR[0], 0.9 * 0.81, ALTAR[1] + 0.1, 0);                     // the old seal box, its lid off; seven tokens, the thread
      L(0.6, 0.2, 0, [0.7, 0.36, 0.5], LAC); L(0.6, 0.39, 0, [0.62, 0.04, 0.42], 0x8a2a1a); L(1.1, 0.42, 0.2, [0.7, 0.06, 0.5], LAC, [0, 0.4, 0.3]);
      for (let i = 0; i < 7; i++) V.bronzeToken(k, ALTAR[0] - 1.1 + i * 0.3, 0.9 * 0.81 + 0.02, ALTAR[1] - 0.15, 0);
      L(-0.2, 0.06, 0.25, [0.22, 0.12, 0.22], 0xb02418); }
    const stands = [];
    for (let j = 0; j < 11; j++) for (const x of [-17, -5.5, 5.5, 17]) stands.push(candleStand(k, x, COFFIN_Z0 + j * COFFIN_GAP[1]));
    this._stands = stands;
    for (const [x, z] of [[-17, 145], [17, 145]]) { props.push({ s: [0.9, 0.9, 0.9], p: [x, 0.45, z], c: 0x6a5020 }); k.fire(x, 1.0, z, 0.2, true); }
    V.threadLine(k, [[-20, 133], [-14, 132], [-8, 133]], { h: 0.4 }); V.threadLine(k, [[8, 133], [14, 132], [20, 133]], { h: 0.4 });

    // ---- the night outside: the far fires of the city below the karsts, the field's scattered arrows and gear
    k.arrows([-30, -186, 30, 40], 26);
    k.debris([-34, -186, 34, 120], 60);
    k.farFires([[-110, -60], [116, 10], [-100, 90], [104, -150], [-96, -200]], 2.2);
    for (let i = 0; i < 70; i++) {                                                  // scrub and bamboo at the karsts' feet
      const x = r.range(-128, 128), z = r.range(-226, 222);
      if (!off(x, z, 6) || k.inAt(x, z) < -40) continue;
      if (r.chance(0.5)) V.bamboo(k, x, z, { n: r.int(5, 8), h: r.range(7, 10) }); else V.broadleaf(k, x, z, r.range(0.8, 1.2));
    }
  },

  build(root, k) {
    return buildSet(root, k, {
      lamps: this._lamps, rack: this._rack, rackCols: 11, stands: this._stands,
      gate: { cuaTrai: [0, Z_TRAI, 0, 9.2, 4.4], cuaSan: [0, Z_SAN, 0, 9.2, 4.8], cuaNoi: [0, Z_NOI, 0, 9.2, 4.8], cuaKho: [0, Z_KHO + 0.6, 0, 9.2, 5, { col: LAC, seal: true }] },
      seal: { sealNgoai: [0, Z_OUT + 3.6, 0, 7.2, 5.6], sealTay: [-49.4, -2, Math.PI / 2, 7.4, 5.4], sealDong: [49.4, -2, -Math.PI / 2, 7.4, 5.4] },
      panel: [MATDAO[0] + 1.6, MATDAO[1]],
      candleLights: [[-3, 138, 0.4], [3, 138, 1.6], [0, 150, 4.8], [-11, 160, 6], [11, 168, 7.2], [0, 178, 8.4]],
      haze: [[-11, 158], [0, 166], [11, 172], [-6, 178], [6, 184], [-15, 182], [15, 156], [0, 152]],
      seven: [0, 133],
    });
  },
};
