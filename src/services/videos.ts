import api from "./api";
import { HomeInfoType,VideoInfoType,RecommandType } from "@/types/types";

export const getRandomVideos = () => 
  api.get<{ data: HomeInfoType[] }>("/videos/randomVideos");

export const getVideoOwnerInfo = (id: string) =>
  api.get<{ data: VideoInfoType }>(`/videos/videoOwnerInfo/${id}`);

export const toggleSubscription = (ownerId: string) => 
  api.post<{ data: { isSubscribed: boolean; subscribersCount: number } }>(
    `/subscription/toggle/${ownerId}`,
    {}
  );

// Video reaction services  
export const toggleVideoReaction = (videoId: string, reaction: 'like' | 'dislike') => 
  api.post<{ data: { likes: number; dislikes: number; likedByUser: boolean; dislikedByUser: boolean } }>(
    `/videos/toggleReaction/${videoId}`,
    { reaction }
  );

  export const getVideoRecommendations = () => 
  api.get<{ recommended: RecommandType[] }>("/recommendations/collection");

  export const getVideoComments = (videoId: string) =>
  api.get<{ data: any[] }>(`/comments/readComment/${videoId}`);

export const writeComment = (text: string, videoId: string) =>
  api.post<{ data: any }>("/comments/writeComment", {
    text,
    videoId
  });

  export const replyToComment = (commentId: string, text: string, videoId: string) =>
  api.post<{ data: any }>(`/comments/${commentId}/reply`, {
    text,
    videoId
  });

export const uploadVideo = (formData: FormData) => 
api.post("/videos/uploadVideo", formData, {
 headers: { "Content-Type": "multipart/form-data" },
 });

 export const deleteVideo = (videoId: string) => 
  api.delete<{ message: string }>(`/videos/delete/${videoId}`);