"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { toast } from "sonner";

import { BlurTextReveal } from "@/components/ui/blur-text-reveal";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

const SLOT_WORDS = ["MOVE", "MATTER", "MAKE AN IMPACT"] as const;
const HERO_LINES = ["Creativity With", "A Conscience"] as const;
const COMMANDMENTS_HERO_TITLE = "Proper";
const COMMANDMENTS_HERO_SUBTITLE = "Ways of Working";

type HeroVariant = "default" | "commandments";

gsap.registerPlugin(useGSAP);

export default function Hero({
  variant = "default",
}: {
  variant?: HeroVariant;
}) {
  const slotCharRefs = useRef<Array<Array<HTMLSpanElement | null>>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to send");
      toast.success("You should hear back from us soon");
      setIsModalOpen(false);
      setFormData({ name: "", email: "", mobile: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(
    () => {
      if (variant !== "default") {
        return;
      }

      const slotCharacters = SLOT_WORDS.map((_, index) =>
        (slotCharRefs.current[index] ?? []).filter(
          (character): character is HTMLSpanElement => character !== null,
        ),
      ).filter((characters) => characters.length > 0);

      if (!slotCharacters.length) {
        return;
      }

      const mediaMatch = gsap.matchMedia();

      mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(slotCharacters.flat(), {
          autoAlpha: 0,
          y: 10,
          filter: "blur(8px)",
        });

        const timeline = gsap.timeline({ repeat: -1 });

        slotCharacters.forEach((characters) => {
          timeline
            .set(characters, {
              autoAlpha: 0,
              y: 10,
              filter: "blur(8px)",
            })
            .to(characters, {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.024,
              clearProps: "filter",
            })
            .to({}, { duration: 1.8 })
            .to(characters, {
              autoAlpha: 0,
              filter: "blur(6px)",
              duration: 0.3,
              ease: "power1.inOut",
              stagger: 0.016,
            });
        });

        return () => {
          timeline.kill();
        };
      });

      return () => {
        mediaMatch.revert();
      };
    },
    { dependencies: [variant] },
  );

  if (variant === "default") {
    return (
      <SectionShell
        spacing="none"
        variant="dark"
        aria-label="Hero"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden px-0"
      >
        <section className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover object-center w-full h-full opacity-100"
          >
            <source src="/videos/PPG-Home.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-t from-brand-black/80 via-brand-black/20 to-transparent" />
        </section>

        <SiteContainer className="z-10 w-full mt-24 lg:mt-40">
          <section className="flex flex-col items-start justify-center gap-12">
            <BlurTextReveal
              as="h1"
              className="font-bebas-neue uppercase font-normal xl:text-[180px] xl:leading-[160px] tracking-normal text-white lg:text-[180px] lg:leading-[170px] md:text-[140px] md:leading-[130px] sm:text-[100px] sm:leading-[90px] text-[60px] leading-[50px]"
              segments={HERO_LINES.map((line) => ({
                text: line,
                className: "block whitespace-nowrap",
              }))}
              stagger={0.018}
              duration={0.32}
              blur={8}
              y={10}
            />

            <section className="relative flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p
                  className="text-white"
                  style={{
                    fontFamily: "var(--font-inter-google), Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "25px",
                    lineHeight: "1.42",
                    letterSpacing: "0.02em",
                    fontStyle: "normal",
                  }}
                >
                  For Brands & Businesses that want to
                </p>
                <div className="flex items-center gap-[0.3em]">
                  <div
                    className="relative text-white uppercase whitespace-nowrap"
                    style={{
                      height: "1.42em",
                      fontFamily: "var(--font-inter-google), Inter, sans-serif",
                      fontWeight: 900,
                      fontSize: "50px",
                      lineHeight: "1.42",
                      letterSpacing: "0.02em",
                      verticalAlign: "middle",
                    }}
                  >
                    <span className="sr-only">move, matter, make an impact</span>
                    <span
                      aria-hidden="true"
                      className="grid h-full justify-items-start motion-reduce:hidden"
                    >
                      {SLOT_WORDS.map((word, index) => (
                        <span
                          key={word}
                          className="col-start-1 row-start-1 block whitespace-nowrap"
                        >
                          {Array.from(word).map((character, characterIndex) => (
                            <span
                              key={`${word}-${characterIndex}-${character}`}
                              className="inline-block whitespace-pre opacity-0 will-change-[transform,filter,opacity]"
                              ref={(node) => {
                                slotCharRefs.current[index] ??= [];
                                slotCharRefs.current[index][characterIndex] = node;
                              }}
                            >
                              {character === " " ? "\u00A0" : character}
                            </span>
                          ))}
                        </span>
                      ))}
                    </span>
                    <span aria-hidden="true" className="hidden motion-reduce:inline">
                      {SLOT_WORDS[0]}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <aside
            aria-label="Let's Talk Button"
            onClick={() => setIsModalOpen(true)}
            className="ui-hero-badge fixed bottom-8 right-4 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full transition-shadow md:bottom-20 md:right-8 md:h-24 md:w-24 lg:bottom-[4rem] lg:right-[4rem]"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              className="absolute inset-0 rotate-[-60deg]"
            >
              <defs>
                <path id="badge-circle-bottom" d="M 15,50 a 35,35 0 0,0 70,0" />
              </defs>
              <text
                fontSize="16"
                fill="#FFFFFF"
                letterSpacing="1"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                <textPath
                  startOffset="28%"
                  textAnchor="middle"
                  href="#badge-circle-bottom"
                >
                  LET&apos;S
                </textPath>
              </text>
              <text
                fontSize="16"
                fill="#FFFFFF"
                letterSpacing="1"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                <textPath
                  startOffset="82%"
                  textAnchor="middle"
                  href="#badge-circle-bottom"
                >
                  TALK
                </textPath>
              </text>
            </svg>
            <div className="absolute left-[40%] top-[45%] z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <Image
                width={36}
                height={40}
                className="h-auto w-6 md:w-9"
                alt="Properganda Logo"
                src="/images/svg/logo.svg"
              />
            </div>
          </aside>

          {/* Contact Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <div className="relative mx-4 flex w-full max-w-md flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Close button — outside the card */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mb-3 ml-auto -mr-10 flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                  aria-label="Close modal"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <div
                  className="w-full rounded-2xl bg-white p-12 shadow-2xl"
                >

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-900">
                      Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your Name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="rounded-md border border-[#000000] px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-900">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email id"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="rounded-md border border-[#000000] px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>

                  {/* Mobile */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-900">Mobile</label>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter your Mobile number"
                      value={formData.mobile}
                      onChange={handleFormChange}
                      className="rounded-md border border-[#000000] px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-900">
                      How can we help?<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Write three wishes we can grant for you"
                      value={formData.message}
                      onChange={handleFormChange}
                      className="resize-none rounded-md border border-[#000000] px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="mt-1 w-full rounded-full bg-[#169D52] py-4 text-sm font-semibold text-white transition-colors hover:bg-green-700 active:scale-[0.98]"
                  >
                    Request for a call back
                  </button>
                </form>
              </div>
            </div>
          </div>
          )}
        </SiteContainer>
      </SectionShell>
    );
  }

  return (
    <SectionShell
      spacing="none"
      variant="dark"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-0"
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="Proper ways of working background"
          fill
          priority
          className="object-cover object-center opacity-100"
        />
      </div>

      <SiteContainer className="z-10 flex w-full flex-1 flex-col items-center justify-center mt-24 lg:mt-32">
        <div className="flex flex-col items-center justify-center px-4 pt-20 text-center">
          <h1 className="font-bebas-neue select-none align-middle text-[88px] leading-[76px] font-normal tracking-[0] text-white sm:text-[140px] sm:leading-[118px] lg:text-[250px] lg:leading-[208px]">
            {COMMANDMENTS_HERO_TITLE}
          </h1>
          <p className="mt-2 font-inter align-middle text-[20px] leading-[28.8px] font-medium uppercase tracking-[0.2em] text-[#169D52] sm:text-[28px] sm:leading-[40.32px] sm:tracking-[0.24em] lg:text-[42px] lg:leading-[60.48px] lg:tracking-[0.31em]">
            {COMMANDMENTS_HERO_SUBTITLE}
          </p>
        </div>

        <div
          className="ui-hero-badge fixed bottom-8 right-4 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full transition-shadow md:bottom-[5rem] md:right-[2rem] md:h-24 md:w-24 lg:bottom-[4rem] lg:right-[4rem]"
          aria-label="Let's Talk"
          onClick={() => setIsModalOpen(true)}
        >
          <svg
            className="absolute inset-0 rotate-[-60deg]"
            viewBox="0 0 100 100"
            width="100%"
            height="100%"
          >
            <defs>
              <path id="badge-circle-bottom" d="M 15,50 a 35,35 0 0,0 70,0" />
            </defs>
            <text
              fontSize="16"
              fill="#FFFFFF"
              fontWeight="bold"
              letterSpacing="1"
              fontFamily="sans-serif"
            >
              <textPath
                href="#badge-circle-bottom"
                textAnchor="middle"
                startOffset="28%"
              >
                LET&apos;S
              </textPath>
            </text>
            <text
              fontSize="16"
              fill="#FFFFFF"
              fontWeight="bold"
              letterSpacing="1"
              fontFamily="sans-serif"
            >
              <textPath
                href="#badge-circle-bottom"
                textAnchor="middle"
                startOffset="82%"
              >
                TALK
              </textPath>
            </text>
          </svg>
          <div className="absolute left-[40%] top-[45%] z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <Image
              width={36}
              height={40}
              className="h-auto w-6 md:w-9"
              alt="Properganda Logo"
              src="/images/svg/logo.svg"
            />
          </div>
        </div>

        {/* Contact Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="relative mx-4 flex w-full max-w-md flex-col" onClick={(e) => e.stopPropagation()}>
              {/* Close button — outside the card */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="mb-3 ml-auto -mr-10 flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/20"
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <div
                className="w-full rounded-2xl bg-white p-8 shadow-2xl"
              >

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-gray-900">
                    Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="rounded-md border border-[#000000] px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-gray-900">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email id"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="rounded-md border border-[#000000] px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>

                {/* Mobile */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-gray-900">Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter your Mobile number"
                    value={formData.mobile}
                    onChange={handleFormChange}
                    className="rounded-md border border-[#000000] px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-semibold text-gray-900">
                    How can we help?<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Write three wishes we can grant for you"
                    value={formData.message}
                    onChange={handleFormChange}
                    className="resize-none rounded-md border border-[#000000] px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-1 w-full rounded-full bg-[#169D52] py-4 text-sm font-semibold text-white transition-colors hover:bg-green-700 active:scale-[0.98]"
                >
                  {isSubmitting ? "Sending..." : "Request for a call back"}
                </button>
              </form>
            </div>
          </div>
          </div>
        )}
      </SiteContainer>
    </SectionShell>
  );
}
