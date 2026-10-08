// 丁部領's kit: Zhao Yun's spear moveset, clips, feet and 真・無雙 sim (src/chars/zhaoyun/kit.js) carried by his own model
// (model.js, built and chained like a def kit: hero/model.js buildDef, hero/secondary.js chainSet) and his own look:
// the default body scale, a little weight to his blows (camera kicks × 1.1), a clear commanding voice, crimson and gold
// in every effect (ribbon, contacts, dodge ghosts), and his Musou on Zhao Yun's timeline in his colours — a golden-red
// dragon (musou/view.js look.dragon), warm rays and wash, the Hoa Lư · Đinh Bộ Lĩnh / 萬勝 cut-in. fx.musou 'own':
// vfx.js leaves out Zhao Yun's teal-only layers (his C5 ice fan, C3 smoke arc, teal Musou streaks) and paints the
// shared Musou ground layers from fx.mu.
import { ZHAOYUN_KIT } from '../../../../src/chars/zhaoyun/kit.js';
import { buildDef } from '../../../../src/hero/model.js';
import { chainSet } from '../../../../src/hero/secondary.js';
import { ZY_FX } from '../../../../src/vfx/vfx.js';
import { createMusouView, ZY_LOOK } from '../../../../src/musou/view.js';
import { DINHBOLINH_DEF } from './model.js';

const LOOK = {
  ...ZY_LOOK,
  cut: { sub: 'Hoa Lư · Đinh Bộ Lĩnh', seal: '萬勝', css: {
    big: 'color: #fff4e0; text-shadow: 0 0 2px #1c0804, 6px 8px 0 rgba(22,5,2,.55), 0 0 28px rgba(255,170,60,.6);',
    sub: 'color: #ffe6b8; text-shadow: 0 0 10px rgba(230,70,30,.75), 2px 2px 0 rgba(0,0,0,.6);' } },
  // the golden-red dragon (linear HDR; shell = its rim glow, ink = its outline)
  dragon: { body: [0.42, 0.05, 0.02], scale: [0.72, 0.16, 0.03], belly: [1.25, 0.9, 0.36], fin: [1.6, 0.85, 0.22], eye: [3.0, 2.6, 0.8],
    horn: [1.6, 1.25, 0.5], white: [1.2, 1.1, 0.9], whisker: [1.7, 1.1, 0.4], mouth: [0.3, 0.01, 0.02], shell: [1.25, 0.5, 0.12], ink: 0x1c0602 },
  pal: { rays: [1.4, 0.82, 0.26], ring: [2.2, 1.25, 0.36], bolt: [2.4, 1.7, 0.6], burst: [1.9, 1.0, 0.3], ko: [1.05, 0.56, 0.16], glow: 0xffc070,
    mote: [1.4, 1.2, 0.8], rib: [1.6, 0.42, 0.12], rib2: [1.7, 1.2, 0.3], aura: [0.95, 0.55, 0.18],
    dim: [[224, 180, 140], [160, 104, 76], [92, 52, 40]], cool: [244, 222, 190], wash: [[255, 248, 232], [255, 222, 170], [232, 170, 110]] },
};

export const DINHBOLINH_KIT = {
  ...ZHAOYUN_KIT,
  model: (rig) => buildDef(rig, DINHBOLINH_DEF.build()),
  secondary: (scene, rig, mat) => chainSet(scene, rig, mat, DINHBOLINH_DEF.chains()),
  reach: { tip: 2.04, butt: 0.86 },
  trail: { base: 1.3, baseHeavy: 1.1, tip: 2.12 },
  weight: 1.1,
  voice: { pitch: 0.9, fk: 0.95, growl: 0.06, gain: 1.05 },
  fx: {
    ...ZY_FX, musou: 'own',
    needle: [[2.8, 1.6, 0.5], [2.6, 0.7, 0.2], [3.0, 2.4, 1.4]],
    hot: [[0.56, 0.16, 0.04], [0.62, 0.3, 0.06], [0.64, 0.44, 0.12], [2.2, 1.8, 0.9]],
    burst: [0.55, 0.2, 0.04], flash: [2.6, 1.7, 0.6], slash: [3.0, 2.0, 0.8], pulse: [1.9, 0.8, 0.2],
    light: [1, 0.66, 0.3], crack: [2.8, 1.2, 0.3], wall: [1.3, 0.6, 0.14], ring: [2.2, 1.3, 0.4], shard: [2.6, 1.6, 0.5],
    glint: [2.8, 2.2, 1.0], glitter: [2.8, 2.0, 0.8],
    glow: [0x8a1e0c, 0xe8a030, 0.35],
    trail: { white: [1.1, 1.0, 0.8], fringe: [1.0, 0.16, 0.05], hot: [1.7, 1.4, 0.7], glow: [1.6, 0.5, 0.1], grad: true },
    ghost: [0xb02a1c, 0xd84a28, 0xffe0a8, 0xf0c060, 0xd04020],
    mu: { crack: [2.8, 1.3, 0.35], wall: [0.9, 0.4, 0.1], light: [1, 0.7, 0.3] },
  },
  createMusouView: (scene, game, camera) => createMusouView(scene, game, camera, LOOK),
};
