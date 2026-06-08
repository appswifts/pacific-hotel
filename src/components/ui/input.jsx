import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 border-0 bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:shadow-[0_0_0_2px_black,0_0_8px_rgba(0,0,0,0.25)] shadow-[0_0_0_1.5px_rgba(0,0,0,0.7),0_0_6px_rgba(0,0,0,0.12)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:shadow-[0_0_0_2px_#ef4444,0_0_8px_rgba(239,68,68,0.25)] md:text-sm dark:bg-input/30 dark:disabled:bg-input/80",
        className
      )}
      {...props} />
  );
}

export { Input }
