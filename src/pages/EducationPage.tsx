// src/pages/EducationPage.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Education} from "../types/Education";
import { CommentEducation } from "../types/CommentEducation";
import { educationService } from "../service/educationServices";
import { commentEducationService } from "../service/commentEducationService";
import WindowsEducation from "../components/WindowsEducation";
import EducationModal from "../components/EducationModal";

const EducationPage: React.FC = () => {
    const { user } = useAuth();
    const [educations, setEducations] = useState<Education[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Partial<Education>>({});

    // Carica tutte le educazioni
    useEffect(() => {
        educationService
            .getAll()
            .then(setEducations)
            .catch((err) => console.error(err));
    }, []);

    // Apri modal per creazione
    const handleNew = () => {
        setEditing({});
        setModalOpen(true);
    };

    // Apri modal per modifica
    const handleEditEducation = (edu: Education) => {
        setEditing({
            id: edu.id,
            titleEducation: edu.titleEducation,
            descriptionEducation: edu.descriptionEducation,
            userId: edu.user,
        });
        setModalOpen(true);
    };

    // Elimina un articolo
    const handleDeleteEducation = async (id: number) => {
        if (!window.confirm("Sei sicuro di voler eliminare questo articolo?")) {
            return;
        }
        try {
            await educationService.delete(id);
            setEducations((prev) => prev.filter((e) => e.id !== id));
        } catch (err) {
            console.error(err);
            alert("Errore durante l'eliminazione");
        }
    };

    // Submit del modal (create o update)
    const handleModalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editing.id) {
                // --- UPDATE ---
                const updated = await educationService.update(
                    editing.id,
                    editing
                );
                setEducations((prev) =>
                    prev.map((e) => (e.id === updated.id ? updated : e))
                );
            } else {
                // --- CREATE ---
                const toCreate: Partial<Education> = {
                    ...editing,
                    userId: user?.id,
                };
                const created = await educationService.create(toCreate);
                setEducations((prev) => [...prev, created]);
            }
            setModalOpen(false);
        } catch (err) {
            console.error(err);
            alert("Errore nel salvataggio");
        }
    };

    // Aggiungi commento (già funzionante)
    const handleAddComment = async (
        educationId: number,
        commentText: string
    ) => {
        try {
            const newComment: CommentEducation =
                await commentEducationService.addComment(
                    educationId,
                    commentText
                );
            setEducations((prev) =>
                prev.map((e) =>
                    e.id === educationId
                        ? {
                            ...e,
                            commentEducation: [...e.commentEducation, newComment],
                        }
                        : e
                )
            );
        } catch (err) {
            console.error(err);
            alert("Impossibile aggiungere il commento");
        }
    };

    // Elimina commento (già funzionante)
    const handleDeleteComment = async (commentId: number) => {
        try {
            await commentEducationService.deleteComment(commentId);
            setEducations((prev) =>
                prev.map((e) => ({
                    ...e,
                    commentEducation: e.commentEducation.filter(
                        (c) => c.idEducation !== commentId
                    ),
                }))
            );
        } catch (err) {
            console.error(err);
            alert("Impossibile eliminare il commento");
        }
    };

    return (
        <div className="p-6 space-y-4">
            {/* Solo admin può creare */}
            {user?.role?.toLowerCase() === "admin" && (
                <button
                    onClick={handleNew}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Nuova Educazione
                </button>
            )}

            {/* Lista di cards */}
            {educations.map((edu) => (
                <WindowsEducation
                    key={edu.id}
                    id={edu.id}
                    title={edu.titleEducation}
                    author={edu.user?.username || "Sconosciuto"}
                    likes={edu.likesEducation ?? 0}
                    description={edu.descriptionEducation}
                    comments={edu.commentEducation}
                    onLike={() => {}}
                    onEdit={() => handleEditEducation(edu)}
                    onDelete={() => handleDeleteEducation(edu.id)}
                    onAddComment={handleAddComment}
                    onDeleteComment={handleDeleteComment}
                />
            ))}

            {/* Modal per create/edit */}
            {modalOpen && (
                <EducationModal
                    education={editing}
                    setEducation={setEditing}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleModalSubmit}
                />
            )}
        </div>
    );
};

export default EducationPage;
