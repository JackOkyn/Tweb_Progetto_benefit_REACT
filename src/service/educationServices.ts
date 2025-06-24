// src/services/educationService.ts

import { Education, CommentEducation } from '../types/Education';

const EDUCATION_API = 'http://localhost:8080/educations';

export const educationService = {
    // — tutte le educazioni
    getAll: async (): Promise<Education[]> => {
        const res = await fetch(EDUCATION_API, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    },

    // — singola education
    getById: async (id: number): Promise<Education> => {
        const res = await fetch(`${EDUCATION_API}/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    },

    // — creazione
    create: async (education: Partial<Education>): Promise<Education> => {
        const res = await fetch(EDUCATION_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(education),
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    },

    // — aggiornamento (titolo, descrizione, ecc.)
    update: async (id: number, education: Partial<Education>): Promise<Education> => {
        const res = await fetch(`${EDUCATION_API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(education),
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    },

    // — cancellazione
    delete: async (id: number): Promise<void> => {
        const res = await fetch(`${EDUCATION_API}/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    },

    // — aggiungi un commento all’education {id}
    addComment: async (
        educationId: number,
        educationComment: string
    ): Promise<CommentEducation> => {
        const res = await fetch(
            `${EDUCATION_API}/${educationId}/comments`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ educationComment }),
            }
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    },

    // — elimina un commento per id
    deleteComment: async (commentId: number): Promise<void> => {
        const res = await fetch(
            `${EDUCATION_API}/comments/${commentId}`,
            { method: 'DELETE' }
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    },

    // — incrementa like per l’education {id}
    likeEducation: async (id: number): Promise<Education> => {
        const res = await fetch(
            `${EDUCATION_API}/${id}/like`,
            { method: 'PUT' }
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    },
};
