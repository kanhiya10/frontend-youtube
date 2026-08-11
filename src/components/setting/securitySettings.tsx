import React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from "../../context/themeContext";

const SecuritySettings = () => {
    const { theme } = useTheme();

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100" style={{ backgroundColor: theme.background }}>
            <h1 className="text-2xl font-bold mb-4">Security Settings</h1>

        </div>
    )
}
    export default SecuritySettings;