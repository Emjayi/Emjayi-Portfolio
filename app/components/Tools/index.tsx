import { HoverBorderGradient } from '@/app/components/ui/Hover-Border-Gradient';
import { tools } from '@/content/data';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function Index() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 200,
  });
  const x = useTransform(smoothScroll, [0, 1], [-100, 100]);
  const x2 = useTransform(smoothScroll, [0, 1], [200, -300]);
  const x3 = useTransform(smoothScroll, [0, 1], [-1400, 100]);
  const x4 = useTransform(smoothScroll, [0, 1], [300, -400]);
  return (
    <div
      className="flex flex-col mt-4 md:mt-24 w-screen gap-2 flex-wrap justify-center items-center"
      ref={ref}
    >
      <div className="hidden md:flex flex-col w-full gap-4 flex-wrap justify-center items-center">
        <motion.div style={{ x: x }} className="flex gap-2 ml-24">
          {tools.map((t, index) => (
            <div key={index}>
              {index < 5 && (
                <Link href={`/${t.href}`}>
                  <HoverBorderGradient className=" py-4 px-8 inline">
                    <p className="">{t.name}</p>
                  </HoverBorderGradient>
                </Link>
              )}
            </div>
          ))}
        </motion.div>
        <motion.div style={{ x: x2 }} className="flex gap-2 -mr-64">
          {tools.map((t, index) => (
            <div key={index}>
              {index > 5 && index < 12 && (
                <Link href={`/tools/${t.href}`}>
                  <HoverBorderGradient className=" py-4 px-8 inline">
                    <p className="">{t.name}</p>
                  </HoverBorderGradient>
                </Link>
              )}
            </div>
          ))}
        </motion.div>
        <motion.div style={{ x: x3 }} className="flex gap-2 -mr-64">
          {tools.map((t, index) => (
            <div key={index}>
              {index > 12 && index < 18 && (
                <Link href={`/tools/${t.href}`}>
                  <HoverBorderGradient className=" py-4 px-8 inline">
                    <p className="">{t.name}</p>
                  </HoverBorderGradient>
                </Link>
              )}
            </div>
          ))}
        </motion.div>
        <motion.div style={{ x: x4 }} className="flex gap-2">
          {tools.map((t, index) => (
            <div key={index}>
              {index > 18 && (
                <Link href={`/tools/${t.href}`}>
                  <HoverBorderGradient className=" py-4 px-8 inline">
                    <p className="">{t.name}</p>
                  </HoverBorderGradient>
                </Link>
              )}
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex w-full px-5 gap-4 flex-wrap justify-center items-center md:hidden">
        {tools.map((t, index) => (
          <Link key={100 + index} href={`/tools/${t.href}`}>
            <HoverBorderGradient className="text-sm py-2 px-4 inline">
              <p className="">{t.name}</p>
            </HoverBorderGradient>
          </Link>
        ))}
      </div>
    </div>
  );
}
