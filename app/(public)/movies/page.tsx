

export default function page() {
    return (
        <main className="min-h-screen px-4 py-20 md:px-40 bg-zinc-900">
            <div className="my-10 flex flex-col items-start justify-center">
                <h1 className=" text-xl font-serif md:text-2xl font-bold text-white mb-4 drop-shadow-2xl">Movies :</h1>
                <p className="text-sm md:text-base flex gap-2 text-zinc-300 drop-shadow-2xl">I love watching movies and I believe that movies are a great way to learn new things and expand your knowledge. Here are some of the movies that I have watched and enjoyed.</p>
            </div>
            <div className="flex items-center justify-center">
                <p className="text-sm md:text-base flex gap-2 text-zinc-300 drop-shadow-2xl bg-zinc-800 p-4 rounded-lg">To be updated soon...</p>
            </div>
        </main>
    )
}