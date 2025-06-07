import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-markers';

interface Timestamp {
  time: number;  // Time in seconds
  label: string; // Description of the timestamp
}

interface VideoPlayerProps {
  src: string;                // video URL (.m3u8 or .mp4)
  poster?: string;            // optional thumbnail
  onPlay?: () => void;        // optional play handler
  className?: string;         // optional styling
  timestamps?: Timestamp[];   // array of timestamps
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  onPlay,
  className = '',
  timestamps = [],
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

 useEffect(() => {
  if (!videoRef.current) return;

  if (playerRef.current) {
    playerRef.current.dispose();
  }

  const player = videojs(videoRef.current, {
    controls: true,
    autoplay: false,
    preload: 'auto',
    fluid: false,
    controlBar: {
      skipForward: true,
      skipBack: true,
      pictureInPictureToggle: true,
      volumePanel: { inline: false },
    },
    poster,
    sources: [{
      src,
      type: src.endsWith('.m3u8') ? 'application/x-mpegURL' : 'video/mp4',
    }],
  });

  playerRef.current = player;

  player.on('play', () => {
    if (onPlay) onPlay();
  });

  player.on('timeupdate', () => {
    const time = player.currentTime();
    setCurrentTime(Math.floor(time !== undefined ? time : 0));
  });

  // ✅ Add markers
  // player.markers({
  //   markers: timestamps.map(t => ({
  //     time: t.time,
  //     text: t.label,
  //   })),
  //   markerStyle: {
  //     'background-color': 'red',
  //     'width': '4px',
  //   },
  //   onMarkerReached: function(marker: any) {
  //     console.log("Reached marker:", marker.text);
  //   },
  //   onMarkerClick: function(marker: any) {
  //     player.currentTime(marker.time);
  //   },
  // });

  return () => {
    player.dispose();
  };
}, [src, poster, onPlay, timestamps]);

  // Format seconds to MM:SS or HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  };

  // Jump to specific timestamp
  const jumpToTimestamp = (time: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime(time);
      playerRef.current.play();
    }
  };

  return (
    <div className="video-player-container">
      <div data-vjs-player>
        <video
          ref={videoRef}
          className={`video-js vjs-big-play-centered ${className}`}
          playsInline
        />
      </div>
      
      {/* {timestamps.length > 0 && (
        <div className="timestamps-container mt-4">
          <h3 className="text-lg font-medium mb-2">Timestamps</h3>
          <div className="timestamps-list">
            {timestamps.map((timestamp, index) => (
              <div 
                key={index} 
                className={`timestamp-item p-2 mb-1 cursor-pointer rounded ${
                  currentTime >= timestamp.time && 
                  (index === timestamps.length - 1 || currentTime < timestamps[index + 1].time) 
                    ? 'bg-blue-100 font-medium' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => jumpToTimestamp(timestamp.time)}
              >
                <span className="timestamp-time font-mono mr-2">{formatTime(timestamp.time)}</span>
                <span className="timestamp-label">{timestamp.label}</span>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default VideoPlayer;