// Khuông Việt's kit: his model def (model.js) on Zhuge Liang's fan moveset (engine src/chars/zhugeliang/moves.js, its
// seal windows and Musou included) through the def-kit adapter (src/chars/defkit.js), plus his look: default size, light
// (camera kicks × 0.8), a calm low voice; saffron and gold light in every effect (the ribbon along the whisk's light
// stream, contacts, dodge ghosts); the stream shows while he strikes (view hook below); his own render layer (fx.js: the
// lotus and dharma-wheel seals, the Musou's rain of light and rising motes); the «Thiền sư · Khuông Việt» cut-in under
// the 匡越 seal, no dragon.
import { defKit } from '../../../../src/chars/defkit.js';
import * as MOVESET from '../../../../src/chars/zhugeliang/moves.js';
import { KHUONGVIET_DEF } from './model.js';
import { createKhuongVietFx } from './fx.js';

let glow = 0, t = 0;
export const KHUONGVIET_KIT = defKit({
  ...KHUONGVIET_DEF,
  reach: { tip: 0.7, butt: 0.16 },
  trail: { base: 0.62, baseHeavy: 0.55, tip: 1.86 },                  // along the light stream
  weight: 0.8,
  voice: { pitch: 0.98, fk: 1.0, growl: -0.15, gain: 0.75 },
  fx: {
    needle: [[2.8, 2.0, 0.9], [2.4, 1.4, 0.4], [3.0, 2.7, 1.8]],
    hot: [[0.6, 0.32, 0.08], [0.68, 0.42, 0.12], [0.78, 0.56, 0.22], [2.2, 1.8, 1.1]],
    burst: [0.6, 0.34, 0.08], flash: [2.6, 1.9, 0.9], slash: [3.0, 2.3, 1.1], pulse: [1.8, 1.1, 0.3],
    light: [1, 0.78, 0.45], crack: [2.4, 1.7, 0.6], wall: [1.3, 0.8, 0.25], ring: [2.2, 1.6, 0.6], shard: [2.6, 1.9, 0.9],
    glint: [2.8, 2.4, 1.4], glitter: [2.6, 2.1, 1.0],
    glow: [0x8a4a10, 0xf0b850, 0.35],
    trail: { white: [1.1, 1.0, 0.82], fringe: [1.0, 0.5, 0.1], hot: [1.75, 1.5, 1.0], glow: [1.6, 0.9, 0.25] },
    ghost: [0xb06820, 0xe8a040, 0xfff2d8, 0xffd890, 0xd08830],
    mu: { crack: [2.4, 1.7, 0.6], wall: [1.0, 0.6, 0.18], light: [1, 0.78, 0.45] },
  },
  look: {
    cut: { sub: 'Thiền sư · Khuông Việt', seal: '匡越', css: {
      big: 'color: #fff8ea; text-shadow: 0 0 2px #1a0e02, 6px 8px 0 rgba(20,10,2,.55), 0 0 28px rgba(255,190,80,.6);',
      sub: 'color: #ffeccc; text-shadow: 0 0 10px rgba(255,170,60,.75), 2px 2px 0 rgba(0,0,0,.6);' } },
    pal: { rays: [1.4, 1.0, 0.4], ring: [2.3, 1.7, 0.7], bolt: null, burst: [2.0, 1.45, 0.6], ko: [1.1, 0.78, 0.32], glow: 0xffd080,
      mote: [1.5, 1.35, 1.0], rib: [1.6, 0.95, 0.3], rib2: [1.7, 1.5, 0.9], aura: [1.0, 0.7, 0.3],
      dim: [[222, 190, 140], [156, 116, 70], [90, 62, 34]], cool: [246, 228, 196], wash: [[255, 250, 236], [255, 226, 170], [232, 176, 100]] },
  },
  sig: { roar: [2.2, 1.6, 0.6], core: [2.6, 2.3, 1.6], wave: [2.2, 1.5, 0.5], beam: [2.6, 2.1, 1.2], charge: [2.4, 1.7, 0.6] },
  /** The whisk's light stream (weapon1): in fast while he strikes or casts his Musou, out slowly, shimmering. */
  view(model, h, dt) {
    const want = h.state === 'attack' || h.state === 'musou' ? 1 : 0, m = model.meshes.weapon1;
    t += dt; glow += (want - glow) * Math.min(1, dt * (want ? 18 : 5));
    m.visible = glow > 0.02;
    m.material.opacity = glow * (0.82 + 0.18 * Math.sin(t * 23));
  },
  fxView: createKhuongVietFx,
}, MOVESET);
