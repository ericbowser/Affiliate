import React from "react";
import { GEM_ASSETS } from "../../assets/gems";

const defaultSize = 72;

/**
 * GemIcon — renders a gem SVG from the assets folder.
 *
 * Usage:
 *   <GemIcon name="topaz" />
 *   <GemIcon name="garnet" size={48} />
 *   <GemIcon name="red-beryl" className="inline-block mr-2" />
 *
 * Available names: topaz, amethyst, opal, red-beryl, garnet, pseudobrookite, geode,
 *   trilobite, agate, fluorite, sunstone, pyrope
 */
const GemIcon = ({ name, size = defaultSize, className = "" }) => {
  const src = GEM_ASSETS[name?.toLowerCase()];
  if (!src) return null;

  return (
    <img
      src={src}
      alt={`${name} mineral`}
      width={size}
      height={size}
      className={className}
      style={{ display: "inline-block", objectFit: "contain" }}
      loading="lazy"
    />
  );
};

export default GemIcon;
