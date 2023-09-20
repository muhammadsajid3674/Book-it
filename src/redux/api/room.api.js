import { commonApi } from "../common.api";

export const roomApi = commonApi.injectEndpoints({
   endpoints: (build) => ({
      fetchRoomList: build.query({
         query: () => "room",
         providesTags: (result) => [{ type: "Room" }],
      }),
   }),
});
