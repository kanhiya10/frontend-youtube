import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { VideoInfoType } from '../types/types';

export default function Home() {
  const [randomVideos, setRandomVideos] = useState<VideoInfoType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const FetchRandomVideos = async () => {
      try {
        const response = await axios.get<{ data: VideoInfoType[] }>(
          `${process.env.VITE_API_URL}/api/v1/videos/randomVideos`
        );
        setRandomVideos(response.data.data);
        console.log('randomVideos:', response.data.data);
      } catch (error) {
        console.log('error:', error);
      }
    };
    FetchRandomVideos();
  }, []);

  return (
    <div className="min-h-screen w-full  p-5 " >
      <div className="flex flex-wrap gap-x-6 gap-y-10 justify-start">
        {randomVideos.length > 0 ? (
          randomVideos.map((video) => (
            <div
              key={video._id}
              className="w-[22%] bg-white shadow-md rounded-md overflow-hidden cursor-pointer"
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
          ))
        ) : (
          <h1>No videos to display</h1>
        )}
      </div>
    </div>
  );
}
