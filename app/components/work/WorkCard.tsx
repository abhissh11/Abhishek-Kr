import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";

export default function WorkCard({ title, description, image, link }: { title: string, description: string, image: string, link: string }) {

    return (
        <>
            <div className="group flex flex-col bg-zinc-800/40 hover:bg-zinc-800/80 border border-white/5 rounded-3xl transition-all duration-500 shadow-xl overflow-hidden backdrop-blur-sm">
                <div className="relative w-full overflow-hidden aspect-[16/10] border-b border-white/10">
                    <Image
                        src={image ? image : "/images/work.jpg"}
                        alt="Work"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                </div>

                <div className="flex flex-col p-5 gap-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-zinc-100 tracking-tight">{title}</h2>
                        <Link href={link} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all duration-300 shrink-0">
                            <LuArrowUpRight size={20} className="group-hover:rotate-45 group-hover:text-yellow-500 transition-transform duration-300" />
                        </Link>
                    </div>

                    <div>
                        <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}