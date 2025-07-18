import { useState, type SyntheticEvent } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onCancel: () => void;
  onSave: (project: Project) => void;
}

interface ErrorMessages {
  name: string;
  description: string;
  budget: string;
}

export default function ProjectForm({
  project: initialProject,
  onCancel,
  onSave,
}: ProjectFormProps) {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState<ErrorMessages>({
    name: "",
    description: "",
    budget: "",
  });

  function handleSubmitClick(event: SyntheticEvent) {
    event.preventDefault();
    if (!isValid()) {
      return;
    }
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

    const updatedProject = new Project({ ...project, ...updateField });
    setProject(updatedProject);
    setErrors(() => validate(updatedProject));
  }

  function validate(project: Project): ErrorMessages {
    const errors: ErrorMessages = {
      name: "",
      description: "",
      budget: "",
    };
    if (project.name.length === 0) {
      errors.name = "Name is required.";
    } else if (project.name.length < 3) {
      errors.name = "Name needs to be at least 3 characters.";
    }
    if (project.description.length === 0) {
      errors.description = "Description is required.";
    }
    if (project.budget <= 0) {
      errors.budget = "Budget must be more than $0.";
    }
    return errors;
  }

  function isValid(): boolean {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
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

      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}

      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={(e) => handleOnChange(e)}
      ></textarea>

      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}

      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={(e) => handleOnChange(e)}
      />

      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}

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
