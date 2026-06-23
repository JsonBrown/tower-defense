#!/usr/bin/env node
// Dev server with live reload via Server-Sent Events. No dependencies needed.

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

// SSE clients waiting for reload signals
const clients = new Set();

const server = http.createServer((req, res) => {
  // SSE endpoint for live reload
  if (req.url === '/__reload') {
    res.writeHead(200, {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection':    'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.write('data: connected\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  let filePath = path.join(ROOT, req.url === '/' ? 'index.html' : req.url);

  // Prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath);
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });

    // Inject live-reload script into HTML responses
    if (ext === '.html') {
      const script = `<script>
(function() {
  var es = new EventSource('/__reload');
  es.onmessage = function(e) { if (e.data === 'reload') location.reload(); };
  es.onerror   = function()  { setTimeout(function() { location.reload(); }, 1000); };
})();
</script>`;
      data = Buffer.from(data.toString().replace('</body>', script + '</body>'));
    }

    res.end(data);
  });
});

function notifyReload() {
  for (const client of clients) {
    client.write('data: reload\n\n');
  }
}

// Watch for file changes
let debounce;
fs.watch(ROOT, { recursive: true }, (_, filename) => {
  if (!filename || filename.startsWith('.git')) return;
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    console.log(`  changed: ${filename}`);
    notifyReload();
  }, 100);
});

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
  console.log('Watching for file changes...\n');
});
