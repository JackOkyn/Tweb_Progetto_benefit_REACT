import React, { useState } from "react";
import { ProjectData } from "../context/ProjectsContext";
import { useAuth } from "../context/AuthContext";

interface WindowsProjectProps {
    project: ProjectData;
    onJoin: (id: number) => void;
}

const WindowsProject: React.FC<WindowsProjectProps> = ({ project, onJoin }) => {
    const { user } = useAuth(); // per sapere se l'utente è loggato

    // Stato locale per gestire l'espansione/anteprima della descrizione
    const [isExpanded, setIsExpanded] = useState(false);

    // Lunghezza massima del testo in anteprima (puoi modificare a piacere)
    const previewLength = 150;

    // Se la descrizione supera i 150 caratteri, costruiamo una anteprima
    const descriptionPreview =
        project.description.length > previewLength
            ? project.description.slice(0, previewLength) + "..."
            : project.description;

    const handleJoinClick = () => {
        onJoin(project.id);
        /*
          In un caso reale, potresti fare:
          fetch(`/api/projects/${project.id}/join`, { method: "POST" })
            .then(() => onJoin(project.id))
            .catch((err) => console.error(err));
        */
    };

    // Toggle per Espandi/Comprimi
    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
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
                    <path d="M12 12c2.21 0 4-1.79 4-4S14.21
          4 12 4s-4 1.79-4 4 1.79 4
          4 4zm0 2c-2.67 0-8 1.34-8
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

            {/* Se isExpanded è true, mostriamo la descrizione completa, altrimenti la preview */}
            <p className="text-gray-700 mb-4">
                {isExpanded ? project.description : descriptionPreview}
            </p>

            <div className="flex items-center space-x-2">
                {/* Bottone ESPANDI/COMPRIMI (visibile sempre) */}
                {project.description.length > previewLength && (
                    <button
                        onClick={toggleExpand}
                        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                    >
                        {isExpanded ? "Comprimi" : "Espandi"}
                    </button>
                )}

                {/* Bottone PARTECIPO (visibile solo se utente è loggato) */}
                {user && (
                    <button
                        onClick={handleJoinClick}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Partecipo
                    </button>
                )}
            </div>
        </div>
    );
};

export default WindowsProject;
