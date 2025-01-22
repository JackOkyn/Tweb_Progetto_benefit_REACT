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
    participants: number;
}

/** Struttura del contesto */
interface ProjectsContextType {
    projects: ProjectData[];
    myActivity: ProjectData[];
    joinProject: (projectId: number) => void;
    leaveProject: (projectId: number) => void;
    addProject: (newProj: Omit<ProjectData, "id" | "participants">) => void;
    updateProject: (updated: ProjectData) => void; // <-- nuova funzione
}

const ProjectsContext = createContext<ProjectsContextType>({
    projects: [],
    myActivity: [],
    joinProject: () => {},
    leaveProject: () => {},
    addProject: () => {},
    updateProject: () => {},
});

interface ProjectsProviderProps {
    children: ReactNode;
}

export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({ children }) => {
    const { user } = useAuth();

    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [myActivity, setMyActivity] = useState<ProjectData[]>([]);

    // Caricamento fittizio
    useEffect(() => {
        const fakeProjects: ProjectData[] = [
            {
                id: 1,
                author: "Mario Rossi",
                title: "Progetto React + Vite",
                imageUrl: "https://source.unsplash.com/random/800x600/?project",
                description: "Un progetto su come utilizzare React con Vite.",
                participants: 2,
            },
            {
                id: 2,
                author: "Giulia Bianchi",
                title: "Progetto Intelligenza Artificiale",
                imageUrl: "https://source.unsplash.com/random/801x601/?project",
                description: "Machine learning e reti neurali.",
                participants: 5,
            },
        ];
        setProjects(fakeProjects);
    }, []);

    // Fittizio caricamento myActivity
    useEffect(() => {
        if (user) {
            setMyActivity([]);
        } else {
            setMyActivity([]);
        }
    }, [user]);

    /** joinProject e leaveProject già esistenti... */

    const joinProject = (projectId: number) => {
        if (!user) return;
        const projectToJoin = projects.find((p) => p.id === projectId);
        if (!projectToJoin) return;

        setProjects((prev) =>
            prev.map((p) =>
                p.id === projectId
                    ? { ...p, participants: p.participants + 1 }
                    : p
            )
        );
        if (!myActivity.some((act) => act.id === projectId)) {
            setMyActivity((prev) => [
                ...prev,
                { ...projectToJoin, participants: projectToJoin.participants + 1 },
            ]);
        }
    };

    const leaveProject = (projectId: number) => {
        if (!user) return;
        const projectToLeave = projects.find((p) => p.id === projectId);
        if (!projectToLeave) return;

        setProjects((prev) =>
            prev.map((p) =>
                p.id === projectId && p.participants > 0
                    ? { ...p, participants: p.participants - 1 }
                    : p
            )
        );
        setMyActivity((prev) => prev.filter((p) => p.id !== projectId));
    };

    /**
     * Aggiunge un nuovo progetto
     * (già mostrato in esempi precedenti)
     */
    const addProject = (newProj: Omit<ProjectData, "id" | "participants">) => {
        // In futuro: fetch("/api/projects", { method: "POST", body: ... })
        const newId = Date.now();
        const createdProject: ProjectData = {
            id: newId,
            author: newProj.author,
            title: newProj.title,
            imageUrl: newProj.imageUrl,
            description: newProj.description,
            participants: 0,
        };
        setProjects((prev) => [...prev, createdProject]);
    };

    /**
     * updateProject: aggiorna i campi di un progetto esistente.
     * In futuro: fetch(`/api/projects/${updated.id}`, { method: "PUT", body: ... })
     */
    const updateProject = (updated: ProjectData) => {
        // Aggiorno in projects
        setProjects((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
        );

        // Se esiste in myActivity, aggiorno anche lì
        setMyActivity((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
        );
    };

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                myActivity,
                joinProject,
                leaveProject,
                addProject,
                updateProject,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
};

export const useProjects = () => useContext(ProjectsContext);
