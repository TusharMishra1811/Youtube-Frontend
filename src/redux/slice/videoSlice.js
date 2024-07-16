import { createSlice } from "@reduxjs/toolkit";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishVideo,
  togglePublish,
  updateVideo,
} from "../thunks/video";

const initialState = {
  loading: false,
  uploading: false,
  uploaded: false,
  videos: {
    docs: [],
    hasNextPage: false,
  },
  video: null,
  publishToggled: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    makeVideosNull: (state) => {
      state.videos.docs = [];
    },
    updateUploadState: (state) => {
      state.uploading = false;
      state.uploaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllVideos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.docs = action.payload.docs;
        state.videos.hasNextPage = action.payload.hasNextPage;
      })
      .addCase(publishVideo.pending, (state, action) => {
        state.uploading = true;
      })
      .addCase(publishVideo.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploaded = true;
      })
      .addCase(updateVideo.pending, (state, action) => {
        state.uploading = true;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploaded = true;
      })
      .addCase(deleteVideo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getVideoById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
      })
      .addCase(togglePublish.fulfilled, (state) => {
        state.publishToggled = !state.publishToggled;
      });
  },
});

export default videoSlice;
export const { makeVideosNull, updateUploadState } = videoSlice.actions;
