"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const Card = ({ title, description, src, link, color, i }: any) => {
	const container = useRef(null);

	const { scrollYProgress } = useScroll({
		target: container,
		layoutEffect: false,
		offset: ["start end", "start start"],
	});

	const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

	return (
		<div className={styles.cardContainer}>
			<Link target={link !== "#" ? "_blank" : ""} href={`${link}`} className={styles.card} style={{ backgroundColor: color, top: `calc(-5vh + ${i * 25}px)` }}>
				{/* <div
					
					}
				> */}
				<h2 className="font-display">{title}</h2>
				<div className={styles.body}>
					<div className={styles.description}>
						<p className="font-sans">{description}</p>

					</div>

					<div className={styles.imageContainer}>
						<motion.div style={{ scale: imageScale }} className={styles.inner}>
							<Image fill src={`/images/${src}`} sizes="500" alt="image" />
						</motion.div>
					</div>
				</div>
				{/* </div> */}
			</Link>
		</div >
	);
};

export default Card;
