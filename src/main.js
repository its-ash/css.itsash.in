import { parseColor, oklchToHex, oklchToRgb, oklchStr } from './engine/color.js';
import { buildTheme, generateCSS } from './engine/theme.js';
import { COMPONENTS } from './engine/components.js';
import { DEMO_HTML } from './engine/demo.js';
import { fontCssUrl, autoPair, autoMono } from './engine/fonts.js';

export function generateTheme(primaryInput, fontConfig = {}) {
  const oc = parseColor(primaryInput);
  if (!oc) return { error: 'Invalid color' };
  const headingFont = fontConfig.heading || 'Inter';
  const bodyFont = fontConfig.body || autoPair(headingFont);
  const monoFont = fontConfig.mono || autoMono(headingFont, bodyFont);
  const resolvedFonts = { heading: headingFont, body: bodyFont, mono: monoFont };
  const theme = buildTheme(oc, resolvedFonts);
  const css = generateCSS(theme, resolvedFonts) + COMPONENTS;
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
  return { theme, css, core, ratios: theme.ratios, fonts: resolvedFonts, fontUrl };
}

export { DEMO_HTML };

if (typeof window !== 'undefined') {
  window.__generateTheme = generateTheme;
}