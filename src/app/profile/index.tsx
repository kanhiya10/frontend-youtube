import React from 'react';
import DisplayInfo from '../../components/common/displayInfo';
import { useTheme } from '../../context/themeContext';

const ProfileIndex = () => {
  const { theme } = useTheme();
  return (
    <div style={{ backgroundColor: theme.background }} className="min-h-screen">
        <DisplayInfo />
    </div>
  );
};

export default ProfileIndex;

