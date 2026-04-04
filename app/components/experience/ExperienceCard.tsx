"use client";

import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

export default function ExperienceCard({ company, role, jobType, duration, description }: { company: string, role: string, jobType: string, duration: string, description: string }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-col items-start justify-center p-6 md:p-8 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 rounded-2xl w-full cursor-pointer shadow-lg group"
        >
            <div className="flex justify-between items-start w-full">
                <div className="flex flex-col">
                    <h1 className="text-xl md:text-xl font-bold text-white mb-1 tracking-tight drop-shadow-md group-hover:text-yellow-500 transition-colors">{company}</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <FaCode className="text-yellow-500 w-5 h-5 drop-shadow-md" />
                        <p className="text-lg md:text-lg text-white font-medium drop-shadow-md">{role}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-4 text-sm md:text-md text-gray-300 drop-shadow-md">
                        <span className="bg-white/10 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white border border-white/10 shadow-inner">
                            {jobType}
                        </span>
                        <span className="text-gray-400 font-light">{duration}</span>
                    </div>
                </div>

                {/* Chevron icon */}
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors shadow-inner flex items-center justify-center shrink-0">
                    <HiOutlineChevronDoubleDown
                        size={22}
                        className={`text-white transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isExpanded ? "rotate-180" : "rotate-0"}`}
                    />
                </div>
            </div>

            {/* Description Dropdown */}
            <div
                className={`w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isExpanded ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"}`}
            >
                <div className="border-t border-white/10 pt-6">
                    <p className="text-md md:text-md text-gray-300 leading-relaxed font-light">
                        {description || "Focused on building reliable, scalable systems and intuitive interfaces. Successfully contributed to full-stack features, improved architectural performance, and collaborated across teams to deliver high-quality products."}
                    </p>
                </div>
            </div>
        </div>
    );
}