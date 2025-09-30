import { useEffect, useState } from "react";
import type { Project } from "./Project";
import { projectAPI } from "./projectAPI";

export function useProjects() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | undefined>(undefined);

  const [saving, setSaving] = useState(false);
  const [savingError, setSavingError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        if (currentPage === 1) {
          setProjects(data);
        } else {
          setProjects((projects) => [...projects, ...data]);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [currentPage]);

  const saveProject = (project: Project) => {
    setSaving(true);
    projectAPI
      .put(project)
      .then((updatedProject) => {
        const updatedProjects = projects.map((p) =>
          p.id == updatedProject.id ? updatedProject : p
        );
        setProjects(updatedProjects);
      })
      .catch((e) => {
        setSavingError(e.message);
      })
      .finally(() => setSaving(false));
  };

  return {
    projects,
    loading,
    error,
    currentPage,
    setCurrentPage,
    saving,
    savingError,
    saveProject,
  };
}
