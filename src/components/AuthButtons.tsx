import React, { useState } from "react";

interface UserData {
    nickname: string;
    email: string;
    password: string;
}

const AuthButtons: React.FC = () => {
    // Stato per determinare se l'utente è loggato e con quali dati
    const [user, setUser] = useState<UserData | null>(null);

    // Stati per controllare la visibilità dei form
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    // Stati per controllare la visibilità del menu a tendina (profilo)
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    // Stati per gestire i campi del form di login
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Stati per gestire i campi del form di registrazione
    const [signUpNickname, setSignUpNickname] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");

    // Funzione per simulare login
    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Qui in futuro farai la chiamata al server Spring

        // Simuliamo un utente con dati fittizi
        const fakeUser: UserData = {
            nickname: "Mario",
            email: loginEmail,
            password: loginPassword,
        };

        setUser(fakeUser);
        // Nascondo il form e pulisco i campi
        setShowLoginForm(false);
        setLoginEmail("");
        setLoginPassword("");
    };

    // Funzione per simulare registrazione
    const handleSignUpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Qui in futuro farai la chiamata al server Spring

        // Simuliamo un utente appena registrato
        const fakeUser: UserData = {
            nickname: signUpNickname,
            email: signUpEmail,
            password: signUpPassword,
        };

        setUser(fakeUser);
        // Nascondo il form e pulisco i campi
        setShowSignUpForm(false);
        setSignUpNickname("");
        setSignUpEmail("");
        setSignUpPassword("");
    };

    // Funzione di logout
    const handleLogout = () => {
        // In futuro rimuoveresti anche il token di sessione/JWT
        setUser(null);
        setShowProfileDropdown(false);
    };

    // Se l'utente è loggato, mostro il nickname con un menu a tendina
    if (user) {
        return (
            <div className="relative">
                <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="bg-transparent text-white font-semibold px-3 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                    Ciao, <strong>{user.nickname}</strong>
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

    // Se l'utente NON è loggato, mostro i pulsanti Login/Register (e i modali dei form)
    return (
        <div className="flex items-center space-x-4">
            {/* Pulsanti di login/sign up */}
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

            {/* Form di login */}
            {showLoginForm && (
                <div className="absolute top-16 right-4 bg-white text-black p-4 rounded-md shadow-md">
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

            {/* Form di registrazione */}
            {showSignUpForm && (
                <div className="absolute top-16 right-4 bg-white text-black p-4 rounded-md shadow-md">
                    <h2 className="font-bold mb-2">Registrati</h2>
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
