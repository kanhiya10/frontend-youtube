import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Add } from '../../features/slice/fetchVideos.slice';
import { RootState, AppDispatch } from '../../store'; // Adjust based on your path

interface UserType {
  _id: string;
  avatar: string;
  fullName: string;
  email: string;
  username: string;
}

const UserInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { Current } = location.state || {};

  const { info } = useSelector((state: RootState) => state.User);
  const [file, setFile] = useState<File | null>(null);
  const [userVal, setUserVal] = useState<UserType | null>(info || null);

  useEffect(() => {
    if (Current && Object.keys(Current).length > 0) {
      setUserVal(Current);
    }
  }, [Current]);

  useEffect(() => {
    if (userVal?._id) {
      dispatch(Add(userVal._id));
    }
  }, [userVal, dispatch]);

  const handleAvatar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const result = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      console.log('Avatar updated:', result.data);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubscribe = () => {
    console.log('subscribed!!!');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black text-white flex flex-col justify-evenly overflow-y-scroll">
      <div className="h-80 flex flex-wrap justify-evenly items-center p-4">
        <div className="flex flex-col items-center gap-4">
          {userVal ? (
            <>
              <img
                src={userVal.avatar}
                alt="User Avatar"
                className="w-48 h-60 object-cover rounded-full border-4 border-gray-700"
              />
              <form onSubmit={handleAvatar} className="flex flex-col gap-2 items-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="text-white file:bg-gray-700 file:text-white file:border-none file:px-4 file:py-2 file:rounded-md"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
                >
                  Change Avatar
                </button>
              </form>
            </>
          ) : (
            <h1 className="text-xl text-red-400">User details not fetched successfully</h1>
          )}
        </div>

        <div className="text-left space-y-2">
          <h1 className="text-2xl font-semibold">{userVal?.fullName}</h1>
          <h1 className="text-lg text-gray-300">{userVal?.email}</h1>
          <h1 className="text-lg text-gray-400">@{userVal?.username}</h1>
        </div>

        <div className="pt-10">
          <button
            onClick={handleSubscribe}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Uncomment when needed */}
      {/* <Content /> */}
    </div>
  );
};

export default UserInfo;
