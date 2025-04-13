"use client";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/app/components/theme-switcher";
import { ThemeProvider } from "../theme-provider";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { ArrowLeft } from "lucide-react";
import Particles from "@/app/components/particles";
import ParticlesLight from "@/app/components/particles-light";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { opacity } from "@/app/components/Preloader/anim";

export default function Layout({ children }: { children: React.ReactNode }) {
	const pageName = usePathname().split("/")[1];
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		layoutEffect: false,
	});
	const smoothScroll = useSpring(scrollYProgress, {
		damping: 40,
		stiffness: 300,
	});
	const s = useTransform(smoothScroll, [0, 1], [160, -600]);
	return (
		<ThemeProvider attribute="class" defaultTheme="system">
			<ThemeSwitcher />
			<section className="w-[100dw]">
				<div
					id="home"
					className="h-64 overflow-hidden bg-zinc-600/10 text-zinc-900 dark:text-white flex flex-col gap-4 justify-center items-center"
					style={{ backgroundImage: "" }}
				>
					<motion.h1
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						style={{ y: s }}
						ref={ref}
						className="text-6xl capitalize"
					>
						{pageName}
					</motion.h1>
					{/* <ParticlesLight
                        className="absolute dark:invisible inset-0 -z-10 animate-fade-in"
                        quantity={1200}
                    />
                    <Particles
                        className="absolute inset-0 -z-10 animate-fade-in"
                        quantity={1200}
                    /> */}
				</div>
				<div className="bg-[#EDEDEE] dark:bg-[#080809]">{children}</div>
				<Footer />
			</section>
		</ThemeProvider>
	);
}
