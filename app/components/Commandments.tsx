"use client";

import { useRef, useState } from "react";

import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";
import { cn } from "@/lib/utils";

type Commandment = {
  number: string;
  title: string;
  description: string;
};

export default function Commandments({
  commandments,
}: {
  commandments: Commandment[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollToCommandment = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const element = container.querySelectorAll(".commandment-item")[
        index
      ] as HTMLElement;

      if (element) {
        container.scrollTo({
          top: element.offsetTop - container.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  const handleInternalScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPos = container.scrollTop;
      const itemHeight = container.clientHeight;
      const newIdx = Math.round(scrollPos / itemHeight);

      if (newIdx !== activeIdx && newIdx < commandments.length) {
        setActiveIdx(newIdx);
      }
    }
  };

  return (
    <SectionShell
      variant="dark"
      spacing="none"
      className="px-0"
      aria-label="Commandments Content"
    >
      <SiteContainer>
        <div className="ui-panel ui-panel--solid-dark relative flex h-[90vh] items-center overflow-hidden px-12">
          <div className="relative z-10 flex h-full w-full items-center">
            <div className="absolute left-0 z-20 flex flex-col gap-4 text-sm font-medium">
              {commandments.map((commandment, index) => (
                <button
                  key={commandment.number}
                  type="button"
                  onClick={() => scrollToCommandment(index)}
                  className={cn(
                    "font-inter text-left transition-all duration-300",
                    activeIdx === index
                      ? "scale-110 text-green-500 opacity-100"
                      : "text-white opacity-40 hover:opacity-100",
                  )}
                >
                  {commandment.number}
                </button>
              ))}
            </div>

            <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center text-center">
              <div className="flex w-full flex-1 flex-col items-center justify-start">
                <div className="w-px flex-1 bg-white" />
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>

              <div
                ref={scrollContainerRef}
                onScroll={handleInternalScroll}
                className="ui-no-scrollbar relative h-[28rem] w-full snap-y snap-mandatory overflow-y-auto scroll-smooth"
              >
                {commandments.map((commandment) => (
                  <div
                    key={`${commandment.number}-${commandment.title}`}
                    className="commandment-item flex h-full w-full snap-center flex-col items-center justify-center px-4"
                  >
                    <span className="font-bebas-neue mb-6 text-[100px] leading-none font-bold text-green-500">
                      {commandment.number}
                    </span>
                    <h3 className="font-bebas-neue mb-4 w-full max-w-4xl text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] font-normal uppercase text-white">
                      {commandment.title}
                    </h3>
                    <p className="max-w-2xl text-2xl leading-[1.44] font-light tracking-[0.02em] text-white/70">
                      {commandment.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex w-full flex-1 flex-col items-center justify-end">
                <div className="h-2 w-2 rounded-full bg-white" />
                <div className="w-px flex-1 bg-white transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
