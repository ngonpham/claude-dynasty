// Phong Châu (峰州, 967–968) laid out along +Z, ≈ 400 m from the Đinh landing at the river confluence to the shrine on
// the summit — a NIGHT battle lit by fires, the finale of 十二使君. Format: src/world/maps/index.js header; Vietnamese
// dressing helpers: ../viet.js. Kiều Công Hãn's country: the old heartland of Văn Lang where the Thao, Đà and Lô rivers
// meet (Bạch Hạc), green "upturned-bowl" midland hills, and his rammed-earth hill fort under the dark mass of Nghĩa Lĩnh.
//   Bến Bạch Hạc    the landing          z -188 … -116  h 0    the confluence (a 40 m band of black water to the south,
//                                                              bending north on the east: the Lô), the Đinh war boats
//                                                              drawn up with dragon prows and torches; Kiều's two river
//                                                              posts (đồn) on the flanks — set 'burnW' / 'burnE'; start
//   Đồi trung du    the midland hills    z -122 …    6  h 0→6  rolling ground split round a tea-crowned hillock (two
//                                                              lanes, the road takes the east one), a stilt-house hamlet
//                                                              in a bamboo hedge off the west lane, rice paddies
//   (ải)            the bamboo pass      z   -8 …   16  h 6    a 20 m neck closed by the bamboo barricade 'luytre' (z 4)
//   Ngoại thành     outer bailey         z   12 …   96  h 6→9  approach (h 6) → rammed-earth rampart (z 39.5 … 46.5)
//                                                              with the gate 'ngoaithanh' (x ±5.5) → the bailey (h 9)
//   Nội thành       inner court          z   96 …  136  h 13   inner rampart (z 95.5 … 102.5), gate 'noithanh'; Kiều's
//                                                              Đông Sơn long hall (west) and granary (east) — set 'burn'
//   (dốc)           the stair            z  130 …  162  h 13→22  a switchback up the hill through the north rampart
//   Đỉnh Nghĩa Lĩnh summit               z  162 …  206  h 22   the tam quan, the shrine with its bronze drums, the 矯
//                                                              banner, the great beacon (set 'beacon'); the forested
//                                                              mountain climbs on behind (rise 34 + the named peak)
// Night (sky / light / post below): a low moon to the north-west over Nghĩa Lĩnh, ink-blue overhead, the horizon away
// from it faintly red. build() owns the set pieces the story drives (story:set): 'beacon' lights the great beacon on the
// summit (Kiều's call to Hồi Hồ and Tam Đái — it burns on as the goal everyone can see), 'burnW' / 'burnE' set the river
// posts alight, 'ram' rolls the Đinh battering ram up to the outer gate and swings it, 'burn' fires Kiều's hall and
// granary, 'dawn' eases the night toward the first light of 968 behind the mountain (the win). Firelight uses the
// world's light sites only: the set-piece sites stay parked far off until their fire is lit. A new battle (frame back to
// 0) resets the set; free mode stands in the burning night (posts and hall burnt down, beacon lit) from the start.
import * as THREE from 'three';
import { NOISE_GLSL } from '../../../../src/world/sky.js';
import { WIND } from '../../../../src/world/dressing.js';
import { boxesGeometry, shade } from '../../../../src/core/voxel.js';
import { GATES } from '../../../../src/world/map.js';
import { figureGeometry, lit } from '../../../../src/world/castle.js';
import { bamboo, bambooHedge, bambooFence, reedFlags, stiltHouse, hut, banyan, areca, paddy, boat, bronzeDrum, rampart,
  templeGate, shrine, haystack, teaBushes, broadleaf, bambooTorch, dongSonHouse, localQ } from '../viet.js';

const sm = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
const WY = -0.2, HWW = 20;                                                         // river surface, deep half width
const RIVER = [[-150, -211], [-40, -208], [30, -205], [90, -196], [150, -182]];   // the confluence: centre z(x)
const riverZ = (x) => {
  let i = 0;
  while (i < RIVER.length - 2 && RIVER[i + 1][0] < x) i++;
  const [ax, az] = RIVER[i], [bx, bz] = RIVER[i + 1], t = Math.min(1, Math.max(0, (x - ax) / (bx - ax)));
  return az + (bz - az) * t;
};
const HILL = (z) => 6 * sm(-118, 14, z);                                           // the midlands climb 0 → 6
const FORT = (z) => 6 + 3 * sm(39, 47, z) + 4 * sm(95, 103, z);                    // approach 6 · bailey 9 · court 13
const HH = (x, z) => HILL(z), FH = (x, z) => FORT(z);
const SUMMIT_H = 22;
const OUT_W = [-48, -150], OUT_E = [46, -154];                                     // the river posts (officer ground)
const HALL = [-25, 121], GRANARY = [27, 124], BEACON = [17, 192], SHRINE = [0, 201], RAM = [0, 31];
const OUTER_Z = 43, INNER_Z = 99;                                                  // rampart lines (gate centres)

export default {
  id: 'phongchau',
  name: { zh: 'Phong Châu', en: 'Phong Châu' },
  grid: [-150, -232, 150, 228],
  pieces: [
    { id: 'ben', rect: [-64, -200, 64, -116], h: 0, edge: 2.5, rise: 7 },                     // the landing (water cuts its south)
    { id: 'doiS', rect: [-50, -122, 50, -90], h: HH, edge: 3, rise: 9 },
    { id: 'laneW', ell: [-32, -62, 15, 32], h: HH, edge: 2.5, rise: 10 },
    { id: 'laneE', ell: [30, -62, 15, 32], h: HH, edge: 2.5, rise: 10 },
    { id: 'xom', ell: [-58, -64, 13, 15], h: HH, edge: 2, rise: 8 },                         // the hamlet clearing
    { id: 'doiN', rect: [-42, -38, 40, -6], h: HH, edge: 3, rise: 10 },
    { id: 'ai', path: [[0, -10, 18, HILL(-10)], [2, 4, 10, HILL(4)], [0, 16, 13, 6]], edge: 1.5, rise: 14 },
    { id: 'thanh', rect: [-44, 12, 44, 136], h: FH, edge: 1, rise: 9 },
    { id: 'doc', path: [[0, 130, 8, 13], [7, 142, 6, 15.6], [-3, 152, 6, 18.7], [0, 162, 8, SUMMIT_H]], edge: 1, rise: 14 },
    { id: 'dinh', ell: [0, 184, 26, 22], h: SUMMIT_H, edge: 1.5, rise: 34 },
  ],
  // the river posts' bamboo fences (open toward the road), the tam quan's four columns
  carve: [[-62, -161, -40, -159], [-62, -141, -40, -139], [-61, -161, -59, -139],
    [38, -165, 60, -163], [38, -145, 60, -143], [59, -165, 61, -143],
    ...[-6.5, -2.2, 2.2, 6.5].map((x) => [x - 0.45, 166.5, x + 0.45, 167.5])],
  // solid set pieces: the posts' huts and watchtowers, the hamlet's stilt houses and banyan, the ramparts (rammed earth:
  // no rock grows there), the bailey huts, Kiều's hall and granary, the shrine terrace, the beacon
  props: [[-57.4, -149.4, -50.6, -142.6], [-57.6, -158.6, -52.4, -153.4], [49.6, -153.4, 56.4, -146.6], [50.4, -162.6, 55.6, -157.4],
    [-65.8, -77.2, -54.2, -70.8], [-66.8, -59.2, -55.2, -52.8], [-51.6, -67.6, -48.4, -64.4],
    [-50, 39.5, -5.5, 46.5], [5.5, 39.5, 50, 46.5], [-50, 95.5, -5, 102.5], [5, 95.5, 50, 102.5],
    [-50, 46.5, -43.5, 95.5], [43.5, 46.5, 50, 95.5], [-50, 102.5, -43.5, 141], [43.5, 102.5, 50, 141],
    [-50, 136.5, -4.5, 141], [13, 136.5, 50, 141],
    [-41.6, 56.6, -34.4, 63.4], [-41.6, 78.6, -34.4, 85.4], [34.4, 66.6, 41.6, 73.4],
    [HALL[0] - 10.2, HALL[1] - 5, HALL[0] + 8.2, HALL[1] + 5], [GRANARY[0] - 4.2, GRANARY[1] - 6.6, GRANARY[0] + 4.2, GRANARY[1] + 6.6],
    [-9.5, 195.5, 9.5, 207], [BEACON[0] - 2.6, BEACON[1] - 2.6, BEACON[0] + 2.6, BEACON[1] + 2.6]],
  zones: [
    { id: 'ben', name: { zh: 'Bến Bạch Hạc', en: 'Bạch Hạc Landing' }, x: 0, z: -152, w: 128, d: 72 },
    { id: 'doi', name: { zh: 'Đồi trung du', en: 'Midland Hills' }, x: 0, z: -55, w: 120, d: 122 },
    { id: 'ngoai', name: { zh: 'Ngoại thành', en: 'Outer Bailey' }, x: 0, z: 51, w: 92, d: 90 },
    { id: 'noi', name: { zh: 'Nội thành', en: 'Inner Court' }, x: 0, z: 119, w: 92, d: 34 },
    { id: 'dinh', name: { zh: 'Đỉnh Nghĩa Lĩnh', en: 'Nghĩa Lĩnh Summit' }, x: 0, z: 184, r: 26 },
  ],
  route: [[0, -178], [0, -150], [2, -124], [6, -104], [28, -88], [32, -64], [26, -42], [8, -24], [1, -8], [2, 4], [0, 18], [0, 32],
    [0, OUTER_Z], [0, 60], [0, 84], [0, INNER_Z], [0, 114], [2, 128], [7, 142], [-3, 152], [0, 162], [0, 180]],
  gates: {
    luytre: { rect: [-16, 2.5, 20, 5.5], name: { zh: 'Lũy tre', en: 'Bamboo Barricade' }, kind: 'barricade', at: [2, 4, 0, 10] },
    ngoaithanh: { rect: [-8, OUTER_Z - 1.5, 8, OUTER_Z + 1.5], name: { zh: 'Cổng ngoại thành', en: 'Outer Gate' }, kind: 'barricade', at: [0, OUTER_Z, 0, 5.5] },
    noithanh: { rect: [-7.5, INNER_Z - 1.5, 7.5, INNER_Z + 1.5], name: { zh: 'Cổng nội thành', en: 'Inner Gate' }, kind: 'barricade', at: [0, INNER_Z, 0, 5] },
  },
  // story positions (suquan/src/story/phongchau.js: [anchor, dx, dz] metres)
  anchors: { landing: [0, -176], outW: OUT_W, outE: OUT_E, xom: [-56, -64], laneW: [-32, -62], laneE: [30, -62], luytre: [2, 4],
    ram: RAM, gate: [0, OUTER_Z], bailey: [0, 70], inner: [0, INNER_Z], hall: HALL, court: [4, 118], stair: [2, 132],
    summit: [0, 182], shrine: [0, 192] },
  // story: on the sand above the waterline, the war boats behind, looking up the beach at the river posts and the
  // hills; free: the landing (r 35 of open sand between the posts)
  spawn: { story: { x: 0, z: -176, yaw: 0, tilt: -0.07 }, free: { x: 0, z: -150, yaw: 0 } },
  water: { along: 'x', c: RIVER, hw: HWW, bed: [2.4, 0.45], stones: 0, y: WY, tint: { deep: 0x03070e, shallow: 0x0c1824, sun: [0.3, 0.36, 0.52] } },
  sky: {
    sunElev: 0.085, sunAz: -0.72, sunCore: [2.0, 2.2, 2.6],
    haze: 0x141a2a, hazeWarm: 0x3e4a68, glow: 0x8090c0, skyMid: 0x101828, skyTop: 0x03050b,
    hznSun: 0x3e4c72, hznAway: 0x40201a, cloudRose: 0x201c28, cloudShade: 0x090b12, cloudLit: 0x7080a8,
    dust: [14, 60, 1.2, 0.05], dustLit: 0x36425e, dustShade: 0x261a18, apCool: 0x323f68,
  },
  fog: [26, 230],
  light: { hemi: [0x4e5f8e, 0x2a1e20, 1.9], sun: [0x93aee6, 2.0], rim: [0xa8bcf0, 1.1], dir: [-0.5, 0.75, -0.4], fire: 0xff7a30, fill: [150, 182, 0.9] },
  post: { exposure: 1.6, sat: 1.12, shadowTint: [0.7, 0.86, 1.35], highTint: [1.2, 0.96, 0.72], rays: 0.2, rayTint: [0.6, 0.7, 1.0],
    bloom: 0.9, bloomThreshold: 1.25, hazeCool: [0.05, 0.07, 0.13], hazeWarm: [0.2, 0.12, 0.08], sunGlow: [0.5, 0.6, 0.85] },
  castle: null,
  terrain: {
    pave: (x, z) => (z > 103 && z < 136 && Math.abs(x) < 40 ? 0.3 : 0) + (Math.hypot(x, z - 186) < 13 ? 0.85 : 0) + (z < 12 ? -2.5 : 0),
    bare: (x, z) => (z > 12 && z < 138) || Math.hypot(x - OUT_W[0], z - OUT_W[1]) < 12 || Math.hypot(x - OUT_E[0], z - OUT_E[1]) < 12,
    rock: () => -2,                                                                // earth hills, no bare-rock tint
    scorch: { n: 18, area: [-40, -170, 40, 140], spots: [[-6, 46, 0.8], [5, 40, 0.7], [-2, 101, 0.7], [0, 6, 0.9]] },
    rubble: [-60, -180, 60, 140],
    pines: [40, 228],
    mountains: { peakA: 0.04, peak: 72 },                                          // Nghĩa Lĩnh's shoulder behind the summit
    cliff: { rock: 0x6e4430, dark: 0x3c2618, top: 0x36502a, moss: 0x2c4424, grassy: 0x3e5a2c },   // laterite under green hills
  },
  fires: [[-58, -126, 1.0], [56, -130, 1.1], [-40, -100, 0.9], [42, -24, 1.0]],    // burning skiffs and carts at the field edges
  // firelight: start braziers, the beached boats, the hamlet, the bamboo pass, both gates, bailey, court, stair, summit
  lightSites: [[-7, 1.6, -168, 30, 12], [7, 1.6, -168, 30, 12], [-22, 2, -186, 26, 12], [22, 2, -184, 26, 12], [-52, 2, -64, 26, 10],
    [-12, 2, -2, 30, 11], [16, 2, -2, 30, 11], [-9, 2, 36, 34, 12], [9, 2, 36, 34, 12], [-30, 2, 70, 28, 11], [30, 2, 76, 28, 11],
    [-8, 2, 106, 30, 11], [8, 2, 106, 30, 11], [10, 2, 120, 28, 11], [9, 2, 146, 26, 10], [-8, 2, 176, 32, 12], [8, 2, 176, 32, 12], [0, 3, 193, 30, 12]],
  hq: [0, 190],

  dress(k) {
    const { r, mats, props, poles } = k;
    WIND.set(0.32, 0, 0.95).normalize();                                          // a night breeze off the river: flags stream north
    const ban = (g, bg, fg, border, seed, w = 128, h = 256) => k.banner(g, { bg, fg, border, w, h, seed });
    const kieu = ban('矯', '#1e4a30', '#ecdcae', '#c8a050', 31, 160, 320), vanthang = ban('萬勝', '#8e2418', '#f2d68a', '#3a120c', 32, 160, 320);
    const lau = k.banner('', { bg: '#e8e0cc', fg: '#000', border: '#b8a878', w: 64, h: 128, seed: 33 });   // reed-white pennants
    const flagAim = Math.atan2(-WIND.z, WIND.x);
    const off = (x, z, m = 3) => k.inAt(x, z) < -m;                                // off the walk field by m metres
    const dry = (x, z) => k.waterD(x, z) > HWW + 5;

    // ---- Bến Bạch Hạc: the Đinh war boats — beached bows-first at the waterline, more riding at anchor, torches on
    // bow and stern, the 丁 flags and white reed pennants; the 萬勝 banner over the landing
    for (const [x, dz, yaw, len] of [[-46, 3, 0.12, 13], [-27, 2, -0.08, 14], [-9, 4, 0.05, 15], [12, 3, -0.1, 14], [31, 2, 0.15, 13], [50, 4, -0.2, 12]]) {
      const z = riverZ(x) + HWW - dz, L = len;
      boat(k, x, WY, z, yaw, { len: L, dragon: true });
      const sx = Math.sin(yaw), cz = Math.cos(yaw);
      poles.push({ s: [0.16, 6, 0.16], p: [x - sx * 1.5, WY + 3.6, z - cz * 1.5], c: 0x2a1a10 });
      k.cloth(r.chance(0.5) ? mats.allyFlag : lau, 1.7, 1.2, 'flag', x - sx * 1.5, WY + 6.4, z - cz * 1.5, flagAim);
      for (const e of [0.42, -0.42]) {                                             // torches at bow and stern
        const tx = x + sx * L * e, tz = z + cz * L * e;
        poles.push({ s: [0.1, 1.6, 0.1], p: [tx, WY + 1.6, tz], c: 0x3a2618 });
        k.fire(tx, WY + 2.5, tz, 0.3, false);
      }
    }
    for (const [x, dz, yaw] of [[-62, 12, 1.4], [-34, 13, 1.7], [-4, 14, 1.5], [24, 12, 1.65], [56, 11, 1.3], [-80, 8, 1.6], [84, 10, 1.2]]) {
      const z = riverZ(x) + dz;
      boat(k, x, WY, z, yaw, { len: 15, dragon: true });
      k.fire(x + Math.sin(yaw) * 6, WY + 1.6, z + Math.cos(yaw) * 6, 0.32, false);
      poles.push({ s: [0.18, 7, 0.18], p: [x, WY + 4, z], c: 0x2a1a10 });
      k.cloth(mats.allyFlag, 1.9, 1.3, 'flag', x, WY + 7.2, z, flagAim);
    }
    k.reeds();
    for (let i = 0; i < 16; i++) {                                                 // bông lau stands on the sand's margins
      const x = (i % 2 ? 1 : -1) * r.range(30, 62), z = r.range(-186, -122);
      if (Math.abs(x) > 34 && Math.abs(z - OUT_W[1]) < 14) continue;
      if (k.inAt(x, z) > 6 || !dry(x, z)) continue;
      reedFlags(k, x, z, { n: r.int(8, 14), r: 1.4 });
    }
    { const x = -13, z = -183, gy = k.ground(x, z), P = 16;                       // the 萬勝 banner over the landing
      poles.push({ s: [0.36, P, 0.36], p: [x, gy + P / 2, z], c: 0x2e1d15 }, { s: [5, 0.28, 0.28], p: [x + 2.3, gy + P - 0.5, z], c: 0x2e1d15 }, { s: [0.28, 1.2, 0.28], p: [x, gy + P + 0.6, z], c: 0xc9a040 });
      k.cloth(vanthang, 4.4, 8.6, 'hang', x + 0.2, gy + P - 0.7, z, -0.2); }
    for (const [x, z] of [[-24, -180], [24, -179], [-36, -168], [36, -170]]) k.standard(x, z, 1.1, mats.ally, 8.5, [0, -150]);
    for (const [x, z] of [[-7, -168], [7, -168]]) k.lamp(x, z, 0.75);
    for (const [x, z] of [[-18, -160], [18, -162], [-30, -132], [30, -136], [-14, -122], [14, -124]]) bambooTorch(k, x, z, { h: r.range(2.8, 3.6) });
    k.supplies(-30, -184, 0.2, 6); k.supplies(30, -182, -0.3, 5); k.shieldRack(-40, -178, 0.4);

    // ---- Kiều's river posts (đồn): bamboo fences on three sides, a hut and a watchtower each (built in build(): they
    // burn), standards and the post's gear; open toward the road
    bambooFence(k, [[-40, -160], [-60, -160], [-60, -140], [-40, -140]]);
    bambooFence(k, [[38, -164], [60, -164], [60, -144], [38, -144]]);
    for (const [x, z] of [[-41, -158.4], [-41, -141.6], [39, -162.4], [39, -145.6]]) k.standard(x, z, 1.0, mats.foe, 7.4);
    k.supplies(-44, -158, 0, 5); k.supplies(44, -146, Math.PI, 5); k.shieldRack(-58.4, -146, Math.PI / 2); k.shieldRack(58.4, -158, -Math.PI / 2);
    for (const [x, z] of [[-44, -148], [43, -152]]) k.lamp(x, z, 0.6);

    // ---- the low hills round the landing: bamboo along the sand's edge, areca and banyan on the rises, tea further up
    for (let i = 0; i < 90; i++) {
      const x = r.range(-130, 130), z = r.range(-190, -110);
      if (!off(x, z, 2) || !dry(x, z) || k.inAt(x, z) < -30) continue;
      const f = k.inAt(x, z), q = r.next();
      if (f > -7) { if (q < 0.55) bamboo(k, x, z, { n: r.int(6, 10), h: r.range(7, 10) }); else if (q < 0.75) areca(k, x, z, r.int(8, 11)); }
      else if (q < 0.45) broadleaf(k, x, z, r.range(0.9, 1.3));
      else if (q < 0.55) banyan(k, x, z, r.range(0.8, 1.0));
    }

    // ---- Đồi trung du: paddies on the low ground, the tea-crowned hillock between the lanes, forest and tea on the
    // outer hills, the hamlet in its bamboo hedge
    paddy(k, [-48, -120, -26, -98], { cell: 5.5, rice: 0.7 });
    paddy(k, [30, -120, 48, -100], { cell: 5.5, rice: 0.7 });
    for (const [x, z] of [[-24, -96], [44, -96]]) haystack(k, x, z, 0.9);
    teaBushes(k, -1, -62, { rows: 9, len: 46, gap: 1.8, yaw: 0.05 });
    for (const [x, z, rows, len, yaw] of [[-70, -100, 6, 22, 0.6], [74, -96, 6, 20, -0.5], [-66, -24, 5, 18, -0.4], [70, -30, 6, 22, 0.5], [86, -70, 5, 20, 0.1]]) teaBushes(k, x, z, { rows, len, gap: 1.8, yaw });
    for (let i = 0; i < 260; i++) {
      const x = r.range(-140, 140), z = r.range(-118, 30);
      if (!off(x, z, 4) || (Math.abs(x + 1) < 16 && Math.abs(z + 62) < 26)) continue;   // (the tea hillock stays clipped)
      const f = k.inAt(x, z), q = r.next();
      if (f > -9 && q < 0.35) bamboo(k, x, z, { n: r.int(6, 10), h: r.range(7, 10) });
      else if (q < 0.7) broadleaf(k, x, z, r.range(0.9, 1.4));
    }
    // hamlet: two stilt houses, a banyan at the gate, areca palms, a little shrine, the bamboo hedge round its back
    stiltHouse(k, -60, -74, -Math.PI / 2, 1); stiltHouse(k, -61, -56, -Math.PI / 2, 1);
    banyan(k, -50, -66, 0.9);
    for (const [x, z] of [[-68, -66], [-66, -48], [-70, -80]]) areca(k, x, z, r.int(8, 10));
    haystack(k, -52, -50, 0.8); haystack(k, -50, -79, 0.7);
    shrine(k, -46, -84, Math.PI * 0.75, 1);
    bambooHedge(k, [[-50, -86], [-64, -84], [-74, -72], [-75, -56], [-68, -46], [-54, -44]], { gap: 2.2, h: 9 });
    for (const [x, z] of [[-52, -60], [-53, -71]]) k.lamp(x, z, 0.55);
    for (const [x, z] of [[-62, -64], [-56, -82]]) bambooTorch(k, x, z);
    // the lanes: Kiều standards, torch posts, burnt carts at the edges
    for (const [x, z] of [[-44, -104], [44, -108], [42, -80], [18, -72], [-18, -70], [-44, -50], [40, -44], [-30, -30], [32, -14]]) k.standard(x, z, 1.05, r.chance(0.25) ? mats.pennant : mats.foe, 7.8);
    k.cart(-36, -108, 0.6, true); k.cart(38, -28, 2.2);
    k.torchPosts(-116, 20);
    // the bamboo pass: the barricade, watchtowers on the flanks, a bamboo palisade along the rim, fires once it falls
    k.barricade('luytre');
    k.burn(-3, 4.6, 1.1, 'luytre'); k.burn(7, 3.8, 1.0, 'luytre');
    k.tower(-15, 2, 6, 1.3); k.tower(19, 6, 6.5, 1.35);
    bambooHedge(k, [[-26, -6], [-18, 8], [-20, 16]], { gap: 2, h: 8 }); bambooHedge(k, [[28, -4], [20, 8], [22, 16]], { gap: 2, h: 8 });
    for (const [x, z] of [[-11, -2], [15, -2]]) k.lamp(x, z, 0.7);

    // ---- Thành Phong Châu: rammed-earth ramparts terraced up the hill (outer, sides, inner, north), timber gatehouses
    // over both gates, archers on the walks, 矯 flags along the parapets
    const R = { h: 5.5, w: 6.5 };
    rampart(k, [[-48, OUTER_Z], [-6.5, OUTER_Z]], R); rampart(k, [[6.5, OUTER_Z], [48, OUTER_Z]], R);
    rampart(k, [[-47, OUTER_Z + 3], [-47, INNER_Z - 3]], R); rampart(k, [[47, OUTER_Z + 3], [47, INNER_Z - 3]], R);
    rampart(k, [[-48, INNER_Z], [-6, INNER_Z]], R); rampart(k, [[6, INNER_Z], [48, INNER_Z]], R);
    rampart(k, [[-47, INNER_Z + 3], [-47, 138]], R); rampart(k, [[47, INNER_Z + 3], [47, 138]], R);
    rampart(k, [[-48, 139], [-6, 139]], R); rampart(k, [[14.5, 139], [48, 139]], R);
    gatehouse(k, 0, OUTER_Z, 5.5, kieu); gatehouse(k, 0, INNER_Z, 5, kieu);
    k.barricade('ngoaithanh'); k.barricade('noithanh');
    k.burn(-3, OUTER_Z + 0.4, 1.2, 'ngoaithanh'); k.burn(3.5, OUTER_Z - 0.4, 1.0, 'ngoaithanh');
    k.burn(-2.5, INNER_Z + 0.3, 1.1, 'noithanh'); k.burn(3, INNER_Z - 0.3, 1.0, 'noithanh');
    for (const [x, z] of [[-9, 36], [9, 36], [-8, 106], [8, 106]]) k.lamp(x, z, 0.8);
    const walls = [[-46, OUTER_Z, -8, OUTER_Z], [8, OUTER_Z, 46, OUTER_Z], [-46, INNER_Z, -8, INNER_Z], [8, INNER_Z, 46, INNER_Z]];
    for (const [x0, z0, x1] of walls) for (let x = x0 + 4; x < x1 - 2; x += 9) k.flag(x, k.ground(x, z0) + R.h + 0.2, z0 + 1.2, 3, mats.pennant);
    const archers = [];
    for (const [x0, z0, x1] of walls) for (let x = x0 + 1; x < x1; x += 1.7) {
      if (r.chance(0.3)) continue;
      archers.push({ x: x + r.range(-0.3, 0.3), y: k.ground(x, z0) + R.h + 0.3, z: z0 - 0.6 + r.range(-0.3, 0.3), yaw: Math.PI + r.range(-0.3, 0.3), ph: r.range(0, 6.28) });
    }
    k.troops('foe', archers);
    // the approach: abatis of sharpened bamboo either side of the road, standards, torches
    for (const sx of [-1, 1]) bambooFence(k, [[sx * 14, 30], [sx * 40, 30]], { h: 1.8 });
    for (const [x, z] of [[-30, 20], [30, 22], [-38, 36], [38, 35]]) k.standard(x, z, 1.05, mats.foe, 7.8);
    // the outer bailey: huts along the walls, gear, drums, standards, braziers
    hut(k, -38, 60, Math.PI / 2, 1.05); hut(k, -38, 82, Math.PI / 2, 1.05); hut(k, 38, 70, -Math.PI / 2, 1.05);
    for (const [x, z, yaw] of [[-41, 70, Math.PI / 2], [41, 58, -Math.PI / 2], [41, 84, -Math.PI / 2], [-20, 93, Math.PI], [22, 93, Math.PI]]) k.supplies(x, z, yaw, r.int(5, 7));
    for (const [x, z, yaw] of [[-41.5, 52, Math.PI / 2], [41.5, 90, -Math.PI / 2]]) k.shieldRack(x, z, yaw);
    for (const [x, z] of [[-30, 70], [30, 76], [-14, 56], [16, 86]]) k.lamp(x, z, 0.6);
    for (const [x, z] of [[-40, 50], [40, 50], [-40, 92], [40, 92], [-12, 92], [12, 92]]) k.standard(x, z, 1.05, mats.foe, 8, [0, 70]);
    k.drum(-24, 92, Math.PI); k.drum(24, 92, Math.PI);
    // the inner court: (the hall and granary: build) bronze drums, the court's braziers and standards
    for (const [x, z, s] of [[-6, 128, 1.3], [8, 129, 1.1], [-12, 110, 1.0]]) bronzeDrum(k, x, z, r.range(0, 3), s);
    for (const [x, z] of [[10, 120], [-8, 132], [30, 110]]) k.lamp(x, z, 0.6);
    for (const [x, z] of [[-40, 106], [40, 106], [-40, 133], [40, 133]]) k.standard(x, z, 1.1, kieu, 8.5, [0, 120]);
    k.supplies(38, 112, -Math.PI / 2, 6); k.supplies(-38, 108, Math.PI / 2, 6); k.commandTable(14, 108, 0.3);
    // the stair: torches on both verges, reed-white pennants at the bends
    const stair = [[0, 130], [7, 142], [-3, 152], [0, 162]];
    for (let i = 0; i < stair.length - 1; i++) {
      const [ax, az] = stair[i], [bx, bz] = stair[i + 1], L = Math.hypot(bx - ax, bz - az), nx = (bz - az) / L, nz = -(bx - ax) / L;
      for (let d = 2; d < L; d += 6) for (const sd of [-1, 1]) {
        const x = ax + (bx - ax) * d / L + nx * sd * 7.2, z = az + (bz - az) * d / L + nz * sd * 7.2;
        if (k.inAt(x, z) > -0.4 || k.inAt(x, z) < -3.5) continue;
        k.fire(...k.brazier(x, z, 0.45));
      }
    }

    // ---- Đỉnh Nghĩa Lĩnh: the tam quan, the shrine on its terrace with the bronze drums, the 矯 banner, rim standards,
    // the forested mountain climbing on behind; (the beacon's fire: build)
    templeGate(k, 0, 167, 0, 1.3);
    shrineHall(k, SHRINE[0], SHRINE[1]);
    { const gy = k.ground(0, 196);
      for (const x of [-6.5, 6.5]) bronzeDrum(k, x, 197, r.range(0, 3), 1.7, gy + 1.2);
      for (const x of [-3, 3]) { props.push({ s: [0.5, 1.4, 0.5], p: [x, gy + 1.9, 195.6], c: 0x6a6258 }); k.fire(x, gy + 2.7, 195.6, 0.3, false); } }
    k.beaconTower(BEACON[0], BEACON[1]);
    { const x = -15, z = 195, gy = k.ground(x, z), P = 19;                       // the great 矯 banner
      poles.push({ s: [0.4, P, 0.4], p: [x, gy + P / 2, z], c: 0x2e1d15 }, { s: [5.6, 0.3, 0.3], p: [x + 2.6, gy + P - 0.5, z], c: 0x2e1d15 }, { s: [0.3, 1.4, 0.3], p: [x, gy + P + 0.7, z], c: 0xc9a040 });
      k.cloth(kieu, 5, 10, 'hang', x + 0.2, gy + P - 0.7, z, 0.1); }
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + 0.3, x = Math.sin(a) * 24, z = 184 + Math.cos(a) * 20;
      if (Math.abs(x) < 10 && z < 172) continue;                                     // the stair's arrival
      k.standard(x, z, 1.1, r.chance(0.3) ? mats.pennant : mats.foe, 8.5, [0, 184]);
    }
    for (const [x, z] of [[-8, 176], [8, 176], [-14, 186], [14, 184]]) k.lamp(x, z, 0.75);
    for (let i = 0; i < 520; i++) {                                                // Nghĩa Lĩnh: dark forest on every slope round the fort and summit
      const x = r.range(-145, 145), z = r.range(30, 226);
      if (!off(x, z, 3)) continue;
      if (Math.abs(x) < 52 && z > 36 && z < 144) continue;                         // the ramparts stand clear
      const q = r.next();
      if (q < 0.7) broadleaf(k, x, z, r.range(1.0, 1.6)); else if (q < 0.8) bamboo(k, x, z, { n: r.int(6, 9), h: r.range(8, 11) });
    }

    // ---- the field: wrecks, arrows, gear, the fallen; reserve armies off the walk field — Đinh on the landing's flanks,
    // Kiều on the hills, the fort's flanks and the mountain's shoulders; far fires: the Đinh camps across the river
    k.wrecks();
    k.arrows([-50, -186, 50, 136], 40);
    k.debris([-50, -186, 50, 140], 120);
    for (const [x, z, f] of [[-80, -176, 0.8], [80, -168, -0.8], [-86, -140, 1.2], [88, -132, -1.2]]) k.formation('ally', x, z, f, r.int(10, 14), r.int(5, 7));
    for (const [x, z, f] of [[-78, -70, 1.4], [82, -56, -1.4], [-70, 70, 1.5], [70, 80, -1.5], [-64, 118, 1.5], [66, 122, -1.5], [-34, 214, Math.PI], [34, 212, Math.PI]]) k.formation('foe', x, z, f, r.int(9, 13), r.int(4, 6));
    k.aftermath({ fallen: [[-50, 50, -180, -120, 16], [-40, 40, -110, -10, 14], [-40, 40, 48, 94, 12], [-18, 18, 170, 196, 8]],
      standards: [8, -50, -180, 50, 130] });
    k.farFires([[-90, -248], [-20, -252], [70, -246], [130, -200], [-140, -150], [140, 40], [-140, 60]], 2.8);
  },

  build(root, k) {
    return buildSet(root, k);
  },
};

// ---------------------------------------------------------------- dressing pieces (render-only boxes)
/** A timber gatehouse over a rampart gap at (x, z), half gap hw: a post-and-beam tower on the walk either side, a
 *  covered bridge across the gap 7 m up under a thatched saddle roof, the 矯 drape on its front. */
function gatehouse(k, x, z, hw, mat) {
  const gy = k.ground(x, z - 6), L = localQ(k.props, x, gy, z, 0), WOOD = 0x3e2a1c, DARK = 0x2a1c12;
  for (const sx of [-1, 1]) {
    const cx = sx * (hw + 2.4);
    for (const px of [-1.6, 1.6]) for (const pz of [-1.6, 1.6]) L(cx + px, 5, pz, [0.42, 10, 0.42], WOOD);
    L(cx, 5.8, 0, [4, 0.3, 4], DARK); L(cx, 7.4, -1.9, [4, 1.2, 0.18], 0x5a4030);
    for (let i = 0; i < 4; i++) L(cx, 9.9 + i * 0.45, 0, [4.8 - i * 1.1, 0.46, 4.8 - i * 0.8], shade(0x7a6640, 1 - i * 0.06));   // thatched cap
  }
  L(0, 7.3, 0, [2 * hw + 6.6, 0.5, 2.6], DARK);                                     // the bridge deck over the gap
  L(0, 8.3, -1.2, [2 * hw + 6.6, 1.5, 0.16], 0x5a4030);
  for (let i = 0; i < 4; i++) L(0, 9.3 + i * 0.4, 0, [2 * hw + 7.4 - i * 0.4, 0.42, 3.6 - i * 0.75], shade(0x80683e, 1 - i * 0.05));
  for (const sx of [-1, 1]) L(sx * (hw + 4.6), 11, 0, [0.3, 0.3, 2.2], 0x4a3220, [0, 0, sx * 0.6]);   // upswept ridge ends
  k.cloth(mat, 3, 4.6, 'drape', x - 1.5, gy + 8.9, z - 1.35, Math.PI);
}

/** The shrine (đền) on the summit: a stone terrace with steps, red columns, plank walls and a two-tier dark-tile roof
 *  with upswept ridge ends; lanterns under the eaves. Faces −Z (toward the tam quan). */
function shrineHall(k, x, z) {
  const gy = k.ground(x, z - 6), L = localQ(k.props, x, gy, z, Math.PI), RED = 0x8a2418, TILE = 0x3a302c;
  L(0, 0.6, 0, [18, 1.2, 11], 0x6a6258);
  for (let q = 0; q < 3; q++) L(0, 0.2 + q * 0.2, 6 + q * -0.45 + 0.9, [7, 0.4 + q * 0.4, 1.2], shade(0x5e564e, 1 + q * 0.04));   // steps (local +z = world −z)
  for (const cx of [-6, -2, 2, 6]) for (const cz of [-3.5, 3.5]) L(cx, 3.4, cz, [0.6, 4.4, 0.6], RED);
  L(0, 3.0, -3.2, [13, 3.6, 0.3], 0x4a3020); for (const sx of [-1, 1]) L(sx * 6.4, 3.0, 0, [0.3, 3.6, 6.6], 0x4a3020);
  L(0, 2.8, 3.55, [3, 3.0, 0.1], 0x1a120c);                                         // the open front bay, dark within
  const roof = (y, w, d, h) => {
    for (let i = 0; i < 4; i++) L(0, y + h * i / 4 + h / 8, 0, [w * (1 - i * 0.18), h / 4 + 0.04, d * (1 - i * 0.22)], shade(TILE, 1 - i * 0.06));
    L(0, y + h + 0.2, 0, [w * 0.42, 0.36, 0.5], shade(TILE, 0.8));
    for (const sx of [-1, 1]) L(sx * w * 0.22, y + h + 0.6, 0, [0.36, 0.8, 0.36], 0x5a4a40, [0, 0, -sx * 0.6]);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) L(sx * w * 0.5, y + 0.3, sz * d * 0.5, [0.36, 0.6, 0.36], shade(TILE, 0.85), [sz * 0.5, 0, -sx * 0.5]);
  };
  roof(5.6, 16, 10.5, 1.6); roof(7.6, 9.5, 6.5, 1.6);
  L(0, 7.1, 0, [8.6, 1.0, 5.6], 0x4a3020);
  L(0, 5.0, 4.2, [3.4, 0.9, 0.1], 0x2a1a10);                                         // name board
  for (const lx of [-4.5, -1.5, 1.5, 4.5]) k.lantern(x + lx, gy + 5.0, z - 5.4, 1.0);
}

// ---------------------------------------------------------------- set pieces (build)
// burnable voxels (as 赤壁's fleet): every box carries b = group × 4 + kind (0 wood: chars with glowing seams, 1 thatch:
// burns away in holes with a glowing rim); uB[group] (0 … 1) is that group's burn, written by update()
const burnGeometry = (boxes) => {
  const g = boxesGeometry(boxes), a = [];
  for (const b of boxes) for (let n = (6 - (b.skip?.length || 0)) * 4; n--;) a.push(b.b);
  g.setAttribute('aB', new THREE.Float32BufferAttribute(a, 1));
  return g;
};
const BURN_T = { value: 0 };
function burnMaterial(uB) {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, flatShading: true });
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uB = uB; sh.uniforms.uT = BURN_T;
    sh.vertexShader = sh.vertexShader.replace('#include <common>', `#include <common>
      attribute float aB; uniform float uB[${uB.value.length}]; varying float vBurn; varying float vKind; varying vec3 vBp;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
      vBurn = uB[int(aB * 0.25)]; vKind = mod(aB, 4.0); vBp = (modelMatrix * vec4(transformed, 1.0)).xyz;`);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
      uniform float uT; varying float vBurn; varying float vKind; varying vec3 vBp;
      ${NOISE_GLSL}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
      float bn = dwNoise(vBp.xz * 0.35 + vBp.y * 0.3) * 0.65 + dwNoise(vBp.xy * 0.9 + vBp.z * 0.7) * 0.35;
      float thatch = step(0.5, vKind) * step(vKind, 1.5), wood = step(vKind, 0.5);
      float hole = vBurn * 1.1 - 0.12;
      if (thatch > 0.5 && bn < hole) discard;
      float charK = smoothstep(0.0, 0.8, vBurn * 1.3 - bn * 0.5);
      diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.05, 0.035, 0.03), charK * 0.92);`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
      float fl = 0.75 + 0.25 * sin(uT * 9.0 + bn * 20.0) * sin(uT * 5.3 + vBp.x);
      float live = vBurn * (1.0 - smoothstep(0.85, 1.0, vBurn) * 0.5);
      float crack = pow(max(0.0, dwNoise(vBp.xz * 1.3 + vBp.y * 0.9 + uT * 0.25) - 0.55) / 0.45, 3.0) * charK;
      totalEmissiveRadiance += vec3(1.0, 0.32, 0.06) * (wood * (crack * 1.6 + 0.1 * charK) * live + thatch * (1.0 - smoothstep(hole, hole + 0.14, bn)) * 4.0 * step(0.01, vBurn)) * fl;`);
  };
  m.customProgramCacheKey = () => 'phongchau-burn|' + uB.value.length;
  return m;
}
function glowTex() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64;
  const g = cv.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,0.4)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(cv);
}

// groups of the burnable mesh
const G_OUTW = 0, G_OUTE = 1, G_HALL = 2, G_GRAN = 3;

function buildSet(root, k) {
  const sites = k.sites;
  const park = (x, y, z, i, d) => { const s = { x: 9e3, y, z: 9e3, i: 0, d, k: 0, at: [x, z], full: i }; sites.push(s); return s; };
  const place = (s, on, f = 1) => { s.x = on ? s.at[0] : 9e3; s.z = on ? s.at[1] : 9e3; s.i = s.full * f; };
  const st = { burnW: -1e9, burnE: -1e9, hall: -1e9, beacon: -1e9, ram: -1e9, dawn: -1e9 };
  const since = (key) => (st[key] > -1e8 ? T - st[key] : -1);                    // s since that set fired (−1: not yet)
  const on = (key, delay = 0) => () => since(key) >= delay;
  let T = 0;

  // ---- burnable houses: the posts (hut + watchtower each), Kiều's long hall and the granary
  const box = [];
  const grab = (group, fn, thatchAbove = Infinity) => {
    const n0 = k.props.length; fn();
    for (const b of k.props.splice(n0)) { b.b = group * 4 + (b.p[1] > thatchAbove ? 1 : 0); box.push(b); }
  };
  grab(G_OUTW, () => hut(k, -54, -146, Math.PI / 2, 1.1), k.ground(-54, -146) + 2.3);
  grab(G_OUTW, () => k.tower(-55, -156, 6.5, 1.25));
  grab(G_OUTE, () => hut(k, 53, -150, -Math.PI / 2, 1.1), k.ground(53, -150) + 2.3);
  grab(G_OUTE, () => k.tower(53, -160, 6.5, 1.25));
  { const gy = k.ground(...HALL);
    grab(G_HALL, () => dongSonHouse(k.props, HALL[0], gy, HALL[1], Math.PI / 2, 1.3, { roof: 0x8a7448, wood: 0x4a3220, wall: 0x8a6c44 }), gy + 4.5); }
  { const gy = k.ground(...GRANARY);
    grab(G_GRAN, () => dongSonHouse(k.props, GRANARY[0], gy, GRANARY[1], -Math.PI / 2, 0.9, { roof: 0x9a8250, wood: 0x4a3220, wall: 0x9a7c4c }), gy + 3.4); }
  const uB = { value: [0, 0, 0, 0] };
  const houses = new THREE.Mesh(burnGeometry(box), burnMaterial(uB));
  houses.castShadow = true; houses.receiveShadow = true; houses.name = 'phongchau-houses';
  root.add(houses);
  // their fires (the dressing's fire system, switched by the set clock) and parked light sites
  const sW = park(-50, 3, -150, 60, 22), sE = park(50, 3, -154, 60, 22), sH = park(HALL[0] + 4, 5, HALL[1], 80, 28), sG = park(GRANARY[0], 4, GRANARY[1], 50, 20);
  for (const [x, z, y, s, d] of [[-54, -146, 3.6, 1.3, 0], [-55, -156, 6.8, 1.0, 1.2], [-58, -150, 1.2, 0.9, 2.0], [-44, -160, 1.0, 0.8, 2.6]]) k.fire(x, k.ground(x, z) + y, z, s, s >= 1.3, on('burnW', d));
  for (const [x, z, y, s, d] of [[53, -150, 3.6, 1.3, 0], [53, -160, 6.8, 1.0, 1.2], [58, -154, 1.2, 0.9, 2.0], [44, -164, 1.0, 0.8, 2.6]]) k.fire(x, k.ground(x, z) + y, z, s, s >= 1.3, on('burnE', d));
  for (let i = 0; i < 7; i++) { const x = HALL[0] - 7 + i * 2.4, z = HALL[1] + (i % 2 ? 2 : -2); k.fire(x, k.ground(x, z) + 7 + (i % 3), z, 1.2 + (i % 3) * 0.25, i % 3 === 0, on('hall', i * 0.5)); }
  for (let i = 0; i < 3; i++) { const x = GRANARY[0] - 2.5 + i * 2.5; k.fire(x, k.ground(x, GRANARY[1]) + 5.5, GRANARY[1], 1.1, i === 1, on('hall', 2 + i * 0.6)); }

  // ---- the great beacon on the summit: its fire, a far-carrying halo (unfogged: the goal reads from the landing), a site
  const by = k.ground(...BEACON) + 4.65;
  k.fire(BEACON[0], by, BEACON[1], 3.6, true, on('beacon'));
  for (const [dx, dz] of [[-0.8, 0.5], [0.7, -0.6]]) k.fire(BEACON[0] + dx, by + 0.4, BEACON[1] + dz, 2.2, false, on('beacon', 0.6));
  const glowT = glowTex();
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowT, color: 0xff7a2a, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, fog: false }));
  halo.position.set(BEACON[0], by + 3, BEACON[1]); halo.scale.set(34, 30, 1); halo.visible = false; halo.name = 'beacon-halo';
  root.add(halo);
  const sB = park(BEACON[0], 6, BEACON[1], 90, 40);

  // ---- the Đinh battering ram (xe phá thành): a roofed timber frame on four wheels, the log slung from chains, eight
  // soldiers at the push bars; parked down the approach until 'ram', then rolled up to the outer gate, swinging
  const ram = new THREE.Group(), rb = [], RL = localQ(rb, 0, 0, 0, 0), WOOD = 0x4a3220, DARK = 0x2a1a10;
  for (const sx of [-1, 1]) {
    for (const lz of [-2.6, 2.6]) RL(sx * 1.6, 0.6, lz, [0.3, 1.2, 1.2], DARK, [Math.PI / 4, 0, 0]);            // wheels
    RL(sx * 1.5, 1.0, 0, [0.3, 0.3, 6.4], WOOD);                                                                 // sills
    for (const lz of [-2.6, 0, 2.6]) RL(sx * 1.5, 2.5, lz, [0.28, 3.0, 0.28], WOOD);                             // uprights
  }
  RL(0, 4.0, 0, [3.4, 0.3, 6.6], WOOD);
  for (let i = 0; i < 4; i++) RL(0, 4.3 + i * 0.32, 0, [4.0 - i * 0.85, 0.34, 7.0], shade(0x7a6640, 1 - i * 0.06));   // hide-and-thatch roof
  for (const sx of [-1, 1]) RL(sx * 1.6, 1.4, -3.6, [0.16, 0.16, 1.4], WOOD);                                  // push bars
  const frame = new THREE.Mesh(boxesGeometry(rb), lit());
  frame.castShadow = true; ram.add(frame);
  const log = new THREE.Group(), lb = [];
  lb.push({ s: [0.8, 0.8, 7.4], p: [0, -1.6, 0.4], c: 0x5a3a24 }, { s: [1.0, 1.0, 0.9], p: [0, -1.6, 4.3], c: 0x6a5a3a },   // the bronze-capped head
    { s: [0.1, 1.6, 0.1], p: [0, -0.8, -1.8], c: 0x3a3a3a }, { s: [0.1, 1.6, 0.1], p: [0, -0.8, 2.2], c: 0x3a3a3a });
  const logMesh = new THREE.Mesh(boxesGeometry(lb), lit());
  logMesh.castShadow = true; log.add(logMesh); log.position.set(0, 3.8, 0); ram.add(log);
  const band = parseInt(k.army.ally.flag.slice(1), 16), men = new THREE.InstancedMesh(figureGeometry(band, 0x3a3428), lit(), 8);
  const m4 = new THREE.Matrix4(), q4 = new THREE.Quaternion(), v4 = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1);
  const SPOTS = [[-2.3, -2.4], [2.3, -2.4], [-2.3, 0], [2.3, 0], [-2.3, 2.2], [2.3, 2.2], [-0.8, -4.2], [0.8, -4.2]];
  men.name = 'ram-crew'; ram.add(men);
  ram.name = 'ram'; root.add(ram);
  const RAM0 = [RAM[0] - 22, 12], RAM1 = [RAM[0], OUTER_Z - 5.6];                 // parked by the pass road → at the gate

  // ---- dawn: a rose-gold glow rising behind the mountain to the east-north-east, the night haze lifting to blue-grey
  const dawnMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, transparent: true, blending: THREE.AdditiveBlending,
    uniforms: { uDawn: { value: 0 } },
    vertexShader: 'varying vec3 vDir; void main() { vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position.z = gl_Position.w * 0.99999; }',
    fragmentShader: `uniform float uDawn; varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir); float h = d.y;
        float az = max(dot(normalize(d.xz + vec2(1e-4)), normalize(vec2(0.86, 0.5))), 0.0);
        float band = exp(-max(h, 0.0) * 9.0) * (0.35 + 0.65 * pow(az, 3.0));
        vec3 c = mix(vec3(0.55, 0.22, 0.12), vec3(0.95, 0.62, 0.3), pow(az, 6.0) * exp(-max(h, 0.0) * 18.0));
        vec3 sky = vec3(0.05, 0.07, 0.13) * smoothstep(-0.05, 0.6, h);           // the zenith lifts from ink to slate
        gl_FragColor = vec4((c * band * 0.9 + sky) * uDawn, 1.0);
      }`,
  });
  const dawn = new THREE.Mesh(new THREE.SphereGeometry(860, 32, 16), dawnMat);
  dawn.frustumCulled = false; dawn.renderOrder = -0.8; dawn.visible = false; dawn.name = 'dawn';
  root.add(dawn);
  const DAWN_HAZE = new THREE.Color(0x3a3c58), DAWN_HEMI = new THREE.Color(0x8a90b8);
  let saved = null;                                                                 // the shell's night values, while dawn is up

  const sets = {
    beacon() { if (st.beacon < -1e8) st.beacon = T; },
    burnW() { if (st.burnW < -1e8) st.burnW = T; },
    burnE() { if (st.burnE < -1e8) st.burnE = T; },
    burn() { if (st.hall < -1e8) st.hall = T; },
    ram() { if (st.ram < -1e8) st.ram = T; },
    dawn() { if (st.dawn < -1e8) st.dawn = T; },
  };
  let lastFrame = 0, free = false;
  const restore = () => {
    const sc = root.parent;
    if (saved && sc) { sc.fog.color.copy(saved.fog); sc.background.copy(saved.bg); saved.hemi.color.copy(saved.hc); saved.hemi.intensity = saved.hi; }
    saved = null;
  };
  const reset = () => { for (const key in st) st[key] = -1e9; restore(); free = false; };
  return {
    sets,
    update(dt, game) {
      T += dt; BURN_T.value = T;
      if (game.frame < lastFrame) reset();                                          // a new battle
      lastFrame = game.frame;
      if (game.mode !== 'story' && !free) { free = true; st.burnW = st.burnE = st.hall = T - 60; st.beacon = T - 30; }   // free: the burning night
      // houses burn 0 → 1 over ≈ 14 s from their set; light sites follow, dying down toward the end
      const b = (key, dur = 14) => Math.min(1, Math.max(0, since(key) / dur));
      uB.value[G_OUTW] = b('burnW'); uB.value[G_OUTE] = b('burnE'); uB.value[G_HALL] = b('hall', 20); uB.value[G_GRAN] = b('hall', 16);
      const fl = 0.85 + 0.15 * Math.sin(T * 9) * Math.sin(T * 13.7);
      for (const [s, key, dur] of [[sW, 'burnW', 14], [sE, 'burnE', 14], [sH, 'hall', 20], [sG, 'hall', 16]]) { const v = b(key, dur); place(s, v > 0, Math.min(1, v * 4) * (1 - v * 0.3) * fl); }
      const bt = since('beacon'), lit = bt >= 0;
      place(sB, lit, Math.min(1, bt / 2) * fl);
      halo.visible = lit; halo.material.opacity = lit ? Math.min(1, bt / 2) * (0.75 + 0.25 * fl) : 0;
      // the ram: hidden until called (story) — parked by the road in free mode — then 8 s up the approach, swinging
      const rt = since('ram'), open = GATES.ngoaithanh?.open;
      ram.visible = free || rt >= 0;
      const u = free ? 0 : Math.min(1, Math.max(0, rt / 8)), e = u * u * (3 - 2 * u);
      const rx = RAM0[0] + (RAM1[0] - RAM0[0]) * e, rz = RAM0[1] + (RAM1[1] - RAM0[1]) * e;
      ram.position.set(rx, k.ground(rx, rz), rz); ram.rotation.y = free ? 0.5 : 0;
      const swing = !free && u >= 1 && !open ? Math.sin((rt - 8) * 3.6) : 0;
      log.rotation.x = swing * 0.42;
      for (let i = 0; i < SPOTS.length; i++) {
        const [sx, sz] = SPOTS[i], bob = u > 0 && u < 1 ? Math.abs(Math.sin(T * 6 + i)) * 0.1 : 0;
        men.setMatrixAt(i, m4.compose(v4.set(sx + (i < 6 ? (sx < 0 ? -0.6 : 0.6) : 0), bob, sz - swing * 0.3 * (i >= 6 ? 0 : 1)), q4.identity(), one));
      }
      men.instanceMatrix.needsUpdate = true;
      // dawn over ≈ 7 s: the glow band, the haze and the sky light lift (the shell's values come back on a new battle)
      const dv = since('dawn') >= 0 ? sm(0, 7, since('dawn')) : 0, sc = root.parent;
      dawn.visible = dv > 0; dawnMat.uniforms.uDawn.value = dv;
      if (dv > 0 && sc) {
        if (!saved) { const hemi = sc.children.find((o) => o.isHemisphereLight); saved = { fog: sc.fog.color.clone(), bg: sc.background.clone(), hemi, hc: hemi.color.clone(), hi: hemi.intensity }; }
        sc.fog.color.copy(saved.fog).lerp(DAWN_HAZE, dv * 0.8); sc.background.copy(saved.bg).lerp(DAWN_HAZE, dv * 0.8);
        saved.hemi.color.copy(saved.hc).lerp(DAWN_HEMI, dv); saved.hemi.intensity = saved.hi * (1 + 0.35 * dv);
      }
    },
  };
}
