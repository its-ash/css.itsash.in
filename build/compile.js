const sass = require('sass');
const fs = require('fs');
const path = require('path');

const presetsDir = path.join(__dirname, '..', 'scss', 'presets');
const baseDir = path.join(__dirname, '..', 'scss');
const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

const presetFiles = fs.readdirSync(presetsDir)
  .filter(f => f.endsWith('.scss') && !f.startsWith('_'));

for (const file of presetFiles) {
  const name = path.basename(file, '.scss');
  const srcPath = path.join(presetsDir, file);
  try {
    const result = sass.compile(srcPath, {
      loadPaths: [presetsDir, baseDir],
      style: 'compressed',
      quietDeps: true,
      silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
    });
    fs.writeFileSync(path.join(distDir, `${name}.css`), result.css);
    console.log(`compiled ${name}.css`);
  } catch (err) {
    console.error(`FAILED ${name}:`, err.message);
    process.exitCode = 1;
  }
}
