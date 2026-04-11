import BookCard from "@/app/components/books/BookCard"


export default function page() {
    const books = [
        {
            title: "The Pragmatic Programmer",
            author: "Andrew Hunt and David Thomas",
            image: "/images/book.jpeg",
            genre: "Software Development"
        },
        {
            title: "The Pragmatic Programmer",
            author: "Andrew Hunt and David Thomas",
            image: "/images/book.jpeg",
            genre: "Software Development"
        },
        {
            title: "The Pragmatic Programmer",
            author: "Andrew Hunt and David Thomas",
            image: "/images/book.jpeg",
            genre: "Software Development"

        },
        {
            title: "The Pragmatic Programmer",
            author: "Andrew Hunt and David Thomas",
            image: "/images/book.jpeg",
            genre: "Software Development"

        },
    ]
    return (
        <main className="min-h-screen px-4 py-20 md:px-40 bg-zinc-900">
            <div className="my-10 flex flex-col items-start justify-center">
                <h1 className=" text-xl font-serif md:text-2xl font-bold text-white mb-4 drop-shadow-2xl">Books :</h1>
                <p className="text-sm md:text-base flex gap-2 text-zinc-300 drop-shadow-2xl">I love reading books and I believe that reading is a great way to learn new things and expand your knowledge. Here are some of the books that I have read and enjoyed.</p>
            </div>
            <div className="my-10 grid grid-cols-2 md:grid-cols-3 gap-8">
                {books.map((book, i) => (
                    <BookCard key={i} title={book.title} author={book.author} image={book.image} genre={book.genre} />
                ))}
            </div>
        </main>
    )
}