'use client'
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../../components/theme-switcher";
import { ThemeProvider } from "../../theme-provider";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pageName = usePathname().split("/blog/")[1];
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <ThemeSwitcher />
            <section>
                <div className="h-96 bg-zinc-800/50 dark:bg-zinc-800/90 bg-blend-overlay text-white flex flex-col justify-center items-center" style={{ backgroundImage: "url('/products/3.jpg')" }}>
                    <h1 className="text-6xl capitalize">{pageName}</h1>
                    <Link href="/"><p>back to home</p></Link>
                </div>
                {children}
            </section>
        </ThemeProvider>
    );
}