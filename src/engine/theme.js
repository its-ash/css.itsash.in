import { oklchStr, contrastRatio } from './color.js';
import { generateCore, generateThemes } from './palette.js';
import { generateCoreForStyle } from './style-engine.js';
import { validateAndFix, auditContrast } from './contrast-engine.js';
import { fontStack, monoStack, autoPair, autoMono } from './fonts.js';

const DEFAULT_HEADING = 'Inter';
const DEFAULT_BODY = 'Inter';
const DEFAULT_MONO = 'JetBrains Mono';

function typoTokens(headingFont, bodyFont, monoFont) {
  const heading = fontStack(headingFont);
  const body = fontStack(bodyFont);
  const mono = monoStack(monoFont);
  return {
    '--font-family': body,
    '--font-family-heading': heading,
    '--font-family-body': body,
    '--font-family-mono': mono,
    '--font-size-xs': '0.75rem',
    '--font-size-sm': '0.875rem',
    '--font-size-md': '1rem',
    '--font-size-lg': '1.125rem',
    '--font-size-xl': 'clamp(1.125rem, 1.08rem + 0.22vw, 1.25rem)',
    '--font-size-2xl': 'clamp(1.375rem, 1.28rem + 0.48vw, 1.625rem)',
    '--font-size-3xl': 'clamp(1.625rem, 1.45rem + 0.88vw, 2.125rem)',
    '--font-size-4xl': 'clamp(2rem, 1.7rem + 1.5vw, 2.75rem)',
    '--font-size-5xl': 'clamp(2.5rem, 2rem + 2.5vw, 3.5rem)',
    '--font-weight-normal': '400',
    '--font-weight-medium': '500',
    '--font-weight-semibold': '600',
    '--font-weight-bold': '700',
    '--line-height-tight': '1.15',
    '--line-height-snug': '1.3',
    '--line-height-normal': '1.55',
    '--line-height-relaxed': '1.8',
    '--letter-spacing-tight': '-0.02em',
    '--letter-spacing-normal': '0',
    '--letter-spacing-wide': '0.025em',
  };
}

const SPACE = {
  '--space-1': '0.25rem',
  '--space-2': '0.5rem',
  '--space-3': '0.75rem',
  '--space-4': '1rem',
  '--space-5': '1.25rem',
  '--space-6': '1.5rem',
  '--space-8': '2rem',
  '--space-10': '2.5rem',
  '--space-12': '3rem',
  '--space-16': '4rem',
};

const RADIUS = {
  '--radius-sm': '0.25rem',
  '--radius-md': '0.5rem',
  '--radius-lg': '0.75rem',
  '--radius-xl': '1rem',
  '--radius-full': '9999px',
};

const SHADOWS_LIGHT = {
  '--shadow-xs': 'rgba(99,99,99,0.12) 0px 1px 4px 0px',
  '--shadow-sm': 'rgba(99,99,99,0.2) 0px 2px 8px 0px',
  '--shadow-md': 'rgba(99,99,99,0.2) 0px 4px 12px 0px, rgba(99,99,99,0.12) 0px 2px 4px 0px',
  '--shadow-lg': 'rgba(99,99,99,0.22) 0px 8px 24px 0px, rgba(99,99,99,0.14) 0px 4px 8px 0px',
  '--shadow-xl': 'rgba(99,99,99,0.24) 0px 16px 40px 0px, rgba(99,99,99,0.16) 0px 8px 16px 0px',
  '--shadow-2xl': 'rgba(99,99,99,0.26) 0px 24px 56px 0px, rgba(99,99,99,0.18) 0px 12px 24px 0px',
  '--shadow-inner': 'inset 0 1px 2px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(0,0,0,0.03)',
  '--shadow-focus': '0 0 0 3px color-mix(in oklch, var(--primary) 22%, transparent)',
};
const SHADOWS_DARK = {
  '--shadow-xs': 'rgba(0,0,0,0.24) 0px 1px 4px 0px',
  '--shadow-sm': 'rgba(0,0,0,0.35) 0px 2px 8px 0px, inset 0 1px 0 rgba(255,255,255,0.03)',
  '--shadow-md': 'rgba(0,0,0,0.4) 0px 4px 12px 0px, rgba(0,0,0,0.28) 0px 2px 4px 0px, inset 0 1px 0 rgba(255,255,255,0.04)',
  '--shadow-lg': 'rgba(0,0,0,0.45) 0px 8px 24px 0px, rgba(0,0,0,0.3) 0px 4px 8px 0px, inset 0 1px 0 rgba(255,255,255,0.05)',
  '--shadow-xl': 'rgba(0,0,0,0.5) 0px 16px 40px 0px, rgba(0,0,0,0.32) 0px 8px 16px 0px, inset 0 1px 0 rgba(255,255,255,0.06)',
  '--shadow-2xl': 'rgba(0,0,0,0.56) 0px 24px 56px 0px, rgba(0,0,0,0.36) 0px 12px 24px 0px, inset 0 1px 0 rgba(255,255,255,0.07)',
  '--shadow-inner': 'inset 0 1px 2px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.03)',
  '--shadow-focus': '0 0 0 3px color-mix(in oklch, var(--primary) 28%, transparent)',
};

function tokenize(theme) {
  const m = {
    '--background': theme.background,
    '--surface': theme.surface,
    '--surface-elevated': theme.surfaceElevated,
    '--surface-hover': theme.surfaceHover,
    '--surface-active': theme.surfaceActive,
    '--text': theme.text,
    '--text-muted': theme.textMuted,
    '--text-subtle': theme.textSubtle,
    '--text-disabled': theme.textDisabled,
    '--border': theme.border,
    '--border-subtle': theme.borderSubtle,
    '--border-strong': theme.borderStrong,
    '--primary': theme.primary,
    '--primary-hover': theme.primaryHover,
    '--primary-active': theme.primaryActive,
    '--primary-soft': theme.primarySoft,
    '--primary-foreground': theme.primaryForeground,
    '--accent': theme.accent,
    '--accent-hover': theme.accentHover,
    '--accent-active': theme.accentActive,
    '--accent-soft': theme.accentSoft,
    '--accent-foreground': theme.accentForeground,
    '--neutral': theme.neutral,
    '--neutral-hover': theme.neutralHover,
    '--neutral-active': theme.neutralActive,
    '--neutral-soft': theme.neutralSoft,
    '--neutral-muted': theme.neutralMuted,
    '--neutral-border': theme.neutralBorder,
    '--neutral-background': theme.neutralBackground,
    '--neutral-foreground': theme.neutralForeground,
    '--contrast': theme.contrast,
    '--contrast-hover': theme.contrastHover,
    '--contrast-active': theme.contrastActive,
    '--contrast-foreground': theme.contrastForeground,
    '--success': theme.success,
    '--success-foreground': theme.successForeground,
    '--success-soft': theme.successSoft,
    '--warning': theme.warning,
    '--warning-foreground': theme.warningForeground,
    '--warning-soft': theme.warningSoft,
    '--error': theme.error,
    '--error-foreground': theme.errorForeground,
    '--error-soft': theme.errorSoft,
    '--info': theme.info,
    '--info-foreground': theme.infoForeground,
    '--info-soft': theme.infoSoft,
  };
  return m;
}

export function buildTheme(primaryInput, fontConfig = {}, styleId = 'default') {
  const core = styleId && styleId !== 'default'
    ? generateCoreForStyle(primaryInput, styleId)
    : generateCore(primaryInput);
  let { light, dark } = generateThemes(core);
  const validation = validateAndFix(light, dark);
  light = validation.light;
  dark = validation.dark;
  const lightTokens = tokenize(light);
  const darkTokens = tokenize(dark);
  const headingFont = fontConfig.heading || DEFAULT_HEADING;
  const bodyFont = fontConfig.body || autoPair(headingFont);
  const monoFont = fontConfig.mono || autoMono(headingFont, bodyFont);
  return {
    core,
    fonts: { heading: headingFont, body: bodyFont, mono: monoFont },
    light: { tokens: lightTokens, theme: light },
    dark: { tokens: darkTokens, theme: dark },
    ratios: checkContrast(light, dark),
    audit: validation.audit,
    totalFixes: validation.totalFixes,
    allPass: validation.allPass,
  };
}

function checkContrast(light, dark) {
  const pairs = [
    ['text/bg', light.text, light.background],
    ['text-muted/bg', light.textMuted, light.background],
    ['primary/fg', light.primaryForeground, light.primary],
    ['accent/fg', light.accentForeground, light.accent],
    ['d:text/bg', dark.text, dark.background],
    ['d:text-muted/bg', dark.textMuted, dark.background],
    ['d:primary/fg', dark.primaryForeground, dark.primary],
    ['d:accent/fg', dark.accentForeground, dark.accent],
  ];
  return pairs.map(([n, a, b]) => ({ name: n, ratio: +contrastRatio(a, b).toFixed(2) }));
}

function renderTokens(tokens) {
  return Object.entries(tokens)
    .map(([k, v]) => `  ${k}: ${oklchStr(v)};`)
    .join('\n');
}

export function generateCSS(theme, fontConfig = {}) {
  const headingFont = fontConfig.heading || theme.fonts?.heading || DEFAULT_HEADING;
  const bodyFont = fontConfig.body || theme.fonts?.body || autoPair(headingFont);
  const monoFont = fontConfig.mono || theme.fonts?.mono || autoMono(headingFont, bodyFont);
  const TYPO = typoTokens(headingFont, bodyFont, monoFont);
  const lt = renderTokens(theme.light.tokens);
  const dt = renderTokens(theme.dark.tokens);
  const typo = Object.entries(TYPO).map(([k, v]) => `  ${k}: ${v};`).join('\n');
  const sp = Object.entries(SPACE).map(([k, v]) => `  ${k}: ${v};`).join('\n');
  const rd = Object.entries(RADIUS).map(([k, v]) => `  ${k}: ${v};`).join('\n');
  const sl = Object.entries(SHADOWS_LIGHT).map(([k, v]) => `  ${k}: ${v};`).join('\n');
  const sd = Object.entries(SHADOWS_DARK).map(([k, v]) => `  ${k}: ${v};`).join('\n');
  return `:root {
${typo}
${sp}
${rd}
${sl}
${lt}
}
[data-theme="dark"] {
${sd}
${dt}
}
`;
}