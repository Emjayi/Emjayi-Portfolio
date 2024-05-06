"use client";
import Link from "next/link";
import { Navigation } from "../components/nav";
import Image from "next/image";
import { TextGenerateEffect } from "../ui/text-generator";
import { AnimatedTooltip } from "../ui/tooltip";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "../components/theme-switcher";


const tech = [
	{
		id: 0,
		name: "WordPress",
		designation: "Affordable",
		image:
			"/icons/wordpress.png",
	},
	{
		id: 1,
		name: "React",
		designation: "Capable",
		image:
			"/icons/react2.png"
	},
	{
		id: 2,
		name: "CSS",
		designation: "Design",
		image:
			"/icons/css.png"
	},
	{
		id: 3,
		name: "Javascript",
		designation: "Development",
		image:
			"/icons/javascript.png"
	},
	{
		id: 4,
		name: "Node js",
		designation: "Server",
		image:
			"/icons/nodejs.png"
	},
	{
		id: 5,
		name: "Next js",
		designation: "Create",
		image:
			"/icons/next-dark.png"
	},
	{
		id: 6,
		name: "Framer motion",
		designation: "Animations",
		image:
			"/icons/framer-dark.png"
	},
	{
		id: 7,
		name: "Tailwind",
		designation: "Fast",
		image:
			"/icons/tailwind.png"
	},
]
const description = "I love design and computers. My journey started with WordPress web design, followed by acquiring proficiency in CSS and JavaScript. Currently, I am immersed in the dynamic realm of cutting-edge web development technologies, engaging in hands-on projects to continually enhance my skills."

const About = () => {
	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<div className=" min-h-screen flex flex-col justify-center items-center from-zinc-900/0 bg-gradient-to-br via-zinc-300/50 dark:via-zinc-900 to-zinc-900/00">
				<Navigation />
				<img
					width={200}
					className="animate-fade-in-1 rounded-full md:mt-0 mt-24  shadow-lg shadow-white dark:shadow-black dark:shadow-sm"
					height={200}
					alt="Profile"
					src={'/profile.jpg'}
				/>
				{/* <h1 className=" text-xl text-zinc-800 dark:text-zinc-300 animate-fade-in md:text-3xl py-5 px-5 text-center font-semibold">
				a{" "}
				<span className="linear-wipe-about font-bold">Frontend Developer</span>{" "}
				from the future
			</h1> */}
				<TextGenerateEffect words={description} className="animate-fade-in-1 md:w-[800px] text-center justify-self-start px-5 mb-4" />
				<div className="animate-fade-in-1 flex py-5 px-10 gap-3 flex-wrap justify-center">
					<AnimatedTooltip items={tech} />
				</div>
			</div>
		</ThemeProvider>
	);
};

export default About;
