#!/usr/bin/env python3
"""Start an overlay of an engine module: copy src/<path> to holinh/src/<path> with every relative import re-pointed at
the ENGINE path (so the importmap in holinh/index.html still decides which version each import gets), then add the
importmap entry by hand ("../src/<path>": "./src/<path>").  Usage: python3 holinh/tools/overlay.py ui/title.js"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def retarget(rel):
    src = os.path.join(ROOT, 'src', rel)
    dst = os.path.join(ROOT, 'holinh', 'src', rel)
    text = open(src, encoding='utf8').read()
    def fix(m):
        spec = m.group(2)
        if not spec.startswith('.'):
            return m.group(0)
        target = os.path.normpath(os.path.join(os.path.dirname(src), spec))
        new = os.path.relpath(target, os.path.dirname(dst)).replace(os.sep, '/')
        if not new.startswith('.'):
            new = './' + new
        return m.group(1) + new + m.group(3)
    text = re.sub(r"""((?:from|import)\s*\(?\s*['"])([^'"]+)(['"])""", fix, text)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if os.path.exists(dst) and '--force' not in sys.argv:
        sys.exit(f'{dst} exists (pass --force to overwrite)')
    open(dst, 'w', encoding='utf8').write(text)
    print(f'holinh/src/{rel}  ← src/{rel}   importmap: "../src/{rel}": "./src/{rel}"')

if __name__ == '__main__':
    for a in sys.argv[1:]:
        if a != '--force':
            retarget(a)
