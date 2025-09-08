import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UnreadState {
  count: number;
  isLoading: boolean;
}

export const fetchUnreadCount = createAsyncThunk<number>(
  "unreadCount/fetchUnreadCount",
  async () => {
    const response = await axios.get("http://localhost:8001/api/v1/conversations/unread-count", {
      withCredentials: true,
    });
    return response.data.unreadCount;
  }
);

const initialState: UnreadState = {
  count: 0,
  isLoading: false,
};

const unreadSlice = createSlice({
  name: "unreadCount",
  initialState,
  reducers: {
    resetUnreadCount: (state) => {
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUnreadCount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUnreadCount.fulfilled, (state, action: PayloadAction<number>) => {
      state.count = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUnreadCount.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { resetUnreadCount } = unreadSlice.actions;
export default unreadSlice.reducer;
