import React from 'react';

interface CO2ImpactCardProps {
    co2Impact: number | null;
}

const CO2ImpactCard: React.FC<CO2ImpactCardProps> = ({ co2Impact }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold text-green-700">CO2 Impact</h2>
            <p className="text-gray-600 mt-2">
                Valore:{" "}
                <span className="text-black font-bold">
                    {co2Impact !== null ? co2Impact.toFixed(1) : "Caricamento..."}
                </span>
            </p>
        </div>
    );
};

export default CO2ImpactCard;
