from __future__ import annotations

import argparse
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class TechShopHandler(SimpleHTTPRequestHandler):
	def __init__(self, *args, directory: str, fallback_404: str, **kwargs):
		self._fallback_404 = Path(fallback_404)
		super().__init__(*args, directory=directory, **kwargs)

	def do_GET(self):
		if self.path in {"/", "/index.html"}:
			self.path = "/pages/index.html"
		elif self.path.endswith(".html") and not self.path.startswith("/pages/"):
			self.path = "/pages" + self.path
		super().do_GET()

	def end_headers(self):
		self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
		self.send_header("Pragma", "no-cache")
		self.send_header("Expires", "0")
		super().end_headers()

	def send_error(self, code, message=None, explain=None):
		if code == 404 and self._fallback_404.exists():
			self.send_response(404, message)
			self.send_header("Content-Type", "text/html; charset=utf-8")
			self.end_headers()
			self.wfile.write(self._fallback_404.read_bytes())
			return
		super().send_error(code, message, explain)


def main():
	parser = argparse.ArgumentParser()
	parser.add_argument("--port", type=int, default=4190)
	args = parser.parse_args()

	project_root = Path(__file__).resolve().parents[1]
	fallback = project_root / "pages" / "404.html"
	handler = functools.partial(
		TechShopHandler,
		directory=str(project_root),
		fallback_404=str(fallback),
	)
	server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
	print(f"Serving on http://127.0.0.1:{args.port}")
	server.serve_forever()


if __name__ == "__main__":
	main()
