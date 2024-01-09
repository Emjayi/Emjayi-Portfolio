"use client";
import Link from "next/link";
import { Navigation } from "../components/nav";
import PageWrapper from "../PageWrapper";
import Image from "next/image";

const technologies = [
	{
		name: "CSS",
		icon: "/icons/css.png",
		iconDark: "/icons/css.png",
	},
	{
		name: "JavaScript",
		icon: "/icons/javascript.png",
		iconDark: "/icons/javascript.png",
	},
	{
		name: "React",
		icon: "/icons/react.png",
		iconDark: "/icons/react.png",
	},
	{
		name: "Nodejs",
		icon: "/icons/nodejs.png",
		iconDark: "/icons/nodejs.png",
	},
	{
		name: "Next.js",
		icon: "/icons/next-light.png",
		iconDark: "/icons/next-dark.png",
	},
	{
		name: "TailWindCSS",
		icon: "/icons/tailwind-light.png",
		iconDark: "/icons/tailwind.png",
	},
];

const About = () => {
	return (
		<div className=" min-h-screen flex flex-col justify-center items-center from-zinc-900/0 bg-gradient-to-br via-zinc-300 dark:via-zinc-900 to-zinc-900/00">
			<Navigation />
			<img
				width={200}
				className=" animate-fade-in-1 rounded-full  shadow-lg shadow-purple-300 dark:shadow-purple-700 dark:shadow-sm"
				height={200}
				alt="Profile"
				src={
					"https://media.licdn.com/dms/image/D4E03AQEz-pFkkK5w2g/profile-displayphoto-shrink_800_800/0/1689298538669?e=1710374400&v=beta&t=2bnNvKGH5paFe7VREIFEdHZ6SvbSrTk2ANv4BOatkxQ"
				}
			/>
			<h1 className=" text-xl text-zinc-800 dark:text-zinc-300 animate-fade-in-1 md:text-3xl py-5 px-5 text-center font-semibold">
				a{" "}
				<span className="linear-wipe-about font-bold">FullStack Developer</span>{" "}
				from the future
			</h1>
			<p className="text-sm md:text-lg text-zinc-800 dark:text-zinc-300 animate-fade-in-2 md:w-[800px] text-center justify-self-start px-5">
				{" "}
				I love coffee and computers. My journey started with WordPress web
				design, followed by acquiring proficiency in CSS and JavaScript.
				Currently, I am immersed in the dynamic realm of cutting-edge web
				development technologies, actively engaging in numerous hands-on
				projects to continually enhance my skills.{" "}
				<span className=" text-purple-400 font-semibold">based in Iran.</span>
			</p>
			<div className="flex gap-4 py-5 px-5">
				{technologies.map((t) => (
					<span className="relative z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-sm duration-1000">
						<Image
							className="dark:hidden animate-fade-in-2"
							src={t.icon}
							width={200}
							height={200}
							alt={t.name}
						/>
						<Image
							className="hidden dark:block animate-fade-in-2"
							src={t.iconDark}
							width={200}
							height={200}
							alt={t.name}
						/>
					</span>
				))}
			</div>
		</div>
	);
};

export default About;
