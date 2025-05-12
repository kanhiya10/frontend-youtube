// hooks/useVideoPlayTracker.ts
import { useCallback } from 'react';
import axios from 'axios';

export const useVideoPlayTracker = (videoId: string) => {
  const trackPlay = useCallback(() => {
    if (!videoId) return;

    const viewedKey = `viewed-${videoId}`;

    if (!sessionStorage.getItem(viewedKey)) {
      console.log("First time play - Tracking view");

      // Increment view count
      axios.post(`${process.env.VITE_API_URL}/api/v1/viewVideo/viewVideo/${videoId}`, {}, {
        withCredentials: true,
      }).then((res) => {
        console.log('View count updated:', res.data);
        sessionStorage.setItem(viewedKey, 'true');
      }).catch((err) => {
        console.error('Failed to increase view count:', err);
      });

      // Add to watch history (no userId needed)
      axios.post(`${process.env.VITE_API_URL}/api/v1/users/history/${videoId}`, {}, {
        withCredentials: true,
      }).then((res) => {
        console.log('Watch history updated:', res.data);
      }).catch((err) => {
        console.error('Failed to update watch history:', err);
      });
    } else {
      console.log('Video already viewed in this session');
    }
  }, [videoId]);

  return trackPlay;
};
