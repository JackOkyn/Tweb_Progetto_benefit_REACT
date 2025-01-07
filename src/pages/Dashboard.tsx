import React, { useState, useEffect } from "react";

interface DashboardData {
    temperature: number;
    co2Impact: number;
    communityActions: number;
}

const Dashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null);

    // Simulazione del fetch dal server
    useEffect(() => {
        // Simulazione dei dati ricevuti dal server
        const fetchData = async () => {
            // Questo verrà sostituito da una chiamata reale al server
            const response = {
                temperature: 12.5,
                co2Impact: 7.8,
                communityActions: 15,
            };
            setData(response);
        };
        fetchData();
    }, []);

    return (
        <div>
            {/* Mappa */}
            <section className="mb-6">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-600 mb-4">
                    Visualizza i dati principali e lo stato delle attività della community.
                </p>
                <div className="h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                    <img
                        src="/src/assets/mappa.png"
                        alt="Mappa"
                        className="object-cover w-full h-full"
                    />
                </div>
            </section>

            {/* Griglia di card */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Card Temperature */}
                <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h2 className="text-lg font-semibold text-blue-700">Temperature Data</h2>
                    <p className="text-gray-600 mt-2">
                        Valore:{" "}
                        <span className="text-black font-bold">
              {data ? data.temperature.toFixed(1) : "Caricamento..."}
            </span>
                    </p>
                </div>

                {/* Card CO2 Impact */}
                <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h2 className="text-lg font-semibold text-green-700">CO2 Impact</h2>
                    <p className="text-gray-600 mt-2">
                        Valore:{" "}
                        <span className="text-black font-bold">
              {data ? data.co2Impact.toFixed(1) : "Caricamento..."}
            </span>
                    </p>
                </div>

                {/* Card Community Actions */}
                <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h2 className="text-lg font-semibold text-purple-700">Community Actions</h2>
                    <p className="text-gray-600 mt-2">
                        Valore:{" "}
                        <span className="text-black font-bold">
              {data ? data.communityActions : "Caricamento..."}
            </span>
                    </p>
                </div>
            </section>

            {/* Grafici */}
            <section className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Analisi dei dati</h2>
                <p className="text-gray-600">Qui puoi aggiungere un grafico per rappresentare i dati.</p>
                {/* Placeholder per grafico */}
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Grafico in arrivo...</span>
                </div>
            </section>

            {/* Lista di attività recenti */}
            <section className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Attività recenti</h2>
                <ul className="space-y-4">
                    <li className="flex items-start">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">A</div>
                        <div className="ml-4">
                            <p className="text-gray-800 font-medium">Hai completato un'azione nella community.</p>
                            <p className="text-gray-500 text-sm">2 ore fa</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">B</div>
                        <div className="ml-4">
                            <p className="text-gray-800 font-medium">Hai aggiunto nuovi dati sulla temperatura.</p>
                            <p className="text-gray-500 text-sm">5 ore fa</p>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;
