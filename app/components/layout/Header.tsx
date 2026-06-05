"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md text-white max-w-[90%] md:max-w-[75%] mx-auto my-6 px-4 md:px-6 py-2 hover:scale-[0.98] transition-all duration-300 rounded-2xl flex justify-between items-center drop-shadow-md">
            {/* Left Side: Logo/Name */}
            <div className="text-xl md:text-2xl font-bold tracking-normal cursor-pointer hover:text-gray-200 transition-colors">
                <Link href="/"><span className="font-serif">Abhishek.</span></Link>
            </div>

            {/* Right Side: Navigation */}
            <nav className="flex items-center">
                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-6 md:space-x-10 text-lg font-medium">
                    <li className="hover:bg-black/10 p-2 rounded-md transition-colors">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="hover:bg-black/10 p-2 rounded-md transition-colors">
                        <Link href="/work">Work</Link>
                    </li>
                    <li className="hover:bg-black/10 p-2 rounded-md transition-colors">
                        <Link href="/blogs">Blogs</Link>
                    </li>


                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white hover:text-gray-300 transition-colors focus:outline-none p-1 ml-4"
                        aria-label="Toggle mobile menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`absolute top-full left-0 right-0 mt-4 bg-black/60 border border-white/20 backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 origin-top shadow-2xl md:hidden flex flex-col ${isMenuOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'}`}>
                <ul className="flex flex-col space-y-4 text-center text-lg font-medium">
                    <li>
                        <Link href="/" className="block hover:bg-white/10 p-2 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    </li>
                    <li>
                        <Link href="/work" className="block hover:bg-white/10 p-2 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Work</Link>
                    </li>
                    <li>
                        <Link href="/blogs" className="block hover:bg-white/10 p-2 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
                    </li>


                </ul>
            </div>
        </header>
    );
}