import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HomeInfoType } from '../types/types';
import { useTheme } from '../context/themeContext';
import { getRandomVideos } from '../services/videos';
import { useStyles } from '../utils/styleImports';
import { useTime } from '../hooks/useTime';
import {VideoCard} from '../components/common/videoCard';
// import { containerStyle, videoCardStyle, videoCardHoverStyle, videoInfoStyle, videoTitleStyle, videoDateStyle, noVideosStyle } from '../utils/styleImports';

export default function Home() {
  const [randomVideos, setRandomVideos] = useState<HomeInfoType[]>([]);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { containerStyle, videoCardStyle, videoCardHoverStyle, videoInfoStyle, videoTitleStyle, loadingStyle } = useStyles();

  useEffect(() => {
    const fetchRandomVideos = async () => {
      try {
        const response = await getRandomVideos();
        // console.log("Fetched random videos:", response.data.data);
        setRandomVideos(response.data.data);
      } catch (error) {
        console.error("Failed to fetch random videos:", error);
      }
    };

    fetchRandomVideos();
  }, []);


  return (
    <div className="min-h-screen w-full p-5" style={containerStyle}>

      <div className="grid gap-y-10 gap-x-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {randomVideos.length > 0 ? (
          randomVideos.map((video) => <VideoCard key={video._id} video={video} />)
        ) : (
          <h1 className="text-lg col-span-full text-center" style={loadingStyle}>
            No videos to display
          </h1>
        )}
      </div>
    </div>
  );
}