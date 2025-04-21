import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Content from './content';
import { Add } from '../../features/slice/fetchVideos.slice';
import { RootState, AppDispatch } from '../../store'; // adjust path as needed

const SearchInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { channelUser, isLoading } = useSelector((state: RootState) => state.Channel);

  useEffect(() => {
    if (channelUser?._id) {
      dispatch(Add(channelUser._id));
    }
  }, [channelUser, dispatch]);

  const handleSubscribe = () => {
    console.log('subscribed!!!');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black text-white flex flex-col justify-evenly overflow-y-auto">
      <div className="flex flex-wrap md:flex-nowrap justify-evenly items-center p-4">
        {/* Avatar */}
        <div className="mb-6 md:mb-0">
          {channelUser ? (
            <img
              src={channelUser.avatar}
              alt="Channel Avatar"
              className="w-48 h-60 rounded-full object-cover border-4 border-gray-700"
            />
          ) : (
            <h1 className="text-xl text-red-400">User details not fetched successfully</h1>
          )}
        </div>

        {/* Info */}
        <div className="text-left space-y-2">
          <h1 className="text-2xl font-semibold">{channelUser?.fullName}</h1>
          <h1 className="text-lg text-gray-300">{channelUser?.email}</h1>
          <h1 className="text-lg text-gray-400">@{channelUser?.username}</h1>
        </div>

        {/* Subscribe Button */}
        <div className="pt-10 md:pt-0">
          <button
            onClick={handleSubscribe}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Video Content */}
      <div className="px-4">
        <Content />
      </div>
    </div>
  );
};

export default SearchInfo;
