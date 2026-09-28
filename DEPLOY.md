# Theme Engine - GitHub Pages Deployment

## Development

Run locally with:
```bash
npm run dev
```
Then open http://localhost:8791

## Production Deployment

Build for static hosting:
```bash
npm run build
```

This creates a `dist/` directory with all files needed for GitHub Pages.

### GitHub Pages Setup

1. Push the repo to GitHub
2. In repository settings → Pages:
   - Source: `Deploy from a branch`
   - Branch: `main` (or your branch)
   - Folder: `/dist`

The app is now fully browser-based:
- **No server needed** — SCSS compilation happens in the browser via Sass WASM
- **No WCAG enforcement** — all color choices are allowed
- **No dependencies** — runs with just browser APIs and CDN-loaded Sass compiler

All SCSS files are bundled in `dist/` and loaded via fetch at runtime.
