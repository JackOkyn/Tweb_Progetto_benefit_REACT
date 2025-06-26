import React, { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectsContext";
import { useAuth } from "../context/AuthContext";
import NewProjectModal from "../components/NewProjectModal";
import WindowsProject from "../components/WindowsProject";
import { projectService } from "../service/projectServices";
import { ConservationProject } from "../types/ConservationProject";

const Project: React.FC = () => {
    const { user } = useAuth();
    const { projects: generalProjects, addProject } = useProjects();

    // Stati per gestire i dati dall'API
    const [conservationProjects, setConservationProjects] = useState<ConservationProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Stati per la ricerca
    const [searchTerm, setSearchTerm] = useState('');
    const [searchById, setSearchById] = useState('');
    const [searchResults, setSearchResults] = useState<ConservationProject[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Stato per la modale
    const [showModal, setShowModal] = useState(false);
    const [showConservationModal, setShowConservationModal] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<ConservationProject>>({});
    const [isEditing, setIsEditing] = useState(false);

    // Mock user IDs - in un'app reale, questi verrebbero dal backend
    const getUserId = (nickname: string): number => {
        const userMapping: { [key: string]: number } = {
            'Mario': 1,
            'Luigi': 2,
            'Admin': 1
        };
        return userMapping[nickname] || 1;
    };

    // Carica i progetti dall'API
    useEffect(() => {
        const loadData = async () => {
            await loadConservationProjects();
        };
        loadData().catch(error => {
            console.error('Errore nel caricamento iniziale:', error);
        });
    }, []);

    const loadConservationProjects = async () => {
        try {
            setLoading(true);
            const data = await projectService.getAll();

            // Normalizza i dati assicurandoti che ogni progetto abbia il campo users
            const normalizedData = data.map(project => ({
                ...project,
                users: project.users || []
            }));

            setConservationProjects(normalizedData);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Errore nel caricamento');
        } finally {
            setLoading(false);
        }
    };

    const searchProjectById = async () => {
        if (!searchById.trim()) return;

        const id = parseInt(searchById);
        if (isNaN(id)) {
            setError('ID progetto non valido');
            return;
        }

        try {
            setIsSearching(true);
            const project = await projectService.getById(id);
            setSearchResults([project]);
            setSuccess(`Progetto trovato: ${project.name}`);
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Progetto non trovato');
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchById('');
        setSearchResults([]);
        setIsSearching(false);
    };

    const handleCreateConservationProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const projectData: Partial<ConservationProject> = {
                name: currentProject.name,
                description: currentProject.description,
                users: currentProject.users || [],
                author: user?.nickname
            };

            if (isEditing && currentProject.id) {
                await projectService.update(currentProject.id, projectData);
                setSuccess('Progetto aggiornato con successo!');
            } else {
                await projectService.create(projectData);
                setSuccess('Progetto creato con successo!');
            }

            setShowConservationModal(false);
            setCurrentProject({});
            setIsEditing(false);
            await loadConservationProjects();
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Errore nel salvataggio');
        }
    };

    const handleEditProject = (project: ConservationProject) => {
        setCurrentProject(project);
        setIsEditing(true);
        setShowConservationModal(true);
    };

    const handleDeleteProject = async (id: number, projectName: string) => {
        if (window.confirm(`Sei sicuro di voler eliminare il progetto "${projectName}"?`)) {
            try {
                await projectService.delete(id);
                setSuccess('Progetto eliminato con successo!');
                await loadConservationProjects();
                setSearchResults(prev => prev.filter(p => p.id !== id));
                setTimeout(() => setSuccess(null), 3000);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Errore nell\'eliminazione');
            }
        }
    };

    const handleJoinProject = async (projectId: number) => {
        if (!user) return;

        try {
            const userId = getUserId(user.nickname);
            await projectService.addParticipant(projectId, userId);
            setSuccess('Ti sei unito al progetto con successo!');
            await loadConservationProjects();
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Errore nell\'adesione');
        }
    };

    const handleLeaveProject = async (projectId: number) => {
        if (!user) return;

        try {
            const userId = getUserId(user.nickname);
            await projectService.removeParticipant(projectId, userId);
            setSuccess('Hai lasciato il progetto');
            await loadConservationProjects();
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Errore nell\'uscita dal progetto');
        }
    };

    const handleCreateProject = (title: string, image: string, desc: string) => {
        if (!user) return;
        addProject({
            author: user.nickname,
            title,
            imageUrl: image,
            description: desc,
        });
    };

    const closeModal = () => {
        setShowConservationModal(false);
        setCurrentProject({});
        setIsEditing(false);
    };

    // Nascondi messaggi di errore dopo 5 secondi
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    if (loading) return <div className="p-4">Caricamento progetti...</div>;

    const displayProjects = searchResults.length > 0 || isSearching ? searchResults : conservationProjects;

    return (
        <div className="p-4 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-black">Gestione Progetti</h1>
                {user && (
                    <div className="space-x-2">
                        {user.role === "admin" && (
                            <button
                                onClick={() => {
                                    setCurrentProject({});
                                    setIsEditing(false);
                                    setShowConservationModal(true);
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            >
                                Nuovo Progetto Conservazione
                            </button>
                        )}
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Nuovo Progetto Generale
                        </button>
                    </div>
                )}
            </div>

            {/* Barra di ricerca */}
            <div className="mb-8 bg-white shadow-md rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-5 text-gray-800">Cerca Progetti</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-600 mb-2">Cerca per ID</label>
                        <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400 transition">
                            <input
                                type="number"
                                value={searchById}
                                onChange={(e) => setSearchById(e.target.value)}
                                placeholder="ID progetto..."
                                className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none"
                            />
                            <button
                                onClick={searchProjectById}
                                disabled={isSearching}
                                className="bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 transition"
                            >
                                Cerca
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={clearSearch}
                            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 font-medium transition"
                        >
                            Mostra Tutti
                        </button>
                    </div>
                </div>

                {isSearching && (
                    <p className="mt-4 text-blue-600 font-medium animate-pulse">
                        Ricerca in corso...
                    </p>
                )}

                {searchResults.length > 0 && (
                    <p className="mt-4 text-green-600 font-medium">
                        Trovati {searchResults.length} risultato{searchResults.length > 1 ? 'i' : ''}
                    </p>
                )}
            </div>

            {/* Messaggi di successo/errore */}
            {success && (
                <div className="mb-6 rounded-lg bg-green-50 border border-green-300 px-5 py-4 text-green-700 shadow-sm">
                    {success}
                </div>
            )}

            {error && (
                <div className="mb-6 rounded-lg bg-red-50 border border-red-300 px-5 py-4 text-red-700 shadow-sm">
                    {error}
                </div>
            )}

            {/* Progetti di Conservazione */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-black">
                    {searchResults.length > 0 ? 'Risultati Ricerca' : 'Progetti di Conservazione'}
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {displayProjects.map((project) => (
                        <WindowsProject
                            key={project.id}
                            project={project}
                            user={user}
                            onEdit={handleEditProject}
                            onDelete={handleDeleteProject}
                            onJoin={handleJoinProject}
                            onLeave={handleLeaveProject}
                            projectType="conservation"
                        />
                    ))}
                </div>

                {displayProjects.length === 0 && !loading && (
                    <div className="text-center text-gray-500 py-8">
                        {searchTerm || searchById ? 'Nessun progetto trovato' : 'Nessun progetto disponibile'}
                    </div>
                )}
            </div>

            {/* Progetti Generali */}
            {generalProjects.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-black">Progetti Generali</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {generalProjects.map((project) => (
                            <WindowsProject
                                key={project.id}
                                project={project}
                                user={user}
                                projectType="general"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Modale per progetti di conservazione */}
            {showConservationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">
                            {isEditing ? 'Modifica' : 'Nuovo'} Progetto di Conservazione
                        </h2>
                        <form onSubmit={handleCreateConservationProject}>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Nome Progetto</label>
                                <input
                                    type="text"
                                    value={currentProject.name || ''}
                                    onChange={(e) => setCurrentProject({
                                        ...currentProject,
                                        name: e.target.value
                                    })}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Descrizione</label>
                                <textarea
                                    value={currentProject.description || ''}
                                    onChange={(e) => setCurrentProject({
                                        ...currentProject,
                                        description: e.target.value
                                    })}
                                    className="w-full border p-2 rounded h-24"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    {isEditing ? 'Aggiorna' : 'Crea'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modale per progetti generali */}
            <NewProjectModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCreate={handleCreateProject}
                author={user?.nickname}
            />
        </div>
    );
};

export default Project;