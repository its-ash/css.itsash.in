/* Theme Embed Script - css.itsash.in
 * Usage: <script src="https://css.itsash.in/js/theme-loader.js?color=#6750A4&heading=Inter&body=Inter&mono=JetBrains+Mono"></script>
 * Or:   <script src="https://css.itsash.in/js/theme-loader.js" data-color="#6750A4" data-heading="Inter"></script>
 */
(function () {
  const SCRIPT = document.currentScript;
  function getParam(name, fallback) {
    const url = new URL(SCRIPT.src);
    let val = url.searchParams.get(name);
    if (!val && SCRIPT.dataset) val = SCRIPT.dataset[name];
    return val || fallback;
  }

  const COLOR = getParam('color', '#6750A4');
  const HEADING = getParam('heading', 'Inter');
  const BODY = getParam('body', '');
  const MONO = getParam('mono', '');
  const MODE = getParam('mode', 'light');

  document.documentElement.setAttribute('data-theme', MODE);

  function loadEngine() {
    if (window.ThemeEngine && window.ThemeEngine.generateTheme) {
      injectTheme();
    } else {
      const s = document.createElement('script');
      s.src = 'https://css.itsash.in/js/theme-engine.js';
      s.onload = injectTheme;
      s.onerror = function () {
        const s2 = document.createElement('script');
        s2.src = './js/theme-engine.js';
        s2.onload = injectTheme;
        document.head.appendChild(s2);
      };
      document.head.appendChild(s);
    }
  }

  function injectTheme() {
    const fontConfig = { heading: HEADING };
    if (BODY) fontConfig.body = BODY;
    if (MONO) fontConfig.mono = MONO;
    const result = window.ThemeEngine.generateTheme(COLOR, fontConfig);
    if (result.error) { console.error('ThemeEngine:', result.error); return; }

    // Inject font link
    if (result.fontUrl) {
      const l1 = document.createElement('link');
      l1.rel = 'preconnect';
      l1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(l1);
      const l2 = document.createElement('link');
      l2.rel = 'preconnect';
      l2.href = 'https://fonts.gstatic.com';
      l2.crossOrigin = 'anonymous';
      document.head.appendChild(l2);
      const l3 = document.createElement('link');
      l3.rel = 'stylesheet';
      l3.href = result.fontUrl;
      document.head.appendChild(l3);
    }

    // Inject CSS
    const style = document.createElement('style');
    style.setAttribute('data-theme-engine', '');
    style.textContent = result.css;
    document.head.appendChild(style);

    // Dispatch event for custom JS
    document.dispatchEvent(new CustomEvent('theme:ready', { detail: result }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadEngine);
  } else {
    loadEngine();
  }
})();