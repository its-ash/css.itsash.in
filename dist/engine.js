function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const num = parseInt(n, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex({ r, g, b }) {
  const c = v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

function hslToRgb({ h, s, l }) {
  h = ((h % 360) + 360) % 360;
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let rp, gp, bp;
  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  return { r: (rp + m) * 255, g: (gp + m) * 255, b: (bp + m) * 255 };
}

function relLuminance({ r, g, b }) {
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrastRatio(hexA, hexB) {
  const lA = relLuminance(hexToRgb(hexA));
  const lB = relLuminance(hexToRgb(hexB));
  const [hi, lo] = lA > lB ? [lA, lB] : [lB, lA];
  return (hi + 0.05) / (lo + 0.05);
}

function rotateHue(hex, deg) {
  const hsl = rgbToHsl(hexToRgb(hex));
  return rgbToHex(hslToRgb({ ...hsl, h: hsl.h + deg }));
}

function desaturate(hex, amount) {
  const hsl = rgbToHsl(hexToRgb(hex));
  return rgbToHex(hslToRgb({ ...hsl, s: Math.max(0, Math.min(100, hsl.s + amount)) }));
}

function adjustLightness(hex, amount) {
  const hsl = rgbToHsl(hexToRgb(hex));
  return rgbToHex(hslToRgb({ ...hsl, l: Math.max(0, Math.min(100, hsl.l + amount)) }));
}

function toRgbTriplet(hex) {
  const { r, g, b } = hexToRgb(hex);
  return `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;
}

function generatePalette(primaryHex, mode = 'light') {
  const primary = primaryHex;
  const neutral = desaturate(primary, -60);

  const success = rotateHue(primary, 100);
  const danger = rotateHue(primary, -160);
  const warning = rotateHue(primary, 40);
  const info = rotateHue(primary, 190);

  const isDark = mode === 'dark';
  const bodyBg = isDark ? '#0a0a0a' : '#ffffff';
  const bodyColor = isDark ? '#e9ecef' : '#212529';

  const fixed = {
    primary,
    secondary: neutral,
    success,
    danger,
    warning,
    info,
  };

  const onColor = bgHex => {
    const hsl = rgbToHsl(hexToRgb(bgHex));
    return hsl.l > 50 ? '#000000' : '#ffffff';
  };

  const on = {
    onPrimary: onColor(fixed.primary),
    onSecondary: onColor(fixed.secondary),
    onSuccess: onColor(fixed.success),
    onDanger: onColor(fixed.danger),
    onWarning: onColor(fixed.warning),
    onInfo: onColor(fixed.info),
  };

  return {
    mode,
    bodyBg,
    bodyColor,
    ...fixed,
    ...on,
    light: isDark ? '#1a1a1a' : '#f8f9fa',
    dark: isDark ? '#000000' : '#212529',
  };
}

function paletteToCssVars(p) {
  const lines = [':root {'];
  const push = (name, hex) => {
    lines.push(`  --bulma-${name}: ${hex};`);
    lines.push(`  --bulma-${name}-rgb: ${toRgbTriplet(hex)};`);
  };
  push('primary', p.primary);
  push('link', p.secondary);
  push('success', p.success);
  push('danger', p.danger);
  push('warning', p.warning);
  push('info', p.info);
  push('light', p.light);
  push('dark', p.dark);
  lines.push(`  --bulma-body-background-color: ${p.bodyBg};`);
  lines.push(`  --bulma-body-background-color-rgb: ${toRgbTriplet(p.bodyBg)};`);
  lines.push(`  --bulma-body-color: ${p.bodyColor};`);
  lines.push(`  --bulma-body-color-rgb: ${toRgbTriplet(p.bodyColor)};`);
  lines.push(`  --bulma-on-primary: ${p.onPrimary};`);
  lines.push(`  --bulma-on-link: ${p.onSecondary};`);
  lines.push('}');
  return lines.join('\n');
}

function paletteToScssVars(p) {
  return [
    `$primary: ${p.primary};`,
    `$link: ${p.secondary};`,
    `$success: ${p.success};`,
    `$danger: ${p.danger};`,
    `$warning: ${p.warning};`,
    `$info: ${p.info};`,
    `$light: ${p.light};`,
    `$dark: ${p.dark};`,
    `$body-background-color: ${p.bodyBg};`,
    `$body-color: ${p.bodyColor};`,
  ].join('\n');
}

window.ThemeEngine = {
  generatePalette,
  paletteToCssVars,
  paletteToScssVars,
  contrastRatio,
  hexToRgb,
  rgbToHex,
  rotateHue,
  desaturate,
  adjustLightness,
};
