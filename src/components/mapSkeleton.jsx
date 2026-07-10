import React from "react";

/** Shared map placeholder — keep separate so Landing doesn't sync-import the map chunk. */
export const mapSkeleton = (
  <div className="w-full min-h-[340px] lg:min-h-[420px] bg-slate-800/60 rounded-2xl ring-1 ring-white/10 animate-pulse" />
);
