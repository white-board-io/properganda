"use client";

import { useEffect, useEffectEvent, useState } from "react";

const BREAKPOINTS = [
  { label: "2xl", minWidth: 1536 },
  { label: "xl", minWidth: 1280 },
  { label: "lg", minWidth: 1024 },
  { label: "md", minWidth: 768 },
  { label: "sm", minWidth: 640 },
  { label: "xs", minWidth: 0 },
] as const;

type BreakpointLabel = (typeof BREAKPOINTS)[number]["label"];

function getBreakpoint(width: number): BreakpointLabel {
  return (
    BREAKPOINTS.find((breakpoint) => width >= breakpoint.minWidth)?.label ??
    "xs"
  );
}

function getNextBreakpoint(width: number) {
  return [...BREAKPOINTS].reverse().find(
    (breakpoint) => breakpoint.minWidth > width,
  );
}

export default function BreakpointIndicator() {
  const [width, setWidth] = useState(0);

  const syncViewport = useEffectEvent(() => {
    setWidth(window.visualViewport?.width ?? window.innerWidth);
  });

  useEffect(() => {
    syncViewport();

    window.addEventListener("resize", syncViewport);
    window.visualViewport?.addEventListener("resize", syncViewport);

    return () => {
      window.removeEventListener("resize", syncViewport);
      window.visualViewport?.removeEventListener("resize", syncViewport);
    };
  }, []);

  const roundedWidth = Math.round(width);
  const breakpoint = getBreakpoint(roundedWidth);
  const nextBreakpoint = getNextBreakpoint(roundedWidth);

  return (
    <aside className="pointer-events-none fixed bottom-4 left-4 z-[9999] rounded-2xl border border-white/10 bg-black/85 px-4 py-3 text-white shadow-[0_14px_45px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <p className="font-inter-google text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-green-500">
        Breakpoint
      </p>
      <p className="mt-1 font-bebas-neue text-4xl leading-none text-white">
        {breakpoint}
      </p>
      <p className="mt-1 font-inter-google text-xs text-white/80">
        {roundedWidth}px wide
      </p>
      <p className="mt-1 font-inter-google text-[0.6875rem] text-white/60">
        {nextBreakpoint
          ? `Next: ${nextBreakpoint.label} at ${nextBreakpoint.minWidth}px`
          : "Top breakpoint reached"}
      </p>
    </aside>
  );
}
