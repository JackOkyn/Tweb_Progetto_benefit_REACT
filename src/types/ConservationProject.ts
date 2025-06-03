export interface User {
    id: number;
    name: string;
    email?: string;
    role?: string;
}

export interface ConservationProject {
    id: number;
    name: string;
    description: string;
    users?: User[];
    author?: string;
}