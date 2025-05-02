import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

/** Dati di un singolo post */
interface PostData {
    id: number;
    author: string;
    title: string;
    imageUrl: string;
    snippet: string;
    likes: number;
}

/** Dati di un singolo commento */
interface CommentData {
    id: number;
    author: string;
    text: string;
}

/** Props del componente WindowsEducation */
interface WindowsEducationProps {
    post: PostData;
    onDelete: (id: number) => void;   // elimina il post
    onLike: (id: number) => void;     // incrementa i like
}

/**
 * Questo componente mostra:
 * - Il post (titolo, immagine, snippet)
 * - Un bottone "Elimina" (per tutti o solo admin, a scelta)
 * - Un bottone "Like"
 * - Se l'utente è loggato, un form per aggiungere commenti
 * - Lista di commenti, con possibilità di eliminarli se admin
 * - Bottone "Modifica" se admin, per cambiare titolo/immagine/snippet
 */
const WindowsEducation: React.FC<WindowsEducationProps> = ({
                                                               post,
                                                               onDelete,
                                                               onLike,
                                                           }) => {
    const { user } = useAuth();

    // Per gestire localmente eventuali modifiche al post (titolo, immagine, snippet)
    const [localPost, setLocalPost] = useState(post);

    // Stato per i commenti locali (in un caso reale li caricheresti dal server)
    const [comments, setComments] = useState<CommentData[]>([
        // Esempio di 2 commenti fittizi
        { id: 1, author: "Mario", text: "Bel post, grazie!" },
        { id: 2, author: "Luisa", text: "Interessante, ma vorrei saperne di più." },
    ]);

    // Stato per il form di aggiunta commenti
    const [newComment, setNewComment] = useState("");

    // Stato per gestire la modale di modifica del post
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTitle, setEditTitle] = useState(localPost.title);
    const [editImage, setEditImage] = useState(localPost.imageUrl);
    const [editSnippet, setEditSnippet] = useState(localPost.snippet);

    /** Elimina l'intero post */
    const handleDeletePost = () => {
        onDelete(localPost.id);
    };

    /** Aggiunge un like */
    const handleLikePost = () => {
        onLike(localPost.id);
    };

    /** Salvataggio di un nuovo commento */
    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return; // Solo utenti loggati possono commentare

        // In futuro, potresti fare fetch("/api/comments", { method: "POST", ... })
        const newC: CommentData = {
            id: Date.now(),
            author: user.nickname,  // o user.email
            text: newComment,
        };
        setComments((prev) => [...prev, newC]);
        setNewComment("");
    };

    /** Elimina un singolo commento (solo admin) */
    const handleDeleteComment = (commentId: number) => {
        // Se vuoi permettere solo all'admin di farlo:
        if (user?.roles !== "admin") return;

        // In futuro: fetch(`/api/comments/${commentId}`, { method: "DELETE" })
        setComments((prev) => prev.filter((c) => c.id !== commentId));
    };

    /** Apre la modale di modifica se l'utente è admin */
    const openEditModal = () => {
        if (user?.roles === "admin") {
            setEditTitle(localPost.title);
            setEditImage(localPost.imageUrl);
            setEditSnippet(localPost.snippet);
            setShowEditModal(true);
        }
    };

    /** Chiude la modale di modifica */
    const closeEditModal = () => {
        setShowEditModal(false);
    };

    /** Salva le modifiche al post (titolo, immagine, snippet) */
    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();

        // In futuro potresti fare:
        /*
        fetch(`/api/posts/${localPost.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title: editTitle,
            imageUrl: editImage,
            snippet: editSnippet,
          }),
          headers: { "Content-Type": "application/json" }
        })
          .then(res => res.json())
          .then((updatedPost) => {
            setLocalPost(updatedPost);
          })
          .catch(err => console.error(err));
        */

        // Logica fittizia: aggiorniamo localmente
        setLocalPost((prev) => ({
            ...prev,
            title: editTitle,
            imageUrl: editImage,
            snippet: editSnippet,
        }));

        setShowEditModal(false);
    };

    return (
        <div className="relative p-4 bg-white rounded shadow-md hover:shadow-lg transition mb-4 w-full mx-auto">
            {/* Autore in alto a sinistra */}
            <div className="absolute top-2 left-2 font-semibold text-blue-600">
                {localPost.author}
            </div>

            {/* Bottone rosso per eliminare il post */}
            <button
                onClick={handleDeletePost}
                className="absolute top-2 right-2 bg-red-500 text-white font-bold px-2 py-1 rounded hover:bg-red-600 transition"
            >
                X
            </button>

            {/* Se l'utente è admin, mostra il bottone "Modifica" */}
            {user?.roles === "admin" && (
                <button
                    onClick={openEditModal}
                    className="absolute top-2 right-10 bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600 transition"
                >
                    Modifica
                </button>
            )}

            <h2 className="text-lg font-bold mb-2">{localPost.title}</h2>
            <img
                src={localPost.imageUrl}
                alt={localPost.title}
                className="w-full max-h-48 mb-2 rounded"
            />
            {/* <p className="text-gray-700 mb-4">{localPost.snippet}</p> */}

            {/* Like */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handleLikePost}
                    className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded transition"
                >
                    Like
                </button>
                <span className="text-gray-700">{localPost.likes} Like</span>
            </div>

            {/* Sezione Commenti */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Commenti</h3>

                {/* Lista di commenti */}
                <ul className="space-y-2">
                    {comments.map((comment) => (
                        <li key={comment.id} className="bg-gray-50 p-2 rounded relative">
              <span className="font-semibold text-blue-600 mr-2 pb-4">
                {comment.author}:
              </span>
                            <span>{comment.text}</span>

                            {/* Bottone elimina commento, visibile solo da admin */}
                            {user?.roles === "admin" && (
                                <button
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="absolute top-1.5 right-2 bottom-1.5 text-sm bg-red-400 text-white p-1 rounded hover:bg-red-500"
                                >
                                    Elimina
                                </button>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Form per aggiungere nuovo commento (solo se loggato) */}
                {user && (
                    <form onSubmit={handleAddComment} className="mt-4">
                        <label className="block font-medium mb-1">Aggiungi un commento</label>
                        <textarea
                            className="w-full border px-2 py-1 rounded mb-2"
                            rows={2}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Scrivi il tuo commento..."
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                            Invia
                        </button>
                    </form>
                )}
            </div>

            {/* Modale di modifica post  */}
            {showEditModal && user?.roles === "admin" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md max-w-md w-full relative">
                        <h2 className="text-xl font-bold mb-4">Modifica Post</h2>
                        <form onSubmit={handleSaveEdit}>
                            <div className="mb-3">
                                <label className="block font-medium">Titolo</label>
                                <input
                                    type="text"
                                    className="w-full border px-2 py-1 rounded"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block font-medium">Immagine (URL)</label>
                                <input
                                    type="text"
                                    className="w-full border px-2 py-1 rounded"
                                    value={editImage}
                                    onChange={(e) => setEditImage(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block font-medium">Snippet</label>
                                <textarea
                                    className="w-full border px-2 py-1 rounded"
                                    rows={3}
                                    value={editSnippet}
                                    onChange={(e) => setEditSnippet(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 transition"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
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

export default WindowsEducation;
