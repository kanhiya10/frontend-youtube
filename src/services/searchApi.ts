// services/search.ts
import api from "./api";
import { UserType,SearchResultType } from "@/types/types";



// Search users by query
export const searchUsers = (query: string) =>
  api.get<UserType[]>(`/search/users?query=${encodeURIComponent(query)}`);

export const searchAll = (query: string) =>
  api.get<SearchResultType>(`/search?q=${encodeURIComponent(query)}`);