import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const commonApi = createApi({
   reducerPath: "api",
   baseQuery: fetchBaseQuery({
      baseUrl: process.env.BASE_URL,
      prepareHeaders: (headers) => {
         headers.set("Content-Type", "application/json;charset=UTF-8");
         headers.set("Authorization", "anonymous");

         return headers;
      },
   }),
   tagTypes: ["Room"],
   endpoints: (_) => ({}),
});
