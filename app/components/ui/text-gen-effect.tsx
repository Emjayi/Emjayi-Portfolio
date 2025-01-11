"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5,
}: {
    words: string;
    className?: string;
    filter?: boolean;
    duration?: number;
}) => {
    const [scope, animate] = useAnimate();
    const isInView = useInView(scope);
    const [hasAnimated, setHasAnimated] = useState(false);
    let wordsArray = words.split(" ");

    useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true);
            animate(
                "span",
                {
                    opacity: 1,
                    filter: filter ? "blur(0px)" : "none",
                },
                {
                    duration: duration ? duration : .1,
                    delay: stagger(0.1),
                }
            );
        }
    }, [isInView, scope.current, hasAnimated, animate, duration, filter]);

    const renderWords = () => {
        return (
            <motion.div ref={scope} className="md:min-h-[40vh] content-end mb-2 md:mb-16">
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className="dark:text-zinc-200 leading-8 text-black opacity-0"
                            style={{
                                filter: filter ? "blur(10px)" : "none",
                            }}
                        >
                            {word}{" "}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={cn("font-bold", className)}>
            <div className="mt-4">
                <div className=" dark:text-zinc-200 text-black text-sm md:text-lg xl:text-2xl leading-snug tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
