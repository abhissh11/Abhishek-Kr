"use client";

import Link from "next/link";
import { IoMail } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    const year = new Date().getFullYear();
    return (

        <footer className="flex items-center justify-center px-4 py-8 md:px-40 bg-zinc-900">
            <div className="flex flex-col items-center justify-center">

                <p className="text-md text-white mt-4">© {year} Abhishek Kumar. All rights reserved.</p>
            </div>
        </footer>
    );
}