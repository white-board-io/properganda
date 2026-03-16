import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "accent" | "neutral" | "canopySolid" | "canopyOutline";
type ButtonSize = "sm" | "md" | "lg";

const buttonVariantClasses: Record<ButtonVariant, string> = {
  accent: "ui-button--accent",
  neutral: "ui-button--neutral",
  canopySolid: "ui-button--canopy-solid",
  canopyOutline: "ui-button--canopy-outline",
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "ui-button--sm",
  md: "ui-button--md",
  lg: "ui-button--lg",
};

type ButtonVariantsOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

function buttonVariants({
  variant = "accent",
  size = "md",
  fullWidth = false,
}: ButtonVariantsOptions = {}) {
  return cn(
    "ui-button",
    buttonVariantClasses[variant],
    buttonSizeClasses[size],
    fullWidth && "w-full",
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantsOptions;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "accent", size = "md", fullWidth = false, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
