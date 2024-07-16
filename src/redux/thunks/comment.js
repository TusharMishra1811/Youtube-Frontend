import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/constant";

const createComment = createAsyncThunk(
  "createComment",
  async ({ videoId, content }) => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/comments/${videoId}`,
        { content },
        config
      );

      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

const updateComment = createAsyncThunk(
  "updateComment",
  async ({ commentId, updatedContent }) => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.patch(
        `${server}/api/v1/comments/c/${commentId}`,
        { updatedContent },
        config
      );

      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

const deleteComment = createAsyncThunk("deleteComment", async (commentId) => {
  const config = {
    withCredentials: true,
  };

  try {
    const { data } = await axios.delete(
      `${server}/api/v1/comments/c/${commentId}`,
      config
    );

    return data?.data;
  } catch (error) {
    throw error;
  }
});

const getComment = createAsyncThunk(
  "getComment",
  async ({ videoId, page, limit }) => {
    const config = {
      withCredentials: true,
    };


    const url = new URL(`${server}/api/v1/comments/${videoId}`);
    if (page) url.searchParams.set("page", page);
    if (limit) url.searchParams.set("limit", limit);

    try {
      const { data } = await axios.get(url, config);
      return data?.data;
    } catch (error) {
      throw error;
    }
  }
);

export { createComment, updateComment, deleteComment, getComment };
