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
  return src.replace(/^import\s+.*$/gm, '');
}

function stripExport(src) {
  return src
    .replace(/^export\s+(const|let|var|function|class)\s+/gm, '$1 ')
    .replace(/^export\s*\{[^}]*\};?\s*$/gm, '');
}

const colorSrc = stripExport(stripImports(readSrc('engine/color.js')));
const paletteSrc = stripExport(stripImports(readSrc('engine/palette.js')));
const themeSrc = stripExport(stripImports(readSrc('engine/theme.js')));
const componentsSrc = stripExport(stripImports(readSrc('engine/components.js')));
const fontsSrc = stripExport(stripImports(readSrc('engine/fonts.js')));
const mainSrc = stripExport(stripImports(readSrc('main.js')));

const bundle = `/* Theme Engine Bundle — css.itsash.in */
/* Auto-generated. Do not edit directly. */
(function (global) {
"use strict";

/* === color.js === */
${colorSrc}

/* === palette.js === */
${paletteSrc}

/* === theme.js === */
${themeSrc}

/* === components.js === */
${componentsSrc}

/* === fonts.js === */
${fontsSrc}

/* === main.js === */
${mainSrc}

global.ThemeEngine = { generateTheme, autoPair, autoMono, fontCssUrl, FONTS, MONO_FONTS };
})(typeof window !== 'undefined' ? window : this);
`;

const outDir = join(__dirname, 'docs', 'js');
mkdirSync(outDir, { recursive: true });

const outFile = join(outDir, 'theme-engine.js');
writeFileSync(outFile, bundle.trim() + '\n');

console.log('✓ Built docs/js/theme-engine.js');