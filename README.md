# css.itsash.in — Automatic Web Theme Generator

Enter **one primary color** and get a complete, production-ready web theme with automatic light/dark variants.

**Live: [css.itsash.in](https://css.itsash.in)**

## Quick Start

### Embed in your site

```html
<script src="https://css.itsash.in/js/theme-loader.js?color=#6750A4"></script>
```

With custom fonts:

```html
<script src="https://css.itsash.in/js/theme-loader.js?color=#0066FF&heading=Space+Grotesk&body=Inter&mono=JetBrains+Mono"></script>
```

Or use `data-` attributes:

```html
<script src="https://css.itsash.in/js/theme-loader.js" data-color="#6750A4" data-heading="Inter"></script>
```

### Parameters

| Param | Default | Description |
|-------|---------|-------------|
| `color` | `#6750A4` | Primary color (HEX, RGB, HSL, OKLCH) |
| `heading` | `Inter` | Heading font (Google Fonts) |
| `body` | auto-paired | Body font |
| `mono` | auto-paired | Monospace font |
| `mode` | `light` | Default theme mode (`light` / `dark`) |

### Build from source

```bash
make build    # Build bundle → docs/
make serve    # Build + local server at :8080
make push     # Build + commit (Copilot message) + push
make deploy   # Same as push (GH Pages auto-deploys)
```

### Local dev

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