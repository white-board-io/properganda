"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Commandments from "../components/Commandments";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { COMMANDMENTS } from "./data";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CommandmentsPageClient() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cooldown = false;

    const handleWheel = (e: WheelEvent) => {
      const commandmentsEl = document.getElementById("commandments-section");
      if (!commandmentsEl) return;

      const sectionTop = commandmentsEl.offsetTop;
      if (window.scrollY >= sectionTop) return;

      if (e.deltaY > 0) {
        e.preventDefault();
        if (!cooldown) {
          cooldown = true;
          window.scrollTo(0, sectionTop);
          setTimeout(() => { cooldown = false; }, 500);
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const commandmentsEl = document.getElementById("commandments-section");
      if (!commandmentsEl) return;

      const sectionTop = commandmentsEl.offsetTop;
      if (window.scrollY >= sectionTop) return;

      const deltaY = touchStartY - e.touches[0].clientY;
      if (deltaY > 10) {
        e.preventDefault();
        if (!cooldown) {
          cooldown = true;
          window.scrollTo(0, sectionTop);
          setTimeout(() => { cooldown = false; }, 500);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

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
        <div id="commandments-section">
          <Commandments commandments={COMMANDMENTS} />
        </div>
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
