// import { createSlice } from '@reduxjs/toolkit';

// const FetchVidUserSlice = createSlice({
//   name: 'FetchVideoUser',
//   initialState: { 
//     FetchVideodata:null,
//     isLoading:false,
// },
//   reducers: {
//     Add(state,action) {
//       state.FetchVideodata=action.payload;
//       state.isLoading=false,
//     },
//     // Remove(state,action) {
//     //     state.Favdata = state.Favdata.filter(item => item.name !== action.payload.name);
//     // },
//   },
// });

// export const { Add } = FetchVidUserSlice.actions;
// export default FetchVidUserSlice.reducer;



import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define your video data structure (replace with actual shape from backend)
interface Video {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  // Add any other fields you need
}

interface FetchVideoUserState {
  FetchVideodata: Video[] | null;
  isLoading: boolean;
}

const initialState: FetchVideoUserState = {
  FetchVideodata: null,
  isLoading: false,
};

const FetchVidUserSlice = createSlice({
  name: 'FetchVideoUser',
  initialState,
  reducers: {
    Add(state, action: PayloadAction<Video[]>) {
      state.FetchVideodata = action.payload;
      state.isLoading = false;
    },
    // Add other reducers here like Remove, Update, etc.
  },
});

export const { Add } = FetchVidUserSlice.actions;
export default FetchVidUserSlice.reducer;

