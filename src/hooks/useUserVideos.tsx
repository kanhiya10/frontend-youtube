import { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  videoFile: string;
  createdAt?: string;
}

export const useUserVideos = (username?: string) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = `https://backend-youtube-zba1.onrender.com/api/v1/videos/user${username ? `/${username}` : ""}`;
      const response = await axios.get<{ data: Video[] }>(endpoint, { withCredentials: true });
      setVideos(response.data.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, loading, refetch: fetchVideos };
};