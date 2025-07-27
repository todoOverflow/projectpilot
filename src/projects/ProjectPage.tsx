import { useEffect, useState } from "react";
import type { Project } from "./Project";
import ProjectList from "./ProjectList";
import { projectAPI } from "./projectAPI";

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    projectAPI
      .get(1)
      .then((data) => {
        setError(undefined);
        setLoading(false);
        setProjects(data);
      })
      .catch((error) => {
        setLoading(false);
        if (error instanceof Error) {
          setError(error.message);
        }
      });
  }, []);

  // useEffect(() => {
  //   async function loadProjects() {
  //     setLoading(true);
  //     try {
  //       const data = await projectAPI.get(1);
  //       setError(undefined);
  //       setProjects(data);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         setError(error.message);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   loadProjects();
  // }, []);

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
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse"></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
      <ProjectList projects={projects} onSave={handleSave} />
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}
