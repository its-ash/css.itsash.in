import { gamutMap, withLightness, clamp } from './color.js';
import { rotateHue } from './palette.js';
import { FONTS, MONO_FONTS } from './fonts.js';

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

export function generateCoreForStyle(primaryInput, styleId) {
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

export function autoPairForStyle(headingFont, styleId) {
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

export function autoMonoForStyle(headingFont, bodyFont, styleId) {
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