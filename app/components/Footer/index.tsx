import React from "react";
import { Card } from "../card";
import Link from "next/link";
import { ArrowLeft, ArrowUpIcon, Github, Linkedin, Mail, PhoneCall } from "lucide-react";
import { TextGenerateEffect } from "@/app/components/ui/text-generator";
import { AnimatedTooltip } from "@/app/components/ui/tooltip";
import { Link as ScrollLink } from "react-scroll";
import { usePathname } from "next/navigation";

const tech = [
	{
		id: 1,
		name: "React",
		designation: "Capable",
		image: "/icons/react2.png",
	},
	{
		id: 2,
		name: "CSS",
		designation: "Design",
		image: "/icons/css.png",
	},
	{
		id: 3,
		name: "Javascript",
		designation: "Development",
		image: "/icons/javascript.png",
	},
	{
		id: 4,
		name: "Node js",
		designation: "Backend",
		image: "/icons/nodejs.png",
	},
	{
		id: 5,
		name: "Next js",
		designation: "Create",
		image: "/icons/next-dark.png",
	},
	{
		id: 6,
		name: "Framer motion",
		designation: "Animations",
		image: "/icons/framer-dark.png",
	},
	{
		id: 7,
		name: "Tailwind",
		designation: "UI",
		image: "/icons/tailwind.png",
	},
	{
		id: 0,
		name: "WordPress",
		designation: "Affordable",
		image: "/icons/wordpress.png",
	},
];
const description =
	"I love design and computers. My journey started with WordPress web design, followed by acquiring proficiency in CSS and JavaScript. Currently, I am immersed in the dynamic realm of cutting-edge web development technologies, engaging in hands-on projects to continually enhance my skills.";

const socials = [
	{
		icon: <PhoneCall size={20} />,
		href: "tel:+989332643163",
		label: "Call, Telegram or Whatsapp",
		handle: "Mohammad Javad Sepahi",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:mjs32841@gmail.com",
		label: "Email",
		handle: "mjs32841",
	},
];

export default function Footer() {
	const pathName = usePathname()
	return (
		<div
			className="relative h-[800px]"
			style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
		>
			<div className="relative h-[calc(100vh+800px)] -top-[100vh]">
				<div className="h-[800px] sticky top-[calc(100vh-800px)]">
					<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-300/50 dark:via-zinc-900 to-zinc-900/0 py-8 px-12 h-full w-full flex flex-col justify-between">
						<Section1 />
						<Section2 />

						{(pathName === "/") && <ScrollLink
							to="home"
							smooth={true}
							duration={1200}
							className="absolute hidden lg:flex items-center gap-2 bottom-16 right-16 cursor-pointer text-xl duration-500 p-2 text-zinc-600 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300"
						>
							<ArrowUpIcon width={22} height={22} />
							<p >Back to top</p>
						</ScrollLink>}
						{(pathName !== "/") && (<>
							<Link
								href="/"
								className="absolute hidden lg:flex items-center gap-2 bottom-16 lg:right-16 cursor-pointer text-xl duration-500 p-2 text-zinc-600 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300">
								<ArrowLeft width={22} height={22} />
								<p>back to home</p>
							</Link>
						</>)}
						{/* <div className="absolute flex bottom-4 lg:right-16">
							{(pathName !== "/tools") && <Link
								href="/tools"
								className="flex items-center gap-2 cursor-pointer text-xl duration-500 p-2 text-zinc-600 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300">
								<p>Tools</p>
							</Link>}
							{(pathName !== "/blog") && <Link
								href="/blog"
								className="flex items-center gap-2 cursor-pointer text-xl duration-500 p-2 text-zinc-600 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300">
								<p>Blog</p>
							</Link>}
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}

const Section1 = () => {
	const pathName = usePathname()
	return (
		<div className="flex justify-between items-center">
			{(pathName === "/") && <ScrollLink
				to="home"
				smooth={true}
				duration={1200}
				className="absolute flex gap-2 justify-center sm:hidden w-[100dvw] text-center right-0 top-32"
			>
				<ArrowUpIcon width={22} height={22} />
				<p >Back to top</p>
			</ScrollLink>}
			{(pathName !== "/") && (<>
				<Link
					href="/"
					className="absolute flex gap-2 justify-center sm:hidden w-[100dvw] text-center right-0 top-32">
					<ArrowLeft width={22} height={22} />
					<p>back to home</p>
				</Link>
			</>)}
			<h1 className="absolute block sm:hidden w-[100dvw] text-center right-0 top-48">
				Need a fullstack developer?
			</h1>
			<p className="absolute block sm:hidden w-[100dvw] text-zinc-400 text-sm text-center right-0 top-56">
				Give me a call.
			</p>
			<div className="h-full hidden lg:flex flex-col justify-end">
				<TextGenerateEffect
					words={description}
					className="animate-fade-in-1 justify-self-start px-5 mb-4"
				/>
				<div className="animate-fade-in-1 flex py-5 px-10 gap-3 flex-wrap justify-center">
					<AnimatedTooltip items={tech} />
				</div>
			</div>
			<Nav />
		</div>
	);
};

const Section2 = () => {
	return (
		<div
			id="contacts"
			className="hidden lg:flex justify-center lg:justify-between items-end"
		>
			<h1 className="text-[10vw] leading-[0.8] mt-10">Let's talk</h1>
		</div>
	);
};

const Nav = () => {
	return (
		<div className="flex shrink-0 gap-20 mt-32">
			<div className="flex flex-col lg:flex-row w-full items-end justify-end gap-4 mx-auto mt-32 mb-12 sm:mb-0 sm:mt-0 sm:grid-cols-4 lg:gap-16">
				{socials.map((s, index) => (
					<Card key={index}>
						<Link
							href={s.href}
							target="_blank"
							className="p-4 relative flex flex-col w-[80dvw] lg:w-auto items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
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
	);
};
