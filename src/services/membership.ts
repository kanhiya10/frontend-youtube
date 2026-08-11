import api from "./api";
// import { UserType,Conversation,ChatMessage } from "@/types/types";

export const getMembershipStatus = (channelId: any) =>
  api.get<{ data:any  }>(`/membership/status/${channelId}`);

export const getChannelMembers = () =>
    api.get("/membership/channel-members");