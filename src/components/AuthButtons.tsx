import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

/** Component che mostra il form di login e il menu profilo/logout */
const AuthButtons: React.FC = () => {
    const { user, login, logout } = useAuth();

    // Toggle form e dropdown
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    // Campi login
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("");

    /** Submit login */
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await login(loginUsername, loginPassword);
            // reset form
            setLoginUsername("");
            setLoginPassword("");
            setShowLoginForm(false);
        } catch (err: any) {
            setError(err.message || "Errore durante il login");
        }
    };

    /** Logout */
    const handleLogout = async () => {
        await logout();
        setShowProfileDropdown(false);
    };

    // Se l'utente è loggato, mostriamo il profilo
    if (user) {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="bg-transparent text-white font-semibold px-3 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                    Ciao, <strong>{user.username}</strong> ({user.role})
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

    // Altrimenti, mostriamo il pulsante Login e il form
    return (
        <div className="relative">
            <button
                onClick={() => setShowLoginForm(true)}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition duration-300"
            >
                Login
            </button>

            {showLoginForm && (
                <div className="absolute top-16 right-4 bg-white text-black p-4 rounded-md shadow-md z-30 w-64">
                    <h2 className="font-bold mb-2">Login</h2>
                    {error && <p className="text-red-600 mb-2">{error}</p>}
                    <form onSubmit={handleLoginSubmit}>
                        <div className="mb-2">
                            <label className="block font-medium">Username</label>
                            <input
                                type="text"
                                className="border rounded w-full px-2 py-1"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block font-medium">Password</label>
                            <input
                                type="password"
                                className="border rounded w-full px-2 py-1"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 transition"
                                onClick={() => {
                                    setShowLoginForm(false);
                                    setError("");
                                }}
                            >
                                Annulla
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition"
                            >
                                Invia
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AuthButtons;
