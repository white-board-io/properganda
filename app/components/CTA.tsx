"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".cta-card", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".cta-content > *",
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .from(
          ".cta-form-item",
          {
            opacity: 0,
            y: 20,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-white font-inter-google"
      aria-label="Get in touch"
    >
      {/* Split Background Effect */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        <div className="h-1/2 bg-[#F5F5F5]" />
        <div className="h-1/2 bg-[#169D52]" />
      </div>

      <div className="relative mx-auto flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 md:px-10 lg:px-16">
        <div className="cta-card overflow-hidden rounded-[16px] bg-white p-8 md:p-16 lg:p-[100px] shadow-2xl w-full max-w-[1400px] lg:h-[798px]">
          <div className="flex flex-col lg:flex-row lg:justify-between h-full gap-12 lg:gap-0">
            {/* Left Column: Info */}
            <div className="cta-content flex flex-col h-full w-full lg:w-[385px]">
              <span className="mb-8 text-sm font-bold tracking-[0.2em] text-[#169D52] uppercase">
                Contact
              </span>
              <h2 className="mb-10 w-[300px] h-[92px] font-inter font-bold text-[42px] leading-[42px] tracking-[0%] text-brand-black">
                Let&apos;s
                <br />
                get started!
              </h2>

              <div className="mb-12 w-[385px] h-[129px]">
                <p className="font-inter font-bold text-[20px] leading-[26px] tracking-[0%] text-brand-black">
                  Need to make a mark?
                  </p>
                  <br />
                  <p className="font-inter font-regular text-[20px] leading-[26px] tracking-[0%] text-brand-black">
                  Our team delivers impressive results
                  <br />
                  and expert execution. Visionary
                  <br />
                  or overwhelmed, we&apos;re here to help!
                  <br />
                  Expect a response within 24 hours.
                </p>
              </div>

              <div className="mt-auto space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-[40px] w-[40px] items-center justify-center">
                    <Image
                      src="/images/svg/mail.svg"
                      alt="Mail"
                      width={40}
                      height={20}
                    />
                  </div>
                  <a
                    href="mailto:ping@properganda.in"
                    className="text-[20px] font-semibold leading-[26px] text-brand-black hover:text-[#169D52] transition-colors font-inter"
                  >
                    ping@properganda.in
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-[40px] w-[40px] items-center justify-center">
                    <Image
                      src="/images/svg/phone.svg"
                      alt="Phone"
                      width={30}
                      height={30}
                    />
                  </div>
                  <span className="text-[20px] font-semibold leading-[26px] text-brand-black font-inter">
                    00000 00000
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <form className="flex flex-col gap-8 w-full lg:w-[797px] h-full">
              <div className="grid grid-cols-1 gap-y-6 gap-x-14 md:grid-cols-2">
                {/* Name */}
                <div className="cta-form-item flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-bold text-brand-black font-inter"
                  >
                    Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your Name"
                    className="w-[370px] h-[62px] rounded-[4px] border border-brand-black/20 px-4 text-sm outline-none focus:border-[#169D52] transition-colors font-inter"
                    required
                  />
                </div>
                {/* Email */}
                <div className="cta-form-item flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-brand-black font-inter"
                  >
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email ID"
                    className="w-[370px] h-[62px] rounded-[4px] border border-brand-black/20 px-4 text-sm outline-none focus:border-[#169D52] transition-colors font-inter"
                    required
                  />
                </div>
                {/* Mobile */}
                <div className="cta-form-item flex flex-col gap-2">
                  <label
                    htmlFor="mobile"
                    className="text-sm font-bold text-brand-black font-inter"
                  >
                    Mobile<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    placeholder="Enter your Mobile number"
                    className="w-[370px] h-[62px] rounded-[4px] border border-brand-black/20 px-4 text-sm outline-none focus:border-[#169D52] transition-colors font-inter"
                    required
                  />
                </div>
                {/* Service */}
                <div className="cta-form-item flex flex-col gap-2">
                  <label
                    htmlFor="service"
                    className="text-sm font-bold text-brand-black font-inter"
                  >
                    Service <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-[370px]">
                    <select
                      id="service"
                      className="w-full h-[62px] appearance-none rounded-[4px] border border-brand-black/20 px-4 pr-10 text-sm outline-none focus:border-[#169D52] transition-colors bg-white font-inter"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select your Service
                      </option>
                      <option value="branding">Branding</option>
                      <option value="marketing">Marketing</option>
                      <option value="design">Design</option>
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="cta-form-item flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-brand-black font-inter"
                >
                  How can we help?<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  className="w-full lg:w-[797px] h-[162px] resize-none rounded-[4px] border border-brand-black/20 p-4 text-sm outline-none focus:border-[#169D52] transition-colors font-inter"
                  placeholder=""
                  required
                ></textarea>
              </div>

              {/* Submit */}
              <div className="cta-form-item mt-4">
                <button
                  type="submit"
                  className="group flex items-center justify-between gap-4 rounded-xl bg-[#169D52] px-8 py-4 font-medium text-white transition-all hover:bg-[#169D52] active:scale-[0.98] w-fit font-inter"
                >
                  Request For Free Consultation
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
