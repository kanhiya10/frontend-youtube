import React, { useCallback, useEffect, useState } from 'react';
import { VideoInfoType, UserInfoType } from '../../types/types';
import { ThumbsUp, ThumbsDown, Share2, Download, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoComments from '../comments/videoComments';
import { useTheme } from '../../context/themeContext';
import { toggleSubscription, toggleVideoReaction } from '../../services/videos';

interface VideoOwnerInfoProps {
  VideoInfo: VideoInfoType;
}

const VideoOwnerInfo: React.FC<VideoOwnerInfoProps> = ({ VideoInfo }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [isSubscribed, setIsSubscribed] = useState<boolean>(VideoInfo.isSubscribed || false);
  const [subscribersCount, setSubscribersCount] = useState<number>(VideoInfo.subscribersCount || 0);
  const [likes, setLikes] = useState(VideoInfo.likes || 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [hasDisliked, setHasDisliked] = useState<boolean>(false);

  const handleSubscribe = async () => {
    if (!VideoInfo.video.owner._id) {
      console.error("Owner ID is not available");
      return;
    }
    try {
      const response = await toggleSubscription(VideoInfo.video.owner._id);
      
      setIsSubscribed(response.data.data.isSubscribed);
      setSubscribersCount(response.data.data.subscribersCount);
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  const toggleReaction = async (type: 'like' | 'dislike') => {
    try {
      const res = await toggleVideoReaction(VideoInfo.video._id, type);

      const { likes, dislikes, likedByUser, dislikedByUser } = res.data.data;
      setLikes(likes);
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
      <div
        className="flex items-center justify-center p-8 rounded-lg shadow-md border"
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4" style={{ borderColor: theme.primary }}></div>
          <p style={{ color: theme.text }}>Failed to load video owner info. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full space-y-4 sm:space-y-6'>
      {/* Main Owner Info and Actions */}
      <div 
        className="shadow-lg rounded-xl overflow-hidden border"
        style={{ 
          backgroundColor: theme.card, 
          borderColor: theme.border 
        }}
      >
        {/* Desktop and Tablet Layout */}
        <div className="hidden sm:flex flex-row justify-between items-center gap-4 p-4 lg:p-6">
          {/* Left - Channel Info */}
          <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0">
            <div
              onClick={() => navigate(`/videoPlay/ownerProfile/${VideoInfo.video.owner.username}`)}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity flex-1 min-w-0"
            >
              <img
                src={VideoInfo.video.owner.avatar}
                alt={VideoInfo.video.owner.fullName}
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover shadow-md border-2"
                style={{ borderColor: theme.border }}
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-base lg:text-lg font-semibold truncate" style={{ color: theme.text }}>
                  {VideoInfo.video.owner.fullName}
                </h2>
                <p className="text-xs lg:text-sm" style={{ color: theme.textSecondary }}>
                  {subscribersCount?.toLocaleString() || '1.2M'} subscribers
                </p>
              </div>
            </div>

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap hover:scale-105"
              style={{
                backgroundColor: isSubscribed ? theme.textMuted : theme.primary,
                color: '#FFFFFF'
              }}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Like/Dislike */}
            <div 
              className="flex items-center gap-2 lg:gap-3 rounded-full px-3 lg:px-4 py-2 shadow-sm border" 
              style={{
                backgroundColor: theme.inputBackground,
                borderColor: theme.border
              }}
            >
              <div className="flex items-center gap-1 border-r pr-2 lg:pr-3" style={{ borderColor: theme.border }}>
                <ThumbsUp
                  className="w-4 h-4 lg:w-5 lg:h-5 cursor-pointer transition-all duration-200 hover:scale-110"
                  style={{ color: hasLiked ? theme.info : theme.textMuted }}
                  onClick={() => toggleReaction("like")}
                />
                <span className="text-xs lg:text-sm font-medium" style={{ color: theme.text }}>
                  {likes?.toLocaleString()}
                </span>
              </div>
              <ThumbsDown
                className="w-4 h-4 lg:w-5 lg:h-5 cursor-pointer transition-all duration-200 hover:scale-110"
                style={{ color: hasDisliked ? theme.error : theme.textMuted }}
                onClick={() => toggleReaction("dislike")}
              />
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm transition-all duration-200 hover:scale-105 shadow-sm border"
              style={{
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text
              }}
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden lg:inline">Share</span>
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 rounded-full text-xs lg:text-sm transition-all duration-200 hover:scale-105 shadow-sm border"
              style={{
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text
              }}
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
              className="w-12 h-12 rounded-full object-cover shadow-md border-2"
              style={{ borderColor: theme.border }}
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold truncate" style={{ color: theme.text }}>
                {VideoInfo.video.owner.fullName}
              </h2>
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                {subscribersCount?.toLocaleString() || '1.2M'} subscribers
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSubscribe();
              }}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: isSubscribed ? theme.textMuted : theme.primary,
                color: '#FFFFFF'
              }}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Actions Row */}
          <div className="flex items-center justify-between gap-2">
            {/* Like/Dislike */}
            <div 
              className="flex items-center gap-3 rounded-full px-4 py-2.5 shadow-sm border flex-1"
              style={{ 
                backgroundColor: theme.inputBackground,
                borderColor: theme.border
              }}
            >
              <div className="flex items-center gap-2 border-r pr-3 flex-1" style={{ borderColor: theme.border }}>
                <ThumbsUp
                  className="w-5 h-5 cursor-pointer transition-all duration-200"
                  style={{ color: hasLiked ? theme.info : theme.textMuted }}
                  onClick={() => toggleReaction("like")}
                />
                <span className="text-sm font-medium" style={{ color: theme.text }}>
                  {likes?.toLocaleString()}
                </span>
              </div>
              <ThumbsDown
                className="w-5 h-5 cursor-pointer transition-all duration-200"
                style={{ color: hasDisliked ? theme.error : theme.textMuted }}
                onClick={() => toggleReaction("dislike")}
              />
            </div>

            {/* Share & Download */}
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full transition-all duration-200 shadow-sm border"
                style={{
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                  color: theme.text
                }}
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2.5 rounded-full transition-all duration-200 shadow-sm border"
                style={{
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                  color: theme.text
                }}
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Details Card */}
      <div 
        className="shadow-lg rounded-xl overflow-hidden border" 
        style={{ 
          backgroundColor: theme.card, 
          borderColor: theme.border 
        }}
      >
        <div className='p-4 lg:p-6'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b pb-4' style={{ borderColor: theme.border }}>
            <h1 className='text-sm lg:text-base font-semibold' style={{ color: theme.text }}>
              {VideoInfo.video.views?.toLocaleString() || 0} views
            </h1>
            <div className="hidden sm:block w-1 h-1 rounded-full" style={{ backgroundColor: theme.textMuted }}></div>
            <h1 className='text-sm lg:text-base font-semibold' style={{ color: theme.text }}>
              6 months ago
            </h1>
          </div>
          <p className='text-sm lg:text-base mt-4 leading-relaxed' style={{ color: theme.textSecondary }}>
            {VideoInfo.video.description}
          </p>
        </div>
      </div>

      <VideoComments VideoId={VideoInfo.video._id} />
    </div>
  );
};

export default VideoOwnerInfo;