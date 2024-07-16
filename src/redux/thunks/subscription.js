import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/constant";

const toggleSubscription = createAsyncThunk(
  "togglesubscription",
  async (channelId) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${server}/api/v1/subscriptions/c/${channelId}`,
        {},
        config
      );
      return data?.data.subscribed;
    } catch (error) {
      console.log(error);
    }
  }
);

const getUserChannelSubscribers = createAsyncThunk(
  "getuserchannelsubscribers",
  async (channelId) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${server}/api/v1/subscriptions/c/${channelId}`,
        config
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const getSubscribedChannels = createAsyncThunk(
  "getsubscribedchannels",
  async (subscriberId) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${server}/api/v1/subscriptions/u/${subscriberId}`,
        config
      );
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
