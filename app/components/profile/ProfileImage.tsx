"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfileImage() {
  const [isTapped, setIsTapped] = useState(false);

  return (
    <div 
      className="relative cursor-pointer group flex justify-center items-center"
      onClick={() => setIsTapped(!isTapped)}
    >
      {/* Default Image */}
      <Image
        src="/images/abhishek.png"
        alt="Abhishek"
        width={200}
        height={200}
        className={`rounded-full shadow-2xl object-cover aspect-square max-w-[80%] md:max-w-md ring-2 ring-yellow-500 ring-offset-8 ring-offset-zinc-900 transition-opacity duration-500 ${
          isTapped ? 'opacity-0' : 'group-hover:opacity-0 opacity-100'
        }`}
        priority
      />
      
      {/* Black & White Image */}
      <Image
        src="/images/abhishek-bw.png"
        alt="Abhishek B&W"
        width={200}
        height={200}
        className={`rounded-full shadow-2xl object-cover aspect-square max-w-[80%] md:max-w-md ring-2 ring-yellow-500 ring-offset-8 ring-offset-zinc-900 absolute top-0 transition-opacity duration-500 ${
          isTapped ? 'opacity-100' : 'group-hover:opacity-100 opacity-0'
        }`}
        priority
      />
    </div>
  );
}
