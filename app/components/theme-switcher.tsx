"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";


export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();


    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) {
        return null;
    }


    return (
        <button
            className={`w-fit fixed right-0 top-1 z-50 rounded-md animate-fade-in text-md duration-500 p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <div className="hidden dark:block"><Sun width={30} height={30} /></div>
            <h1 className=" dark:hidden"><Moon width={30} height={30} /></h1>
        </button>
    );
};
