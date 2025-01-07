import React from "react";
import WindowsEducation from "./WindowsEducation";

// Simulazione di dati che in futuro arriveranno dal server
const posts = [
    {
        id: 1,
        authorName: "Mario Rossi",
        authorImage: "/src/assets/profile1.png",
        title: "Protezione dei ghiacciai",
        content:
            "Il cambiamento climatico sta causando una rapida riduzione dei ghiacciai. È fondamentale agire per preservare il nostro futuro.",
        image: "/src/assets/education1.png",
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
    {
        id: 3,
        authorName: "Giacomo Ruvido",
        authorImage: "/src/assets/profile2.png",
        title: "Porosità ed attrito del ghiaccio",
        content:
            "Ebbene si, il ghiaccio è ruvido, come me. Scopri come puoi contribuire anche tu.",
        image: "/src/assets/education2.png",
    },
];

const Education: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Education</h1>
            <div className="space-y-6">
                {posts.map((post) => (
                    <WindowsEducation
                        key={post.id}
                        authorName={post.authorName}
                        authorImage={post.authorImage}
                        title={post.title}
                        content={post.content}
                        image={post.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default Education;
