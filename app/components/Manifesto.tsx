"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

const manifestoData = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus, diam a sodales hendrerit, libero tortor scelerisque arcu, vitae consequat sem diam ut ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus, diam a sodales hendrerit, libero tortor scelerisque arcu, vitae consequat sem diam ut ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus, diam a sodales hendrerit, libero tortor scelerisque arcu, vitae consequat sem diam ut ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "Tomomi Shimizu",
    role: "Founder",
    avatar: "/manifesto_avatar_1.png",
  },
  {
    text: "Our collective approach brings together diverse perspectives to craft campaigns that resonate, brands that endure, and conversations that matter. Every project we undertake is guided by our commitment to purposeful creativity — work that not only captures attention but also drives meaningful change.",
    author: "Sarah Jenkins",
    role: "Creative Director",
    avatar: "/manifesto_avatar_2.png",
  },
  {
    text: "We believe that the most powerful brands are those built on authentic values, told through compelling stories, and designed to make a genuine impact. We don't just make things look good; we make things that do good.",
    author: "Michael Chen",
    role: "Lead Designer",
    avatar: "/manifesto_avatar_3.png",
  }
];

export default function Manifesto() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useGSAP(
    () => {
      // Animation for switching slides
      const tl = gsap.timeline();
      tl.to([textRef.current, authorRef.current], {
        opacity: 0,
        y: 20,
        filter: "blur(4px)",
        duration: 0.4,
        ease: "power2.in",
      })
      .set([textRef.current, authorRef.current], {
        y: -20,
      })
      .to([textRef.current, authorRef.current], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
      });
    },
    { dependencies: [selectedIndex], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F5F7] px-4 py-24 sm:px-6 md:px-10 md:py-32 lg:px-16 overflow-hidden"
      aria-label="Brand manifesto carousel"
    >
      <div className="mx-auto max-w-4xl relative">
        {/* Navigation Arrows */}
        <button 
          onClick={scrollPrev}
          className="absolute left-[-80px] top-[35%] -translate-y-1/2 text-brand-black/40 hover:text-brand-black transition-all duration-300 hidden lg:block scale-150 z-10"
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button 
          onClick={scrollNext}
          className="absolute right-[-80px] top-[35%] -translate-y-1/2 text-brand-black/40 hover:text-brand-black transition-all duration-300 hidden lg:block scale-150 z-10"
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Embla Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {manifestoData.map((slide, index) => (
              <div className="flex-[0_0_100%] min-w-0" key={index}>
                <div className="relative bg-white rounded-2xl p-10 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.03)] mb-14 mx-4">
                  <div ref={index === selectedIndex ? textRef : null} className="text-brand-black text-[15px] leading-relaxed md:text-[18px] font-inter">
                    {slide.text.split(' ').map((word, i) => {
                      const cleanedWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                      const isBold = ["ipsum", "dolor", "sit", "amet", "consectetur"].includes(cleanedWord.toLowerCase());
                      return (
                        <span key={i} className={isBold ? "font-bold" : "opacity-80 font-normal"}>
                          {word}{' '}
                        </span>
                      );
                    })}
                  </div>
                  
                  {/* Bubble Tail */}
                  <svg 
                    className="absolute bottom-[-19px] left-14 text-white" 
                    width="40" 
                    height="20" 
                    viewBox="0 0 40 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0L20 20L40 0H0Z" fill="currentColor"/>
                  </svg>
                </div>

                {/* Footer Area with Avatar and Logo */}
                <div ref={index === selectedIndex ? authorRef : null} className="flex flex-col md:flex-row items-end justify-between px-10 gap-8">
                  <div className="flex items-center gap-5">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden grayscale ring-1 ring-black/5">
                      <Image 
                        src={slide.avatar}
                        alt={slide.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-brand-black leading-tight tracking-tight">
                        {slide.author}
                      </h3>
                      <p className="text-[11px] text-brand-gray-dark uppercase tracking-[0.2em] mt-1 font-medium">
                        {slide.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1 md:items-end">
                    <div className="flex items-center gap-2">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="translate-y-1"
                      >
                        <rect x="10" y="20" width="60" height="6" rx="1" fill="#141E3C" />
                        <rect x="15" y="30" width="50" height="4" rx="1" fill="#141E3C" />
                        <rect x="22" y="34" width="6" height="40" rx="1" fill="#141E3C" />
                        <rect x="52" y="34" width="6" height="40" rx="1" fill="#141E3C" />
                      </svg>
                      <span className="font-display text-[42px] tracking-tighter text-[#141E3C] leading-none mb-[-4px]">
                        torii
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-4 mt-20">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                selectedIndex === index 
                  ? "bg-brand-black scale-[1.5] opacity-100" 
                  : "bg-brand-black/20 hover:bg-brand-black/40 opacity-40 hover:opacity-100"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
