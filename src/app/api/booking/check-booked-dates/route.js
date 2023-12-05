import Bookings from "@/models/bookings";
import connectToDB from "@/utils/connectToDB";
import Moment from "moment";
import { extendMoment } from "moment-range";
import mongoose from "mongoose";

const moment = extendMoment(Moment);

export const GET = async (req) => {
    // ? As of Next.js 13.4 you can get search params like this from the url:
    const queryParams = Object.fromEntries(req.nextUrl.searchParams);
    let { roomId } = queryParams;
    console.log('queryParams :>> ', queryParams);
    try {
        await connectToDB();
        const bookings = await Bookings.find({ room: roomId })
        console.log('bookings :>> ', bookings);
        let bookedDates = [];
        const timeDifference = moment().utcOffset() / 60;
        console.log('timeDifference :>> ', timeDifference);
        bookings.forEach(booking => {
            const checkInDate = moment(booking.checkInDate).add(timeDifference, 'hours')
            const checkOutDate = moment(booking.checkOutDate).add(timeDifference, 'hours')
            console.log('range :>> ', { checkInDate, checkOutDate });
            const range = moment.range(moment(checkInDate), moment(checkOutDate));
            const dates = Array.from(range.by('day'));
            bookedDates = bookedDates.concat(dates)
        })
        console.log('bookedDates :>> ', bookedDates);
        return new Response(JSON.stringify({ success: true, bookedDates }), {
            status: 201,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500 }
        );
    }
};