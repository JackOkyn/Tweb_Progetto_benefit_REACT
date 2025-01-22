// src/pages/MyActivity.tsx
import React from "react";
import { useProjects } from "../context/ProjectsContext";
import WindowsProject from "../components/WindowsProject";

const MyActivity: React.FC = () => {
    const { myActivity } = useProjects();

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">I miei progetti</h1>
            {myActivity.length === 0 ? (
                <p>Non hai ancora selezionato alcun progetto.</p>
            ) : (
                <div className="flex flex-col space-y-4">
                    {myActivity.map((proj) => (
                        <WindowsProject key={proj.id} project={proj} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyActivity;
