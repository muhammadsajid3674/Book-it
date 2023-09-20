import Room from "@/models/room";
import ApiFeatures from "@/utils/apiFeatures";
import connectToDB from "@/utils/connectToDB";

export const GET = async (req) => {
   // ? As of Next.js 13.4 you can get search params like this from the url:
   const queryParams = Object.fromEntries(req.nextUrl.searchParams);
   try {
      await connectToDB();
      const resPerPage = 4;
      const roomsCount = await Room.countDocuments();
      const apiFeatures = new ApiFeatures(Room.find(), queryParams)
         .search()
         .filter()
         .pagination(resPerPage);

      apiFeatures;
      let rooms = await apiFeatures.query;
      let filteredRoomCount = rooms.length;

      return new Response(
         JSON.stringify({
            success: true,
            roomsCount,
            resPerPage,
            filteredRoomCount,
            rooms,
         }),
         {
            status: 200,
         }
      );
   } catch (error) {
      return new Response(
         JSON.stringify({ success: false, error: error.message }),
         { status: 500 }
      );
   }
};

export const POST = async (req) => {
   const objToSend = await req.json();
   try {
      await connectToDB();
      const room = new Room(objToSend);
      await room.save();
      return new Response(JSON.stringify({ success: true, room }), {
         status: 201,
      });
   } catch (error) {
      return new Response(
         JSON.stringify({ success: false, error: error.message }),
         { status: 500 }
      );
   }
};
