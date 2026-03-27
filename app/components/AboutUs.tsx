"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { BlurTextReveal } from "@/components/ui/blur-text-reveal";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

gsap.registerPlugin(useGSAP);

const ABOUT_WORDS = ["MADE WITH HEART.", "BACKED BY BRAINS."] as const;

const ABOUT_PULSE_BEAMS = [
  {
    top: "18%",
    left: "4%",
    width: "clamp(16rem, 24vw, 22rem)",
    rotation: 0,
    duration: 2.55,
    delay: 0.2,
    gap: 3.1,
  },
  {
    top: "26%",
    left: "84%",
    width: "clamp(10rem, 14vw, 13rem)",
    rotation: 90,
    duration: 2.4,
    delay: 0.75,
    gap: 3,
  },
  {
    top: "34%",
    left: "58%",
    width: "clamp(14rem, 20vw, 18rem)",
    rotation: 0,
    duration: 2.2,
    delay: 1.1,
    gap: 2.7,
  },
  {
    top: "52%",
    left: "14%",
    width: "clamp(16rem, 24vw, 22rem)",
    rotation: 0,
    duration: 2.8,
    delay: 1.65,
    gap: 3,
  },
  {
    top: "58%",
    left: "8%",
    width: "clamp(9rem, 12vw, 12rem)",
    rotation: 90,
    duration: 2.15,
    delay: 2.2,
    gap: 3.2,
  },
  {
    top: "72%",
    left: "56%",
    width: "clamp(16rem, 24vw, 22rem)",
    rotation: 0,
    duration: 2.7,
    delay: 2.8,
    gap: 2.8,
  },
  {
    top: "86%",
    left: "24%",
    width: "clamp(14rem, 20vw, 18rem)",
    rotation: 0,
    duration: 2.35,
    delay: 3.45,
    gap: 3.05,
  },
] as const;

function wrapPathDistance(distance: number, totalLength: number) {
  return ((distance % totalLength) + totalLength) % totalLength;
}

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitGuideRef = useRef<SVGPathElement>(null);
  const cometHeadRef = useRef<SVGGElement>(null);
  const cometHeadDirectionRef = useRef<SVGGElement>(null);
  const beamRefs = useRef<Array<HTMLDivElement | null>>([]);
  const beamPulseRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cometHeadGlowId = useId().replace(/:/g, "");
  const cometFlameId = useId().replace(/:/g, "");
  const cometAuraId = useId().replace(/:/g, "");
  const cometCoreId = useId().replace(/:/g, "");
  const cometOrbitPath =
    "M 60 1.5 H 940 A 58.5 58.5 0 0 1 940 118.5 H 60 A 58.5 58.5 0 0 1 60 1.5 Z";

  useGSAP(
    () => {
      const beams = beamRefs.current.filter(
        (beam): beam is HTMLDivElement => beam !== null,
      );
      const pulses = beamPulseRefs.current.filter(
        (pulse): pulse is HTMLDivElement => pulse !== null,
      );

      if (!beams.length) {
        return;
      }

      const mediaMatch = gsap.matchMedia();

      mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
        const timelines = beams.map((beam, index) => {
          const pulse = pulses[index];
          const beamConfig = ABOUT_PULSE_BEAMS[index];

          if (!pulse) {
            return null;
          }

          const beamWidth = beam.offsetWidth;
          const pulseWidth = pulse.offsetWidth;

          gsap.set(beam, { rotate: beamConfig.rotation });
          gsap.set(pulse, {
            x: -pulseWidth * 1.15,
            autoAlpha: 0,
          });

          const timeline = gsap.timeline({
            repeat: -1,
            repeatDelay: beamConfig.gap,
            delay: beamConfig.delay,
          });

          timeline
            .to(
              pulse,
              {
                autoAlpha: 1,
                duration: 0.28,
                ease: "power1.out",
              },
              0,
            )
            .to(
              pulse,
              {
                x: beamWidth + pulseWidth * 0.08,
                duration: beamConfig.duration,
                ease: "none",
              },
              0,
            )
            .to(
              pulse,
              {
                autoAlpha: 0,
                duration: 0.34,
                ease: "power1.in",
              },
              beamConfig.duration - 0.34,
            );

          return timeline;
        });

        return () => {
          timelines.forEach((timeline) => timeline?.kill());
        };
      });

      return () => {
        mediaMatch.revert();
      };
    },
    { scope: sectionRef },
  );

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = ABOUT_WORDS[currentWordIndex];
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting && currentText === word) {
      timeoutId = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === "") {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % ABOUT_WORDS.length);
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
  }, [currentText, isDeleting, currentWordIndex]);

  useEffect(() => {
    const orbitGuide = orbitGuideRef.current;
    const cometHead = cometHeadRef.current;
    const cometHeadDirection = cometHeadDirectionRef.current;

    if (!orbitGuide || !cometHead || !cometHeadDirection) {
      return;
    }

    const motionMediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (motionMediaQuery.matches) {
      return;
    }

    const totalLength = orbitGuide.getTotalLength();
    const orbitDurationMs = 6250 / 3;
    let animationFrameId = 0;
    let animationStart = performance.now();

    const renderFrame = (timestamp: number) => {
      const elapsed = timestamp - animationStart;
      const progress = (elapsed % orbitDurationMs) / orbitDurationMs;
      const headDistance = progress * totalLength;
      const headPoint = orbitGuide.getPointAtLength(headDistance);
      const tangentSample = 6;
      const previousPoint = orbitGuide.getPointAtLength(
        wrapPathDistance(headDistance - tangentSample, totalLength),
      );
      const nextPoint = orbitGuide.getPointAtLength(
        wrapPathDistance(headDistance + tangentSample, totalLength),
      );
      const tangentAngle =
        (Math.atan2(
          nextPoint.y - previousPoint.y,
          nextPoint.x - previousPoint.x,
        ) *
          180) /
        Math.PI;

      cometHead.setAttribute(
        "transform",
        `translate(${headPoint.x.toFixed(2)} ${headPoint.y.toFixed(2)})`,
      );
      cometHeadDirection.setAttribute(
        "transform",
        `rotate(${tangentAngle.toFixed(2)})`,
      );

      animationFrameId = window.requestAnimationFrame(renderFrame);
    };

    animationFrameId = window.requestAnimationFrame(renderFrame);

    const handleMotionPreferenceChange = () => {
      window.cancelAnimationFrame(animationFrameId);

      if (!motionMediaQuery.matches) {
        animationStart = performance.now();
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    motionMediaQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      motionMediaQuery.removeEventListener(
        "change",
        handleMotionPreferenceChange,
      );
    };
  }, []);

  return (
    <SectionShell
      ref={sectionRef}
      id="about"
      variant="dark"
      spacing="default"
      className="px-0 relative isolate !pb-0"
      aria-label="About - Creative Collective"
    >
      <div aria-hidden="true" className="ui-about-pulse-field">
        {ABOUT_PULSE_BEAMS.map((beam, index) => (
          <div
            key={`${beam.top}-${beam.left}-${index}`}
            ref={(node) => {
              beamRefs.current[index] = node;
            }}
            className="ui-about-pulse-beam"
            style={{
              top: beam.top,
              left: beam.left,
              width: beam.width,
            }}
          >
            <div className="ui-about-pulse-beam__line" />
            <div
              ref={(node) => {
                beamPulseRefs.current[index] = node;
              }}
              className="ui-about-pulse-beam__pulse"
            >
              <div className="ui-about-pulse-beam__spark" />
            </div>
          </div>
        ))}
      </div>

      <SiteContainer className="relative z-10">
        <SectionEyebrow scramble>
          ABOUT US
        </SectionEyebrow>

        <section className="relative overflow-hidden pb-32 pt-12 md:pb-40 md:pt-16 w-full">
          <section className="relative z-10 flex flex-col gap-10 md:gap-12 w-full max-w-[900px]">
            <section className="flex flex-col justify-start w-full">
              <BlurTextReveal
                as="h2"
                className="font-sans text-[26px] md:text-[40px] font-light text-neutral-300 leading-[1.3] tracking-wide"
                segments={[
                  { text: "Properganda is a " },
                  {
                    text: "creative agency",
                    as: "strong",
                    className: "font-bold text-white",
                  },
                  {
                    text:
                      " for ambitious brands and organisations looking to create relevance, resonance and real-world impact.",
                  },
                ]}
                stagger={0.014}
                duration={0.3}
                blur={8}
                y={10}
              />
            </section>

            <section className="flex flex-col justify-start mt-2">
              <h3 className="font-sans text-[40px] md:text-[64px] font-bold leading-tight tracking-tight text-[#159848] uppercase min-h-[1.2em]">
                {currentText}
                <span className="animate-cursor-blink ml-1">_</span>
              </h3>
            </section>

            <section className="relative z-20 mt-2">
              <a
                href="#contact"
                className="inline-block text-sm md:text-base font-medium text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-white"
              >
                Be a part of Us
              </a>
            </section>
          </section>
        </section>

        <div className="relative z-20 flex justify-center translate-y-1/2">
          {/* Green glow background spread */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[120px] blur-[50px] rounded-full pointer-events-none -z-10"
            style={{ backgroundColor: "rgba(22, 157, 82, 0.25)" }}
          />
          <Link href="/commandments" className="ui-commandments-link">
            <span aria-hidden="true" className="ui-commandments-link__orbit">
              <svg
                viewBox="0 0 1000 120"
                preserveAspectRatio="none"
                className="ui-commandments-link__orbit-svg"
              >
                <defs>
                  <linearGradient
                    id={cometFlameId}
                    x1="-7"
                    y1="0"
                    x2="13"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#0c8d3d" />
                    <stop offset="34%" stopColor="#58ef87" />
                    <stop offset="82%" stopColor="#dfffe8" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                  <radialGradient id={cometAuraId} cx="58%" cy="50%" r="54%">
                    <stop offset="0%" stopColor="#8cf6ab" stopOpacity="0.36" />
                    <stop offset="70%" stopColor="#2dc861" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#2dc861" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id={cometCoreId} cx="72%" cy="50%" r="78%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="34%" stopColor="#f3fff7" />
                    <stop offset="70%" stopColor="#87f6ab" />
                    <stop offset="100%" stopColor="#159848" />
                  </radialGradient>
                  <filter
                    id={cometHeadGlowId}
                    x="-240%"
                    y="-240%"
                    width="480%"
                    height="480%"
                  >
                    <feGaussianBlur stdDeviation="2.3" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  ref={orbitGuideRef}
                  d={cometOrbitPath}
                  fill="none"
                  stroke="transparent"
                />
                <g aria-hidden="true">
                  <g ref={cometHeadRef} filter={`url(#${cometHeadGlowId})`}>
                    <ellipse
                      cx="1.2"
                      cy="0"
                      rx="9.6"
                      ry="7.8"
                      fill={`url(#${cometAuraId})`}
                    />
                    <g ref={cometHeadDirectionRef}>
                      <path
                        d="M -6.4 0 C -4.2 -3.7 0.4 -5.7 11.9 0 C 0.4 5.7 -4.2 3.7 -6.4 0 Z"
                        fill={`url(#${cometFlameId})`}
                        fillOpacity="0.97"
                      />
                      <path
                        d="M -1.3 -5.8 C 1.4 -4.9 3.6 -2.6 6.2 -0.2 C 3 0 0.4 -1 -2.8 -4.6 Z"
                        fill={`url(#${cometFlameId})`}
                        fillOpacity="0.64"
                      />
                      <path
                        d="M -1.3 5.8 C 1.4 4.9 3.6 2.6 6.2 0.2 C 3 0 -0.4 1 -2.8 4.6 Z"
                        fill={`url(#${cometFlameId})`}
                        fillOpacity="0.64"
                      />
                      <path
                        d="M -4.1 0 C -2.7 -1.7 -0.1 -2.7 4.8 0 C -0.1 2.7 -2.7 1.7 -4.1 0 Z"
                        fill={`url(#${cometFlameId})`}
                        fillOpacity="0.44"
                      />
                      <path
                        d="M 6.1 -1.6 C 7.6 -1.5 9.5 -0.7 10.8 0 C 9.5 0.7 7.6 1.5 6.1 1.6 C 6.8 0.9 7.1 0.4 7.4 0 C 7.1 -0.4 6.8 -0.9 6.1 -1.6 Z"
                        fill="#f6fff8"
                        fillOpacity="0.72"
                      />
                      <ellipse
                        cx="5.4"
                        cy="0"
                        rx="3.3"
                        ry="2.5"
                        fill={`url(#${cometCoreId})`}
                      />
                      <circle
                        cx="7.05"
                        cy="0"
                        r="1.22"
                        fill="#ffffff"
                        fillOpacity="0.98"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <span className="ui-commandments-link__label">
              Proper Ways of Working
            </span>
          </Link>
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
