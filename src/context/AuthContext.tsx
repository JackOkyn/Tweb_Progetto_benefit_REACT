import React, { createContext, useContext, useState } from "react";

/** Definiamo i possibili ruoli dell’utente. */
export type UserRole = "admin" | "community";

/** Tipo che descrive i dati utente. */
export interface UserData {
    nickname: string;
    email: string;
    role: UserRole;
}

/** Struttura del contesto: user + metodi di login/logout. */
interface AuthContextProps {
    user: UserData | null;
    login: (username: string, password: string) => void; // Cambiato email in username
    signUp: (nickname: string, email: string, password: string) => void;
    logout: () => void;
}

/**
 * 1. Creiamo il contesto con valori di default (che verranno poi sovrascritti).
 */
const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => {},
    signUp: () => {},
    logout: () => {},
});

/**
 * 2. Il provider che avvolge l’applicazione e fornisce lo stato utente.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser ] = useState<UserData | null>(null);

    const login = async (username: string, password: string) => {
        if (!username || !password) return;

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Supponiamo che il backend restituisca nickname e ruolo
                const loggedInUser: UserData = {
                    nickname: data.nickname, // Assicurati che il backend restituisca il nickname
                    email: data.email, // Se il backend restituisce l'email
                    role: data.role, // Assicurati che il backend restituisca il ruolo
                };
                setUser(loggedInUser);
            } else {
                const errorMessage = await response.text();
                console.error("Login failed:", errorMessage);
                // Gestisci l'errore (ad esempio, mostra un messaggio all'utente)
            }
        } catch (error) {
            console.error("Error during login:", error);
            // Gestisci l'errore di rete
        }
    };

    const signUp = (nickname: string, email: string, password: string) => {
        // Logica di registrazione (puoi implementare anche questa con Fetch API)
        const fakeUser: UserData = {
            nickname,
            email,
            role: "community",
        };
        setUser(fakeUser);
    };

    /** Funzione di logout */
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/** Comodo hook per consumare il contesto. */
export const useAuth = () => useContext(AuthContext);
