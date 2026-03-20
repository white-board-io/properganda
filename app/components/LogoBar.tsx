"use client";

import Image from "next/image";

import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

const LOGO_ROWS = [
  [
    { name: "NDAP", src: "/images/svg/ndap.svg", width: 125, height: 127 },
    { name: "UNDP", src: "/images/svg/undp.svg", width: 63, height: 128 },
    { name: "Tripura", src: "/images/svg/tripura.svg", width: 141, height: 127 },
    { name: "Emblem", src: "/images/svg/emblem-1.svg", width: 145, height: 130 },
    { name: "NITI Aayog", src: "/images/svg/niti.svg", width: 137, height: 130 },
    { name: "GSTPAM", src: "/images/svg/gstpam.svg", width: 84, height: 131 },
    { name: "HCC", src: "/images/svg/hcc.svg", width: 244, height: 67 },
  ],
  [
    { name: "Yamaha", src: "/images/svg/yamaha.svg", width: 261, height: 55 },
    { name: "Amazon", src: "/images/svg/amazon.svg", width: 211, height: 64 },
    { name: "Learning Links", src: "/images/svg/learnings.svg", width: 100, height: 85 },
    { name: "Hero Future Energies", src: "/images/svg/hfe.svg", width: 177, height: 92 },
    { name: "UK India Business Council", src: "/images/svg/uki.svg", width: 287, height: 73 },
  ],
  [
    { name: "Nasscom Foundation", src: "/images/svg/nf.svg", width: 230, height: 71 },
    { name: "Ciena", src: "/images/svg/ciena.svg", width: 215, height: 72 },
    { name: "Torii", src: "/images/svg/torii.svg", width: 190, height: 72 },
    { name: "Sterlite", src: "/images/svg/sterlite.svg", width: 327, height: 56 },
    { name: "BluPine Energy", src: "/images/svg/bpe.svg", width: 187, height: 116 },
  ],
  [
    { name: "Athithi", src: "/images/svg/athithi.svg", width: 126, height: 81 },
    { name: "Sanjog", src: "/images/svg/sanjog.svg", width: 221, height: 92 },
    { name: "PRCAI", src: "/images/svg/prcai.svg", width: 166, height: 82 },
    { name: "Pocket Aces", src: "/images/svg/pa.svg", width: 325, height: 81 },
  ],
];

export default function LogoBar() {
  return (
    <SectionShell
      variant="light"
      spacing="none"
      className="py-16 md:py-24"
      aria-label="Trusted by"
    >
      <SiteContainer>
        <div className="flex w-full flex-col items-center gap-10 md:gap-12 lg:gap-16">
          {LOGO_ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex w-full flex-nowrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12"
            >
              {row.map((logo) => (
                <div
                  key={logo.name}
                  className="flex shrink items-center justify-center min-w-0"
                >
                  <Image
                    width={logo.width}
                    height={logo.height}
                    src={logo.src}
                    alt={logo.name}
                    className="object-contain w-full h-auto"
                    style={{ maxWidth: logo.width }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
