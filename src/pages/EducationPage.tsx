import React, { useEffect, useState } from "react";
import { educationService } from "../service/educationServices";
import { Education } from "../types/Education";
import WindowsEducation from "../components/WindowsEducation";
import EducationModal from "../components/EducationModal";
import { useAuth } from "../context/AuthContext"; // Assunto // percorso da adattare



const EducationPage: React.FC = () => {
    const [educations, setEducations] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [currentEducation, setCurrentEducation] = useState<Partial<Education>>({
        titleEducation: "",
        commentEducation: [],
    });

    const { user } = useAuth(); // ← Otteniamo user con userId o equivalente

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
    const handleDeleteComment = async (commentId: number) => {
        const success = await commentEducationService.deleteComment(commentId);
        if (success) {
            setEducations((prev) =>
                prev.map((edu) => ({
                    ...edu,
                    comments: edu.comments.filter((c) => c.idEducation !== commentId),
                }))
            );
        } else {
            alert("Errore durante l'eliminazione del commento");
        }
    };;

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

        if (!user?.id) {
            alert("Utente non autenticato o senza ID.");
            return;
        }

        const payload = {
            titleEducation: currentEducation.titleEducation,
            likesEducation: currentEducation.likesEducation ?? 0,
            userId: user.id, // 🔥 NECESSARIO!
        };

        try {
            if (currentEducation.id) {
                await educationService.update(currentEducation.id, payload);
            } else {
                await educationService.create(payload); // 💡 Deve contenere userId
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
                    Nuovo articolo
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
                        onDeleteComment={handleDeleteComment}
                    />
                ))}
            </div>

            {showModal && (
                <EducationModal
                    education={currentEducation}
                    setEducation={setCurrentEducation}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default EducationPage;
