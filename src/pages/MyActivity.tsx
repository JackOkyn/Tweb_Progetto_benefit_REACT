// src/pages/MyActivity.tsx
import React from "react";
import WindowsMyActivity from "../components/WindowsMyActivity";

const MyActivity: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4 text-black">I miei progetti</h1>
            <WindowsMyActivity />
        </div>
    );
};

export default MyActivity;
