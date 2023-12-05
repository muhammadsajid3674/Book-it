'use client'
import Loader from '@/components/Loader'
import { useGetUserBookingsQuery } from '@/redux/services/booking.api'
import easyinvoice from 'easyinvoice'
import { MDBDataTable } from 'mdbreact'
import Link from 'next/link'
import React from 'react'

const Bookings = () => {
    const { data: bookings, isLoading } = useGetUserBookingsQuery()

    const downloadInvoice = async (booking) => {
        console.log('hello :>> ');
        const data = {
            "documentTitle": "Booking INVOICE", //Defaults to INVOICE
            "currency": "USD",
            "taxNotation": "vat", //or gst
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            "logo": "https://res.cloudinary.com/bookit/image/upload/v1617904918/bookit/bookit_logo_cbgjzv.png",
            "sender": {
                "company": "Book IT",
                "address": "13th Street. 47 W 13th St",
                "zip": "10001",
                "city": "New York",
                "country": "United States"
            },
            "client": {
                "company": `${booking.user.name}`,
                "address": `${booking.user.email}`,
                "zip": "",
                "city": `Check In: ${new Date(booking.checkInDate).toLocaleString('en-US')}`,
                "country": `Check In: ${new Date(booking.checkOutDate).toLocaleString('en-US')}`
            },
            "invoiceNumber": `${booking._id}`,
            "invoiceDate": `${new Date(Date.now()).toLocaleString('en-US')}`,
            "products": [
                {
                    "quantity": `${booking.daysOfStay}`,
                    "description": `${booking.room.name}`,
                    "tax": 0,
                    "price": booking.room.pricePerNight
                }
            ],
            "bottomNotice": "This is auto generated Invoice of your booking on Book IT."
        };
        const result = await easyinvoice.createInvoice(data);
        console.log('PDF base64 string: ', result.pdf);
        easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)
    }
    
    const setBookings = () => {
        const data = {
            columns: [
                { label: 'Booking ID', field: 'id', sort: 'asc' },
                { label: 'Check In', field: 'checkIn', sort: 'asc' },
                { label: 'Check Out', field: 'checkOut', sort: 'asc' },
                { label: 'Amount Paid', field: 'amountPaid', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' },
            ],
            rows: []
        }
        bookings && bookings?.data.forEach(booking => {
            data.rows.push({
                id: booking._id,
                checkIn: new Date(booking.checkInDate).toLocaleDateString('en-US'),
                checkOut: new Date(booking.checkInDate).toLocaleDateString('en-US'),
                amountPaid: `$${booking.amountPaid}`,
                actions: <>
                    <Link href={`/bookings/${booking._id}`}>
                        <button className='btn btn-primary'><i className='fa fa-eye'></i></button>
                    </Link>
                    <button onClick={() => downloadInvoice(booking)} className='btn btn-success mx-2'><i className='fa fa-download'></i></button>
                </>
            })
        })
        return data
    }


    if (isLoading) return <Loader />
    return (
        <div className='container content-fluid'>
            <h1 className='my-5'>My Bookings</h1>
            <MDBDataTable data={setBookings()} className='px-3' />
        </div>
    )
}

export default Bookings