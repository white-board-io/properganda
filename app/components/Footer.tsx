"use client";

import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { SiteContainer } from "@/components/ui/site-container";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About Us" },
  { href: "#services", label: "What We Do" },
  { href: "#manifesto", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/properganda.in/", label: "Instagram", icon: "/images/svg/insta.svg" },
  { href: "https://x.com/properganda_in", label: "X (formerly Twitter)", icon: "/images/svg/x.svg" },
  { href: "https://www.linkedin.com/company/propergandacreative/", label: "LinkedIn", icon: "/images/svg/linkedin.svg" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black pb-12 pt-20 text-white font-inter" role="contentinfo">
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

            <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
              <div className="space-y-6">
                <h3 className="ui-footer-heading">Location</h3>
                <div className="space-y-2 text-lg text-brand-gray">
                  <p>Lower Parel, Mumbai</p>
                </div>
              </div>

              <Link
                href="https://www.canopymedia.in/"
                className={cn(
                  buttonVariants({
                    variant: "canopyOutline",
                    size: "sm",
                  }),
                  "inline-flex w-fit gap-2.5 self-start px-5 py-2 items-center",
                )}
                style={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}
              >
                <div className="flex flex-col justify-center pt-[2px] text-left leading-[1.1]">
                  <span className="text-[6px] font-black tracking-widest" style={{ color: "#FFFFFF" }}>
                    Our
                  </span>
                  <span className="text-[6px] font-black tracking-widest" style={{ color: "#FFFFFF" }}>
                    Studio
                  </span>
                </div>
                <Image
                  src="/images/svg/canopy.svg"
                  alt="CANOPY"
                  width={100}
                  height={14}
                  className="h-[14px] w-[100px]"
                />
              </Link>
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
