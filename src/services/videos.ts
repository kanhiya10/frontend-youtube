import api from "./api";
import { HomeInfoType,VideoInfoType } from "@/types/types";

export const getRandomVideos = () => 
  api.get<{ data: HomeInfoType[] }>("/videos/randomVideos");

export const getVideoOwnerInfo = (id: string) =>
  api.get<{ data: VideoInfoType }>(`/videos/videoOwnerInfo/${id}`);