import { Link } from "react-router";
import { Project } from "./Project";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

export default function ProjectCard({ project, onEdit }: ProjectCardProps) {
  function handleEditClick(project: Project) {
    onEdit(project);
  }

  return (
    <>
      <div className="card">
        <img src={project.imageUrl} alt={project.name} />
        <section className="section dark">
          <Link to={`/projects/${project.id}`}>
            <h5 className="strong">
              <strong>{project.name}</strong>
            </h5>
            <p>{project.description}</p>
            <p>Budget: {project.budget.toLocaleString()}</p>
          </Link>
          <button className="bordered" onClick={() => handleEditClick(project)}>
            <span className="icon-edit"></span> Edit
          </button>
        </section>
      </div>
    </>
  );
}
