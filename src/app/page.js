"use client";
import Loader from "@/components/Loader";
import RoomCards from "@/components/Room/RoomCards";
import { useGetRoomQuery } from "@/redux/services/room.api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Pagination from "react-js-pagination";

export const metadata = {
   title: "Book it | Home Page",
   description: "Book Best Hotels for your Holiday",
};

export default function Index({ searchParams }) {
   const router = useRouter();
   let {
      page = 1,
      location = "",
      guestCapacity,
      category = "",
   } = searchParams;
   page = Number(page);
   guestCapacity = Number(guestCapacity);
   const handlePagination = (pageNum) => {
      router.push(`/?page=${pageNum}`);
   };
   const { isLoading, data, error } = useGetRoomQuery({
      page,
      location,
      guestCapacity,
      category,
   });
   return (
      <>
         <section className='container mt-5'>
            <h2 className='mb-3 ml-2 stays-heading'>Stays in New York</h2>

            <Link href='/search' className='ml-2 back-to-search'>
               {" "}
               <i className='fa fa-arrow-left'></i> Back to Search
            </Link>
            {error ? (
               <p>Oh no, there was an error</p>
            ) : isLoading ? (
               <Loader />
            ) : data ? (
               <div className='row g-5'>
                  {data?.rooms?.map((e, i) => (
                     <RoomCards index={i} item={e} />
                  ))}
               </div>
            ) : null}
         </section>
         {data?.resPerPage <= data?.filteredRoomCount && (
            <div className='d-flex justify-center'>
               <Pagination
                  activePage={page}
                  itemsCountPerPage={data?.resPerPage}
                  totalItemsCount={data?.roomsCount}
                  onChange={handlePagination}
                  nextPageText={"Next"}
                  prevPageText={"prev"}
                  firstPageText={"First"}
                  lastPageText={"last"}
                  itemClass='page-item'
                  linkClass='page-link'
               />
            </div>
         )}
      </>
   );
}
