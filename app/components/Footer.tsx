"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { SiteContainer } from "@/components/ui/site-container";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NAV_LINKS = [
  { href: "#about", label: "About Us" },
  { href: "#services", label: "What We Do" },
  { href: "#manifesto", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "#", label: "Instagram", icon: "/images/svg/insta.svg" },
  { href: "#", label: "X (formerly Twitter)", icon: "/images/svg/x.svg" },
  { href: "#", label: "LinkedIn", icon: "/images/svg/linkedin.svg" },
];

const OTHER_LINKS = [
  { href: "/brand-book", label: "Brand Book" },
  { href: "/employee-hand-book", label: "Employee Hand Book" },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

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
    { scope: sectionRef },
  );

  return (
    <footer
      ref={sectionRef}
      className="bg-brand-black pb-12 pt-20 text-white font-inter"
      role="contentinfo"
    >
      <SiteContainer>
        <div className="footer-content grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-36">
          <div className="grid items-start gap-8 sm:grid-cols-[auto_1fr] lg:gap-12">
            <Link href="/" className="mt-2 inline-block">
              <Image
                src="/images/svg/logo.svg"
                alt="Properganda Logo"
                width={207}
                height={168}
                className="h-auto min-w-[207px] w-auto"
              />
            </Link>

            <div className="flex flex-col gap-20">
              <h2 className="text-[32px] font-bold text-white sm:text-[40px] leading-tight sm:leading-[40px]">
                <span className="block whitespace-nowrap">No drills. No frills.</span>
                <span className="block whitespace-nowrap">Just great work.</span>
              </h2>

              <div className="flex gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a key={link.label} href={link.href} className="ui-icon-link flex h-11 w-11 items-center justify-center rounded-full border bg-white" aria-label={link.label}>
                    <Image src={link.icon} alt={link.label} width={23} height={23} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-24">
            <nav className="flex flex-wrap justify-between gap-y-4">
              {NAV_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className="ui-footer-link">
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-wrap justify-between gap-12">
              <div className="space-y-6">
                <h3 className="ui-footer-heading">Locations</h3>
                <div className="space-y-2 text-lg text-brand-gray">
                  <p>Lower Parel, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SiteContainer>

      <div className="mt-20 border-t border-white/10 pt-8">
        <SiteContainer className="text-center sm:text-left">
          <p className="text-sm text-brand-gray">
            Copyright &copy; {currentYear} Properganda - All Rights Reserved.
          </p>
        </SiteContainer>
      </div>
    </footer>
  );
}
