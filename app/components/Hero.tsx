"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

gsap.registerPlugin(useGSAP);

const SLOT_WORDS = ["up", "out", "for something"] as const;

const ORBIT_COPY = "COMMANDMENTS  ";
const orbitCharacters = Array.from(ORBIT_COPY).map((char, index) => ({
  id: `${char === " " ? "space" : char}-${index}`,
  char,
}));

type HeroVariant = "default" | "commandments";

export default function Hero({
  variant = "default",
}: {
  variant?: HeroVariant;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const conscienceRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const standRef = useRef<HTMLParagraphElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (variant !== "default") return;

    const word = SLOT_WORDS[currentWordIndex];
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting && currentText === word) {
      timeoutId = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === "") {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % SLOT_WORDS.length);
      }, 1000);
    } else {
      const timeout = 250;
      timeoutId = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? word.slice(0, prev.length - 1)
            : word.slice(0, prev.length + 1),
        );
      }, timeout);
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, currentWordIndex, variant]);

  useGSAP(
    () => {
      if (variant !== "default") return;

      const headingLines = Array.from(
        headingRef.current?.querySelectorAll<HTMLElement>("[data-hero-line]") ?? [],
      );
      const subtext = subtextRef.current;
      const revealTargets = subtext ? [...headingLines, subtext] : headingLines;

      if (!revealTargets.length) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(revealTargets, {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          clipPath: "inset(0% 0% 0% 0%)",
        });
        return;
      }

      gsap.set(revealTargets, {
        transformOrigin: "50% 50%",
        willChange: "opacity, transform, filter, clip-path",
      });

      const tl = gsap.timeline({
        delay: 0.12,
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        headingLines,
        {
          autoAlpha: 0,
          scale: 0.985,
          filter: "blur(14px)",
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          stagger: 0.14,
        },
      );

      if (subtext) {
        tl.fromTo(
          subtext,
          {
            autoAlpha: 0,
            scale: 0.99,
            filter: "blur(10px)",
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.95,
          },
          "-=0.55",
        );
      }

      tl.eventCallback("onComplete", () => {
        gsap.set(revealTargets, { clearProps: "willChange" });
      });

      return () => {
        tl.kill();
        gsap.set(revealTargets, { clearProps: "willChange" });
      };
    },
    { scope: sectionRef, dependencies: [variant] },
  );

  useGSAP(
    () => {
      if (variant === "commandments" && orbitContainerRef.current) {
        const chars = orbitContainerRef.current.querySelectorAll(".char-orbit");
        const radiusX = 240;
        const radiusY = 75;

        gsap.to(
          { progress: 0 },
          {
            progress: 1,
            duration: 15,
            repeat: -1,
            ease: "none",
            onUpdate: function () {
              const progress = this.targets()[0].progress;
              chars.forEach((char, i) => {
                const charOffset = (-i / chars.length) * Math.PI * 2;
                const angle = charOffset + progress * Math.PI * 2;
                const x = Math.cos(angle) * radiusX;
                const y = Math.sin(angle) * radiusY;

                // When y is negative, the character is in the top/back half of the ellipse.
                // We use Math.sin(angle) to smoothly interpolate opacity.
                // At sin(angle) = 1 (front center), opacity is 1.
                // At sin(angle) = 0 (edges), opacity is still decent (e.g., 0.8).
                // At sin(angle) = -1 (back center), opacity should be 0.
                const sinValue = Math.sin(angle);

                // Opacity mapping:
                // Front half (sinValue > 0): 0.6 to 1.0
                // Back half (sinValue < 0): 0 at the very back (-1), but fades out quickly.
                // Using a sharp fade out when going into the negative.
                let targetOpacity = 0;
                if (sinValue >= -0.2) {
                  // Map [-0.2, 1] to [0, 1]
                  targetOpacity = (sinValue + 0.2) / 1.2;
                }

                gsap.set(char, {
                  x: x,
                  y: y,
                  scale: 0.8 + Math.max(0, sinValue) * 0.2, // slight scale effect for depth
                  opacity: targetOpacity,
                  zIndex: sinValue > 0 ? 100 : 10, // send to back properly
                  rotation: 0,
                });
              });
            },
          },
        );
      }
    },
    { scope: sectionRef, dependencies: [variant] },
  );

  if (variant === "default") {
    return (
      <SectionShell
        spacing="none"
        variant="dark"
        ref={sectionRef}
        aria-label="Hero"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden px-0"
      >
        <section className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover object-center w-full h-full opacity-100"
          >
            <source src="/videos/PPG-Home.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-t from-brand-black/80 via-brand-black/20 to-transparent" />
        </section>

        <SiteContainer className="z-10 w-full mt-24 lg:mt-64">
          <section className="flex flex-col items-start justify-center gap-12">
            <h1
              ref={headingRef}
              className="font-bebas-neue uppercase font-normal xl:text-[240px] xl:leading-[208px] tracking-normal text-white lg:text-[180px] lg:leading-[170px] md:text-[140px] md:leading-[130px] sm:text-[100px] sm:leading-[90px] text-[60px] leading-[50px]"
            >
              <span className="block overflow-hidden">
                <span data-hero-line className="block whitespace-nowrap">
                  Creativity With
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero-line className="block whitespace-nowrap">
                  {"A "}
                  <span ref={conscienceRef} className="text-white inline-block">
                    Conscience
                  </span>
                </span>
              </span>
            </h1>

            <section className="relative flex items-center justify-between">
              <div ref={subtextRef} className="flex flex-col gap-1">
                <p
                  className="text-white opacity-50"
                  style={{
                    fontFamily: "var(--font-inter-google), Inter, sans-serif",
                    fontWeight: 200,
                    fontSize: "25px",
                    lineHeight: "1.42",
                    letterSpacing: "0.02em",
                    fontStyle: "normal",
                  }}
                >
                  For Brands{" "}
                  <span
                    style={{
                      fontWeight: 700,
                      fontFamily: "var(--font-inter-google), Inter, sans-serif",
                    }}
                  >
                    &
                  </span>{" "}
                  Businesses that want to
                </p>
                <div className="flex items-center gap-[0.3em]">
                  <span
                    className="text-white uppercase inline-block"
                    style={{
                      fontFamily: "var(--font-inter-google), Inter, sans-serif",
                      fontWeight: 900,
                      fontSize: "50px",
                      lineHeight: "1.42",
                      letterSpacing: "0.02em",
                      verticalAlign: "middle",
                    }}
                  >
                    STAND
                  </span>
                  <div
                    ref={standRef}
                    className="relative flex-1 text-white uppercase whitespace-nowrap"
                    style={{
                      height: "1.42em",
                      fontFamily: "var(--font-inter-google), Inter, sans-serif",
                      fontWeight: 900,
                      fontSize: "50px",
                      lineHeight: "1.42",
                      letterSpacing: "0.02em",
                      verticalAlign: "middle",
                    }}
                  >
                    <span className="opacity-50">{currentText}</span>
                    <span className="animate-cursor-blink opacity-50 ml-1">
                      _
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <aside
            ref={badgeRef}
            aria-label="Let's Talk Button"
            className="ui-hero-badge fixed bottom-8 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full transition-shadow md:bottom-20 md:right-8 md:h-24 md:w-24 lg:bottom-[4rem] lg:right-[1rem]"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              className="absolute inset-0 rotate-[-60deg]"
            >
              <defs>
                <path id="badge-circle-bottom" d="M 15,50 a 35,35 0 0,0 70,0" />
              </defs>
              <text
                fontSize="16"
                fill="#FFFFFF"
                letterSpacing="1"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                <textPath
                  startOffset="50%"
                  textAnchor="middle"
                  href="#badge-circle-bottom"
                >
                  LET&apos;S TALK
                </textPath>
              </text>
            </svg>
            <div className="absolute left-[40%] top-[45%] z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <Image
                width={36}
                height={40}
                className="h-auto w-6 md:w-9"
                alt="Properganda Logo"
                src="/images/svg/logo.svg"
              />
            </div>
          </aside>
        </SiteContainer>
      </SectionShell>
    );
  }

  return (
    <SectionShell
      ref={sectionRef}
      spacing="none"
      variant="dark"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-0"
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover object-center w-full h-full opacity-100"
        >
          <source src="/videos/PPG-Home.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <SiteContainer className="z-10 flex w-full flex-1 flex-col items-center justify-center mt-24 lg:mt-32">
        <div className="relative flex items-center justify-center pt-20">
          <div
            ref={orbitContainerRef}
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-[800px] w-[2400px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
            {orbitCharacters.map(({ id, char }) => (
              <div
                key={id}
                className="ui-text-shadow-brand char-orbit absolute text-[clamp(1.5rem,4vw,3rem)] font-black uppercase tracking-widest text-green-500 opacity-90"
              >
                {char}
              </div>
            ))}
          </div>

          <h1 className="font-bebas-neue text-[25rem] leading-none font-black text-white mix-blend-overlay select-none md:text-[35rem]">
            10
          </h1>
        </div>

        <div
          ref={badgeRef}
          className="ui-hero-badge fixed bottom-8 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full transition-shadow md:bottom-[5rem] md:right-[2rem] md:h-24 md:w-24 lg:bottom-[4rem] lg:right-[1rem]"
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
              fontWeight="bold"
              letterSpacing="1"
              fontFamily="sans-serif"
            >
              <textPath
                href="#badge-circle-bottom"
                textAnchor="middle"
                startOffset="50%"
              >
                LET&apos;S TALK
              </textPath>
            </text>
          </svg>
          <div className="absolute left-[40%] top-[45%] z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <Image
              width={36}
              height={40}
              className="h-auto w-6 md:w-9"
              alt="Properganda Logo"
              src="/images/svg/logo.svg"
            />
          </div>
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
