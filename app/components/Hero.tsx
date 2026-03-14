"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero({
  variant = "default",
}: {
  variant?: "default" | "minimal" | "commandments";
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);

  const isMinimal = variant === "minimal";
  const isCommandments = variant === "commandments";

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (headingRef.current) {
        tl.from(headingRef.current, { y: 120, opacity: 0, duration: 1.2 });
      }

      if (subtextRef.current) {
        tl.from(
          subtextRef.current,
          { y: 40, opacity: 0, duration: 0.8 },
          "-=0.6",
        );
      }

      if (badgeRef.current) {
        tl.from(
          badgeRef.current,
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)",
            clearProps: "all",
          },
          "-=0.8",
        );
      }

      if (isCommandments && orbitContainerRef.current) {
        const chars = orbitContainerRef.current.querySelectorAll(".char-orbit");
        const radiusX = 240;
        const radiusY = 75;

        gsap.to(
          { progress: 0 },
          {
            progress: 1,
            duration: 30,
            repeat: -1,
            ease: "none",
            onUpdate: function () {
              const progress = this.targets()[0].progress;
              chars.forEach((char, i) => {
                const charOffset = (i / chars.length) * Math.PI * 2;
                // Anticlockwise by subtracting progress
                const angle = charOffset - progress * Math.PI * 2;
                const x = Math.cos(angle) * radiusX;
                const y = Math.sin(angle) * radiusY;

                gsap.set(char, {
                  x: x,
                  y: y,
                  scale: 1,
                  opacity: 1,
                  zIndex: 100,
                  rotation: 0,
                });
              });
            },
          },
        );
      }
    },
    { scope: sectionRef, dependencies: [variant, "COMMANDMENTS  "] },
  );

  return (
    <section
      ref={sectionRef}
      className={`relative flex min-h-screen flex-col bg-brand-black px-4 sm:px-6 md:px-10 lg:px-16 ${
        isCommandments
          ? "items-center justify-center overflow-hidden"
          : "justify-end overflow-visible"
      }`}
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-100"
          aria-hidden="true"
        />
        <div
          className={`absolute inset-0 ${isCommandments ? "bg-black/60" : "bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent"}`}
        />
      </div>

      <div
        className={`relative z-10 mx-auto w-full max-w-[1400px] ${
          isCommandments ? "flex flex-col items-center justify-center" : ""
        } ${isMinimal ? "pb-10 pt-10" : "pt-32"}`}
      >
        {isCommandments ? (
          <div className="relative flex items-center justify-center pt-20">
            {/* Letter by Letter Orbit */}
            <div
              ref={orbitContainerRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2400px] h-[800px] flex items-center justify-center pointer-events-none z-20"
            >
              {"COMMANDMENTS  ".split("").map((char, i) => (
                <div
                  key={i}
                  className="char-orbit absolute font-black tracking-widest text-brand-green uppercase"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 3rem)",
                    textShadow: "0 0 20px rgba(22, 157, 82, 0.4)",
                    opacity: 0.9,
                  }}
                >
                  {char}
                </div>
              ))}
            </div>

            {/* Large 10 */}
            <h1
              className="text-[25rem] md:text-[35rem] leading-none font-black text-white mix-blend-overlay select-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              10
            </h1>
          </div>
        ) : (
          !isMinimal && (
            <>
              <h1
                ref={headingRef}
                className="relative top-14 text-[clamp(4rem,11vw,13rem)] uppercase leading-[0.85] tracking-wide text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block whitespace-nowrap">Creativity With</span>
                <span className="block whitespace-nowrap">
                  A{" "}
                  <span className="transition-colors duration-300 hover:text-brand-green">
                    Conscience
                  </span>
                </span>
              </h1>

              <div className="relative mt-24 md:mt-32 flex items-center justify-between">
                <div ref={subtextRef} className="flex flex-col gap-1">
                  <p className="text-sm text-white/70">
                    For Brands{" "}
                    <span className="font-bold text-white">& Businesses</span>{" "}
                    that want to
                  </p>
                  <p className="font-display text-4xl tracking-wide text-white md:text-5xl">
                    STAND
                  </p>
                </div>
              </div>
            </>
          )
        )}

        <div
          ref={badgeRef}
          className="absolute bottom-[5rem] right-[2rem] flex h-24 w-24 items-center justify-center rounded-full bg-[#169D52] shadow-[0_0_40px_rgba(0,224,74,0.3)] transition-shadow hover:shadow-[0_0_50px_rgba(0,224,74,0.5)] md:h-20 md:w-20 lg:bottom-[4rem] lg:right-[1rem]"
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
              width={36}
              height={40}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
