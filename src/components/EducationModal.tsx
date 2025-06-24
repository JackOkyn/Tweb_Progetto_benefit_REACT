// src/components/EducationModal.tsx
import React from "react";
import { Education } from "../types/Education";

// Massimo caratteri per la descrizione
const MAX_DESC_LENGTH = 255;

interface EducationModalProps {
    education: Partial<Education>;
    setEducation: React.Dispatch<React.SetStateAction<Partial<Education>>>;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

const EducationModal: React.FC<EducationModalProps> = ({
                                                           education,
                                                           setEducation,
                                                           onClose,
                                                           onSubmit,
                                                       }) => {
    const descLength = education.descriptionEducation?.length ?? 0;
    const isDescTooLong = descLength > MAX_DESC_LENGTH;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                    {education.id ? "Modifica" : "Nuova"} Educazione
                </h2>
                <form onSubmit={onSubmit}>
                    {/* Titolo */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Titolo</label>
                        <input
                            type="text"
                            value={education.titleEducation || ""}
                            onChange={(e) =>
                                setEducation((prev) => ({
                                    ...prev,
                                    titleEducation: e.target.value,
                                }))
                            }
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>

                    {/* Descrizione */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Descrizione</label>
                        <textarea
                            value={education.descriptionEducation || ""}
                            onChange={(e) =>
                                setEducation((prev) => ({
                                    ...prev,
                                    descriptionEducation: e.target.value,
                                }))
                            }
                            className="w-full border border-gray-300 p-2 rounded resize-none"
                            rows={4}
                            placeholder="Inserisci la descrizione dell'educazione..."
                        />

                        {/* Contatore caratteri e messaggio errore */}
                        <div className="flex justify-between text-xs mt-1">
              <span>
                {descLength} / {MAX_DESC_LENGTH}
              </span>
                            {isDescTooLong && (
                                <span className="text-red-500">
                  Superato il limite di {MAX_DESC_LENGTH} caratteri!
                </span>
                            )}
                        </div>
                    </div>

                    {/* Bottoni */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            Annulla
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                            disabled={isDescTooLong}
                        >
                            Salva
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EducationModal;
