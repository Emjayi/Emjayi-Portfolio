import { tech } from '@/content/data'

const Skills = () => {
    return (
        <div className="w-full min-h-[80vh] grid grid-cols-4 px-8">
            {tech.map((t) => (
                <div className='text-center'>
                    <h1>{t.name}</h1>
                </div>
            ))}
        </div>
    )
}

export default Skills
