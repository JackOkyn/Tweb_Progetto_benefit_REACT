import { ConservationProject } from '../types/ConservationProject';

const PROJECT_API = 'http://localhost:8080/conservation-projects';

export const projectService = {
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

    getById: async (id: number): Promise<ConservationProject> => {
        const response = await fetch(`${PROJECT_API}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    create: async (project: Partial<ConservationProject>): Promise<ConservationProject> => {
        const response = await fetch(PROJECT_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    update: async (id: number, project: Partial<ConservationProject>): Promise<ConservationProject> => {
        const response = await fetch(`${PROJECT_API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    delete: async (id: number): Promise<void> => {
        const response = await fetch(`${PROJECT_API}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
};