"""
⚠️ DEPRECATED FALLBACK SCRIPT ⚠️
Este script fue aislado temporalmente en favor de la nueva arquitectura n8n + Astro API SSR.
NO SE HA ELIMINADO para cumplir con la directiva arquitectónica de mantener un respaldo en caso de emergencia fallida de webhooks.
Modo de uso: Sigue funcional, no ha sido alterado lógicamente.
"""
import http.server
import socketserver
import urllib.request
import json
import os

PORT = 6000
WEBHOOK_URL = "https://www.taskade.com/webhooks/flow/01K436XCXYKM6ED0S3D4JNFJ8J/sync"

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/submit-webhook':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)

            try:
                # Forward request to Taskade
                req = urllib.request.Request(
                    WEBHOOK_URL,
                    data=post_data,
                    headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'}
                )
                
                with urllib.request.urlopen(req) as response:
                    response_body = response.read()
                    self.send_response(response.getcode())
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(response_body)
                    
            except Exception as e:
                print(f"Error forwarding request: {e}")
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
        else:
            self.send_error(404, "Not Found")

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

print(f"Sirviendo en http://localhost:{PORT}")
print(f"Proxy activo hacia: {WEBHOOK_URL}")

with socketserver.TCPServer(("127.0.0.1", PORT), ProxyHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
