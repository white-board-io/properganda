"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import TorriStatementGraphic from "@/app/components/TorriStatementGraphic";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

gsap.registerPlugin(useGSAP);

export default function AboutUs() {
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
    <SectionShell
      id="about"
      variant="dark"
      ref={sectionRef}
      spacing="default"
      className="px-0"
      aria-label="About - Creative Collective"
    >
      <SiteContainer>
        <SectionEyebrow className="cc-text-item">ABOUT US</SectionEyebrow>

        <section className="ui-panel ui-panel--gradient relative overflow-hidden px-8 pb-32 pt-16 sm:px-16 md:px-20 md:pb-40 md:pt-24 lg:px-24 xl:px-32">
          <section className="relative z-10">
            <section className="flex flex-col lg:flex-row lg:items-start gap-12">
              <section className="cc-text-item flex flex-col justify-start">
                <h2 className="font-bebas-neue text-[clamp(4rem,6vw,5.5rem)] leading-[0.89] font-normal uppercase text-white">
                  Creative
                  <br />
                  Collective
                </h2>
              </section>

              <section className="cc-text-item flex flex-col justify-start">
                <p className="max-w-sm text-[1.25rem] leading-normal font-light tracking-[0.02em] text-neutral-450 sm:text-[1.375rem] xl:text-[1.4375rem] xl:leading-[1.44]">
                  Using ideas, information and messages with the sincere intent
                  of{" "}
                  <span className="font-bold text-white">
                    positively influencing
                  </span>{" "}
                  the beliefs and actions of causes, communities and companies.
                </p>
              </section>
            </section>

            <section className="relative z-20 -mt-20">
              <section className="cc-image w-full max-w-6xl">
                <TorriStatementGraphic className="h-auto w-full" />
              </section>
              <a
                href="#contact"
                className="cc-text-item inline-block text-sm font-medium text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-white"
              >
                Be a part of Us
              </a>
            </section>
          </section>
        </section>

        <div className="relative z-20 -mt-8 flex justify-center">
          <Link href="/commandments" className="ui-commandments-link cc-button">
            <span className="ui-commandments-link__label">
              Read Our 10 Commandments
            </span>
          </Link>
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
