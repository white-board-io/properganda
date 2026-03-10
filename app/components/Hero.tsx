"use client";

import { useRef } from "react";
import Image from "next/image";
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
          "-=0.5",
        )
        .from(subtextRef.current, { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(
          badgeRef.current,
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.8",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-brand-black"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-40"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent" />
      </div>

      {/* Green vertical accent line */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 z-10 h-full w-[3px] bg-brand-green"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1140px] px-10 pb-32 pt-32 sm:px-16 md:px-20 lg:pb-40 lg:px-24">
        <h1
          ref={headingRef}
          className="font-display text-[clamp(4rem,11vw,9rem)] uppercase leading-[0.9] tracking-wide text-white"
        >
          Creativity With
          <br />A{" "}
          <span className="transition-colors duration-300 hover:text-brand-green">
            Conscience
          </span>
        </h1>

        <div className="mt-24 md:mt-32 flex items-center justify-between">
          <div ref={subtextRef} className="flex flex-col gap-1">
            <p className="text-sm text-white/70">
              For Brands{" "}
              <span className="font-bold text-white">& Businesses</span> that
              want to
            </p>
            <p className="font-display text-4xl tracking-wide text-white md:text-5xl">
              STAND
            </p>
          </div>

          {/* Circular badge */}
          <div
            ref={badgeRef}
            className="relative flex h-20 w-20 shrink-0 translate-x-6 items-center justify-center rounded-full bg-[#169D52] shadow-[0_0_40px_rgba(0,224,74,0.3)] transition-shadow hover:shadow-[0_0_50px_rgba(0,224,74,0.5)] md:h-24 md:w-24 lg:translate-x-12"
            aria-label="Let's Talk"
          >
            <svg
              className="absolute inset-0 rotate-[-60deg]"
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
            >
              <defs>
                <path id="badge-circle-bottom" d="M 15,50 a 35,35 0 0,0 70,0" />
              </defs>
              <text
                fontSize="16"
                fill="#FFFFFF"
                fontFamily="sans-serif"
                fontWeight="bold"
                letterSpacing="1"
              >
                <textPath
                  href="#badge-circle-bottom"
                  textAnchor="middle"
                  startOffset="50%"
                >
                  LET'S TALK
                </textPath>
              </text>
            </svg>
            {/* Center icon - The properganda logo left aligned */}
            <div className="absolute left-[40%] top-[45%] z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <Image
                src="/images/svg/logo.svg"
                alt="Properganda Logo"
                width={38}
                height={42}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
