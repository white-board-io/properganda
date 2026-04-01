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

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    scrollToTop();

    const rafId = window.requestAnimationFrame(scrollToTop);
    const timeoutId = window.setTimeout(scrollToTop, 0);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  return (
    <div data-commandments-route className="bg-brand-black min-h-screen">
      <Header variant="commandments" />

      <main>
        <div id="commandments-hero-snap" className="md:snap-start md:snap-always">
          <Hero variant="commandments" />
        </div>
        <div id="commandments-section">
          <Commandments commandments={COMMANDMENTS} />
        </div>
        <div className="md:snap-start md:snap-always">
          <CTA />
        </div>
      </main>

      <div className="md:snap-start md:snap-always">
        <Footer />
      </div>
    </div>
  );
}
