"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";


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
            className={`w-fit absolute right-5 top-2 rounded-md animate-fade-in text-md duration-500 p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <h1 className="hidden dark:block"><span className="text-zinc-500">Mode: </span>Light</h1>
            <h1 className=" dark:hidden"><span className="text-zinc-500">Mode: </span>Dark</h1>
        </button>
    );
};
