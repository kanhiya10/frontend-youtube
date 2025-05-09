import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { VideoInfoType } from '../../types/types';
import axios from 'axios';
import VideoPlayer from '../common/videoPlayer';
import { useVideoPlayTracker } from '../../hooks/useVideoPlayerTracker';

interface PlayVideoProps {
  VideoInfo: VideoInfoType;
}

const PlayVideo: React.FC<PlayVideoProps> = ({ VideoInfo }) => {
  const navigate = useNavigate();
  const trackPlay = useVideoPlayTracker(VideoInfo._id);

  const goBack = () => navigate(-1);

  const handlePlay = () => {
    trackPlay();
    };

  if (!VideoInfo) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-5rem)] text-red-500 text-lg font-semibold">
        No video information available.
      </div>
    );
  }

  return (
    <div className="w-[70%] px-4 md:px-2 pt-3 pb-2 bg-white dark:bg-[#1a1a1a] text-black dark:text-white  transition-all duration-300 ">
      <div className="max-w-5xl">
        <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
        <VideoPlayer
  src={VideoInfo.videoFile}
  poster={VideoInfo.thumbnail}
  onPlay={handlePlay}
  className="w-full h-auto max-h-[60vh] rounded-lg shadow-xl"
/>
        </div>

        {/* Description */}
        {VideoInfo.title && (
          <p className="text-base md:text-xl font-bold text-gray-700 dark:text-gray-300 mt-4">
            {VideoInfo.title}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayVideo;
