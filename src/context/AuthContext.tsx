import React, { createContext, useContext, useState, useEffect } from 'react';

/** Dati utente ricevuti dal back-end */
export interface UserData {
    id: number;
    username: string;
    email: string;
    role: string;
}

/** Struttura del context */
interface AuthContextProps {
    user: UserData | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);

    /** Ripristina sessione al montaggio */
    useEffect(() => {
        (async () => {

            try {
                const res = await fetch('/session/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (res.ok) {
                    const { username } = (await res.json()) as { username: string };
                    const usersRes = await fetch('/users', {
                        method: 'GET',
                        credentials: 'include',
                    });
                    if (usersRes.ok) {
                        const allUsers = (await usersRes.json()) as Array<
                            UserData & { role: { id: number; name: string } }
                        >;
                        const found = allUsers.find(u => u.username === username);
                        if (found) {
                            setUser({
                                id: found.id,
                                username: found.username,
                                email: found.email,
                                role: found.role.name,
                            });
                        }
                    }
                }
            } catch (error) {
                console.error('Errore ripristino sessione:', error);
            }
        })();
    }, []);

    /** Effettua login */
    const login = async (username: string, password: string) => {
        const query = new URLSearchParams({ username, password }).toString();
        const res = await fetch(`/session/login?${query}`, {
            method: 'GET',
            credentials: 'include',
        });
        if (res.ok) {
            const { username: sessionUser } = (await res.json()) as { username: string };
            const usersRes = await fetch('/users', {
                method: 'GET',
                credentials: 'include',
            });
            if (!usersRes.ok) {
                throw new Error('Impossibile recuperare dettagli utente');
            }
            const allUsers = (await usersRes.json()) as Array<
                UserData & { role: { id: number; name: string } }
            >;
            const found = allUsers.find(u => u.username === sessionUser);
            if (!found) {
                throw new Error('Utente non trovato dopo login');
            }
            setUser({
                id: found.id,
                username: found.username,
                email: found.email,
                role: found.role.name,
            });
        } else if (res.status === 401) {
            throw new Error('Credenziali non valide');
        } else {
            throw new Error(`Errore login: ${res.status}`);
        }
    };

    /** Effettua logout */
    const logout = async () => {
        try {
            await fetch('/session/logout', {
                method: 'GET',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Errore logout:', error);
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/** Hook per accedere al context */
export const useAuth = () => useContext(AuthContext);
