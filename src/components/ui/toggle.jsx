// "use client"

// import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-muted-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-black data-[state=on]:text-white",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        selected: "bg-selected-tag",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
        weather: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Toggle = forwardRef(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };

/* Style Explanations: */
// hover:text-muted-foreground: Ändert die Textfarbe bei Hover auf eine gemilderte Vordergrundfarbe (muted-foreground).
// focus-visible:outline-none: Entfernt die Standard-Kontur, wenn das Element fokussiert wird.
// disabled:pointer-events-none: Deaktiviert Pointer-Events (z. B. Klicks) für das Element, wenn es den Zustand disabled hat.

/* Deleted shadcn ui styles in the cva function: */
// ring-offset-background: Definiert den ring-offset (den Abstand zwischen einem äußeren Rahmen und dem Element). Dieser bezieht sich auf die Hintergrundfarbe.
// hover:bg-muted: Ändert den Hintergrund bei Hover (hover) auf eine gemilderte Farbe (muted).
// focus-visible:ring-2: Fügt einen ring mit 2px Breite hinzu, wenn das Element fokussiert wird.
// focus-visible:ring-ring: Bestimmt die Farbe des Rings, der bei Fokus erscheint.
// focus-visible:ring-offset-2: Fügt einen ring-offset mit 2px Breite hinzu, wenn das Element fokussiert wird.
