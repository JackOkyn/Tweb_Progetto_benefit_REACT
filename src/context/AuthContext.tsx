import React, { createContext, useContext, useState } from "react";

/** Definiamo i possibili ruoli dell’utente. */
export type UserRole = "admin" | "community";

/** Tipo che descrive i dati utente. */
export interface User {
    nickname: string;
    email: string;
    role: string;
}

/** Struttura del contesto: user + metodi di login/logout. */
interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<void>; // Make it async
    logout: () => void;
}

/**
 * 1. Creiamo il contesto con valori di default (che verranno poi sovrascritti).
 */
const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: async () => {},
    logout: () => {},
});

/**
 * 2. Il provider che avvolge l’applicazione e fornisce lo stato utente.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser ] = useState<User | null>(null);

    const login = async (email: string, password: string) => {
        if (!email || !password) return;

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email, password }), // Send email and password
            });

            if (response.ok) {
                const data = await response.json();
                const loggedIn:User = {
                    nickname: data.nickname,
                    email: data.email,
                    role: data.role,

                };
                setUser (loggedIn );
            } else {
                const errorMessage = await response.text();
                console.error("Login failed:", errorMessage);
                // Handle login failure (e.g., show a message to the user)
            }
        } catch (error) {
            console.error("Error during login:", error);
            // Handle network error
        }
    };

    /** Funzione di logout */
    const logout = () => {
        setUser (null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/** Comodo hook per consumare il contesto. */
export const useAuth = () => useContext(AuthContext);