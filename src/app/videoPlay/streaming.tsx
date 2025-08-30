import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayVideo from '../../components/videoPlay/playVideo';
import { VideoInfoType } from '../../types/types';
import VideoOwnerInfo from '../../components/videoPlay/videoOwnerInfo';
import RecommendedVideos from '../../components/videoPlay/videoRecommendation';
import { useTheme } from '../../context/themeContext';
import { getVideoOwnerInfo } from '../../services/videos';
import axios from 'axios';

const Streaming: React.FC = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const [VideoInfo, setVideoInfo] = useState<VideoInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("VideoInfo in streaming");

  useEffect(() => {
    const fetchVideoOwnerInfo = async () => {
      try {
        setIsLoading(true);
        const response = await getVideoOwnerInfo(id!);
        const res = response.data.data;
        console.log("Fetched video info:", res);
        setVideoInfo(res);
      } catch (error) {
        console.error("Error fetching owner info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchVideoOwnerInfo();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading video...</p>
        </div>
      </div>
    );
  }

  if (!VideoInfo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4" >
        <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full">
          <div className="text-6xl mb-4">🎥</div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Video Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No video selected. Please go back and choose a video.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300" style={{ backgroundColor: theme.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6 xl:gap-8">
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            <PlayVideo VideoInfo={VideoInfo} />
            <VideoOwnerInfo VideoInfo={VideoInfo} />
          </div>

          {/* Right Section */}
          <div className="w-80 xl:w-96 flex-shrink-0">
            <RecommendedVideos />
          </div>
        </div>

        {/* Mobile and Tablet Layout */}
        <div className="lg:hidden space-y-6">
          <PlayVideo VideoInfo={VideoInfo} />
          <VideoOwnerInfo VideoInfo={VideoInfo} />
          <RecommendedVideos />
        </div>
      </div>
    </div>
  );
};

export default Streaming;