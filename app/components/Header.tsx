"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { SiteContainer } from "@/components/ui/site-container";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "About Us", href: "#about" },
  { name: "What We Do", href: "#services" },
  { name: "Clients", href: "#manifesto" },
  { name: "Contact", href: "#contact" },
];

export default function Header({
  variant = "default",
}: {
  variant?: "default" | "commandments";
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      data-variant={variant}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex flex-col items-center pt-4 md:pt-5",
      )}
      style={{
        background: "linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 1) 100%)",
      }}
    >
      <header
        className={cn(
          "pointer-events-auto mx-auto w-full max-w-[calc(100%-1rem)] md:max-w-4xl lg:max-w-7xl",
          "border border-transparent rounded-none",
          isMobileMenuOpen
            ? "bg-brand-black/95 backdrop-blur-md"
            : "bg-transparent",
        )}
        role="banner"
      >
        <SiteContainer
          className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 md:min-h-[70px] md:px-6"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 self-center"
            aria-label="Properganda - Home"
          >
            <Image
              src="/images/svg/logo.svg"
              alt="Properganda"
              width={32}
              height={22}
              priority
              className="h-7 w-auto md:h-[30px]"
            />
            <span
              className="ui-type-body-lg self-center font-medium uppercase tracking-[0.2em] text-white"
            >
              Properganda
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center self-center whitespace-nowrap md:flex md:gap-9 lg:gap-12"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="ui-nav-link text-white"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="#canopy"
              className={cn(
                buttonVariants({
                  variant: "canopyOutline",
                  size: "sm",
                }),
                "items-center gap-2.5 self-center px-5 py-2",
              )}
            >
              <div className="flex flex-col text-left leading-[1.1] justify-center pt-[2px]">
                <span className="text-[10px] uppercase font-black tracking-widest transition-colors duration-300 text-yellow-400">
                  Our
                </span>
                <span className="text-[10px] font-black tracking-widest transition-colors duration-300 text-yellow-400">
                  Studio
                </span>
              </div>
              <Image
                src="/images/svg/canopy.svg"
                alt="CANOPY"
                width={100}
                height={14}
                className="h-[14px] w-[100px] transition-all duration-300"
              />
            </Link>
          </nav>

          <button
            className="flex flex-col gap-1.5 self-center md:hidden"
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
                isMobileMenuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-4",
                isMobileMenuOpen ? "bg-white" : "bg-brand-green",
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
                className="ui-nav-link text-lg transition-colors duration-300 text-white"
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
                  variant: "canopyOutline",
                  size: "sm",
                }),
                "gap-2.5 px-5 py-2 mt-2 items-center transition-all duration-300",
              )}
            >
              <div className="flex flex-col text-left leading-[1.1] justify-center pt-[2px]">
                <span className="text-[10px] uppercase font-black tracking-widest transition-colors duration-300 text-yellow-400">
                  Our
                </span>
                <span className="text-[10px] uppercase font-black tracking-widest transition-colors duration-300 text-yellow-400">
                  Studio
                </span>
              </div>
              <Image
                src="/images/svg/canopy.svg"
                alt="CANOPY"
                width={100}
                height={14}
                className="h-[14px] w-[100px] transition-all duration-300"
              />
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
