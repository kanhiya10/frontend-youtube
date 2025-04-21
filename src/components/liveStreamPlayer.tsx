import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const LiveStreamPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const streamUrl = 'http://localhost:8080/hls/mystream.m3u8';

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });

        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = streamUrl;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      }
    }
  }, []);

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
