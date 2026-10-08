// Cầu Gãy Trên Dòng Sâu (斷橋, 979) laid out along +Z, ≈ 380 m from the river road to the tavern at the end of a fishing
// village no map shows — Màn IV (holinh/DESIGN.md §6-7; comic ch. 9 and 12). The palette is [NƯỚC]: jade-deep water,
// silver light off it, pale limestone; a late-afternoon sun low in the west, then the lanterns of the village and the
// rain over the tavern. Format: src/world/maps/index.js header (sim: pieces / zones / route / gates / water; render: sky /
// light / dress / build). Dressing helpers: ../viet.js (shared) and ./caugay-set.js (this stage's river people).
//   Đường ven sông   the river road        z -200 … -140  h 0      a karst-walled road; the waystation where the coffins
//                                                                 changed carts (an empty cart, wheel ruts); story start
//   (khe đá)         the cleft             z -146 … -124  h 0      a 13 m cleft; the hunters' barricade (gate 'road')
//   Đầu cầu nam      south bridgehead      z -130 …  -66  h 0→3    the road climbs onto the bluff over the gorge; the
//                                                                 bearers' halt with the seven coffin biers (build:
//                                                                 movable), anchor 'bearers'; free-mode arena
//   Cầu qua vực      the bridge            z  -72 …  -32  h 3.7    the only bridge over the deep river: plank deck on
//                                                                 piles, rope rails (a raised ford deck: water.fords
//                                                                 −0.7, render bed dropped under it: water.bedHeight)
//   Đầu cầu bắc      north bridgehead      z  -36 …  -16  h 3→    the bluff, falling to the reeds; the last rope knot
//                                                                 (anchor 'knot') on the north anchor post
//   Nhánh sông lau   the reed branch       z  -16 …   40  h -0.75  a backwater off the river: knee-deep jade water (the
//                                                                 lagoon plane: build) over a walkable bed, reed islands,
//                                                                 a raised earth dike the lane follows; lift nets, the
//                                                                 fishermen's stake nets (anchor 'duel'), the hiding place
//                                                                 in the reeds (anchor 'hide'), the reed landing's bell
//   Làng chài        the fishing village   z   44 …  116  h 0      stilt houses standing in the shallows either side, nets
//                                                                 drying along the lane; a bamboo hedge and a fish weir
//                                                                 across the water, the village gate (gate 'village')
//   Quán nhỏ         the tavern            z  120 …  184  h 0      the yard (anchor 'yard', the net rig: anchor 'net'), the
//                                                                 long thatched eating house (front open, z ≈ 163), its
//                                                                 jetty to the east with the bell post (anchor 'jetty')
// The river (along 'x', centre z ≈ -52, 28 m of deep water) runs through the gorge between bluffs 3 m over the water, out
// of sheer karst on both flanks; downstream (+x) a mouth opens north into the reed branch (the coffin's way).
// Sets (story `set`): 'cross' — the bearers push the biers over the bridge, the seventh left in the middle; 'collapse' —
// the middle span breaks and falls with that coffin; 'float' — it rises on its bamboo frame at the reed mouth and the
// fishermen tow it into the reeds; 'bell' — the reed landing's bells swing (three strokes); 'signal' — three fires on the
// far peak; 'hide' — the tavern's trapdoor shuts over the cellar coffin, straw over it; 'net' — the net drops over the
// yard, the villagers on its ropes, poles across the door, smoke from the hearth; 'ring' — the jetty bell, the rain stops.
// A new battle resets them all (free / trial: the bridge stands, the coffins wait at the bridgehead).
import * as THREE from 'three';
import { boxesGeometry, shade } from '../../../../src/core/voxel.js';
import { lit } from '../../../../src/world/castle.js';
import { makeRng } from '../../../../src/core/rng.js';
import * as V from '../viet.js';
import { boxKit, villager, netRack, liftNet, weir, tavern, TAVERN, raft } from './caugay-set.js';

const RIVER_Z = -52, HW = 14, BANK = 3, DECK = -0.7;  // the river at the bridge, its deep half width, the bluffs, the deck rise
const WY = -0.2, LAG = -0.75;                          // water surface; the reed branch's bed (knee-deep under the plane)
const smooth = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
// the river: straight under the bridge, swinging gently up- and downstream
const riverC = (x) => RIVER_Z + 4 * Math.sin(x * 0.035 + 0.6) * Math.min(1, (x / 26) ** 2);
/** South bank: the road climbs onto the bluff between z -118 and -92. */
const SOUTH = (x, z) => BANK * smooth(-118, -92, z);
/** The lane through the reeds: a raised earth dike curving east and back (x of its crown at z). */
const laneX = (z) => (z > -20 && z < 36 ? 6 * Math.sin((z + 20) / 56 * Math.PI) : 0);
/** Half width of dry ground about the lane: the dike (2.6 m) in the reeds, the village and tavern land (24 m) north. */
const halfLand = (z) => 2.6 + 21.4 * smooth(36, 50, z);
// reed islands in the branch [x, z, r]: a hand's breadth over the water, white plumes on them
const ISLES = [[-22, -4, 6], [-36, 14, 7], [-14, 26, 4.5], [24, 30, 5], [46, 6, 7], [-44, -16, 5], [56, 28, 6], [15, -16, 4], [38, 20, 4], [-48, 34, 5]];
/** The far side's ground (north head, reed branch, village, tavern — one function, so the pieces always agree): the
 *  bridgehead bluff (west of the reed mouth), else knee-deep water over a walkable bed, dry on the dike, the islands and
 *  the village land. */
function FAR(x, z) {
  const hl = halfLand(z);
  let land = 1 - smooth(hl, hl + 5, Math.abs(x - laneX(z)));
  for (const [ix, iz, r] of ISLES) land = Math.max(land, 1 - smooth(r * 0.55, r, Math.hypot(x - ix, z - iz)));
  const bluff = (1 - smooth(-36, -14, z)) * (1 - smooth(16, 30, x));
  return Math.max(LAG + (0.1 - LAG) * land, LAG + (BANK - LAG) * bluff);
}
const wet = (x, z) => z > -40 && FAR(x, z) < -0.3;      // under the reed branch's water (bare bed, no grass)

const KNOT = [1.6, -29.4];                                 // the north anchor post: the last rope knot
const TAV = [0, 168];                                   // the tavern's centre (front open toward -Z)
const NET = [0, 148];                                   // the net rig over the yard
const JETTY = [24, 140];                                // the tavern jetty's foot (it runs east 17 m)
const HIDE = [30, 12];                                  // the coffin's hiding place in the reeds
const BELL = [7.0, 21];                                   // the reed landing's bell post (on the dike's east edge)
// stilt houses [x, z, yaw (door toward the lane), scale], standing in the shallows either side of the village
const HOUSES = [[-34, 54, -Math.PI / 2, 1], [-35, 72, -Math.PI / 2, 0.95], [-33, 90, -Math.PI / 2, 1.05], [-35, 107, -Math.PI / 2, 0.9],
  [34, 58, Math.PI / 2, 1], [35, 77, Math.PI / 2, 1.05], [33, 96, Math.PI / 2, 0.95], [-34, 136, -Math.PI / 2, 1], [-35, 154, -Math.PI / 2, 0.95]];
const houseFoot = ([x, z, , s]) => [x - 4.8 * s, z - 3.4 * s, x + 4.8 * s, z + 3.4 * s];
const RACKS = [[-13, 62, 0.1], [14, 74, -0.1], [-14, 90, 0], [13, 104, 0.15]];   // nets drying along the lane [x, z, yaw] (6 m)
const STATION = [-12, -164];                            // the waystation's rest shelter on the road

export default {
  id: 'caugay',
  name: { zh: 'Cầu Gãy Trên Dòng Sâu', en: 'The Broken Bridge' },
  grid: [-130, -230, 130, 216],
  pieces: [
    { id: 'road', rect: [-18, -200, 18, -140], h: 0, edge: 2, rise: 22 },
    { id: 'cleft', rect: [-6.5, -146, 6.5, -124], h: 0, rise: 16 },
    { id: 'shead', rect: [-44, -130, 44, -66], h: SOUTH, edge: 2.5, rise: 24 },
    { id: 'gorge', rect: [-44, -70, 26, -36], h: BANK, edge: 1.5, rise: 28 },
    { id: 'reeds', rect: [-56, -40, 72, 44], h: FAR, edge: 2.5, rise: 20 },
    { id: 'village', rect: [-56, 40, 56, 122], h: FAR, edge: 2, rise: 16 },
    { id: 'tavern', rect: [-56, 118, 56, 186], h: FAR, edge: 2, rise: 22 },
  ],
  // the bridge's sides over the deep water; the bamboo hedge (land) and the fish weir (water) across the village's north
  // end, either side of its gate
  carve: [[-9, RIVER_Z - HW - 2, -2.8, RIVER_Z + HW + 2], [2.8, RIVER_Z - HW - 2, 9, RIVER_Z + HW + 2],
    [-60, 117, -4.4, 119.4], [4.4, 117, 60, 119.4]],
  // solid set pieces: the waystation shelter and hut, the bridge's anchor posts, the stilt houses, the net racks, the
  // reed landing's bell post, the net rig's two poles, the tavern and its jetty
  props: [[STATION[0] - 3, STATION[1] - 2.5, STATION[0] + 3, STATION[1] + 2.5], [11, -176, 16, -170],
    [-3.85, -72.15, -3.15, -71.45], [3.15, -72.15, 3.85, -71.45], [-3.85, -31.95, -3.15, -31.25], [3.15, -31.95, 3.85, -31.25],
    ...HOUSES.map(houseFoot),
    ...RACKS.map(([x, z]) => [x - 3.3, z - 0.5, x + 3.3, z + 0.5]),
    [BELL[0] - 0.35, BELL[1] - 1.1, BELL[0] + 0.35, BELL[1] + 1.1],
    [NET[0] - 9.6, NET[1] - 0.5, NET[0] - 8.6, NET[1] + 0.5], [NET[0] + 8.6, NET[1] - 0.5, NET[0] + 9.6, NET[1] + 0.5],
    [TAV[0] - TAVERN.W / 2 - 0.3, TAV[1] - TAVERN.D / 2 - 1.6, TAV[0] + TAVERN.W / 2 + 0.3, TAV[1] + TAVERN.D / 2 + 0.3],
    [JETTY[0], JETTY[1] - 1.4, JETTY[0] + 17, JETTY[1] + 1.4]],
  zones: [
    { id: 'road', name: { zh: 'Đường ven sông', en: 'The River Road' }, x: 0, z: -170, w: 36, d: 60 },
    { id: 'shead', name: { zh: 'Đầu cầu nam', en: 'South Bridgehead' }, x: 0, z: -98, w: 88, d: 64 },
    { id: 'bridge', name: { zh: 'Cầu qua vực', en: 'The Gorge Bridge' }, x: 0, z: RIVER_Z, w: 8, d: 36 },
    { id: 'nhead', name: { zh: 'Đầu cầu bắc', en: 'North Bridgehead' }, x: 0, z: -26, w: 56, d: 20 },
    { id: 'reeds', name: { zh: 'Nhánh sông lau', en: 'The Reed Branch' }, x: 8, z: 12, w: 124, d: 56 },
    { id: 'village', name: { zh: 'Làng chài', en: 'The Fishing Village' }, x: 0, z: 80, w: 100, d: 72 },
    { id: 'tavern', name: { zh: 'Quán nhỏ', en: 'The Little Tavern' }, x: 0, z: 152, w: 100, d: 64 },
  ],
  route: [[0, -192], [0, -170], [0, -150], [0, -134], [0, -118], [0, -98], [0, -80], [0, -70], [0, RIVER_Z], [0, -34], [0, -22],
    [3.2, -10], [5.4, 0], [6, 10], [4.7, 20], [2, 30], [0, 40], [0, 60], [0, 80], [0, 100], [0, 118], [0, 132], [0, 146], [0, 158]],
  gates: {
    road: { rect: [-8.5, -136.2, 8.5, -132], name: { zh: 'Chướng ngại khe đá', en: 'Cleft Barricade' }, kind: 'barricade', at: [0, -134, 0, 6.6] },
    village: { rect: [-6.6, 115.8, 6.6, 120.6], name: { zh: 'Cổng làng', en: 'Village Gate' }, kind: 'barricade', at: [0, 118.2, 0, 4.6] },
  },
  // station: the waystation on the road · rgate: the cleft barricade · bearers: the biers' halt (west of the road) ·
  // shead: the south foot of the bridge · bridge: mid-span · knot: the north anchor post · nhead: the north foot ·
  // duel: the fishermen's stake nets in the reeds · hide: the hiding place · landing: the reed landing (bell) ·
  // vgate: the village gate · yard / net: the tavern yard and the net rig · door: the tavern's open front · jetty: its bell
  anchors: { station: [0, -164], rgate: [0, -134], bearers: [-12, -92], shead: [0, -76], bridge: [0, RIVER_Z], knot: KNOT, nhead: [0, -26],
    duel: [22, -2], hide: HIDE, landing: [4, 20], vgate: [0, 118], yard: [0, 140], net: NET, door: [0, 160], jetty: [JETTY[0] + 2, JETTY[1]] },
  // story: the escort's head on the river road, the cleft and the karsts ahead; free: the bluff before the bridge
  spawn: { story: { x: 0, z: -188, yaw: 0, tilt: -0.07 }, free: { x: 2, z: -18, yaw: 0.25 } },
  water: {
    along: 'x', c: riverC, hw: HW, bed: [5.2, 0.45], fords: [[-5, 5, DECK]], y: WY, stones: 0,
    tint: { deep: 0x0c3a34, shallow: 0x3a7a64, sun: [0.92, 0.96, 0.86] },
    // the bridge spans the gorge: the render bed drops under the deck (the sim deck stays walkable)
    bedHeight(x, z, h) {
      const w = 1 - smooth(HW - 1, HW + 3, Math.abs(z - riverC(x)));
      return Math.abs(x) <= 12 && w > 0 ? Math.min(h, BANK - this.bed[0] * w) : h;
    },
  },
  // late afternoon [NƯỚC]: a low silver-gold sun in the west (ahead-left), jade haze in the gorge, mist on the water
  sky: {
    sunElev: 0.16, sunAz: -0.72, sunCore: [4.2, 3.7, 2.9],
    haze: 0x98acae, hazeWarm: 0xd8c29e, glow: 0xffe6bc, skyMid: 0xa2b6be, skyTop: 0x4a6a88,
    hznSun: 0xf6cc8c, hznAway: 0xa6b8b6, cloudRose: 0xd8bca8, cloudShade: 0x667888, cloudLit: 0xfff2da,
    dust: [7.0, 32.0, 2.4, 0.1], dustLit: 0xdee6e0, dustShade: 0x7a8c94, apCool: 0x88a0b0,
  },
  fog: [30, 300],
  // key light low from the west; the tavern's warm fill eases in on the last approach
  light: { hemi: [0xb2c6ce, 0x5e704e, 2.6], sun: [0xffe2ba, 3.4], rim: [0xd6e8f0, 1.25], dir: [-0.52, 0.44, 0.73], fire: 0xffa050, fill: [118, 160, 1.0] },
  post: { exposure: 1.32, sat: 1.12, rays: 0.85, rayTint: [1.0, 0.9, 0.72], bloom: 0.6, highTint: [1.02, 1.04, 1.0], shadowTint: [0.8, 1.0, 1.1] },
  castle: null,
  terrain: {
    pave: (x, z) => (z > 124 && z < 162 && Math.abs(x) < 16 ? 0.5 : 0) + (z > 46 && z < 116 && Math.abs(x) < 6 ? 0.35 : 0),   // the tavern yard, the village lane
    bare: (x, z) => wet(x, z) || (z > 122 && z < 166 && Math.abs(x) < 18) || (Math.hypot(x - STATION[0], z - STATION[1]) < 7),
    rock: (h) => h - 4.5,                                                       // the bluffs stay earth; the cliffs are rock
    pines: [400, 500],                                                          // karst shrubs, not pine forest
    // pale limestone: grey-white strata, dark rain streaks, green-crowned tops and mossy shelves
    cliff: { rock: 0x8e8a80, dark: 0x56544c, top: 0x56683a, moss: 0x46602e, grassy: 0x5e7438 },
    mountains: { peakA: 0.35, peak: 18 },
  },
  // firelight: the waystation, the bearers' halt, the north head, the reed landing, the village lanterns and gate, the
  // tavern hearth, its eaves and the yard
  lightSites: [[STATION[0] + 4, 1.9, STATION[1] + 3, 22, 9], [-8, 1.9, -96, 24, 10], [8, 1.9, -86, 22, 9], [-7, 1.9, -24, 22, 9],
    [6, 2.2, 23, 20, 9], [-9, 2.6, 66, 22, 10], [9, 2.6, 92, 22, 10], [-6, 2.2, 114, 24, 10], [6, 2.2, 114, 24, 10],
    [TAV[0] - 8.3, 2.6, TAV[1] + 1.2, 30, 12], [-5, 3.8, 162.5, 26, 11], [5, 3.8, 162.5, 26, 11], [-13, 2.2, 138, 22, 10], [13, 2.2, 146, 22, 10]],
  hq: [0, TAV[1]],
  minimap: { walls: [[-60, 117, -4.4, 119.4], [4.4, 117, 60, 119.4]] },

  dress(k) {
    const { r, mats, props, poles, shade: sh } = k;
    const sign = k.banner('店', { bg: '#2a1c14', fg: '#e8cc84', border: '#8a2a1a', w: 96, h: 192, tatter: false, seed: 41 });
    const plume = k.banner('', { bg: '#ece4d0', fg: '#000', border: '#a3261a', w: 64, h: 128, seed: 42 });
    const SHIRTS = [0x4a4e5a, 0x5a4a3a, 0x3a4a52, 0x6a5a44, 0x2e3a44, 0x7a6448];
    const shirt = () => SHIRTS[r.int(0, SHIRTS.length - 1)];

    // ---- karst towers frame every view: a near rank off the walk field's edges, a second behind, a ring far out; never
    // in the river (its gorge stays an open slot to both horizons)
    const edge = (z) => (z < -138 ? [-18, 18] : z < -124 ? [-6.5, 6.5] : z < -36 ? [-44, 44] : z < 44 ? [-56, 72] : z < 186 ? [-56, 56] : [-34, 34]);
    for (let z = -226; z <= 228; z += r.range(11, 17)) for (const sx of [-1, 1]) {
      const e = edge(z)[sx < 0 ? 0 : 1], rr = r.range(6, 10.5), x = e + sx * (r.range(12, 22) + rr);
      if (k.waterD(x, z) > HW + rr + 3) V.karstRange(k, [[x, z + r.range(-4, 4), r.range(24, 48), rr, r.range(-0.4, 0.4)]]);
      if (r.chance(0.7)) {
        const rr2 = r.range(9, 15), x2 = Math.max(-128, Math.min(128, x + sx * r.range(20, 40)));
        if (k.waterD(x2, z) > HW + rr2 + 3) V.karstRange(k, [[x2, z + r.range(-6, 6), r.range(36, 66), rr2, r.range(-0.3, 0.3)]]);
      }
    }
    for (let i = 0; i < 8; i++) V.karstRange(k, [[r.range(-90, 90), r.range(-228, -214), r.range(36, 60), r.range(9, 14)]]);   // behind the road
    for (let i = 0; i < 7; i++) V.karstRange(k, [[r.range(-100, 20), r.range(200, 214), r.range(40, 70), r.range(10, 16)]]);   // the far north
    // Thầy Mo's peak far to the north-east: the three signal fires burn on its crown (build, set 'signal')
    const PEAK = [64, 208], PEAK_H = 56;
    V.karst(k, PEAK[0], PEAK[1], { h: PEAK_H, r: 12 });
    k.peakTop = k.topAt(PEAK[0], PEAK[1]) - 1 + PEAK_H;

    // ---- Đường ven sông: bamboo and banana along the road, the waystation shelter and its hut, the empty cart where the
    // coffins changed carts, wheel ruts crossing and re-crossing; the escort's standards, the hunters' flags ahead
    for (let z = -196; z < -142; z += r.range(6, 10)) for (const sx of [-1, 1]) {
      const x = sx * r.range(14, 17);
      if (r.chance(0.55)) V.bamboo(k, x, z, { n: r.int(7, 11), h: r.range(8, 11), spread: 1.6 }); else V.banana(k, x, z, r.range(0.9, 1.15));
    }
    { const [x, z] = STATION, gy = k.ground(x, z), L = k.local(x, gy, z, Math.PI / 2);
      for (const sx of [-2.4, 2.4]) for (const sz of [-1.8, 1.8]) L(sx, 1.3, sz, [0.24, 2.6, 0.24], 0x4a3624);
      L(0, 0.35, 0, [4.4, 0.12, 3.2], 0x6a5038); L(0, 0.2, 0.9, [4, 0.4, 0.5], 0x5a4030);           // a plank bench
      for (let i = 0; i < 5; i++) L(0, 2.7 + i * 0.22, 0, [6 - i * 1.0, 0.24, 4.6 - i * 0.7], sh(0xa88e56, 1 - i * 0.04));   // thatch
      V.hut(k, 13.5, -173, -Math.PI / 2, 0.95);
      k.lamp(x + 4, z + 3, 0.5); }
    V.coffinCart(k, 6, -156, 0.5, { coffin: false, mat: false, broken: true });
    V.coffinCart(k, -7, -178, -0.2, { coffin: false, mat: true });
    for (let i = 0; i < 7; i++) {                                                                    // ruts over ruts (ch. 8: wheel erases wheel)
      const x = r.range(-6, 6), z = r.range(-190, -146), a = r.range(-0.3, 0.3), len = r.range(8, 16);
      for (const sx of [-0.8, 0.8]) props.push({ s: [0.22, 0.04, len], p: [x + sx * Math.cos(a), k.ground(x, z) + 0.02, z - sx * Math.sin(a)], r: [0, a, 0], c: 0x4a3a28 });
    }
    for (const sx of [-1, 1]) k.standard(sx * 9, -196, 1.1, mats.ally, 8.5, [0, -180]);
    for (const [x, z] of [[-11, -150], [11, -147]]) k.standard(x, z, 1.05, mats.foe, 8);
    for (const [x, z] of [[-9, -184], [10, -168], [-10, -146]]) V.bambooTorch(k, x, z);
    V.stork(k, -15.5, k.ground(-15.5, -186), -186, 0.6);

    // ---- the cleft: the hunters' barricade of felled trunks (gate 'road'), torches either side
    k.barricade('road');
    k.burn(-2.5, -134.4, 0.9, 'road'); k.burn(3, -133.8, 0.8, 'road');
    for (const sx of [-1, 1]) V.bambooTorch(k, sx * 5.2, -139);

    // ---- Đầu cầu nam: the bearers' halt west of the road (the biers themselves: build), rope coils, the escort's
    // standards and lamps, white reed plumes on the bluff's lip, the hunters' flags on the east side
    for (const [x, z] of [[-8, -96], [8, -86]]) k.lamp(x, z, 0.55);
    for (const [x, z] of [[-26, -100], [-24, -84]]) k.standard(x, z, 1.1, mats.ally, 9, [0, -90]);
    k.standard(-30, -92, 1.0, plume, 7.5, [0, -90]);
    for (const [x, z] of [[-6, -86], [-22, -90], [-6, -104]]) {                                      // rope coils and a windlass
      const gy = k.ground(x, z);
      for (let q = 0; q < 4; q++) props.push({ s: [1.1 - q * 0.12, 0.12, 1.1 - q * 0.12], p: [x, gy + 0.06 + q * 0.12, z], r: [0, q * 0.4, 0], c: sh(0xb09868, 1 - q * 0.04) });
    }
    { const gy = k.ground(-7, -78), L = k.local(-7, gy, -78, 0);
      for (const sx of [-1, 1]) L(sx * 0.8, 0.6, 0, [0.2, 1.2, 0.2], 0x4a3624);
      L(0, 1.0, 0, [1.6, 0.4, 0.4], 0x6a4a2c); L(0, 1.0, 0, [0.9, 0.5, 0.5], 0xb09868); }
    for (let i = 0; i < 9; i++) { const x = (r.chance(0.5) ? -1 : 1) * r.range(30, 42), z = r.range(-80, -68); V.reedPlumes(k, x, z, { n: 14, r: 1.8 }); }
    for (const [x, z] of [[26, -100], [34, -86], [22, -78]]) k.standard(x, z, 1.05, mats.foe, 8.5, [0, -90]);
    for (const [x, z] of [[-38, -112], [36, -118], [-40, -76], [40, -96]]) V.bamboo(k, x, z, { n: r.int(7, 10), h: r.range(8, 11) });
    k.shieldRack(-30, -106, Math.PI / 2); k.supplies(-32, -98, 0.3, 5);

    // ---- the gorge: reeds along the banks (none on the bridge), storks downstream, fishing boats at the reed mouth
    k.reeds();
    V.storkFlock(k, 40, 24, -54, 7, { spread: 6, yaw: Math.PI / 2 + 0.2 });
    for (const [x, z, yaw] of [[50, -32, 2.6], [60, -28, -2.2]]) {
      V.boat(k, x, WY - 0.15, z, yaw, { len: 7 });
      villager(props, x, WY + 0.35, z, yaw, { pose: 'row', shirt: shirt() });
    }

    // ---- Đầu cầu bắc: bamboo on the bluff, plumes on its lip, a lamp at the knot post
    for (const [x, z] of [[-30, -28], [-40, -20], [-18, -18], [14, -26]]) V.bamboo(k, x, z, { n: r.int(7, 10), h: r.range(8, 11) });
    for (let i = 0; i < 6; i++) V.reedPlumes(k, r.range(-40, 12), r.range(-36, -33), { n: 10, r: 1.5 });
    k.lamp(-7, -24, 0.5);

    // ---- Nhánh sông lau: plumes on the islands, reeds standing in the water, lotus in the still corners, lift nets on the
    // margins, the fishermen's stake nets where the fight comes up out of the water, boats, storks wading
    for (const [x, z, rr] of ISLES) V.reedPlumes(k, x, z, { n: Math.round(rr * 7), r: rr * 0.8 });
    for (let i = 0; i < 46; i++) {
      const x = r.range(-54, 70), z = r.range(-12, 40);
      if (Math.abs(x - laneX(z)) < 7 || Math.hypot(x - 22, z + 2) < 10 || Math.hypot(x - HIDE[0], z - HIDE[1]) < 4) continue;
      V.reedPlumes(k, x, z, { n: r.int(6, 14), r: r.range(1, 2.2) });
    }
    for (const [x, z, rr] of [[-30, 32, 3], [40, -8, 2.6], [-46, 2, 3.2], [58, 14, 2.4]]) V.lotus(k, x, WY + 0.01, z, rr);
    for (const [x, z, yaw] of [[-50, -4, Math.PI / 2], [64, 22, -Math.PI / 2], [-40, 38, Math.PI / 2 + 0.3]]) liftNet(k, x, WY, z, yaw, 1.1);
    { const ring = [];                                                                              // stake nets round the duel ground
      for (let a = 0; a <= 12; a++) ring.push([22 + Math.sin(a / 12 * Math.PI * 2) * 7.5, -2 + Math.cos(a / 12 * Math.PI * 2) * 6]);
      weir(k, ring.slice(1, 5), { h: 1.6 }); weir(k, ring.slice(7, 11), { h: 1.6 }); }
    for (const [x, z, yaw, len] of [[-30, 2, 0.4, 7], [52, 34, -1.2, 7], [-8, 36, 1.9, 6], [44, -14, 2.6, 7]]) {
      V.boat(k, x, WY - 0.15, z, yaw, { len });
      villager(props, x, WY + 0.35, z, yaw, { pose: r.chance(0.5) ? 'row' : 'stand', shirt: shirt() });
    }
    for (const [x, z, yaw] of [[-26, 10, 1.2], [-40, 24, 2.2], [32, 30, -0.6], [50, 2, 0.8], [-10, -10, 2.8], [60, 34, -2.0]]) V.stork(k, x, k.ground(x, z), z, yaw, { s: 0.95 });
    V.storkFlock(k, 0, 26, 18, 9, { spread: 7, yaw: -0.3 });
    V.storkFlock(k, -30, 32, 60, 5, { spread: 5, yaw: 0.6 });
    for (const [x, z] of [[-48, 30], [62, -6], [-52, -12]]) V.fishTrap(k, x, k.ground(x, z), z, r.range(0, 3));
    { const gy = k.ground(BELL[0] + 5, BELL[1]);                                                   // the reed landing: a short jetty off the dike
      V.jetty(k, BELL[0] - 0.6, BELL[1] - 1.8, Math.PI / 2, 9, { w: 2.2, y: Math.max(gy, WY) + 0.35 }); }
    V.reedPlumes(k, HIDE[0] + 3.2, HIDE[1] + 1, { n: 26, r: 2.4 }); V.reedPlumes(k, HIDE[0] - 3.4, HIDE[1] + 3, { n: 20, r: 2 });   // the hiding place

    // ---- Làng chài: stilt houses in the shallows, nets drying along the lane, boats drawn up, fish traps, bamboo,
    // banana and areca, the banyan and the village shrine, villagers keeping to their doors, the hunters' flags
    for (const h of HOUSES) V.stiltHouse(k, h[0], h[1], h[2], h[3]);
    for (const [x, z, yaw] of RACKS) netRack(k, x, z, yaw, 6);
    for (const [x, z, yaw] of [[-24, 50, 1.4], [25, 66, -1.6], [-25, 98, 1.7], [26, 110, -1.4]]) V.boat(k, x, k.ground(x, z) - 0.1, z, yaw, { len: 6, roof: false });
    for (const [x, z] of [[-20, 58], [21, 84], [-21, 104], [18, 52]]) V.fishTrap(k, x, k.ground(x, z), z, r.range(0, 3));
    for (const [x, z] of [[-22, 80], [23, 100], [20, 62], [-21, 112]]) V.bamboo(k, x, z, { n: r.int(6, 9), h: r.range(8, 10.5) });
    for (const [x, z] of [[-19, 68], [19, 90], [-18, 96], [18, 110]]) V.banana(k, x, z, r.range(0.9, 1.1));
    for (const [x, z] of [[22, 48], [-22, 46], [-20, 86], [22, 76]]) V.areca(k, x, z, r.range(8, 10.5));
    V.banyan(k, 19, 70, 1.0); V.shrine(k, 15.8, 66, -Math.PI / 2, 0.9);
    for (const [i, o] of [[0, { woman: true, hat: false }], [5, {}], [2, { hat: false }], [7, { woman: true }]]) {                  // in their doorways
      const [x, z, yaw, s] = HOUSES[i], d = 4.5 * s - 0.8;
      villager(props, x - Math.sin(yaw) * d, k.topAt(x, z) + 1.92 * s, z - Math.cos(yaw) * d, yaw + Math.PI, { shirt: shirt(), ...o });
    }
    for (const [x, z] of [[-10, 50], [10, 112], [-10, 82]]) k.standard(x, z, 1.0, mats.foe, 8, [0, 80]);
    for (const [x, z] of [[-9, 66], [9, 92], [-9, 104]]) {                                           // lantern poles along the lane
      poles.push({ s: [0.14, 3.2, 0.14], p: [x, k.ground(x, z) + 1.6, z], c: 0x6a7040 }, { s: [1.2, 0.1, 0.1], p: [x + 0.5 * Math.sign(-x), k.ground(x, z) + 3.1, z], c: 0x6a7040 });
      k.lantern(x + Math.sign(-x) * 1.0, k.ground(x, z) + 2.6, z, 0.9);
    }
    // the village's north end: lũy tre on the land, the đăng in the water, the gate and the hunters' barricade in it
    V.bambooHedge(k, [[-4.6, 118.2], [-27, 118.2]], { h: 8.5 }); V.bambooHedge(k, [[4.6, 118.2], [27, 118.2]], { h: 8.5 });
    weir(k, [[-29, 118.2], [-58, 118.2]]); weir(k, [[29, 118.2], [58, 118.2]]);
    V.villageGate(k, 0, 118.2, 0, 8.8);
    k.barricade('village');
    k.burn(-1.5, 118, 0.8, 'village'); k.burn(2, 118.6, 0.7, 'village');
    for (const sx of [-1, 1]) k.lamp(sx * 6, 114, 0.5);

    // ---- Quán nhỏ: the eating house (its lid, cellar and net: build), the 店 sign, lanterns under the eaves and on poles
    // in the yard, benches and jars outside, the net rig's poles, the jetty and its boats, houses and bamboo behind
    tavern(k, TAV[0], TAV[1], 0);
    { const gy = k.ground(TAV[0], TAV[1]), F = TAVERN.FLOOR, zf = TAV[1] - TAVERN.D / 2;
      k.cloth(sign, 0.9, 1.9, 'hang', TAV[0] + 7.4, gy + F + 3.0, zf - 0.25, 0);
      for (const lx of [-8, -4, 0, 4]) k.lantern(TAV[0] + lx, gy + F + 2.75, zf - 0.4, 0.95);
      k.fire(TAV[0] - TAVERN.W / 2 + 2.2, gy + F + 0.95, TAV[1] + 1.2, 0.55, false); }             // the cooking fire on the hearth
    for (const [x, z] of [[-14, 136], [14, 144], [-16, 154], [16, 156]]) {
      poles.push({ s: [0.16, 3.6, 0.16], p: [x, k.ground(x, z) + 1.8, z], c: 0x6a7040 });
      k.lantern(x, k.ground(x, z) + 3.1, z, 1.0);
    }
    for (const [x, z, yaw] of [[-12, 158, 0], [12, 158, 0.1], [-19, 146, Math.PI / 2]]) {             // benches in the yard
      const L = k.local(x, k.ground(x, z), z, yaw);
      L(0, 0.42, 0, [2.6, 0.1, 0.5], 0x7a5a3a); for (const sx of [-1, 1]) L(sx * 1.1, 0.2, 0, [0.12, 0.4, 0.4], 0x4a3020);
    }
    for (let q = 0; q < 7; q++) { const x = 18 + r.range(-1.5, 1.5), z = 162 + r.range(-3, 3), s = r.range(0.7, 1); props.push({ s: [0.6 * s, 0.85 * s, 0.6 * s], p: [x, k.ground(x, z) + 0.42 * s, z], c: sh(0x6a4a30, r.range(0.8, 1.1)) }); }
    { const gy = k.ground(NET[0], NET[1]);                                                          // the net rig's two poles and crossbar
      for (const sx of [-1, 1]) poles.push({ s: [0.28, 7.6, 0.28], p: [NET[0] + sx * 9.1, gy + 3.8, NET[1]], c: 0x8a9048 });
      poles.push({ s: [18.8, 0.2, 0.2], p: [NET[0], gy + 7.3, NET[1]], c: 0x7a8040 }); }
    V.jetty(k, JETTY[0], JETTY[1], Math.PI / 2, 17, { w: 2.6, y: 0.35 });
    for (const [x, z, yaw] of [[33, 135.6, Math.PI / 2], [38, 144.4, -Math.PI / 2 + 0.1]]) V.boat(k, x, WY - 0.15, z, yaw, { len: 7 });
    for (const [x, z] of [[-24, 176], [24, 178], [-30, 128], [28, 182], [-18, 184]]) V.bamboo(k, x, z, { n: r.int(8, 12), h: r.range(9, 12), spread: 1.8 });
    for (const [x, z] of [[-20, 128], [20, 128]]) V.areca(k, x, z, r.range(8, 10));
    V.banyan(k, -24, 178, 1.15);
    for (const [x, z] of [[-6, 126], [7, 126]]) V.stork(k, x + 34, k.ground(x + 34, z), z, 1.6 + x * 0.1, { s: 0.9 });   // wading off the yard
    V.storkFlock(k, 20, 30, 170, 5, { spread: 6, yaw: -0.8 });

    // ---- the field: spent arrows, the fallen's gear on the road and the bluff; reserves off the walk field: the
    // hunters on the karst shoulders over the gorge and the reeds, the escort's rearguard behind the road
    k.arrows([-40, -190, 40, 40], 40);
    k.debris([-40, -190, 40, -70], 60);
    for (const [x, z, f] of [[-12, -210, 0], [12, -210, 0]]) k.formation('ally', x, z, f, r.int(6, 9), r.int(3, 5));
    for (const [x, z, f] of [[-62, -96, Math.PI / 2], [62, -104, -Math.PI / 2], [-70, 4, Math.PI / 2 + 0.3], [84, 14, -Math.PI / 2 - 0.3], [-66, 84, Math.PI / 2]]) k.formation('foe', x, z, f, r.int(7, 11), r.int(3, 5));
    k.aftermath({ fallen: [[-14, 14, -186, -142, 6], [-38, 38, -124, -76, 10], [-30, 30, 50, 112, 6]], standards: [4, -38, -124, 38, -76] });
  },

  // set pieces: the bridge (and its fall), the seven biers, the floating coffin and its boats, the bells, the cellar
  // and its trapdoor, the net, the signal fires, the lagoon water, the rain
  build(root, k) {
    // the render bed under the bridge (the deck spans water; the sim deck stays walkable)
    { const bed = root.getObjectByName('ground').geometry, pos = bed.attributes.position;
      for (let i = 0; i < pos.count; i++) pos.setY(i, this.water.bedHeight(pos.getX(i), pos.getZ(i), pos.getY(i)));
      pos.needsUpdate = true; bed.computeVertexNormals(); bed.computeBoundingSphere(); }
    const R = makeRng(979), mat = lit();
    const mesh = (boxes, parent = root) => { const m = new THREE.Mesh(boxesGeometry(boxes), mat); m.castShadow = m.receiveShadow = true; parent.add(m); return m; };
    const group = (x = 0, y = 0, z = 0) => { const g = new THREE.Group(); g.position.set(x, y, z); root.add(g); return g; };

    // ---- the reed branch's water: one jade sheet (it shows wherever the bed lies under it), a scrolling ripple normal map
    // for the silver glints; and the river beyond the grid's flanks
    const ripple = (() => {
      const N = 128, c = document.createElement('canvas'); c.width = c.height = N;
      const g = c.getContext('2d'), img = g.createImageData(N, N), hgt = new Float32Array(N * N), rr = makeRng(7);
      for (let q = 0; q < 70; q++) {                                                                // soft round bumps, wrapped
        const cx = rr.range(0, N), cz = rr.range(0, N), rad = rr.range(4, 14), a = rr.range(-1, 1);
        for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
          let dx = Math.abs(i - cx), dz = Math.abs(j - cz); dx = Math.min(dx, N - dx); dz = Math.min(dz, N - dz);
          hgt[i + j * N] += a * Math.exp(-(dx * dx + dz * dz) / (rad * rad));
        }
      }
      for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
        const hx = hgt[((i + 1) % N) + j * N] - hgt[((i + N - 1) % N) + j * N], hz = hgt[i + ((j + 1) % N) * N] - hgt[i + ((j + N - 1) % N) * N];
        const nx = -hx * 0.9, nz = -hz * 0.9, l = Math.hypot(nx, nz, 1), o = (i + j * N) * 4;
        img.data[o] = (nx / l * 0.5 + 0.5) * 255; img.data[o + 1] = (nz / l * 0.5 + 0.5) * 255; img.data[o + 2] = (1 / l * 0.5 + 0.5) * 255; img.data[o + 3] = 255;
      }
      g.putImageData(img, 0, 0);
      const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(26, 30);
      return t;
    })();
    const wmat = new THREE.MeshStandardMaterial({ color: 0x2e6a5c, roughness: 0.16, metalness: 0.15, normalMap: ripple, normalScale: new THREE.Vector2(0.55, 0.55), transparent: true, opacity: 0.88 });
    { const g = new THREE.PlaneGeometry(136, 235); g.rotateX(-Math.PI / 2);
      const m = new THREE.Mesh(g, wmat); m.position.set(8, WY - 0.035, -35 + 117.5); m.receiveShadow = true; m.name = 'reed-water'; root.add(m); }
    { const fmat = new THREE.MeshStandardMaterial({ color: 0x1e5048, roughness: 0.3, metalness: 0.1 });
      for (const sx of [-1, 1]) {
        const x0 = sx < 0 ? -1600 : 130, x1 = sx < 0 ? -130 : 1600, zc = riverC(sx * 130), g = new THREE.PlaneGeometry(x1 - x0, HW * 2 + 5); g.rotateX(-Math.PI / 2);
        const m = new THREE.Mesh(g, fmat); m.position.set((x0 + x1) / 2, WY - 0.03, zc); root.add(m);
      } }

    // ---- the bridge: plank deck on the sim deck, posts and two rope rails, piles into the water, anchor posts with the
    // main cables knotted round them; three spans (the middle one is a group that falls), broken ends shown after
    const deckY = (z) => k.ground(0, z) + 0.08, Z0 = -73, Z1 = -31, M0 = -58, M1 = -46, MID = [0, deckY(RIVER_Z), RIVER_Z];
    const span = [[], [], []], which = (z) => (z < M0 ? 0 : z < M1 ? 1 : 2);
    const B = (z, box) => { const s = which(z); if (s === 1) box.p = [box.p[0] - MID[0], box.p[1] - MID[1], box.p[2] - MID[2]]; span[s].push(box); };
    let q = 0;
    for (let z = Z0; z < Z1; z += 0.56, q++) B(z, { s: [5.2 + (q % 3) * 0.12, 0.14, 0.5], p: [(q % 2) * 0.08, deckY(z) - 0.07, z], r: [0, ((q * 7) % 5 - 2) * 0.014, 0], c: shade(0x6e5434, 0.78 + ((q * 13) % 7) / 20) });
    for (const sx of [-1, 1]) {
      for (let z = Z0; z < Z1 - 0.1; z += 1.5) {
        const za = z, zb = Math.min(Z1, z + 1.5), ya = deckY(za), yb = deckY(zb), Lg = Math.hypot(zb - za, yb - ya), pitch = -Math.atan2(yb - ya, zb - za), zm = (za + zb) / 2, ym = (ya + yb) / 2;
        B(za, { s: [0.18, 1.2, 0.18], p: [sx * 2.55, ya + 0.55, za], c: 0x4a3222 });
        B(zm, { s: [0.07, 0.07, Lg + 0.05], p: [sx * 2.55, ym + 1.08, zm], r: [pitch, 0, 0], c: 0xb09868 });                // hand rope
        B(zm, { s: [0.05, 0.05, Lg + 0.05], p: [sx * 2.55, ym + 0.6, zm], r: [pitch, 0, 0], c: 0x9a8458 });
        B(zm, { s: [0.26, 0.3, Lg + 0.04], p: [sx * 2.62, ym - 0.24, zm], r: [pitch, 0, 0], c: 0x3a2818 });                // stringer
        if (Math.abs(za - RIVER_Z) < HW + 1) B(za, { s: [0.04, 1.0, 0.04], p: [sx * 2.55, ya + 0.55, za + 0.75], r: [0, 0, sx * 0.35], c: 0x9a8458 });   // rope lacing
      }
      for (let z = RIVER_Z - HW + 1; z < RIVER_Z + HW; z += 3.2) {                                   // piles + a cross brace
        const y = deckY(z);
        B(z, { s: [0.38, 7, 0.38], p: [sx * 2.2, y - 3.7, z], c: 0x2e2018 });
        B(z, { s: [0.14, 0.14, 4.6], p: [sx * 2.2, y - 2.4, z + 1.6], r: [0.75, 0, 0], c: 0x3a2818 });
      }
    }
    for (const [z, d] of [[Z0 + 1.2, -1], [Z1 - 0.6, 1]]) for (const sx of [-1, 1]) {                // anchor posts and knots
      const y = k.ground(sx * 3.5, z);
      B(z, { s: [0.5, 2.8, 0.5], p: [sx * 3.5, y + 1.4, z], c: 0x3e2a1a });
      B(z, { s: [0.66, 0.5, 0.66], p: [sx * 3.5, y + 1.9, z], c: 0xb09868 });
      B(z, { s: [0.12, 0.12, 2.4], p: [sx * 3.0, y + 1.6, z - d * 1.2], r: [d * 0.2, -sx * 0.18, 0], c: 0xb09868 });
    }
    // the north knot post carries the red cord of the last knot
    { const y = k.ground(KNOT[0], KNOT[1] - 0.3); span[2].push({ s: [0.1, 0.9, 0.1], p: [3.5, y + 1.35, Z1 - 0.6 - 0.36], c: 0xc0281c }); }
    const south = mesh(span[0]), north = mesh(span[2]), mid = group(...MID), midMesh = mesh(span[1], mid);
    void south; void north; void midMesh;
    // broken ends: planks hanging off both breaks, rope ends trailing to the water (shown after the fall)
    const stub = [];
    for (const [z, d] of [[M0, 1], [M1, -1]]) {
      const y = deckY(z);
      for (let i = 0; i < 5; i++) stub.push({ s: [0.5, 0.12, R.range(1.2, 2.4)], p: [-1.8 + i * 0.9 + R.range(-0.2, 0.2), y - 0.9, z + d * 0.3], r: [d * R.range(1.1, 1.45), R.range(-0.2, 0.2), 0], c: shade(0x6e5434, R.range(0.75, 1)) });
      for (const sx of [-1, 1]) stub.push({ s: [0.07, 3.4, 0.07], p: [sx * 2.55, y - 0.8, z + d * 0.4], r: [d * 0.35, 0, sx * 0.1], c: 0xb09868 });
    }
    const stubs = mesh(stub); stubs.visible = false;
    // the splash where the span hits the water: white blocks thrown up and out, fading
    const splashMat = new THREE.MeshBasicMaterial({ color: 0xe8f2ee, transparent: true, opacity: 0, depthWrite: false });
    const sb = [];
    for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2, d = R.range(0.6, 1.4); sb.push({ s: [0.5, R.range(0.4, 1.6), 0.5], p: [Math.sin(a) * d * 4, 0.4, Math.cos(a) * d * 2.4], r: [0, a, 0], c: 0xffffff }); }
    const splash = new THREE.Mesh(boxesGeometry(sb), splashMat); splash.position.set(0, WY, RIVER_Z); splash.visible = false; root.add(splash);

    // ---- the seven biers: lined up on the bluff (west of the road), pushed over the bridge on 'cross' by their bearers
    // (two to a bier, black jackets of the escort); the seventh is left alone mid-span
    const biers = [];
    for (let i = 0; i < 7; i++) {
      const b = []; V.coffinBier(boxKit(b, R), 0, 0, 0);
      if (i < 6) for (const lz of [-2.5, 2.5]) villager(b, 0, 0, lz, 0, { hat: false, shirt: 0x231c1a, pants: 0x2a2220, pose: 'pull' });
      const g = group(), m = mesh(b, g);
      const slot = [-16 + (i % 2) * 6, -100 + i * 3.2];
      const path = [slot, [0, -80], [0, -74], ...(i < 6 ? [[0, -35], [-24 + i * 3.2, -27]] : [[0, RIVER_Z]])];
      const segs = []; let tot = 0;
      for (let s = 0; s < path.length - 1; s++) { const l = Math.hypot(path[s + 1][0] - path[s][0], path[s + 1][1] - path[s][1]); segs.push(l); tot += l; }
      biers.push({ g, m, path, segs, tot, t0: 0.5 + i * 3, yaw: 0 });
    }
    const bierAt = (B, d) => {
      let s = 0;
      while (s < B.segs.length - 1 && d > B.segs[s]) { d -= B.segs[s]; s++; }
      const u = Math.min(1, d / B.segs[s]), [ax, az] = B.path[s], [bx, bz] = B.path[s + 1];
      return [ax + (bx - ax) * u, az + (bz - az) * u, Math.atan2(bx - ax, bz - az)];
    };
    const placeBier = (B, d) => {
      const [x, z, yaw] = bierAt(B, d);
      if (d > 0.05) B.yaw += (yaw - B.yaw) * 0.15;
      B.g.position.set(x, k.ground(x, z), z); B.g.rotation.set(0, B.yaw, 0);
    };

    // ---- the coffin that floats: its bamboo frame, two boats of fishermen towing it into the reeds
    const raftG = group(); raftG.visible = false;
    { const b = []; raft(b, R); V.coffin(boxKit(b, R), 0, 0, 0, { y: 0.05 });
      for (const sx of [-1, 1]) for (const lz of [1.6, -1.6]) b.push({ s: [0.05, 0.05, 3.4], p: [sx * 2.4, 0.1, lz + 1.4], r: [0, sx * 0.5, 0], c: 0xb09868 });   // tow ropes
      mesh(b, raftG);
      for (const sx of [-1, 1]) {
        const bb = []; V.boat(boxKit(bb, R), 0, -0.15, 0, 0, { len: 7 });
        villager(bb, 0, 0.35, -1.6, 0, { pose: 'row', shirt: sx < 0 ? 0x4a4e5a : 0x5a4a3a });
        villager(bb, 0, 0.35, 1.8, 0, { pose: 'pull', shirt: sx < 0 ? 0x6a5a44 : 0x3a4a52 });
        const m = mesh(bb, raftG); m.position.set(sx * 3.6, 0, 3.4);
      } }
    const FLOAT = [[46, -36], [41, -22], [35, -6], [31, 6], [HIDE[0], HIDE[1]]];
    const floatAt = (u) => {
      const f = Math.min(0.9999, Math.max(0, u)) * (FLOAT.length - 1), i = Math.floor(f), t = f - i, [ax, az] = FLOAT[i], [bx, bz] = FLOAT[i + 1];
      return [ax + (bx - ax) * t, az + (bz - az) * t, Math.atan2(bx - ax, bz - az)];
    };

    // ---- the bells: the reed landing's post (set 'bell') and the tavern jetty's (set 'ring'); the bells swing on a pivot
    const bellPost = (x, y, z, yaw) => {
      const b = []; V.bellPost(boxKit(b, R), 0, 0, 0, 0, 1);
      const posts = b.filter((p) => p.p[1] > 2.4 || Math.abs(p.p[0]) > 0.8), bells = b.filter((p) => !posts.includes(p));
      const g = group(x, y, z); g.rotation.y = yaw; mesh(posts, g);
      const piv = new THREE.Group(); piv.position.set(0, 2.5, 0); g.add(piv);
      mesh(bells.map((p) => ({ ...p, p: [p.p[0], p.p[1] - 2.5, p.p[2]] })), piv);
      return { piv, t: -1 };
    };
    const bells = { bell: bellPost(BELL[0], k.ground(...BELL), BELL[1], Math.PI / 2), ring: bellPost(JETTY[0] + 16, 0.35, JETTY[1], 0) };

    // ---- the cellar: a coffin among wine jars under the trapdoor; the lid (open, leaning back) shuts on 'hide' with
    // straw thrown over it
    const tgy = k.ground(TAV[0], TAV[1]), F = TAVERN.FLOOR, [hx, hz, hw, hd] = TAVERN.hole;
    { const b = []; V.coffin(boxKit(b, R), TAV[0] + hx, TAV[1] + hz, Math.PI / 2, { s: 0.72, y: tgy + 0.08 });
      for (const [dx, dz] of [[-1.3, -0.9], [1.25, 0.85], [-1.2, 0.95], [1.3, -0.8]]) b.push({ s: [0.5, 0.7, 0.5], p: [TAV[0] + hx + dx, tgy + 0.35, TAV[1] + hz + dz], c: shade(0x6a4a30, R.range(0.8, 1.1)) });
      b.push({ s: [hw + 1.2, 0.08, hd + 1.0], p: [TAV[0] + hx, tgy + 0.04, TAV[1] + hz], c: 0x1a120c });
      mesh(b); }
    const lid = group(TAV[0] + hx, tgy + F, TAV[1] + hz + hd / 2);
    mesh([{ s: [hw, 0.1, hd], p: [0, 0.05, -hd / 2], c: 0x6a4c30 }, { s: [hw, 0.04, 0.1], p: [0, 0.12, -hd * 0.2], c: 0x3a2818 }, { s: [hw, 0.04, 0.1], p: [0, 0.12, -hd * 0.8], c: 0x3a2818 }], lid);
    const straw = [];
    for (let i = 0; i < 16; i++) straw.push({ s: [R.range(0.5, 1.1), 0.08, R.range(0.12, 0.3)], p: [R.range(-hw / 2, hw / 2), 0.16 + R.range(0, 0.1), -R.range(0.1, hd)], r: [0, R.range(0, 3), 0], c: shade(0xc8b070, R.range(0.8, 1.05)) });
    const strawM = mesh(straw, lid);

    // ---- the net: rolled on the crossbar until 'net', then cast over the yard (a dome of cords and floats over whoever
    // stands under it), villagers on its edge ropes, bamboo poles across the tavern's front
    const ngy = k.ground(NET[0], NET[1]);
    const bundle = mesh([{ s: [16, 0.6, 0.6], p: [NET[0], ngy + 6.8, NET[1]], c: 0x5a4a38 }, ...[-6, -2, 2, 6].map((x) => ({ s: [0.1, 0.7, 0.7], p: [NET[0] + x, ngy + 6.8, NET[1]], c: 0xb09868 }))]);
    const netG = group(NET[0], ngy, NET[1]); netG.visible = false;
    { const b = [], NX = 14, NZ = 11, STEP = 0.7, dome = (x, z) => 0.12 + 1.75 * Math.exp(-(x * x + z * z) / 7);
      for (let ix = -NX / 2; ix <= NX / 2 + 1e-6; ix += STEP) for (let iz = -NZ / 2; iz < NZ / 2 - 1e-6; iz += STEP) {
        const ya = dome(ix, iz), yb = dome(ix, iz + STEP), L = Math.hypot(STEP, yb - ya);
        b.push({ s: [0.045, 0.045, L], p: [ix, (ya + yb) / 2, iz + STEP / 2], r: [-Math.atan2(yb - ya, STEP), 0, 0], c: 0x4a3c2c });
      }
      for (let iz = -NZ / 2; iz <= NZ / 2 + 1e-6; iz += STEP) for (let ix = -NX / 2; ix < NX / 2 - 1e-6; ix += STEP) {
        const ya = dome(ix, iz), yb = dome(ix + STEP, iz), L = Math.hypot(STEP, yb - ya);
        b.push({ s: [L, 0.045, 0.045], p: [ix + STEP / 2, (ya + yb) / 2, iz], r: [0, 0, Math.atan2(yb - ya, STEP)], c: 0x4a3c2c });
      }
      for (let ix = -NX / 2; ix <= NX / 2; ix += 1.4) for (const sz of [-1, 1]) b.push({ s: [0.22, 0.16, 0.22], p: [ix, 0.1, sz * NZ / 2], c: sz < 0 ? 0x8a8478 : 0xc8b070 });
      mesh(b, netG); }
    const folk = [];
    for (let i = 0; i < 10; i++) {                                                                  // on the net's edge ropes, leaning back
      const a = i / 10 * Math.PI * 2 + 0.3, x = NET[0] + Math.sin(a) * 9.2, z = NET[1] + Math.cos(a) * 7.4;
      villager(folk, x, k.ground(x, z), z, a + Math.PI, { pose: 'pull', woman: i % 3 === 1, hat: i % 2 === 0, shirt: [0x4a4e5a, 0x5a4a3a, 0x3a4a52, 0x6a5a44][i % 4] });
    }
    for (const [x, z, yaw] of [[-12, 156, 0.3], [12, 157, -0.3], [-4, 159.4, 0], [5, 159.6, 0.1]]) villager(folk, x, k.ground(x, z), z, Math.PI + yaw, { pose: 'pole', shirt: 0x3a3a42 });
    { const zf = TAV[1] - TAVERN.D / 2 - 0.6, y = k.ground(0, zf);                                  // poles barred across the open front
      for (const [x, a] of [[-6, 0.5], [0, -0.45], [6, 0.4]]) folk.push({ s: [7, 0.16, 0.16], p: [x, y + 1.6, zf], r: [0, 0, a], c: 0x9aa050 }); }
    const folkM = mesh(folk); folkM.visible = false;

    // ---- fires that wait for their set: Thầy Mo's three on the far peak ('signal'), the hearth's smoke ('net')
    let sigT = -1, netT = -1;
    const top = k.peakTop ?? 60;
    for (const [dx, dz] of [[-1.4, 0.4], [1.2, -0.6], [0.1, 1.3]]) k.fire(64 + dx, top + 0.9, 208 + dz, 2.4, true, () => sigT >= 0);
    k.fire(TAV[0] - TAVERN.W / 2 + 2.2, tgy + F + 1.3, TAV[1] + 0.4, 1.5, true, () => netT >= 0);
    k.fire(TAV[0] - 4, tgy + F + 0.4, TAV[1] - 3.6, 1.35, true, () => netT >= 0);

    // ---- rain over the village and the tavern (comic ch. 12): streaks round the hero, easing in north of the reeds,
    // gone on 'ring' (the rain stops as the bell sounds)
    const RN = 1300, rpos = new Float32Array(RN * 6), rr = makeRng(12);
    for (let i = 0; i < RN; i++) {
      const x = rr.range(-34, 34), y = rr.range(-2, 26), z = rr.range(-30, 38);
      rpos.set([x, y, z, x + 0.06, y - 0.85, z + 0.04], i * 6);
    }
    const rgeo = new THREE.BufferGeometry(); rgeo.setAttribute('position', new THREE.BufferAttribute(rpos, 3));
    const rmat = new THREE.LineBasicMaterial({ color: 0xc8d8e0, transparent: true, opacity: 0, depthWrite: false });
    const rain = new THREE.LineSegments(rgeo, rmat); rain.frustumCulled = false; rain.visible = false; root.add(rain);

    // ---- state
    let crossT = -1, colT = -1, floatT = -1, hideT = -1, rainK = 0, dry = false, lastFrame = Infinity, time = 0;
    const reset = () => {
      crossT = colT = floatT = hideT = sigT = netT = -1; rainK = 0; dry = false;
      mid.position.set(...MID); mid.rotation.set(0, 0, 0); mid.visible = true; stubs.visible = false; splash.visible = false;
      biers.forEach((b) => { if (b.g.parent !== root) root.attach(b.g); b.yaw = 0; b.g.visible = true; placeBier(b, 0); });
      raftG.visible = false; bundle.visible = true; netG.visible = false; folkM.visible = false; strawM.visible = false;
      lid.rotation.x = 1.45; bells.bell.t = bells.ring.t = -1;
    };
    reset();
    return {
      sets: {
        cross() { if (crossT < 0) crossT = 0; },
        collapse() { if (colT < 0) { colT = 0; mid.attach(biers[6].g); } },
        float() { if (floatT < 0) floatT = 0; },
        bell() { bells.bell.t = 0; },
        signal() { if (sigT < 0) sigT = 0; },
        hide() { if (hideT < 0) hideT = 0; },
        net() { if (netT < 0) netT = 0; },
        ring() { bells.ring.t = 0; dry = true; },
      },
      update(dt, game) {
        if (game && game.frame < lastFrame) reset();                                    // a new battle
        if (game) lastFrame = game.frame;
        time += dt;
        ripple.offset.set(time * 0.012, time * 0.02);
        // the biers cross: each walks its path from its start time; the seventh stops mid-span
        if (crossT >= 0) {
          crossT += dt;
          for (const b of biers) if (b.g.parent === root) placeBier(b, Math.max(0, Math.min(b.tot, (crossT - b.t0) * 3.6)));
        }
        // the middle span falls (≈ 2.5 s into the water), the splash, then it is gone
        if (colT >= 0) {
          colT += dt;
          const t = colT, y = MID[1] - 4.9 * t * t;
          mid.position.y = Math.max(WY - 6, y); mid.rotation.x = Math.min(0.9, t * 0.5); mid.rotation.z = Math.min(0.5, t * 0.25);
          mid.visible = t < 3.2; stubs.visible = true;
          const ts = t - 0.75;
          splash.visible = ts > 0 && ts < 2.4;
          if (splash.visible) { const u = ts / 2.4; splash.scale.set(1 + u * 2.2, 0.3 + Math.sin(Math.min(1, u * 2.5) * Math.PI) * 2.6, 1 + u * 2.2); splashMat.opacity = 0.85 * (1 - u); }
        }
        // the coffin rises on its frame at the reed mouth and is towed into the reeds (≈ 26 s)
        raftG.visible = floatT >= 0;
        if (floatT >= 0) {
          floatT += dt;
          const [x, z, yaw] = floatAt((floatT - 1.5) / 24), rise = Math.min(1, floatT / 1.5);
          raftG.position.set(x, WY - 1.3 + rise * 1.25 + 0.05 * Math.sin(time * 1.7), z); raftG.rotation.set(0.03 * Math.sin(time * 1.3), yaw, 0.04 * Math.sin(time * 1.1));
        }
        for (const b of [bells.bell, bells.ring]) {                                        // three strokes, dying away
          if (b.t < 0) continue;
          b.t += dt; b.piv.rotation.x = b.t < 6 ? 0.45 * Math.sin(b.t * 5.2) * Math.exp(-b.t * 0.45) : 0;
        }
        if (hideT >= 0) { hideT += dt; const u = Math.min(1, hideT / 1.6); lid.rotation.x = 1.45 * (1 - u * u * (3 - 2 * u)); strawM.visible = hideT > 1.8; }
        if (sigT >= 0) sigT += dt;
        if (netT >= 0) {                                                                   // the net drops off the bar in ≈ 0.7 s
          netT += dt; bundle.visible = false; netG.visible = folkM.visible = true;
          netG.position.y = ngy + Math.max(0, 6.6 - 13 * netT * netT);
        }
        // rain: on north of the reeds (story and free), stopped by the bell
        const h = game?.hero;
        if (h) {
          rainK += ((!dry && h.z > 34 ? 1 : 0) - rainK) * Math.min(1, dt * 0.6);
          rain.visible = rainK > 0.02; rmat.opacity = 0.3 * rainK;
          if (rain.visible) {
            rain.position.set(h.x, k.ground(h.x, h.z), h.z);
            const p = rgeo.attributes.position.array, fall = 21 * dt;
            for (let i = 0; i < RN; i++) {
              const o = i * 6;
              p[o + 1] -= fall; p[o + 4] -= fall;
              if (p[o + 4] < -2) { p[o + 1] += 28; p[o + 4] += 28; }
            }
            rgeo.attributes.position.needsUpdate = true;
          }
        }
      },
    };
  },
};
