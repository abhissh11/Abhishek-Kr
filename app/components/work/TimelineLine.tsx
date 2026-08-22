"use client";

import { useEffect, useRef, useState } from "react";

export default function TimelineLine() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observer.disconnect(); // fire only once
        }
      },
      { threshold: 0.05 }
    );

    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={trackRef}
      className="hidden md:block absolute left-4 top-4 bottom-0 w-px bg-zinc-800 pointer-events-none overflow-hidden"
    >
      <div
        className="w-full bg-gradient-to-b from-orange-500 to-orange-400/60"
        style={{
          height: filled ? "100%" : "0%",
          transition: "height 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
    </div>
  );
}

