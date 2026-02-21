const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function walk(dir) {
  const entries = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) entries.push(...walk(full));
    else entries.push(full);
  }
  return entries;
}

// skip node_modules and any archive markers
function walkFiltered(dir) {
  return walk(dir).filter(f => !f.includes('node_modules') && !f.includes('.ARCHIVE'));
}

function isExternal(ref) {
  return /^(https?:|\/\/|data:|mailto:|tel:|#)/.test(ref) || ref.startsWith('/api');
}

const files = walkFiltered(ROOT);
const htmlFiles = files.filter(f => f.endsWith('.html'));
const jsFiles = files.filter(f => f.endsWith('.js'));

const missing = new Set();

const attrRe = /(?:src|href)\s*=\s*['"]([^'"\s]+)['"]/g;
const importRe = /(?:import\s+(?:[^'"\n]+\s+from\s+)?|require\()\s*['"]([^'"\)]+)['"]/g;
const stringAssetRe = /['"]((?:assets|css|fontawesome|LOGO|images|img|webfonts|videos|fonts)\/[^'"\s]+)['"]/g;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = attrRe.exec(content)) !== null) {
    let ref = m[1];
    if (isExternal(ref)) continue;
    // strip fragment and query
    ref = ref.split('#')[0].split('?')[0];
    if (!ref) continue;
    const target = ref.startsWith('/') ? path.join(ROOT, ref.slice(1)) : path.resolve(path.dirname(file), ref);
    if (!fs.existsSync(target)) missing.add(`${path.relative(ROOT, file)}: ${ref}`);
  }
}

for (const file of jsFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = importRe.exec(content)) !== null) {
    let ref = m[1];
    if (isExternal(ref)) continue;
    if (ref.startsWith('.') || ref.startsWith('/')) {
      ref = ref.split('#')[0].split('?')[0];
      const target = ref.startsWith('/') ? path.join(ROOT, ref.slice(1)) : path.resolve(path.dirname(file), ref);
      // append .js if needed
      const candidates = [target, target + '.js', path.join(target, 'index.js')];
      if (!candidates.some(c => fs.existsSync(c))) missing.add(`${path.relative(ROOT, file)}: ${ref}`);
    }
  }

  // asset-like string literals
  while ((m = stringAssetRe.exec(content)) !== null) {
    let ref = m[1];
    ref = ref.split('#')[0].split('?')[0];
    const target = path.resolve(ROOT, ref);
    if (!fs.existsSync(target)) missing.add(`${path.relative(ROOT, file)}: ${ref}`);
  }
}

if (missing.size === 0) {
  console.log('No missing local references found (recursive).');
  process.exit(0);
}

for (const s of Array.from(missing).sort()) console.log(s);
process.exit(0);
