import React from "react";
import { useProjects } from "../context/ProjectsContext";

const MyActivity: React.FC = () => {
    const { myActivity } = useProjects();

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">I miei progetti</h1>
            {myActivity.length === 0 ? (
                <p>Non hai ancora selezionato alcun progetto.</p>
            ) : (
                <ul className="space-y-4">
                    {myActivity.map((proj) => (
                        <li key={proj.id} className="p-4 bg-white rounded shadow-md max-w-2xl">
                            <h2 className="text-lg font-semibold">{proj.title}</h2>
                            <p className="text-gray-700">{proj.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyActivity;
