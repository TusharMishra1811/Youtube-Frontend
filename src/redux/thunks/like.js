import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/constant";

const toggleVideoLikes = createAsyncThunk(
  "toggleVideoLikes",
  async (videoId) => {
    const config = {
      withCredentials: true,
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/likes/toggle/v/${videoId}`,{},
        config
      );
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

const toggleCommentLikes = createAsyncThunk(
  "toggleCommentLikes",
  async (commentId) => {
    const config = {
      withCredentials: true,
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/likes/toggle/c/${commentId}`,{},
        config
      );
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);
const toggleTweetLikes = createAsyncThunk(
  "toggleTweetLikes",
  async (tweetId) => {
    const config = {
      withCredentials: true,
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/likes/toggle/t/${tweetId}`,{},
        config
      );
      return data?.data;
    } catch (error) {

      throw error;
    }
  }
);

const getLikedVideos = createAsyncThunk("getLikedVideos", async () => {
  const config = {
    withCredentials: true,
  };
  try {
    const { data } = await axios.get(`${server}/api/v1/likes/videos`, config);
    return data?.data;
  } catch (error) {
    throw error;
  }
});

export {
  toggleCommentLikes,
  toggleTweetLikes,
  toggleVideoLikes,
  getLikedVideos,
};
