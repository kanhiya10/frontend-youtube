import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import { IoSettings } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';
import { useStyles } from '../../utils/styleImports';

interface SidebarProps {
  sidebarData: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarData }) => {
  const collapsedWidth = 'w-[4.5rem]'; // 72px
  const expandedWidth = 'w-[12.5rem]'; // 200px

  // const [sidebarClass, setSidebarClass] = useState(collapsedWidth);
  const { theme, toggleTheme, mode } = useTheme();
  const {headingStyle,containerStyle}=useStyles();

  const routes = useMemo(() => [
    {
      path: '/',
      name: 'Home',
      icon: <FaHome />,
    },
    {
      path: '/watchHistory',
      name: 'Watch History',
      icon: <BsClockHistory />,
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: <IoSettings />,
    },
  ], []);



  const getNavLinkStyle = (isActive: boolean): React.CSSProperties => {
    if (isActive) {
      return {
        backgroundColor: mode === 'light' ? '#ea580c' : '#1d4ed8', // orange-700 for light, blue-700 for dark
        color: theme.text
      };
    } else {
      return {
        backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
        color: theme.textSecondary
      };
    }
  };


  return (
    <div className="fixed top-0 left-0 h-screen ">
      <motion.div
        animate={{ width: sidebarData ? expandedWidth : collapsedWidth }}
        className="h-full overflow-hidden"
        style={{...containerStyle,borderColor:theme.background,borderRightWidth: '2px'}}
      >
        <div className="flex flex-col items-start mt-30 p-4 gap-4">
          {routes.map((route) => (
            <NavLink
              to={route.path}
              key={route.name}
              className="flex items-center gap-4 px-3 py-2 w-full rounded-md transition-colors duration-200"
              style={({ isActive }) => getNavLinkStyle(isActive)}
            >
              <div className="text-xl">{route.icon}</div>
              {sidebarData && (
                <span className="text-sm font-medium" style={headingStyle}>
                  {route.name}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(Sidebar);