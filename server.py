#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import unquote

class FrameAllowingHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Allow the page to be embedded in frames from any origin
        self.send_header('X-Frame-Options', 'ALLOWALL')
        # Alternative: use Content Security Policy
        self.send_header('Content-Security-Policy', 'frame-ancestors *')
        # Allow cross-origin requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def do_GET(self):
        # Handle favicon requests gracefully
        if self.path == '/favicon.ico':
            self.send_response(404)
            self.end_headers()
            return
        
        # Decode URL-encoded paths
        self.path = unquote(self.path)
        
        # Serve the file
        super().do_GET()

    def log_message(self, format, *args):
        # Custom logging to show which files are being served
        print(f"[Server] {args[0]} - {args[1]} - {args[2]}")

if __name__ == "__main__":
    PORT = 8000
    
    # Change to the script's directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)) or '.')
    
    Handler = FrameAllowingHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"✅ Physics Teacher Visuals Server")
        print(f"🌐 Server running at: http://localhost:{PORT}")
        print(f"📁 Serving files from: {os.getcwd()}")
        print(f"🔓 Frame embedding: ALLOWED")
        print(f"🚀 All pages can now be embedded in frames!")
        print(f"\n📚 Available pages:")
        print(f"   • http://localhost:{PORT}/")
        print(f"   • http://localhost:{PORT}/electrical-charge-illustration.html")
        print(f"   • http://localhost:{PORT}/electrical-current-flow.html") 
        print(f"   • http://localhost:{PORT}/voltage-potential-difference.html")
        print(f"   • http://localhost:{PORT}/resistance-enhanced.html")
        print(f"   • http://localhost:{PORT}/ohms-law-new.html")
        print(f"   • http://localhost:{PORT}/dc-vs-ac.html")
        print(f"\n⏹️  Press Ctrl+C to stop the server")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n🛑 Server stopped by user")
            httpd.shutdown() 