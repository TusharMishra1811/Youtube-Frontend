import { createSlice } from "@reduxjs/toolkit";
import { createPlaylist, getPlaylistByUser } from "../thunks/playlist";

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
      });
  },
});

export default playlistSlice;
