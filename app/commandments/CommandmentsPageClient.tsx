"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Commandments from "../components/Commandments";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { COMMANDMENTS } from "./data";
import { useEffect } from "react";

export default function CommandmentsPageClient() {
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

  return (
    <div className="bg-brand-black min-h-screen">
      <Header variant="commandments" />

      <main>
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
