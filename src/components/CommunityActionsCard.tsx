import React from 'react';

interface CommunityActionsCardProps {
    communityActions: number | null;
}

const CommunityActionsCard: React.FC<CommunityActionsCardProps> = ({ communityActions }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold text-purple-700">Community Actions</h2>
            <p className="text-gray-600 mt-2">
                Valore:{" "}
                <span className="text-black font-bold">
                    {communityActions !== null ? communityActions : "Caricamento..."}
                </span>
            </p>
        </div>
    );
};

export default CommunityActionsCard;
