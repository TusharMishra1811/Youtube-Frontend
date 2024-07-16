import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/constant.js";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["User", "Video"],

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "users/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
    }),

    updateAvatar: builder.mutation({
      query: (data) => ({
        url: "users/avatar",
        method: "PATCH",
        body: data,
      }),
    }),

    updateCoverImage: builder.mutation({
      query: (data) => ({
        url: "users/cover-image",
        method: "PATCH",
        body: data,
      }),
    }),

    updateUserDetails: builder.mutation({
      query: (data) => ({
        url: "users/update-account",
        method: "PATCH",
        body: data,
      }),
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: "users/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export default api;
export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateAvatarMutation,
  useUpdateCoverImageMutation,
  useUpdateUserDetailsMutation,
  useUpdatePasswordMutation,
} = api;
