import Image from "next/image";
import Link from "next/link";

const RoomCards = ({ item, index }) => {
   return (
      <div className='col-sm-12 col-md-6 col-lg-3 my-3' key={index}>
         <div className='card p-2'>
            <Image
               className='card-img-top mx-auto'
               src={item?.images[0]?.url}
               width={170}
               height={170}
            />
            <div className='card-body d-flex flex-column'>
               <h5 className='card-title'>
                  <Link href={`/room/${item._id}`}>{item.name}</Link>
               </h5>
               <div className='ratings mt-auto mb-3'>
                  <p className='card-text'>
                     <span className='fw-bold'>${item.pricePerNight}</span> /
                     night
                  </p>

                  <div className='rating-outer'>
                     <div
                        className='rating-inner'
                        style={{ width: `${(item.ratings / 5) * 100}%` }}
                     ></div>
                  </div>
                  <span id='no_of_reviews'>({item.numOfReviews} Reviews)</span>
               </div>

               <button className='btn btn-block btn-outline-primary'>
                  <Link href={`/room/${item._id}`}>View Details</Link>
               </button>
            </div>
         </div>
      </div>
   );
};

export default RoomCards;
