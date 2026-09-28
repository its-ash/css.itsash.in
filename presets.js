const THEME_PRESETS = {
  'default': { label: 'Default' },
  'flat': { label: 'Flat' },
  'material': { label: 'Material' },
  'neumorphism': { label: 'Neumorphism' },
  'glassmorphism': { label: 'Glassmorphism' },
  'brutalism': { label: 'Brutalism' },
  'maximalism': { label: 'Maximalism' },
  'skeuomorphism': { label: 'Skeuomorphism' },
  'skeuominimalism': { label: 'Skeuominimalism' },
  'dark-highcontrast': { label: 'Dark High Contrast', forceMode: 'dark' },
  'retro-8bit': { label: 'Retro 8-bit' },
  'cyberpunk': { label: 'Cyberpunk', forceMode: 'dark' },
  'claymorphism': { label: 'Claymorphism' },
  'bauhaus': { label: 'Bauhaus' },
  'organic': { label: 'Organic' },
  'typographic': { label: 'Typographic' },
  'minimalism-mono': { label: 'Minimalism Mono' },
  'papercut': { label: 'Papercut' },
  'skeuomorphism-classic': { label: 'Skeuomorphism Classic' },
};

function applyMode(themeKey, mode) {
  const preset = THEME_PRESETS[themeKey] || THEME_PRESETS['default'];
  const effectiveMode = preset.forceMode || mode;
  document.documentElement.setAttribute('data-theme', effectiveMode);
  return { preset, effectiveMode };
}

window.ThemePresets = { THEME_PRESETS, applyMode };
