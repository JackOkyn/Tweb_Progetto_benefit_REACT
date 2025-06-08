// src/components/NewEducationModal.tsx
import React, { useState } from "react";

interface NewEducationModalProps {
    isOpen: boolean;
    onClose: () => void;
    /**
     * Adesso onCreate riceve ANCHE il File (immagine)
     * invece di un semplice imageUrl string.
     */
    onCreate: (title: string, snippet: string, file: File | null) => void;
}

const NewEducationModal: React.FC<NewEducationModalProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 onCreate,
                                                             }) => {
    const [title, setTitle] = useState("");
    const [snippet, setSnippet] = useState("");
    // Stato locale per il File
    const [file, setFile] = useState<File | null>(null);

    /** Gestione cambio file */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        } else {
            setFile(null);
        }
    };

    /** Gestione submit */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Passiamo i dati al genitore: (title, snippet, file)
        onCreate(title, snippet, file);

        // Reset
        setTitle("");
        setSnippet("");
        setFile(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full relative">
                <h2 className="text-xl font-bold mb-4">Crea un nuovo post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block font-medium">Titolo</label>
                        <input
                            type="text"
                            className="w-full border px-2 py-1 rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Titolo del post"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium">Testo (snippet)</label>
                        <textarea
                            className="w-full border px-2 py-1 rounded"
                            rows={4}
                            value={snippet}
                            onChange={(e) => setSnippet(e.target.value)}
                            placeholder="Breve testo del tuo post..."
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium">Allega immagine</label>
                        <input
                            type="file"
                            className="w-full"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 transition"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        >
                            Pubblica
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewEducationModal;
