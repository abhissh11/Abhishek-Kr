import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLocationArrow, FaQuoteRight } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { IoLogoMedium, IoMail } from "react-icons/io5";
import { LuArrowUpRight } from "react-icons/lu";
import ExperienceCard from "./components/experience/ExperienceCard";
import { Marquee } from "@/components/ui/marquee";
import { skills } from "@/lib/data";
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

const iconMap: Record<string, any> = {
  SiJavascript, SiTypescript, SiPython, SiHtml5, TbBrandCss3, BsDatabase,
  FaReact, SiNextdotjs, FaNodeJs, SiExpress, SiFastapi, SiTailwindcss, SiShadcnui,
  SiMongodb, SiPostgresql, SiPrisma, SiMysql, SiRedis,
  FaDocker, FaAws, FaGitAlt, SiGithubactions, TbBrandGithubCopilot, VscMcp, TbBrandVscode
};

export default function Home() {
  return (
    <main>
      {/* Landing section */}
      <section
        className="flex flex-col md:flex-row min-h-screen w-full bg-cover bg-center bg-no-repeat bg-[url('/images/Hero-mobile.jpeg')] md:bg-[url('/images/Hero-ab.png')]"
      >
        {/* Left half - empty to push content to the right */}
        <div className="hidden md:block md:w-1/2"></div>

        {/* Right half - containing the text */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-start pt-40 shrink-0 md:justify-center md:pt-8 p-8">
          <div className="bg-black/40 md:bg-black/20 px-3 py-4 rounded-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl"><span className="text-yellow-500">Building</span> things, <span className="text-yellow-500">Observing</span> life, <span className="text-yellow-500">Documenting</span> it all<span className="text-yellow-500">!</span></h1>
            <p className="text-lg md:text-xl text-white drop-shadow-2xl">Software Engineer, Writer, and a forever Learner</p>
          </div>
        </div>
      </section>
      {/* about section */}
      <section className="flex flex-col items-start justify-center px-4 py-20 md:px-40 bg-zinc-900">
        <h1 className="text-xl font-serif md:text-3xl font-bold text-white mb-4 drop-shadow-2xl">About</h1>
        <div className="flex flex-col items-start justify-center max-w-[100%] bg-white/10 p-4 rounded-2xl">
          <p className="text-md md:text-lg flex gap-2 text-white drop-shadow-2xl"><span><LuArrowUpRight size={24} className="text-yellow-500" /></span>
            I build systems that don’t just work, but scale - turning ideas into real products, from social platforms to practical tools, while constantly refining my craft.</p>
          <p className="text-md md:text-lg flex gap-2 text-white drop-shadow-2xl mt-4"><span><LuArrowUpRight size={24} className="text-yellow-500" /></span> At my core, I’m driven by curiosity—not only about technology, but about its influence on how people think, behave, and evolve. That curiosity takes me beyond writing code, pushing me to explore deeper meaning and purpose.</p>
          <p className="text-md md:text-lg flex gap-2 text-white drop-shadow-2xl mt-4"><span><LuArrowUpRight size={24} className="text-yellow-500" /></span>I view growth not just as collecting skills or achievements, but as becoming more self-aware, disciplined, and intentional in what I pursue—something I’m consistently working to improve</p>
        </div>
        {/* Skills marquee  */}
        <div className="w-full overflow-hidden mt-8 mb-4 max-w-full">
          <Marquee pauseOnHover className="[--duration:45s]">
            {skills.map((skill, i) => {
              const Icon = iconMap[skill.icon];
              return (
                <div key={i} className="flex items-center gap-2 bg-white/10 px-6 py-2 rounded-2xl text-white hover:scale-105 transition-all duration-300">
                  {Icon && <Icon size={24} />}
                  <span className="text-lg font-medium">{skill.name}</span>
                </div>
              );
            })}
          </Marquee>
        </div>        <div className="flex flex-wrap gap-5 bg-white/10 my-4 rounded-2xl justify-center items-center py-3 px-6 hover:scale-105 transition-all duration-300">
          <Link href="https://linkedin.com/in/abhishekkr-dev" target="_blank" className="flex items-center gap-2 text-white drop-shadow-2xl"><IoLogoLinkedin size={24} /> Linkedin</Link>
          <Link href="https://github.com/abhissh11" target="_blank" className="flex items-center gap-2 text-white drop-shadow-2xl"><FaGithub size={24} /> Github</Link>
          <Link href="https://medium.com/@dev.abhishekkr" target="_blank" className="flex items-center gap-2 text-white drop-shadow-2xl"><IoLogoMedium size={24} /> Medium</Link>
          <Link href="https://x.com/abhishekkr_ssh" target="_blank" className="flex items-center gap-2 text-white drop-shadow-2xl"><FaXTwitter size={24} /> Twitter</Link>
          <Link href="mailto:abhishekkr.ssh@gmail.com" target="_blank" className="flex items-center gap-2 text-white drop-shadow-2xl"><IoMail size={24} /> Mail</Link>
        </div>
      </section>
      {/* Experience section */}
      <section className="flex flex-col items-start justify-center px-4 py-20 md:px-40 bg-zinc-900">
        <h1 className="text-xl font-serif md:text-3xl font-bold text-white mb-4 drop-shadow-2xl">Experience</h1>
        <div className="flex flex-col gap-4 w-full py-4">
          <ExperienceCard company="Wissenhive" role="Software Engineer" jobType="Full-time" duration="Jan 2026 - Present" description="" />
          <ExperienceCard company="Yodha Foods" role="Fullstack Developer" jobType="Internship" duration="Oct 2025 - Dec 2025" description="" />
          <ExperienceCard company="Psychemasters" role="Software Engineer" jobType="Contract" duration="Aug 2025 - Oct 2025" description="" />
        </div>
      </section>
      {/* Projects section */}
      {/* Quote section  */}
      <section className="flex flex-col items-start justify-center px-4 py-20 md:px-40 bg-zinc-900">
        <div className="flex flex-col gap-4 items-center justify-center w-full py-4 bg-white/10 rounded-2xl p-4">
          <FaQuoteRight size={44} className="text-yellow-500" />
          <p className="text-xl md:text-2xl font-serif flex gap-2 text-white drop-shadow-2xl text-center">
            "Building is about getting around the obstacles that are presented to you."</p>
          <p className="text-md md:text-lg text-white">– Jeremy Renner</p>
        </div>
      </section>
    </main>
  );
}
