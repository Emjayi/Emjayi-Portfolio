"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Magnetic from "../common/Magnetic";


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
        <Magnetic>
            <button
                className={`w-fit text-zinc-700 dark:text-zinc-400 absolute right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 animate-fade-in`}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                {theme === "light" ? "Dark" : "Light"}
            </button>
        </Magnetic>

    );
};
