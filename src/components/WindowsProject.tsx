// src/components/WindowsProject.tsx
import React from "react";
import { ProjectData } from "../context/ProjectsContext";
import { useAuth } from "../context/AuthContext";

interface WindowsProjectProps {
    project: ProjectData;
    onJoin: (projectId: number) => void;
}

const WindowsProject: React.FC<WindowsProjectProps> = ({ project, onJoin }) => {
    const { user } = useAuth();

    const handleJoinClick = async () => {
        if (!user) return;

        try {
            // Chiamata reale al server (commentata finché non hai un backend):
            /*
            const response = await fetch(`/api/projects/${project.id}/join`, {
              method: "POST",
            });
            if (response.ok) {
              onJoin(project.id); // aggiorna localmente lo stato
            } else {
              console.error("Errore nell'aggiunta ai partecipanti");
            }
            */

            // Versione fittizia (senza server):
            onJoin(project.id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow-md hover:shadow-lg transition mb-4 max-w-2xl mx-auto">
            <div className="flex items-center mb-2">
                {/* Piccola icona utente + nome autore */}
                <svg
                    className="w-5 h-5 mr-1 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 12c2.21 0
          4-1.79 4-4S14.21 4 12 4s-4
          1.79-4 4 1.79 4 4 4zm0
          2c-2.67 0-8 1.34-8
          4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span className="font-semibold">{project.author}</span>
            </div>

            <h2 className="text-lg font-bold mb-2">{project.title}</h2>
            <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto mb-2 rounded"
            />
            <p className="text-gray-700 mb-4">{project.description}</p>

            <div className="flex items-center space-x-4">
                {/* Solo se utente loggato */}
                {user && (
                    <button
                        onClick={handleJoinClick}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Partecipo
                    </button>
                )}

                {/* Mostriamo a tutti il numero di partecipanti */}
                <span className="text-gray-700">
          {project.participants} partecipanti
        </span>
            </div>
        </div>
    );
};

export default WindowsProject;
