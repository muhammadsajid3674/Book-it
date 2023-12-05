import Bookings from "@/models/bookings";
import User from "@/models/user";
import connectToDB from "@/utils/connectToDB";
import { headers } from 'next/headers';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


export const config = {
    api: {
        bodyParser: false,
    }
}

export const POST = async (req) => {
    const rawBody = await req.text();

    // const rawBody = await buffer(req);
    console.log('rawBody :>> ', rawBody);
    try {
        await connectToDB();
        const headersList = headers();
        const signature = headersList.get("stripe-signature");
        console.log('signature :>> ', signature);
        const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
        console.log('event :>> ', event);
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const room = session.client_reference_id;
            const user = (await User.findOne({ email: session.customer_email }))._id
            console.log('user :>> ', user);
            const amountPaid = session.amount_total / 100;
            const paymentInfo = { id: session.payment_intent, status: session.payment_status }
            const checkInDate = session.metadata.checkInDate;
            const checkOutDate = session.metadata.checkOutDate;
            const daysOfStay = session.metadata.daysOfStay;
            const booking = new Bookings({ room, user, amountPaid, paymentInfo, checkInDate, checkOutDate, daysOfStay });
            await booking.save();
            return new Response(JSON.stringify({ success: true, data: booking }), {
                status: 201,
            });
        }
    } catch (error) {
        console.log('error :>> ', error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500 }
        );
    }
};
