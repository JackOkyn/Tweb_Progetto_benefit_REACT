import { Education } from '../types/Education';

const EDUCATION_API = 'http://localhost:8080/educations';

export const educationService = {
    getAll: async (): Promise<Education[]> => {
        try {
            const response = await fetch(EDUCATION_API, {
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
            console.error('Errore nel fetch delle educazioni:', error);
            throw error;
        }
    },

    getById: async (id: number): Promise<Education> => {
        const response = await fetch(`${EDUCATION_API}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    create: async (education: Partial<Education>): Promise<Education> => {
        const response = await fetch(EDUCATION_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(education)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    update: async (id: number, education: Partial<Education>): Promise<Education> => {
        const response = await fetch(`${EDUCATION_API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(education)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    delete: async (id: number): Promise<void> => {
        const response = await fetch(`${EDUCATION_API}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    },
};