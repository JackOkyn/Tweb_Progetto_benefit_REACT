import React, { useState } from "react";
import { FaHome, FaProjectDiagram, FaTasks, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const pages = [
        { name: "Dashboard", icon: <FaHome />, path: "/" },
        { name: "Project", icon: <FaProjectDiagram />, path: "/project" },
        { name: "MyActivity", icon: <FaTasks />, path: "/my-activity" },
        { name: "Education", icon: <FaGraduationCap />, path: "/education" },
    ];

    return (
        <div
            className={`bg-blue-900 text-white px-4 transition-all duration-300 ${
                isOpen ? "w-48" : "w-16"
            } h-full`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="flex flex-col items-center md:items-start space-y-6 mt-8">
                {pages.map((page, index) => (
                    <Link
                        to={page.path}
                        key={index}
                        className="flex items-center space-x-4 p-2 w-full hover:bg-blue-700 rounded-lg transition duration-300"
                    >
                        <div className="text-xl">{page.icon}</div>
                        {isOpen && <span className="text-sm font-medium">{page.name}</span>}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
