"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Header() {
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

  return (
    <header
      ref={containerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-black/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="mx-auto flex max-w-[1140px] items-center justify-between px-10 py-5 sm:px-16 md:px-20 lg:px-24">
        <a
          href="/"
          className="flex items-center gap-3"
          aria-label="Properganda - Home"
        >
          <Image
            src="/images/svg/logo.svg"
            alt="Properganda"
            width={126}
            height={22}
            priority
            className="h-10 w-auto"
          />
          <span className="text-xs font-medium tracking-[0.25em] text-white uppercase">
            Properganda
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          <a
            href="#about"
            className="text-sm text-white transition-colors hover:text-brand-green"
          >
            About
          </a>
          <a
            href="#work"
            className="text-sm text-white transition-colors hover:text-brand-green"
          >
            Work
          </a>
          <a
            href="#services"
            className="text-sm text-white transition-colors hover:text-brand-green"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-sm text-white transition-colors hover:text-brand-green"
          >
            Contact
          </a>
        </nav>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle mobile menu"
          type="button"
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-4 bg-brand-green" />
        </button>
      </div>
    </header>
  );
}
