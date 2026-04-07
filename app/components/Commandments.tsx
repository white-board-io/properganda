"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { SectionShell } from "@/components/ui/section-shell";
import { SiteContainer } from "@/components/ui/site-container";
import { cn } from "@/lib/utils";

type Commandment = {
  number: string;
  title: string;
  description: string;
};

const COMMANDMENTS_NOTE =
  "*Properganda is always evolving. So is this list. #BeProper";
const DESKTOP_CARD_EXIT_DURATION_MS = 320;
const DESKTOP_CARD_ENTER_DURATION_MS = 420;
const DESKTOP_AUTO_SCROLL_LOCK_MS = 1200;

function AnimatedCommandmentDescription({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const characters = gsap.utils.toArray<HTMLElement>(
      ".ui-commandment-description__char",
      root,
    );

    if (!characters.length) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(characters, { clearProps: "all" });
      return;
    }

    let tween: gsap.core.Tween | null = null;

    const playAnimation = () => {
      tween?.kill();
      gsap.killTweensOf(characters);
      gsap.set(characters, {
        opacity: 0,
        y: 10,
        filter: "blur(8px)",
      });
      tween = gsap.to(characters, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.024,
        clearProps: "filter",
      });
    };

    const rect = root.getBoundingClientRect();
    const isVisible =
      rect.bottom > 0 &&
      rect.top < window.innerHeight &&
      rect.right > 0 &&
      rect.left < window.innerWidth;

    if (isVisible) {
      playAnimation();
    } else {
      gsap.set(characters, {
        opacity: 0,
        y: 10,
        filter: "blur(8px)",
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          playAnimation();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      tween?.kill();
      gsap.killTweensOf(characters);
    };
  }, [text]);

  return (
    <p className={className}>
      <span ref={rootRef} className="block">
        {text.split(/(\s+)/).map((token, tokenIndex) => {
          if (!token) {
            return null;
          }

          if (/^\s+$/.test(token)) {
            return <React.Fragment key={tokenIndex}>{token}</React.Fragment>;
          }

          return (
            <span
              key={`${tokenIndex}-${token}`}
              className="inline-block whitespace-nowrap"
            >
              {Array.from(token).map((character, characterIndex) => (
                <span
                  key={`${tokenIndex}-${characterIndex}-${character}`}
                  className="ui-commandment-description__char inline-block will-change-[transform,filter,opacity]"
                >
                  {character}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    </p>
  );
}

export default function Commandments({
  commandments,
}: {
  commandments: Commandment[];
}) {
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const desktopSectionRef = useRef<HTMLDivElement>(null);
  const desktopCardRef = useRef<HTMLDivElement>(null);
  const desktopStepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIdxRef = useRef(0);
  const displayIdxRef = useRef(0);
  const isCardAnimatingRef = useRef(false);
  const pendingDisplayIdxRef = useRef<number | null>(null);
  const isAutoScrollingRef = useRef(false);
  const autoScrollTimeoutRef = useRef<number | null>(null);
  const touchStartYRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const totalItems = commandments.length;

  const resetDesktopCardStyles = useCallback((card: HTMLDivElement) => {
    card.style.opacity = "1";
    card.style.transform = "translateY(0) rotateX(0deg)";
  }, []);

  // Wristwatch date-wheel roller:
  // Direction 1 (advance): current rolls UP & tilts back, next rolls UP from below
  // Direction -1 (reverse): current rolls DOWN & tilts forward, next rolls DOWN from above
  // Keep rotateX moderate (20deg) to avoid perspective distortion
  const getExitKeyframes = useCallback((direction: 1 | -1) => [
    {
      opacity: 1,
      transform: "translateY(0) rotateX(0deg)",
    },
    {
      opacity: 0,
      transform: direction === 1
        ? "translateY(-65%) rotateX(20deg)"
        : "translateY(65%) rotateX(-20deg)",
    },
  ], []);

  const getEnterKeyframes = useCallback((direction: 1 | -1) => [
    {
      opacity: 0,
      transform: direction === 1
        ? "translateY(65%) rotateX(-20deg)"
        : "translateY(-65%) rotateX(20deg)",
    },
    {
      opacity: 1,
      transform: "translateY(0) rotateX(0deg)",
    },
  ], []);

  const animateDesktopCardToIdx = useCallback(function runDesktopCardTransition(index: number) {
    if (typeof window === "undefined" || window.innerWidth < 768) {
      pendingDisplayIdxRef.current = null;
      displayIdxRef.current = index;
      setDisplayIdx((previousIdx) => (
        previousIdx === index ? previousIdx : index
      ));
      return;
    }

    const card = desktopCardRef.current;
    if (!card) {
      pendingDisplayIdxRef.current = null;
      displayIdxRef.current = index;
      setDisplayIdx((previousIdx) => (
        previousIdx === index ? previousIdx : index
      ));
      return;
    }

    if (displayIdxRef.current === index && !isCardAnimatingRef.current) {
      pendingDisplayIdxRef.current = null;
      return;
    }

    if (isCardAnimatingRef.current) {
      pendingDisplayIdxRef.current = index;
      return;
    }

    const direction: 1 | -1 = index > displayIdxRef.current ? 1 : -1;
    isCardAnimatingRef.current = true;
    pendingDisplayIdxRef.current = null;
    card.getAnimations().forEach((animation) => animation.cancel());

    const exitAnimation = card.animate(getExitKeyframes(direction), {
      duration: DESKTOP_CARD_EXIT_DURATION_MS,
      easing: "cubic-bezier(0.4, 0, 0.7, 0.2)",
      fill: "both",
    });

    exitAnimation.onfinish = () => {
      // Update content while card is invisible (exit fill keeps opacity: 0)
      displayIdxRef.current = index;
      setDisplayIdx(index);

      // Use rAF to let React commit the content update, then animate in.
      // The same DOM element is reused (stable key), so exit fill keeps it
      // hidden until we start the enter animation.
      window.requestAnimationFrame(() => {
        const sameCard = desktopCardRef.current;
        if (!sameCard) {
          isCardAnimatingRef.current = false;
          return;
        }

        // Cancel exit animation and immediately start enter — these are
        // synchronous, so no frame gap where the card would flash visible.
        sameCard.getAnimations().forEach((animation) => animation.cancel());
        const enterAnimation = sameCard.animate(getEnterKeyframes(direction), {
          duration: DESKTOP_CARD_ENTER_DURATION_MS,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        });

        const finalizeTransition = () => {
          const activeCard = desktopCardRef.current;
          if (activeCard) {
            activeCard.getAnimations().forEach((animation) => animation.cancel());
            resetDesktopCardStyles(activeCard);
          }

          isCardAnimatingRef.current = false;
          const pendingIdx = pendingDisplayIdxRef.current;
          if (pendingIdx !== null && pendingIdx !== displayIdxRef.current) {
            pendingDisplayIdxRef.current = null;
            runDesktopCardTransition(pendingIdx);
          }
        };

        enterAnimation.onfinish = finalizeTransition;
        enterAnimation.oncancel = finalizeTransition;
      });
    };

    exitAnimation.oncancel = () => {
      isCardAnimatingRef.current = false;
    };
  }, [getEnterKeyframes, getExitKeyframes, resetDesktopCardStyles]);

  const setCommandmentIdx = useCallback((index: number, animate = true) => {
    activeIdxRef.current = index;
    setActiveIdx((previousIdx) => (
      previousIdx === index ? previousIdx : index
    ));

    if (typeof window === "undefined" || window.innerWidth < 768 || !animate) {
      pendingDisplayIdxRef.current = null;
      isCardAnimatingRef.current = false;
      displayIdxRef.current = index;
      setDisplayIdx((previousIdx) => (
        previousIdx === index ? previousIdx : index
      ));
      const card = desktopCardRef.current;
      if (card) {
        card.getAnimations().forEach((animation) => animation.cancel());
        resetDesktopCardStyles(card);
      }
      return;
    }

    if (displayIdxRef.current === index && !isCardAnimatingRef.current) {
      return;
    }

    animateDesktopCardToIdx(index);
  }, [animateDesktopCardToIdx, resetDesktopCardStyles]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stepElements = desktopStepRefs.current.filter(
      (step): step is HTMLDivElement => step !== null,
    );
    if (!stepElements.length) {
      return;
    }

    const getHeaderOffset = () => 120;
    let rafId = 0;

    const updateActiveStep = () => {
      rafId = 0;
      if (window.innerWidth < 768) {
        return;
      }
      if (isAutoScrollingRef.current) {
        return;
      }

      const nextIdx = stepElements.reduce((closestIdx, step, index) => {
        const closestStep = stepElements[closestIdx];
        if (!closestStep) {
          return index;
        }

        const currentDistance = Math.abs(
          step.getBoundingClientRect().top - getHeaderOffset(),
        );
        const closestDistance = Math.abs(
          closestStep.getBoundingClientRect().top - getHeaderOffset(),
        );

        return currentDistance < closestDistance ? index : closestIdx;
      }, 0);

      if (activeIdxRef.current === nextIdx) {
        return;
      }

      setCommandmentIdx(nextIdx);
    };

    const requestActiveStepUpdate = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(updateActiveStep);
    };

    if (window.innerWidth >= 768) {
      requestActiveStepUpdate();
    }
    window.addEventListener("scroll", requestActiveStepUpdate, { passive: true });
    window.addEventListener("resize", requestActiveStepUpdate, { passive: true });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", requestActiveStepUpdate);
      window.removeEventListener("resize", requestActiveStepUpdate);
    };
  }, [setCommandmentIdx, totalItems]);

  useEffect(() => {
    const card = desktopCardRef.current;
    return () => {
      card?.getAnimations().forEach((animation) => animation.cancel());
      isCardAnimatingRef.current = false;
      pendingDisplayIdxRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const releaseAutoScrollLock = () => {
      if (autoScrollTimeoutRef.current !== null) {
        window.clearTimeout(autoScrollTimeoutRef.current);
      }

      autoScrollTimeoutRef.current = window.setTimeout(() => {
        isAutoScrollingRef.current = false;
        autoScrollTimeoutRef.current = null;
      }, DESKTOP_AUTO_SCROLL_LOCK_MS);
    };

    const isDesktopStepperActive = () => {
      if (window.innerWidth < 768 || !desktopSectionRef.current) {
        return false;
      }

      const rect = desktopSectionRef.current.getBoundingClientRect();
      const headerOffset = 120;
      const stickyHeight = window.innerHeight - headerOffset;

      return rect.top <= headerOffset + 2 && rect.bottom >= headerOffset + stickyHeight / 2;
    };

    const scrollDesktopTargetIntoView = (target: Element | null) => {
      if (!target) {
        return;
      }

      isAutoScrollingRef.current = true;
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      releaseAutoScrollLock();
    };

    const handleDesktopStepNavigation = (deltaY: number) => {
      if (!isDesktopStepperActive()) {
        return false;
      }

      if (isAutoScrollingRef.current) {
        return true;
      }

      if (deltaY > 0) {
        if (activeIdxRef.current < totalItems - 1) {
          const nextIdx = activeIdxRef.current + 1;
          setCommandmentIdx(nextIdx);
          scrollDesktopTargetIntoView(desktopStepRefs.current[nextIdx]);
        } else {
          scrollDesktopTargetIntoView(document.getElementById("contact"));
        }
        return true;
      }

      if (deltaY < 0) {
        if (activeIdxRef.current > 0) {
          const nextIdx = activeIdxRef.current - 1;
          setCommandmentIdx(nextIdx);
          scrollDesktopTargetIntoView(desktopStepRefs.current[nextIdx]);
        } else {
          scrollDesktopTargetIntoView(document.getElementById("commandments-hero-snap"));
        }
        return true;
      }

      return false;
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 10) {
        return;
      }

      if (!handleDesktopStepNavigation(event.deltaY)) {
        return;
      }

      event.preventDefault();
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? touchStartYRef.current;
      const deltaY = touchStartYRef.current - currentY;
      if (Math.abs(deltaY) < 16) {
        return;
      }

      if (!handleDesktopStepNavigation(deltaY)) {
        return;
      }

      event.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      if (autoScrollTimeoutRef.current !== null) {
        window.clearTimeout(autoScrollTimeoutRef.current);
      }
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [setCommandmentIdx, totalItems]);

  const scrollToCommandment = (index: number) => {
    if (window.innerWidth < 768) {
      if (mobileContainerRef.current) {
        mobileContainerRef.current.scrollTo({
          left: mobileContainerRef.current.clientWidth * index,
          behavior: "smooth",
        });
        setCommandmentIdx(index, false);
      }
      return;
    }

    setCommandmentIdx(index);
    isAutoScrollingRef.current = true;
    if (autoScrollTimeoutRef.current !== null) {
      window.clearTimeout(autoScrollTimeoutRef.current);
    }
    autoScrollTimeoutRef.current = window.setTimeout(() => {
      isAutoScrollingRef.current = false;
      autoScrollTimeoutRef.current = null;
    }, DESKTOP_AUTO_SCROLL_LOCK_MS);
    desktopStepRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    const newIdx = Math.round(scrollLeft / width);
    if (newIdx !== activeIdx) {
      setCommandmentIdx(newIdx, false);
    }
  };

  const renderDesktopCommandmentCard = (
    commandment: Commandment,
  ) => (
    <div
      ref={desktopCardRef}
      key="desktop-commandment-card"
      className="ui-commandment-card absolute inset-0 flex h-full w-full flex-col items-center justify-center px-4 text-center"
    >
      <span className="font-bebas-neue mb-6 text-[100px] leading-none font-bold text-[#169D52]">
        {commandment.number}
      </span>
      <h3 className="font-bebas-neue mb-4 w-full max-w-4xl text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] font-normal uppercase text-white">
        {commandment.title}
      </h3>
      <AnimatedCommandmentDescription
        text={commandment.description}
        className="max-w-2xl text-2xl leading-[1.44] font-light tracking-[0.02em] text-white/70"
      />
    </div>
  );

  return (
    <SectionShell
      variant="dark"
      spacing="none"
      className="px-0 relative"
      aria-label="Commandments Content"
    >
      <SiteContainer className="hidden md:block">
        <div
          ref={desktopSectionRef}
          className="relative"
        >
          <div className="sticky top-[7.5rem] z-10 h-[calc(100vh-7.5rem)] min-h-[38rem]">
            <div className="ui-panel ui-panel--solid-dark relative flex h-full items-center overflow-hidden px-12">
              <p className="pointer-events-none absolute bottom-8 right-12 z-20 max-w-[22rem] text-right font-inter text-[12px] font-light leading-[1.44] tracking-[0.02em] text-white/65">
                {COMMANDMENTS_NOTE}
              </p>

              <div className="relative z-10 flex h-full w-full items-center">
                <div className="absolute left-0 z-20 flex flex-col gap-4 text-sm font-medium">
                  {commandments.map((commandment, index) => (
                    <button
                      key={commandment.number}
                      type="button"
                      onClick={() => scrollToCommandment(index)}
                      className={cn(
                        "font-inter block w-8 text-left transition-all duration-300",
                        activeIdx === index
                          ? "text-[#169D52] font-black text-base opacity-100"
                          : "text-white opacity-40 hover:opacity-100 font-normal text-sm",
                      )}
                    >
                      {commandment.number}
                    </button>
                  ))}
                </div>

                <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center text-center">
                  <div className="z-10 flex w-full flex-1 flex-col items-center justify-start">
                    <div className="w-px flex-1 bg-white" />
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>

                  <div className="ui-commandment-stage relative h-[28rem] w-full overflow-hidden">
                    {commandments[displayIdx]
                      ? renderDesktopCommandmentCard(
                          commandments[displayIdx],
                        )
                      : null}
                  </div>

                  <div className="z-10 flex w-full flex-1 flex-col items-center justify-end">
                    <div className="h-2 w-2 rounded-full bg-white" />
                    <div className="w-px flex-1 bg-white transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="-mt-[calc(100vh-7.5rem)]">
            {commandments.map((commandment, index) => (
              <div
                key={`${commandment.number}-desktop-step`}
                ref={(node) => {
                  desktopStepRefs.current[index] = node;
                }}
                data-commandment-step={commandment.number}
                className="h-[calc(100vh-7.5rem)] snap-start snap-always"
              />
            ))}
          </div>
        </div>
      </SiteContainer>

      {/* Mobile View */}
      <div
        className="md:hidden relative flex h-[calc(100svh-6.5rem)] min-h-[34rem] w-full flex-col overflow-hidden bg-black pb-12"
      >
        <p className="pointer-events-none absolute bottom-20 right-4 z-10 max-w-[18rem] text-right font-inter text-[12px] font-light leading-[1.44] tracking-[0.02em] text-white/65">
          {COMMANDMENTS_NOTE}
        </p>

        {/* Mobile Swipe Container */}
        <div
          ref={mobileContainerRef}
          className="flex w-full flex-1 overflow-x-auto snap-x snap-mandatory ui-no-scrollbar"
          onScroll={handleMobileScroll}
        >
          {commandments.map((commandment) => (
            <div
              key={commandment.number}
              className="w-full shrink-0 snap-center flex flex-col items-center justify-center px-6 relative"
            >
              {/* Top Number indicator with lines */}
              <div className="mb-8 flex w-full items-center justify-center">
                <div className="flex-1 flex items-center h-full">
                  <div className="flex-1 h-[2px] bg-white"></div>
                  <div className="w-[8px] h-[8px] rounded-full bg-white shrink-0 ml-[-2px]"></div>
                </div>
                <div className="px-6 text-[110px] sm:text-[130px] leading-none text-[#169D52] font-bebas-neue font-bold text-center shrink-0">
                  {commandment.number}
                </div>
                <div className="flex-1 flex items-center h-full">
                  <div className="w-[8px] h-[8px] rounded-full bg-white shrink-0 mr-[-2px]"></div>
                  <div className="flex-1 h-[2px] bg-white"></div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col items-center">
                <h3 className="mb-5 w-full max-w-[84%] text-center font-bebas-neue text-[24px] leading-[26px] font-normal tracking-[0.02em] text-white sm:max-w-[88%] sm:text-[28px] sm:leading-[30px]">
                  {commandment.title}
                </h3>

                <AnimatedCommandmentDescription
                  text={commandment.description}
                  className="px-4 text-center font-inter text-[17px] leading-[1.4] font-light tracking-[0.02em] text-white/80 sm:text-[18px] sm:leading-[1.42]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom pagination */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-[clamp(0.5rem,2vw,1rem)] text-xs font-inter z-10 px-4">
          {commandments.map((commandment, idx) => (
            <button
              key={commandment.number}
              onClick={() => scrollToCommandment(idx)}
              className={cn(
                "font-inter block w-8 text-center transition-all duration-300",
                activeIdx === idx
                  ? "text-[#169D52] font-black text-base opacity-100"
                  : "text-white opacity-40 hover:opacity-100 font-normal text-sm",
              )}
            >
              {commandment.number}
            </button>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
