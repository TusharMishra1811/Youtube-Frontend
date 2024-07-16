import { createSlice } from "@reduxjs/toolkit";
import { getLikedVideos } from "../thunks/like";

const initialState = {
  loading: false,
  likedVideos: [],
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLikedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.likedVideos = action.payload;
      });
  },
});

export default likeSlice;
