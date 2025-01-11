import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componenti
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Pagine
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import MyActivity from "./pages/MyActivity";
import Education from "./pages/Education";

// Context
import { AuthProvider } from "./context/AuthContext";
import { ProjectsProvider } from "./context/ProjectsContext";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <ProjectsProvider>
                <Router>
                    <div className="h-screen w-screen flex flex-col">
                        {/* Navbar */}
                        <Navbar />

                        {/* Layout con Sidebar e contenuto */}
                        <div className="flex flex-1">
                            <Sidebar />

                            <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/project" element={<Project />} />
                                    <Route path="/my-activity" element={<MyActivity />} />
                                    <Route path="/education" element={<Education />} />
                                </Routes>
                            </main>
                        </div>
                    </div>
                </Router>
            </ProjectsProvider>
        </AuthProvider>
    );
};

export default App;
