"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TextRevealProps<C extends React.ElementType = "div"> = {
  as?: C;
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  charClassName?: string;
  delayStep?: number;
  duration?: number;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "className" | "children">;

function TextReveal<C extends React.ElementType = "div">({
  as,
  lines,
  className,
  lineClassName,
  charClassName,
  delayStep = 0.035,
  duration = 0.72,
  ...props
}: TextRevealProps<C>) {
  const Component = as ?? "div";
  let charIndex = 0;

  return (
    <Component className={className} {...props}>
      {lines.map((line, lineIndex) => (
        <span key={`${lineIndex}-${line}`} className={cn("block whitespace-nowrap", lineClassName)}>
          {Array.from(line).map((char, characterIndex) => {
            const revealIndex = charIndex;
            charIndex += 1;

            return (
              <span
                key={`${lineIndex}-${characterIndex}-${char}`}
                className="inline-block overflow-hidden align-top"
              >
                <span
                  className={cn("ui-text-reveal-char inline-block whitespace-pre", charClassName)}
                  style={
                    {
                      "--text-reveal-index": revealIndex,
                      "--text-reveal-delay-step": `${delayStep}s`,
                      "--text-reveal-duration": `${duration}s`,
                    } as React.CSSProperties
                  }
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            );
          })}
        </span>
      ))}

      <style jsx>{`
        .ui-text-reveal-char {
          opacity: 0;
          transform: translateY(105%);
          animation-name: text-reveal-rise;
          animation-duration: var(--text-reveal-duration, 0.72s);
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: forwards;
          animation-delay: calc(
            var(--text-reveal-index, 0) * var(--text-reveal-delay-step, 0.035s)
          );
          will-change: transform, opacity;
        }

        @keyframes text-reveal-rise {
          0% {
            opacity: 0;
            transform: translateY(105%);
          }

          100% {
            opacity: 1;
            transform: translateY(0%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ui-text-reveal-char {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }
      `}</style>
    </Component>
  );
}

export { TextReveal };
