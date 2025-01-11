import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

/** Tipo per rappresentare un progetto */
export interface ProjectData {
    id: number;
    author: string;
    title: string;
    imageUrl: string;
    description: string;
}

/** Interfaccia del contesto progetti */
interface ProjectsContextType {
    projects: ProjectData[];
    myActivity: ProjectData[];
    joinProject: (projectId: number) => void;
}

/** Creiamo il contesto con valori di default vuoti */
const ProjectsContext = createContext<ProjectsContextType>({
    projects: [],
    myActivity: [],
    joinProject: () => {},
});

/** Props del Provider (riceve children) */
interface ProjectsProviderProps {
    children: ReactNode;
}

/**
 * Provider che avvolge l'app e fornisce lo stato
 */
export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({
                                                                      children,
                                                                  }) => {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [myActivity, setMyActivity] = useState<ProjectData[]>([]);
    const { user } = useAuth(); // per sapere se l'utente è loggato

    /**
     * Simuliamo un caricamento iniziale dei progetti dal server (fittizio).
     * In futuro potresti fare:
     *   useEffect(() => {
     *     fetch("/api/projects")
     *       .then(res => res.json())
     *       .then(data => setProjects(data))
     *       .catch(err => console.error(err));
     *   }, []);
     */
    useEffect(() => {
        // Dati fittizi
        const fakeProjects: ProjectData[] = [
            {
                id: 1,
                author: "Mario Rossi",
                title: "Misura i ghiacciai a Sestriere",
                imageUrl: "https://source.unsplash.com/random/800x600/?project",
                description:
                    "Aiutaci a raccogliere e misurare i ghiacciai in varie località di sestriere e delle alpi, prendi i tuoi sci e raggugi  punti sulla mappa, li troverai vin brule e pane e salame, tutti noi asisieme festeggeremo. Un progetto interessante su come utilizzare React con Vite per sviluppare applicazioni web velocemente.",
            },
            {
                id: 2,
                author: "Giulia Bianchi",
                title: "Progetto Intelligenza Artificiale",
                imageUrl: "https://source.unsplash.com/random/801x601/?project",
                description:
                    "Un progetto su reti neurali e machine learning. Approfondiamo i modelli di deep learning.",
            },
        ];

        setProjects(fakeProjects);
    }, []);

    /**
     * Funzione per partecipare a un progetto (solo se l'utente è loggato).
     * - Aggiunge il progetto a 'myActivity' (o potresti mantenere i progetti in parallelo).
     * - In futuro, potresti fare:
     *   fetch(`/api/projects/${projectId}/join`, { method: "POST" })
     *     .then(() => { ... })
     *     .catch(err => console.error(err));
     */
    const joinProject = (projectId: number) => {
        if (!user) return; // se non è loggato, non facciamo nulla

        const projectToJoin = projects.find((p) => p.id === projectId);
        if (projectToJoin) {
            // Aggiungiamo il progetto alla lista "myActivity"
            setMyActivity((prev) => [...prev, projectToJoin]);

            // Se desideri rimuoverlo dalla lista "projects", scommenta:
            // setProjects(prev => prev.filter(p => p.id !== projectId));
        }
    };

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                myActivity,
                joinProject,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
};

/** Comodo custom hook per usare il contesto */
export const useProjects = () => useContext(ProjectsContext);
