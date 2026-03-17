"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICES = [
  {
    id: "brand",
    text: "We build brands.",
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
    subItems: [
      "Public relations",
      "Community engagement",
      "Crisis communication",
      "Media relations",
      "Narrative management",
    ],
  },
];

const DEFAULT_ACTIVE = 1;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(DEFAULT_ACTIVE);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getOpacityFor = (activeIndex: number | null, index: number): number => {
    if (activeIndex === null) return 1;
    if (index === activeIndex) return 1;

    const diff = Math.abs(activeIndex - index);
    return diff === 1 ? 0.3 : 0.1;
  };

  const applyActive = (newActiveIndex: number | null, animate = true) => {
    setActiveIndex(newActiveIndex);

    itemRefs.current.forEach((el, index) => {
      if (!el) return;

      const opacity = getOpacityFor(newActiveIndex, index);
      if (animate) {
        gsap.to(el, { opacity, duration: 0.35, ease: "power2.out" });
      } else {
        gsap.set(el, { opacity });
      }
    });

    subRefs.current.forEach((el, index) => {
      if (!el) return;

      if (index === newActiveIndex) {
        if (animate) {
          gsap.to(el, {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        } else {
          gsap.set(el, { height: "auto", opacity: 1, overflow: "hidden" });
        }
        return;
      }

      if (animate) {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      } else {
        gsap.set(el, { height: 0, opacity: 0, overflow: "hidden" });
      }
    });
  };

  useGSAP(
    () => {
      subRefs.current.forEach((el, index) => {
        if (!el) return;

        if (index === DEFAULT_ACTIVE) {
          gsap.set(el, { height: "auto", opacity: 1, overflow: "hidden" });
        } else {
          gsap.set(el, { height: 0, opacity: 0, overflow: "hidden" });
        }
      });

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
    { scope: sectionRef },
  );

  const handleMouseEnter = (index: number) => {
    // Only apply hover effects on wider screens to avoid mobile touch conflicts
    if (window.innerWidth >= 768) {
      applyActive(index, true);
    }
  };

  const handleListMouseLeave = () => {
    if (window.innerWidth >= 768) {
      applyActive(DEFAULT_ACTIVE, true);
    }
  };

  const handleClick = (index: number) => {
    if (activeIndex === index) {
      applyActive(null, true);
    } else {
      applyActive(index, true);
    }
  };

  return (
    <SectionShell
      ref={sectionRef}
      id="services"
      variant="dark"
      aria-label="Our services"
    >
      <SiteContainer>
        <SectionEyebrow>What We Do</SectionEyebrow>

        <div className="flex flex-col gap-4" onMouseLeave={handleListMouseLeave}>
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="service-item cursor-pointer md:cursor-default"
              style={{ opacity: getOpacityFor(DEFAULT_ACTIVE, index) }}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => handleClick(index)}
            >
                <div className="flex w-full items-center justify-between gap-4">
                  <p
                    className="text-white break-words w-[calc(100%-3rem)] md:w-full"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(2.5rem, 7vw, 100px)",
                      lineHeight: "1.2",
                      letterSpacing: "0%",
                    }}
                  >
                    {service.text}
                  </p>

                  <div className="md:hidden flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-black">
                    {activeIndex === index ? (
                      <ChevronUp className="h-5 w-5" strokeWidth={3} />
                    ) : (
                      <ChevronDown className="h-5 w-5" strokeWidth={3} />
                    )}
                  </div>
                </div>

              <div
                ref={(el) => {
                  subRefs.current[index] = el;
                }}
                style={{ height: 0, opacity: 0, overflow: "hidden" }}
              >
                <p className="text-[0.75rem] leading-relaxed tracking-wide text-white">
                  {service.subItems.slice(0, 3).map((item, itemIndex) => (
                    <span key={item}>
                      <span className="cursor-pointer underline underline-offset-2 transition-opacity hover:opacity-70">
                        {item}
                      </span>
                      {itemIndex < Math.min(service.subItems.length, 3) - 1 && (
                        <span className="mx-2 opacity-40">|</span>
                      )}
                    </span>
                  ))}
                  {service.subItems.length > 3 && (
                    <>
                      <br />
                      {service.subItems.slice(3).map((item, itemIndex) => (
                        <span key={item}>
                          <span className="cursor-pointer underline underline-offset-2 transition-opacity hover:opacity-70">
                            {item}
                          </span>
                          {itemIndex < service.subItems.slice(3).length - 1 && (
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
      </SiteContainer>
    </SectionShell>
  );
}
