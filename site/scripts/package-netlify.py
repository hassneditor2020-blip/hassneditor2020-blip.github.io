"""Package the static Next.js export for Netlify Drop."""

import argparse
from pathlib import Path
import re
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET
from zipfile import ZIP_DEFLATED, ZipFile

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("zip_path", type=Path)
parser.add_argument("--preview", action="store_true", help="Keep the trial deployment out of search indexes")
options = parser.parse_args()

root = Path(__file__).resolve().parents[1]
output = root / "out"
if not (output / "index.html").is_file():
    parser.error("Build the site with Next.js before packaging it.")

# Keep the live site's canonical URL style, including the English homepage.
routes = [urlsplit(loc.text).path for loc in ET.parse(output / "sitemap.xml").findall(".//{*}loc")]
if not routes:
    parser.error("The sitemap contains no routes.")
redirects = ["https://www.hassneditor.com/* https://hassneditor.com/:splat 301!"]
if not options.preview:
    redirects.insert(0, "https://super-starship-575de0.netlify.app/* https://hassneditor.com/:splat 301!")
for route in sorted(set(routes) - {"", "/"}):
    file = f"{route}.html"
    if not (output / file.lstrip("/")).is_file():
        parser.error(f"The sitemap route {route} has no exported HTML.")
    redirects.append(f"{route} {file} 200!")

# Set the same CSP and security headers as the existing site.
worker = (root / "worker" / "index.ts").read_text()
policy = re.search(r'headers\.set\("Content-Security-Policy", "([^"]+)"\);', worker).group(1)
headers = [
    "/*",
    f"  Content-Security-Policy: {policy}",
    "  Referrer-Policy: strict-origin-when-cross-origin",
    "  X-Content-Type-Options: nosniff",
    "  X-Frame-Options: SAMEORIGIN",
    "  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()",
]
if options.preview:
    headers.append("  X-Robots-Tag: noindex")

(output / "_headers").write_text("\n".join(headers) + "\n")
(output / "_redirects").write_text("\n".join(redirects) + "\n")
options.zip_path.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(options.zip_path, "w", ZIP_DEFLATED) as archive:
    for file in sorted(output.rglob("*")):
        if file.is_file():
            archive.write(file, file.relative_to(output))
print(f"{options.zip_path}: {len(set(routes))} sitemap pages, {options.zip_path.stat().st_size:,} bytes")
