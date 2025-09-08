// hooks/useVideoPlayTracker.ts
import { useCallback } from 'react';
import axios from 'axios';

export const useVideoPlayTracker = () => {
  const trackPlay = useCallback((videoId: string) => {
    if (!videoId) return;

    const viewedKey = `viewed-${videoId}`;

    if (!sessionStorage.getItem(viewedKey)) {

      // Increment view count
      axios.post(`https://backend-youtube-zba1.onrender.com/api/v1/viewVideo/viewVideo/${videoId}`, {}, {
        withCredentials: true,
      }).then((res) => {
        sessionStorage.setItem(viewedKey, 'true');
      }).catch((err) => {
        console.error('Failed to increase view count:', err);
      });

      // Add to watch history (no userId needed)
      axios.post(`https://backend-youtube-zba1.onrender.com/api/v1/users/history/${videoId}`, {}, {
        withCredentials: true,
      }).then((res) => {
      }).catch((err) => {
        console.error('Failed to update watch history:', err);
      });
    } else {
    }
  }, []);

  return trackPlay;
};
