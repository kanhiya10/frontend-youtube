import axios from 'axios';
import React, { useEffect, useState } from 'react';
import VideoPlayer from '../common/videoPlayer'; // Adjust the import path as necessary
import { VideoInfoType } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';




function RecommendedVideos() {
  const [videos, setVideos] = useState<VideoInfoType[]>([]);
//   const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { theme } = useTheme();

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/recommendations/collection`,
          {
              headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          }
        );
        console.log("response in videoRecommendation",response);
        setVideos(response.data.recommended); // assuming response.data is an array of videos
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }
    }

    fetchRecommendations();
  }, []);

//   if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div className={'w-[100%] p-8 bg-${theme.background} flex flex-col gap-4'}>
      {/* <h3>Recommended Videos</h3> */}
      <ul>
        {videos.map((video) => (
           <div
              key={video._id}
              className="w-full bg-black m-2 shadow-md rounded-md overflow-hidden cursor-pointer"
              onClick={()=>navigate('/videoPlay/streaming',{state:{VideoInfo:video}})}
            >
              <img
                src={video.thumbnail}
                alt={`Thumbnail for ${video.title}`}
                className="w-full h-48 object-contain"
              />
              <div className="p-2">
                <h1 className="text-sm font-bold mb-1">{video.title}</h1>
                {/* <p className="text-xs text-gray-600">{video.description}</p> */}
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
        ))}
      </ul>
    </div>
  );
}

export default RecommendedVideos;
