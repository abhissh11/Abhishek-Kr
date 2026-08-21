"use client";

import React, { useState } from "react";
import {
  Package,
  TrendingUp,
  Sparkles,
  Mail,
  ArrowRight,
  ChevronDown,
  FileText,
  Check,
  CheckCircle2,
  Loader2
} from "lucide-react";

import { DotPattern } from "@/components/ui/dot-pattern";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface OptionCard {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}

const cardOptions: OptionCard[] = [
  {
    id: "mvp",
    title: "Build an MVP",
    desc: "Ship the smallest real version",
    icon: Package,
  },
  {
    id: "improve",
    title: "Improve a product",
    desc: "Find friction and fix the flow",
    icon: TrendingUp,
  },
  {
    id: "ai",
    title: "Explore AI",
    desc: "Turn workflows into useful tools",
    icon: Sparkles,
  },
];

export default function ContactSection() {
  const [selectedOption, setSelectedOption] = useState<string>("mvp");
  const [email, setEmail] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          selectedOption,
          note,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setEmail("");
          setNote("");
        }, 5000);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getOptionLabel = (id: string) => {
    switch (id) {
      case "mvp":
        return "Build an MVP";
      case "improve":
        return "Improve a product";
      case "ai":
        return "Explore AI";
      case "something_else":
        return "Something else";
      default:
        return "What are we building?";
    }
  };

  return (
    <section id="contact" className="flex flex-col items-center justify-center py-20 bg-zinc-900 w-full relative overflow-hidden">
      <DotPattern />
      <div className="w-[calc(100%-2rem)] max-w-5xl mx-auto flex flex-col items-center gap-8 relative z-10">




        {/* Top 3 Interactive Cards */}
        <AnimatedSection direction="up" delay={50} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full relative z-10">
            {cardOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedOption === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-md ${isSelected
                    ? "bg-white/10 border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.15)] translate-y-[-2px]"
                    : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                    }`}
                >
                  {/* Icon Container */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 transition-colors ${isSelected
                      ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                      : "bg-white/5 border-white/10 text-white/70"
                      }`}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col pr-4">
                    <h3 className="text-base font-semibold text-white tracking-tight">
                      {opt.title}
                    </h3>
                    <p className="text-xs text-white/50 leading-snug mt-0.5">
                      {opt.desc}
                    </p>
                  </div>

                  {/* Selected Checkmark Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center shadow-md">
                      <Check size={12} className="text-white stroke-[3]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Visual Connecting Tree Lines */}
        <div className="hidden md:flex flex-col items-center w-full -my-3 z-0">
          <svg className="w-full h-16" viewBox="0 0 800 64" fill="none">
            {/* Left connector branch */}
            <path
              d="M 133 0 L 133 24 Q 133 36 145 36 L 388 36 Q 400 36 400 48 L 400 64"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />
            {/* Center connector branch */}
            <path
              d="M 400 0 L 400 64"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />
            {/* Right connector branch */}
            <path
              d="M 667 0 L 667 24 Q 667 36 655 36 L 412 36 Q 400 36 400 48 L 400 64"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />
            {/* Junction Node */}
            <circle cx="400" cy="36" r="3" fill="#18181b" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
          </svg>
        </div>

        <AnimatedSection direction="up" delay={150} className="w-full flex flex-col items-center gap-8">
          {/* Contact Badge */}
          <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 bg-white/5 shadow-md">
            <Sparkles className="text-orange-500" size={14} />
            <span className="text-xs font-semibold text-white/80 tracking-widest uppercase">
              CONTACT
            </span>
          </div>

          {/* Title & Description */}
          <div className="flex flex-col items-center text-center max-w-2xl gap-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-2xl">
              Let’s build <span className="text-orange-500 font-cursive text-5xl md:text-6xl">something real.</span>
            </h2>
            <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-lg">
              Tell me what you’re making, where it feels stuck, and what a useful first version should do.
            </p>
          </div>

          {/* Contact Form Box */}
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-black/40 border border-white/10 rounded-3xl p-5 md:p-6 shadow-2xl backdrop-blur-xl flex flex-col gap-4 mt-2">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white">Message Sent!</h3>
                <p className="text-sm text-white/60">
                  Thanks for reaching out! I’ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                {/* Row 1: Email + Submit Button */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-orange-500/50 transition-colors">
                    <Mail className="text-white/40 mr-3 shrink-0" size={18} />
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent w-full text-white placeholder-white/40 focus:outline-none text-sm md:text-base"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Send message"
                    className="p-3.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 shrink-0 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <ArrowRight size={20} />
                    )}
                  </button>
                </div>

                {/* Row 2: Select Field (What are we building?) */}
                <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-orange-500/50 transition-colors">
                  <Package className="text-white/40 mr-3 shrink-0" size={18} />
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="bg-transparent w-full text-white appearance-none focus:outline-none cursor-pointer text-sm md:text-base pr-8 font-normal"
                  >
                    <option value="mvp" className="bg-zinc-900 text-white">
                      Build an MVP
                    </option>
                    <option value="improve" className="bg-zinc-900 text-white">
                      Improve a product
                    </option>
                    <option value="ai" className="bg-zinc-900 text-white">
                      Explore AI
                    </option>
                    <option value="something_else" className="bg-zinc-900 text-white">
                      Something else
                    </option>
                  </select>
                  <ChevronDown className="absolute right-4 text-white/40 pointer-events-none" size={18} />
                </div>

                {/* Row 3: Textarea Field (Project note) */}
                <div className="relative flex flex-col bg-white/5 border border-white/10 rounded-2xl p-4 focus-within:border-orange-500/50 transition-colors">
                  <div className="flex items-center gap-2 mb-2 text-white/40">
                    <FileText size={18} />
                    <span className="text-sm">Project note</span>
                  </div>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value.slice(0, 300))}
                    placeholder="Tell me a bit about your idea..."
                    rows={3}
                    className="bg-transparent w-full text-white placeholder-white/30 focus:outline-none text-sm md:text-base resize-none"
                  />
                  <div className="text-right text-xs text-white/40 mt-1">
                    {note.length}/300
                  </div>
                </div>
              </>
            )}
          </form>
        </AnimatedSection>

        {/* Bottom Guarantee & Features */}
        <div className="flex flex-col items-center gap-4 mt-2">
          <p className="text-xs text-white/40 text-center">
            Replies within 24 hours. No spam, no sales funnel.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs text-white/70">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500" size={15} />
              <span>Focused reply</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 md:pl-8">
              <CheckCircle2 className="text-emerald-500" size={15} />
              <span>Clear next step</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 md:pl-8">
              <CheckCircle2 className="text-emerald-500" size={15} />
              <span>Useful first version</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
