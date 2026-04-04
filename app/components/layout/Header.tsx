"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);

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

                    {/* Hoverable Dropdown for "More" */}
                    <li className="relative group cursor-pointer py-2 border-b-2 border-transparent">
                        <div className="hover:text-gray-300 transition-colors flex items-center gap-1">
                            More
                            <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[120px]">
                            <ul className="flex flex-col bg-black/70 backdrop-blur-md rounded-lg p-2 border border-white/20 shadow-xl">
                                <li>
                                    <Link href="/books" className="block px-4 py-2 hover:bg-white/20 rounded-md transition-colors whitespace-nowrap">
                                        Books
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/movies" className="block px-4 py-2 hover:bg-white/20 rounded-md transition-colors whitespace-nowrap">
                                        Movies
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/life" className="block px-4 py-2 hover:bg-white/20 rounded-md transition-colors whitespace-nowrap">
                                        Life
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white hover:text-gray-300 transition-colors focus:outline-none p-1 ml-4"
                        aria-label="Toggle mobile menu"
                    >
                        {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
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

                    {/* Mobile Dropdown for "More" */}
                    <li className="flex flex-col items-center">
                        <button
                            onClick={() => setIsMoreOpen(!isMoreOpen)}
                            className="flex items-center justify-center gap-1 hover:bg-white/10 p-2 w-full rounded-md transition-colors focus:outline-none"
                        >
                            More
                            <svg className={`w-4 h-4 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Mobile Sub-menu */}
                        <div className={`flex flex-col w-full overflow-hidden transition-all duration-300 ${isMoreOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <Link href="/books" className="block text-gray-300 hover:text-white hover:bg-white/10 p-2 mt-2 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Books</Link>
                            <Link href="/movies" className="block text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Movies</Link>
                            <Link href="/life" className="block text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Life</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
    );
}