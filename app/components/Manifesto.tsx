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
    id: "anjali-bawa",
    text: "Working with the Properganda team has been a seamless experience. They are extremely prompt and truly function as an extension of our internal team. The level of support and responsiveness they bring makes collaboration effortless. The quality of work delivered is consistently excellent. Once the brief or notes are shared, the team quickly translates them into well-executed outputs with minimal back and forth. Their proactive approach, politeness, and hands-on involvement make them a dependable partner to work with. We genuinely appreciate their professionalism and the ease with which they integrate into ongoing workflows.",
    author: "Anjali Bawa",
    role: "Lead - Corporate Communications, BluPine Energy",
    icon: "/images/svg/bpe.svg",
  },
  {
    id: "dipankar-bose",
    text: "Working with Properganda has been an absolute delight… they are still toddlers but boy are they feisty… I was blown over by their very first pitch deck… it stood out because they dared to be different and that in many ways pretty much defines them … the willingness and the guts to walk the path less explored. That is so refreshing in times when agencies mostly play safe and mimic each other. One other aspect that stood out was their proactive approach – even before we could furnish well-structured briefs, they were bubbling with ideas , some exceptional , others crazy, but atleast with them you wouldn’t have to nudge. I must also call out their exceptional client service , Shibani and team were literally 24x7 available on phone or chat, to make sure urgent deadlines were met and any feedback was duly noted. For me and my team , more often than not, Shibani was a panic button ,,, a quick call usually resulted in immediate soothing of nerves and an assurance that stuff would get delivered per schedule. I am sure the years ahead will only see Properganda get bigger, better and crazier… here’s wishing many more triumphs and lotsa action…",
    author: "Dipankar Bose",
    role: "(AVP & HEAD – Branding & Corporate Communications)",
    icon: "",
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
            className="absolute left-[-80px] top-[35%] z-10 hidden -translate-y-1/2 scale-150 text-brand-black/40 transition-all duration-300 hover:text-brand-black cursor-pointer lg:block"
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
            className="absolute right-[-80px] top-[35%] z-10 hidden -translate-y-1/2 scale-150 text-brand-black/40 transition-all duration-300 hover:text-brand-black cursor-pointer lg:block"
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
            className="overflow-hidden active:cursor-grabbing bg-neutral-cool-50 h-full"
            ref={emblaRef}
          >
            <div className="flex h-full items-stretch">
              {MANIFESTO_DATA.map((slide) => (
                <div
                  className="relative min-w-0 flex-[0_0_100%] flex flex-col pt-6 md:pt-6"
                  key={slide.id}
                >
                  <svg
                    className="ui-text-accent absolute left-8 top-0 z-10 h-10 w-12 md:left-12 md:h-12 md:w-14"
                    viewBox="0 0 56 48"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 48V30.622C0 14.386 8.731 4.187 20.207 0L24.414 9.402C17.359 12.608 13.448 18.108 12.897 24.572H24.414V48H0Z"
                      fill="currentColor"
                    />
                    <path
                      d="M31.586 48V30.622C31.586 14.386 40.317 4.187 51.793 0L56 9.402C48.945 12.608 45.034 18.108 44.483 24.572H56V48H31.586Z"
                      fill="currentColor"
                    />
                  </svg>

                  <Card className="relative mb-14 p-10 md:p-16 rounded-xl flex-1 flex flex-col justify-center">
                    <div className="ui-copy mt-4 max-h-[200px] mx-auto overflow-y-auto pr-4 custom-scrollbar md:mt-6">
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
                        {slide.icon && (
                          <div className="mt-3 md:hidden">
                            <Image
                              src={slide.icon}
                              alt={`${slide.author} client logo`}
                              width={96}
                              height={40}
                              className="h-8 w-auto object-contain"
                            />
                          </div>
                        )}
                        <p className="ui-caption mt-1 text-brand-gray-dark">
                          {slide.role}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-end">
                      {slide.icon && (
                        <Image
                          src={slide.icon}
                          alt={`${slide.author} client logo`}
                          width={100}
                          height={100}
                          className="h-10 w-auto"
                        />
                      )}
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
