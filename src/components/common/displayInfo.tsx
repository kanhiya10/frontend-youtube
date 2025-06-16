import { useState, useEffect } from 'react';
import axios from "axios";
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';

interface UserType {
  avatar: string;
  coverImage: string;
  fullName: string;
  username: string;
  description: string;
}

interface DisplayInfoProps {
  username?: string;
}

const DisplayInfo = ({ username }: DisplayInfoProps) => {
  const [userVal, setUserVal] = useState<UserType | null>(null);
  const isCurrentUser = !username;
  console.log("username",username);
  const { theme } = useTheme();
console.log("isCurrentUser",isCurrentUser);
  useEffect(() => {
    const fetchUser = async () => {
        try {
          let response;
      
          if (username) {
            console.log("username",username);
            // POST request for visiting another user's channel
            response = await axios.post<{ data: UserType }>(
              `${import.meta.env.VITE_API_URL}/api/v1/users/visitChannel/${username}`,
              {}, // send an empty body
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
              }
            );
          } else {
            console.log("current user");
            // GET request for current user
            response = await axios.get<{ data: UserType }>(
              '${import.meta.env.VITE_API_URL}/api/v1/users/current-user',
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
              }
            );
          }
      
          console.log("response", response);
          setUserVal(response.data.data);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
          } else {
            console.error("Unexpected error:", error);
          }
        }
      };
      

    fetchUser();
  }, [username]);

  if (!userVal) {
    return (
      <h1 className="text-center mt-10 text-xl text-gray-600">
        User details not fetched successfully
      </h1>
    );
  }

  return (
    <div className='h-auto w-full pt-2' style={{ backgroundColor: theme.background }}>
      <div className='pb-2'>
        {/* Cover Image */}
        <div className="w-full h-[180px] mb-5">
          <img
            src={userVal.coverImage}
            alt="Cover"
            className="w-11/12 h-full rounded-lg mx-auto object-cover"
          />
        </div>

        {/* Avatar & User Info */}
        <div className='flex flex-row items-start pl-32 justify-start  rounded-xl w-full'>
          <div className="py-3 pr-5">
            <img
              src={userVal.avatar}
              alt="Avatar"
              className="w-44 h-56 rounded-full object-cover"
            />
          </div>
          <div className='rounded-xl p-6 w-full max-w-md text-start'>
            <h1 className='text-4xl font-extrabold'>{userVal.fullName}</h1>
            <h1 className='text-gray-600 italic'>{userVal.username}</h1>
            {/* <h1 className='text-gray-600 italic'>{userVal.description}</h1> */}
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="border-b border-gray-300 ml-16">
          <ul className="flex flex-row w-2/5 justify-evenly list-none ml-14 py-1">
            {(isCurrentUser ? [
              { to: "home", label: "Home" },
              { to: "uploadVideo", label: "Upload Video" },
              { to: "getVideo", label: "Videos" },
              { to: "live", label: "Live" },
              { to: "watchHistory", label: "Watch History" },
            ] : [
              { to: "home", label: "Home" },
              
              { to: "getVideo", label: "Videos" },
              
              { to: "live", label: "Live" },
            ]).map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? 'border-b-2 border-gray-500 text-black font-bold'
                      : 'text-black font-bold'
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Outlet />
      </div>
    </div>
  );
};

export default DisplayInfo;
