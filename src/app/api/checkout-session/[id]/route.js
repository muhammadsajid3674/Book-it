import Bookings from "@/models/bookings";
import Room from "@/models/room";
import User from "@/models/user";
import connectToDB from "@/utils/connectToDB";
import absoluteUrl from "next-absolute-url";
import { getToken } from "next-auth/jwt";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const GET = async (req, { params }) => {
    const { id: roomId } = params;
    // * Get origin
    const { origin } = absoluteUrl(req);
    // * Get Current User
    const currentUser = await getToken({
        req: req,
        secret: process?.env?.NEXTAUTH_SECRET,
        cookieName: "next-auth.session-token",
    });
    // * Get query params
    const queryParams = Object.fromEntries(req.nextUrl.searchParams);
    const { checkInDate, checkOutDate, daysOfStay, amount } = queryParams
    try {
        await connectToDB();
        // * Get Room Details
        const room = await Room.findById(roomId)

        // * Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${origin}/bookings/me`,
            cancel_url: `${origin}/room/${room._id}`,
            customer_email: currentUser.email,
            client_reference_id: roomId,
            metadata: { checkInDate, checkOutDate, daysOfStay },
            line_items: [
                {
                    price_data: {
                        unit_amount: amount * 100,
                        currency: 'usd',
                        product_data: {
                            name: room.name,
                            images: [`${room.images[0].url}`],
                        },
                    },

                    quantity: 1
                }
            ],
            mode: 'payment'
        })
        return new Response(JSON.stringify({ success: true, data: session }), {
            status: 201,
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500 }
        );
    }
};