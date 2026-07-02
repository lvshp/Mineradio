import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const appDir = path.join(root, 'public', 'scripts', 'app');
const manifestPath = path.join(appDir, 'manifest.json');
const bundlePath = path.join(root, 'public', 'scripts', 'app.bundle.js');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const chunks = Array.isArray(manifest.chunks) ? manifest.chunks : [];
if (!chunks.length) {
  throw new Error('public/scripts/app/manifest.json has no chunks');
}

let bundle = '';
for (const chunk of chunks) {
  const chunkPath = path.join(appDir, chunk);
  if (!chunkPath.startsWith(appDir + path.sep)) {
    throw new Error(`Invalid chunk path: ${chunk}`);
  }
  bundle += fs.readFileSync(chunkPath, 'utf8').replace(/\s+$/, '') + '\n\n';
}

fs.writeFileSync(bundlePath, bundle.replace(/\s+$/, '') + '\n');
console.log(`Built ${path.relative(root, bundlePath)} from ${chunks.length} chunks`);
