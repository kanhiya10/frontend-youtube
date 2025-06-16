import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/themeContext';
// import { NotificationType } from '@/types/types';
import DisplayNotifications from '../../components/notification/displayNotifications';

const NotificationPage = () => {
    return (
       <DisplayNotifications/>
    );
}

export default NotificationPage;