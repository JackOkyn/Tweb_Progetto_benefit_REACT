// src/components/NewProjectModal.tsx

import React, { useState } from "react";

/** Props che riceve il modal */
interface NewProjectModalProps {
    isOpen: boolean;                     // se true, mostriamo il pop-up
    onClose: () => void;                // callback per chiudere
    onCreate: (title: string, image: string, desc: string) => void;
    author?: string;                    // facoltativo: l’utente admin
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
                                                             isOpen,
                                                             onClose,
                                                             onCreate,
                                                             author,
                                                         }) => {
    // Stati locali per i campi
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");

    // Reset dei campi quando si chiude o si crea il progetto
    const handleReset = () => {
        setTitle("");
        setImageUrl("");
        setDescription("");
    };

    // Gestione submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(title, imageUrl, description);
        // Dopo la creazione, chiudiamo e resettiamo
        onClose();
        handleReset();
    };

    // Se la modale è chiusa (isOpen=false), non renderizziamo nulla
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            {/* Contenitore modale */}
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
                <h2 className="text-lg font-bold mb-4">
                    Crea un nuovo progetto
                </h2>
                {/* Autore (opzionale, potresti mostrare l'admin) */}
                {author && (
                    <p className="text-sm text-gray-500 mb-2">
                        Creato da: <strong>{author}</strong>
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block font-semibold mb-1">
                            Titolo
                        </label>
                        <input
                            type="text"
                            className="w-full border px-2 py-1 rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block font-semibold mb-1">
                            Immagine (URL)
                        </label>
                        <input
                            type="text"
                            className="w-full border px-2 py-1 rounded"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block font-semibold mb-1">
                            Descrizione
                        </label>
                        <textarea
                            className="w-full border px-2 py-1 rounded"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                handleReset();
                            }}
                            className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400 transition"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                        >
                            Pubblica
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewProjectModal;
