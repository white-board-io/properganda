"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import CreativeCollective from "../components/CreativeCollective";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { COMMANDMENTS } from "./data";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CommandmentsPageClient() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".commandment-item", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <div className="bg-brand-black min-h-screen">
      <Header variant="commandments" />

      <main ref={containerRef}>
        <Hero variant="commandments" />
        <CreativeCollective
          variant="commandments"
          commandments={COMMANDMENTS}
        />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
