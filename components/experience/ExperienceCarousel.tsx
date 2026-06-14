"use client";

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsCodeSlash } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";

const experiences = [
  {
    company: "Wissenhive",
    role: "Software Engineer",
    jobType: "Full-time",
    duration: "Jan 2026 - Present",
    description: "Focused on building reliable, scalable systems and intuitive interfaces. Successfully contributed to full-stack features, improved architectural performance, and collaborated across teams to deliver high-quality products."
  },
  {
    company: "Yodha Foods",
    role: "Fullstack Developer",
    jobType: "Internship",
    duration: "Oct 2025 - Dec 2025",
    description: "Developed and maintained full-stack web applications, improving overall site performance and user experience. Worked closely with the design team to implement responsive UI components."
  },
  {
    company: "Psychemasters",
    role: "Software Engineer",
    jobType: "Contract",
    duration: "Aug 2025 - Oct 2025",
    description: "Engineered robust backend services and integrated third-party APIs. Streamlined database queries and improved data loading times significantly."
  }
];

export default function ExperienceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <section className="flex flex-col items-center justify-center px-4 py-20 md:px-40 bg-zinc-900 w-full overflow-hidden">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-1 bg-white/5">
          <MdOutlineWorkOutline className="text-orange-500" size={14} />
          <span className="text-xs text-white/70 tracking-widest uppercase">Experience</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={prev} 
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-orange-500 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Previous experience"
          >
            <FaChevronLeft size={14} />
          </button>
          <button 
            onClick={next} 
            className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-orange-500 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Next experience"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl overflow-hidden relative">
        <div 
          className="flex transition-transform duration-500 ease-in-out w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {experiences.map((exp, idx) => (
            <div key={idx} className="w-full shrink-0">
              <div className="w-full bg-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-white">{exp.company}</h2>
                    <div className="flex items-center gap-3">
                      <BsCodeSlash className="text-orange-500" size={22} />
                      <span className="text-xl text-white font-medium">{exp.role}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-full">
                        {exp.jobType}
                      </span>
                      <span className="text-white/40 text-sm">{exp.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className=" rounded-2xl p-6 border border-orange-500/20 border-dashed mt-6">
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Optional: pagination dots */}
      <div className="flex justify-center gap-2 mt-8">
        {experiences.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "bg-orange-500 w-6" : "bg-white/20"
            }`}
            aria-label={`Go to experience ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
