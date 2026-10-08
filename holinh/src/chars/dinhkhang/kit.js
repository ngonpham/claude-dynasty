// Đinh Khang's kit: his model def (model.js) and Liu Bei's twin-sword moveset (src/chars/liubei/moves.js) through the
// def-kit adapter (src/chars/defkit.js), plus what the pair of blades needs on top of it, as in src/chars/liubei/kit.js:
//  · the second blade: his hooked paddle-knife (model.js hookGeo: grip, fittings, blade — the same three materials as the
//    đao's meshes) on the left hand, turned after every rig pass to the root-space blade the pose keys in its armR
//    channels [yaw, elev, roll, weight] (weight 0: the natural grip, the blade reversed along the forearm; 90° = 1: the
//    keyed blade). Liu Bei's patch, kept here because his kit does not export it.
//  · the Musou sim is Liu Bei's as it stands (his C6 rally: the side within 20 m restored, 5 % health back), and his twin
//    view (src/chars/liubei/view.js: the 雙龍 of the Musou, C6's 義, the left blade's ribbon) runs beside this kit's
//    Musou view.
// Look: a swimmer's build (scale 1.06, quick blows: camera kicks × 1), a young strong voice, deep river blue, foam white
// and jade in every effect, the Tráng sĩ sông nước · Đinh Khang / 江龍 cut-in.
import * as THREE from 'three';
import { defKit } from '../../../../src/chars/defkit.js';
import { LIUBEI_KIT } from '../../../../src/chars/liubei/kit.js';
import { createTwinView, LEFT } from '../../../../src/chars/liubei/view.js';
import * as MOVESET from '../../../../src/chars/liubei/moves.js';
import { CH } from '../../../../src/hero/rig.js';
import { DINHKHANG_DEF, hookGeo } from './model.js';

const W = Math.PI / 2;
const NAT = new THREE.Quaternion().setFromEuler(new THREE.Euler(150 * Math.PI / 180, 0, 0));   // natural grip (forearm frame)
const _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _q3 = new THREE.Quaternion(), _e = new THREE.Euler(0, 0, 0, 'YXZ');

/** The hook-knife on the left hand (the đao's materials, mesh by mesh), turned to the pose's armR blade after every rig pass. */
function twinBlades(rig, m) {
  const hand = rig.joints.handL, fore = rig.joints.foreArmL, root = rig.root, apply = rig.apply.bind(rig);
  hookGeo().forEach((w, i) => {
    const s = new THREE.Mesh(w.geo, m.meshes['weapon' + i].material);
    s.castShadow = true; s.receiveShadow = true;
    hand.add(s); m.meshes['swordL' + i] = s;
  });
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
  ...DINHKHANG_DEF,
  scale: 1.06,
  reach: { tip: 0.9, butt: 0.16 },
  trail: { base: 0.28, baseHeavy: 0.2, tip: 0.88 },
  weight: 1,
  voice: { pitch: 1.0, fk: 1.0, growl: 0.08, gain: 1.05 },
  heat: [0xd8f4ff, 0.2, 1.3, 1.0],
  view(model) { LEFT.blade = model.meshes.swordL2; },           // the left blade's ribbon (liubei/view.js)
  fx: {
    needle: [[0.8, 2.0, 2.8], [0.4, 1.2, 2.6], [2.4, 2.9, 3.0]],
    hot: [[0.06, 0.24, 0.56], [0.1, 0.34, 0.62], [0.3, 0.56, 0.64], [1.8, 2.2, 2.3]],
    burst: [0.06, 0.28, 0.56], flash: [1.2, 2.2, 2.6], slash: [1.8, 2.6, 3.0], pulse: [0.3, 1.2, 1.9],
    light: [0.45, 0.8, 1], crack: [0.6, 1.8, 2.6], wall: [0.2, 0.7, 1.2], ring: [0.8, 1.9, 2.2], shard: [1.4, 2.3, 2.6],
    glint: [2.2, 2.7, 2.8], glitter: [1.6, 2.6, 2.8],
    glow: [0x16306a, 0x7ad0b4, 0.35],
    trail: { white: [1.0, 1.1, 1.14], fringe: [0.1, 0.45, 1.0], hot: [1.3, 1.7, 1.8], glow: [0.2, 1.1, 1.3], grad: true },
    ghost: [0x1e3a7a, 0x2e5aa8, 0xeef8ff, 0x7ad0b4, 0x2a8a6c],
    mu: { crack: [0.6, 1.8, 2.6], wall: [0.18, 0.6, 0.9], light: [0.5, 0.85, 1] },
  },
  look: {
    cut: { sub: 'Tráng sĩ sông nước · Đinh Khang', seal: '江龍', css: {
      big: 'color: #f4fbff; text-shadow: 0 0 2px #040c1a, 6px 8px 0 rgba(2,8,20,.55), 0 0 28px rgba(90,180,240,.6);',
      sub: 'color: #e6f8f2; text-shadow: 0 0 10px rgba(60,190,150,.75), 2px 2px 0 rgba(0,0,0,.6);' } },
    pal: { rays: [0.4, 1.0, 1.4], ring: [0.7, 1.6, 2.1], bolt: null, burst: [0.5, 1.4, 1.9], ko: [0.25, 0.7, 1.0], glow: 0x9ae0ff,
      mote: [1.2, 1.4, 1.45], rib: [0.25, 0.8, 1.6], rib2: [0.4, 1.6, 1.1], aura: [0.25, 0.65, 0.95],
      dim: [[160, 196, 214], [96, 128, 150], [40, 58, 84]], cool: [214, 236, 244], wash: [[244, 252, 255], [196, 236, 248], [120, 196, 220]] },
  },
  sig: { roar: [0.5, 1.6, 2.2], core: [1.6, 2.4, 2.6], wave: [0.45, 1.5, 2.0], beam: [0.6, 1.7, 2.1], charge: [0.5, 1.6, 2.2] },
}, MOVESET);

const model = kit.model, createMusouView = kit.createMusouView;
kit.model = (rig) => twinBlades(rig, model(rig));
kit.createMusou = LIUBEI_KIT.createMusou;
kit.createMusouView = (scene, game, camera) => {
  const a = createMusouView(scene, game, camera), b = createTwinView(scene, game);
  return { update(dt) { a.update(dt); b.update(dt); }, dispose() { a.dispose(); b.dispose(); } };
};
export const KIT = kit;
