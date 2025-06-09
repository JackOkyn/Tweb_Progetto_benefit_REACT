import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * Component che mostra i pulsanti Login/SignUp, invece se l’utente è loggato il menu a tendina con Logout.
 */
const AuthButtons: React.FC = () => {
    // Preleviamo user e le funzioni dal nostro AuthContext
    const { user, login, signUp, logout } = useAuth();

    // Stati per controllare i form
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    // Stati per aprire il menu a tendina profilo
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    // Stati per i campi dei form
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [signUpNickname, setSignUpNickname] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    /** Gestione submit login (usa la funzione del context) */
    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(loginEmail, loginPassword);

        // Puliamo i campi e chiudiamo il form
        setShowLoginForm(false);
        setLoginEmail("");
        setLoginPassword("");
    };

    /** Gestione submit signUp (usa la funzione del context) */
    const handleSignUpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signUp(signUpNickname, signUpEmail, signUpPassword);

        // Puliamo i campi e chiudiamo il form
        setShowSignUpForm(false);
        setSignUpNickname("");
        setSignUpEmail("");
        setSignUpPassword("");
    };

    /** Gestione logout */
    const handleLogout = () => {
        logout();
        setShowProfileDropdown(false);
    };

    // Se l'utente è loggato, mostriamo il nickname
    if (user) {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="bg-transparent text-white font-semibold px-3 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                    Ciao, <strong>{user.nickname}</strong> ({user.role})
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

    // Altrimenti, mostriamo i pulsanti "Login" e "Register"
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
                    <form onSubmit={handleLoginSubmit}>
                        <div className="mb-2">
                            <label className="block font-medium">Email</label>
                            <input
                                type="email"
                                className="border rounded w-full px-2 py-1"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
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
                <>
                    {/* Backdrop scuro per coprire tutto lo schermo */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
                        onClick={() => setShowSignUpForm(false)}
                    />

                    {/* Form Container con posizionamento fisso e z-index molto alto */}
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-6 rounded-lg shadow-2xl z-[9999] w-full max-w-md">
                        <h2 className="font-bold mb-4 text-xl">Registrati</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium mb-1">Nickname</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={signUpNickname}
                                    onChange={(e) => setSignUpNickname(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={signUpEmail}
                                    onChange={(e) => setSignUpEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={signUpPassword}
                                    onChange={(e) => setSignUpPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3 pt-2">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                                    onClick={() => setShowSignUpForm(false)}
                                >
                                    Annulla
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSignUpSubmit}
                                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                                >
                                    Invia
                                </button>
                            </div>
                        </div>

                        {/* Pulsante X per chiudere */}
                        <button
                            type="button"
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold leading-none"
                            onClick={() => setShowSignUpForm(false)}
                            aria-label="Chiudi"
                        >
                            ×
                        </button>
                    </div>
                </>
            )}
        </div>

    );
};

export default AuthButtons;
