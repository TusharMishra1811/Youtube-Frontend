import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api.js";
import authSlice from "./slice/authSlice";
import videoSlice from "./slice/videoSlice.js";
import userSlice from "./slice/userSlice.js";
import subscriptionSlice from "./slice/subscriptionSlice.js";
import playlistSlice from "./slice/playlistSlice.js";
import tweetsSlice from "./slice/tweetsSlice.js";
import commentSlice from "./slice/commentSlice.js";
import likeSlice from "./slice/likeSlice.js";
import dashboardSlice from "./slice/dashboardSlice.js";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authSlice.name]: authSlice.reducer,
    [videoSlice.name]: videoSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [subscriptionSlice.name]: subscriptionSlice.reducer,
    [playlistSlice.name]: playlistSlice.reducer,
    [tweetsSlice.name]: tweetsSlice.reducer,
    [commentSlice.name]: commentSlice.reducer,
    [likeSlice.name]: likeSlice.reducer,
    [dashboardSlice.name]: dashboardSlice.reducer,
  },
  middleware: (defaultMiddleware) => [...defaultMiddleware(), api.middleware],
});

export default store;
