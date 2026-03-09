"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CaseStudyCard {
  id: number;
  title: string;
  category: string;
  variant: "image" | "solid";
  size: "tall" | "normal";
}

const topCards: CaseStudyCard[] = [
  { id: 1, title: "Where the Wilderness Awaits", category: "Branding", variant: "image", size: "tall" },
  { id: 2, title: "Green Future", category: "Campaign", variant: "solid", size: "tall" },
  { id: 3, title: "When the Tide Turns", category: "Strategy", variant: "image", size: "tall" },
];

const bottomCards: CaseStudyCard[] = [
  { id: 4, title: "Brand Identity", category: "Design", variant: "solid", size: "normal" },
  { id: 5, title: "Digital Campaign", category: "Digital", variant: "solid", size: "normal" },
  { id: 6, title: "Social Impact", category: "Creative", variant: "solid", size: "normal" },
  { id: 7, title: "Visual Story", category: "Content", variant: "solid", size: "normal" },
  { id: 8, title: "Market Launch", category: "Strategy", variant: "solid", size: "normal" },
];

function CardPlaceholder({ variant }: { variant: "image" | "solid" }) {
  if (variant === "image") {
    return (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green-muted/80 to-brand-black transition-transform duration-500 group-hover:scale-105">
          <div className="flex h-full items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-20"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="1.5" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="white" />
              <path d="M3 16L8 11L13 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 14L17 11L21 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </>
    );
  }
  return (
    <div className="absolute inset-0 bg-brand-green transition-all duration-500 group-hover:bg-brand-green-dark" />
  );
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".case-card", {
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".case-card-sm", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".case-card-sm",
          start: "top 85%",
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
      className="bg-brand-black py-24 md:py-32"
      aria-label="Case studies"
    >
      <div className="mx-auto max-w-[1140px] px-10 sm:px-16 md:px-20 lg:px-24">
        {/* Top row — 3 tall cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {topCards.map((study) => (
            <article
              key={study.id}
              className="case-card group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg"
            >
              <CardPlaceholder variant={study.variant} />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p
                  className={`text-[10px] font-medium uppercase tracking-widest ${
                    study.variant === "solid" ? "text-brand-black/60" : "text-white/70"
                  }`}
                >
                  {study.category}
                </p>
                <h3
                  className={`mt-1 text-sm font-semibold leading-tight ${
                    study.variant === "solid" ? "text-brand-black" : "text-white"
                  }`}
                >
                  {study.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

        {/* Label */}
        <p className="my-4 text-center text-[10px] tracking-[0.3em] text-brand-gray uppercase">
          Case Study
        </p>

        {/* Bottom row — 5 small square cards */}
        <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
          {bottomCards.map((study) => (
            <article
              key={study.id}
              className="case-card-sm group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            >
              <CardPlaceholder variant={study.variant} />
              <div className="absolute inset-0 flex flex-col justify-end p-3">
                <p className="text-[9px] font-medium uppercase tracking-widest text-brand-black/60">
                  {study.category}
                </p>
                <h3 className="mt-0.5 text-xs font-semibold leading-tight text-brand-black">
                  {study.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
