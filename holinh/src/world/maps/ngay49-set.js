// Set pieces of Màn VI «Ngày Bốn Mươi Chín» (holinh/src/world/maps/ngay49.js): the field's shared geometry constants
// and buildSet(root, k, def) — the map's build(): static custom sets (the stone bridge, the 49 candles, the seven beacon
// peaks, the sluice and its basin, the cave mouth, the stone door, the hall's violet flames) and the scene changes the
// story fires (story:set → sets[name]()):
//   candle49  the 49th candle is lit (its flame + a warm pulse)            arrow   an arrow drops three steps from the Queen
//   beacons   seven fires flare at once on the seven karst peaks (halos read through the haze); over ≈ 20 s the dawn haze
//             lifts into full morning (sky light up, the fog paling to gold)
//   sluice    the sluice gate rises, the high basin drains, the cave mouth shows, and the raft of coffins glides from the
//             reeds through the stone gate into the dark — and is gone (nothing beyond the cave mouth is ever built)
//   door      the stone slab crashes down in the door frame (the hero beyond it)
//   seal      the stone works close: slabs fall into the mouths of the five false corridors, dust; the storks rise
// The violet hall dims the sky light a little while the focus is in it. A new battle (game.frame back to 0) resets every
// set; free mode stands in the lit morning (49th candle, beacons). Render only — never sim state.
import * as THREE from 'three';
import { boxesGeometry, shade } from '../../../../src/core/voxel.js';
import { lit } from '../../../../src/world/castle.js';
import * as V from '../viet.js';

export const smooth = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
const TAU = Math.PI * 2;

// ---- shared geometry (the map def and the story read these through the map's anchors)
export const RIVER_Z = -10, RHW = 5;                                  // the river: centre under the bridge, deep half width
/** River centre z at x: straight under the bridge, meandering east and west of it. */
export const riverC = (x) => RIVER_Z + 3.5 * Math.sin(x * 0.05 + 0.3) * Math.min(1, (x / 24) ** 2);
export const SLUICE_X = 30, CAVE_X = 57;                              // the stone sluice across the river; the cave mouth's face
export const SLUICE = [SLUICE_X, riverC(SLUICE_X)];
export const RITE = [0, -106], PLAT_H = 1.0, PR0 = 13, PR1 = 18;      // the rite's mound: centre, height, flat radius, foot
export const ALTAR = [0, -95], QUEEN = [0, -101], CANDLE_C = [0, -102.5], CANDLE_R = 5.6;
export const DOOR_Z = 63;
export const STAIR_PTS = [[0, 4, 8, 0], [0, 8, 6.5, 0], [-1, 20, 5.2, 2.2], [1, 32, 5, 4.4], [0, 44, 5.2, 6.6], [0, 54, 6, 8]];   // the wet stairs (a path piece)
/** The stairs' centre line x at z (along STAIR_PTS). */
export const stairX = (z) => { for (let i = 0; i < STAIR_PTS.length - 1; i++) { const [ax, az] = STAIR_PTS[i], [bx, bz] = STAIR_PTS[i + 1]; if (z <= bz) return ax + (bx - ax) * Math.max(0, (z - az) / (bz - az)); } return 0; };
export const HALL = [0, 100, 24, 26];                                 // the violet hall: ellipse centre x, z, radii x, z
// the five false corridors off the hall: [[x, z, half width], …] (walkable dead ends; build drops slabs in their mouths)
export const CORRIDORS = [
  [[-19, 95, 2.8], [-34, 92, 2.6], [-46, 101, 2.4]],
  [[-14, 117, 2.8], [-24, 132, 2.6], [-18, 148, 2.4]],
  [[2, 123, 3.0], [8, 140, 2.6], [0, 158, 2.4]],
  [[14, 117, 2.8], [28, 130, 2.6], [42, 127, 2.4]],
  [[19, 94, 2.8], [36, 98, 2.6], [46, 86, 2.4]],
];
// the seven beacon peaks round the field: [x, z, height, radius] (all off the walk field)
export const PEAKS = [[-88, -120, 62, 9], [-98, -62, 70, 10], [-74, -2, 60, 9], [-36, 34, 66, 8], [38, 30, 62, 8], [76, -16, 68, 9], [96, -88, 72, 10]];

const STONE = 0x8c877c, STONED = 0x5e5a52, WOOD = 0x4a3420, VIOLET = 0xb070ff;

function glowTex() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64;
  const g = cv.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,0.4)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(cv);
}

/** A private dressing kit: the same helpers (V.coffin, V.stork …) pushed into own box lists for a movable mesh. */
function subKit(k) {
  const b = [], g = [];
  const kk = { ...k, props: b, glow: g, local: (x0, y0, z0, yaw) => (lx, ly, lz, s, c, rr = [0, 0, 0]) => {
    const cs = Math.cos(yaw), sn = Math.sin(yaw);
    b.push({ s, p: [x0 + lx * cs + lz * sn, y0 + ly, z0 - lx * sn + lz * cs], r: [rr[0], yaw + rr[1], rr[2]], c });
  } };
  return { kk, b, g };
}

export function buildSet(root, k, def) {
  const { props, glow } = k, R = k.r;
  const mesh = (boxes, mat = lit(), at = [0, 0, 0]) => {
    const m = new THREE.Mesh(boxesGeometry(boxes.map((q) => ({ ...q, p: [q.p[0] - at[0], q.p[1] - at[1], q.p[2] - at[2]] }))), mat);
    m.position.set(...at); m.castShadow = m.receiveShadow = true; root.add(m);
    return m;
  };
  const glowMat = (c = 0xffffff, i = 4) => new THREE.MeshBasicMaterial({ vertexColors: true, color: new THREE.Color(c).multiplyScalar(i) });
  const T = { t: 0 }, st = { candle49: -1e9, arrow: -1e9, beacons: -1e9, sluice: -1e9, door: -1e9, seal: -1e9 };
  const since = (key) => (st[key] > -1e8 ? T.t - st[key] : -1);
  const on = (key, delay = 0) => () => since(key) >= delay;
  const halo = glowTex();
  const sprite = (c, x, y, z, sx, sy) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: halo, color: c, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, fog: false }));
    s.position.set(x, y, z); s.scale.set(sx, sy, 1); s.visible = false; root.add(s);
    return s;
  };

  // ---- the render bed under the bridge (the deck spans water; the sim deck stays walkable)
  { const bed = root.getObjectByName('ground').geometry, pos = bed.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setY(i, def.water.bedHeight(pos.getX(i), pos.getZ(i), pos.getY(i)));
    pos.needsUpdate = true; bed.computeVertexNormals(); bed.computeBoundingSphere(); }

  // ---- the old stone bridge: flagged deck on the sim's ramped deck, low stone parapets with posts, two piers and the
  // arch spandrels over the water, stone footings at both heads
  { const b = [], Z0 = RIVER_Z - 8.5, Z1 = RIVER_Z + 8.5, y0 = (z) => k.ground(0, z) + 0.12;
    let q = 0;
    for (let z = Z0; z < Z1; z += 0.62, q++) b.push({ s: [8.8, 0.24, 0.6], p: [((q * 5) % 3 - 1) * 0.04, y0(z) - 0.12, z], c: shade(STONE, 0.82 + ((q * 13) % 7) / 26) });
    for (const sx of [-1, 1]) for (let z = Z0; z < Z1 - 0.1; z += 1.4) {
      const za = z, zb = Math.min(Z1, z + 1.4), ya = y0(za), yb = y0(zb), L = Math.hypot(zb - za, yb - ya), pitch = -Math.atan2(yb - ya, zb - za);
      b.push({ s: [0.5, 0.7, L + 0.02], p: [sx * 4.45, (ya + yb) / 2 + 0.35, (za + zb) / 2], r: [pitch, 0, 0], c: shade(STONE, 0.92) });
      b.push({ s: [0.62, 0.14, L + 0.04], p: [sx * 4.45, (ya + yb) / 2 + 0.76, (za + zb) / 2], r: [pitch, 0, 0], c: shade(STONE, 1.05) });
      b.push({ s: [0.66, 1.1, 0.66], p: [sx * 4.45, ya + 0.55, za], c: shade(STONED, 1.1) });
    }
    const top = y0(RIVER_Z);
    for (const dz of [-2.6, 2.6]) b.push({ s: [8.6, top + 2.4, 1.6], p: [0, (top - 2.4) / 2, RIVER_Z + dz], c: shade(STONED, 1.0) });   // piers
    for (const dz of [-5.6, 0, 5.6]) b.push({ s: [9.0, 0.9, dz ? 2.4 : 3.6], p: [0, top - 0.6, RIVER_Z + dz], c: shade(STONE, 0.86) });  // arch spandrels
    for (const z of [Z0 - 0.6, Z1 + 0.6]) for (const sx of [-1, 1]) b.push({ s: [1.1, 1.6, 1.1], p: [sx * 4.6, k.ground(sx * 4.6, z) + 0.8, z], c: shade(STONED, 0.95) });
    mesh(b); }

  // ---- the 49 candles round the Queen: 48 lit from the start, the 49th (the one nearest the altar) lit by 'candle49'
  let flame49, halo49;
  { const [cx, cz] = CANDLE_C;
    let last = null;
    for (let i = 0; i < 49; i++) {
      const a = (i + 0.5) / 49 * TAU, x = cx + Math.sin(a) * CANDLE_R, z = cz + Math.cos(a) * CANDLE_R, gy = k.ground(x, z), h = R.range(0.3, 0.42);
      props.push({ s: [0.1, h, 0.1], p: [x, gy + h / 2, z], c: shade(0xb02418, R.range(0.85, 1.1)) }, { s: [0.16, 0.04, 0.16], p: [x, gy + 0.02, z], c: 0xc89a48 });
      if (i === 48) last = [x, gy + h, z];                                          // just west of due north: the altar side
      else glow.push({ s: [0.05, 0.13, 0.05], p: [x, gy + h + 0.08, z], c: 0xffb050 });
    }
    // the 49th: a taller candle with a bigger flame and a small halo
    props.push({ s: [0.13, 0.2, 0.13], p: [last[0], last[1] + 0.1, last[2]], c: 0xc02a1a });
    flame49 = mesh([{ s: [0.08, 0.2, 0.08], p: [last[0], last[1] + 0.32, last[2]], c: 0xffc060 }, { s: [0.04, 0.1, 0.04], p: [last[0], last[1] + 0.27, last[2]], c: 0xffffff }], glowMat(0xffffff, 3));
    flame49.castShadow = false; flame49.visible = false;
    halo49 = sprite(0xffa040, last[0], last[1] + 0.35, last[2], 1.6, 1.8);
    // the white chalk ring the candles stand on and the inner diagram round the Queen
    for (let i = 0; i < 64; i++) {
      const a = i / 64 * TAU;
      for (const rr of [CANDLE_R + 0.35, CANDLE_R - 0.5, 2.4]) props.push({ s: [rr * TAU / 64 + 0.05, 0.03, 0.08], p: [cx + Math.sin(a) * rr, k.ground(cx + Math.sin(a) * rr, cz + Math.cos(a) * rr) + 0.02, cz + Math.cos(a) * rr], r: [0, a + Math.PI / 2, 0], c: 0xe6dfcc });
    } }

  // ---- the arrow that falls three steps from the Queen ('arrow'): it drops in steep and sticks, quivering
  const AR = [QUEEN[0] - 1.7, QUEEN[1] - 1.9], arGy = k.ground(...AR);
  const arrow = mesh([{ s: [0.04, 1.15, 0.04], p: [0, 0.45, 0], c: 0x4a3524 }, { s: [0.1, 0.2, 0.02], p: [0, 0.95, 0], c: 0xe8e2d4 }, { s: [0.02, 0.2, 0.1], p: [0, 0.95, 0], c: 0xb02a1a },
    { s: [0.07, 0.14, 0.07], p: [0, -0.1, 0], c: 0x8a8e94 }], lit(), [0, 0, 0]);
  arrow.visible = false;

  // ---- the seven beacon peaks: tall karst towers, a stone cairn on each crown, a fire (k.fire, switched) and a halo
  const beaconHalos = [];
  PEAKS.forEach(([x, z, h, r], i) => {
    V.karst(k, x, z, { h, r, lean: 0 });
    const top = k.topAt(x, z) - 1 + h + 1.4;
    props.push({ s: [3.4, 1.2, 3.4], p: [x, top - 0.4, z], c: shade(0x6e6a62, 0.95) }, { s: [2.4, 0.5, 2.4], p: [x, top + 0.3, z], r: [0, 0.6, 0], c: 0x4a4640 });
    k.fire(x, top + 0.5, z, 2.8, true, on('beacons', i * 0.08));
    k.fire(x + 0.9, top + 0.6, z - 0.6, 1.6, false, on('beacons', 0.5 + i * 0.08));
    beaconHalos.push(sprite(0xff8a30, x, top + 3.5, z, 30, 26));
  });

  // ---- the sluice: a stone dam across the river with a timber gate in its middle (rises on 'sluice'), the winch post
  // and ropes to the bank; east of it a walled high basin whose surface drains on 'sluice'; the cave mouth in a karst
  // mass over the river at CAVE_X (its throat is black — nothing is built inside)
  const [sx0, sc] = SLUICE, GATE_W = 4.2;
  { const b = [];
    for (let z = sc - RHW - 1.5; z < sc + RHW + 1.5; z += 1.2) {
      if (Math.abs(z - sc) < GATE_W / 2 + 0.3) continue;
      b.push({ s: [2.6, 3.2, 1.22], p: [sx0, 0.4, z + 0.6], c: shade(STONE, R.range(0.78, 1.0)) });
    }
    for (const sd of [-1, 1]) b.push({ s: [3.0, 5.4, 0.9], p: [sx0, 1.4, sc + sd * (GATE_W / 2 + 0.45)], c: shade(STONED, 1.05) });   // gate cheeks
    b.push({ s: [3.0, 0.7, GATE_W + 2.0], p: [sx0, 4.4, sc], c: shade(STONED, 0.95) });                                              // the head beam
    // the basin's stone embankments (along the deep edge on both sides) up to the cave mouth
    for (let x = sx0 + 1.4; x < CAVE_X; x += 2) for (const sd of [-1, 1]) b.push({ s: [2.05, 2.6, 0.7], p: [x + 1, 0.3, riverC(x + 1) + sd * (RHW - 0.3)], c: shade(STONE, R.range(0.75, 0.95)) });
    // the winch post on the south bank and its ropes to the gate
    const wz = sc - RHW - 2;
    b.push({ s: [0.4, 2.6, 0.4], p: [sx0 - 1.2, k.ground(sx0 - 1.2, wz) + 1.3, wz], c: WOOD }, { s: [0.4, 2.6, 0.4], p: [sx0 + 1.2, k.ground(sx0 + 1.2, wz) + 1.3, wz], c: WOOD },
      { s: [2.8, 0.36, 0.36], p: [sx0, k.ground(sx0, wz) + 2.2, wz], c: 0x6a4a2a });
    for (const dx of [-0.6, 0.6]) b.push({ s: [0.05, 0.05, Math.hypot(wz - sc, 1.6)], p: [sx0 + dx, k.ground(sx0, wz) + 3.0, (wz + sc) / 2], r: [-Math.atan2(1.6, sc - wz), 0, 0], c: 0xb09868 });
    // the cave mouth: a karst mass straddling the river, a jagged face and a black throat just above the low water
    const cz = riverC(CAVE_X);
    for (let i = 0; i < 9; i++) {
      const w = R.range(10, 16), h = R.range(16, 34), d = R.range(8, 14);
      b.push({ s: [d, h, w], p: [CAVE_X + d / 2 + R.range(0, 6), h / 2 - 1, cz + R.range(-9, 9)], r: [0, R.range(-0.2, 0.2), 0], c: shade(0x9a958a, R.range(0.75, 1.05)) });
    }
    for (const sd of [-1, 1]) b.push({ s: [3.2, 7, 4.2], p: [CAVE_X - 0.6, 2.6, cz + sd * 4.6], c: shade(0x8a857a, 0.9) });                // the mouth's cheeks
    b.push({ s: [3.4, 3.2, 12], p: [CAVE_X - 0.8, 5.0, cz], c: shade(0x8a857a, 0.85) });                                                   // its lip
    mesh(b);
    const throat = new THREE.Mesh(new THREE.BoxGeometry(1.2, 3.6, 5.2), new THREE.MeshBasicMaterial({ color: 0x050403 }));
    throat.position.set(CAVE_X + 0.2, 1.2, cz); root.add(throat);
    for (const [dx, dz] of [[-3, -3.2], [-5, 3.4]]) { const x = CAVE_X + dx; V.reedPlumes(k, x, riverC(x) + dz * 1.6, { n: 8, r: 1 }); } }
  const gateSlab = mesh([{ s: [0.5, 4.6, GATE_W + 0.2], p: [sx0, 0, sc], c: 0x5a3e24 }, ...[-1, 0, 1].map((q) => ({ s: [0.56, 0.24, GATE_W + 0.3], p: [sx0, q * 1.4, sc], c: 0x3a2818 }))], lit(), [sx0, 1.6, sc]);
  // the high basin: water boxes between the embankments, lowered and hidden as it drains
  const basinMat = new THREE.MeshStandardMaterial({ color: 0x2a5848, roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.9 });
  const basinB = [];
  for (let x = sx0 + 1.4; x < CAVE_X + 0.6; x += 2) basinB.push({ s: [2.1, 0.2, 2 * (RHW - 0.7)], p: [x + 1, 0, riverC(x + 1)], c: 0xffffff });
  const basin = mesh(basinB, basinMat, [0, 0, 0]);
  basin.castShadow = false;
  const BASIN_HI = 1.4, BASIN_LO = -0.45;
  // the raft: lashed bamboo, three identical coffins on it (one of them the true one — the scene never says which), a
  // poleman's pole; moored in the reeds by the jetty until the gate opens
  const raft = new THREE.Group();
  { const { kk, b } = subKit(k);
    for (let i = 0; i < 10; i++) b.push({ s: [8.6, 0.22, 0.24], p: [0, 0, -1.1 + i * 0.245], c: shade(0x8a9a4a, R.range(0.8, 1.05)) });
    for (const lx of [-3.6, 0, 3.6]) b.push({ s: [0.16, 0.18, 2.6], p: [lx, 0.18, 0], c: 0x6a5a30 });
    for (const lx of [-2.8, 0, 2.8]) V.coffin(kk, lx, 0, Math.PI / 2, { s: 0.92, y: 0.2 });
    b.push({ s: [0.08, 0.08, 5.6], p: [-4.2, 1.6, 0.9], r: [0.9, 0, 0], c: 0x6a5a30 });
    const m = new THREE.Mesh(boxesGeometry(b), lit()); m.castShadow = true; raft.add(m); }
  raft.name = 'raft'; root.add(raft);
  const RAFT0 = 13, RAFT1 = CAVE_X + 5, raftAt = (x) => { raft.position.set(x, -0.12, riverC(x) - 2.2 * smooth(SLUICE_X - 2, SLUICE_X - 10, x)); };

  // ---- the stone door: two jambs, a lintel, the rock round them; the slab waits in the slot above (drops on 'door')
  const DY = k.ground(0, DOOR_Z);
  { const b = [];
    for (const sx of [-1, 1]) {
      b.push({ s: [2.6, 7.2, 2.6], p: [sx * 4.9, DY + 3.4, DOOR_Z], c: shade(STONED, 0.95) });
      b.push({ s: [5.2, 14, 4], p: [sx * 8.6, DY + 6, DOOR_Z + 0.6], c: shade(0x8a857a, R.range(0.8, 0.95)) });
    }
    b.push({ s: [13.4, 2.0, 3.2], p: [0, DY + 7.6, DOOR_Z], c: shade(STONED, 1.05) }, { s: [12, 1.6, 2.4], p: [0, DY + 9.3, DOOR_Z + 0.4], c: shade(0x8a857a, 0.9) });
    for (let i = 0; i < 6; i++) b.push({ s: [0.3, R.range(2, 5), 0.2], p: [R.range(-6, 6), DY + R.range(2, 6), DOOR_Z - 1.62], c: 0x3e4c48 });   // seeps down the face
    mesh(b); }
  const slab = mesh([{ s: [7.4, 6.4, 1.0], p: [0, DY + 3.2, DOOR_Z + 0.2], c: shade(0x7a766c, 1) }, { s: [6.2, 0.2, 1.06], p: [0, DY + 1.4, DOOR_Z + 0.2], c: 0x5a564e },
    { s: [6.2, 0.2, 1.06], p: [0, DY + 4.6, DOOR_Z + 0.2], c: 0x5a564e }, { s: [1.2, 1.2, 1.1], p: [0, DY + 3.0, DOOR_Z + 0.2], c: 0x6a665c }], lit(), [0, DY, DOOR_Z]);
  const SLAB_UP = 7.2;
  slab.position.y = DY + SLAB_UP;

  // ---- the wet stone steps up the cleft (on the sim's ramp: one tread per 0.7 m of rise)
  { const b = [];
    for (let z = 7; z < 54; z += 0.9) {
      const x = stairX(z), gy = k.ground(x, z);
      b.push({ s: [9.4 - Math.min(3, Math.max(0, z - 8) / 10), 0.24, 0.98], p: [x, gy - 0.05, z], c: shade(0x6a6e68, 0.78 + ((z * 7.1) % 1) * 0.2) });
      if ((z * 3.3) % 1 < 0.3) b.push({ s: [R.range(0.6, 1.6), 0.03, 0.5], p: [x + R.range(-3, 3), gy + 0.08, z], c: 0x4a6a64 });           // puddles
    }
    mesh(b); }

  // ---- the violet hall: stone fire bowls with violet flames (self-lit, flickering) and violet halos
  const BOWLS = [[-9, 88], [9, 88], [-15, 102], [15, 102], [-8, 114], [8, 114]];
  const vflames = [];
  for (const [x, z] of BOWLS) {
    const gy = k.ground(x, z);
    props.push({ s: [0.5, 1.1, 0.5], p: [x, gy + 0.55, z], c: 0x3a3438 }, { s: [1.2, 0.36, 1.2], p: [x, gy + 1.2, z], c: 0x4a4248 }, { s: [1.0, 0.1, 1.0], p: [x, gy + 1.4, z], c: 0x1a1018 });
    const y = gy + 1.45;
    const f = mesh([{ s: [0.5, 0.9, 0.5], p: [x, y + 0.45, z], c: 0xc890ff }, { s: [0.3, 1.3, 0.3], p: [x + 0.1, y + 0.65, z - 0.05], c: 0xe8c8ff }, { s: [0.22, 0.6, 0.22], p: [x - 0.18, y + 0.3, z + 0.12], c: 0x9a50f0 }],
      glowMat(0xffffff, 2.2), [x, y, z]);
    f.castShadow = false;
    const s = sprite(VIOLET, x, gy + 2.2, z, 5, 5); s.visible = true; s.material.opacity = 0.55;
    vflames.push({ f, s, ph: R.range(0, 6.28) });
  }

  // ---- the stone works: one slab per false corridor, waiting above its mouth (falls on 'seal'), and their dust
  const seals = CORRIDORS.map((pts, i) => {
    const [ax, az, aw] = pts[0], [bx, bz] = pts[1], L = Math.hypot(bx - ax, bz - az), t = 4 / L, x = ax + (bx - ax) * t, z = az + (bz - az) * t;
    const yaw = Math.atan2(bx - ax, bz - az), gy = k.ground(x, z);
    const m = mesh([{ s: [aw * 2 + 2.4, 6, 1.3], p: [0, 3, 0], c: shade(0x7a766c, R.range(0.85, 1)) }, { s: [aw * 2 + 2.6, 0.3, 1.4], p: [0, 6, 0], c: 0x5a564e }], lit(), [0, 0, 0]);
    m.rotation.y = yaw; m.position.set(x, gy, z); m.visible = false;
    return { m, gy, d: 0.5 + i * 0.45 };
  });
  const dustMat = new THREE.SpriteMaterial({ map: halo, color: 0xb8ad98, transparent: true, depthWrite: false, opacity: 0 });
  const dusts = [...seals.map((s) => [s.m.position.x, s.gy, s.m.position.z, s.d]), [0, DY, DOOR_Z - 1.5, 0]].map(([x, y, z, d]) => {
    const s = new THREE.Sprite(dustMat.clone()); s.position.set(x, y + 1.6, z); s.scale.set(9, 6, 1); s.visible = false; root.add(s);
    return { s, d };
  });

  // ---- the storks: a loose flock rising out of the hall's clearing and away over the karsts once the works close
  const storks = new THREE.Group();
  { const { kk, b } = subKit(k);
    V.storkFlock(kk, 0, 0, 0, 13, { spread: 7, yaw: 0.5, s: 1.3 });
    const m = new THREE.Mesh(boxesGeometry(b), lit()); storks.add(m); }
  storks.visible = false; root.add(storks);
  // and a few standing in the shallows below the bridge from the start (dress), flying ones high over the rite: static
  { V.storkFlock(k, -30, 46, -60, 7, { spread: 8, yaw: 0.9, s: 1.2 }); V.storkFlock(k, 40, 52, 40, 5, { spread: 9, yaw: -0.4, s: 1.2 }); }

  // ---- morning (after the beacons) and the hall's dimness: the scene's sky light and haze, eased; restored on reset
  const MORNING_FOG = new THREE.Color(0xc8c0ae), HALL_FOG = new THREE.Color(0x4a3e5a);
  let saved = null, hallV = 0, mornV = 0;
  const restore = () => {
    const sc = root.parent;
    if (saved && sc) { sc.fog.color.copy(saved.fog); saved.hemi.intensity = saved.hi; saved.hemi.color.copy(saved.hc); }
    saved = null;
  };

  const sets = {};
  for (const key in st) sets[key] = () => { if (st[key] < -1e8) st[key] = T.t; };
  let lastFrame = 0, free = false;
  const reset = () => { for (const key in st) st[key] = -1e9; restore(); free = false; hallV = mornV = 0; };
  return {
    sets,
    update(dt, game) {
      T.t += dt;
      if (game) {
        if (game.frame < lastFrame) reset();                                       // a new battle
        lastFrame = game.frame;
        if (game.mode !== 'story' && !free) { free = true; st.candle49 = st.beacons = T.t - 60; }   // free mode: the lit morning
      }
      const t = T.t, fl = 0.85 + 0.15 * Math.sin(t * 9) * Math.sin(t * 13.7);
      // the 49th candle
      const c49 = since('candle49');
      flame49.visible = c49 >= 0; halo49.visible = c49 >= 0;
      if (c49 >= 0) { const g = Math.min(1, c49 / 0.8); flame49.scale.set(1, g * (0.9 + 0.12 * Math.sin(t * 17)), 1); halo49.material.opacity = g * (0.5 + 0.2 * fl); }
      // the arrow: 0.22 s drop, then a quiver dying out
      const at = since('arrow');
      arrow.visible = at >= 0;
      if (at >= 0) {
        const u = Math.min(1, at / 0.22);
        arrow.position.set(AR[0] - (1 - u) * 1.2, arGy + 0.35 + (1 - u) * 7, AR[1] - (1 - u) * 3);
        const q = u < 1 ? 0 : Math.sin((at - 0.22) * 40) * 0.08 * Math.exp(-(at - 0.22) * 4);
        arrow.rotation.set(-0.38 + q, 0, 0.18);
      }
      // the beacons' halos
      const bt = since('beacons');
      beaconHalos.forEach((s, i) => { const v = bt >= 0 ? Math.min(1, Math.max(0, (bt - i * 0.08) / 1.5)) : 0; s.visible = v > 0; s.material.opacity = v * (0.7 + 0.3 * fl); });
      // the sluice: the gate rises over 3 s, the basin drains over 6 s, the raft goes from 2.5 s on (≈ 15 s to the dark)
      const sl = since('sluice'), su = sl >= 0 ? smooth(0, 3, sl) : 0, sd = sl >= 0 ? smooth(0.8, 6.5, sl) : 0;
      gateSlab.position.y = 1.6 + su * 4.4;
      basin.position.y = BASIN_HI + (BASIN_LO - BASIN_HI) * sd; basin.visible = sd < 1;
      const rx = RAFT0 + (RAFT1 - RAFT0) * (sl >= 0 ? smooth(2.5, 17, sl) : 0);
      raftAt(rx); raft.visible = rx < CAVE_X + 4;
      raft.rotation.y = Math.atan2(-(riverC(rx + 1) - riverC(rx - 1)), 2) * (sl >= 0 ? 1 : 0) + Math.sin(t * 0.7) * 0.02;
      // the stone door: falls in 0.7 s (gravity), a little bounce of dust
      const dr = since('door');
      slab.position.y = DY + (dr >= 0 ? SLAB_UP * (1 - Math.min(1, (dr / 0.7) ** 2)) : SLAB_UP);
      // the works: each slab appears high in its corridor and drops in 0.8 s, staggered
      const sv = since('seal');
      for (const s of seals) {
        const u = sv >= 0 ? Math.min(1, Math.max(0, (sv - s.d) / 0.8)) : -1;
        s.m.visible = u >= 0; s.m.position.y = s.gy + 14 * (1 - u * u);
      }
      for (const d of dusts) {
        const ref = d === dusts[dusts.length - 1] ? (dr >= 0 ? dr - 0.7 : -1) : (sv >= 0 ? sv - d.d - 0.8 : -1);
        d.s.visible = ref >= 0 && ref < 4; if (d.s.visible) { d.s.material.opacity = 0.75 * (1 - ref / 4); const g = 1 + ref * 0.5; d.s.scale.set(9 * g, 6 * g, 1); }
      }
      // the storks: up out of the clearing and away north-east over ≈ 30 s
      const sk = sv >= 0 ? sv - 2.5 : -1;
      storks.visible = sk >= 0 && sk < 40;
      if (sk >= 0) storks.position.set(HALL[0] - 10 + sk * 2.2, k.ground(HALL[0], HALL[1]) + 6 + sk * 1.5, HALL[1] - 16 + sk * 3.4);
      // violet flames flicker
      for (const v of vflames) { const g = 0.85 + 0.25 * Math.sin(t * 11 + v.ph) * Math.sin(t * 7.3 + v.ph * 2); v.f.scale.set(1, g, 1); v.s.material.opacity = 0.4 + 0.2 * g; }
      // the sky: full morning after the beacons; dimmer, violet haze while the focus is in the hall
      const sc = root.parent, fz = game?.hero?.z ?? -1e3;
      mornV += ((bt >= 0 ? smooth(1, 20, bt) : 0) - mornV) * Math.min(1, dt * 2);
      hallV += ((fz > DOOR_Z + 2 ? 1 : 0) - hallV) * Math.min(1, dt * 0.8);
      if (sc && (mornV > 0.001 || hallV > 0.001 || saved)) {
        if (!saved) { const hemi = sc.children.find((o) => o.isHemisphereLight); if (!hemi || !sc.fog) return; saved = { fog: sc.fog.color.clone(), hemi, hc: hemi.color.clone(), hi: hemi.intensity }; }
        sc.fog.color.copy(saved.fog).lerp(MORNING_FOG, mornV * 0.45).lerp(HALL_FOG, hallV * 0.5);
        saved.hemi.intensity = saved.hi * (1 + 0.18 * mornV) * (1 - 0.42 * hallV);
      }
    },
  };
}
