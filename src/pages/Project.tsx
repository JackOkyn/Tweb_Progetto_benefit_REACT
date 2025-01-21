// src/pages/Project.tsx
import React from "react";
import { useProjects } from "../context/ProjectsContext";
import WindowsProject from "../components/WindowsProject";

const Project: React.FC = () => {
    const { projects } = useProjects();

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Lista Progetti</h1>
            {projects.map((proj) => (
                <WindowsProject key={proj.id} project={proj} />
            ))}
        </div>
    );
};

export default Project;
