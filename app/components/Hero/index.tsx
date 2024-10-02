"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import Particles from "../particles";
import { useRef, useState, useEffect } from "react";
import Magnetic from "@/app/common/Magnetic";
import Link from "next/link";
import MyCard from "@/app/components/MyCard";

const navigation = [
	{ name: "Projects", href: "projects" },
	{ name: "Experiences", href: "experiences" },
	{ name: "Tools", href: "/tools" },
	{ name: "Contact", href: "contacts" },
];

export default function Hero() {
	const [render, setRender] = useState(false);
	const ref = useRef(null);
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [0, -600]);
	const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
	const y4 = useTransform(scrollYProgress, [0, 1], [0, -200]);
	const y6 = useTransform(scrollYProgress, [0, 1], [0, -700]);

	// Delay the MyCard component until the page is fully loaded
	useEffect(() => {
		setTimeout(() => setRender(true), 200);
	}, []);

	return (
		<div
			id="home"
			className="flex flex-col items-center justify-center w-full h-[100dvh]"
			ref={ref}
		>
			{/* <div className="absolute hidden lg:block top-0 h-full w-full overflow-x-hidden bg-transparent">
				{render && <MyCard />}
			</div> */}
			<nav className="pb-6 md:pb-0 md:my-16 animate-fade-in">
				<ul className="flex items-center justify-center gap-2 md:gap-6">
					{navigation.map((item, index) => (
						<Magnetic key={index}>
							<li>
								{item.href.includes("/") ? (
									<Link
										href={`${item.href}`}
										className="cursor-pointer block text-sm duration-500 p-2 text-zinc-600 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300"
									>
										{item.name}
									</Link>
								) : (
									<ScrollLink
										to={`${item.href}`}
										smooth={true}
										duration={1200}
										offset={100}
										className="cursor-pointer block text-sm duration-500 p-2 text-zinc-600 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300"
									>
										{item.name}
									</ScrollLink>
								)}
							</li>
						</Magnetic>
					))}
				</ul>
			</nav>
			<div className="hidden w-full animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in !w-[98%]"
				quantity={150}
			/>
			<motion.h1
				style={{ y: y2 }}
				className="z-10 font-tel text-6xl text-transparent duration-400 bg-black dark:bg-white animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text"
			>
				<motion.span className="linear-wipe-fir lowercase">E</motion.span>
				<motion.span>M</motion.span>
				<motion.span>J</motion.span>
				<motion.span>A</motion.span>
				<motion.span>Y</motion.span>
			</motion.h1>
			<div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<div className="invisible md:visible flex gap-3 md:mt-12 mb-0 text-center duration-700 animate-fade-in">
				<motion.p
					style={{ y: y2 }}
					className="linear-wipe-sec text-sm md:text-xl font-bold"
				>
					Design.
				</motion.p>
				<motion.p
					style={{ y: y4 }}
					className="linear-wipe-thr text-sm md:text-xl font-bold"
				>
					Develop.
				</motion.p>
				<motion.p
					style={{ y: y6 }}
					className="linear-wipe-for text-sm md:text-xl font-bold"
				>
					Create.
				</motion.p>
			</div>
			<div className="mb-8 mt-4 text-center animate-fade-in">
				<h2 className="text-sm text-zinc-500">Keep it simple.</h2>
			</div>
		</div>
	);
}
