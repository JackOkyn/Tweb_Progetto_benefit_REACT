import {ConservationProject } from "../types/ConservationProject.ts";


const BASE = 'http://localhost:8080';

export const conservationService = {
    getMyConservations: async (userId: number): Promise<ConservationProject[]> => {
        const res = await fetch(`${BASE}/scientific/users/${userId}/conservation-projects`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!res.ok) throw new Error(`Errore fetch: ${res.status}`);
        return res.json();
    },

    joinProject: async (projectId: number, userId: number) => {
        const res = await fetch(`${BASE}/scientific/conservation/${projectId}/participants/${userId}`, {
            method: 'POST',
            credentials: 'include',
        });
        if (!res.ok) throw new Error(`Errore join: ${res.status}`);
    },

    leaveProject: async (projectId: number, userId: number) => {
        const res = await fetch(`${BASE}/scientific/conservation/${projectId}/participants/${userId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (!res.ok) throw new Error(`Errore leave: ${res.status}`);
    },
};
