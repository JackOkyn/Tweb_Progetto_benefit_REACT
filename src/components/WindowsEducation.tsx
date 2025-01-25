// src/components/WindowsEducation.tsx
import React from "react";

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
    onLike: (id: number) => void;
}

const WindowsEducation: React.FC<WindowsEducationProps> = ({
                                                               post,
                                                               onDelete,
                                                               onLike,
                                                           }) => {
    const handleDelete = () => onDelete(post.id);
    const handleLike = () => onLike(post.id);

    return (
        <div className="relative p-4 bg-white text-black rounded shadow-md w-full mx-auto">
            <div className="absolute top-2 left-2 font-semibold text-blue-600">
                {post.author}
            </div>
            <button
                onClick={handleDelete}
                className="absolute top-2 right-2 bg-red-500 text-white font-bold px-2 py-1 rounded hover:bg-red-600 transition"
            >
                X
            </button>
            <h2 className="text-xl font-bold mb-2 mt-6">{post.title}</h2>
            <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-auto mb-2 rounded"
            />
            <p className="text-gray-700 mb-4">{post.snippet}</p>
            <div className="flex justify-between items-center">
                <button
                    onClick={handleLike}
                    className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded transition"
                >
                    Like
                </button>
                <span className="text-gray-700">{post.likes} Like</span>
            </div>
        </div>
    );
};

export default WindowsEducation;
