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
  { name: "Instagram", href: "https://instagram.com", icon: "/images/svg/insta.svg" },
  { name: "X", href: "https://x.com", icon: "/images/svg/x.svg" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "/images/svg/linkedin.svg" },
];

export default function Header({
  variant = "default",
}: {
  variant?: "default" | "commandments";
}) {
  const containerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const isCommandments = variant === "commandments";

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex flex-col items-center bg-black",
        isCommandments ? "pt-8" : "pointer-events-none",
      )}
    >
      {isCommandments && (
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
      )}

      <header
        ref={containerRef}
        className={cn(
          "w-full pointer-events-auto transition-all duration-300",
          isCommandments
            ? "ui-card--floating rounded-full border border-black/5 bg-white"
            : isScrolled
              ? "border-b border-white/5 bg-brand-black/95 backdrop-blur-md"
              : "bg-transparent",
        )}
        role="banner"
      >
        <SiteContainer className={cn("flex items-center justify-between", isCommandments ? "py-4" : "py-5")}>
          <Link href="/" className="flex items-center gap-2" aria-label="Properganda - Home">
            <Image
              src="/images/svg/logo.svg"
              alt="Properganda"
              width={32}
              height={22}
              priority
              className={cn("h-8 w-auto", isCommandments && "invert brightness-0")}
            />
            <span
              className={cn(
                "ui-type-body-lg font-medium uppercase tracking-[0.2em]",
                isCommandments ? "text-brand-black" : "text-white",
              )}
            >
              Properganda
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-10 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "ui-nav-link",
                  isCommandments ? "text-brand-black" : "text-white",
                )}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="#canopy"
              className={cn(
                buttonVariants({
                  variant: isCommandments ? "canopySolid" : "canopyOutline",
                  size: "sm",
                }),
                "gap-3 px-6 py-2.5",
              )}
            >
              <div className="flex flex-col text-left leading-tight">
                <span
                  className={cn(
                    "ui-caption font-black tracking-wider",
                    isCommandments ? "text-brand-black" : "text-yellow-400",
                  )}
                >
                  Our
                </span>
                <span
                  className={cn(
                    "ui-caption font-black tracking-wider",
                    isCommandments ? "text-brand-black" : "text-yellow-400",
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
                className={cn("h-3.5 w-auto", isCommandments && "brightness-0")}
              />
            </Link>
          </nav>

          <button
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle mobile menu"
            type="button"
          >
            <span
              className={cn(
                "block h-0.5 w-6",
                isCommandments ? "bg-brand-black" : "bg-white",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-6",
                isCommandments ? "bg-brand-black" : "bg-white",
              )}
            />
            <span className="block h-0.5 w-4 bg-brand-green" />
          </button>
        </SiteContainer>
      </header>
    </div>
  );
}
