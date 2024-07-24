import { HoverBorderGradient } from "@/app/ui/Hover-Border-Gradient";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Index() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll()
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 300,
        damping: 200
    })
    const x = useTransform(smoothScroll, [0, 1], [-300, 100])
    const x2 = useTransform(smoothScroll, [0, 1], [200, -200])
    return (
        <div className="flex flex-col w-screen gap-2 flex-wrap justify-center items-center" ref={ref}>
            <div className="hidden md:flex flex-col w-full gap-4 flex-wrap justify-center items-center">
                <h3 className="text-xl mb-2 text-zinc-800 dark:text-white">Tools</h3>
                <motion.div
                    style={{ x: x }}
                    className="flex gap-2 -ml-24">
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Fisrt</p></HoverBorderGradient>
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Design</p></HoverBorderGradient>
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Workflow</p></HoverBorderGradient>
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Password Generator</p></HoverBorderGradient>
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Image Compressor</p></HoverBorderGradient>
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">String splitter</p></HoverBorderGradient>
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Templates</p></HoverBorderGradient>
                </motion.div>
                <motion.div
                    style={{ x: x2 }}
                    className="flex gap-2 -mr-64">
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">First</p></HoverBorderGradient>
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Components</p></HoverBorderGradient>
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Components</p></HoverBorderGradient>
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Components</p></HoverBorderGradient>
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Components</p></HoverBorderGradient>
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Components</p></HoverBorderGradient>
                    <HoverBorderGradient className=" py-4 px-8 inline"><p className="">Last</p></HoverBorderGradient>
                </motion.div>
            </div>
        </div>
    );
}