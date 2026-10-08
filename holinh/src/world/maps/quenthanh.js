// Quèn Thành (c. 967) laid out along +Z, ≈ 380 m from the Đinh camp to the warlord's command mound — Màn I «Cờ Lau Qua
// Quèn Thành», the last of the warlord wars. A karst valley of Ninh Bình where the warlord of Quèn Thành has staked his
// last stand behind a log stockade; the comic's chapter 1 panel by panel: the reed plume pinned on the king's helmet in
// the camp, the open fight across the paddies, the Right General's shield line on the left flank, the Left General
// breaking the wooden gate, the twelve banners coming down, the rival general yielding on the mound. HOME map (title /
// select stand in the Đinh camp, the sun and the smoke ahead).
//   Doanh trại nhà Đinh  the Đinh camp      z -196 … -136  h 0   a karst pocket: the king's crimson tent, cờ lau (reed-
//                                                              plume standards), 丁 banners, bronze drums, the horse lines;
//                                                              story start (anchor 'plume'), title / select stage
//   Đồng lầy             the paddies        z -142 …  -50  h 0   mud and dikes either side of the road, abandoned mantlets,
//                                                              burning carts, villagers' stilt houses at the west edge,
//                                                              storks; the open fight, free-mode arena (0, -96)
//   Cánh trái            the left flank     x   56 …  100        a side valley opening to +X (the army's left, facing +Z),
//                        (side valley)      z -112 …  -44        the warlord's flanking road; across its mouth the Đinh
//                                                              shield line (x 66, anchor 'khien'; set 'shields' swings the
//                                                              mantlets up) — the Right General's post
//   Bãi chông            the stake field    z  -54 …   16  h 0   the approach: two rows of chevaux-de-frise (carved) funnel
//                                                              the road to the gate; the warlord's forward mantlets
//   (stockade front)                        z   16              log palisade, gatehouse, the WOODEN GATE (gate 'congo',
//                                                              anchor 'cong'; its leaves: build — they crash inward)
//   Sân trại sứ quân     the stockade yard  z   14 …  108  h 0   beaten earth, the warlord's tents and granary, the TWELVE
//                                                              BANNERS on tall poles round the yard (anchors 'coA' west,
//                                                              'coB' east, 'coC' north: their keepers; set 'banners' lowers
//                                                              the next four), the great reed banner (set 'reed')
//   (ramp)                                  z  100 …  136  h 0→5 up onto the command mound
//   Gò chỉ huy           the command mound  z  132 …  188  h 5   rimmed, bamboo-fenced: the warlord's pavilion, the great
//                                                              雄 banner, drums; Hàng Tướng's stand (anchor 'go'); set
//                                                              'yield' lays his sword in the mud
// Late afternoon, sunny: a red sun low ahead-right over the stockade, burnt gold light, heavy smoke columns from the
// burning carts and huts ([LAM]: red sun through smoke, black lacquer, cinnabar, old gold). Format:
// src/world/maps/index.js header (engine); dressing helpers: ../viet.js (shared) and ./quenthanh-set.js (this field's
// horses, reed standards and every set piece).
import * as V from '../viet.js';
import { PAL_Z, GW, BANNERS, REED, SHIELD_X, horseLine, reedStandard, buildSet } from './quenthanh-set.js';

const MOUND_H = 5, MOUND = [0, 160];                 // the command mound: height, centre
const PAV = [0, 178];                                // the warlord's pavilion on the mound
const TITLE = [0, -150], SELECT = [0, -140];         // the key-art pair / the select officer (camp road, facing up the field)

// villagers' stilt houses at the paddies' west edge [x, z, yaw, scale] (solid footprints)
const HOUSES = [[-55, -122, -Math.PI / 2, 1], [-56, -102, -Math.PI / 2, 0.9], [-55, -70, -Math.PI / 2, 0.95]];
const houseFoot = ([x, z, , s]) => [x - 6.2 * s, z - 3.6 * s, x + 6.2 * s, z + 3.6 * s];
// the chevaux-de-frise rows across the approach (carved), the road left open between them
const STAKES = [[-48, -31, -9, -28.6], [9, -31, 48, -28.6], [-48, -5, -9, -2.6], [9, -5, 48, -2.6]];

export default {
  id: 'quenthanh',
  name: { zh: 'Quèn Thành', en: 'Quèn Thành' },
  grid: [-150, -214, 150, 216],
  pieces: [
    { id: 'camp', rect: [-40, -196, 40, -136], h: 0, edge: 3, rise: 18 },
    { id: 'paddies', rect: [-64, -142, 64, -50], h: 0, edge: 3, rise: 9 },
    { id: 'flank', rect: [56, -112, 100, -44], h: 0, edge: 3, rise: 16 },
    { id: 'approach', rect: [-52, -54, 52, 16], h: 0, edge: 2, rise: 10 },
    { id: 'yard', rect: [-52, 14, 52, 108], h: 0, edge: 1, rise: 5 },
    { id: 'ramp', path: [[0, 100, 12, 0], [0, 118, 11, 2.5], [0, 138, 12, MOUND_H]], edge: 1.5, rise: 8 },
    { id: 'mound', ell: [MOUND[0], MOUND[1], 32, 28], h: MOUND_H, edge: 1.5, rise: 12 },
  ],
  // the stake rows; the front palisade either side of the gate
  carve: [...STAKES, [-60, PAL_Z - 1.4, -GW, PAL_Z + 1.4], [GW, PAL_Z - 1.4, 60, PAL_Z + 1.4]],
  // solid set pieces: the camp's horse lines and the king's tent, the stilt houses, the gatehouse towers, the stockade's
  // watchtowers, the twelve banner poles, the granary, the warlord's pavilion
  props: [[-34, -184, -25, -158], [-6, -194, 6, -182], ...HOUSES.map(houseFoot),
    [-9.8, PAL_Z - 2, -GW - 0.1, PAL_Z + 2], [GW + 0.1, PAL_Z - 2, 9.8, PAL_Z + 2],
    [13.5, PAL_Z + 2.5, 18.5, PAL_Z + 7.5], [-18.5, PAL_Z + 2.5, -13.5, PAL_Z + 7.5],
    ...BANNERS.map(([x, z]) => [x - 0.7, z - 0.7, x + 0.7, z + 0.7]),
    [24, 80, 32, 88], [PAV[0] - 9, PAV[1] - 5, PAV[0] + 9, PAV[1] + 6]],
  zones: [
    { id: 'trai', name: { zh: 'Doanh trại nhà Đinh', en: 'The Đinh Camp' }, x: 0, z: -166, w: 80, d: 60 },
    { id: 'ruong', name: { zh: 'Đồng lầy', en: 'The Paddies' }, x: 0, z: -96, w: 128, d: 92 },
    { id: 'canh', name: { zh: 'Cánh trái', en: 'The Left Flank' }, x: 78, z: -78, w: 44, d: 68 },
    { id: 'chong', name: { zh: 'Bãi chông', en: 'The Stake Field' }, x: 0, z: -20, w: 104, d: 68 },
    { id: 'san', name: { zh: 'Sân trại sứ quân', en: 'The Stockade Yard' }, x: 0, z: 60, w: 104, d: 92 },
    { id: 'go', name: { zh: 'Gò chỉ huy', en: 'The Command Mound' }, x: MOUND[0], z: MOUND[1], r: 28 },
  ],
  route: [[0, -184], [0, -162], [0, -140], [2, -120], [-2, -96], [2, -74], [0, -52], [0, -30], [0, -4], [0, PAL_Z], [0, 34], [0, 64],
    [0, 92], [0, 106], [0, 122], [0, 140], [0, 158]],
  gates: {
    congo: { rect: [-8, PAL_Z - 2.5, 8, PAL_Z + 2.5], name: { zh: 'Cổng gỗ trại Quèn Thành', en: 'The Wooden Gate of Quèn Thành' }, kind: 'barricade', at: [0, PAL_Z, 0, GW] },
  },
  // plume: the king before the ranks · khien: the shield line on the left flank · cong: the wooden gate · coA / coB / coC:
  // the banner keepers' posts · reed: the great reed banner · go: Hàng Tướng's stand on the mound
  anchors: { plume: [0, -158], khien: [SHIELD_X, -78], cong: [0, PAL_Z], coA: [-34, 58], coB: [34, 58], coC: [0, 96], reed: REED, go: [0, 150] },
  // story: the head of the Đinh ranks in the camp, looking up the road into the sun and the smoke; free: the paddies
  spawn: { story: { x: 0, z: -170, yaw: 0, tilt: -0.07 }, free: { x: 0, z: -96, yaw: 0 } },
  water: null,
  // late afternoon: a red-gold sun low ahead-right over the stockade, smoke-brown haze, the karsts in warm silhouette
  sky: {
    sunElev: 0.1, sunAz: -0.3, sunCore: [4.8, 3.0, 1.5],
    haze: 0x8a6e62, hazeWarm: 0xd47e40, glow: 0xf6a456, skyMid: 0x9c7a6c, skyTop: 0x40405e,
    hznSun: 0xff8a30, hznAway: 0xb0806a, cloudRose: 0xc4724e, cloudShade: 0x4e4048, cloudLit: 0xffb468,
    dust: [12, 46, 1.2, 0.07], dustLit: 0xcc8a4c, dustShade: 0x5c4c50, apCool: 0x7c6e8a,
  },
  fog: [34, 300],
  post: { exposure: 1.36, sat: 1.2, rays: 1.1, rayTint: [1.0, 0.6, 0.3], bloom: 0.6, highTint: [1.12, 0.98, 0.8], shadowTint: [0.82, 0.9, 1.18] },
  // key: the brazier by the camp road (the select officer's warm key); fill: the mound faces the hero with the sun behind
  // it — a warm fill eases in on the last approach
  light: { hemi: [0x9a8a94, 0x6a5440, 2.3], sun: [0xffa458, 3.8], rim: [0xff8a44, 1.7], dir: [-0.38, 0.45, 0.8], fire: 0xff7a30, key: [-7, -145], fill: [120, 150, 1.0] },
  castle: null,
  terrain: {
    pave: (x, z) => -0.35 + (Math.hypot(x, z + 162) < 11 ? 0.8 : 0)                 // country tracks; the camp's muster ground
      + (Math.hypot(x - MOUND[0], z - MOUND[1] + 6) < 14 ? 0.7 : 0),                // the mound's parade ground
    bare: (x, z) => (z > 14 && z < 110 && Math.abs(x) < 52) || (z > -194 && z < -176 && Math.abs(x) < 14) || (z > 124 && Math.abs(x) < 30),
    rock: (h, x, z) => h - (z > 118 ? MOUND_H : 0) - 2,
    scorch: { n: 34, area: [-56, -130, 56, 110], spots: [[0, PAL_Z - 2, 1.0], [-6, PAL_Z - 1, 0.8], [-40, -118, 1.0], [38, -102, 1.1], [-30, -68, 0.9], [34, 6, 1.0], [-30, 40, 0.9]] },
    rubble: [-56, -136, 56, 186],
    pines: [400, 500],                                                             // karst shrubs, not pine forest
    // pale limestone: grey-white strata, dark rain streaks, green-crowned tops; warmer in the low sun
    cliff: { rock: 0x948a7c, dark: 0x5a5249, top: 0x5e6a3a, moss: 0x4a5e2e, grassy: 0x66763a },
    mountains: { peakA: -0.25, peak: 18 },
  },
  // burning carts and huts: the smoke columns of the last stand [x, z, scale]
  fires: [[-40, -118, 1.6], [38, -102, 1.8], [-30, -68, 1.4], [26, -60, 1.5], [-36, -16, 1.3], [34, 6, 1.7], [-30, 40, 1.5], [26, 94, 1.4], [-24, 150, 1.2]],
  // firelight: the camp braziers, the wrecks, the gate braziers, the yard, the pavilion steps
  lightSites: [[-7, 1.9, -145, 26, 10], [7, 1.9, -145, 26, 10], [-6, 1.9, -176, 24, 10], [6, 1.9, -176, 24, 10],
    [-40, 2.2, -118, 30, 12], [38, 2.2, -102, 30, 12], [-30, 2.2, -68, 28, 11], [26, 2.2, -60, 28, 11], [-36, 2.2, -16, 26, 10], [34, 2.2, 6, 30, 12],
    [-9, 2, PAL_Z - 4, 28, 10], [9, 2, PAL_Z - 4, 28, 10], [-30, 2.2, 40, 28, 11], [26, 2.2, 94, 26, 10], [-10, 1.9, 60, 24, 10], [10, 1.9, 80, 24, 10],
    [-6, 1.9, 140, 26, 10], [6, 1.9, 140, 26, 10], [-7, 2.2, PAV[1] - 7, 30, 12], [7, 2.2, PAV[1] - 7, 30, 12]],
  hq: PAV,
  stage: { title: TITLE, select: SELECT },   // the camp road: the key-art pair before the paddies, the smoke and the low sun
  minimap: { walls: [[-56, PAL_Z - 1.4, -GW, PAL_Z + 1.4], [GW, PAL_Z - 1.4, 56, PAL_Z + 1.4], [-55, PAL_Z, -52, 108], [52, PAL_Z, 55, 108], ...STAKES] },

  dress(k) {
    const { r, mats, props, poles, shade: sh } = k;
    const dinh = k.banner('丁', { bg: '#a3261a', fg: '#f2d68a', border: '#4a120a', w: 160, h: 320, seed: 31 });
    const hung = k.banner('雄', { bg: '#4e5a2e', fg: '#ece2c4', border: '#1e1a10', w: 160, h: 320, seed: 32 });
    const rust = k.banner('', { bg: '#8a3a1e', fg: '#000', border: '#3a1a0e', w: 64, h: 128, seed: 33 });

    // ---- karst towers: a near rank standing out of the valley walls, a second behind, a far ring at the grid rim
    const halfW = (z, sx) => (z < -136 ? 40 : z < -50 ? (sx > 0 && z > -112 ? 100 : 64) : z < 14 ? (sx > 0 && z < -44 ? 100 : 52) : z < 100 ? 54 : z < 132 ? 14 : 32);
    for (let z = -210; z <= 212; z += r.range(11, 17)) for (const sx of [-1, 1]) {
      const hw = halfW(z, sx), near = r.range(12, 22), rr = r.range(6, 10.5);
      V.karstRange(k, [[sx * Math.min(132, hw + near + rr), z + r.range(-4, 4), r.range(24, 48), rr, r.range(-0.4, 0.4)]]);
      if (r.chance(0.7)) { const rr2 = r.range(9, 15); V.karstRange(k, [[sx * Math.min(136, hw + near + rr + r.range(22, 44)), z + r.range(-6, 6), r.range(38, 68), rr2, r.range(-0.3, 0.3)]]); }
    }
    for (let i = 0; i < 9; i++) V.karstRange(k, [[r.range(-100, 100), r.range(200, 214), r.range(44, 74), r.range(10, 16)]]);   // behind the mound
    for (let i = 0; i < 7; i++) V.karstRange(k, [[r.range(-90, 90), r.range(-212, -204), r.range(36, 60), r.range(9, 14)]]);  // behind the camp
    V.karst(k, -78, -30, { h: 50, r: 10, lean: -0.15 }); V.karst(k, 70, 40, { h: 44, r: 9, lean: 0.2 });                      // the two that frame the stockade

    // ---- Doanh trại nhà Đinh: the king's tent, reed standards, 丁 banners, drums, the horse lines
    k.tent(0, -188, 0, 0x8e2418, 10, 8);
    for (const sx of [-1, 1]) { k.standard(sx * 8, -191, 1.35, dinh, 11, [0, -160]); V.parasol(k, sx * 5.5, k.ground(sx * 5.5, -182), -181.5, 1.0, 0xb02a1a); }
    reedStandard(k, -3, -193, { h: 12, s: 1.4 }); reedStandard(k, 3, -193, { h: 12, s: 1.4 });
    horseLine(k, -30, -182, -160, 1);
    for (const [x, z] of [[-34, -150], [-34, -192], [34, -190], [34, -178], [34, -166], [34, -152]]) k.tent(x + r.range(-1, 1), z, Math.PI / 2 * Math.sign(x) + r.range(-0.15, 0.15), r.chance(0.6) ? 0x8e2418 : 0x4a2a20, 4.6, 5.6);
    for (const [x, z, h] of [[-12, -172, 8], [12, -172, 8.5], [-18, -156, 7.5], [18, -158, 8], [-15, -138, 7], [15, -139, 7.5], [-22, -190, 9], [22, -190, 9]]) reedStandard(k, x, z, { h });
    for (const sx of [-1, 1]) { k.standard(sx * 22, -146, 1.15, dinh, 9.5, [0, -150]); k.standard(sx * 26, -170, 1.1, mats.ally, 9, [0, -165]); }
    // the war drums: two bronze drums on a low platform by the road, a frame drum across from them
    { const gy = k.ground(-14, -160);
      props.push({ s: [5.4, 0.4, 3.2], p: [-14.5, gy + 0.2, -160], c: 0x6a5e50 });
      V.bronzeDrum(k, -16, -160, 0, 1.5, gy + 0.4); V.bronzeDrum(k, -13, -160, 0.4, 1.2, gy + 0.4); }
    k.drum(14, -161, 0.3);
    for (const [x, z] of [[-7, -145], [7, -145], [-6, -176], [6, -176]]) k.lamp(x, z, 0.6);
    for (const [x, z, yaw] of [[24, -184, -0.2], [-22, -144, 0.3], [27, -142, -0.3]]) k.supplies(x, z, yaw, r.int(4, 6));
    for (const [x, z, yaw] of [[-20, -180, Math.PI / 2], [21, -176, -Math.PI / 2]]) k.shieldRack(x, z, yaw);
    k.commandTable(10, -184, 0.2);
    for (const [x, z] of [[-36, -140], [36, -186], [-36, -170], [31, -138]]) V.reedFlags(k, x, z, { n: 14, r: 1.8 });
    for (const [x, z] of [[-34, -196], [34, -198]]) V.bamboo(k, x, z, { n: 12, h: 11, spread: 2 });
    for (const [x, z, h] of [[-38, -158, 9], [38, -160, 9.5]]) V.areca(k, x, z, h);
    V.banyan(k, 30, -200, 1.2);

    // ---- Đồng lầy: paddies off the road, the warlord's abandoned mantlets, burnt carts, the villagers' stilt houses, storks
    V.paddy(k, [-62, -138, -9, -54], { cell: 6, rice: 0.55 });
    V.paddy(k, [9, -138, 62, -54], { cell: 6, rice: 0.5 });
    for (const [x, z, yaw] of [[-40, -118, 2.2], [38, -102, 0.8], [-30, -68, 1.6], [26, -60, 2.6]]) k.cart(x, z, yaw, true);
    for (const [x, z] of [[-18, -98], [22, -86], [-34, -78], [16, -64], [-12, -58], [40, -72]]) V.mantlet(k, x, z, Math.PI + r.range(-0.4, 0.4), 1);
    for (const h of HOUSES) V.stiltHouse(k, h[0], h[1], h[2], h[3]);
    for (const [x, z] of [[-60, -132], [-60, -88], [-58, -58]]) V.bamboo(k, x, z, { n: r.int(8, 12), h: r.range(9, 12), spread: 1.8 });
    V.banyan(k, -58, -146, 1.1); V.haystack(k, -46, -110, 1); V.haystack(k, -47, -92, 0.9);
    for (const [x, z, yaw] of [[-44, -130, 0.5], [-41, -128, 2.2], [48, -132, -0.6], [54, -60, 1.4]]) V.stork(k, x, k.ground(x, z), z, yaw, { s: 1.1 });
    for (const [x, z] of [[-30, -60], [30, -58], [-44, -56], [46, -54]]) k.standard(x, z, 1.05, r.chance(0.3) ? rust : mats.foe);
    for (const [x, z] of [[-24, -138], [24, -136]]) k.standard(x, z, 1.1, mats.ally);
    // the left-flank valley: the warlord's stakes at its far end (the road his flankers come down), the Đinh shield line
    // (mantlets: build) and its spearmen behind it
    V.stakes(k, [[94, -106], [94, -90]], { depth: 2.4, lean: -0.6 }); V.stakes(k, [[94, -66], [94, -50]], { depth: 2.4, lean: -0.6 });
    { const men = [];
      for (let z = -97; z <= -59; z += r.range(1.3, 1.8)) men.push({ x: SHIELD_X - r.range(1.6, 2.6), y: k.ground(SHIELD_X - 2, z), z, yaw: Math.PI / 2 + r.range(-0.2, 0.2), ph: r.range(0, 6.28) });
      k.troops('ally', men); }
    for (const [x, z] of [[62, -104], [62, -52]]) reedStandard(k, x, z, { h: 8 });
    k.standard(90, -78, 1.1, hung, 9, [60, -78]);
    for (const [x, z] of [[84, -108], [88, -48], [96, -76]]) V.bamboo(k, x, z, { n: 9, h: 10 });

    // ---- Bãi chông: the chevaux-de-frise rows, the warlord's forward mantlets and banners, torches up to the gate
    for (const [x0, z0, x1] of STAKES) V.stakeRow(k, [[x0, z0 + 1.2], [x1, z0 + 1.2]], { gap: 1.0, h: 2.0 });
    for (const [x, z] of [[-26, -42], [24, -44], [-38, 4], [36, -12], [-14, 8], [16, 6]]) V.mantlet(k, x, z, Math.PI + r.range(-0.3, 0.3), 1.1);
    for (const [x, z] of [[-40, -44], [42, -40], [-46, -16], [46, 0]]) k.standard(x, z, 1.1, r.chance(0.5) ? hung : mats.foe);
    V.chong(k, [-50, -50, -30, -36], { n: 30 }); V.chong(k, [30, -50, 50, -36], { n: 30 });
    for (const [x, z] of [[-9, PAL_Z - 4], [9, PAL_Z - 4]]) k.lamp(x, z, 0.75);
    k.torchPosts(-50, PAL_Z - 6);

    // ---- the stockade front: log palisade, gatehouse (the leaves: build), watchtowers, 雄 standards over the gate
    k.palisade([[-56, PAL_Z], [-9.8, PAL_Z]]); k.palisade([[9.8, PAL_Z], [56, PAL_Z]]);
    V.gateHouse(k, 0, PAL_Z, 0, { gap: GW * 2, h: 5, s: 1 });
    k.tower(-16, PAL_Z + 5, 7, 1.3); k.tower(16, PAL_Z + 5, 7, 1.3);
    for (const sx of [-1, 1]) k.standard(sx * 11.5, PAL_Z - 3.5, 1.2, hung, 10, [0, -20]);
    for (let x = -52; x < 52; x += 9) if (Math.abs(x) > 20) k.flag(x + r.range(-1, 1), k.ground(x, PAL_Z) + 3.4, PAL_Z + 0.6, 2.6, r.chance(0.4) ? rust : mats.pennant);

    // ---- Sân trại sứ quân: side palisades, tents, granary, supplies, drums (the twelve banners: build)
    k.palisade([[-53.5, PAL_Z + 2], [-53.5, 108]]); k.palisade([[53.5, PAL_Z + 2], [53.5, 108]]);
    k.palisade([[-53, 109], [-13, 109]]); k.palisade([[13, 109], [53, 109]]);
    for (const [x, z] of [[-30, 26], [30, 24], [-28, 40], [-30, 76], [30, 70], [-26, 88]]) k.tent(x + r.range(-1, 1), z, Math.PI / 2 * Math.sign(x) + r.range(-0.2, 0.2), r.chance(0.5) ? 0x4a5228 : 0x6a3a1a, 4.6, 5.6);
    V.granary(k, 28, 84, -Math.PI / 2, 1);
    for (const [x, z, yaw] of [[-20, 30, 0.3], [22, 40, -0.2], [-22, 94, Math.PI], [18, 96, Math.PI + 0.2]]) k.supplies(x, z, yaw, r.int(5, 7));
    for (const [x, z, yaw] of [[-36, 50, Math.PI / 2], [36, 78, -Math.PI / 2]]) k.shieldRack(x, z, yaw);
    k.drum(-20, 70, Math.PI / 2 + 0.3); k.drum(20, 54, -Math.PI / 2 - 0.3);
    for (const [x, z] of [[-10, 60], [10, 80], [-10, 98], [10, 98]]) k.lamp(x, z, 0.6);
    for (const [x, z] of [[-48, 104], [48, 104]]) V.bamboo(k, x, z, { n: 9, h: 10 });

    // ---- the ramp and Gò chỉ huy: braziers up the ramp, the bamboo fence round the rim, the pavilion, the great 雄
    for (const [x, z] of [[-6, 140], [6, 140]]) k.lamp(x, z, 0.7);
    { const rim = [];
      for (let a = -2.55; a <= 2.55; a += 0.12) rim.push([MOUND[0] + Math.sin(a) * 33.5, MOUND[1] - Math.cos(a) * -29.5]);
      V.bambooFence(k, rim, { h: 2.6 }); }
    { const [x, z] = PAV, gy = k.ground(x, z);
      props.push({ s: [18, 1.0, 11], p: [x, gy + 0.5, z], c: 0x6a5a44 }, { s: [18.2, 0.12, 0.2], p: [x, gy + 1.0, z - 5.5], c: 0xb89048 });
      for (let q = 0; q < 3; q++) { const top = 0.33 * (q + 1), d = 1.3 - q * 0.42; props.push({ s: [6.4 - q * 0.3, top, d], p: [x, gy + top / 2, z - 5.5 - d / 2], c: sh(0x5e5040, 1 + q * 0.05) }); }
      k.pagoda(x, gy + 1.0, z + 0.5, 12, 7.5, 2, 1);
      for (const lx of [-4, -1.4, 1.4, 4]) k.lantern(x + lx, gy + 4.0, z - 3.2, 1.0);
      for (const sx of [-1, 1]) { k.drum(x + sx * 6, z - 4.2, sx * (Math.PI / 2 - 0.4), gy + 1.0); k.lamp(sx * 7, PAV[1] - 7, 0.85); } }
    { const x = 13, z = 184, gy = k.ground(x, z), P = 18;                                       // the great 雄 banner
      poles.push({ s: [0.4, P, 0.4], p: [x, gy + P / 2, z], c: 0x2e1d15 }, { s: [5.6, 0.3, 0.3], p: [x + 2.6, gy + P - 0.5, z], c: 0x2e1d15 }, { s: [0.3, 1.4, 0.3], p: [x, gy + P + 0.7, z], c: 0xd8b050 });
      k.cloth(hung, 5, 10, 'hang', x + 0.2, gy + P - 0.7, z, 0.1); }
    for (const [x, z] of [[-24, 176], [24, 170], [-28, 152], [28, 148]]) k.standard(x, z, 1.1, r.chance(0.4) ? rust : mats.foe, 8.5, [0, 158]);
    for (const [x, z] of [[-14, 168], [16, 160]]) k.lamp(x, z, 0.6);

    // ---- the field: wrecks, arrows, the fallen's gear, torches along the camp road
    k.wrecks();
    k.arrows([-54, -130, 54, 150], 50);
    k.debris([-56, -132, 56, 186], 120);
    k.torchPosts(-136, -60);

    // ---- reserve armies off the walkable ground: the Đinh host on the camp's karst shoulders and behind the king's tent,
    // the warlord's men on the slopes beside the stockade and behind the mound
    for (const [x, z, f] of [[-52, -178, 1.2], [52, -172, -1.2], [-20, -206, 0], [20, -206, 0], [-74, -110, 1.3]]) k.formation('ally', x, z, f, r.int(9, 13), r.int(4, 6));
    for (const [x, z, f] of [[-68, 30, Math.PI / 2], [68, 50, -Math.PI / 2], [-66, 80, Math.PI / 2 + 0.3], [66, 96, -Math.PI / 2 - 0.3],
      [112, -80, -Math.PI / 2], [0, 204, Math.PI], [-30, 200, Math.PI - 0.3]]) k.formation('foe', x, z, f, r.int(9, 13), r.int(4, 6));
    k.aftermath({ fallen: [[-50, 50, -130, -56, 22], [-44, 44, -50, 12, 14], [-40, 40, 22, 100, 12], [60, 92, -100, -56, 6]],
      standards: [8, -54, -130, 54, 100], dust: { n: 34, area: [-60, -136, 60, 150], wall: [8, -46, 46, PAL_Z - 10] } });
    k.farFires([[-96, -40], [94, 20], [-100, 120], [92, 150], [30, 214], [-40, 214]], 3.0);
  },

  // set pieces (./quenthanh-set.js): the wooden gate (gate 'congo'), the twelve banners ('banners'), the great reed
  // banner ('reed'), the shield line ('shields'), the yielded sword ('yield'), the storks
  build(root, k) {
    return buildSet(root, k);
  },
};
