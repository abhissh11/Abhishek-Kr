import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";

export default function WorkCard({ title, description, image, link }: { title: string, description: string, image: string, link: string }) {

    return (
        <>
            <div className="group flex flex-col gap-4 bg-zinc-800/40 hover:bg-zinc-800/80 border border-white/5 p-5 rounded-3xl transition-all duration-500 shadow-xl overflow-hidden backdrop-blur-sm">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-xl font-semibold text-zinc-100 tracking-tight">{title}</h2>
                    <Link href={link} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all duration-300">
                        <LuArrowUpRight size={20} className="group-hover:rotate-45 group-hover:text-yellow-500 transition-transform duration-300" />
                    </Link>
                </div>

                <div className="relative w-full overflow-hidden rounded-2xl aspect-[16/10] border border-white/10 mx-auto">
                    <Image
                        src={image ? image : "/images/work.jpg"}
                        alt="Work"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                <div className="px-1 mt-1">
                    <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </>
    )
}