import Image from "next/image";
import Link from "next/link";
import { CiCalendarDate, CiRead } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";


export default function BlogCard({ title, content, image, link, category }: { title: string, content: string, image: string, link: string, category: string }) {
    return (
        <>
            <Link href={link}>
                <div className="border-b border-zinc-700 flex flex-col md:flex-row gap-4 rounded-lg p-4 hover:bg-zinc-800 transition-all duration-300 cursor-pointer">
                    <div className="">
                        <Image src={image ? image : "/images/work.jpg"} alt={title} width={500} height={500} className="w-full h-48 object-cover rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
                            <p className="text-zinc-300 mb-4">{content}</p>
                        </div>
                        <div className="flex gap-4">
                            <p className="text-zinc-500 flex items-center gap-2"><span><CiCalendarDate size={20} /></span>11 April 2026</p>
                            <p className="text-zinc-500 flex items-center gap-2"><span><CiRead size={20} /></span>1.2k Views</p>
                            <p className="text-zinc-500 flex items-center gap-2"><span><IoMdTime size={20} /></span>2 mins read</p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}