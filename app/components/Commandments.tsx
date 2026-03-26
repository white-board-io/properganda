"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Commandment = {
  number: string;
  title: string;
  description: string;
};

const renderTitle = (title: string) => {
  if (title.includes("COPY-PASTE")) {
    const parts = title.split("COPY-PASTE");
    return (
      <>
        {parts[0]}
        <span className="text-[#169D52]">COPY-PASTE</span>
        {parts[1]}
      </>
    );
  }
  return title;
};

export default function Commandments({
  commandments,
}: {
  commandments: Commandment[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const isAnimatingRef = useRef(false);
  const currentIdxRef = useRef(0);
  const stRef = useRef<ScrollTrigger | null>(null);
  const wheelCooldownRef = useRef(false);

  useGSAP(
    () => {
      if (!panelRef.current || !trackRef.current) return;

      const totalItems = commandments.length;

      const st = ScrollTrigger.create({
        trigger: panelRef.current,
        start: "top top",
        end: `+=${totalItems * 100}%`,
        pin: true,
        onEnter: () => {
          currentIdxRef.current = 0;
          setActiveIdx(0);
          gsap.set(trackRef.current, { yPercent: 0 });
        },
        onEnterBack: () => {
          currentIdxRef.current = totalItems - 1;
          setActiveIdx(totalItems - 1);
          gsap.set(trackRef.current, { yPercent: -100 * (totalItems - 1) });
        },
      });

      stRef.current = st;

      const animateToIdx = (targetIdx: number) => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        currentIdxRef.current = targetIdx;
        setActiveIdx(targetIdx);

        gsap.to(trackRef.current, {
          yPercent: -100 * targetIdx,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      };

      const exitSection = (direction: "up" | "down") => {
        isAnimatingRef.current = true;
        const targetScroll = direction === "down" ? st.end + 1 : st.start - 1;
        const scrollObj = { y: window.scrollY };
        gsap.to(scrollObj, {
          y: targetScroll,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: () => window.scrollTo(0, scrollObj.y),
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      };

      const handleWheel = (e: WheelEvent) => {
        if (window.innerWidth < 768) return;
        if (!st.isActive) return;

        e.preventDefault();
        if (isAnimatingRef.current || wheelCooldownRef.current) return;

        wheelCooldownRef.current = true;
        setTimeout(() => {
          wheelCooldownRef.current = false;
        }, 1000);

        const idx = currentIdxRef.current;

        if (e.deltaY > 0) {
          if (idx < totalItems - 1) {
            animateToIdx(idx + 1);
          } else {
            exitSection("down");
          }
        } else if (e.deltaY < 0) {
          if (idx > 0) {
            animateToIdx(idx - 1);
          } else {
            exitSection("up");
          }
        }
      };

      window.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        window.removeEventListener("wheel", handleWheel);
      };
    },
    { scope: scrollContainerRef, dependencies: [commandments] },
  );

  const scrollToCommandment = (index: number) => {
    if (window.innerWidth < 768) {
      if (mobileContainerRef.current) {
        mobileContainerRef.current.scrollTo({
          left: mobileContainerRef.current.clientWidth * index,
          behavior: "smooth",
        });
        setActiveIdx(index);
      }
      return;
    }

    if (!trackRef.current) return;
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    currentIdxRef.current = index;
    setActiveIdx(index);

    gsap.to(trackRef.current, {
      yPercent: -100 * index,
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  };

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    const newIdx = Math.round(scrollLeft / width);
    if (newIdx !== activeIdx) setActiveIdx(newIdx);
  };

  return (
    <SectionShell
      variant="dark"
      spacing="none"
      className="px-0 relative"
      aria-label="Commandments Content"
      ref={scrollContainerRef}
    >
      <SiteContainer className="hidden md:block">
        <div
          ref={panelRef}
          className="ui-panel ui-panel--solid-dark relative flex h-[90vh] items-center overflow-hidden px-12"
        >
          <div className="relative z-10 flex h-full w-full items-center">
            {/* Side Navigation */}
            <div className="absolute left-0 z-20 flex flex-col gap-4 text-sm font-medium">
              {commandments.map((commandment, index) => (
                <button
                  key={commandment.number}
                  type="button"
                  onClick={() => scrollToCommandment(index)}
                  className={cn(
                    "font-inter block w-8 text-left transition-all duration-300",
                    activeIdx === index
                      ? "text-[#169D52] font-black text-base opacity-100"
                      : "text-white opacity-40 hover:opacity-100 font-normal text-sm",
                  )}
                >
                  {commandment.number}
                </button>
              ))}
            </div>

            <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center text-center">
              {/* Top Line Map */}
              <div className="flex w-full flex-1 flex-col items-center justify-start z-10">
                <div className="w-px flex-1 bg-white" />
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>

              {/* Scrolling Track Container */}
              <div className="relative h-[28rem] w-full overflow-hidden">
                {/* The Track that moves up */}
                <div
                  ref={trackRef}
                  className="absolute left-0 top-0 w-full h-full flex flex-col"
                >
                  {commandments.map((commandment) => (
                    <div
                      key={`${commandment.number}-${commandment.title}`}
                      className="commandment-item shrink-0 flex h-full w-full flex-col items-center justify-center px-4"
                    >
                      <span className="font-bebas-neue mb-6 text-[100px] leading-none font-bold text-[#169D52]">
                        {commandment.number}
                      </span>
                      <h3 className="font-bebas-neue mb-4 w-full max-w-4xl text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] font-normal uppercase text-white">
                        {renderTitle(commandment.title)}
                      </h3>
                      <p className="max-w-2xl text-2xl leading-[1.44] font-light tracking-[0.02em] text-white/70">
                        {commandment.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Line Map */}
              <div className="flex w-full flex-1 flex-col items-center justify-end z-10">
                <div className="h-2 w-2 rounded-full bg-white" />
                <div className="w-px flex-1 bg-white transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </SiteContainer>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col h-[80svh] relative w-full pb-12 overflow-hidden bg-black">
        {/* Mobile Swipe Container */}
        <div
          ref={mobileContainerRef}
          className="flex w-full flex-1 overflow-x-auto snap-x snap-mandatory ui-no-scrollbar"
          onScroll={handleMobileScroll}
        >
          {commandments.map((commandment) => (
            <div
              key={commandment.number}
              className="w-full shrink-0 snap-center flex flex-col items-center justify-center px-6 relative"
            >
              {/* Top Number indicator with lines */}
              <div className="flex w-full items-center justify-center mb-12">
                <div className="flex-1 flex items-center h-full">
                  <div className="flex-1 h-[2px] bg-white"></div>
                  <div className="w-[8px] h-[8px] rounded-full bg-white shrink-0 ml-[-2px]"></div>
                </div>
                <div className="px-6 text-[110px] sm:text-[130px] leading-none text-[#169D52] font-bebas-neue font-bold text-center shrink-0">
                  {commandment.number}
                </div>
                <div className="flex-1 flex items-center h-full">
                  <div className="w-[8px] h-[8px] rounded-full bg-white shrink-0 mr-[-2px]"></div>
                  <div className="flex-1 h-[2px] bg-white"></div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col items-center transform -translate-y-4">
                <h3 className="font-bebas-neue mb-6 w-full max-w-[90%] text-center text-[32px] leading-[34px] font-normal tracking-normal text-white">
                  {renderTitle(commandment.title)}
                </h3>

                <p className="text-center text-[20px] leading-[144%] text-white/80 font-inter font-light tracking-[0.02em] px-4">
                  {commandment.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom pagination */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-[clamp(0.5rem,2vw,1rem)] text-xs font-inter z-10 px-4">
          {commandments.map((commandment, idx) => (
            <button
              key={commandment.number}
              onClick={() => scrollToCommandment(idx)}
              className={cn(
                "font-inter block w-8 text-center transition-all duration-300",
                activeIdx === idx
                  ? "text-[#169D52] font-black text-base opacity-100"
                  : "text-white opacity-40 hover:opacity-100 font-normal text-sm",
              )}
            >
              {commandment.number}
            </button>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
