"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ArrowIcon() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-black/10 backdrop-blur-sm">
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
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="bg-brand-black px-4 py-24 sm:px-6 md:px-10 md:py-32 lg:px-16"
      aria-label="Case studies"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Section label */}
       <p className="cc-text-item relative z-10 mb-5 text-xs font-bold tracking-[0.2em] text-[#169D52] uppercase">
          Case Study
        </p>

        {/*
          ── Figma-derived absolute grid ──────────────────────────────────────
          Total canvas: 1528 × 924 px  (aspect-ratio preserved via padding-top trick)
          Each card positioned using L% T% W% H% derived from Figma coords.
        */}
        <div
          className="relative w-full"
          style={{ paddingTop: "calc(924 / 1528 * 100%)" }}
          aria-label="Case study mosaic"
        >
          {/* ── Card 1 ── 670×497 | top-left image card */}
          <article
            className="case-card group absolute cursor-pointer overflow-hidden rounded-2xl"
            style={{ left: "0%", top: "0%", width: "43.85%", height: "53.79%" }}
          >
            <Image
              src="/images/case-1.png"
              alt="When the Waters rose"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30" />
            {/* Title – top-left */}
            <div className="absolute left-5 top-5">
              <h3 className="text-xl font-bold leading-snug text-white drop-shadow-lg">
                When the<br />Waters rose
              </h3>
            </div>
            {/* Arrow – bottom-left */}
            <div className="absolute bottom-5 left-5">
              <ArrowIcon />
            </div>
          </article>

          {/* ── Card 2 ── 777×370 | top-right green card */}
          <article
            className="case-card group absolute cursor-pointer overflow-hidden rounded-2xl bg-[#169D52]"
            style={{ left: "49.15%", top: "0%", width: "50.85%", height: "40.04%" }}
          >
            <div className="absolute bottom-5 left-5">
              <ArrowIcon />
            </div>
          </article>

          {/* ── Card 3 ── 456×355 | bottom-left green card */}
          <article
            className="case-card group absolute cursor-pointer overflow-hidden rounded-2xl bg-[#169D52]"
            style={{ left: "0%", top: "61.58%", width: "29.84%", height: "38.42%" }}
          >
            <div className="absolute bottom-5 left-5">
              <ArrowIcon />
            </div>
          </article>

          {/* ── Card 4 ── 422×355 | bottom-center green card */}
          <article
            className="case-card group absolute cursor-pointer overflow-hidden rounded-2xl bg-[#169D52]"
            style={{ left: "35.41%", top: "61.58%", width: "27.62%", height: "38.42%" }}
          >
            <div className="absolute bottom-5 left-5">
              <ArrowIcon />
            </div>
          </article>

          {/* ── Case Study label ── sits in the gap between card2 bottom & card5 top,
               horizontally between card4's right edge and card5's left edge */}
          <div
            className="absolute text-center"
            style={{ left: "49.15%", top: "40.04%", width: "19.44%" }}
          >
            <div className="flex h-full flex-col items-center justify-center py-3">
              <p className="text-sm font-bold text-white">Case Study</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-brand-gray">
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

          {/* ── Card 5 ── 480×473 | right column image card (overlaps both rows) */}
          <article
            className="case-card group absolute cursor-pointer overflow-hidden rounded-2xl"
            style={{ left: "68.59%", top: "48.81%", width: "31.41%", height: "51.19%" }}
          >
            <Image
              src="/images/case-2.png"
              alt="When the Waters rose, So did we"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Text overlay – 3 lines stacked | relative left=42px, top=43px */}
            <div
              className="absolute"
              style={{ left: "8.75%", top: "9.09%", width: "50%" }}
            >
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(10px, 1.45vw, 20px)",
                  lineHeight: 1.15,
                  color: "#FFFFFF",
                }}
              >
                when the<br />waters rose,
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(11px, 1.55vw, 22px)",
                  lineHeight: 1.1,
                  color: "#F86624",
                  whiteSpace: "nowrap",
                  marginTop: "0.15em",
                }}
              >
                SO DID WE.
              </p>
            </div>

            {/* SVG 1 – case-5-1.svg: relative left=28px, top=363px within 480×473 card */}
            <div
              className="absolute"
              style={{ left: "5.83%", top: "76.74%", width: "22.71%", height: "17.34%" }}
            >
              <Image
                src="/images/svg/case-5-1.svg"
                alt="Case study logo 1"
                fill
                className="object-contain"
              />
            </div>
            {/* SVG 2 – case-5-2.svg: relative left=159px, top=364px within 480×473 card */}
            <div
              className="absolute"
              style={{ left: "33.13%", top: "76.96%", width: "8.54%", height: "17.55%" }}
            >
              <Image
                src="/images/svg/case-5-2.svg"
                alt="Case study logo 2"
                fill
                className="object-contain"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
