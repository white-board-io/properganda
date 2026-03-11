"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CreativeCollective() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-brand-black px-4 py-24 sm:px-6 md:px-10 md:py-32 lg:px-16"
      aria-label="About - Creative Collective"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Dark Box Container */}
        <div
          className="relative overflow-hidden rounded-[2.5rem] px-8 pb-32 pt-16 sm:px-16 md:px-24 md:pb-40 md:pt-24 lg:px-32"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(48, 48, 48, 0.5) 100%)",
          }}
        >
          {/* About Us label */}
          <p className="cc-text-item relative z-10 mb-20 text-xs font-bold tracking-[0.2em] text-brand-green uppercase">
            ABOUT US
          </p>

          {/* Main Layout Grid */}
          <div className="relative z-10 grid gap-x-12 gap-y-16 lg:grid-cols-[1fr_auto]">
            {/* Left Column - Texts */}
            <div className="flex max-w-2xl flex-col">
              {/* Title & Description Grid */}
              <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12 lg:gap-16">
                <h2 className="cc-text-item font-display text-[clamp(4rem,7vw,6rem)] uppercase leading-[0.9] tracking-wide text-white">
                  Creative
                  <br />
                  Collective
                </h2>
                <div className="cc-text-item max-w-[480px] pt-3">
                  <p className="whitespace-nowrap text-[16px] font-light leading-[1.44] tracking-[0.02em] text-[#a0a0a0]">
                    Using ideas, information
                    <br />
                    and messages with the sincere
                    <br />
                    intent of{" "}
                    <span className="font-bold text-white">
                      positively influencing
                    </span>
                    <br />
                    the beliefs and actions of
                    <br />
                    causes, communities and
                    <br />
                    companies.
                  </p>
                </div>
              </div>

              {/* Quote Area */}
              <div className="cc-text-item relative z-20 mt-20">
                <p className="font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.95] text-[#169D52]">
                  We rise by
                  <br />
                  <span className="relative flex items-end">
                    lifting others
                    <span className="mb-4 ml-1 inline-block h-4 w-4 rounded-full bg-[#169D52] sm:mb-5 sm:h-5 sm:w-5 md:mb-6 md:h-6 md:w-6"></span>
                  </span>
                </p>
                <a
                  href="#contact"
                  className="mt-8 inline-block text-sm font-medium text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-white"
                >
                  Be a part of Us
                </a>
              </div>
            </div>

            {/* Right Column - Torii Image */}
            <div className="cc-image relative z-10 mt-4 w-full self-end sm:mt-8 lg:mt-4 lg:mb-5 lg:ml-[-10rem] lg:w-[550px] xl:w-[650px]">
              <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[450px]">
                <Image
                  src="/images/svg/torri.svg"
                  alt="Torii Line Art"
                  fill
                  className="object-contain object-left md:object-right"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 -mt-8 flex justify-center">
          <a
            href="#commandments"
            className="cc-button relative flex items-center justify-center whitespace-nowrap bg-[#0A0A0A] px-12 py-5 shadow-[0_4px_20px_rgba(0,224,74,0.15)] transition-all hover:shadow-[0_4px_30px_rgba(0,224,74,0.3)] min-w-[400px] rounded-full before:absolute before:inset-0 before:-z-10 before:rounded-full before:p-[3px] before:content-['']"
            style={{
              backgroundClip: "padding-box",
            }}
            role="link"
          >
            <style jsx>{`
              .cc-button::before {
                background: linear-gradient(90deg, #169d52 0%, #f5f5f7 75.48%);
                -webkit-mask:
                  linear-gradient(#fff 0 0) content-box,
                  linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                mask-composite: exclude;
              }
            `}</style>
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
      </div>
    </section>
  );
}
