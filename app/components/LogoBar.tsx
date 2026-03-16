"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LOGOS = [
  { name: "HCC", src: "/images/svg/hcc.svg" },
  { name: "Hero Future Energies", src: "/images/svg/hfe.svg" },
  { name: "UK India Business Council", src: "/images/svg/uki.svg" },
  { name: "BluPine Energy", src: "/images/svg/bpe.svg" },
  { name: "Nasscom Foundation", src: "/images/svg/nf.svg" },
  { name: "Torii", src: "/images/svg/tor.svg" },
];

export default function LogoBar() {
  const containerRef = useRef<HTMLElement>(null);

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
    { scope: containerRef },
  );

  return (
    <SectionShell
      ref={containerRef}
      variant="light"
      spacing="none"
      className="py-12"
      aria-label="Trusted by"
    >
      <SiteContainer>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:justify-between">
          {LOGOS.map((logo) => (
            <div key={logo.name} className="logo-item flex items-center justify-center">
              <Image
                width={120}
                height={48}
                src={logo.src}
                alt={logo.name}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
