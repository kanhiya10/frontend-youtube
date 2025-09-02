import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { SlLogin, SlLogout } from 'react-icons/sl';
import { RiUser3Line, RiMenu2Fill, RiMenu3Fill } from 'react-icons/ri';
import { BsChatDotsFill } from 'react-icons/bs';
import { IoNotificationsOutline } from "react-icons/io5";
import { resetInfo } from '../../features/slice/fetchUser.slice';
import Search from './serach';
import { useTheme } from '../../context/themeContext';
import { fetchUnreadCount } from '../../features/slice/unreadCount.slice';
import { removeFcmToken } from '../../features/slice/notificationFcm.slice';
import { store } from '../../store';
import {useStyles} from '../../utils/styleImports';

interface HeaderProps {
  handleSideBar: () => void;
}

const IconButton = ({ onClick, Icon, label }: { onClick: () => void; Icon: React.ReactNode; label: string }) => (
  <button onClick={onClick} aria-label={label} className="hover:scale-105 transition">
    {Icon}
  </button>
);

const Header: React.FC<HeaderProps> = ({ handleSideBar }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { theme, toggleTheme, mode } = useTheme();
  const { containerStyle, logoVideoStyle, logoTubeStyle, notificationBadgeStyle } = useStyles();

  const toggle = () => {
    handleSideBar();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(fetchUnreadCount());
  }, []);

  const unreadCount = useSelector((state: RootState) => state.Unread.count);

  const handleLogout = async () => {
    try {
      const token = store.getState().notifications.token;

      // 1️⃣ If token exists, remove via thunk (this already calls backend + clears Redux/localStorage)
      if (token) {
        dispatch(removeFcmToken(token));
        console.log("🔴 FCM token removed:", token);
      }

      await axios.post(
        'https://backend-youtube-zba1.onrender.com/api/v1/users/logout',
        {},
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      console.log('LoggedOut');
      dispatch(resetInfo());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  return (
    <header 
      className="flex justify-between items-center h-[10%] w-full fixed top-0 left-0 z-50 px-4 md:px-8"
      style={containerStyle}
    >
      <div className="flex items-center gap-8 sm:gap-10 lg:gap-28">
        {isOpen ? (
          <RiMenu3Fill size={40} color={theme.btn} onClick={toggle} className="cursor-pointer" />
        ) : (
          <RiMenu2Fill size={40} color={theme.btn} onClick={toggle} className="cursor-pointer" />
        )}
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <h1 className="font-light text-xl" style={logoVideoStyle}>Video</h1>
          <h1 className="text-xl ml-1" style={logoTubeStyle}>Tube</h1>
        </div>
      </div>

      <div className="hidden sm:block">
        <Search />
      </div>

      <div className="flex items-center gap-8 lg:gap-16 pr-2">
        <IconButton 
          onClick={() => navigate('/auth/index')} 
          Icon={<SlLogin size={28} color={theme.btn} />} 
          label="Login" 
        />
        <IconButton 
          onClick={() => navigate('/profile/index')} 
          Icon={<RiUser3Line size={28} color={theme.btn} />} 
          label="Profile" 
        />
        <IconButton 
          onClick={handleLogout} 
          Icon={<SlLogout size={28} color={theme.btn} />} 
          label="Logout" 
        />
        <IconButton
          onClick={() => navigate('/chat')}
          Icon={
            <div className="relative">
              <BsChatDotsFill size={28} color={theme.btn} />
              {unreadCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 text-xs rounded-full px-1"
                  style={notificationBadgeStyle}
                >
                  {unreadCount}
                </span>
              )}
            </div>
          }
          label="Chat"
        />
        <IconButton 
          onClick={() => navigate('/notifications')} 
          Icon={<IoNotificationsOutline size={28} color={theme.btn} />} 
          label="Notifications" 
        />
      </div>
    </header>
  );
};

export default React.memo(Header);