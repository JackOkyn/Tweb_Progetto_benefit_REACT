
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import MyActivity from "./pages/MyActivity";
import Education from "./pages/Education";

/* Import del tuo AuthProvider */
import { AuthProvider } from "./context/AuthContext";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="h-screen w-screen flex flex-col">
                    {/* Navbar fissa */}
                    <Navbar />

                    <div className="flex flex-1">
                        {/* Sidebar fissa */}
                        <Sidebar />

                        {/* Contenuto dinamico */}
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
        </AuthProvider>
    );
};

export default App;
