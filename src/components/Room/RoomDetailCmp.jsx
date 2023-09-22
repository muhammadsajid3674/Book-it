import Image from "next/image";
import RoomFeatures from "./RoomFeatures";

const RoomDetailCmp = ({data}) => {
   return (
      <div className='container container-fluid'>
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
   );
};

export default RoomDetailCmp;
