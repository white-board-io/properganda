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

  useGSAP(
    () => {
      if (!panelRef.current || !trackRef.current) return;

      const items = gsap.utils.toArray(".commandment-item");
      const totalItems = items.length;

      const yMove = -100 * (totalItems - 1);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: panelRef.current,
          start: "center center",
          end: `+=${totalItems * 100}%`,
          pin: true,
          animation: gsap.to(trackRef.current, {
            yPercent: yMove,
            ease: "none",
          }),
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIdx = Math.min(
              Math.max(Math.round(progress * (totalItems - 1)), 0),
              totalItems - 1,
            );

            // Only update via scroll if on desktop
            if (newIdx !== activeIdx && window.innerWidth >= 768) {
              setActiveIdx(newIdx);
            }
          },
        });
      });

      return () => ctx.revert();
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

    if (!panelRef.current) return;

    const st = ScrollTrigger.getAll().find(
      (trigger) => trigger.trigger === panelRef.current,
    );

    if (st) {
      const start = st.start;
      const end = st.end;
      const progress = index / (commandments.length - 1);
      const targetScroll = start + (end - start) * progress;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
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
