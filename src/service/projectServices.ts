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
        const response = await fetch(`${PROJECT_API}/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    // 3. Crea un nuovo progetto
    create: async (project: Partial<ConservationProject>): Promise<ConservationProject> => {
        const projectData = {
            name: project.name || '',
            description: project.description || '',
            users: project.users || []
        };

        const response = await fetch(PROJECT_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    // 4. Aggiorna un progetto
    update: async (id: number, project: Partial<ConservationProject>): Promise<ConservationProject> => {
        const projectData = {
            name: project.name || '',
            description: project.description || '',
            users: project.users || []
        };

        const response = await fetch(`${PROJECT_API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    // 5. Elimina un progetto
    delete: async (id: number): Promise<void> => {
        const response = await fetch(`${PROJECT_API}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    },

    // 6. Ottieni i partecipanti di un progetto
    getProjectParticipants: async (projectId: number): Promise<any[]> => {
        const response = await fetch(`${PROJECT_API}/${projectId}/participants`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    // 7. Aggiungi un partecipante a un progetto (richiede userId)
    addParticipant: async (projectId: number, userId: number): Promise<void> => {
        const response = await fetch(`${PROJECT_API}/${projectId}/participants/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    },

    // 8. Rimuovi un partecipante da un progetto
    removeParticipant: async (projectId: number, userId: number): Promise<void> => {
        const response = await fetch(`${PROJECT_API}/${projectId}/participants/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    },

    // 9. Ottieni progetti di un utente specifico
    getProjectsByUser: async (userId: number): Promise<ConservationProject[]> => {
        const response = await fetch(`http://localhost:8080/scientific/users/${userId}/projects`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
};