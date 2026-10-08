// Tả Tướng's kit: his model def (model.js) on Zhang Fei's serpent-spear moveset (engine src/chars/zhangfei/moves.js, the
// roar Musou included) through the def-kit adapter (src/chars/defkit.js), exactly as 十二使君's Phạm Bạch Hổ borrows it,
// plus his look: a size up (1.13, the moveset's baked scale) and the heaviest blows (camera kicks × 1.45), a deep
// booming voice; bronze-orange and ember red in every effect (ribbon, contacts, dodge ghosts, the broad blade glowing
// like a forge through a charge and his Musou), the «Tả Tướng quân» cut-in under the 左將 seal, no dragon. Export
// contract: KIT (the CHARS kit).
import { defKit } from '../../../../src/chars/defkit.js';
import * as MOVESET from '../../../../src/chars/zhangfei/moves.js';
import { TATUONG_DEF } from './model.js';

export const KIT = defKit({
  ...TATUONG_DEF,
  scale: 1.13,
  reach: { tip: 2.22, butt: 0.9 },
  trail: { base: 1.32, baseHeavy: 1.1, tip: 2.36 },
  weight: 1.45,
  voice: { pitch: 0.68, fk: 0.84, growl: 0.36, gain: 1.12 },
  heat: [0xff7a2a, 0.22, 1.5, 1.2],
  fx: {
    needle: [[2.8, 1.5, 0.5], [2.3, 0.9, 0.25], [3.0, 2.2, 1.2]],
    hot: [[0.6, 0.22, 0.06], [0.68, 0.3, 0.1], [0.76, 0.42, 0.16], [2.3, 1.5, 0.8]],
    burst: [0.6, 0.22, 0.06], flash: [2.7, 1.5, 0.55], slash: [3.0, 1.8, 0.7], pulse: [1.9, 0.75, 0.2],
    light: [1, 0.55, 0.3], crack: [2.8, 1.1, 0.3], wall: [1.3, 0.5, 0.14], ring: [2.3, 1.1, 0.35], shard: [2.7, 1.4, 0.45],
    glint: [2.9, 2.0, 1.0], glitter: [2.8, 1.3, 0.35],
    glow: [0x8a2a0a, 0xf08a3a, 0.35],
    trail: { white: [1.1, 0.96, 0.82], fringe: [1.0, 0.32, 0.06], hot: [1.75, 1.25, 0.7], glow: [1.6, 0.6, 0.14], grad: true },
    ghost: [0xa83a14, 0xe0782c, 0xfff0dc, 0xffb878, 0xc8501c],
    mu: { crack: [2.8, 1.1, 0.3], wall: [1.0, 0.36, 0.1], light: [1, 0.55, 0.3] },
  },
  look: {
    cut: { sub: 'Tả Tướng quân', seal: '左將', css: {
      big: 'color: #fff4e8; text-shadow: 0 0 2px #1a0802, 6px 8px 0 rgba(22,8,2,.6), 0 0 30px rgba(255,120,40,.65);',
      sub: 'color: #ffe2c4; text-shadow: 0 0 10px rgba(230,90,30,.8), 2px 2px 0 rgba(0,0,0,.6);' } },
    pal: { rays: [1.5, 0.6, 0.2], ring: [2.3, 1.1, 0.35], bolt: null, burst: [2.2, 1.0, 0.3], ko: [1.1, 0.42, 0.14], glow: 0xffa060,
      mote: [1.6, 1.0, 0.5], rib: [1.6, 0.55, 0.14], rib2: [1.8, 0.9, 0.3], aura: [1.0, 0.4, 0.14],
      dim: [[214, 170, 140], [150, 96, 66], [84, 44, 26]], cool: [244, 218, 196], wash: [[255, 246, 236], [255, 212, 170], [232, 140, 80]] },
  },
  sig: { roar: [2.4, 1.0, 0.3], core: [2.8, 2.0, 1.1], wave: [2.2, 0.8, 0.22], beam: [2.4, 1.2, 0.4], charge: [2.6, 1.0, 0.3] },
}, MOVESET);
