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
    updateProject: (updated: ProjectData) => void; // Funzione per aggiornare un progetto
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

    // Caricamento fittizio dei progetti
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

    // Aggiornamento dell'attività dell'utente
    useEffect(() => {
        if (user) {
            // Qui puoi caricare l'attività dell'utente da un'API se necessario
            setMyActivity([]); // Placeholder: sostituisci con la logica reale
        } else {
            setMyActivity([]);
        }
    }, [user]);

    /** Funzione per unirsi a un progetto */
    const joinProject = (projectId: number) => {
        if (!user) return; // Se l'utente non è loggato, non può unirsi
        const projectToJoin = projects.find((p) => p.id === projectId);
        if (!projectToJoin) return;

        setProjects((prev) =>
            prev.map((p) =>
                p.id === projectId
                    ? { ...p, participants: p.participants + 1 }
                    : p
            )
        );
        // Aggiungi il progetto all'attività dell'utente se non è già presente
        if (!myActivity.some((act) => act.id === projectId)) {
            setMyActivity((prev) => [
                ...prev,
                { ...projectToJoin, participants: projectToJoin.participants + 1 },
            ]);
        }
    };

    /** Funzione per lasciare un progetto */
    const leaveProject = (projectId: number) => {
        if (!user) return; // Se l'utente non è loggato, non può lasciare
        const projectToLeave = projects.find((p) => p.id === projectId);
        if (!projectToLeave) return;

        setProjects((prev) =>
            prev.map((p) =>
                p.id === projectId && p.participants > 0
                    ? { ...p, participants: p.participants - 1 }
                    : p
            )
        );
        // Rimuovi il progetto dall'attività dell'utente
        setMyActivity((prev) => prev.filter((p) => p.id !== projectId));
    };

    /** Funzione per aggiungere un nuovo progetto */
    const addProject = (newProj: Omit<ProjectData, "id" | " participants">) => {
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

    /** Funzione per aggiornare un progetto esistente */
    const updateProject = (updated: ProjectData) => {
        setProjects((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
        );

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