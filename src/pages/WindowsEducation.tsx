import React, { useState } from "react";

interface WindowsEducationProps {
    authorName?: string;
    authorImage?: string;
    title?: string;
    content: string;
    image?: string;
}

const WindowsEducation: React.FC<WindowsEducationProps> = ({
                                                               authorName = "Autore sconosciuto",
                                                               authorImage = "https://via.placeholder.com/40/cccccc?text=A",
                                                               title = "Titolo non disponibile",
                                                               content,
                                                               image = "https://via.placeholder.com/600x400/eeeeee?text=Immagine+non+disponibile",
                                                           }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [participationStatus, setParticipationStatus] = useState<
        "default" | "thinking" | "participating"
    >("default");

    // Funzione per espandere/ridurre il testo
    const toggleExpand = () => setIsExpanded((prev) => !prev);

    // Funzione per cambiare lo stato del bottone "Partecipa"
    const toggleParticipation = () => {
        setParticipationStatus((prev) =>
            prev === "default"
                ? "participating"
                : prev === "participating"
                    ? "thinking"
                    : "default"
        );
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-md rounded-lg p-6 flex flex-col space-y-4">
            {/* Header con immagine autore e nome */}
            <div className="flex items-center space-x-4">
                <img
                    src={authorImage}
                    alt={authorName}
                    className="h-10 w-10 rounded-full object-cover"
                />
                <span className="text-lg font-semibold text-blue-900">{authorName}</span>
            </div>

            {/* Titolo */}
            <h2 className="text-xl font-bold text-blue-800">{title}</h2>

            {/* Immagine principale */}
            <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover rounded-lg"
            />

            {/* Testo */}
            <p className="text-gray-700">
                {isExpanded ? content : `${content.substring(0, 100)}...`}
            </p>

            {/* Bottoni */}
            <div className="flex space-x-4">
                {/* Bottone Espandi */}
                <button
                    onClick={toggleExpand}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                    {isExpanded ? "Riduci" : "Espandi"}
                </button>

                {/* Bottone Partecipa */}
                <button
                    onClick={toggleParticipation}
                    className={`px-4 py-2 rounded-lg transition duration-300 ${
                        participationStatus === "default"
                            ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                            : participationStatus === "thinking"
                                ? "bg-orange-500 hover:bg-orange-600 text-white"
                                : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                >
                    {participationStatus === "default"
                        ? "Partecipa"
                        : participationStatus === "thinking"
                            ? "Ci penso"
                            : "Partecipi"}
                </button>
            </div>
        </div>
    );
};

export default WindowsEducation;
