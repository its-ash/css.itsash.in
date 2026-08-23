/* Theme Engine Bundle — css.itsash.in */
/* Auto-generated. Do not edit directly. */
(function (global) {
"use strict";

/* === color.js === */
const M = [
  [0.4122214708, 0.5363325363, 0.0514459929],
  [0.2119034982, 0.6806995451, 0.1073969566],
  [0.0802065778, 0.1929826516, 0.6274647275],
];
const MI = [
  [4.0767416621, -3.3077115913, 0.2309699292],
  [-1.2684380046, 2.6097574011, -0.3413193965],
  [-0.0041960863, -0.7034186147, 1.7076147010],
];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const cbrt = (x) => (x < 0 ? -Math.pow(-x, 1 / 3) : Math.pow(x, 1 / 3));

function linToSrgb(x) {
  return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
}
function srgbToLin(x) {
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function linToOklab(r, g, b) {
  const l = M[0][0] * r + M[0][1] * g + M[0][2] * b;
  const m = M[1][0] * r + M[1][1] * g + M[1][2] * b;
  const s = M[2][0] * r + M[2][1] * g + M[2][2] * b;
  const l_ = cbrt(l), m_ = cbrt(m), s_ = cbrt(s);
  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  };
}

function oklabToOklch({ L, a, b }) {
  return { L, C: Math.hypot(a, b), H: (Math.atan2(b, a) * 180) / Math.PI };
}
function oklchToOklab({ L, C, H }) {
  const h = (H * Math.PI) / 180;
  return { L, a: C * Math.cos(h), b: C * Math.sin(h) };
}

function oklabToLin(o) {
  const { L, a, b } = o;
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return {
    r: MI[0][0] * l + MI[0][1] * m + MI[0][2] * s,
    g: MI[1][0] * l + MI[1][1] * m + MI[1][2] * s,
    b: MI[2][0] * l + MI[2][1] * m + MI[2][2] * s,
  };
}

function oklchToLinSrgb(oc) {
  return oklabToLin(oklchToOklab(oc));
}

function isInGamut(oc) {
  const { r, g, b } = oklchToLinSrgb(oc);
  const eps = 1e-4;
  return r >= -eps && r <= 1 + eps && g >= -eps && g <= 1 + eps && b >= -eps && b <= 1 + eps;
}

function gamutMap(oc) {
  if (isInGamut(oc)) return { ...oc };
  let { L, H } = oc;
  let lo = 0, hi = oc.C, best = { L, C: 0, H };
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    const cand = { L, C: mid, H };
    if (isInGamut(cand)) {
      best = cand;
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return best;
}

function oklchToSrgb01(oc) {
  const g = gamutMap(oc);
  const { r, g: gr, b } = oklchToLinSrgb(g);
  return {
    r: clamp(linToSrgb(clamp(r))),
    g: clamp(linToSrgb(clamp(gr))),
    b: clamp(linToSrgb(clamp(b))),
  };
}

function oklchToHex(oc) {
  const { r, g, b } = oklchToSrgb01(oc);
  const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

function oklchToRgb(oc) {
  const { r, g, b } = oklchToSrgb01(oc);
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

function oklchStr(oc, opts = {}) {
  const { C, H, L } = oc;
  const c = +C.toFixed(4), h = +H.toFixed(2), l = +L.toFixed(4);
  if (opts.alpha != null && opts.alpha < 1) {
    return `oklch(${l} ${c} ${h} / ${+opts.alpha.toFixed(2)})`;
  }
  return `oklch(${l} ${c} ${h})`;
}

function relativeLuminance(oc) {
  const { r, g, b } = oklchToSrgb01(oc);
  const R = srgbToLin(r), G = srgbToLin(g), B = srgbToLin(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(a, b) {
  const la = relativeLuminance(a), lb = relativeLuminance(b);
  const hi = Math.max(la, lb), lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

const RX_NUM = /[\d.]+/g;
function fromHslStr(str) {
  const n = str.match(RX_NUM).map(Number);
  const h = n[0] / 360, s = n[1] / 100, l = n[2] / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = l - c / 2;
  let r, g, b;
  if (h < 1 / 6) [r, g, b] = [c, x, 0];
  else if (h < 2 / 6) [r, g, b] = [x, c, 0];
  else if (h < 3 / 6) [r, g, b] = [0, c, x];
  else if (h < 4 / 6) [r, g, b] = [0, x, c];
  else if (h < 5 / 6) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const lin = { r: r + m, g: g + m, b: b + m };
  return oklabToOklch(linToOklab(lin.r, lin.g, lin.b));
}

function fromRgbStr(str) {
  const n = str.match(RX_NUM).map(Number);
  const lin = { r: n[0] / 255, g: n[1] / 255, b: n[2] / 255 };
  return oklabToOklch(linToOklab(lin.r, lin.g, lin.b));
}

function fromHexStr(str) {
  let h = str.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return oklabToOklch(linToOklab(r, g, b));
}

function fromOklchStr(str) {
  const n = str.match(RX_NUM).map(Number);
  return { L: n[0], C: n[1] ?? 0, H: n[2] ?? 0 };
}

function parseColor(input) {
  const s = String(input).trim().toLowerCase();
  try {
    if (s.startsWith('oklch')) return gamutMap(fromOklchStr(s));
    if (s.startsWith('hsl')) return gamutMap(fromHslStr(s));
    if (s.startsWith('rgb')) return gamutMap(fromRgbStr(s));
    if (s.startsWith('#') || /^[0-9a-f]{3,8}$/i.test(s)) return gamutMap(fromHexStr(s));
  } catch (e) {}
  return null;
}

function mixOklch(a, b, t) {
  return {
    L: a.L + (b.L - a.L) * t,
    C: a.C + (b.C - a.C) * t,
    H: a.H,
  };
}

function findForeground(bg, targetRatio = 4.5, preferLight = null) {
  const bgLum = relativeLuminance(bg);
  const wantLight = preferLight ?? bgLum < 0.18;
  const candC = Math.min(bg.C * 0.12, 0.02);
  let best = null, bestRatio = -1;
  const steps = 200;
  for (let i = 0; i <= steps; i++) {
    const L = wantLight ? i / steps : 1 - i / steps;
    const fg = gamutMap({ L, C: candC, H: bg.H });
    const r = contrastRatio(bg, fg);
    if (r >= targetRatio) return { fg, ratio: r };
    if (r > bestRatio) {
      bestRatio = r;
      best = fg;
    }
  }
  return { fg: best, ratio: bestRatio };
}

function withLightness(oc, L) {
  return gamutMap({ ...oc, L });
}
function withChroma(oc, C) {
  return gamutMap({ ...oc, C });
}

/* === palette.js === */


function rotateHue(h, deg) {
  return ((h + deg) % 360 + 360) % 360;
}

function generateCore(primaryInput) {
  const Primary = gamutMap({ ...primaryInput });
  const Accent = gamutMap({
    L: Primary.L,
    C: Primary.C,
    H: rotateHue(Primary.H, 137.5),
  });
  const Neutral = gamutMap({
    L: Primary.L,
    C: Primary.C * 0.4,
    H: Primary.H,
  });
  const Contrast = gamutMap({
    L: Accent.L * 0.75,
    C: Accent.C,
    H: Accent.H,
  });
  return { Primary, Accent, Neutral, Contrast };
}

function fg(bg, target = 4.5) {
  return findForeground(bg, target).fg;
}

function tints(oc, opts = {}) {
  const { softL = 0.94, hoverD = 0.06, activeD = 0.11 } = opts;
  return {
    base: oc,
    hover: withLightness(oc, oc.L - hoverD),
    active: withLightness(oc, oc.L - activeD),
    soft: gamutMap({ L: softL, C: Math.min(oc.C, 0.06), H: oc.H }),
    foreground: fg(oc),
  };
}

function darkTints(oc, opts = {}) {
  const { softL = 0.26, hoverD = 0.06, activeD = 0.11 } = opts;
  return {
    base: oc,
    hover: withLightness(oc, oc.L + hoverD),
    active: withLightness(oc, oc.L + activeD),
    soft: gamutMap({ L: softL, C: Math.min(oc.C, 0.06), H: oc.H }),
    foreground: fg(oc),
  };
}

function generateSemanticLight(core) {
  const { Primary, Accent, Neutral, Contrast } = core;
  const p = tints(Primary, { softL: 0.94 });
  const a = tints(Accent, { softL: 0.94 });
  const n = tints(Neutral, { softL: 0.96 });
  const c = tints(Contrast, { softL: 0.94 });
  return {
    primary: p.base, primaryHover: p.hover, primaryActive: p.active,
    primarySoft: p.soft, primaryForeground: p.foreground,
    accent: a.base, accentHover: a.hover, accentActive: a.active,
    accentSoft: a.soft, accentForeground: a.foreground,
    neutral: n.base, neutralHover: n.hover, neutralActive: n.active,
    neutralSoft: n.soft, neutralMuted: withLightness(Neutral, 0.82),
    neutralBorder: withLightness(Neutral, 0.88), neutralBackground: withLightness(Neutral, 0.98),
    neutralForeground: withLightness(Neutral, 0.22),
    contrast: c.base, contrastHover: c.hover, contrastActive: c.active,
    contrastForeground: c.foreground,
    success: gamutMap({ L: 0.62, C: 0.16, H: 145 }),
    successForeground: fg(gamutMap({ L: 0.62, C: 0.16, H: 145 })),
    successSoft: gamutMap({ L: 0.94, C: 0.04, H: 145 }),
    warning: gamutMap({ L: 0.72, C: 0.16, H: 80 }),
    warningForeground: fg(gamutMap({ L: 0.72, C: 0.16, H: 80 })),
    warningSoft: gamutMap({ L: 0.95, C: 0.05, H: 80 }),
    error: gamutMap({ L: 0.58, C: 0.2, H: 25 }),
    errorForeground: fg(gamutMap({ L: 0.58, C: 0.2, H: 25 })),
    errorSoft: gamutMap({ L: 0.95, C: 0.04, H: 25 }),
    info: gamutMap({ L: 0.62, C: 0.13, H: 240 }),
    infoForeground: fg(gamutMap({ L: 0.62, C: 0.13, H: 240 })),
    infoSoft: gamutMap({ L: 0.95, C: 0.04, H: 240 }),
  };
}

function generateSemanticDark(core) {
  const { Primary, Accent, Neutral, Contrast } = core;
  const p = darkTints(Primary, { softL: 0.28 });
  const a = darkTints(Accent, { softL: 0.28 });
  const n = darkTints(Neutral, { softL: 0.22 });
  const c = darkTints(Contrast, { softL: 0.28 });
  return {
    primary: p.base, primaryHover: p.hover, primaryActive: p.active,
    primarySoft: p.soft, primaryForeground: p.foreground,
    accent: a.base, accentHover: a.hover, accentActive: a.active,
    accentSoft: a.soft, accentForeground: a.foreground,
    neutral: n.base, neutralHover: n.hover, neutralActive: n.active,
    neutralSoft: n.soft, neutralMuted: withLightness(Neutral, 0.52),
    neutralBorder: withLightness(Neutral, 0.34), neutralBackground: withLightness(Neutral, 0.18),
    neutralForeground: withLightness(Neutral, 0.86),
    contrast: c.base, contrastHover: c.hover, contrastActive: c.active,
    contrastForeground: c.foreground,
    success: gamutMap({ L: 0.7, C: 0.16, H: 145 }),
    successForeground: fg(gamutMap({ L: 0.7, C: 0.16, H: 145 })),
    successSoft: gamutMap({ L: 0.28, C: 0.04, H: 145 }),
    warning: gamutMap({ L: 0.78, C: 0.15, H: 80 }),
    warningForeground: fg(gamutMap({ L: 0.78, C: 0.15, H: 80 })),
    warningSoft: gamutMap({ L: 0.28, C: 0.04, H: 80 }),
    error: gamutMap({ L: 0.66, C: 0.18, H: 25 }),
    errorForeground: fg(gamutMap({ L: 0.66, C: 0.18, H: 25 })),
    errorSoft: gamutMap({ L: 0.28, C: 0.04, H: 25 }),
    info: gamutMap({ L: 0.7, C: 0.12, H: 240 }),
    infoForeground: fg(gamutMap({ L: 0.7, C: 0.12, H: 240 })),
    infoSoft: gamutMap({ L: 0.28, C: 0.04, H: 240 }),
  };
}

function adjustForDark(oc) {
  const L = Math.min(oc.L + (0.7 - oc.L) * 0.45, 0.78);
  return gamutMap({ ...oc, L });
}

function generateThemes(core) {
  const light = buildSurfaceSet(generateSemanticLight(core), 'light');
  const darkCore = {
    Primary: adjustForDark(core.Primary),
    Accent: adjustForDark(core.Accent),
    Neutral: { ...core.Neutral },
    Contrast: adjustForDark(core.Contrast),
  };
  const dark = buildSurfaceSet(generateSemanticDark(darkCore), 'dark');
  return { light, dark };
}

function buildSurfaceSet(sem, mode) {
  const isLight = mode === 'light';
  const background = isLight ? withLightness(sem.neutral, 0.985) : withLightness(sem.neutral, 0.16);
  const surface = isLight ? withLightness(sem.neutral, 0.995) : withLightness(sem.neutral, 0.2);
  const surfaceElevated = isLight ? withLightness(sem.neutral, 1.0) : withLightness(sem.neutral, 0.245);
  const surfaceHover = isLight ? withLightness(sem.neutral, 0.97) : withLightness(sem.neutral, 0.23);
  const surfaceActive = isLight ? withLightness(sem.neutral, 0.95) : withLightness(sem.neutral, 0.26);
  const text = isLight ? withLightness(sem.neutral, 0.2) : withLightness(sem.neutral, 0.95);
  const textMuted = isLight ? withLightness(sem.neutral, 0.42) : withLightness(sem.neutral, 0.68);
  const textSubtle = isLight ? withLightness(sem.neutral, 0.55) : withLightness(sem.neutral, 0.55);
  const textDisabled = isLight ? withLightness(sem.neutral, 0.7) : withLightness(sem.neutral, 0.42);
  const border = isLight ? withLightness(sem.neutral, 0.88) : withLightness(sem.neutral, 0.36);
  const borderSubtle = isLight ? withLightness(sem.neutral, 0.92) : withLightness(sem.neutral, 0.28);
  const borderStrong = isLight ? withLightness(sem.neutral, 0.8) : withLightness(sem.neutral, 0.44);
  return {
    background, surface, surfaceElevated, surfaceHover, surfaceActive,
    text, textMuted, textSubtle, textDisabled,
    border, borderSubtle, borderStrong,
    ...sem,
  };
}

/* === theme.js === */






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

function buildTheme(primaryInput, fontConfig = {}, styleId = 'default') {
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

function generateCSS(theme, fontConfig = {}) {
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

/* === components.js === */
const COMPONENTS = `
*,*::before,*::after{box-sizing:border-box}
html{font-size:16px;-webkit-text-size-adjust:100%}
body{margin:0;background:#fefefe;color:var(--text);font-family:var(--font-family);font-size:var(--font-size-md);line-height:var(--line-height-normal);letter-spacing:var(--letter-spacing-normal);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;transition:background .25s ease,color .25s ease}
a{color:var(--primary);text-decoration:none;transition:color .15s ease}
a:hover{color:var(--primary-hover);text-decoration:underline;text-underline-offset:2px}
a:focus-visible{outline:2px solid var(--primary);outline-offset:2px;border-radius:var(--radius-sm)}
p{margin:0 0 var(--space-4)}
p:last-child{margin-bottom:0}
small{font-size:var(--font-size-sm);color:var(--text-muted)}
strong{font-weight:var(--font-weight-semibold)}
em{font-style:italic}
h1,h2,h3,h4,h5,h6{font-family:var(--font-family-heading);font-weight:var(--font-weight-bold);letter-spacing:var(--letter-spacing-tight);line-height:var(--line-height-tight);text-wrap:balance}
h1{font-size:var(--font-size-4xl);margin:0 0 var(--space-5)}
h2{font-size:var(--font-size-3xl);margin:0 0 var(--space-5)}
h3{font-size:var(--font-size-2xl);font-weight:var(--font-weight-semibold);margin:0 0 var(--space-4)}
h4{font-size:var(--font-size-xl);font-weight:var(--font-weight-semibold);margin:0 0 var(--space-3)}
h5{font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold);margin:0 0 var(--space-2)}
h6{font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);color:var(--text-muted);margin:0 0 var(--space-2);letter-spacing:var(--letter-spacing-wide);text-transform:uppercase}
hr{border:none;border-top:1px solid var(--border-subtle);margin:var(--space-6) 0}
blockquote{margin:0 0 var(--space-4);padding:var(--space-4) var(--space-6);border-left:3px solid var(--primary);background:var(--surface);border-radius:0 var(--radius-lg) var(--radius-lg) 0;color:var(--text-muted);font-style:italic}
blockquote p{margin:0}
code{font-family:var(--font-family-mono);font-size:0.85em;background:var(--surface-active);padding:0.15em 0.4em;border-radius:var(--radius-sm);color:var(--accent);font-weight:500}
pre{font-family:var(--font-family-mono);background:var(--surface);border:1px solid transparent;border-radius:var(--radius-lg);padding:var(--space-4);overflow-x:auto;margin:0 0 var(--space-4);line-height:var(--line-height-normal);box-shadow:var(--shadow-sm)}
pre code{background:none;padding:0;color:var(--text);font-size:var(--font-size-sm);font-weight:400}
mark{background:color-mix(in srgb,var(--warning) 25%,transparent);color:var(--text);padding:0.1em 0.35em;border-radius:var(--radius-sm);font-weight:500}
kbd{background:var(--surface-elevated);border:1px solid transparent;border-bottom-width:2px;border-radius:var(--radius-sm);padding:0.15em 0.4em;font-family:var(--font-family-mono);font-size:0.85em;color:var(--text);box-shadow:var(--shadow-xs)}
q{font-style:italic;color:var(--text-muted)}
cite{font-style:italic;color:var(--text-muted);font-size:var(--font-size-sm)}
::selection{background:var(--primary);color:var(--primary-foreground)}
[data-theme="dark"] ::selection{background:color-mix(in srgb,var(--primary) 60%,transparent);color:var(--primary-foreground)}
ul li::marker{color:var(--accent)}
ol li::marker{color:var(--primary);font-weight:var(--font-weight-bold)}
figure{margin:0 0 var(--space-4);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-sm)}
figcaption{padding:var(--space-3);font-size:var(--font-size-sm);color:var(--text-muted);text-align:center;background:var(--surface)}
img{max-width:100%;height:auto;border-radius:var(--radius-md)}
input,textarea,select,button{font:inherit;color:inherit}
label{display:inline-block;margin-bottom:var(--space-2);font-weight:var(--font-weight-medium);font-size:var(--font-size-sm);color:var(--text)}
input[type="text"],input[type="email"],input[type="password"],input[type="number"],input[type="search"],input[type="url"],input[type="tel"],input[type="date"],textarea,select{display:block;width:100%;padding:0.625rem var(--space-3);background:var(--surface);border:1px solid transparent;border-radius:var(--radius-md);color:var(--text);font-size:var(--font-size-sm);line-height:1.4;box-shadow:var(--shadow-xs);transition:border-color .18s ease,box-shadow .18s ease,background .18s ease}
input::placeholder,textarea::placeholder{color:var(--text-subtle);opacity:0;transition:opacity .15s ease}
input:focus::placeholder,textarea:focus::placeholder{opacity:1}
.field input:not(:placeholder-shown)::placeholder,.field textarea:not(:placeholder-shown)::placeholder{opacity:0}
input:hover,textarea:hover,select:hover{box-shadow:var(--shadow-sm)}
input:focus,textarea:focus,select:focus{border-color:var(--primary);outline:none;box-shadow:var(--shadow-focus),var(--shadow-sm)}
input:focus-visible,textarea:focus-visible,select:focus-visible{border-color:var(--primary)}
input:disabled,textarea:disabled,select:disabled{opacity:.5;cursor:not-allowed;background:var(--surface-active)}
input:invalid{border-color:var(--error)}
input:required{box-shadow:none}
.field{position:relative;display:flex;flex-direction:column;align-items:stretch;flex-wrap:nowrap;gap:0;width:100%;margin-bottom:var(--space-3);border-radius:var(--radius-md);transition:background .18s ease,box-shadow .18s ease}
.field-label{position:absolute;left:var(--space-3);top:50%;transform:translateY(-50%);color:var(--text-subtle);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);pointer-events:none;transition:all .18s ease;background:transparent;padding:0 var(--space-1);z-index:1}
.field-label::before{content:"";position:absolute;inset:0;background:var(--surface);z-index:-1;border-radius:var(--radius-sm)}
textarea~.field-label{top:var(--space-3);transform:none}
.field input:focus~.field-label,.field input:not(:placeholder-shown)~.field-label,.field textarea:focus~.field-label,.field textarea:not(:placeholder-shown)~.field-label,.field select~.field-label{top:0;transform:translateY(-50%) scale(.85);left:var(--space-2);color:var(--primary);font-weight:var(--font-weight-semibold)}
.field:has(select) .field-label{top:0;transform:translateY(-50%) scale(.85);left:var(--space-2);color:var(--text-subtle);font-weight:var(--font-weight-semibold)}
.field:has(select:focus) .field-label{color:var(--primary)}
.field input:focus~.field-label,.field textarea:focus~.field-label{color:var(--primary)}
.field input,.field textarea,.field select{border-color:transparent}
.field input::placeholder,.field textarea::placeholder{color:var(--text-subtle)}
.field-error{display:none;position:absolute;left:0;bottom:calc(-1.25rem);font-size:var(--font-size-xs);color:var(--error);font-weight:var(--font-weight-medium);padding:0 var(--space-2);pointer-events:none}
.field:has(input:user-invalid),.field:has(textarea:user-invalid),.field:has(select:user-invalid){background:transparent}
.field:has(input:user-invalid) input,.field:has(textarea:user-invalid) textarea,.field:has(select:user-invalid) select{border-color:var(--error)}
.field:has(input:user-invalid) .field-label,.field:has(textarea:user-invalid) .field-label,.field:has(select:user-invalid) .field-label{color:var(--error)}
.field:has(input:user-invalid) .field-error,.field:has(textarea:user-invalid) .field-error,.field:has(select:user-invalid) .field-error{display:flex;align-items:center;gap:var(--space-1)}
.field:has(input:user-valid),.field:has(textarea:user-valid),.field:has(select:user-valid){background:transparent}
.field:has(input:user-valid) input,.field:has(textarea:user-valid) textarea,.field:has(select:user-valid) select{border-color:var(--success)}
.field:has(input:user-valid) .field-label,.field:has(textarea:user-valid) .field-label,.field:has(select:user-valid) .field-label{color:var(--success)}
.field:has(input:focus) .field-label::before,.field:has(input:not(:placeholder-shown)) .field-label::before,.field:has(textarea:focus) .field-label::before,.field:has(textarea:not(:placeholder-shown)) .field-label::before{background:var(--surface)}
input:user-invalid,textarea:user-invalid,select:user-invalid{border-color:var(--error);box-shadow:0 0 0 3px color-mix(in srgb,var(--error) 20%,transparent),var(--shadow-sm)}
input:user-valid,textarea:user-valid,select:user-valid{border-color:var(--success)}
label:has(+ input[required])::after,label:has(+ textarea[required])::after,label:has(+ select[required])::after{content:" *";color:var(--error);font-weight:var(--font-weight-semibold)}
.field:has(input:focus) label,.field:has(textarea:focus) label,.field:has(select:focus) label{color:var(--primary)}
.field:has(input:user-invalid) label{color:var(--error)}
.form-group:has(input:disabled){opacity:.6}
.form-group:has(input[readonly]) input{background:var(--surface-active)}
input:indeterminate{accent-color:var(--accent)}
textarea{min-height:6rem;resize:vertical;padding-top:0.625rem}
select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M3 4.5L6 7.5L9 4.5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right var(--space-3) center;padding-right:var(--space-8)}
optgroup{background:var(--surface);color:var(--text-muted);font-weight:var(--font-weight-semibold)}
option{background:var(--surface);color:var(--text);padding:var(--space-1) var(--space-2)}
option:checked{background:var(--primary);color:var(--primary-foreground)}
fieldset{border:1px solid transparent;border-radius:var(--radius-lg);padding:var(--space-4) var(--space-5);margin:0 0 var(--space-4);background:var(--surface);box-shadow:var(--shadow-xs)}
legend{font-family:var(--font-family-heading);font-weight:var(--font-weight-semibold);font-size:var(--font-size-sm);color:var(--text);padding:0 var(--space-2);letter-spacing:var(--letter-spacing-tight)}
input[type="checkbox"],input[type="radio"]{position:absolute;opacity:0;width:0;height:0;margin:0}
.form-check{display:inline-flex;align-items:center;gap:var(--space-2);cursor:pointer;font-size:var(--font-size-sm);color:var(--text);user-select:none}
.form-check input[type="checkbox"],.form-check input[type="radio"]{position:absolute;opacity:0;width:0;height:0}
.form-check-box{display:inline-flex;align-items:center;justify-content:center;width:1.25rem;height:1.25rem;border:2px solid var(--border-strong);border-radius:var(--radius-sm);background:var(--surface);flex-shrink:0;transition:background .18s ease,border-color .18s ease,box-shadow .18s ease;box-shadow:var(--shadow-xs)}
.form-check:hover .form-check-box{border-color:var(--primary);box-shadow:var(--shadow-sm)}
.form-check input:focus-visible+.form-check-box{outline:2px solid var(--primary);outline-offset:2px}
.form-check input:checked+.form-check-box{background:var(--primary);border-color:var(--primary);box-shadow:0 2px 8px color-mix(in oklch,var(--primary) 30%,transparent)}
.form-check input:checked+.form-check-box::after{content:"";display:block;width:0.4rem;height:0.7rem;border:solid var(--primary-foreground);border-width:0 2px 2px 0;transform:rotate(45deg) translate(-1px,-1px)}
.form-check input:disabled+.form-check-box{opacity:.4;cursor:not-allowed}
.form-check input:disabled~.form-check-label{opacity:.4;cursor:not-allowed}
.form-check-label{font-weight:var(--font-weight-medium)}
.form-radio .form-check-box{border-radius:var(--radius-full)}
.form-radio input:checked+.form-check-box::after{content:"";display:block;width:0.5rem;height:0.5rem;border-radius:var(--radius-full);background:var(--primary-foreground);border:none;transform:translate(0,0)}
input[type="range"]{width:100%;accent-color:var(--primary);cursor:pointer;height:1.5rem;outline:none;-webkit-appearance:none;appearance:none;background:transparent}
input[type="range"]::-webkit-slider-runnable-track{height:0.375rem;background:var(--surface-active);border-radius:var(--radius-full)}
input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:1rem;height:1rem;border-radius:var(--radius-full);background:var(--primary);margin-top:-0.3125rem;box-shadow:0 1px 4px color-mix(in oklch,var(--primary) 40%,transparent);cursor:pointer}
input[type="range"]::-moz-range-track{height:0.375rem;background:var(--surface-active);border-radius:var(--radius-full)}
input[type="range"]::-moz-range-thumb{width:1rem;height:1rem;border:none;border-radius:var(--radius-full);background:var(--primary);box-shadow:0 1px 4px color-mix(in oklch,var(--primary) 40%,transparent);cursor:pointer}
progress{width:100%;height:0.5rem;border:none;border-radius:var(--radius-full);overflow:hidden;accent-color:var(--primary);background:var(--surface-active)}
progress::-webkit-progress-bar{background:var(--surface-active);border-radius:var(--radius-full)}
progress::-webkit-progress-value{background:var(--primary);border-radius:var(--radius-full);transition:width .3s ease}
progress::-moz-progress-bar{background:var(--primary);border-radius:var(--radius-full)}
meter{width:100%;height:0.5rem;border:none;border-radius:var(--radius-full);overflow:hidden;accent-color:var(--accent);background:var(--surface-active)}
meter::-webkit-meter-bar{background:var(--surface-active);border-radius:var(--radius-full)}
meter::-webkit-meter-optimum-value{background:var(--success);border-radius:var(--radius-full)}
meter::-webkit-meter-suboptimum-value{background:var(--warning);border-radius:var(--radius-full)}
meter::-webkit-meter-even-less-good-value{background:var(--error);border-radius:var(--radius-full)}
output{display:inline-block;color:var(--primary);font-weight:var(--font-weight-semibold);font-family:var(--font-family-mono);font-size:var(--font-size-sm);padding:0 var(--space-1)}
input[type="file"]{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
input[type="file"]::file-selector-button{background:var(--primary);color:var(--primary-foreground);border:0;padding:var(--space-1) var(--space-3);border-radius:var(--radius-md);font-size:var(--font-size-xs);font-weight:var(--font-weight-semibold);cursor:pointer;margin-right:var(--space-2);transition:background .18s ease}
input[type="file"]::file-selector-button:hover{background:var(--primary-hover)}
.file-upload{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-2);padding:var(--space-6);background:var(--surface);border:2px dashed var(--border-strong);border-radius:var(--radius-lg);color:var(--text-muted);font-size:var(--font-size-sm);text-align:center;cursor:pointer;transition:border-color .18s ease,background .18s ease,box-shadow .18s ease;box-shadow:var(--shadow-xs)}
.file-upload:hover{border-color:var(--primary);background:var(--surface-hover);box-shadow:var(--shadow-sm)}
.file-upload:has(input[type="file"]:focus-visible){outline:2px solid var(--primary);outline-offset:2px}
.file-upload.dragover{border-color:var(--primary);background:var(--primary-soft);box-shadow:var(--shadow-md)}
.file-upload-icon{display:flex;align-items:center;justify-content:center;width:2.75rem;height:2.75rem;border-radius:var(--radius-full);background:var(--primary-soft);color:var(--primary);flex-shrink:0;transition:background .18s ease,color .18s ease,transform .18s ease}
.file-upload:hover .file-upload-icon{background:var(--primary);color:var(--primary-foreground);transform:scale(1.05)}
.file-upload-icon svg{width:1.25rem;height:1.25rem}
.file-upload-text{font-weight:var(--font-weight-medium);color:var(--text)}
.file-upload-hint{font-size:var(--font-size-xs);color:var(--text-subtle)}
.file-upload-name{display:inline-flex;align-items:center;gap:var(--space-2);padding:var(--space-1) var(--space-3);background:var(--surface-active);border-radius:var(--radius-full);font-size:var(--font-size-xs);color:var(--text);font-weight:var(--font-weight-medium);margin-top:var(--space-1)}
details{border:1px solid transparent;border-radius:var(--radius-lg);background:var(--surface);box-shadow:var(--shadow-xs);margin-bottom:var(--space-3);overflow:hidden;transition:border-color .18s ease,box-shadow .18s ease}
details:hover{box-shadow:var(--shadow-sm)}
details[open]{box-shadow:var(--shadow-sm),0 0 0 1px color-mix(in srgb,var(--primary) 30%,transparent)}
summary{display:flex;align-items:center;justify-content:space-between;padding:var(--space-3) var(--space-4);font-family:var(--font-family-heading);font-weight:var(--font-weight-semibold);font-size:var(--font-size-sm);color:var(--text);cursor:pointer;list-style:none;letter-spacing:var(--letter-spacing-tight);user-select:none}
summary::-webkit-details-marker{display:none}
summary::after{content:"▾";color:var(--text-muted);font-size:var(--font-size-xs);transition:transform .2s ease}
details[open] summary{color:var(--primary);border-bottom:1px solid var(--border-subtle)}
details[open] summary::after{transform:rotate(180deg)}
details summary+*{padding:var(--space-4);color:var(--text-muted);font-size:var(--font-size-sm)}
dialog{background:var(--surface);color:var(--text);border:1px solid transparent;border-radius:var(--radius-xl);box-shadow:var(--shadow-2xl);padding:0;max-width:32rem;width:90vw;animation:scale-in .2s ease}
dialog::backdrop{background:color-mix(in srgb,var(--background) 65%,transparent);backdrop-filter:blur(6px)}
dialog[open]{display:flex;flex-direction:column}
.section:target{scroll-margin-top:5rem}
.card-body:empty,.alert:empty,.toast:empty{display:none}
.list-bordered .list-item{border-bottom:1px solid var(--border-subtle)}
.list-bordered .list-item:last-of-type{border-bottom:0}
.card-actions:only-child{justify-content:flex-end}
button{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);padding:var(--space-2) var(--space-4);border:1px solid transparent;border-radius:var(--radius-md);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);cursor:pointer;transition:background .18s ease,box-shadow .18s ease,opacity .18s ease,transform .1s ease;text-align:center;line-height:1.4}
button:hover{transform:translateY(-1px)}
button:active{transform:translateY(0)}
button:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
button:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);padding:var(--space-2) var(--space-4);border:1px solid transparent;border-radius:var(--radius-md);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);cursor:pointer;transition:background .18s ease,box-shadow .18s ease,transform .1s ease;white-space:nowrap;text-decoration:none;line-height:1.4}
.btn:hover{transform:translateY(-1px)}
.btn:active{transform:translateY(0)}
.btn:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
.btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btn-primary{background:var(--primary);color:var(--primary-foreground);box-shadow:0 1px 2px color-mix(in oklch,var(--primary) 28%,transparent),0 1px 1px color-mix(in oklch,var(--primary) 18%,transparent)}
.btn-primary:hover{background:var(--primary-hover);box-shadow:0 6px 16px color-mix(in oklch,var(--primary) 32%,transparent),0 3px 8px color-mix(in oklch,var(--primary) 20%,transparent),0 1px 2px color-mix(in oklch,var(--primary) 15%,transparent)}
.btn-primary:active{background:var(--primary-active)}
.btn-secondary{background:var(--neutral);color:var(--neutral-foreground)}
.btn-secondary:hover{background:var(--neutral-hover)}
.btn-secondary:active{background:var(--neutral-active)}
.btn-accent{background:var(--accent);color:var(--accent-foreground);box-shadow:0 1px 2px color-mix(in oklch,var(--accent) 28%,transparent),0 1px 1px color-mix(in oklch,var(--accent) 18%,transparent)}
.btn-accent:hover{background:var(--accent-hover);box-shadow:0 6px 16px color-mix(in oklch,var(--accent) 32%,transparent),0 3px 8px color-mix(in oklch,var(--accent) 20%,transparent),0 1px 2px color-mix(in oklch,var(--accent) 15%,transparent)}
.btn-accent:active{background:var(--accent-active)}
.btn-contrast{background:var(--contrast);color:var(--contrast-foreground)}
.btn-contrast:hover{background:var(--contrast-hover)}
.btn-contrast:active{background:var(--contrast-active)}
.btn-outline{background:transparent;color:var(--primary);border-color:var(--border);box-shadow:var(--shadow-xs)}
.btn-outline:hover{background:var(--primary-soft);color:var(--primary);border-color:var(--primary);box-shadow:var(--shadow-sm)}
.btn-outline:active{background:var(--primary-active)}
.btn-ghost{background:transparent;color:var(--text)}
.btn-ghost:hover{background:var(--surface-hover)}
.btn-ghost:active{background:var(--surface-active)}
.btn-danger{background:var(--error);color:var(--error-foreground);box-shadow:0 1px 2px color-mix(in oklch,var(--error) 28%,transparent),0 1px 1px color-mix(in oklch,var(--error) 18%,transparent)}
.btn-danger:hover{background:var(--error);filter:brightness(1.12);box-shadow:0 6px 16px color-mix(in oklch,var(--error) 32%,transparent),0 3px 8px color-mix(in oklch,var(--error) 20%,transparent),0 1px 2px color-mix(in oklch,var(--error) 15%,transparent)}
.btn-success{background:var(--success);color:var(--success-foreground);box-shadow:0 1px 2px color-mix(in oklch,var(--success) 28%,transparent),0 1px 1px color-mix(in oklch,var(--success) 18%,transparent)}
.btn-success:hover{background:var(--success);filter:brightness(1.12);box-shadow:0 6px 16px color-mix(in oklch,var(--success) 32%,transparent),0 3px 8px color-mix(in oklch,var(--success) 20%,transparent),0 1px 2px color-mix(in oklch,var(--success) 15%,transparent)}
.btn-warning{background:var(--warning);color:var(--warning-foreground);box-shadow:0 1px 2px color-mix(in oklch,var(--warning) 28%,transparent),0 1px 1px color-mix(in oklch,var(--warning) 18%,transparent)}
.btn-warning:hover{background:var(--warning);filter:brightness(1.12);box-shadow:0 6px 16px color-mix(in oklch,var(--warning) 32%,transparent),0 3px 8px color-mix(in oklch,var(--warning) 20%,transparent),0 1px 2px color-mix(in oklch,var(--warning) 15%,transparent)}
.btn-sm{padding:var(--space-1) var(--space-3);font-size:var(--font-size-xs);border-radius:var(--radius-sm)}
.btn-md{padding:var(--space-2) var(--space-4);font-size:var(--font-size-sm);border-radius:var(--radius-md)}
.btn-lg{padding:var(--space-3) var(--space-6);font-size:var(--font-size-lg);border-radius:var(--radius-lg)}
.btn[aria-busy="true"]{pointer-events:none;opacity:.7}
.btn[aria-busy="true"]::after{content:"";display:inline-block;width:0.85rem;height:0.85rem;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:spin .6s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.card{background:#fefefe;border:1px solid transparent;border-radius:var(--radius-lg);padding:var(--space-5);box-shadow:var(--shadow-sm);transition:box-shadow .25s ease,border-color .25s ease,transform .25s ease}
.card-bordered{border-color:var(--border)}
.card:hover{box-shadow:var(--shadow-lg);transform:translateY(-2px)}
.card-bordered:hover{border-color:var(--border-strong)}
.card-header{margin-bottom:var(--space-4);padding-bottom:var(--space-4);border-bottom:1px solid var(--border-subtle)}
.card-body{margin-bottom:var(--space-4)}
.card-footer{margin-top:var(--space-4);padding-top:var(--space-4);border-top:1px solid var(--border-subtle)}
.card-title{font-family:var(--font-family-heading);font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold);margin:0 0 var(--space-1);color:var(--text);letter-spacing:var(--letter-spacing-tight)}
.card-subtitle{font-size:var(--font-size-sm);color:var(--text-muted);margin:0 0 var(--space-2)}
.card-content{color:var(--text-muted);font-size:var(--font-size-sm);line-height:var(--line-height-normal)}
.card-actions{display:flex;gap:var(--space-2);margin-top:var(--space-4)}
.nav,.navbar{display:flex;align-items:center;gap:var(--space-4);background:var(--surface);border-bottom:1px solid transparent;padding:var(--space-3) var(--space-6);backdrop-filter:saturate(1.2);box-shadow:var(--shadow-sm)}
.nav-header,.nav-brand{font-family:var(--font-family-heading);font-size:var(--font-size-lg);font-weight:var(--font-weight-bold);color:var(--text);letter-spacing:var(--letter-spacing-tight)}
.nav-menu{display:flex;align-items:center;gap:var(--space-1);margin:0;padding:0;list-style:none}
.nav-item{display:inline-flex}
.nav-link{padding:var(--space-2) var(--space-3);color:var(--text-muted);border-radius:var(--radius-md);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);text-decoration:none;transition:background .18s ease,color .18s ease}
.nav-link:hover{background:var(--surface-hover);color:var(--text)}
.nav-link.active{color:var(--primary);font-weight:var(--font-weight-semibold)}
.nav-link:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
.nav-toggle{display:none;background:transparent;border:none;color:var(--text);font-size:var(--font-size-lg);cursor:pointer;padding:var(--space-2);border-radius:var(--radius-md)}
.nav-actions{margin-left:auto;display:flex;align-items:center;gap:var(--space-2)}
.sidebar{display:flex;flex-direction:column;gap:var(--space-1);background:var(--surface);border:1px solid transparent;border-radius:var(--radius-lg);padding:var(--space-3);box-shadow:var(--shadow-sm)}
.sidebar-header{padding:var(--space-3);font-family:var(--font-family-heading);font-weight:var(--font-weight-semibold);color:var(--text);letter-spacing:var(--letter-spacing-tight)}
.sidebar-menu{display:flex;flex-direction:column;gap:var(--space-1);margin:0;padding:0;list-style:none}
.sidebar-item{display:block}
.sidebar-link{display:block;padding:var(--space-2) var(--space-3);color:var(--text-muted);border-radius:var(--radius-md);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);text-decoration:none;transition:background .18s ease,color .18s ease}
.sidebar-link:hover{background:var(--surface-hover);color:var(--text)}
.sidebar-link.active{background:var(--primary-soft);color:var(--primary);font-weight:var(--font-weight-semibold)}
.sidebar-link:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
ul,ol{margin:0 0 var(--space-4);padding-left:var(--space-5)}
li{margin-bottom:var(--space-1)}
.list{display:flex;flex-direction:column;gap:var(--space-1);margin:0;padding:0;list-style:none}
.list-item{padding:var(--space-3);border-radius:var(--radius-md)}
.list-item-title{font-weight:var(--font-weight-medium);font-size:var(--font-size-sm);color:var(--text)}
.list-item-description{font-size:var(--font-size-sm);color:var(--text-muted)}
.list-bordered .list-item{border:1px solid var(--border-subtle)}
.list-hover .list-item:hover{background:var(--surface-hover)}
.list-compact .list-item{padding:var(--space-1) var(--space-2)}
table{width:100%;border-collapse:collapse;font-size:var(--font-size-sm)}
thead{border-bottom:1px solid var(--border-subtle)}
th{text-align:left;padding:var(--space-3);font-weight:var(--font-weight-semibold);color:var(--text)}
td{padding:var(--space-3);border-bottom:1px solid var(--border-subtle);color:var(--text)}
tbody tr:last-child td{border-bottom:0}
tbody tr:hover{background:var(--surface-hover)}
tfoot{border-top:1px solid var(--border-subtle)}
.table{width:100%;border-collapse:collapse}
.table th,.table td{padding:var(--space-3)}
.table-striped tbody tr:nth-child(odd){background:var(--surface)}
.table-hover tbody tr:hover{background:var(--surface-hover)}
.table-bordered th,.table-bordered td{border:1px solid var(--border)}
.badge{display:inline-flex;align-items:center;padding:0.2em 0.65em;font-size:var(--font-size-xs);font-weight:var(--font-weight-semibold);border-radius:var(--radius-full);line-height:1.5;box-shadow:0 1px 2px rgba(0,0,0,0.05),inset 0 1px 0 rgba(255,255,255,0.15)}
.badge-primary{background:var(--primary-soft);color:var(--primary)}
.badge-secondary{background:var(--neutral-soft);color:var(--neutral-foreground)}
.badge-accent{background:var(--accent-soft);color:var(--accent)}
.badge-success{background:var(--success-soft);color:var(--success)}
.badge-warning{background:var(--warning-soft);color:var(--warning)}
.badge-danger{background:var(--error-soft);color:var(--error)}
.badge-neutral{background:var(--neutral-muted);color:var(--neutral-foreground)}
.tag{display:inline-flex;align-items:center;gap:var(--space-1);padding:0.2em 0.7em;font-size:var(--font-size-xs);border-radius:var(--radius-md);border:1px solid transparent;background:var(--surface);color:var(--text);box-shadow:var(--shadow-xs)}
.tag-primary{border-color:var(--primary);color:var(--primary)}
.tag-accent{border-color:var(--accent);color:var(--accent)}
.alert{display:flex;align-items:flex-start;gap:var(--space-3);padding:var(--space-3) var(--space-4);border-radius:var(--radius-md);border:1px solid var(--border-subtle);margin-bottom:var(--space-3);background:var(--surface);box-shadow:var(--shadow-xs);position:relative;transition:box-shadow .18s ease,transform .18s ease,border-color .18s ease}
.alert:hover{box-shadow:var(--shadow-sm);transform:translateY(-1px)}
.alert-icon{display:flex;align-items:center;justify-content:center;width:1.75rem;height:1.75rem;border-radius:var(--radius-sm);flex-shrink:0;margin-top:1px;transition:transform .18s ease}
.alert:hover .alert-icon{transform:scale(1.08)}
.alert-icon svg{width:.9rem;height:.9rem}
.alert-body{flex:1;min-width:0}
.alert-title{font-family:var(--font-family-heading);font-weight:var(--font-weight-semibold);margin:0 0 var(--space-1);letter-spacing:var(--letter-spacing-tight);font-size:var(--font-size-sm);color:var(--text)}
.alert-message{margin:0;color:var(--text-muted);font-size:var(--font-size-sm);line-height:var(--line-height-normal)}
.alert-close{flex-shrink:0;background:transparent;border:none;color:var(--text-subtle);cursor:pointer;font-size:var(--font-size-lg);line-height:1;padding:var(--space-1);border-radius:var(--radius-sm);transition:background .15s ease,color .15s ease}
.alert-close:hover{background:var(--surface-hover);color:var(--text)}
.alert-primary{background:color-mix(in srgb,var(--primary) 8%,var(--surface));border-color:color-mix(in srgb,var(--primary) 20%,var(--border-subtle))}
.alert-primary .alert-icon{background:color-mix(in srgb,var(--primary) 15%,transparent);color:var(--primary)}
.alert-info{background:color-mix(in srgb,var(--info) 8%,var(--surface));border-color:color-mix(in srgb,var(--info) 20%,var(--border-subtle))}
.alert-info .alert-icon{background:color-mix(in srgb,var(--info) 15%,transparent);color:var(--info)}
.alert-success{background:color-mix(in srgb,var(--success) 8%,var(--surface));border-color:color-mix(in srgb,var(--success) 20%,var(--border-subtle))}
.alert-success .alert-icon{background:color-mix(in srgb,var(--success) 15%,transparent);color:var(--success)}
.alert-warning{background:color-mix(in srgb,var(--warning) 8%,var(--surface));border-color:color-mix(in srgb,var(--warning) 20%,var(--border-subtle))}
.alert-warning .alert-icon{background:color-mix(in srgb,var(--warning) 15%,transparent);color:var(--warning)}
.alert-danger{background:color-mix(in srgb,var(--error) 8%,var(--surface));border-color:color-mix(in srgb,var(--error) 20%,var(--border-subtle))}
.alert-danger .alert-icon{background:color-mix(in srgb,var(--error) 15%,transparent);color:var(--error)}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:var(--space-4);z-index:1000;animation:fade-in .2s ease}
@keyframes fade-in{from{opacity:0}to{opacity:1}}
.modal-container{background:var(--surface);border:1px solid transparent;border-radius:var(--radius-xl);box-shadow:var(--shadow-2xl);max-width:32rem;width:100%;max-height:90vh;overflow-y:auto;animation:scale-in .2s ease}
@keyframes scale-in{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
.modal-header{display:flex;align-items:center;justify-content:space-between;padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--border-subtle)}
.modal-title{margin:0;font-family:var(--font-family-heading);font-size:var(--font-size-lg);font-weight:var(--font-weight-semibold);letter-spacing:var(--letter-spacing-tight)}
.modal-close{background:transparent;border:none;color:var(--text-muted);font-size:var(--font-size-xl);line-height:1;cursor:pointer;padding:0 var(--space-1)}
.modal-close:hover{color:var(--text)}
.modal-body{padding:var(--space-5)}
.modal-footer{display:flex;justify-content:flex-end;gap:var(--space-2);padding:var(--space-4) var(--space-5);border-top:1px solid var(--border-subtle)}
.dropdown{position:relative;display:inline-block}
.dropdown-trigger{display:inline-flex;align-items:center;gap:var(--space-2);padding:var(--space-2) var(--space-4);background:var(--surface);border:1px solid transparent;border-radius:var(--radius-md);color:var(--text);cursor:pointer;font-size:var(--font-size-sm);box-shadow:var(--shadow-xs);transition:box-shadow .18s ease}
.dropdown-trigger:hover{box-shadow:var(--shadow-sm)}
.dropdown-menu{position:absolute;top:100%;left:0;margin-top:var(--space-1);min-width:10rem;background:var(--surface-elevated);border:1px solid transparent;border-radius:var(--radius-lg);box-shadow:var(--shadow-xl);padding:var(--space-1);z-index:100;display:none;animation:scale-in .15s ease;transform-origin:top left}
.dropdown[data-open] .dropdown-menu{display:block}
.dropdown-item{display:block;width:100%;padding:var(--space-2) var(--space-3);color:var(--text);border:none;background:transparent;border-radius:var(--radius-sm);font-size:var(--font-size-sm);text-align:left;cursor:pointer}
.dropdown-item:hover{background:var(--surface-hover)}
.dropdown-item:focus-visible{outline:2px solid var(--primary);outline-offset:2px}
.dropdown-item.active{background:var(--primary-soft);color:var(--primary)}
.dropdown-item.disabled{opacity:.5;pointer-events:none}
.dropdown-divider{height:1px;background:var(--border-subtle);margin:var(--space-1) 0}
.tooltip{position:relative;display:inline-block}
.tooltip-content{position:absolute;bottom:calc(100% + var(--space-1));left:50%;transform:translateX(-50%);background:var(--contrast);color:var(--contrast-foreground);padding:var(--space-1) var(--space-2);border-radius:var(--radius-sm);font-size:var(--font-size-xs);white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .15s;z-index:200}
.tooltip:hover .tooltip-content{opacity:1}
.tabs{border-bottom:1px solid var(--border-subtle)}
.tab-list{display:flex;gap:var(--space-1);margin:0;padding:0;list-style:none}
.tab{padding:var(--space-2) var(--space-4);color:var(--text-muted);border:none;background:transparent;border-bottom:2px solid transparent;border-radius:0;font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);cursor:pointer;transition:color .18s ease,border-color .18s ease}
.tab:hover{color:var(--text)}
.tab.active{color:var(--primary);border-bottom-color:var(--primary);font-weight:var(--font-weight-semibold)}
.tab-panel{padding:var(--space-4) 0}
.pagination{display:flex;gap:var(--space-1);list-style:none;margin:0;padding:0}
.page-item{display:inline-block}
.page-link{display:inline-flex;align-items:center;justify-content:center;min-width:2rem;height:2rem;padding:0 var(--space-2);background:var(--surface);color:var(--text-muted);border:1px solid transparent;border-radius:var(--radius-md);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);text-decoration:none;box-shadow:var(--shadow-xs);transition:background .15s,box-shadow .15s,color .15s}
.page-link:hover{background:var(--surface-hover);color:var(--text);box-shadow:var(--shadow-sm)}
.page-item.active .page-link{background:var(--primary);color:var(--primary-foreground);box-shadow:0 2px 8px color-mix(in oklch,var(--primary) 30%,transparent)}
.page-item.disabled .page-link{opacity:.5;pointer-events:none}
.breadcrumb{display:flex;gap:var(--space-2);margin:0;padding:0;list-style:none;font-size:var(--font-size-sm)}
.breadcrumb-item{display:inline-flex;align-items:center;color:var(--text-muted)}
.breadcrumb-item a{color:var(--text-muted)}
.breadcrumb-item a:hover{color:var(--text)}
.breadcrumb-item.active{color:var(--text);font-weight:var(--font-weight-medium)}
.breadcrumb-separator{color:var(--text-subtle);margin:0 var(--space-1)}
.avatar{display:inline-flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;border-radius:var(--radius-full);background:var(--primary-soft);color:var(--primary);font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);overflow:hidden}
.avatar-sm{width:1.75rem;height:1.75rem;font-size:var(--font-size-xs)}
.avatar-md{width:2.5rem;height:2.5rem}
.avatar-lg{width:3.5rem;height:3.5rem;font-size:var(--font-size-lg)}
.avatar-group{display:inline-flex}
.avatar-group .avatar{margin-left:-0.5rem;border:2px solid var(--surface)}
.avatar-group .avatar:first-child{margin-left:0}
.progress{width:100%;height:0.5rem;background:var(--surface-active);border-radius:var(--radius-full);overflow:hidden;box-shadow:var(--shadow-inner)}
.progress-bar{height:100%;background:var(--primary);border-radius:var(--radius-full);transition:width .3s}
.spinner{display:inline-block;width:1.5rem;height:1.5rem;border:2px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin .7s linear infinite}
.loader{display:inline-block;width:2rem;height:2rem;border:3px solid var(--surface-active);border-top-color:var(--primary);border-radius:50%;animation:spin .8s linear infinite}
.skeleton{display:block;background:linear-gradient(90deg,var(--surface-active) 25%,var(--surface-hover) 37%,var(--surface-active) 63%);background-size:400% 100%;animation:shimmer 1.4s ease infinite;border-radius:var(--radius-md)}
@keyframes shimmer{0%{background-position:100% 50%}100%{background-position:0 50%}}
.toast-container{position:fixed;top:var(--space-4);right:var(--space-4);display:flex;flex-direction:column;gap:var(--space-2);z-index:1500}
.toast{display:flex;gap:var(--space-3);padding:var(--space-3) var(--space-4);background:var(--surface-elevated);border:1px solid transparent;border-radius:var(--radius-lg);box-shadow:var(--shadow-xl);min-width:18rem}
.toast-header{display:flex;align-items:center;justify-content:space-between;font-weight:var(--font-weight-semibold);font-size:var(--font-size-sm)}
.toast-body{font-size:var(--font-size-sm);color:var(--text-muted)}
.toast-close{background:transparent;border:none;color:var(--text-muted);cursor:pointer;font-size:var(--font-size-lg);line-height:1}
.toast-success{border-left:4px solid var(--success)}
.toast-warning{border-left:4px solid var(--warning)}
.toast-error{border-left:4px solid var(--error)}
.toast-info{border-left:4px solid var(--info)}
.accordion{border:1px solid transparent;border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-sm)}
.accordion-item{border-bottom:1px solid var(--border-subtle)}
.accordion-item:last-child{border-bottom:none}
.accordion-header{margin:0}
.accordion-trigger{display:flex;width:100%;align-items:center;justify-content:space-between;padding:var(--space-4);background:transparent;border:none;color:var(--text);font-family:var(--font-family-heading);font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);cursor:pointer;text-align:left;letter-spacing:var(--letter-spacing-tight);transition:background .18s ease}
.accordion-trigger:hover{background:var(--surface-hover)}
.accordion-content{padding:0 var(--space-4);max-height:0;overflow:hidden;transition:max-height .25s ease,padding .25s ease;color:var(--text-muted)}
.accordion-item[data-open="true"] .accordion-content{max-height:30rem;padding-bottom:var(--space-4)}
.accordion-item[data-open="true"] .accordion-trigger::after{transform:rotate(180deg)}
.accordion-trigger::after{content:"▾";transition:transform .25s;font-size:var(--font-size-sm);color:var(--text-muted)}
.chip{display:inline-flex;align-items:center;gap:var(--space-1);padding:var(--space-1) var(--space-3);border-radius:var(--radius-full);font-size:var(--font-size-xs);font-weight:var(--font-weight-semibold);background:var(--neutral-soft);color:var(--neutral-foreground);box-shadow:0 1px 2px rgba(0,0,0,0.05),inset 0 1px 0 rgba(255,255,255,0.10)}
.chip-primary{background:var(--primary-soft);color:var(--primary)}
.chip-accent{background:var(--accent-soft);color:var(--accent)}
.chip-success{background:var(--success-soft);color:var(--success)}
.chip-warning{background:var(--warning-soft);color:var(--warning)}
.chip-danger{background:var(--error-soft);color:var(--error)}
.chip-neutral{background:var(--neutral-muted);color:var(--neutral-foreground)}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
::-webkit-scrollbar{width:10px;height:10px}
::-webkit-scrollbar-track{background:var(--surface);border-radius:var(--radius-full)}
::-webkit-scrollbar-thumb{background:color-mix(in srgb,var(--primary) 50%,var(--border-strong));border-radius:var(--radius-full);border:2px solid var(--surface);transition:background .15s ease}
::-webkit-scrollbar-thumb:hover{background:var(--primary)}
::-webkit-scrollbar-thumb:active{background:var(--primary-active)}
::-webkit-scrollbar-corner{background:var(--surface)}
*{scrollbar-width:thin;scrollbar-color:color-mix(in srgb,var(--primary) 50%,var(--border-strong)) var(--surface)}
[data-theme="dark"] ::-webkit-scrollbar-track{background:var(--surface)}
[data-theme="dark"] ::-webkit-scrollbar-thumb{background:color-mix(in srgb,var(--primary) 45%,var(--border-strong));border-color:var(--surface)}
[data-theme="dark"] ::-webkit-scrollbar-thumb:hover{background:var(--primary)}
[data-theme="dark"] *{scrollbar-color:color-mix(in srgb,var(--primary) 45%,var(--border-strong)) var(--surface)}
[title]{position:relative}
[title]::after{content:attr(title);position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:var(--contrast);color:var(--contrast-foreground);padding:var(--space-1) var(--space-2);border-radius:var(--radius-sm);font-size:var(--font-size-xs);font-weight:var(--font-weight-medium);white-space:nowrap;pointer-events:none;opacity:0;z-index:999;box-shadow:var(--shadow-md);transition:opacity .15s ease,transform .15s ease}
[title]:hover::after{opacity:1;transform:translateX(-50%) translateY(-2px)}
[title]:focus-visible::after{opacity:1}
input[type="checkbox"]:indeterminate{accent-color:var(--accent)}
.form-control{display:block;width:100%;padding:var(--space-2) var(--space-3);background:var(--surface);border:1px solid transparent;border-radius:var(--radius-md);color:var(--text);font-size:var(--font-size-sm);line-height:var(--line-height-normal);box-shadow:var(--shadow-xs);transition:border-color .18s ease,box-shadow .18s ease}
.form-control:focus{border-color:var(--primary);outline:none;box-shadow:var(--shadow-focus),var(--shadow-sm)}
.form-control:user-invalid{border-color:var(--error)}
.form-control:user-valid{border-color:var(--success)}
.form-group{display:flex;flex-direction:column;gap:var(--space-2);margin-bottom:var(--space-4)}
.form-group label{margin-bottom:0}
.form-row{display:flex;gap:var(--space-3);flex-wrap:wrap}
.form-row>.form-group{flex:1;min-width:12rem}
.input-group{display:flex;align-items:stretch;gap:0}
.input-group .form-control{border-radius:0}
.input-group .form-control:first-child{border-top-left-radius:var(--radius-md);border-bottom-left-radius:var(--radius-md)}
.input-group .form-control:last-child{border-top-right-radius:var(--radius-md);border-bottom-right-radius:var(--radius-md)}
.input-group-text{display:flex;align-items:center;padding:0 var(--space-3);background:var(--surface-active);border:1px solid transparent;border-radius:var(--radius-md);color:var(--text-muted);font-size:var(--font-size-sm);font-weight:var(--font-weight-medium);white-space:nowrap}
.input-group-text:first-child{border-top-right-radius:0;border-bottom-right-radius:0}
.input-group-text:last-child{border-top-left-radius:0;border-bottom-left-radius:0}
[data-theme="dark"] progress::-webkit-progress-value{box-shadow:0 0 8px color-mix(in srgb,var(--primary) 50%,transparent)}
[data-theme="dark"] .form-check input:checked+.form-check-box{box-shadow:0 0 0 0 color-mix(in srgb,var(--primary) 30%,transparent),0 4px 16px -4px color-mix(in srgb,var(--primary) 50%,transparent)}
[data-theme="dark"] details[open]{box-shadow:var(--shadow-sm),0 0 16px -4px color-mix(in srgb,var(--primary) 20%,transparent)}
[data-theme="dark"] dialog{box-shadow:var(--shadow-2xl),0 0 60px -10px color-mix(in srgb,var(--primary) 10%,transparent)}
[data-theme="dark"] .btn-primary{box-shadow:0 0 0 0 color-mix(in srgb,var(--primary) 30%,transparent),var(--shadow-sm)}
[data-theme="dark"] .btn-primary:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--primary) 55%,transparent),var(--shadow-md)}
[data-theme="dark"] .btn-accent{box-shadow:0 0 0 0 color-mix(in srgb,var(--accent) 30%,transparent),var(--shadow-sm)}
[data-theme="dark"] .btn-accent:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--accent) 55%,transparent),var(--shadow-md)}
[data-theme="dark"] .btn-danger{box-shadow:0 0 0 0 color-mix(in srgb,var(--error) 30%,transparent),var(--shadow-sm)}
[data-theme="dark"] .btn-danger:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--error) 55%,transparent),var(--shadow-md)}
[data-theme="dark"] .btn-success{box-shadow:0 0 0 0 color-mix(in srgb,var(--success) 30%,transparent),var(--shadow-sm)}
[data-theme="dark"] .btn-success:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--success) 55%,transparent),var(--shadow-md)}
[data-theme="dark"] .btn-warning{box-shadow:0 0 0 0 color-mix(in srgb,var(--warning) 30%,transparent),var(--shadow-sm)}
[data-theme="dark"] .btn-warning:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--warning) 55%,transparent),var(--shadow-md)}
[data-theme="dark"] .btn-contrast{box-shadow:0 0 0 0 color-mix(in srgb,var(--contrast) 30%,transparent),var(--shadow-sm)}
[data-theme="dark"] .btn-contrast:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--contrast) 55%,transparent),var(--shadow-md)}
[data-theme="dark"] .btn-outline:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--primary) 40%,transparent),var(--shadow-sm)}
[data-theme="dark"] input:focus,[data-theme="dark"] textarea:focus,[data-theme="dark"] select:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--primary) 25%,transparent),0 0 20px -4px color-mix(in srgb,var(--primary) 40%,transparent),var(--shadow-sm)}
[data-theme="dark"] .card{background:var(--surface)}
[data-theme="dark"] body{background:var(--background)}
[data-theme="dark"] .card:hover{box-shadow:0 8px 30px -8px color-mix(in srgb,var(--primary) 12%,transparent),var(--shadow-lg)}
[data-theme="dark"] .card-bordered:hover{border-color:var(--primary)}
[data-theme="dark"] .form-check input:checked+.form-check-box{box-shadow:0 0 0 0 color-mix(in srgb,var(--primary) 30%,transparent),0 4px 16px -4px color-mix(in srgb,var(--primary) 50%,transparent)}
[data-theme="dark"] .badge{box-shadow:0 1px 2px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.1)}
[data-theme="dark"] .badge-primary{box-shadow:0 2px 12px -4px color-mix(in srgb,var(--primary) 45%,transparent),inset 0 1px 0 rgba(255,255,255,0.1)}
[data-theme="dark"] .badge-accent{box-shadow:0 2px 12px -4px color-mix(in srgb,var(--accent) 45%,transparent),inset 0 1px 0 rgba(255,255,255,0.1)}
[data-theme="dark"] .badge-success{box-shadow:0 2px 12px -4px color-mix(in srgb,var(--success) 45%,transparent),inset 0 1px 0 rgba(255,255,255,0.1)}
[data-theme="dark"] .badge-danger{box-shadow:0 2px 12px -4px color-mix(in srgb,var(--error) 45%,transparent),inset 0 1px 0 rgba(255,255,255,0.1)}
[data-theme="dark"] .chip{box-shadow:0 1px 2px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.08)}
[data-theme="dark"] .alert{box-shadow:var(--shadow-xs)}
[data-theme="dark"] .alert:hover{box-shadow:var(--shadow-sm),0 8px 24px -8px color-mix(in srgb,var(--primary) 12%,transparent)}
[data-theme="dark"] .alert-success:hover{box-shadow:var(--shadow-sm),0 8px 24px -8px color-mix(in srgb,var(--success) 15%,transparent)}
[data-theme="dark"] .alert-danger:hover{box-shadow:var(--shadow-sm),0 8px 24px -8px color-mix(in srgb,var(--error) 15%,transparent)}
[data-theme="dark"] .alert-warning:hover{box-shadow:var(--shadow-sm),0 8px 24px -8px color-mix(in srgb,var(--warning) 15%,transparent)}
[data-theme="dark"] .alert-info:hover{box-shadow:var(--shadow-sm),0 8px 24px -8px color-mix(in srgb,var(--info) 15%,transparent)}
[data-theme="dark"] .alert-primary:hover{box-shadow:var(--shadow-sm),0 8px 24px -8px color-mix(in srgb,var(--primary) 15%,transparent)}
[data-theme="dark"] .nav-link.active{text-shadow:0 0 20px color-mix(in srgb,var(--primary) 40%,transparent)}
[data-theme="dark"] .progress-bar{box-shadow:0 0 12px color-mix(in srgb,var(--primary) 50%,transparent)}
[data-theme="dark"] .page-item.active .page-link{box-shadow:0 4px 16px -4px color-mix(in srgb,var(--primary) 50%,transparent)}
[data-theme="dark"] .file-upload:hover{box-shadow:var(--shadow-sm),0 0 20px -4px color-mix(in srgb,var(--primary) 30%,transparent)}
[data-theme="dark"] .file-upload.dragover{box-shadow:var(--shadow-md),0 0 24px -4px color-mix(in srgb,var(--primary) 45%,transparent)}
[data-theme="dark"] .modal-container{box-shadow:var(--shadow-2xl),0 0 60px -10px color-mix(in srgb,var(--primary) 10%,transparent)}
.container{width:100%;max-width:72rem;margin-inline:auto;padding-inline:var(--space-4)}
.container-sm{max-width:40rem}
.container-md{max-width:56rem}
.container-lg{max-width:72rem}
.container-xl{max-width:90rem}
.container-fluid{max-width:100%}
.row{display:flex;flex-wrap:wrap;gap:var(--space-3);margin-bottom:var(--space-3)}
.col{flex:1 1 0%;min-width:0}
.col-auto{flex:0 0 auto;width:auto}
.col-1{flex:0 0 calc(100% / 12);max-width:calc(100% / 12)}
.col-2{flex:0 0 calc(100% / 6);max-width:calc(100% / 6)}
.col-3{flex:0 0 25%;max-width:25%}
.col-4{flex:0 0 calc(100% / 3);max-width:calc(100% / 3)}
.col-5{flex:0 0 calc(100% * 5 / 12);max-width:calc(100% * 5 / 12)}
.col-6{flex:0 0 50%;max-width:50%}
.col-7{flex:0 0 calc(100% * 7 / 12);max-width:calc(100% * 7 / 12)}
.col-8{flex:0 0 calc(100% * 2 / 3);max-width:calc(100% * 2 / 3)}
.col-9{flex:0 0 75%;max-width:75%}
.col-10{flex:0 0 calc(100% * 5 / 6);max-width:calc(100% * 5 / 6)}
.col-11{flex:0 0 calc(100% * 11 / 12);max-width:calc(100% * 11 / 12)}
.col-12{flex:0 0 100%;max-width:100%}
@media(min-width:576px){.col-sm-1{flex:0 0 calc(100% / 12);max-width:calc(100% / 12)}.col-sm-2{flex:0 0 calc(100% / 6);max-width:calc(100% / 6)}.col-sm-3{flex:0 0 25%;max-width:25%}.col-sm-4{flex:0 0 calc(100% / 3);max-width:calc(100% / 3)}.col-sm-5{flex:0 0 calc(100% * 5 / 12);max-width:calc(100% * 5 / 12)}.col-sm-6{flex:0 0 50%;max-width:50%}.col-sm-7{flex:0 0 calc(100% * 7 / 12);max-width:calc(100% * 7 / 12)}.col-sm-8{flex:0 0 calc(100% * 2 / 3);max-width:calc(100% * 2 / 3)}.col-sm-9{flex:0 0 75%;max-width:75%}.col-sm-10{flex:0 0 calc(100% * 5 / 6);max-width:calc(100% * 5 / 6)}.col-sm-11{flex:0 0 calc(100% * 11 / 12);max-width:calc(100% * 11 / 12)}.col-sm-12{flex:0 0 100%;max-width:100%}}
@media(min-width:768px){.col-md-1{flex:0 0 calc(100% / 12);max-width:calc(100% / 12)}.col-md-2{flex:0 0 calc(100% / 6);max-width:calc(100% / 6)}.col-md-3{flex:0 0 25%;max-width:25%}.col-md-4{flex:0 0 calc(100% / 3);max-width:calc(100% / 3)}.col-md-5{flex:0 0 calc(100% * 5 / 12);max-width:calc(100% * 5 / 12)}.col-md-6{flex:0 0 50%;max-width:50%}.col-md-7{flex:0 0 calc(100% * 7 / 12);max-width:calc(100% * 7 / 12)}.col-md-8{flex:0 0 calc(100% * 2 / 3);max-width:calc(100% * 2 / 3)}.col-md-9{flex:0 0 75%;max-width:75%}.col-md-10{flex:0 0 calc(100% * 5 / 6);max-width:calc(100% * 5 / 6)}.col-md-11{flex:0 0 calc(100% * 11 / 12);max-width:calc(100% * 11 / 12)}.col-md-12{flex:0 0 100%;max-width:100%}}
@media(min-width:992px){.col-lg-1{flex:0 0 calc(100% / 12);max-width:calc(100% / 12)}.col-lg-2{flex:0 0 calc(100% / 6);max-width:calc(100% / 6)}.col-lg-3{flex:0 0 25%;max-width:25%}.col-lg-4{flex:0 0 calc(100% / 3);max-width:calc(100% / 3)}.col-lg-5{flex:0 0 calc(100% * 5 / 12);max-width:calc(100% * 5 / 12)}.col-lg-6{flex:0 0 50%;max-width:50%}.col-lg-7{flex:0 0 calc(100% * 7 / 12);max-width:calc(100% * 7 / 12)}.col-lg-8{flex:0 0 calc(100% * 2 / 3);max-width:calc(100% * 2 / 3)}.col-lg-9{flex:0 0 75%;max-width:75%}.col-lg-10{flex:0 0 calc(100% * 5 / 6);max-width:calc(100% * 5 / 6)}.col-lg-11{flex:0 0 calc(100% * 11 / 12);max-width:calc(100% * 11 / 12)}.col-lg-12{flex:0 0 100%;max-width:100%}}
@media(min-width:1200px){.col-xl-1{flex:0 0 calc(100% / 12);max-width:calc(100% / 12)}.col-xl-2{flex:0 0 calc(100% / 6);max-width:calc(100% / 6)}.col-xl-3{flex:0 0 25%;max-width:25%}.col-xl-4{flex:0 0 calc(100% / 3);max-width:calc(100% / 3)}.col-xl-5{flex:0 0 calc(100% * 5 / 12);max-width:calc(100% * 5 / 12)}.col-xl-6{flex:0 0 50%;max-width:50%}.col-xl-7{flex:0 0 calc(100% * 7 / 12);max-width:calc(100% * 7 / 12)}.col-xl-8{flex:0 0 calc(100% * 2 / 3);max-width:calc(100% * 2 / 3)}.col-xl-9{flex:0 0 75%;max-width:75%}.col-xl-10{flex:0 0 calc(100% * 5 / 6);max-width:calc(100% * 5 / 6)}.col-xl-11{flex:0 0 calc(100% * 11 / 12);max-width:calc(100% * 11 / 12)}.col-xl-12{flex:0 0 100%;max-width:100%}}
.flex{display:flex}
.inline-flex{display:inline-flex}
.flex-row{flex-direction:row}
.flex-col{flex-direction:column}
.flex-wrap{flex-wrap:wrap}
.flex-nowrap{flex-nowrap}
.flex-1{flex:1 1 0%}
.flex-auto{flex:1 1 auto}
.flex-none{flex:none}
.flex-grow{flex-grow:1}
.flex-shrink-0{flex-shrink:0}
.items-center{align-items:center}
.items-start{align-items:flex-start}
.items-end{align-items:flex-end}
.items-stretch{align-items:stretch}
.items-baseline{align-items:baseline}
.justify-center{justify-content:center}
.justify-start{justify-content:flex-start}
.justify-end{justify-content:flex-end}
.justify-between{justify-content:space-between}
.justify-around{justify-content:space-around}
.justify-evenly{justify-content:space-evenly}
.center{display:flex;align-items:center;justify-content:center}
.gap-1{gap:var(--space-1)}
.gap-2{gap:var(--space-2)}
.gap-3{gap:var(--space-3)}
.gap-4{gap:var(--space-4)}
.gap-6{gap:var(--space-6)}
.gap-8{gap:var(--space-8)}
.grid{display:grid}
.grid-cols-1{grid-template-columns:repeat(1,1fr)}
.grid-cols-2{grid-template-columns:repeat(2,1fr)}
.grid-cols-3{grid-template-columns:repeat(3,1fr)}
.grid-cols-4{grid-template-columns:repeat(4,1fr)}
.grid-cols-6{grid-template-columns:repeat(6,1fr)}
.grid-cols-12{grid-template-columns:repeat(12,1fr)}
@media(min-width:576px){.grid-sm-cols-2{grid-template-columns:repeat(2,1fr)}.grid-sm-cols-3{grid-template-columns:repeat(3,1fr)}.grid-sm-cols-4{grid-template-columns:repeat(4,1fr)}}
@media(min-width:768px){.grid-md-cols-2{grid-template-columns:repeat(2,1fr)}.grid-md-cols-3{grid-template-columns:repeat(3,1fr)}.grid-md-cols-4{grid-template-columns:repeat(4,1fr)}}
@media(min-width:992px){.grid-lg-cols-3{grid-template-columns:repeat(3,1fr)}.grid-lg-cols-4{grid-template-columns:repeat(4,1fr)}.grid-lg-cols-6{grid-template-columns:repeat(6,1fr)}}
.w-full{width:100%}
.w-auto{width:auto}
.w-screen{width:100vw}
.h-full{height:100%}
.h-auto{height:auto}
.h-screen{height:100vh}
.min-h-full{min-height:100%}
.min-h-screen{min-height:100vh}
.max-w-full{max-width:100%}
.max-w-sm{max-width:24rem}
.max-w-md{max-width:28rem}
.max-w-lg{max-width:32rem}
.max-w-xl{max-width:36rem}
.max-w-2xl{max-width:42rem}
.max-w-3xl{max-width:48rem}
.max-w-4xl{max-width:56rem}
.max-w-5xl{max-width:64rem}
.max-w-6xl{max-width:72rem}
.max-w-7xl{max-width:80rem}
.m-0{margin:0}.m-1{margin:var(--space-1)}.m-2{margin:var(--space-2)}.m-3{margin:var(--space-3)}.m-4{margin:var(--space-4)}.m-6{margin:var(--space-6)}.m-8{margin:var(--space-8)}.m-auto{margin:auto}
.mt-0{margin-top:0}.mt-1{margin-top:var(--space-1)}.mt-2{margin-top:var(--space-2)}.mt-3{margin-top:var(--space-3)}.mt-4{margin-top:var(--space-4)}.mt-6{margin-top:var(--space-6)}.mt-8{margin-top:var(--space-8)}
.mb-0{margin-bottom:0}.mb-1{margin-bottom:var(--space-1)}.mb-2{margin-bottom:var(--space-2)}.mb-3{margin-bottom:var(--space-3)}.mb-4{margin-bottom:var(--space-4)}.mb-6{margin-bottom:var(--space-6)}.mb-8{margin-bottom:var(--space-8)}
.ml-auto{margin-left:auto}.ml-0{margin-left:0}.ml-2{margin-left:var(--space-2)}.ml-4{margin-left:var(--space-4)}
.mr-auto{margin-right:auto}.mr-0{margin-right:0}.mr-2{margin-right:var(--space-2)}.mr-4{margin-right:var(--space-4)}
.mx-auto{margin-inline:auto}.mx-0{margin-inline:0}.mx-2{margin-inline:var(--space-2)}.mx-4{margin-inline:var(--space-4)}
.my-0{margin-block:0}.my-2{margin-block:var(--space-2)}.my-4{margin-block:var(--space-4)}.my-6{margin-block:var(--space-6)}.my-8{margin-block:var(--space-8)}
.p-0{padding:0}.p-1{padding:var(--space-1)}.p-2{padding:var(--space-2)}.p-3{padding:var(--space-3)}.p-4{padding:var(--space-4)}.p-6{padding:var(--space-6)}.p-8{padding:var(--space-8)}
.pt-0{padding-top:0}.pt-2{padding-top:var(--space-2)}.pt-4{padding-top:var(--space-4)}.pt-6{padding-top:var(--space-6)}
.pb-0{padding-bottom:0}.pb-2{padding-bottom:var(--space-2)}.pb-4{padding-bottom:var(--space-4)}.pb-6{padding-bottom:var(--space-6)}
.px-0{padding-inline:0}.px-2{padding-inline:var(--space-2)}.px-4{padding-inline:var(--space-4)}.px-6{padding-inline:var(--space-6)}
.py-0{padding-block:0}.py-2{padding-block:var(--space-2)}.py-4{padding-block:var(--space-4)}.py-6{padding-block:var(--space-6)}
.text-left{text-align:left}
.text-center{text-align:center}
.text-right{text-align:right}
.text-justify{text-align:justify}
.text-xs{font-size:var(--font-size-xs)}
.text-sm{font-size:var(--font-size-sm)}
.text-md{font-size:var(--font-size-md)}
.text-lg{font-size:var(--font-size-lg)}
.text-xl{font-size:var(--font-size-xl)}
.text-2xl{font-size:var(--font-size-2xl)}
.text-3xl{font-size:var(--font-size-3xl)}
.font-normal{font-weight:var(--font-weight-normal)}
.font-medium{font-weight:var(--font-weight-medium)}
.font-semibold{font-weight:var(--font-weight-semibold)}
.font-bold{font-weight:var(--font-weight-bold)}
.text-primary{color:var(--primary)}
.text-accent{color:var(--accent)}
.text-muted{color:var(--text-muted)}
.text-subtle{color:var(--text-subtle)}
.text-success{color:var(--success)}
.text-warning{color:var(--warning)}
.text-danger{color:var(--error)}
.text-info{color:var(--info)}
.text-foreground{color:var(--text)}
.bg-primary{background:var(--primary)}
.bg-accent{background:var(--accent)}
.bg-surface{background:var(--surface)}
.bg-surface-elevated{background:var(--surface-elevated)}
.bg-background{background:var(--background)}
.bg-primary-soft{background:var(--primary-soft)}
.bg-accent-soft{background:var(--accent-soft)}
.bg-success-soft{background:var(--success-soft)}
.bg-warning-soft{background:var(--warning-soft)}
.bg-error-soft{background:var(--error-soft)}
.rounded-sm{border-radius:var(--radius-sm)}
.rounded-md{border-radius:var(--radius-md)}
.rounded-lg{border-radius:var(--radius-lg)}
.rounded-xl{border-radius:var(--radius-xl)}
.rounded-full{border-radius:var(--radius-full)}
.rounded-none{border-radius:0}
.shadow-xs{box-shadow:var(--shadow-xs)}
.shadow-sm{box-shadow:var(--shadow-sm)}
.shadow-md{box-shadow:var(--shadow-md)}
.shadow-lg{box-shadow:var(--shadow-lg)}
.shadow-xl{box-shadow:var(--shadow-xl)}
.shadow-none{box-shadow:none}
.border{border:1px solid var(--border)}
.border-subtle{border:1px solid var(--border-subtle)}
.border-strong{border:1px solid var(--border-strong)}
.border-0{border:0}
.border-t{border-top:1px solid var(--border)}
.border-b{border-bottom:1px solid var(--border)}
.border-l{border-left:1px solid var(--border)}
.border-r{border-right:1px solid var(--border)}
.hidden{display:none}
.block{display:block}
.inline-block{display:inline-block}
.inline{display:inline}
.relative{position:relative}
.absolute{position:absolute}
.fixed{position:fixed}
.sticky{position:sticky}
.top-0{top:0}
.right-0{right:0}
.bottom-0{bottom:0}
.left-0{left:0}
.z-10{z-index:10}.z-20{z-index:20}.z-50{z-index:50}.z-100{z-index:100}
.overflow-hidden{overflow:hidden}
.overflow-auto{overflow:auto}
.overflow-scroll{overflow:scroll}
.overflow-x-auto{overflow-x:auto}
.overflow-y-auto{overflow-y:auto}
.cursor-pointer{cursor:pointer}
.cursor-not-allowed{cursor:not-allowed}
.pointer-events-none{pointer-events:none}
.opacity-0{opacity:0}.opacity-50{opacity:.5}.opacity-75{opacity:.75}.opacity-100{opacity:1}
@media(max-width:480px){
  html{font-size:15px}
  body{font-size:var(--font-size-sm)}
  h1{font-size:var(--font-size-2xl)}
  h2{font-size:var(--font-size-xl)}
  h3{font-size:var(--font-size-lg)}
  .container{padding-inline:var(--space-3)}
  .nav,.navbar{padding:var(--space-2) var(--space-3);gap:var(--space-2)}
  .nav-brand{font-size:var(--font-size-md)}
  .nav-menu{display:none}
  .nav-toggle{display:inline-flex}
  .nav-actions{gap:var(--space-1)}
  .nav-actions .btn{padding:var(--space-1) var(--space-2);font-size:var(--font-size-xs)}
  .card{padding:var(--space-4)}
  .modal-container{max-width:calc(100vw - 2rem);margin:var(--space-2)}
  .modal-header,.modal-body,.modal-footer{padding:var(--space-3) var(--space-4)}
  .dropdown-menu{position:fixed;left:var(--space-2);right:var(--space-2);min-width:auto;max-width:calc(100vw - 1rem)}
  .alert{padding:var(--space-3);gap:var(--space-2);border-radius:var(--radius-sm)}
  .alert-icon{width:1.5rem;height:1.5rem;border-radius:var(--radius-sm)}
  .alert-icon svg{width:0.8rem;height:0.8rem}
  .toast{min-width:calc(100vw - 2rem)}
  .toast-container{left:var(--space-2);right:var(--space-2);top:var(--space-2)}
  .table{font-size:var(--font-size-xs)}
  .table th,.table td{padding:var(--space-2)}
  .pagination{gap:2px}
  .page-link{min-width:1.75rem;height:1.75rem}
  .btn{padding:var(--space-2) var(--space-3);font-size:var(--font-size-xs)}
  .btn-lg{padding:var(--space-2) var(--space-4);font-size:var(--font-size-sm)}
  .btn-sm{padding:var(--space-1) var(--space-2);font-size:var(--font-size-xs)}
  .row{gap:var(--space-2)}
  .grid{gap:var(--space-2)}
  details summary+*{padding:var(--space-3)}
  .file-upload{padding:var(--space-4);gap:var(--space-1)}
  .file-upload-icon{width:2.25rem;height:2.25rem}
  .file-upload-icon svg{width:1rem;height:1rem}
  .avatar-lg{width:2.75rem;height:2.75rem;font-size:var(--font-size-md)}
  fieldset{padding:var(--space-3) var(--space-4)}
}
@media(max-width:767px){
  .nav-menu{display:none}
  .nav-toggle{display:inline-flex}
  .nav-menu.open{display:flex;position:absolute;top:100%;left:0;right:0;flex-direction:column;background:var(--surface);padding:var(--space-2);gap:var(--space-1);box-shadow:var(--shadow-lg);z-index:50}
  .nav-menu.open .nav-item{display:block;width:100%}
  .nav-menu.open .nav-link{display:block;padding:var(--space-3);border-radius:var(--radius-md)}
  .sidebar{padding:var(--space-2)}
  .card-actions{flex-wrap:wrap}
  .form-row{flex-direction:column}
  .form-row>.form-group{flex:1 1 100%;min-width:0}
  .tabs{overflow-x:auto;-webkit-overflow-scrolling:touch}
  .tab-list{flex-wrap:nowrap;white-space:nowrap}
  .breadcrumb{flex-wrap:wrap;gap:var(--space-1)}
  .input-group{flex-wrap:wrap}
  .input-group .form-control{flex:1 1 100%;border-radius:var(--radius-md)!important}
  .input-group-text{flex:1 1 100%;border-radius:var(--radius-md)!important;justify-content:center}
  .modal-overlay{padding:var(--space-2)}
  .modal-container{max-width:calc(100vw - 1.5rem)}
  .accordion-trigger{padding:var(--space-3);font-size:var(--font-size-xs)}
  .accordion-item .accordion-content,.accordion-trigger+*{padding:var(--space-3)}
  .toast-container{left:var(--space-3);right:var(--space-3)}
  .toast{min-width:auto;width:100%}
  .alert{flex-wrap:wrap}
  .alert-close{margin-left:auto}
}
@media(min-width:481px) and (max-width:767px){
  .container{padding-inline:var(--space-4)}
  .nav,.navbar{padding:var(--space-3) var(--space-4)}
  .card{padding:var(--space-5)}
}
@media(min-width:768px) and (max-width:1023px){
  .nav-menu{gap:var(--space-1)}
  .nav-link{padding:var(--space-2) var(--space-3)}
  .nav-brand{font-size:var(--font-size-lg)}
  .card{padding:var(--space-5)}
  .container{padding-inline:var(--space-6)}
}
@media(min-width:1024px){
  .nav-toggle{display:none}
  .nav-menu{display:flex!important}
}
@media print{
  .nav,.navbar,.sidebar,.toast-container,.modal-overlay,.pagination,.file-upload{display:none!important}
  body{background:#fff!important;color:#000!important}
  .card{box-shadow:none;border:1px solid #ccc}
  .alert{box-shadow:none;border:1px solid #ccc}
  .btn{box-shadow:none}
  a{color:#000;text-decoration:underline}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}
  .spinner,.loader{animation:none}
  .skeleton{animation:none;background:var(--surface-active)}
}
`;

/* === fonts.js === */
const FONTS = [
  { name: 'Inter', weights: [400,500,600,700], tags: ['sans','geometric','neutral'], pairWith: 'JetBrains Mono' },
  { name: 'Plus Jakarta Sans', weights: [400,500,600,700], tags: ['sans','geometric','modern'], pairWith: 'JetBrains Mono' },
  { name: 'Manrope', weights: [400,500,600,700], tags: ['sans','rounded','modern'], pairWith: 'Fira Code' },
  { name: 'Space Grotesk', weights: [400,500,600,700], tags: ['sans','geometric','tech'], pairWith: 'Space Mono' },
  { name: 'DM Sans', weights: [400,500,700], tags: ['sans','humanist','clean'], pairWith: 'DM Mono' },
  { name: 'Outfit', weights: [400,500,600,700], tags: ['sans','geometric','soft'], pairWith: 'JetBrains Mono' },
  { name: 'Sora', weights: [400,500,600,700], tags: ['sans','geometric','clean'], pairWith: 'Spline Sans Mono' },
  { name: 'Be Vietnam Pro', weights: [400,500,600,700], tags: ['sans','humanist','readable'], pairWith: 'JetBrains Mono' },
  { name: 'Figtree', weights: [400,500,600,700], tags: ['sans','grotesque','friendly'], pairWith: 'JetBrains Mono' },
  { name: 'Hanken Grotesk', weights: [400,500,600,700], tags: ['sans','grotesque','classic'], pairWith: 'Hanken Grotesk' },
  { name: 'Albert Sans', weights: [400,500,600,700], tags: ['sans','geometric','versatile'], pairWith: 'JetBrains Mono' },
  { name: 'Lexend', weights: [400,500,600,700], tags: ['sans','humanist','readable'], pairWith: 'JetBrains Mono' },
  { name: 'Onest', weights: [400,500,600,700], tags: ['sans','grotesque','modern'], pairWith: 'JetBrains Mono' },
  { name: 'Poppins', weights: [400,500,600,700], tags: ['sans','geometric','popular'], pairWith: 'Fira Code' },
  { name: 'Mulish', weights: [400,500,600,700], tags: ['sans','rounded','soft'], pairWith: 'Fira Code' },
  { name: 'Schibsted Grotesk', weights: [400,500,600,700], tags: ['sans','grotesque','editorial'], pairWith: 'JetBrains Mono' },
  { name: 'Geist', weights: [400,500,600,700], tags: ['sans','geometric','tech'], pairWith: 'Geist Mono' },
  { name: 'Instrument Sans', weights: [400,500,600,700], tags: ['sans','grotesque','tight'], pairWith: 'Instrument Sans' },
  { name: 'Schibsted Grotesk', weights: [400,500,600,700], tags: ['sans','grotesque','editorial'], pairBy: 'Instrument Sans' },
  { name: 'Hanken Grotesk', weights: [400,500,600,700], tags: ['sans','grotesque','classic'], pairBy: 'Sora' },
  { name: 'Roboto Flex', weights: [400,500,600,700], tags: ['sans','humanist','flexible'], pairWith: 'Roboto Mono' },
  { name: 'Archivo', weights: [400,500,600,700], tags: ['sans','grotesque','condensed'], pairWith: 'JetBrains Mono' },
  { name: 'Bricolage Grotesque', weights: [400,500,600,700], tags: ['sans','grotesque','display'], pairWith: 'JetBrains Mono' },
  { name: 'Unbounded', weights: [400,500,600,700], tags: ['sans','display','bold'], pairWith: 'JetBrains Mono' },
  { name: 'Work Sans', weights: [400,500,600,700], tags: ['sans','grotesque','clean'], pairWith: 'JetBrains Mono' },
  { name: 'Spline Sans', weights: [400,500,600,700], tags: ['sans','humanist','readable'], pairWith: 'Spline Sans Mono' },
  { name: 'Mona Sans', weights: [400,500,600,700], tags: ['sans','humanist','github'], pairWith: 'Mona Sans' },
  { name: 'Hubot Sans', weights: [400,500,600,700], tags: ['sans','grotesque','github'], pairWith: 'JetBrains Mono' },
  { name: 'Cabinet Grotesk', weights: [400,500,600,700], tags: ['sans','grotesque','display'], pairWith: 'JetBrains Mono' },
  { name: 'Switzer', weights: [400,500,600,700], tags: ['sans','grotesque','swiss'], pairWith: 'JetBrains Mono' },
  { name: 'General Sans', weights: [400,500,600,700], tags: ['sans','grotesque','clean'], pairWith: 'JetBrains Mono' },
  { name: 'Clash Grotesk', weights: [400,500,600,700], tags: ['sans','grotesque','display'], pairWith: 'JetBrains Mono' },
  { name: 'Satoshi', weights: [400,500,600,700], tags: ['sans','geometric','modern'], pairWith: 'JetBrains Mono' },
  { name: 'Roboto', weights: [400,500,700], tags: ['sans','humanist','classic'], pairWith: 'Roboto Mono' },
  { name: 'Open Sans', weights: [400,500,600,700], tags: ['sans','humanist','readable'], pairWith: 'Source Code Pro' },
  { name: 'Lato', weights: [400,700], tags: ['sans','humanist','warm'], pairWith: 'Source Code Pro' },
  { name: 'Nunito', weights: [400,500,600,700], tags: ['sans','rounded','friendly'], pairWith: 'JetBrains Mono' },
  { name: 'Nunito Sans', weights: [400,500,600,700], tags: ['sans','rounded','clean'], pairWith: 'JetBrains Mono' },
  { name: 'Raleway', weights: [400,500,600,700], tags: ['sans','grotesque','elegant'], pairWith: 'Source Code Pro' },
  { name: 'Montserrat', weights: [400,500,600,700], tags: ['sans','geometric','classic'], pairWith: 'Fira Code' },
  { name: 'Mulish', weights: [400,500,600,700], tags: ['sans','rounded','soft'], pairWith: 'JetBrains Mono' },
  { name: 'Hind', weights: [400,500,600,700], tags: ['sans','humanist','readable'], pairWith: 'JetBrains Mono' },
  { name: 'Karla', weights: [400,500,600,700], tags: ['sans','grotesque','subtle'], pairWith: 'JetBrains Mono' },
  { name: 'IBM Plex Sans', weights: [400,500,600,700], tags: ['sans','humanist','tech'], pairWith: 'IBM Plex Mono' },
  { name: 'Barlow', weights: [400,500,600,700], tags: ['sans','grotesque','condensed'], pairWith: 'JetBrains Mono' },
  { name: 'Heebo', weights: [400,500,700], tags: ['sans','grotesque','simple'], pairWith: 'JetBrains Mono' },
  { name: 'Titillium Web', weights: [400,600,700], tags: ['sans','grotesque','tech'], pairWith: 'JetBrains Mono' },
  { name: 'Ubuntu', weights: [400,500,700], tags: ['sans','humanist','custom'], pairWith: 'Ubuntu Mono' },
  { name: 'Cabin', weights: [400,500,600,700], tags: ['sans','humanist','classic'], pairWith: 'Source Code Pro' },
  { name: 'Cormorant', weights: [400,500,600,700], tags: ['serif','display','elegant'], pairBy: 'Inter' },
  { name: 'Cormorant Garamond', weights: [400,500,600,700], tags: ['serif','display','classic'], pairBy: 'Inter' },
  { name: 'Playfair Display', weights: [400,500,600,700], tags: ['serif','display','highcontrast'], pairBy: 'Source Sans 3' },
  { name: 'Lora', weights: [400,500,600,700], tags: ['serif','body','readable'], pairWith: 'JetBrains Mono' },
  { name: 'Merriweather', weights: [400,700], tags: ['serif','body','readable'], pairBy: 'Inter' },
  { name: 'Source Serif 4', weights: [400,500,600,700], tags: ['serif','body','transitional'], pairBy: 'Source Sans 3' },
  { name: 'Crimson Pro', weights: [400,500,600,700], tags: ['serif','body','classic'], pairBy: 'Inter' },
  { name: 'Libre Baskerville', weights: [400,700], tags: ['serif','body','classic'], pairBy: 'Inter' },
  { name: 'Libre Franklin', weights: [400,500,600,700], tags: ['sans','grotesque','classic'], pairWith: 'JetBrains Mono' },
  { name: 'Frank Ruhl Libre', weights: [400,500,700], tags: ['serif','body','readable'], pairBy: 'Inter' },
  { name: 'Newsreader', weights: [400,500,600,700], tags: ['serif','body','editorial'], pairBy: 'Inter' },
  { name: 'Spectral', weights: [400,500,600,700], tags: ['serif','body','screen'], pairBy: 'Inter' },
  { name: 'Instrument Serif', weights: [400,500,600,700], tags: ['serif','display','modern'], pairBy: 'Inter' },
  { name: 'Spline Serif', weights: [400,500,600,700], tags: ['serif','display','modern'], pairBy: 'Inter' },
  { name: 'Marcellus', weights: [400,500,600,700], tags: ['serif','display','classical'], pairBy: 'Inter' },
  { name: 'Fraunces', weights: [400,500,600,700,900], tags: ['serif','display','soft'], pairBy: 'Inter' },
  { name: 'DM Serif Display', weights: [400,500,600,700], tags: ['serif','display','highcontrast'], pairBy: 'DM Sans' },
  { name: 'Bodoni Moda', weights: [400,500,600,700], tags: ['serif','display','classic'], pairBy: 'Inter' },
  { name: 'Lora', weights: [400,500,600,700], tags: ['serif','body','calligraphic'], pairBy: 'Inter' },
  { name: 'PT Serif', weights: [400,700], tags: ['serif','body','readable'], pairBy: 'PT Sans' },
  { name: 'Vollkorn', weights: [400,500,600,700], tags: ['serif','body','classic'], pairBy: 'Inter' },
  { name: 'Crimson Text', weights: [400,600,700], tags: ['serif','body','classic'], pairBy: 'Inter' },
  { name: 'EB Garamond', weights: [400,500,600,700], tags: ['serif','body','classic'], pairBy: 'Inter' },
  { name: 'Yeseva One', weights: [400,500,600,700], tags: ['serif','display','elegant'], pairBy: 'Inter' },
  { name: 'Philosopher', weights: [400,700], tags: ['sans','display','modern'], pairBy: 'Inter' },
  { name: 'Syne', weights: [400,500,600,700,800], tags: ['sans','display','bold'], pairBy: 'Inter' },
  { name: 'Anybody', weights: [400,500,600,700], tags: ['sans','display','variable'], pairBy: 'Inter' },
  { name: 'Familjen Grotesk', weights: [400,500,600,700], tags: ['sans','grotesque','swedish'], pairBy: 'Inter' },
  { name: 'Bricolage Grotesque', weights: [400,500,600,700], tags: ['sans','grotesque','display'], pairBy: 'Inter' },
  { name: 'Familjen Grotesk', weights: [400,500,600,700], tags: ['sans','grotesque','modern'], pairBy: 'Inter' },
  { name: 'Red Hat Display', weights: [400,500,600,700], tags: ['sans','display','tech'], pairBy: 'Red Hat Text' },
  { name: 'Red Hat Text', weights: [400,500,600,700], tags: ['sans','body','readable'], pairWith: 'JetBrains Mono' },
  { name: 'Red Hat Mono', weights: [400,500,600,700], tags: ['mono','body','tech'], pairBy: 'Red Hat Text' },
  { name: 'Source Sans 3', weights: [400,500,600,700], tags: ['sans','humanist','adobe'], pairWith: 'Source Code Pro' },
  { name: 'Source Code Pro', weights: [400,500,600,700], tags: ['mono','body','adobe'], pairBy: 'Source Sans 3' },
  { name: 'JetBrains Mono', weights: [400,500,600,700], tags: ['mono','body','jetbrains'], pairBy: 'Inter' },
  { name: 'Fira Code', weights: [400,500,600,700], tags: ['mono','body','ligatures'], pairBy: 'Inter' },
  { name: 'Fira Mono', weights: [400,500,700], tags: ['mono','body','mozilla'], pairBy: 'Inter' },
  { name: 'Roboto Mono', weights: [400,500,700], tags: ['mono','body','google'], pairBy: 'Roboto' },
  { name: 'Ubuntu Mono', weights: [400,700], tags: ['mono','body','canonical'], pairBy: 'Ubuntu' },
  { name: 'IBM Plex Mono', weights: [400,500,600,700], tags: ['mono','body','ibm'], pairBy: 'IBM Plex Sans' },
  { name: 'Space Mono', weights: [400,700], tags: ['mono','body','space'], pairBy: 'Space Grotesk' },
  { name: 'DM Mono', weights: [400,500], tags: ['mono','body','google'], pairBy: 'DM Sans' },
  { name: 'Spline Sans Mono', weights: [400,500,600,700], tags: ['mono','body','google'], pairBy: 'Spline Sans' },
  { name: 'Geist Mono', weights: [400,500,600,700], tags: ['mono','body','vercel'], pairBy: 'Geist' },
  { name: 'Mona Sans', weights: [400,500,600,700], tags: ['sans','humanist','github'], pairBy: 'Inter' },
  { name: 'Hubot Sans', weights: [400,500,600,700], tags: ['sans','grotesque','github'], pairBy: 'Inter' },
  { name: 'Cabinet Grotesk', weights: [400,500,600,700], tags: ['sans','grotesque','display'], pairBy: 'Inter' },
  { name: 'Switzer', weights: [400,500,600,700], tags: ['sans','grotesque','swiss'], pairBy: 'Inter' },
  { name: 'General Sans', weights: [400,500,600,700], tags: ['sans','grotesque','clean'], pairBy: 'Inter' },
  { name: 'Clash Grotesk', weights: [400,500,600,700], tags: ['sans','grotesque','display'], pairBy: 'Inter' },
  { name: 'Satoshi', weights: [400,500,600,700], tags: ['sans','geometric','modern'], pairBy: 'Inter' },
  { name: 'Azeret Mono', weights: [400,500,600,700], tags: ['mono','body','unique'], pairBy: 'Inter' },
  { name: 'Anybody', weights: [400,500,600,700], tags: ['sans','display','variable'], pairBy: 'Inter' },
];

const MONO_FONTS = [
  'JetBrains Mono','Fira Code','Fira Mono','Roboto Mono','Ubuntu Mono',
  'IBM Plex Mono','Space Mono','DM Mono','Spline Sans Mono','Geist Mono',
  'Source Code Pro','Azeret Mono','Red Hat Mono',
];

function cssImportUrl(fontNames) {
  const unique = [...new Set(fontNames)].filter(Boolean);
  if (!unique.length) return '';
  const famParam = unique.map(f => `family=${f.replace(/ /g, '+')}:wght@400;500;600;700`).join('&');
  return `https://fonts.googleapis.com/css2?${famParam}&display=swap`;
}

function fontCssUrl(headingFont, bodyFont, monoFont) {
  return cssImportUrl([headingFont, bodyFont, monoFont]);
}

function fontStack(name) {
  if (!name) return null;
  return `'${name}', ui-sans-serif, system-ui, sans-serif`;
}

function monoStack(name) {
  if (!name) return null;
  return `'${name}', ui-monospace, monospace`;
}

function autoPair(headingFont) {
  const headingEntries = FONTS.filter(f => f.name === headingFont);
  if (!headingEntries.length) return 'Inter';
  const headingTags = new Set(headingEntries.flatMap(e => e.tags));
  const isSerifHeading = headingTags.has('serif');
  const isDisplayHeading = headingTags.has('display');
  const explicitBody = headingEntries.map(e => e.pairBy).find(Boolean);
  const pairWithNonMono = headingEntries.map(e => e.pairWith).find(p => p && !MONO_FONTS.includes(p));

  const candidates = FONTS.filter(f => {
    const tags = new Set(f.tags);
    if (tags.has('mono')) return false;
    if (isDisplayHeading && tags.has('display')) return false;
    return true;
  });

  let best = null;
  let bestScore = -Infinity;

  for (const c of candidates) {
    const cTags = new Set(c.tags);
    let score = 0;

    if (explicitBody && c.name === explicitBody) score += 300;
    if (pairWithNonMono && c.name === pairWithNonMono) score += 300;
    if (c.name === headingFont) score += 100;
    if (cTags.has('body') || cTags.has('readable')) score += 60;
    if (cTags.has('sans')) score += 25;

    for (const t of headingTags) {
      if (cTags.has(t) && t !== 'display') score += 15;
    }

    if (isSerifHeading && cTags.has('sans')) score += 45;
    if (isDisplayHeading && (cTags.has('body') || cTags.has('readable'))) score += 35;
    if (headingTags.has('geometric') && cTags.has('geometric')) score += 20;
    if (headingTags.has('humanist') && cTags.has('humanist')) score += 20;
    if (headingTags.has('grotesque') && cTags.has('grotesque')) score += 20;
    if (headingTags.has('rounded') && cTags.has('rounded')) score += 20;
    if (cTags.has('display')) score -= 80;
    if (c.name === headingFont && !isDisplayHeading && (cTags.has('body') || cTags.has('readable'))) score += 30;

    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }

  return best?.name || 'Inter';
}

function autoMono(headingFont, bodyFont) {
  const MONO_PAIRINGS = {
    'Geist': 'Geist Mono',
    'Space Grotesk': 'Space Mono',
    'IBM Plex Sans': 'IBM Plex Mono',
    'DM Sans': 'DM Mono',
    'Spline Sans': 'Spline Sans Mono',
    'Roboto': 'Roboto Mono',
    'Roboto Flex': 'Roboto Mono',
    'Ubuntu': 'Ubuntu Mono',
    'Source Sans 3': 'Source Code Pro',
    'Red Hat Text': 'Red Hat Mono',
    'Red Hat Display': 'Red Hat Mono',
  };

  for (const f of [headingFont, bodyFont]) {
    if (MONO_PAIRINGS[f] && MONO_FONTS.includes(MONO_PAIRINGS[f])) return MONO_PAIRINGS[f];
  }

  const headingEntries = FONTS.filter(e => e.name === headingFont);
  for (const e of headingEntries) {
    if (e.pairWith && MONO_FONTS.includes(e.pairWith)) return e.pairWith;
  }

  const tags = new Set([
    ...headingEntries.flatMap(e => e.tags),
    ...(FONTS.filter(f => f.name === bodyFont).flatMap(f => f.tags)),
  ]);

  let best = 'JetBrains Mono';
  let bestScore = -Infinity;

  for (const monoName of MONO_FONTS) {
    const monoEntry = FONTS.find(f => f.name === monoName);
    const monoTags = new Set(monoEntry?.tags ?? []);
    let score = 0;

    if (tags.has('tech') && monoTags.has('tech')) score += 30;
    if (tags.has('jetbrains')) score += 50;
    if (tags.has('ibm') && monoTags.has('ibm')) score += 50;
    if (tags.has('google') && monoTags.has('google')) score += 25;
    if (tags.has('mozilla') && monoTags.has('mozilla')) score += 50;
    if (tags.has('space') && monoTags.has('space')) score += 50;
    if (tags.has('vercel') && monoTags.has('vercel')) score += 50;

    for (const t of tags) {
      if (monoTags.has(t)) score += 8;
    }

    if (score > bestScore) {
      bestScore = score;
      best = monoName;
    }
  }

  return best;
}

/* === styles.js === */
const STYLE_IDS = [
  'default','flat','material','neumorphism','glassmorphism','brutalism',
  'maximalism','skeuomorphism','skeuominimalism','dark-highcontrast',
  'retro-8bit','cyberpunk','claymorphism','bauhaus','organic','typographic',
  'minimalism-mono','papercut','skeuomorphism-classic',
];

const STYLE_LABELS = {
  'default': 'Default',
  'flat': 'Flat Design',
  'material': 'Material Design',
  'neumorphism': 'Neomorphism',
  'glassmorphism': 'Glassmorphism',
  'brutalism': 'Brutalism / Neo-Brutalism',
  'maximalism': 'Maximalism',
  'skeuomorphism': 'Skeuomorphism',
  'skeuominimalism': 'Skeuominimalism',
  'dark-highcontrast': 'Dark Mode / High Contrast',
  'retro-8bit': 'Retro / 8-Bit (Pixel Art)',
  'cyberpunk': 'Cyberpunk / Synthwave (Neon Glow)',
  'claymorphism': 'Memorphism (3D Cartoon / Claymorphism)',
  'bauhaus': 'Bauhaus / Swiss Style (Grid-Based)',
  'organic': 'Organic / Biomorphic (Fluid Shapes)',
  'typographic': 'Typographic / Text-First',
  'minimalism-mono': 'Minimalism (Monochrome)',
  'papercut': 'Papercut / Layered Vector',
  'skeuomorphism-classic': 'Skeuomorphism (Classic 3D)',
};

const STYLE_CSS = {
'default': ``,

'flat': `
:root{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none;--shadow-focus:0 0 0 2px var(--primary)}
[data-theme="dark"]{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none}
.card,.alert,.dropdown-menu,.modal-container,.toast,.accordion-item,.fieldset{box-shadow:none!important;border:1px solid var(--border)!important;border-radius:var(--radius-md)!important}
.btn{box-shadow:none!important;border:1px solid var(--border)!important;border-radius:var(--radius-md)!important}.btn:active{transform:translateY(0)!important}
input,textarea,select{box-shadow:none!important;border:1px solid var(--border)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:0 0 0 2px var(--primary)!important}
.badge,.tag,.chip{box-shadow:none!important;border:1px solid var(--border)!important}
pre{box-shadow:none!important;border:1px solid var(--border)!important}
code{box-shadow:none!important}
.navbar{box-shadow:none!important;border-bottom:1px solid var(--border)}
.progress{box-shadow:none!important;border:1px solid var(--border)!important}
`,

'material': `
:root{--radius-sm:2px;--radius-md:4px;--radius-lg:8px;--radius-xl:12px;--shadow-xs:0 1px 2px rgba(0,0,0,.12);--shadow-sm:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.08);--shadow-md:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.12);--shadow-lg:0 10px 20px rgba(0,0,0,.14),0 6px 6px rgba(0,0,0,.10);--shadow-xl:0 14px 28px rgba(0,0,0,.18),0 10px 10px rgba(0,0,0,.12);--shadow-2xl:0 24px 48px rgba(0,0,0,.22),0 12px 12px rgba(0,0,0,.14)}
[data-theme="dark"]{--shadow-xs:0 1px 2px rgba(0,0,0,.3);--shadow-sm:0 1px 3px rgba(0,0,0,.3);--shadow-md:0 3px 6px rgba(0,0,0,.35);--shadow-lg:0 10px 20px rgba(0,0,0,.4);--shadow-xl:0 14px 28px rgba(0,0,0,.45);--shadow-2xl:0 24px 48px rgba(0,0,0,.5)}
.card{border:none!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.card-bordered{border:1px solid var(--border)!important}
.btn{border:none!important;border-radius:4px!important;text-transform:uppercase;letter-spacing:.04em;font-weight:600;box-shadow:var(--shadow-sm)!important}
.btn:active{box-shadow:var(--shadow-xs)!important;transform:translateY(1px)!important}
.btn-primary,.btn-accent,.btn-success,.btn-warning,.btn-danger{box-shadow:var(--shadow-md)!important}
input,textarea,select{border:none!important;border-bottom:2px solid var(--border)!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;padding-left:0;padding-right:0}
input:focus,textarea:focus,select:focus{border-bottom-color:var(--primary)!important;box-shadow:none!important}
.field-label{background:transparent!important}
.field-label::before{background:transparent!important}
.field input:not(:placeholder-shown)~.field-label,.field input:focus~.field-label{background:transparent!important}
.navbar{box-shadow:var(--shadow-sm)!important;border:none!important}
.tab.active{border-bottom:2px solid var(--primary)!important}
.badge{border-radius:4px!important}
.chip{border-radius:4px!important}
.alert{border-radius:var(--radius-md)!important;box-shadow:var(--shadow-sm)!important;border:none!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
`,

'neumorphism': `
:root{--radius-sm:8px;--radius-md:12px;--radius-lg:16px;--radius-xl:20px;--shadow-xs:inset 2px 2px 4px rgba(0,0,0,.08),inset -2px -2px 4px rgba(255,255,255,.8);--shadow-sm:4px 4px 8px rgba(0,0,0,.1),-4px -4px 8px rgba(255,255,255,.8);--shadow-md:6px 6px 12px rgba(0,0,0,.12),-6px -6px 12px rgba(255,255,255,.8);--shadow-lg:8px 8px 16px rgba(0,0,0,.14),-8px -8px 16px rgba(255,255,255,.8);--shadow-xl:12px 12px 24px rgba(0,0,0,.16),-12px -12px 24px rgba(255,255,255,.8);--shadow-2xl:16px 16px 32px rgba(0,0,0,.18),-16px -16px 32px rgba(255,255,255,.8);--shadow-inner:inset 3px 3px 6px rgba(0,0,0,.12),inset -3px -3px 6px rgba(255,255,255,.8);--shadow-focus:inset 0 0 0 2px var(--primary)}
[data-theme="dark"]{--shadow-xs:inset 2px 2px 4px rgba(0,0,0,.3),inset -2px -2px 4px rgba(255,255,255,.05);--shadow-sm:4px 4px 8px rgba(0,0,0,.3),-4px -4px 8px rgba(255,255,255,.05);--shadow-md:6px 6px 12px rgba(0,0,0,.35),-6px -6px 12px rgba(255,255,255,.06);--shadow-lg:8px 8px 16px rgba(0,0,0,.4),-8px -8px 16px rgba(255,255,255,.07);--shadow-xl:12px 12px 24px rgba(0,0,0,.45),-12px -12px 24px rgba(255,255,255,.08);--shadow-2xl:16px 16px 32px rgba(0,0,0,.5),-16px -16px 32px rgba(255,255,255,.09);--shadow-inner:inset 3px 3px 6px rgba(0,0,0,.4),inset -3px -3px 6px rgba(255,255,255,.06)}
.card{border:none!important;background:var(--background)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.card-bordered{border:1px solid var(--border)!important}
.btn{border:none!important;background:var(--background)!important;box-shadow:var(--shadow-sm)!important;color:var(--text)!important;border-radius:var(--radius-md)!important}
.btn:hover{box-shadow:var(--shadow-md)!important}
.btn:active{box-shadow:var(--shadow-inner)!important;transform:none!important}
.btn-primary{background:var(--primary)!important;color:var(--primary-foreground)!important;box-shadow:var(--shadow-md)!important}
.btn-primary:hover{box-shadow:var(--shadow-lg)!important;background:var(--primary-hover)!important}
input,textarea,select{border:none!important;background:var(--background)!important;box-shadow:var(--shadow-inner)!important;color:var(--text)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-focus),var(--shadow-inner)!important;border:none!important}
.field-label::before{background:var(--background)!important}
.field input:focus~.field-label::before,.field input:not(:placeholder-shown)~.field-label::before,.field textarea:focus~.field-label::before,.field textarea:not(:placeholder-shown)~.field-label::before{background:var(--background)!important}
.badge,.tag,.chip{border:none!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.progress,.spinner{box-shadow:var(--shadow-inner)!important}
.alert{border:none!important;background:var(--background)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.alert-icon{border-radius:var(--radius-sm)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
.dropdown-menu,.modal-container,.toast{background:var(--background)!important;border:none!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-lg)!important}
fieldset{border:none!important;background:var(--background)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.file-upload{border:none!important;background:var(--background)!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-lg)!important}
pre,code{background:var(--background)!important;box-shadow:var(--shadow-inner)!important;border:none!important}
.navbar{box-shadow:none!important;background:var(--background)!important;border:none!important}
hr{display:none}
`,

'glassmorphism': `
:root{--radius-sm:8px;--radius-md:12px;--radius-lg:16px;--radius-xl:20px;--shadow-xs:0 2px 8px rgba(0,0,0,.06);--shadow-sm:0 4px 16px rgba(0,0,0,.08);--shadow-md:0 8px 32px rgba(0,0,0,.1),0 2px 8px rgba(0,0,0,.06);--shadow-lg:0 12px 40px rgba(0,0,0,.12),0 4px 12px rgba(0,0,0,.08);--shadow-xl:0 20px 56px rgba(0,0,0,.16),0 8px 24px rgba(0,0,0,.1);--shadow-2xl:0 28px 72px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.12)}
body{backdrop-filter:blur(20px) saturate(1.4)}
.card,.alert,.dropdown-menu,.modal-container,.toast,.fieldset{background:color-mix(in srgb,var(--surface) 60%,transparent)!important;backdrop-filter:blur(16px) saturate(1.3)!important;border:1px solid color-mix(in srgb,var(--border) 50%,transparent)!important;box-shadow:var(--shadow-md),inset 0 1px 0 color-mix(in srgb,white 15%,transparent)!important;border-radius:var(--radius-lg)!important}
[data-theme="dark"] .card,[data-theme="dark"] .alert,[data-theme="dark"] .dropdown-menu,[data-theme="dark"] .modal-container,[data-theme="dark"] .toast,[data-theme="dark"] fieldset{border-color:color-mix(in srgb,var(--border) 40%,transparent)!important;box-shadow:var(--shadow-md),inset 0 1px 0 color-mix(in srgb,white 5%,transparent)!important}
.card-bordered{border:1px solid color-mix(in srgb,var(--border) 50%,transparent)!important}
.btn{background:color-mix(in srgb,var(--surface) 50%,transparent)!important;backdrop-filter:blur(12px)!important;border:1px solid color-mix(in srgb,var(--border) 40%,transparent)!important;box-shadow:var(--shadow-xs),inset 0 1px 0 color-mix(in srgb,white 10%,transparent)!important;border-radius:var(--radius-md)!important}
.btn-primary{background:color-mix(in srgb,var(--primary) 80%,transparent)!important;border-color:color-mix(in srgb,var(--primary) 60%,transparent)!important;backdrop-filter:blur(12px)!important}
.btn:hover{box-shadow:var(--shadow-sm),inset 0 1px 0 color-mix(in srgb,white 12%,transparent)!important}
input,textarea,select{background:color-mix(in srgb,var(--surface) 40%,transparent)!important;backdrop-filter:blur(8px)!important;border:1px solid color-mix(in srgb,var(--border) 40%,transparent)!important;border-radius:var(--radius-md)!important}
.navbar{background:color-mix(in srgb,var(--surface) 50%,transparent)!important;backdrop-filter:blur(20px) saturate(1.5)!important;border-bottom:1px solid color-mix(in srgb,var(--border) 30%,transparent)!important}
pre{background:color-mix(in srgb,var(--surface) 40%,transparent)!important;backdrop-filter:blur(8px)!important;border:1px solid color-mix(in srgb,var(--border) 30%,transparent)!important;border-radius:var(--radius-md)!important}
code{background:color-mix(in srgb,var(--surface-active) 40%,transparent)!important;backdrop-filter:blur(4px)!important;border-radius:var(--radius-sm)!important}
.badge,.tag,.chip{background:color-mix(in srgb,var(--surface) 50%,transparent)!important;backdrop-filter:blur(8px)!important;border:1px solid color-mix(in srgb,var(--border) 30%,transparent)!important}
.file-upload{background:color-mix(in srgb,var(--surface) 40%,transparent)!important;backdrop-filter:blur(8px)!important;border:1px solid color-mix(in srgb,var(--border) 40%,transparent)!important;border-radius:var(--radius-lg)!important}
input[type="range"]::-webkit-slider-runnable-track{background:color-mix(in srgb,var(--surface-active) 50%,transparent)!important;backdrop-filter:blur(4px)!important}
`,

'brutalism': `
:root{--radius-sm:0;--radius-md:0;--radius-lg:0;--radius-xl:0;--radius-full:0;--shadow-xs:2px 2px 0 var(--contrast);--shadow-sm:3px 3px 0 var(--contrast);--shadow-md:4px 4px 0 var(--contrast);--shadow-lg:6px 6px 0 var(--contrast);--shadow-xl:8px 8px 0 var(--contrast);--shadow-2xl:12px 12px 0 var(--contrast);--shadow-inner:none;--shadow-focus:0 0 0 3px var(--primary)}
[data-theme="dark"]{--shadow-xs:2px 2px 0 #fff;--shadow-sm:3px 3px 0 #fff;--shadow-md:4px 4px 0 #fff;--shadow-lg:6px 6px 0 #fff;--shadow-xl:8px 8px 0 #fff;--shadow-2xl:12px 12px 0 #fff}
body{font-weight:600}
h1,h2,h3,h4,h5,h6{font-weight:900;letter-spacing:-.03em;text-transform:uppercase;line-height:1}
.card,.alert,.fieldset{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-md)!important;border-radius:0!important}
.card-bordered{border:2px solid var(--contrast)!important}
.btn{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-sm)!important;border-radius:0!important;font-weight:800;text-transform:uppercase;letter-spacing:.02em}
.btn:hover{box-shadow:var(--shadow-md)!important;transform:translate(-1px,-1px)}
.btn:active{box-shadow:none!important;transform:translate(2px,2px)!important}
input,textarea,select{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-xs)!important;border-radius:0!important;font-weight:600}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-sm)!important;border-color:var(--primary)!important}
.badge,.tag,.chip{border:2px solid var(--contrast)!important;border-radius:0!important;font-weight:800;box-shadow:var(--shadow-xs)!important}
.dropdown-menu,.modal-container,.toast{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-lg)!important;border-radius:0!important}
pre{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-sm)!important;border-radius:0!important}
code{border:1px solid var(--contrast)!important;border-radius:0!important}
.navbar{border-bottom:2px solid var(--contrast);box-shadow:none!important}
.tab{border:2px solid transparent!important;border-radius:0!important}
.tab.active{border:2px solid var(--contrast)!important;border-bottom:none!important}
.pagination .page-link{border:2px solid var(--contrast)!important;border-radius:0!important;box-shadow:var(--shadow-xs)!important}
.file-upload{border:2px dashed var(--contrast)!important;border-radius:0!important;box-shadow:var(--shadow-sm)!important}
.progress{border:2px solid var(--contrast)!important;border-radius:0!important;box-shadow:var(--shadow-xs)!important}
.progress-bar{border-right:1px solid var(--contrast)}
.accordion-item{border:2px solid var(--contrast)!important;border-radius:0!important}
.accordion-trigger{border:none!important;border-radius:0!important}
fieldset{border:2px solid var(--contrast)!important;border-radius:0!important;box-shadow:var(--shadow-sm)!important}
hr{border-top:2px solid var(--contrast)}
`,

'maximalism': `
:root{--radius-sm:6px;--radius-md:14px;--radius-lg:24px;--radius-xl:32px;--radius-full:9999px;--shadow-xs:0 2px 6px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.2);--shadow-sm:0 4px 12px rgba(0,0,0,.12),0 1px 3px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.2);--shadow-md:0 8px 20px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.2);--shadow-lg:0 16px 40px rgba(0,0,0,.18),0 6px 16px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.22);--shadow-xl:0 24px 60px rgba(0,0,0,.22),0 12px 32px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.25);--shadow-2xl:0 32px 80px rgba(0,0,0,.26),0 16px 48px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.3)}
body{font-size:1.05rem;letter-spacing:-.01em}
h1{font-size:var(--font-size-5xl);font-weight:900;letter-spacing:-.04em}
h2{font-size:var(--font-size-4xl);font-weight:800;letter-spacing:-.03em}
h3{font-size:var(--font-size-3xl);font-weight:800}
h4{font-size:var(--font-size-2xl);font-weight:700}
.card{border:2px solid var(--border-strong)!important;box-shadow:var(--shadow-lg)!important;background:linear-gradient(135deg,var(--surface) 0%,var(--surface-elevated) 100%)!important;border-radius:var(--radius-lg)!important}
.card-bordered{border:2px solid var(--border-strong)!important}
.card-title{font-size:var(--font-size-xl);font-weight:900}
.btn{border:2px solid var(--border-strong)!important;font-weight:800;letter-spacing:-.01em;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-md)!important}
.btn-primary{background:linear-gradient(135deg,var(--primary) 0%,var(--primary-hover) 100%)!important;border-color:var(--primary)!important;box-shadow:var(--shadow-lg)!important}
.btn-primary:hover{box-shadow:var(--shadow-xl)!important;transform:translateY(-2px)!important}
.btn-accent{background:linear-gradient(135deg,var(--accent) 0%,var(--accent-hover) 100%)!important;border-color:var(--accent)!important}
.badge{font-size:var(--font-size-sm);font-weight:800;box-shadow:var(--shadow-sm),inset 0 1px 0 rgba(255,255,255,.3)!important;border:1px solid var(--border-strong)!important;border-radius:var(--radius-full)!important}
.alert{border:2px solid var(--border-strong)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.alert:hover{box-shadow:var(--shadow-lg)!important;transform:translateY(-1px)!important}
.alert-title{font-size:var(--font-size-md);font-weight:800}
.dropdown-menu,.modal-container,.toast{box-shadow:var(--shadow-xl)!important;border:2px solid var(--border-strong)!important;border-radius:var(--radius-lg)!important}
input,textarea,select{border:2px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-focus),var(--shadow-md)!important}
.navbar{background:linear-gradient(180deg,var(--surface) 0%,var(--background) 100%)!important;border-bottom:2px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important}
.nav-brand{font-size:var(--font-size-xl);font-weight:900}
pre{border:2px solid var(--border-strong)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.file-upload{border:3px dashed var(--border-strong)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.progress{height:.75rem;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-full)!important}
.chip{border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-full)!important}
.accordion-item{box-shadow:var(--shadow-sm)!important;border:1px solid var(--border-strong)!important;border-radius:var(--radius-md)!important}
.accordion-trigger{font-size:var(--font-size-md);font-weight:800}
fieldset{border:2px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
`,

'skeuomorphism': `
:root{--radius-sm:4px;--radius-md:6px;--radius-lg:10px;--radius-xl:14px;--shadow-xs:0 1px 2px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.3);--shadow-sm:0 2px 4px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.3);--shadow-md:0 4px 8px rgba(0,0,0,.15),inset 0 1px 0 rgba(255,255,255,.3),inset 0 -1px 0 rgba(0,0,0,.08);--shadow-lg:0 8px 16px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.3),inset 0 -1px 0 rgba(0,0,0,.1);--shadow-xl:0 12px 28px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.3),inset 0 -2px 0 rgba(0,0,0,.12);--shadow-2xl:0 20px 48px rgba(0,0,0,.26),inset 0 1px 0 rgba(255,255,255,.3),inset 0 -2px 0 rgba(0,0,0,.14);--shadow-inner:inset 0 2px 4px rgba(0,0,0,.12),inset 0 -1px 0 rgba(255,255,255,.3)}
.card{border:1px solid var(--border)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.card-bordered{border:1px solid var(--border)!important}
.btn{background:linear-gradient(180deg,color-mix(in srgb,var(--surface) 92%,white) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.btn:active{box-shadow:var(--shadow-inner)!important;transform:translateY(1px)!important}
.btn-primary{background:linear-gradient(180deg,color-mix(in srgb,var(--primary) 85%,white) 0%,var(--primary) 100%)!important;border-color:var(--primary)!important;box-shadow:var(--shadow-md)!important}
.btn-primary:hover{background:linear-gradient(180deg,color-mix(in srgb,var(--primary-hover) 88%,white) 0%,var(--primary-hover) 100%)!important}
.btn-primary:active{background:linear-gradient(180deg,var(--primary) 0%,color-mix(in srgb,var(--primary) 85%,white) 100%)!important;box-shadow:var(--shadow-inner)!important}
input,textarea,select{background:linear-gradient(180deg,var(--surface-active) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-inner),0 0 0 2px var(--primary)!important;border-color:var(--primary)!important}
.badge,.chip{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.alert{border:1px solid var(--border)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
.alert-icon{border-radius:var(--radius-sm)!important}
.navbar{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border-bottom:1px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important}
pre{background:linear-gradient(180deg,var(--surface-active) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
code{background:var(--surface-active)!important;border:1px solid var(--border)!important;box-shadow:inset 0 1px 2px rgba(0,0,0,.1)!important;border-radius:var(--radius-sm)!important}
.progress{box-shadow:var(--shadow-inner)!important;border:1px solid var(--border-strong)!important;border-radius:var(--radius-sm)!important}
.progress-bar{background:linear-gradient(180deg,color-mix(in srgb,var(--primary) 85%,white) 0%,var(--primary) 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.3)!important}
.file-upload{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.dropdown-menu,.modal-container,.toast{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-lg)!important}
fieldset{border:1px solid var(--border-strong)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
`,

'skeuominimalism': `
:root{--radius-sm:6px;--radius-md:8px;--radius-lg:12px;--shadow-xs:0 1px 2px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.15);--shadow-sm:0 2px 4px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.15);--shadow-md:0 4px 8px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.15);--shadow-lg:0 8px 16px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.15);--shadow-xl:0 12px 24px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.15);--shadow-2xl:0 16px 32px rgba(0,0,0,.16),inset 0 1px 0 rgba(255,255,255,.15);--shadow-inner:inset 0 1px 2px rgba(0,0,0,.08),inset 0 -1px 0 rgba(255,255,255,.1)}
.card{border:none!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-md)!important}
.card-bordered{border:1px solid var(--border)!important}
.btn{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.btn:active{box-shadow:var(--shadow-inner)!important;transform:translateY(1px)!important}
.btn-primary{box-shadow:var(--shadow-md)!important}
.btn-primary:active{box-shadow:var(--shadow-inner)!important}
input,textarea,select{border:none!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-inner),0 0 0 2px var(--primary)!important}
.field-label::before{background:var(--surface)!important}
.badge,.chip{border:none!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.alert{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
.progress{box-shadow:var(--shadow-inner)!important;border:none!important;border-radius:var(--radius-full)!important}
.dropdown-menu,.modal-container,.toast{border:none!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-lg)!important}
pre{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
code{border:none!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
fieldset{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.file-upload{border:none!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
`,

'dark-highcontrast': `
:root{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none;--shadow-focus:0 0 0 3px var(--primary);--radius-sm:0;--radius-md:0;--radius-lg:0;--radius-xl:0}
[data-theme="dark"]{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none}
.card,.alert,.fieldset,.dropdown-menu,.modal-container,.toast{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
.card-bordered{border:2px solid var(--text)!important}
.btn{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important;font-weight:700}
.btn:active{transform:translate(2px,2px)!important}
.btn-primary{border-color:var(--text)!important}
input,textarea,select{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
input:focus,textarea:focus,select:focus{box-shadow:0 0 0 2px var(--primary)!important}
.badge,.tag,.chip{border:2px solid var(--text)!important;border-radius:0!important;box-shadow:none!important}
pre{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
code{border:1px solid var(--text)!important;border-radius:0!important}
.navbar{border-bottom:2px solid var(--text);box-shadow:none!important}
.file-upload{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
.progress{border:2px solid var(--text)!important;border-radius:0!important;box-shadow:none!important}
.accordion-item{border:2px solid var(--text)!important;border-radius:0!important;box-shadow:none!important}
fieldset{border:2px solid var(--text)!important;border-radius:0!important;box-shadow:none!important}
hr{border-top:2px solid var(--text)}
a{text-decoration:underline;text-underline-offset:2px}
[data-theme="light"] body{background:#fff;color:#000}
[data-theme="dark"] body{background:#000;color:#fff}
`,

'retro-8bit': `
:root{--radius-sm:0;--radius-md:0;--radius-lg:0;--radius-xl:0;--radius-full:0;--shadow-xs:2px 2px 0 var(--contrast);--shadow-sm:2px 2px 0 var(--contrast);--shadow-md:4px 4px 0 var(--contrast);--shadow-lg:4px 4px 0 var(--contrast);--shadow-xl:6px 6px 0 var(--contrast);--shadow-2xl:6px 6px 0 var(--contrast);--shadow-inner:none;--shadow-focus:0 0 0 3px var(--primary)}
[data-theme="dark"]{--shadow-xs:2px 2px 0 #fff;--shadow-sm:2px 2px 0 #fff;--shadow-md:4px 4px 0 #fff;--shadow-lg:4px 4px 0 #fff;--shadow-xl:6px 6px 0 #fff;--shadow-2xl:6px 6px 0 #fff}
body{font-family:var(--font-family-mono);letter-spacing:0}
h1,h2,h3,h4,h5,h6{font-family:var(--font-family-mono);letter-spacing:0;text-transform:uppercase;font-weight:700}
.card,.alert,.fieldset{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-md)!important;border-radius:0!important}
.card-bordered{border:2px solid var(--contrast)!important}
.btn{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-sm)!important;border-radius:0!important;font-family:var(--font-family-mono);font-weight:700;text-transform:uppercase;letter-spacing:0}
.btn:hover{box-shadow:var(--shadow-md)!important;transform:translate(-1px,-1px)}
.btn:active{box-shadow:none!important;transform:translate(2px,2px)!important}
input,textarea,select{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-xs)!important;border-radius:0!important;font-family:var(--font-family-mono)}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-sm)!important;border-color:var(--primary)!important}
.badge,.tag,.chip{border:2px solid var(--contrast)!important;border-radius:0!important;font-family:var(--font-family-mono);font-weight:700;text-transform:uppercase;box-shadow:var(--shadow-xs)!important}
.dropdown-menu,.modal-container,.toast{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-lg)!important;border-radius:0!important}
pre{border:2px solid var(--contrast)!important;box-shadow:var(--shadow-sm)!important;border-radius:0!important}
code{border:1px solid var(--contrast)!important;border-radius:0!important;font-family:var(--font-family-mono)}
.navbar{border-bottom:2px solid var(--contrast);box-shadow:none!important}
.tab{border:2px solid transparent!important;border-radius:0!important;font-family:var(--font-family-mono)}
.tab.active{border:2px solid var(--contrast)!important;border-bottom:none!important}
.file-upload{border:2px dashed var(--contrast)!important;border-radius:0!important;box-shadow:var(--shadow-sm)!important}
.progress{border:2px solid var(--contrast)!important;border-radius:0!important;box-shadow:none!important}
fieldset{border:2px solid var(--contrast)!important;border-radius:0!important;box-shadow:var(--shadow-sm)!important}
.accordion-item{border:2px solid var(--contrast)!important;border-radius:0!important}
.accordion-trigger{border-radius:0!important}
hr{border-top:2px solid var(--contrast)}
input[type="range"]::-webkit-slider-thumb{border-radius:0;border:2px solid var(--contrast)}
.form-check-box{border-radius:0!important;border:2px solid var(--contrast)!important}
`,

'cyberpunk': `
:root{--radius-sm:2px;--radius-md:4px;--radius-lg:6px;--shadow-xs:0 0 4px rgba(0,0,0,.3);--shadow-sm:0 0 8px rgba(0,0,0,.3),0 0 0 1px color-mix(in srgb,var(--primary) 40%,transparent);--shadow-md:0 0 16px rgba(0,0,0,.4),0 0 0 1px color-mix(in srgb,var(--primary) 50%,transparent);--shadow-lg:0 0 24px rgba(0,0,0,.5),0 0 0 1px color-mix(in srgb,var(--accent) 50%,transparent);--shadow-xl:0 0 32px rgba(0,0,0,.6),0 0 0 1px color-mix(in srgb,var(--accent) 60%,transparent);--shadow-2xl:0 0 48px rgba(0,0,0,.7),0 0 0 1px color-mix(in srgb,var(--primary) 60%,transparent);--shadow-inner:inset 0 0 8px rgba(0,0,0,.4),inset 0 0 0 1px color-mix(in srgb,var(--primary) 30%,transparent);--shadow-focus:0 0 0 2px var(--accent),0 0 12px color-mix(in srgb,var(--accent) 60%,transparent)}
[data-theme="light"] body{background:#0a0a12;color:#e0e0ff}
[data-theme="dark"] body{background:#0a0a12;color:#e0e0ff}
[data-theme="light"]{--background:#0a0a12;--surface:#12121f;--surface-elevated:#1a1a2e;--surface-hover:#1e1e34;--surface-active:#16162a;--text:#e0e0ff;--text-muted:#8888aa;--text-subtle:#555577;--border:#222238;--border-subtle:#18182e;--border-strong:#333355}
.card{border:1px solid color-mix(in srgb,var(--primary) 40%,transparent)!important;box-shadow:var(--shadow-md)!important;background:color-mix(in srgb,var(--surface) 90%,transparent)!important;border-radius:var(--radius-md)!important}
.card-bordered{border:1px solid color-mix(in srgb,var(--primary) 40%,transparent)!important}
.card-title{text-shadow:0 0 8px color-mix(in srgb,var(--primary) 50%,transparent)}
.btn{border:1px solid color-mix(in srgb,var(--primary) 50%,transparent)!important;box-shadow:var(--shadow-sm)!important;text-transform:uppercase;letter-spacing:.05em;font-weight:700;border-radius:var(--radius-sm)!important;background:color-mix(in srgb,var(--surface) 80%,transparent)!important}
.btn:hover{box-shadow:var(--shadow-md),0 0 12px color-mix(in srgb,var(--primary) 40%,transparent)!important}
.btn-primary{border-color:var(--primary)!important;box-shadow:var(--shadow-md),0 0 12px color-mix(in srgb,var(--primary) 50%,transparent)!important;text-shadow:0 0 6px var(--primary-foreground)!important;background:var(--primary)!important}
.btn-accent{border-color:var(--accent)!important;box-shadow:var(--shadow-md),0 0 12px color-mix(in srgb,var(--accent) 50%,transparent)!important;background:var(--accent)!important}
input,textarea,select{border:1px solid color-mix(in srgb,var(--primary) 30%,transparent)!important;box-shadow:var(--shadow-xs)!important;background:color-mix(in srgb,var(--surface) 90%,transparent)!important;border-radius:var(--radius-sm)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-focus)!important;border-color:var(--primary)!important}
h1,h2,h3,h4,h5,h6{text-shadow:0 0 12px color-mix(in srgb,var(--primary) 40%,transparent),0 0 24px color-mix(in srgb,var(--primary) 20%,transparent)}
.badge,.tag,.chip{border:1px solid color-mix(in srgb,var(--primary) 40%,transparent)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.alert{border:1px solid color-mix(in srgb,var(--primary) 40%,transparent)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important;background:color-mix(in srgb,var(--surface) 90%,transparent)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
.alert-icon{border-radius:var(--radius-sm)!important}
.dropdown-menu,.modal-container,.toast{border:1px solid color-mix(in srgb,var(--primary) 40%,transparent)!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-md)!important}
pre{border:1px solid color-mix(in srgb,var(--accent) 30%,transparent)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-sm)!important}
code{border:1px solid color-mix(in srgb,var(--accent) 30%,transparent)!important;text-shadow:0 0 4px color-mix(in srgb,var(--accent) 40%,transparent)!important;border-radius:var(--radius-sm)!important}
a{text-shadow:0 0 6px color-mix(in srgb,var(--primary) 40%,transparent)}
.navbar{border-bottom:1px solid color-mix(in srgb,var(--primary) 30%,transparent)!important;background:color-mix(in srgb,var(--surface) 80%,transparent)!important}
.progress-bar{box-shadow:0 0 8px color-mix(in srgb,var(--primary) 50%,transparent)!important}
.spinner{box-shadow:0 0 8px color-mix(in srgb,var(--primary) 50%,transparent)!important}
.file-upload{border:1px solid color-mix(in srgb,var(--primary) 30%,transparent)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important}
::selection{background:var(--accent);color:var(--background);text-shadow:0 0 8px var(--accent)}
`,

'claymorphism': `
:root{--radius-sm:16px;--radius-md:20px;--radius-lg:28px;--radius-xl:36px;--shadow-xs:inset 0 -2px 4px rgba(0,0,0,.06),inset 0 2px 4px rgba(255,255,255,.4),0 2px 4px rgba(0,0,0,.06);--shadow-sm:inset 0 -3px 6px rgba(0,0,0,.08),inset 0 3px 6px rgba(255,255,255,.5),0 4px 8px rgba(0,0,0,.08);--shadow-md:inset 0 -4px 8px rgba(0,0,0,.1),inset 0 4px 8px rgba(255,255,255,.5),0 6px 12px rgba(0,0,0,.1);--shadow-lg:inset 0 -6px 12px rgba(0,0,0,.1),inset 0 6px 12px rgba(255,255,255,.5),0 8px 20px rgba(0,0,0,.1);--shadow-xl:inset 0 -8px 16px rgba(0,0,0,.12),inset 0 8px 16px rgba(255,255,255,.5),0 12px 28px rgba(0,0,0,.12);--shadow-2xl:inset 0 -10px 20px rgba(0,0,0,.14),inset 0 10px 20px rgba(255,255,255,.5),0 16px 36px rgba(0,0,0,.14);--shadow-inner:inset 0 4px 8px rgba(0,0,0,.12),inset 0 -2px 4px rgba(255,255,255,.3);--shadow-focus:0 0 0 3px color-mix(in oklch,var(--primary) 30%,transparent)}
[data-theme="dark"]{--shadow-xs:inset 0 -2px 4px rgba(0,0,0,.2),inset 0 2px 4px rgba(255,255,255,.08),0 2px 4px rgba(0,0,0,.2);--shadow-sm:inset 0 -3px 6px rgba(0,0,0,.25),inset 0 3px 6px rgba(255,255,255,.1),0 4px 8px rgba(0,0,0,.25);--shadow-md:inset 0 -4px 8px rgba(0,0,0,.3),inset 0 4px 8px rgba(255,255,255,.1),0 6px 12px rgba(0,0,0,.3);--shadow-lg:inset 0 -6px 12px rgba(0,0,0,.3),inset 0 6px 12px rgba(255,255,255,.12),0 8px 20px rgba(0,0,0,.3);--shadow-xl:inset 0 -8px 16px rgba(0,0,0,.35),inset 0 8px 16px rgba(255,255,255,.12),0 12px 28px rgba(0,0,0,.35);--shadow-2xl:inset 0 -10px 20px rgba(0,0,0,.4),inset 0 10px 20px rgba(255,255,255,.14),0 16px 36px rgba(0,0,0,.4)}
.card{border:none!important;background:var(--surface)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.card-bordered{border:1px solid var(--border)!important}
.btn{border:none!important;background:var(--surface)!important;box-shadow:var(--shadow-sm)!important;color:var(--text)!important;border-radius:var(--radius-md)!important}
.btn:hover{box-shadow:var(--shadow-md)!important}
.btn:active{box-shadow:var(--shadow-inner)!important;transform:none!important}
.btn-primary{background:var(--primary)!important;color:var(--primary-foreground)!important;box-shadow:var(--shadow-md)!important}
.btn-primary:hover{box-shadow:var(--shadow-lg)!important;background:var(--primary-hover)!important}
.btn-primary:active{box-shadow:var(--shadow-inner)!important}
input,textarea,select{border:none!important;background:var(--surface)!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important;color:var(--text)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-focus),var(--shadow-inner)!important;border:none!important}
.badge,.tag,.chip{border:none!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-full)!important}
.alert{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
.alert-icon{border-radius:var(--radius-sm)!important}
.dropdown-menu,.modal-container,.toast{border:none!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-lg)!important}
pre{border:none!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
code{border:none!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.file-upload{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.progress{box-shadow:var(--shadow-inner)!important;border:none!important;border-radius:var(--radius-full)!important}
.navbar{border:none!important;box-shadow:var(--shadow-sm)!important}
fieldset{border:none!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.accordion-item{border:none!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important}
`,

'bauhaus': `
:root{--radius-sm:0;--radius-md:0;--radius-lg:0;--radius-xl:0;--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none;--shadow-focus:0 0 0 3px var(--primary)}
[data-theme="dark"]{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none}
body{font-family:var(--font-family);letter-spacing:0}
h1,h2,h3,h4,h5,h6{font-weight:900;letter-spacing:-.02em;text-transform:uppercase}
h1{font-size:var(--font-size-5xl);border-bottom:4px solid var(--text);padding-bottom:var(--space-2)}
h2{font-size:var(--font-size-3xl);border-left:6px solid var(--primary);padding-left:var(--space-3)}
.card{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important;background:var(--surface)}
.card-bordered{border:2px solid var(--text)!important}
.card-title{font-weight:900;text-transform:uppercase;letter-spacing:-.02em}
.btn{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important;font-weight:700;text-transform:uppercase;letter-spacing:.03em}
.btn:hover{background:var(--primary);color:var(--primary-foreground);border-color:var(--text)!important}
.btn:active{transform:translate(2px,2px)}
.btn-primary{background:var(--primary);color:var(--primary-foreground);border-color:var(--text)!important}
.btn-primary:hover{background:var(--primary-hover);border-color:var(--text)!important}
input,textarea,select{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important;background:var(--surface)}
input:focus,textarea:focus,select:focus{box-shadow:none!important;border-color:var(--primary)!important;outline:2px solid var(--primary)}
.badge,.tag,.chip{border:2px solid var(--text)!important;border-radius:0!important;font-weight:700;text-transform:uppercase;box-shadow:none!important}
.alert{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
.alert:hover{box-shadow:none!important;transform:none!important}
.alert-icon{border-radius:0!important}
.dropdown-menu,.modal-container,.toast{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
pre{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
code{border:1px solid var(--text)!important;border-radius:0!important}
.navbar{border-bottom:2px solid var(--text);box-shadow:none!important}
hr{border-top:2px solid var(--text)}
.file-upload{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
.progress{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
.accordion-item{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
.accordion-trigger{border:none;border-radius:0!important}
.tab{border:2px solid transparent!important;border-radius:0!important}
.tab.active{border:2px solid var(--text)!important;border-bottom:none!important}
.pagination .page-link{border:2px solid var(--text)!important;border-radius:0!important;box-shadow:none!important}
.form-check-box{border-radius:0!important;border:2px solid var(--text)!important}
fieldset{border:2px solid var(--text)!important;box-shadow:none!important;border-radius:0!important}
`,

'organic': `
:root{--radius-sm:12px;--radius-md:20px;--radius-lg:32px;--radius-xl:48px;--shadow-xs:0 2px 6px rgba(0,0,0,.06);--shadow-sm:0 4px 12px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.3);--shadow-md:0 8px 20px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.3);--shadow-lg:0 12px 32px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.3);--shadow-xl:0 20px 48px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.3);--shadow-2xl:0 28px 64px rgba(0,0,0,.16),inset 0 1px 0 rgba(255,255,255,.3);--shadow-inner:inset 0 2px 6px rgba(0,0,0,.06)}
.card{border:none!important;border-radius:var(--radius-lg)!important;box-shadow:var(--shadow-md)!important}
.card-bordered{border:1px solid var(--border)!important}
.btn{border:none!important;border-radius:var(--radius-full)!important;box-shadow:var(--shadow-sm)!important;font-weight:600}
.btn:hover{box-shadow:var(--shadow-md)!important;transform:translateY(-1px)!important}
.btn:active{box-shadow:var(--shadow-inner)!important;transform:none!important}
.btn-primary{box-shadow:var(--shadow-md)!important}
input,textarea,select{border:none!important;border-radius:var(--radius-full)!important;box-shadow:var(--shadow-inner)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-inner),0 0 0 3px color-mix(in oklch,var(--primary) 25%,transparent)!important;border:none!important}
.badge,.tag,.chip{border:none!important;border-radius:var(--radius-full)!important;box-shadow:var(--shadow-xs)!important}
.alert{border:none!important;border-radius:var(--radius-lg)!important;box-shadow:var(--shadow-sm)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:translateY(-1px)!important}
.alert-icon{border-radius:var(--radius-full)!important}
.dropdown-menu{border:none!important;border-radius:var(--radius-md)!important;box-shadow:var(--shadow-lg)!important}
.modal-container{border:none!important;border-radius:var(--radius-lg)!important;box-shadow:var(--shadow-xl)!important}
.toast{border:none!important;border-radius:var(--radius-md)!important;box-shadow:var(--shadow-lg)!important}
pre{border:none!important;border-radius:var(--radius-md)!important;box-shadow:var(--shadow-sm)!important}
code{border:none!important;border-radius:var(--radius-full)!important;box-shadow:var(--shadow-xs)!important}
.file-upload{border:none!important;border-radius:var(--radius-lg)!important;box-shadow:var(--shadow-inner)!important}
.progress{border:none!important;border-radius:var(--radius-full)!important;box-shadow:var(--shadow-inner)!important}
.navbar{border:none!important;border-radius:0 0 var(--radius-lg) var(--radius-lg)!important;box-shadow:var(--shadow-sm)!important}
fieldset{border:none!important;border-radius:var(--radius-md)!important;box-shadow:var(--shadow-sm)!important}
.accordion-item{border:none!important;border-radius:var(--radius-md)!important;box-shadow:var(--shadow-xs)!important;overflow:hidden}
.accordion-trigger{border:none!important}
.tab{border:none!important;border-radius:var(--radius-full)!important}
.tab.active{border-radius:var(--radius-full)!important;box-shadow:var(--shadow-xs)!important}
.pagination .page-link{border:none!important;border-radius:var(--radius-full)!important;box-shadow:var(--shadow-xs)!important}
`,

'typographic': `
:root{--radius-sm:0;--radius-md:0;--radius-lg:0;--radius-xl:0;--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none;--shadow-focus:0 0 0 1px var(--primary)}
[data-theme="dark"]{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none}
body{font-size:var(--font-size-md);letter-spacing:0;line-height:1.6}
h1{font-size:var(--font-size-5xl);font-weight:900;letter-spacing:-.04em;line-height:1;border-bottom:1px solid var(--border);padding-bottom:var(--space-3);margin-bottom:var(--space-5)}
h2{font-size:var(--font-size-4xl);font-weight:800;letter-spacing:-.03em;line-height:1.1;margin-top:var(--space-6)}
h3{font-size:var(--font-size-2xl);font-weight:700;letter-spacing:-.02em}
h4{font-size:var(--font-size-xl);font-weight:700}
.card{border:none!important;border-radius:0!important;box-shadow:none!important;border-bottom:1px solid var(--border)!important;padding:var(--space-5) 0!important;background:transparent!important}
.card-bordered{border:none!important;border-bottom:1px solid var(--border)!important}
.card-header,.card-body,.card-actions{padding:0!important}
.card-title{font-weight:800;letter-spacing:-.02em}
.card-content{color:var(--text-muted);line-height:1.6}
.btn{border:none!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;font-weight:700;text-decoration:underline;text-underline-offset:3px;padding:0 var(--space-1)!important}
.btn:hover{background:transparent!important;text-decoration:underline;color:var(--primary-hover)!important}
.btn:active{transform:none!important}
.btn-primary{background:transparent!important;color:var(--primary)!important;text-decoration:underline}
.btn-primary:hover{background:transparent!important;color:var(--primary-hover)!important}
.btn-outline,.btn-ghost,.btn-secondary,.btn-contrast{background:transparent!important;text-decoration:underline}
.btn-success,.btn-warning,.btn-danger{background:transparent!important;text-decoration:underline}
.btn:disabled{text-decoration:line-through;opacity:.5}
input,textarea,select{border:none!important;border-bottom:1px solid var(--border)!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;padding:var(--space-1) 0!important}
input:focus,textarea:focus,select:focus{box-shadow:none!important;border-bottom-color:var(--primary)!important}
.field-label{background:transparent!important}
.field-label::before{background:transparent!important}
.badge,.tag,.chip{border:none!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;font-weight:700;text-transform:uppercase;letter-spacing:.05em;font-size:var(--font-size-xs);padding:0!important;color:var(--text-muted)!important}
.badge::before,.chip::before{content:"["}.badge::after,.chip::after{content:"]"}
.alert{border:none!important;border-radius:0!important;box-shadow:none!important;border-left:3px solid var(--primary)!important;padding-left:var(--space-4)!important;background:transparent!important}
.alert:hover{box-shadow:none!important;transform:none!important}
.alert-icon{background:transparent!important}
.dropdown-menu,.modal-container,.toast{border:1px solid var(--border)!important;border-radius:0!important;box-shadow:none!important}
pre{border:none!important;border-left:2px solid var(--border)!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;padding-left:var(--space-4)!important}
code{background:transparent!important;border:none!important;border-radius:0!important;font-weight:600}
.navbar{border-bottom:1px solid var(--border);box-shadow:none!important;background:transparent!important}
.nav-brand{font-weight:900;letter-spacing:-.03em}
.nav-link{text-decoration:none;font-weight:600}
.nav-link.active{text-decoration:underline}
hr{border-top:1px solid var(--border)}
.file-upload{border:1px dashed var(--border)!important;border-radius:0!important;box-shadow:none!important;background:transparent!important}
.progress{border-radius:0!important;box-shadow:none!important;height:2px;background:var(--border)!important}
.progress-bar{background:var(--text)!important}
.accordion-item{border:none!important;border-bottom:1px solid var(--border)!important;border-radius:0!important;box-shadow:none!important}
.accordion-trigger{border:none!important;font-weight:700}
fieldset{border:none!important;border-radius:0!important;box-shadow:none!important;border-top:1px solid var(--border)!important;padding-top:var(--space-3)!important;background:transparent!important}
.tab{border:none!important;border-radius:0!important;box-shadow:none!important;font-weight:600}
.tab.active{border:none!important;border-bottom:1px solid var(--text)!important;background:transparent!important}
.pagination .page-link{border:none!important;border-radius:0!important;box-shadow:none!important;background:transparent!important;font-weight:600}
.pagination .page-item.active .page-link{text-decoration:underline}
`,

'minimalism-mono': `
:root{--radius-sm:0;--radius-md:0;--radius-lg:0;--radius-xl:0;--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none;--shadow-focus:0 0 0 1px var(--text)}
[data-theme="dark"]{--shadow-xs:none;--shadow-sm:none;--shadow-md:none;--shadow-lg:none;--shadow-xl:none;--shadow-2xl:none;--shadow-inner:none}
[data-theme="light"] body{background:#fafafa;color:#1a1a1a}
[data-theme="dark"] body{background:#0a0a0a;color:#e8e8e8}
[data-theme="light"]{--border:#e0e0e0;--border-subtle:#f0f0f0;--border-strong:#ccc;--surface:#fff;--surface-elevated:#f5f5f5;--surface-hover:#f0f0f0;--surface-active:#eee;--text-muted:#999;--text-subtle:#bbb;--primary:#1a1a1a;--primary-foreground:#fafafa;--accent:#1a1a1a;--accent-foreground:#fafafa}
[data-theme="dark"]{--border:#222;--border-subtle:#1a1a1a;--border-strong:#333;--surface:#111;--surface-elevated:#181818;--surface-hover:#1a1a1a;--surface-active:#222;--text-muted:#888;--text-subtle:#555;--primary:#e8e8e8;--primary-foreground:#0a0a0a;--accent:#e8e8e8;--accent-foreground:#0a0a0a}
.card{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important;background:var(--surface)!important}
.card-bordered{border:1px solid var(--border)!important}
.card-title{font-weight:600}
.btn{border:1px solid var(--text)!important;box-shadow:none!important;border-radius:0!important;font-weight:500;background:transparent!important;color:var(--text)!important}
.btn:hover{background:var(--text)!important;color:var(--background)!important}
.btn-primary{background:var(--text)!important;color:var(--background)!important;border-color:var(--text)!important}
.btn-primary:hover{background:var(--background)!important;color:var(--text)!important}
input,textarea,select{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important;background:transparent!important}
input:focus,textarea:focus,select:focus{box-shadow:none!important;border-color:var(--text)!important}
.badge,.tag,.chip{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important;font-weight:500}
.alert{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important}
.alert:hover{box-shadow:none!important;transform:none!important}
.alert-icon{border-radius:0!important}
.dropdown-menu,.modal-container,.toast{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important}
pre{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important}
code{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important}
.navbar{border-bottom:1px solid var(--border);box-shadow:none!important;background:transparent!important}
hr{border-top:1px solid var(--border)}
.file-upload{border:1px dashed var(--border)!important;box-shadow:none!important;border-radius:0!important}
.progress{border:1px solid var(--border)!important;box-shadow:none!important;border-radius:0!important}
.accordion-item{border:1px solid var(--border)!important;border-radius:0!important;box-shadow:none!important}
fieldset{border:1px solid var(--border)!important;border-radius:0!important;box-shadow:none!important}
.tab{border:none!important;border-radius:0!important;box-shadow:none!important;border-bottom:1px solid transparent!important}
.tab.active{border-bottom:1px solid var(--text)!important}
a{text-decoration:underline;text-underline-offset:2px}
a:hover{text-decoration:none}
`,

'papercut': `
:root{--radius-sm:0;--radius-md:2px;--radius-lg:4px;--shadow-xs:1px 1px 0 var(--border-strong),2px 2px 3px rgba(0,0,0,.06);--shadow-sm:2px 2px 0 var(--border-strong),4px 4px 6px rgba(0,0,0,.08);--shadow-md:3px 3px 0 var(--border-strong),6px 6px 8px rgba(0,0,0,.1);--shadow-lg:4px 4px 0 var(--border-strong),8px 8px 12px rgba(0,0,0,.12);--shadow-xl:5px 5px 0 var(--border-strong),10px 10px 16px rgba(0,0,0,.14);--shadow-2xl:6px 6px 0 var(--border-strong),12px 12px 20px rgba(0,0,0,.16);--shadow-inner:inset 0 0 0 1px var(--border-subtle),inset 1px 1px 2px rgba(0,0,0,.04);--shadow-focus:0 0 0 2px var(--primary)}
[data-theme="dark"]{--shadow-xs:1px 1px 0 var(--border-strong),2px 2px 3px rgba(0,0,0,.3);--shadow-sm:2px 2px 0 var(--border-strong),4px 4px 6px rgba(0,0,0,.3);--shadow-md:3px 3px 0 var(--border-strong),6px 6px 8px rgba(0,0,0,.35);--shadow-lg:4px 4px 0 var(--border-strong),8px 8px 12px rgba(0,0,0,.4);--shadow-xl:5px 5px 0 var(--border-strong),10px 10px 16px rgba(0,0,0,.45);--shadow-2xl:6px 6px 0 var(--border-strong),12px 12px 20px rgba(0,0,0,.5)}
.card{border:1px solid var(--border)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-md)!important;background:var(--surface)!important;position:relative}
.card::after{content:"";position:absolute;inset:0;z-index:-1;background:var(--surface-elevated);border:1px solid var(--border);border-radius:var(--radius-md);transform:translate(3px,3px)}
.card:hover{box-shadow:var(--shadow-lg)!important;transform:translate(-1px,-1px)}
.card-bordered{border:1px solid var(--border)!important}
.card-title{font-weight:700}
.btn{border:1px solid var(--border)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important;background:var(--surface)!important}
.btn:hover{box-shadow:var(--shadow-md)!important;transform:translate(-1px,-1px)}
.btn:active{box-shadow:var(--shadow-xs)!important;transform:translate(1px,1px)}
.btn-primary{background:var(--primary)!important;color:var(--primary-foreground)!important}
.btn-primary:hover{background:var(--primary-hover)!important;box-shadow:var(--shadow-md)!important}
input,textarea,select{border:1px solid var(--border)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-focus),var(--shadow-xs)!important}
.badge,.tag,.chip{border:1px solid var(--border)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important}
.alert{border:1px solid var(--border)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:translate(-1px,-1px)}
.alert-icon{border-radius:var(--radius-sm)!important}
.dropdown-menu,.modal-container,.toast{border:1px solid var(--border)!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-md)!important}
pre{border:1px solid var(--border)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
code{border:1px solid var(--border)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.navbar{border-bottom:1px solid var(--border);box-shadow:var(--shadow-xs)!important}
.file-upload{border:1px dashed var(--border)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.progress{border:1px solid var(--border)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.accordion-item{border:1px solid var(--border)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important;margin-bottom:var(--space-2);overflow:hidden}
.accordion-trigger{border-radius:0!important}
fieldset{border:1px solid var(--border)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important}
`,

'skeuomorphism-classic': `
:root{--radius-sm:4px;--radius-md:8px;--radius-lg:12px;--shadow-xs:inset 0 1px 0 rgba(255,255,255,.4),inset 0 -1px 0 rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.12);--shadow-sm:inset 0 1px 0 rgba(255,255,255,.4),inset 0 -1px 0 rgba(0,0,0,.1),0 2px 4px rgba(0,0,0,.15);--shadow-md:inset 0 1px 0 rgba(255,255,255,.4),inset 0 -2px 0 rgba(0,0,0,.12),0 4px 8px rgba(0,0,0,.18);--shadow-lg:inset 0 1px 0 rgba(255,255,255,.45),inset 0 -2px 0 rgba(0,0,0,.14),0 8px 16px rgba(0,0,0,.2);--shadow-xl:inset 0 1px 0 rgba(255,255,255,.45),inset 0 -3px 0 rgba(0,0,0,.16),0 12px 24px rgba(0,0,0,.24);--shadow-2xl:inset 0 1px 0 rgba(255,255,255,.5),inset 0 -3px 0 rgba(0,0,0,.18),0 20px 40px rgba(0,0,0,.28);--shadow-inner:inset 0 2px 4px rgba(0,0,0,.2),inset 0 -1px 0 rgba(255,255,255,.15)}
[data-theme="dark"]{--shadow-xs:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -1px 0 rgba(0,0,0,.3),0 1px 2px rgba(0,0,0,.3);--shadow-sm:inset 0 1px 0 rgba(255,255,255,.12),inset 0 -1px 0 rgba(0,0,0,.35),0 2px 4px rgba(0,0,0,.35);--shadow-md:inset 0 1px 0 rgba(255,255,255,.12),inset 0 -2px 0 rgba(0,0,0,.4),0 4px 8px rgba(0,0,0,.4);--shadow-lg:inset 0 1px 0 rgba(255,255,255,.15),inset 0 -2px 0 rgba(0,0,0,.45),0 8px 16px rgba(0,0,0,.45);--shadow-xl:inset 0 1px 0 rgba(255,255,255,.15),inset 0 -3px 0 rgba(0,0,0,.5),0 12px 24px rgba(0,0,0,.5);--shadow-2xl:inset 0 1px 0 rgba(255,255,255,.18),inset 0 -3px 0 rgba(0,0,0,.55),0 20px 40px rgba(0,0,0,.55);--shadow-inner:inset 0 3px 6px rgba(0,0,0,.4),inset 0 -1px 0 rgba(255,255,255,.05)}
.card{border:1px solid var(--border-strong)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;box-shadow:var(--shadow-md)!important;border-radius:var(--radius-lg)!important}
.card-bordered{border:1px solid var(--border-strong)!important}
.btn{border:1px solid var(--border-strong)!important;background:linear-gradient(180deg,color-mix(in srgb,var(--surface) 92%,white) 0%,var(--surface) 100%)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-md)!important}
.btn:active{box-shadow:var(--shadow-inner)!important;transform:translateY(1px)!important}
.btn-primary{background:linear-gradient(180deg,color-mix(in srgb,var(--primary) 85%,white) 0%,var(--primary) 100%)!important;border-color:var(--primary)!important;box-shadow:var(--shadow-md)!important}
.btn-primary:hover{background:linear-gradient(180deg,color-mix(in srgb,var(--primary-hover) 88%,white) 0%,var(--primary-hover) 100%)!important}
.btn-primary:active{background:linear-gradient(180deg,var(--primary) 0%,color-mix(in srgb,var(--primary) 85%,white) 100%)!important;box-shadow:var(--shadow-inner)!important}
input,textarea,select{background:linear-gradient(180deg,var(--surface-active) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
input:focus,textarea:focus,select:focus{box-shadow:var(--shadow-inner),0 0 0 2px var(--primary)!important;border-color:var(--primary)!important}
.badge,.chip{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-sm)!important}
.alert{border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important}
.alert:hover{box-shadow:var(--shadow-md)!important;transform:none!important}
.alert-icon{border-radius:var(--radius-sm)!important}
.navbar{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border-bottom:1px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important}
pre{background:linear-gradient(180deg,var(--surface-active) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-inner)!important;border-radius:var(--radius-md)!important}
code{background:linear-gradient(180deg,var(--surface-active) 0%,var(--surface) 100%)!important;border:1px solid var(--border)!important;box-shadow:inset 0 1px 2px rgba(0,0,0,.15)!important;border-radius:var(--radius-sm)!important}
.progress{box-shadow:var(--shadow-inner)!important;border:1px solid var(--border-strong)!important;border-radius:var(--radius-sm)!important}
.progress-bar{background:linear-gradient(180deg,color-mix(in srgb,var(--primary) 80%,white) 0%,var(--primary) 100%)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.3),inset 0 -1px 0 rgba(0,0,0,.1)!important}
.file-upload{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.dropdown-menu,.modal-container,.toast{background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-lg)!important;border-radius:var(--radius-lg)!important}
fieldset{border:1px solid var(--border-strong)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;box-shadow:var(--shadow-sm)!important;border-radius:var(--radius-lg)!important}
.accordion-item{border:1px solid var(--border-strong)!important;box-shadow:var(--shadow-xs)!important;border-radius:var(--radius-md)!important}
.spinner{box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 1px 3px rgba(0,0,0,.15)!important}
input[type="range"]::-webkit-slider-thumb{box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 1px 3px rgba(0,0,0,.15)!important;border:1px solid var(--border-strong)!important}
.form-check-box{box-shadow:inset 0 1px 0 rgba(255,255,255,.3),inset 0 -1px 0 rgba(0,0,0,.1),0 1px 2px rgba(0,0,0,.12)!important;border:1px solid var(--border-strong)!important;background:linear-gradient(180deg,var(--surface-elevated) 0%,var(--surface) 100%)!important;border-radius:var(--radius-sm)!important}
.form-check input:checked+.form-check-box{background:linear-gradient(180deg,color-mix(in srgb,var(--primary) 85%,white) 0%,var(--primary) 100%)!important;border-color:var(--primary)!important}
`,
};

function styleCSS(styleId) {
  return STYLE_CSS[styleId] || '';
}

/* === style-engine.js === */




const FONTS_ARR = FONTS;
const MONO_ARR = MONO_FONTS;

const STYLE_PALETTE_CONFIG = {
  'default':           { hueShift: 137.5, neutralC: 0.40, contrastL: 0.75, accentC: 1.0 },
  'flat':              { hueShift: 137.5, neutralC: 0.30, contrastL: 0.70, accentC: 0.95 },
  'material':          { hueShift: 150,   neutralC: 0.35, contrastL: 0.72, accentC: 1.0 },
  'neumorphism':       { hueShift: 0,     neutralC: 0.15, contrastL: 0.60, accentC: 0.80, monoNeutral: true },
  'glassmorphism':     { hueShift: 120,   neutralC: 0.25, contrastL: 0.68, accentC: 0.90 },
  'brutalism':         { hueShift: 180,   neutralC: 0.00, contrastL: 0.50, accentC: 1.0, highContrast: true },
  'maximalism':        { hueShift: 120,   neutralC: 0.50, contrastL: 0.80, accentC: 1.0, vibrant: true },
  'skeuomorphism':     { hueShift: 137.5, neutralC: 0.35, contrastL: 0.72, accentC: 0.95 },
  'skeuominimalism':   { hueShift: 137.5, neutralC: 0.30, contrastL: 0.70, accentC: 0.90 },
  'dark-highcontrast': { hueShift: 180,   neutralC: 0.00, contrastL: 0.40, accentC: 1.0, highContrast: true },
  'retro-8bit':        { hueShift: 90,    neutralC: 0.00, contrastL: 0.50, accentC: 1.0, highContrast: true },
  'cyberpunk':         { hueShift: 300,   neutralC: 0.20, contrastL: 0.55, accentC: 1.0, neon: true },
  'claymorphism':      { hueShift: 137.5, neutralC: 0.25, contrastL: 0.70, accentC: 0.90, soft: true },
  'bauhaus':           { hueShift: 120,   neutralC: 0.00, contrastL: 0.50, accentC: 1.0, highContrast: true },
  'organic':           { hueShift: 150,   neutralC: 0.30, contrastL: 0.72, accentC: 0.90, soft: true },
  'typographic':       { hueShift: 137.5, neutralC: 0.20, contrastL: 0.60, accentC: 0.85 },
  'minimalism-mono':   { hueShift: 0,     neutralC: 0.00, contrastL: 0.50, accentC: 0.00, mono: true },
  'papercut':          { hueShift: 137.5, neutralC: 0.25, contrastL: 0.68, accentC: 0.90 },
  'skeuomorphism-classic': { hueShift: 137.5, neutralC: 0.35, contrastL: 0.72, accentC: 0.95 },
};

function generateCoreForStyle(primaryInput, styleId) {
  const cfg = STYLE_PALETTE_CONFIG[styleId] || STYLE_PALETTE_CONFIG['default'];
  const Primary = gamutMap({ ...primaryInput });

  let accentC = Primary.C * cfg.accentC;
  if (cfg.vibrant) accentC = Math.min(accentC * 1.15, 0.32);
  if (cfg.neon) accentC = Math.min(Primary.C * 1.2, 0.30);

  const Accent = gamutMap({
    L: cfg.neon ? Math.max(Primary.L, 0.65) : Primary.L,
    C: accentC,
    H: rotateHue(Primary.H, cfg.hueShift),
  });

  let neutralC = Primary.C * cfg.neutralC;
  if (cfg.mono || cfg.highContrast) neutralC = 0;

  const Neutral = gamutMap({
    L: Primary.L,
    C: neutralC,
    H: Primary.H,
  });

  let contrastL = cfg.contrastL;
  if (cfg.highContrast) contrastL = 0.45;
  if (cfg.neon) contrastL = 0.55;

  const Contrast = gamutMap({
    L: clamp(Accent.L * contrastL, 0.15, 0.85),
    C: cfg.mono ? 0 : (cfg.highContrast ? Accent.C * 0.8 : Accent.C),
    H: Accent.H,
  });

  return { Primary, Accent, Neutral, Contrast, styleConfig: cfg };
}

const STYLE_FONT_PREFS = {
  'default':           { headingTags: [],                         bodyTags: ['readable','clean'],         monoPref: null },
  'flat':              { headingTags: ['geometric','clean'],       bodyTags: ['clean','readable'],         monoPref: 'JetBrains Mono' },
  'material':          { headingTags: ['geometric','modern'],     bodyTags: ['readable','clean'],         monoPref: 'Roboto Mono' },
  'neumorphism':       { headingTags: ['rounded','soft'],         bodyTags: ['rounded','soft','clean'],    monoPref: 'JetBrains Mono' },
  'glassmorphism':     { headingTags: ['geometric','modern'],     bodyTags: ['clean','readable'],         monoPref: 'JetBrains Mono' },
  'brutalism':         { headingTags: ['grotesque','bold'],       bodyTags: ['grotesque','clean'],        monoPref: 'Space Mono' },
  'maximalism':        { headingTags: ['display','bold'],        bodyTags: ['readable','humanist'],      monoPref: 'JetBrains Mono' },
  'skeuomorphism':     { headingTags: ['humanist','classic'],    bodyTags: ['humanist','readable'],      monoPref: 'Source Code Pro' },
  'skeuominimalism':   { headingTags: ['geometric','clean'],     bodyTags: ['clean','readable'],         monoPref: 'JetBrains Mono' },
  'dark-highcontrast': { headingTags: ['grotesque','classic'],   bodyTags: ['grotesque','readable'],     monoPref: 'JetBrains Mono' },
  'retro-8bit':        { headingTags: ['tech'],                  bodyTags: ['tech','clean'],             monoPref: 'Space Mono' },
  'cyberpunk':         { headingTags: ['tech','geometric'],      bodyTags: ['tech','clean'],             monoPref: 'JetBrains Mono' },
  'claymorphism':      { headingTags: ['rounded','soft','modern'], bodyTags: ['rounded','soft','readable'], monoPref: 'DM Mono' },
  'bauhaus':           { headingTags: ['grotesque','geometric'],  bodyTags: ['grotesque','readable'],     monoPref: 'JetBrains Mono' },
  'organic':           { headingTags: ['rounded','humanist'],    bodyTags: ['rounded','readable','soft'], monoPref: 'Spline Sans Mono' },
  'typographic':       { headingTags: ['serif','display'],      bodyTags: ['serif','readable','body'],   monoPref: 'Source Code Pro' },
  'minimalism-mono':   { headingTags: ['grotesque','clean'],     bodyTags: ['grotesque','clean'],        monoPref: 'JetBrains Mono' },
  'papercut':          { headingTags: ['grotesque','editorial'], bodyTags: ['grotesque','readable'],     monoPref: 'Azeret Mono' },
  'skeuomorphism-classic': { headingTags: ['humanist','classic'], bodyTags: ['humanist','readable'],     monoPref: 'Source Code Pro' },
};

function autoPairForStyle(headingFont, styleId) {
  const pref = STYLE_FONT_PREFS[styleId] || STYLE_FONT_PREFS['default'];
  const headingEntries = FONTS_ARR.filter(f => f.name === headingFont);
  const headingTags = new Set(headingEntries.flatMap(e => e.tags));
  const isSerifHeading = headingTags.has('serif');
  const isDisplayHeading = headingTags.has('display');

  const candidates = FONTS_ARR.filter(f => {
    const tags = new Set(f.tags);
    if (tags.has('mono')) return false;
    if (isDisplayHeading && tags.has('display')) return false;
    return true;
  });

  let best = null;
  let bestScore = -Infinity;

  for (const c of candidates) {
    const cTags = new Set(c.tags);
    let score = 0;

    if (c.name === headingFont) score += 80;

    for (const t of pref.bodyTags) {
      if (cTags.has(t)) score += 50;
    }

    if (cTags.has('body') || cTags.has('readable')) score += 40;
    if (cTags.has('sans')) score += 20;

    if (isSerifHeading && cTags.has('sans')) score += 45;
    if (isDisplayHeading && (cTags.has('body') || cTags.has('readable'))) score += 35;

    for (const t of headingTags) {
      if (cTags.has(t) && t !== 'display') score += 15;
    }

    if (cTags.has('display')) score -= 80;

    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }

  return best?.name || 'Inter';
}

function autoMonoForStyle(headingFont, bodyFont, styleId) {
  const pref = STYLE_FONT_PREFS[styleId] || STYLE_FONT_PREFS['default'];
  if (pref.monoPref) return pref.monoPref;

  const headingEntries = FONTS_ARR.filter(e => e.name === headingFont);
  for (const e of headingEntries) {
    if (e.pairWith && MONO_ARR.includes(e.pairWith)) return e.pairWith;
  }

  const tags = new Set([
    ...headingEntries.flatMap(e => e.tags),
    ...(FONTS_ARR.filter(f => f.name === bodyFont).flatMap(f => f.tags)),
  ]);

  let best = 'JetBrains Mono';
  let bestScore = -Infinity;

  for (const monoName of MONO_ARR) {
    const monoEntry = FONTS_ARR.find(f => f.name === monoName);
    const monoTags = new Set(monoEntry?.tags ?? []);
    let score = 0;

    for (const t of tags) {
      if (monoTags.has(t)) score += 15;
    }

    if (score > bestScore) {
      bestScore = score;
      best = monoName;
    }
  }

  return best;
}

/* === contrast-engine.js === */


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

function auditContrast(lightTheme, darkTheme) {
  const checks = (theme, mode) => criticalPairs(theme).map(([fg, bg]) => ({
    mode, fgField: fg, bgField: bg,
    ratio: +contrastRatio(theme[fg], theme[bg]).toFixed(2),
    target: pickTargetRatio(fg, bg),
    pass: contrastRatio(theme[fg], theme[bg]) >= pickTargetRatio(fg, bg),
  }));
  return [...checks(lightTheme, 'light'), ...checks(darkTheme, 'dark')];
}

function bestForegroundFor(bg, target) {
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

function bestBackgroundFor(fg, target, baseBg) {
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

function fixTheme(theme, isDark) {
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

function validateAndFix(lightTheme, darkTheme) {
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

/* === visibility-engine.js === */



const VIS_AA_NORMAL = 4.5;
const VIS_AA_LARGE = 3.0;
const VIS_TOKEN_MATCH_TOLERANCE = 0.05;

function isLargeText(cs) {
  const size = parseFloat(cs.fontSize) || 16;
  const weight = parseInt(cs.fontWeight, 10) || 400;
  return size >= 24 || (size >= 18.66 && weight >= 700);
}

function isVisible(el) {
  if (!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)) return false;
  const cs = getComputedStyle(el);
  return cs.visibility !== 'hidden' && cs.display !== 'none' && parseFloat(cs.opacity) > 0;
}

function hasOwnText(el) {
  for (const n of el.childNodes) {
    if (n.nodeType === 3 && n.textContent.trim()) return true;
  }
  return false;
}

function bgAlpha(str) {
  const m = str.match(/rgba?\(([^)]+)\)/);
  if (!m) return 1;
  const parts = m[1].split(',');
  return parts[3] !== undefined ? parseFloat(parts[3]) : 1;
}

function resolveBackground(el) {
  let node = el;
  while (node) {
    const cs = getComputedStyle(node);
    if (bgAlpha(cs.backgroundColor) > 0) {
      const oc = parseColor(cs.backgroundColor);
      if (oc) return oc;
    }
    node = node.parentElement;
  }
  return parseColor('rgb(255,255,255)');
}

function pickRandom(arr, n) {
  const pool = arr.slice();
  const out = [];
  while (pool.length && out.length < n) {
    const i = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(i, 1)[0]);
  }
  return out;
}

function hueDist(a, b) {
  return Math.min(Math.abs(a - b), 360 - Math.abs(a - b));
}

function matchToken(oc, tokens) {
  let best = null, bestDist = Infinity;
  for (const [name, val] of Object.entries(tokens)) {
    if (!val) continue;
    const d = Math.hypot(oc.L - val.L, oc.C - val.C, hueDist(oc.H, val.H) / 100);
    if (d < bestDist) { bestDist = d; best = name; }
  }
  return bestDist < VIS_TOKEN_MATCH_TOLERANCE ? best : null;
}

function sampleTextElements(root = document.body, count = 8) {
  const all = Array.from(root.querySelectorAll('*')).filter((el) => hasOwnText(el) && isVisible(el));
  return pickRandom(all, count);
}

function checkElementVisibility(el) {
  const cs = getComputedStyle(el);
  const fg = parseColor(cs.color);
  const bg = resolveBackground(el);
  if (!fg || !bg) return null;
  const ratio = contrastRatio(fg, bg);
  const target = isLargeText(cs) ? VIS_AA_LARGE : VIS_AA_NORMAL;
  return { el, fg, bg, ratio: +ratio.toFixed(2), target, pass: ratio >= target };
}

function requestColorFix(check, tokens) {
  const fgVar = matchToken(check.fg, tokens);
  if (!fgVar) return null;
  const fixedFg = bestForegroundFor(check.bg, check.target);
  if (!fixedFg || contrastRatio(fixedFg, check.bg) <= check.ratio) return null;
  tokens[fgVar] = fixedFg;
  document.documentElement.style.setProperty(fgVar, oklchStr(fixedFg));
  return { varName: fgVar, from: check.fg, to: fixedFg, ratio: +contrastRatio(fixedFg, check.bg).toFixed(2) };
}

function runVisibilityAudit({ root = document.body, sampleSize = 8, tokens = null } = {}) {
  const sample = sampleTextElements(root, sampleSize);
  const results = sample.map(checkElementVisibility).filter(Boolean);
  const failures = results.filter((r) => !r.pass);
  const fixes = tokens ? failures.map((f) => requestColorFix(f, tokens)).filter(Boolean) : [];
  return { checked: results.length, failed: failures.length, fixes };
}

function startVisibilityWatch({ root, sampleSize = 6, tokens = null, minDelay = 4000, maxDelay = 12000, onAudit } = {}) {
  let stopped = false;
  function tick() {
    if (stopped) return;
    const report = runVisibilityAudit({ root, sampleSize, tokens });
    if (onAudit) onAudit(report);
    const delay = minDelay + Math.random() * (maxDelay - minDelay);
    setTimeout(tick, delay);
  }
  const first = minDelay + Math.random() * (maxDelay - minDelay);
  setTimeout(tick, first);
  return () => { stopped = true; };
}


/* === main.js === */









function generateTheme(primaryInput, fontConfig = {}, styleId = 'default') {
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


if (typeof window !== 'undefined') {
  window.__generateTheme = generateTheme;
}

global.ThemeEngine = { generateTheme, autoPair, autoMono, autoPairForStyle, autoMonoForStyle, generateCoreForStyle, fontCssUrl, FONTS, MONO_FONTS, STYLE_IDS, STYLE_LABELS, runVisibilityAudit, startVisibilityWatch };
})(typeof window !== 'undefined' ? window : this);
