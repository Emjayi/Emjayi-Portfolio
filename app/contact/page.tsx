"use client";
import { Github, Linkedin, Mail, PhoneCall, Twitter } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { ThemeProvider } from "next-themes";

const socials = [
	{
		icon: <PhoneCall size={20} />,
		href: "tel:+989332643163",
		label: "Call me",
		handle: "emjay",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:mjs32841@gmail.com",
		label: "Email",
		handle: "mjs32841",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/emjayi",
		label: "Github",
		handle: "emjayi",
	},
	{
		icon: <Linkedin size={20} />,
		href: "https://www.linkedin.com/in/emjayi/",
		label: "LinkedIn",
		handle: "emjayi",
	},
];

export default function Example() {
	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-300/50 dark:via-zinc-900 to-zinc-900/0">
				<Navigation />
				<div className="container flex items-center justify-center min-h-screen px-4 mx-auto animate-fade-in-1">
					<div className="grid w-full grid-cols-1 gap-4 mx-auto mt-32 mb-12 sm:mb-0 sm:mt-0 sm:grid-cols-4 lg:gap-16">
						{socials.map((s) => (
							<Card>
								<Link
									href={s.href}
									target="_blank"
									className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
								>
									{/* <span
									className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-200 via-zinc-200/80 dark:from-zinc-500 dark:via-zinc-500/50 to-transparent"
									aria-hidden="true"
								/> */}
									<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full dark:text-zinc-200 text-zinc-800 dark:group-hover:text-white group-hover:text-black dark:group-hover:bg-zinc-900 dark:border-zinc-500 border-zinc-600 dark:bg-zinc-900 dark:group-hover:border-zinc-200 drop-shadow-orange">
										{s.icon}
									</span>{" "}
									<div className="z-10 flex flex-col items-center">
										<span className="lg:text-xl font-medium duration-150 xl:text-3xl dark:text-zinc-200 dark:group-hover:text-white font-sans">
											{s.handle}
										</span>
										<span className="mt-4 text-sm text-center duration-1000 dark:text-zinc-400 dark:group-hover:text-zinc-200">
											{s.label}
										</span>
									</div>
								</Link>
							</Card>
						))}
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}
