"use client"
import BlogCard from "@/app/components/blogs/BlogCard"
import { useState } from "react"

export default function page() {
    const [activeCategory, setActiveCategory] = useState("All")
    const blogs = [
        {
            title: "Calqus - EdTech Platform",
            description: "Calqus is an EdTech platform that provides online courses and educational resources to students along with AI-powered tools to enhance their learning experience.",
            image: "/images/work.jpg",
            link: "https://calqus.in",
            category: "Technology"
        },
        {
            title: "Psychemasters - Mental Health Platform",
            description: "Psychemasters is an AI-powered mental health platform that provides online therapy and mental health resources to users.",
            image: "/images/work.jpg",
            link: "https://psychemastersindia.in",
            category: "Experiences"
        },
        {
            title: "Dead Poets Society - A Movie Review",
            description: "Dead Poets Society is a 1989 American drama film directed by Peter Weir, starring Robin Williams as John Keating, an unconventional English teacher who inspires his students to 'seize the day'.",
            image: "/images/work.jpg",
            link: "https://abhishekk.in",
            category: "Cinema"
        },
        {
            title: "Walkthrough of AI with Anthropic's Claude 4.5",
            description: "Walkthrough of AI with Anthropic's Claude 4.5",
            image: "/images/work.jpg",
            link: "https://abhishekk.in",
            category: "AI/ML"
        },
    ]

    const categories = [
        { name: "All" },
        { name: "Technology" },
        { name: "AI/ML" },
        { name: "Cinema" },
        { name: "Experiences" },
    ]

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category)
    }


    return (
        <main className="min-h-screen px-4 py-20 md:px-40 bg-zinc-900">
            <div className="my-10 flex flex-col items-start justify-center">
                <h1 className=" text-xl font-serif md:text-2xl font-bold text-white mb-4 drop-shadow-2xl">Blogs :</h1>
                <p className="text-sm md:text-base flex gap-2 text-zinc-300 drop-shadow-2xl">
                    I write about technology, software development, cinema and my experiences as a developer & human being. Here are some of my recent posts.</p>
            </div>
            <div className="my-10 flex gap-2 overflow-x-auto">
                {categories.map((cat, i) => (
                    <button key={i} onClick={() => handleCategoryClick(cat.name)} className={`px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${cat.name === activeCategory ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white"}`}>{cat.name}</button>
                ))}
            </div>
            <div className="my-10 grid grid-cols-1 gap-4">
                {blogs.filter((b) => b.category === activeCategory || activeCategory === "All").map((b, i) => (
                    <BlogCard key={i} title={b.title} content={b.description} image={b.image} link={b.link} category={b.category} />
                ))}
            </div>
        </main>
    )
}