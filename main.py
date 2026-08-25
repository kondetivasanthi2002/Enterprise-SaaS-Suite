import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = os.path.join(os.path.dirname(__file__), "apps", "web-dashboard")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    print("=======================================================")
    print("   ENTERPRISE SAAS SUITE EXECUTABLE MAIN ENTRY POINT  ")
    print("=======================================================")
    print(f"Server active at: http://127.0.0.1:{PORT}")
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        httpd.serve_forever()

if __name__ == "__main__":
    main()
