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
    const handleCreateNewPost = (
        title: string,
        snippet: string,
        file: File | null
    ) => {
        // LOGICA FITTIZIA
        let fakeImageUrl =
            "https://source.unsplash.com/random/800x600/?education";

        // Se vogliamo un'anteprima locale, possiamo generare un objectURL,
        // ma di solito lo gestiamo dopo l'upload su server.
        if (file) {
            // local preview: URL.createObjectURL(file)
            // Oppure, in un caso reale, caricare il file e ottenere l'URL dal server
            fakeImageUrl = URL.createObjectURL(file);
        }

        const newPost: PostData = {
            id: Date.now(),
            author: user?.nickname || "Autore sconosciuto",
            title: title || "Nuovo articolo",
            imageUrl: fakeImageUrl,
            snippet: snippet || "...",
            likes: 0,
        };

        // PER IL BACK-END
        /*
        const formData = new FormData();
        formData.append("title", title);
        formData.append("snippet", snippet);
        if(file) formData.append("imageFile", file);

        fetch("/api/posts", {
          method: "POST",
          body: formData,   // multipart/form-data
        })
          .then(res => res.json())
          .then(createdPost => {
            // createdPost avrà {id, author, title, imageUrl, snippet, ...}
            setPosts(prev => [...prev, createdPost]);
          })
          .catch(err => console.error(err));
        */

        // Per ora, local
        setPosts((prev) => [...prev, newPost]);
    };

    // Cancellazione post
    const handleDeletePost = (id: number) => {
        setPosts((prev) => prev.filter((p) => p.id !== id));
    };

    // Like post
    const handleLikePost = (id: number) => {
        setPosts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
        );
    };

    return (
        <div className="w-full p-6">
            {/* Intestazione */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Education</h1>

                {user?.role === "admin" && (
                    <button
                        onClick={openNewPostModal}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition"
                    >
                        Nuovo post
                    </button>
                )}
            </div>

            {/* Lista di post */}
            <div className="flex flex-col space-y-6">
                {posts.map((post) => (
                    <WindowsEducation
                        key={post.id}
                        post={post}
                        onDelete={handleDeletePost}
                        onLike={handleLikePost}
                    />
                ))}
            </div>

            {/* Modale per creare un nuovo post con file allegato */}
            <NewEducationModal
                isOpen={showModal && user?.role === "admin"}
                onClose={closeNewPostModal}
                onCreate={handleCreateNewPost}
            />
        </div>
    );
};

export default Education;
