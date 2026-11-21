"""Serve the static export locally with extensionless URLs and Netlify headers."""

import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1] / "out"
HEADER_FILE = ROOT / "_headers"


class PreviewRequest(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def translate_path(self, path):
        filename = Path(super().translate_path(path))
        url = unquote(urlsplit(path).path)
        page = filename.with_suffix(".html") if filename.name and not filename.suffix else filename
        if url != "/" and not filename.is_file() and page.is_file():
            return str(page)
        return str(filename)

    def end_headers(self):
        for line in HEADER_FILE.read_text().splitlines():
            if line.startswith("  ") and ": " in line:
                name, value = line.strip().split(": ", 1)
                if name == "Content-Security-Policy":
                    value = value.replace("; upgrade-insecure-requests", "")
                self.send_header(name, value)
        super().end_headers()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8765)
    options = parser.parse_args()
    if not (ROOT / "index.html").is_file() or not HEADER_FILE.is_file():
        parser.error("Build the project and run package-netlify.py first.")
    print(f"Preview at http://127.0.0.1:{options.port}", flush=True)
    with ThreadingHTTPServer(("127.0.0.1", options.port), PreviewRequest) as server:
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
