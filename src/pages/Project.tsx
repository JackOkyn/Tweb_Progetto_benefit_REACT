import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import  { ConservationProject } from '../types/ConservationProject';
import WindowsProject from '../components/WindowsProject';
import {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
    ProjectDTO,
} from '../service/projectServices';

const Project: React.FC = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';
    const isLogged = Boolean(user);

    const [projects, setProjects] = useState<ConservationProject[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Stati form creazione
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newStartDate, setNewStartDate] = useState('');
    const [newEndDate, setNewEndDate] = useState('');
    const [newStatus, setNewStatus] = useState('');

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const data = await getAllProjects();
            setProjects(data);
        }
        catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const payload: ProjectDTO = {
                title: newTitle,
                description: newDescription,
                startDate: newStartDate,
                endDate: newEndDate,
                status: newStatus,
                participants: [],
            };
            await createProject(payload);
            setNewTitle('');
            setNewDescription('');
            setNewStartDate('');
            setNewEndDate('');
            setNewStatus('');
            setShowCreateForm(false);
            fetchProjects();
        }
        catch (err: any) {
            setError(err.message);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Sei sicuro di voler eliminare questo progetto?')) return;
        try {
            await deleteProject(id);
            fetchProjects();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleUpdate = async (project: ConservationProject) => {
        const dto: ProjectDTO = {
            id: project.id,
            title: project.title,
            description: project.description,
            startDate: project.startDate + ':00',
            endDate:   project.endDate   + ':00',
            status: project.status,
            participants: project.participants.map(u => ({ id: u.id })),
        };
        await updateProject(project.id, dto);
        fetchProjects();
    };


    // Placeholder per Futuro "Partecipa"
    const handleParticipate = (id: number) => {
        console.log(`Partecipa a progetto ${id}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl text-black font-bold mb-4">Progetti di Conservazione</h1>
            {error && <div className="text-red-600 mb-4">{error}</div>}

            {isAdmin && (
                <div className="mb-6">
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Nuovo progetto
                    </button>
                </div>
            )}

            {showCreateForm && (
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-semibold mb-2">Nuovo Progetto</h2>
                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Titolo</label>
                            <input
                                type="text"
                                className="border rounded w-full px-2 py-1"
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Descrizione</label>
                            <textarea
                                className="border rounded w-full px-2 py-1"
                                value={newDescription}
                                onChange={e => setNewDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium mb-1">Data Inizio</label>
                                <input
                                    type="datetime-local"
                                    className="border rounded w-full px-2 py-1"
                                    value={newStartDate}
                                    onChange={e => setNewStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Data Fine</label>
                                <input
                                    type="datetime-local"
                                    className="border rounded w-full px-2 py-1"
                                    value={newEndDate}
                                    onChange={e => setNewEndDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Status</label>
                            <input
                                type="text"
                                className="border rounded w-full px-2 py-1"
                                value={newStatus}
                                onChange={e => setNewStatus(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setShowCreateForm(false)}
                                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
                            >
                                Annulla
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                            >
                                Crea
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <p>Caricamento in corso...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <WindowsProject
                            key={project.id}
                            project={project}
                            isAdmin={isAdmin}
                            isLogged={isLogged}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            onParticipate={handleParticipate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Project;

