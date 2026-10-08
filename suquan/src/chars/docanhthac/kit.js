// Đỗ Cảnh Thạc's kit: his model def (model.js) on Lü Bu's halberd moveset (engine src/chars/lubu/moves.js) through the
// def-kit adapter (src/chars/defkit.js), plus his look — the biggest body (scale 1.16), the heaviest blows (camera
// kicks × 1.45), a rasping bellow; violet with ember sparks in every effect (ribbon, contacts, dodge ghosts, the steel
// glowing violet through a charge and his Musou), the «Đỗ Động Giang · Đỗ Cảnh Thạc» cut-in under the 杜洞 seal — and
// his boss profile for the actors system (src/actors/actors.js attacks[] on the moveset's clips; chapter III's last
// duel and the Bình Thập Nhị Sứ trial spawn him with role 'boss').
import { defKit } from '../../../../src/chars/defkit.js';
import * as MOVESET from '../../../../src/chars/lubu/moves.js';
import { DOCANHTHAC_DEF } from './model.js';

export const DOCANHTHAC_KIT = defKit({
  ...DOCANHTHAC_DEF,
  scale: 1.16,
  reach: { tip: 2.24, butt: 0.94 },
  trail: { base: 1.3, baseHeavy: 1.1, tip: 2.36 },
  weight: 1.45,
  voice: { pitch: 0.68, fk: 0.82, growl: 0.6, gain: 1.15 },
  heat: [0xb050ff, 0.2, 1.5, 1.3],
  fx: {
    needle: [[2.2, 0.9, 2.8], [1.6, 0.4, 2.3], [2.8, 1.8, 3.0]],
    hot: [[0.42, 0.1, 0.6], [0.5, 0.16, 0.66], [0.62, 0.26, 0.74], [2.2, 1.3, 2.0]],
    burst: [0.44, 0.1, 0.58], flash: [2.2, 0.9, 2.6], slash: [2.6, 1.2, 3.0], pulse: [1.4, 0.4, 1.9],
    light: [0.8, 0.42, 1], crack: [2.6, 0.9, 0.3], wall: [1.0, 0.3, 1.3], ring: [1.9, 0.7, 2.3], shard: [2.6, 1.0, 0.3],
    glint: [2.6, 1.6, 2.8], glitter: [2.8, 1.2, 0.35],
    glow: [0x5a1a8a, 0xb860f0, 0.35],
    trail: { white: [1.04, 0.92, 1.1], fringe: [0.6, 0.12, 1.0], hot: [1.6, 1.1, 1.8], glow: [1.1, 0.3, 1.6], grad: true },
    ghost: [0x6a2aa0, 0xa050e0, 0xf4e6ff, 0xd8a8ff, 0x8038c0],
    mu: { crack: [2.6, 0.9, 0.3], wall: [0.8, 0.22, 1.0], light: [0.8, 0.42, 1] },
  },
  look: {
    cut: { sub: 'Đỗ Động Giang · Đỗ Cảnh Thạc', seal: '杜洞', css: {
      big: 'color: #f8f0ff; text-shadow: 0 0 2px #10041a, 6px 8px 0 rgba(14,2,22,.6), 0 0 30px rgba(170,70,255,.65);',
      sub: 'color: #ecdcff; text-shadow: 0 0 10px rgba(160,60,255,.8), 2px 2px 0 rgba(0,0,0,.6);' } },
    pal: { rays: [1.0, 0.35, 1.4], ring: [1.8, 0.6, 2.3], bolt: null, burst: [2.2, 0.9, 0.35], ko: [0.8, 0.26, 1.1], glow: 0xc070ff,
      mote: [1.6, 0.8, 0.35], rib: [1.2, 0.3, 1.7], rib2: [1.7, 0.6, 0.2], aura: [0.7, 0.24, 1.0],
      dim: [[180, 150, 214], [110, 74, 150], [56, 30, 84]], cool: [226, 206, 246], wash: [[252, 244, 255], [228, 196, 255], [176, 120, 226]] },
  },
  sig: { roar: [1.8, 0.5, 2.4], core: [2.4, 1.5, 2.6], wave: [1.7, 0.45, 2.4], beam: [2.0, 0.8, 2.5], charge: [2.6, 0.9, 0.3] },
}, MOVESET);

// Boss profile (actors.js attacks[]; hitbox == telegraph decal), on the moveset's clips: the whirl round him, the
// ramming thrust down a lane, the leap onto the hero and — rarest, longest tell — the crescent storm's wide ring. Slower
// to wind up than the original's flying general, every blow heavier.
DOCANHTHAC_KIT.bossAttacks = [
  { id: 'sweep', clip: 'c4', windup: 38, active: 30, recover: 32, every: 8, dmg: 36, shape: 'circle', r: 4.6, range: [0, 4.6], weight: 5 },
  { id: 'thrust', clip: 'c3', windup: 32, active: 16, recover: 30, every: 4, dmg: 42, shape: 'lane', w: 2.6, len: 8.5, lunge: 5.2,
    range: [2.4, 9], weight: 3 },
  { id: 'leap', clip: 'c5', t1: 0.7, windup: 26, active: 30, recover: 36, dmg: 52, shape: 'leap', r: 4.8, len: 12, h: 2.6, range: [5.5, 13], weight: 2 },
  { id: 'storm', clip: 'c6', f: [24, 85], t1: 0.9, windup: 46, active: 44, recover: 32, every: 11, dmg: 32, shape: 'circle', r: 6.6, range: [0, 6.2], weight: 1.5 },
];
DOCANHTHAC_KIT.bossPoise = 460;
