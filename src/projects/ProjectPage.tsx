import { MOCK_PROJECTS } from "./MockProjects";
import type { Project } from "./Project";
import ProjectList from "./ProjectList";

export default function ProjectPage() {
  function handleSave(project: Project) {
    console.log("Saving project: ", project);
  }

  return (
    <>
      <h1>Projects</h1>
      <ProjectList projects={MOCK_PROJECTS} onSave={handleSave} />
      {/* <pre>{JSON.stringify(MOCK_PROJECTS, null, " ")}</pre> */}
    </>
  );
}
