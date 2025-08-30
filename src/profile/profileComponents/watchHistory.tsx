import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../store'; // Update this path to your actual store

interface VideoType {
  _id: string;
  title: string;
  thumbnail: string;
  
  // Add any other fields as necessary
}

const WatchHistory: React.FC = () => {
  const { info } = useSelector((state: RootState) => state.User);
  const [watchedHistory, setWatchedHistory] = useState<VideoType[]>([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/v1/users/GetHistory/${info._id}`,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
          }
        );
        console.log('HistoryVideos', response.data.data);
        setWatchedHistory(response.data.data);
      } catch (error) {
        console.error('Error fetching videos', error);
      }
    };

    getHistory();
  }, [info._id]);

  const handleClearHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/v1/users/ClearHistory/${info?._id}`,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      console.log('ClearedHistory', response.data.data);
      setWatchedHistory(response.data.data);
    } catch (error) {
      console.error('Error clearing history', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {watchedHistory.length > 0 ? (
        <>
          <div className="flex justify-center mb-6">
            <button
              onClick={handleClearHistory}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded shadow-md transition"
            >
              Clear History
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {watchedHistory.map((video) => (
              <div
                key={video._id}
                className="border-2 border-gray-700 rounded-md p-2 cursor-pointer transition hover:scale-105 bg-gray-800 w-[300px]"
              >
                <img
                  src={video.thumbnail}
                  alt={`Thumbnail for ${video.title}`}
                  className="w-full h-[200px] object-cover rounded"
                />
                <p className="mt-2 text-center font-medium text-lg">{video.title}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <h1 className="text-3xl text-gray-400">Your watch history is empty.</h1>
        </div>
      )}
    </div>
  );
};

export default WatchHistory;
