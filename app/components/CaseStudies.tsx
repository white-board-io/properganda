"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { createScrollReveal } from "@/lib/gsap-reveal";
import { SectionShell } from "@/components/ui/section-shell";

gsap.registerPlugin(useGSAP);

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      createScrollReveal(".case-video-container", {
        trigger: sectionRef.current,
        start: "top 72%",
        duration: 1,
        scale: 0.975,
        blur: 0,
        clipPath: "inset(8% 0% 8% 0% round 1.5rem)",
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
