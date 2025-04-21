import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';
import { IoSettings } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  sidebarData: boolean;
}

const routes = [
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
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarData }) => {
  const collapsedWidth = 'w-[4.5rem]'; // 72px
  const expandedWidth = 'w-[12.5rem]'; // 200px

  const [sidebarClass, setSidebarClass] = useState(collapsedWidth);

  useEffect(() => {
    setSidebarClass(sidebarData ? expandedWidth : collapsedWidth);
  }, [sidebarData]);

  return (
    <div className="fixed top-0 left-0 h-screen  ">
      <motion.div
        animate={{ width: sidebarData ? expandedWidth : collapsedWidth }}
        className={`h-full bg-black text-white shadow-lg overflow-hidden `}
      >
        <div className="flex flex-col items-start mt-30 p-4 gap-4 ">
          {routes.map((route) => (
            <NavLink
              to={route.path}
              key={route.name}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-2 w-full rounded-md transition-colors duration-200 ${
                  isActive ? 'bg-gray-700' : 'hover:bg-gray-800'
                }`
              }
            >
              <div className="text-xl">{route.icon}</div>
              {sidebarData && (
                <span className="text-sm font-medium">{route.name}</span>
              )}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
