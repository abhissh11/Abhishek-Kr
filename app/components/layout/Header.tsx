"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Scroll to contact if hash exists on mount/navigation
        if (typeof window !== "undefined" && window.location.hash === "#contact") {
            setTimeout(() => {
                const elem = document.getElementById("contact");
                if (elem) {
                    elem.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
    }, [pathname]);

    if (pathname?.startsWith("/admin")) {
        return null;
    }

    const handleLetsTalkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMenuOpen(false);

        if (pathname === "/") {
            const contactElem = document.getElementById("contact");
            if (contactElem) {
                contactElem.scrollIntoView({ behavior: "smooth" });
            } else {
                window.location.hash = "contact";
            }
        } else {
            router.push("/#contact");
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 border border-neutral-800/80 backdrop-blur-md text-white w-[calc(100%-2rem)] max-w-5xl mx-auto my-4 md:my-5 px-6 md:px-8 py-2.5 rounded-full flex justify-between items-center shadow-xl transition-all duration-300">



            {/* Left Side: Logo/Brand Name */}
            <div className="text-xl font-bold tracking-tight text-white hover:text-neutral-300 transition-colors">
                <Link href="/" className="flex items-center gap-1">
                    <span className="font-sans" suppressHydrationWarning>Abhishek Kumar</span>
                </Link>

            </div>

            {/* Middle: Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-300">
                <Link
                    href="/"
                    className={`hover:text-white transition-colors ${pathname === "/" ? "text-white font-semibold" : ""
                        }`}
                >
                    Home
                </Link>
                <Link
                    href="/work"
                    className={`hover:text-white transition-colors ${pathname === "/work" ? "text-white font-semibold" : ""
                        }`}
                >
                    Work
                </Link>
                <Link
                    href="/blogs"
                    className={`hover:text-white transition-colors ${pathname?.startsWith("/blogs") ? "text-white font-semibold" : ""
                        }`}
                >
                    Blogs
                </Link>
            </nav>

            {/* Right Side: Let's Talk CTA Button */}
            <div className="hidden md:flex items-center">
                <button
                    onClick={handleLetsTalkClick}
                    className="bg-white hover:bg-neutral-200 text-neutral-950 font-semibold px-5 py-2 rounded-full text-sm transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                    Let&apos;s Talk
                </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white hover:text-neutral-300 transition-colors focus:outline-none p-1"
                    aria-label="Toggle mobile menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay Drawer */}
            <div
                className={`absolute top-full left-0 right-0 mt-3 bg-neutral-900/95 border border-neutral-800 backdrop-blur-2xl rounded-3xl p-6 transition-all duration-300 origin-top shadow-2xl md:hidden flex flex-col gap-4 ${isMenuOpen
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible pointer-events-none"
                    }`}
            >
                <ul className="flex flex-col space-y-3 text-left text-base font-medium text-neutral-300">
                    <li>
                        <Link
                            href="/"
                            className={`block p-2.5 rounded-xl transition-colors hover:bg-neutral-800 ${pathname === "/" ? "bg-neutral-800 text-white" : ""}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/work"
                            className={`block p-2.5 rounded-xl transition-colors hover:bg-neutral-800 ${pathname === "/work" ? "bg-neutral-800 text-white" : ""}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/blogs"
                            className={`block p-2.5 rounded-xl transition-colors hover:bg-neutral-800 ${pathname?.startsWith("/blogs") ? "bg-neutral-800 text-white" : ""}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Blogs
                        </Link>
                    </li>
                </ul>

                <button
                    onClick={handleLetsTalkClick}
                    className="w-full bg-white hover:bg-neutral-200 text-neutral-950 font-semibold py-3 rounded-2xl text-center text-sm transition-all shadow-md cursor-pointer mt-1"
                >
                    Let&apos;s Talk
                </button>
            </div>
        </header>
    );
}