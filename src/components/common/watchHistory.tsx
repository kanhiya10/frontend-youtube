import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { VideoInfoType } from "../../types/types";
import { useTheme } from "../../context/themeContext";

const WatchHistory = () => {
  const [history, setHistory] = useState<VideoInfoType[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "https://backend-youtube-zba1.onrender.com/api/v1/users/GetHistory",
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
      setHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching watch history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: theme.background }}>
        <span className="text-lg text-gray-500">Loading...</span>
      </div>
    );
  }

  return (
    history.length > 0 ? (
      <div
        className="min-h-screen py-10 px-4"
        style={{ backgroundColor: theme.background }}
      >
        <h1 className="text-2xl font-bold mb-8 text-center">Watch History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {history.map((video) => (
            <div key={video._id} className="shadow-md rounded-lg p-4" style={{ backgroundColor: theme.card }}>
              <img
                src={video.thumbnail}
                alt={`Thumbnail for ${video.title}`}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              {/* <h2 className="text-lg font-semibold mb-2">{video.channelName}</h2> */}
              <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
              <p className="text-gray-600 mb-1">{video.description}</p>
              <p className="text-gray-500 text-sm">Uploaded on: {new Date(video.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">No Watch History</h1>
        <p className="text-gray-600">You have not watched any videos yet.</p>
      </div>
    )
  );
};

export default WatchHistory;