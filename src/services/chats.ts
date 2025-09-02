import api from "./api";
import { UserType,Conversation,ChatMessage } from "@/types/types";



// Get conversation between current user and another user
export const getConversationBetween = (userId: string) =>
  api.get<{ data: Conversation }>(`/conversations/between/${userId}`);

// Get messages for a specific conversation
export const getConversationMessages = (conversationId: string) =>
  api.get<{ data: ChatMessage[] }>(`/conversations/${conversationId}/messages`);

// Upload media file for chat
export const uploadMediaFile = (mediaFile: FormData) =>
  api.post<{ url: string; mediaType: string }>("/conversations/uploadMedia", mediaFile, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  export const getUserConversations = () =>
  api.get<{ data: Conversation[] }>("/conversations");


