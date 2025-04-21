import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { VideoInfoType } from '../../types/types';
import axios from 'axios';

interface PlayVideoProps {
  VideoInfo: VideoInfoType;
}

const PlayVideo: React.FC<PlayVideoProps> = ({ VideoInfo }) => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const handlePlay = () => {
    // Check if the video has already been viewed in the session
    if (!sessionStorage.getItem(`viewed-${VideoInfo._id}`)) {
      console.log("First time play - Increasing view count");
      // Make the API call to increase the view count
      axios.post(`http://localhost:8000/api/v1/viewVideo/viewVideo/${VideoInfo._id}`, {}, {
        withCredentials: true
      }).then((response) => {
        console.log('View count updated:', response.data);
        // Store in sessionStorage to prevent further API calls for this session
        sessionStorage.setItem(`viewed-${VideoInfo._id}`, 'true');
      }).catch((error) => {
        console.error('Error increasing view count', error);
      });
    } else {
      console.log('Video already viewed in this session');
    }
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
          <video
            className="w-full h-auto max-h-[60vh] bg-black"
            controls
            poster={VideoInfo.thumbnail}
            onPlay={handlePlay}  // Trigger handlePlay when the video is played
          >
            <source src={VideoInfo.videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
