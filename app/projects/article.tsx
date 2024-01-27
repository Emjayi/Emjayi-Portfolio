'use client'
import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { useState } from "react";
import Projects from "../components/projects";

type Props = {
	project: Project;
	index: string
};

export const Article: React.FC<Props> = ({ project, index }) => {

	const [modal, setModal] = useState({ active: false, index: 0 })

	return (
		<Link href={`/projects/${project.slug}`}>
			<Projects href={`/projects/${project.slug}`} index={index} title={project.title} setModal={setModal} key={index} />
			<article className="p-4 md:p-8">
				<div className="flex justify-between gap-2 items-center">

				</div>
				<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
					{project.title}
				</h2>
				<p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
					{project.description}
				</p>
			</article>
		</Link>
	);
};
