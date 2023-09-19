import Room from "@/models/room";
import connectToDB from "@/utils/connectToDB";

// GET (read)
export const GET = async (req, { params }) => {
   try {
      await connectToDB();
      const room = await Room.findById(params.id);
      if (!room)
         return new Response(
            JSON.stringify({ success: false, error: "room not found" }),
            { status: 404 }
         );
      return new Response(JSON.stringify({ success: true, room }), {
         status: 200,
      });
   } catch (error) {
      return new Response(
         JSON.stringify({ success: false, error: error.message }),
         { status: 500 }
      );
   }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
   const objToSend = await req.json();
   try {
      await connectToDB();
      let room = await Room.findById(params.id);
      if (!room)
         return new Response(
            JSON.stringify({ success: false, error: "room not found" }),
            { status: 404 }
         );
      room = await Room.findByIdAndUpdate(params.id, objToSend, {
         new: true,
      });
      return new Response(JSON.stringify({ success: true, room }), {
         status: 200,
      });
   } catch (error) {
      return new Response(
         JSON.stringify({ success: false, error: error.message }),
         { status: 500 }
      );
   }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
   try {
      await connectToDB();
      await Room.findByIdAndRemove(params.id);
      return new Response(
         JSON.stringify({
            success: true,
            message: "Room deleted successfully",
         }),
         { status: 200 }
      );
   } catch (error) {
      return new Response(
         JSON.stringify({ success: false, error: error.message }),
         { status: 500 }
      );
   }
};
