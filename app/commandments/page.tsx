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

export default function CommandmentsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".commandment-item", {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <div className="bg-brand-black min-h-screen">
      <Header variant="commandments" />
      
      <main ref={containerRef}>
        {/* We use Hero but we need to ensure it shows the bg and badge as requested */}
        <Hero variant="commandments" />

        {/* The 10 Commandments Scroll Section using CreativeCollective variant */}
        <CreativeCollective variant="commandments" commandments={COMMANDMENTS} />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
