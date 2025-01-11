import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

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
    onLike?: (id: number) => void; // funzione fittizia/real backend
}

const WindowsEducation: React.FC<WindowsEducationProps> = ({
                                                               post,
                                                               onDelete,
                                                               onLike,
                                                           }) => {
    const { user } = useAuth();

    // Per gestire l’espansione del testo
    const [isExpanded, setIsExpanded] = useState(false);

    // Per gestire il colore del pulsante "Like"
    const [isLiked, setIsLiked] = useState(false);

    // Elimina articolo (solo admin)
    const handleDeleteArticle = () => {
        onDelete(post.id);
        /*
          // In futuro potremmo fare una chiamata DELETE al server:
          fetch(`/api/posts/${post.id}`, { method: "DELETE" })
          .then(() => onDelete(post.id))
          .catch((err) => console.error(err));
        */
    };

    // Gestione Like (fittizia, in futuro chiamiamo il server)
    const handleLike = () => {
        setIsLiked(true); // Il pulsante diventa verde una volta cliccato
        if (onLike) {
            onLike(post.id);
            /*
              // Esempio di chiamata al server:
              fetch(`/api/posts/${post.id}/like`, { method: "POST" })
                .then(() => onLike(post.id))
                .catch((err) => console.error(err));
            */
        }
    };

    // Testo anteprima vs completo
    const previewLength = 100;
    const snippetPreview =
        post.snippet.length > previewLength
            ? post.snippet.slice(0, previewLength) + "..."
            : post.snippet;

    return (
        <div
            className="
            bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4
        relative  text-black
        w-full max-w-3xl mx-auto
        transition-transform duration-300 hover:shadow-2xl
      "
        >
            {/* Nome autore con piccola icona profilo */}
            <div className="absolute top-2 left-2 flex items-center text-blue-600">
                {/* Icona utente (SVG) */}
                <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2
          c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span className="font-semibold">{post.author}</span>
            </div>

            {/* Elimina articolo (solo per admin) */}
            {user?.role === "admin" && (
                <button
                    onClick={handleDeleteArticle}
                    className="
            absolute top-2 right-2 bg-red-500 text-white font-bold px-2 py-1 rounded
            hover:bg-red-600 transition
          "
                >
                    Elimina articolo
                </button>
            )}

            <h2 className="text-xl font-bold mb-2 mt-6">{post.title}</h2>
            <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 mb-2 rounded-lg"
            />

            {/* Testo anteprima o completo */}
            <p className="text-gray-700 mb-4">
                {isExpanded ? post.snippet : snippetPreview}
            </p>

            <div className="flex items-center justify-between">
                {/* Espandi/Comprimi, se il testo è più lungo di previewLength */}
                {post.snippet.length > previewLength && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                    >
                        {isExpanded ? "Comprimi" : "Espandi"}
                    </button>
                )}

                {/* Sezione Like: numero di like e pulsante Like */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-700 font-medium">{post.likes} Like</span>
                    <button
                        onClick={handleLike}
                        className={`
              px-4 py-2 rounded transition 
              ${isLiked
                            ? "bg-green-500 text-white"        // diventa verde se già cliccato
                            : "bg-gray-200 hover:bg-gray-300"   // default se non cliccato
                        }
            `}
                    >
                        Like
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WindowsEducation;
