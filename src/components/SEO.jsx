/**
 * SEO.jsx — Per-page meta tag component
 *
 * Single Responsibility: renders <title>, meta description, canonical URL,
 * and Open Graph / Twitter tags for whatever page mounts it.
 *
 * Open/Closed: every route gets correct, unique SEO by passing props —
 * no route needs to know about <head> mechanics, just call <SEO ... />.
 *
 * Falls back to sensible site-wide defaults if a page omits a prop,
 * so partial usage never breaks the <head>.
 */
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const SITE_NAME = "Wasatch Rockhound";
const SITE_URL = "https://rockhoundutah.com";
const DEFAULT_DESCRIPTION =
  "Honest gear reviews, site guides, and beginner resources for rockhounding across Utah and the American West. Find what to buy, where to go, and what to bring.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Signals react-snap to capture after Helmet has flushed head tags (Helmet uses useEffect). */
function SeoReadySignal({ token }) {
  useEffect(() => {
    let cancelled = false;
    const markReady = () => {
      if (!cancelled) document.documentElement.dataset.seoReady = token;
    };
    // Double rAF: run after Helmet's effect commits to <head>
    requestAnimationFrame(() => requestAnimationFrame(markReady));
    return () => {
      cancelled = true;
      delete document.documentElement.dataset.seoReady;
    };
  }, [token]);
  return null;
}

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Gear Reviews & Field Guides`;
  const canonical = `${SITE_URL}${path}`;

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        {noindex && <meta name="robots" content="noindex, nofollow" />}

        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content={SITE_NAME} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
      <SeoReadySignal token={path || "/"} />
    </>
  );
};

export default SEO;
