import { useState, type SyntheticEvent } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onCancel: () => void;
  onSave: (project: Project) => void;
}

export default function ProjectForm({
  project: initialProject,
  onCancel,
  onSave,
}: ProjectFormProps) {
  const [project, setProject] = useState(initialProject);

  function handleSubmitClick(event: SyntheticEvent) {
    event.preventDefault();
    onSave(project);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleOnChange(event: any) {
    const { name, value, type, checked } = event.target;
    let updatedValue = type === "checkbox" ? checked : value;
    updatedValue = type === "number" ? Number(value) : updatedValue;

    const updateField = {
      [name]: updatedValue,
    };

    setProject((p) => new Project({ ...p, ...updateField }));
  }

  return (
    <form
      className="input-group vertical"
      onSubmit={(e) => handleSubmitClick(e)}
    >
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={project.name}
        onChange={(e) => handleOnChange(e)}
      />

      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={(e) => handleOnChange(e)}
      ></textarea>

      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={(e) => handleOnChange(e)}
      />

      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={(e) => handleOnChange(e)}
      />

      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span></span>
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}
