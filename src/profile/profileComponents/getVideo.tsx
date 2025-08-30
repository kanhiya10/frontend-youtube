import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store'; // Make sure to update the path based on your project

interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  description?: string;
}

interface User {
  _id: string;
  // ... other user properties
}

function GetVideo() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { info } = useSelector((state: RootState) => state.User as { info: User | null });

  useEffect(() => {
    const fetchVideos = async () => {
      if (!info || !info._id) return;
      setIsLoading(true);

      try {
        const response = await axios.post(
          `https://backend-youtube-zba1.onrender.com/api/v1/videos/handleGetVideos/${info._id}`,
          {},
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
          }
        );
        console.log('responseAllVideos', response.data.data);
        setVideos(response.data.data);
      } catch (error) {
        console.error('Error fetching videos', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [info?._id]);

  useEffect(() => {
    if (activeVideo) {
      navigate('/DisplayInfo/getVideo/playVideo', {
        state: { VideoInfo: activeVideo },
      });

      const addVideoToWatchHistory = async () => {
        try {
          await axios.post(
            `https://backend-youtube-zba1.onrender.com/api/v1/users/history/${info._id}/${activeVideo._id}`,
            {},
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            }
          );
        } catch (error) {
          console.error('Error adding video to history', error);
        }
      };

      addVideoToWatchHistory();
    }
  }, [activeVideo, info._id, navigate]);

  return (
    <div className="p-4">
      {isLoading ? (
        <p className="text-center text-lg text-gray-700">Loading videos...</p>
      ) : videos.length > 0 ? (
        <div className="flex flex-wrap justify-evenly gap-4">
          {videos.map((video, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer w-72"
              onClick={() => setActiveVideo(video)}
            >
              <img
                src={video.thumbnail}
                alt={`Thumbnail for ${video.title}`}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold truncate">{video.title}</h3>
                {/* Uncomment if description is needed */}
                {/* <p className="text-sm text-gray-500">{video.description}</p> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No videos available</p>
      )}
    </div>
  );
}

export default GetVideo;