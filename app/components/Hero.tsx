"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1,
      })
        .from(
          headingRef.current,
          { y: 120, opacity: 0, duration: 1.2 },
          "-=0.5"
        )
        .from(
          subtextRef.current,
          { y: 40, opacity: 0, duration: 0.8 },
          "-=0.6"
        )
        .from(
          badgeRef.current,
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-end bg-brand-black"
      aria-label="Hero"
    >
      {/* Green vertical accent line — page left edge */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 h-full w-[3px] bg-brand-green"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1140px] px-10 pb-20 pt-32 sm:px-16 md:px-20 lg:px-24">
        <h1
          ref={headingRef}
          className="font-display text-[clamp(4rem,11vw,9rem)] uppercase leading-[0.95] tracking-wide text-white"
        >
          Creativity
          <br />
          With
          <br />
          A Conscience
        </h1>

        <div className="mt-16 flex items-end justify-between">
          <div ref={subtextRef} className="flex flex-col gap-1">
            <p className="text-[10px] tracking-[0.3em] text-brand-gray uppercase">
              We create with purpose
            </p>
            <p className="font-display text-4xl tracking-wide text-white md:text-5xl">
              STAND
            </p>
          </div>

          <div
            ref={badgeRef}
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand-green md:h-24 md:w-24"
            aria-hidden="true"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="#0A0A0A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
