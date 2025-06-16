import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { VideoInfoType } from '../../types/types';
import axios from 'axios';
import VideoPlayer from '../common/videoPlayer';
import { useVideoPlayTracker } from '../../hooks/useVideoPlayerTracker';
import { useTheme } from '../../context/themeContext';

interface PlayVideoProps {
  VideoInfo: VideoInfoType;
}
const videoTimestamps = [
    { time: 0, label: 'Introduction' },
    { time: 5, label: 'Main concepts' },
    { time: 10, label: 'Technical demonstration' },
    { time: 20, label: 'Case study' },
    { time: 23, label: 'Conclusion' }
  ];

const PlayVideo: React.FC<PlayVideoProps> = ({ VideoInfo }) => {
  const navigate = useNavigate();
  const trackPlay = useVideoPlayTracker(VideoInfo._id);
  const { theme } = useTheme();

  const goBack = () => navigate(-1);

  const handlePlay = () => {
    trackPlay();
    };

  if (!VideoInfo) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-5rem)] text-red-500 text-lg font-semibold border-2 ">
        No video information available.
      </div>
    );
  }

  return (
    <div className={`w-full px-4 md:px-2 pt-3 pb-2 bg-${theme.background} dark:bg-[#1a1a1a] text-black dark:text-white transition-all duration-300 `}>
      <div className="">
        <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 ">
        <VideoPlayer
  src={VideoInfo.videoFile}
  poster={VideoInfo.thumbnail}
  onPlay={handlePlay}
   timestamps={videoTimestamps}
  className="w-full rounded-lg shadow-xl"
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
