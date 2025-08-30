import { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation, Outlet, NavLink } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { Add } from '../../features/slice/fetchVideos.slice';

// Types
interface UserType {
  avatar: string;
  coverImage: string;
  fullName: string;
  username: string;
  description: string;
}

const DisplayInfo = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const [userVal, setUserVal] = useState<UserType | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const handleCurrentUser = async () => {
      try {
        const response = await axios.get<{ data: UserType }>(
          `https://backend-youtube-zba1.onrender.com/api/v1/users/current-user`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true
          }
        );
        setUserVal(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    handleCurrentUser();
  }, []);

  return (
    <div className='min-h-screen w-full pt-20'>
      {userVal ? (
        <div className='mt-1 pb-2'>
          {/* Cover Image */}
          <div style={{ width: '100%', height: 200, marginBottom: 5 }}>
            <img
              src={userVal.coverImage}
              alt="Cover"
              className="w-11/12 h-full rounded-lg mx-auto object-cover"
            />
          </div>

          {/* Avatar & User Info */}
          <div className='flex flex-row items-start pl-32 justify-start bg-white rounded-xl w-full'>
            <div className="pt-3 pr-5">
              <img
                src={userVal.avatar}
                alt="Avatar"
                className="w-48 h-64 rounded-full object-cover"
              />
            </div>

            <div className='bg-white rounded-xl p-6 w-full max-w-md text-start'>
              <h1 className='text-4xl font-extrabold'>{userVal.fullName}</h1>
              <h1 className='text-gray-600 italic'>{userVal.username}</h1>
              <h1 className='text-gray-600 italic'>{userVal.description}</h1>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="border-b border-gray-300">
            <ul className="flex flex-row w-2/5 justify-evenly list-none ml-14 py-4">
              {[
                { to: "content", label: "Home" },
                { to: "video", label: "Upload Video" },
                { to: "getVideo", label: "Videos" },
                { to: "watchHistory", label: "Watch History" },
                { to: "live", label: "Live" },
              ].map(({ to, label }) => (
                <li className="h-12" key={to}>
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
      ) : (
        <h1 className="text-center mt-10 text-xl text-gray-600">
          User details not fetched successfully
        </h1>
      )}
    </div>
  );
};

export default DisplayInfo;
