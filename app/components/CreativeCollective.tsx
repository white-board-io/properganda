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
         <p className="cc-text-item relative z-10 mb-5 text-xs font-bold tracking-[0.2em] text-[#169D52] uppercase">
            ABOUT US
          </p>

        <div
          className="relative overflow-hidden rounded-[2.5rem] px-8 pb-32 pt-16 sm:px-16 md:px-24 md:pb-40 md:pt-24 lg:px-32"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(48, 48, 48, 0.5) 100%)",
          }}
        >
          {/* ── Rows wrapper: position:relative so image can be absolute ── */}
          <div className="relative z-10">

            {/* ── ROW 1: 3-column grid ── */}
            <div className="grid grid-cols-3 gap-x-10">
              {/* Col 1 – Creative Collective heading */}
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

              {/* Col 2 – Description text */}
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
                  Using ideas, information and messages with the sincere intent of{" "}
                  <span className="font-bold text-white">
                    positively influencing
                  </span>{" "}
                  the beliefs and actions of causes, communities and companies.
                </p>
              </div>

              {/* Col 3 – Empty (image floats here via absolute) */}
              <div />
            </div>

            {/* ── ROW 2: Quote text ── */}
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

            {/* ── Image: absolutely positioned on the right, spanning both rows ── */}
            <div
              className="cc-image absolute right-0"
              style={{
                top: "1rem",
                right: "-2rem",
                width: "580px",
                height: "444px",
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
