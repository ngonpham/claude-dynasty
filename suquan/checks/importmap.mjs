// Node side of the overlay: registers a resolve hook that applies suquan/index.html's importmap, so a check can import
// ENGINE paths ('../../src/…') and get this game's overlays exactly as the browser does ('three' → the vendored build,
// 'engine/…' → the original module, un-remapped). Import this module first: `import './importmap.mjs';`.
import { registerHooks } from 'node:module';
import { readFileSync } from 'node:fs';

const page = new URL('../index.html', import.meta.url);
const html = readFileSync(page, 'utf8');
const json = html.match(/<script type="importmap">([\s\S]*?)<\/script>/)[1];
const { imports } = JSON.parse(json);
const remap = new Map(), prefix = [];
for (const [k, v] of Object.entries(imports)) {
  if (k.endsWith('/')) prefix.push([k, new URL(v, page).href]);
  else if (k.startsWith('.') || k.startsWith('/')) remap.set(new URL(k, page).href, new URL(v, page).href);
  else remap.set(k, new URL(v, page).href);
}
registerHooks({
  resolve(id, context, next) {
    if (remap.has(id)) return { url: remap.get(id), shortCircuit: true };                // bare: 'three'
    for (const [k, base] of prefix) if (id.startsWith(k)) return { url: base + id.slice(k.length), shortCircuit: true };   // 'engine/…', addons
    const r = next(id, context);
    return remap.has(r.url) ? { ...r, url: remap.get(r.url) } : r;
  },
});
