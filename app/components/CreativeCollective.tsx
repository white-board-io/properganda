"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type Commandment = {
  number: string;
  title: string;
  description: string;
};

const EMPTY_COMMANDMENTS: Commandment[] = [];

export default function CreativeCollective({
  variant = "default",
  commandments = EMPTY_COMMANDMENTS,
}: {
  variant?: "default" | "background-only" | "commandments";
  commandments?: Commandment[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      if (variant === "default") {
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
      }
    },
    { scope: sectionRef, dependencies: [variant] },
  );

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

  const isDefault = variant === "default";
  const isBackgroundOnly = variant === "background-only";
  const isCommandments = variant === "commandments";

  return (
    <SectionShell
      ref={sectionRef}
      id={isDefault ? "about" : undefined}
      variant="dark"
      spacing={isCommandments ? "none" : "default"}
      className="px-0"
      aria-label={isDefault ? "About - Creative Collective" : "Commandments Content"}
    >
      <SiteContainer>
        {isDefault && <SectionEyebrow className="cc-text-item">ABOUT US</SectionEyebrow>}

        <div
          className={cn(
            "ui-panel relative overflow-hidden",
            isCommandments
              ? "ui-panel--solid-dark flex h-[90vh] items-center px-12"
              : "px-8 pb-32 pt-16 sm:px-16 md:px-24 md:pb-40 md:pt-24 lg:px-32",
            isDefault && "ui-panel--gradient",
            isBackgroundOnly && "bg-transparent",
          )}
        >
          {isDefault && (
            <div className="relative z-10">
              <div className="grid grid-cols-3 gap-x-10">
                <div className="cc-text-item flex flex-col justify-start">
                  <h2 className="font-display text-[clamp(4rem,6vw,5.5rem)] leading-[0.89] font-normal uppercase text-white">
                    Creative
                    <br />
                    Collective
                  </h2>
                </div>

                <div className="cc-text-item flex flex-col justify-start pt-2">
                  <p className="max-w-[28rem] text-[1.4375rem] leading-[1.44] font-light tracking-[0.02em] text-neutral-450">
                    Using ideas, information and messages with the sincere intent
                    of{" "}
                    <span className="font-bold text-white">
                      positively influencing
                    </span>{" "}
                    the beliefs and actions of causes, communities and companies.
                  </p>
                </div>

                <div />
              </div>

              <div className="cc-text-item relative z-20 mt-6">
                <p className="text-[clamp(3.75rem,6vw,5.5rem)] leading-[1.25] font-bold text-green-500">
                  We rise by
                  <br />
                  <span className="relative inline-flex items-end">
                    lifting others
                    <span className="mb-3 ml-2 inline-block h-5 w-5 rounded-full bg-green-500" />
                  </span>
                </p>
                <a
                  href="#contact"
                  className="mt-8 inline-block text-sm font-medium text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-white"
                >
                  Be a part of Us
                </a>
              </div>

              <div
                className="cc-image absolute right-2"
                style={{
                  top: "1rem",
                  right: "-0.5rem",
                  width: "580px",
                  height: "440px",
                }}
              >
                <Image
                  src="/images/svg/torri.svg"
                  alt="Torii Line Art"
                  fill
                  sizes="(max-width: 1024px) 55vw, 580px"
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          )}

          {isCommandments && (
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
                      <span className="font-display mb-6 text-[100px] leading-none font-bold text-green-500">
                        {commandment.number}
                      </span>
                      <h3 className="font-display mb-4 w-full max-w-4xl text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] font-normal uppercase text-white">
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
          )}
        </div>

        {isDefault && (
          <div className="relative z-20 -mt-8 flex justify-center">
            <Link href="/commandments" className="ui-commandments-link cc-button">
              <span className="ui-commandments-link__label">
                Read Our 10 Commandments
              </span>
            </Link>
          </div>
        )}
      </SiteContainer>
    </SectionShell>
  );
}
