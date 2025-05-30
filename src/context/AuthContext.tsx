import React, { createContext, useContext, useState } from "react";

/** Definiamo i possibili ruoli dell’utente. */
export type UserRole = "admin" | "community";

/** Tipo che descrive i dati utente. */
export interface Role {
    name: string;
}
export interface User {
    username: string;
    email: string;
    name?: string;
    roles: Role[];
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

        //fetchAPI per il login AuthController
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ id: 0,
                    username: "",
                    email: email,
                    password: password,
                    roles: [],
                    projects: []}), // Send email and password
            });

            if (response.ok) {
                const data = await response.json();
                //salvo il token
                localStorage.setItem("jwtToken", data.token);
                console.log("🟢 Login data:", data); // <-- DEBUG!

                // CHECK: contiene un token?
                if (data.token) {
                    localStorage.setItem("jwtToken", data.token); // 👈 SALVA IL TOKEN
                } else {
                    console.warn("⚠️ Nessun token trovato nella risposta!");
                }
                const loggedIn: User = {
                    username: data.username,
                    email: data.email,
                    roles: data.roles || [],
                    name: data.name,
                };
                setUser(loggedIn);
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
        //rimuovo il token una volta che ho eseguito il logout
        localStorage.removeItem("jwtToken");
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