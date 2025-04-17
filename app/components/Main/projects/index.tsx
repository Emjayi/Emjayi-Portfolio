"use client";
import { projects } from "@/content/data";
import { other_projects } from "@/content/data";
import Card from "./Card";
import CardCollab from "./CardCollab";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useMemo } from "react";

export default function Projects() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

	const projectCards = useMemo(() => {
		return projects.map((project, i) => (
			<Card key={`p_${i}`} {...project} i={i} />
		));
	}, [projects]);
	const collabCards = useMemo(() => {
		return other_projects.map((project, i) => (
			<CardCollab key={`p_${i}`} {...project} i={i} />
		));
	}, [projects]);

	return (
		<>
			<motion.div style={{ y: y }} ref={ref} id="projects">
				<h2 className="text-4xl text-center my-4">Solo Projects</h2>
				{projectCards}
			</motion.div>
			<motion.div style={{ y: y }} ref={ref} id="projects">
				<h2 className="text-3xl text-center mt-32 mb-4">
					Collabrations and Other Projects
				</h2>
				<div className="md:grid md:grid-rows-2 md:grid-cols-3 gap-4">
					{collabCards}
				</div>
			</motion.div>
		</>
	);
}