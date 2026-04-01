"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ChevronDown,
  ChevronUp,
  PencilRuler,
  Image,
  Flag,
  FilePenLine,
  Monitor,
  ImagePlay,
  BookOpen,
  FileSignature,
  FileText,
  Megaphone,
  Route,
  Crown,
  Lightbulb,
  Users,
  Drama,
  Hand,
  Leaf
} from "lucide-react";

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

gsap.registerPlugin(useGSAP);

const SERVICES = [
  {
    id: "brand",
    text: "We build brands.",
    subItems: [
      { text: "Brand strategy", icon: PencilRuler },
      { text: "Visual identity", icon: Image },
      { text: "Positioning", icon: Flag },
      { text: "Messaging", icon: FilePenLine },
      { text: "Digital presence", icon: Monitor },
    ],
  },
  {
    id: "campaigns",
    text: "We design campaigns.",
    subItems: [
      { text: "Brand films", icon: ImagePlay },
      { text: "Editorial content", icon: BookOpen },
      { text: "Scriptwriting", icon: FileSignature },
      { text: "Narrative strategy", icon: FileText },
    ],
  },
  {
    id: "stories",
    text: "We tell stories.",
    subItems: [
      { text: "Digital & social campaigns", icon: Megaphone },
      { text: "Creative strategy", icon: Route },
      { text: "Thought leadership", icon: Crown },
      { text: "IPs", icon: Lightbulb },
    ],
  },
  {
    id: "impact",
    text: "We create impact.",
    subItems: [
      { text: "Impact communication", icon: Users },
      { text: "Internal & Culture communication", icon: Drama },
      { text: "Advocacy campaigns", icon: Hand },
      { text: "ESG & Sustainability storytelling", icon: Leaf },
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
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setActiveIndex(null);
      }

      subRefs.current.forEach((el, index) => {
        if (!el) return;

        const isActive = isMobile ? false : index === DEFAULT_ACTIVE;

        if (isActive) {
          gsap.set(el, { height: "auto", opacity: 1, overflow: "hidden" });
        } else {
          gsap.set(el, { height: 0, opacity: 0, overflow: "hidden" });
        }
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
      variant="light"
      aria-label="Our services"
    >
      <SiteContainer>
        <SectionEyebrow scramble>What We Do</SectionEyebrow>

        <div className="mt-6 flex flex-col gap-8 md:mt-0 md:gap-4" onMouseLeave={handleListMouseLeave}>
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="service-item cursor-pointer py-2 md:cursor-default md:py-0 max-md:!opacity-100"
              style={{ opacity: getOpacityFor(DEFAULT_ACTIVE, index) }}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => handleClick(index)}
            >
                <div className="flex w-full items-start justify-between gap-5 md:items-center md:gap-4">
                  <p
                    className="w-[calc(100%-4.5rem)] break-words pr-2 text-black md:w-full md:pr-0"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: activeIndex === index ? 700 : 400,
                      fontSize: "clamp(2.625rem, 8.5vw, 100px)",
                      lineHeight: "1.14",
                      letterSpacing: "0%",
                      transition: "font-weight 0.3s ease",
                    }}
                  >
                    {service.text}
                  </p>

                  <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black text-white md:hidden">
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
                <ul className="flex flex-col gap-3 pt-7 pb-2 pl-4 text-black md:gap-4 md:pb-4 md:pl-25">
                  {service.subItems.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <li key={itemIndex} className="flex items-center gap-3 md:gap-4 text-[#333] text-base md:text-xl md:font-medium">
                        <Icon className="text-[#169D52] w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                        <span className="cursor-pointer transition-opacity hover:opacity-70">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
