import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "../../services/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef((props, ref) => {
  const { className, ...rest } = props
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        "border border-border shadow-sm",
        className
      )}
      {...rest}
    />
  )
})
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef((props, ref) => {
  const { className, ...rest } = props
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        // "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        // // "border border-muted bg-background text-muted-foreground",
        // // "hover:bg-background/30 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        // "hover:bg-background",
        // "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-ring data-[state=active]:shadow-sm",
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "hover:bg-background",
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border border-green-500 data-[state=active]:shadow-md",
        "data-[state=active]:bg-background",
        // "inline-flex items-center justify-center whitespace-nowrap rounded-md border px-3 py-1 text-sm font-medium transition-all",
        // "text-muted-foreground hover:bg-background/40",
        // "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:border-ring data-[state=active]:shadow",
        // "data-[state=active]:shadow-md data-[state=active]:scale-105",
        className
      )}
        // className="px-4 py-2 border text-sm text-muted-foreground bg-white hover:bg-muted/40 
        //          data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:border-red-500"
      {...rest}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        // "mt-2 p-4 rounded-lg border border-border bg-background",
        // "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...rest}
    />
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }

