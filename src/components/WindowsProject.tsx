import React, { useState } from 'react';
import {ConservationProject} from "../types/ConservationProject.ts";


interface Props {
    project: ConservationProject;
    isAdmin: boolean;
    isLogged: boolean;
    onDelete: (id: number) => void;
    onUpdate: (updated: ConservationProject) => void;
    onParticipate: (id: number) => void;
}

const WindowsProject: React.FC<Props> = ({ project, isAdmin, isLogged, onDelete, onUpdate, onParticipate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [startDate, setStartDate] = useState(project.startDate);
    const [endDate, setEndDate] = useState(project.endDate);
    const [status, setStatus] = useState(project.status);

    const handleSave = () => {
        onUpdate({
            ...project,
            title,
            description,
            startDate,
            endDate,
            status,
        });
        setIsEditing(false);
    };
    const formatDateForInput = (value: string | null): string => {
        if (!value) return '';
        const date = new Date(value);
        const iso = date.toISOString();
        return iso.slice(0, 16); // YYYY-MM-DDTHH:mm
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            {isEditing ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        className="border rounded w-full px-2 py-1"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        className="border rounded w-full px-2 py-1"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="datetime-local"
                            className="border rounded w-full px-2 py-1"
                            value={formatDateForInput(startDate)}
                            onChange={e => setStartDate(e.target.value)}
                        />
                        <input
                            type="datetime-local"
                            className="border rounded w-full px-2 py-1"
                            value={formatDateForInput(endDate)}
                            onChange={e => setEndDate(e.target.value)}
                        />

                    </div>
                    <input
                        type="text"
                        className="border rounded w-full px-2 py-1"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                        >
                            Salva
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
                        >
                            Annulla
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="text-xl text-black font-semibold mb-2">{project.title}</h3>
                    <p className="mb-2 text-black">{project.description}</p>
                    <p className="text-sm mb-1 text-black">
                        <strong>Inizio:</strong> {project.startDate ? new Date(project.startDate).toLocaleString() : "N/D"}
                    </p>
                    <p className="text-sm mb-1 text-black">
                        <strong>Fine:</strong> {project.endDate ? new Date(project.endDate).toLocaleString() : "N/D"}
                    </p>
                    <p
                        className={`text-sm mb-3 font-medium ${
                            project.status.toLowerCase() === 'attivo'
                                ? 'text-red-600'
                                : project.status.toLowerCase() === 'completato'
                                    ? 'text-green-600'
                                    : 'text-gray-500'
                        }`}
                    >
                        <strong>Status:</strong> {project.status}
                    </p>
                    {isAdmin ? (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                            >
                                Modifica
                            </button>
                            <button
                                onClick={() => onDelete(project.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                            >
                                Elimina
                            </button>
                        </div>
                    ) : isLogged ? (
                        <button
                            onClick={() => onParticipate(project.id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        >
                            Partecipa
                        </button>
                    ) : null}
                </>
            )}
        </div>
    );
};

export default WindowsProject;