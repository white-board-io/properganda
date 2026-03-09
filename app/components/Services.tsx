"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  { text: "We build brands.", bold: false },
  { text: "We design campaigns.", bold: true },
  { text: "We craft stories.", bold: false },
  { text: "We shape conversations.", bold: false },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".service-line", {
        opacity: 0,
        x: -80,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-brand-black py-24 md:py-32"
      aria-label="Our services"
    >
      <div className="mx-auto max-w-[1140px] px-10 sm:px-16 md:px-20 lg:px-24">
        <p className="mb-16 text-[10px] tracking-[0.3em] text-brand-gray uppercase">
          What We Do
        </p>

        <div className="flex flex-col gap-1">
          {services.map((service) => (
            <p
              key={service.text}
              className={`service-line font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.1] tracking-wide text-white ${
                service.bold ? "font-bold" : "font-normal"
              }`}
            >
              {service.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
