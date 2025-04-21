// import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
// import axios from "axios";

// export const ChannelApi=createAsyncThunk("ChannelApi",async({ url, option })=>{
//     const response=await axios.post(url,option,{
//         withCredentials:true,
//     });
//     return response;
// })

// const ChannelSlice=createSlice({
//     name:"visitingUser",
//     initialState:{
//         channelUser:{},
//         isLoading:false,
//     },
//     extraReducers:(builder)=>{
//         builder.addCase(ChannelApi.pending,(state)=>{
//             state.isLoading=true;
//         });
//         builder.addCase(ChannelApi.fulfilled,(state,action)=>{
//             state.isLoading=false;
//             state.channelUser=action.payload.data.data;
//             console.log("state.channelUser",state.channelUser);
//         })
//         builder.addCase(ChannelApi.rejected,(state)=>{
//             state.isLoading=false
//         })
//     }
// })

// export default ChannelSlice.reducer;


import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types
interface ChannelUser {
  // Add actual fields based on your API response structure
  id?: string;
  username?: string;
  email?: string;
  // etc.
}

interface ChannelState {
  channelUser: ChannelUser | null;
  isLoading: boolean;
}

// Async thunk type (returns full Axios response)
export const ChannelApi = createAsyncThunk<
  any, // or more specific if needed, like AxiosResponse<{ data: ChannelUser }>
  { url: string; option: any }
>('ChannelApi', async ({ url, option }) => {
  const response = await axios.post(url, option, {
    withCredentials: true,
  });
  return response;
});

const initialState: ChannelState = {
  channelUser: null,
  isLoading: false,
};

const ChannelSlice = createSlice({
  name: 'visitingUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ChannelApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ChannelApi.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.channelUser = action.payload.data.data;
      console.log('state.channelUser', state.channelUser);
    });
    builder.addCase(ChannelApi.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default ChannelSlice.reducer;
