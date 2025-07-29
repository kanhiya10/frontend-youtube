import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { VideoInfoType } from '../types/types';
import { useTheme } from '../context/themeContext';

export default function Home() {
  const [randomVideos, setRandomVideos] = useState<VideoInfoType[]>([]);
  const navigate = useNavigate();
 const { theme, toggleTheme, mode } = useTheme();

  useEffect(() => {
    const FetchRandomVideos = async () => {
      const FetchUrl = 'https://backend-youtube-zba1.onrender.com/api/v1/videos/randomVideos';
      console.log('FetchUrl:', FetchUrl);
      try {
        const response = await axios.get<{ data: VideoInfoType[] }>(
          FetchUrl
        );
        setRandomVideos(response.data.data);
        // console.log('randomVideos:', response.data.data);
      } catch (error) {
        console.log('error:', error);
      }
    };
    FetchRandomVideos();
  }, []);

  //  const handleSendNotification = async () => {
  //   try {
  //     const token = localStorage.getItem('fcmToken');
  //     const response = await axios.post('${https://backend-youtube-zba1.onrender.com}/api/v1/notifications/send-notification', {
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

      <div className="flex flex-wrap gap-x-6 gap-y-10 justify-start">
        {randomVideos.length > 0 ? (
          randomVideos.map((video) => (
            <div
              key={video._id}
              className="w-[22%]  shadow-md rounded-md overflow-hidden cursor-pointer "
              onClick={() => navigate(`/videoPlay/streaming/${video._id}`)}

            >
              <img
                src={video.thumbnail}
                alt={`Thumbnail for ${video.title}`}
                className="w-full h-48 object-contain"
              />
              <div className='p-2 ' style={{backgroundColor:theme.block}} >
                <h1 className="text-sm font-bold mb-1">{video.title}</h1>
                {/* <p className="text-xs text-gray-600">{video.description}</p> */}
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
