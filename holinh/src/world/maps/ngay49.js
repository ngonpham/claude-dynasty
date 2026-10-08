// Màn VI «Ngày Bốn Mươi Chín» (979, dawn of the 49th day) laid out along +Z, ≈ 360 m from Hữu Tướng's shield line to
// the traitor's last stand — the finale of 護靈壯士 (holinh/DESIGN.md §6-7; comic ch. 16-17). Palette [LINH]: dawn gold,
// black lacquer, candle flames, blue-grey mist lying between the karsts; full morning once the seven beacons burn.
//   Vòng ngoài     the outer ring     z -198 … -138  h 0   the start: Hữu Tướng's arc of shields (anchor 'shields'),
//                                                          a meadow below the karsts; the hunters' cavalry pours down two
//                                                          slopes from the flanks (paths to h 7, anchors 'slopeW' / 'slopeE')
//   Sân tế         the rite ground    z -140 …  -72  h 0-1 a raised stone platform (a mound, h 1 within 13 m of RITE) with
//                                                          the altar (nameless tablet, blank banners), the ring of 49 candles
//                                                          round the kneeling Queen (anchor 'queen'), Thầy Mo's bells,
//                                                          incense, arrows in the turf; its north steps = the inner ring
//                                                          (anchor 'innerstair', Nữ Cận Vệ's post). The defend point:
//                                                          anchor 'rite'. Across z -70 the traitor's palisade and its
//                                                          barricade (gate 'raoban', anchor 'barricade')
//   Bến sông       the river          z  -74 …   10  h 0   the green river crosses (centre ≈ z -10); east of the old stone
//                                                          bridge the stone sluice dams a high basin before a karst cave
//                                                          mouth (anchor 'sluice' = the bank by it); a raft of coffins
//                                                          waits by the reeds. Set 'sluice': the gate rises, the basin
//                                                          drains, the cave mouth shows, the raft glides into the dark
//   Cầu đá         the old bridge     z  -24 …    4        a stone deck over the deep water (anchor 'bridge' = its middle)
//   Bậc đá ướt     the wet stairs     z    8 …   52  h 0→8 stone steps up a karst cleft, seeps running down
//   Cửa đá         the stone door     z   52 …   66  h 8   a landing before a stone door frame (anchor 'door'); set 'door'
//                                                          drops the slab behind the hero
//   Điện tím       the violet hall    z   74 …  126  h 8   a clearing ringed by sheer rock, violet flames, map scraps; five
//                                                          false stone corridors run off it to dead ends; set 'seal'
//                                                          drops slabs into their mouths (the stone works close) and the
//                                                          storks rise
// Seven karst peaks stand round the field (PEAKS); set 'beacons' lights a fire on each at once. The tomb is never shown
// nor named: the raft only passes through a stone gate into darkness. Format: src/world/maps/index.js header (engine);
// set pieces: ./ngay49-set.js; Vietnamese dressing helpers: ../viet.js.
import * as V from '../viet.js';
import { buildSet, RIVER_Z, RHW, riverC, smooth, SLUICE, RITE, PLAT_H, PR0, PR1, ALTAR, QUEEN, CANDLE_C, DOOR_Z, HALL, CORRIDORS, STAIR_PTS } from './ngay49-set.js';

const OUT_Z = -138;                                 // outer ring → rite ground
const LUY_Z = -70;                                  // the traitor's palisade line across the rite ground's north edge
const STAIR0 = 8, STAIR1 = 52, TOP_H = 8;           // the wet stairs: foot, head (path: STAIR_PTS), the landing / hall height

// the rite ground: a low stone mound (PLAT_H within PR0 of RITE, easing to 0 by PR1)
const riteH = (x, z) => PLAT_H * (1 - smooth(PR0, PR1, Math.hypot(x - RITE[0], z - RITE[1])));

export default {
  id: 'ngay49',
  name: { zh: 'Ngày Bốn Mươi Chín', en: 'The Forty-Ninth Day' },
  grid: [-150, -230, 150, 210],
  pieces: [
    { id: 'outer', rect: [-48, -198, 48, OUT_Z], h: 0, edge: 3, rise: 14 },
    { id: 'slopeW', path: [[-44, -168, 9, 0], [-64, -160, 8.5, 2.8], [-86, -150, 8, 7]], edge: 2, rise: 10 },
    { id: 'slopeE', path: [[44, -164, 9, 0], [64, -156, 8.5, 2.8], [86, -146, 8, 7]], edge: 2, rise: 10 },
    { id: 'rite', rect: [-44, -142, 44, -72], h: riteH, edge: 3, rise: 18 },
    { id: 'bank', rect: [-50, -76, 50, 10], h: 0, edge: 3, rise: 12 },
    { id: 'stairs', path: STAIR_PTS, edge: 0.8, rise: 24 },
    { id: 'landing', rect: [-9, STAIR1, 9, DOOR_Z + 2], h: TOP_H, edge: 1, rise: 24 },
    { id: 'passage', path: [[0, DOOR_Z, 4.4, TOP_H], [0, HALL[1] - HALL[3] + 4, 5, TOP_H]], edge: 0.5, rise: 26 },
    { id: 'hall', ell: [HALL[0], HALL[1], HALL[2], HALL[3]], h: TOP_H, edge: 2.5, rise: 26 },
    ...CORRIDORS.map((pts, i) => ({ id: 'false' + i, path: pts.map(([x, z, w]) => [x, z, w, TOP_H]), edge: 0.6, rise: 26 })),
  ],
  // the stone bridge's sides over the deep water; the palisade arms either side of the barricade; the door frame's jambs
  carve: [[-14, RIVER_Z - RHW, -4.2, RIVER_Z + RHW], [4.2, RIVER_Z - RHW, 14, RIVER_Z + RHW],
    [-60, LUY_Z - 1.5, -12, LUY_Z + 1.5], [12, LUY_Z - 1.5, 60, LUY_Z + 1.5],
    [-9.5, DOOR_Z - 1.2, -3.6, DOOR_Z + 1.2], [3.6, DOOR_Z - 1.2, 9.5, DOOR_Z + 1.2]],
  // solid set pieces: the altar and its banners, the bell post, the watchtowers at the barricade, the sluice's bank head
  props: [[ALTAR[0] - 3.2, ALTAR[1] - 1.4, ALTAR[0] + 3.2, ALTAR[1] + 1.8], [6, -98.5, 8, -96.5],
    [13, LUY_Z + 1.5, 18, LUY_Z + 6], [-18, LUY_Z + 1.5, -13, LUY_Z + 6], [SLUICE[0] - 2, SLUICE[1] - RHW - 3, SLUICE[0] + 2, SLUICE[1] - RHW - 1]],
  zones: [
    { id: 'vongngoai', name: { zh: 'Vòng ngoài', en: 'The Outer Ring' }, x: 0, z: -168, w: 96, d: 60 },
    { id: 'santle', name: { zh: 'Sân tế', en: 'The Rite Ground' }, x: 0, z: -107, w: 88, d: 70 },
    { id: 'bensong', name: { zh: 'Bến sông', en: 'The River Landing' }, x: 0, z: -48, w: 100, d: 52 },
    { id: 'caucu', name: { zh: 'Cầu đá cũ', en: 'The Old Stone Bridge' }, x: 0, z: RIVER_Z, w: 36, d: 28 },
    { id: 'bacda', name: { zh: 'Bậc đá ướt', en: 'The Wet Stone Stairs' }, x: 0, z: 30, w: 16, d: 44 },
    { id: 'cuada', name: { zh: 'Cửa đá', en: 'The Stone Door' }, x: 0, z: 58, w: 18, d: 12 },
    { id: 'dientim', name: { zh: 'Điện tím', en: 'The Violet Hall' }, x: HALL[0], z: HALL[1], r: HALL[3] },
  ],
  route: [[0, -188], [0, -170], [0, -150], [0, -128], [-2, -119], [-9, -110], [-9.5, -100], [-6, -90], [0, -80], [0, LUY_Z], [0, -56], [0, -40], [0, -26],
    [0, RIVER_Z], [0, 2], [0, STAIR0], [-1, 20], [1, 32], [0, 44], [0, STAIR1 + 2], [0, DOOR_Z], [0, 76], [0, HALL[1]], [0, HALL[1] + 18]],
  gates: {
    raoban: { rect: [-14, LUY_Z - 1.5, 14, LUY_Z + 1.5], name: { zh: 'Lũy chắn phản thần', en: 'The Traitor\'s Barricade' }, kind: 'barricade', at: [0, LUY_Z, 0, 10.5] },
  },
  // shields: Hữu Tướng's line · slopeW / slopeE: where the riders pour down · rite: the defend point (the candle ring) ·
  // queen / altar: the rite's centre · innerstair: the platform's north steps · barricade · sluice: the bank by the stone
  // sluice · bridge: the deck's middle · door: the stone door's threshold · hall: the violet hall's centre
  anchors: {
    shields: [0, -150], slopeW: [-72, -157], slopeE: [72, -153], rite: [CANDLE_C[0], CANDLE_C[1]], queen: QUEEN, altar: ALTAR,
    innerstair: [0, -89], barricade: [0, LUY_Z], sluice: [SLUICE[0] - 3, SLUICE[1] - RHW - 6], bridge: [0, RIVER_Z], door: [0, DOOR_Z],
    hall: [HALL[0], HALL[1]],
  },
  // story: the south end of the outer ring, the rite's banners and the karsts ahead; free: the outer ring / rite ground
  spawn: { story: { x: 0, z: -186, yaw: 0, tilt: -0.06 }, free: { x: 4, z: -36, yaw: 0 } },
  water: {
    along: 'x', c: riverC, hw: RHW, bed: [1.8, 0.45], fords: [[-5.4, 5.4, -1.2]], y: -0.2, stones: 24,
    tint: { deep: 0x163028, shallow: 0x4e6a56, sun: [1, 0.84, 0.58] },
    // the stone bridge spans real water: the render bed drops under it (the sim keeps the deck walkable)
    bedHeight(x, z, h) {
      const wet = 1 - smooth(RHW - 1, RHW + 3, Math.abs(z - riverC(x)));
      return Math.abs(x) <= 14 && wet > 0 ? Math.min(h, -this.bed[0] * wet) : h;
    },
  },
  // dawn: the sun just up ahead-right (east-north-east), pale gold through the mist; blue-grey haze lying in the valleys
  sky: {
    sunElev: 0.12, sunAz: 0.95, sunCore: [4.4, 3.6, 2.5],
    haze: 0x98a2b2, hazeWarm: 0xe8b886, glow: 0xffd8a4, skyMid: 0xa8b2c6, skyTop: 0x4c6898,
    hznSun: 0xffbe78, hznAway: 0xbcbcc0, cloudRose: 0xe8b498, cloudShade: 0x7c8298, cloudLit: 0xffecc8,
    dust: [9.0, 40.0, 2.8, 0.12], dustLit: 0xe6d0ac, dustShade: 0x8490a6, apCool: 0x8c9ab8,
  },
  fog: [28, 290],
  // key: the altar's candles (not HOME: unused); fill: the violet hall faces the hero against the low sun — eased in there
  light: { hemi: [0xb4c2dc, 0x7a7458, 2.45], sun: [0xffd8a8, 3.7], rim: [0xffc088, 1.35], dir: [0.6, 0.45, 0.66], fire: 0xffa050, key: [0, -100], fill: [70, 100, 1.0] },
  post: { exposure: 1.3, sat: 1.16, rays: 1.1, rayTint: [1.0, 0.82, 0.56], bloom: 0.68, highTint: [1.12, 1.0, 0.82], shadowTint: [0.8, 0.92, 1.22] },
  castle: null,
  terrain: {
    pave: (x, z) => (Math.hypot(x - RITE[0], z - RITE[1]) < PR0 + 1 ? 0.7 : 0)                // the rite's stone floor
      + (z > -24 && z < 4 && Math.abs(x) < 6 ? 0.5 : 0)                                       // the bridge approaches
      + (z > STAIR0 && z < DOOR_Z + 2 && Math.abs(x) < 7 ? 0.65 : 0)                            // the stairs and the landing
      + (Math.hypot(x - HALL[0], z - HALL[1]) < 13 ? 0.45 : 0),                                // the hall's worn centre
    bare: (x, z) => z > STAIR0 || (z > LUY_Z - 6 && z < LUY_Z + 8 && Math.abs(x) < 46),
    rock: (h, x, z) => h - (z > STAIR1 ? TOP_H : z > STAIR0 ? TOP_H * (z - STAIR0) / (STAIR1 - STAIR0) : 0) - 2,
    scorch: { n: 14, area: [-46, -180, 46, -40], spots: [[0, LUY_Z, 0.9], [-6, LUY_Z + 1, 0.7], [7, LUY_Z - 0.5, 0.8], [-30, -160, 0.6], [32, -150, 0.6]] },
    rubble: [-44, -150, 44, 124],
    pines: [400, 500],                                                                           // karst shrubs only
    // pale limestone: grey-white strata, dark rain streaks, green-crowned tops and mossy shelves
    cliff: { rock: 0x8e897e, dark: 0x55524a, top: 0x566838, moss: 0x46602c, grassy: 0x5e7438 },
    mountains: { peakA: 0.0, peak: 18 },
  },
  fires: [[-30, -164, 0.9], [34, -158, 1.0], [-28, LUY_Z + 8, 0.9]],
  // firelight: the altar's candles and incense, the outer ring's braziers, the barricade, the bridge heads, the door's
  // torches (the hall's violet flames are self-lit: no firelight there)
  lightSites: [[0, 2.2, -98, 24, 10], [-7, 2.0, -104, 18, 8], [7, 2.0, -104, 18, 8], [-8, 1.9, -146, 24, 10], [8, 1.9, -146, 24, 10],
    [-30, 2.2, -164, 22, 9], [34, 2.2, -158, 22, 9], [-5, 2.2, LUY_Z - 1, 26, 10], [6, 2.2, LUY_Z, 26, 10], [-28, 2.2, LUY_Z + 8, 20, 9],
    [-6, 2.0, -24, 22, 9], [6, 2.0, 4, 22, 9], [-4, TOP_H + 2.4, DOOR_Z - 2, 26, 10], [4, TOP_H + 2.4, DOOR_Z - 2, 26, 10]],
  hq: [HALL[0], HALL[1]],

  dress(k) {
    const { r, mats, props, shade: sh } = k;
    const blank = k.banner('', { bg: '#e8e0cc', fg: '#000', border: '#b8a888', w: 64, h: 160, tatter: false, seed: 61 });
    const ho = k.banner('護', { bg: '#1c1412', fg: '#e8402e', border: '#a82a1e', w: 128, h: 256, seed: 62 });
    const hoan = k.banner('宦', { bg: '#4a1a5e', fg: '#f0d27a', border: '#2a0c3a', w: 128, h: 256, seed: 63 });

    // ---- karst towers framing every view: a near rank out of the valley walls, a second rank behind, a far ring (the
    // seven beacon peaks: build); karstRange skips any that would touch the walk field
    const halfW = (z) => (z < OUT_Z ? 52 : z < -72 ? 46 : z < 10 ? 52 : z < STAIR1 ? 10 : z < DOOR_Z + 4 ? 12 : 30);
    for (let z = -224; z <= 196; z += r.range(11, 17)) for (const sx of [-1, 1]) {
      const hw = halfW(z), near = r.range(12, 22), rr = r.range(6, 10);
      V.karstRange(k, [[sx * (hw + near + rr), z + r.range(-4, 4), r.range(24, 46), rr, r.range(-0.35, 0.35)]]);
      if (r.chance(0.7)) { const rr2 = r.range(9, 14); V.karstRange(k, [[sx * Math.min(132, hw + near + rr + r.range(22, 44)), z + r.range(-6, 6), r.range(38, 64), rr2, r.range(-0.3, 0.3)]]); }
    }
    for (let i = 0; i < 9; i++) V.karstRange(k, [[r.range(-100, 100), r.range(178, 204), r.range(40, 70), r.range(10, 16)]]);   // beyond the hall
    for (let i = 0; i < 7; i++) V.karstRange(k, [[r.range(-90, 90), r.range(-226, -212), r.range(34, 56), r.range(9, 14)]]);  // behind the start

    // ---- Vòng ngoài: Hữu Tướng's shield arc, braziers, the escort's reserves on the karst shoulders; the riders' slopes
    for (let i = -6; i <= 6; i++) {                                                               // the arc of pavises
      if (Math.abs(i) < 1) continue;                                                              // the road stays open
      const a = i * 0.13, x = Math.sin(a) * 34, z = -150 - Math.cos(a) * 34 + 34;
      V.mantlet(k, x, z, -a, 0.85);                                                             // facing out (south)
    }
    for (const [x, z] of [[-8, -146], [8, -146]]) k.lamp(x, z, 0.7);
    for (const [x, z, yaw] of [[-36, -146, Math.PI / 2], [36, -148, -Math.PI / 2], [-22, -186, 0.2]]) k.shieldRack(x, z, yaw);
    for (const [x, z, yaw] of [[-40, -176, Math.PI / 2], [40, -184, -Math.PI / 2]]) k.supplies(x, z, yaw, r.int(4, 6));
    for (const [x, z] of [[-42, -190], [42, -192], [-26, -144], [26, -144]]) k.standard(x, z, 1.1, ho, 9, [0, -150]);
    for (const [x, z] of [[-60, -160], [-80, -152], [62, -156], [82, -148]]) k.standard(x, z, 1.05, r.chance(0.3) ? hoan : mats.foe, 8.5, [0, -150]);
    for (const [x, z] of [[-36, -196], [36, -194], [-46, -150], [46, -142]]) V.reedPlumes(k, x, z, { n: 26, r: 2.6 });
    for (const [x, z] of [[-44, -184], [44, -178]]) V.bamboo(k, x, z, { n: 10, h: 10 });
    V.banyan(k, -40, -200, 1.2);
    V.stakeRow(k, [[-34, -142], [-14, -141]]); V.stakeRow(k, [[14, -141], [34, -142]]);

    // ---- Sân tế: the stone floor in three steps round the mound, the altar, the ring of 49 candles (build: the 49th
    // flame), the blank banners, incense smoke, Thầy Mo's bell post, a mat for the Queen, arrows in the turf
    { const [cx, cz] = RITE, gy = k.ground(cx, cz);
      for (let i = 0; i < 40; i++) {                                                              // the curb round the flat top
        const a = (i + 0.5) / 40 * Math.PI * 2, x = cx + Math.sin(a) * (PR0 + 0.3), z = cz + Math.cos(a) * (PR0 + 0.3);
        if (Math.abs(x - cx) < 4.2) continue;                                                     // the north and south steps
        props.push({ s: [PR0 * Math.PI * 2 / 40 + 0.1, 0.5, 0.7], p: [x, k.ground(x, z) + 0.05, z], r: [0, a + Math.PI / 2, 0], c: sh(0x6a665e, r.range(0.85, 1.05)) });
      }
      // the inner ring: wooden steps down the north face (Nữ Cận Vệ's post) and the south face (the hero's way in)
      for (const [dz, yaw] of [[PR0 + 0.6, 0], [-PR0 - 0.6, Math.PI]]) for (let s = 0; s < 4; s++) {
        const z = cz + dz + Math.sign(dz) * s * 1.2, y = k.ground(cx, z);
        props.push({ s: [7.5, 0.18, 1.1], p: [cx, y + 0.06, z], r: [0, yaw, 0], c: sh(0x5a4028, 0.9 + s * 0.04) });
      } }
    V.altar(k, ALTAR[0], ALTAR[1], 0, 1.1);
    { const gy = k.ground(...QUEEN);                                                             // the kneeling mat: red lacquer
      props.push({ s: [2.2, 0.06, 1.6], p: [QUEEN[0], gy + 0.03, QUEEN[1]], c: 0x8a2018 }, { s: [2.4, 0.04, 1.8], p: [QUEEN[0], gy + 0.01, QUEEN[1]], c: 0xc89a48 }); }
    V.bellPost(k, 7, -97.5, -0.3, 1);
    for (const [x, z] of [[-3.2, -96.2], [3.2, -96.2], [-6, -103], [6, -103]]) {                // incense urns: a thread of smoke
      const gy = k.ground(x, z);
      props.push({ s: [0.5, 0.5, 0.5], p: [x, gy + 0.25, z], c: 0x7a5a2a }, { s: [0.62, 0.08, 0.62], p: [x, gy + 0.52, z], c: 0x9a7a3a });
      k.fire(x, gy + 0.6, z, 0.18, true);
    }
    for (let i = 0; i < 10; i++) {                                                                // blank white banners round the floor
      const a = (i + 0.5) / 10 * Math.PI * 2, x = RITE[0] + Math.sin(a) * (PR0 - 0.8), z = RITE[1] + Math.cos(a) * (PR0 - 0.8);
      if (Math.abs(x) < 6) continue;                                                              // the north and south steps stay open
      k.standard(x, z, 1.15, blank, 8.5, [RITE[0], RITE[1]]);
    }
    for (const [x, z] of [[-8.5, -95], [8.5, -95]]) k.lamp(x, z, 0.65);
    k.arrows([-30, -128, 30, -84], 26);
    for (const [x, z] of [[-40, -132], [40, -128], [-40, -88], [40, -84], [-30, -76], [30, -78]]) V.reedPlumes(k, x, z, { n: 22, r: 2.2 });
    for (const [x, z] of [[-42, -110], [42, -104]]) V.areca(k, x, z, r.range(8, 10));
    for (const [x, z] of [[-34, -122], [34, -96]]) V.shrine(k, x, z, x < 0 ? Math.PI / 2 : -Math.PI / 2, 0.9);

    // ---- the traitor's palisade across the north edge: stakes, its barricade (gate 'raoban'), violet standards
    V.stakeRow(k, [[-58, LUY_Z - 3], [-14, LUY_Z - 3]]); V.stakeRow(k, [[14, LUY_Z - 3], [58, LUY_Z - 3]]);
    k.palisade([[-60, LUY_Z], [-12.5, LUY_Z]]); k.palisade([[12.5, LUY_Z], [60, LUY_Z]]);
    k.tower(-15.5, LUY_Z + 3.7, 6.5, 1.3); k.tower(15.5, LUY_Z + 3.7, 6.5, 1.3);
    k.barricade('raoban');
    k.burn(-5, LUY_Z - 1, 1.0, 'raoban'); k.burn(6, LUY_Z, 1.1, 'raoban');
    for (const [x, z] of [[-5, LUY_Z + 5], [6, LUY_Z + 5], [-30, LUY_Z + 6], [32, LUY_Z + 6]]) k.standard(x, z, 1.1, hoan, 9, [0, -100]);

    // ---- Bến sông: reeds and plumes, the escort's sampans, the fishermen's boats by the sluice, storks in the shallows
    k.reeds();
    for (const x of [-44, -36, -24, -14, 14, 22, 40, 46]) for (const sd of [-1, 1]) {
      const z = riverC(x) + sd * (RHW + r.range(2.5, 5));
      if (k.inAt(x, z) > 0.5 && Math.abs(x) > 8) V.reedPlumes(k, x, z, { n: 16, r: 1.8 });
    }
    for (const x of [-40, -20, 18]) V.lotus(k, x, -0.2, riverC(x) + r.range(-1.5, 1.5), 2.4);
    for (const [x, yaw] of [[-32, Math.PI / 2 + 0.1], [-46, -Math.PI / 2]]) V.boat(k, x, -0.25, riverC(x) + r.range(-1, 1), yaw, { len: 8 });
    V.jetty(k, 20, riverC(20) - RHW - 2.6, 0, 4.5, { w: 2.2 });
    for (const [x, z, yaw] of [[-24, -14, 0.6], [-30, 0, 2.4], [26, -16, -0.4], [-6, -16, 0.2], [-36, -26, 1.0]]) V.stork(k, x, k.ground(x, z), z, yaw);
    for (const [x, z] of [[-6, -26], [6, -26], [-6, 6], [6, 6]]) k.lamp(x, z, 0.55);
    for (const [x, z, yaw] of [[-34, -50, 0.4], [34, -40, -0.6], [-38, -36, 2.6]]) k.cart(x, z, yaw, r.chance(0.5));
    for (const [x, z] of [[-44, -60], [44, -58], [-30, -34], [30, 4]]) k.standard(x, z, 1.05, mats.foe, 8.5, [0, -30]);
    for (const [x, z] of [[-42, 4], [40, -30]]) k.standard(x, z, 1.05, ho, 8.5, [0, -10]);
    V.banyan(k, -44, -44, 1.15);
    for (const [x, z] of [[46, -48], [-46, -64], [38, 6]]) V.bamboo(k, x, z, { n: 9, h: 10 });
    V.threadLine(k, [[-12, 6], [-8, 9], [-4, 8]]);                                                // the last cinnabar thread

    // ---- Bậc đá ướt → Cửa đá: steps (build), seeps down the cleft walls, ferns; torches at the door
    for (let z = STAIR0 + 2; z < STAIR1; z += r.range(5, 8)) for (const sx of [-1, 1]) {
      const x = sx * r.range(6.5, 8), gy = k.topAt(x, z);
      props.push({ s: [0.25, r.range(4, 9), 0.6], p: [x, gy - 2, z], c: sh(0x4a5a58, r.range(0.8, 1.1)) });      // a dark wet streak
      if (r.chance(0.6)) props.push({ s: [1.2, 0.8, 1.2], p: [sx * 6.2, k.ground(sx * 6, z) + 0.4, z + 1], r: [0, r.range(0, 3), 0], c: sh(0x3e5a2a, r.range(0.8, 1.1)) });
    }
    for (const sx of [-1, 1]) k.lamp(sx * 4.4, DOOR_Z - 2.6, 0.7);

    // ---- Điện tím: the clearing's floor scraps (torn map pieces), a low table, standing stones along the false corridors
    { const [hx, hz] = HALL, gy = k.ground(hx, hz);
      props.push({ s: [3.2, 0.7, 1.6], p: [hx - 4, gy + 0.35, hz + 6], c: 0x2a1e16 }, { s: [3.4, 0.08, 1.8], p: [hx - 4, gy + 0.72, hz + 6], c: 0x3a2a1e });
      for (let i = 0; i < 24; i++) {
        const a = r.range(0, 6.28), d = r.range(1, 14), x = hx + Math.sin(a) * d, z = hz + Math.cos(a) * d;
        props.push({ s: [r.range(0.3, 0.6), 0.02, r.range(0.3, 0.5)], p: [x, k.ground(x, z) + 0.02, z], r: [0, r.range(0, 3), 0], c: sh(0xd8c8a0, r.range(0.85, 1.05)) });
      }
      for (let i = 0; i < 4; i++) props.push({ s: [0.5, 0.02, 0.4], p: [hx - 5 + i * 0.7, gy + 0.77, hz + 6 + (i % 2) * 0.3], r: [0, i * 0.4, 0], c: 0xe0d0a8 });
      V.threadLine(k, [[hx - 10, hz - 8], [hx - 6, hz - 12], [hx - 1, hz - 13]], { col: 0x6a2a90 });   // the purple-ink thread
      for (const [x, z] of [[hx + 16, hz - 10], [hx - 16, hz - 10], [hx + 6, hz + 18], [hx - 18, hz + 8]]) k.standard(x, z, 1.15, hoan, 9.5, [hx, hz]); }
    for (const pts of CORRIDORS) for (let i = 0; i < pts.length - 1; i++) {                     // standing stones lining each false way
      const [ax, az, aw] = pts[i], [bx, bz] = pts[i + 1], Lg = Math.hypot(bx - ax, bz - az), nx = (bz - az) / Lg, nz = -(bx - ax) / Lg;
      for (let d = 1; d < Lg; d += r.range(2.4, 3.4)) for (const sd of [-1, 1]) {
        const x = ax + (bx - ax) * d / Lg + nx * sd * (aw + 0.6), z = az + (bz - az) * d / Lg + nz * sd * (aw + 0.6), h = r.range(2.6, 4.2);
        props.push({ s: [0.9, h, 0.7], p: [x, k.topAt(x, z) + h / 2 - 0.3, z], r: [0, Math.atan2(nx, nz), r.range(-0.05, 0.05)], c: sh(0x6e6a64, r.range(0.75, 1.0)) });
      }
    }

    // ---- reserves off the walk field: the escort on the karst shoulders round the outer ring and the rite, the traitor's
    // host behind its palisade and up the flank slopes; the aftermath
    for (const [x, z, f] of [[-58, -186, 1.3], [58, -180, -1.3], [-56, -118, 1.4], [56, -110, -1.4]]) k.formation('ally', x, z, f, r.int(8, 11), r.int(4, 5));
    for (const [x, z, f] of [[-100, -140, Math.PI / 2 + 0.3], [100, -136, -Math.PI / 2 - 0.3], [-66, -56, Math.PI / 2], [66, -48, -Math.PI / 2],
      [-64, -24, Math.PI / 2 - 0.3], [-30, 30, Math.PI]]) k.formation('foe', x, z, f, r.int(8, 12), r.int(4, 6));
    k.wrecks();
    k.debris([-44, -196, 44, 6], 90);
    k.aftermath({ fallen: [[-40, 40, -184, -142, 14], [-38, 38, -134, -76, 12], [-40, 40, -60, -24, 8]],
      standards: [6, -44, -180, 44, -30], dust: { n: 30, area: [-46, -196, 46, 4], wall: [6, -40, 40, LUY_Z + 10] } });
    k.farFires([[-96, -40], [104, -20], [-90, 60], [92, 110]], 2.6);
  },

  build(root, k) { return buildSet(root, k, this); },
};
