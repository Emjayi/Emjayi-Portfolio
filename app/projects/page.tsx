'use client';
import { useState } from 'react';
import Project from '../components/project';
import Modal from '../components/modal';
import { Navigation } from '../components/nav';
import { Link } from 'lucide-react';

const projects = [
  {
    title: "Refaee Photography",
    src: "refaee.gif",
    color: "#000000",
    link: "refaee"
  },
  {
    title: "DigiFabric",
    src: "officestudio.png",
    color: "#8C8C8C"
  },
  {
    title: "Khersebozorg",
    src: "locomotive.png",
    color: "#EFE8D3"
  },
  {
    title: "Takfazkala",
    src: "silencio.png",
    color: "#706D63"
  }
]

export default function Projects() {

  const [modal, setModal] = useState({ active: false, index: 0 })

  return (
    <main className="flex flex-col items-center bg-gradient-to-tl from-zinc-900/0 via-zinc-300/50 dark:via-zinc-900 to-zinc-900/0" >
      <Navigation />

      <div className=" w-[1200px] flex flex-col px-24 py-16 my-24 animate-fade-in-1">
        {
          projects.map((project, index: any) => {
            return <Project href={`/projects/${project.link}`} index={index} title={project.title} setModal={setModal} key={index} />

          })
        }
      </div>
      <Modal modal={modal} projects={projects} />
    </main>
  )
}
