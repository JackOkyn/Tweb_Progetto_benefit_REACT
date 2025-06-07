import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Comment {
    idEducation: number;
    educationComment: string;
}

interface WindowsEducationProps {
    id: number;
    title: string;
    author: string;
    likes: number;
    comments: Comment[];
    onLike: (id: number) => void;
    onEdit: () => void;
    onDelete: () => void;
    onAddComment?: (id: number, comment: string) => void;
}

const WindowsEducation: React.FC<WindowsEducationProps> = ({
                                                               id,
                                                               title,
                                                               author,
                                                               likes,
                                                               comments,
                                                               onLike,
                                                               onEdit,
                                                               onDelete,
                                                               onAddComment,
                                                           }) => {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState("");

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() && onAddComment) {
            onAddComment(id, newComment.trim());
            setNewComment("");
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all space-y-4">
            <div className="text-sm text-gray-500">Autore: {author || "Sconosciuto"}</div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

            <div className="flex items-center justify-between">
                <button
                    onClick={() => onLike(id)}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm"
                >
                    ❤️ Like <span className="ml-2">{likes}</span>
                </button>

                {user?.role === "admin" && (
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

            {/* Commenti */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Commenti</h3>
                {comments.length === 0 ? (
                    <p className="text-gray-400 italic">Nessun commento ancora.</p>
                ) : (
                    <ul className="space-y-2">
                        {comments.map((c, index) => (
                            <li
                                key={index}
                                className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700"
                            >
                                {c.educationComment}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Aggiunta commento (solo se loggati) */}
            {user && (
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
