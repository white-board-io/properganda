"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CreativeCollective({ 
  variant = "default",
  commandments = []
}: { 
  variant?: "default" | "background-only" | "commandments",
  commandments?: Array<{ number: string, title: string, description: string }>
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
      const element = container.querySelectorAll(".commandment-item")[index] as HTMLElement;
      if (element) {
        container.scrollTo({
          top: element.offsetTop - container.offsetTop,
          behavior: "smooth"
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
    <section
      ref={sectionRef}
      id={isDefault ? "about" : undefined}
      className={`bg-brand-black px-4 sm:px-6 md:px-10 lg:px-16 ${isCommandments ? '' : 'py-24 md:py-32'}`}
      aria-label={isDefault ? "About - Creative Collective" : "Commandments Content"}
    >
      <div className="mx-auto max-w-[1400px]">
        {isDefault && (
          <p className="cc-text-item relative z-10 mb-5 text-xs font-bold tracking-[0.2em] text-[#169D52] uppercase">
            ABOUT US
          </p>
        )}

        <div
          className={`relative overflow-hidden rounded-[2.5rem] ${isCommandments ? 'h-[90vh] flex items-center px-12' : 'px-8 pb-32 pt-16 sm:px-16 md:px-24 md:pb-40 md:pt-24 lg:px-32'}`}
          style={isCommandments ? { backgroundColor: '#000000' } : (!isBackgroundOnly ? {
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(48, 48, 48, 0.5) 100%)",
          } : undefined)}
        >
          {isDefault && (
            <div className="relative z-10">
              <div className="grid grid-cols-3 gap-x-10">
                <div className="cc-text-item flex flex-col justify-start">
                  <h2
                    className="uppercase text-white leading-none"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontWeight: 400,
                      fontSize: "88px",
                      lineHeight: "78px",
                      letterSpacing: "0%",
                    }}
                  >
                    Creative
                    <br />
                    Collective
                  </h2>
                </div>

                <div className="cc-text-item flex flex-col justify-start pt-2">
                  <p
                    className="text-[#a0a0a0]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300,
                      fontSize: "23px",
                      lineHeight: "144%",
                      letterSpacing: "0.02em",
                    }}
                  >
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
                <p
                  className="text-[#169D52]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "88px",
                    lineHeight: "110px",
                    letterSpacing: "0%",
                  }}
                >
                  We rise by
                  <br />
                  <span className="relative inline-flex items-end">
                    lifting others
                    <span className="mb-3 ml-2 inline-block h-5 w-5 rounded-full bg-[#169D52]" />
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
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>
          )}

          {isCommandments && (
            <div className="relative z-10 flex h-full w-full items-center">
              {/* Left Navigation Numbers */}
              <div className="absolute left-0 flex flex-col gap-4 text-sm font-medium z-20">
                {commandments.map((c, i) => (
                  <button 
                    key={i} 
                    onClick={() => scrollToCommandment(i)}
                    className={`text-left transition-all duration-300 font-inter ${activeIdx === i ? 'text-[#169D52] opacity-100 scale-110' : 'text-white opacity-40 hover:opacity-100'}`}
                  >
                    {c.number}
                  </button>
                ))}
              </div>

              {/* Central Content */}
              <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center text-center">
                {/* Vertical Line Top */}
                <div className="flex-1 flex flex-col items-center justify-start w-full">
                  <div className="flex-1 w-[1px] bg-white" />
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>

                {/* Internal Scrollable Area */}
                <div 
                  ref={scrollContainerRef}
                  onScroll={handleInternalScroll}
                  className="relative h-[28rem] w-full overflow-y-auto snap-y snap-mandatory no-scrollbar scroll-smooth"
                >
                  {commandments.map((c, i) => (
                    <div 
                      key={i} 
                      className="commandment-item h-full w-full flex flex-col items-center justify-center snap-center px-4"
                    >
                      <span 
                        className="mb-6 text-[100px] font-bold leading-none text-[#169D52]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {c.number}
                      </span>
                      <h3 
                        className="mb-4 uppercase text-white w-full max-w-4xl"
                        style={{ 
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontWeight: 400,
                          fontSize: "60px",
                          lineHeight: "65px",
                          letterSpacing: "0%",
                        }}
                      >
                        {c.title}
                      </h3>
                      <p 
                        className="max-w-2xl text-white/70"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 300,
                          fontSize: "24px",
                          lineHeight: "144%",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {c.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Vertical Line Bottom */}
                <div className="flex-1 flex flex-col items-center justify-end w-full">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  <div className="flex-1 w-[1px] bg-white transition-opacity duration-300" />
                </div>
              </div>
            </div>
          )}
        </div>

        {isDefault && (
          <div className="relative z-20 -mt-8 flex justify-center">
            <a
              href="/commandments"
              className="cc-button relative flex items-center justify-center whitespace-nowrap bg-[#0A0A0A] px-12 py-5 shadow-[0_4px_20px_rgba(0,224,74,0.15)] transition-all hover:shadow-[0_4px_30px_rgba(0,224,74,0.3)] min-w-[400px] rounded-full before:absolute before:inset-0 before:-z-10 before:rounded-full before:p-[3px] before:content-['']"
              style={{
                backgroundClip: "padding-box",
              }}
              role="link"
            >
              <span
                className="text-5xl font-normal"
                style={{
                  background:
                    "linear-gradient(90deg, #FFFFFF 15.75%, #169D52 75.87%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Read Our 10 Commandments
              </span>
            </a>
          </div>
        )}
      </div>
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .cc-button::before {
          background: linear-gradient(90deg, #169d52 0%, #f5f5f7 75.48%);
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>
    </section>
  );
}
