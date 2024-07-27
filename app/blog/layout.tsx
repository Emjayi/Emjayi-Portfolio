'use client'
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../components/theme-switcher";
import { ThemeProvider } from "../theme-provider";
import Link from "next/link";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import Particles from "../components/particles";
import ParticlesLight from "../components/particles-light";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { opacity } from "../components/Preloader/anim";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pageName = usePathname().split("/")[1];
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref
    })
    const s = useTransform(scrollYProgress, [0, 1], [180, -500])
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <ThemeSwitcher />
            <section className="w-[100dw]">
                <div id="home" className="h-64 overflow-hidden bg-zinc-600/10 text-zinc-900 dark:text-white flex flex-col gap-4 justify-center items-center" style={{ backgroundImage: "" }}>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ y: s }}
                        ref={ref}
                        className="text-6xl capitalize">{pageName}</motion.h1>
                    {/* <ParticlesLight
                        className="absolute dark:invisible inset-0 -z-10 animate-fade-in"
                        quantity={1200}
                    />
                    <Particles
                        className="absolute inset-0 -z-10 animate-fade-in"
                        quantity={1200}
                    /> */}
                    <motion.div
                        style={{ y: s }}
                        ref={ref}><Link href="/" className="flex capitalize hover:text-zinc-500 dark:hover:text-zinc-400 duration-300"><ArrowLeft width={18} /><p>back to home</p></Link></motion.div>
                </div>
                <div className="bg-[#EDEDEE] dark:bg-[#080809]">

                    {children}
                </div>
                <Footer />
            </section>
        </ThemeProvider >
    );
}