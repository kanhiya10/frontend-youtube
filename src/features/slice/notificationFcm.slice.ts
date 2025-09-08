import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "firebase/messaging";
import { messaging } from "../../firebase"; // adjust path
import { AppDispatch } from "../../store";

const VAPID_KEY = 'BF4TFslNWwWhxOeWb060JYTlx82keMX02npTdIaqlRfmUy2qfCJXd70_WJox3on_hoRxxgrbWccmzv0_WVhTjQI';

interface NotificationState {
  token: string;
  permission: NotificationPermission;
  isLoading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  token: localStorage.getItem("fcmToken") || "",
  permission: Notification.permission,
  isLoading: false,
  error: null,
};

 

export const initNotificationsAfterLogin = () => async (dispatch: AppDispatch) => {
  if (Notification.permission === "granted") {
    await dispatch(registerFcmToken());
  } else {
  }
};

// 🔹 Request and register a token
export const registerFcmToken = createAsyncThunk<string | null>(
  "notifications/registerFcmToken",
  async (_, { rejectWithValue }) => {
    try {
        const registration = await navigator.serviceWorker.ready;
      const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: registration });
      if (fcmToken) {
        await axios.post(
          "http://localhost:8001/api/v1/notifications/save-token",
          { token: fcmToken, platform: "web" },
          { withCredentials: true }
        );
        return fcmToken;
      }
      return null;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to register FCM token");
    }
  }
);

// 🔹 Remove token on logout / disable
export const removeFcmToken = createAsyncThunk<string, string>(
  "notifications/removeFcmToken",
  async (token, { rejectWithValue }) => {
    try {
      await axios.post(
        "http://localhost:8001/api/v1/notifications/deactivate-token",
        { token },
        { withCredentials: true }
      );
      return token;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to remove FCM token");
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setPermission: (state, action: PayloadAction<NotificationPermission>) => {
      state.permission = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register token
    builder.addCase(registerFcmToken.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerFcmToken.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.token = action.payload;
        localStorage.setItem("fcmToken", action.payload);
      }
    });
    builder.addCase(registerFcmToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Remove token
    builder.addCase(removeFcmToken.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeFcmToken.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.token === action.payload) {
        state.token = "";
        localStorage.removeItem("fcmToken");
      }
    });
    builder.addCase(removeFcmToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setPermission } = notificationSlice.actions;
export default notificationSlice.reducer;
