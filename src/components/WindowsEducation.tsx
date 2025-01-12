import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import CommentsSection from "./CommentsSection";

interface PostData {
    id: number;
    author: string;
    title: string;
    imageUrl: string;
    snippet: string;
    likes: number;
}

interface WindowsEducationProps {
    post: PostData;
    onDelete: (id: number) => void;
    onLike?: (id: number) => void;
}

const WindowsEducation: React.FC<WindowsEducationProps> = ({
                                                               post,
                                                               onDelete,
                                                               onLike,
                                                           }) => {
    const { user } = useAuth();

    const [isExpanded, setIsExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // Per anteprima snippet
    const previewLength = 100;
    const snippetPreview =
        post.snippet.length > previewLength
            ? post.snippet.slice(0, previewLength) + "..."
            : post.snippet;

    // Elimina articolo (solo admin)
    const handleDeleteArticle = () => {
        onDelete(post.id);
        /*
          // In futuro potresti fare una DELETE al server:
          // fetch(`/api/posts/${post.id}`, { method: "DELETE" })
          //   .then(() => onDelete(post.id))
          //   .catch(err => console.error(err));
        */
    };

    // Gestione Like
    const handleLike = () => {
        setIsLiked(true);
        if (onLike) onLike(post.id);
    };

    return (
        <div
            className="
        relative p-4 bg-white text-black rounded shadow-md
        w-full max-w-3xl mx-auto
        transition-transform duration-300 hover:shadow-xl
      "
        >
            {/* Nome autore */}
            <div className="absolute top-2 left-2 flex items-center text-blue-600">
                <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M12 12c2.21 0 4-1.79 4-4S14.21
          4 12 4s-4 1.79-4 4 1.79 4
          4 4zm0 2c-2.67 0-8 1.34-8
          4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span className="font-semibold">{post.author}</span>
            </div>

            {/* Bottone Elimina articolo (admin) */}
            {user?.role === "admin" && (
                <button
                    onClick={handleDeleteArticle}
                    className="absolute top-2 right-2 bg-red-500 text-white font-bold px-2 py-1 rounded hover:bg-red-600 transition"
                >
                    Elimina articolo
                </button>
            )}

            {/* Titolo, immagine */}
            <h2 className="text-xl font-bold mb-2 mt-6">{post.title}</h2>
            <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-auto mb-2 rounded"
            />

            {/* Testo anteprima o completo */}
            <p className="text-gray-700 mb-4">
                {isExpanded ? post.snippet : snippetPreview}
            </p>

            {/* Sezione pulsanti (Espandi/Like) */}
            <div className="flex items-center justify-between">
                {/* Espandi/Comprimi, se il testo supera la preview */}
                {post.snippet.length > previewLength && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                    >
                        {isExpanded ? "Comprimi" : "Espandi"}
                    </button>
                )}

                {/* Like + count */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-700 font-medium">{post.likes} Like</span>
                    <button
                        onClick={handleLike}
                        className={`
              px-4 py-2 rounded transition 
              ${isLiked ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"}
            `}
                    >
                        Like
                    </button>
                </div>
            </div>

            {/* Sezione commenti (sempre visibile, i permessi si gestiscono dentro CommentsSection) */}
            <CommentsSection articleId={post.id} />
        </div>
    );
};

export default WindowsEducation;
