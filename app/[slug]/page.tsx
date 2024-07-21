"use client";
import { usePathname } from "next/navigation";
import { projects } from "@/content/data";
import { useEffect } from "react";
import Lenis from "lenis";

export default function Page() {
	useEffect(() => {
		const lenis = new Lenis();
		function raf(time: any) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
	}, []);

	const pathName = usePathname();
	const project = projects.find((project) => project.link === pathName);
	return (
		<div className="flex flex-col justify-center h-[100dvh] w-[500dvh] overflow-y-hidden">
			{project?.title}
		</div>
	);
}
