'use client'
import { ThemeProvider } from "next-themes";
import Particles from "../components/particles";
import ParticlesLight from "../components/particles-light";
import { ThemeSwitcher } from "../components/theme-switcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathName = usePathname()
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <ThemeSwitcher />
            <section className="w-[100dw] bg-zinc-600/10 text-zinc-900 dark:text-white">
                {!(pathName === "/tools") && <Link href="/tools" className="absolute top-0 mr-auto ml-auto text-center p-6 text-zinc-900 dark:text-white"><p className="uppercase">back</p></Link>}
                <ParticlesLight
                    className="absolute dark:invisible inset-0 -z-10 animate-fade-in"
                    quantity={300}
                />
                <Particles
                    className="absolute inset-0 -z-10 animate-fade-in"
                    quantity={300}
                />
                {children}
            </section >
        </ThemeProvider >
    );
}