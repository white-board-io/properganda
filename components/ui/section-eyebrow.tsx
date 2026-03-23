"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

type SectionEyebrowTone = "accent" | "inverse" | "muted";

type SectionEyebrowProps<C extends React.ElementType = "p"> = {
  as?: C;
  tone?: SectionEyebrowTone;
  className?: string;
  scramble?: boolean;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "className">;

const eyebrowToneClasses: Record<SectionEyebrowTone, string> = {
  accent: "",
  inverse: "text-brand-white",
  muted: "text-brand-gray",
};

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, useGSAP);

function getScrambleLabel(children: React.ReactNode) {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  return null;
}

function SectionEyebrow<C extends React.ElementType = "p">({
  as,
  tone = "accent",
  className,
  scramble = false,
  children,
  ...props
}: SectionEyebrowProps<C>) {
  const animatedTextRef = React.useRef<HTMLSpanElement>(null);
  const scrambleLabel = getScrambleLabel(children);
  const shouldScramble = scramble && scrambleLabel !== null;

  useGSAP(
    () => {
      if (!shouldScramble || !animatedTextRef.current) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tween = gsap.to(animatedTextRef.current, {
        duration: 1.1,
        ease: "none",
        paused: true,
        scrambleText: {
          text: "{original}",
          chars: "upperCase",
          revealDelay: 0.08,
          speed: 0.5,
          tweenLength: false,
        },
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: animatedTextRef.current,
        start: "top 88%",
        once: true,
        onEnter: () => tween.restart(true),
      });

      return () => {
        scrollTrigger.kill();
        tween.kill();
      };
    },
    { dependencies: [shouldScramble, scrambleLabel], scope: animatedTextRef },
  );

  const Component = as ?? "p";

  return (
    <Component
      className={cn("ui-eyebrow", eyebrowToneClasses[tone], className)}
      {...props}
    >
      {shouldScramble && scrambleLabel ? (
        <>
          <span className="sr-only">{scrambleLabel}</span>
          <span
            ref={animatedTextRef}
            aria-hidden="true"
            className="inline-block whitespace-pre"
          >
            {scrambleLabel}
          </span>
        </>
      ) : (
        children
      )}
    </Component>
  );
}

export { SectionEyebrow };
