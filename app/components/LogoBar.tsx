"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const logos = [
  { name: "HCC", text: "HCC" },
  { name: "Green Initiative", text: "GI" },
  { name: "UK India", text: "UK INDIA" },
  { name: "BlueBay", text: "BlueBay" },
  { name: "Sangam Group", text: "SANGAM" },
  { name: "Torii", text: "torii" },
];

export default function LogoBar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".logo-item", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="border-y border-white/10 bg-brand-black py-8"
      aria-label="Trusted by"
    >
      <div className="mx-auto max-w-[1140px] px-10 sm:px-16 md:px-20 lg:px-24">
        <div className="flex flex-wrap items-center justify-between gap-8">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="logo-item flex items-center justify-center"
              aria-label={logo.name}
            >
              <span className="font-display text-2xl tracking-wider text-white/50 uppercase transition-colors hover:text-white">
                {logo.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
