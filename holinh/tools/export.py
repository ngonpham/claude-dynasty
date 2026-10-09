# Export 護靈壯士 as a self-contained folder (an Artifact / any static host): the page at the root without doctype / html /
# head / body (an artifact skeleton wraps it), every module it imports at its repo path, the fonts inlined in fonts.css.
#   python3 holinh/tools/export.py <out dir>
import os, re, json, base64, shutil, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = sys.argv[1]
shutil.rmtree(OUT, ignore_errors=True); os.makedirs(OUT)
html = open(f'{ROOT}/holinh/index.html', encoding='utf8').read()
imap = json.loads(re.search(r'<script type="importmap">([\s\S]*?)</script>', html).group(1))['imports']
# page-relative (holinh/) → repo-relative
def repo(rel): return os.path.normpath(os.path.join('holinh', rel))
remap = {repo(k): repo(v) for k, v in imap.items() if k.startswith('.')}
files = set()
SPEC = re.compile(r"""(?:\bfrom\s*|\bimport\s*\(?\s*)['"]([^'"]+)['"]""")
def resolve(spec, frm):
    if spec == 'three': p = 'vendor/three/three.module.js'
    elif spec.startswith('three/addons/'): p = 'vendor/three/addons/' + spec[len('three/addons/'):]
    elif spec.startswith('engine/'): return 'src/' + spec[len('engine/'):]        # un-remapped on purpose
    elif spec.startswith('.'): p = os.path.normpath(os.path.join(os.path.dirname(frm), spec))
    else: raise SystemExit(f'bare {spec} in {frm}')
    return remap.get(p, p)
todo = ['holinh/src/main.js']
while todo:
    f = todo.pop()
    if f in files: continue
    files.add(f)
    src = open(f'{ROOT}/{f}', encoding='utf8').read()
    for spec in SPEC.findall(src):
        if spec.endswith('.js') or spec == 'three': todo.append(resolve(spec, f))
for f in files:
    os.makedirs(os.path.dirname(f'{OUT}/{f}'), exist_ok=True); shutil.copy(f'{ROOT}/{f}', f'{OUT}/{f}')
# fonts: one stylesheet, every face inlined as a data: URI
css = open(f'{ROOT}/holinh/fonts/fonts.css', encoding='utf8').read()
def inl(m):
    rel = m.group(1); p = os.path.normpath(os.path.join(f'{ROOT}/holinh/fonts', rel))
    return 'url(data:font/woff2;base64,' + base64.b64encode(open(p, 'rb').read()).decode() + ')'
css = re.sub(r'url\(([^)]+\.woff2)\)', inl, css)
css += '\n@font-face { font-family: "HudBrush"; src: url(data:font/woff2;base64,' + base64.b64encode(open(f'{ROOT}/src/ui/brush.woff2', 'rb').read()).decode() + ') format("woff2"); font-display: swap; }\n'
open(f'{OUT}/fonts.css', 'w', encoding='utf8').write(css)
# the page: no doctype / html / head / body (the artifact skeleton wraps it); paths re-rooted
head = html[html.index('<title>'):html.index('</head>')]
body = html[html.index('<body class="inkhold">') + len('<body class="inkhold">'):html.index('</body>')]
head = head.replace('<link rel="stylesheet" href="./fonts/fonts.css">', '<link rel="stylesheet" href="fonts.css">')
head = re.sub(r'\s*@font-face \{ font-family: "HudBrush"; src: url\(\.\./src/ui/brush\.woff2\)[^}]*\}', '', head)
newmap = {}
for k, v in imap.items():
    if k.startswith('.'): newmap['./' + repo(k)] = './' + repo(v)
    else: newmap[k] = './' + repo(v) + ('/' if v.endswith('/') and not repo(v).endswith('/') else '')
head = re.sub(r'<script type="importmap">[\s\S]*?</script>', '<script type="importmap">\n' + json.dumps({'imports': newmap}, indent=2, ensure_ascii=False) + '\n</script>', head)
body = body.replace('<script type="module" src="./src/main.js"></script>', '<script type="module" src="./holinh/src/main.js"></script>')
head = re.sub(r'<!--[\s\S]*?-->', '', head)
head = head.replace('<title>Hộ Linh Tráng Sĩ — Bí Ẩn Mộ Vua Đinh</title>', '<title>Hộ Linh Tráng Sĩ</title>')
page = head + '<script>document.body.classList.add("inkhold")</script>\n' + body
assert '../' not in re.sub(r'<style>[\s\S]*?</style>', '', page), 'a ../ path is left in the page'
open(f'{OUT}/ho-linh-trang-si.html', 'w', encoding='utf8').write(page)
print(len(files), 'modules'); print(json.dumps(newmap, ensure_ascii=False)[:400])
