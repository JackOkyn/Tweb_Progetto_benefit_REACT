// src/context/ProjectsContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

/** Modello di dati di un progetto */
export interface ProjectData {
    id: number;
    author: string;
    title: string;
    imageUrl: string;
    description: string;
    participants: number; // Numero di partecipanti
}

/** Struttura del contesto */
interface ProjectsContextType {
    projects: ProjectData[];
    myActivity: ProjectData[];
    joinProject: (projectId: number) => void;
    leaveProject: (projectId: number) => void; // <-- nuova funzione
}

/** Creiamo il contesto con valori di default */
const ProjectsContext = createContext<ProjectsContextType>({
    projects: [],
    myActivity: [],
    joinProject: () => {},
    leaveProject: () => {},
});

/** Props del Provider */
interface ProjectsProviderProps {
    children: ReactNode;
}

/**
 * Provider dei progetti:
 * - gestisce la lista "projects",
 * - gestisce "myActivity",
 * - offre funzioni joinProject e leaveProject
 */
export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({
                                                                      children,
                                                                  }) => {
    const { user } = useAuth(); // L'utente loggato (o null se non loggato)

    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [myActivity, setMyActivity] = useState<ProjectData[]>([]);

    /**
     * Carichiamo fittiziamente i progetti dal "server".
     * In futuro: fetch("/api/projects")...
     */
    useEffect(() => {
        const fakeProjects: ProjectData[] = [
            {
                id: 1,
                author: "Mario Rossi",
                title: "Progetto React + Vite",
                imageUrl: "https://source.unsplash.com/random/800x600/?project",
                description:
                    "Un progetto interessante su come utilizzare React con Vite per sviluppare applicazioni web velocemente.",
                participants: 2,
            },
            {
                id: 2,
                author: "Giulia Bianchi",
                title: "Progetto Intelligenza Artificiale",
                imageUrl: "https://source.unsplash.com/random/801x601/?project",
                description:
                    "Un progetto su reti neurali e machine learning. Approfondiamo i modelli di deep learning.",
                participants: 5,
            },
        ];
        setProjects(fakeProjects);
    }, []);

    /**
     * Se l'utente effettua il login/logout, carichiamo/svuotiamo myActivity (fittiziamente).
     */
    useEffect(() => {
        if (user) {
            // Esempio fittizio di "myActivity"
            // Potresti fetchare da: `/api/users/${user.id}/my-activity`
            const fakeMyActivity: ProjectData[] = [];
            setMyActivity(fakeMyActivity);
        } else {
            setMyActivity([]);
        }
    }, [user]);

    /**
     * Funzione fittizia per partecipare a un progetto.
     * In un caso reale, potresti fare:
     *   fetch(`/api/projects/${projectId}/join`, { method: "POST" }) ...
     */
    const joinProject = (projectId: number) => {
        if (!user) return;

        // Troviamo il progetto corrispondente
        const projectToJoin = projects.find((p) => p.id === projectId);
        if (!projectToJoin) return;

        // 1) Incrementa i participants a livello locale
        setProjects((prev) =>
            prev.map((p) =>
                p.id === projectId
                    ? { ...p, participants: p.participants + 1 }
                    : p
            )
        );

        // 2) Aggiungiamo il progetto a myActivity se non già presente
        const alreadyInActivity = myActivity.some((act) => act.id === projectId);
        if (!alreadyInActivity) {
            setMyActivity((prev) => [
                ...prev,
                { ...projectToJoin, participants: projectToJoin.participants + 1 },
            ]);
        }
    };

    /**
     * Nuova funzione: annulla la partecipazione (decrementa i participants e rimuove da myActivity).
     * In un caso reale, potresti fare:
     *   fetch(`/api/projects/${projectId}/leave`, { method: "DELETE" }) ...
     */
    const leaveProject = (projectId: number) => {
        if (!user) return;

        // Troviamo il progetto corrispondente
        const projectToLeave = projects.find((p) => p.id === projectId);
        if (!projectToLeave) return;

        // 1) Decrementiamo i participants (senza andare sotto zero)
        setProjects((prev) =>
            prev.map((p) =>
                p.id === projectId && p.participants > 0
                    ? { ...p, participants: p.participants - 1 }
                    : p
            )
        );

        // 2) Rimuoviamo il progetto da myActivity
        setMyActivity((prev) => prev.filter((p) => p.id !== projectId));
    };

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                myActivity,
                joinProject,
                leaveProject,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
};

/** Hook custom per consumare il contesto */
export const useProjects = () => useContext(ProjectsContext);
