"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Magnetic from "../common/Magnetic";

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b  ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500  border-zinc-800 "
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-2 md:gap-8">
						{/* <Magnetic>
							<Link
								href="/projects"
								className="duration-200 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
							>
								Projects
							</Link>
						</Magnetic> */}
						<Magnetic>
							<Link
								href="/about"
								className="duration-200 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
							>
								About
							</Link>
						</Magnetic>
						<Magnetic>
							<Link
								href="/contact"
								className="duration-200 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
							>
								Contact
							</Link>
						</Magnetic>
					</div>
					<Magnetic>
						<Link
							href="/"
							className="duration-200 text-zinc-500 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-100"
						>
							<ArrowLeft className="w-6 h-6 md:hidden" />
							<span className="hidden md:block">Home</span>
						</Link>
					</Magnetic>
				</div>
			</div>
		</header>
	);
};
