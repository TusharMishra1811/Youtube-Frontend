import { createSlice } from "@reduxjs/toolkit";
import { createComment, deleteComment, getComment } from "../thunks/comment";

const initialState = {
  loading: false,
  comments: [],
  totalComments: null,
  hasNextPage: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    cleanUpComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload);
        state.totalComments++;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload.commentId
        );
        state.totalComments--;
      })
      .addCase(getComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComment.fulfilled, (state, action) => {
        (state.loading = false),
          (state.comments = [...state.comments, ...action.payload.docs]);
        state.totalComments = action.payload.totalDocs;
        state.hasNextPage = action.payload.hasNextPage;
      });
  },
});

export default commentSlice;

export const { cleanUpComments } = commentSlice.actions;
