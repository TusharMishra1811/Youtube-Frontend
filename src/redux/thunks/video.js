import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../constants/constant";
import axios from "axios";

const getAllVideos = createAsyncThunk(
  "/getallvideos",
  async ({ userId, query, sortBy, sortType, page, limit }) => {
    const config = {
      withCredentials: true,
    };

    try {
      const url = new URL(`${server}/api/v1/videos`);
      if (userId) {
        url.searchParams.set("userId", userId);
      }
      if (query) {
        url.searchParams.set("query", query);
      }
      if (page) {
        url.searchParams.set("page", page);
      }
      if (limit) {
        url.searchParams.set("limit", limit);
      }
      if (sortBy && sortType) {
        url.searchParams.set("sortBy", sortBy);
        url.searchParams.set("sortType", sortType);
      }
      const { data } = await axios.get(url, config);
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

const getVideoById = createAsyncThunk("/getvideobyid", async ({ videoId }) => {
  const config = {
    withCredentials: true,
  };

  try {
    const { data } = await axios.get(
      `${server}/api/v1/videos/${videoId}`,
      config
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
});

const publishVideo = createAsyncThunk("/publishvideo", async (data) => {
  const config = {
    withCredentials: true,
  };

  const myForm = new FormData();
  myForm.append("title", data.title);
  myForm.append("description", data.description);
  myForm.append("videoFile", data.videoFile[0]);
  myForm.append("thumbnail", data.thumbnail);

  try {
    const { data } = await axios.post(
      `${server}/api/v1/videos`,
      myForm,
      config
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
});

const updateVideo = createAsyncThunk(
  "/updatevideo",
  async ({ videoId, data }) => {
    const config = {
      withCredentials: true,
    };

    console.log(data);

    console.log(videoId);

    const myForm = new FormData();
    myForm.append("title", data?.title);
    myForm.append("description", data?.description);
    myForm.append("thumbnail", data?.thumbnail);

    try {
      const { data } = await axios.patch(
        `${server}/api/v1/videos/${videoId}`,
        myForm,
        config
      );
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

const deleteVideo = createAsyncThunk("/deletevideo", async (videoId) => {
  const config = {
    withCredentials: true,
  };

  try {
    const { data } = await axios.delete(
      `${server}/api/v1/videos/${videoId}`,
      config
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
});

const togglePublish = createAsyncThunk("/togglepublish", async (videoId) => {
  const config = {
    withCredentials: true,
  };

  try {
    const { data } = await axios.patch(
      `${server}/api/v1/videos/toggle/publish/${videoId}`,
      {},
      config
    );
    return data?.data;
  } catch (error) {
    throw error;
  }
});

export {
  getAllVideos,
  getVideoById,
  publishVideo,
  updateVideo,
  deleteVideo,
  togglePublish,
};
