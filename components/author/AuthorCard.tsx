"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, Mail } from "lucide-react";

export default function AuthorCard() {
  return (
    <div className="w-full bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-md relative overflow-hidden group">
      {/* Glow Effect Accent */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/20 transition-all duration-500"></div>

      {/* Left Column: Avatar & Details */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-5 relative z-10">
        {/* Author Photo */}
        <div className="relative shrink-0">
          <Image
            src="/images/abhishek.png"
            alt="Abhishek Kumar"
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-2 ring-orange-500 ring-offset-4 ring-offset-zinc-900 shadow-xl transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Info Text */}
        <div className="flex flex-col space-y-1">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Abhishek Kumar
          </h3>
          <p className="text-xs md:text-sm text-neutral-400 font-medium">
            Software Engineer, Writer &amp; Learner for life.
          </p>

          {/* Email */}
          <a
            href="mailto:abhishekkr.ssh@gmail.com"
            className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-mono transition-colors pt-1 justify-center sm:justify-start"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>abhishekkr.ssh@gmail.com</span>
          </a>
        </div>
      </div>

      {/* Right Column: Follow Along Button */}
      <div className="shrink-0 relative z-10">
        <Link
          href="https://x.com/abhishekkr_ssh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-neutral-950 font-bold text-sm transition-all duration-300 shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Send className="w-4 h-4 text-neutral-950 fill-neutral-950" />
          <span>Follow along</span>
        </Link>
      </div>
    </div>
  );
}
