import { CardDemo } from "../ui/ContentCard";
import { HoverBorderGradient } from "../ui/Hover-Border-Gradient";

export default function Page() {
    return (
        <div className="flex bg-zinc-300 dark:bg-zinc-800 rounded-t-2xl -mt-10">
            <div className="hidden lg:flex text-zinc-600 dark:text-zinc-400 flex-col gap-5 w-[20%] my-8 p-4 sticky top-0 h-fit">
                <div>
                    <h3 className="text-xl mb-2 text-zinc-800 dark:text-white">Latest Posts</h3>
                    <p className="mb-2">How to center a div</p>
                    <p className="mb-2">Should I become a developer in 2030</p>
                    <p className="mb-2">What is happening to the world!?</p>
                </div>
                <div className=" flex gap-2 flex-wrap">
                    <h3 className="text-xl mb-2 text-zinc-800 dark:text-white w-full">Categories</h3>
                    <HoverBorderGradient className="bg-zinc-800 py-1 px-4 inline"><p className="">Programming</p></HoverBorderGradient>
                    <HoverBorderGradient className="bg-zinc-800 py-1 px-4 inline"><p className="">Design</p></HoverBorderGradient>
                    <HoverBorderGradient className="bg-zinc-800 py-1 px-4 inline"><p className="">Workflow</p></HoverBorderGradient>
                    <HoverBorderGradient className="bg-zinc-800 py-1 px-4 inline"><p className="">Templates</p></HoverBorderGradient>
                    <HoverBorderGradient className="bg-zinc-800 py-1 px-4 inline"><p className="">Components</p></HoverBorderGradient>
                    <HoverBorderGradient className="bg-zinc-800 py-1 px-4 inline"><p className="">AI</p></HoverBorderGradient>
                </div>
                <div className=" flex gap-2 flex-wrap">
                    <h3 className="text-xl mb-2 text-zinc-800 dark:text-white w-full">Technologies</h3>
                    <HoverBorderGradient className="bg-zinc-800 py-1 px-4 inline"><p className="">Next.js</p></HoverBorderGradient>
                    <HoverBorderGradient className="bg-zinc-800 py-1 px-4 inline"><p className="">React</p></HoverBorderGradient>
                    <HoverBorderGradient className="bg-zinc-800 py-1 px-4 inline"><p className="">TailwindCSS</p></HoverBorderGradient>
                    <HoverBorderGradient className="bg-zinc-800 py-1 px-4 inline"><p className="">Node.js</p></HoverBorderGradient>
                </div>
            </div>
            <div className="w-full lg:w-[80%] m-8 bg-black/20 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <CardDemo src="/products/1.jpg" href="#" title="How to center a div" />
                <CardDemo src="/products/2.jpg" href="#" title="Should I become a developer in 2030" />
                <CardDemo src="/products/3.jpg" href="#" title="What is happening to the world!?" />
                <CardDemo src="/products/4.jpg" href="#" title="What is ai" />
                <CardDemo src="/products/5.jpg" href="#" title="What is ai" />
                <CardDemo src="/products/1.jpg" href="#" title="What is ai" />
                <CardDemo src="/products/1.jpg" href="#" title="What is ai" />
            </div>
        </div>

    );
}