import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-medium tracking-wide transition-[background-color,color,box-shadow,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[var(--shadow-border)] hover:bg-bark",
        secondary:
          "bg-cream text-ink shadow-[var(--shadow-border)] hover:bg-paper",
        outline:
          "bg-transparent text-ink shadow-[var(--shadow-border)] hover:bg-cream",
        ghost: "bg-transparent text-ink hover:bg-cream/70",
        invert:
          "bg-paper text-ink hover:bg-cream",
      },
      size: {
        sm: "h-10 rounded-md px-3.5",
        md: "h-11 rounded-md px-5",
        lg: "h-12 rounded-md px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
