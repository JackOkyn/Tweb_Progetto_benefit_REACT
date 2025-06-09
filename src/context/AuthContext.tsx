import React, { createContext, useContext, useState } from "react";

/** Ruoli dell'utente */
export type UserRole = "admin" | "community";

/** dati utente con ID. */
export interface UserData {
    id: number;
    nickname: string;
    email: string;
    password: string;
    role: UserRole;
}

/** Struttura del context: user + metodi di login/logout. */
interface AuthContextProps {
    user: UserData | null;
    login: (email: string, password: string) => void;
    signUp: (nickname: string, email: string, password: string) => void;
    logout: () => void;
}

/** context con valori di default. */
const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => {},
    signUp: () => {},
    logout: () => {},
});

/** Provider che avvolge l’applicazione e fornisce lo stato utente. */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);

    /**
     * Funzione di login fittizia:
     * - Se la password è "admin", l’utente avrà ruolo admin e id 1,
     * - Altrimenti sarà community con id 2.
     */
    const login = (email: string, password: string) => {
        if (!email || !password) return;

        const role: UserRole = password === "admin" ? "admin" : "community";
        const id = role === "admin" ? 1 : 2;

        const fakeUser: UserData = {
            id,
            nickname: role === "admin" ? "Mario" : "Luigi",
            email,
            password,
            role,
        };

        setUser(fakeUser);
    };

    /**
     * Funzione di registrazione fittizia:
     * Assegna ruolo "community" e genera un id casuale.
     */
    const signUp = (nickname: string, email: string, password: string) => {
        const fakeUser: UserData = {
            id: Math.floor(Math.random() * 10000), // ID simulato
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

/** Hook per accedere al context */
export const useAuth = () => useContext(AuthContext);
