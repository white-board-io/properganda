"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

gsap.registerPlugin(useGSAP);

function wrapPathDistance(distance: number, totalLength: number) {
  return ((distance % totalLength) + totalLength) % totalLength;
}

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitGuideRef = useRef<SVGPathElement>(null);
  const cometHeadRef = useRef<SVGGElement>(null);
  const cometHeadDirectionRef = useRef<SVGGElement>(null);
  const cometHeadGlowId = useId().replace(/:/g, "");
  const cometFlameId = useId().replace(/:/g, "");
  const cometAuraId = useId().replace(/:/g, "");
  const cometCoreId = useId().replace(/:/g, "");
  const cometOrbitPath =
    "M 60 1.5 H 940 A 58.5 58.5 0 0 1 940 118.5 H 60 A 58.5 58.5 0 0 1 60 1.5 Z";

  useGSAP(
    () => {
      gsap.from(".cc-text-item", {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".cc-image", {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".cc-button", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cc-button",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    const orbitGuide = orbitGuideRef.current;
    const cometHead = cometHeadRef.current;
    const cometHeadDirection = cometHeadDirectionRef.current;

    if (!orbitGuide || !cometHead || !cometHeadDirection) {
      return;
    }

    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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
        (Math.atan2(nextPoint.y - previousPoint.y, nextPoint.x - previousPoint.x) *
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
      motionMediaQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  return (
    <SectionShell
      id="about"
      variant="dark"
      ref={sectionRef}
      spacing="default"
      className="px-0 relative z-10 !pb-0"
      aria-label="About - Creative Collective"
    >
      <SiteContainer>
        <SectionEyebrow scramble className="cc-text-item">
          ABOUT US
        </SectionEyebrow>

        <section className="relative overflow-hidden px-6 pb-32 pt-16 sm:px-12 md:px-16 md:pb-40 md:pt-24 lg:px-20 xl:px-24 w-full">
          <section className="relative z-10 flex flex-col gap-12 lg:gap-16 w-full">
            <section className="cc-text-item flex flex-col justify-start w-full max-w-none">
              <h2 className="font-sans text-[28px] md:text-[42px] font-light text-neutral-300 leading-[1.28] tracking-[0.02em]">
                Properganda is a
                <span className="font-sans text-[48px] md:text-[80px] font-bold text-[#159848] leading-[1.1] md:leading-[80px] tracking-normal block my-2 md:my-4">
                  creative agency
                </span>
                <span className="font-sans text-[28px] md:text-[42px] font-light leading-[1.28] tracking-[0.02em] block mt-4 md:mt-8 text-neutral-300">
                  <span className="xl:whitespace-nowrap">for ambitious brands and organisations looking to create</span> <br className="hidden xl:block" />
                  relevance, resonance and real-world impact.
                </span>
              </h2>
            </section>

            <section className="cc-text-item flex flex-col justify-start mt-6 md:mt-12">
              <h3 className="font-sans text-[56px] md:text-[100px] font-medium leading-[1.2] md:leading-[1.28] tracking-[0.02em] text-white">
                Made with heart.
              </h3>
            </section>

            <section className="relative z-20 mt-4">
              <a
                href="#contact"
                className="cc-text-item inline-block text-sm font-medium text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-white"
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
          <Link href="/commandments" className="ui-commandments-link cc-button">
            <span
              aria-hidden="true"
              className="ui-commandments-link__orbit"
            >
              <svg
                viewBox="0 0 1000 120"
                preserveAspectRatio="none"
                className="ui-commandments-link__orbit-svg"
              >
                <defs>
                  <linearGradient id={cometFlameId} x1="-7" y1="0" x2="13" y2="0">
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
                    <ellipse cx="1.2" cy="0" rx="9.6" ry="7.8" fill={`url(#${cometAuraId})`} />
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
                      <ellipse cx="5.4" cy="0" rx="3.3" ry="2.5" fill={`url(#${cometCoreId})`} />
                      <circle cx="7.05" cy="0" r="1.22" fill="#ffffff" fillOpacity="0.98" />
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
