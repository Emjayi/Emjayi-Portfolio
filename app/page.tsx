"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/app/components/Preloader";
import { ThemeSwitcher } from "@/app/components/theme-switcher";
import { ThemeProvider } from "./theme-provider";
import Projects from "@/app/components/projects";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import Tools from "@/app/components/Tools";
import Experience from "@/app/components/Experience";

export default function Home() {

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			setTimeout(() => {
				setIsLoading(false);
				document.body.style.cursor = "default";
				window.scrollTo(0, 0);
			}, 2000);
		})();
	}, []);

	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<ThemeSwitcher />
			<div>
				<>
					<AnimatePresence mode="wait">
						{isLoading && <Preloader />}
					</AnimatePresence>
				</>
				<div className="overflow-clip bg-gradient-to-tl from-white via-zinc-300/50 to-white dark:from-black dark:via-zinc-600/20 dark:to-black">
					<Hero />
					<div className="">
						<h2 className="w-full text-md text-center uppercase -mb-12 bold">
							Latest Projects
						</h2>
						<Projects />
						<Tools />
						<Experience />
					</div>
				</div>
			</div>
			<Footer />
		</ThemeProvider>
	);
}
