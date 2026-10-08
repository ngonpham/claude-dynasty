// Hữu Tướng's kit: his model def (model.js) on Guan Yu's glaive moveset (engine src/chars/guanyu/moves.js) through the
// def-kit adapter (src/chars/defkit.js), exactly as 十二使君's Nguyễn Bặc borrows it, plus his look: the default body
// (lean, not bigger), heavy measured blows (camera kicks × 1.3), a gravelly low voice; steel blue edged in pale silver
// in every effect (ribbon, contacts, dodge ghosts, the long saber's edge going cold-white through a charge and his
// Musou), the «Hữu Tướng quân» cut-in under the 右將 seal, no dragon. The edge lead is Guan Yu's (his kit's view hook
// rolls the blade's edge — local +Y — into its swing: src/chars/guanyu/kit.js); its blade-heat half lands on a stand-in,
// his own heat is the adapter's. Export contract: KIT (the CHARS kit).
import { defKit } from '../../../../src/chars/defkit.js';
import { GUANYU_KIT } from '../../../../src/chars/guanyu/kit.js';
import * as MOVESET from '../../../../src/chars/guanyu/moves.js';
import { HUUTUONG_DEF } from './model.js';

const NO_HEAT = { blade: { emissive: { setHex() {} } } };

export const KIT = defKit({
  ...HUUTUONG_DEF,
  reach: { tip: 2.2, butt: 0.96 },
  trail: { base: 1.5, baseHeavy: 1.32, tip: 2.2 },                    // along the saber blade
  weight: 1.3,
  voice: { pitch: 0.8, fk: 0.9, growl: 0.42, gain: 1.05 },
  heat: [0x9ec8ff, 0.2, 1.3, 1.0],
  view: (model, hero, dt, rig) => GUANYU_KIT.view(NO_HEAT, hero, dt, rig),
  fx: {
    needle: [[1.6, 1.9, 2.6], [0.9, 1.3, 2.1], [2.4, 2.6, 2.9]],
    hot: [[0.14, 0.24, 0.48], [0.22, 0.32, 0.56], [0.36, 0.46, 0.68], [1.7, 1.9, 2.3]],
    burst: [0.16, 0.26, 0.5], flash: [1.6, 1.9, 2.5], slash: [2.0, 2.3, 2.8], pulse: [0.7, 1.0, 1.7],
    light: [0.62, 0.78, 1], crack: [1.4, 1.8, 2.5], wall: [0.5, 0.7, 1.2], ring: [1.3, 1.6, 2.2], shard: [1.8, 2.1, 2.6],
    glint: [2.4, 2.6, 2.9], glitter: [2.0, 2.2, 2.6],
    glow: [0x1e3466, 0x8ab0ec, 0.35],
    trail: { white: [1.0, 1.04, 1.1], fringe: [0.2, 0.42, 1.0], hot: [1.5, 1.65, 1.9], glow: [0.4, 0.7, 1.5], grad: true },
    ghost: [0x2a4a8a, 0x5a80c8, 0xe8eef8, 0xb8c8e4, 0x3a5ea8],
    mu: { crack: [1.4, 1.8, 2.5], wall: [0.4, 0.55, 0.95], light: [0.62, 0.78, 1] },
  },
  look: {
    cut: { sub: 'Hữu Tướng quân', seal: '右將', css: {
      big: 'color: #f2f6ff; text-shadow: 0 0 2px #040a18, 6px 8px 0 rgba(4,8,20,.55), 0 0 28px rgba(90,140,230,.6);',
      sub: 'color: #e0e8f6; text-shadow: 0 0 10px rgba(190,205,230,.75), 2px 2px 0 rgba(0,0,0,.6);' } },
    pal: { rays: [0.6, 0.85, 1.45], ring: [1.3, 1.6, 2.2], bolt: null, burst: [1.0, 1.3, 1.9], ko: [0.45, 0.62, 1.0], glow: 0xa8c4f0,
      mote: [1.3, 1.36, 1.5], rib: [0.4, 0.7, 1.6], rib2: [1.5, 1.55, 1.7], aura: [0.42, 0.58, 1.0],
      dim: [[160, 172, 200], [92, 106, 140], [44, 54, 84]], cool: [210, 220, 240], wash: [[248, 250, 255], [214, 226, 248], [160, 182, 226]] },
  },
  sig: { roar: [1.1, 1.5, 2.3], core: [2.1, 2.3, 2.7], wave: [0.7, 1.1, 2.1], beam: [1.2, 1.5, 2.2], charge: [1.0, 1.4, 2.3] },
}, MOVESET);
