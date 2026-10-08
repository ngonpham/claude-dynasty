// An Nhiên's kit: Zhao Yun's spear moveset, clips, feet and 真・無雙 sim (src/chars/zhaoyun/kit.js) carried by her own
// model (model.js, built and chained like a def kit: hero/model.js buildDef, hero/secondary.js chainSet) and her own
// look: the default body scale, quick light blows (camera kicks × 0.95), a higher, clear voice with little growl,
// cinnabar red and reed-white silver in every effect (ribbon, contacts, dodge ghosts), and her Musou on Zhao Yun's
// timeline in her colours — a crimson dragon with white-silver fins and whiskers (musou/view.js look.dragon), silver-red
// rays and a pale wash, the Hộ linh · An Nhiên / 安然 cut-in. fx.musou 'own': vfx.js leaves out Zhao Yun's teal-only
// layers and paints the shared Musou ground layers from fx.mu.
import { ZHAOYUN_KIT } from '../../../../src/chars/zhaoyun/kit.js';
import { buildDef } from '../../../../src/hero/model.js';
import { chainSet } from '../../../../src/hero/secondary.js';
import { ZY_FX } from '../../../../src/vfx/vfx.js';
import { createMusouView, ZY_LOOK } from '../../../../src/musou/view.js';
import { ANNHIEN_DEF } from './model.js';

const LOOK = {
  ...ZY_LOOK,
  cut: { sub: 'Hộ linh · An Nhiên', seal: '安然', css: {
    big: 'color: #fffaf2; text-shadow: 0 0 2px #1c0604, 6px 8px 0 rgba(22,4,2,.55), 0 0 28px rgba(255,90,60,.6);',
    sub: 'color: #fff0e6; text-shadow: 0 0 10px rgba(220,50,30,.75), 2px 2px 0 rgba(0,0,0,.6);' } },
  // the crimson dragon, reed-white fins and whiskers (linear HDR; shell = its rim glow, ink = its outline)
  dragon: { body: [0.46, 0.03, 0.02], scale: [0.8, 0.1, 0.05], belly: [1.3, 1.2, 1.05], fin: [1.6, 1.5, 1.35], eye: [3.0, 2.8, 2.2],
    horn: [1.5, 1.4, 1.2], white: [1.3, 1.25, 1.15], whisker: [1.7, 1.6, 1.4], mouth: [0.3, 0.01, 0.02], shell: [1.3, 0.3, 0.16], ink: 0x1c0404 },
  pal: { rays: [1.45, 0.62, 0.42], ring: [2.2, 1.0, 0.7], bolt: [2.4, 2.2, 1.9], burst: [1.9, 0.7, 0.4], ko: [1.05, 0.42, 0.26], glow: 0xffb0a0,
    mote: [1.5, 1.45, 1.35], rib: [1.6, 0.3, 0.16], rib2: [1.6, 1.55, 1.45], aura: [0.95, 0.4, 0.3],
    dim: [[226, 186, 170], [160, 100, 90], [90, 46, 44]], cool: [246, 232, 222], wash: [[255, 250, 246], [255, 222, 206], [236, 160, 140]] },
};

export const KIT = {
  ...ZHAOYUN_KIT,
  model: (rig) => buildDef(rig, ANNHIEN_DEF.build()),
  secondary: (scene, rig, mat) => chainSet(scene, rig, mat, ANNHIEN_DEF.chains()),
  reach: { tip: 2.08, butt: 0.86 },
  trail: { base: 1.34, baseHeavy: 1.14, tip: 2.12 },
  weight: 0.95,
  voice: { pitch: 1.3, fk: 1.16, growl: -0.08, gain: 0.95 },
  fx: {
    ...ZY_FX, musou: 'own',
    needle: [[2.8, 1.2, 0.8], [2.6, 0.5, 0.3], [3.0, 2.7, 2.4]],
    hot: [[0.56, 0.12, 0.06], [0.62, 0.22, 0.12], [0.66, 0.5, 0.42], [2.3, 2.1, 1.9]],
    burst: [0.55, 0.14, 0.07], flash: [2.6, 1.5, 1.1], slash: [3.0, 2.4, 2.1], pulse: [1.9, 0.6, 0.35],
    light: [1, 0.6, 0.5], crack: [2.8, 1.0, 0.6], wall: [1.3, 0.45, 0.3], ring: [2.2, 1.6, 1.4], shard: [2.6, 2.3, 2.0],
    glint: [2.8, 2.7, 2.5], glitter: [2.8, 2.6, 2.3],
    glow: [0x8a160c, 0xf0e2d8, 0.35],
    trail: { white: [1.15, 1.12, 1.08], fringe: [1.0, 0.12, 0.06], hot: [1.7, 1.6, 1.5], glow: [1.6, 0.36, 0.2], grad: true },
    ghost: [0xb0201a, 0xd83a2a, 0xfff4ec, 0xe8e0d8, 0xcc2a20],
    mu: { crack: [2.8, 1.1, 0.7], wall: [0.9, 0.32, 0.2], light: [1, 0.66, 0.56] },
  },
  createMusouView: (scene, game, camera) => createMusouView(scene, game, camera, LOOK),
};
