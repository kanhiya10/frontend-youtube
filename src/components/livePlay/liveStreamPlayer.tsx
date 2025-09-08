import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const LiveStreamPlayer: React.FC<{ streamKey: string }> = ({ streamKey }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    const streamUrl = `https://backend-youtube-zba1.onrender.com/hls/${streamKey}/index.m3u8`;


    let hls: Hls | null = null;
    let retryCount = 0;
    const maxRetries = 15;
    const retryDelay = 2000;

    const loadStream = async () => {
      try {
        const res = await fetch(streamUrl, { method: 'HEAD' });
        if (!res.ok) throw new Error('Stream not available');

        if (video) {
          if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              video.play();
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = streamUrl;
            video.addEventListener('loadedmetadata', () => {
              video.play();
            });
          }
        }
      } catch (error) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(loadStream, retryDelay);
        } else {
          console.error('Stream failed to load after retries:', error);
        }
      }
    };

    loadStream();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [streamKey]);

  return (
    <div className='w-full h-300px'>
      <h2>Live Stream</h2>
      <video
        ref={videoRef}
        controls
        width={640}
        height={360}
        style={{ borderRadius: '10px', backgroundColor: '#000' }}
      />
    </div>
  );
};

export default LiveStreamPlayer;
