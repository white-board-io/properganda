import * as React from "react";

import { cn } from "@/lib/utils";

type CardVariant = "default" | "soft" | "floating" | "raised";

const cardVariantClasses: Record<CardVariant, string> = {
  default: "ui-card",
  soft: "ui-card ui-card--soft",
  floating: "ui-card ui-card--floating",
  raised: "ui-card ui-card--raised",
};

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariantClasses[variant], className)}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export { Card };
