import { parseColor, contrastRatio, oklchStr } from './color.js';
import { bestForegroundFor } from './contrast-engine.js';

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

export function sampleTextElements(root = document.body, count = 8) {
  const all = Array.from(root.querySelectorAll('*')).filter((el) => hasOwnText(el) && isVisible(el));
  return pickRandom(all, count);
}

export function checkElementVisibility(el) {
  const cs = getComputedStyle(el);
  const fg = parseColor(cs.color);
  const bg = resolveBackground(el);
  if (!fg || !bg) return null;
  const ratio = contrastRatio(fg, bg);
  const target = isLargeText(cs) ? VIS_AA_LARGE : VIS_AA_NORMAL;
  return { el, fg, bg, ratio: +ratio.toFixed(2), target, pass: ratio >= target };
}

export function requestColorFix(check, tokens) {
  const fgVar = matchToken(check.fg, tokens);
  if (!fgVar) return null;
  const fixedFg = bestForegroundFor(check.bg, check.target);
  if (!fixedFg || contrastRatio(fixedFg, check.bg) <= check.ratio) return null;
  tokens[fgVar] = fixedFg;
  document.documentElement.style.setProperty(fgVar, oklchStr(fixedFg));
  return { varName: fgVar, from: check.fg, to: fixedFg, ratio: +contrastRatio(fixedFg, check.bg).toFixed(2) };
}

export function runVisibilityAudit({ root = document.body, sampleSize = 8, tokens = null } = {}) {
  const sample = sampleTextElements(root, sampleSize);
  const results = sample.map(checkElementVisibility).filter(Boolean);
  const failures = results.filter((r) => !r.pass);
  const fixes = tokens ? failures.map((f) => requestColorFix(f, tokens)).filter(Boolean) : [];
  return { checked: results.length, failed: failures.length, fixes };
}

export function startVisibilityWatch({ root, sampleSize = 6, tokens = null, minDelay = 4000, maxDelay = 12000, onAudit } = {}) {
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
