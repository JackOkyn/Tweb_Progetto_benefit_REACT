import React, { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectsContext";
import WindowsProject from "../components/WindowsProject";
import { useAuth } from "../context/AuthContext";
import NewProjectModal from "../components/NewProjectModal";
import { projectService } from "../service/projectServices";
import { ConservationProject } from "../types/ConservationProject";

const Project: React.FC = () => {
    const { user } = useAuth();
    const { projects, addProject } = useProjects();
    
    // Stati per gestire i dati dall'API
    const [conservationProjects, setConservationProjects] = useState<ConservationProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Stato per la modale
    const [showModal, setShowModal] = useState(false);
    const [showConservationModal, setShowConservationModal] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<ConservationProject>>({});

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
            setConservationProjects(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Errore nel caricamento');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateConservationProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentProject.id) {
                await projectService.update(currentProject.id, currentProject);
            } else {
                await projectService.create(currentProject);
            }
            setShowConservationModal(false);
            setCurrentProject({});
            await loadConservationProjects();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Errore nel salvataggio');
        }
    };

    const handleDeleteProject = async (id: number) => {
        if (window.confirm('Sei sicuro di voler eliminare questo progetto?')) {
            try {
                await projectService.delete(id);
                await loadConservationProjects();
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Errore nell\'eliminazione');
            }
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

    if (loading) return <div className="p-4">Caricamento progetti...</div>;

    return (
        <div className="p-4 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-black">Gestione Progetti</h1>
                {user?.role === "admin" && (
                    <div className="space-x-2">
                        <button
                            onClick={() => {
                                setCurrentProject({});
                                setShowConservationModal(true);
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Nuovo Progetto Conservazione
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Nuovo Progetto Generale
                        </button>
                    </div>
                )}
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Progetti di Conservazione */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-black">Progetti di Conservazione</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {conservationProjects.map((project) => (
                        <div key={project.id} className="border p-4 rounded shadow bg-white">
                            <h3 className="text-lg font-semibold text-black mb-2">{project.title}</h3>
                            <p className="text-gray-700 mb-2">{project.description}</p>
                            <div className="text-sm text-gray-600 mb-2">
                                <p>Inizio: {new Date(project.startDate).toLocaleDateString()}</p>
                                <p>Fine: {new Date(project.endDate).toLocaleDateString()}</p>
                                <p>Status: <span className="font-medium">{project.status}</span></p>
                                <p>Partecipanti: {project.participants.length}</p>
                            </div>
                            
                            {user?.role === "admin" && (
                                <div className="mt-4 space-x-2">
                                    <button
                                        onClick={() => {
                                            setCurrentProject(project);
                                            setShowConservationModal(true);
                                        }}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Modifica
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProject(project.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Elimina
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Altri Progetti */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-black">Altri Progetti</h2>
                <div className="flex flex-col w-full space-y-4 text-black">
                    {projects.map((proj) => (
                        <WindowsProject key={proj.id} project={proj} />
                    ))}
                </div>
            </div>

            {/* Modale per progetti di conservazione */}
            {showConservationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">
                            {currentProject.id ? 'Modifica' : 'Nuovo'} Progetto di Conservazione
                        </h2>
                        <form onSubmit={handleCreateConservationProject}>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Titolo</label>
                                <input
                                    type="text"
                                    value={currentProject.title || ''}
                                    onChange={(e) => setCurrentProject({
                                        ...currentProject,
                                        title: e.target.value
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
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Data Inizio</label>
                                <input
                                    type="date"
                                    value={currentProject.startDate || ''}
                                    onChange={(e) => setCurrentProject({
                                        ...currentProject,
                                        startDate: e.target.value
                                    })}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Data Fine</label>
                                <input
                                    type="date"
                                    value={currentProject.endDate || ''}
                                    onChange={(e) => setCurrentProject({
                                        ...currentProject,
                                        endDate: e.target.value
                                    })}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Status</label>
                                <select
                                    value={currentProject.status || ''}
                                    onChange={(e) => setCurrentProject({
                                        ...currentProject,
                                        status: e.target.value
                                    })}
                                    className="w-full border p-2 rounded"
                                    required
                                >
                                    <option value="">Seleziona status</option>
                                    <option value="PIANIFICATO">Pianificato</option>
                                    <option value="IN_CORSO">In Corso</option>
                                    <option value="COMPLETATO">Completato</option>
                                    <option value="SOSPESO">Sospeso</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowConservationModal(false);
                                        setCurrentProject({});
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Annulla
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Salva
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