'use client'
import Image from "next/image";
import RoomFeatures from "./RoomFeatures";
import { useEffect, useState } from "react";
import { useAddNewBookingMutation, useLazyCheckRoomBookedDatesQuery, useLazyCheckRoomBookingAvailabilityQuery } from "@/redux/services/booking.api";
import { useSession } from "next-auth/react";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import getStripe from "@/utils/getStripe";

const RoomDetailCmp = ({ data, params }) => {
   const { data: session, status } = useSession()
   const [addNewBooking] = useAddNewBookingMutation()
   const [checkInDate, setCheckInDate] = useState(null)
   const [checkOutDate, setCheckOutDate] = useState(null)
   const [daysOfStay, setDaysOfStay] = useState(null)
   const [paymentLoading, setPaymentLoading] = useState(false)
   const [checkRoomBookingAvailability, { data: result }] = useLazyCheckRoomBookingAvailabilityQuery()
   const [checkRoomBookedDates, { data: roomDates }] = useLazyCheckRoomBookedDatesQuery()

   let excludedDates = []
   roomDates?.bookedDates.forEach(date => excludedDates.push(new Date(date)))

   const handleDateRange = (dates) => {
      const [checkInDate, checkOutDate] = dates
      setCheckInDate(checkInDate)
      setCheckOutDate(checkOutDate)
      if (checkOutDate && checkInDate) {
         const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1)
         setDaysOfStay(days)
         checkRoomBookingAvailability({ roomId: params.id, checkInDate: checkInDate.toISOString(), checkOutDate: checkOutDate.toISOString() })
      }
   }

   const newBooking = async () => {
      const bookingData = {
         room: params.id,
         checkInDate,
         checkOutDate,
         daysOfStay,
         amountPaid: 90,
         paymentInfo: {
            id: 'STRIPE_PAYMENT_id',
            status: 'STRIPE_PAYMENT_STATUS'
         }
      }
      const result = await addNewBooking(bookingData)
      console.log('result :>> ', result);
   }

   const bookRoom = async (id, pricePerNight) => {
      setPaymentLoading(true);
      const amount = pricePerNight * daysOfStay;
      try {
         const link = `${process.env.BASE_URL}/checkout-session/${id}?amount=${amount}&checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`
         const response = await fetch(link)
         const result = await response.json()
         const stripe = await getStripe()
         stripe.redirectToCheckout({ sessionId: result?.data?.id })
         console.log('result :>> ', result);
         setPaymentLoading(false);
      } catch (error) {
         setPaymentLoading(false);
         console.log('error :>> ', error.message);
      }
   }


   useEffect(() => {
      checkRoomBookedDates({ roomId: params.id })
   }, [status])

   return (
      <div className='container'>
         <h2 className='mt-5'>{data?.room?.name}</h2>
         <div className='ratings mt-auto mb-3'>
            <div className='rating-outer'>
               <div className='rating-inner'></div>
            </div>
            <span id='no_of_reviews'>({data?.room?.numOfReviews} Reviews)</span>
         </div>
         <Image
            src={data?.room?.images?.[0]?.url}
            alt='Hotel'
            width={250}
            height={250}
         />
         <div className='row my-5'>
            <div className='col-12 col-md-6 col-lg-8'>
               <h3>Description</h3>
               <p> {data?.room?.description}</p>

               <RoomFeatures room={data?.room} />
            </div>

            <div className='col-12 col-md-6 col-lg-4'>
               <div className='booking-card shadow-lg p-4'>
                  <p className='price-per-night'>
                     <b>${data?.room?.pricePerNight}</b> / night
                  </p>

                  <p className="mt-5 mb-3">
                     Pick Check In & Check out date
                  </p>
                  <ReactDatePicker className="w-100" selected={checkInDate} onChange={handleDateRange} startDate={checkInDate} endDate={checkOutDate} excludeDates={excludedDates} selectsRange inline />
                  {result?.isAvailable === true && <div className="alert alert-success my-3 font-bold">Room is available. Book now.</div>}
                  {result?.isAvailable === false && <div className="alert alert-danger my-3 font-bold">Room is not available. Try different dates.</div>}
                  {result?.isAvailable && status == 'unauthenticated' && <div className="alert alert-danger my-3 font-bold">Login to book</div>}
                  {result?.isAvailable && status == 'authenticated' && <button className='btn btn-danger btn-block py-3 booking-btn' disabled={paymentLoading} onClick={() => bookRoom(data?.room?._id, data?.room?.pricePerNight)}>Pay - ${data?.room?.pricePerNight * daysOfStay}</button>}
               </div>
            </div>
         </div>

         <div className='reviews w-75'>
            <h3>Reviews:</h3>
            <hr />
            {data?.room?.reviews?.map((e, i) => (
               <div className='review-card my-3'>
                  <div className='rating-outer'>
                     <div className='rating-inner'></div>
                  </div>
                  <p className='review_user'>by John</p>
                  <p className='review_comment'>Good Quality</p>
                  <hr />
               </div>
            ))}
         </div>
      </div>
   );
};

export default RoomDetailCmp;
