import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/constant";

const getChannelStats = createAsyncThunk("getchannelstats", async () => {
  const config = {
    withCredentials: true,
  };

  try {
    const { data } = await axios.get(
      `${server}/api/v1/dashboard/stats`,
      config
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
});

const getChannelVideos = createAsyncThunk("getchannelvideos", async () => {
  const config = {
    withCredentials: true,
  };

  try {
    const { data } = await axios.get(
      `${server}/api/v1/dashboard/videos`,
      config
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
});

export { getChannelStats, getChannelVideos };
