"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-content > *", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <footer
      ref={sectionRef}
      className="bg-brand-black pt-20 pb-12 text-white font-inter-google"
      role="contentinfo"
    >
      {/* Content Container */}
      <div className="mx-auto max-w-[1400px]">
        <div className="footer-content grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-36">
          {/* First Column: Logo (sub-col 1) and Text/Icons (sub-col 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start">
            <Link href="/" className="inline-block mt-2">
              <Image
                src="/images/svg/logo.svg"
                alt="Properganda Logo"
                width={207}
                height={168}
                className="w-auto h-auto min-w-[207px]"
              />
            </Link>
            
            <div className="flex flex-col gap-8">
              <h2 className="text-[30px] font-bold leading-tight text-brand-green sm:text-4xl lg:h-[102px] lg:w-[332px] lg:text-[40px] lg:leading-[51px]">
                We&apos;re not big.<br />
                But we&apos;re Proper.
              </h2>
              
              <div className="flex gap-4">
                <Link href="#" className="hover:scale-110 transition-transform">
                  <Image src="/images/svg/insta.svg" alt="Instagram" width={48} height={48} />
                </Link>
                <Link href="#" className="hover:scale-110 transition-transform">
                  <Image src="/images/svg/x.svg" alt="X (formerly Twitter)" width={48} height={48} />
                </Link>
                <Link href="#" className="hover:scale-110 transition-transform">
                  <Image src="/images/svg/linkedin.svg" alt="LinkedIn" width={48} height={48} />
                </Link>
              </div>
            </div>
          </div>

          {/* Second Column: Navigation and Info */}
          <div className="flex flex-col gap-24">
            {/* First Row: Nav Links - Full Width Distribution */}
            <nav className="flex flex-wrap justify-between gap-y-4">
              <Link href="/about" className="text-[20px] leading-tight font-medium hover:text-brand-green transition-colors">About Us</Link>
              <Link href="/services" className="text-[20px] leading-tight font-medium hover:text-brand-green transition-colors">What We Do</Link>
              <Link href="/clients" className="text-[20px] leading-tight font-medium hover:text-brand-green transition-colors">Clients</Link>
              <Link href="/contact" className="text-[20px] leading-tight font-medium hover:text-brand-green transition-colors">Contact</Link>
            </nav>

            {/* Second Row: Detailed Info - Spread out */}
            <div className="flex flex-wrap justify-between gap-12">
              <div className="space-y-6">
                <h3 className="font-bold uppercase tracking-wider text-[31px] text-white">Locations</h3>
                <div className="space-y-2 text-lg text-brand-gray">
                  <p>Sao Tome and Principe</p>
                  <p>(208) 555-0112</p>
                </div>
              </div>
              <div className="space-y-6 lg:min-w-[300px]">
                <h3 className="font-bold uppercase tracking-wider text-[31px] text-white">Other</h3>
                <div className="space-y-2 text-lg text-brand-gray">
                  <p><Link href="/brand-book" className="hover:text-brand-green underline transition-colors">Brand Book</Link></p>
                  <p><Link href="/employee-hand-book" className="hover:text-brand-green underline transition-colors">Employee Hand Book</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Full-Width Border */}
      <div className="mt-20 border-t border-white/10 pt-8">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10 lg:px-16 text-center sm:text-left">
          <p className="text-sm text-brand-gray">
            Copyright &copy; 2025 Properganda - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
