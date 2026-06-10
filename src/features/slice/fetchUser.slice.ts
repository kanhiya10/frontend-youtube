
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

// Define the shape of your user object (based on your backend response)
interface User {
  _id: string;
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

// If your backend response looks like { data: { user: User, accessToken: string, ... } }
interface LoginResponse {
  data: {
    user: User;
    accessToken: string;
    refreshToken?: string;
    message?: string;
    statusCode?: number;
    success?: boolean;
    // Add any other fields returned by your backend
  };
}

export const UserApi = createAsyncThunk<
  LoginResponse, // Thunk return type
  LoginOption    // Thunk argument type
>('UserApi', async ({ url, option }) => {
  const response = await axios.post(url, option, {
    withCredentials: true,
  });
  return response.data;
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
    setUserFromAuth: (state, action: PayloadAction<User>) => {
      state.info = action.payload; // ✅ set user manually (Google login)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UserApi.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      state.isLoading = false;
      console.log("UserApi fulfilled with response:", action.payload);
      console.log("action.payload.data in response:", action.payload.data);
      state.info = action.payload.data.user;
    });
    builder.addCase(UserApi.rejected, (state) => {
      state.isLoading = false;
      console.error("UserApi rejected:");
    });
  },
});

export const { resetInfo,setUserFromAuth } = UserSlice.actions;
export default UserSlice.reducer;
