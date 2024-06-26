'use client';
import { useState } from 'react';
import Project from '../components/project';
import Modal from '../components/modal';
import { Navigation } from '../components/nav';
import { Link } from 'lucide-react';
import { ThemeProvider } from 'next-themes';

const projects = [
  {
    title: "Refaee Photography",
    src: "refaee.gif",
    color: "#000000",
    link: "refaee"
  },
  {
    title: "DigiFabric",
    src: "refaee.gif",
    color: "#000000"
  },
  {
    title: "Khersebozorg",
    src: "refaee.gif",
    color: "#000000"
  },
  {
    title: "Takfazkala",
    src: "refaee.gif",
    color: "#000000"
  }
]

export default function Projects() {

  const [modal, setModal] = useState({ active: false, index: 0 })

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <main className="flex flex-col items-center bg-gradient-to-tl from-zinc-900/0 via-zinc-300/50 dark:via-zinc-900 to-zinc-900/0" >
        <Navigation />

        <div className=" md:w-[1200px] flex flex-col md:px-24 md:py-16 my-24 animate-fade-in-1">
          {
            projects.map((project, index: any) => {
              return <Project href={`/projects/${project.link}`} index={index} title={project.title} setModal={setModal} key={index} />

            })
          }
        </div>
        <Modal modal={modal} projects={projects} />
      </main>
    </ThemeProvider>
  )
}
