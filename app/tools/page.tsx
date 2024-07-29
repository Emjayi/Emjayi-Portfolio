"use client"
import { ArrowLeft } from "lucide-react";
import { ThemeProvider } from "next-themes";
import Footer from "../components/Footer";
import { ThemeSwitcher } from "../components/theme-switcher";
import Link from "next/link";
import { HoverBorderGradient } from "../ui/Hover-Border-Gradient";
import Particles from "../components/particles";
import ParticlesLight from "../components/particles-light";
import { tools } from "@/content/data";

export default function Page() {
    return (
        <div className="flex flex-wrap justify-center w-full px-[10%] pb-[10%] gap-5">
            {tools.map((t, index) => (
                <Link key={index} href={`/tools/${t.href}`}><HoverBorderGradient className=" py-4 px-8 inline"><p className="">{t.name}</p></HoverBorderGradient></Link>
            ))}
        </div>
    );
}