import http.server
import socketserver
import os

PORT = 8000
DIRECTORY = os.path.join(os.path.dirname(__file__), "apps", "web-dashboard")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    print(f"Starting server on http://127.0.0.1:{PORT} serving {DIRECTORY}...")
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        httpd.serve_forever()
