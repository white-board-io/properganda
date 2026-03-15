"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

gsap.registerPlugin(useGSAP);

const SLOT_WORDS = ["STAND", "SHINE", "SOAR", "THRIVE", "LEAD"] as const;

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
  const cursorRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const standRef = useRef<HTMLParagraphElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (variant !== "default") return;

      const textTargets = [headingRef.current, subtextRef.current].filter(
        Boolean,
      );
      const chars = Array.from(
        headingRef.current?.querySelectorAll<HTMLElement>(".typewriter-char") ??
          [],
      );
      const cursor = cursorRef.current;

      // Initial states — chars + cursor stay hidden while the h1 fades in
      gsap.set(textTargets, { opacity: 0 });
      gsap.set(chars, { opacity: 0 });
      gsap.set(cursor, { opacity: 0 });

      // Cursor blink tween — started manually after opacity reveal
      const cursorBlink = gsap.to(cursor, {
        opacity: 0,
        yoyo: true,
        repeat: -1,
        paused: true,
        duration: 0.6,
        ease: "expo.inOut",
      });

      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Fade-in "Creativity With A" + subtext; pin "typing" label at its START
      tl.to(textTargets, { opacity: 1, duration: 1, ease: "circ.out" }).addLabel(
        "typing",
        "<",
      );

      // 2. Cursor appears at t=0 of the opacity tween — fully parallel, zero wait
      tl.call(
        () => {
          if (!cursor) return;
          chars[0]?.before(cursor);
          gsap.set(cursor, { opacity: 1 });
          cursorBlink.play();
        },
        [],
        "typing",
      );

      // 3. Each char + cursor move anchored to "typing" — C_ → Co_ → Con_ …
      chars.forEach((char, i) => {
        const t = `typing+=${i * 0.07}`;
        tl.set(char, { opacity: 1 }, t);
        tl.call(() => { if (cursor) char.after(cursor); }, [], t);
      });
    },
    { scope: sectionRef, dependencies: [variant] },
  );

  useGSAP(
    () => {
      if (variant !== "default" || !standRef.current) return;

      const HOLD = 2;
      const ROLL = 0.55;

      const wordEls = Array.from(
        standRef.current.querySelectorAll<HTMLElement>(".word-slot"),
      );

      // Initial state: first word (STAND) visible, rest queued below
      gsap.set(wordEls[0], { y: "0%" });
      gsap.set(wordEls.slice(1), { y: "110%" });

      const cycleTl = gsap.timeline({ repeat: -1, delay: HOLD });

      wordEls.forEach((_, i) => {
        const cur = wordEls[i];
        const nxt = wordEls[(i + 1) % wordEls.length];

        cycleTl
          // Ensure next word is staged below before it enters
          .set(nxt, { y: "110%" })
          // Current exits upward, next rolls in from below — fully parallel
          .to(cur, { y: "-100%", duration: ROLL, ease: "power3.inOut" })
          .to(nxt, { y: "0%", duration: ROLL, ease: "power3.inOut" }, "<")
          // Hold this word before rolling to the next
          .to({}, { duration: HOLD });
      });
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
          <Image
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
            alt="Hero Background"
            src="/images/hero-bg.png"
            className="object-cover object-center opacity-100"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-black/80 via-brand-black/20 to-transparent" />
        </section>

        <SiteContainer className="z-10 w-full">
          <section className="flex flex-col items-start justify-center gap-12">
            <h1
              ref={headingRef}
              className="font-bebas-neue uppercase font-normal text-[240px] leading-[208px] tracking-normal text-white"
            >
              <span className="block whitespace-nowrap">Creativity With</span>
              <span className="block whitespace-nowrap">
                {"A "}
                {"Conscience".split("").map((char, i) => (
                  <span key={i} className="typewriter-char text-green-500">
                    {char}
                  </span>
                ))}
                {/* Blinking underscore cursor — moves after each typed char */}
                <span
                  ref={cursorRef}
                  className="inline-block w-[48px] h-[18px] bg-green-500 align-bottom translate-y-[-0.13em]"
                />
              </span>
            </h1>

            <section className="relative flex items-center justify-between">
              <div ref={subtextRef} className="flex flex-col gap-1">
                <p className="text-sm text-white/70">
                  For Brands <span className="font-bold text-white">&</span>{" "}
                  Businesses that want to
                </p>
                <p
                  ref={standRef}
                  className="relative overflow-hidden h-[1.1em] font-bebas-neue text-4xl tracking-wide text-white md:text-5xl"
                >
                  {SLOT_WORDS.map((word, i) => (
                    <span
                      key={word}
                      className="word-slot absolute inset-x-0 top-0 leading-none"
                      style={{
                        transform: i === 0 ? "translateY(0%)" : "translateY(110%)",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </p>
              </div>
            </section>
          </section>

          <aside
            ref={badgeRef}
            aria-label="Let's Talk Button"
            className="ui-hero-badge absolute bottom-20 right-8 flex h-24 w-24 items-center justify-center rounded-full transition-shadow md:h-20 md:w-20 lg:bottom-[4rem] lg:right-[1rem]"
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
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-100"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <SiteContainer className="z-10 flex w-full flex-1 flex-col items-center justify-center">
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
          className="ui-hero-badge absolute bottom-[5rem] right-[2rem] flex h-24 w-24 items-center justify-center rounded-full transition-shadow md:h-20 md:w-20 lg:bottom-[4rem] lg:right-[1rem]"
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
              alt="Properganda Logo"
              src="/images/svg/logo.svg"
            />
          </div>
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
