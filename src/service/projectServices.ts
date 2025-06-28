// src/services/projectService.ts
import { ConservationProject } from '../types/ConservationProject';
import { User } from '../types/User';
const API_BASE = '/conservation-projects';

export interface ProjectDTO {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;

}

export async function getAllProjects(): Promise<ConservationProject[]> {
    const res = await fetch(API_BASE, { credentials: 'include' });
    if (!res.ok) throw new Error(`Errore fetch progetti: ${res.status}`);
    return res.json();
}

export async function createProject(payload: ProjectDTO): Promise<ConservationProject> {
    const res = await fetch(API_BASE, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Errore creazione progetto: ${res.status}`);
    return res.json();
}

export async function updateProject(
    id: number,
    payload: ProjectDTO
): Promise<ConservationProject> {
    console.log('>>> PUT payload:', JSON.stringify(payload));
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    console.log('>>> PUT request headers:', res.headers.get('content-type'));
    if (!res.ok) {
        throw new Error(`Errore aggiornamento progetto ${id}: ${res.status}`);
    }
    return (await res.json()) as ConservationProject;
}


export async function deleteProject(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!res.ok) throw new Error(`Errore eliminazione progetto ${id}: ${res.status}`);
}

/**
 * Partecipa ad un progetto (placeholder)
 * Appena avrai l’endpoint corretto, sostituisci URL e metodo.
 */
export async function getParticipants(projectId: number): Promise<User[]> {
    const res = await fetch(`http://localhost:8080/scientific/conservation/${projectId}/participants`, {
        credentials: "include"
    });
    if (!res.ok) throw new Error("Errore caricamento partecipanti");
    return res.json();


}
