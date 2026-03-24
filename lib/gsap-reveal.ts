import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollRevealOptions = {
  trigger?: gsap.DOMTarget;
  start?: string;
  stagger?: number;
  duration?: number;
  scale?: number;
  blur?: number;
  clipPath?: string;
};

export function createScrollReveal(
  targets: gsap.TweenTarget,
  {
    trigger,
    start = "top 82%",
    stagger = 0.12,
    duration = 1.1,
    scale = 0.985,
    blur = 12,
    clipPath = "inset(0% 0% 100% 0%)",
  }: ScrollRevealOptions = {},
) {
  const elements = gsap.utils.toArray<HTMLElement>(targets);

  if (!elements.length) {
    return null;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(elements, {
      autoAlpha: 1,
      scale: 1,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0%)",
    });

    return null;
  }

  gsap.set(elements, {
    transformOrigin: "50% 50%",
    willChange: "opacity, transform, filter, clip-path",
  });

  return gsap.fromTo(
    elements,
    {
      autoAlpha: 0,
      scale,
      filter: `blur(${blur}px)`,
      clipPath,
    },
    {
      autoAlpha: 1,
      scale: 1,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0%)",
      duration,
      ease: "power3.out",
      stagger,
      scrollTrigger: {
        trigger: trigger ?? elements[0],
        start,
        once: true,
      },
      onComplete: () => {
        gsap.set(elements, { clearProps: "willChange" });
      },
    },
  );
}
