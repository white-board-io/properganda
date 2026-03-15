"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import { Card } from "@/components/ui/card";
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
    id: "tomomi-shimizu",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus, diam a sodales hendrerit, libero tortor scelerisque arcu, vitae consequat sem diam ut ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus, diam a sodales hendrerit, libero tortor scelerisque arcu, vitae consequat sem diam ut ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus, diam a sodales hendrerit, libero tortor scelerisque arcu, vitae consequat sem diam ut ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "Tomomi Shimizu",
    role: "Founder",
    avatar: "/manifesto_avatar_1.png",
  },
  {
    id: "sarah-jenkins",
    text: "Our collective approach brings together diverse perspectives to craft campaigns that resonate, brands that endure, and conversations that matter. Every project we undertake is guided by our commitment to purposeful creativity — work that not only captures attention but also drives meaningful change.",
    author: "Sarah Jenkins",
    role: "Creative Director",
    avatar: "/manifesto_avatar_2.png",
  },
  {
    id: "michael-chen",
    text: "We believe that the most powerful brands are those built on authentic values, told through compelling stories, and designed to make a genuine impact. We don't just make things look good; we make things that do good.",
    author: "Michael Chen",
    role: "Lead Designer",
    avatar: "/manifesto_avatar_3.png",
  },
];

export default function Manifesto() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
        <div className="relative mx-auto max-w-4xl">
          <button
            onClick={scrollPrev}
            className="absolute left-[-80px] top-[35%] z-10 hidden -translate-y-1/2 scale-150 text-brand-black/40 transition-all duration-300 hover:text-brand-black lg:block"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="cursor-grab overflow-hidden active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {MANIFESTO_DATA.map((slide) => (
                <div className="min-w-0 flex-[0_0_100%]" key={slide.id}>
                  <Card variant="soft" className="relative mb-14 mx-4 p-10 md:p-16">
                    <div className="ui-copy">
                      {getWordTokens(slide.text).map((token) => (
                        <span
                          key={`${slide.id}-${token.id}`}
                          className={token.isBold ? "font-bold" : "font-normal opacity-80"}
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

                  <div className="flex flex-col items-end justify-between gap-8 px-10 md:flex-row">
                    <div className="flex items-center gap-5">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full grayscale ring-1 ring-black/5">
                        <Image
                          src={slide.avatar}
                          alt={slide.author}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold leading-tight tracking-tight text-brand-black">
                          {slide.author}
                        </h3>
                        <p className="ui-caption mt-1 text-brand-gray-dark">{slide.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-[115px] right-[40px] z-10 hidden md:block">
            <div className="flex items-center gap-2">
              <Image
                src="/images/svg/torii.svg"
                alt="Torii"
                width={80}
                height={80}
                className="h-10 w-auto"
              />
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
