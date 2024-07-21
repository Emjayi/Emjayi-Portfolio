'use client'
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "../components/theme-switcher";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <ThemeProvider attribute="class" defaultTheme="system">
                <ThemeSwitcher />
                {children}
            </ThemeProvider>
        </section>
    );
}