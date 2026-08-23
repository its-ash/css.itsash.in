import { parseColor, oklchToHex, oklchToRgb, oklchStr } from './engine/color.js';
import { buildTheme, generateCSS } from './engine/theme.js';
import { COMPONENTS } from './engine/components.js';
import { DEMO_HTML } from './engine/demo.js';
import { fontCssUrl, autoPair, autoMono } from './engine/fonts.js';
import { STYLE_IDS, STYLE_LABELS, styleCSS } from './engine/styles.js';
import { generateCoreForStyle, autoPairForStyle, autoMonoForStyle } from './engine/style-engine.js';
import { runVisibilityAudit, startVisibilityWatch } from './engine/visibility-engine.js';

export function generateTheme(primaryInput, fontConfig = {}, styleId = 'default') {
  const oc = parseColor(primaryInput);
  if (!oc) return { error: 'Invalid color' };
  const headingFont = fontConfig.heading || 'Inter';
  const bodyFont = fontConfig.body || autoPairForStyle(headingFont, styleId);
  const monoFont = fontConfig.mono || autoMonoForStyle(headingFont, bodyFont, styleId);
  const resolvedFonts = { heading: headingFont, body: bodyFont, mono: monoFont };
  const theme = buildTheme(oc, resolvedFonts, styleId);
  const css = generateCSS(theme, resolvedFonts) + COMPONENTS + styleCSS(styleId);
  const fontUrl = fontCssUrl(headingFont, bodyFont, monoFont);
  const core = {
    primary: oklchToHex(theme.core.Primary),
    accent: oklchToHex(theme.core.Accent),
    neutral: oklchToHex(theme.core.Neutral),
    contrast: oklchToHex(theme.core.Contrast),
    primaryOklch: oklchStr(theme.core.Primary),
    accentOklch: oklchStr(theme.core.Accent),
    neutralOklch: oklchStr(theme.core.Neutral),
    contrastOklch: oklchStr(theme.core.Contrast),
  };
  return { theme, css, core, ratios: theme.ratios, fonts: resolvedFonts, fontUrl, audit: theme.audit, totalFixes: theme.totalFixes, allPass: theme.allPass };
}

export { DEMO_HTML, STYLE_IDS, STYLE_LABELS, runVisibilityAudit, startVisibilityWatch };

if (typeof window !== 'undefined') {
  window.__generateTheme = generateTheme;
}