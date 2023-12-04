import Bookings from "@/models/bookings";
import connectToDB from "@/utils/connectToDB";

export const GET = async (req) => {
    // ? As of Next.js 13.4 you can get search params like this from the url:
    const queryParams = Object.fromEntries(req.nextUrl.searchParams);
    let { roomId, checkInDate, checkOutDate } = queryParams;
    checkInDate = new Date(checkInDate)
    checkOutDate = new Date(checkOutDate)
    try {
        await connectToDB();
        const booking = await Bookings.find({
            room: roomId,
            $and: [{
                checkInDate: {
                    $lte: checkOutDate
                },
            }, {
                checkOutDate: {
                    $gte: checkInDate
                },
            }]
        });
        let isAvailable;
        if (booking && booking.length === 0) {
            isAvailable = false;
        } else {
            isAvailable = true;
        }
        return new Response(JSON.stringify({ success: true, isAvailable }), {
            status: 201,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500 }
        );
    }
};