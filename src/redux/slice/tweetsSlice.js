import { createSlice } from "@reduxjs/toolkit";
import { createTweet, deleteTweets, getUserTweets } from "../thunks/tweets";

const initialState = {
  loading: false,
  tweets: [],
};

const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTweets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(createTweet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.loading = true;
        state.tweets.unshift(action.payload);
      })
      .addCase(deleteTweets.fulfilled, (action, payload) => {
        state.loading = false;
        state.tweets = state.tweets.filter(
          (tweet) => tweet._id !== action.payload
        );
      });
  },
});

export default tweetsSlice;
