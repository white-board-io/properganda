"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { buttonVariants } from "@/components/ui/button";
import { SiteContainer } from "@/components/ui/site-container";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const NAV_ITEMS = [
  { name: "About Us", href: "#about" },
  { name: "What We Do", href: "#services" },
  { name: "Clients", href: "#manifesto" },
  { name: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: "/images/svg/insta.svg",
  },
  { name: "X", href: "https://x.com", icon: "/images/svg/x.svg" },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: "/images/svg/linkedin.svg",
  },
];

export default function Header({
  variant = "default",
}: {
  variant?: "default" | "commandments";
}) {
  const containerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );


  const isFloatingPill = isScrolled;

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex flex-col items-center bg-black transition-all duration-300",
        "pt-8",
      )}
    >
      <SiteContainer className="mb-4 flex justify-end gap-5">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="ui-icon-link"
          >
            <Image src={link.icon} alt={link.name} width={28} height={28} />
          </a>
        ))}
      </SiteContainer>

      <header
        ref={containerRef}
        className={cn(
          "pointer-events-auto transition-all duration-300 mx-auto",
          isFloatingPill
            ? cn(
                "ui-card--floating border border-black/5 bg-white w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] xl:w-[calc(100%-8rem)] max-w-7xl",
                isMobileMenuOpen ? "rounded-3xl" : "rounded-full",
              )
            : cn(
                "w-full border border-transparent rounded-none",
                isMobileMenuOpen
                  ? "bg-brand-black/95 backdrop-blur-md"
                  : "bg-transparent",
              ),
        )}
        role="banner"
      >
        <SiteContainer
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-300 w-full",
            isFloatingPill && "px-10",
            isFloatingPill ? "py-4" : "py-5",
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Properganda - Home"
          >
            <Image
              src={isFloatingPill ? "/images/svg/logo-black.svg" : "/images/svg/logo.svg"}
              alt="Properganda"
              width={32}
              height={22}
              priority
              className="h-8 w-auto transition-all duration-300"
            />
            <span
              className={cn(
                "ui-type-body-lg font-medium uppercase tracking-[0.2em] transition-colors duration-300",
                isFloatingPill ? "text-brand-black" : "text-white",
              )}
            >
              Properganda
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-10 lg:gap-14 md:flex whitespace-nowrap"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "ui-nav-link transition-colors duration-300",
                  isFloatingPill ? "text-brand-black" : "text-white",
                )}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="#canopy"
              className={cn(
                buttonVariants({
                  variant: isFloatingPill ? "canopySolid" : "canopyOutline",
                  size: "sm",
                }),
                "gap-2.5 px-5 py-2 items-center transition-all duration-300",
              )}
            >
              <div className="flex flex-col text-left leading-[1.1] justify-center pt-[2px]">
                <span
                  className={cn(
                    "text-[10px] uppercase font-black tracking-widest transition-colors duration-300",
                    isFloatingPill ? "text-brand-black" : "text-yellow-400",
                  )}
                >
                  Our
                </span>
                <span
                  className={cn(
                    "text-[10px] font-black tracking-widest transition-colors duration-300",
                    isFloatingPill ? "text-brand-black" : "text-yellow-400",
                  )}
                >
                  Studio
                </span>
              </div>
              <Image
                src="/images/svg/canopy.svg"
                alt="CANOPY"
                width={100}
                height={14}
                className={cn(
                  "h-[14px] w-auto transition-all duration-300",
                  isFloatingPill && "brightness-0 invert",
                )}
              />
            </Link>
          </nav>

          <button
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle mobile menu"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span
              className={cn(
                "block h-0.5 w-6 transition-all duration-300",
                isMobileMenuOpen && "translate-y-2 rotate-45",
                isFloatingPill ? "bg-brand-black" : "bg-white",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6 transition-all duration-300",
                isMobileMenuOpen && "opacity-0",
                isFloatingPill ? "bg-brand-black" : "bg-white",
              )}
            />
            <span
              className={cn(
                "block h-0.5 transition-all duration-300",
                isMobileMenuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-4",
                isMobileMenuOpen
                  ? isFloatingPill
                    ? "bg-brand-black"
                    : "bg-white"
                  : "bg-brand-green",
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
                className={cn(
                  "ui-nav-link text-lg transition-colors duration-300",
                  isFloatingPill ? "text-brand-black" : "text-white",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="#canopy"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                buttonVariants({
                  variant: isFloatingPill ? "canopySolid" : "canopyOutline",
                  size: "sm",
                }),
                "gap-2.5 px-5 py-2 mt-2 items-center transition-all duration-300",
              )}
            >
              <div className="flex flex-col text-left leading-[1.1] justify-center pt-[2px]">
                <span
                  className={cn(
                    "text-[10px] uppercase font-black tracking-widest transition-colors duration-300",
                    isFloatingPill ? "text-brand-black" : "text-yellow-400",
                  )}
                >
                  Our
                </span>
                <span
                  className={cn(
                    "text-[10px] uppercase font-black tracking-widest transition-colors duration-300",
                    isFloatingPill ? "text-brand-black" : "text-yellow-400",
                  )}
                >
                  Studio
                </span>
              </div>
              <Image
                src="/images/svg/canopy.svg"
                alt="CANOPY"
                width={100}
                height={14}
                className={cn(
                  "h-[14px] w-auto transition-all duration-300",
                  isFloatingPill && "brightness-0",
                )}
              />
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
