"use client";

import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface WorkCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  index?: number;
}

export default function WorkCard({ title, description, image, link, index = 0 }: WorkCardProps) {
  return (
    <AnimatedSection direction="up" delay={index * 150}>
      <div className="relative flex items-start gap-6 md:gap-8">

        {/* Left: Dot + index number — desktop only */}
        <div className="hidden md:flex flex-col items-center shrink-0 pt-10 md:pt-12">
          {/* Soft dot */}
          <div className="relative flex items-center justify-center w-8 h-8">
            <span className="absolute w-6 h-6 rounded-full bg-orange-500/10 animate-pulse" style={{ animationDuration: "3s" }} />
            <span className="relative w-2.5 h-2.5 rounded-full bg-orange-500 ring-2 ring-orange-500/25 z-10" />
          </div>
        </div>

        {/* Right: Card */}
        <div className="flex-1 group flex flex-col-reverse md:flex-row items-stretch rounded-3xl bg-[#111111] border border-white/10 overflow-hidden">
          {/* Left: Content */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between items-start gap-8 bg-[#111111] shrink-0">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">
                {title}
              </h2>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
                {description}
              </p>
            </div>

            <Link
              href={link}
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

          {/* Right: Image */}
          <div className="w-full md:w-1/2 relative min-h-[240px] sm:min-h-[300px] md:min-h-[380px] overflow-hidden shrink-0 border-b md:border-b-0 md:border-l border-white/10">
            <Image
              src={image || "/images/work.jpg"}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </AnimatedSection>
  );
}