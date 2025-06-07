import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/themeContext';
// import { NotificationType } from '@/types/types';

const NotificationPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Notification Settings</h1>
            <p className="text-lg text-gray-600">This page is under construction.</p>
            <p className="text-sm text-gray-500 mt-2">Please check back later for updates.</p>

            <p className="text-sm text-gray-500 mt-2">
                If you have any questions or need assistance, please contact support.
                
            </p>
        </div>
    );
}

export default NotificationPage;