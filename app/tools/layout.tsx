'use client'
import { ThemeProvider } from "next-themes";
import Particles from "../components/particles";
import ParticlesLight from "../components/particles-light";
import { ThemeSwitcher } from "../components/theme-switcher";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tools } from "@/content/data";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathName = usePathname()
    const tool = tools.find((t) => (`/tools/${t.href}` === pathName))
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <ThemeSwitcher />
            <section className="w-[100dw] bg-zinc-600/20 text-zinc-900 dark:text-white">
                {!(pathName === "/tools") && <Link href="/tools" className="absolute top-0 mr-auto ml-auto text-center p-6 text-zinc-900 dark:text-white"><p className="uppercase">back</p></Link>}
                {/* <ParticlesLight
                    className="absolute dark:invisible inset-0 -z-10 animate-fade-in"
                    quantity={100}
                />
                <Particles
                    className="absolute inset-0 -z-10 animate-fade-in"
                    quantity={100}
                /> */}
                {!(pathName === "/tools") &&
                    <div className='flex flex-col gap-3 justify-center items-center w-[100dw] h-[100dvh]'>
                        <h1 className='linear-wipe-for text-2xl font-bold'>{tool?.name}</h1>
                        <div className='flex flex-col gap-2 justify-center items-center p-6 bg-zinc-800 rounded-md text-white min-w-[80%] lg:min-w-[50%] min-h-[50%]'>
                            {children}
                        </div>
                    </div>}
                {(pathName === "/tools") &&
                    <>
                        {children}
                    </>
                }
            </section >
        </ThemeProvider >
    );
}