import { ConservationProject } from '../types/ConservationProject';

const PROJECT_API = 'http://localhost:8080/scientific/projects';

export const projectService = {
    // 1. Ottieni tutti i progetti
    getAll: async (): Promise<ConservationProject[]> => {
        try {
            const response = await fetch(PROJECT_API, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Errore nel fetch dei progetti di conservazione:', error);
            throw error;
        }
    },

    // 2. Ottieni progetto per ID
    getById: async (id: number): Promise<ConservationProject> => {
        try {
            const response = await fetch(`${PROJECT_API}/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Progetto con ID ${id} non trovato`);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Normalizza i dati assicurandoti che abbia il campo users
            return {
                ...data,
                users: data.users || []
            };
        } catch (error) {
            console.error(`Errore nel fetch del progetto ${id}:`, error);
            throw error;
        }
    },

    // 3. Crea un nuovo progetto
    create: async (project: Partial<ConservationProject>): Promise<ConservationProject> => {
        try {
            const projectData = {
                name: project.name || '',
                description: project.description || '',
                users: project.users || [],
                author: project.author
            };

            const response = await fetch(PROJECT_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });

            if (!response.ok) {
                throw new Error(`Errore nella creazione: ${response.status}`);
            }

            const data = await response.json();
            return {
                ...data,
                users: data.users || []
            };
        } catch (error) {
            console.error('Errore nella creazione del progetto:', error);
            throw error;
        }
    },

    // 4. Aggiorna un progetto
    update: async (id: number, project: Partial<ConservationProject>): Promise<ConservationProject> => {
        try {
            const projectData = {
                name: project.name || '',
                description: project.description || '',
                users: project.users || [],
                author: project.author
            };

            const response = await fetch(`${PROJECT_API}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Progetto con ID ${id} non trovato`);
                }
                throw new Error(`Errore nell'aggiornamento: ${response.status}`);
            }

            const data = await response.json();
            return {
                ...data,
                users: data.users || []
            };
        } catch (error) {
            console.error(`Errore nell'aggiornamento del progetto ${id}:`, error);
            throw error;
        }
    },

    // 5. Elimina un progetto
    delete: async (id: number): Promise<void> => {
        try {
            const response = await fetch(`${PROJECT_API}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Progetto con ID ${id} non trovato`);
                }
                throw new Error(`Errore nell'eliminazione: ${response.status}`);
            }
        } catch (error) {
            console.error(`Errore nell'eliminazione del progetto ${id}:`, error);
            throw error;
        }
    },

    // 6. Ottieni i partecipanti di un progetto
    getProjectParticipants: async (projectId: number): Promise<any[]> => {
        try {
            const response = await fetch(`${PROJECT_API}/${projectId}/participants`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Errore nel fetch dei partecipanti del progetto ${projectId}:`, error);
            throw error;
        }
    },

    // 7. Aggiungi un partecipante a un progetto (richiede userId)
    addParticipant: async (projectId: number, userId: number): Promise<void> => {
        try {
            const response = await fetch(`${PROJECT_API}/${projectId}/participants/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`Errore nell'aggiunta del partecipante: ${response.status}`);
            }
        } catch (error) {
            console.error(`Errore nell'aggiunta del partecipante al progetto ${projectId}:`, error);
            throw error;
        }
    },

    // 8. Rimuovi un partecipante da un progetto
    removeParticipant: async (projectId: number, userId: number): Promise<void> => {
        try {
            const response = await fetch(`${PROJECT_API}/${projectId}/participants/${userId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`Errore nella rimozione del partecipante: ${response.status}`);
            }
        } catch (error) {
            console.error(`Errore nella rimozione del partecipante dal progetto ${projectId}:`, error);
            throw error;
        }
    },

    // 9. Ottieni progetti di un utente specifico
    getProjectsByUser: async (userId: number): Promise<ConservationProject[]> => {
        try {
            const response = await fetch(`http://localhost:8080/scientific/users/${userId}/projects`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Normalizza tutti i progetti
            return data.map((project: any) => ({
                ...project,
                users: project.users || []
            }));
        } catch (error) {
            console.error(`Errore nel fetch dei progetti dell'utente ${userId}:`, error);
            throw error;
        }
    },
};