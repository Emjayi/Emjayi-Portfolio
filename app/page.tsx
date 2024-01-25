"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import LocalFont from "next/font/local";
import Particles from "./components/particles";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "./components/Preloader";
import Magnetic from "./common/Magnetic";
import { ThemeSwitcher } from "./components/theme-switcher";
import { ThemeProvider } from "./theme-provider";
import ParticlesLight from "./components/particles-light";
import { Inter } from "next/font/google";


const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];


export default function Home() {



  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeSwitcher />
      <div>
        <div className="">
          <AnimatePresence mode="wait">
            {isLoading && <Preloader />}
          </AnimatePresence>
        </div>
        <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-white via-zinc-300/50 to-white dark:from-black dark:via-zinc-600/20 dark:to-black">
          <nav className="my-16 animate-fade-in">
            <ul className="flex items-center justify-center gap-4">
              {navigation.map((item) => (
                <Magnetic>
                  <li key={item.name}>
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm duration-500 p-2 text-zinc-600 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                </Magnetic>
              ))}
            </ul>
          </nav>
          <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
          <ParticlesLight
            className="absolute dark:invisible inset-0 -z-10 animate-fade-in"
            quantity={100}
          />
          <Particles
            className="absolute inset-0 -z-10 animate-fade-in"
            quantity={100}
          />
          <h1 className='z-10 font-tel text-6xl text-transparent duration-400 bg-black dark:bg-white animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text'>
            eMJAY
          </h1>

          <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
          <div className="flex gap-3 mt-12 mb-0 text-center duration-700 animate-fade-in invisible md:visible">
            <h1 className="linear-wipe-fir text-xl font-bold">Design.</h1>
            <h1 className="linear-wipe-sec text-xl font-bold">Develop.</h1>
            <h1 className="linear-wipe-thr text-xl font-bold">Create.</h1>
          </div>
          <div className="mb-8 mt-4 text-center animate-fade-in invisible md:visible">
            <h2 className="text-sm text-zinc-500 ">Keep it simple.</h2>
          </div>
        </div>
      </div>
    </ThemeProvider>

  );
}
