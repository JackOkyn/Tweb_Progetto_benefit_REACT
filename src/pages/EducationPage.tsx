// src/pages/EducationPage.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import {getFetchApi} from "../service/genericServices.ts";
import {Education} from "../types/Education.ts";


const EducationPage: React.FC = () => {
    const { user } = useAuth();
    const Education_URL = 'http://localhost:8080/educations';

    const [posts, setPosts] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadEducations() {
            try {
                console.log("🔍 JWT token da localStorage:", localStorage.getItem("jwtToken"));
                const data = await getFetchApi<Education[]>(Education_URL);
                setPosts(data);
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            }
            finally {
                setLoading(false);
            }
        }
        loadEducations();
    }, []);

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>Errore: {error}</p>;

    const [showModal, setShowModal] = useState(false);

    // Apri/chiudi modale
    const openNewPostModal = () => setShowModal(true);
    const closeNewPostModal = () => setShowModal(false);

    /**
     * In futuro: potremmo inviare "file" al server via FormData e
     * ottenere un URL, dopodiché lo useremmo come "imageUrl".
     */



    return (
        <div>
            <h1>Lista delle Educazioni</h1>
            <ul>
                {posts.map((edu) => (
                    <li key={edu.id}>
                        {edu.titleEducation} — {edu.user.username} ({edu.likesEducation} likes)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EducationPage;
