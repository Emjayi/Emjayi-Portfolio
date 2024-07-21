"use client";
import { usePathname } from "next/navigation";
import { projects } from "@/content/data";
import { useEffect } from "react";
import Lenis from "lenis";
import Link from "next/link";

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
	const project: any = projects.find((project) => project.link === pathName);
	const projectIndex = projects.indexOf(project);

	const getNextproject = (index: number, projects: any) => {
		if (index < projects.length - 1) {
			return projects[index + 1];
		}
		return projects[0];
	};
	const nextproject: any = getNextproject(projectIndex, projects);
	return (
		<div className="flex flex-col justify-center h-[100dvh] w-screen items-center text-6xl gap-5 overflow-y-hidden">
			{project?.title}
			<Link
				href={nextproject.link}
				className="text-xl border rounded-md px-6 py-2"
			>
				{nextproject.title}
			</Link>
			<Link href="/" className="text-xl border rounded-md px-6 py-2">
				Home
			</Link>
		</div>
	);
}
