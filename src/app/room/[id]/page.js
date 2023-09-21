"use client";
import { useGetRoomByIdQuery } from "@/redux/services/room.api";
import Image from "next/image";
import React from "react";

const RoomDetail = ({ params }) => {
   const { isLoading, data, error } = useGetRoomByIdQuery(params?.id);
   console.log("data :>> ", data);
   return (
      <>
         {error ? (
            <p>Oh no, there was an error</p>
         ) : isLoading ? (
            <p>Loading...</p>
         ) : data ? (
            <div className='container container-fluid'>
               <h2 className='mt-5'>{data?.room?.name}</h2>
               <div className='ratings mt-auto mb-3'>
                  <div className='rating-outer'>
                     <div className='rating-inner'></div>
                  </div>
                  <span id='no_of_reviews'>
                     ({data?.room?.numOfReviews} Reviews)
                  </span>
               </div>
               <Image
                  src={data?.room?.images?.[0]?.url}
                  className='d-block w-100 property-details-image m-auto'
                  alt='Hotel'
                  width={500}
                  height={500}
               />
               <div className='row my-5'>
                  <div className='col-12 col-md-6 col-lg-8'>
                     <h3>Description</h3>
                     <p>{data?.room?.description}</p>

                     <div className='features mt-5'>
                        <h3 className='mb-4'>Features:</h3>
                        <div className='room-feature'>
                           <i
                              className='fa fa-cog fa-fw fa-users'
                              aria-hidden='true'
                           ></i>
                           <p>{data?.room?.guestCapacity} Guests</p>
                        </div>

                        <div className='room-feature'>
                           <i
                              className='fa fa-cog fa-fw fa-bed'
                              aria-hidden='true'
                           ></i>
                           <p>{data?.room?.numOfBeds} Beds</p>
                        </div>

                        <div className='room-feature'>
                           <i
                              className='fa fa-cog fa-fw fa-bath'
                              aria-hidden='true'
                           ></i>
                           <p>2 Baths</p>
                        </div>

                        <div className='room-feature'>
                           <i
                              className='fa fa-cog fa-fw fa-cutlery'
                              aria-hidden='true'
                           ></i>
                           <p>Kitchen</p>
                        </div>
                     </div>
                  </div>

                  <div className='col-12 col-md-6 col-lg-4'>
                     <div className='booking-card shadow-lg p-4'>
                        <p className='price-per-night'>
                           <b>${data?.room?.pricePerNight}</b> / night
                        </p>

                        <button className='btn btn-block py-3 booking-btn'>
                           Pay
                        </button>
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
         ) : null}
      </>
   );
};

export default RoomDetail;
