import { HoverBorderGradient } from "@/app/ui/Hover-Border-Gradient";
import { tools } from "@/content/data";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function Index() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll()
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 300,
        damping: 200
    })
    const x = useTransform(smoothScroll, [0, 1], [-300, 100])
    const x2 = useTransform(smoothScroll, [0, 1], [200, -300])
    const x3 = useTransform(smoothScroll, [0, 1], [-500, 200])
    const x4 = useTransform(smoothScroll, [0, 1], [600, -400])
    return (
        <div className="flex flex-col w-screen gap-2 flex-wrap justify-center items-center" ref={ref}>
            <div className="hidden md:flex flex-col w-full gap-4 flex-wrap justify-center items-center">
                <motion.div
                    style={{ x: x }}
                    className="flex gap-2 -ml-24">
                    {tools.map((t, index) => (
                        <>
                            {(index < 6) && <Link key={index} href={`/tools/${t.href}`}><HoverBorderGradient className=" py-4 px-8 inline"><p className="">{t.name}</p></HoverBorderGradient></Link>}
                        </>
                    ))}
                </motion.div>
                <motion.div
                    style={{ x: x2 }}
                    className="flex gap-2 -mr-64">
                    {tools.map((t, index) => (
                        <>
                            {(index > 6 && index < 12) && <Link key={index} href={`/tools/${t.href}`}><HoverBorderGradient className=" py-4 px-8 inline"><p className="">{t.name}</p></HoverBorderGradient></Link>}
                        </>
                    ))}
                </motion.div>
                <motion.div
                    style={{ x: x3 }}
                    className="flex gap-2 -mr-64">
                    {tools.map((t, index) => (
                        <>
                            {(index > 12 && index < 18) && <Link key={index} href={`/tools/${t.href}`}><HoverBorderGradient className=" py-4 px-8 inline"><p className="">{t.name}</p></HoverBorderGradient></Link>}
                        </>
                    ))}
                </motion.div>
                <motion.div
                    style={{ x: x4 }}
                    className="flex gap-2">
                    {tools.map((t, index) => (
                        <>
                            {(index > 18) && <Link key={index} href={`/tools/${t.href}`}><HoverBorderGradient className=" py-4 px-8 inline"><p className="">{t.name}</p></HoverBorderGradient></Link>}
                        </>
                    ))}
                </motion.div>
            </div>
            <div className="flex w-full px-5 gap-4 flex-wrap justify-center items-center md:hidden">
                {tools.map((t, index) => (
                    <Link key={"m_" + index} href={`/tools/${t.href}`}><HoverBorderGradient className="text-sm py-2 px-4 inline"><p className="">{t.name}</p></HoverBorderGradient></Link>
                ))}
            </div>
        </div>
    );
}