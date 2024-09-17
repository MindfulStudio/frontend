"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Slider = forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="slider-track">
      <SliderPrimitive.Range className="slider-range" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="slider-thumb" />
    <SliderPrimitive.Thumb className="slider-thumb" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
