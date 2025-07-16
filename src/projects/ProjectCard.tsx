import { Project } from "./Project";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

export default function ProjectCard({ project, onEdit }: ProjectCardProps) {
  //const { project } = props;
  function handleEditClick(project: Project) {
    onEdit(project);
  }
  return (
    <>
      <div className="card">
        <img src={project.imageUrl} alt={project.name} />
        <section className="section dark">
          <h5 className="strong">
            <strong>{project.name}</strong>
          </h5>
          <p>{project.description}</p>
          <p>Budget: {project.budget.toLocaleString()}</p>
        </section>
        <button className="bordered" onClick={() => handleEditClick(project)}>
          <span className="icon-edit"></span> Edit
        </button>
      </div>
    </>
  );
}
