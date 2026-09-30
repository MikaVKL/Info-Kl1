#!/usr/bin/env python3
"""Baut die App zu EINER HTML-Datei (für claude.ai-Artifact). Aufruf: python3 tools/build_single.py ausgabe.html"""
import re, sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
html = (root / 'index.html').read_text()
css = (root / 'css/style.css').read_text()
app = (root / 'js/app.js').read_text()
data = [ (root / m).read_text() for m in re.findall(r'<script src="(data/[^"]+)"', html) ]
body = re.search(r'<body>(.*?)<script>window.TOPICS', html, re.S).group(1)
out = f'''<title>Info-Lernapp</title>
<style>
{css}
</style>
{body}
<script>window.TOPICS = [];</script>
''' + ''.join(f'<script>\n{d}\n</script>\n' for d in data) + f'<script>\n{app}\n</script>\n'
assert '</script>' not in css + app + ''.join(data)
pathlib.Path(sys.argv[1]).write_text(out)
print(len(out), 'bytes')
