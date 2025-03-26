import { motion, useScroll, useTransform } from "framer-motion";
import Skills from "../Skills";
import { TextGenerateEffect } from "../ui/text-gen-effect"
import { useRef } from "react";

const About = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1.2], [80, -200]);
    const y2 = useTransform(scrollYProgress, [0, .8], [80, -400]);
    const words = `
    I’m Mohammad Javad, a Full-Stack Web Developer with a passion for design, computers, and solving problems. My journey began with WordPress web design, where I first discovered the joy of building things that live on the internet.

From there, I dove headfirst into the world of CSS and JavaScript, turning static pages into interactive experiences. These days, I’m fully immersed in the ever-evolving universe of web development, working hands-on with cutting-edge technologies to bring ideas to life.

For me, coding isn’t just about writing lines of code it’s about crafting something meaningful and, if I’m lucky, a little magical.

`;
    return (
        <div className="md:h-[200vh]">
            <div className="md:px-16 md:sticky md:top-0 lg:px-48 px-6 justify-center items-center flex flex-col gap-5 text-justify">
                <motion.div style={{ y: y }} ref={ref} id="about">
                    <TextGenerateEffect words={words} />
                </motion.div>
                <motion.div style={{ y: y2 }} ref={ref} id="about" className="w-full">
                    <Skills />
                </motion.div>
            </div>
        </div>
    )
}

export default About
