import Bookings from "@/models/bookings";
import Room from "@/models/room";
import User from "@/models/user";
import connectToDB from "@/utils/connectToDB";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const booking = await Bookings.findById(params?.id).populate({ path: 'room', select: 'name pricePerNight images', model: Room }).populate({ path: 'user', select: 'name email', model: User });
        return new Response(JSON.stringify({ success: true, data: booking }), {
            status: 201,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500 }
        );
    }
};