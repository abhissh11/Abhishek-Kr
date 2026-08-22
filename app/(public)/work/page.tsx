import { workData } from "@/lib/data";
import type { Metadata } from "next";
import WorkCard from "@/app/components/work/WorkCard";
import TimelineLine from "@/app/components/work/TimelineLine";
import AuthorCard from "@/components/author/AuthorCard";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Featured Work | Abhishek Kumar",
  description:
    "A selection of web applications, AI platforms, and software tools designed and engineered by Abhishek Kumar.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-16 md:pb-24 bg-zinc-900 w-full">
      <div className="w-[calc(100%-2rem)] max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="mb-14 flex flex-col items-start gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            <span className="text-orange-500 font-cursive text-5xl md:text-6xl">Featured work</span>{" "}
            &amp; real-world applications<span className="text-orange-500">.</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl">
            I build systems that don&apos;t just work, but scale — turning ideas into real products,
            from Ed-tech platforms to Mental Health platforms, while constantly refining my craft.
          </p>
        </div>

        {/* Timeline + Cards */}
        <div className="relative flex flex-col gap-10">

          {/* Scroll-driven orange progress line */}
          <TimelineLine />

          {workData.map((w, idx) => (
            <WorkCard
              key={idx}
              index={idx}
              title={w.title}
              description={w.description}
              image={w.image}
              link={w.link}
            />
          ))}
        </div>

        {/* Author Card */}
        <AnimatedSection direction="up" delay={100} className="mt-16">
          <AuthorCard />
        </AnimatedSection>

      </div>
    </main>
  );
}
