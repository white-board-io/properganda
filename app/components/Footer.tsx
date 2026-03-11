"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-heading > *", {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".footer-hex", {
        opacity: 0,
        scale: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".footer-hex-row",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <footer
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-black px-4 pt-24 pb-8 sm:px-6 md:px-10 md:pt-32 lg:px-16"
      role="contentinfo"
    >
      {/* Large decorative hexagon — left side */}
      <div
        className="absolute -left-16 bottom-20 opacity-20 md:-left-8 md:bottom-24"
        aria-hidden="true"
      >
        <svg
          width="220"
          height="220"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
            stroke="#00E04A"
            strokeWidth="0.8"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        {/* Giant Heading */}
        <div className="footer-heading mb-16">
          <p className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] tracking-wide text-white">
            We&apos;re not big,
          </p>
          <p className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] tracking-wide text-white">
            We&apos;re <span className="text-brand-green">GIANT</span>
          </p>
        </div>

        {/* Decorative hexagons row */}
        <div className="footer-hex-row mb-16 flex items-center gap-4" aria-hidden="true">
          {[48, 64, 40, 56].map((size, i) => (
            <svg
              key={i}
              className="footer-hex"
              width={size}
              height={size}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
                stroke="#00E04A"
                strokeWidth="1.5"
                fill="none"
                opacity={0.3 + i * 0.2}
              />
            </svg>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <svg
                width="28"
                height="28"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
                  stroke="#00E04A"
                  strokeWidth="2"
                  fill="none"
                />
                <text
                  x="20"
                  y="26"
                  textAnchor="middle"
                  fill="#00E04A"
                  fontSize="18"
                  fontWeight="700"
                  fontFamily="sans-serif"
                >
                  P
                </text>
              </svg>
              <span className="text-xs tracking-[0.25em] text-brand-gray uppercase">
                Properganda
              </span>
            </div>

            <nav aria-label="Footer navigation" className="flex gap-6">
              <a href="#about" className="text-xs text-brand-gray transition-colors hover:text-brand-green">
                About
              </a>
              <a href="#work" className="text-xs text-brand-gray transition-colors hover:text-brand-green">
                Work
              </a>
              <a href="#services" className="text-xs text-brand-gray transition-colors hover:text-brand-green">
                Services
              </a>
              <a href="#contact" className="text-xs text-brand-gray transition-colors hover:text-brand-green">
                Contact
              </a>
            </nav>

            <p className="text-xs text-brand-gray">
              &copy; {new Date().getFullYear()} Properganda. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
