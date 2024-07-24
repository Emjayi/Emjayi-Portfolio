'use client'
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../components/theme-switcher";
import { ThemeProvider } from "../theme-provider";
import Link from "next/link";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import Particles from "../components/particles";
import ParticlesLight from "../components/particles-light";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pageName = usePathname().split("/")[1];
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <ThemeSwitcher />
            <section className="w-[100dw]">
                <div id="home" className="h-96 bg-zinc-600/10 text-zinc-900 dark:text-white flex flex-col gap-4 justify-center items-center" style={{ backgroundImage: "" }}>
                    <h1 className="text-6xl capitalize">{pageName}</h1>
                    {/* <ParticlesLight
                        className="absolute dark:invisible inset-0 -z-10 animate-fade-in"
                        quantity={1200}
                    />
                    <Particles
                        className="absolute inset-0 -z-10 animate-fade-in"
                        quantity={1200}
                    /> */}
                    <Link href="/" className="flex capitalize hover:text-zinc-500 dark:hover:text-zinc-400 duration-300"><ArrowLeft width={18} /><p>back to home</p></Link>
                </div>
                {children}
                <Footer />
            </section>
        </ThemeProvider >
    );
}