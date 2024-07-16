import { createSlice } from "@reduxjs/toolkit";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../thunks/subscription";

const initialState = {
  loading: false,
  subscribed: null,
  subscribers: [],
  subscribed: [],
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribed = action.payload;
      })
      .addCase(getUserChannelSubscribers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserChannelSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribers = action.payload;
      })
      .addCase(getSubscribedChannels.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSubscribedChannels.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribed = action.payload.filter(
          (subscription) => subscription?.subscribedChannel?.latestVideo
        );
      });
  },
});

export default subscriptionSlice;
