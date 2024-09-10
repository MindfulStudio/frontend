// "use client"

// import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Progress = forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2  overflow-hidden bg-white rounded-full",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator /* this is the progress inside the bar */
      className="h-full w-full flex-1 transition-all bg-black"
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
      }} /*  this means that the progress bar will be filled from the right to the left; the value is the percentage of the progress bar that is filled; value or 0 means that the value is optional and if it is not provided, the default value is 0 (= no progress) */
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
