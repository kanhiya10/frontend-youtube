import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SlLogin, SlLogout } from 'react-icons/sl';
import { RiUser3Line, RiMenu2Fill, RiMenu3Fill } from 'react-icons/ri';
import { resetInfo } from '../../features/slice/fetchUser.slice';
import Search from './serach';
import { useTheme } from '../../context/themeContext';

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
  const dispatch = useDispatch();
  const { theme, toggleTheme, mode } = useTheme();

  const toggle = () => {
    handleSideBar();
    setIsOpen(!isOpen);
  };

  

  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/v1/users/logout`,
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
    <header className="flex justify-between items-center h-[10%] w-full fixed top-0 left-0 z-50 px-4 md:px-8 "
    style={{ backgroundColor: theme.background }}>

      <div className="flex items-center gap-10 md:gap-40">
        {isOpen ? (
          <RiMenu3Fill size={40} color="#8A9A5B" onClick={toggle} className="cursor-pointer" />
        ) : (
          <RiMenu2Fill size={40} color="#8A9A5B" onClick={toggle} className="cursor-pointer" />
        )}
       <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
  <h1 className="text-[#E0B0FF] font-light text-xl">Video</h1>
  <h1 className="text-[#C4C3D0] text-xl ml-1">Tube</h1>
</div>

      </div>

      <div className="hidden sm:block">
        <Search />
      </div>

      <div className="flex items-center gap-8 md:gap-16 pr-2 md:pr-8">
      <IconButton onClick={() => navigate('/auth/index')} Icon={<SlLogin size={28} color="#8A9A5B" />} label="Login" />
<IconButton onClick={() => navigate('/profile/index')} Icon={<RiUser3Line size={28} color="#8A9A5B" />} label="Profile" />
<IconButton onClick={handleLogout} Icon={<SlLogout size={28} color="#8A9A5B" />} label="Logout" />

      </div>
    </header>
  );
};

export default Header;
