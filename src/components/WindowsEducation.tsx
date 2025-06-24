// src/components/WindowsEducation.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {CommentEducation} from "../types/CommentEducation.ts";


export interface Comment {
    idEducation: number;
    educationComment: string;
}

export interface WindowsEducationProps {
    id: number;
    title: string;
    author: string;
    likes: number;
    description: string;
    comments: CommentEducation[];
    onLike: (id: number) => void;
    onEdit: () => void;
    onDelete: () => void;
    onAddComment?: (id: number, comment: string) => void;
    onDeleteComment?: (commentId: number) => void;
}

const WindowsEducation: React.FC<WindowsEducationProps> = ({
                                                               id,
                                                               title,
                                                               author,
                                                               likes,
                                                               description,
                                                               comments,
                                                               onLike,
                                                               onEdit,
                                                               onDelete,
                                                               onAddComment,
                                                               onDeleteComment,
                                                           }) => {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const safeComments = comments ?? [];
    const safeDescription = description ?? "";

    const PREVIEW_LENGTH = 200;
    const isLong = safeDescription.length > PREVIEW_LENGTH;
    const previewText = isLong
        ? safeDescription.slice(0, PREVIEW_LENGTH) + "…"
        : safeDescription;

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() && onAddComment) {
            onAddComment(id, newComment.trim());
            setNewComment("");
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all space-y-4">
            {/* Autore e Titolo */}
            <div className="text-sm text-gray-500">
                Autore: {author || "Sconosciuto"}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

            {/* Descrizione */}
            <div className="text-gray-700 text-sm">
                <p>{isExpanded ? safeDescription : previewText}</p>
                {isLong && (
                    <button
                        onClick={() => setIsExpanded((prev) => !prev)}
                        className="text-blue-500 text-xs mt-1 hover:underline"
                    >
                        {isExpanded ? "Mostra meno" : "Espandi"}
                    </button>
                )}
            </div>

            {/* Like & Admin actions */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => onLike(id)}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm"
                >
                    ❤️ Like <span className="ml-2">{likes}</span>
                </button>
                {user?.role?.toLowerCase() === "admin" && (
                    <div className="flex gap-2">
                        <button
                            onClick={onEdit}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                            Modifica
                        </button>
                        <button
                            onClick={onDelete}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                            Elimina
                        </button>
                    </div>
                )}
            </div>

            {/* Commenti (visibili a tutti) */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Commenti</h3>
                {safeComments.length === 0 ? (
                    <p className="text-gray-400 italic">Nessun commento ancora.</p>
                ) : (
                    <ul className="space-y-2">
                        {safeComments.map((c) => (
                            <li
                                key={c.idEducation}
                                className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700 flex justify-between items-center"
                            >
                                <span>{c.educationComment}</span>
                                {user?.role?.toLowerCase() === "admin" && onDeleteComment && (
                                    <button
                                        onClick={() => onDeleteComment(c.idEducation)}
                                        className="text-red-500 text-xs hover:underline ml-4"
                                    >
                                        Elimina
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Nuovo commento (solo se loggati) */}
            {user && onAddComment && (
                <form onSubmit={handleCommentSubmit} className="mt-4 flex flex-col gap-2">
          <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Aggiungi un commento..."
              className="border border-gray-300 rounded-lg p-2 resize-none text-sm"
              rows={2}
          />
                    <button
                        type="submit"
                        className="self-end bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full text-sm"
                    >
                        Invia
                    </button>
                </form>
            )}
        </div>
    );
};

export default WindowsEducation;
