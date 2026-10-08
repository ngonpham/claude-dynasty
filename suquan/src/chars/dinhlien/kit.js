// 丁璉's kit: Huang Zhong's bow kit as it stands (src/chars/huangzhong/kit.js: the moveset and clips, the per-battle sim
// with its arrows, aim mode and 百步穿楊, the kit view) carried by his own model and chains (model.js: a young body, his
// bow on the same frame, the same string and nocked-arrow rule), and his look: a young voice, amber-red fire in the
// heavy layers, ribbon and dodge ghosts, and his own cut-in over Huang Zhong's Musou view (its overlay is built with
// 老將's line and seal: the view's cut-in element is re-lettered and re-coloured right after it is made).
import { HUANGZHONG_KIT } from '../../../../src/chars/huangzhong/kit.js';
import { createDinhLienModel, createDinhLienSecondary } from './model.js';

const CUT = { sub: 'Hoa Lư · Đinh Liễn', seal: '南越',
  big: 'color: #fff2e2; text-shadow: 0 0 2px #1c0804, 6px 8px 0 rgba(22,5,2,.55), 0 0 28px rgba(255,110,40,.6);',
  css: 'color: #ffe0c0; text-shadow: 0 0 10px rgba(240,90,30,.75), 2px 2px 0 rgba(0,0,0,.6);' };

export const DINHLIEN_KIT = {
  ...HUANGZHONG_KIT,
  model: createDinhLienModel, secondary: createDinhLienSecondary,
  weight: 1.05,
  voice: { pitch: 1.06, fk: 1.03, growl: 0.02, gain: 1 },
  fx: {
    ...HUANGZHONG_KIT.fx,
    needle: [[2.8, 1.2, 0.35], [2.4, 0.7, 0.15], [3.0, 2.1, 1.0]],
    hot: [[0.56, 0.14, 0.03], [0.62, 0.24, 0.05], [0.64, 0.34, 0.08], [2.2, 1.4, 0.7]],
    burst: [0.54, 0.15, 0.03], flash: [2.6, 1.2, 0.36], slash: [3.0, 1.5, 0.5], pulse: [1.9, 0.62, 0.14],
    light: [1, 0.52, 0.22], crack: [2.8, 0.9, 0.2], wall: [1.3, 0.45, 0.1], ring: [2.1, 0.85, 0.24], shard: [2.6, 1.2, 0.34],
    glitter: [2.8, 1.5, 0.55],
    glow: [0x9a300c, 0xe86424, 0.3],
    trail: { white: [1.1, 0.92, 0.66], fringe: [1.0, 0.3, 0.05], hot: [1.7, 1.2, 0.6], glow: [1.6, 0.56, 0.1], grad: true },
    ghost: [0xb8401a, 0xe06a24, 0xffd6a8, 0xffa860, 0xe0601e],
  },
  createMusouView(scene, game, camera) {
    const v = HUANGZHONG_KIT.createMusouView(scene, game, camera), cut = [...document.querySelectorAll('.mu-cut')].pop();
    const [sub, big, seal] = cut.children;
    sub.textContent = CUT.sub; seal.textContent = CUT.seal;
    sub.style.cssText += CUT.css; big.style.cssText += CUT.big;
    return v;
  },
};
