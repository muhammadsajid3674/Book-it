import { commonApi } from "../common.api";

export const roomApi = commonApi.injectEndpoints({
   endpoints: (build) => ({
      fetchRoomList: build.query({
         query: () => ({
            url: "/room",
         }),
         keepUnusedDataFor: 5,
         providesTags: (result) => [{ type: "Room" }],
      }),
   }),
});
