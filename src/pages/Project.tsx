import React, { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectsContext";
import { useAuth } from "../context/AuthContext";
import NewProjectModal from "../components/NewProjectModal";
import { projectService } from "../service/projectServices";
import { ConservationProject } from "../types/ConservationProject";

const Project: React.FC = () => {
    const { user } = useAuth();
    const { addProject } = useProjects();

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
                // Rimuovi anche dai risultati di ricerca se presente
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

    const isUserParticipant = (project: ConservationProject): boolean => {
        if (!user || !project.users) return false;
        return project.users.some(u => u.name === user.nickname);
    };

    const canUserEditProject = (project: ConservationProject): boolean => {
        if (!user) return false;

        if (user.role === "admin") {
            return !project.author || project.author === user.nickname;
        }

        return false;
    };

    const isAdmin = (): boolean => {
        return user?.role === "admin";
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
                        {isAdmin() && (
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
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Cerca Progetti</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Ricerca per ID */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Cerca per ID</label>
                        <div className="flex">
                            <input
                                type="number"
                                value={searchById}
                                onChange={(e) => setSearchById(e.target.value)}
                                placeholder="ID progetto..."
                                className="flex-1 border border-gray-300 rounded-l px-3 py-2"
                            />
                            <button
                                onClick={searchProjectById}
                                disabled={isSearching}
                                className="bg-blue-500 text-white px-3 py-2 rounded-r hover:bg-blue-600 disabled:opacity-50"
                            >
                                Cerca
                            </button>
                        </div>
                    </div>

                    {/* Pulsante reset */}
                    <div className="flex items-end">
                        <button
                            onClick={clearSearch}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                        >
                            Mostra Tutti
                        </button>
                    </div>
                </div>

                {/* Indicatore ricerca */}
                {isSearching && (
                    <div className="mt-2 text-blue-600">
                        Ricerca in corso...
                    </div>
                )}

                {searchResults.length > 0 && (
                    <div className="mt-2 text-green-600">
                        Trovati {searchResults.length} risultati
                    </div>
                )}
            </div>

            {/* Messaggi di successo/errore */}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Progetti di Conservazione */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-black">
                    {searchResults.length > 0 ? 'Risultati Ricerca' : 'Progetti di Conservazione'}
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {displayProjects.map((project) => {
                        const canEdit = canUserEditProject(project);
                        const isParticipant = isUserParticipant(project);
                        const projectUsers = project.users || [];

                        return (
                            <div key={project.id} className="border p-4 rounded shadow bg-white">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-black">{project.name}</h3>
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs bg-gray-200 px-2 py-1 rounded mb-1">
                                            ID: {project.id}
                                        </span>
                                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                                            {project.author ? `by ${project.author}` : 'Sistema'}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-2">{project.description}</p>
                                <div className="text-sm text-gray-600 mb-3">
                                    <p>Partecipanti: {projectUsers.length}</p>
                                    {projectUsers.length > 0 && (
                                        <p className="text-xs mt-1">
                                            {projectUsers.map(u => u.name).join(', ')}
                                        </p>
                                    )}
                                </div>

                                {/* Azioni disponibili per l'utente */}
                                {user && (
                                    <div className="mt-4 space-y-2">
                                        {/* Partecipazione al progetto */}
                                        {!isParticipant ? (
                                            <button
                                                onClick={() => handleJoinProject(project.id)}
                                                className="w-full bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
                                            >
                                                Partecipa
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleLeaveProject(project.id)}
                                                className="w-full bg-orange-500 text-white px-3 py-2 rounded text-sm hover:bg-orange-600"
                                            >
                                                Abbandona Progetto
                                            </button>
                                        )}

                                        {/* Azioni admin */}
                                        {canEdit && (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditProject(project)}
                                                    className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                                                >
                                                    Modifica
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProject(project.id, project.name)}
                                                    className="flex-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                                >
                                                    Elimina
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {displayProjects.length === 0 && !loading && (
                    <div className="text-center text-gray-500 py-8">
                        {searchTerm || searchById ? 'Nessun progetto trovato' : 'Nessun progetto disponibile'}
                    </div>
                )}
            </div>

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