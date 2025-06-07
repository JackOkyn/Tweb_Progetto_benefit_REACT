import React, { useEffect, useState } from "react";
import { educationService } from "../service/educationServices";
import { Education } from "../types/Education";
import WindowsEducation from "../components/WindowsEducation";

const EducationPage: React.FC = () => {
    const [educations, setEducations] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [currentEducation, setCurrentEducation] = useState<Partial<Education>>({
        titleEducation: "",
        commentEducation: [],
    });

    useEffect(() => {
        loadEducations();
    }, []);

    const loadEducations = async () => {
        try {
            const data = await educationService.getAll();
            setEducations(data);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Errore nel caricamento");
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Sei sicuro di voler eliminare questa educazione?")) {
            try {
                await educationService.delete(id);
                loadEducations();
            } catch (err) {
                setError(err instanceof Error ? err.message : "Errore nell'eliminazione");
            }
        }
    };

    const handleLike = async (id: number) => {
        try {
            await educationService.like(id);
            loadEducations();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Errore nel mettere like");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentEducation.id) {
                await educationService.update(currentEducation.id, currentEducation);
            } else {
                await educationService.create(currentEducation);
            }
            setShowModal(false);
            loadEducations();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Errore nel salvataggio");
        }
    };

    if (loading) return <div>Caricamento in corso...</div>;
    if (error) return <div>Errore: {error}</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-black">Lista delle Educazioni</h1>
                <button
                    onClick={() => {
                        setCurrentEducation({ titleEducation: "", commentEducation: [] });
                        setShowModal(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Nuova Educazione
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {educations.map((edu) => (
                    <WindowsEducation
                        key={edu.id}
                        id={edu.id}
                        title={edu.titleEducation}
                        author={edu.userId ? `Utente #${edu.userId}` : "Sconosciuto"}
                        likes={edu.likesEducation}
                        comments={edu.commentEducation}
                        onLike={handleLike}
                        onEdit={() => {
                            setCurrentEducation(edu);
                            setShowModal(true);
                        }}
                        onDelete={() => handleDelete(edu.id)}
                    />
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">
                            {currentEducation.id ? "Modifica" : "Nuova"} Educazione
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Titolo</label>
                                <input
                                    type="text"
                                    value={currentEducation.titleEducation || ""}
                                    onChange={(e) =>
                                        setCurrentEducation({
                                            ...currentEducation,
                                            titleEducation: e.target.value,
                                        })
                                    }
                                    className="w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
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
            )}
        </div>
    );
};

export default EducationPage;
