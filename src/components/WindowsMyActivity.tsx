import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ConservationProject } from '../types/ConservationProject';
import { conservationService } from '../service/serviceMyActivity.ts';
import { getParticipants } from "../service/projectServices";
import {User} from "../types/User.ts";

type EnrichedProject = Omit<ConservationProject, 'participants'> & {
    participants: User[];
};
const WindowsMyActivity: React.FC = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState<EnrichedProject[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;
        conservationService.getMyConservations(user.id)
            .then(async (projects) => {
                const enriched = await Promise.all(
                    projects.map(async (p) => ({
                        ...p,
                        participants: await getParticipants(p.id),
                    }))
                );
                setProjects(enriched);
            })
            .catch(err => setError(err.message));
    }, [user]);

    const leave = async (projectId: number) => {
        if (!user) return;
        try {
            await conservationService.leaveProject(projectId, user.id);
            setProjects(prev => prev.filter(p => p.id !== projectId));
        } catch (e: any) {
            setError(e.message);
        }
    };

    if (!user) return <p>Devi effettuare il login per vedere la tua attività.</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (projects.length === 0) return <p>Non partecipi a nessun progetto.</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-black">I miei progetti di conservazione</h2>
            <ul className="space-y-4">
                {projects.map(p => (
                    <li key={p.id} className="bg-white p-4 border rounded shadow">
                        <h3 className="text-xl text-black font-semibold mb-2">{p.title}</h3>
                        <p className="mb-2 text-black">{p.description}</p>
                        <p className="text-sm mb-1 text-black">
                            <strong>Inizio:</strong> {p.startDate ? new Date(p.startDate).toLocaleString() : "N/D"}
                        </p>
                        <p className="text-sm mb-1 text-black">
                            <strong>Fine:</strong> {p.endDate ? new Date(p.endDate).toLocaleString() : "N/D"}
                        </p>
                        <p
                            className={`text-sm mb-3 font-medium ${
                                p.status.toLowerCase() === 'attivo'
                                    ? 'text-red-600'
                                    : p.status.toLowerCase() === 'completato'
                                        ? 'text-green-600'
                                        : 'text-gray-500'
                            }`}
                        >
                            <strong>Status:</strong> {p.status}
                        </p>
                        <button
                            onClick={() => leave(p.id)}
                            className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                            Lascia progetto
                        </button>
                        {p.participants && p.participants.length > 0 && (
                            <div className="mt-3 text-blue-600">
                                <details className="cursor-pointer">
                                    <div className="flex items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                             fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd"
                                                  d="M12 14a5 5 0 100-10 5 5 0 000 10zm-7 6a7 7 0 0114 0H5z"
                                                  clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm font-medium">
                                            Partecipanti ({p.participants.length})
                                        </span>
                                    </div>
                                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                                        {p.participants.map(u => (
                                            <li key={u.id}>{u.username}</li>
                                        ))}
                                    </ul>
                                </details>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WindowsMyActivity;
