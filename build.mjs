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
const stylesSrc = stripExport(stripImports(readSrc('engine/styles.js')));
const styleEngineSrc = stripExport(stripImports(readSrc('engine/style-engine.js')));
const contrastEngineSrc = stripExport(stripImports(readSrc('engine/contrast-engine.js')));
const visibilityEngineSrc = stripExport(stripImports(readSrc('engine/visibility-engine.js')));
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

/* === styles.js === */
${stylesSrc}

/* === style-engine.js === */
${styleEngineSrc}

/* === contrast-engine.js === */
${contrastEngineSrc}

/* === visibility-engine.js === */
${visibilityEngineSrc}

/* === main.js === */
${mainSrc}

global.ThemeEngine = { generateTheme, autoPair, autoMono, autoPairForStyle, autoMonoForStyle, generateCoreForStyle, fontCssUrl, FONTS, MONO_FONTS, STYLE_IDS, STYLE_LABELS, runVisibilityAudit, startVisibilityWatch };
})(typeof window !== 'undefined' ? window : this);
`;

const outDir = join(__dirname, 'js');
mkdirSync(outDir, { recursive: true });

const outFile = join(outDir, 'theme-engine.js');
writeFileSync(outFile, bundle.trim() + '\n');

console.log('✓ Built js/theme-engine.js');