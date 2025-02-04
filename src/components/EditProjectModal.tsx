// src/components/EditProjectModal.tsx
import React, { useState, useEffect } from "react";
import { ProjectData } from "../context/ProjectsContext";

interface EditProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: ProjectData; // il progetto che stiamo modificando
    onSave: (updated: ProjectData) => void; // callback per salvare
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               project,
                                                               onSave,
                                                           }) => {
    // Stati locali per i campi modificabili
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");

    // inizializziamo i campi
    useEffect(() => {
        if (isOpen) {
            setTitle(project.title);
            setImageUrl(project.imageUrl);
            setDescription(project.description);
        }
    }, [isOpen, project]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Creiamo un oggetto aggiornato
        const updatedProject: ProjectData = {
            ...project,
            title,
            imageUrl,
            description,
        };
        // Chiamiamo la callback per “salvare”
        onSave(updatedProject);
        // Chiudiamo  modale
        onClose();
    };

    if (!isOpen) return null; // se isOpen=false, non renderizziamo nulla

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            {/* Modale */}
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Modifica Progetto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block font-semibold mb-1">Titolo</label>
                        <input
                            type="text"
                            className="w-full border px-2 py-1 rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block font-semibold mb-1">Immagine (URL)</label>
                        <input
                            type="text"
                            className="w-full border px-2 py-1 rounded"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block font-semibold mb-1">Descrizione</label>
                        <textarea
                            className="w-full border px-2 py-1 rounded"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400 transition"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                        >
                            Salva
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProjectModal;
