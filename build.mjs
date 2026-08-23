#!/usr/bin/env node
// Bundles src/ into a single standalone theme-engine.js file
// Usage: node build.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readSrc(rel) {
  return readFileSync(join(__dirname, 'src', rel), 'utf-8');
}

function stripImports(src) {
  return src
    .replace(/^import\s+.*$/gm, '')
    .replace(/^export\s+/gm, '');
}

function wrapExport(src, varName) {
  const stripped = stripImports(src);
  return `const ${varName} = (() => {\n${stripped}\n})();\n`;
}

const colorSrc = readSrc('engine/color.js');
const paletteSrc = readSrc('engine/palette.js');
const themeSrc = readSrc('engine/theme.js');
const componentsSrc = readSrc('engine/components.js');
const fontsSrc = readSrc('engine/fonts.js');
const mainSrc = readSrc('main.js');

// Bundle: strip imports/exports, concat in dependency order
const bundle = `/* Theme Engine - Auto-generated bundle */
/* color.js */
${stripImports(colorSrc)}

/* palette.js */
${stripImports(paletteSrc)}

/* theme.js */
${stripImports(themeSrc)}

/* components.js */
const COMPONENTS = ${JSON.stringify(stripImports(componentsSrc).replace(/^const COMPONENTS = /, '').replace(/;$/, ''))};

/* fonts.js */
${stripImports(fontsSrc)}

/* main */
${stripImports(mainSrc)}

/* Export */
window.ThemeEngine = { generateTheme, autoPair, autoMono, fontCssUrl };
`;

const outDir = join(__dirname, 'docs', 'js');
mkdirSync(outDir, { recursive: true });

const outFile = join(outDir, 'theme-engine.js');
writeFileSync(outFile, bundle.trim() + '\n');

console.log('✓ Built docs/js/theme-engine.js');