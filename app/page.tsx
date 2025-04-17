"use client"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import Preloader from "@/app/components/Preloader"
import { ThemeSwitcher } from "@/app/components/theme-switcher"
import { ThemeProvider } from "./theme-provider"
import Projects from "@/app/components/Main/projects"
import Footer from "@/app/components/Footer"
import Hero from "@/app/components/Main/Hero"
import Tools from "@/app/components/Tools"
import Experience from "@/app/components/Main/Experience"
import About from "./components/About"
import Head from "next/head"
import Script from "next/script"

export default function Home() {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		; (async () => {
			setTimeout(() => {
				setIsLoading(false)
				document.body.style.cursor = "default"
				window.scrollTo(0, 0)
			}, 2000)
		})()
	}, [])

	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<Script
				id="structured-data-person"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Person",
						name: "Emjay Sepahi",
						url: "https://emjaysepahi.com",
						jobTitle: "Full-Stack Developer & Designer",
						knowsAbout: ["Web Development", "UI/UX Design", "JavaScript", "React", "Next.js"],
						sameAs: [
							"https://github.com/Emjayi/",
							"https://www.linkedin.com/in/emjayi/",
							"https://x.com/emjayi_/",
							"https://www.instagram.com/emjayi_/",
							"https://discordapp.com/users/652215998476320787/",
						],
					}),
				}}
			/>

			<div>
				<>
					<AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
				</>
				<div className="overflow-clip bg-gradient-to-tl from-white via-zinc-300/50 to-white dark:from-black dark:via-zinc-600/20 dark:to-black">
					<Hero />
					<div className="">
						<About />
						<Projects />
						<Tools />
						<Experience />
					</div>
				</div>
			</div>
			<Footer />
		</ThemeProvider>
	)
}
