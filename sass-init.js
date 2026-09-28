(async () => {
  const immutable = await import('https://cdn.jsdelivr.net/npm/immutable@4.3.0/dist/immutable.es.js');
  const sassModule = await import('./sass.default.js');
  window.sass = sassModule;
})();
