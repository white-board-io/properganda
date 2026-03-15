"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MOSAIC_CANVAS_PADDING = "calc(924 / 1528 * 100%)";

const mosaicStyles = {
  cardOne: {
    left: "0%",
    top: "0%",
    width: "43.85%",
    height: "53.79%",
  },
  cardTwo: {
    left: "49.15%",
    top: "0%",
    width: "50.85%",
    height: "40.04%",
  },
  cardThree: {
    left: "0%",
    top: "61.58%",
    width: "29.84%",
    height: "38.42%",
  },
  cardFour: {
    left: "35.41%",
    top: "61.58%",
    width: "27.62%",
    height: "38.42%",
  },
  label: {
    left: "49.15%",
    top: "40.04%",
    width: "19.44%",
  },
  cardFive: {
    left: "68.59%",
    top: "48.81%",
    width: "31.41%",
    height: "51.19%",
  },
  cardFiveCopy: {
    left: "8.75%",
    top: "9.09%",
    width: "50%",
  },
  cardFiveLogoOne: {
    left: "5.83%",
    top: "76.74%",
    width: "22.71%",
    height: "17.34%",
  },
  cardFiveLogoTwo: {
    left: "33.13%",
    top: "76.96%",
    width: "8.54%",
    height: "17.55%",
  },
} satisfies Record<string, CSSProperties>;

function ArrowIcon() {
  return (
    <div className="ui-case-arrow">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".case-card", {
        opacity: 0,
        y: 50,
        scale: 0.96,
        stagger: 0.1,
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
      aria-label="Case studies"
    >
      <SiteContainer>
        <SectionEyebrow className="cc-text-item">Case Study</SectionEyebrow>

        {/*
          Figma-derived absolute grid:
          Total canvas: 1528 × 924 px (aspect-ratio preserved via padding-top trick)
          Each card keeps its local L/T/W/H percentages because this geometry is
          composition-specific, not a reusable spacing token.
        */}
        <div
          className="relative w-full"
          style={{ paddingTop: MOSAIC_CANVAS_PADDING }}
          aria-label="Case study mosaic"
        >
          <article
            className="ui-case-card case-card group absolute cursor-pointer overflow-hidden"
            style={mosaicStyles.cardOne}
          >
            <Image
              src="/images/case-1.png"
              alt="When the Waters rose"
              fill
              sizes="(max-width: 768px) 44vw, 614px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30" />
            <div className="absolute left-5 top-5">
              <h3 className="text-xl font-bold leading-snug text-white drop-shadow-lg">
                When the
                <br />
                Waters rose
              </h3>
            </div>
            <div className="absolute bottom-5 left-5">
              <ArrowIcon />
            </div>
          </article>

          <article
            className="ui-case-card case-card group absolute cursor-pointer overflow-hidden bg-green-500"
            style={mosaicStyles.cardTwo}
          >
            <div className="absolute bottom-5 left-5">
              <ArrowIcon />
            </div>
          </article>

          <article
            className="ui-case-card case-card group absolute cursor-pointer overflow-hidden bg-green-500"
            style={mosaicStyles.cardThree}
          >
            <div className="absolute bottom-5 left-5">
              <ArrowIcon />
            </div>
          </article>

          <article
            className="ui-case-card case-card group absolute cursor-pointer overflow-hidden bg-green-500"
            style={mosaicStyles.cardFour}
          >
            <div className="absolute bottom-5 left-5">
              <ArrowIcon />
            </div>
          </article>

          <div className="absolute text-center" style={mosaicStyles.label}>
            <div className="flex h-full flex-col items-center justify-center py-3">
              <p className="ui-case-stamp-title">Case Study</p>
              <p className="ui-case-stamp-link mt-1">
                Know more
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path
                    d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
            </div>
          </div>

          <article
            className="ui-case-card case-card group absolute cursor-pointer overflow-hidden"
            style={mosaicStyles.cardFive}
          >
            <Image
              src="/images/case-2.png"
              alt="When the Waters rose, So did we"
              fill
              sizes="(max-width: 768px) 32vw, 440px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute" style={mosaicStyles.cardFiveCopy}>
              <p className="font-body text-[clamp(10px,1.45vw,20px)] leading-[1.15] font-bold text-white">
                when the
                <br />
                waters rose,
              </p>
              <p className="mt-[0.15em] whitespace-nowrap font-body text-[clamp(11px,1.55vw,22px)] leading-[1.1] font-bold text-orange-500">
                SO DID WE.
              </p>
            </div>

            <div className="absolute" style={mosaicStyles.cardFiveLogoOne}>
              <Image
                src="/images/svg/case-5-1.svg"
                alt="Case study logo 1"
                fill
                sizes="(max-width: 768px) 24vw, 109px"
                className="object-contain"
              />
            </div>

            <div className="absolute" style={mosaicStyles.cardFiveLogoTwo}>
              <Image
                src="/images/svg/case-5-2.svg"
                alt="Case study logo 2"
                fill
                sizes="(max-width: 768px) 10vw, 41px"
                className="object-contain"
              />
            </div>
          </article>
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
