"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { toast } from "sonner";

import { BlurTextReveal } from "@/components/ui/blur-text-reveal";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

gsap.registerPlugin(useGSAP);

const SLOT_WORDS = ["up", "out", "for something"] as const;
const HERO_LINES = ["Creativity With", "A Conscience"] as const;

const ORBIT_COPY = "COMMANDMENTS  ";
const orbitCharacters = Array.from(ORBIT_COPY).map((char, index) => ({
  id: `${char === " " ? "space" : char}-${index}`,
  char,
}));

type HeroVariant = "default" | "commandments";

export default function Hero({
  variant = "default",
}: {
  variant?: HeroVariant;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
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

  useEffect(() => {
    if (variant !== "default") return;

    const word = SLOT_WORDS[currentWordIndex];
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting && currentText === word) {
      timeoutId = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && currentText === "") {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % SLOT_WORDS.length);
      }, 1000);
    } else {
      const timeout = 250;
      timeoutId = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? word.slice(0, prev.length - 1)
            : word.slice(0, prev.length + 1),
        );
      }, timeout);
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, currentWordIndex, variant]);

  useGSAP(
    () => {
      if (variant === "commandments" && orbitContainerRef.current) {
        const chars = orbitContainerRef.current.querySelectorAll(".char-orbit");
        const radiusX = 240;
        const radiusY = 75;

        gsap.to(
          { progress: 0 },
          {
            progress: 1,
            duration: 15,
            repeat: -1,
            ease: "none",
            onUpdate: function () {
              const progress = this.targets()[0].progress;
              chars.forEach((char, i) => {
                const charOffset = (-i / chars.length) * Math.PI * 2;
                const angle = charOffset + progress * Math.PI * 2;
                const x = Math.cos(angle) * radiusX;
                const y = Math.sin(angle) * radiusY;

                // When y is negative, the character is in the top/back half of the ellipse.
                // We use Math.sin(angle) to smoothly interpolate opacity.
                // At sin(angle) = 1 (front center), opacity is 1.
                // At sin(angle) = 0 (edges), opacity is still decent (e.g., 0.8).
                // At sin(angle) = -1 (back center), opacity should be 0.
                const sinValue = Math.sin(angle);

                // Opacity mapping:
                // Front half (sinValue > 0): 0.6 to 1.0
                // Back half (sinValue < 0): 0 at the very back (-1), but fades out quickly.
                // Using a sharp fade out when going into the negative.
                let targetOpacity = 0;
                if (sinValue >= -0.2) {
                  // Map [-0.2, 1] to [0, 1]
                  targetOpacity = (sinValue + 0.2) / 1.2;
                }

                gsap.set(char, {
                  x: x,
                  y: y,
                  scale: 0.8 + Math.max(0, sinValue) * 0.2, // slight scale effect for depth
                  opacity: targetOpacity,
                  zIndex: sinValue > 0 ? 100 : 10, // send to back properly
                  rotation: 0,
                });
              });
            },
          },
        );
      }
    },
    { scope: sectionRef, dependencies: [variant] },
  );

  if (variant === "default") {
    return (
      <SectionShell
        spacing="none"
        variant="dark"
        ref={sectionRef}
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
              className="font-bebas-neue uppercase font-normal xl:text-[208px] xl:leading-[180px] tracking-normal text-white lg:text-[180px] lg:leading-[170px] md:text-[140px] md:leading-[130px] sm:text-[100px] sm:leading-[90px] text-[60px] leading-[50px]"
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
                  className="text-white opacity-50"
                  style={{
                    fontFamily: "var(--font-inter-google), Inter, sans-serif",
                    fontWeight: 200,
                    fontSize: "25px",
                    lineHeight: "1.42",
                    letterSpacing: "0.02em",
                    fontStyle: "normal",
                  }}
                >
                  For Brands{" "}
                  <span
                    style={{
                      fontWeight: 700,
                      fontFamily: "var(--font-inter-google), Inter, sans-serif",
                    }}
                  >
                    &
                  </span>{" "}
                  Businesses that want to
                </p>
                <div className="flex items-center gap-[0.3em]">
                  <span
                    className="text-white uppercase inline-block"
                    style={{
                      fontFamily: "var(--font-inter-google), Inter, sans-serif",
                      fontWeight: 900,
                      fontSize: "50px",
                      lineHeight: "1.42",
                      letterSpacing: "0.02em",
                      verticalAlign: "middle",
                    }}
                  >
                    STAND
                  </span>
                  <div
                    className="relative flex-1 text-white uppercase whitespace-nowrap"
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
                    <span className="opacity-50">{currentText}</span>
                    <span className="animate-cursor-blink opacity-50 ml-1">
                      _
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
                  startOffset="50%"
                  textAnchor="middle"
                  href="#badge-circle-bottom"
                >
                  LET&apos;S TALK
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
                      placeholder="Send your message..."
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
      ref={sectionRef}
      spacing="none"
      variant="dark"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-0"
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="10 Commandments Background"
          fill
          priority
          className="object-cover object-center opacity-100"
        />
      </div>

      <SiteContainer className="z-10 flex w-full flex-1 flex-col items-center justify-center mt-24 lg:mt-32">
        <div className="relative flex items-center justify-center pt-20">
          <div
            ref={orbitContainerRef}
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-[800px] w-[2400px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
            {orbitCharacters.map(({ id, char }) => (
              <div
                key={id}
                className="ui-text-shadow-brand char-orbit absolute text-[clamp(1.5rem,4vw,3rem)] font-black uppercase tracking-widest text-green-500 opacity-90"
              >
                {char}
              </div>
            ))}
          </div>

          <h1 className="font-bebas-neue text-[25rem] leading-none font-black text-white mix-blend-overlay select-none md:text-[35rem]">
            10
          </h1>
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
                startOffset="50%"
              >
                LET&apos;S TALK
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
                    placeholder="Send your message..."
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
