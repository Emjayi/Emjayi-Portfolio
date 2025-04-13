"use client";
import { projects } from "@/content/data";
import { collabs } from "@/content/data";
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
		return collabs.map((collab, i) => (
			<CardCollab key={`p_${i}`} {...collab} i={i} />
		));
	}, [projects]);

	return (
		<>
			<motion.div style={{ y: y }} ref={ref} id="projects">
				<h2 className="text-4xl text-center my-4">Solo Projects</h2>
				{projectCards}
			</motion.div>
			<motion.div style={{ y: y }} ref={ref} id="projects">
				<h2 className="text-4xl text-center mt-32 mb-4">
					Collabrations and Mini Projects
				</h2>
				<div className="md:grid md:grid-rows-2 md:grid-cols-3 gap-4">
					{collabCards}
				</div>
			</motion.div>
		</>
	);
}
