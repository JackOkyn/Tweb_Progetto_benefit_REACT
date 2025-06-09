import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import TemperatureCard from '../components/TemperatureCard';
import CO2ImpactCard from '../components/CO2ImpactCard';
import CommunityActionsCard from '../components/CommunityActionsCard';

const Dashboard: React.FC = () => {
    // Stato per i dati selezionati dalla mappa
    const [selectedData, setSelectedData] = useState<{ temperature: number; co2Impact: number; communityActions: number } | null>(null);

    // Dati fittizi dei punti sulla mappa
    const locations = [
        {
            id: 1,
            position: [45.843862, 6.854017] as [number, number],
            name: "Ghiacciaio Monte Bianco",
            data: { temperature: 3.5, co2Impact: 60.4, communityActions: 75 }
        },
        {
            id: 2,
            position: [45.921256, 7.861097] as [number, number],
            name: "Ghiacciaio Zermat",
            data: { temperature: 1.0, co2Impact: 150.3, communityActions: 210 }
        },
        {
            id: 3,
            position: [46.837567, 10.757295] as [number, number],
            name: "Kaunertal",
            data: { temperature: -1.2, co2Impact: 180.8, communityActions: 20 }
        },
    ];

    // Funzione per gestire il clic sui marker
    const handleMarkerClick = (data: { temperature: number; co2Impact: number; communityActions: number }) => {
        setSelectedData(data);
    };

    return (
        <div className="dashboard-container">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>


            {/* Sezione delle 3 card  */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 m-8 ">
                <TemperatureCard temperature={selectedData ? selectedData.temperature : null} />
                <CO2ImpactCard co2Impact={selectedData ? selectedData.co2Impact : null} />
                <CommunityActionsCard communityActions={selectedData ? selectedData.communityActions : null} />
            </section>


            {/* Mappa interattiva */}
            <MapComponent locations={locations} onMarkerClick={handleMarkerClick} />



        </div>
    );
};

export default Dashboard;
