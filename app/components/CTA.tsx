"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".cta-heading", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".cta-grid-item",
          {
            opacity: 0,
            y: 40,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".cta-decor",
          {
            opacity: 0,
            scale: 0.5,
            rotation: -90,
            duration: 1,
            ease: "back.out(1.5)",
          },
          "-=0.6"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-brand-gray-dark px-4 py-24 sm:px-6 md:px-10 md:py-32 lg:px-16"
      aria-label="Get in touch"
    >
      {/* Decorative green glow */}
      <div
        className="cta-decor absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-brand-green/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-[10px] tracking-[0.3em] text-brand-gray uppercase">
              Get In Touch
            </p>
            <h2 className="cta-heading font-display text-[clamp(3rem,7vw,6rem)] leading-[1] tracking-wide text-white">
              Let&apos;s
              <br />
              get started!
            </h2>
          </div>

          {/* Decorative grid blocks (matching mock layout) */}
          <div className="grid grid-cols-3 gap-3" aria-hidden="true">
            <div className="cta-grid-item col-span-2 aspect-[2/1] rounded-lg bg-brand-black" />
            <div className="cta-grid-item aspect-square rounded-lg bg-brand-green" />
            <div className="cta-grid-item aspect-square rounded-lg bg-brand-green" />
            <div className="cta-grid-item col-span-2 aspect-[2/1] rounded-lg bg-brand-black" />
          </div>
        </div>
      </div>
    </section>
  );
}
