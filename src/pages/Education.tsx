// src/pages/Education.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import WindowsEducation from "../components/WindowsEducation";
import NewEducationModal from "../components/NewEducationModal";

interface PostData {
    id: number;
    author: string;
    title: string;
    imageUrl: string;  // con file, potremmo generare un URL dopo l'upload
    snippet: string;
    likes: number;
}

const Education: React.FC = () => {
    const { user } = useAuth();

    const [posts, setPosts] = useState<PostData[]>([
        // ... post iniziali ...
    ]);

    const [showModal, setShowModal] = useState(false);

    // Apri/chiudi modale
    const openNewPostModal = () => setShowModal(true);
    const closeNewPostModal = () => setShowModal(false);

    /**
     * In futuro: potremmo inviare "file" al server via FormData e
     * ottenere un URL, dopodiché lo useremmo come "imageUrl".
     */



    return (
        <div className="w-full p-6">
            {/* Intestazione */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl text-black font-bold">Education</h1>

                {user?.roles === "admin" && (
                    <button
                        onClick={openNewPostModal}
                        className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded transition"
                    >
                        Nuovo post
                    </button>
                )}
            </div>
        </div>
    );
};

export default Education;
