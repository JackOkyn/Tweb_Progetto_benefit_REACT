export interface Participant {
    id: number;
    name: string;
    email?: string;
    role?: string;
}

export interface ConservationProject {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    participants: Participant[];
}