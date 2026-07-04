import { useState, useEffect } from 'react';
import { isPrerender } from '../utils/prerender.js';

/**
 * Renders `fallback` during pre-render and the initial client paint,
 * then swaps to `children` after React mounts.
 *
 * Use this around any component that produces different output in
 * a headless/SSR environment vs a real browser (Google Maps, localStorage, etc.)
 * to prevent React hydration error #418.
 */
export function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!isPrerender()) setMounted(true);
  }, []);
  return mounted ? children : fallback;
}
