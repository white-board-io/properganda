"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

type BlurTextSegment = {
  text: string;
  className?: string;
  as?: "span" | "strong";
};

type BlurTextRevealProps<C extends React.ElementType = "div"> = {
  as?: C;
  text?: string;
  segments?: readonly BlurTextSegment[];
  className?: string;
  triggerStart?: string;
  stagger?: number;
  duration?: number;
  blur?: number;
  y?: number;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "className" | "children">;

gsap.registerPlugin(ScrollTrigger, useGSAP);

function BlurTextReveal<C extends React.ElementType = "div">({
  as,
  text,
  segments,
  className,
  triggerStart = "top 88%",
  stagger = 0.015,
  duration = 0.3,
  blur = 8,
  y = 10,
  ...props
}: BlurTextRevealProps<C>) {
  const rootRef = React.useRef<HTMLElement>(null);
  const Component = as ?? "div";
  const resolvedSegments = React.useMemo<readonly BlurTextSegment[]>(
    () => segments ?? [{ text: text ?? "" }],
    [segments, text],
  );
  const contentSignature = React.useMemo(
    () =>
      resolvedSegments
        .map(
          (segment) =>
            `${segment.as ?? "span"}:${segment.className ?? ""}:${segment.text}`,
        )
        .join("||"),
    [resolvedSegments],
  );

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const characters = gsap.utils.toArray<HTMLElement>(
        ".ui-blur-text-reveal__char",
        root,
      );

      if (!characters.length) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(characters, { clearProps: "all" });
        return;
      }

      const timeline = gsap.timeline({ paused: true });

      timeline
        .set(characters, {
          opacity: 0,
          y,
          filter: `blur(${blur}px)`,
        })
        .to(characters, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration,
          ease: "power2.out",
          stagger,
          clearProps: "filter",
        });

      const scrollTrigger = ScrollTrigger.create({
        trigger: root,
        start: triggerStart,
        onEnter: () => timeline.restart(true),
        onEnterBack: () => timeline.restart(true),
      });

      return () => {
        scrollTrigger.kill();
        timeline.kill();
      };
    },
    {
      scope: rootRef,
      dependencies: [blur, contentSignature, duration, stagger, triggerStart, y],
    },
  );

  return (
    <Component ref={rootRef} className={className} {...props}>
      {resolvedSegments.map((segment, segmentIndex) => {
        const SegmentTag = segment.as ?? "span";
        const tokens = segment.text.split(/(\s+)/);

        return (
          <SegmentTag
            key={`${segmentIndex}-${segment.text}`}
            className={segment.className}
          >
            {tokens.map((token, tokenIndex) => {
              if (!token) {
                return null;
              }

              if (/^\s+$/.test(token)) {
                return (
                  <React.Fragment key={`${segmentIndex}-${tokenIndex}`}>
                    {token}
                  </React.Fragment>
                );
              }

              return (
                <span
                  key={`${segmentIndex}-${tokenIndex}-${token}`}
                  className="inline-block whitespace-nowrap"
                >
                  {Array.from(token).map((character, characterIndex) => (
                    <span
                      key={`${segmentIndex}-${tokenIndex}-${characterIndex}-${character}`}
                      className={cn(
                        "ui-blur-text-reveal__char inline-block will-change-[transform,filter,opacity]",
                      )}
                    >
                      {character}
                    </span>
                  ))}
                </span>
              );
            })}
          </SegmentTag>
        );
      })}
    </Component>
  );
}

export { BlurTextReveal };
