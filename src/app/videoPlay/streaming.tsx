import React from 'react';
import { useLocation } from 'react-router-dom';
import PlayVideo from '../../components/videoPlay/playVideo';
import { VideoInfoType } from '../../types/types';
import VideoOwnerInfo from '../../components/videoPlay/videoOwnerInfo';
import RecommendedVideos from '../../components/videoPlay/videoRecommendation'; 
import { useTheme } from '../../context/themeContext';


const Streaming: React.FC = () => {
    const location = useLocation();
    const { theme } = useTheme();
    const { VideoInfo } = (location.state as { VideoInfo: VideoInfoType }) || {};

    if (!VideoInfo) {
        return (
          <div className="text-center text-lg font-semibold text-red-500 mt-10">
            No video selected. Please go back and choose a video.
          </div>
        );
      }
      

  return (
    <div style={{ backgroundColor: theme.background }}>
  <div className="max-w-7xl mx-auto mt-10 mb-10  shadow-lg">
    <div className="flex flex-row justify-start w-full p-4 gap-4 ">

      {/* Left Section */}
      <div className="w-[70%] flex flex-col gap-4 ">
        <PlayVideo VideoInfo={VideoInfo} />
        <VideoOwnerInfo VideoInfo={VideoInfo} />
      </div>

      {/* Right Section */}
      <div className="w-[30%] min-w-[250px]">
        <RecommendedVideos />
      </div>
      
    </div>
  </div>
</div>


  );
};

export default Streaming;