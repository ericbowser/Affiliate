# CLAUDE.md — Wasatch Rockhound

Affiliate marketing site for rockhounding gear — metal detectors, rock hammers, tumblers, GPS, and field gear.
Target audience: rockhounds in Utah and the American West.
Owner: Eric Bowser / Execute & Engrave LLC — Salt Lake City, UT.
Live: rockhoundutah.com (self-hosted on Raspberry Pi)

## Dev Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run sitemap` — Generate public/sitemap.xml
- `npm run tail:build` — Compile Tailwind CSS once
- `npm run tail:watch` — Watch Tailwind CSS

## Tech Stack

- React 18 + Vite (ESM, "type": "module")
- TailwindCSS (no component library)
- react-router-dom v6
- ReactMarkdown + remark-gfm for blog content

## Project Structure

```
src/
├── App.jsx                      # Routes: /, /category/:slug, /review/:id, /compare/:id1/:id2, /blog, /blog/:slug, /about, *→404
├── main.jsx                     # Entry point
├── data/
│   ├── config.js                # Site metadata + 6 categories
│   ├── products.js              # 20 rockhounding products with affiliate data
│   ├── posts.js                 # Blog post registry (slugs, metadata, content imports)
│   ├── affiliateLinks.js        # Centralized multi-retailer link registry
│   ├── seoSchema.jsx            # JSON-LD generators (Article, Product, FAQ, Breadcrumb)
│   ├── sites.js                 # Utah rockhounding site data
│   ├── gemMarkers.js            # Map marker data
│   └── posts/                   # Markdown article files
│       ├── rockhounding-utah-8-best-sites.md
│       ├── best-metal-detectors-2026.md
│       └── garrett-ace-400-vs-vanquish-540.md
├── components/
│   ├── Landing.jsx              # Homepage
│   ├── Category.jsx             # Filtered product grid by category
│   ├── Review.jsx               # Individual product review (+ ProductSchema)
│   ├── Compare.jsx              # Side-by-side product comparison
│   ├── Blog.jsx                 # Blog listing page
│   ├── BlogPost.jsx             # Individual blog post (+ ArticleSchema)
│   ├── BlogMap.jsx              # Map integration for site guides
│   ├── About.jsx                # About + affiliate disclosure
│   ├── Navbar.jsx               # Sticky nav with working dropdown
│   ├── Footer.jsx               # Newsletter capture + links
│   ├── WeatherPage.jsx          # Field conditions page
│   ├── SiteMap.jsx              # Utah sites interactive map
│   └── NotFound.jsx             # 404 page
├── tools/
│   └── detectorMatch/           # Interactive detector recommendation quiz
└── styles/
    ├── input.css                # Tailwind source
    └── output.css               # Compiled (do not edit directly)
public/
├── robots.txt                   # Search engine directives + sitemap reference
└── sitemap.xml                  # Generated via `npm run sitemap`
generateSitemap.js               # Sitemap generator script
```

## Color Palette

Stone/amber. Primary CTA: amber-600. Backgrounds: stone-50, white.
Hero gradients: stone-800 → amber-800.

## Affiliate Programs

| Program | Status | Commission |
|---------|--------|------------|
| Amazon Associates | ✅ Active | 3-4.5% |
| REI Co-op (AvantLink) | ⏳ Apply | 5% |
| KellyCo Metal Detectors | ⏳ Apply | 5% |
| ShareASale (Garmin, Leatherman, Black Diamond) | ⏳ Apply | Varies |
| Backcountry | ❌ Denied (re-apply after 10+ articles) | 5-12% |
| Serious Detecting | ⏳ Apply after content | ~5% |
| High Plains Prospectors | ⏳ Apply after content | ~5% |

Affiliate links managed in `affiliateLinks.js` — single source of truth.
When a new program is approved, paste the URL there and it propagates everywhere.

## Content Engine

### Published Articles
- [x] "Rockhounding in Utah: 8 Best Sites + What You'll Find" (site-guide)
- [x] "Best Metal Detectors for Rockhounding in 2026" (pillar)
- [x] "Garrett Ace 400 vs Minelab Vanquish 540" (comparison)

### Planned Articles (in posts.js as drafts)
- [ ] "Rockhounding Gear Checklist: Everything You Actually Need" (gear-list)
- [ ] "Best Rock Tumblers for Beginners 2026" (pillar)
- [ ] "Topaz Mountain Utah: Complete Collecting Guide" (site-guide)
- [ ] "Nokta Simplex Lite vs Garrett Ace 400: Budget Detector Showdown" (comparison)

### Adding a New Article
1. Write markdown in `src/data/posts/your-slug.md`
2. Import in `posts.js` and add entry with status: "published"
3. Add slug+date to `generateSitemap.js` blogPosts array
4. Run `npm run sitemap` to regenerate sitemap
5. Build and deploy

## SEO

- JSON-LD schema auto-injected on blog posts (ArticleSchema) and reviews (ProductSchema)
- Sitemap at public/sitemap.xml — submit to Google Search Console
- robots.txt in public/ points to sitemap
- Each post has keywords metadata for tracking target terms

## Newsletter

Footer captures emails into localStorage key `wr_subscribers`.
Wire to ConvertKit or Beehiiv when ready. ConvertKit has a 30% recurring affiliate program too.
