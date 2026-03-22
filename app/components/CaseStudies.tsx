"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { SectionShell } from "@/components/ui/section-shell";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".case-video-container", {
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <SectionShell
      ref={sectionRef}
      id="work"
      variant="dark"
      spacing="none"
      aria-label="Case studies"
      className="px-0 !py-0"
    >
      <div className="case-video-container relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/videos/HCC%20Sea%20Link%20Drone%202.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </SectionShell>
  );
}
