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
  console.log("username", username);
  const { theme } = useTheme();
  console.log("isCurrentUser", isCurrentUser);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let response;

        if (username) {
          console.log("username", username);
          // POST request for visiting another user's channel
          response = await axios.post<{ data: UserType }>(
            `http://localhost:8001/api/v1/users/visitChannel/${username}`,
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
            "http://localhost:8001/api/v1/users/current-user",
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
    <div className='min-h-screen w-full pt-2 px-2 sm:px-4 lg:px-6' style={{ backgroundColor: theme.background }}>
      <div className='pb-4'>
        {/* Cover Image */}
        <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 mb-3 sm:mb-5">
          <img
            src={userVal.coverImage}
            alt="Cover"
            className="w-full h-full rounded-lg object-cover shadow-lg"
          />
        </div>

        {/* Avatar & User Info - Responsive Layout */}
        <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4 lg:px-8 mb-4 sm:mb-6'>
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={userVal.avatar}
              alt="Avatar"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          {/* User Info */}
          <div className='flex-1 text-center sm:text-left pt-0 sm:pt-4 lg:pt-6'>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-1 sm:mb-2 break-words'>
              {userVal.fullName}
            </h1>
            <h2 className='text-sm sm:text-base lg:text-lg text-gray-600 italic mb-2'>
              @{userVal.username}
            </h2>
            {/* Uncomment if you want to show description */}
            {/* <p className='text-xs sm:text-sm lg:text-base text-gray-600 max-w-lg'>
              {userVal.description}
            </p> */}
          </div>
        </div>

        {/* Navigation Tabs - Responsive */}
        <nav className="border-b border-gray-300 mb-4">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex flex-row justify-center lg:justify-start lg:ml-8 xl:ml-16 gap-6 lg:gap-8 xl:gap-10 py-2">
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
                    `px-2 py-1 text-sm lg:text-base font-bold transition-colors duration-200 ${isActive
                      ? 'border-b-2 border-gray-500 text-black'
                      : 'text-gray-700 hover:text-black'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Navigation - Scrollable */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <ul className="flex flex-row gap-4 py-2 px-4 min-w-max">
              {(isCurrentUser ? [
                { to: "home", label: "Home" },
                { to: "uploadVideo", label: "Upload" },
                { to: "getVideo", label: "Videos" },
                { to: "live", label: "Live" },
                { to: "watchHistory", label: "History" },
              ] : [
                { to: "home", label: "Home" },
                { to: "getVideo", label: "Videos" },
                { to: "live", label: "Live" },
              ]).map(({ to, label }) => (
                <li key={to} className="flex-shrink-0">
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `px-3 py-1 text-sm font-bold whitespace-nowrap transition-colors duration-200 ${isActive
                        ? 'border-b-2 border-gray-500 text-black'
                        : 'text-gray-700 hover:text-black'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Content Area */}
        <div className="px-2 sm:px-4 lg:px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DisplayInfo;
