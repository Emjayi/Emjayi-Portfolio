"use client";
import { useEffect, useRef } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/util/cn";

export const TextGenerateEffect = ({
	words,
	className,
}: {
	words: string;
	className?: string;
}) => {
	const ref = useRef(null);
	const inView = useInView(ref);
	const [scope, animate] = useAnimate();
	const wordsArray = words.split(" ");
	useEffect(() => {
		animate(
			"span",
			{
				opacity: 1,
			},
			{
				duration: 2,
				delay: stagger(0.2),
			},
		);
	}, [inView]);
	const renderWords = () => {
		return (
			<motion.div ref={ref}>
				<motion.div ref={scope}>
					{wordsArray.map((word, idx) => {
						return (
							<motion.span
								key={word + idx}
								className=" text-sm md:text-lg text-zinc-800 font-sans dark:text-zinc-300 opacity-25"
							>
								{word}{" "}
							</motion.span>
						);
					})}
				</motion.div>
			</motion.div>
		);
	};

	return (
		<div className={cn("font-bold", className)}>
			<div className="mt-4">
				<div className=" dark:text-white text-black text-2xl leading-snug tracking-wide">
					{renderWords()}
				</div>
			</div>
		</div>
	);
};
