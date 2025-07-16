import { useState } from "react";
import type { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

function ProjectList({ projects, onSave }: ProjectListProps) {
  const [projectBeingEdit, setProjectBeingEdit] = useState({});
  function handleEditClick(project: Project) {
    setProjectBeingEdit(project);
    console.log(project);
  }
  function handleCancelClick() {
    setProjectBeingEdit({});
    console.log("cancel editing");
  }
  return (
    <ul className="row">
      {projects.map((p) => (
        <div className="cols-m" key={p.id}>
          {projectBeingEdit === p ? (
            <ProjectForm onCancel={handleCancelClick} onSave={onSave} />
          ) : (
            <ProjectCard project={p} onEdit={handleEditClick} />
          )}
        </div>
      ))}
    </ul>
  );
}

export default ProjectList;
