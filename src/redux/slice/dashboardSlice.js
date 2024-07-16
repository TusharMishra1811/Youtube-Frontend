import { createSlice } from "@reduxjs/toolkit";
import { getChannelStats, getChannelVideos } from "../thunks/dashboard";

const initialState = {
  loading: false,
  channelVideos: [],
  channelStats: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChannelStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChannelStats.fulfilled, (state, action) => {
        state.loading = false;
        state.channelStats = action.payload;
      })
      .addCase(getChannelVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChannelVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.channelVideos = action.payload;
      });
  },
});

export default dashboardSlice;
