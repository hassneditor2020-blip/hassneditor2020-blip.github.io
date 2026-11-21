#!/usr/bin/env python3
"""Prepare GitHub Pages docs/ from a Next.js static export in site/out/.

Run from repository root:
  cd site && npm ci && npm run build:github && cd ..
  python scripts/sync-pages.py
  git add site docs && git commit -m "Update site" && git push
"""
from pathlib import Path
from shutil import copytree, copy2, rmtree
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

repo=Path(__file__).resolve().parents[1]
source=repo/'site'/'out'
dest=repo/'docs'
if not (source/'index.html').is_file():
    raise SystemExit('Missing site/out/index.html. Build static export first: cd site && npm run build:github')
if not (source/'sitemap.xml').is_file():
    raise SystemExit('Missing static sitemap.xml in the build output')
# Avoid deleting the prior publish until the new output is structurally valid.
urls=ET.parse(source/'sitemap.xml').findall('.//{*}loc')
for item in urls:
    route=urlparse(item.text or '').path.rstrip('/')
    if route and not ((source/(route.lstrip('/')+'.html')).is_file() or (source/route.lstrip('/')/'index.html').is_file()):
        raise SystemExit(f'Sitemap page absent from build: {route}')

temp=repo/'_github_pages_staging'
if temp.exists(): rmtree(temp)
copytree(source,temp)
for file in sorted(temp.rglob('*.html')):
    if file.name in ('index.html','404.html') or file.name.startswith('_not-found'):
        continue
    target=file.with_suffix('')/'index.html'
    if not target.exists():
        target.parent.mkdir(parents=True,exist_ok=True)
        copy2(file,target)
(temp/'.nojekyll').write_text('',encoding='utf8')
(temp/'CNAME').write_text('hassneditor.com\n',encoding='utf8')
# Next image paths are absolute and the site is intended for an apex domain or a user GitHub Pages repo.
backup=repo/'_github_pages_old'
if backup.exists(): rmtree(backup)
if dest.exists(): dest.rename(backup)
temp.rename(dest)
if backup.exists(): rmtree(backup)
print('GitHub Pages content updated:', len(list(dest.rglob('*.html'))), 'HTML files; sitemap routes:',len(urls))
