"use client";

import { SectionShell } from "@/components/ui/section-shell";

export default function CaseStudies() {
  return (
    <SectionShell
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
