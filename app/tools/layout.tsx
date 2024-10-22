// 'use client'
// import { ThemeProvider } from "next-themes";
// import Particles from "@/components/particles";
// import ParticlesLight from "@/components/particles-light";
// import { ThemeSwitcher } from "@/components/theme-switcher";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function Layout({ children }: { children: React.ReactNode }) {
//     const pathName = usePathname()
//     const tool = tools.find((t) => (`/tools/${t.href}` === pathName))
//     return (
//         <ThemeProvider attribute="class" defaultTheme="system">
//             <ThemeSwitcher />
//             <section className="w-[100dw] bg-zinc-600/20 text-zinc-900 dark:text-white">
//                 {!(pathName === "/tools") && <Link href="/tools" className="absolute top-0 mr-auto ml-auto text-center p-6 text-zinc-900 dark:text-white"><p className="uppercase">back</p></Link>}
//                 {/* <ParticlesLight
//                     className="absolute dark:invisible inset-0 -z-10 animate-fade-in"
//                     quantity={100}
//                 />
//                 <Particles
//                     className="absolute inset-0 -z-10 animate-fade-in"
//                     quantity={100}
//                 /> */}
//                 {!(pathName === "/tools") &&
//                     <div className='flex flex-col gap-3 justify-center items-center w-[100dw] h-[100dvh]'>
//                         <h1 className='linear-wipe-for text-2xl font-bold'>{tool?.name}</h1>
//                         <div className='flex flex-col gap-2 justify-center items-center p-6 bg-zinc-800 rounded-md text-white min-w-[80%] lg:min-w-[50%] min-h-[50%]'>
//                             {children}
//                         </div>
//                     </div>}
//                 {(pathName === "/tools") &&
//                     <>
//                         {children}
//                     </>
//                 }
//             </section >
//         </ThemeProvider >
//     );
// }
'use client';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from '@/app/components/theme-switcher';
import { ThemeProvider } from '../theme-provider';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { tools } from '@/content/data';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const tool = tools.find((t) => `/tools/${t.href}` === pathName);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    layoutEffect: false,
  });
  const smoothScroll = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 300,
  });
  const s = useTransform(smoothScroll, [0, 1], [50, -100]);
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <ThemeSwitcher />
      <section className="w-[100dw] min-h-[100dvh] bg-zinc-600/20 text-zinc-900 dark:text-white pb-10">
        <div
          id="home"
          className="h-64 overflow-hidden  text-zinc-900 dark:text-white flex flex-col justify-center items-center"
        >
          {!(pathName === '/tools') && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-3xl capitalize"
            >
              {tool?.name}
            </motion.h1>
          )}
          {pathName === '/tools' && (
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1 }}
              style={{ y: s }}
              ref={ref}
              transition={{ duration: 0.2 }}
              className="text-6xl capitalize"
            >
              tools
            </motion.h1>
          )}
          {!(pathName === '/tools') && (
            <Link
              href="/tools"
              className="absolute top-0 left-0 text-center m-6 text-zinc-900 dark:text-white"
            >
              <p className="uppercase">Back</p>
            </Link>
          )}
          {!(pathName === '/tools') && (
            <Link
              href="/"
              className="absolute top-0 left-16 text-center m-6 text-zinc-900 dark:text-white"
            >
              <p className="uppercase">Home</p>
            </Link>
          )}
          {/* <ParticlesLight
                        className="absolute dark:invisible inset-0 -z-10 animate-fade-in"
                        quantity={1200}
                    />
                    <Particles
                        className="absolute inset-0 -z-10 animate-fade-in"
                        quantity={1200}
                    /> */}
        </div>
        <div className="flex flex-col gap-3 justify-center items-center w-[90%] ml-auto mr-auto mb-24">
          <div className="flex flex-col gap-2 justify-center items-center p-6 bg-zinc-200 dark:bg-zinc-800  rounded-md text-black dark:text-white min-w-[80%] lg:min-w-[50%] min-h-[50%]">
            {children}
          </div>
        </div>
      </section>
      {pathName === '/tools' && <Footer />}
    </ThemeProvider>
  );
}
