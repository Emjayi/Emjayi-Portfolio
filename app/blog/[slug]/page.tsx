'use client';
import { useEffect } from 'react';

export default async function Page() {
  let projects: any = [];
  const fetchData = async () => {
    const response = await fetch('/api/projects.json');
    projects = response.json();
    return projects;
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {projects.map((project: any) => (
        <div key={project.id}>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}
