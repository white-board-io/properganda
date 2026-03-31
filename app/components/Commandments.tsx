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

const COMMANDMENTS_NOTE =
  "*Properganda is always evolving. So is this list. #BeProper";

const renderTitle = (title: string) => {
  const lowerTitle = title.toUpperCase();
  if (lowerTitle.includes("COPY-PASTE")) {
    const index = lowerTitle.indexOf("COPY-PASTE");
    const before = title.slice(0, index);
    const match = title.slice(index, index + 10);
    const after = title.slice(index + 10);
    return (
      <>
        {before}
        <span 
          className="bg-clip-text text-transparent" 
          style={{ backgroundImage: 'linear-gradient(90deg, #169D52 -33.2%, #FFFFFF 104.45%)' }}
        >
          {match}
        </span>
        {after}
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
  const totalItems = commandments.length;
  const getHeaderOffset = () => (window.innerWidth >= 768 ? 120 : 104);

  const getDesktopScrollTarget = (index: number) => {
    const st = stRef.current;
    if (!st) return window.scrollY;

    const stepSize = (st.end - st.start) / totalItems;
    return st.start + stepSize * index;
  };

  useGSAP(
    () => {
      if (!panelRef.current || !trackRef.current) return;

      const st = ScrollTrigger.create({
        trigger: panelRef.current,
        start: () => `top top+=${getHeaderOffset()}`,
        end: `+=${totalItems * 100}%`,
        pin: true,
        invalidateOnRefresh: true,
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
        onUpdate: (self) => {
          if (isAnimatingRef.current) return;

          const stepSize = (self.end - self.start) / totalItems;
          if (!stepSize) return;

          const progressWithinSection = Math.max(0, window.scrollY - self.start);
          const nextIdx = Math.min(
            totalItems - 1,
            Math.round(progressWithinSection / stepSize),
          );

          if (nextIdx === currentIdxRef.current) return;

          currentIdxRef.current = nextIdx;
          setActiveIdx(nextIdx);
          gsap.set(trackRef.current, { yPercent: -100 * nextIdx });
        },
      });

      stRef.current = st;

      const animateToIdx = (targetIdx: number) => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        currentIdxRef.current = targetIdx;
        setActiveIdx(targetIdx);
        const scrollState = { y: window.scrollY };
        const targetScroll = getDesktopScrollTarget(targetIdx);

        gsap.timeline({
          defaults: { duration: 0.82, ease: "power3.inOut" },
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        })
        .to(trackRef.current, {
          yPercent: -100 * targetIdx,
        }, 0)
        .to(scrollState, {
          y: targetScroll,
          onUpdate: () => {
            window.scrollTo(0, scrollState.y);
          },
        });
      };

      const exitSection = (direction: "up" | "down") => {
        isAnimatingRef.current = true;
        const targetScroll = direction === "down" ? st.end + 1 : st.start - 1;
        const scrollObj = { y: window.scrollY };
        gsap.to(scrollObj, {
          y: targetScroll,
          duration: 0.9,
          ease: "power3.inOut",
          onUpdate: () => window.scrollTo(0, scrollObj.y),
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      };

      const handleWheel = (e: WheelEvent) => {
        if (window.innerWidth < 768) return;
        if (!st.isActive) return;
        if (Math.abs(e.deltaY) < 10) return;

        e.preventDefault();
        if (isAnimatingRef.current || wheelCooldownRef.current) return;

        wheelCooldownRef.current = true;
        setTimeout(() => {
          wheelCooldownRef.current = false;
        }, 520);

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
        st.kill();
        stRef.current = null;
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
    const targetScroll = getDesktopScrollTarget(index);
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    currentIdxRef.current = index;
    setActiveIdx(index);
    const scrollState = { y: window.scrollY };

    gsap.timeline({
      defaults: { duration: 0.5, ease: "power3.out" },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    })
    .to(trackRef.current, {
      yPercent: -100 * index,
    }, 0)
    .to(scrollState, {
      y: targetScroll,
      onUpdate: () => {
        window.scrollTo(0, scrollState.y);
      },
    }, 0);
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
          className="ui-panel ui-panel--solid-dark relative flex h-[calc(100vh-7.5rem)] min-h-[38rem] items-center overflow-hidden px-12"
        >
          <p className="pointer-events-none absolute bottom-8 right-12 z-20 max-w-[22rem] text-right font-inter text-[12px] font-light leading-[1.44] tracking-[0.02em] text-white/65">
            {COMMANDMENTS_NOTE}
          </p>

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
      <div className="md:hidden relative flex h-[calc(100svh-6.5rem)] min-h-[34rem] w-full flex-col overflow-hidden bg-black pb-12">
        <p className="pointer-events-none absolute bottom-20 right-4 z-10 max-w-[18rem] text-right font-inter text-[12px] font-light leading-[1.44] tracking-[0.02em] text-white/65">
          {COMMANDMENTS_NOTE}
        </p>

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
