import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
    reducerPath: "bookingApi",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.BASE_URL,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json;charset=UTF-8");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        addNewBooking: builder.mutation({
            query: (body) => {
                return {
                    url: "/booking",
                    method: "POST",
                    body,
                };
            },
        }),
        checkRoomBookingAvailability: builder.query({
            query: (q) => {
                let { roomId, checkInDate, checkOutDate } = q;
                let link = `/booking/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
                return link;
            },
        }),
    }),
});

export const { useAddNewBookingMutation, useLazyCheckRoomBookingAvailabilityQuery, usePrefetch } = bookingApi;
