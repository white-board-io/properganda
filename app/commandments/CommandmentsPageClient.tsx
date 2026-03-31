"use client";

import { useEffect } from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Commandments from "../components/Commandments";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { COMMANDMENTS } from "./data";

export default function CommandmentsPageClient() {
  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    let snapCooldown = false;
    let touchStartY = 0;

    const getHeaderOffset = () => (window.innerWidth >= 768 ? 120 : 104);
    const getCommandmentsSnapTarget = () => {
      const commandmentsEl = document.getElementById("commandments-section");
      if (!commandmentsEl) return null;

      return Math.max(0, commandmentsEl.offsetTop - getHeaderOffset());
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    const snapToCommandments = () => {
      const target = getCommandmentsSnapTarget();
      if (target === null || snapCooldown) return;

      snapCooldown = true;
      window.scrollTo({ top: target, left: 0, behavior: "smooth" });
      window.setTimeout(() => {
        snapCooldown = false;
      }, 900);
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) return;

      const target = getCommandmentsSnapTarget();
      if (target === null) return;
      if (window.scrollY >= target - 2) return;

      e.preventDefault();
      snapToCommandments();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - (e.touches[0]?.clientY ?? touchStartY);
      if (deltaY <= 12) return;

      const target = getCommandmentsSnapTarget();
      if (target === null) return;
      if (window.scrollY >= target - 2) return;

      e.preventDefault();
      snapToCommandments();
    };

    scrollToTop();

    const rafId = window.requestAnimationFrame(scrollToTop);
    const timeoutId = window.setTimeout(scrollToTop, 0);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.history.scrollRestoration = previousScrollRestoration;
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
