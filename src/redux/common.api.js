import {
   buildCreateApi,
   coreModule,
   fetchBaseQuery,
   reactHooksModule,
} from "@reduxjs/toolkit/dist/query/react";
const createApi = buildCreateApi(
   coreModule(),
   reactHooksModule({ unstable__sideEffectsInRender: true })
);
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
