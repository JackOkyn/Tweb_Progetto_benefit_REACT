// src/pages/Project.tsx
import React from "react";
import { useProjects } from "../context/ProjectsContext";
import WindowsProject from "../components/WindowsProject";

const Project: React.FC = () => {
    const { projects, joinProject } = useProjects();

    /**
     * Funzione che passeremo a WindowsProject,
     * in modo che quando l'utente clicca "Partecipo",
     * venga chiamato joinProject dal context.
     */
    const handleJoinProject = (projectId: number) => {
        joinProject(projectId);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Lista Progetti</h1>
            {projects.map((proj) => (
                <WindowsProject
                    key={proj.id}
                    project={proj}
                    onJoin={handleJoinProject}
                />
            ))}
        </div>
    );
};

export default Project;
