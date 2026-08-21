"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FolderCodeIcon } from "lucide-react";
import { LuArrowUpRight } from "react-icons/lu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { workData } from "@/lib/data";

import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = workData.slice(0, 2);

  const prev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const next = () => {
    setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="flex flex-col items-center justify-center py-20 bg-zinc-900 w-full overflow-hidden">
      <div className="w-[calc(100%-2rem)] max-w-5xl mx-auto flex flex-col items-start justify-center">



        {/* Section Header with Navigation Controls */}
        <AnimatedSection direction="up" delay={50} className="w-full flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-1 mb-6 bg-white/5">
              <FolderCodeIcon className="text-orange-500" size={14} />
              <span className="text-xs text-white/70 tracking-widest uppercase">Projects</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-2xl leading-relaxed">
              <span className="text-orange-500 font-cursive text-5xl md:text-6xl font-bold">Featured work</span> & real-world applications<span className="text-orange-500">.</span>
            </h1>
            <p className="text-base md:text-lg text-white/60 drop-shadow-2xl max-w-2xl">
              A selection of web applications, AI platforms, and software tools I've designed and engineered.
            </p>
          </div>

          {/* Controls: Prev/Next Arrow Buttons & Counter */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xs font-semibold text-white/40 tracking-widest uppercase mr-2">
              0{activeIndex + 1} / 0{projects.length}
            </span>
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-orange-500 hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Previous project"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-orange-500 hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Next project"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </AnimatedSection>

        {/* Horizontal Project Slider (No Card Background or Borders) */}
        <AnimatedSection direction="up" delay={150} className="w-full overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {projects.map((w, idx) => (
              <div
                key={idx}
                className="w-full shrink-0 flex flex-col-reverse md:flex-row items-stretch rounded-3xl bg-[#111111] border border-white/10 overflow-hidden group shadow-2xl relative"
              >
                {/* Left Column: Background & Content (Below image on mobile, left on desktop) */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between items-start gap-8 bg-[#111111] shrink-0">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">
                      {w.title}
                    </h2>
                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
                      {w.description}
                    </p>
                  </div>

                  <Link
                    href={w.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-orange-500 hover:text-zinc-900 border border-white/10 text-white text-sm font-semibold transition-all duration-300 group/link"
                  >
                    View Project{" "}
                    <LuArrowUpRight
                      size={18}
                      className="group-hover/link:rotate-45 transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Right Column: Clean Vertical Image Container (On top on mobile, right on desktop) */}
                <div className="w-full md:w-1/2 relative min-h-[260px] sm:min-h-[300px] md:min-h-[380px] overflow-hidden shrink-0 border-b md:border-b-0 md:border-l border-white/10">
                  <Image
                    src={w.image || "/images/work.jpg"}
                    alt={w.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Bottom Row: Centered Pagination Dots */}
        <div className="w-full flex items-center justify-center mt-10">
          <div className="flex gap-2 items-center">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? "bg-orange-500 w-8" : "bg-white/20 w-2"
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
