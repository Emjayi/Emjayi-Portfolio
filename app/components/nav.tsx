"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

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
				className={`fixed inset-x-0 top-0 z-50   duration-200 border-b  ${isIntersecting
					? "bg-zinc-900/0 border-transparent"
					: "bg-zinc-900/500  border-zinc-800"
					}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<Link
							href="/about"
							className="duration-200 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
						>
							About
						</Link>
						<Link
							href="/contact"
							className="duration-200 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
						>
							Contact
						</Link>
					</div>

					<Link
						href="/"
						className="duration-200 text-zinc-500 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-100"
					>
						Home
					</Link>
				</div>
			</div>
		</header>
	);
};
