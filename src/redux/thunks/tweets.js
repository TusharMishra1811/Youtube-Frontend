import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/constant";

const getUserTweets = createAsyncThunk("getusertweets", async (userId) => {
  const config = {
    withCredentials: true,
  };

  try {
    const { data } = await axios.get(
      `${server}/api/v1/tweets/user/${userId}`,
      config
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
});

const createTweet = createAsyncThunk("createtweet", async (content) => {
  const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.post(`${server}/api/v1/tweets`, content, config);

  return data?.data;
});

const updateTweets = createAsyncThunk(
  "edittweets",
  async ({ tweetId, content }) => {
    const config = {
      withCredentials: true,
    };
    try {
      const { data } = await axios.patch(
        `${server}/api/v1/tweets/${tweetId}`,
        content,
        config
      );
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

const deleteTweets = createAsyncThunk("deletetweets", async (tweetId) => {
  const config = {
    withCredentials: true,
  };

  try {
    const { data } = await axios.delete(`${server}/api/v1/${tweetId}`, config);
    return data?.data;
  } catch (error) {
    throw error;
  }
});

export { getUserTweets, createTweet, updateTweets, deleteTweets };
