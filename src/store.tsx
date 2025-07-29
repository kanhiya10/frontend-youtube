// import {configureStore} from "@reduxjs/toolkit";
// import UserReducer from "./features/slice/fetchUser.slice";
// // import AvatarReducer from "./features/slice/AvatarChange.slice"
// import VideoUserReducer from "./features/slice/fetchVideos.slice";
// import channelFetchUserReducer from "./features/slice/channelFetchUser.slice";

// export const store=configureStore({
//     reducer:{
//         User:UserReducer,
//         // Avatar:AvatarReducer
//         Channel:channelFetchUserReducer,
//         VideoUser:VideoUserReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: false, // Disable serializableCheck
//         immutableCheck: false,    // Disable immutableCheck
//       }),
// })


import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/slice/fetchUser.slice';
// import AvatarReducer from './features/slice/AvatarChange.slice';
import VideoUserReducer from './features/slice/fetchVideos.slice';
import channelFetchUserReducer from './features/slice/channelFetchUser.slice';
import unreadReducer from './features/slice/unreadCount.slice';

export const store = configureStore({
  reducer: {
    User: UserReducer,
    // Avatar: AvatarReducer,
    Channel: channelFetchUserReducer,
    VideoUser: VideoUserReducer,
    Unread: unreadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// 🔧 Export types for use throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
