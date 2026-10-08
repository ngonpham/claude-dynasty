// 阮匐's kit: his model def (model.js) and Guan Yu's glaive moveset (src/chars/guanyu/moves.js) through the def-kit adapter
// (src/chars/defkit.js), plus his look: a size up and broad (scale 1.1), the heaviest blows of the Đinh (camera kicks
// × 1.4), a deep rough voice, jade light edged in bronze in every effect (ribbon, contacts, dodge ghosts, the blade
// heating through a charge, the crescent waves), the Đại Hữu · Nguyễn Bặc / 定國 cut-in, no dragon. The edge lead is
// Guan Yu's (his kit's view hook rolls the glaive's edge into its swing: src/chars/guanyu/kit.js); its blade-heat half
// lands on a stand-in, his own heat is the adapter's.
import { defKit } from '../../../../src/chars/defkit.js';
import { GUANYU_KIT } from '../../../../src/chars/guanyu/kit.js';
import * as MOVESET from '../../../../src/chars/guanyu/moves.js';
import { NGUYENBAC_DEF } from './model.js';

const NO_HEAT = { blade: { emissive: { setHex() {} } } };

export const NGUYENBAC_KIT = defKit({
  ...NGUYENBAC_DEF,
  scale: 1.1,
  reach: { tip: 2.2, butt: 0.92 },
  trail: { base: 1.5, baseHeavy: 1.3, tip: 2.2 },
  weight: 1.4,
  voice: { pitch: 0.72, fk: 0.86, growl: 0.28, gain: 1.1 },
  heat: [0x46e08a, 0.2, 1.4, 1.0],
  view: (model, hero, dt, rig) => GUANYU_KIT.view(NO_HEAT, hero, dt, rig),
  fx: {
    needle: [[0.8, 2.3, 1.0], [1.6, 1.4, 0.4], [1.9, 2.8, 1.8]],
    hot: [[0.1, 0.46, 0.2], [0.3, 0.48, 0.16], [0.4, 0.56, 0.24], [1.6, 2.2, 1.3]],
    burst: [0.14, 0.46, 0.2], flash: [1.2, 2.5, 1.2], slash: [1.6, 2.8, 1.4], pulse: [0.9, 1.6, 0.6],
    light: [0.6, 1, 0.6], crack: [1.4, 2.2, 0.9], wall: [0.5, 1.0, 0.4], ring: [1.1, 2.1, 0.9], shard: [1.4, 2.4, 1.1],
    glint: [2.0, 2.6, 1.6], glitter: [1.9, 2.6, 1.4],
    glow: [0x6a4a1a, 0x3ad080, 0.35],
    trail: { white: [1.0, 1.08, 0.86], fringe: [0.1, 0.85, 0.35], hot: [1.4, 1.6, 1.0], glow: [0.9, 1.3, 0.35], grad: true },
    ghost: [0x2a8a52, 0x3cb86e, 0xe8e0b0, 0xc8a860, 0x34a862],
    mu: { crack: [1.4, 2.2, 0.9], wall: [0.4, 0.8, 0.3], light: [0.7, 1, 0.6] },
  },
  look: {
    cut: { sub: 'Đại Hữu · Nguyễn Bặc', seal: '定國', css: {
      big: 'color: #f2fff0; text-shadow: 0 0 2px #06140a, 6px 8px 0 rgba(4,14,6,.55), 0 0 28px rgba(70,220,130,.6);',
      sub: 'color: #e6f6d4; text-shadow: 0 0 10px rgba(200,160,70,.75), 2px 2px 0 rgba(0,0,0,.6);' } },
    pal: { rays: [0.8, 1.3, 0.55], ring: [1.1, 2.1, 0.9], bolt: null, burst: [0.9, 1.8, 0.7], ko: [0.5, 1.0, 0.4], glow: 0xb8f0a0,
      mote: [1.2, 1.4, 1.0], rib: [0.35, 1.5, 0.6], rib2: [1.6, 1.15, 0.35], aura: [0.45, 0.9, 0.4],
      dim: [[170, 206, 160], [100, 134, 90], [52, 76, 46]], cool: [214, 236, 196], wash: [[250, 255, 240], [222, 246, 206], [170, 214, 150]] },
  },
  sig: { roar: [0.9, 2.1, 0.9], core: [1.9, 2.6, 1.7], wave: [0.5, 2.1, 0.8], beam: [1.0, 2.1, 0.9], charge: [0.8, 2.2, 0.8] },
}, MOVESET);
