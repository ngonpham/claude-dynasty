// Set-dressing kit of the 護靈壯士 fields: 十二使君's Vietnamese helpers re-exported whole (karsts, bamboo, reeds, stilt
// houses, thatch, banyans, paddies, boats, bronze drums, ramparts, temple gates … — read suquan/src/world/viet.js for
// each one) plus the props this story keeps returning to, so every stage shows the same coffins, candles and bells.
// Same contract as the suquan kit: every helper takes the dressing kit k (src/world/maps/index.js header), pushes boxes
// into k.props (solid colour) or k.glow (self-lit) and draws every random number from k.r in call order. Render only:
// a solid prop that stands on the walk field still needs a def.props footprint.
//   coffin(k, x, z, yaw, o)        one of the 99: a black-lacquered coffin, cinnabar bands, a gold reed-plume roundel on
//                                  the lid, the bronze lock — all 99 identical (o = { s = 1, y, lid = true, open = 0 })
//   coffinCart(k, x, z, yaw, o)    a two-wheeled ox-cart (no ox) carrying a coffin under a straw mat (o = { coffin = true, mat = true, broken = false })
//   coffinBier(k, x, z, yaw)       a bamboo bier: two poles, a coffin lashed on it, set down on trestles
//   coffinHall(k, x0, z0, cols, rows, o)   the store of the 99: a grid of coffins on low trestles (o = { gap = [2.6, 3.6], yaw = 0 })
//   candleRing(k, x, z, r, n, o)   a ring of red candles on the ground, little flames (glow) (o = { lit = n, y })
//   candleRows(k, x, z, cols, rows, o)  ranks of candles (99 before the seven, 49 before the queen) (o = { gap = 0.55, yaw = 0 })
//   altar(k, x, z, yaw, s)         the rite's altar: a lacquered table, a spirit tablet with no name, incense urn, two
//                                  tall banners (blank), offerings
//   bellPost(k, x, z, yaw, s)      a wooden frame hung with three bronze bells and red cords (Thầy Mo's signal post)
//   stork(k, x, y, z, yaw, o)      a white stork, standing or in flight (o = { fly = false, s = 1 })
//   storkFlock(k, x, y, z, n, o)   a loose V of storks in flight (o = { spread = 6, yaw = 0 })
//   reedPlumes(k, x, z, o)         a dense stand of white reed plumes (bông lau) on dry ground (o = { n = 30, r = 3 })
//   threadLine(k, pts, o)          the cinnabar thread (chỉ son) strung on little stakes along a polyline (o = { h = 0.9 })
//   bronzeToken(k, x, y, z, yaw)   a bronze token (thẻ đồng) on a small lacquer stand
export * from '../../../suquan/src/world/viet.js';
import { shade } from '../../../src/core/voxel.js';

const TAU = Math.PI * 2;
const LAC = 0x18110e, LACL = 0x2e221c, CIN = 0xa8281c, CINL = 0xd04a32, GOLD = 0xc89a48, GOLDL = 0xf0cc6a, BRONZE = 0x8a6a34;

// ---------------------------------------------------------------- the 99 coffins
/** One coffin, ≈ 2.3 × 0.8 m: black lacquer with two cinnabar bands, a raised lid with rounded ends, a gold reed-plume
 *  roundel on top, the bronze lock at the head. open (0-1) slides the lid aside. */
export function coffin(k, x, z, yaw = 0, { s = 1, y = k.topAt(x, z), lid = true, open = 0 } = {}) {
  const L = k.local(x, y, z, yaw), Ln = 2.3 * s, W = 0.82 * s, H = 0.72 * s;
  L(0, H * 0.45, 0, [W, H * 0.9, Ln], LAC);                                                      // the body
  L(0, H * 0.12, 0, [W + 0.08, 0.16 * s, Ln + 0.08], LACL);                                      // plinth lip
  for (const bz of [-0.62, 0.62]) L(0, H * 0.5, bz * s, [W + 0.04, H * 0.92, 0.12 * s], CIN);    // cinnabar bands
  if (lid) {
    const lx = open * W * 0.7;
    L(lx, H + 0.06 * s, 0, [W + 0.1, 0.14 * s, Ln + 0.16], LACL);                                 // the lid
    L(lx, H + 0.18 * s, 0, [W * 0.7, 0.12 * s, Ln * 0.92], LAC);                                  // its raised spine
    for (const bz of [-0.62, 0.62]) L(lx, H + 0.13 * s, bz * s, [W + 0.12, 0.16 * s, 0.13 * s], CIN);
    L(lx, H + 0.26 * s, 0, [0.34 * s, 0.05, 0.34 * s], GOLD);                                    // gold roundel
    for (let q = 0; q < 3; q++) L(lx, H + 0.29 * s, 0.02, [0.05, 0.03, 0.26 * s], GOLDL, [0, q * Math.PI / 3, 0]);   // reed-plume rays
  }
  L(0, H * 0.55, -Ln / 2 - 0.05, [0.22 * s, 0.26 * s, 0.1], BRONZE);                             // bronze lock at the head
  L(0, H * 0.55, -Ln / 2 - 0.1, [0.1 * s, 0.1 * s, 0.05], shade(BRONZE, 0.6));
}

/** A two-wheeled cart, its shafts down, a coffin lashed on under a straw mat (or empty; broken = one wheel off, tilted). */
export function coffinCart(k, x, z, yaw = 0, { coffin: carry = true, mat = true, broken = false } = {}) {
  const gy = k.topAt(x, z), tilt = broken ? 0.22 : 0, L = k.local(x, gy, z, yaw), WOOD = 0x5a4026, WOODD = 0x3a2818;
  for (const sx of [-1, 1]) {
    if (broken && sx > 0) { L(1.9, 0.25, 0.8, [0.2, 1.5, 1.5], WOODD, [0, 0.4, Math.PI / 2]); continue; }   // the wheel, fallen flat
    L(sx * 1.05, 0.75, 0, [0.16, 1.5, 1.5], WOODD);                                              // wheel (a disc of slabs)
    L(sx * 1.05, 0.75, 0, [0.16, 1.5, 1.5], WOODD, [Math.PI / 4, 0, 0]);
    L(sx * 1.12, 0.75, 0, [0.12, 0.34, 0.34], BRONZE);                                           // hub
  }
  L(0, 1.05 - tilt * 2, 0.2, [1.8, 0.16, 3.0], WOOD, [0, 0, tilt]);                               // bed
  for (const sx of [-1, 1]) L(sx * 0.95, 1.3 - tilt * 2 * sx, 0.2, [0.1, 0.4, 3.0], WOODD, [0, 0, tilt]);   // side rails
  for (const sx of [-0.45, 0.45]) L(sx, 0.55, -2.4, [0.12, 0.12, 2.6], WOOD, [-0.28, 0, 0]);     // shafts, resting on the ground
  if (carry) {
    coffin(k, x + Math.cos(yaw) * tilt, z, yaw, { s: 0.88, y: gy + 1.12 - tilt * 2 });
    if (mat) {
      const R = k.r;
      for (let i = 0; i < 5; i++) L(R.range(-0.1, 0.1), 1.92 - tilt * 2, -0.6 + i * 0.4, [1.05, 0.06, 0.42], shade(0xb8a064, R.range(0.85, 1.05)), [0, R.range(-0.1, 0.1), tilt]);
    }
  }
}

/** A bamboo bier on two trestles: the carrying poles stick out front and back; a coffin lashed on with rope. */
export function coffinBier(k, x, z, yaw = 0) {
  const gy = k.topAt(x, z), L = k.local(x, gy, z, yaw), BAM = 0x8a9a4a, ROPE = 0xb09868;
  for (const tz of [-0.8, 0.8]) for (const sx of [-1, 1]) L(sx * 0.5, 0.3, tz, [0.1, 0.6, 0.1], 0x4a3624, [0, 0, sx * 0.2]);   // trestles
  for (const sx of [-0.5, 0.5]) L(sx, 0.62, 0, [0.1, 0.1, 4.4], BAM);                            // the poles
  coffin(k, x, z, yaw, { s: 0.86, y: gy + 0.66 });
  for (const tz of [-0.55, 0.55]) L(0, 1.0, tz, [0.9, 0.06, 0.06], ROPE);
}

/** The sealed store: cols × rows coffins on low trestles in a grid that loses itself in the incense haze. */
export function coffinHall(k, x0, z0, cols, rows, { gap = [2.6, 3.6], yaw = 0 } = {}) {
  const cs = Math.cos(yaw), sn = Math.sin(yaw);
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const lx = (i - (cols - 1) / 2) * gap[0], lz = j * gap[1], x = x0 + lx * cs + lz * sn, z = z0 - lx * sn + lz * cs, gy = k.topAt(x, z);
    const L = k.local(x, gy, z, yaw);
    for (const tz of [-0.75, 0.75]) L(0, 0.15, tz, [0.9, 0.3, 0.18], 0x3a2a1e);                   // trestle
    coffin(k, x, z, yaw, { s: 0.92, y: gy + 0.3 });
  }
}

// ---------------------------------------------------------------- the rite
/** A red candle with its flame: wax in k.props, the flame in k.glow (lit = false: a cold wick). */
function candle(k, x, y, z, h, lit = true) {
  k.props.push({ s: [0.09, h, 0.09], p: [x, y + h / 2, z], c: shade(0xb02418, k.r.range(0.85, 1.1)) });
  if (lit) k.glow.push({ s: [0.05, 0.12, 0.05], p: [x, y + h + 0.07, z], c: 0xffb050 });
  else k.props.push({ s: [0.02, 0.05, 0.02], p: [x, y + h + 0.03, z], c: 0x1a1210 });
}

/** A ring of n candles r metres round (x, z); the first `lit` burn. */
export function candleRing(k, x, z, r, n, { lit = n, y } = {}) {
  for (let i = 0; i < n; i++) {
    const a = i / n * TAU, px = x + Math.sin(a) * r, pz = z + Math.cos(a) * r;
    candle(k, px, y ?? k.topAt(px, pz), pz, k.r.range(0.28, 0.42), i < lit);
  }
}

/** Ranks of candles: cols × rows on a gap grid centred on x, its first rank at z (lit all). */
export function candleRows(k, x, z, cols, rows, { gap = 0.55, yaw = 0, lit = cols * rows } = {}) {
  const cs = Math.cos(yaw), sn = Math.sin(yaw);
  for (let j = 0, n = 0; j < rows; j++) for (let i = 0; i < cols; i++, n++) {
    const lx = (i - (cols - 1) / 2) * gap, lz = j * gap, px = x + lx * cs + lz * sn, pz = z - lx * sn + lz * cs;
    candle(k, px, k.topAt(px, pz), pz, k.r.range(0.25, 0.4), n < lit);
  }
}

/** The rite's altar, facing -Z of its yaw: lacquered table, nameless spirit tablet, incense urn with smoke-glow, two tall
 *  blank banners on poles, fruit and rice offerings. */
export function altar(k, x, z, yaw = 0, s = 1) {
  const gy = k.topAt(x, z), L = k.local(x, gy, z, yaw);
  L(0, 0.15 * s, 0, [4.4 * s, 0.3 * s, 2.6 * s], 0x6a625a);                                       // stone step
  L(0, 0.75 * s, 0.2 * s, [3.2 * s, 0.12 * s, 1.3 * s], LACL);                                    // table top
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) L(sx * 1.45 * s, 0.5 * s, 0.2 * s + sz * 0.5 * s, [0.14 * s, 0.5 * s, 0.14 * s], LAC);
  L(0, 0.55 * s, -0.44 * s, [3.1 * s, 0.4 * s, 0.05], CIN);                                       // apron
  L(0, 1.25 * s, 0.5 * s, [0.5 * s, 0.9 * s, 0.14 * s], LAC);                                     // the tablet — no name
  L(0, 1.25 * s, 0.42 * s, [0.36 * s, 0.7 * s, 0.03], GOLD);
  L(0, 1.25 * s, 0.4 * s, [0.3 * s, 0.62 * s, 0.03], LACL);
  L(0, 0.95 * s, -0.1 * s, [0.4 * s, 0.3 * s, 0.4 * s], BRONZE);                                  // incense urn
  k.glow.push({ s: [0.1, 0.1, 0.1], p: [x, gy + 1.15 * s, z], c: 0xff8a3a });
  for (const sx of [-0.9, 0.9]) L(sx * s, 0.88 * s, 0.1 * s, [0.3 * s, 0.14 * s, 0.3 * s], [0xd8a030, 0xc83a24][sx > 0 ? 1 : 0]);   // offerings
  for (const sx of [-1, 1]) {                                                                     // tall blank banners
    L(sx * 2.6 * s, 2.4 * s, 0.6 * s, [0.12 * s, 4.8 * s, 0.12 * s], 0x3a2618);
    L(sx * 2.6 * s, 3.4 * s, 0.6 * s, [0.9 * s, 2.6 * s, 0.05], 0xe6dcc6);
    L(sx * 2.6 * s, 4.7 * s, 0.6 * s, [1.0 * s, 0.14 * s, 0.08], CIN);
  }
}

/** Thầy Mo's signal post: a wooden frame, three bronze bells under it, red cords hanging from the clappers. */
export function bellPost(k, x, z, yaw = 0, s = 1) {
  const gy = k.topAt(x, z), L = k.local(x, gy, z, yaw);
  for (const sx of [-1, 1]) L(sx * 0.9 * s, 1.3 * s, 0, [0.18 * s, 2.6 * s, 0.18 * s], 0x4a3420);
  L(0, 2.6 * s, 0, [2.2 * s, 0.2 * s, 0.24 * s], 0x5a4028);
  for (const bx of [-0.55, 0, 0.55]) {
    L(bx * s, 2.25 * s, 0, [0.34 * s, 0.4 * s, 0.34 * s], BRONZE);
    L(bx * s, 2.02 * s, 0, [0.42 * s, 0.08 * s, 0.42 * s], shade(BRONZE, 1.2));
    L(bx * s, 1.7 * s, 0, [0.04, 0.5 * s, 0.04], CIN);
  }
}

// ---------------------------------------------------------------- storks, reeds, the thread
/** A white stork: standing (long red-brown legs, folded wings, black flight feathers) or flying (wings spread, legs
 *  trailing, neck out). Faces +Z of its yaw. */
export function stork(k, x, y, z, yaw = 0, { fly = false, s = 1 } = {}) {
  const L = k.local(x, y, z, yaw), W = 0xf2efe6, BK = 0x1a1816, BILL = 0xc0482a;
  if (!fly) {
    for (const sx of [-0.08, 0.08]) L(sx * s, 0.4 * s, 0, [0.04 * s, 0.8 * s, 0.04 * s], BILL);
    L(0, 1.0 * s, 0, [0.3 * s, 0.34 * s, 0.6 * s], W);
    L(0, 1.02 * s, -0.25 * s, [0.32 * s, 0.22 * s, 0.3 * s], BK);                                // folded black flights
    L(0, 1.35 * s, 0.25 * s, [0.08 * s, 0.4 * s, 0.08 * s], W, [0.3, 0, 0]);                     // neck
    L(0, 1.58 * s, 0.34 * s, [0.12 * s, 0.12 * s, 0.14 * s], W);
    L(0, 1.56 * s, 0.5 * s, [0.04 * s, 0.04 * s, 0.24 * s], BILL);
    return;
  }
  L(0, 0, 0, [0.26 * s, 0.24 * s, 0.7 * s], W);                                                  // body
  L(0, 0.02 * s, 0.5 * s, [0.07 * s, 0.07 * s, 0.4 * s], W);                                     // neck out
  L(0, 0.02 * s, 0.82 * s, [0.04 * s, 0.04 * s, 0.26 * s], BILL);
  L(0, -0.02 * s, -0.6 * s, [0.06 * s, 0.04 * s, 0.5 * s], BILL);                                // legs trailing
  for (const sx of [-1, 1]) {
    L(sx * 0.55 * s, 0.06 * s, 0, [0.9 * s, 0.05 * s, 0.42 * s], W, [0, 0, sx * -0.12]);         // inner wing
    L(sx * 1.25 * s, 0.14 * s, -0.04 * s, [0.6 * s, 0.05 * s, 0.4 * s], BK, [0, 0, sx * -0.2]);  // black primaries
  }
}

/** A loose V of n storks in flight, apex at (x, y, z), heading along yaw. */
export function storkFlock(k, x, y, z, n, { spread = 6, yaw = 0, s = 1 } = {}) {
  const cs = Math.cos(yaw), sn = Math.sin(yaw), R = k.r;
  for (let i = 0; i < n; i++) {
    const side = i % 2 ? 1 : -1, rank = Math.ceil(i / 2), lx = side * rank * spread * 0.5 + R.range(-0.8, 0.8), lz = -rank * spread * 0.6 + R.range(-0.8, 0.8);
    stork(k, x + lx * cs + lz * sn, y + R.range(-1.2, 1.2), z - lx * sn + lz * cs, yaw + R.range(-0.1, 0.1), { fly: true, s });
  }
}

/** A dense stand of white reed plumes (bông lau) — legitimacy in this story; denser and paler than suquan's reedFlags. */
export function reedPlumes(k, x, z, { n = 30, r = 3 } = {}) {
  const { r: R, props } = k;
  for (let i = 0; i < n; i++) {
    const a = R.range(0, TAU), d = Math.sqrt(R.range(0, 1)) * r, px = x + Math.sin(a) * d, pz = z + Math.cos(a) * d, gy = k.ground(px, pz);
    const h = R.range(1.6, 2.8), tx = R.range(-0.2, 0.2), tz = R.range(-0.2, 0.2);
    props.push({ s: [0.05, h, 0.05], p: [px, gy + h / 2, pz], r: [tz, 0, -tx], c: shade(0x9a9456, R.range(0.85, 1.1)) });
    props.push({ s: [0.26, 0.9, 0.2], p: [px + tx * h, gy + h + 0.3, pz + tz * h], r: [tz + 0.35, R.range(0, 3), -tx - 0.2], c: shade(0xf2ece0, R.range(0.9, 1.04)) });
  }
}

/** The cinnabar thread on knee-high stakes along a polyline (a decoy route marker, or the purple-ink one: col). */
export function threadLine(k, pts, { h = 0.9, col = 0xc8281c } = {}) {
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i], [bx, bz] = pts[i + 1], Lg = Math.hypot(bx - ax, bz - az), yaw = Math.atan2(bx - ax, bz - az);
    const ga = k.ground(ax, az), gb = k.ground(bx, bz);
    k.props.push({ s: [0.08, h + 0.2, 0.08], p: [ax, ga + (h + 0.2) / 2, az], c: 0x5a4028 });
    k.props.push({ s: [0.03, 0.03, Lg], p: [(ax + bx) / 2, (ga + gb) / 2 + h, (az + bz) / 2], r: [Math.atan2(ga - gb, Lg), yaw, 0], c: col });
  }
  const [lx, lz] = pts[pts.length - 1], gl = k.ground(lx, lz);
  k.props.push({ s: [0.08, h + 0.2, 0.08], p: [lx, gl + (h + 0.2) / 2, lz], c: 0x5a4028 });
}

/** A bronze token (thẻ đồng, blank) standing on a small lacquer stand at height y. */
export function bronzeToken(k, x, y, z, yaw = 0) {
  const L = k.local(x, y, z, yaw);
  L(0, 0.05, 0, [0.3, 0.1, 0.2], LAC);
  L(0, 0.28, 0, [0.16, 0.36, 0.04], BRONZE);
  L(0, 0.28, -0.025, [0.1, 0.28, 0.01], shade(BRONZE, 1.3));
}
