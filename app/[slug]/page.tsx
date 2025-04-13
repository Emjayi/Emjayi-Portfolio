"use client";
import { usePathname } from "next/navigation";
import { projects } from "@/content/data";
import { useEffect } from "react";
import Lenis from "lenis";
import Link from "next/link";
import NotFound from "../not-found";

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
	const getPrevproject = (index: number, projects: any) => {
		if (index > 0) {
			return projects[index - 1];
		}
		return projects[projects.length - 1];
	};
	const prevproject: any = getPrevproject(projectIndex, projects);
	return (
		<>
			{!project && <NotFound />}
			{project && (
				<div className="flex flex-col p-0 min-h-[100dvh] w-full">
					<div className="w-full h-[100dvh] items-center text-6xl gap-5 flex flex-col justify-center">
						{project?.title}
						<Link href="/" className="text-xl border rounded-md px-6 py-2">
							Home
						</Link>
					</div>
					<div className="w-full items-center text-6xl gap-5 flex flex-col justify-center">
						<div className="flex gap-2">
							<Link
								href={nextproject.link}
								className="text-xl border rounded-md px-6 py-2"
							>
								{nextproject.title}
							</Link>
							<Link
								href={prevproject.link}
								className="text-xl border rounded-md px-6 py-2"
							>
								{prevproject.title}
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
