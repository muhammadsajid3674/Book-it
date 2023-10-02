import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
   reducerPath: "roomApi",
   refetchOnFocus: true,
   baseQuery: fetchBaseQuery({
      baseUrl: process.env.BASE_URL,
      prepareHeaders: (headers) => {
         headers.set("Content-Type", "application/json;charset=UTF-8");

         return headers;
      },
   }),
   endpoints: (builder) => ({
      getRoom: builder.query({
         query: ({ page, location, guestCapacity, category }) => {
            let link = `/room?page=${page}&location=${location}`;
            if (guestCapacity)
               link = link.concat(`&guestCapacity=${guestCapacity}`);
            if (category) link = link.concat(`&category=${category}`);
            return link;
         },
      }),
      getRoomById: builder.query({
         query: (id) => `/room/${id}`,
      }),
   }),
});

export const { useGetRoomQuery, useGetRoomByIdQuery, usePrefetch } = roomApi;
