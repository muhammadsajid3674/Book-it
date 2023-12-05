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
        getUserBookings: builder.query({
            query: (q) => {
                let link = `/booking`;
                return link;
            },
        }),
        getBookingDetails: builder.query({
            query: (q) => {
                const { bookingId } = q
                let link = `/booking/${bookingId}`;
                return link;
            },
        }),
        checkRoomBookingAvailability: builder.query({
            query: (q) => {
                let { roomId, checkInDate, checkOutDate } = q;
                let link = `/booking/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
                return link;
            },
        }),
        checkRoomBookedDates: builder.query({
            query: (q) => {
                let { roomId } = q;
                let link = `/booking/check-booked-dates?roomId=${roomId}`;
                return link;
            },
        }),
    }),
});

export const { useAddNewBookingMutation, useLazyCheckRoomBookingAvailabilityQuery, useLazyCheckRoomBookedDatesQuery, useGetUserBookingsQuery, useGetBookingDetailsQuery, usePrefetch } = bookingApi;
