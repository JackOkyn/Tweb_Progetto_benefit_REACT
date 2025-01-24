// src/components/WindowsProject.tsx
import React, { useState } from "react";
import { ProjectData, useProjects } from "../context/ProjectsContext";
import { useAuth } from "../context/AuthContext";
import EditProjectModal from "./EditProjectModal";

interface WindowsProjectProps {
    project: ProjectData;
}

const WindowsProject: React.FC<WindowsProjectProps> = ({ project }) => {
    const { user } = useAuth();
    const {
        myActivity,
        joinProject,
        leaveProject,
        updateProject,
    } = useProjects();

    const [showEditModal, setShowEditModal] = useState(false);

    // verifichiamo se l'utente partecipa già
    const isParticipant = myActivity.some((p) => p.id === project.id);

    const handleToggleParticipation = () => {
        if (!user) return;
        if (isParticipant) {
            leaveProject(project.id);
        } else {
            joinProject(project.id);
        }
    };

    // Apertura/chiusura modale
    const handleOpenEdit = () => {
        setShowEditModal(true);
    };
    const handleCloseEdit = () => {
        setShowEditModal(false);
    };

    // Salvataggio modifiche (riceviamo un ProjectData aggiornato)
    const handleSaveEdit = (updated: ProjectData) => {
        // In futuro: fetch(`/api/projects/${updated.id}`, { method: "PUT", body: JSON.stringify(updated) } )
        updateProject(updated);
        // Il context aggiorna i progetti. Questo componente si ridisegna con i nuovi campi.
    };

    return (
        <div className="relative p-4 bg-white rounded shadow-md hover:shadow-lg transition mb-4 w-full mx-auto">
            {/* Bottone Modifica Progetto, in alto a destra, visibile solo se l'utente è admin
          (oppure se preferisci l'autore, controlla user?.nickname === project.author) */}
            {user?.role === "admin" && (
                <button
                    onClick={handleOpenEdit}
                    className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded hover:bg-orange-700 transition"
                >
                    Modifica progetto
                </button>
            )}

            <div className="flex items-center mb-2">
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
                className="w-full h-48 mb-2 rounded"
            />
            <p className="text-gray-700 mb-4">{project.description}</p>

            <div className="flex items-center space-x-4">
                {user && (
                    <button
                        onClick={handleToggleParticipation}
                        className={`
              px-4 py-2 rounded transition text-white
              ${isParticipant
                            ? "bg-orange-600 hover:bg-orange-700"
                            : "bg-green-500 hover:bg-green-600"
                        }
            `}
                    >
                        {isParticipant ? "Annulla partecipazione" : "Partecipo"}
                    </button>
                )}
                <span className="text-gray-700">
          {project.participants} partecipanti
        </span>
            </div>

            {/* Modale per modificare il progetto */}
            <EditProjectModal
                isOpen={showEditModal}
                onClose={handleCloseEdit}
                project={project}
                onSave={handleSaveEdit}
            />
        </div>
    );
};

export default WindowsProject;
