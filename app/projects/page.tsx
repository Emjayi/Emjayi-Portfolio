import { projects } from '@/content/data';
import React, { useMemo } from 'react'
import Card from '../components/Main/projects/Card';

const Projects = () => {
    const projectCards = useMemo(() => {
        return projects.map((project, i) => (
            <Card key={`p_${i}`} {...project} i={i} />
        ));
    }, [projects]);
    return (
        <div>
            {projectCards}
        </div>
    )
}

export default Projects