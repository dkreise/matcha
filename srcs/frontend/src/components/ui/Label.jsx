// components/ui/label.js
import * as React from "react";
import { cn } from "../../services/utils"

const Label = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <label
            ref={ref}
            className={cn("block text-sm font-medium text-gray-700", className)}
            {...props}
        >
            {children}
        </label>
    );
});

Label.displayName = "Label";

export { Label };

/*
If you want to customize the Label (e.g., colors, font size), you can pass a className prop to the Label component. Here's an example:

<Label htmlFor="username" className="text-lg font-bold text-blue-600">
  Username
</Label>
*/
