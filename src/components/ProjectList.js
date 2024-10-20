"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   // Fetch projects from localStorage (or an API)
  //   const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
  //   setProjects(storedProjects);
  // }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Project Board</h1>
      {projects.length === 0 ? (
        <div>
          <p>No projects available</p>
          <Link href="/create-project" className="text-blue-500">
            Create Project
          </Link>
        </div>
      ) : (
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="border p-4 mb-4">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p>Owner: {project.owner}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
