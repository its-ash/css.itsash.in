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

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
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

export function oklabToOklch({ L, a, b }) {
  return { L, C: Math.hypot(a, b), H: (Math.atan2(b, a) * 180) / Math.PI };
}
export function oklchToOklab({ L, C, H }) {
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

export function oklchToLinSrgb(oc) {
  return oklabToLin(oklchToOklab(oc));
}

export function isInGamut(oc) {
  const { r, g, b } = oklchToLinSrgb(oc);
  const eps = 1e-4;
  return r >= -eps && r <= 1 + eps && g >= -eps && g <= 1 + eps && b >= -eps && b <= 1 + eps;
}

export function gamutMap(oc) {
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

export function oklchToSrgb01(oc) {
  const g = gamutMap(oc);
  const { r, g: gr, b } = oklchToLinSrgb(g);
  return {
    r: clamp(linToSrgb(clamp(r))),
    g: clamp(linToSrgb(clamp(gr))),
    b: clamp(linToSrgb(clamp(b))),
  };
}

export function oklchToHex(oc) {
  const { r, g, b } = oklchToSrgb01(oc);
  const h = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

export function oklchToRgb(oc) {
  const { r, g, b } = oklchToSrgb01(oc);
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

export function oklchStr(oc, opts = {}) {
  const { C, H, L } = oc;
  const c = +C.toFixed(4), h = +H.toFixed(2), l = +L.toFixed(4);
  if (opts.alpha != null && opts.alpha < 1) {
    return `oklch(${l} ${c} ${h} / ${+opts.alpha.toFixed(2)})`;
  }
  return `oklch(${l} ${c} ${h})`;
}

export function relativeLuminance(oc) {
  const { r, g, b } = oklchToSrgb01(oc);
  const R = srgbToLin(r), G = srgbToLin(g), B = srgbToLin(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function contrastRatio(a, b) {
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

export function parseColor(input) {
  const s = String(input).trim().toLowerCase();
  try {
    if (s.startsWith('oklch')) return gamutMap(fromOklchStr(s));
    if (s.startsWith('hsl')) return gamutMap(fromHslStr(s));
    if (s.startsWith('rgb')) return gamutMap(fromRgbStr(s));
    if (s.startsWith('#') || /^[0-9a-f]{3,8}$/i.test(s)) return gamutMap(fromHexStr(s));
  } catch (e) {}
  return null;
}

export function mixOklch(a, b, t) {
  return {
    L: a.L + (b.L - a.L) * t,
    C: a.C + (b.C - a.C) * t,
    H: a.H,
  };
}

export function findForeground(bg, targetRatio = 4.5, preferLight = null) {
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

export function withLightness(oc, L) {
  return gamutMap({ ...oc, L });
}
export function withChroma(oc, C) {
  return gamutMap({ ...oc, C });
}