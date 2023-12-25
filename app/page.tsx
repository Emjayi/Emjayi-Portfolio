'use client'
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-white via-zinc-300 to-white dark:from-black dark:via-zinc-600/20 dark:to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-600 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="z-10 text-6xl text-transparent duration-400 bg-black dark:bg-white cursor-default animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Emjayi
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="flex gap-3 mt-12 mb-0 text-center duration-700 animate-fade-in invisible md:visible">
        <h1 className='linear-wipe-fir'>Design.</h1>
        <h1 className="linear-wipe-sec">Develop.</h1>
        <h1 className="linear-wipe-thr">Create.</h1>
      </div>
      <div className="mb-8 mt-4 text-center animate-fade-in invisible md:visible">

        <h2 className="text-sm text-zinc-500 ">
          Keep it simple.
        </h2>
      </div>
    </div>
  );

}
