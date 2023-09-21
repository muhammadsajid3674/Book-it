"use client";
import RoomCards from "@/components/RoomCards";
import { useGetRoomQuery } from "@/redux/services/room.api";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const metadata = {
   title: "Book it | Home Page",
   description: "Book Best Hotels for your Holiday",
};

export default function Index() {
   const { isLoading, data, error } = useGetRoomQuery(null);
   useEffect(() => {
      toast.success("Hurrah!")
   },[])
   return (
      <section className='container mt-5'>
         <h2 className='mb-3 ml-2 stays-heading'>Stays in New York</h2>

         <a href='#' className='ml-2 back-to-search'>
            {" "}
            <i className='fa fa-arrow-left'></i> Back to Search
         </a>
         {error ? (
            <p>Oh no, there was an error</p>
         ) : isLoading ? (
            <p>Loading...</p>
         ) : data ? (
            <div className='row g-5'>
               {data?.rooms?.map((e, i) => (
                  <RoomCards index={i} item={e} />
               ))}
            </div>
         ) : 
         null}
      </section>
   );
}
