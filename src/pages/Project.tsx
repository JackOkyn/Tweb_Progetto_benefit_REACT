// src/pages/Project.tsx
import React, { useState } from "react";
import { useProjects } from "../context/ProjectsContext";
import WindowsProject from "../components/WindowsProject";
import { useAuth } from "../context/AuthContext";
import NewProjectModal from "../components/NewProjectModal";

const Project: React.FC = () => {
    const { user } = useAuth();
    const { projects, addProject } = useProjects();

    // Stato per la modale
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    /**
     * Funzione chiamata dal modal quando si clicca "Pubblica".
     * Riceve i campi (title, imageUrl, desc) e crea il progetto.
     */
    const handleCreateProject = (
        title: string,
        image: string,
        desc: string
    ) => {
        if (!user) return;

        // fetch al server:
        /*
        fetch("/api/projects", {
          method: "POST",
          body: JSON.stringify({
            author: user.nickname,
            title,
            imageUrl: image,
            description: desc,
          }),
          headers: { "Content-Type": "application/json" },
        })
          .then(res => res.json())
          .then((createdProject) => {
            // Aggiorna localmente
            setProjects((prev) => [...prev, createdProject]);
          });
        */

        // Fittizio: usiamo addProject dal context
        addProject({
            author: user.nickname,
            title,
            imageUrl: image,
            description: desc,
        });
    };

    return (
        <div className="p-4 relative">
            {/* Intestazione + bottone "Nuovo Progetto" (solo admin) */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Lista Progetti</h1>
                {user?.role === "admin" && (
                    <button
                        onClick={handleOpenModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Nuovo Progetto
                    </button>
                )}
            </div>

            {/* Elenco progetti */}
            <div className="flex flex-col w-full space-y-4">
                {projects.map((proj) => (
                    <WindowsProject key={proj.id} project={proj} />
                ))}
            </div>

            {/* Modale per creare un nuovo progetto:
          Passiamo isOpen, onClose, onCreate.
          L'autore potrebbe essere user?.nickname
      */}
            <NewProjectModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onCreate={handleCreateProject}
                author={user?.nickname}
            />
        </div>
    );
};

export default Project;
