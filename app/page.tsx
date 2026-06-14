import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLocationArrow, FaQuoteRight, FaLock } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { IoLogoMedium, IoMail } from "react-icons/io5";
import { LuArrowUpRight } from "react-icons/lu";
import ExperienceCarousel from "@/components/experience/ExperienceCarousel";
import ProfileImage from "./components/profile/ProfileImage";
import WorkCard from "./components/work/WorkCard";
import SkillsSection from "@/components/skills/SkillsSection";
import { Marquee } from "@/components/ui/marquee";
import { DotPattern } from "@/components/ui/dot-pattern";
import { skills, workData } from "@/lib/data";
import { TbBrandCss3, TbBrandGithubCopilot, TbBrandVscode } from "react-icons/tb";
import { FaAws } from "react-icons/fa";
import { VscMcp } from "react-icons/vsc";
import {
  SiJavascript, SiTypescript, SiPython, SiHtml5,
  SiNextdotjs, SiExpress, SiFastapi, SiTailwindcss, SiShadcnui,
  SiMongodb, SiPostgresql, SiPrisma, SiMysql, SiRedis,
  SiGithubactions
} from "react-icons/si";
import { FaReact, FaNodeJs, FaDocker, FaGitAlt } from "react-icons/fa";
import { BsDatabase } from "react-icons/bs";
import { Folder, FolderCodeIcon } from "lucide-react";

const iconMap: Record<string, any> = {
  SiJavascript, SiTypescript, SiPython, SiHtml5, TbBrandCss3, BsDatabase,
  FaReact, SiNextdotjs, FaNodeJs, SiExpress, SiFastapi, SiTailwindcss, SiShadcnui,
  SiMongodb, SiPostgresql, SiPrisma, SiMysql, SiRedis,
  FaDocker, FaAws, FaGitAlt, SiGithubactions, TbBrandGithubCopilot, VscMcp, TbBrandVscode
};

const Tooltip = ({ text }: { text: string }) => (
  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-bottom-10 transition-all duration-300 bg-black text-white text-xs px-2 py-1 rounded-md whitespace-nowrap pointer-events-none border border-white/10 shadow-lg z-50">
    {text}
  </span>
);

export default function Home() {
  return (
    <main>
      {/* Landing section */}
      <section
        className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full relative"
      >
        <DotPattern />
        {/* Left half - containing the image */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 pt-32 md:pt-8 relative z-10">
          <ProfileImage />
        </div>

        {/* Right half - containing the text */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-start pt-4 shrink-0 md:justify-center p-8 text-center md:text-left relative z-10">
          <div className="px-3 py-4">
            <h1 className="text-3xl md:text-5xl font-bold text-left text-white mb-4 drop-shadow-2xl"><span className="text-orange-500">Building</span> things,<br /><span className="text-orange-500">Observing</span> life,<br /><span className="text-orange-500">Documenting</span> it all<span className="text-orange-500">!</span></h1>
            <p className="text-lg md:text-lg text-white/80 text-left drop-shadow-2xl">Software Engineer, Writer by hobby & a Learner for life.</p>
          </div>
          {/* connect */}
          <div className="flex flex-wrap gap-5 my-4 rounded-2xl justify-center items-center py-3 px-6 transition-all duration-300">
            <Link href="https://linkedin.com/in/abhishekkr-dev" target="_blank" className="group relative flex items-center gap-2 text-white drop-shadow-2xl transition-all">
              <IoLogoLinkedin size={24} />
              <Tooltip text="LinkedIn" />
            </Link>
            <Link href="https://github.com/abhissh11" target="_blank" className="group relative flex items-center gap-2 text-white drop-shadow-2xl transition-all">
              <FaGithub size={24} />
              <Tooltip text="GitHub" />
            </Link>
            <Link href="https://medium.com/@dev.abhishekkr" target="_blank" className="group relative flex items-center gap-2 text-white drop-shadow-2xl transition-all">
              <IoLogoMedium size={24} />
              <Tooltip text="Medium" />
            </Link>
            <Link href="https://x.com/abhishekkr_ssh" target="_blank" className="group relative flex items-center gap-2 text-white drop-shadow-2xl transition-all">
              <FaXTwitter size={24} />
              <Tooltip text="Twitter" />
            </Link>
            <Link href="mailto:abhishekkr.ssh@gmail.com" target="_blank" className="group relative flex items-center gap-2 text-white drop-shadow-2xl transition-all">
              <IoMail size={24} />
              <Tooltip text="Email" />
            </Link>
          </div>
        </div>

      </section>
      {/* about section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 md:px-40 bg-zinc-900 w-full">
        <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-[#111111] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center px-4 py-3 border-b border-white/10 bg-[#1a1a1a]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="flex items-center gap-2 text-xs text-white/40 bg-white/5 px-3 py-1 rounded-md">
                <FaLock size={10} />
                abhishekkr.dev/about
              </div>
            </div>
            <div className="w-[44px]"></div>
          </div>
          
          {/* Body */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 bg-white/5 rounded-2xl p-6 border border-white/5">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffb47b] via-[#ff7a00] to-[#c24b00] shadow-[inset_-2px_-4px_6px_rgba(0,0,0,0.4),0_4px_10px_rgba(255,122,0,0.3)]"></div>
              </div>
              <div className="flex flex-col gap-4 text-white/80 leading-relaxed text-sm md:text-base">
                <p>
                  I build systems that don’t just work, but scale - <span className="text-orange-400 font-medium">turning ideas into real products</span>, from social platforms to practical tools, while constantly refining my craft.
                </p>
                <p>
                  At my core, I’m driven by <span className="text-orange-400 font-medium">curiosity</span>—not only about technology, but about its influence on how people think, behave, and evolve. That curiosity takes me beyond writing code, pushing me to explore deeper meaning and purpose.
                </p>
                <p>
                  I view growth not just as collecting skills or achievements, but as becoming more <span className="text-orange-400 font-medium">self-aware, disciplined, and intentional</span> in what I pursue—something I’m consistently working to improve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Experience section */}
      <ExperienceCarousel />
      <SkillsSection />
      {/* Projects section */}
      <section className="flex flex-col items-start justify-center px-4 py-20 md:px-40 bg-zinc-900">
        
          <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-1 mb-6 bg-white/5">
                    <FolderCodeIcon className="text-orange-500" size={14} />
                    <span className="text-xs text-white/70 tracking-widest uppercase">Projects</span>
                  </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {workData.slice(0, 2).map((w, i) => (
            <WorkCard 
              key={i}
              title={w.title} 
              description={w.description} 
              image={w.image} 
              link={w.link} 
            />
          ))}
        </div>
        <div className="w-full flex justify-center mt-12">
          <Link href="/work" className="bg-orange-400 hover:bg-orange-500 text-zinc-900 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1">
            See more
          </Link>
        </div>
      </section>
      {/* Quote section  */}
      <section className="flex flex-col items-start justify-center px-4 py-20 md:px-40 bg-zinc-900">
        <div className="flex flex-col gap-4 items-center justify-center w-full py-4 bg-white/10 rounded-2xl p-4">
          <FaQuoteRight size={44} className="text-orange-400" />
          <p className="text-xl md:text-2xl font-serif flex gap-2 text-white drop-shadow-2xl text-center">
            "Building is about getting around the obstacles that are presented to you."</p>
          <p className="text-md md:text-lg text-white">– Jeremy Renner</p>
        </div>
      </section>
    </main>
  );
}
