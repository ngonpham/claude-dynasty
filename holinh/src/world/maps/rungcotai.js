// Rừng Có Tai (979, the first week after the king's death) laid out along +Z, ≈ 390 m from the west gate of Hoa Lư to a
// rock shelter under a karst cliff — the west mountain road An Nhiên takes in her father's place, in rain ([SƯƠNG]:
// indigo-grey mist, silver rim light, wet greens, mud). A DW stage of chokepoints the hunters chose: the mud road pinched
// between karst walls, the ambush slope under a ridge, the felled-tree barricade, the false trail east, the ravine ford
// that floods, the forest where the riders come down.
//   Cổng tây Hoa Lư      the west gate          z -206 … -158  h 0    rampart + gatehouse behind (one leaf ajar, white
//                                                               mourning drapes, 丁 banners), the convoy's coffin carts
//                                                               under straw mats, bearers' torches; story start
//   Đường bùn vách đá    the mud road           z -162 …  -96  h 0    a 16-18 m road in a karst canyon (rise 26), ruts and
//                                                               puddles, a glade at the bend where Thầy Mo's bell post
//                                                               stands (anchor 'meet' / 'bell': the two meet here)
//   Sườn núi phục binh   the ambush slope       z -104 …  -26  h 0→6.5  flat on the west, climbing east to a ridge top
//                                                               (x ≥ 34, h 6.5): the hunters' archers, three log piles
//                                                               held by trap lines (build: threads, sets 'cut1-3' /
//                                                               'cutall'); the carts halted on the flat ('carts')
//   (neck)               z -34 … -12, x ±7: the felled-tree barricade, gate 'raoda' (z -22)
//   Bãi rừng             the forest clearing    z  -18 …   50  h 0    broadleaf, bamboo and banana round a wide clearing;
//                                                               the escort halt ('halt'), the too-perfect footprints
//                                                               ('tracks') running east into …
//   Lối mòn phía đông    the false trail        x 34 … 81, z ≈ 26, h 0→1.2   a path to a blind pocket under the karst,
//                                                               a fake bivouac (the decoy, anchor 'decoy')
//   Khe suối             the ravine             z   46 …  124  h 0    karst walls (rise 24), the stream across it (water
//                                                               along x, z ≈ 86) with a stony ford x ±6 ('ford'); the
//                                                               lead cart on the north bank under a big tree ('cart2');
//                                                               the bearers' fire where the thread is read ('fire')
//   Rừng trên khe        the north forest       z  120 …  172  h 0    Hồng Diễm's riders come down here ('duel')
//   Mái đá               the rock shelter       z  171 …  197  h 0    an overhang under the cliff, a dry floor, a fire
//                                                               (lit by set 'calm'), reed plumes, storks over the karst
// Sets (story `set`): 'cut1' 'cut2' 'cut3' / 'cutall' — the trap lines on the ridge are cut · 'flood' — the stream
// rises, brown and fast, over the ford · 'tree' — the big tree on the north bank falls across the lead cart · 'free' —
// the cart is dragged clear, the tree rolls off · 'ink' — the bearers' fire is lit (the thread is held over it) ·
// 'calm' — the rain thins, the shelter fire is lit. A new battle resets them all. Rain: dodong's streaks round the hero.
// Format: src/world/maps/index.js header; helpers: ../viet.js (十二使君's kit + this story's coffins, threads, storks).
import * as THREE from 'three';
import { boxesGeometry, shade } from '../../../../src/core/voxel.js';
import { makeRng, hash01 } from '../../../../src/core/rng.js';
import { lit } from '../../../../src/world/castle.js';
import { ground, smooth, walkIn, waterD, routeDist } from '../../../../src/world/map.js';
import { WIND } from '../../../../src/world/dressing.js';
import {
  bamboo, bambooScreen, broadleaf, banana, karstRange, karst, rampart, gateHouse, stump, reedFlags, bambooTorch, shrine,
  coffinCart, coffin, bellPost, storkFlock, stork, reedPlumes, threadLine,
} from '../viet.js';

const GATE_Z = -201;                                      // the west gate's rampart line (behind the start)
const RIDGE_H = 6.5;                                      // the ambush ridge's top above the road
/** The ambush slope: flat on the west, climbing to the ridge top from x 16 to x 34. */
const SLOPE = (x) => RIDGE_H * smooth(16, 34, x);
const RZ = (x) => 86 + 2.5 * Math.sin(x * 0.06 + 0.5);   // the stream's centre line z(x)
const HW = 6.5, WY = -0.2;                                // its deep half width, surface
const TREE = [-16.5, 104];                                // the big tree on the north bank (falls east onto the cart)
const CART2 = [-6, 102];                                  // the lead cart that crossed first
const FIRE = [9, 113], SHELTER = [0, 186], HEARTH = [2, 188];
// the convoy's carts on the walk field [x, z, yaw, o] (yaw π: shafts toward +Z, the way they roll)
const CARTS = [[-11, -178, Math.PI, {}], [10, -172, Math.PI, {}], [-11, -150, Math.PI - 0.1, {}],
  [-12, -66, Math.PI + 0.35, {}], [-3, -58, Math.PI - 0.2, {}], [-21, -76, Math.PI + 0.9, { broken: true, coffin: false }],
  [-15, 6, Math.PI + 0.2, {}], [-5, 12, Math.PI - 0.15, {}],
  [CART2[0], CART2[1], Math.PI + 0.1, {}], [-10, 190, Math.PI / 2, { mat: false }]];
const cfoot = ([x, z]) => [x - 2.2, z - 3, x + 2.2, z + 3];
// the three trap lines: log piles on the ridge's lip held by stakes, the thread run from the pile across the ridge top
const LOGS = [[37.5, -84], [38.5, -62], [37.5, -42]];
const TRAPS = [[[37.6, -81.6], [41, -82], [45, -84.5], [50, -83], [55, -85], [59, -84]],
  [[38.6, -59.6], [42, -60], [47, -62.5], [52, -61], [57, -63.5], [60, -62]],
  [[37.6, -39.6], [41, -40], [45, -38], [50, -40.5], [55, -39], [58, -41]]];

export default {
  id: 'rungcotai',
  name: { zh: 'Rừng Có Tai', en: 'The Forest Has Ears' },
  grid: [-124, -228, 124, 228],
  pieces: [
    { id: 'cong', rect: [-26, -206, 26, -158], h: 0, edge: 2, rise: 12 },
    { id: 'duong', path: [[0, -164, 9, 0], [-6, -146, 8, 0], [-5, -126, 8.5, 0], [3, -108, 9, 0], [2, -96, 10, 0]], rise: 26 },
    { id: 'glade', ell: [-6, -125, 12, 9], h: 0, edge: 1.5, rise: 22 },
    { id: 'phuc', rect: [-34, -104, 60, -26], h: SLOPE, edge: 2, rise: 10 },
    { id: 'neck', path: [[0, -34, 7, 0], [0, -12, 7, 0]], rise: 7 },
    { id: 'bairung', rect: [-40, -18, 40, 50], h: 0, edge: 2.5, rise: 9 },
    { id: 'loidong', path: [[34, 26, 6, 0], [50, 26, 5.5, 0.6], [62, 26, 5.5, 1.2]], rise: 7 },
    { id: 'hocdong', ell: [71, 26, 10, 9], h: 1.2, edge: 1.5, rise: 12 },
    { id: 'khe', rect: [-24, 46, 24, 124], h: 0, edge: 2, rise: 24 },
    { id: 'rungbac', rect: [-36, 120, 36, 172], h: 0, edge: 2.5, rise: 12 },
    { id: 'maida', ell: [0, 184, 18, 13], h: 0, edge: 1.5, rise: 34 },
  ],
  props: [
    [-64, GATE_Z - 3.5, 64, GATE_Z + 3.5],                                               // the rampart and gatehouse
    ...CARTS.map(cfoot),
    [-14.6, -121, -11.4, -119],                                                          // Thầy Mo's bell post
    ...LOGS.map(([x, z]) => [x - 1.4, z - 3.4, x + 1.4, z + 3.4]),                       // the log piles on the ridge lip
    [TREE[0] - 1.4, TREE[1] - 1.4, TREE[0] + 1.4, TREE[1] + 1.4],                         // the big tree's trunk
    [-20, 2, -17, 5],                                                                    // the roadside shrine in the clearing
  ],
  zones: [
    { id: 'conghoalu', name: { zh: 'Cổng tây Hoa Lư', en: 'West Gate of Hoa Lư' }, x: 0, z: -182, w: 52, d: 48 },
    { id: 'duongbun', name: { zh: 'Đường bùn vách đá', en: 'Mud Road in the Karst' }, x: -2, z: -129, w: 32, d: 62 },
    { id: 'dauphuc', name: { zh: 'Sườn núi phục binh', en: 'The Ambush Slope' }, x: 13, z: -65, w: 94, d: 78 },
    { id: 'bairung', name: { zh: 'Bãi rừng', en: 'Forest Clearing' }, x: 0, z: 16, w: 80, d: 68 },
    { id: 'loidong', name: { zh: 'Lối mòn phía đông', en: 'The East Trail' }, x: 66, z: 26, r: 15 },
    { id: 'khesuoi', name: { zh: 'Khe suối', en: 'The Ravine' }, x: 0, z: 85, w: 48, d: 74 },
    { id: 'rungbac', name: { zh: 'Rừng trên khe', en: 'Forest above the Ravine' }, x: 0, z: 146, w: 72, d: 52 },
    { id: 'maida', name: { zh: 'Mái đá', en: 'The Rock Shelter' }, x: 0, z: 184, r: 14 },
  ],
  route: [[0, -192], [0, -164], [-6, -146], [-5, -126], [3, -108], [2, -96], [-2, -80], [0, -60], [0, -40], [0, -22], [0, -4],
    [0, 16], [0, 36], [0, 56], [0, 74], [0, 86], [0, 98], [0, 112], [0, 130], [0, 150], [0, 170], [0, 182]],
  gates: {
    // the hunters' abatis of felled trunks across the neck out of the ambush slope
    raoda: { rect: [-10, -24, 10, -20], name: { zh: 'Rào cây chắn đường', en: 'Felled-Tree Barricade' }, kind: 'barricade', at: [0, -22, 0, 7.5] },
  },
  // gate: the west gate · meet: the glade at the road's bend · bell: Thầy Mo's bell post · carts: the halted carts on the
  // ambush slope's flat · trap1-3: the trap lines' stakes on the ridge top · ridge: the ridge top's middle · abatis: the
  // barricade · halt: the escort halt in the clearing · tracks: the footprints' start · decoy: the false bivouac · ford:
  // the ford's middle · cart2: the lead cart under the tree · fire: the bearers' fire · duel: the north forest · shelter
  anchors: { gate: [0, GATE_Z], meet: [-5, -126], bell: [-13, -120], carts: [-7, -62], trap1: [42, -82], trap2: [43, -60], trap3: [42, -38],
    ridge: [46, -61], abatis: [0, -22], halt: [-9, 2], tracks: [12, 22], decoy: [71, 26], ford: [0, 86], cart2: CART2, fire: FIRE,
    duel: [0, 150], shelter: SHELTER },
  // story: just outside the gate, the road running into the rain between the karst walls; free: the forest clearing
  spawn: { story: { x: 0, z: -190, yaw: 0, tilt: -0.06 }, free: { x: 0, z: 14, yaw: 0 } },
  water: { along: 'x', c: RZ, dc: (x) => 2.5 * 0.06 * Math.cos(x * 0.06 + 0.5), hw: HW, bed: [1.5, 0.3], y: WY,
    fords: [[-6, 6, 0.3]], stones: 26, tint: { deep: 0x1e2622, shallow: 0x4a5244, sun: [0.7, 0.78, 0.9] } },
  // rain on the mountains: a pale silver sun lost in the cloud deck up the road (north), indigo-grey haze close in
  sky: {
    sunElev: 0.16, sunAz: 0.1, sunCore: [1.5, 1.6, 1.8],
    haze: 0x5a6478, hazeWarm: 0x6a7084, glow: 0x9aa6bc, skyMid: 0x4a5468, skyTop: 0x1c2232,
    hznSun: 0xb4c0d0, hznAway: 0x4c5668, cloudRose: 0x5c6476, cloudShade: 0x1e2430, cloudLit: 0xa8b4c6,
    dust: [8, 38, 1.5, 0.08], dustLit: 0x7a8496, dustShade: 0x2e3444, apCool: 0x5a6888,
  },
  fog: [20, 190],
  light: { hemi: [0x8a98b4, 0x3a4430, 2.5], sun: [0xd0dcf0, 1.7], rim: [0xd8e2f4, 1.6], dir: [0.2, 0.62, 0.78], fire: 0xff8a40,
    fill: [-400, -390, 0.6] },
  post: { exposure: 1.6, sat: 1.0, bloom: 0.6, rays: 0.25, rayTint: [0.82, 0.9, 1.1], shadowTint: [0.85, 0.95, 1.2], highTint: [0.95, 1.0, 1.08] },
  castle: null,
  terrain: {
    pave: (x, z) => -0.6 + (Math.hypot(x - SHELTER[0], z - SHELTER[1]) < 9 ? 0.5 : 0),     // mud; the shelter's dry floor
    bare: (x, z) => routeDist(x, z) < 4.2 || Math.hypot(x - 71, z - 26) < 8 || (z > 176 && Math.abs(x) < 14),
    rock: (h, x, z) => h - 2.5 - (z > -106 && z < -24 ? SLOPE(x) : 0) - (x > 40 && z > 14 && z < 38 ? 1.2 : 0),
    rubble: [-30, -100, 30, 170],
    pines: [-200, 220],                                                                     // wooded shoulders all along, thicker north
    cliff: { rock: 0x7c7a72, dark: 0x464844, top: 0x3a5a2e, moss: 0x30502a, grassy: 0x44602e },  // wet karst, moss, forest tops
    mountains: { peakA: 0.15, peak: 24 },
  },
  fires: [],
  // firelight: the gate's torches and lamps, the convoy's bamboo torches at the halts
  lightSites: [[-6.5, 3.4, GATE_Z + 3.5, 26, 11], [6.5, 3.4, GATE_Z + 3.5, 26, 11], [-8, 3.4, -168, 22, 10], [8, 3.4, -160, 22, 10],
    [-10, 3.4, -126, 20, 10], [-13, 3.4, -56, 20, 10], [-20, 3.4, 10, 20, 10]],
  hq: [0, 150],

  dress(k) {
    const { r, mats, props, shade: sh } = k;
    const dinh = k.banner('丁', { bg: '#7a1c14', fg: '#f2d68a', border: '#2e0c08', w: 128, h: 256, seed: 41 });
    const tang = k.banner('', { bg: '#e8e2d6', fg: '#000', border: '#c8c0b0', w: 96, h: 256, tatter: false, seed: 42 });   // mourning white
    const truy = k.banner('追', { bg: '#2a1838', fg: '#d8c8a0', border: '#120a18', w: 96, h: 192, seed: 43 });
    const R = (a, b) => r.range(a, b);

    // ---- Cổng tây Hoa Lư: the rampart into the karst on both sides, the gatehouse, one leaf ajar (opened just enough
    // for one rider), white mourning drapes over the 丁 banners, lamps, the convoy's carts and torches
    rampart(k, [[-70, GATE_Z], [-6.6, GATE_Z]], { h: 6, w: 6 }); rampart(k, [[6.6, GATE_Z], [70, GATE_Z]], { h: 6, w: 6 });
    gateHouse(k, 0, GATE_Z, 0, { gap: 12, h: 6, s: 1 });
    { const L = k.local(0, ground(0, GATE_Z), GATE_Z - 0.4, 0);
      for (let x = 0.3; x < 5.8; x += 0.46) L(-6 + x, 2.3, 0, [0.42, 4.6 - R(0, 0.2), 0.2], sh(0x4a3426, R(0.8, 1.05)));   // left leaf, shut
      for (const y of [0.9, 2.4, 3.9]) L(-3, y, 0.15, [5.8, 0.22, 0.14], 0x2a1c12);
      const L2 = k.local(6, ground(6, GATE_Z), GATE_Z - 0.4, -1.15);                                            // right leaf, swung in
      for (let x = 0.3; x < 5.8; x += 0.46) L2(-x, 2.3, 0, [0.42, 4.6 - R(0, 0.2), 0.2], sh(0x4a3426, R(0.8, 1.05)));
      for (const y of [0.9, 2.4, 3.9]) L2(-3, y, 0.15, [5.8, 0.22, 0.14], 0x2a1c12); }
    for (const sx of [-1, 1]) {
      k.cloth(dinh, 2.2, 4.4, 'drape', sx * 10.5, 6 + 3.6, GATE_Z + 3.1, 0);
      k.cloth(tang, 1.4, 5.2, 'drape', sx * 8.2, 6 + 3.4, GATE_Z + 3.1, 0);
      k.cloth(tang, 1.4, 5.2, 'drape', sx * 15.5, 6 + 3.4, GATE_Z + 3.1, 0);
      k.lamp(sx * 6.5, GATE_Z + 3.6, 0.55);
    }
    for (const x of [-40, -26, 26, 40]) k.flag(x, ground(x, GATE_Z) + 6.3, GATE_Z, 3.4, mats.allyFlag);
    for (const [x, z] of [[-8, -168], [8, -160], [-10, -126], [-13, -56], [-20, 10]]) bambooTorch(k, x, z, { h: 3.2, s: 0.32 });

    // ---- the convoy: coffin carts under straw mats (five coffins under black cloth, ch. 6), white reed plumes tied on
    for (const [x, z, yaw, o] of CARTS) coffinCart(k, x, z, yaw, o);
    for (const [x, z] of [[-15, -182], [14, -176], [-16, -160]]) reedFlags(k, x, z, { n: 6, r: 0.9 });

    // ---- the mud road: ruts along the whole route, the karst walls rising either side (towers on the canyon tops),
    // Thầy Mo's bell post and a cinnabar thread on stakes at the glade (the decoy roads' marker)
    { const ROUTE = k.def.route;
      for (let i = 0; i < ROUTE.length - 1; i++) {
        const [ax, az] = ROUTE[i], [bx, bz] = ROUTE[i + 1], L = Math.hypot(bx - ax, bz - az), yaw = Math.atan2(bx - ax, bz - az), cs = Math.cos(yaw), sn = Math.sin(yaw);
        for (let s = 0; s < L; s += 1.6) {
          const t = s / L, x = ax + (bx - ax) * t, z = az + (bz - az) * t;
          if (waterD(x, z) < HW + 3.5) continue;
          for (const o of [-0.85, 0.85]) {
            const px = x + o * cs, pz = z - o * sn;
            if (r.chance(0.7)) props.push({ s: [0.22, 0.03, 1.5], p: [px, ground(px, pz) + 0.01, pz], r: [0, yaw + R(-0.05, 0.05), 0], c: sh(0x45382a, R(0.85, 1.1)) });
          }
        }
      } }
    bellPost(k, -13, -120, 0.4, 1);
    threadLine(k, [[-16, -134], [-14, -128], [-15, -122], [-12, -115]], { h: 0.8 });
    karstRange(k, [[-34, -186, 30, 8], [34, -178, 34, 9], [-38, -150, 38, 9], [30, -140, 32, 8], [-34, -118, 28, 8], [32, -112, 36, 9],
      [-60, -170, 44, 12], [62, -150, 40, 11], [-64, -110, 36, 10], [-56, -40, 40, 11], [80, -70, 46, 12], [-62, 20, 34, 10],
      [56, 70, 40, 10], [-48, 64, 42, 11], [44, 104, 34, 9], [-44, 112, 38, 10], [-60, 150, 44, 12], [60, 140, 40, 11],
      [-28, 214, 46, 12], [26, 210, 52, 13], [96, 20, 40, 11], [-90, -60, 44, 12], [90, 180, 46, 12], [-92, 110, 40, 11]]);
    karst(k, 0, 214, { h: 54, r: 14 });                                                                         // the shelter's cliff

    // ---- the forest: broadleaf, bamboo and banana in a belt just off the walk field all along the stage (on the canyon
    // tops and round the clearings), stumps and fallen trunks on the verges
    for (let i = 0; i < 520; i++) {
      const x = R(-70, 90), z = R(-200, 205), d = k.inAt(x, z);
      if (d > -2.5 || d < -18 || Math.hypot(x - SHELTER[0], z - SHELTER[1]) < 15) continue;
      const u = r.next();
      if (u < 0.55) broadleaf(k, x, z, R(0.9, 1.4));
      else if (u < 0.8) bamboo(k, x, z, { n: r.int(6, 10), h: R(8, 12), spread: 1.6 });
      else banana(k, x, z, R(0.9, 1.2));
    }
    for (const [x, z] of [[-30, -90], [-30, -40], [-34, 40], [34, -6], [-20, 60], [20, 128], [-30, 160], [30, 162]]) stump(k, x, z, 1);
    bambooScreen(k, [[-40, -14], [-40, 48]], { gap: 3, h: 10 }); bambooScreen(k, [[40, -14], [40, 18]], { gap: 3, h: 10 });

    // ---- the ambush slope: the log piles on the ridge lip (their trap lines: build), arrows in the mud round the carts,
    // the hunters' violet 追 standards on the ridge, a watching file of them on the crest beyond
    for (const [x, z] of LOGS) {
      const gy = k.ground(x, z), L = k.local(x, gy, z, 0);
      for (let j = 0; j < 4; j++) for (let q = 0; q < 4 - j; q++) L(-0.6 + (q - (3 - j) / 2) * 0.66, 0.34 + j * 0.56, R(-0.2, 0.2), [0.62, 0.62, 6], sh(0x4a3a28, R(0.8, 1.1)));
      for (const sz of [-2.6, 2.6]) L(-1.3, 0.7, sz, [0.16, 1.6, 0.16], 0x3a2a1a, [0, 0, 0.3]);                    // the stakes holding them
    }
    k.arrows([-30, -96, 20, -32], 60);
    for (const [x, z] of [[50, -90], [54, -50], [48, -34]]) k.standard(x, z, 1, truy, 8, [0, -62]);
    { const crest = [];
      for (let z = -96; z < -30; z += R(2.5, 4.5)) { const x = 66 + R(-1, 2); if (k.inAt(x, z) < -2) crest.push({ x, y: k.topAt(x, z), z, yaw: -Math.PI / 2 + R(-0.3, 0.3), ph: R(0, 6.28) }); }
      k.troops('foe', crest); }

    // ---- the neck: the abatis (kit barricade) and its felled trunks into the bamboo
    k.barricade('raoda');
    for (const sx of [-1, 1]) { const L = k.local(sx * 11, ground(sx * 11, -22), -22, 0); L(0, 0.5, 0, [6, 0.8, 0.8], 0x3a2c20, [0, sx * 0.3, 0.1]); }

    // ---- the clearing: a roadside shrine, the footprints — a dead-straight file of identical prints running east, every
    // stride the same, a dry leaf lying unbroken in the deepest heel — and the east trail's fake bivouac in its pocket
    shrine(k, -18.5, 3.5, Math.PI / 2, 0.9);
    for (let i = 0; i < 26; i++) {
      const x = 12 + i * 0.95, z = 22 + (x - 12) * 0.08 + (i % 2 ? 0.2 : -0.2), gy = ground(x, z);
      props.push({ s: [0.34, 0.04, 0.15], p: [x, gy + 0.015, z], r: [0, Math.PI / 2 - 0.08, 0], c: 0x1e1812 });
      props.push({ s: [0.12, 0.04, 0.13], p: [x - 0.14, gy + 0.016, z], c: 0x16120e });                        // the heel, pressed deep
      if (i === 9) props.push({ s: [0.24, 0.03, 0.15], p: [x - 0.12, gy + 0.05, z + 0.02], r: [0, 0.6, 0], c: 0xb08a3a });   // the leaf
    }
    { const gx = 74, gz = 28, gy = ground(gx, gz), L = k.local(gx, gy, gz, 0.4);
      for (const sx of [-1, 1]) L(sx * 1.6, 0.8, 0, [0.12, 1.6, 0.12], 0x3a2a1a);
      L(0, 1.6, 0, [3.4, 0.1, 0.1], 0x3a2a1a);
      L(0, 1.1, -0.8, [3.6, 0.06, 2.2], sh(0x6a6048, 0.9), [0.5, 0, 0]);                                         // a lean-to of mats
      for (let i = 0; i < 6; i++) L(R(-3, 3), 0.15, R(-2.5, 2.5), [R(0.3, 0.5), 0.3, R(0.3, 0.5)], 0x4a4a46);     // cold hearth stones
      L(1.8, 0.4, 1.4, [0.9, 0.8, 0.9], 0x5a4a30); }
    k.standard(80, 20, 0.9, truy, 7, [62, 26]);
    threadLine(k, [[36, 30], [44, 30.5], [52, 29.8], [60, 30.4], [66, 31]], { h: 0.7, col: 0x6a2a7a });          // a violet thread: the lure

    // ---- the ravine: reeds and white plumes on the banks, stepping stones (water.stones), the big tree (build), the
    // bearers' hearth stones where the fire will be lit (build), bamboo at the ravine's mouth
    k.reeds();
    for (const [x, z] of [[-18, 76], [16, 75], [-17, 97], [18, 96]]) reedPlumes(k, x, z, { n: 14, r: 2 });
    for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; props.push({ s: [0.4, 0.28, 0.4], p: [FIRE[0] + Math.sin(a) * 0.9, ground(FIRE[0], FIRE[1]) + 0.12, FIRE[1] + Math.cos(a) * 0.9], c: 0x4a4a46 }); }
    threadLine(k, [[FIRE[0] + 1.6, FIRE[1] - 1], [FIRE[0] + 3, FIRE[1] + 0.4]], { h: 0.5, col: 0x7a2a8a });     // the trap thread, purple ink under the mud

    // ---- the rock shelter: the overhang under the cliff, a dry floor, the hearth (build), the cart under it, reed
    // plumes at its mouth, storks over the karst
    { const L = k.local(0, ground(0, 196), 196, 0);
      for (let i = 0; i < 9; i++) L(-14 + i * 3.5 + R(-0.5, 0.5), 7.4 + R(-0.6, 0.6), R(-1, 2), [R(4, 6), R(2.2, 3.4), R(9, 13)], sh(0x7c7a72, R(0.75, 1.05)), [R(-0.08, 0.08), R(-0.2, 0.2), R(-0.08, 0.08)]);
      for (let i = 0; i < 14; i++) L(R(-14, 14), 5.6, R(-6, 2), [0.24, R(0.6, 1.6), 0.24], sh(0x6a6862, R(0.8, 1.05)));   // drip stones
      for (let i = 0; i < 5; i++) L(R(-12, 12), 6.2 + R(0, 1), R(-4, 3), [R(1, 2), 0.5, R(1, 2)], sh(0x3a5a2e, R(0.8, 1.1)));   // ferns on the lip
    }
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; props.push({ s: [0.36, 0.26, 0.36], p: [HEARTH[0] + Math.sin(a) * 0.8, ground(...HEARTH) + 0.1, HEARTH[1] + Math.cos(a) * 0.8], c: 0x4a4844 }); }
    for (const [x, z] of [[14, 178], [-15, 176], [10, 172]]) reedPlumes(k, x, z, { n: 22, r: 2.4 });
    storkFlock(k, -10, 44, 206, 7, { spread: 7, yaw: Math.PI * 0.6 });
    stork(k, 16, k.ground(16, 182), 182, -2.4);
  },

  build(root, k) {
    return buildSet(root, k);
  },
};

// ---------------------------------------------------------------- set pieces (build)
// · puddles on the road (a glossy sheet a hand above the mud) · rain round the hero (dodong's streaks), thinned by 'calm'
// · the trap lines on the ridge (one mesh each: cut by 'cut1-3' / 'cutall')
// · the flood: a brown sheet over the ravine that rises above the ford, foam and branches racing downstream ('flood')
// · the big tree: pivots at its foot and falls east across the lead cart ('tree'), rolls off north-east ('free')
// · the bearers' fire ('ink') and the shelter's hearth ('calm')
function buildSet(root, k) {
  const r = makeRng(979);

  // ---- puddles along the route (not in the ravine's flood band)
  const pb = [];
  for (let z = -190; z < 184; z += 5.5) {
    const x = r.range(-6, 6), w = r.range(1, 2.4), d = r.range(0.8, 1.8);
    if (walkIn(x, z) < 1.5 || waterD(x, z) < HW + 4 || routeDist(x, z) > 7) continue;
    for (let q = 0; q < 3; q++) {                                                                 // three overlapping lobes: an irregular pool
      const px = x + r.range(-0.6, 0.6) * w, pz = z + r.range(-0.6, 0.6) * d;
      pb.push({ s: [w * r.range(0.5, 0.9), 0.02, d * r.range(0.5, 0.9)], p: [px, ground(px, pz) + 0.03, pz], r: [0, r.range(0, 3), 0], c: 0x7a8698 });
    }
  }
  const puddles = new THREE.Mesh(boxesGeometry(pb), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.06, metalness: 0.55, emissive: 0x262e3a, emissiveIntensity: 1 }));
  puddles.receiveShadow = false; puddles.name = 'puddles';
  root.add(puddles);

  // ---- rain (one instanced draw): N streaks in a 56 m box round the hero, fixed in the world as he moves
  const N = 560, BOX = 56, TOP = 22, rain = new THREE.InstancedMesh(new THREE.BoxGeometry(0.03, 1.3, 0.03),
    new THREE.MeshBasicMaterial({ color: 0xb4c0d4, transparent: true, opacity: 0.2, depthWrite: false }), N);
  rain.frustumCulled = false; rain.name = 'rain';
  root.add(rain);
  const drops = Array.from({ length: N }, (_, i) => [hash01(i, 1, 11) * BOX, hash01(i, 2, 11) * BOX, hash01(i, 3, 11), 0.8 + hash01(i, 4, 11) * 0.4]);
  const wrap = (v) => ((v % BOX) + BOX) % BOX - BOX / 2;

  // ---- trap lines: cinnabar thread with a violet strand twisted along it, on knee-high stakes
  const traps = TRAPS.map((pts, i) => {
    const kk = { props: [], ground };
    threadLine(kk, pts, { h: 0.55, col: 0xb02a22 });
    threadLine(kk, pts.map(([x, z]) => [x, z + 0.06]), { h: 0.62, col: 0x6a2a8a });
    const m = new THREE.Mesh(boxesGeometry(kk.props), lit());
    m.name = 'trap' + (i + 1); root.add(m);
    return m;
  });

  // ---- the flood: a turbid sheet over the ravine (inside the rock either side), foam streaks and branches on it
  const flood = new THREE.Mesh(new THREE.BoxGeometry(70, 0.12, 25), new THREE.MeshStandardMaterial({ color: 0x5e5642, roughness: 0.22, metalness: 0.1, transparent: true, opacity: 0.9 }));
  flood.position.set(0, WY, 86); flood.visible = false; flood.receiveShadow = true; flood.name = 'flood';
  root.add(flood);
  const NF = 160, foam = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xd8d4c4, roughness: 0.6, transparent: true, opacity: 0.8 }), NF);
  foam.frustumCulled = false; foam.visible = false; foam.name = 'foam';
  root.add(foam);
  const flecks = Array.from({ length: NF }, (_, i) => ({ x: r.range(-34, 34), z: r.range(-11, 11), sp: r.range(5, 9), w: i % 9 === 0 ? 2.4 : r.range(0.6, 1.6), branch: i % 9 === 0, yaw: r.range(-0.3, 0.3) }));
  const BRANCH = new THREE.Color(0x3a2c1e), FOAM = new THREE.Color(0xd8d4c4);
  flecks.forEach((f, i) => foam.setColorAt(i, f.branch ? BRANCH : FOAM));

  // ---- the big tree on the north bank: trunk and crown on a pivot at its foot
  const tb = [], TH = 15;
  tb.push({ s: [1.0, TH, 1.0], p: [0, TH / 2, 0], c: 0x3a2c22 }, { s: [1.5, 1.2, 1.5], p: [0, 0.5, 0], c: 0x2e241c });
  for (let q = 0; q < 4; q++) tb.push({ s: [0.32, 3.2, 0.32], p: [r.range(-0.6, 0.6), TH * r.range(0.55, 0.8), r.range(-0.6, 0.6)], r: [r.range(-0.8, 0.8), 0, r.range(-0.8, 0.8)], c: 0x34281e });
  for (let q = 0; q < 9; q++) { const w = r.range(2.6, 4.2); tb.push({ s: [w, w * 0.7, w], p: [r.range(-2, 2), TH + r.range(-2.4, 0.8), r.range(-2, 2)], r: [0, r.range(0, 3), 0], c: shade(q % 3 ? 0x2a4422 : 0x22381e, r.range(0.8, 1.15)) }); }
  const treeM = new THREE.Mesh(boxesGeometry(tb), lit());
  treeM.castShadow = true; treeM.receiveShadow = true;
  const tree = new THREE.Group(); tree.position.set(TREE[0], ground(...TREE) - 0.2, TREE[1]); tree.rotation.order = 'YXZ';
  tree.add(treeM); tree.name = 'tree';
  root.add(tree);
  const FALLEN = -Math.atan2(CART2[0] - TREE[0], 2.2), DOWN = -1.53;            // resting on the coffin; on the ground

  // ---- fires: the bearers' fire by the ford ('ink'), the shelter's hearth ('calm')
  let T = 0, lastFrame = 0, ink = false, calm = -1e9, fl = -1e9, fell = -1e9, freed = -1e9, level = WY, ang = 0, yaw = 0;
  k.fire(FIRE[0], ground(...FIRE) + 0.2, FIRE[1], 0.5, false, () => ink);
  k.fire(HEARTH[0], ground(...HEARTH) + 0.2, HEARTH[1], 0.55, false, () => calm > -1e8);
  const site1 = { x: FIRE[0], y: ground(...FIRE) + 1.6, z: FIRE[1], i: 0, d: 12, k: 0 }, site2 = { x: HEARTH[0], y: ground(...HEARTH) + 1.6, z: HEARTH[1], i: 0, d: 14, k: 0 };
  k.sites.push(site1, site2);

  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), p = new THREE.Vector3(), s3 = new THREE.Vector3();
  return {
    sets: {
      cut1() { traps[0].visible = false; }, cut2() { traps[1].visible = false; }, cut3() { traps[2].visible = false; },
      cutall() { for (const t of traps) t.visible = false; },
      flood() { if (fl < -1e8) fl = T; },
      tree() { if (fell < -1e8) fell = T; },
      free() { if (freed < -1e8) freed = T; },
      ink() { ink = true; },
      calm() { if (calm < -1e8) calm = T; },
    },
    update(dt, game) {
      T += dt;
      if (game.frame < lastFrame) {                                                                // a new battle
        fl = fell = freed = calm = -1e9; ink = false; level = WY; ang = yaw = 0;
        for (const t of traps) t.visible = true;
      }
      lastFrame = game.frame;
      // the flood: rises ≈ 0.75 m over 12 s, eases back a little once the cart is clear
      const want = fl > -1e8 ? (freed > -1e8 ? 0.2 : 0.55) : WY;
      level += (want - level) * Math.min(1, dt * 0.22);
      flood.visible = foam.visible = level > WY + 0.03;
      flood.position.y = level;
      if (foam.visible) {
        const hx = game.hero.x;
        for (let i = 0; i < NF; i++) {
          const f = flecks[i], x = ((f.x - T * f.sp - hx + 1000 * 34) % 68 + 68) % 68 - 34, z = RZ(x) + f.z;
          foam.setMatrixAt(i, m4.compose(p.set(x, level + 0.08, z), q.setFromEuler(e.set(0, f.yaw, 0)), f.branch ? s3.set(f.w, 0.22, 0.22) : s3.set(f.w, 0.05, 0.3)));
        }
        foam.instanceMatrix.needsUpdate = true;
      }
      // the tree: falls with gravity's ease onto the coffin, then is levered off and rolls to the ground north-east
      const wantA = freed > -1e8 ? DOWN : fell > -1e8 ? FALLEN : 0, wantY = freed > -1e8 ? -0.75 : 0;
      ang += (wantA - ang) * Math.min(1, dt * (fell > -1e8 && freed < -1e8 ? 2.6 : 1.4));
      yaw += (wantY - yaw) * Math.min(1, dt * 1.2);
      tree.rotation.set(0, yaw, ang);
      site1.i = ink ? 30 * (0.9 + 0.1 * Math.sin(T * 9)) : 0;
      site2.i = calm > -1e8 ? 34 * (0.9 + 0.1 * Math.sin(T * 7 + 1)) : 0;
      // rain: falls ≈ 17 m/s, slanted downwind; thins to a drizzle over 8 s once calmed
      const h = game.hero, c = calm > -1e8 ? Math.min(1, (T - calm) / 8) : 0, n = Math.round(N * (1 - c * 0.85));
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
