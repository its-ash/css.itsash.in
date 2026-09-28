const GOOGLE_FONTS = [
  'Inter', 'Roboto', 'Poppins', 'Open Sans', 'Fira Code', 'Montserrat',
  'Lato', 'Nunito', 'Playfair Display', 'Merriweather', 'Raleway',
  'Source Sans 3', 'Work Sans', 'DM Sans', 'Space Grotesk', 'Manrope',
  'Rubik', 'Josefin Sans', 'Bebas Neue', 'JetBrains Mono', 'IBM Plex Sans',
  'Oswald', 'Quicksand', 'Karla', 'Outfit',
];

const FONT_PAIRINGS = {
  'Inter': 'Source Sans 3',
  'Roboto': 'Open Sans',
  'Poppins': 'Inter',
  'Open Sans': 'Lato',
  'Fira Code': 'Inter',
  'Montserrat': 'Karla',
  'Lato': 'Open Sans',
  'Nunito': 'Karla',
  'Playfair Display': 'Source Sans 3',
  'Merriweather': 'Lato',
  'Raleway': 'Karla',
  'Source Sans 3': 'Source Sans 3',
  'Work Sans': 'Inter',
  'DM Sans': 'Inter',
  'Space Grotesk': 'Work Sans',
  'Manrope': 'Inter',
  'Rubik': 'Karla',
  'Josefin Sans': 'Nunito',
  'Bebas Neue': 'Roboto',
  'JetBrains Mono': 'Inter',
  'IBM Plex Sans': 'IBM Plex Sans',
  'Oswald': 'Open Sans',
  'Quicksand': 'Nunito',
  'Karla': 'Karla',
  'Outfit': 'Inter',
};

function suggestBodyFont(headingFont) {
  return FONT_PAIRINGS[headingFont] || 'Inter';
}

const PALETTES = [
  // Tailwind CSS
  { name: 'Tailwind Blue', color: '#3b82f6', tags: ['tailwind', 'clean', 'blue'] },
  { name: 'Tailwind Sky', color: '#0ea5e9', tags: ['tailwind', 'clean', 'blue'] },
  { name: 'Tailwind Cyan', color: '#06b6d4', tags: ['tailwind', 'clean', 'cool'] },
  { name: 'Tailwind Teal', color: '#14b8a6', tags: ['tailwind', 'clean', 'cool'] },
  { name: 'Tailwind Emerald', color: '#10b981', tags: ['tailwind', 'clean', 'green'] },
  { name: 'Tailwind Green', color: '#22c55e', tags: ['tailwind', 'clean', 'green'] },
  { name: 'Tailwind Lime', color: '#84cc16', tags: ['tailwind', 'clean', 'green'] },
  { name: 'Tailwind Amber', color: '#f59e0b', tags: ['tailwind', 'clean', 'warm'] },
  { name: 'Tailwind Orange', color: '#f97316', tags: ['tailwind', 'clean', 'warm'] },
  { name: 'Tailwind Red', color: '#ef4444', tags: ['tailwind', 'clean', 'warm'] },
  { name: 'Tailwind Rose', color: '#f43f5e', tags: ['tailwind', 'clean', 'warm'] },
  { name: 'Tailwind Pink', color: '#ec4899', tags: ['tailwind', 'clean', 'warm'] },
  { name: 'Tailwind Fuchsia', color: '#d946ef', tags: ['tailwind', 'clean', 'vivid'] },
  { name: 'Tailwind Purple', color: '#a855f7', tags: ['tailwind', 'clean', 'vivid'] },
  { name: 'Tailwind Violet', color: '#8b5cf6', tags: ['tailwind', 'clean', 'vivid'] },
  { name: 'Tailwind Indigo', color: '#6366f1', tags: ['tailwind', 'clean', 'blue'] },
  { name: 'Tailwind Slate', color: '#64748b', tags: ['tailwind', 'neutral', 'muted'] },
  { name: 'Tailwind Zinc', color: '#71717a', tags: ['tailwind', 'neutral', 'muted'] },

  // Material Design
  { name: 'Material Blue', color: '#2196f3', tags: ['material', 'clean', 'blue'] },
  { name: 'Material Indigo', color: '#3f51b5', tags: ['material', 'clean', 'blue'] },
  { name: 'Material Deep Purple', color: '#673ab7', tags: ['material', 'clean', 'vivid'] },
  { name: 'Material Teal', color: '#009688', tags: ['material', 'clean', 'cool'] },
  { name: 'Material Green', color: '#4caf50', tags: ['material', 'clean', 'green'] },
  { name: 'Material Light Green', color: '#8bc34a', tags: ['material', 'clean', 'green'] },
  { name: 'Material Amber', color: '#ffc107', tags: ['material', 'clean', 'warm'] },
  { name: 'Material Orange', color: '#ff9800', tags: ['material', 'clean', 'warm'] },
  { name: 'Material Deep Orange', color: '#ff5722', tags: ['material', 'clean', 'warm'] },
  { name: 'Material Red', color: '#f44336', tags: ['material', 'clean', 'warm'] },
  { name: 'Material Pink', color: '#e91e63', tags: ['material', 'clean', 'warm'] },
  { name: 'Material Cyan', color: '#00bcd4', tags: ['material', 'clean', 'cool'] },
  { name: 'Material Brown', color: '#795548', tags: ['material', 'neutral', 'earthy'] },
  { name: 'Material Blue Grey', color: '#607d8b', tags: ['material', 'neutral', 'muted'] },

  // Flat UI
  { name: 'Flat Turquoise', color: '#1abc9c', tags: ['flat', 'clean', 'cool'] },
  { name: 'Flat Emerald', color: '#2ecc71', tags: ['flat', 'clean', 'green'] },
  { name: 'Flat Peter River', color: '#3498db', tags: ['flat', 'clean', 'blue'] },
  { name: 'Flat Amethyst', color: '#9b59b6', tags: ['flat', 'clean', 'vivid'] },
  { name: 'Flat Wet Asphalt', color: '#34495e', tags: ['flat', 'neutral', 'muted'] },
  { name: 'Flat Sun Flower', color: '#f1c40f', tags: ['flat', 'clean', 'warm'] },
  { name: 'Flat Carrot', color: '#e67e22', tags: ['flat', 'clean', 'warm'] },
  { name: 'Flat Alizarin', color: '#e74c3c', tags: ['flat', 'clean', 'warm'] },
  { name: 'Flat Concrete', color: '#95a5a6', tags: ['flat', 'neutral', 'muted'] },

  // Neon / electric
  { name: 'Neon Blue', color: '#0066ff', tags: ['neon', 'vivid', 'blue'] },
  { name: 'Electric Cyan', color: '#00e5ff', tags: ['neon', 'vivid', 'cool'] },
  { name: 'Toxic Green', color: '#39ff14', tags: ['neon', 'vivid', 'green'] },
  { name: 'Radioactive Yellow', color: '#eeff00', tags: ['neon', 'vivid', 'warm'] },
  { name: 'Hyper Red', color: '#ff0033', tags: ['neon', 'vivid', 'warm'] },
  { name: 'Neon Magenta', color: '#ff00ff', tags: ['neon', 'vivid', 'warm'] },
  { name: 'Ultra Violet', color: '#a100ff', tags: ['neon', 'vivid', 'blue'] },
  { name: 'Electric Indigo', color: '#4d00ff', tags: ['neon', 'vivid', 'blue'] },
  { name: 'Cyber Pink', color: '#ff007f', tags: ['neon', 'vivid', 'warm'] },
  { name: 'Acid Green', color: '#aaff00', tags: ['neon', 'vivid', 'green'] },

  // Neutrals / earthy / muted (for restrained/paper/mono themes)
  { name: 'Warm Graphite', color: '#3f3f46', tags: ['neutral', 'muted'] },
  { name: 'Stone Grey', color: '#78716c', tags: ['neutral', 'muted', 'earthy'] },
  { name: 'Clay Terracotta', color: '#b45309', tags: ['neutral', 'earthy'] },
  { name: 'Muted Sage', color: '#5f7161', tags: ['neutral', 'muted', 'earthy'] },
  { name: 'Dusty Rose', color: '#b3717a', tags: ['neutral', 'muted', 'warm'] },
  { name: 'Ink Navy', color: '#1e293b', tags: ['neutral', 'muted', 'blue'] },
];

const THEME_PALETTE_TAGS = {
  'default': ['tailwind', 'clean'],
  'flat': ['flat', 'clean'],
  'material': ['material', 'clean'],
  'neumorphism': ['muted', 'neutral'],
  'glassmorphism': ['vivid', 'cool', 'blue'],
  'brutalism': ['vivid', 'warm'],
  'maximalism': ['neon', 'vivid'],
  'skeuomorphism': ['material', 'warm'],
  'skeuominimalism': ['muted', 'neutral'],
  'dark-highcontrast': ['neon', 'vivid'],
  'retro-8bit': ['neon', 'vivid'],
  'cyberpunk': ['neon', 'vivid'],
  'claymorphism': ['clean', 'warm'],
  'bauhaus': ['flat', 'warm', 'blue'],
  'organic': ['earthy', 'muted', 'green'],
  'typographic': ['neutral', 'muted'],
  'minimalism-mono': ['neutral', 'muted'],
  'papercut': ['neutral', 'muted', 'earthy'],
  'skeuomorphism-classic': ['material', 'blue'],
};

function suggestedPalettesForTheme(themeKey) {
  const tags = THEME_PALETTE_TAGS[themeKey] || ['clean'];
  const scored = PALETTES.map(p => ({
    p,
    score: (p.tags || []).reduce((n, t) => n + (tags.includes(t) ? 1 : 0), 0),
  }));
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(s => s.p);
}

const state = {
  headingFont: 'Inter',
  bodyFont: suggestBodyFont('Inter'),
  bodyFontManual: false,
  theme: 'default',
  mode: 'light',
  primary: '#0ea5e9',
};

function loadStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get('theme');
  const primary = params.get('primary');
  const mode = params.get('mode');
  const headingFont = params.get('headingFont');
  const bodyFont = params.get('bodyFont');

  if (theme && window.ThemePresets.THEME_PRESETS[theme]) state.theme = theme;
  if (primary && /^#[0-9a-fA-F]{6}$/.test(primary)) state.primary = primary;
  if (mode === 'light' || mode === 'dark') state.mode = mode;
  if (headingFont && GOOGLE_FONTS.includes(headingFont)) state.headingFont = headingFont;
  if (bodyFont && GOOGLE_FONTS.includes(bodyFont)) {
    state.bodyFont = bodyFont;
    state.bodyFontManual = true;
  }
}

function syncStateToUrl() {
  const params = new URLSearchParams({
    theme: state.theme,
    primary: state.primary,
    mode: state.mode,
    headingFont: state.headingFont,
    bodyFont: state.bodyFont,
  });
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, '', newUrl);
}

const scssModuleCache = {};
const scssModuleMissCache = new Set();
const SCSS_CACHE_KEY = 'bulmaScssCacheV1';

// Restore the module cache from a previous page load so repeat visits skip
// re-fetching the entire Bulma tree.
try {
  const stored = JSON.parse(localStorage.getItem(SCSS_CACHE_KEY) || '{}');
  for (const [path, txt] of Object.entries(stored)) scssModuleCache[path] = txt;
} catch (e) {}

function persistScssCache() {
  try {
    localStorage.setItem(SCSS_CACHE_KEY, JSON.stringify(scssModuleCache));
  } catch (e) { /* quota exceeded — ignore, in-memory cache still works */ }
}

let persistTimer = null;
function schedulePersist() {
  clearTimeout(persistTimer);
  persistTimer = setTimeout(persistScssCache, 1000);
}

// Warm the cache by fetching every known module in parallel up front. Without
// this, Sass resolves imports sequentially (child before parent), turning a
// 74-file tree into a multi-second request waterfall on a cold load.
let prefetchPromise = null;
function prefetchScssModules() {
  if (prefetchPromise) return prefetchPromise;
  const paths = (window.BULMA_MODULE_PATHS || []).filter(p => !scssModuleCache[p] && !scssModuleMissCache.has(p));
  const BATCH = 12;
  let i = 0;
  const worker = async () => {
    while (i < paths.length) {
      const path = paths[i++];
      try { await loadScssModule(`scss/${path}`); } catch (e) { /* skip missing */ }
    }
  };
  prefetchPromise = Promise.all(Array.from({ length: BATCH }, worker));
  return prefetchPromise;
}

async function loadScssModule(path) {
  if (scssModuleCache[path]) return scssModuleCache[path];
  if (scssModuleMissCache.has(path)) throw new Error(`Failed to load ${path}`);
  const fullPath = path.startsWith('scss/') ? path : `scss/${path}`;
  const res = await fetch(`./${fullPath}`);
  if (!res.ok) {
    scssModuleMissCache.add(path);
    throw new Error(`Failed to load ${path}`);
  }
  const txt = await res.text();
  scssModuleCache[path] = txt;
  schedulePersist();
  return txt;
}

async function compileSass(themeKey, palette, headingFont, bodyFont) {
  if (!window.sass) throw new Error('Sass compiler not loaded');

  const hexOk = v => typeof v === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(v);
  const fontNameOk = v => typeof v === 'string' && /^[A-Za-z0-9 ]{1,60}$/.test(v);

  const headingStack = fontNameOk(headingFont) ? `"${headingFont.replace(/["\\]/g, '\\$&')}", Helvetica, Arial, sans-serif` : null;
  const bodyStack = fontNameOk(bodyFont) ? `"${bodyFont.replace(/["\\]/g, '\\$&')}", Helvetica, Arial, sans-serif` : null;

  const headingSelectors = '.navbar-brand, blockquote, h1, h2, h3, h4, h5, h6';
  const bodySelectors = 'body, .button, .input, .textarea, .select select, .box, .card, .card-header, .notification, .tag, .table, .navbar, .navbar-item, .panel-block, .content, .icon-text';
  const fontOverrideCss = [
    bodyStack ? `${bodySelectors} { font-family: ${bodyStack} !important; }` : '',
    headingStack ? `${headingSelectors} { font-family: ${headingStack} !important; }` : '',
  ].filter(Boolean).join('\n');

  const configEntries = [
    ['$primary', palette.primary],
    ['$link', palette.secondary],
    ['$success', palette.success],
    ['$danger', palette.danger],
    ['$warning', palette.warning],
    ['$info', palette.info],
    ['$light', palette.light],
    ['$dark', palette.dark],
    ['$body-background-color', palette.bodyBg],
    ['$body-color', palette.bodyColor],
  ].filter(([, value]) => value && hexOk(value));

  let presetSrc = '';
  if (themeKey) {
    presetSrc = await loadScssModule(`scss/presets/${themeKey}.scss`);
  }

  const configVarNameOk = v => /^\$[a-zA-Z][a-zA-Z0-9-]*$/.test(v);
  const configValueOk = v => typeof v === 'string' && /^[a-zA-Z0-9#%.,\s()'"_-]{1,120}$/.test(v);
  const configMatch = presetSrc.match(/^\/\/!\s*bulma-config:\s*(\{[^\n]*\})\s*$/m);
  const configMap = new Map(configEntries);
  if (configMatch) {
    presetSrc = presetSrc.replace(configMatch[0], '');
    try {
      const presetConfig = JSON.parse(configMatch[1]);
      for (const [name, value] of Object.entries(presetConfig)) {
        if (!configVarNameOk(name) || !configValueOk(value)) continue;
        configMap.set(name, value.includes(',') ? `(${value})` : value);
      }
    } catch (e) {
      console.error('Invalid bulma-config in preset:', themeKey, e);
    }
  }

  const configBody = [...configMap.entries()].map(([name, value]) => `  ${name}: ${value}`).join(',\n');

  // Kick off prefetch before the sequential import cascade starts hitting the
  // network; the cascade then hits the warm in-memory cache.
  const ready = prefetchScssModules();

  const bulmaUse = `@use "bulma/index" with (\n${configBody}\n);`;

  const entry = `
    ${bulmaUse}
    ${presetSrc}
    ${fontOverrideCss}
  `;

  function resolveCandidates(path) {
    const dir = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
    const base = path.includes('/') ? path.slice(path.lastIndexOf('/') + 1) : path;
    const baseNoExt = base.replace(/\.scss$/, '');
    const dirPrefix = dir ? `${dir}/` : '';

    // Resolve in canonical Sass order: literal file first, then underscore
    // variant, then directory index barrels. Trying directory indexes first
    // made plain-file imports like `@use "initial-variables"` 404 against
    // sibling directories that don't exist (e.g. utilities/initial-variables/).
    if (dirPrefix) {
      return [
        `${dirPrefix}${baseNoExt}.scss`,
        `${dirPrefix}_${baseNoExt}.scss`,
        `${dirPrefix}${baseNoExt}/_index.scss`,
        `${dirPrefix}${baseNoExt}/index.scss`,
      ];
    }
    return [
      `${baseNoExt}.scss`,
      `_${baseNoExt}.scss`,
      `${baseNoExt}/_index.scss`,
      `${baseNoExt}/index.scss`,
    ];
  }

  const customImporter = {
    async canonicalize(url, ctx) {
      if (url.startsWith('sass:')) return null; // let Sass handle builtin namespaces
      if (url.startsWith('~')) url = url.slice(1);
      const base = ctx?.containingUrl ? ctx.containingUrl.href : 'file:///scss/entry.scss';
      const resolved = new URL(url, base);
      const path = resolved.pathname.slice(1);

      // First import waits for the parallel prefetch to finish so the rest of
      // the cascade resolves from the warm cache instead of fetching one by one.
      if (ready && !ready._settled) {
        await ready.finally(() => { ready._settled = true; });
      }

      for (const file of resolveCandidates(path)) {
        try {
          await loadScssModule(file);
          return new URL(`file:///${file}`);
        } catch (e) {
          // try next candidate
        }
      }
      return null;
    },
    async load(canonicalUrl) {
      const path = canonicalUrl.pathname.slice(1);
      try {
        const txt = await loadScssModule(path);
        return { contents: txt, syntax: 'scss' };
      } catch (e) {
        return null;
      }
    }
  };

  const result = await window.sass.compileStringAsync(entry, {
    importers: [customImporter],
    url: new URL('file:///scss/entry.scss'),
    logger: {
      warn() {}, // silence Sass deprecation warnings (if-function etc.)
    },
  });

  return result.css;
}

function loadGoogleFonts(fontNames) {
  const id = 'google-font-link';
  let link = document.getElementById(id);
  if (!link) {
    link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  const families = [...new Set(fontNames)]
    .map(f => `family=${f.replace(/ /g, '+')}:wght@300;400;500;600;700;800`)
    .join('&');
  link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

function populateFontDropdowns() {
  const headingSel = document.getElementById('heading-font-select');
  const bodySel = document.getElementById('body-font-select');
  const options = GOOGLE_FONTS.map(f => `<option value="${f}">${f}</option>`).join('');
  headingSel.innerHTML = options;
  bodySel.innerHTML = options;
  headingSel.value = state.headingFont;
  bodySel.value = state.bodyFont;
}

function populateThemeDropdown() {
  const sel = document.getElementById('theme-select');
  sel.innerHTML = Object.entries(window.ThemePresets.THEME_PRESETS)
    .map(([key, val]) => `<option value="${key}">${val.label}</option>`).join('');
  sel.value = state.theme;
}

let toastTimer = null;

function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:2000;pointer-events:none;';
    document.body.appendChild(container);
  }
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'is-size-7 has-text-weight-medium';
    toast.style.cssText = 'background:var(--bulma-body-background-color,#fff);border:1px solid rgba(127,127,127,.25);border-radius:.375rem;box-shadow:0 2px 8px rgba(0,0,0,.12);padding:.5rem .75rem;opacity:0;transform:translateY(-8px);transition:opacity .15s ease,transform .15s ease;';
    container.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-8px)';
  }, 2000);
}

function renderSwatches(containerId, palettes) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  wrap.innerHTML = palettes.map(p => `
    <button type="button" class="palette-swatch" data-color="${p.color}" title="${p.name}"
      style="background:${p.color}"></button>
  `).join('');
  wrap.querySelectorAll('.palette-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      state.primary = btn.dataset.color;
      document.getElementById('color-picker').value = state.primary;
      render();
    });
  });
}

function populatePalettes() {
  renderSwatches('palette-grid', PALETTES);
  renderSuggestedPalettes();
}

function renderSuggestedPalettes() {
  const section = document.getElementById('suggested-palette-section');
  const label = document.getElementById('suggested-palette-label');
  const suggestions = suggestedPalettesForTheme(state.theme);
  if (!section || !label) return;
  if (suggestions.length === 0) {
    section.classList.add('d-none');
    return;
  }
  section.classList.remove('d-none');
  const themeLabel = (window.ThemePresets.THEME_PRESETS[state.theme] || {}).label || state.theme;
  label.textContent = `Suggested for ${themeLabel}`;
  renderSwatches('suggested-palette-grid', suggestions);
}

let lastCompiledCss = '';
let renderToken = 0;

function injectCompiledCss(css) {
  let styleEl = document.getElementById('theme-stylesheet');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'theme-stylesheet';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;
}

async function render() {
  const token = ++renderToken;
  console.log('Render called:', { theme: state.theme, primary: state.primary, mode: state.mode });
  const { effectiveMode } = window.ThemePresets.applyMode(state.theme, state.mode);
  const palette = window.ThemeEngine.generatePalette(state.primary, effectiveMode);
  console.log('Generated palette:', palette);
  loadGoogleFonts([state.headingFont, state.bodyFont]);

  const status = document.getElementById('compile-status');

  try {
    const css = await compileSass(state.theme, palette, state.headingFont, state.bodyFont);
    if (token !== renderToken) return;
    lastCompiledCss = css;
    console.log('CSS compiled, length:', css.length);
    injectCompiledCss(css);
    status.classList.add('d-none');
    syncStateToUrl();
    showToast('Theme updated');
  } catch (err) {
    if (token !== renderToken) return;
    status.classList.remove('d-none');
    status.className = 'is-size-7 has-text-weight-medium has-text-danger';
    status.textContent = 'Theme compile error — see console';
    console.error('Render error:', err);
  }
}



function downloadCss() {
  const blob = new Blob([lastCompiledCss], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `theme-${state.theme}-${state.mode}.css`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function initEvents() {
  document.getElementById('heading-font-select').addEventListener('change', e => {
    state.headingFont = e.target.value;
    if (!state.bodyFontManual) {
      state.bodyFont = suggestBodyFont(state.headingFont);
      document.getElementById('body-font-select').value = state.bodyFont;
    }
    render();
  });
  document.getElementById('body-font-select').addEventListener('change', e => {
    state.bodyFont = e.target.value;
    state.bodyFontManual = true;
    render();
  });
  document.getElementById('theme-select').addEventListener('change', e => {
    state.theme = e.target.value;
    renderSuggestedPalettes();
    render();
  });
  document.getElementById('mode-toggle').addEventListener('change', e => {
    state.mode = e.target.checked ? 'dark' : 'light';
    render();
  });
  document.getElementById('color-picker').addEventListener('input', e => {
    state.primary = e.target.value;
    render();
  });
  document.getElementById('download-btn').addEventListener('click', downloadCss);
}

async function waitForSass() {
  for (let i = 0; i < 100; i++) {
    if (window.sass && window.sass.compileStringAsync) {
      return;
    }
    await new Promise(r => setTimeout(r, 50));
  }
  throw new Error('Sass compiler failed to load');
}

async function init() {
  try {
    await waitForSass();
    loadStateFromUrl();
    populateFontDropdowns();
    populateThemeDropdown();
    populatePalettes();
    initEvents();
    document.getElementById('color-picker').value = state.primary;
    document.getElementById('mode-toggle').checked = state.mode === 'dark';
    loadGoogleFonts([state.headingFont, state.bodyFont]);
    render();
  } catch (e) {
    console.error('Init failed:', e);
    document.body.innerHTML = `<div style="padding:20px; color:red;">${e.message}</div>`;
  }
}

document.addEventListener('DOMContentLoaded', init);
