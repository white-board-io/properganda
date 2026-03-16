import * as React from "react";

import { cn } from "@/lib/utils";

type SectionEyebrowTone = "accent" | "inverse" | "muted";

type SectionEyebrowProps<C extends React.ElementType = "p"> = {
  as?: C;
  tone?: SectionEyebrowTone;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "className">;

const eyebrowToneClasses: Record<SectionEyebrowTone, string> = {
  accent: "",
  inverse: "text-brand-white",
  muted: "text-brand-gray",
};

function SectionEyebrow<C extends React.ElementType = "p">({
  as,
  tone = "accent",
  className,
  ...props
}: SectionEyebrowProps<C>) {
  const Component = as ?? "p";

  return (
    <Component
      className={cn("ui-eyebrow", eyebrowToneClasses[tone], className)}
      {...props}
    />
  );
}

export { SectionEyebrow };
