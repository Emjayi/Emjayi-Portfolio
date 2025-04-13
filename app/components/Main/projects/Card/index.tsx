"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import SpotlightCard from "../../../ui/carddd";

const Card = memo(({ title, description, src, link, color, i }: any) => {
	const container = useRef(null);

	const { scrollYProgress } = useScroll({
		target: container,
		layoutEffect: false,
		offset: ["start end", "start start"],
	});

	const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

	return (
		<div className={styles.cardContainer} ref={container}>
			<Link
				target={link !== "#" ? "_blank" : ""}
				href={`${link}`}
				className={styles.card}
				style={{ top: `calc(-5vh + ${i * 25}px)` }}
			>
				<SpotlightCard
					className="custom-spotlight-card h-[80vh]"
					spotlightColor={color}
				>
					<h2 className=" text-zinc-200">{title}</h2>
					<div className={styles.body}>
						<div className={styles.description}>
							<p className="font-sans text-zinc-200">{description}</p>
						</div>

						<div className={styles.imageContainer}>
							<motion.div
								style={{ scale: imageScale }}
								className={`${styles.inner} object-contain`}
							>
								<Image
									fill
									src={`/images/${src}`}
									sizes="(max-width: 768px) 100vw, 50vw"
									alt="image"
									priority
								/>
							</motion.div>
						</div>
					</div>
				</SpotlightCard>
			</Link>
		</div>
	);
});

Card.displayName = "Card";
export default Card;
