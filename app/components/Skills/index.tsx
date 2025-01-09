import { tech } from '@/content/data'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { opacity } from '../Preloader/anim'

const Skills = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: .5 }}
            viewport={{ once: true }}
            className="w-full flex flex-col gap-2 md:grid grid-cols-4 ">
            {tech.map((t) => (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: t.id * .2 }}
                    key={t.name}
                    className='text-center border-2 rounded-md p-3 m-2 flex gap-4 items-center justify-start dark:bg-zinc-900 bg-zinc-400'>
                    <Image src={t.image} alt='image' width={30} height={20} className='rounded-full'>
                    </Image>
                    <h1>{t.name}</h1>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default Skills
