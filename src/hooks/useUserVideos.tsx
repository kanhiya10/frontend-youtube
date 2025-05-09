import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const endpoint = `http://localhost:8000/api/v1/videos/user${username ? `/${username}` : ""}`;
        const response = await axios.get<{ data: Video[] }>(endpoint, { withCredentials: true });
        setVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [username]);

  return { videos, loading };
};
