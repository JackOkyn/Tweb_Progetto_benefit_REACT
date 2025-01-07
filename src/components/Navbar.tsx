import React from "react";
import logo from "../assets/icon.png";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-900 text-white flex items-center justify-between px-4 py-3 shadow-md">
            {/* Sezione sinistra con logo e titolo */}
            <div className="flex items-center space-x-2">
                <img src={logo} alt="IceKeeper Logo" className="h-8 w-8" />
                <h1 className="text-xl font-bold">IceKeeper</h1>
            </div>

            {/* Sezione destra con i pulsanti */}
            <div className="flex items-center space-x-4">
                <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition duration-300">
                    Login
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-blue-700 px-4 py-2 rounded-lg transition duration-300">
                    Register
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
