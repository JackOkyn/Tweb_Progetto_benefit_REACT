import React from "react";
import logo from "../assets/icon.png";
import AuthButtons from "./AuthButtons"; // <- Importa il nuovo componente

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-900 text-white flex items-center justify-between px-4 py-3 shadow-md relative">
            {/* Sezione sinistra con logo e titolo */}
            <div className="flex items-center space-x-2">
                <img src={logo} alt="IceKeeper Logo" className="h-8 w-8" />
                <h1 className="text-xl font-bold">IceKeeper</h1>
            </div>

            {/* Sezione per il componente AuthButtons che gestisce login/sign up */}
            <AuthButtons />
        </nav>
    );
};

export default Navbar;
