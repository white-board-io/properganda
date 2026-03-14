"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

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
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center bg-[#000000] ${isCommandments ? "pt-8 px-4 sm:px-6 md:px-10 lg:px-16" : "pointer-events-none"}`}
    >
      {isCommandments && (
        <div className="flex w-full max-w-[1400px] justify-end gap-5 mb-4 px-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <Image
              src="/images/svg/insta.svg"
              alt="Instagram"
              width={28}
              height={28}
              className=""
            />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <Image
              src="/images/svg/x.svg"
              alt="X"
              width={28}
              height={28}
              className=""
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <Image
              src="/images/svg/linkedin.svg"
              alt="LinkedIn"
              width={28}
              height={28}
              className=""
            />
          </a>
        </div>
      )}

      <header
        ref={containerRef}
        className={`w-full transition-all duration-300 pointer-events-auto ${
          isCommandments
            ? "bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/5"
            : isScrolled
              ? "bg-brand-black/95 backdrop-blur-md border-b border-white/5"
              : "bg-transparent"
        }`}
        role="banner"
      >
        <div
          className={`mx-auto flex w-full max-w-[1400px] items-center justify-between ${isCommandments ? "py-4 px-10" : "py-5 px-4 sm:px-6 md:px-10 lg:px-16"}`}
        >
          <a
            href="/"
            className="flex items-center gap-2"
            aria-label="Properganda - Home"
          >
            <Image
              src="/images/svg/logo.svg"
              alt="Properganda"
              width={32}
              height={22}
              priority
              className={`h-8 w-auto ${isCommandments ? "invert brightness-0" : ""}`}
            />
            <span
              className={`font-inter text-[20px] font-medium tracking-[0.2em] uppercase ${isCommandments ? "text-brand-black" : "text-white"}`}
            >
              Properganda
            </span>
          </a>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-10 md:flex"
          >
            {[
              { name: "About Us", href: "#about" },
              { name: "What We Do", href: "#services" },
              { name: "Clients", href: "#manifesto" },
              { name: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-inter text-[15px] font-medium transition-colors hover:text-brand-green ${
                  isCommandments ? "text-brand-black" : "text-white"
                }`}
              >
                {item.name}
              </a>
            ))}

            <a
              href="#canopy"
              className={`flex items-center justify-center gap-3 rounded-full px-6 py-2.5 transition-all ${
                isCommandments
                  ? "bg-[#FFCC00] hover:bg-[#E6B800]"
                  : "border-[#FFCC00] hover:bg-[#FFCC00]/10 border"
              }`}
            >
              <div className="flex flex-col text-left leading-tight">
                <span
                  className={`text-[8px] font-black uppercase tracking-wider ${isCommandments ? "text-brand-black" : "text-[#FFCC00]"}`}
                >
                  Our
                </span>
                <span
                  className={`text-[8px] font-black uppercase tracking-wider ${isCommandments ? "text-brand-black" : "text-[#FFCC00]"}`}
                >
                  Studio
                </span>
              </div>
              <Image
                src="/images/svg/canopy.svg"
                alt="CANOPY"
                width={100}
                height={14}
                className={`w-auto h-3.5 ${isCommandments ? "brightness-0" : ""}`}
              />
            </a>
          </nav>

          <button
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle mobile menu"
            type="button"
          >
            <span
              className={`block h-0.5 w-6 ${isCommandments ? "bg-brand-black" : "bg-white"}`}
            />
            <span
              className={`block h-0.5 w-6 ${isCommandments ? "bg-brand-black" : "bg-white"}`}
            />
            <span className="block h-0.5 w-4 bg-brand-green" />
          </button>
        </div>
      </header>
    </div>
  );
}
