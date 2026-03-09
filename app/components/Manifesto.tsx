"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".manifesto-item", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".manifesto-logo", {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-brand-gray-light py-24 md:py-32"
      aria-label="Brand manifesto"
    >
      <div className="mx-auto max-w-[1140px] px-10 sm:px-16 md:px-20 lg:px-24">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-6">
            {/* Hexagon icon */}
            <div className="manifesto-item" aria-hidden="true">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
                  stroke="#00E04A"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            <h2 className="manifesto-item font-display text-3xl uppercase tracking-wide text-brand-black md:text-4xl">
              Brand Manifesto & Philosophy
            </h2>

            <p className="manifesto-item max-w-2xl text-sm leading-relaxed text-brand-gray-dark">
              <strong className="text-brand-black">Properganda</strong> stands
              at the intersection of creativity and conscience. We believe that
              the most powerful brands are those built on authentic values, told
              through compelling stories, and designed to make a genuine impact.
              Our collective approach brings together diverse perspectives to
              craft campaigns that resonate, brands that endure, and
              conversations that matter.
            </p>

            <p className="manifesto-item max-w-2xl text-sm leading-relaxed text-brand-gray-dark">
              Every project we undertake is guided by our commitment to
              purposeful creativity — work that not only captures attention but
              also drives meaningful change. We don&apos;t just make things look
              good; we make things that do good.
            </p>
          </div>

          {/* Torii branding element */}
          <div className="manifesto-logo flex flex-col items-center gap-3" aria-hidden="true">
            <svg
              width="60"
              height="60"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" y="20" width="60" height="6" rx="1" fill="#0A0A0A" />
              <rect x="15" y="30" width="50" height="4" rx="1" fill="#0A0A0A" />
              <rect x="22" y="34" width="6" height="40" rx="1" fill="#0A0A0A" />
              <rect x="52" y="34" width="6" height="40" rx="1" fill="#0A0A0A" />
            </svg>
            <span className="font-display text-2xl tracking-widest text-brand-black">
              torii
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
