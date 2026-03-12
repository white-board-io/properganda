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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-10 lg:px-16 ${
        isScrolled
          ? "bg-brand-black/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between py-5">
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
          <span className="font-inter-google text-[31px] font-medium tracking-[0.25em] text-white uppercase">
            Properganda
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          <a
            href="#about"
            className="font-inter-google text-[20px] leading-[20px] text-white transition-colors hover:text-brand-green"
          >
            About Us
          </a>
          <a
            href="#services"
            className="font-inter-google text-[20px] leading-[20px] text-white transition-colors hover:text-brand-green"
          >
            What We Do
          </a>
          <a
            href="#clients"
            className="font-inter-google text-[20px] leading-[20px] text-white transition-colors hover:text-brand-green"
          >
            Clients
          </a>
          <a
            href="#contact"
            className="font-inter-google text-[20px] leading-[20px] text-white transition-colors hover:text-brand-green"
          >
            Contact
          </a>

          <a
            href="#canopy"
            className="ml-2 flex items-center justify-center gap-3 rounded-full border border-[#FFCC00] px-4 py-3 transition-all hover:bg-[#FFCC00]/10"
          >
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[8px] text-[#FFCC00]">Our</span>
              <span className="text-[8px] text-[#FFCC00]">Studio</span>
            </div>
            <Image 
              src="/images/svg/canopy.svg" 
              alt="CANOPY" 
              width={161} 
              height={21} 
              className="w-auto" 
            />
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
