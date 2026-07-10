import { useState, useEffect } from 'react';

/**
 * Renders `fallback` during the initial client paint,
 * then swaps to `children` after React mounts.
 *
 * Use around components that differ between SSR and browser
 * (Google Maps, localStorage, etc.) to avoid hydration mismatches.
 */
export function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted ? children : fallback;
}
