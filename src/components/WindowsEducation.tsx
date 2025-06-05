import React from "react";
import { useAuth } from "../context/AuthContext";

interface WindowsEducationProps {
    id: number;
    title: string;
    author: string;
    likes: number;
    onLike: (id: number) => void;
    onEdit: () => void;
    onDelete: () => void;
}

const WindowsEducation: React.FC<WindowsEducationProps> = ({
                                                               id,
                                                               title,
                                                               author,
                                                               likes,
                                                               onLike,
                                                               onEdit,
                                                               onDelete,
                                                           }) => {
    const { user } = useAuth();

    return (
        <div className="bg-white p-4 rounded shadow hover:shadow-md transition w-full">
            <div className="text-sm text-gray-600 mb-1">Autore: {author}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onLike(id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                        Like

                        <span className="text-white"> {likes}</span>

                    </button>

                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onEdit}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                        Modifica
                    </button>
                    <button
                        onClick={onDelete}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Elimina
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WindowsEducation;