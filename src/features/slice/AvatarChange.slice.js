// import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
// import axios from "axios";

// export const AvatarApi=createAsyncThunk("AvatarApi",async({ url, formData,headers })=>{
//     const response=await axios.patch(url,formData,headers);
//     return response.data;
// })

// const AvatarSlice=createSlice({
//     name:"NewAvatar",
//     initialState:{
//         avatar:{},
//         AvatarLoading:false,
//     },
//     extraReducers:(builder)=>{
//         builder.addCase(AvatarApi.pending,(state)=>{
//             state.AvatarLoading=true;
//         });
//         builder.addCase(AvatarApi.fulfilled,(state,action)=>{
//             state.AvatarLoading=false;
//             state.avatar=action.payload;
//         })
//         builder.addCase(AvatarApi.rejected,(state)=>{
//             state.AvatarLoading=false
//         })
//     }
// })

// export default AvatarSlice.reducer;