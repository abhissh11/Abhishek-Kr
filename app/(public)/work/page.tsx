import WorkCard from "@/app/components/work/WorkCard";

const work = [
    {
        title: "Calqus - EdTech Platform",
        description: "Calqus is an EdTech platform that provides online courses and educational resources to students along with AI-powered tools to enhance their learning experience.",
        image: "",
        link: "https://calqus.in"
    },
    {
        title: "Psychemasters - Mental Health Platform",
        description: "Psychemasters is an AI-powered mental health platform that provides online therapy and mental health resources to users.",
        image: "/images/work.jpg",
        link: "https://psychemastersindia.in"
    },
    {
        title: "Calqus - EdTech Platform",
        description: "VFeed is a social media platform where users can follow each other, engage by sharing, commenting, and liking posts.",
        image: "/images/work.jpg",
        link: "https://abhishekk.in"
    },
    {
        title: "Calqus - EdTech Platform",
        description: "VFeed is a social media platform where users can follow each other, engage by sharing, commenting, and liking posts.",
        image: "/images/work.jpg",
        link: "https://abhishekk.in"
    },
]

export default function page() {
    return (
        <main className="min-h-screen px-4 py-20 md:px-40 bg-zinc-900">
            <div className="my-10 flex flex-col items-start justify-center">
                <h1 className=" text-xl font-serif md:text-2xl font-bold text-white mb-4 drop-shadow-2xl">Featured Work :</h1>
                <p className="text-sm md:text-base flex gap-2 text-zinc-300 drop-shadow-2xl">
                    I build systems that don’t just work, but scale - turning ideas into real products, from social platforms to practical tools, while constantly refining my craft. Showcasing some of my work below.</p>
            </div>
            <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                {work.map((w, i) => (
                    <WorkCard key={i} title={w.title} description={w.description} image={w.image} link={w.link} />
                ))}
            </div>
        </main>
    )
}

