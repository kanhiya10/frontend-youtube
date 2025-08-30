import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { VideoInfoType, UserInfoType } from '../../types/types';
import { ThumbsUp, ThumbsDown, Share2, Download, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoComments from '../comments/videoComments';
import { useTheme } from '../../context/themeContext';

interface VideoOwnerInfoProps {
  VideoInfo: VideoInfoType;
}

const VideoOwnerInfo: React.FC<VideoOwnerInfoProps> = ({ VideoInfo }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  // const [ownerInfo, setOwnerInfo] = useState<UserInfoType | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(VideoInfo.isSubscribed || false);
  const [subscribersCount, setSubscribersCount] = useState<number>(VideoInfo.subscribersCount || 0);

  const [likes, setLikes] = useState(VideoInfo.likes || 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [hasDisliked, setHasDisliked] = useState<boolean>(false);

  console.log("VideoInfo in videoOwnerInfo", VideoInfo);



  const handleSubscribe = async () => {

    if (!VideoInfo.video.owner._id) {
      console.error("Owner ID is not available");
      return;
    }
    try {
      const response = await axios.post(
        `https://backend-youtube-zba1.onrender.com/api/v1/subscription/toggle/${VideoInfo.video.owner._id}`,
        {},
        { withCredentials: true }
      );
      console.log("response", response);

      setIsSubscribed(response.data.data.isSubscribed);
      setSubscribersCount(response.data.data.subscribersCount);
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  const toggleReaction = async (type: 'like' | 'dislike') => {
    try {
      const res = await axios.post(
        `https://backend-youtube-zba1.onrender.com/api/v1/videos/toggleReaction/${VideoInfo.video._id}`,
        { reaction: type },
        { withCredentials: true }
      );

      const { likes, dislikes, likedByUser, dislikedByUser } = res.data.data;

      setLikes(likes);
      console.log("res", res);
      console.log("hasLiked", hasLiked);
      console.log("hasDisliked", hasDisliked);
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
          title: VideoInfo.video.title,
          text: `Check out this video: ${VideoInfo.video.title}`,
          url: `${window.location.origin}/videoPlay/streaming/${VideoInfo.video._id}`,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Your browser does not support direct sharing. You can share via these options below.');
    }
  }, [VideoInfo]);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = VideoInfo.video.videoFile;
    link.download = `${VideoInfo.video.title}.mp4`;
    link.click();
  }, [VideoInfo]);

  if (!VideoInfo || !VideoInfo.video) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p>Failed to load video owner info. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full space-y-4 sm:space-y-6' >
      {/* Main Owner Info and Actions */}
      <div className={`bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden`}>
        {/* Desktop and Tablet Layout */}
        <div className="hidden sm:flex flex-row justify-between items-center gap-4 p-4 lg:p-6" style={{ backgroundColor: theme.card }}>
          {/* Left - Channel Info */}
          <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0 ">
            <div
              onClick={() => navigate(`/videoPlay/ownerProfile/${VideoInfo.video.owner.username}`)}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity flex-1 min-w-0"
            >
              <img
                src={VideoInfo.video.owner.avatar}
                alt={VideoInfo.video.owner.fullName}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover shadow-md border-2 border-gray-200 dark:border-gray-700"
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {VideoInfo.video.owner.fullName}
                </h2>
                <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                  {subscribersCount?.toLocaleString() || '1.2M'} subscribers
                </p>
              </div>
            </div>

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              className={`px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap hover:scale-105 ${isSubscribed
                  ? 'bg-gray-800 dark:bg-gray-700 text-white hover:bg-gray-900 dark:hover:bg-gray-600'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg'
                }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Like/Dislike */}
            <div className="flex items-center gap-2 lg:gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-3 lg:px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2 lg:pr-3">
                <ThumbsUp
                  className={`w-4 h-4 lg:w-5 lg:h-5 cursor-pointer transition-all duration-200 hover:scale-110 ${hasLiked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
                    }`}
                  onClick={() => toggleReaction("like")}
                />
                <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 font-medium">
                  {likes?.toLocaleString()}
                </span>
              </div>
              <ThumbsDown
                className={`w-4 h-4 lg:w-5 lg:h-5 cursor-pointer transition-all duration-200 hover:scale-110 ${hasDisliked ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400 hover:text-red-600'
                  }`}
                onClick={() => toggleReaction("dislike")}
              />
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-xs lg:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden lg:inline">Share</span>
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-xs lg:text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <Download className="w-4 h-4" />
              <span className="hidden lg:inline">Download</span>
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden p-4 space-y-4">
          {/* Channel Info */}
          <div
            onClick={() => navigate(`/videoPlay/ownerProfile/${VideoInfo.video.owner.username}`)}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src={VideoInfo.video.owner.avatar}
              alt={VideoInfo.video.owner.fullName}
              className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-gray-200 dark:border-gray-700"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {VideoInfo.video.owner.fullName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {subscribersCount?.toLocaleString() || '1.2M'} subscribers
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSubscribe();
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isSubscribed
                  ? 'bg-gray-800 dark:bg-gray-700 text-white'
                  : 'bg-red-600 text-white shadow-md'
                }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Actions Row */}
          <div className="flex items-center justify-between gap-2">
            {/* Like/Dislike */}
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2.5 shadow-sm border border-gray-200 dark:border-gray-700 flex-1">
              <div className="flex items-center gap-2 border-r border-gray-300 dark:border-gray-600 pr-3 flex-1">
                <ThumbsUp
                  className={`w-5 h-5 cursor-pointer transition-all duration-200 ${hasLiked ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  onClick={() => toggleReaction("like")}
                />
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  {likes?.toLocaleString()}
                </span>
              </div>
              <ThumbsDown
                className={`w-5 h-5 cursor-pointer transition-all duration-200 ${hasDisliked ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'
                  }`}
                onClick={() => toggleReaction("dislike")}
              />
            </div>

            {/* Share & Download */}
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Details Card */}
      <div className='bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden' style={{ backgroundColor: theme.card }}>
        <div className='p-4 lg:p-6'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b border-gray-200 dark:border-gray-700 pb-4'>
            <h1 className='text-sm lg:text-base font-semibold text-gray-900 dark:text-white'>
              {VideoInfo.video.views?.toLocaleString() || 0} views
            </h1>
            <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
            <h1 className='text-sm lg:text-base font-semibold text-gray-900 dark:text-white'>
              6 months ago
            </h1>
          </div>
          <p className='text-sm lg:text-base text-gray-600 dark:text-gray-300 mt-4 leading-relaxed'>
            {VideoInfo.video.description}
          </p>
        </div>
      </div>

      <VideoComments VideoId={VideoInfo.video._id} />
    </div>
  );
};

export default VideoOwnerInfo;