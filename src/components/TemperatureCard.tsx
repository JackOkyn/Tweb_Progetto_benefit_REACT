import React from 'react';

interface TemperatureCardProps {
    temperature: number | null;
}

const TemperatureCard: React.FC<TemperatureCardProps> = ({ temperature }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold text-blue-700">Temperature Data</h2>
            <p className="text-gray-600 mt-2">
                Valore:{" "}
                <span className="text-black font-bold">
                    {temperature !== null ? temperature.toFixed(1) : "Caricamento..."}
                </span>
            </p>
        </div>
    );
};

export default TemperatureCard;
