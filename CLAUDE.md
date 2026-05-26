# CLAUDE.md — Western Rockhound

Affiliate marketing site for rockhounding gear — metal detectors, rock hammers, tumblers, GPS, and field gear.
Target audience: rockhounds in Utah and the American West.
Owner: Eric Bowser / Execute & Engrave LLC — Salt Lake City, UT.

## Dev Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run tailwind:build` — Compile Tailwind CSS once
- `npm run tailwind:watch` — Watch Tailwind CSS

## Tech Stack

- React 18 + Vite
- TailwindCSS (no component library)
- react-router-dom v6

## Project Structure

```
src/
├── App.jsx                      # Routes: /, /category/:slug, /review/:id, /compare/:id1/:id2, /about, *→404
├── main.jsx                     # Entry point
├── data/
│   ├── config.js                # Site metadata + 6 categories
│   └── products.js              # 15 rockhounding products with affiliate data
├── components/
│   ├── Landing.jsx              # Homepage
│   ├── Category.jsx             # Filtered product grid by category
│   ├── Review.jsx               # Individual product review
│   ├── Compare.jsx              # Side-by-side product comparison
│   ├── About.jsx                # About + affiliate disclosure
│   ├── Navbar.jsx               # Sticky nav with working dropdown
│   ├── Footer.jsx               # Newsletter capture + links
│   └── NotFound.jsx             # 404 page
└── styles/
    ├── input.css                # Tailwind source
    └── output.css               # Compiled (do not edit directly)
```

## Color Palette

Stone/amber. Primary CTA: amber-600. Backgrounds: stone-50, white.
Hero gradients: stone-800 → amber-800.

## Affiliate Programs to Sign Up For

1. Amazon Associates — affiliate-program.amazon.com (~3% outdoor, ~4.5% books)
2. Backcountry affiliate — outdoorgearexchange.com/affiliates (~8%)
3. KellyCo Metal Detectors — kellycodetectors.com (~5%)
4. Serious Detecting — seriousdetecting.com/affiliate
5. High Plains Prospectors — highplainsprospectors.com/affiliate

After joining, replace product URLs in products.js with tagged affiliate links.

## Newsletter

Footer captures emails into localStorage key `wr_subscribers`.
Wire to ConvertKit or Beehiiv when ready. ConvertKit has a 30% recurring affiliate program too.

## Content Roadmap

Phase 1 — Text only, no photos needed (publish now to start ranking):
- [ ] "Best Metal Detectors for Rockhounding 2026" (pillar post)
- [ ] "Rockhounding in Utah: 8 Best Sites + What You'll Find"
- [ ] "Garrett Ace 400 vs Minelab Vanquish 540 — Which Should You Buy?"
- [ ] "Rockhounding Gear Checklist: Everything You Actually Need"
- [ ] "Best Rock Tumblers for Beginners 2026"

Phase 2 — Field content (after first trips out):
- [ ] Trip reports with real photos from Topaz Mountain, Dugway
- [ ] YouTube/TikTok channel for discovery traffic
- [ ] Full site guides with GPS coordinates
