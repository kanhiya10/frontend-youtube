import { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  videoFile: string;
  createdAt?: string;
  visibility:string
}
interface UserVideosResponse {
  videos: Video[];
  canWatchMembersOnly: boolean;
}

export const useUserVideos = (username?: string) => {
  const [videosData, setVideosData] = useState<UserVideosResponse>({
    videos:[],
    canWatchMembersOnly:false
  });
  const [loading, setLoading] = useState(true);


  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = `${import.meta.env.VITE_API_URL}/api/v1/videos/user${username ? `/${username}` : ""}`;
      const response = await axios.get<{ data: UserVideosResponse }>(endpoint, { withCredentials: true });
      setVideosData(response.data.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return {
    videos: videosData?.videos,
    canWatch: videosData?.canWatchMembersOnly,
    loading,
    refetch: fetchVideos,
  };
};