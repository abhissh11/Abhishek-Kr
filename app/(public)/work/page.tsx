import WorkCard from "@/app/components/work/WorkCard";

import { workData } from "@/lib/data";

export default function page() {
    return (
        <main className="min-h-screen px-4 py-20 md:px-40 bg-zinc-900">
            <div className="my-10 flex flex-col items-start justify-center">
                <h1 className=" text-xl font-serif md:text-2xl font-bold text-white mb-4 drop-shadow-2xl">Featured Work</h1>
                <p className="text-base md:text-lg flex gap-2 text-zinc-300 drop-shadow-2xl">
                    I build systems that don’t just work, but scale - turning ideas into real products, from Ed-tech Platforms, LMS-Platforms to Mental Health platforms, while constantly refining my craft. Showcasing some of my work below</p>
            </div>
            <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {workData.map((w, i) => (
                    <WorkCard key={i} title={w.title} description={w.description} image={w.image} link={w.link} />
                ))}
            </div>
        </main>
    )
}

