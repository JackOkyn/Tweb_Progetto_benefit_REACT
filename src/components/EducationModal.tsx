import React from "react";
import { Education } from "../types/Education";

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
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                    {education.id ? "Modifica" : "Nuova"} Educazione
                </h2>
                <form onSubmit={onSubmit}>
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
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
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
