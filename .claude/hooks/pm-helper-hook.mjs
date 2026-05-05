import { request } from 'node:http';
const port = parseInt(process.argv[2], 10);
let body = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { body += chunk; });
process.stdin.on('end', () => {
  const req = request({
    hostname: '127.0.0.1',
    port,
    path: '/api/claude-hook',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
  }, () => { process.exit(0); });
  req.on('error', () => { process.exit(0); });
  req.write(body);
  req.end();
});
