import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/constant";

const getUserChannelProfile = createAsyncThunk(
  "getuserchannelprofile",
  async (username) => {
    try {
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.get(
        `${server}/api/v1/users/c/${username}`,
        config
      );

      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const getUserWatchHistory = createAsyncThunk("getwatchhistory", async () => {
  try {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(`${server}/api/v1/users/history`, config);
   
    return data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export { getUserChannelProfile, getUserWatchHistory };
