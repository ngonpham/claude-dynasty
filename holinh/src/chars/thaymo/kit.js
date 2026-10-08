// Thầy Mo's kit: his model def (model.js) on Zhuge Liang's fan moveset (engine src/chars/zhugeliang/moves.js, its seal
// windows and Musou included) through the def-kit adapter (src/chars/defkit.js), exactly as 十二使君's Khuông Việt
// borrows it, plus his look: default size, light (camera kicks × 0.8), an old calm voice; indigo, cinnabar and bronze
// gold in every effect (the ribbon along the cinnabar thread, contacts, dodge ghosts); the thread shows while he strikes
// and the staff's bells glow with it (view hook below); his own render layer (fx.js: the drum-sun seal with the seven
// cinnabar threads and bell rings, the Musou's ringing bells and rising motes); the «Thầy Mo · Núi Hoa Lư» cut-in under
// the 巫鈴 seal, no dragon. Export contract: KIT (the CHARS kit).
import { defKit } from '../../../../src/chars/defkit.js';
import * as MOVESET from '../../../../src/chars/zhugeliang/moves.js';
import { THAYMO_DEF } from './model.js';
import { createThayMoFx } from './fx.js';

let glow = 0, t = 0;
export const KIT = defKit({
  ...THAYMO_DEF,
  reach: { tip: 0.86, butt: 0.44 },
  trail: { base: 0.8, baseHeavy: 0.7, tip: 1.86 },                    // along the cinnabar thread
  weight: 0.8,
  voice: { pitch: 0.9, fk: 0.94, growl: 0.05, gain: 0.72 },
  fx: {
    needle: [[2.6, 0.9, 0.5], [2.2, 0.5, 0.25], [3.0, 2.2, 1.4]],
    hot: [[0.55, 0.16, 0.08], [0.62, 0.26, 0.12], [0.74, 0.46, 0.22], [2.2, 1.6, 1.0]],
    burst: [0.55, 0.16, 0.1], flash: [2.5, 1.4, 0.8], slash: [2.9, 1.7, 0.9], pulse: [1.7, 0.5, 0.3],
    light: [1, 0.55, 0.45], crack: [2.4, 1.6, 0.6], wall: [0.5, 0.55, 1.3], ring: [2.2, 1.5, 0.55], shard: [2.6, 1.0, 0.5],
    glint: [2.8, 2.2, 1.3], glitter: [2.6, 1.8, 0.8],
    glow: [0x8a2a14, 0xe0a050, 0.35],
    trail: { white: [1.1, 0.96, 0.86], fringe: [1.0, 0.18, 0.08], hot: [1.75, 1.3, 0.9], glow: [1.5, 0.5, 0.2] },
    ghost: [0x2a3a7a, 0x4a5aa8, 0xfff0d8, 0xe0a050, 0xc03a20],
    mu: { crack: [2.4, 1.6, 0.6], wall: [0.45, 0.5, 1.2], light: [1, 0.55, 0.45] },
  },
  look: {
    cut: { sub: 'Thầy Mo · Núi Hoa Lư', seal: '巫鈴', css: {
      big: 'color: #fff6ea; text-shadow: 0 0 2px #0a0c1e, 6px 8px 0 rgba(8,10,30,.6), 0 0 28px rgba(230,90,50,.6);',
      sub: 'color: #ffe4c8; text-shadow: 0 0 10px rgba(80,100,220,.8), 2px 2px 0 rgba(0,0,0,.6);' } },
    pal: { rays: [1.3, 0.8, 0.35], ring: [2.2, 1.5, 0.55], bolt: null, burst: [2.2, 0.6, 0.3], ko: [1.0, 0.5, 0.3], glow: 0xf0a060,
      mote: [1.5, 1.2, 0.8], rib: [1.6, 0.4, 0.2], rib2: [0.5, 0.6, 1.5], aura: [0.5, 0.5, 1.1],
      dim: [[176, 170, 200], [104, 98, 140], [44, 42, 80]], cool: [226, 222, 246], wash: [[255, 248, 236], [250, 210, 170], [210, 120, 90]] },
  },
  sig: { roar: [2.2, 1.5, 0.55], core: [2.6, 2.1, 1.5], wave: [2.4, 0.6, 0.3], beam: [2.5, 1.6, 0.8], charge: [2.4, 0.6, 0.3] },
  /** The cinnabar thread (weapon1): in fast while he strikes or casts his Musou, out slowly, shimmering. */
  view(model, h, dt) {
    const want = h.state === 'attack' || h.state === 'musou' ? 1 : 0, m = model.meshes.weapon1;
    t += dt; glow += (want - glow) * Math.min(1, dt * (want ? 18 : 5));
    m.visible = glow > 0.02;
    m.material.opacity = glow * (0.8 + 0.2 * Math.sin(t * 19));
  },
  fxView: createThayMoFx,
}, MOVESET);
