"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { BlurTextReveal } from "@/components/ui/blur-text-reveal";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";
import { cn } from "@/lib/utils";

const SLOT_WORDS = ["MOVE", "MATTER", "MAKE AN IMPACT"] as const;
const HERO_LINES = ["Creativity With", "A Conscience"] as const;
const COMMANDMENTS_HERO_TITLE = "Proper";
const COMMANDMENTS_HERO_SUBTITLE = "Ways of Working";
const COMMANDMENTS_HERO_SUBTITLE_LINES = [COMMANDMENTS_HERO_SUBTITLE] as const;

type HeroVariant = "default" | "commandments";

gsap.registerPlugin(useGSAP);

function LetsTalkBadge({
  ariaLabel,
  className,
  onClick,
}: {
  ariaLabel: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <aside
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "ui-hero-badge fixed bottom-8 right-4 z-[60] flex h-16 w-16 cursor-pointer items-center justify-center rounded-full transition-shadow md:h-24 md:w-24",
        className,
      )}
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
  );
}

export default function Hero({
  variant = "default",
}: {
  variant?: HeroVariant;
}) {
  const slotCharRefs = useRef<Array<Array<HTMLSpanElement | null>>>([]);
  const commandmentSubtitleCharRefs = useRef<Array<Array<HTMLSpanElement | null>>>(
    [],
  );
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      e.currentTarget.reset();
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

  useGSAP(
    () => {
      if (variant !== "commandments") {
        return;
      }

      const subtitleCharacters = COMMANDMENTS_HERO_SUBTITLE_LINES.map((_, index) =>
        (commandmentSubtitleCharRefs.current[index] ?? []).filter(
          (character): character is HTMLSpanElement => character !== null,
        ),
      ).filter((characters) => characters.length > 0);

      if (!subtitleCharacters.length) {
        return;
      }

      const mediaMatch = gsap.matchMedia();

      mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(subtitleCharacters.flat(), {
          autoAlpha: 0,
          y: 10,
          filter: "blur(8px)",
        });

        const timeline = gsap.timeline({ repeat: -1 });

        subtitleCharacters.forEach((characters) => {
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

        <SiteContainer className="z-10 mt-24 w-full lg:mt-40">
          <section className="flex w-full flex-col items-start justify-center gap-8 sm:gap-12">
            <BlurTextReveal
              as="h1"
              className="max-w-full font-bebas-neue text-[clamp(3.5rem,16vw,6.25rem)] leading-[0.84] font-normal tracking-normal text-white uppercase sm:text-[100px] sm:leading-[90px] md:text-[140px] md:leading-[130px] lg:text-[180px] lg:leading-[170px] xl:text-[180px] xl:leading-[160px]"
              segments={HERO_LINES.map((line) => ({
                text: line,
                className: "block max-w-full whitespace-nowrap",
              }))}
              stagger={0.018}
              duration={0.32}
              blur={8}
              y={10}
            />

            <section className="relative flex w-full items-center justify-between">
              <div className="flex w-full max-w-full flex-col gap-1.5">
                <p
                  className="max-w-[24ch] text-white sm:max-w-none"
                  style={{
                    fontFamily: "var(--font-inter-google), Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.125rem, 5.25vw, 1.5625rem)",
                    lineHeight: "1.32",
                    letterSpacing: "0.01em",
                    fontStyle: "normal",
                  }}
                >
                  For Brands & Businesses that want to
                </p>
                <div className="flex w-full max-w-full items-center gap-[0.3em]">
                  <div
                    className="relative block max-w-full text-white uppercase"
                    style={{
                      minHeight: "1.2em",
                      fontFamily: "var(--font-inter-google), Inter, sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(2rem, 9vw, 3.125rem)",
                      lineHeight: "1.12",
                      letterSpacing: "0.01em",
                      verticalAlign: "middle",
                    }}
                  >
                    <span className="sr-only">move, matter, make an impact</span>
                    <span
                      aria-hidden="true"
                      className="grid justify-items-start motion-reduce:hidden"
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
                    <span aria-hidden="true" className="hidden whitespace-nowrap motion-reduce:inline">
                      {SLOT_WORDS[0]}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </section>

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
                    disabled={isSubmitting}
                    className="mt-1 flex w-full items-center justify-center rounded-full bg-[#169D52] py-4 text-sm font-semibold text-white transition-colors hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? "Sending..." : "Request for a call back"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          )}
        </SiteContainer>
        <LetsTalkBadge
          ariaLabel="Let's Talk Button"
          className="md:bottom-20 md:right-8 lg:bottom-[4rem] lg:right-[4rem]"
          onClick={() => setIsModalOpen(true)}
        />
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
            <span className="sr-only">{COMMANDMENTS_HERO_SUBTITLE}</span>
            <span
              aria-hidden="true"
              className="grid min-h-[1.2em] justify-items-center motion-reduce:flex motion-reduce:min-h-0 motion-reduce:justify-center"
            >
              {COMMANDMENTS_HERO_SUBTITLE_LINES.map((line, index) => (
                <span
                  key={line}
                  className="col-start-1 row-start-1 block whitespace-nowrap"
                >
                  {Array.from(line).map((character, characterIndex) => (
                    <span
                      key={`${line}-${characterIndex}-${character}`}
                      className="inline-block whitespace-pre will-change-[transform,filter,opacity]"
                      ref={(node) => {
                        commandmentSubtitleCharRefs.current[index] ??= [];
                        commandmentSubtitleCharRefs.current[index][characterIndex] = node;
                      }}
                    >
                      {character === " " ? "\u00A0" : character}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </p>
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
                  disabled={isSubmitting}
                  className="mt-1 flex w-full items-center justify-center rounded-full bg-[#169D52] py-4 text-sm font-semibold text-white transition-colors hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Sending..." : "Request for a call back"}
                </button>
              </form>
            </div>
          </div>
          </div>
        )}
      </SiteContainer>
      <LetsTalkBadge
        ariaLabel="Let's Talk"
        className="md:bottom-[5rem] md:right-[2rem] lg:bottom-[4rem] lg:right-[4rem]"
        onClick={() => setIsModalOpen(true)}
      />
    </SectionShell>
  );
}
