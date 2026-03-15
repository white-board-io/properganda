import * as React from "react";

import { cn } from "@/lib/utils";

type SectionShellVariant = "dark" | "light" | "soft";
type SectionShellSpacing = "default" | "compact" | "none";

type SectionShellProps = React.HTMLAttributes<HTMLElement> & {
  variant?: SectionShellVariant;
  spacing?: SectionShellSpacing;
};

const shellVariantClasses: Record<SectionShellVariant, string> = {
  dark: "ui-section-shell--dark",
  light: "ui-section-shell--light",
  soft: "ui-section-shell--soft",
};

const shellSpacingClasses: Record<SectionShellSpacing, string> = {
  default: "ui-section-shell",
  compact: "py-12 md:py-16",
  none: "",
};

const SectionShell = React.forwardRef<HTMLElement, SectionShellProps>(
  ({ variant = "dark", spacing = "default", className, ...props }, ref) => {
    return (
      <section
        ref={ref}
      className={cn(
        shellVariantClasses[variant],
        shellSpacingClasses[spacing],
        className,
      )}
      {...props}
      />
    );
  },
);

SectionShell.displayName = "SectionShell";

export { SectionShell };
