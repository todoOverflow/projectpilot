import { useEffect, useState } from "react";
import type { Project } from "./Project";
import ProjectList from "./ProjectList";
import { projectAPI } from "./projectAPI";

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    projectAPI
      .get(currentPage)
      .then((data) => {
        setError(undefined);
        setLoading(false);
        if (currentPage === 1) {
          setProjects(data);
        } else {
          setProjects((projects) => [...projects, ...data]);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error instanceof Error) {
          setError(error.message);
        }
      });
  }, [currentPage]);

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

  function handleMoreClick() {
    setCurrentPage((currentPage) => currentPage + 1);
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
      {!loading && !error && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}
