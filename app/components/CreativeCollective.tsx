"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CreativeCollective() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cc-text-item", {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".cc-image", {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".cc-button", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cc-button",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-brand-black py-24 md:py-32"
      aria-label="About - Creative Collective"
    >
      <div className="mx-auto max-w-[1140px] px-10 sm:px-16 md:px-20 lg:px-24">
        <p className="mb-14 text-[10px] tracking-[0.3em] text-brand-gray uppercase">
          About Us
        </p>

        <div className="grid gap-12 md:grid-cols-2 md:gap-10">
          {/* Text Content */}
          <div className="flex flex-col justify-center gap-6">
            <h2 className="cc-text-item font-display text-5xl uppercase tracking-wide text-white md:text-6xl">
              Creative
              <br />
              Collective
            </h2>
            <blockquote className="cc-text-item border-l-4 border-brand-green pl-6">
              <p className="font-display text-3xl text-brand-green md:text-4xl">
                We rise by
                <br />
                lifting others.
              </p>
            </blockquote>
            <p className="cc-text-item max-w-md text-sm leading-relaxed text-brand-gray">
              We believe in the power of collaboration and collective creativity.
              Our approach is rooted in purpose, driven by passion, and guided by
              conscience. Together, we create work that matters.
            </p>
            <a
              href="#commandments"
              className="cc-button mt-4 inline-flex w-fit items-center gap-3 rounded-full border-2 border-brand-green px-8 py-3 text-sm font-semibold text-brand-green transition-all hover:bg-brand-green hover:text-brand-black"
              role="link"
            >
              Read Our 10 Commandments
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Image Placeholder — Torii Gate */}
          <div className="cc-image relative aspect-[4/5] overflow-hidden rounded-lg bg-brand-green-muted md:aspect-auto">
            <div className="flex h-full min-h-[400px] items-center justify-center bg-gradient-to-b from-brand-green-muted to-brand-black">
              <div className="text-center">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-4 opacity-40"
                  aria-hidden="true"
                >
                  <rect x="10" y="20" width="60" height="6" rx="1" fill="#00E04A" />
                  <rect x="15" y="30" width="50" height="4" rx="1" fill="#00E04A" />
                  <rect x="22" y="34" width="6" height="40" rx="1" fill="#00E04A" />
                  <rect x="52" y="34" width="6" height="40" rx="1" fill="#00E04A" />
                </svg>
                <p className="text-xs text-brand-gray">[Torii Gate Image Placeholder]</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
