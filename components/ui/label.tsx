import * as React from "react";

import { cn } from "@/src/libs/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-neutral-700 dark:text-neutral-200",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };

