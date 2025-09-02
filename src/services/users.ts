import api from "./api";
import { UserType,HomeInfoType } from "@/types/types";

// Registration API call
export const registerUser = (formData: FormData) =>
  api.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // Google login
export const googleLogin = (idToken: string) =>
  api.post("/users/google-login", { idToken });

export const getCurrentUser = () =>
  api.get<{ data: UserType }>("/users/current-user");

export const getVisitChannelInfo = (username:string) =>
    api.post<{data:UserType}>(`/users/visitChannel/${username}`);

export const getWatchHistory = () =>
  api.get<{ data: HomeInfoType[] }>("/users/GetHistory");

export const clearWatchHistory = () =>
  api.get("/users/ClearHistory");

export const updateAccountDetails = (data: {
  fullName: string;
  email: string;
}) => api.patch("/users/update-account", data);

export const updateAvatar = (formData: FormData) =>
  api.patch("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateCoverImage = (formData: FormData) =>
  api.patch("/users/cover-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const changePassword = (data: {
  currentPassword: string;
  newPassword: string;
}) => api.post("/users/change-password", data);

