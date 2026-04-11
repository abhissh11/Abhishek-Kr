import Image from "next/image";

export default function BookCard({ title, author, image, genre }: { title: string, author: string, image: string, genre: string }) {
    return (
        <div className="relative group overflow-hidden rounded-xl w-full aspect-[2/3] bg-zinc-800 shadow-xl">
            <Image
                src={image ? image : "/images/book.jpeg"}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
                            opacity-100 md:opacity-0 md:group-hover:opacity-100 
                            transition-opacity duration-300 ease-in-out"></div>

            {/* Text content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col gap-1
                            opacity-100 translate-y-0 
                            md:opacity-0 md:translate-y-6 
                            md:group-hover:opacity-100 md:group-hover:translate-y-0 
                            transition-all duration-300 ease-out">
                {genre && <span className="hidden md:block text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">{genre}</span>}
                <h2 className="text-lg md:text-xl font-bold text-white leading-snug drop-shadow-lg">
                    {title}
                </h2>
                <p className="text-sm md:text-base text-zinc-300 drop-shadow-lg">
                    {author}
                </p>
            </div>
        </div>
    )
}