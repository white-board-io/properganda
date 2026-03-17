"use client";

import Image from "next/image";

import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

const LOGOS = [
  { name: "HCC", src: "/images/svg/hcc.svg" },
  { name: "Hero Future Energies", src: "/images/svg/hfe.svg" },
  { name: "UK India Business Council", src: "/images/svg/uki.svg" },
  { name: "BluPine Energy", src: "/images/svg/bpe.svg" },
  { name: "Nasscom Foundation", src: "/images/svg/nf.svg" },
  { name: "Torii", src: "/images/svg/tor.svg" },
];

export default function LogoBar() {
  return (
    <SectionShell
      variant="light"
      spacing="none"
      className="py-12"
      aria-label="Trusted by"
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
      <SiteContainer>
        <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 pr-12 lg:gap-24 lg:pr-24"
              aria-hidden={i === 1}
            >
              {LOGOS.map((logo) => (
                <div
                  key={logo.name}
                  className="flex items-center justify-center opacity-70 transition-opacity hover:opacity-100"
                >
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
          ))}
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
