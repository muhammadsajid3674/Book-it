import Room from "@/models/room";
import ApiFeatures from "@/utils/apiFeatures";
import connectToDB from "@/utils/connectToDB";

export const GET = async (req) => {
   try {
      const apiFeatures = new ApiFeatures(
         Room.find(),
         req.nextUrl.searchParams.get("location")
      ).search();
      const rooms = await apiFeatures.query;
      return new Response(
         JSON.stringify({ success: true, count: rooms.length, rooms }),
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
