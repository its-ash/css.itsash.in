const fs = require('fs');
const path = require('path');

const presetDir = path.join(__dirname, 'scss', 'presets');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

const presets = fs.readdirSync(presetDir)
  .filter(f => f.endsWith('.scss') && !f.startsWith('_'))
  .map(f => f.replace('.scss', ''));

const presetsList = presets.join("','");

console.log(`Found ${presets.length} presets: ${presetsList}`);

const htmlTemplate = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf-8');
const engineJs = fs.readFileSync(path.join(__dirname, 'engine.js'), 'utf-8');
const presetsJs = fs.readFileSync(path.join(__dirname, 'presets.js'), 'utf-8');
const sassDartJs = fs.readFileSync(path.join(__dirname, 'sass.dart.js'), 'utf-8');
const immutableJs = fs.readFileSync(path.join(__dirname, 'immutable.min.js'), 'utf-8');
const sassBrowserInit = fs.readFileSync(path.join(__dirname, 'sass-browser-init.js'), 'utf-8');

const html = htmlTemplate
  .replace('</head>', `
    <script>
      window.STATIC_PRESETS = ['${presetsList}'];
    </script>
  </head>`);

fs.writeFileSync(path.join(distDir, 'index.html'), html);
fs.writeFileSync(path.join(distDir, 'app.js'), appJs);
fs.writeFileSync(path.join(distDir, 'engine.js'), engineJs);
fs.writeFileSync(path.join(distDir, 'presets.js'), presetsJs);
fs.writeFileSync(path.join(distDir, 'sass.dart.js'), sassDartJs);
fs.writeFileSync(path.join(distDir, 'immutable.min.js'), immutableJs);
fs.writeFileSync(path.join(distDir, 'sass-browser-init.js'), sassBrowserInit);

function copyDirRecursive(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, dstPath);
    } else if (entry.name.endsWith('.scss')) {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

copyDirRecursive(path.join(__dirname, 'scss'), path.join(distDir, 'scss'));

console.log('✓ Static build complete in ./dist');
console.log('Ready for GitHub Pages deployment');
