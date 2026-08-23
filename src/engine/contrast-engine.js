import { contrastRatio, relativeLuminance, gamutMap, withLightness, clamp } from './color.js';

const AA_NORMAL = 4.5;
const AA_LARGE = 3.0;
const AAA_NORMAL = 7.0;

const FG_FIELDS = [
  'text','textMuted','textSubtle',
  'primaryForeground','accentForeground','contrastForeground',
  'neutralForeground','successForeground','warningForeground','errorForeground','infoForeground',
];
const BG_FIELDS = [
  'background','surface','surfaceElevated','surfaceActive',
  'primary','accent','contrast','neutral',
  'success','warning','error','info',
  'primarySoft','accentSoft','successSoft','warningSoft','errorSoft','infoSoft','neutralSoft',
];

function pickTargetRatio(fgField, bgField) {
  if (fgField === 'text' && (bgField === 'background' || bgField === 'surface' || bgField === 'surfaceElevated'))
    return AAA_NORMAL;
  if (fgField === 'textMuted' && (bgField === 'background' || bgField === 'surface'))
    return AA_NORMAL;
  if (fgField === 'textSubtle') return AA_LARGE;
  if (fgField.endsWith('Foreground')) return AA_NORMAL;
  return AA_NORMAL;
}

function criticalPairs(theme) {
  return [
    ['text','background'],
    ['textMuted','background'],
    ['text','surface'],
    ['textMuted','surface'],
    ['primaryForeground','primary'],
    ['accentForeground','accent'],
    ['contrastForeground','contrast'],
    ['successForeground','success'],
    ['warningForeground','warning'],
    ['errorForeground','error'],
    ['infoForeground','info'],
  ];
}

export function auditContrast(lightTheme, darkTheme) {
  const checks = (theme, mode) => criticalPairs(theme).map(([fg, bg]) => ({
    mode, fgField: fg, bgField: bg,
    ratio: +contrastRatio(theme[fg], theme[bg]).toFixed(2),
    target: pickTargetRatio(fg, bg),
    pass: contrastRatio(theme[fg], theme[bg]) >= pickTargetRatio(fg, bg),
  }));
  return [...checks(lightTheme, 'light'), ...checks(darkTheme, 'dark')];
}

export function bestForegroundFor(bg, target) {
  const bgLum = relativeLuminance(bg);
  const wantLight = bgLum < 0.18;
  const H = bg.H;
  const candC = Math.min(bg.C * 0.1, 0.02);
  const steps = 200;
  let best = null, bestR = -1;
  for (let i = 0; i <= steps; i++) {
    const L = wantLight ? clamp(i / steps, 0.5, 1) : clamp(1 - i / steps, 0, 0.5);
    const fg = gamutMap({ L, C: candC, H });
    const r = contrastRatio(bg, fg);
    if (r >= target) return fg;
    if (r > bestR) { bestR = r; best = fg; }
  }
  return best;
}

export function bestBackgroundFor(fg, target, baseBg) {
  const fgLum = relativeLuminance(fg);
  const wantLightBg = fgLum < 0.18;
  const H = baseBg.H;
  const candC = Math.min(baseBg.C * 0.12, 0.02);
  const steps = 200;
  let best = null, bestR = -1;
  for (let i = 0; i <= steps; i++) {
    const L = wantLightBg ? clamp(0.85 + (i / steps) * 0.15, 0.85, 1) : clamp((1 - i / steps) * 0.18, 0, 0.18);
    const bg = gamutMap({ L, C: candC, H });
    const r = contrastRatio(fg, bg);
    if (r >= target) return bg;
    if (r > bestR) { bestR = r; best = bg; }
  }
  return best;
}

export function fixTheme(theme, isDark) {
  const fixes = {};
  const pairs = criticalPairs(theme);

  for (const [fgField, bgField] of pairs) {
    const fg = theme[fgField];
    const bg = theme[bgField];
    const target = pickTargetRatio(fgField, bgField);
    const ratio = contrastRatio(fg, bg);

    if (ratio < target) {
      if (fgField === 'text' || fgField === 'textMuted' || fgField === 'textSubtle') {
        const fixedFg = bestForegroundFor(bg, target);
        if (fixedFg && contrastRatio(fixedFg, bg) > ratio) {
          fixes[fgField] = fixedFg;
        }
      } else if (fgField.endsWith('Foreground')) {
        const baseColorField = fgField.replace('Foreground','');
        const baseColor = theme[baseColorField];
        const fixedFg = bestForegroundFor(baseColor, target);
        if (fixedFg && contrastRatio(fixedFg, baseColor) > ratio) {
          fixes[fgField] = fixedFg;
        }
      } else {
        const fixedFg = bestForegroundFor(bg, target);
        if (fixedFg && contrastRatio(fixedFg, bg) > ratio) {
          fixes[fgField] = fixedFg;
        }
      }
    }
  }

  for (const [k, v] of Object.entries(fixes)) {
    theme[k] = v;
  }

  return { theme, fixes, fixCount: Object.keys(fixes).length };
}

export function validateAndFix(lightTheme, darkTheme) {
  const lightResult = fixTheme({ ...lightTheme }, false);
  const darkResult = fixTheme({ ...darkTheme }, true);
  const audit = auditContrast(lightResult.theme, darkResult.theme);
  return {
    light: lightResult.theme,
    dark: darkResult.theme,
    audit,
    totalFixes: lightResult.fixCount + darkResult.fixCount,
    fixes: { light: lightResult.fixes, dark: darkResult.fixes },
    allPass: audit.every(c => c.pass),
  };
}