// Gem marker SVGs — optimized for Google Maps pins (36x44px)
// Each returns an SVG data URL for use as a Google Maps Marker icon

const svg = (content, viewBox = "0 0 36 44") =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="36" height="44">${content}</svg>`
  )}`;

// Topaz — faceted hexagonal prism, amber/gold with drop shadow
export const topazMarker = svg(`
  <filter id="s"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#00000033"/></filter>
  <g filter="url(#s)">
    <polygon points="18,2 28,9 30,26 18,40 6,26 8,9" fill="#fbbf24" stroke="#92400e" stroke-width="1.2"/>
    <polygon points="18,2 28,9 18,14 8,9" fill="#fef3c7" opacity="0.7"/>
    <polygon points="18,14 28,9 30,26 18,28" fill="#f59e0b" opacity="0.6"/>
    <polygon points="18,14 8,9 6,26 18,28" fill="#d97706" opacity="0.5"/>
    <polygon points="18,28 30,26 18,40" fill="#92400e" opacity="0.7"/>
    <polygon points="18,28 6,26 18,40" fill="#b45309" opacity="0.6"/>
    <ellipse cx="14" cy="10" rx="3" ry="5" fill="white" opacity="0.3" transform="rotate(-15 14 10)"/>
  </g>
`);

// Geode — cracked open with crystals inside, gray shell / purple interior
export const geodeMarker = svg(`
  <filter id="s"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#00000033"/></filter>
  <g filter="url(#s)">
    <circle cx="18" cy="20" r="17" fill="#a8a29e" stroke="#78716c" stroke-width="1"/>
    <circle cx="18" cy="20" r="12" fill="#e8dfc8" stroke="#c4b5b0" stroke-width="0.8"/>
    <circle cx="18" cy="20" r="8" fill="#7c3aed"/>
    <polygon points="18,12 21,17 18,15 15,17" fill="white" opacity="0.7"/>
    <polygon points="24,15 25,20 22,17 24,15" fill="#ddd6fe" opacity="0.8"/>
    <polygon points="24,25 20,26 22,21 25,22" fill="#ede9fe" opacity="0.9"/>
    <polygon points="18,28 15,22 18,24 21,22" fill="white" opacity="0.6"/>
    <polygon points="12,25 11,20 14,23 12,25" fill="#c4b5fd" opacity="0.8"/>
    <!-- ground shadow ellipse -->
    <ellipse cx="18" cy="40" rx="8" ry="3" fill="#00000022"/>
  </g>
`);

// Trilobite — segmented oval fossil shape, warm brown
export const trilobiteMarker = svg(`
  <filter id="s"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#00000033"/></filter>
  <g filter="url(#s)">
    <ellipse cx="18" cy="20" rx="12" ry="17" fill="#a8856a" stroke="#78534a" stroke-width="1"/>
    <ellipse cx="18" cy="8" rx="9" ry="6" fill="#c4a882" stroke="#78534a" stroke-width="0.8"/>
    <circle cx="13" cy="7" r="2.5" fill="#3d2006"/>
    <circle cx="23" cy="7" r="2.5" fill="#3d2006"/>
    <circle cx="12" cy="6.5" r="1" fill="white" opacity="0.5"/>
    <circle cx="22" cy="6.5" r="1" fill="white" opacity="0.5"/>
    <rect x="9" y="13" width="18" height="2.5" rx="1" fill="#c4a882" stroke="#78534a" stroke-width="0.6"/>
    <rect x="8" y="16" width="20" height="2.5" rx="1" fill="#b89070" stroke="#78534a" stroke-width="0.6"/>
    <rect x="9" y="19" width="18" height="2.5" rx="1" fill="#c4a882" stroke="#78534a" stroke-width="0.6"/>
    <rect x="10" y="22" width="16" height="2.5" rx="1" fill="#b89070" stroke="#78534a" stroke-width="0.6"/>
    <ellipse cx="18" cy="31" rx="7" ry="4" fill="#c4a882" stroke="#78534a" stroke-width="0.8"/>
    <line x1="18" y1="13" x2="18" y2="28" stroke="#78534a" stroke-width="1" opacity="0.4"/>
    <ellipse cx="18" cy="40" rx="8" ry="3" fill="#00000022"/>
  </g>
`);

// Garnet — faceted rhombic hexagon, deep red
export const garnetMarker = svg(`
  <filter id="s"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#00000033"/></filter>
  <g filter="url(#s)">
    <polygon points="18,2 30,10 30,28 18,38 6,28 6,10" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.2"/>
    <polygon points="18,2 30,10 18,16 6,10" fill="#fca5a5" opacity="0.4"/>
    <polygon points="18,16 30,10 30,28 18,22" fill="#ef4444" opacity="0.4"/>
    <polygon points="18,16 6,10 6,28 18,22" fill="#b91c1c" opacity="0.4"/>
    <polygon points="18,22 30,28 18,38" fill="#7f1d1d" opacity="0.6"/>
    <polygon points="18,22 6,28 18,38" fill="#991b1b" opacity="0.5"/>
    <ellipse cx="14" cy="9" rx="3" ry="5" fill="white" opacity="0.2" transform="rotate(-15 14 9)"/>
    <ellipse cx="18" cy="40" rx="8" ry="3" fill="#00000022"/>
  </g>
`);

// Agate — concentric banded circles, warm earth tones
export const agateMarker = svg(`
  <filter id="s"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#00000033"/></filter>
  <g filter="url(#s)">
    <circle cx="18" cy="20" r="17" fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/>
    <circle cx="18" cy="20" r="14" fill="none" stroke="#f59e0b" stroke-width="2.5" opacity="0.7"/>
    <circle cx="18" cy="20" r="11" fill="none" stroke="#dc2626" stroke-width="2" opacity="0.5"/>
    <circle cx="18" cy="20" r="8"  fill="none" stroke="#b45309" stroke-width="2" opacity="0.6"/>
    <circle cx="18" cy="20" r="5"  fill="none" stroke="#92400e" stroke-width="1.5" opacity="0.7"/>
    <circle cx="18" cy="20" r="2.5" fill="#78350f" opacity="0.8"/>
    <ellipse cx="18" cy="40" rx="8" ry="3" fill="#00000022"/>
  </g>
`);

// Fluorite — cube/hexagonal prism, purple
export const fluoriteMarker = svg(`
  <filter id="s"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#00000033"/></filter>
  <g filter="url(#s)">
    <polygon points="18,2 30,9 30,30 18,38 6,30 6,9" fill="#a855f7" stroke="#6b21a8" stroke-width="1.2"/>
    <polygon points="18,2 30,9 18,16 6,9" fill="#e9d5ff" opacity="0.45"/>
    <polygon points="6,9 18,16 6,30" fill="#9333ea" opacity="0.35"/>
    <polygon points="30,9 18,16 30,30" fill="#7e22ce" opacity="0.45"/>
    <polygon points="18,16 6,30 18,38 30,30" fill="#581c87" opacity="0.5"/>
    <line x1="18" y1="2" x2="18" y2="38" stroke="white" stroke-width="0.6" opacity="0.2"/>
    <line x1="6" y1="9" x2="30" y2="30" stroke="white" stroke-width="0.5" opacity="0.15"/>
    <line x1="30" y1="9" x2="6" y2="30" stroke="white" stroke-width="0.5" opacity="0.15"/>
    <ellipse cx="14" cy="10" rx="3" ry="6" fill="white" opacity="0.25" transform="rotate(-15 14 10)"/>
    <ellipse cx="18" cy="40" rx="8" ry="3" fill="#00000022"/>
  </g>
`);

// Sunstone — glowing oval cabochon, warm golden shimmer
export const sunstoneMarker = svg(`
  <filter id="s"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#00000033"/></filter>
  <g filter="url(#s)">
    <ellipse cx="18" cy="22" rx="14" ry="10" fill="#fbbf24" stroke="#d97706" stroke-width="1.2"/>
    <line x1="18" y1="4"  x2="18" y2="13" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
    <line x1="28" y1="7"  x2="25" y2="14" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
    <line x1="33" y1="17" x2="26" y2="18" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
    <line x1="8"  y1="7"  x2="11" y2="14" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
    <line x1="3"  y1="17" x2="10" y2="18" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
    <ellipse cx="13" cy="19" rx="5" ry="3" fill="white" opacity="0.35" transform="rotate(-20 13 19)"/>
    <ellipse cx="18" cy="40" rx="8" ry="3" fill="#00000022"/>
  </g>
`);

// Pyrope Garnet (Arizona Ruby) — round brilliant cut, deep red
export const pyropeMarker = svg(`
  <filter id="s"><feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#00000033"/></filter>
  <g filter="url(#s)">
    <circle cx="18" cy="20" r="16" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.2"/>
    <polygon points="18,4 25,9 30,17 28,25 22,30 14,30 8,25 6,17 11,9" fill="none" stroke="#fca5a5" stroke-width="0.8" opacity="0.4"/>
    <polygon points="18,4 25,9 18,14 11,9"  fill="#fca5a5" opacity="0.25"/>
    <polygon points="25,9 30,17 18,14"     fill="#ef4444" opacity="0.2"/>
    <polygon points="30,17 28,25 18,14"    fill="#dc2626" opacity="0.25"/>
    <polygon points="28,25 22,30 18,14"    fill="#b91c1c" opacity="0.3"/>
    <polygon points="22,30 14,30 18,14"    fill="#991b1b" opacity="0.3"/>
    <polygon points="14,30 8,25 18,14"     fill="#7f1d1d" opacity="0.25"/>
    <polygon points="8,25 6,17 18,14"      fill="#b91c1c" opacity="0.2"/>
    <polygon points="6,17 11,9 18,14"      fill="#ef4444" opacity="0.2"/>
    <polygon points="11,9 18,4 18,14"      fill="#fca5a5" opacity="0.2"/>
    <ellipse cx="13" cy="12" rx="4" ry="6" fill="white" opacity="0.2" transform="rotate(-25 13 12)"/>
    <ellipse cx="18" cy="40" rx="8" ry="3" fill="#00000022"/>
  </g>
`);

// Map site IDs to their marker
export const GEM_MARKERS = {
  "topaz-mountain":   topazMarker,
  "dugway-geode-beds": geodeMarker,
  "u-dig-fossils":    trilobiteMarker,
  "tintic-mountains": garnetMarker,
  "san-rafael-swell": agateMarker,
  "marysvale":        fluoriteMarker,
  "sunstone-knoll":   sunstoneMarker,
  "comb-ridge":       pyropeMarker,
};
