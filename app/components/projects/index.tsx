"use client";
import { projects } from "@/content/data";
import Card from "./Card";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Projects() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
	return (
		<motion.div style={{ y: y }} ref={ref} id="projects">
			{projects.map((project, i) => {
				return <Card key={`p_${i}`} {...project} i={i} />;
			})}
		</motion.div>
	);
}
