// Hàng Tướng's kit: his model def (model.js) on Lü Bu's halberd moveset (engine src/chars/lubu/moves.js) through the
// def-kit adapter (src/chars/defkit.js), exactly as 十二使君's Đỗ Cảnh Thạc borrows it, plus his look — a broad heavy body
// (scale 1.14, Lü Bu's own), the heaviest blows (camera kicks × 1.4), a deep rough voice; moss green with burnt-orange
// sparks in every effect (the burning pass: ribbon, contacts, dodge ghosts, the iron glowing like embers through a
// charge and his Musou), the «Quèn Thành · Hàng Tướng» cut-in under the 報恩 seal, no dragon — and his boss profile for
// the actors system (src/actors/actors.js attacks[] on the moveset's clips: Màn I's last duel and the trials spawn him
// with role 'boss'). Export contract: KIT (the CHARS kit).
import { defKit } from '../../../../src/chars/defkit.js';
import * as MOVESET from '../../../../src/chars/lubu/moves.js';
import { HANGTUONG_DEF } from './model.js';

export const KIT = defKit({
  ...HANGTUONG_DEF,
  scale: 1.14,
  reach: { tip: 2.24, butt: 0.96 },
  trail: { base: 1.3, baseHeavy: 1.1, tip: 2.36 },
  weight: 1.4,
  voice: { pitch: 0.7, fk: 0.84, growl: 0.48, gain: 1.12 },
  heat: [0xff6a1a, 0.2, 1.5, 1.3],
  fx: {
    needle: [[1.6, 2.4, 0.6], [1.0, 1.8, 0.3], [2.8, 1.8, 0.6]],
    hot: [[0.3, 0.42, 0.1], [0.4, 0.5, 0.14], [0.6, 0.48, 0.16], [2.2, 1.6, 0.7]],
    burst: [0.32, 0.44, 0.1], flash: [1.9, 2.4, 0.8], slash: [2.4, 2.6, 1.0], pulse: [0.9, 1.5, 0.3],
    light: [0.62, 0.9, 0.36], crack: [2.8, 1.0, 0.25], wall: [0.7, 1.0, 0.25], ring: [1.5, 2.1, 0.55], shard: [2.8, 1.2, 0.3],
    glint: [2.4, 2.6, 1.4], glitter: [2.8, 1.2, 0.3],
    glow: [0x3a5a1a, 0xe07a2a, 0.35],
    trail: { white: [1.0, 1.06, 0.88], fringe: [0.35, 0.9, 0.1], hot: [1.6, 1.7, 1.0], glow: [0.6, 1.3, 0.2], grad: true },
    ghost: [0x3a6a24, 0x6a9a3a, 0xf2f6e0, 0xe8a060, 0x4e7e2c],
    mu: { crack: [2.8, 1.0, 0.25], wall: [0.55, 0.8, 0.2], light: [0.62, 0.9, 0.36] },
  },
  look: {
    cut: { sub: 'Quèn Thành · Hàng Tướng', seal: '報恩', css: {
      big: 'color: #f6fbe8; text-shadow: 0 0 2px #0a1404, 6px 8px 0 rgba(8,16,4,.6), 0 0 30px rgba(120,190,60,.6);',
      sub: 'color: #ffe6c8; text-shadow: 0 0 10px rgba(230,110,30,.8), 2px 2px 0 rgba(0,0,0,.6);' } },
    pal: { rays: [0.7, 1.2, 0.3], ring: [1.5, 2.1, 0.55], bolt: null, burst: [2.2, 1.0, 0.3], ko: [0.5, 0.8, 0.2], glow: 0xb0d870,
      mote: [1.7, 1.1, 0.45], rib: [0.5, 1.4, 0.25], rib2: [1.8, 0.8, 0.2], aura: [0.5, 0.8, 0.22],
      dim: [[176, 190, 150], [104, 120, 80], [48, 62, 34]], cool: [222, 234, 204], wash: [[250, 255, 240], [226, 244, 196], [176, 210, 130]] },
  },
  sig: { roar: [1.3, 2.0, 0.5], core: [2.3, 2.5, 1.5], wave: [2.4, 1.0, 0.25], beam: [1.5, 2.0, 0.6], charge: [2.6, 1.1, 0.3] },
}, MOVESET);

// Boss profile (actors.js attacks[]; hitbox == telegraph decal), on the moveset's clips: the whirl round him, the
// ramming thrust down a lane, the leap onto the hero and — rarest, longest tell — the crescent storm's wide ring. A
// soldier's patience: slower to wind up than the flying general, every blow heavy.
KIT.bossAttacks = [
  { id: 'sweep', clip: 'c4', windup: 36, active: 30, recover: 32, every: 8, dmg: 34, shape: 'circle', r: 4.5, range: [0, 4.5], weight: 5 },
  { id: 'thrust', clip: 'c3', windup: 32, active: 16, recover: 30, every: 4, dmg: 40, shape: 'lane', w: 2.5, len: 8.5, lunge: 5.2,
    range: [2.4, 9], weight: 3 },
  { id: 'leap', clip: 'c5', t1: 0.7, windup: 26, active: 30, recover: 36, dmg: 48, shape: 'leap', r: 4.6, len: 12, h: 2.6, range: [5.5, 13], weight: 2 },
  { id: 'storm', clip: 'c6', f: [24, 85], t1: 0.9, windup: 46, active: 44, recover: 32, every: 11, dmg: 30, shape: 'circle', r: 6.4, range: [0, 6], weight: 1.5 },
];
KIT.bossPoise = 440;
