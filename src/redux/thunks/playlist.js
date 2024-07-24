import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/constant";

const createPlaylist = createAsyncThunk(
  "createPlaylist",
  async ({ name, description = "Default Description" }) => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/playlist/`,
        { name, description },
        config
      );
      console.log(data?.data);
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

const getPlaylistByUser = createAsyncThunk(
  "getplaylistbyuser",
  async (userId) => {
    const config = {
      withCredentials: true,
    };

    try {
      const { data } = await axios.get(
        `${server}/api/v1/playlist/user/${userId}`,
        config
      );

      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

const getPlaylistById = createAsyncThunk(
  "getPlaylistById",
  async (playlistId) => {
    const config = {
      withCredentials: true,
    };
    try {
      const { data } = await axios.get(
        `${server}/api/v1/playlist/${playlistId}`,
        config
      );
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

const addVideoToPlaylist = createAsyncThunk(
  "addVideoToPlaylist",
  async ({ playlistId, videoId }) => {
    const config = {
      withCredentials: true,
    };

    try {
      console.log(playlistId, videoId);
      const { data } = await axios.patch(
        `${server}/api/v1/playlist/add/${playlistId}/${videoId}`,
        {},
        config
      );
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

const removeVideoFromPlaylist = createAsyncThunk(
  "removeVideoFromPlaylist",
  async ({ playlistId, videoId }) => {
    const config = {
      withCredentials: true,
    };

    try {
      const { data } = await axios.patch(
        `${server}/api/v1/playlist/remove/${playlistId}/${videoId}`,
        {},
        config
      );
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const deletePlaylist = createAsyncThunk(
  "deletePlaylist",
  async (playlistId) => {
    const config = {
      withCredentials: true,
    };

    try {
      console.log(playlistId);
      const { data } = await axios.delete(
        `${server}/api/v1/playlist/${playlistId}`,
        config
      );
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

const updatePlaylist = createAsyncThunk(
  "updatePlaylist",
  async ({ playlistId, updatedData }) => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.patch(
        `${server}/api/v1/playlist/${playlistId}`,
        updatedData,
        config
      );
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

export {
  createPlaylist,
  getPlaylistByUser,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
