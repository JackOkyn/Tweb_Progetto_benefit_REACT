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
    participants: number; // <-- numero di utenti che partecipano al progetto
}

/** Struttura del contesto progetti */
interface ProjectsContextType {
    projects: ProjectData[];
    myActivity: ProjectData[];
    joinProject: (projectId: number) => void;
}

/** Creiamo il contesto, fornendo valori di default vuoti */
const ProjectsContext = createContext<ProjectsContextType>({
    projects: [],
    myActivity: [],
    joinProject: () => {},
});

/** Props del Provider: riceve `children` da avvolgere */
interface ProjectsProviderProps {
    children: ReactNode;
}

/**
 * Provider che si occupa di gestire:
 * - La lista dei progetti (fittizi o caricati da server)
 * - Il numero di partecipanti per progetto
 * - L'elenco dei progetti a cui l'utente ha scelto di partecipare (myActivity)
 */
export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({
                                                                      children,
                                                                  }) => {
    const { user } = useAuth(); // Per capire se l'utente è loggato e il suo ruolo

    // Stato dei progetti disponibili
    const [projects, setProjects] = useState<ProjectData[]>([]);

    // Stato dei progetti a cui l'utente partecipa
    const [myActivity, setMyActivity] = useState<ProjectData[]>([]);

    /**
     * Simuliamo il caricamento dei progetti dal "server".
     * In un caso reale potresti fare:
     *   useEffect(() => {
     *     fetch("/api/projects")
     *       .then(res => res.json())
     *       .then((data: ProjectData[]) => setProjects(data))
     *       .catch(err => console.error(err));
     *   }, []);
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

        // Carichiamo i progetti fittizi
        setProjects(fakeProjects);
    }, []);

    /**
     * joinProject: funzione per partecipare a un progetto (fittizia).
     * - In un caso reale, potresti fare:
     *
     *   fetch(`/api/projects/${projectId}/join`, { method: "POST" })
     *     .then(res => res.json())
     *     .then((updatedProject) => {
     *       // Aggiorna lo stato con i dati reali del server
     *     })
     *     .catch(err => console.error(err));
     */
    const joinProject = (projectId: number) => {
        // Se non c'è un utente loggato, non facciamo nulla
        if (!user) return;

        // Troviamo il progetto corrispondente
        const projectToJoin = projects.find((p) => p.id === projectId);

        if (projectToJoin) {
            // 1) Incrementiamo il numero di partecipanti in modo fittizio
            setProjects((prev) =>
                prev.map((p) =>
                    p.id === projectId
                        ? { ...p, participants: p.participants + 1 }
                        : p
                )
            );

            // 2) Aggiungiamo il progetto a "myActivity" (se non è già presente)
            //    oppure potresti volerlo rimuovere da "projects" se preferisci
            setMyActivity((prev) =>
                prev.some((act) => act.id === projectId)
                    ? prev
                    : [...prev, { ...projectToJoin, participants: projectToJoin.participants + 1 }]
            );
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

/** Hook custom per utilizzare più comodamente il contesto */
export const useProjects = () => useContext(ProjectsContext);
