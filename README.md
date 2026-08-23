# Automatic Web Theme Generator

Enter **one primary color** and get a complete, production-ready web theme with automatic light/dark variants.

## Run

Open `index.html` directly in a browser, or serve locally:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## How it works

```
ONE USER COLOR
       ↓
COLOR ENGINE (OKLCH)
       ↓
PRIMARY → ACCENT (+137.5°) → NEUTRAL (-60% chroma) → CONTRAST (-25% lightness)
       ↓
SEMANTIC TOKENS (WCAG-validated foregrounds)
       ↓
LIGHT + DARK THEMES (independent contrast testing)
       ↓
50+ COMPONENT SYSTEM (cards, buttons, forms, tables, modals, ...)
       ↓
COMPLETE WEBSITE DESIGN SYSTEM
```

## Color math

| Token     | Formula                                |
|-----------|----------------------------------------|
| Accent    | `H + 137.5°`, same L and C as Primary  |
| Neutral   | `C × 0.40`, same L and H as Primary    |
| Contrast  | `L × 0.75`, same C and H as Accent      |

All colors are calculated in **OKLCH** and gamut-mapped to sRGB.

## Files

| File | Purpose |
|------|---------|
| `index.html` | App UI — color input, presets, preview tabs, CSS/HTML export |
| `src/main.js` | Entry point — ties engine + components + demo together |
| `src/engine/color.js` | OKLCH ↔ sRGB conversion, gamut mapping, WCAG contrast |
| `src/engine/palette.js` | Core color generation + semantic token derivation |
| `src/engine/theme.js` | Theme assembly (light/dark), CSS variable output |
| `src/engine/components.js` | All component styles (50+ classes) |
| `src/engine/demo.js` | Demo HTML showcasing every component |

## Output

The generator produces:
1. Core colors (Primary, Accent, Neutral, Contrast) in HEX and OKLCH
2. Complete light theme token set
3. Complete dark theme token set
4. Full CSS with typography, spacing, radius, shadow tokens
5. 50+ component styles
6. Interactive HTML preview
7. Copy-to-clipboard CSS and HTML
8. Downloadable `theme.css` and `preview.html`