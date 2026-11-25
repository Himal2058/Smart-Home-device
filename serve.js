const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = {
  '.html':'text/html',
  '.css':'text/css',
  '.js':'application/javascript',
  '.json':'application/json',
  '.png':'image/png',
  '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg',
  '.svg':'image/svg+xml',
  '.ico':'image/x-icon'
};
const base = path.resolve(__dirname);
http.createServer((req, res) => {
  let filePath = path.join(base, decodeURI(req.url.split('?')[0]));
  if (filePath.endsWith('/') || filePath === base) filePath += 'index.html';
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      return res.end('404 Not Found');
    }
    const ext = path.extname(filePath).toLowerCase();
    const ct = mime[ext] || 'application/octet-stream';
    res.writeHead(200, {'Content-Type': ct});
    fs.createReadStream(filePath).pipe(res);
  });
}).listen(8000, () => {
  console.log('Static server running at http://localhost:8000');
});
