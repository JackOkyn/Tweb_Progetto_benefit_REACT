// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Context
import { AuthProvider } from "./context/AuthContext";
import { ProjectsProvider } from "./context/ProjectsContext";

// Componenti e pagine
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import MyActivity from "./pages/MyActivity";
import EducationPage from "./pages/EducationPage.tsx";

import AboutUs from "./pages/AboutUs";
import 'aos/dist/aos.css';


const App: React.FC = () => {
    return (
        <AuthProvider>
            <ProjectsProvider>
                <Router>
                    <div className="h-screen w-screen flex flex-col">
                        <Navbar />
                        <div className="flex flex-1 ">
                            <Sidebar />
                            <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/project" element={<Project />} />
                                    <Route path="/my-activity" element={<MyActivity />} />
                                    <Route path="/education" element={<EducationPage />} />
                                    <Route path="/aboutus" element={<AboutUs />} />
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
