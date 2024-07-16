import { createSlice } from "@reduxjs/toolkit";
import { getUserChannelProfile, getUserWatchHistory } from "../thunks/user";

const initialState = {
  loading: false,
  profileData: null,
  history: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserChannelProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserChannelProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(getUserWatchHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserWatchHistory.fulfilled, (state, action) => {
        (state.loading = false), (state.history = action.payload);
      });
  },
});

export default userSlice;
