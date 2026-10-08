// Màn V «Đèo Lửa · Hang Tối» (979, dusk → moonlit night) laid out along +Z, ≈ 420 m from the foot of the pass to the
// interrogation chamber at the back of the cave — comic ch. 13 «Món nợ của Hàng Tướng» and ch. 14 «Người cha trong hang
// tối» (holinh/DESIGN.md §6-7). Format: src/world/maps/index.js header; dressing helpers: ../viet.js. Two halves, two
// palettes: the pass in red dusk fire ([LAM]: the sun going down straight ahead behind the crest, mist in the reed valley
// at the foot), then over the crest and down by moonlight into a karst basin, its lake and the cave ([NƯỚC]: cold blue).
//   Chân đèo        the foot of the pass  z -214 … -158  h 0     mist; the coffin column halted on the road, the reed
//                                                                valley to the west where the true column slips away
//                                                                (set 'swap'); story start / free arena
//   Dốc lau trắng   the switchbacks       z -160 …  -86  h 0→14  four legs through white reed plumes, low rock ribs
//                                                                between them; the stake barricade 'coc' (z -92) at the top
//   Lưng đèo        the shoulder          z  -87 …  -61  h 14    a small shelf before the one-horse path (hunters' post)
//   Đường một ngựa  the one-horse path    z  -64 …   12  h 14→20 76 m of ledge 6-7.6 m wide: the drop on the west (a
//                                                                fall into the karst valley below), a rock wall on the
//                                                                east with stakes holding back boulders (set 'rockfall')
//   Đỉnh đèo        the crest             z   11 …   37  h 20    the beacon tower (set 'beacon': the last column of fire),
//                                                                the empty coffin set down at the path's mouth (set 'turn')
//   Dốc trăng       the moonlit descent   z   34 …   88  h 20→2  two long ramps down the far side
//   Thung hồ        the lake basin        z   86 …  126  h 2     karst towers round a still lake (west); the main cave
//                                                                mouth (NE) behind the barricade 'cuahang' that never
//                                                                opens; the moonbeam through the token (set 'sight')
//   Khe nước thở    the breathing gap     z  122 …  166  h 2→1   a narrow wet slot under overhanging rock: the water in
//                                                                it rises and falls with the wind
//   Hang tối        the cavern hall       z  162 …  194  h 1     under a rock roof, torches; the cell (gate 'cell', east
//                                                                alcove) where the Left General is chained to a pillar
//   Phòng tra hỏi   interrogation chamber z  195 …  220  h 1.4   behind the door 'tra'; its back wall opens on the moonlit
//                                                                lake (the water band at the north edge of the field)
// One walkable union along +Z. The cave is a deep gorge (rise 24-30) roofed in build() by slabs that cast the moon's
// shadow on its floor; the darkness and the dusk → night turn are render-side, eased on the hero's z (update below):
// fog, sky, hemisphere and key light lerp to moonlight from the crest down to the basin, then dim again under the roof.
// build() also owns the story's set pieces (story:set): 'swap' (the column's carts slide off into the reed valley, the
// decoy — an empty coffin on a cart under the yellow banner — appears at the foot of the climb), 'rockfall' (the stakes
// snap, the boulders roll across the ledge behind the hero and over the drop), 'turn' (the decoy cart stands at the
// path's mouth: the coffin he sets behind him), 'beacon', 'sight'. Gates 'cell' and 'tra' are wooden doors drawn here
// (kind 'doors' with no castle: the world leaves them to us); 'coc' and 'cuahang' are kit barricades. A new battle
// (frame back to 0) resets the set; free mode and the trial stand on the burning pass (decoy at the mouth, beacon lit).
import * as THREE from 'three';
import { WIND } from '../../../../src/world/dressing.js';
import { boxesGeometry, shade } from '../../../../src/core/voxel.js';
import { GATES, ground } from '../../../../src/world/map.js';
import { lit } from '../../../../src/world/castle.js';
import * as V from '../viet.js';

const sm = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
const H_SH = 14, H_CR = 20, H_BA = 2, H_CV = 1;                                    // shoulder · crest · basin · cave floor
// the one-horse path [x, z, half width, h] and the rock wall that walls its east side (a carved piece: it owns those
// cells, so they rise as rock; the west side belongs to the path, whose `drop` lets it fall away into the valley)
const PATH = [[0, -64, 3.8, H_SH], [3, -44, 3.2, 15.6], [-2, -24, 3.0, 17.2], [2, -4, 3.2, 18.8], [0, 12, 3.8, H_CR]];
const pathAt = (z) => {                                                            // [cx, hw, h] at z (clamped)
  let i = 0;
  while (i < PATH.length - 2 && PATH[i + 1][1] < z) i++;
  const a = PATH[i], b = PATH[i + 1], t = Math.min(1, Math.max(0, (z - a[1]) / (b[1] - a[1])));
  return [a[0] + (b[0] - a[0]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t];
};
const WALL_Z0 = -58, WALL_Z1 = 9;
const WALL = [WALL_Z0, -44, -24, -4, WALL_Z1].map((z) => { const [cx, hw, h] = pathAt(z); return [cx + hw + 5.2, z, 5.2, h]; });
const WALL_CARVE = [];
for (let z = WALL_Z0; z < WALL_Z1; z += 3) { const [cx, hw] = pathAt(z + 1.5); WALL_CARVE.push([cx + hw, z, cx + hw + 10.6, z + 3]); }
// the lake bowl in the basin: walkable rim, a bed dipping under the water plane (WATER_Y) inside the props rect
const LAKE = [-50, 112], LAKE_R = [15, 17], WATER_Y = H_BA - 0.45;
const lakeH = (x, z) => {
  const d = Math.hypot((x - LAKE[0]) / LAKE_R[0], (z - LAKE[1]) / LAKE_R[1]);
  return H_BA - 2.6 * Math.max(0, 1 - d) ** 0.6;
};
const BEACON = [9, 30], QUAN = [0, 17], SIGHT = [-12, 100], MOUTH = [22, 134], CELL = [31, 175], TRA = [2, 210];
const MOUTH_Z = 130, CELL_X = 24, TRA_Z = 196.5;
const FOOT_COL = [[-26, -196, 0.15], [-23, -186, 0.1], [-20, -176, 0.05]];        // the coffin column halted at the foot
const DECOY0 = [10, -160, 0.2];                                                    // the decoy cart: at the foot of the climb …
const DECOY1 = [QUAN[0], QUAN[1] + 1.5, 0.2];                                      // … and set down at the path's mouth

export default {
  id: 'deolua',
  name: { zh: 'Đèo Lửa', en: 'The Burning Pass' },
  grid: [-150, -240, 150, 244],
  pieces: [
    { id: 'chan', rect: [-48, -214, 48, -158], h: 0, edge: 3, rise: 10 },
    { id: 'lau', ell: [-56, -178, 16, 14], h: 0, edge: 2.5, rise: 7 },               // the reed valley's mouth (west)
    { id: 'doc', path: [[0, -160, 11, 0], [24, -146, 6.5, 3.5], [-24, -128, 6.5, 7.5], [22, -110, 6.5, 11], [-2, -100, 7, 12.5], [-2, -84, 8, H_SH]], edge: 1.2, rise: 7 },
    { id: 'vai', ell: [0, -74, 20, 13], h: H_SH, edge: 1.5, rise: 12 },
    { id: 'mot', path: PATH, edge: 0.6, rise: 10, drop: 14 },
    { id: 'vach', path: WALL, rise: 26 },                                            // carved whole: the east rock wall
    { id: 'dinh', ell: [0, 24, 17, 13], h: H_CR, edge: 1.2, rise: 9 },
    { id: 'xuong', path: [[2, 34, 6, H_CR], [-20, 56, 5.5, 12], [-6, 80, 6.5, 3], [0, 88, 8, H_BA]], edge: 1, rise: 12 },
    { id: 'thung', ell: [0, 106, 34, 20], h: H_BA, edge: 2.5, rise: 16 },
    { id: 'ho', ell: [-50, 112, 20, 22], h: lakeH, edge: 1.5, rise: 20 },
    { id: 'cua', path: [[14, 118, 6, H_BA], [22, 134, 5, H_BA]], edge: 0.8, rise: 22 },
    { id: 'khe', path: [[-14, 122, 3.4, 1.9], [-22, 136, 2.6, 1.6], [-20, 150, 2.3, 1.3], [-10, 160, 3, 1.1], [-4, 166, 4, H_CV]], edge: 0.5, rise: 26 },
    { id: 'hang', ell: [0, 178, 26, 16], h: H_CV, edge: 1.5, rise: 28 },
    { id: 'nguc', rect: [24, 170, 36, 180], h: H_CV, edge: 0.4, rise: 26 },
    { id: 'hau', path: [[0, 190, 5, H_CV], [2, 200, 4.2, 1.3]], edge: 0.4, rise: 28 },
    { id: 'tra', ell: [2, 210, 15, 10], h: 1.4, edge: 1, rise: 28 },
  ],
  // the east rock wall of the one-horse path (its piece is carved whole)
  carve: WALL_CARVE,
  // solid set pieces: the beacon tower; the lake bowl (no rock grows in the water); the cell's pillar; the chamber's table
  props: [[BEACON[0] - 2.6, BEACON[1] - 2.6, BEACON[0] + 2.6, BEACON[1] + 2.6], [-66, 94, -35.5, 130],
    [CELL[0] + 1.2, CELL[1] - 1, CELL[0] + 3.2, CELL[1] + 1], [TRA[0] + 4, TRA[1] + 2, TRA[0] + 8, TRA[1] + 4.4]],
  zones: [
    { id: 'chan', name: { zh: 'Chân đèo', en: 'Foot of the Pass' }, x: 0, z: -186, w: 96, d: 56 },
    { id: 'doc', name: { zh: 'Dốc lau trắng', en: 'White Reed Climb' }, x: 0, z: -123, w: 60, d: 70 },
    { id: 'vai', name: { zh: 'Lưng đèo', en: 'The Shoulder' }, x: 0, z: -74, w: 40, d: 26 },
    { id: 'mot', name: { zh: 'Đường một ngựa', en: 'One-Horse Path' }, x: 0, z: -26, w: 14, d: 76 },
    { id: 'dinh', name: { zh: 'Đỉnh đèo', en: 'Crest of the Pass' }, x: 0, z: 24, w: 34, d: 26 },
    { id: 'xuong', name: { zh: 'Dốc trăng', en: 'Moonlit Descent' }, x: -8, z: 60, w: 40, d: 50 },
    { id: 'thung', name: { zh: 'Thung hồ', en: 'Lake Basin' }, x: -8, z: 106, w: 80, d: 40 },
    { id: 'khe', name: { zh: 'Khe nước thở', en: 'Breathing Gap' }, x: -16, z: 144, w: 22, d: 40 },
    { id: 'hang', name: { zh: 'Hang tối', en: 'The Dark Cave' }, x: 4, z: 178, w: 64, d: 32 },
    { id: 'tra', name: { zh: 'Phòng tra hỏi', en: 'Interrogation Chamber' }, x: 2, z: 208, w: 30, d: 24 },
  ],
  route: [[0, -202], [0, -176], [0, -160], [24, -146], [-24, -128], [22, -110], [-2, -100], [-2, -86], [0, -74], [0, -64],
    [3, -44], [-2, -24], [2, -4], [0, 12], [0, 24], [2, 34], [-20, 56], [-6, 80], [0, 88], [-6, 104], [-14, 122], [-22, 136],
    [-20, 150], [-10, 160], [-4, 166], [4, 178], [0, 190], [2, 200], [2, 212]],
  gates: {
    coc: { rect: [-12, -93.5, 8, -90.5], name: { zh: 'Rào cọc lưng đèo', en: 'Stake Barricade' }, kind: 'barricade', at: [-2, -92, 0, 8] },
    cuahang: { rect: [14, MOUTH_Z - 1.5, 30, MOUTH_Z + 1.5], name: { zh: 'Cửa hang chính', en: 'Main Cave Mouth' }, kind: 'barricade', at: [21, MOUTH_Z, 0, 5.5] },
    cell: { rect: [CELL_X - 2, 169, CELL_X + 2, 181], name: { zh: 'Cửa ngục', en: 'Cell Door' }, kind: 'doors' },
    tra: { rect: [-6, TRA_Z - 1.5, 9, TRA_Z + 1.5], name: { zh: 'Cửa phòng tra', en: 'Chamber Door' }, kind: 'doors' },
  },
  // story positions (holinh/src/story/deolua.js: [anchor, dx, dz] metres)
  anchors: { start: [0, -202], column: [-14, -186], reeds: [-44, -180], foot: [0, -170], t1: [24, -146], t2: [-24, -128], t3: [22, -110],
    coc: [-2, -92], vai: [0, -74], mot0: [0, -60], motMid: [0, -26], rockfall: [-2, -18], motEnd: [0, 8], quan: QUAN, beacon: BEACON,
    crest: [0, 26], descent: [-20, 56], basin: [0, 104], sight: SIGHT, shore: [-26, 108], mouth: [20, 122], gap: [-15, 124], gapMid: [-21, 144],
    hall: [2, 178], cellDoor: [CELL_X - 4, CELL[1]], cell: CELL, door: [2, TRA_Z - 4], tra: TRA, opening: [2, 217] },
  // story: on the road at the foot, the column halted beside it, looking up at the climb and the dusk; free: the foot
  spawn: { story: { x: 0, z: -202, yaw: 0, tilt: -0.05 }, free: { x: 0, z: -184, yaw: 0 } },
  // the moonlit lake behind the cave: a band across the north edge (the chamber's back wall opens on it)
  water: { along: 'x', c: () => 233, dc: () => 0, hw: 9, bed: [2.2, 0.5], stones: 0, y: -0.2, tint: { deep: 0x041018, shallow: 0x0c2a30, sun: [0.32, 0.4, 0.6] } },
  // dusk ([LAM]): the sun 2° up straight ahead behind the crest, red through the haze; violet overhead; the reed mist
  // lies in the valley at the foot (dust: a pale layer hugging the plain)
  sky: {
    sunElev: 0.035, sunAz: -0.22, sunCore: [5.0, 2.6, 1.3],
    haze: 0x584656, hazeWarm: 0xd0603a, glow: 0xffa060, skyMid: 0x6e5a74, skyTop: 0x1e2848,
    hznSun: 0xff6a28, hznAway: 0xa05a58, cloudRose: 0xd06a4a, cloudShade: 0x3a3048, cloudLit: 0xffb070,
    dust: [8, 46, 2.4, 0.11], dustLit: 0xe0a48a, dustShade: 0x5c5a7a, apCool: 0x6a6a9a,
  },
  fog: [30, 250],
  light: { hemi: [0x9a7e98, 0x3a2a26, 1.7], sun: [0xffa070, 3.0], rim: [0xff8a50, 1.5], dir: [-0.3, 0.5, 0.81], fire: 0xff7a34 },
  post: { exposure: 1.2, sat: 1.08, rays: 0.32, bloom: 0.75 },
  castle: null,
  terrain: {
    pave: () => -3,                                                                // a dirt track all the way: no paving
    bare: (x, z) => z > 124 || (z > -66 && z < 14),                                // the ledge and the cave: bare rock and dust
    rock: (h, x, z) => (z > 124 ? 9 : h - 8),
    pines: [-140, 100],
    mountains: { peakA: -0.2, peak: 62 },                                          // the dark ridge the sun sets behind
    cliff: { rock: 0x8c8478, dark: 0x4a4640, top: 0x5a6838, moss: 0x3c5a2c, grassy: 0x62703a },   // Ninh Bình limestone
  },
  fires: [],
  // firelight: the column's braziers at the foot, torches up the climb and on the shoulder, the cave mouth, the gap,
  // the hall, the cell, the chamber (the beacon's site: build, parked until lit)
  lightSites: [[-12, 1.6, -194, 26, 11], [-18, 1.8, -178, 24, 10], [10, 1.8, -166, 22, 10], [-14, 2, -124, 20, 9], [10, 2, -104, 20, 9],
    [-10, 2, -78, 26, 10], [10, 2, -70, 24, 10], [16, 2.4, 126, 30, 11], [27, 2.4, 127, 30, 11], [-16, 2, 132, 18, 8], [-18, 2, 154, 20, 9],
    [-14, 2.2, 172, 34, 12], [12, 2.2, 168, 32, 12], [-8, 2.2, 188, 30, 11], [16, 2.2, 188, 30, 11], [30, 2, 178, 22, 9],
    [-6, 2.2, 206, 30, 11], [9, 2.2, 214, 26, 10]],
  hq: TRA,

  dress(k) {
    const { r, mats, props, poles } = k;
    WIND.set(0.85, 0, 0.5).normalize();                                            // the dusk wind off the valley: flags stream east
    const off = (x, z, m = 2) => k.inAt(x, z) < -m;
    const truy = k.banner('追', { bg: '#2e1a42', fg: '#d8c8a0', border: '#7a40b0', w: 128, h: 256, seed: 52 });

    // ---- Chân đèo: the column's braziers and the escort's standards by the road, the reed valley to the west, mist,
    // karst towers round the valley, storks lifting off over the reeds (the carts themselves: build — they leave)
    for (const [x, z] of [[-12, -194], [-18, -178]]) k.lamp(x, z, 0.7);
    for (const [x, z] of [[-30, -202], [-30, -172], [-8, -206]]) k.standard(x, z, 1.05, mats.ally, 7.6, [0, -186]);
    for (const [x, z] of [[10, -166], [16, -200], [30, -190]]) V.bambooTorch(k, x, z, { h: r.range(2.8, 3.4) });
    k.supplies(-34, -190, 0.4, 5); k.supplies(30, -206, -0.2, 4);
    for (let i = 0; i < 26; i++) {                                                 // the reed valley: white plumes to the horizon
      const x = r.range(-110, -40), z = r.range(-214, -150);
      if (k.inAt(x, z) > -0.5) { if (r.chance(0.5) && x < -46) V.reedPlumes(k, x, z, { n: r.int(10, 16), r: 2.2 }); continue; }
      V.reedPlumes(k, x, z, { n: r.int(18, 30), r: r.range(2.5, 4) });
    }
    for (let i = 0; i < 18; i++) {                                                 // plumes on the foot's margins
      const x = (i % 2 ? 1 : -1) * r.range(36, 52), z = r.range(-212, -158);
      if (k.inAt(x, z) > 1.5) continue;
      V.reedPlumes(k, x, z, { n: r.int(8, 14), r: 1.8 });
    }
    V.storkFlock(k, -70, 22, -170, 7, { spread: 7, yaw: -0.4, s: 1.3 });
    for (const [x, z] of [[-62, -190], [-58, -184], [-66, -176]]) V.stork(k, x, k.ground(x, z), z, r.range(0, 6));
    V.karstRange(k, [[-96, -214, 44, 11], [-120, -168, 52, 13], [-84, -128, 38, 10], [74, -214, 40, 10], [92, -176, 48, 12], [66, -140, 34, 9],
      [-130, -100, 58, 14], [118, -110, 50, 13], [-40, -236, 30, 9], [40, -238, 34, 9]]);
    for (let i = 0; i < 70; i++) {
      const x = r.range(-140, 140), z = r.range(-236, -150);
      if (!off(x, z, 3) || (x < -40 && z > -200)) continue;
      const q = r.next();
      if (q < 0.3) V.bamboo(k, x, z, { n: r.int(6, 10), h: r.range(7, 10) }); else if (q < 0.7) V.broadleaf(k, x, z, r.range(0.9, 1.3));
    }

    // ---- Dốc lau trắng: dense white plumes on every margin of the climb, torches at the bends, the hunters' purple
    // standards on the upper legs; the stake barricade at the top with rocks heaped either side of it
    for (let i = 0; i < 130; i++) {
      const x = r.range(-34, 34), z = r.range(-158, -88), f = k.inAt(x, z);
      if (f > -0.6 || f < -9) continue;
      V.reedPlumes(k, x, z, { n: r.int(6, 12), r: r.range(1.2, 2.2) });
    }
    for (const [x, z] of [[30, -146], [-30, -128], [28, -110], [-14, -124], [10, -104]]) V.bambooTorch(k, x, z, { h: 3 });
    for (const [x, z] of [[-30, -122], [26, -116], [-12, -98], [12, -96]]) k.standard(x, z, 1.0, truy, 7.4, [0, -110]);
    k.barricade('coc');
    rocks(k, [[-13, -93, 1.6], [-15, -90, 1.2], [9.5, -93, 1.5], [11, -90.5, 1.1], [-11, -96, 0.9]]);
    V.stakeRow(k, [[-16, -89], [-30, -84]]); V.stakeRow(k, [[12, -89], [26, -84]]);

    // ---- Lưng đèo: the hunters' post — purple standards, a lookout tower, gear; torches
    for (const [x, z] of [[-16, -80], [15, -78], [-12, -64], [13, -66]]) k.standard(x, z, 1.05, r.chance(0.3) ? mats.pennant : truy, 8, [0, -74]);
    k.tower(-17, -70, 6, 1.2, mats.foe);
    k.supplies(16, -72, -1.3, 5); k.shieldRack(-17, -77, 1.2);
    for (const [x, z] of [[-10, -78], [10, -70]]) k.lamp(x, z, 0.6);
    for (let i = 0; i < 40; i++) {
      const x = r.range(-34, 34), z = r.range(-90, -56), f = k.inAt(x, z);
      if (f > -0.8 || f < -7) continue;
      V.reedPlumes(k, x, z, { n: r.int(6, 10), r: 1.6 });
    }

    // ---- Đường một ngựa: the drop's lip (a few plumes and stones on the rim), stakes and heaped boulders against the
    // east wall (the ones that fall are build()'s), karst towers rising out of the valley below the ledge
    for (let z = -60; z < 10; z += r.range(3, 6)) {
      const [cx, hw] = pathAt(z), x = cx - hw - r.range(0.6, 1.6);
      if (r.chance(0.5)) V.reedPlumes(k, x, z, { n: r.int(3, 6), r: 0.8 });
      else rocks(k, [[x, z, r.range(0.5, 0.9)]]);
    }
    for (let z = -56; z < 8; z += r.range(5, 9)) {
      if (z > -36 && z < -12) continue;                                            // (the rockfall stretch: build)
      const [cx, hw] = pathAt(z);
      rocks(k, [[cx + hw + r.range(0.8, 1.6), z, r.range(0.7, 1.2)]]);
    }
    V.karstRange(k, [[-40, -50, 36, 8], [-62, -20, 44, 10], [-38, 6, 30, 7], [-80, -66, 40, 10], [-96, 10, 56, 12], [-64, 30, 34, 8],
      [-120, -40, 60, 14], [-56, -96, 26, 8]]);
    for (let i = 0; i < 90; i++) {                                                 // the valley floor under the drop: dark woods
      const x = r.range(-140, -14), z = r.range(-80, 30);
      if (!off(x, z, 5) || k.topAt(x, z) > 6) continue;
      V.broadleaf(k, x, z, r.range(1.0, 1.5));
    }

    // ---- Đỉnh đèo: the beacon tower (its fire: build), the hunters' standards on the shoulders beyond, plumes in the wind
    k.beaconTower(BEACON[0], BEACON[1]);
    for (const [x, z] of [[-14, 30], [14, 18], [-10, 36]]) k.standard(x, z, 1.05, truy, 8, [0, 24]);
    { const x = -6, z = 34, gy = k.ground(x, z), P = 9;                            // a hunter's lance-flag left on the crest
      poles.push({ s: [0.2, P, 0.2], p: [x, gy + P / 2, z], c: 0x2a1e18 }); k.cloth(mats.foe, 1.6, 2.4, 'flag', x, gy + P - 1.2, z, Math.atan2(-WIND.z, WIND.x)); }
    for (let i = 0; i < 30; i++) {
      const a = r.range(0, 6.28), x = Math.sin(a) * r.range(15, 22), z = 24 + Math.cos(a) * r.range(11, 17);
      if (k.inAt(x, z) > -0.5 || k.inAt(x, z) < -6) continue;
      V.reedPlumes(k, x, z, { n: r.int(5, 10), r: 1.4 });
    }

    // ---- Dốc trăng: pines and broadleaf on the far slopes, torches at the turn
    for (let i = 0; i < 70; i++) {
      const x = r.range(-60, 50), z = r.range(30, 92);
      if (!off(x, z, 3)) continue;
      if (r.chance(0.6)) V.broadleaf(k, x, z, r.range(0.9, 1.3)); else V.bamboo(k, x, z, { n: r.int(5, 8), h: r.range(6, 9) });
    }
    V.bambooTorch(k, -26, 56, { h: 3 }); V.bambooTorch(k, -12, 78, { h: 2.8 });

    // ---- Thung hồ: karst towers round the basin, reeds and standing storks on the lake shore, the main cave mouth (a
    // rock arch, the barricade that never opens, torches and the hunters' standards), the gap's overhung entrance
    V.karstRange(k, [[-84, 90, 46, 11], [-90, 132, 52, 12], [-58, 150, 40, 9], [52, 96, 42, 10], [62, 130, 48, 11], [-36, 72, 30, 8],
      [38, 66, 34, 9], [-110, 104, 60, 14], [100, 116, 56, 13]]);
    for (let i = 0; i < 40; i++) {
      const a = r.range(0, 6.28), x = LAKE[0] + Math.sin(a) * LAKE_R[0] * r.range(0.95, 1.25), z = LAKE[1] + Math.cos(a) * LAKE_R[1] * r.range(0.95, 1.25);
      if (k.inAt(x, z) > 1) continue;
      V.reedPlumes(k, x, z, { n: r.int(6, 12), r: 1.5 });
    }
    for (const [x, z, yaw] of [[-36, 110, 1.4], [-38, 118, 2.2], [-35, 102, 0.6]]) V.stork(k, x, k.ground(x, z), z, yaw);
    V.storkFlock(k, -40, 26, 120, 5, { spread: 6, yaw: 0.6, s: 1.1 });
    caveArch(k, MOUTH[0], MOUTH[1] - 2, 15, 9);
    k.barricade('cuahang');
    for (const [x, z] of [[16, 126], [27, 127]]) V.bambooTorch(k, x, z, { h: 3.2 });
    for (const [x, z] of [[11, 124], [31, 124]]) k.standard(x, z, 1.05, truy, 7.6, [20, 110]);
    k.troops('foe', [[17, 132.6], [20, 133], [24, 132.8], [27, 133.2]].map(([x, z], i) => ({ x, y: k.ground(x, z), z, yaw: Math.PI, ph: i * 1.7 })));
    caveArch(k, -15, 127, 8.5, 7);
    for (let i = 0; i < 50; i++) {
      const x = r.range(-30, 34), z = r.range(86, 128), f = k.inAt(x, z);
      if (f > -0.8 || f < -6) continue;
      if (r.chance(0.6)) V.reedPlumes(k, x, z, { n: r.int(5, 9), r: 1.4 }); else rocks(k, [[x, z, r.range(0.6, 1.1)]]);
    }

    // ---- Khe nước thở: torches set into the rock where the slot widens; dripping ledges
    V.bambooTorch(k, -16, 132, { h: 2.6, s: 0.3 }); V.bambooTorch(k, -18, 154, { h: 2.6, s: 0.3 });

    // ---- Hang tối: stalagmites, torch poles, the guards' gear; the cell's pillar and chains, straw (its door: build)
    for (const [x, z, s] of [[-18, 170, 1.2], [-22, 182, 1.5], [20, 165, 1.0], [-10, 191, 1.1], [16, 191, 1.3], [-4, 166, 0.7], [8, 186, 0.8]]) stalagmite(k, x, z, s);
    for (const [x, z] of [[-14, 172], [12, 168], [-8, 188], [16, 188]]) torchPole(k, x, z);
    k.supplies(-20, 176, 1.6, 6); k.shieldRack(18, 182, -1.4); k.supplies(-14, 192, 0.2, 4);
    for (const [x, z] of [[-24, 174], [22, 192]]) k.standard(x, z, 0.95, truy, 6.6, [0, 178]);
    { const gy = k.ground(...CELL), L = k.local(CELL[0] + 2.2, gy, CELL[1], 0);
      L(0, 2.0, 0, [1.4, 4.0, 1.4], 0x6a645a); L(0, 4.2, 0, [1.8, 0.5, 1.8], 0x5a554c);   // the stone pillar he is chained to
      for (let q = 0; q < 6; q++) L(-0.9 - q * 0.22, 1.6 - q * 0.18, (q % 2 ? 0.3 : -0.3), [0.18, 0.12, 0.3], 0x3a3a3c);   // the chain
      for (let q = 0; q < 9; q++) L(r.range(-3.5, 0), 0.06, r.range(-4, 4), [r.range(0.8, 1.6), 0.08, r.range(0.4, 0.9)], shade(0xa08a50, r.range(0.8, 1.05)), [0, r.range(0, 3), 0]);   // straw
      torchPole(k, CELL[0] + 3.5, CELL[1] - 4); }
    // ---- Phòng tra hỏi: the jailer's table (a bronze token, the cinnabar thread knotted the store's way), a brazier,
    // ropes on a frame, a stool; the back wall gone: moonlit water, karst towers standing in the lake
    { const gy = k.ground(TRA[0] + 6, TRA[1] + 3.2), L = k.local(TRA[0] + 6, gy, TRA[1] + 3.2, 0.1);
      L(0, 0.8, 0, [3.6, 0.16, 2.0], 0x3e2a1c); for (const sx of [-1.6, 1.6]) for (const sz of [-0.8, 0.8]) L(sx, 0.4, sz, [0.16, 0.8, 0.16], 0x2e2016);
      V.bronzeToken(k, TRA[0] + 5.4, gy + 0.88, TRA[1] + 3.0, 0.4);
      V.threadLine(k, [[TRA[0] + 6.2, TRA[1] + 2.8], [TRA[0] + 7.2, TRA[1] + 3.4]], { h: 0.95 });
      L(-2.6, 0.3, 0.4, [0.6, 0.6, 0.6], 0x4a3220); }
    k.lamp(TRA[0] - 6, TRA[1] - 2, 0.65);
    { const gy = k.ground(TRA[0] - 8, TRA[1] + 4), L = k.local(TRA[0] - 8, gy, TRA[1] + 4, 0.3);
      for (const sx of [-1.2, 1.2]) L(sx, 1.4, 0, [0.2, 2.8, 0.2], 0x3a2618); L(0, 2.8, 0, [2.8, 0.2, 0.2], 0x3a2618);
      for (const sx of [-0.6, 0, 0.6]) L(sx, 2.0, 0, [0.05, 1.5, 0.05], 0xa08a60); }
    V.karstRange(k, [[-40, 236, 44, 10], [30, 238, 38, 9], [-90, 230, 50, 12], [80, 232, 46, 11]]);
  },

  build(root, k) {
    return buildSet(root, k);
  },
};

// ---------------------------------------------------------------- dressing pieces (render-only boxes)
/** Loose limestone boulders [[x, z, s], …] on the ground (two crossed blocks and a cap each). */
function rocks(k, list) {
  for (const [x, z, s] of list) {
    const gy = k.topAt(x, z), L = k.local(x, gy, z, k.r.range(0, 3));
    L(0, 0.45 * s, 0, [1.6 * s, 0.9 * s, 1.3 * s], shade(0x8a8478, k.r.range(0.75, 1.0)), [0.1, 0, -0.08]);
    L(0.2 * s, 0.7 * s, 0.1 * s, [1.0 * s, 0.6 * s, 1.0 * s], shade(0x9a9488, k.r.range(0.8, 1.05)), [0, 0.6, 0.12]);
  }
}
/** A cave mouth: a rough rock arch of stacked limestone blocks w wide and h high, facing -Z, at (x, z). */
function caveArch(k, x, z, w, h) {
  const gy = k.ground(x, z), L = k.local(x, gy, z, 0), R = k.r;
  for (const sx of [-1, 1]) for (let y = 0; y < h; y += 1.6) L(sx * (w / 2 + R.range(0.4, 1.2)), y + 0.8, R.range(-0.6, 0.6), [R.range(2.2, 3.4), 1.8, R.range(2.4, 3.6)], shade(0x7a746a, R.range(0.7, 1.0)));
  for (let i = 0; i < 7; i++) {
    const lx = (i / 6 - 0.5) * (w + 3), dy = Math.cos((i / 6 - 0.5) * Math.PI) * 1.6;
    L(lx, h + dy + R.range(-0.3, 0.3), R.range(-0.4, 0.4), [R.range(2.6, 3.6), R.range(1.6, 2.4), R.range(3, 4)], shade(0x6e685e, R.range(0.7, 1.0)));
    L(lx + R.range(-0.5, 0.5), h + dy - 1.3, -1.2, [0.4, R.range(0.6, 1.4), 0.4], shade(0x8a8478, R.range(0.8, 1.0)));   // dripstone fringe
  }
}
/** A stalagmite: tapering limestone blocks, wet-dark at the foot. */
function stalagmite(k, x, z, s = 1) {
  const gy = k.ground(x, z), R = k.r;
  for (let i = 0, y = 0; i < 5; i++) {
    const w = (1.4 - i * 0.24) * s, hh = (0.9 + i * 0.1) * s;
    k.props.push({ s: [w, hh, w * R.range(0.8, 1.1)], p: [x + R.range(-0.1, 0.1), gy + y + hh / 2, z + R.range(-0.1, 0.1)], r: [0, R.range(0, 3), 0], c: shade(i ? 0x9a9286 : 0x5a564e, R.range(0.8, 1.05)) });
    y += hh * 0.92;
  }
}
/** A torch on a tall pole, iron cup, its fire. */
function torchPole(k, x, z) {
  const gy = k.ground(x, z);
  k.poles.push({ s: [0.16, 3.2, 0.16], p: [x, gy + 1.6, z], c: 0x2e2016 }, { s: [0.4, 0.3, 0.4], p: [x, gy + 3.25, z], c: 0x2a2624 });
  k.fire(x, gy + 3.55, z, 0.38, false);
}

// ---------------------------------------------------------------- set pieces (build)
function glowTex() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64;
  const g = cv.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,0.4)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(cv);
}
/** Boxes pushed by fn() into k.props, taken out into their own mesh (a set piece that moves / hides). */
function grabMesh(k, fn, name) {
  const n0 = k.props.length; fn();
  const boxes = k.props.splice(n0), m = new THREE.Mesh(boxesGeometry(boxes), lit());
  m.castShadow = true; m.receiveShadow = true; m.name = name;
  return m;
}

const NIGHT_HAZE = new THREE.Color(0x0e1626), NIGHT_HEMI = new THREE.Color(0x48609a), NIGHT_GROUND = new THREE.Color(0x141824);
const MOON = new THREE.Color(0x9ab4f0), MOON_RIM = new THREE.Color(0x8aa8e8);
const MOON_DIR = new THREE.Vector3(Math.sin(-0.5) * Math.cos(0.42), Math.sin(0.42), Math.cos(-0.5) * Math.cos(0.42));

function buildSet(root, k) {
  const sites = k.sites;
  const park = (x, y, z, i, d) => { const s = { x: 9e3, y, z: 9e3, i: 0, d, k: 0, at: [x, z], full: i }; sites.push(s); return s; };
  const place = (s, on, f = 1) => { s.x = on ? s.at[0] : 9e3; s.z = on ? s.at[1] : 9e3; s.i = s.full * f; };
  const st = { swap: -1e9, rockfall: -1e9, turn: -1e9, beacon: -1e9, sight: -1e9 };
  const since = (key) => (st[key] > -1e8 ? T - st[key] : -1);
  const on = (key, delay = 0) => () => since(key) >= delay;
  let T = 0;

  // ---- the coffin column at the foot (three carts under straw mats, the escort's black-and-cinnabar pennants) — on
  // 'swap' they roll off west into the reed valley and are gone
  const column = grabMesh(k, () => {
    for (const [x, z, yaw] of FOOT_COL) {
      V.coffinCart(k, x, z, yaw);
      const gy = k.ground(x, z);
      k.props.push({ s: [0.12, 4.2, 0.12], p: [x + 1.3, gy + 2.1, z + 1.6], c: 0x2a1e18 }, { s: [0.05, 1.2, 0.8], p: [x + 1.3, gy + 3.6, z + 2.0], c: 0x1c1412 },
        { s: [0.06, 0.2, 0.82], p: [x + 1.3, gy + 3.0, z + 2.0], c: 0xa8281c });
    }
  }, 'deolua-column');
  root.add(column);

  // ---- the decoy: an empty coffin on a cart under the yellow banner. Hidden until 'swap' (at the foot of the climb),
  // then on 'turn' it stands at the path's mouth, behind where he turns to face them
  const decoy = grabMesh(k, () => {
    const [x, z, yaw] = DECOY0, gy = k.ground(x, z);
    V.coffinCart(k, x, z, yaw, { mat: false });
    const L = k.local(x, gy, z, yaw);
    L(0.7, 3.6, -1.2, [0.16, 5.6, 0.16], 0x2a1e18); L(0.7, 6.3, -1.2, [0.2, 0.3, 0.2], 0xc89a48);
    L(0.7, 5.0, -0.45, [0.06, 2.4, 1.4], 0xd8a62a); L(0.7, 3.85, -0.45, [0.08, 0.16, 1.5], 0x8a2a14);   // the yellow banner
    L(0.7, 5.1, -0.45, [0.08, 0.6, 0.6], 0x8a2a14); L(0.66, 5.1, -0.45, [0.08, 0.36, 0.36], 0xd8a62a);
  }, 'deolua-decoy');
  decoy.visible = false;
  root.add(decoy);
  const D1Y = ground(DECOY1[0], DECOY1[1]) - ground(DECOY0[0], DECOY0[1]);

  // ---- the rockfall: stakes holding back boulders against the east wall of the ledge (z -36 … -12); on 'rockfall' the
  // stakes kick out and the boulders roll across the path and over the drop, the last few coming to rest on the rim
  const RF = [];
  { const R = k.r;
    for (let i = 0; i < 12; i++) {
      const z = -35 + i * 2 + R.range(-0.6, 0.6), [cx, hw] = pathAt(z), x0 = cx + hw + R.range(1.0, 2.4), y0 = ground(cx, z) + R.range(1.2, 3.4), s = R.range(0.8, 1.4);
      const rest = i % 4 === 1, x1 = rest ? cx - hw + R.range(0.2, 1.2) : cx - hw - R.range(14, 26);
      const geo = boxesGeometry([{ s: [1.6 * s, 1.3 * s, 1.5 * s], p: [0, 0, 0], c: shade(0x8a8478, R.range(0.75, 1)) }, { s: [1.1 * s, 0.9 * s, 1.2 * s], p: [0.2 * s, 0.5 * s, 0.1 * s], c: shade(0x9a9488, R.range(0.8, 1)) }]);
      const m = new THREE.Mesh(geo, lit()); m.castShadow = true;
      m.position.set(x0, y0, z); root.add(m);
      RF.push({ m, x0, y0, z, x1, y1: rest ? ground(cx, z) + 0.6 * s : y0 - 26, d: i * 0.12 + R.range(0, 0.2), spin: R.range(2, 5) });
    }
  }
  const stakes = grabMesh(k, () => {
    const R = k.r;
    for (let z = -36; z < -12; z += 1.2) {
      const [cx, hw] = pathAt(z), x = cx + hw + 0.5, gy = ground(cx, z), hh = R.range(1.8, 2.6);
      k.props.push({ s: [0.18, hh, 0.18], p: [x, gy + hh * 0.45, z], r: [0, 0, 0.35], c: shade(0x6a5a3a, R.range(0.8, 1.1)) });
      if (R.chance(0.5)) k.props.push({ s: [0.12, 0.12, 1.4], p: [x + 0.4, gy + hh * 0.7, z], c: 0x5a4a30 });
    }
  }, 'deolua-stakes');
  root.add(stakes);

  // ---- the beacon: its fire, a far-carrying halo (unfogged: the crest reads from the basin), a light site
  const by = ground(...BEACON) + 4.65;
  k.fire(BEACON[0], by, BEACON[1], 3.4, true, on('beacon'));
  for (const [dx, dz] of [[-0.8, 0.5], [0.7, -0.6]]) k.fire(BEACON[0] + dx, by + 0.4, BEACON[1] + dz, 2.2, false, on('beacon', 0.6));
  const glowT = glowTex();
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowT, color: 0xffa040, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, fog: false }));
  halo.position.set(BEACON[0], by + 3, BEACON[1]); halo.scale.set(36, 32, 1); halo.visible = false; halo.name = 'beacon-halo';
  root.add(halo);
  const sB = park(BEACON[0], 6, BEACON[1], 90, 40);

  // ---- the token's sighting line: a thin moonbeam from where they hold the two halves up to the main cave mouth
  const p0 = new THREE.Vector3(SIGHT[0], ground(...SIGHT) + 1.7, SIGHT[1]), p1 = new THREE.Vector3(MOUTH[0], ground(...MOUTH) + 4, MOUTH[1] - 3);
  const beamMat = new THREE.MeshBasicMaterial({ color: 0xbcd4ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
  const beam = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, p0.distanceTo(p1)), beamMat);
  beam.position.copy(p0).lerp(p1, 0.5); beam.lookAt(p1); beam.visible = false; beam.name = 'sight-beam';
  root.add(beam);
  const spot = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowT, color: 0xa8c4ff, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, fog: false, opacity: 0 }));
  spot.position.copy(p1); spot.scale.set(5, 5, 1); spot.visible = false; root.add(spot);

  // ---- the lake in the basin bowl, and the breathing water in the gap (it rises and falls with the wind)
  const waterMat = new THREE.MeshStandardMaterial({ color: 0x0c2630, roughness: 0.12, metalness: 0.55, transparent: true, opacity: 0.92 });
  const lake = new THREE.Mesh(new THREE.PlaneGeometry(40, 44), waterMat);
  lake.rotation.x = -Math.PI / 2; lake.position.set(LAKE[0], WATER_Y, LAKE[1]); lake.receiveShadow = true; lake.name = 'deolua-lake';
  root.add(lake);
  const gapMat = new THREE.MeshStandardMaterial({ color: 0x123a44, roughness: 0.1, metalness: 0.4, transparent: true, opacity: 0.78 });
  const gapWater = new THREE.Group(); gapWater.name = 'gap-water';
  const KHE = [[-14, 124, 3.4], [-22, 136, 2.6], [-20, 150, 2.3], [-10, 160, 3]];
  for (let i = 0; i < KHE.length - 1; i++) {
    const [ax, az, aw] = KHE[i], [bx, bz, bw] = KHE[i + 1], ya = ground(ax, az), yb = ground(bx, bz), L = Math.hypot(bx - ax, bz - az);
    const m = new THREE.Mesh(new THREE.BoxGeometry(2 * Math.max(aw, bw) + 1.5, 0.08, L + 2), gapMat);
    m.position.set((ax + bx) / 2, (ya + yb) / 2 + 0.22, (az + bz) / 2);
    m.rotation.set(0, Math.atan2(bx - ax, bz - az), 0, 'YXZ'); m.rotation.x = Math.atan2(ya - yb, L);
    gapWater.add(m);
  }
  root.add(gapWater);

  // ---- the rock roof: overhanging lips over the gap, slabs over the hall and the chamber (a few cracks let the moon
  // through in shafts); it casts the moon's shadow on the cave floor
  const roofBoxes = [], R = k.r;
  const slab = (x0, z0, x1, z1, y, th = 3) => {
    for (let x = x0; x < x1; x += 6) for (let z = z0; z < z1; z += 6) {
      const w = Math.min(6.6, x1 - x + 0.6), d = Math.min(6.6, z1 - z + 0.6), yy = y + R.range(-0.8, 0.8);
      roofBoxes.push({ s: [w, th + R.range(0, 1.5), d], p: [x + w / 2, yy, z + d / 2], c: shade(0x5a5650, R.range(0.6, 0.9)) });
      if (R.chance(0.45)) roofBoxes.push({ s: [0.6, R.range(1.2, 3), 0.6], p: [x + R.range(1, 5), yy - th / 2 - 1, z + R.range(1, 5)], c: shade(0x8a8478, R.range(0.7, 0.95)) });   // dripstone
    }
  };
  slab(-34, 160, -6, 200, 18); slab(6, 160, 40, 200, 18); slab(-6, 160, 6, 172, 17.5); slab(-6, 180, 6, 200, 17.5);   // (a crack at z 172-180)
  slab(-20, 200, 22, 214, 16.5);
  slab(-34, 132, -24, 162, 10.5, 2); slab(-14, 132, -2, 162, 10.5, 2); slab(-28, 140, -22, 156, 12.5, 2);   // the gap's lips
  const roof = new THREE.Mesh(boxesGeometry(roofBoxes), lit());
  roof.castShadow = true; roof.receiveShadow = true; roof.name = 'cave-roof';
  root.add(roof);
  const shaftMat = new THREE.MeshBasicMaterial({ color: 0x6a88c0, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending, depthWrite: false });
  for (const [x, z, w] of [[-2, 176, 3.4], [2, 214, 4]]) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 16, w * 0.7), shaftMat);
    m.position.set(x, ground(x, z) + 8, z); m.rotation.set(0.25, 0.3, 0); root.add(m);
  }

  // ---- the doors drawn here: the cell's lattice (two leaves swinging into the hall) and the chamber's plank door
  const doors = [];
  const door = (id, x, z, yaw, half, h, lattice) => {
    for (const sd of [-1, 1]) {
      const g = new THREE.Group(), b = [], W = half, WOOD = 0x3a2818;
      if (lattice) {
        for (let q = 0.3; q < W; q += 0.55) b.push({ s: [0.14, h, 0.14], p: [-sd * q, h / 2, 0], c: WOOD });
        for (const y of [0.4, h * 0.5, h - 0.3]) b.push({ s: [W, 0.16, 0.18], p: [-sd * W / 2, y, 0], c: 0x2a1c12 });
      } else {
        b.push({ s: [W, h, 0.22], p: [-sd * W / 2, h / 2, 0], c: WOOD });
        for (const y of [0.6, h * 0.5, h - 0.5]) b.push({ s: [W, 0.2, 0.3], p: [-sd * W / 2, y, 0], c: 0x2a2624 });
      }
      const m = new THREE.Mesh(boxesGeometry(b), lit()); m.castShadow = true; g.add(m);
      const cs = Math.cos(yaw), sn = Math.sin(yaw), hx = x + sd * half * cs, hz = z - sd * half * sn;
      g.position.set(hx, ground(hx, hz), hz); g.rotation.y = yaw;
      root.add(g); doors.push({ id, g, sd, yaw, k: 1 });
    }
    const posts = [];
    for (const sd of [-1, 1]) { const cs = Math.cos(yaw), sn = Math.sin(yaw), px = x + sd * (half + 0.3) * cs, pz = z - sd * (half + 0.3) * sn; posts.push({ s: [0.5, h + 0.8, 0.5], p: [px, ground(px, pz) + (h + 0.8) / 2, pz], c: 0x2e2016 }); }
    const m = new THREE.Mesh(boxesGeometry(posts), lit()); root.add(m);
  };
  door('cell', CELL_X, 175, Math.PI / 2, 5, 3.2, true);
  door('tra', 1.5, TRA_Z, 0, 4.6, 3.6, false);

  // ---- the night: a dark dome over the dusk sky (stars), the moon, and the light rig easing to moonlight (update)
  const nightMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, transparent: true,
    uniforms: { uNight: { value: 0 } },
    vertexShader: 'varying vec3 vDir; void main() { vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position.z = gl_Position.w * 0.99999; }',
    fragmentShader: `uniform float uNight; varying vec3 vDir;
      float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void main() {
        vec3 d = normalize(vDir); float h = max(d.y, 0.0);
        vec3 c = mix(vec3(0.07, 0.1, 0.18), vec3(0.012, 0.02, 0.05), smoothstep(0.0, 0.6, h));
        float az = atan(d.x, d.z); vec2 g = vec2(az * 90.0, h * 140.0);
        float s = step(0.9965, h21(floor(g))) * smoothstep(0.05, 0.3, h);
        c += vec3(0.8, 0.85, 1.0) * s * (0.4 + 0.6 * h21(floor(g) + 7.0));
        gl_FragColor = vec4(c, uNight * mix(0.97, 0.85, smoothstep(0.0, 0.08, -d.y + 0.04)));
      }`,
  });
  const night = new THREE.Mesh(new THREE.SphereGeometry(860, 32, 16), nightMat);
  night.frustumCulled = false; night.renderOrder = -0.8; night.visible = false; night.name = 'night';
  root.add(night);
  const moonMat = new THREE.SpriteMaterial({ map: glowT, color: 0xeef2ff, transparent: true, depthWrite: false, fog: false, opacity: 0 });
  const moon = new THREE.Sprite(moonMat); moon.scale.set(30, 30, 1); moon.renderOrder = -0.7;
  const moonHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowT, color: 0x6a88c8, transparent: true, depthWrite: false, fog: false, opacity: 0, blending: THREE.AdditiveBlending }));
  moonHalo.scale.set(150, 150, 1); moonHalo.renderOrder = -0.75;
  root.add(moon, moonHalo);
  const nightAt = (z) => sm(26, 86, z);                                            // over the crest and down to the basin floor
  const caveAt = (z) => sm(126, 152, z) * (1 - 0.35 * sm(208, 218, z));            // under the roof (the back opening: a little moon)
  let saved = null, nv = 0, cv = 0;
  const capture = (sc) => {
    const hemi = sc.children.find((o) => o.isHemisphereLight), dl = sc.children.filter((o) => o.isDirectionalLight);
    const sun = dl.find((o) => o.castShadow) || dl[0], rim = dl.find((o) => o !== sun && o.intensity > 0) || null;
    saved = { fog: sc.fog.color.clone(), bg: sc.background.clone(), hemi, hc: hemi.color.clone(), hg: hemi.groundColor.clone(), hi: hemi.intensity,
      sun, sc: sun.color.clone(), si: sun.intensity, rim, rc: rim?.color.clone(), ri: rim?.intensity };
  };
  const apply = (sc, n, c) => {
    const s = saved;
    sc.fog.color.copy(s.fog).lerp(NIGHT_HAZE, n); sc.background.copy(s.bg).lerp(NIGHT_HAZE, n);
    s.hemi.color.copy(s.hc).lerp(NIGHT_HEMI, n); s.hemi.groundColor.copy(s.hg).lerp(NIGHT_GROUND, n); s.hemi.intensity = s.hi * (1 - 0.2 * n) * (1 - 0.5 * c);
    s.sun.color.copy(s.sc).lerp(MOON, n); s.sun.intensity = s.si * (1 - 0.45 * n) * (1 - 0.55 * c);
    if (s.rim) { s.rim.color.copy(s.rc).lerp(MOON_RIM, n); s.rim.intensity = s.ri * (1 - 0.4 * n) * (1 - 0.6 * c); }
  };

  const sets = {
    swap() { if (st.swap < -1e8) st.swap = T; },
    rockfall() { if (st.rockfall < -1e8) st.rockfall = T; },
    turn() { if (st.turn < -1e8) st.turn = T; },
    beacon() { if (st.beacon < -1e8) st.beacon = T; },
    sight() { if (st.sight < -1e8) st.sight = T; },
  };
  let lastFrame = 0, free = false;
  const reset = () => { for (const key in st) st[key] = -1e9; free = false; nv = cv = 0; };
  return {
    sets,
    update(dt, game) {
      T += dt;
      if (game.frame < lastFrame) reset();                                          // a new battle
      lastFrame = game.frame;
      if (game.mode !== 'story' && !free) { free = true; st.swap = st.rockfall = st.turn = T - 60; st.beacon = T - 30; }   // free / trial: the burning pass
      // the column rolls off west into the reeds over ≈ 9 s and is gone; the decoy appears at the climb's foot, then at the mouth
      const sw = since('swap'), u = sw < 0 ? 0 : sm(0, 9, sw);
      column.visible = u < 1; column.position.set(-34 * u, 0, -4 * u);
      decoy.visible = sw >= 0;
      const tn = since('turn') >= 0;
      decoy.position.set(tn ? DECOY1[0] - DECOY0[0] : 0, tn ? D1Y : 0, tn ? DECOY1[1] - DECOY0[1] : 0);
      // the rockfall: stakes kick out, boulders bound across the ledge and over the drop (≈ 2.5 s each)
      const rf = since('rockfall');
      stakes.rotation.z = 0; stakes.visible = rf < 0 || rf < 1.2;
      for (const b of RF) {
        const t = rf < 0 ? 0 : Math.min(1, Math.max(0, (rf - b.d) / 2.4));
        const x = b.x0 + (b.x1 - b.x0) * sm(0, 1, t), across = Math.min(1, t * 2.2);
        const y = t < 0.45 ? b.y0 + (ground(x, b.z) + 0.8 - b.y0) * across + Math.sin(across * Math.PI) * 1.4 : b.y0 + (b.y1 - b.y0) * sm(0.45, 1, t) + Math.sin(Math.min(1, (t - 0.45) * 4) * Math.PI) * 0.8;
        b.m.position.set(x, y, b.z); b.m.rotation.set(t * b.spin, 0, -t * b.spin);
        b.m.visible = t < 1 || b.y1 > b.y0 - 20;
      }
      // the beacon
      const bt = since('beacon'), lit = bt >= 0, fl = 0.85 + 0.15 * Math.sin(T * 9) * Math.sin(T * 13.7);
      place(sB, lit, Math.min(1, bt / 2) * fl);
      halo.visible = lit; halo.material.opacity = lit ? Math.min(1, bt / 2) * (0.75 + 0.25 * fl) : 0;
      // the moonbeam through the token: up in 1.5 s, holds, fades by 14 s
      const sg = since('sight'), sv = sg < 0 ? 0 : sm(0, 1.5, sg) * (1 - sm(9, 14, sg));
      beam.visible = spot.visible = sv > 0; beamMat.opacity = sv * 0.55; spot.material.opacity = sv * 0.9;
      // the gap's water breathes with the wind
      gapWater.position.y = Math.sin(T * 0.55) * 0.12 + Math.sin(T * 1.3) * 0.04;
      // doors: the cell's leaves swing inward, the chamber's door outward, ≈ 1 s
      for (const d of doors) {
        d.k += ((GATES[d.id]?.open ? 1 : 0) - d.k) * Math.min(1, dt * 3);
        d.g.rotation.y = d.yaw + d.sd * d.k * (d.k * -2 + 3.4) * 0.5;
      }
      // dusk → moonlight over the crest, darker under the roof (eased: a respawn never pops)
      const hz = game.hero?.z ?? -200, sc = root.parent;
      nv += (nightAt(hz) - nv) * Math.min(1, dt * 1.5); cv += (caveAt(hz) - cv) * Math.min(1, dt * 1.5);
      if (sc && sc.fog) {
        if (!saved) capture(sc);
        apply(sc, nv, cv);
      }
      night.visible = nv > 0.002; nightMat.uniforms.uNight.value = nv;
      const hx = game.hero?.x ?? 0;
      moon.position.set(hx + MOON_DIR.x * 640, ground(hx, hz) + MOON_DIR.y * 640, hz + MOON_DIR.z * 640); moonHalo.position.copy(moon.position);
      moon.visible = moonHalo.visible = nv > 0.05; moonMat.opacity = nv; moonHalo.material.opacity = nv * 0.35;
    },
  };
}
