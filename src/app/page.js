"use client";
import Home from "@/components/Home";
import { useRoomList } from "@/utils/hooks/useRoomList";

export const metadata = {
   title: "Book it | Home Page",
   description: "Book Best Hotels for your Holiday",
};

export default function Index() {
   const { loading, ref, rooms } = useRoomList();
   return <Home isLoading={loading} rooms={rooms} />;
}
