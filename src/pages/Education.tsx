import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import WindowsEducation from "../components/WindowsEducation";

interface PostData {
    id: number;
    author: string;
    title: string;
    imageUrl: string;
    snippet: string;
    likes: number;
}

const Education: React.FC = () => {
    const { user } = useAuth();

    const [posts, setPosts] = useState<PostData[]>([
        {
            id: 1,
            author: "Pippo Rossi",
            title: "Panico, non nevica da 3 mesi",
            imageUrl: "https://source.unsplash.com/random/800x600/?windows",
            snippet:
                "Siamo ormai al 1 di settembre ed in italia non nevica da 3 mesi, enorma crisi climatic aper il paese, nel panico gli appassionati di sci",
            likes: 3,
        },
        {
            id: 2,
            author: "Maria Verdi",
            title: "Ghiacciai sempre piu sottili",
            imageUrl: "https://source.unsplash.com/random/801x601/?windows",
            snippet:
                "I ghiacciai, spesso definiti i “giganti silenziosi” della natura, si stanno assottigliando a un ritmo allarmante a causa del cambiamento climatico. Queste maestose riserve di ghiaccio, che per millenni hanno regolato l'equilibrio idrico e climatico del pianeta, stanno perdendo massa sotto l'effetto del riscaldamento globale. Lo scioglimento accelerato non solo minaccia ecosistemi unici, ma influisce anche sull'approvvigionamento d'acqua di milioni di persone, innalzando il livello dei mari e aumentando il rischio di eventi climatici estremi. La progressiva riduzione dei ghiacciai è un segnale evidente della crisi climatica e un monito per agire con urgenza nella salvaguardia del nostro pianeta.",
            likes: 5,
        },
    ]);

    /** Simuliamo la creazione di un nuovo post.
     * In futuro qui potremmo fare una chiamata POST al server Spring:
     * fetch("/api/posts", {method: "POST", body: ... })
     */
    const handleNewPost = () => {
        const newPost: PostData = {
            id: Date.now(),
            author: user?.nickname || "Autore sconosciuto",
            title: "Nuovo articolo su Windows",
            imageUrl: "https://source.unsplash.com/random/802x602/?windows",
            snippet:
                "Questo è un nuovo post creato da un admin. (Dati fittizi) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel libero nunc...",
            likes: 0,
        };
        setPosts((prev) => [...prev, newPost]);
    };

    /** Simuliamo l'eliminazione di un post.
     * In futuro qui potremmo fare una chiamata DELETE al server:
     * fetch(`/api/posts/${id}`, { method: "DELETE" })
     */
    const handleDeletePost = (id: number) => {
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };

    /** Simuliamo il "Like" di un post.
     * In futuro qui potremmo fare una chiamata PATCH/PUT/POST al server:
     * fetch(`/api/posts/${id}/like`, {method: "POST"})
     */
    const handleLikePost = (id: number) => {
        setPosts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
        );
    };

    return (
        <div className="w-full p-6">
            {/* Intestazione pagina */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold mb-6">Education</h1>

                {/* Visibile solo se ruolo = admin */}
                {user?.role === "admin" && (
                    <button
                        onClick={handleNewPost}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition"
                    >
                        Nuovo post
                    </button>
                )}
            </div>

            {/* Elenco di WindowsEducation incolonnati */}
            <div className="flex flex-col space-y-6">
                {posts.map((post) => (
                    <WindowsEducation
                        key={post.id}
                        post={post}
                        onDelete={handleDeletePost}
                        onLike={handleLikePost} // passiamo la callback di "like"
                    />
                ))}
            </div>
        </div>
    );
};

export default Education;
