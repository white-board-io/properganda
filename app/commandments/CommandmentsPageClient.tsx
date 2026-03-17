"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Commandments from "../components/Commandments";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { COMMANDMENTS } from "./data";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CommandmentsPageClient() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let isScrolling = false;
    let timeoutId: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // If at the very top and scrolling down
      if (window.scrollY < 50 && e.deltaY > 0 && !isScrolling) {
        e.preventDefault();
        isScrolling = true;
        
        const commandmentsEl = document.getElementById("commandments-section");
        if (commandmentsEl) {
          window.scrollTo({
            top: commandmentsEl.offsetTop,
            behavior: "smooth"
          });
          
          // Reset flag after scroll animation completes
          timeoutId = setTimeout(() => {
            isScrolling = false;
          }, 1000); // 1 second should be enough for smooth scroll
        }
      }
    };

    // Need { passive: false } to use e.preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: false });
    
    // Also handle touch events for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY < 50 && !isScrolling) {
        const touchEndY = e.touches[0].clientY;
        const deltaY = touchStartY - touchEndY; // Positive means scrolling down
        
        if (deltaY > 10) { // Threshold
          e.preventDefault();
          isScrolling = true;
          
          const commandmentsEl = document.getElementById("commandments-section");
          if (commandmentsEl) {
            window.scrollTo({
              top: commandmentsEl.offsetTop,
              behavior: "smooth"
            });
            
            timeoutId = setTimeout(() => {
              isScrolling = false;
            }, 1000);
          }
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      clearTimeout(timeoutId);
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
