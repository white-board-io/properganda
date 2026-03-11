"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  {
    id: "brand",
    text: "We build brands.",
    bold: false,
    subItems: [
      "Brand identity & strategy",
      "Visual systems",
      "Brand guidelines",
      "Naming & positioning",
      "Logo & mark design",
    ],
  },
  {
    id: "campaigns",
    text: "We design campaigns.",
    bold: true,
    subItems: [
      "Digital & social campaigns",
      "Impact storytelling",
      "Thought leadership",
      "Film & video",
      "Strategy & narrative architecture",
    ],
  },
  {
    id: "stories",
    text: "We craft stories.",
    bold: false,
    subItems: [
      "Content creation",
      "Scriptwriting & copywriting",
      "Editorial direction",
      "Documentary storytelling",
      "Branded content",
    ],
  },
  {
    id: "conversations",
    text: "We shape conversations.",
    bold: false,
    subItems: [
      "Public relations",
      "Community engagement",
      "Crisis communication",
      "Media relations",
      "Narrative management",
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subRefs = useRef<(HTMLDivElement | null)[]>([]);
  const DEFAULT_ACTIVE = 1;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(DEFAULT_ACTIVE);

  // Compute opacity for item i relative to activeIndex (null = all equal)
  const getOpacityFor = (activeIndex: number | null, i: number): number => {
    if (activeIndex === null) return 1;
    if (i === activeIndex) return 1;
    const diff = Math.abs(activeIndex - i);
    return diff === 1 ? 0.3 : 0.1;
  };

  // Apply opacity + sub-text state for a given active index
  const applyActive = (activeIndex: number, animate = true) => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const op = getOpacityFor(activeIndex, i);
      animate
        ? gsap.to(el, { opacity: op, duration: 0.35, ease: "power2.out" })
        : gsap.set(el, { opacity: op });
    });

    subRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === activeIndex) {
        animate
          ? gsap.to(el, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" })
          : gsap.set(el, { height: "auto", opacity: 1, overflow: "hidden" });
      } else {
        animate
          ? gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" })
          : gsap.set(el, { height: 0, opacity: 0, overflow: "hidden" });
      }
    });
  };

  useGSAP(
    () => {
      // Sub-text: open index 1 by default, hide rest
      subRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === DEFAULT_ACTIVE) {
          gsap.set(el, { height: "auto", opacity: 1, overflow: "hidden" });
        } else {
          gsap.set(el, { height: 0, opacity: 0, overflow: "hidden" });
        }
      });

      // Entrance animation — only translate Y, no opacity (opacity managed separately)
      gsap.from(".service-item", {
        y: 60,
        stagger: 0.18,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    applyActive(index, true);
  };

  // Only called when mouse leaves the ENTIRE list — not between items
  const handleListMouseLeave = () => {
    setHoveredIndex(DEFAULT_ACTIVE);
    applyActive(DEFAULT_ACTIVE, true);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-brand-black px-4 py-24 sm:px-6 md:px-10 md:py-32 lg:px-16"
      aria-label="Our services"
    >
      <div className="mx-auto max-w-[1400px]">
       <p className="cc-text-item relative z-10 mb-5 text-xs font-bold tracking-[0.2em] text-[#169D52] uppercase">
          What We Do
        </p>

        <div
          className="flex flex-col gap-2"
          onMouseLeave={handleListMouseLeave}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="service-item cursor-default"
              style={{ opacity: getOpacityFor(DEFAULT_ACTIVE, index) }}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              {/* Main heading */}
              <p
                className="text-white whitespace-nowrap"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(2.5rem, 7vw, 100px)",
                  lineHeight: "125px",
                  letterSpacing: "0%",
                }}
              >
                {service.text}
              </p>

              {/* Sub-text — GSAP animated */}
              <div
                ref={(el) => { subRefs.current[index] = el; }}
                style={{ height: 0, opacity: 0, overflow: "hidden" }}
              >
                <p className="pt-2 text-[0.75rem] text-white tracking-wide leading-relaxed">
                  {service.subItems.slice(0, 3).map((item, i) => (
                    <span key={item}>
                      <span className="underline underline-offset-2 cursor-pointer hover:opacity-70 transition-opacity">
                        {item}
                      </span>
                      {i < Math.min(service.subItems.length, 3) - 1 && (
                        <span className="mx-2 opacity-40">|</span>
                      )}
                    </span>
                  ))}
                  {service.subItems.length > 3 && (
                    <>
                      <br />
                      {service.subItems.slice(3).map((item, i) => (
                        <span key={item}>
                          <span className="underline underline-offset-2 cursor-pointer hover:opacity-70 transition-opacity">
                            {item}
                          </span>
                          {i < service.subItems.slice(3).length - 1 && (
                            <span className="mx-2 opacity-40">|</span>
                          )}
                        </span>
                      ))}
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
