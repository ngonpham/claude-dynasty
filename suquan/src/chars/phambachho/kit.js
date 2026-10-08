// Phạm Bạch Hổ's kit: his model def (model.js) on Zhang Fei's serpent-spear moveset (engine src/chars/zhangfei/moves.js,
// the roar Musou included) through the def-kit adapter (src/chars/defkit.js), plus his look: a size up (1.13, the
// moveset's baked scale) and heavy (camera kicks × 1.4), a deep old growl; ice-white and pale blue in every effect
// (ribbon, contacts, dodge ghosts, the blade frosting through a charge and his Musou), the «Đằng Châu · Phạm Bạch Hổ»
// cut-in under the 白虎 seal, no dragon.
import { defKit } from '../../../../src/chars/defkit.js';
import * as MOVESET from '../../../../src/chars/zhangfei/moves.js';
import { PHAMBACHHO_DEF } from './model.js';

export const PHAMBACHHO_KIT = defKit({
  ...PHAMBACHHO_DEF,
  scale: 1.13,
  reach: { tip: 2.22, butt: 0.86 },
  trail: { base: 1.3, baseHeavy: 1.1, tip: 2.36 },
  weight: 1.4,
  voice: { pitch: 0.74, fk: 0.86, growl: 0.32, gain: 1.05 },
  heat: [0x8ad0ff, 0.22, 1.4, 1.1],
  fx: {
    needle: [[2.0, 2.5, 3.0], [1.3, 1.8, 2.6], [2.8, 3.0, 3.0]],
    hot: [[0.26, 0.4, 0.6], [0.36, 0.5, 0.68], [0.52, 0.66, 0.82], [1.9, 2.1, 2.4]],
    burst: [0.28, 0.42, 0.62], flash: [1.9, 2.3, 2.8], slash: [2.3, 2.6, 3.0], pulse: [0.9, 1.3, 1.9],
    light: [0.78, 0.88, 1], crack: [1.7, 2.2, 2.8], wall: [0.7, 0.95, 1.4], ring: [1.5, 1.85, 2.4], shard: [1.9, 2.3, 2.8],
    glint: [2.6, 2.8, 3.0], glitter: [2.1, 2.4, 2.8],
    glow: [0x34628e, 0xa0d0ff, 0.35],
    trail: { white: [1.0, 1.04, 1.1], fringe: [0.3, 0.58, 1.0], hot: [1.55, 1.72, 1.9], glow: [0.55, 0.92, 1.6], grad: true },
    ghost: [0x4e7cb4, 0x92bce8, 0xf0f6ff, 0xc4dcff, 0x628ec8],
    mu: { crack: [1.7, 2.2, 2.8], wall: [0.5, 0.68, 1.0], light: [0.78, 0.88, 1] },
  },
  look: {
    cut: { sub: 'Đằng Châu · Phạm Bạch Hổ', seal: '白虎', css: {
      big: 'color: #f4f8ff; text-shadow: 0 0 2px #06101c, 6px 8px 0 rgba(4,10,20,.55), 0 0 28px rgba(150,205,255,.6);',
      sub: 'color: #e2f0ff; text-shadow: 0 0 10px rgba(120,190,255,.75), 2px 2px 0 rgba(0,0,0,.6);' } },
    pal: { rays: [0.9, 1.15, 1.5], ring: [1.5, 1.9, 2.4], bolt: null, burst: [1.3, 1.65, 2.1], ko: [0.7, 0.9, 1.15], glow: 0xb8dcff,
      mote: [1.3, 1.4, 1.55], rib: [0.7, 1.0, 1.7], rib2: [1.5, 1.6, 1.8], aura: [0.6, 0.78, 1.05],
      dim: [[168, 186, 214], [96, 116, 150], [52, 66, 96]], cool: [214, 230, 250], wash: [[250, 253, 255], [222, 236, 252], [168, 196, 230]] },
  },
  sig: { roar: [1.5, 1.9, 2.5], core: [2.2, 2.4, 2.7], wave: [1.4, 1.8, 2.5], beam: [1.7, 2.0, 2.6], charge: [1.5, 1.9, 2.6] },
}, MOVESET);
