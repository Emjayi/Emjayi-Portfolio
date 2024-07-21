"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Particles from "./components/particles";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "./components/Preloader";
import Magnetic from "./common/Magnetic";
import { ThemeSwitcher } from "./components/theme-switcher";
import { ThemeProvider } from "./theme-provider";
import ParticlesLight from "./components/particles-light";
import Projects from "./components/projects";
import Lenis from "lenis";
import Footer from "./components/Footer";
import { Link as ScrollLink } from "react-scroll";
import Hero from "./components/Hero";

export default function Home() {
	useEffect(() => {
		const lenis = new Lenis();
		function raf(time: any) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
	}, []);

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
					</div>
				</div>
			</div>
			<Footer />
		</ThemeProvider>
	);
}
