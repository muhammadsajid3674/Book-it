'use client'
import { useGetBookingDetailsQuery } from '@/redux/services/booking.api';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const page = ({ params }) => {
    const { data: user } = useSession()
    const { data: booking } = useGetBookingDetailsQuery({ bookingId: params.id })
    const isPaid = booking?.data.paymentInfo && booking?.data.paymentInfo.status === 'paid' ? true : false
    return (
        <div className="container">
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 booking-details">
                    {booking?.data && booking?.data.room && booking?.data.user &&
                        <>
                            <h2 className="my-5">Booking # {booking?.data._id}</h2>
                            <h4 className="mb-4">User Info</h4>
                            <p><b>Name:</b> {booking?.data.user && booking?.data.user.name}</p>
                            <p><b>Email:</b> {booking?.data.user && booking?.data.user.email}</p>
                            <p><b>Amount:</b> ${booking?.data.amountPaid}</p>

                            <hr />

                            <h4 className="mb-4">Booking Info</h4>
                            <p><b>Check In:</b> {new Date(booking?.data.checkInDate).toLocaleString('en-US')}</p>

                            <p><b>Check Out:</b> {new Date(booking?.data.checkOutDate).toLocaleString('en-US')}</p>

                            <p><b>Days of Stay:</b> {booking?.data.daysOfStay}</p>

                            <hr />

                            <h4 className="my-4">Payment Status</h4>
                            <p className={isPaid ? 'greenColor' : 'redColor'}><b>{isPaid ? 'Paid' : 'Not Paid'}</b></p>

                            {user && user.role === 'admin' &&
                                <>
                                    <h4 className="my-4">Stripe Payment ID</h4>
                                    <p className='redColor'><b>{booking?.data.paymentInfo.id}</b></p>
                                </>
                            }

                            <h4 className="mt-5 mb-4">Booked Room:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                <div className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <Image
                                            src={booking?.data.room.images[0].url}
                                            alt={booking?.data.room.name}
                                            height={45}
                                            width={65}
                                        />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <Link href={`/room/${booking?.data.room._id}`}>{booking?.data.room.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>${booking?.data.room.pricePerNight}</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{booking?.data.daysOfStay} Day(s)</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default page