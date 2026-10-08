// Set pieces and local dressing of Màn II «Đêm Vỡ Hoa Lư» (holinh/src/world/maps/demhoalu.js): the palace pieces the
// shared kit lacks — plastered palace walls under tile copings, the long timber gallery (hành lang gỗ) with its oil
// lamps, the queen's violet curtains, the sealed store's high open roof, the tiered candle rack — and buildSet(), which
// owns everything the story changes at run time (story:set):
//   doors       every gate's leaves. The four on the hero's way ('cuaTrai', 'cuaSan', 'cuaNoi', 'cuaKho': engine gates,
//               shut by the story at reset, opened by beats) follow GATES[id].open; the three the hero SEALS (the outer
//               gate, the court's west and east gates: not engine gates — they stand off the walk field) start wide open
//               and swing shut on 'sealNgoai' / 'sealTay' / 'sealDong', a bar drops across them and a file of the palace
//               guard (lính dựng giáo) stands up in front
//   snuff       the gallery's oil lamps go out one by one from the south end toward the court, as if a shadow walked
//               ahead swallowing them; one in five keeps a dying flame (story starts with them all burning)
//   matdao      a plank panel in the inner palace's east wall slides aside: the hidden passage Mặt Sẹo leaves by
//   candles     the 99 candles on the store's tiered rack light rank by rank, then the tall candle stands between the
//               coffin rows, deeper and deeper into the incense haze (light sites follow)
//   seven       seven dark silhouettes stand before the 99 flames (the last image of the stage)
// Free mode stands in the sealed, snuffed, candle-lit night. A new battle (frame back to 0) resets every set.
// Same contract as holinh/src/world/viet.js for the dressing helpers: boxes through the kit k, every random draw from k.r.
import * as THREE from 'three';
import { boxesGeometry, shade } from '../../../../src/core/voxel.js';
import { figureGeometry, lit } from '../../../../src/world/castle.js';
import { GATES } from '../../../../src/world/map.js';

const sm = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
export const LAC = 0x1a1210, RED = 0x6e1e14, REDL = 0x8a2a1a, TILE = 0x2e2a30, PLASTER = 0x7e7262, STONE = 0x5e5a56;

/** Curved roof of dark tile (four stepped slabs, a ridge, upswept ends, flared eave corners), ridge along local x. */
export function roof(L, w, d, y, h, col = TILE) {
  for (let i = 0; i < 4; i++) { const u = i / 4; L(0, y + h * u + h / 8, 0, [w * (1 - u * 0.7), h / 4 + 0.02, d * (1 - u * 0.5)], shade(col, 1 - u * 0.1)); }
  L(0, y + h + 0.15, 0, [w * 0.35, 0.3, 0.4], shade(col, 0.8));
  for (const sx of [-1, 1]) L(sx * w * 0.2, y + h + 0.45, 0, [0.3, 0.6, 0.3], 0x5a4a44, [0, 0, sx * -0.6]);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) L(sx * w * 0.5, y + 0.25, sz * d * 0.5, [0.3, 0.5, 0.3], shade(col, 0.85), [sz * 0.5, 0, sx * -0.5]);
}

/** Tường cung: a plastered palace wall along a polyline — dark stone footing, ochre-grey plaster, a pilaster every 6 m,
 *  a two-step coping of dark tile. Ground at 0 (the whole precinct is one level). */
export function palaceWall(k, pts, { h = 4.4, w = 1.4 } = {}) {
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1], len = Math.hypot(bx - ax, bz - az), yaw = Math.atan2(bx - ax, bz - az);
    const L = k.local((ax + bx) / 2, 0, (az + bz) / 2, yaw);
    L(0, 0.4, 0, [w + 0.3, 0.8, len], STONE);
    L(0, h / 2 + 0.3, 0, [w, h - 0.6, len], shade(PLASTER, k.r.range(0.92, 1.04)));
    L(0, h * 0.62, 0, [w + 0.04, 0.12, len], shade(PLASTER, 0.78));                                   // a painted band
    for (let d = -len / 2 + 3; d < len / 2 - 1; d += 6) L(0, h / 2, d, [w + 0.24, h, 0.6], shade(PLASTER, 0.86));
    L(0, h + 0.15, 0, [w + 0.9, 0.22, len + 0.4], shade(TILE, 0.9));                                  // the coping
    L(0, h + 0.38, 0, [w + 0.3, 0.26, len + 0.2], TILE);
    L(0, h + 0.56, 0, [0.3, 0.16, len], shade(TILE, 0.75));
  }
}

/** One side of the long timber gallery (hành lang gỗ) from z0 to z1 on side sx (−1 west / +1 east): red-lacquered
 *  columns at x = sx·xi every `step` m on stone bases, a beam, a lean-to tile roof out to the plank wall at sx·xo with
 *  lattice windows, and an oil-lamp bracket on each column facing the lane. Returns the lamps' flame points [x, y, z]. */
export function gallery(k, z0, z1, sx, { xi = 7, xo = 11.6, step = 6, h = 4.6 } = {}) {
  const P = k.props, lamps = [];
  for (let z = z0; z <= z1 + 0.01; z += step) {
    P.push({ s: [0.8, 0.3, 0.8], p: [sx * xi, 0.15, z], c: STONE }, { s: [0.44, h, 0.44], p: [sx * xi, h / 2 + 0.2, z], c: RED });
    P.push({ s: [0.5, 0.08, 0.3], p: [sx * (xi - 0.3), 2.5, z], c: 0x2a1a10 }, { s: [0.26, 0.14, 0.26], p: [sx * (xi - 0.55), 2.62, z], c: 0x8a6a34 });   // lamp bracket + bronze cup
    lamps.push([sx * (xi - 0.55), 2.78, z]);
    P.push({ s: [0.26, h - 0.4, 0.26], p: [sx * xo, (h + 0.6) / 2, z], c: shade(RED, 0.8) });     // wall post
  }
  const len = z1 - z0 + 3, zm = (z0 + z1) / 2, dx = xo - xi;
  P.push({ s: [0.34, 0.4, len], p: [sx * xi, h + 0.25, zm], c: shade(RED, 0.75) });               // the beam
  for (let i = 0; i < 4; i++) {                                                                   // lean-to roof, four courses
    const u = (i + 0.5) / 4, x = sx * (xi - 0.6 + (dx + 1.2) * u), y = h + 0.55 + u * 1.1;
    P.push({ s: [(dx + 1.2) / 4 + 0.1, 0.2, len], p: [x, y, zm], r: [0, 0, sx * 0.24], c: shade(TILE, 0.88 + i * 0.05) });
  }
  P.push({ s: [0.24, 0.24, len], p: [sx * (xi - 0.6), h + 0.62, zm], c: shade(TILE, 0.7) });
  // the plank wall (with a lattice window between posts), the coping on top
  P.push({ s: [0.22, h, len], p: [sx * (xo + 0.1), h / 2, zm], c: 0x3a281c });
  for (let z = z0 + step / 2; z < z1; z += step) {
    P.push({ s: [0.06, 1.2, 2.4], p: [sx * (xo - 0.02), 2.6, z], c: 0x140e0a });
    for (let q = -1; q <= 1; q++) P.push({ s: [0.08, 1.2, 0.07], p: [sx * (xo - 0.06), 2.6, z + q * 0.6], c: 0x5a3a24 });
    P.push({ s: [0.08, 0.07, 2.4], p: [sx * (xo - 0.06), 2.6, z], c: 0x5a3a24 });
  }
  return lamps;
}

/** The queen's violet: a material for the curtains of her hall (and the shadow behind them). */
export const violet = (k, seed = 61) => k.banner('', { bg: '#3a1a4a', fg: '#000', border: '#6a3a1c', w: 64, h: 128, tatter: false, seed });

/** A violet curtain screen on two lacquered posts, w wide, facing local −z of yaw. */
export function curtainScreen(k, x, z, yaw, w, mat) {
  const L = k.local(x, 0, z, yaw);
  for (const sx of [-1, 1]) L(sx * w / 2, 1.6, 0, [0.16, 3.2, 0.16], LAC);
  L(0, 3.15, 0, [w + 0.4, 0.14, 0.14], 0x8a6a34);
  const cs = Math.cos(yaw), sn = Math.sin(yaw);
  k.cloth(mat, w, 2.9, 'drape', x + (w / 2) * cs - 0.05 * sn, 3.08, z - (w / 2) * sn - 0.05 * cs, yaw + Math.PI);
}

/** The store of the 99 (kho kín): an open-sided high hall over the coffins, x ±hw, z0 … z1 — columns every `step` m
 *  (their footprints are the def's carve), a tall two-slope roof of dark tile with its ridge along z, plank walls on
 *  the sides and back to h 4 with a lattice clerestory above, the front gable left open (camera room). */
export function storeHall(k, hw, z0, z1, { step = 6.5, h = 9.5 } = {}) {
  const P = k.props, len = z1 - z0, zm = (z0 + z1) / 2;
  for (let z = z0; z <= z1 + 0.01; z += step) for (const sx of [-1, 1]) {
    P.push({ s: [0.9, 0.35, 0.9], p: [sx * hw, 0.17, z], c: STONE }, { s: [0.55, h, 0.55], p: [sx * hw, h / 2 + 0.3, z], c: LAC });
    P.push({ s: [0.12, 0.6, 0.12], p: [sx * (hw - 0.34), 3.4, z], c: 0x8a2a1a });                  // a cinnabar talisman strip
  }
  for (const sx of [-1, 1]) {
    P.push({ s: [0.5, 0.6, len + 1], p: [sx * hw, h + 0.6, zm], c: shade(LAC, 1.3) });              // the plate
    P.push({ s: [0.24, 4, len], p: [sx * (hw + 1.2), 2, zm], c: 0x2a1c14 });                        // plank side walls (outside the walk)
    for (let z = z0 + 1; z < z1; z += 1.2) P.push({ s: [0.1, h - 4.6, 0.1], p: [sx * (hw + 1.2), 4.2 + (h - 4.6) / 2, z], c: 0x3a281c });   // clerestory slats
  }
  P.push({ s: [2 * hw + 2.6, h + 0.5, 0.3], p: [0, (h + 0.5) / 2, z1 + 1.4], c: 0x221610 });       // the back wall
  for (let z = z0; z <= z1 + 0.01; z += step) P.push({ s: [2 * hw + 0.6, 0.4, 0.4], p: [0, h + 0.5, z], c: shade(LAC, 1.2) });   // tie beams
  const rise = 4.2, half = hw + 2.4, slope = Math.atan2(rise, half);
  for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) {                                         // two slopes, three courses each
    const u = (i + 0.5) / 3, run = half * u;
    P.push({ s: [half / 3 + 0.25, 0.26, len + 4], p: [sx * (half - run), h + 0.9 + rise * u, zm], r: [0, 0, sx * slope], c: shade(TILE, 0.86 + i * 0.06) });
  }
  P.push({ s: [0.6, 0.5, len + 4.4], p: [0, h + 1.0 + rise, zm], c: shade(TILE, 0.7) });           // ridge
  for (const sz of [-1, 1]) P.push({ s: [0.4, 1.3, 0.4], p: [0, h + 1.6 + rise, zm + sz * (len / 2 + 2)], r: [sz * 0.5, 0, 0], c: 0x5a4a44 });   // upswept ridge ends
  // the front gable: a lacquered name board, no name (the store has none)
  P.push({ s: [4.2, 1.4, 0.16], p: [0, h + 2.0, z0 - 1.6], c: LAC }, { s: [3.6, 1.0, 0.06], p: [0, h + 2.0, z0 - 1.7], c: 0x6a5020 });
}

/** The tiered candle rack before the coffins: `rows` lacquered steps rising away from the viewer (z), each carrying
 *  `cols` red candles. Returns the flame points [[x, y, z], …] rank by rank (the 'candles' set lights them). */
export function candleRack(k, x, z, cols, rows, { gap = 0.6, rise = 0.14 } = {}) {
  const P = k.props, out = [], w = cols * gap + 0.4;
  for (let j = 0; j < rows; j++) {
    const y = 0.2 + j * rise, zz = z + j * gap;
    P.push({ s: [w, y, gap], p: [x, y / 2, zz], c: shade(LAC, 1 + (j % 2) * 0.15) });
    P.push({ s: [w, 0.04, 0.06], p: [x, y, zz - gap / 2 + 0.03], c: 0x8a6a34 });
    for (let i = 0; i < cols; i++) {
      const cx = x + (i - (cols - 1) / 2) * gap, hgt = k.r.range(0.22, 0.34);
      P.push({ s: [0.09, hgt, 0.09], p: [cx, y + hgt / 2, zz], c: shade(0xb02418, k.r.range(0.85, 1.1)) });
      out.push([cx, y + hgt + 0.07, zz]);
    }
  }
  return out;
}

/** A tall candle stand: a lacquered pillar 1.3 m, a bronze dish, a fat red candle. Returns its flame point. */
export function candleStand(k, x, z) {
  const P = k.props;
  P.push({ s: [0.5, 0.12, 0.5], p: [x, 0.06, z], c: 0x6a5020 }, { s: [0.16, 1.3, 0.16], p: [x, 0.7, z], c: LAC }, { s: [0.42, 0.06, 0.42], p: [x, 1.36, z], c: 0x8a6a34 });
  P.push({ s: [0.14, 0.36, 0.14], p: [x, 1.57, z], c: 0xb02418 });
  return [x, 1.83, z];
}

// ---------------------------------------------------------------- run time (build)
/** Door leaves of a gate: w m opening at (x, z), wall along local x of yaw, the leaves hinged at ±w/2 and swinging to
 *  local +z (inward; out: to local −z). Returns set(open 0 … 1). */
function doorPair(root, x, z, yaw, w, h, { col = 0x2e1a12, stud = 0xb08a44, seal = false, out = false } = {}) {
  const cs = Math.cos(yaw), sn = Math.sin(yaw), mat = lit();
  const leaves = [-1, 1].map((sx) => {
    const b = [], lw = w / 2 - 0.05;
    b.push({ s: [lw, h, 0.26], p: [-sx * lw / 2, h / 2, 0], c: col });
    for (let y = 0.8; y < h - 0.3; y += 1.3) b.push({ s: [lw - 0.1, 0.2, 0.08], p: [-sx * lw / 2, y, 0.17], c: 0x1a120c });   // battens
    for (let y = 0.6; y < h - 0.4; y += 0.65) for (let q = 0; q < 3; q++) b.push({ s: [0.12, 0.12, 0.06], p: [-sx * (0.45 + q * (lw - 0.8) / 2), y, -0.16], c: stud });
    b.push({ s: [0.42, 0.42, 0.1], p: [-sx * (lw - 0.5), h * 0.46, -0.18], c: 0xc8a048 });         // the ring boss
    if (seal) b.push({ s: [0.36, 1.6, 0.03], p: [-sx * (lw - 0.18), h * 0.55, -0.15], c: 0xb8281a }, { s: [0.26, 0.26, 0.02], p: [-sx * (lw - 0.18), h * 0.55, -0.17], c: 0xe8d8b0 });   // cinnabar seal strips
    const m = new THREE.Mesh(boxesGeometry(b), mat);
    m.castShadow = m.receiveShadow = true;
    const g = new THREE.Group(); g.add(m);
    g.position.set(x + sx * (w / 2) * cs, 0, z - sx * (w / 2) * sn);
    root.add(g);
    return [g, sx];
  });
  const dir = out ? -1 : 1;
  return (open) => { const e = open * (2 - open); for (const [g, sx] of leaves) g.rotation.y = yaw + dir * sx * e * Math.PI * 0.46; };
}

/** buildSet(root, k, C): C = the map's constants { lamps, rack, stands, seal: { id: [x, z, yaw, w, h] }, gate: { id: [x,
 *  z, yaw, w, h] }, panel: [x, z], seven: [x, z] }. */
export function buildSet(root, k, C) {
  const sites = k.sites;
  let T = 0, lastFrame = Infinity, free = false;
  const st = { sealNgoai: -1e9, sealTay: -1e9, sealDong: -1e9, snuff: -1e9, matdao: -1e9, candles: -1e9, seven: -1e9 };
  const since = (key) => (st[key] > -1e8 ? T - st[key] : -1);

  // ---- engine gates: their leaves follow the sim state (heavy: ≈ 2 s)
  const gates = Object.entries(C.gate).map(([id, [x, z, yaw, w, h, o]]) => ({ id, set: doorPair(root, x, z, yaw, w, h, o), v: 1 }));
  // ---- the sealed gates: open at the start, shut on their set; a bar drops, the guard stands up in front
  const band = parseInt(k.army.ally.flag.slice(1), 16) || 0xa82a1e;
  const guardGeo = figureGeometry(0xb82a1e, band), seals = [];
  for (const [id, [x, z, yaw, w, h]] of Object.entries(C.seal)) {
    const set = doorPair(root, x, z, yaw, w, h, { out: true });                     // held open outward, into the passage
    const cs = Math.cos(yaw), sn = Math.sin(yaw);
    const bar = new THREE.Mesh(boxesGeometry([{ s: [w + 1.2, 0.34, 0.3], p: [0, 0, 0], c: 0x4a3018 }, { s: [0.5, 0.5, 0.36], p: [-w / 2 - 0.3, 0, 0], c: 0x8a6a34 }, { s: [0.5, 0.5, 0.36], p: [w / 2 + 0.3, 0, 0], c: 0x8a6a34 }]), lit());
    bar.rotation.y = yaw; root.add(bar);
    const men = new THREE.InstancedMesh(guardGeo, lit(), 7), m4 = new THREE.Matrix4(), q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw + Math.PI);
    for (let i = 0; i < 7; i++) {
      const lx = (i - 3) * 1.15, lz = 3.2 + (i % 2) * 0.7;
      men.setMatrixAt(i, m4.compose(new THREE.Vector3(x + lx * cs + lz * sn, 0, z - lx * sn + lz * cs), q, new THREE.Vector3(1, 1, 1)));
    }
    men.castShadow = true; root.add(men);
    seals.push({ id, set, bar, men, x, z, cs, sn, h });
  }

  // ---- the gallery lamps: one fire each, switched by its own clock; light sites on every second lamp
  const lampT = C.lamps.map(([, , z], i) => ({ z, keep: i % 5 === 2, out: Infinity }));
  const zs = C.lamps.map((l) => l[2]), zLo = Math.min(...zs), zHi = Math.max(...zs);
  C.lamps.forEach(([x, y, z], i) => k.fire(x, y, z, lampT[i].keep ? 0.12 : 0.17, false, () => T < lampT[i].out || lampT[i].keep));
  const lampSites = [];
  C.lamps.forEach(([x, y, z], i) => { if (i % 2 === 0) { const s = { x, y, z, i: 9, d: 8, k: 0 }; sites.push(s); lampSites.push([s, lampT[i]]); } });

  // ---- the hidden panel in the east wall (Mặt Sẹo's way out): slides north into the wall
  const [px, pz] = C.panel;
  const panel = new THREE.Mesh(boxesGeometry([{ s: [0.3, 3.0, 2.0], p: [0, 1.5, 0], c: 0x7a6e5e }, { s: [0.34, 0.14, 2.0], p: [0, 2.2, 0], c: 0x5e5446 }]), lit());
  panel.position.set(px, 0, pz); panel.castShadow = true; root.add(panel);
  const gap = new THREE.Mesh(boxesGeometry([{ s: [0.2, 3.0, 2.0], p: [0.18, 1.5, 0], c: 0x050307 }]), new THREE.MeshBasicMaterial({ vertexColors: true }));
  gap.position.set(px, 0, pz); root.add(gap);

  // ---- candles: flames as one instanced mesh (scaled to 0 while cold); rack rank by rank, then the stands row by row
  const flames = [...C.rack.map((p, i) => ({ p, t: 0.45 * Math.floor(i / C.rackCols) })), ...C.stands.map((p, i) => ({ p, t: 4.6 + 0.55 * Math.floor(i / 4) }))];
  const fm = new THREE.InstancedMesh(new THREE.BoxGeometry(0.06, 0.14, 0.06), new THREE.MeshBasicMaterial({ color: new THREE.Color(4.2, 2.6, 1.1) }), flames.length);
  fm.frustumCulled = false; fm.name = 'candle-flames'; root.add(fm);
  const candleSites = [];
  for (const [x, z, f] of C.candleLights) { const s = { x: 9e3, y: 1.6, z: 9e3, i: 0, d: 11, k: 0, at: [x, z], full: 26, f }; sites.push(s); candleSites.push(s); }
  // incense haze among the coffins: soft violet-grey cards drifting low (unlit, the fog does the rest)
  const hazeMat = new THREE.SpriteMaterial({ map: glowTex(), color: 0x6a5a78, transparent: true, depthWrite: false, opacity: 0.16 });
  const haze = C.haze.map(([x, z], i) => { const s = new THREE.Sprite(hazeMat); s.position.set(x, 1.4 + (i % 3) * 0.6, z); s.scale.set(9, 3.4, 1); root.add(s); return s; });

  // ---- the seven shadows before the flames
  const seven = new THREE.InstancedMesh(figureGeometry(0x0a0608, 0x0e0a0e), new THREE.MeshBasicMaterial({ color: 0x050306 }), 7);
  { const m4 = new THREE.Matrix4(), q = new THREE.Quaternion();
    for (let i = 0; i < 7; i++) seven.setMatrixAt(i, m4.compose(new THREE.Vector3(C.seven[0] + (i - 3) * 1.7, 0, C.seven[1] + Math.abs(i - 3) * 0.25), q, new THREE.Vector3(1.05, 1.05, 1.05))); }
  seven.visible = false; root.add(seven);

  const m4 = new THREE.Matrix4(), q4 = new THREE.Quaternion(), v4 = new THREE.Vector3(), s4 = new THREE.Vector3(), zero = new THREE.Vector3(0, 0, 0);
  const sets = {};
  for (const key of Object.keys(st)) sets[key] = () => { if (st[key] < -1e8) st[key] = T; if (key === 'snuff') snuffFrom(); };
  function snuffFrom() { for (const l of lampT) l.out = T + 0.4 + (l.z - zLo) / Math.max(1, zHi - zLo) * 9; }   // south → north over ≈ 9 s
  const reset = () => { for (const key in st) st[key] = -1e9; for (const l of lampT) l.out = Infinity; free = false; };
  reset();
  return {
    sets,
    update(dt, game) {
      T += dt;
      if (game && game.frame < lastFrame) reset();                                    // a new battle
      if (game) lastFrame = game.frame;
      if (game && game.mode !== 'story' && !free) {                                   // free: the sealed, snuffed, candle-lit night
        free = true; for (const key of ['sealNgoai', 'sealTay', 'sealDong', 'matdao', 'candles']) st[key] = T - 60;
        for (const l of lampT) l.out = -1;
      }
      for (const g of gates) { g.v += ((GATES[g.id]?.open ? 1 : 0) - g.v) * Math.min(1, dt * 1.4); g.set(g.v); }
      for (const s of seals) {
        const t = since(s.id), u = t < 0 ? 0 : sm(0, 2.2, t), drop = t < 0 ? 0 : sm(2.0, 2.8, t);
        s.set(1 - u);
        s.bar.visible = drop > 0; s.bar.position.set(s.x + 0.45 * s.sn, s.h * 0.55 + (1 - drop) * 1.6, s.z + 0.45 * s.cs);
        s.men.visible = t >= 1.2;
      }
      for (const [s, l] of lampSites) s.i = T < l.out || l.keep ? (l.keep && T >= l.out ? 4 : 9) * (0.85 + 0.15 * Math.sin(T * 13 + s.z)) : 0;
      const mt = since('matdao'), mu = mt < 0 ? 0 : sm(0, 1.4, mt);
      panel.position.z = pz + mu * 2.1; gap.visible = mu > 0.05;
      const ct = since('candles');
      for (let i = 0; i < flames.length; i++) {
        const f = flames[i], on = ct >= f.t ? Math.min(1, (ct - f.t) / 0.3) : 0, fl = 0.85 + 0.15 * Math.sin(T * 17 + i * 1.7);
        fm.setMatrixAt(i, on ? m4.compose(v4.set(...f.p), q4.identity(), s4.set(1, on * fl, 1)) : m4.compose(v4.set(...f.p), q4.identity(), zero));
      }
      fm.instanceMatrix.needsUpdate = true;
      for (const s of candleSites) { const on = ct >= s.f; s.x = on ? s.at[0] : 9e3; s.z = on ? s.at[1] : 9e3; s.i = on ? s.full * Math.min(1, (ct - s.f) / 1.2) : 0; }
      for (let i = 0; i < haze.length; i++) haze[i].position.x += Math.sin(T * 0.13 + i) * dt * 0.08;
      seven.visible = since('seven') >= 0;
    },
  };
}

function glowTex() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64;
  const g = cv.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,0.4)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(cv);
}
