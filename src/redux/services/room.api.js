import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
   reducerPath: "userApi",
   refetchOnFocus: true,
   baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3000/api",
   }),
   endpoints: (builder) => ({
      getRoom: builder.query({
         query: () => "/room",
      }),
      getRoomById: builder.query({
         query: (id) => `/room/${id}`,
      }),
   }),
});

export const { useGetRoomQuery, useGetRoomByIdQuery } = userApi;
