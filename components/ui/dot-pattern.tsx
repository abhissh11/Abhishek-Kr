import { cn } from "@/lib/utils";
import React from "react";

interface DotPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function DotPattern({ className, ...props }: DotPatternProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 h-full w-full pointer-events-none",
        "bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)]",
        "[background-size:20px_20px]",
        "[mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]",
        className
      )}
      {...props}
    />
  );
}
