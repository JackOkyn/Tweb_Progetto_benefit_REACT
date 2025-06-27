export interface User {
    id: number;
    name: string;
    email?: string;
    role?: string;
}

export interface ConservationProject {
    id: number;
    title: string;
    description: string;
    startDate: string | null;
    endDate: string | null;
    status: string;
    participants?: User[];
}
