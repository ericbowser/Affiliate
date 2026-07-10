import React, { Suspense, lazy } from "react";

const LandingMap = lazy(() => import("./LandingMap"));

/** Defer map chunk until after first paint — keeps LCP on hero text, not Maps SDK. */
export default function DeferredLandingMap(props) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 50);
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return (
      <div className="w-full min-h-[340px] lg:min-h-[420px] bg-slate-800/60 rounded-2xl ring-1 ring-white/10 animate-pulse" />
    );
  }

  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[340px] lg:min-h-[420px] bg-slate-800/60 rounded-2xl ring-1 ring-white/10 animate-pulse" />
      }
    >
      <LandingMap {...props} />
    </Suspense>
  );
}
