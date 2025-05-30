import {Education} from "../models/models.tsx";

const EDUCATION_API = 'http://localhost:8080/educations';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export const educationService = {
    getAll: async (): Promise<Education[]> => {
        const response = await fetch(EDUCATION_API, {
            method: 'GET',
            headers: defaultHeaders,
            credentials: 'include' // Per supportare i cookies se necessario
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    getById: async (id: number): Promise<Education> => {
        const response = await fetch(`${EDUCATION_API}/${id}`, {
            method: 'GET',
            headers: defaultHeaders,
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    create: async (education: Partial<Education>): Promise<Education> => {
        const response = await fetch(EDUCATION_API, {
            method: 'POST',
            headers: defaultHeaders,
            credentials: 'include',
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
            headers: defaultHeaders,
            credentials: 'include',
            body: JSON.stringify(education)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    },

    delete: async (id: number): Promise<void> => {
        const response = await fetch(`${EDUCATION_API}/${id}`, {
            method: 'DELETE',
            headers: defaultHeaders,
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
};