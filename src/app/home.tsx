import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HomeInfoType } from '../types/types';
import { useTheme } from '../context/themeContext';
import { getRandomVideos } from '../services/videos';

export default function Home() {
  const [randomVideos, setRandomVideos] = useState<HomeInfoType[]>([]);
  const navigate = useNavigate();
  const { theme, toggleTheme, mode } = useTheme();

useEffect(() => {
  const fetchRandomVideos = async () => {
    try {
      const response = await getRandomVideos();
      setRandomVideos(response.data.data);
    } catch (error) {
      console.error("Failed to fetch random videos:", error);
    }
  };

  fetchRandomVideos();
}, []);


  //  const handleSendNotification = async () => {
  //   try {
  //     const token = localStorage.getItem('fcmToken');
  //     const response = await axios.post('${http://localhost:8001}/api/v1/notifications/send-notification', {
  //       token: token, // Replace with a valid client token
  //       title: 'Test Notification',
  //       body: 'This is a test notification from the frontend.',
  //     });
  //     console.log('Notification sent:', response.data);
  //     alert('Notification sent!');
  //   } catch (err) {
  //     console.error('Error sending notification:', err);
  //     alert('Failed to send notification');
  //   }
  // };


  return (
    <div className={`min-h-screen w-full  p-5`} style={{ backgroundColor: theme.background }} >

      {/* <button
        onClick={handleSendNotification}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Send Test Notification
      </button> */}

      <div className="grid gap-y-10 gap-x-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {randomVideos.length > 0 ? (
          randomVideos.map((video) => (
            <div
              key={video._id}
              className="shadow-md rounded-md overflow-hidden cursor-pointer"
              onClick={() => navigate(`/videoPlay/streaming/${video._id}`)}
            >
              <img
                src={video.thumbnail}
                alt={`Thumbnail for ${video.title}`}
                className="w-full h-48 object-contain"
              />
              <div className="p-2" style={{ backgroundColor: theme.block }}>
                <h1 className="text-sm font-bold mb-1">{video.title}</h1>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No videos to display</h1>
        )}
      </div>

    </div>
  );
}
