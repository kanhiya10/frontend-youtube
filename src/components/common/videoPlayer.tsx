import React from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  onPlay?: () => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, onPlay, className }) => {
  return (
    <video
    className={`bg-black ${className}`}
      controls
      poster={poster}
      onPlay={onPlay}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
