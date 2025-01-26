'use client';
import { projects } from '@/content/data';
import Card from './Card';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useMemo } from 'react';

export default function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const projectCards = useMemo(() => {
    return projects.map((project, i) => (
      <Card key={`p_${i}`} {...project} i={i} />
    ));
  }, [projects]);

  return (
    <motion.div style={{ y: y }} ref={ref} id="projects">
      <h2 className='text-center my-4 md:hidden'>
        Projects
      </h2>
      {projectCards}
    </motion.div>
  );
}