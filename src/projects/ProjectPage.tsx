import { useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import type { Project } from "./Project";
import ProjectList from "./ProjectList";

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  function handleSave(project: Project) {
    console.log("Saving project: ", project);
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? project : p
    );
    setProjects(updatedProjects);
  }

  return (
    <>
      <h1>Projects</h1>
      <ProjectList projects={projects} onSave={handleSave} />
    </>
  );
}
