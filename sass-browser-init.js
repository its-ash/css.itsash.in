setTimeout(() => {
  const _cliPkgLibrary = globalThis._cliPkgExports?.pop();
  if (_cliPkgLibrary && globalThis._cliPkgExports?.length === 0) {
    delete globalThis._cliPkgExports;
  }

  if (_cliPkgLibrary) {
    const immutable = window.Immutable;
    if (!immutable) {
      console.error('Immutable.js not loaded');
      return;
    }
    const _cliPkgExports = {};
    _cliPkgLibrary.load({ immutable }, _cliPkgExports);
    window.sass = _cliPkgExports;
    console.log('Sass initialized:', !!window.sass.compileStringAsync);
  } else {
    console.error('Sass WASM library not found in _cliPkgExports');
  }
}, 100);
