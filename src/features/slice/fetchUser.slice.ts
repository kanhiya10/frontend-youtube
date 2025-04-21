// import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
// import axios from "axios";

// export const UserApi=createAsyncThunk("UserApi",async({ url, option })=>{
//     const response=await axios.post(url,option,{
//         withCredentials:true,
//     });
//     return response;
// })

// const UserSlice=createSlice({
//     name:"LoggedInUser",
//     initialState:{
//         info:{},
//         isLoading:false,
//     },
//     reducers: {
//         // Action to reset info
//         resetInfo: (state) => {
//             state.info = {};  // Reset info to an empty object
//         },
//         // You can add other actions for updating info if needed
//     },
//     extraReducers:(builder)=>{
//         builder.addCase(UserApi.pending,(state)=>{
//             state.isLoading=true;
//         });
//         builder.addCase(UserApi.fulfilled,(state,action)=>{
//             state.isLoading=false;
//             // console.log("action payload.data",action.payload.data.data.user);
//             // console.log("accessToken:",action.payload.data.data.accessToken);
//             state.info=action.payload.data.data.user;
//             // console.log('action.payload',action.payload);
//             console.log("state.info",state.info);
//         })
//         builder.addCase(UserApi.rejected,(state)=>{
//             state.isLoading=false
//         })
//     }
// })
// export const{resetInfo}=UserSlice.actions;
// export default UserSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

// Define the shape of your user object (based on your backend response)
interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  // Add more fields as needed
}

interface UserState {
  info: User | null;
  isLoading: boolean;
}

// Define the async thunk type
interface LoginOption {
  url: string;
  option: any; // You can refine this type too
}

// If your backend response looks like { data: { user: User, accessToken: string } }
interface LoginResponse {
  data: {
    data: {
      user: User;
      accessToken: string;
    };
  };
}

export const UserApi = createAsyncThunk<
  AxiosResponse<LoginResponse>, // Thunk return type
  LoginOption                     // Thunk argument type
>('UserApi', async ({ url, option }) => {
  const response = await axios.post(url, option, {
    withCredentials: true,
  });
  return response;
});

const initialState: UserState = {
  info: null,
  isLoading: false,
};

const UserSlice = createSlice({
  name: 'LoggedInUser',
  initialState,
  reducers: {
    resetInfo: (state) => {
      state.info = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UserApi.fulfilled, (state, action: PayloadAction<AxiosResponse<LoginResponse>>) => {
      state.isLoading = false;
      state.info = action.payload.data.data.user;
      console.log('state.info', state.info);
    });
    builder.addCase(UserApi.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { resetInfo } = UserSlice.actions;
export default UserSlice.reducer;
