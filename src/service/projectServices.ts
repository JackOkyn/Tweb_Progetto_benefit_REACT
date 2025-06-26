// src/services/projectService.ts
import { ConservationProject } from '../components/WindowsProject';

const API_BASE = '/conservation-projects';

/**
 * Recupera tutti i progetti di conservazione
 */
export async function getAllProjects(): Promise<ConservationProject[]> {
    const res = await fetch(API_BASE, {
        method: 'GET',
        credentials: 'include',
    });
    if (!res.ok) {
        throw new Error(`Errore fetch progetti: ${res.status}`);
    }
    return (await res.json()) as ConservationProject[];
}

/**
 * Recupera un singolo progetto per ID
 */
export async function getProjectById(
    id: number
): Promise<ConservationProject> {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'GET',
        credentials: 'include',
    });
    if (!res.ok) {
        throw new Error(`Errore fetch progetto ${id}: ${res.status}`);
    }
    return (await res.json()) as ConservationProject;
}

/**
 * DTO per creazione/aggiornamento progetto
 */
export interface ProjectDTO {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
}

/**
 * Crea un nuovo progetto
 */
export async function createProject(
    payload: ProjectDTO
): Promise<ConservationProject> {
    const res = await fetch(API_BASE, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        throw new Error(`Errore creazione progetto: ${res.status}`);
    }
    return (await res.json()) as ConservationProject;
}

/**
 * Aggiorna un progetto esistente
 */
export async function updateProject(
    id: number,
    payload: ProjectDTO
): Promise<ConservationProject> {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        throw new Error(`Errore aggiornamento progetto ${id}: ${res.status}`);
    }
    return (await res.json()) as ConservationProject;
}

/**
 * Elimina un progetto per ID
 */
export async function deleteProject(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!res.ok) {
        throw new Error(`Errore eliminazione progetto ${id}: ${res.status}`);
    }
}