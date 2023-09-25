import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
   reducerPath: "userApi",
   refetchOnFocus: true,
   baseQuery: fetchBaseQuery({
      baseUrl: process.env.BASE_URL,
      prepareHeaders: (headers) => {
         headers.set("Content-Type", "application/json;charset=UTF-8");
         headers.set("Authorization", "anonymous");

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
   }),
});

export const { useRegisterUserMutation } = userApi;
