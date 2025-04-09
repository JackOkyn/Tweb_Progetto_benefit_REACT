import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthButtons: React.FC = () => {
    const { user, login, logout } = useAuth();
    console.log("User  data:", user);

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signUpNickname, setSignUpNickname] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [error, setError] = useState(""); // Stato per gestire gli errori

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Resetta l'errore
        try {
            await login(loginEmail, loginPassword);
            setShowLoginForm(false);
            setLoginEmail("");
            setLoginPassword("");
        } catch (err) {
            setError("Login fallito. Controlla le tue credenziali."); // Gestione errore
        }
    };

    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Resetta l'errore
        try {
            // Implementa la logica di registrazione qui
            // await signUp(signUpNickname, signUpEmail, signUpPassword);
            setShowSignUpForm(false);
            setSignUpNickname("");
            setSignUpEmail("");
            setSignUpPassword("");
        } catch (err) {
            setError("Registrazione fallita. Controlla i tuoi dati."); // Gestione errore
        }
    };

    const handleLogout = () => {
        logout();
        setShowProfileDropdown(false);
    };

    if (user) {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="bg-transparent text-white font-semibold px-3 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                    Ciao, <strong>{user.name}</strong> ({user.roles && user.roles.length > 0 ? user.roles.map(role => role.name).join(", ") : "Nessun ruolo"})
                </button>
                {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 bg-white text-black p-2 rounded-md shadow-md">
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={() => {
                    setShowSignUpForm(false);
                    setShowLoginForm(true);
                }}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition duration-300"
            >
                Login
            </button>

            <button
                onClick={() => {
                    setShowLoginForm(false);
                    setShowSignUpForm(true);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-blue-700 px-4 py-2 rounded-lg transition duration-300"
            >
                Register
            </button>

            {/* Form di Login */}
            {showLoginForm && (
                <div className="absolute top-16 right-4 bg-white text-black p-4 rounded-md shadow-md z-30">
                    <h2 className="font-bold mb-2">Login</h2>
                    {error && <p className="text-red-500">{error}</p>} {/* Mostra messaggio di errore */}
                    <form onSubmit={handleLoginSubmit}>
                        <div className="mb-2">
                            <label className="block font-medium">Email</label>
                            <input
                                type="email"
                                className="border border-black bg-white rounded w-full px-2 py-1"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block font-medium">Password</label>
                            <input
                                type="password"
                                className="border border-black bg-white rounded w-full px-2 py-1"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition"
                        >
                            Invia
                        </button>
                        <button
                            type="button"
                            className="ml-2 bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 transition"
                            onClick={() => setShowLoginForm(false)}
                        >
                            Annulla
                        </button>
                    </form>
                </div>
            )}

            {/* Form di Registrazione */}
            {showSignUpForm && (
                <div className="absolute top-16 right-4 bg-white text-black p-4 rounded-md shadow-md z-30">
                    <h2 className="font-bold mb-2">Registrati</h2>
                    {error && <p className="text-red-500">{error}</p>} {/* Mostra messaggio di errore */}
                    <form onSubmit={handleSignUpSubmit}>
                        <div className="mb-2">
                            <label className="block font-medium">Nickname</label>
                            <input
                                type="text"
                                className="border rounded w-full px-2 py-1"
                                value={signUpNickname}
                                onChange={(e) => setSignUpNickname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block font-medium">Email</label>
                            <input
                                type="email"
                                className="border rounded w-full px-2 py-1"
                                value={signUpEmail}
                                onChange={(e) => setSignUpEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block font-medium">Password</label>
                            <input
                                type="password"
                                className="border rounded w-full px-2 py-1"
                                value={signUpPassword}
                                onChange={(e) => setSignUpPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition"
                        >
                            Invia
                        </button>
                        <button
                            type="button"
                            className="ml-2 bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 transition"
                            onClick={() => setShowSignUpForm(false)}
                        >
                            Annulla
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AuthButtons;