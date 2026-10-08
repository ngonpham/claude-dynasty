// Headless screenshot + console capture for the overlay game (dev tool, not shipped). Needs a static server on the
// repo root (python3 -m http.server 8123) and the global playwright (Chromium under /opt/pw-browsers).
//   node holinh/tools/shot.mjs "<url>" out.png [waitMs=15000] [--keys=JJJK] [--hold=w:2000]
// Swiftshader renders a battle at ≈ 1-3 fps: keep ?enemies low (≤ 80) and the viewport small (W=960 H=540 env).
// --keys: after the wait, press each key (J attack, K charge, I musou, L dodge, space…), 250 ms apart, then shoot again
// (out-2.png). --hold=w:2000: hold a key that long before the second shot (walk forward).
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
const args = process.argv.slice(2), opt = Object.fromEntries(args.filter((a) => a.startsWith('--')).map((a) => a.slice(2).split('=')));
const [url, out, wait = '15000'] = args.filter((a) => !a.startsWith('--'));
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required', '--disable-gpu-watchdog'] });
const p = await b.newPage({ viewport: { width: +(process.env.W || 960), height: +(process.env.H || 540) } });
const logs = [];
p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(m.type() + ': ' + m.text()); });
p.on('pageerror', (e) => logs.push('PAGEERROR: ' + e.message + '\n' + (e.stack || '').split('\n').slice(0, 4).join('\n')));
await p.goto(url, { waitUntil: 'commit', timeout: 180000 });   // a loaded box: don't wait for 'load'
await p.waitForTimeout(+wait);
await p.screenshot({ path: out, timeout: 180000 });
if (opt.keys || opt.hold) {
  if (opt.hold) { const [key, ms] = opt.hold.split(':'); await p.keyboard.down(key); await p.waitForTimeout(+ms); await p.keyboard.up(key); }
  for (const k of [...(opt.keys || '')]) { await p.keyboard.press(k === '_' ? 'Space' : k); await p.waitForTimeout(250); }
  await p.waitForTimeout(1500);
  await p.screenshot({ path: out.replace(/\.png$/, '-2.png'), timeout: 180000 });
}
console.log(logs.filter((l) => !/AudioContext was not allowed|KHR_parallel_shader_compile/.test(l)).slice(0, 40).join('\n') || 'no errors');
await b.close();
