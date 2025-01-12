import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

/** Definizione di un singolo commento. */
interface CommentData {
    id: number;
    author: string;
    text: string;
}

/** Props ricevute dal componente CommentsSection */
interface CommentsSectionProps {
    /** L'id dell'articolo/post (in questo caso WindowsEducation) a cui si riferiscono i commenti */
    articleId: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ articleId }) => {
    const { user } = useAuth();

    /** Stato con l’elenco dei commenti */
    const [comments, setComments] = useState<CommentData[]>([]);

    /** Stato interno per il testo del commento in input */
    const [newComment, setNewComment] = useState("");

    /**
     * Simuliamo il caricamento dei commenti dal server. (Fittizio)
     * In futuro potresti fare:
     *   useEffect(() => {
     *     fetch(`/api/articles/${articleId}/comments`)
     *       .then(res => res.json())
     *       .then(data => setComments(data))
     *       .catch(err => console.error(err));
     *   }, [articleId]);
     */
    useEffect(() => {
        // Dati fittizi di esempio
        const fakeComments: CommentData[] = [
            {
                id: 1,
                author: "Luigi",
                text: "Davvero interessante!",
            },
            {
                id: 2,
                author: "Anna",
                text: "Grazie per queste info, mi sono state utili.",
            },
        ];
        setComments(fakeComments);
    }, [articleId]);

    /**
     * Funzione per aggiungere un commento. (Fittizia)
     * In futuro:
     *   fetch(`/api/articles/${articleId}/comments`, {
     *     method: "POST",
     *     body: JSON.stringify({ text: newComment }),
     *     headers: { "Content-Type": "application/json" },
     *   })
     *     .then(() => caricare di nuovo i commenti dal server oppure aggiornarli in locale)
     *     .catch(err => console.error(err));
     */
    const handleAddComment = () => {
        if (!user) return; // se non è loggato, non facciamo nulla

        const newId = Date.now(); // id univoco fittizio
        const comment: CommentData = {
            id: newId,
            author: user.nickname, // o user.email, come preferisci
            text: newComment,
        };
        setComments((prev) => [...prev, comment]);
        setNewComment("");
    };

    /**
     * Funzione per eliminare un commento (disponibile solo ad admin).
     * In futuro:
     *   fetch(`/api/articles/${articleId}/comments/${commentId}`, { method: "DELETE" })
     *     .then(() => rimuovere il commento dallo stato)
     *     .catch(err => console.error(err));
     */
    const handleDeleteComment = (commentId: number) => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-300">
            <h3 className="text-lg font-semibold mb-2">Commenti</h3>

            {/* Mostriamo la lista di commenti */}
            <ul className="space-y-2 mb-4">
                {comments.map((comment) => (
                    <li key={comment.id} className="bg-gray-50 p-2 rounded relative">
                        <span className="text-blue-600 font-semibold">{comment.author}</span>:{" "}
                        <span>{comment.text}</span>

                        {/* Bottone rosso "elimina" SOLO se user?.role === "admin" */}
                        {user?.role === "admin" && (
                            <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="absolute top-2 right-2 bottom-2 bg-red-500 text-white text-xs text-center p-1 rounded hover:bg-red-600 transition"
                            >
                                ELIMINA
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {/* Solo se utente loggato: form per aggiungere un nuovo commento */}
            {user ? (
                <div className="flex space-x-2">
                    <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1 flex-1"
                        placeholder="Scrivi un commento..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        onClick={handleAddComment}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                    >
                        Invia
                    </button>
                </div>
            ) : (
                <p className="text-sm text-gray-600">
                    Devi essere loggato per lasciare un commento.
                </p>
            )}
        </div>
    );
};

export default CommentsSection;
