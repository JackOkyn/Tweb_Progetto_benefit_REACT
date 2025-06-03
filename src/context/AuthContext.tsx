import React, { createContext, useContext, useState } from "react";

/** Definiamo i possibili ruoli dell’utente. */
export type UserRole = "admin" | "community";

/** Tipo che descrive i dati utente. */
export interface UserData {
    nickname: string;
    email: string;
    password: string;
    role: UserRole;
}

/** Struttura del contesto: user + metodi di login/logout. */
interface AuthContextProps {
    user: UserData | null;
    login: (email: string, password: string) => void;
    signUp: (nickname: string, email: string, password: string) => void;
    logout: () => void;
}

/**
 Creiamo il contesto con valori di default (che verranno poi sovrascritti).
 */
const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => {},
    signUp: () => {},
    logout: () => {},
});

/**
 Il provider che avvolge l’applicazione e fornisce lo stato utente.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);

    /**
     * Funzione di login fittizia:
     * - Se la password è "admin", l’utente avrà ruolo admin,
     * - Altrimenti sarà community.
     */
    const login = (email: string, password: string) => {
        if (!email || !password) return;

        const role: UserRole = password === "admin" ? "admin" : "community";

        const fakeUser: UserData = {
            nickname: role === "admin" ? "Mario" : "Luigi",
            email,
            password,
            role,
        };

        setUser(fakeUser);
    };

    /**
     * Funzione di registrazione fittizia:
     * Qui potresti far scegliere un ruolo o assegnarlo di default (community).
     */
    const signUp = (nickname: string, email: string, password: string) => {
        // Assegniamo di default il ruolo "community" all’utente registrato
        const fakeUser: UserData = {
            nickname,
            email,
            password,
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

/** Per accedere con piu semplicità ad AuthContext */
export const useAuth = () => useContext(AuthContext);
