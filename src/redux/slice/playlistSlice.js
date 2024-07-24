import { createSlice } from "@reduxjs/toolkit";
import {
  createPlaylist,
  getPlaylistById,
  getPlaylistByUser,
} from "../thunks/playlist";

const initialState = {
  loading: false,
  playlist: [],
  playlists: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload;
      })
      .addCase(getPlaylistByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlaylistByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload;
      })
      .addCase(getPlaylistById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPlaylistById.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload;
      });
  },
});

export default playlistSlice;
