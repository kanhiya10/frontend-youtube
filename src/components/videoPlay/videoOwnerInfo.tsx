import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { VideoInfoType, UserInfoType } from '../../types/types';
import { ThumbsUp, ThumbsDown, Share2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import VideoComments from './videoComments';
import VideoComments from '../comments/videoComments';
import { useTheme } from '../../context/themeContext';


interface VideoOwnerInfoProps {
  VideoInfo: VideoInfoType;
}

const VideoOwnerInfo: React.FC<VideoOwnerInfoProps> = ({ VideoInfo }) => {
    const navigate = useNavigate();
  const { theme } = useTheme();
  const [ownerInfo, setOwnerInfo] = useState<UserInfoType | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscribersCount, setSubscribersCount] = useState<number>(0);

  const [likes, setLikes] = useState(VideoInfo.likes || 0);
//   const [dislikes, setDislikes] = useState(VideoInfo.dislikes || 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [hasDisliked, setHasDisliked] = useState<boolean>(false);

  useEffect(() => {
    getVideoOwnerInfo();
  }, []);

  const getVideoOwnerInfo = async () => {
    try {
      const response = await axios.get(`https://backend-youtube-zba1.onrender.com/api/v1/videos/videoOwnerInfo/${VideoInfo._id}`);
      setOwnerInfo(response.data.data);
    } catch (error) {
      console.log('Error fetching owner info:', error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        `https://backend-youtube-zba1.onrender.com/api/v1/subscription/toggle/${ownerInfo?._id}`,
        {},
        { withCredentials: true }
      );
      console.log("response",response);
  
      setIsSubscribed(response.data.data.isSubscribed);
      setSubscribersCount(response.data.data.subscribersCount);
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

 
  
  const toggleReaction = async (type: 'like' | 'dislike') => {
    try {
      const res = await axios.post(
        `https://backend-youtube-zba1.onrender.com/api/v1/videos/toggleReaction/${VideoInfo._id}`,
        { reaction: type },
        { withCredentials: true }
      );
  
      const { likes, dislikes, likedByUser, dislikedByUser} = res.data.data;
  
      setLikes(likes);
    //   setDislikes(dislikes);
      console.log("res",res);
      console.log("hasLiked",hasLiked);
      console.log("hasDisliked",hasDisliked);
      setHasLiked(likedByUser);
      setHasDisliked(dislikedByUser);
    } catch (err) {
      console.error("Error toggling reaction", err);
    }
  };
  
  
const handleShare = useCallback(() => {
  if (navigator.share) {
    navigator
      .share({
        title: VideoInfo.title,
        text: `Check out this video: ${VideoInfo.title}`,
        url: `${window.location.origin}/videoPlay/streaming/${VideoInfo._id}`,
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
  } else {
    // Fallback
    alert('Your browser does not support direct sharing. You can share via these options below.');
  }
}, [VideoInfo]);

  
  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = VideoInfo.videoFile;
    link.download = `${VideoInfo.title}.mp4`;
    link.click();
  }, [VideoInfo]);
  
  

  if (!ownerInfo) {
    return <div className="text-red-500">Failed to load video owner info. Please try again.</div>;
  }
  

  return (
    <div className='w-full '>
    <div className={`flex flex-row justify-between gap-4  pb-4 px-2 md:px-6 mt-4  dark:bg-gray-900 shadow-lg rounded-lg  `} >
      {/* Left - Channel Info */}
      <div className="flex items-center gap-4  p-3 rounded-lg">
  {/* Owner Info: Avatar + Name + Subscribers */}
  <div
    onClick={() => navigate(`/videoPlay/ownerProfile/${ownerInfo.username}`)}
    className="flex items-center gap-3 cursor-pointer"
    
  >
    <img
      src={ownerInfo.avatar}
      alt={ownerInfo.fullName}
      className="w-12 h-12 rounded-full object-cover shadow-md"
    />
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {ownerInfo.fullName}
      </h2>
      <p className="text-sm text-gray-500">
        {subscribersCount || '1.2M'} subscribers
      </p>
    </div>
  </div>

  {/* Subscribe Button */}
  <button
    onClick={handleSubscribe}
    className={`ml-auto px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
      isSubscribed
        ? 'bg-black text-white hover:bg-gray-800'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    {isSubscribed ? 'Subscribed' : 'Subscribe'}
  </button>
</div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3 ">
        {/* Like/Dislike */}
        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm">
  <div className="flex items-center gap-1 border-r border-gray-400 pr-3">
    <ThumbsUp
      className={`w-4 h-4 cursor-pointer ${hasLiked ? 'text-blue-600' : 'text-gray-600'}`}
      onClick={() => toggleReaction("like")}
    />
    <span className="text-sm text-gray-600">{likes}</span>
  </div>
  <ThumbsDown
    className={`w-4 h-4 cursor-pointer ${hasDisliked ? 'text-red-600' : 'text-gray-600'}`}
    onClick={() => toggleReaction("dislike")}
  />
  {/* <span className="text-sm text-gray-600">{dislikes}</span> */}
</div>


        {/* Share */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition shadow-sm"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>

        {/* Download */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition shadow-sm"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
     
    </div>
    <div className=' w-full shadow-xl dark:bg-gray-800 rounded-lg p-4' style={{ backgroundColor: theme.card }}> 
        <div className='flex justify-start items-center gap-2 border-b border-gray-300 pb-4'>
            <h1 className='text-md font-semibold text-gray-900 dark:text-white'>{VideoInfo.views || 0} views</h1>
            <h1 className='text-md font-semibold text-gray-900 dark:text-white'>6 months ago</h1>

        </div> 
        <p className='text-gray-600 dark:text-gray-400'>{VideoInfo.description}</p>
    </div>
    <VideoComments VideoInfo={VideoInfo} />

    </div>
  );
};

export default VideoOwnerInfo;
