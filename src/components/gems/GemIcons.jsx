import React from "react";

const defaultSize = 72;

// ─── Topaz ────────────────────────────────────────────────────────────────────
export const Topaz = ({ size = defaultSize }) => (
  <svg width={size} height={size * 1.22} viewBox="0 0 72 88" fill="none" aria-label="Topaz crystal">
    <defs>
      <linearGradient id="topaz-g" x1="18" y1="0" x2="54" y2="88" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#fef9c3"/>
        <stop offset="35%"  stopColor="#fbbf24"/>
        <stop offset="100%" stopColor="#92400e"/>
      </linearGradient>
    </defs>
    <polygon points="36,4 54,18 58,50 36,84 14,50 18,18" fill="url(#topaz-g)" stroke="#d97706" strokeWidth="1.2"/>
    <polygon points="36,4 54,18 36,26 18,18"   fill="#fef9c3" opacity="0.55"/>
    <polygon points="36,26 54,18 58,50 36,54"  fill="#fbbf24" opacity="0.5"/>
    <polygon points="36,26 18,18 14,50 36,54"  fill="#f59e0b" opacity="0.4"/>
    <polygon points="36,54 58,50 36,84"        fill="#92400e" opacity="0.55"/>
    <polygon points="36,54 14,50 36,84"        fill="#b45309" opacity="0.45"/>
    <ellipse cx="29" cy="20" rx="4" ry="7" fill="white" opacity="0.3" transform="rotate(-15 29 20)"/>
    <line x1="36" y1="4" x2="36" y2="84" stroke="white" strokeWidth="0.6" opacity="0.18"/>
  </svg>
);

// ─── Amethyst ─────────────────────────────────────────────────────────────────
export const Amethyst = ({ size = defaultSize }) => (
  <svg width={size} height={size * 1.22} viewBox="0 0 72 88" fill="none" aria-label="Amethyst cluster">
    <defs>
      <linearGradient id="amethyst-base" x1="0" y1="60" x2="0" y2="88" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#6b21a8"/>
        <stop offset="100%" stopColor="#3b0764"/>
      </linearGradient>
    </defs>
    <rect x="8" y="68" width="56" height="16" rx="3" fill="url(#amethyst-base)"/>
    <polygon points="20,68 14,28 26,68"  fill="#7c3aed"/>
    <polygon points="14,28 20,68 26,68"  fill="#a855f7" opacity="0.6"/>
    <polygon points="14,28 26,68"        fill="#c4b5fd" opacity="0.28"/>
    <polygon points="32,68 24,12 40,68"  fill="#6d28d9"/>
    <polygon points="24,12 32,68 40,68"  fill="#8b5cf6" opacity="0.55"/>
    <polygon points="24,12 40,68"        fill="#ddd6fe" opacity="0.22"/>
    <polygon points="44,68 36,22 52,68"  fill="#7c3aed"/>
    <polygon points="36,22 44,68 52,68"  fill="#a855f7" opacity="0.6"/>
    <polygon points="36,22 52,68"        fill="#c4b5fd" opacity="0.28"/>
    <polygon points="56,68 50,34 62,68"  fill="#6d28d9"/>
    <polygon points="50,34 56,68 62,68"  fill="#8b5cf6" opacity="0.5"/>
    <ellipse cx="26" cy="22" rx="3" ry="5" fill="white" opacity="0.25" transform="rotate(-5 26 22)"/>
    <ellipse cx="37" cy="16" rx="3" ry="6" fill="white" opacity="0.2"  transform="rotate(3 37 16)"/>
  </svg>
);

// ─── Opal ─────────────────────────────────────────────────────────────────────
export const Opal = ({ size = defaultSize }) => (
  <svg width={size} height={size * 1.22} viewBox="0 0 72 88" fill="none" aria-label="Play-of-color opal">
    <defs>
      <radialGradient id="opal-g" cx="42%" cy="38%" r="58%">
        <stop offset="0%"   stopColor="#f0f9ff" className="opal-s1"/>
        <stop offset="45%"  stopColor="#818cf8" className="opal-s2"/>
        <stop offset="100%" stopColor="#312e81" className="opal-s3"/>
      </radialGradient>
    </defs>
    <ellipse cx="36" cy="46" rx="30" ry="36" fill="url(#opal-g)" stroke="#6366f1" strokeWidth="1.2"/>
    <ellipse cx="36" cy="46" rx="22" ry="27" fill="none" stroke="white" strokeWidth="0.5" opacity="0.25"/>
    <ellipse cx="28" cy="36" rx="9" ry="5" fill="white" opacity="0.18" transform="rotate(-25 28 36)"/>
    <text x="26" y="40" textAnchor="middle" fontSize="9" fill="white" opacity="0.9" className="gem-sparkle">✦</text>
    <text x="46" y="46" textAnchor="middle" fontSize="7" fill="#c7d2fe"             className="gem-sparkle2">✦</text>
    <text x="36" y="60" textAnchor="middle" fontSize="8" fill="white" opacity="0.8" className="gem-sparkle3">✦</text>
    <text x="48" y="34" textAnchor="middle" fontSize="6" fill="#e0e7ff"             className="gem-sparkle4">✦</text>
  </svg>
);

// ─── Red Beryl ────────────────────────────────────────────────────────────────
export const RedBeryl = ({ size = defaultSize }) => (
  <svg width={size} height={size * 1.22} viewBox="0 0 72 88" fill="none" aria-label="Red beryl crystal">
    <defs>
      <linearGradient id="beryl-g" x1="16" y1="0" x2="56" y2="88" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#fca5a5"/>
        <stop offset="30%"  stopColor="#dc2626"/>
        <stop offset="70%"  stopColor="#991b1b"/>
        <stop offset="100%" stopColor="#450a0a"/>
      </linearGradient>
    </defs>
    <polygon
      points="24,6 48,6 60,16 60,72 48,82 24,82 12,72 12,16"
      fill="url(#beryl-g)" stroke="#b91c1c" strokeWidth="1.2"
      className="beryl-glow"
    />
    <polygon points="24,6 48,6 36,16 36,6"   fill="#fca5a5" opacity="0.28"/>
    <polygon points="24,6 36,16 12,16"       fill="#ef4444" opacity="0.22"/>
    <polygon points="48,6 60,16 36,16"       fill="#fca5a5" opacity="0.18"/>
    <rect x="12" y="16" width="48" height="9"  fill="#ef4444" opacity="0.12"/>
    <rect x="12" y="63" width="48" height="9"  fill="#7f1d1d" opacity="0.28"/>
    <polygon points="12,72 24,82 36,72 36,82"  fill="#450a0a" opacity="0.38"/>
    <polygon points="60,72 48,82 36,72 36,82"  fill="#7f1d1d" opacity="0.32"/>
    <line x1="12" y1="25" x2="60" y2="25"    stroke="white" strokeWidth="0.6" opacity="0.14"/>
    <line x1="12" y1="63" x2="60" y2="63"    stroke="white" strokeWidth="0.6" opacity="0.11"/>
    <line x1="36" y1="6"  x2="36" y2="82"    stroke="white" strokeWidth="0.5" opacity="0.14"/>
    <ellipse cx="28" cy="20" rx="6" ry="9"   fill="white"   opacity="0.18" transform="rotate(-10 28 20)"/>
  </svg>
);

// ─── Garnet ───────────────────────────────────────────────────────────────────
export const Garnet = ({ size = defaultSize }) => (
  <svg width={size} height={size * 1.22} viewBox="0 0 72 88" fill="none" aria-label="Garnet">
    <defs>
      <linearGradient id="garnet-g" x1="0" y1="0" x2="72" y2="88" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#fca5a5"/>
        <stop offset="40%"  stopColor="#dc2626"/>
        <stop offset="100%" stopColor="#7f1d1d"/>
      </linearGradient>
    </defs>
    <polygon points="36,4 64,24 64,64 36,84 8,64 8,24" fill="url(#garnet-g)" stroke="#991b1b" strokeWidth="1.2"/>
    <polygon points="36,4 64,24 36,34 8,24"  fill="#fca5a5" opacity="0.36"/>
    <polygon points="36,34 64,24 64,64 36,54" fill="#dc2626" opacity="0.32"/>
    <polygon points="36,34 8,24 8,64 36,54"  fill="#b91c1c" opacity="0.28"/>
    <polygon points="36,54 64,64 36,84"      fill="#7f1d1d" opacity="0.48"/>
    <polygon points="36,54 8,64 36,84"       fill="#991b1b" opacity="0.42"/>
    <ellipse cx="30" cy="18" rx="5" ry="8"  fill="white"   opacity="0.2" transform="rotate(-18 30 18)"/>
  </svg>
);

// ─── Pseudobrookite ───────────────────────────────────────────────────────────
export const Pseudobrookite = ({ size = defaultSize }) => (
  <svg width={size} height={size * 1.22} viewBox="0 0 72 88" fill="none" aria-label="Pseudobrookite blade crystals">
    <defs>
      <linearGradient id="pseudo-g" x1="0" y1="0" x2="10" y2="72" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#78716c"/>
        <stop offset="40%"  stopColor="#44403c"/>
        <stop offset="100%" stopColor="#1c1917"/>
      </linearGradient>
      <linearGradient id="pseudo-shine" x1="0" y1="0" x2="8" y2="60" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#a8a29e"/>
        <stop offset="100%" stopColor="#292524"/>
      </linearGradient>
    </defs>
    <g transform="rotate(-28 36 52)">
      <rect x="18" y="16" width="9" height="60" rx="2" fill="url(#pseudo-g)"    stroke="#57534e" strokeWidth="0.8"/>
      <rect x="19" y="16" width="3" height="60" rx="1" fill="url(#pseudo-shine)" opacity="0.5"/>
      <polygon points="18,16 27,16 22.5,6"  fill="#a8a29e"/>
      <polygon points="18,76 27,76 22.5,84" fill="#1c1917"/>
    </g>
    <g transform="rotate(-10 36 52)">
      <rect x="30" y="12" width="9" height="64" rx="2" fill="url(#pseudo-g)"    stroke="#57534e" strokeWidth="0.8"/>
      <rect x="31" y="12" width="3" height="64" rx="1" fill="url(#pseudo-shine)" opacity="0.45"/>
      <polygon points="30,12 39,12 34.5,4"  fill="#a8a29e"/>
      <polygon points="30,76 39,76 34.5,86" fill="#1c1917"/>
    </g>
    <g transform="rotate(12 36 52)">
      <rect x="42" y="18" width="9" height="58" rx="2" fill="url(#pseudo-g)"    stroke="#57534e" strokeWidth="0.8"/>
      <rect x="43" y="18" width="3" height="58" rx="1" fill="url(#pseudo-shine)" opacity="0.4"/>
      <polygon points="42,18 51,18 46.5,8"  fill="#a8a29e"/>
      <polygon points="42,76 51,76 46.5,84" fill="#1c1917"/>
    </g>
  </svg>
);

// ─── Router — maps a gem name to its component ────────────────────────────────
const GEM_MAP = {
  topaz:           Topaz,
  amethyst:        Amethyst,
  opal:            Opal,
  "red-beryl":     RedBeryl,
  garnet:          Garnet,
  pseudobrookite:  Pseudobrookite,
};

const GemIcon = ({ name, size = defaultSize, className = "" }) => {
  const Gem = GEM_MAP[name?.toLowerCase()];
  if (!Gem) return null;
  return (
    <span className={className} style={{ display: "inline-flex" }}>
      <Gem size={size} />
    </span>
  );
};

export default GemIcon;
