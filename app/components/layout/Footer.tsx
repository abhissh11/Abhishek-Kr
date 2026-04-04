import Link from "next/link";
import { IoMail } from "react-icons/io5";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="flex items-center justify-center px-4 py-8 md:px-40 bg-zinc-900">
            <div className="flex flex-col items-center justify-center">
                <Link href="mailto:abhishekkr.ssh@gmail.com" target="_blank">
                    <button className="flex items-center gap-2 text-white drop-shadow-2xl cursor-pointer px-6 py-3 hover:scale-105 transition-all duration-300 bg-white/10 rounded-2xl"><IoMail size={24} /> Get in touch</button>
                </Link>
                <p className="text-md text-white mt-4">© {year} Abhishek Kumar. All rights reserved.</p>
            </div>
        </footer>
    );
}