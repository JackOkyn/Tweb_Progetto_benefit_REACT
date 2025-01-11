import React from "react";
import { useProjects } from "../context/ProjectsContext";
import WindowsProject from "../components/WindowsProject";

const Project: React.FC = () => {
    // Recuperiamo l'elenco dei progetti e la funzione joinProject dal context
    const { projects, joinProject } = useProjects();

    const handleJoinProject = (projectId: number) => {
        // Chiama la funzione del context
        joinProject(projectId);

        /*
          In futuro, potresti inviare una richiesta al server:
          fetch(`/api/projects/${projectId}/join`, { method: "POST" })
            .then(...)
            .catch(err => console.error(err));
        */
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
