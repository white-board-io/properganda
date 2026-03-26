"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import { Card } from "@/components/ui/card";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";

const HIGHLIGHTED_WORDS = new Set([
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
]);

function getWordTokens(text: string) {
  return Array.from(text.matchAll(/\S+\s*/g)).map((match) => {
    const value = match[0];
    const cleanedWord = value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    return {
      id: `${match.index ?? 0}-${cleanedWord.toLowerCase()}`,
      value,
      isBold: HIGHLIGHTED_WORDS.has(cleanedWord.toLowerCase()),
    };
  });
}

const MANIFESTO_DATA = [
  {
    id: "kundan-kumar",
    text: "Thank you for the excellent support in developing our safety visual identity and campaign materials. Your team has done a great job in creating impactful designs and communication that effectively promote safety awareness among our employees. We truly appreciate your creativity, professionalism, and commitment to the project.",
    author: "Kundan Kumar",
    role: "HSE, Hero Future Energies ",
    icon: "/images/svg/hfe.svg",
  },
  {
    id: "tomomi-shimizu",
    text: "Creative, professional, exploratory, patient and warm. These are the words coming to my mind, when I look back our last 1 year journey with Properganda team. In particular, I love your art and design work, which is underpinned by your deep understanding about who we are. Thank you for feeling and understanding us.",
    author: "Tomomi Shimizu",
    role: "Co-founder & Chief Executive Officer (CEO)",
    icon: "/images/svg/torii.svg",
  },
  {
    id: "michael-chen",
    text: "We believe that the most powerful brands are those built on authentic values, told through compelling stories, and designed to make a genuine impact. We don't just make things look good; we make things that do good.",
    author: "Michael Chen",
    role: "Lead Designer",
    icon: "/images/svg/bpe.svg",
  },
];

export default function Manifesto() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Fade(),
    WheelGesturesPlugin(),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollSnaps = emblaApi?.scrollSnapList() ?? [];

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <SectionShell
      id="manifesto"
      variant="soft"
      className="overflow-hidden"
      aria-label="Brand manifesto carousel"
    >
      <SiteContainer>
        <SectionEyebrow scramble>FROM OUR CLIENTS</SectionEyebrow>

        <div className="relative mx-auto max-w-4xl mt-12 md:mt-16">
          <button
            onClick={scrollPrev}
            className="absolute left-[-80px] top-[35%] z-10 hidden -translate-y-1/2 scale-150 text-brand-black/40 transition-all duration-300 hover:text-brand-black lg:block"
            aria-label="Previous slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-[-80px] top-[35%] z-10 hidden -translate-y-1/2 scale-150 text-brand-black/40 transition-all duration-300 hover:text-brand-black lg:block"
            aria-label="Next slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="cursor-grab overflow-hidden active:cursor-grabbing bg-neutral-cool-50 h-full"
            ref={emblaRef}
          >
            <div className="flex h-full items-stretch">
              {MANIFESTO_DATA.map((slide, index) => (
                <div
                  className="min-w-0 flex-[0_0_100%] flex flex-col"
                  key={slide.id}
                >
                  <Card className="relative mb-14 p-10 md:p-16 rounded-xl flex-1 flex flex-col justify-center">
                    <div className="ui-copy">
                      {getWordTokens(slide.text).map((token) => (
                        <span
                          key={`${slide.id}-${token.id}`}
                          className={
                            token.isBold
                              ? "font-bold"
                              : "font-normal opacity-80"
                          }
                        >
                          {token.value}
                        </span>
                      ))}
                    </div>

                    <svg
                      className="absolute bottom-[-19px] left-14 text-white"
                      width="40"
                      height="20"
                      viewBox="0 0 40 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M0 0L20 20L40 0H0Z" fill="currentColor" />
                    </svg>
                  </Card>

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 px-10">
                    <div className="flex items-center gap-5">
                      <div>
                        <h3 className="text-lg font-bold leading-tight tracking-tight text-brand-black">
                          {slide.author}
                        </h3>
                        <p className="ui-caption mt-1 text-brand-gray-dark">
                          {slide.role}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-end">
                      <Image
                        src={slide.icon}
                        alt="Decorative Icon"
                        width={100}
                        height={100}
                        className="h-10 w-auto"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 flex justify-center gap-4">
            {scrollSnaps.map((snap, index) => (
              <button
                key={`${snap}`}
                onClick={() => scrollTo(index)}
                className={
                  selectedIndex === index
                    ? "h-1.5 w-1.5 scale-[1.5] rounded-full bg-brand-black opacity-100 transition-all duration-500"
                    : "h-1.5 w-1.5 rounded-full bg-brand-black/20 opacity-40 transition-all duration-500 hover:bg-brand-black/40 hover:opacity-100"
                }
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </SiteContainer>
    </SectionShell>
  );
}
