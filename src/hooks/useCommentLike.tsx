import { useState } from "react";
import axios from "axios";

export const useCommentLike = ({ initialLikes = [], initialDislikes = [], commentId, currentUserId }: {
  initialLikes: string[];
  initialDislikes: string[];
  commentId: string;
  currentUserId: string;
}) => {
  const [likes, setLikes] = useState(initialLikes.length);
  const [dislikes, setDislikes] = useState(initialDislikes.length);
  const [userLiked, setUserLiked] = useState(initialLikes.includes(currentUserId));
  const [userDisliked, setUserDisliked] = useState(initialDislikes.includes(currentUserId));

  const toggleLike = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/comments/like/${commentId}`,
        {},
        { withCredentials: true }
      );
      const data = res.data;
      console.log("Like response data:", data);

      setLikes(data.data.totalLikes);
      setDislikes(data.data.totalDislikes);
      setUserLiked(data.data.liked);
      setUserDisliked(false);
    } catch (error) {
      console.error("Failed to like comment:", error);
    }
  };

  const toggleDislike = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/comments/dislike/${commentId}`,
        {},
        { withCredentials: true }
      );
      const data = res.data;

      setDislikes(data.data.totalDislikes);
      setLikes(data.data.totalLikes);
      setUserDisliked(data.data.disliked);
      setUserLiked(false);
    } catch (error) {
      console.error("Failed to dislike comment:", error);
    }
  };

  return {
    likes,
    dislikes,
    userLiked,
    userDisliked,
    toggleLike,
    toggleDislike,
  };
};
