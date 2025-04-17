"use client"
import { usePathname } from "next/navigation"
import { projects } from "@/content/data"
import { useEffect } from "react"
import Lenis from "lenis"
import Link from "next/link"
import NotFound from "../not-found"
import Script from "next/script"

export default function Page() {
	useEffect(() => {
		const lenis = new Lenis()
		function raf(time: any) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}
		requestAnimationFrame(raf)
	}, [])

	const pathName = usePathname()
	const project: any = projects.find((project) => project.link === pathName)
	const projectIndex = projects.indexOf(project)
	const getNextproject = (index: number, projects: any) => {
		if (index < projects.length - 1) {
			return projects[index + 1]
		}
		return projects[0]
	}
	const nextproject: any = getNextproject(projectIndex, projects)
	const getPrevproject = (index: number, projects: any) => {
		if (index > 0) {
			return projects[index - 1]
		}
		return projects[projects.length - 1]
	}
	const prevproject: any = getPrevproject(projectIndex, projects)

	// Generate metadata for the project page
	const pageTitle = project ? `${project.title} | Emjay Sepahi Portfolio` : "Project | Emjay Sepahi Portfolio"
	const pageDescription = project
		? project.description || `Detailed showcase of ${project.title} project by Emjay Sepahi`
		: "Project showcase by Emjay Sepahi"

	return (
		<>
			{!project && <NotFound />}
			{project && (
				<div className="flex flex-col p-0 min-h-[100dvh] w-full">
					{/* Structured data for project */}
					<Script
						id="structured-data-project"
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify({
								"@context": "https://schema.org",
								"@type": "CreativeWork",
								name: project.title,
								description: project.description || `${project.title} - A project by Emjay Sepahi`,
								author: {
									"@type": "Person",
									name: "Emjay Sepahi",
								},
								url: `https://emjaysepahi.com${project.link}`,
							}),
						}}
					/>

					<div className="w-full h-[100dvh] items-center text-6xl gap-5 flex flex-col justify-center">
						<h1 className="text-center">{project?.title}</h1>
						{project.description && <p className="text-xl max-w-2xl text-center mt-4">{project.description}</p>}
						<Link href="/" className="text-xl border rounded-md px-6 py-2 mt-8" aria-label="Return to homepage">
							Home
						</Link>
					</div>
					<div className="w-full items-center text-6xl gap-5 flex flex-col justify-center py-12">
						<h2 className="text-2xl mb-4">Explore More Projects</h2>
						<div className="flex gap-2">
							<Link
								href={nextproject.link}
								className="text-xl border rounded-md px-6 py-2"
								aria-label={`View next project: ${nextproject.title}`}
							>
								{nextproject.title}
							</Link>
							<Link
								href={prevproject.link}
								className="text-xl border rounded-md px-6 py-2"
								aria-label={`View previous project: ${prevproject.title}`}
							>
								{prevproject.title}
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
