import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
   reducerPath: "userApi",
   refetchOnFocus: true,
   baseQuery: fetchBaseQuery({
      baseUrl: process.env.BASE_URL,
      prepareHeaders: (headers) => {
         headers.set("Content-Type", "application/json;charset=UTF-8");

         return headers;
      },
   }),
   endpoints: (builder) => ({
      registerUser: builder.mutation({
         query: (body) => {
            return {
               url: "/auth/register",
               method: "POST",
               body,
            };
         },
      }),
      currentUser: builder.query({
         query: () => `/me`,
      }),
      updateProfile: builder.mutation({
         query: (body) => {
            return {
               url: "/me/update",
               method: "PATCH",
               body,
            };
         },
      }),
      forgotPassword: builder.mutation({
         query: (body) => {
            return {
               url: "/password/forgot",
               method: "PATCH",
               body,
            };
         },
      }),
      resetPassword: builder.mutation({
         query: (body) => {
            console.log("body :>> ", body);
            return {
               url: `/password/reset/?token=${body?.token}`,
               method: "PATCH",
               body,
            };
         },
      }),
   }),
});

export const {
   useRegisterUserMutation,
   useCurrentUserQuery,
   useUpdateProfileMutation,
   useForgotPasswordMutation,
   useResetPasswordMutation,
} = userApi;
