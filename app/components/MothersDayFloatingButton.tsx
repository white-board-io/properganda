"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function MothersDayFloatingButton() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY >= window.innerHeight - 250);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/proper/mothers-day"
      aria-label="Open the Mother's Day coloring studio"
      aria-hidden={pastHero}
      tabIndex={pastHero ? -1 : 0}
      data-hidden={pastHero ? "true" : undefined}
      className="mothers-day-fab"
    >
      <span className="mothers-day-fab__icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinejoin="round"
        >
          <path d="M12 21s-7.5-4.6-9.5-9.4C1.1 8 3.4 4.5 6.9 4.5c2 0 3.6 1.1 5.1 3 1.5-1.9 3.1-3 5.1-3 3.5 0 5.8 3.5 4.4 7.1C19.5 16.4 12 21 12 21z" />
        </svg>
      </span>
      <span className="mothers-day-fab__text">
        <span className="mothers-day-fab__eyebrow">Mother&apos;s Day</span>
        <span className="mothers-day-fab__cta">Color a wish for Mom</span>
      </span>
      <span className="mothers-day-fab__arrow" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </span>
    </Link>
  );
}
