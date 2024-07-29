"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import Particles from "../particles";
import ParticlesLight from "../particles-light";
import { useRef } from "react";
import Magnetic from "@/app/common/Magnetic";
import Link from "next/link";

const navigation = [
	{ name: "Projects", href: "projects" },
	{ name: "Experiences", href: "experiences" },
	{ name: "Blog", href: "/blog" },
	{ name: "Tools", href: "/tools" },
	{ name: "Contact", href: "contacts" },
];

export default function Hero() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [0, -600]);
	const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
	const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
	const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
	const y4 = useTransform(scrollYProgress, [0, 1], [0, -200]);
	const y5 = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const y6 = useTransform(scrollYProgress, [0, 1], [0, -700]);
	const y7 = useTransform(scrollYProgress, [0, 1], [0, -800]);

	return (
		<div
			id="home"
			className=" flex flex-col items-center justify-center w-screen h-[100dvh]"
			ref={ref}
		>
			<nav className="pb-6 md:pb-0 md:my-16 animate-fade-in">
				<ul className="flex items-center justify-center gap-2 md:gap-6">
					{navigation.map((item, index) => (
						<Magnetic key={index}>
							<li>
								{item.href.includes("/") ? (<Link
									href={`${item.href}`}
									className=" cursor-pointer block text-sm duration-500 p-2 text-zinc-600 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300"
								>
									{item.name}
								</Link>) : (<ScrollLink
									to={`${item.href}`}
									smooth={true}
									duration={1200}
									offset={100}
									className=" cursor-pointer block text-sm duration-500 p-2 text-zinc-600 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300"
								>
									{item.name}
								</ScrollLink>)}
							</li>
						</Magnetic>
					))}
				</ul>
			</nav>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			{/* <ParticlesLight
				className="absolute dark:invisible inset-0 -z-10 animate-fade-in"
				quantity={300}
			/> */}
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={300}
			/>
			<motion.h1
				style={{ y: y2 }}
				className="z-10 font-tel text-6xl text-transparent duration-400 bg-black dark:bg-white animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text"
			>
				<motion.span className=" linear-wipe-fir lowercase">E</motion.span>
				<motion.span >M</motion.span>
				<motion.span >J</motion.span>
				<motion.span >A</motion.span>
				<motion.span >Y</motion.span>
			</motion.h1>

			<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<div className="invisible md:visible flex gap-3 md:mt-12 mb-0 text-center duration-700 animate-fade-in">
				<motion.h3
					style={{ y: y2 }}
					className="linear-wipe-sec text-sm md:text-xl font-bold"
				>
					Design.
				</motion.h3>
				<motion.h3
					style={{ y: y4 }}
					className="linear-wipe-thr text-sm md:text-xl font-bold"
				>
					Develop.
				</motion.h3>
				<motion.h3
					style={{ y: y6 }}
					className="linear-wipe-for text-sm md:text-xl font-bold"
				>
					Create.
				</motion.h3>
			</div>
			<div className="mb-8 mt-4 text-center animate-fade-in">
				<h3 className="text-sm text-zinc-500 ">Keep it simple.</h3>
			</div>
		</div>
	);
}
