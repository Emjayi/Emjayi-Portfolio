"use client"
import { ArrowLeft } from "lucide-react";
import { ThemeProvider } from "next-themes";
import Footer from "../components/Footer";
import { ThemeSwitcher } from "../components/theme-switcher";
import Link from "next/link";
import { HoverBorderGradient } from "../ui/Hover-Border-Gradient";
import Particles from "../components/particles";
import ParticlesLight from "../components/particles-light";

export default function Page() {
    return (
        <>
            <div id="home" className="h-96  flex flex-col gap-4 justify-center items-center" style={{ backgroundImage: "" }}>
                <h1 className="text-6xl capitalize">Tools</h1>
                <Link href="/" className="flex capitalize hover:text-zinc-500 dark:hover:text-zinc-400 duration-300"><ArrowLeft width={18} /> <p>back to home</p></Link>
            </div>
            <div className="flex flex-wrap justify-center w-full px-[10%] pb-[10%] gap-5">
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">To-Do List</p></HoverBorderGradient>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Calculator</p></HoverBorderGradient>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Weather Widget</p></HoverBorderGradient>
                <Link href="/tools/pass-gen"><HoverBorderGradient className=" py-4 px-8 inline"><p className="">Password Generator</p></HoverBorderGradient></Link>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Image Compressor</p></HoverBorderGradient>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">String splitter</p></HoverBorderGradient>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Random Quote Generator</p></HoverBorderGradient>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Currency Converter</p></HoverBorderGradient>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Expense Tracker</p></HoverBorderGradient>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Image Carousel</p></HoverBorderGradient>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Markdown Previewer</p></HoverBorderGradient>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Pomodoro Timer</p></HoverBorderGradient>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Trivia Quiz</p></HoverBorderGradient>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Recipe Finder</p></HoverBorderGradient>
                <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Movie Search</p></HoverBorderGradient>
            </div>
            <Footer />
        </>
    );
}