// src/services/likeService.ts

export interface User {
    id: number;
    username: string;
    role?: string;
}

const LIKE_API = "http://localhost:8080/likes";

export const likeService = {
    /** Ritorna il numero di like di una education */
    getCount: async (educationId: number): Promise<number> => {
        const res = await fetch(`${LIKE_API}/count/${educationId}`);
        if (!res.ok) throw new Error(`Errore count: ${res.status}`);
        return await res.json();
    },

    /** Effettua il toggle like/unlike, ritorna true se ora è like, false se ora è unlike */
    toggle: async (
        educationId: number,
        userId: number
    ): Promise<boolean> => {
        const res = await fetch(
            `${LIKE_API}/toggle?educationId=${educationId}&userId=${userId}`,
            {
                method: "POST" ,
                credentials: "include",
            }
        );
        if (!res.ok) throw new Error(`Errore toggle: ${res.status}`);
        return await res.json();
    },

    /** Ritorna la lista di utenti che hanno messo like (per sapere se l’utente corrente ha già messo like) */
    getUsers: async (educationId: number): Promise<User[]> => {
        const res = await fetch(`${LIKE_API}/users/${educationId}`);
        if (!res.ok) throw new Error(`Errore users: ${res.status}`);
        return await res.json();
    },
};
