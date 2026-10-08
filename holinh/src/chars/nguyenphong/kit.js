// Nguyên Phong's kit: Huang Zhong's bow kit as it stands (src/chars/huangzhong/kit.js: the moveset and clips, the
// per-battle sim with its arrows, aim mode and 百步穿楊, the kit view) carried by his own model and chains (model.js: a
// young hunter's body, his plain bow on the same frame, the same string and nocked-arrow rule), and his look: a young
// light voice, leaf green and amber in the heavy layers, ribbon and dodge ghosts (the fire shots keep their amber),
// and his own cut-in over Huang Zhong's Musou view (its overlay is built with 老將's line and seal: the view's cut-in
// element is re-lettered and re-coloured right after it is made).
import { HUANGZHONG_KIT } from '../../../../src/chars/huangzhong/kit.js';
import { createModel, createSecondary } from './model.js';

const CUT = { sub: 'Người núi · Nguyên Phong', seal: '元風',
  big: 'color: #f6fbe8; text-shadow: 0 0 2px #0c1404, 6px 8px 0 rgba(6,14,2,.55), 0 0 28px rgba(150,210,70,.55);',
  css: 'color: #f0f6d4; text-shadow: 0 0 10px rgba(220,160,40,.75), 2px 2px 0 rgba(0,0,0,.6);' };

export const KIT = {
  ...HUANGZHONG_KIT,
  model: createModel, secondary: createSecondary,
  weight: 1,
  voice: { pitch: 1.1, fk: 1.05, growl: 0, gain: 0.95 },
  fx: {
    ...HUANGZHONG_KIT.fx,
    needle: [[1.8, 2.6, 0.6], [2.4, 1.6, 0.3], [2.6, 3.0, 1.4]],
    hot: [[0.3, 0.5, 0.06], [0.5, 0.56, 0.1], [0.64, 0.5, 0.14], [1.9, 2.2, 0.9]],
    burst: [0.3, 0.5, 0.06], flash: [2.0, 2.6, 0.7], slash: [2.4, 3.0, 1.0], pulse: [1.2, 1.9, 0.3],
    light: [0.7, 1, 0.3], crack: [2.6, 1.8, 0.4], wall: [0.8, 1.2, 0.2], ring: [1.6, 2.2, 0.5], shard: [2.2, 2.6, 0.7],
    glitter: [2.4, 2.8, 0.9],
    glow: [0x3a6a1a, 0xe0a030, 0.3],
    trail: { white: [1.04, 1.12, 0.78], fringe: [0.3, 0.9, 0.08], hot: [1.5, 1.7, 0.6], glow: [1.4, 1.1, 0.16], grad: true },
    ghost: [0x4a7a2a, 0x78a83c, 0xf4f0c8, 0xe8b448, 0x5a8a2c],
  },
  createMusouView(scene, game, camera) {
    const v = HUANGZHONG_KIT.createMusouView(scene, game, camera), cut = [...document.querySelectorAll('.mu-cut')].pop();
    const [sub, big, seal] = cut.children;
    sub.textContent = CUT.sub; seal.textContent = CUT.seal;
    sub.style.cssText += CUT.css; big.style.cssText += CUT.big;
    return v;
  },
};
