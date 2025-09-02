import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlayVideo from '../../components/videoPlay/playVideo';
import { VideoInfoType } from '../../types/types';
import VideoOwnerInfo from '../../components/videoPlay/videoOwnerInfo';
import RecommendedVideos from '../../components/videoPlay/videoRecommendation';
import { useTheme } from '../../context/themeContext';
import { getVideoOwnerInfo } from '../../services/videos';
import axios from 'axios';
import { useStyles } from '../../utils/styleImports';

const Streaming: React.FC = () => {
  const { theme } = useTheme();
  const { id } = useParams();
  const [VideoInfo, setVideoInfo] = useState<VideoInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log('param id:', id);
  const { containerStylev2, loadingSpinner, containerStyle, notFoundCardStyle, buttonStyleCss } = useStyles();

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
      <div className="min-h-screen flex items-center justify-center" style={containerStylev2}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={loadingSpinner}></div>
          <p className="text-lg font-medium">Loading video...</p>
        </div>
      </div>
    );
  }

  if (!VideoInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={containerStyle}>
        <div className="rounded-lg p-8 max-w-md w-full text-center" style={notFoundCardStyle}>
          <div className="text-6xl mb-4">🎥</div>
          <h2 className="text-xl font-semibold mb-2">Video Not Found</h2>
          <p className="mb-4" style={{ color: theme.textSecondary }}>
            No video selected. Please go back and choose a video.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 rounded-lg hover:opacity-80 transition-colors"
            style={buttonStyleCss}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.background }}>
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