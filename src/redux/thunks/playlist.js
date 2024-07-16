import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/constant";

const createPlaylist = createAsyncThunk(
  "createPlaylist",
  async ({ name, description }) => {
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

export { createPlaylist, getPlaylistByUser };
