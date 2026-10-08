// 黎桓's kit: his model def (model.js) and Liu Bei's twin-sword moveset (src/chars/liubei/moves.js) through the def-kit
// adapter (src/chars/defkit.js), plus what the pair of swords needs on top of it, as in src/chars/liubei/kit.js:
//  · the second sword: the weapon meshes again on the left hand, turned after every rig pass to the root-space blade the
//    pose keys in its armR channels [yaw, elev, roll, weight] (weight 0: the natural grip, the blade reversed along the
//    forearm; 90° = 1: the keyed blade). Liu Bei's patch, kept here because his kit does not export it.
//  · the Musou sim is Liu Bei's as it stands (his C6 rally: the side within 20 m restored, 5 % health back), and his twin
//    view (src/chars/liubei/view.js: the gold and jade 雙龍 of the Musou, C6's 義, the left sword's ribbon) runs beside
//    this kit's Musou view.
// Look: lean and quick (scale 1.03, light blows: camera kicks × 0.95), a young bright voice, ochre-gold light in every
// effect, the Ái Châu · Lê Hoàn / 十道 cut-in.
import * as THREE from 'three';
import { defKit } from '../../../../src/chars/defkit.js';
import { LIUBEI_KIT } from '../../../../src/chars/liubei/kit.js';
import { createTwinView, LEFT } from '../../../../src/chars/liubei/view.js';
import * as MOVESET from '../../../../src/chars/liubei/moves.js';
import { CH } from '../../../../src/hero/rig.js';
import { LEHOAN_DEF } from './model.js';

const W = Math.PI / 2;
const NAT = new THREE.Quaternion().setFromEuler(new THREE.Euler(150 * Math.PI / 180, 0, 0));   // natural grip (forearm frame)
const _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _q3 = new THREE.Quaternion(), _e = new THREE.Euler(0, 0, 0, 'YXZ');

/** The left sword on the left hand, turned to the pose's armR blade after every rig pass. */
function twinSwords(rig, m) {
  const hand = rig.joints.handL, fore = rig.joints.foreArmL, root = rig.root, apply = rig.apply.bind(rig);
  for (let i = 0; m.meshes['weapon' + i]; i++) {
    const w = m.meshes['weapon' + i], s = new THREE.Mesh(w.geometry, w.material);
    s.castShadow = true; s.receiveShadow = true;
    hand.add(s); m.meshes['swordL' + i] = s;
  }
  rig.apply = (pose, pos, yaw, h) => {
    apply(pose, pos, yaw, h);
    const k = Math.min(1, Math.max(0, pose[CH.armR + 3] / W));
    fore.getWorldQuaternion(_q).multiply(NAT);
    if (k > 0) {
      root.getWorldQuaternion(_q2).multiply(_q3.setFromEuler(_e.set(-pose[CH.armR + 1], pose[CH.armR], pose[CH.armR + 2])));
      _q.slerp(_q2, k);
    }
    hand.quaternion.copy(fore.getWorldQuaternion(_q2).invert().multiply(_q));
    hand.updateMatrixWorld(true);
  };
  return m;
}

const kit = defKit({
  ...LEHOAN_DEF,
  scale: 1.03,
  reach: { tip: 0.9, butt: 0.16 },
  trail: { base: 0.3, baseHeavy: 0.2, tip: 0.9 },
  weight: 0.95,
  voice: { pitch: 1.04, fk: 1.02, growl: 0.03, gain: 1 },
  heat: [0xfff0c8, 0.2, 1.3, 1.0],
  view(model) { LEFT.blade = model.meshes.swordL2; },           // the left sword's ribbon (liubei/view.js)
  fx: {
    needle: [[2.8, 2.0, 0.6], [2.4, 1.3, 0.3], [3.0, 2.6, 1.5]],
    hot: [[0.56, 0.34, 0.06], [0.62, 0.42, 0.1], [0.64, 0.5, 0.18], [2.2, 2.0, 1.1]],
    burst: [0.54, 0.36, 0.08], flash: [2.6, 2.0, 0.8], slash: [3.0, 2.3, 0.9], pulse: [1.9, 1.3, 0.35],
    light: [1, 0.82, 0.4], crack: [2.6, 1.8, 0.5], wall: [1.2, 0.85, 0.25], ring: [2.2, 1.7, 0.6], shard: [2.6, 2.0, 0.8],
    glint: [2.8, 2.4, 1.2], glitter: [2.8, 2.3, 1.1],
    glow: [0x26306a, 0xe8b440, 0.35],
    trail: { white: [1.12, 1.04, 0.84], fringe: [1.0, 0.6, 0.08], hot: [1.7, 1.5, 0.9], glow: [1.6, 1.0, 0.2], grad: true },
    ghost: [0x2c3a7a, 0x4a5aa8, 0xffe6a8, 0xf2c454, 0xc89a30],
    mu: { crack: [2.6, 1.8, 0.5], wall: [0.9, 0.6, 0.18], light: [1, 0.85, 0.45] },
  },
  look: {
    cut: { sub: 'Ái Châu · Lê Hoàn', seal: '十道', css: {
      big: 'color: #fff8e6; text-shadow: 0 0 2px #0a0c1a, 6px 8px 0 rgba(6,8,20,.55), 0 0 28px rgba(240,190,70,.6);',
      sub: 'color: #ffeec4; text-shadow: 0 0 10px rgba(90,110,220,.75), 2px 2px 0 rgba(0,0,0,.6);' } },
    pal: { rays: [1.4, 1.1, 0.35], ring: [2.0, 1.6, 0.55], bolt: null, burst: [1.9, 1.5, 0.5], ko: [1.0, 0.8, 0.25], glow: 0xffe08a,
      mote: [1.4, 1.3, 0.9], rib: [1.6, 1.1, 0.25], rib2: [0.5, 0.6, 1.6], aura: [0.95, 0.75, 0.25],
      dim: [[214, 196, 160], [140, 124, 104], [60, 58, 80]], cool: [240, 230, 200], wash: [[255, 252, 236], [252, 236, 190], [226, 196, 130]] },
  },
  sig: { roar: [2.2, 1.7, 0.5], core: [2.6, 2.3, 1.4], wave: [2.0, 1.5, 0.45], beam: [2.1, 1.7, 0.6], charge: [2.2, 1.7, 0.5] },
}, MOVESET);

const model = kit.model, createMusouView = kit.createMusouView;
kit.model = (rig) => twinSwords(rig, model(rig));
kit.createMusou = LIUBEI_KIT.createMusou;
kit.createMusouView = (scene, game, camera) => {
  const a = createMusouView(scene, game, camera), b = createTwinView(scene, game);
  return { update(dt) { a.update(dt); b.update(dt); }, dispose() { a.dispose(); b.dispose(); } };
};
export const LEHOAN_KIT = kit;
