import React, {useEffect, useState} from 'react';
import { ConservationProject } from "../types/ConservationProject";
import { UserData } from "../context/AuthContext";
import {getParticipants} from "../service/projectServices.ts";
import {User} from "../types/User.ts";

interface Props {
    project: ConservationProject;
    isAdmin: boolean;
    isLogged: boolean;
    onDelete: (id: number) => void;
    onUpdate: (updated: ConservationProject) => void;
    user: UserData | null;
    onJoin: (id: number) => void;
    onLeave: (id: number) => void;
}

const WindowsProject: React.FC<Props> = ({ project, isAdmin, isLogged, onDelete, onUpdate,  user, onJoin, onLeave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [startDate, setStartDate] = useState(project.startDate);
    const [endDate, setEndDate] = useState(project.endDate);
    const [status, setStatus] = useState(project.status);

    const joined = project.participants?.some(p => p.id === user?.id) ?? false;
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
    const [localParticipants, setLocalParticipants] = useState<User[]>([]);
    useEffect(() => {
        if (!project.participants || project.participants.length === 0) {
            getParticipants(project.id)
                .then((data) => {
                    setLocalParticipants(data);
                })
                .catch(err => console.error("Errore caricamento partecipanti:", err));
        }
    }, [project.id]);

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
                            onClick={() => joined ? onLeave(project.id) : onJoin(project.id)}
                            className={`px-3 py-1 rounded text-white transition ${
                                joined ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {joined ? 'Lascia' : 'Partecipa'}
                        </button>
                    ) : null}
                    {localParticipants && localParticipants.length > 0 && (
                        <div className="mt-3 flex-auto">
                            <details className="cursor-pointer">
                                <summary className="text-sm text-blue-600 font-medium hover:underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                                    </svg>
                                    Partecipanti ({localParticipants.length})
                                </summary>
                                <ul className="list-disc ml-6 mt-2 text-gray-700">
                                    {localParticipants.map(p => (
                                        <li key={p.id}>{p.username}</li>
                                    ))}
                                </ul>
                            </details>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default WindowsProject;
