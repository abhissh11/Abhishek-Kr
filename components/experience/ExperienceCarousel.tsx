"use client";

import React from "react";
import Image from "next/image";
import { MdOutlineWorkOutline } from "react-icons/md";
import { experiences, formatExperienceDate } from "@/lib/data";

export default function ExperienceCarousel() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-20 md:px-16 lg:px-40 bg-zinc-900 w-full">
      <div className="w-full max-w-4xl flex flex-col items-start justify-center">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-1 mb-6 bg-white/5">
            <MdOutlineWorkOutline className="text-orange-500" size={14} />
            <span className="text-xs text-white/70 tracking-widest uppercase">Experience</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-2xl leading-relaxed">
            <span className="text-orange-500 font-cursive text-5xl md:text-6xl font-bold">Building</span> systems, <span className="text-orange-500 font-cursive text-5xl md:text-6xl font-bold">scaling</span> products, <br /> and <span className="text-orange-500 font-cursive text-5xl md:text-6xl font-bold">driving impact</span><span className="text-orange-500">.</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 drop-shadow-2xl max-w-2xl">
            My professional journey engineering full-stack platforms, optimizing backend architecture, and shipping software at scale.
          </p>
        </div>

        {/* Experience Items List */}
        <div className="w-full flex flex-col">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 md:p-8 bg-transparent border-2 border-transparent border-b-zinc-800/80 first:border-t-zinc-800/80 hover:rounded-2xl hover:bg-zinc-800/40 hover:border-zinc-700/60 transition-all duration-300 group"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full">
                {/* Left: Logo & Company/Date Info */}
                <div className="flex items-start gap-4">
                  {/* Company Logo Image or Fallback Badge */}
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden relative ${exp.logoBg || "bg-gradient-to-br from-orange-500 to-amber-600"} flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300`}
                  >
                    {exp.logoImage ? (
                      <Image
                        src={exp.logoImage}
                        alt={exp.company}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      exp.logoIcon || exp.company.charAt(0)
                    )}
                  </div>

                  {/* Company Name & Duration */}
                  <div className="flex flex-col">
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-orange-400 transition-colors">
                      {exp.company}
                    </h2>
                    <span className="text-xs md:text-sm text-zinc-400 font-medium mt-0.5">
                      {formatExperienceDate(exp.startDate, exp.endDate)}
                    </span>
                  </div>
                </div>

                {/* Right: Role Tag Badge */}
                <div className="self-start sm:self-auto">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#FF5733]/15 text-[#FF7043] border border-[#FF7043]/30 text-[10px] md:text-xs font-bold uppercase tracking-wider inline-block">
                    {exp.roleTag || exp.role}
                  </span>
                </div>
              </div>

              {/* Description Paragraph */}
              <p className="text-zinc-300 text-sm md:text-[15px] leading-relaxed mt-4 mb-6 font-normal max-w-3xl">
                {exp.description}
              </p>

              {/* Quantifiable Stats Row / Grid */}
              {exp.stats && exp.stats.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 pt-2">
                  {exp.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex flex-col">
                      <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-sans">
                        {stat.value}
                      </span>
                      <span className="text-[10px] md:text-[11px] font-bold text-zinc-400 tracking-wider uppercase mt-1">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


