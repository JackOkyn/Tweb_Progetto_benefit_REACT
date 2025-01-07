import React, { useState } from "react";

interface Post {
    id: number;
    authorName: string;
    authorImage: string;
    title: string;
    content: string;
    image: string;
}

const posts: Post[] = [
    {
        id: 1,
        authorName: "Mario Rossi",
        authorImage: "/src/assets/profile1.png", // Immagine profilo
        title: "Protezione dei ghiacciai",
        content:
            "Il cambiamento climatico sta causando una rapida riduzione dei ghiacciai. È fondamentale agire per preservare il nostro futuro.",
        image: "/src/assets/education1.png", // Immagine principale
    },
    {
        id: 2,
        authorName: "Luca Verdi",
        authorImage: "/src/assets/profile2.png",
        title: "Riduzione delle emissioni",
        content:
            "Ridurre le emissioni di CO2 è fondamentale per limitare il riscaldamento globale. Scopri come puoi contribuire anche tu.",
        image: "/src/assets/education2.png",
    },
];

const MyActivity: React.FC = () => {
    const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
    const [participationStatus, setParticipationStatus] = useState<{
        [key: number]: "default" | "thinking" | "participating";
    }>({});

    // Funzione per gestire l'espansione del testo
    const toggleExpand = (postId: number) => {
        setExpandedPosts((prev) =>
            prev.includes(postId)
                ? prev.filter((id) => id !== postId)
                : [...prev, postId]
        );
    };

    // Funzione per gestire il bottone "partecipa"
    const toggleParticipation = (postId: number) => {
        setParticipationStatus((prev) => {
            const currentStatus = prev[postId] || "default";
            if (currentStatus === "default") return { ...prev, [postId]: "participating" };
            if (currentStatus === "participating") return { ...prev, [postId]: "thinking" };
            return { ...prev, [postId]: "default" };
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">MyActivity</h1>
            <div className="space-y-6">
                {posts.map((post) => {
                    const isExpanded = expandedPosts.includes(post.id);
                    const participation = participationStatus[post.id] || "default";

                    return (
                        <div
                            key={post.id}
                            className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
                        >
                            {/* Header con immagine autore e nome */}
                            <div className="flex items-center space-x-4">
                                <img
                                    src={
                                        post.authorImage ||
                                        "https://via.placeholder.com/40/cccccc?text=A"
                                    } // Immagine di default
                                    alt={post.authorName}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <span className="text-lg font-semibold text-blue-900">
                                    {post.authorName || "Autore sconosciuto"}
                                </span>
                            </div>

                            {/* Titolo */}
                            <h2 className="text-xl font-bold">{post.title}
                                {post.title || "Titolo non disponibile"}
                            </h2>

                            {/* Immagine principale */}
                            <img
                                src={
                                    post.image ||
                                    "https://via.placeholder.com/600x400/eeeeee?text=Immagine+non+disponibile"
                                } // Immagine di default
                                alt={post.title || "Immagine non disponibile"}
                                className="w-full h-48 object-cover rounded-lg"
                            />

                            {/* Testo */}
                            <p className="text-gray-700">
                                {isExpanded ? post.content : `${post.content.substring(0, 100)}...`}
                            </p>

                            {/* Bottoni */}
                            <div className="flex space-x-4">
                                {/* Bottone Espandi */}
                                <button
                                    onClick={() => toggleExpand(post.id)}
                                    className="bg-blue-900 hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition duration-300"
                                >
                                    {isExpanded ? "Riduci" : "Espandi"}
                                </button>

                                {/* Bottone Partecipa */}
                                <button
                                    onClick={() => toggleParticipation(post.id)}
                                    className={`px-4 py-2 rounded-lg transition duration-300 ${
                                        participation === "default"
                                            ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                            : participation === "thinking"
                                                ? "bg-orange-500 hover:bg-orange-600 text-white"
                                                : "bg-green-500 hover:bg-green-600 text-white"
                                    }`}
                                >
                                    {participation === "default"
                                        ? "Partecipa"
                                        : participation === "thinking"
                                            ? "Ci penso"
                                            : "Partecipi"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyActivity;
