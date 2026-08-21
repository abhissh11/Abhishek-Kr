import React from 'react';
import { skillCategories } from '@/lib/data';
import {
  SiJavascript, SiTypescript, SiPython, SiHtml5,
  SiNextdotjs, SiExpress, SiFastapi, SiTailwindcss, SiShadcnui,
  SiMongodb, SiPostgresql, SiPrisma, SiMysql, SiRedis,
  SiGithubactions
} from "react-icons/si";
import { BsClaude } from "react-icons/bs";
import { FaReact, FaNodeJs, FaDocker, FaGitAlt, FaAws } from "react-icons/fa";
import { BsDatabase } from "react-icons/bs";
import { TbBrandCss3, TbBrandGithubCopilot, TbBrandVscode } from "react-icons/tb";
import { VscMcp } from "react-icons/vsc";

const iconMap: Record<string, any> = {
  SiJavascript, SiTypescript, SiPython, SiHtml5, TbBrandCss3, BsDatabase,
  FaReact, SiNextdotjs, FaNodeJs, SiExpress, SiFastapi, SiTailwindcss, SiShadcnui,
  SiMongodb, SiPostgresql, SiPrisma, SiMysql, SiRedis, BsClaude,
  FaDocker, FaAws, FaGitAlt, SiGithubactions, TbBrandGithubCopilot, VscMcp, TbBrandVscode
};

const Tooltip = ({ text }: { text: string }) => (
  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-bottom-10 transition-all duration-300 bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap pointer-events-none border border-white/10 shadow-lg z-50">
    {text}
  </span>
);

import AnimatedSection from "@/components/ui/AnimatedSection";

export default function SkillsSection() {
  return (
    <section className="flex flex-col items-center justify-center py-20 bg-zinc-900 w-full">
      <div className="w-[calc(100%-2rem)] max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10 md:gap-20 relative">



        {/* Left part */}
        <AnimatedSection direction="up" delay={50} className="flex flex-col items-start w-full md:w-1/3 md:sticky md:top-28 self-start">
          <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-1 mb-6 bg-white/5">
            <BsDatabase className="text-orange-500" size={14} />
            <span className="text-xs text-white/70 tracking-widest uppercase">Stack</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-2xl leading-relaxed">
            Tools I trust to ship <span className="text-orange-500 font-cursive text-5xl md:text-6xl font-bold">real products</span><span className="text-orange-500">.</span>
          </h1>
          <p className="text-md md:text-lg text-white/60 drop-shadow-2xl">
            The AI I build with, the tools I use to ship into products, and the foundation it all runs on.
          </p>
        </AnimatedSection>

        {/* Right part */}
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          {skillCategories.map((category, idx) => (
            <AnimatedSection key={idx} direction="up" delay={idx * 150} className="w-full">
              <div className={`flex flex-col p-6 rounded-xl border border-dashed ${category.color} bg-black/20`}>
                <h2 className="text-lg font-semibold text-white">{category.title}</h2>
                <p className="text-sm text-white/50 mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-4">
                  {category.skills.map((skill, i) => {
                    const Icon = iconMap[skill.icon];
                    return (
                      <div key={i} className="group relative flex items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer">
                        {Icon && <Icon size={28} className="text-white/80 group-hover:text-white transition-colors" />}
                        <Tooltip text={skill.name} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
