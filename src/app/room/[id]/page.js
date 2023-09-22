"use client";
import RoomDetailCmp from "@/components/Room/RoomDetailCmp";
import { useGetRoomByIdQuery } from "@/redux/services/room.api";

const RoomDetail = ({ params }) => {
   const { data } = useGetRoomByIdQuery(params?.id);
   return <RoomDetailCmp data={data} />;
};

export default RoomDetail;
