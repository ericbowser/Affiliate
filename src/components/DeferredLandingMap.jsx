import React, { Suspense, lazy } from "react";

const skeleton = (
  <div className="w-full min-h-[340px] lg:min-h-[420px] bg-slate-800/60 rounded-2xl ring-1 ring-white/10 animate-pulse" />
);

const LandingMapWithProvider = lazy(() =>
  import("./LandingMapWithProvider")
);

/** Defer map SDK until after first paint — keeps mobile LCP on hero text. */
export default function DeferredLandingMap(props) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const start = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 200);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return skeleton;

  return (
    <Suspense fallback={skeleton}>
      <LandingMapWithProvider {...props} />
    </Suspense>
  );
}
