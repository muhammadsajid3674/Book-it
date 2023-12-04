import Bookings from "@/models/bookings";
import connectToDB from "@/utils/connectToDB";
import { getToken } from "next-auth/jwt";

export const POST = async (req) => {
    const session = await getToken({
        req: req,
        secret: process?.env?.NEXTAUTH_SECRET,
        cookieName: "next-auth.session-token",
    });
    const objToSend = await req.json();
    objToSend.user = session?._doc?._id
    try {
        await connectToDB();
        const booking = new Bookings(objToSend);
        await booking.save();
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
