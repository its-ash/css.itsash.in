import { gamutMap, findForeground, withLightness } from './color.js';

export function rotateHue(h, deg) {
  return ((h + deg) % 360 + 360) % 360;
}

export function generateCore(primaryInput) {
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

export function generateSemanticLight(core) {
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

export function generateSemanticDark(core) {
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

export function adjustForDark(oc) {
  const L = Math.min(oc.L + (0.7 - oc.L) * 0.45, 0.78);
  return gamutMap({ ...oc, L });
}

export function generateThemes(core) {
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