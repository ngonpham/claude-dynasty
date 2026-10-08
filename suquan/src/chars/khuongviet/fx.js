// Khuông Việt's own render layer (def.fxView: src/chars/defkit.js — part of his Musou view; render-only, reads the sim
// and bus events, never writes it): a light fork of 諸葛亮's sigil layer (src/chars/zhugeliang/fx.js — same timing, same
// triggers, same detonation) with the 八卦 turned into Buddhist light. On top of the shared kit view (chars/kitview.js):
//  · the seal of light: a glowing disc draped on the terrain (conforming grid like vfx.js cracks, pattern in the
//    fragment shader): a double rim with a ring of beads, sixteen lotus petals (outlines and a centre vein) turning
//    slowly, and inside them the dharma wheel — eight spokes, a rim studded at the spoke ends, a hub — turning the
//    other way, over a faint saffron wash. It is drawn round like a brush stroke, pulses while it holds, flares white-gold
//    when it detonates and fades. No 卍 anywhere.
//      C6 (Zhuge Liang's moves.js `sigil` windows, borrowed with the moveset): drawn where window 1 opens (SIGIL box
//      centre), synced to his move frame; a dodge / hit out of the move lets it fade undetonated; window 2 detonates it
//      (eight columns of light on the spokes, a centre column, rings, a shock wall, rays).
//      Musou: musou:fx 'bagua' opens the vast one (r 12 m) under him; 'baguaBurst' (the finisher) detonates its eight
//      outer columns; the shared Musou view owns the payoff flash. Between CONTACT and the finisher light rains at random
//      inside it, and through the whole action motes of gold drift up round him.
import * as THREE from 'three';
import { on } from '../../../../src/core/events.js';
import { vrng } from '../../../../src/core/rng.js';
import { ground } from '../../../../src/world/map.js';
import { SIGIL } from '../../../../src/chars/zhugeliang/moves.js';

export const GOLD = [2.4, 1.7, 0.6], SAFFRON = [2.0, 0.9, 0.25], BEAM = [2.6, 2.1, 1.2], CORE = [2.8, 2.5, 1.8];
const k3 = (c, k) => [c[0] * k, c[1] * k, c[2] * k];
const N = 48;                                                         // drape grid segments

const VS = /* glsl */`
  uniform float uR; varying vec2 vP;
  void main() { vP = position.xz / uR; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const FS = /* glsl */`
  uniform float uT, uGrow, uA, uFlash, uYaw; uniform vec3 uGold, uWash; varying vec2 vP;
  float ln(float d, float w) { float aa = fwidth(d) * 1.2; return 1.0 - smoothstep(w - aa, w + aa, abs(d)); }
  float dot2(vec2 p, float r) { float aa = fwidth(p.x) * 1.5; return 1.0 - smoothstep(r - aa, r + aa, length(p)); }
  void main() {
    vec2 p = vP; float r = length(p);
    if (r > 1.02) discard;
    float th = atan(p.x, p.y) - uYaw;                               // 0 = his facing
    float rev = max(1.0 - smoothstep(uGrow * 1.02 - 0.03, uGrow * 1.02, fract(th / 6.2832 + 1.0)), step(r, uGrow * 0.55));
    // rims and the bead ring between them (48 beads, turning with the petals)
    float g = ln(r - 0.985, 0.007) * 0.8 + ln(r - 0.9, 0.006) * 0.7;
    float tb = th - uT * 0.1, Qb = 0.1309, sb = floor(tb / Qb + 0.5);
    g += dot2(vec2(r * sin(tb - sb * Qb), r * cos(tb - sb * Qb) - 0.942), 0.014);
    // sixteen lotus petals (r 0.58 … 0.88): rounded outlines and a faint vein
    const float QP = 0.3927;
    float sp = floor(tb / QP + 0.5), lp = (tb - sp * QP) / (QP * 0.5);
    float R = 0.58 + 0.3 * sqrt(max(0.0, 1.0 - lp * lp));
    g += ln(r - R, 0.009) * step(0.57, r) + ln(lp * r * QP * 0.5, 0.004) * step(0.6, r) * step(r, R - 0.04) * 0.45;
    // the dharma wheel (r < 0.52), turning the other way: rim, eight spokes, knobs at the spoke ends, the hub
    float tw = th + uT * 0.3;
    const float QW = 0.7854;
    float sw = floor(tw / QW + 0.5), lw = tw - sw * QW;
    g += ln(r - 0.5, 0.012) + ln(r - 0.44, 0.006) * 0.8;
    g += ln(r * sin(lw), 0.016) * step(0.13, r) * step(r, 0.45);
    g += dot2(vec2(r * sin(lw), r * cos(lw) - 0.5), 0.034);
    g += ln(r - 0.11, 0.01) + dot2(p, 0.05) * 0.8;
    float wash = (1.0 - smoothstep(0.15, 1.0, r)) * 0.08 + ln(r - 0.72, 0.18) * 0.03;
    float pulse = 0.85 + 0.15 * sin(uT * 6.0);
    vec3 col = (uGold * g * pulse + uWash * wash) * rev + (uGold * 0.9 + vec3(0.5)) * uFlash * (g + wash) * rev;
    gl_FragColor = vec4(col * uA * (1.0 - smoothstep(0.97, 1.02, r) * 0.5), 1.0);
  }`;

export function createKhuongVietFx(parent, game) {
  const fx = game.vfx.fx, root = new THREE.Group();
  parent.add(root);
  const slot = () => {
    const geo = new THREE.PlaneGeometry(2, 2, N, N).rotateX(-Math.PI / 2);
    geo.attributes.position.setUsage(THREE.DynamicDrawUsage);
    const mat = new THREE.ShaderMaterial({ vertexShader: VS, fragmentShader: FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4, fog: false,
      uniforms: { uR: { value: 1 }, uT: { value: 0 }, uGrow: { value: 0 }, uA: { value: 0 }, uFlash: { value: 0 }, uYaw: { value: 0 },
        uGold: { value: new THREE.Color(...GOLD) }, uWash: { value: new THREE.Color(...SAFFRON) } } });
    const m = new THREE.Mesh(geo, mat);
    m.frustumCulled = false; m.renderOrder = -1; m.visible = false;
    root.add(m);
    return { m, base: Float32Array.from(geo.attributes.position.array), on: false, x: 0, z: 0, r: 1, yaw: 0, a: 0, det: -1, seq: -1 };
  };
  const S = { c6: slot(), mu: slot() };
  /** Lay a seal of radius r at (x, z) facing yaw, draped on the terrain. */
  const open = (k, x, z, r, yaw) => {
    const o = S[k], pos = o.m.geometry.attributes.position, gy = ground(x, z);
    for (let v = 0; v < pos.count; v++) {
      const lx = o.base[v * 3] * r, lz = o.base[v * 3 + 2] * r;
      pos.array[v * 3] = lx; pos.array[v * 3 + 1] = ground(x + lx, z + lz) - gy + 0.04; pos.array[v * 3 + 2] = lz;
    }
    pos.needsUpdate = true;
    o.m.position.set(x, gy, z);
    Object.assign(o, { on: true, x, z, r, yaw, a: 1, det: -1 });
    const u = o.m.material.uniforms; u.uR.value = r; u.uYaw.value = yaw; u.uGrow.value = 0; u.uFlash.value = 0;
    fx.ring(x, z, r * 1.05, 0.45, k3(GOLD, 0.8)); fx.star(x, 0.3, z, r * 0.4, 0.25, CORE); fx.dustRing(x, z, 12 + r * 2, 0.3, r * 0.9, 0.45, 0.35);
  };
  /** Detonate: eight columns on the spokes, a centre column, rings, a shock wall, rays, light. */
  const burst = (k) => {
    const o = S[k];
    if (!o.on || o.det >= 0) return;
    o.det = 0;
    const { x, z, r, yaw } = o, big = r > 6;
    for (let i = 0; i < 8; i++) {
      const a = yaw + i * Math.PI / 4, px = x + Math.sin(a) * r * 0.7, pz = z + Math.cos(a) * r * 0.7;
      fx.columns(px, pz, 1, 0, big ? 14 : 7, big ? 1.5 : 1.1, 0.55, GOLD, 0); fx.ring(px, pz, big ? 3 : 1.4, 0.35, BEAM);
    }
    if (!big) fx.columns(x, z, 1, 0, 10, 1.8, 0.6, BEAM, 0);   // the Musou's centre stays clear of its hero
    fx.ring(x, z, r * 1.4, 0.55, GOLD); fx.ring(x, z, r * 0.8, 0.4, BEAM);
    fx.wall(x, z, r * 1.2, big ? 3.4 : 2.4, 0.5, k3(SAFFRON, 0.5));
    fx.rayBurst(x, 0.3, z, 16, r * 1.2, k3(GOLD, big ? 0.6 : 1), [0.6, 1.2], 0.45, 0.5);
    fx.star(x, 0.6, z, big ? 1.2 : 2.6, 0.3, CORE);
    fx.dustRing(x, z, big ? 16 : 24, 0.5, r * (big ? 1.1 : 1.6), 0.6, big ? 0.35 : 0.5);
    if (!big) {
      fx.lightFlash(x, 1.2, z, [1, 0.8, 0.5], 55, 0.4, 14);
      fx.flash(0.14);
    }
  };
  on('attack:swing', (e) => {
    const h = game.hero, hit = e.move === 'c6' && h.kit.moves.c6?.hits[e.win];
    if (!hit?.sigil) return;
    if (hit.sigil === 2) { burst('c6'); return; }
    const d = SIGIL.off + SIGIL.len / 2;
    open('c6', h.x + Math.sin(e.yaw) * d, h.z + Math.cos(e.yaw) * d, SIGIL.width / 2, e.yaw);
    S.c6.seq = h.moveSeq;
  });
  on('musou:fx', (e) => {
    if (e.kind === 'bagua') open('mu', e.x, e.z, e.r, e.yaw);
    else if (e.kind === 'baguaBurst') burst('mu');
  });

  let t = 0, lastMu = 0;
  return {
    update(dt) {
      t += dt;
      const h = game.hero, mu = game.musou;
      for (const k in S) {
        const o = S[k], u = o.m.material.uniforms;
        if (!o.on) { o.m.visible = false; continue; }
        if (o.det >= 0) {                                            // detonated: flare, then fade
          o.det += dt; u.uFlash.value = Math.exp(-o.det * 7); o.a = Math.max(0, 1 - Math.max(0, o.det - 0.12) / 0.6);
        } else if (k === 'c6') {
          const live = h.state === 'attack' && h.move === 'c6' && h.moveSeq === o.seq;
          if (live) { o.a = 1; u.uGrow.value = Math.min(1, (h.moveT - 18) / 10); } else o.a -= dt * 3;
        } else if (mu.active) { o.a = 1; u.uGrow.value = Math.min(1, (mu.t - 100) / 16); } else o.a -= dt * 3;
        if (o.a <= 0) { o.on = false; o.m.visible = false; continue; }
        o.m.visible = true; u.uA.value = o.a; u.uT.value = t;
      }
      // Musou: light rain inside the seal (CONTACT → the finisher), golden motes rising round him (the whole action)
      if (!mu.active) { lastMu = 0; return; }
      const o = S.mu;
      for (let f = lastMu + 1; f <= mu.t; f++) {
        if (o.on && o.det < 0 && f >= 132 && f <= 164 && f % 3 === 0) {
          const a = vrng.range(0, 6.283), d = o.r * Math.sqrt(vrng.next()) * 0.9, x = o.x + Math.sin(a) * d, z = o.z + Math.cos(a) * d;
          fx.columns(x, z, 1, 0, 9, 1.2, 0.4, BEAM, 0); fx.ring(x, z, 1.3, 0.3, BEAM); fx.star(x, 0.4, z, 1, 0.18, CORE);
        }
        if (f >= 100 && f <= 180 && f % 2 === 0) {
          const a = vrng.range(0, 6.283), d = vrng.range(1.5, 7);
          fx.streak(h.x + Math.sin(a) * d, vrng.range(0.2, 1.5), h.z + Math.cos(a) * d, 0, 1, 0, vrng.range(1.5, 3.5), 0.06, 0.6, k3(GOLD, 0.35));
        }
      }
      lastMu = mu.t;
    },
    dispose() {
      parent.remove(root);
      root.traverse((m) => { if (m.geometry) m.geometry.dispose(); if (m.material) m.material.dispose(); });
    },
  };
}
