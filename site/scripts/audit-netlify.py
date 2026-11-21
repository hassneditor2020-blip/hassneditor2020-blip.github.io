"""Offline release gate for a Netlify static ZIP. No external dependencies."""
import argparse, json, posixpath, sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote, urljoin
from zipfile import ZipFile
import xml.etree.ElementTree as ET

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(); self.tags=[]; self.feed(html)
    def handle_starttag(self, tag, attrs): self.tags.append((tag, dict(attrs)))
    def get(self, tag): return [a for t,a in self.tags if t==tag]

def audit(path, expected):
    errors=[]; warnings=[]; origin='https://hassneditor.com'; titles={}
    with ZipFile(path) as z:
        names=set(z.namelist()); bad=z.testzip()
        if bad: errors.append('Corrupt member: '+bad)
        def read(n): return z.read(n).decode('utf-8')
        def exists(p):
            p=unquote(p).strip('/')
            return (p or 'index.html') in names or p+'.html' in names or p+'/index.html' in names or (not p and 'index.html' in names)
        required=['index.html','en.html','404.html','_headers','_redirects','robots.txt','sitemap.xml','video-sitemap.xml','hassn-editor-cv-en.pdf']
        for n in required:
            if n not in names: errors.append('Missing '+n)
        if errors: return {'errors':errors,'warnings':warnings}
        urls=[e.text for e in ET.fromstring(read('sitemap.xml')).findall('./{*}url/{*}loc')]
        videos=[e.text for e in ET.fromstring(read('video-sitemap.xml')).findall('./{*}url/{*}loc')]
        if len(urls)!=len(set(urls)): errors.append('Duplicate sitemap URLs')
        if len(videos)!=len(set(videos)): errors.append('Duplicate video URLs')
        if expected is not None and len(urls)!=expected: errors.append(f'Expected {expected} pages, got {len(urls)}')
        if len(videos)!=44: errors.append(f'Expected 44 video pages, got {len(videos)}')
        for u in videos:
            if u.rstrip('/') not in {v.rstrip('/') for v in urls}: errors.append('Video missing from sitemap: '+u)
        headers=read('_headers'); redirects=read('_redirects')
        if 'noindex' in headers.lower(): errors.append('Production headers contain noindex')
        if 'Content-Security-Policy:' not in headers: errors.append('Missing CSP')
        if 'https://www.hassneditor.com/* https://hassneditor.com/:splat 301!' not in redirects: errors.append('Missing www redirect')
        for u in urls:
            p=urlsplit(u); route=p.path or '/'; name=route.strip('/')+'.html' if route!='/' else 'index.html'
            def err(s): errors.append(route+': '+s)
            if p.scheme!='https' or p.netloc!='hassneditor.com': err('Invalid sitemap origin')
            if name not in names: err('Missing exported HTML'); continue
            if route!='/' and f'{route} /{name} 200!' not in redirects: err('Missing rewrite')
            page=Page(read(name)); links=page.get('link'); meta=page.get('meta'); doc=page.get('html')[0]
            lang='en' if route=='/en' or route.startswith('/en/') else 'ar'
            if doc.get('lang')!=lang or doc.get('dir')!=('ltr' if lang=='en' else 'rtl'): err('Incorrect language/direction')
            canon=[a.get('href','').rstrip('/') for a in links if a.get('rel')=='canonical']
            if canon!=[u.rstrip('/')]: err('Canonical mismatch')
            if not any(a.get('name')=='description' and a.get('content') for a in meta): err('Missing description')
            if any(a.get('name','').lower() in ('robots','googlebot') and 'noindex' in a.get('content','').lower() for a in meta): err('Meta noindex')
            if len(page.get('h1'))!=1: err('Expected one H1')
            for code in ('ar','en','x-default'):
                if not any(a.get('rel')=='alternate' and a.get('hreflang')==code for a in links): err('Missing alternate '+code)
            for tag, attr in [('a','href'),('script','src'),('img','src'),('link','href')]:
                for a in page.get(tag):
                    value=a.get(attr,''); target=urlsplit(urljoin(u,value))
                    if not value or value.startswith(('#','mailto:','tel:','data:','javascript:')) or target.netloc!='hassneditor.com': continue
                    if not exists(target.path): err('Missing local resource '+target.path)
        return {'pages':len(urls),'videos':len(videos),'files':len(names),'errors':sorted(set(errors)),'warnings':warnings}

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__); p.add_argument('zip',type=Path); p.add_argument('--pages',type=int); a=p.parse_args()
    result=audit(a.zip,a.pages); print(json.dumps(result,ensure_ascii=False,indent=2)); sys.exit(bool(result['errors']))
