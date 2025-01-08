import { TextGenerateEffect } from "../ui/text-gen-effect"

const About = () => {
    const words = `
    I’m Mohammad Javad, a Full-Stack Web Developer with a passion for design, computers, and solving problems (sometimes with code, sometimes with coffee). My journey began with WordPress web design, where I first discovered the joy of building things that live on the internet.

From there, I dove headfirst into the world of CSS and JavaScript, turning static pages into interactive experiences. These days, I’m fully immersed in the ever-evolving universe of web development, working hands-on with cutting-edge technologies to bring ideas to life.

For me, coding isn’t just about writing lines of code—it’s about crafting something meaningful and, if I’m lucky, a little magical.

`;
    return (
        <div className="px-48 h-[100vh] justify-center items-center flex text-justify">
            <TextGenerateEffect words={words} />
        </div>
    )
}

export default About
