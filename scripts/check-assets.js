const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
const re = /(?:src|href)\s*=\s*"([^"]+)"/g;
const missing = new Set();

for (const file of htmlFiles) {
  const full = path.join(root, file);
  const content = fs.readFileSync(full, 'utf8');
  let m;
  while ((m = re.exec(content)) !== null) {
    const ref = m[1];
    if (/^(https?:|\/\/|data:|mailto:|#)/.test(ref)) continue;
    const target = path.resolve(root, ref);
    if (!fs.existsSync(target)) missing.add(`${file}: ${ref}`);
  }
}

if (missing.size === 0) {
  console.log('No missing local asset references found.');
  process.exit(0);
}
for (const s of Array.from(missing).sort()) console.log(s);
process.exit(0);
