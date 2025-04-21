import React from 'react';
import { useLocation } from 'react-router-dom';
import PlayVideo from '../../components/videoPlay/playVideo';
import { VideoInfoType } from '../../types/types';
import VideoOwnerInfo from '../../components/videoPlay/videoOwnerInfo';


const Streaming: React.FC = () => {
    const location = useLocation();
    const { VideoInfo } = (location.state as { VideoInfo: VideoInfoType }) || {};

    if (!VideoInfo) {
        return (
          <div className="text-center text-lg font-semibold text-red-500 mt-10">
            No video selected. Please go back and choose a video.
          </div>
        );
      }
      

  return (
    <div>
      <PlayVideo VideoInfo={VideoInfo} />
      <VideoOwnerInfo VideoInfo={VideoInfo} />
    </div>
  );
};

export default Streaming;