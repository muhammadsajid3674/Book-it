'use client'
import { roomApi } from "@/redux/api/room.api";
import { useRef } from "react";

export function useRoomList() {
   const { data: rooms = [], isLoading: roomLoading } =
      roomApi.useFetchRoomListQuery();

   const ref = useRef(null);

   const loading = roomLoading;
   return {
      ref,
      rooms,
      loading,
   };
}
