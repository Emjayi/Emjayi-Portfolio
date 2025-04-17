import { other_projects } from '@/content/data';
import React, { useMemo } from 'react'
import Card from '../components/Main/projects/Card';
import Link from 'next/link';

const Projects = () => {
    return (
        <div className='flex flex-col gap-4 mx-auto w-screen'>
            <h1>
                THIS IS AN EASTER EGG. If you have found it you are good at this :)
            </h1>
            {
                other_projects.map((project, i) => (
                    <Link href={project.link}>{project.title}</Link>
                ))
            }
        </div>
    )
}

export default Projects