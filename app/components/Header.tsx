"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { SiteContainer } from "@/components/ui/site-container";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "About Us", href: "#about" },
  { name: "What We Do", href: "#services" },
  { name: "Clients", href: "#manifesto" },
  { name: "Contact", href: "#contact" },
];



export default function Header({
  variant: _variant = "default",
}: {
  variant?: "default" | "commandments";
}) {
  void _variant;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center"
      style={{
        paddingTop: pastHero ? "0.5rem" : "2rem",
        transition: "padding-top 500ms ease",
      }}
    >
      {/* Layer 1: gradient — visible inside Hero, fades out after */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 transition-opacity duration-200"
        style={{
          height: "calc(100% + 6rem)",
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.6) 55%, rgba(0, 0, 0, 0.3) 75%, rgba(0, 0, 0, 0) 100%)",
          opacity: pastHero ? 0 : 1,
        }}
      />
      {/* Layer 2: solid bg — fades in after Hero */}
      <div
        className="pointer-events-none absolute inset-0 bg-brand-black/95 shadow-md transition-opacity duration-200"
        style={{ opacity: pastHero ? 1 : 0 }}
      />

      <header
        className={cn(
          "pointer-events-auto transition-all duration-300 mx-auto w-full max-w-[calc(100%-1rem)] md:max-w-4xl lg:max-w-7xl",
          "border border-transparent rounded-none",
          isMobileMenuOpen
            ? "bg-brand-black/95 backdrop-blur-md"
            : "bg-transparent",
        )}
        role="banner"
      >
        <SiteContainer
          className="flex items-center justify-between gap-4 transition-all duration-300 w-full py-5 !px-0"
        >
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 ml-4 md:ml-0"
            aria-label="Properganda - Home"
          >
            <Image
              src="/images/svg/logo-text.svg"
              alt="Properganda"
              width={32}
              height={22}
              priority
              className="h-8 w-auto transition-all duration-300 drop-shadow-[0_2px_14px_rgba(0,0,0,0.75)]"
            />
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-10 lg:gap-14 md:flex whitespace-nowrap z-10"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="ui-nav-link text-white transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            className="flex flex-col gap-1.5 md:hidden mr-4 md:mr-0 opacity-100 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]"
            aria-label="Toggle mobile menu"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className={cn(
                "block h-0.5 w-6 transition-all duration-300 bg-white",
                isMobileMenuOpen && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 transition-all duration-300 bg-white",
                isMobileMenuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 transition-all duration-300",
                isMobileMenuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-6",
                "bg-white",
              )}
            />
          </button>
        </SiteContainer>

        {/* Mobile menu dropdown */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav className="flex flex-col items-center gap-6 pb-8 pt-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="ui-nav-link text-lg text-white transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
}
