"use client";
import RoomCards from "@/components/RoomCards";
import { useRoomList } from "@/utils/hooks/useRoomList";

export const metadata = {
   title: "Book it | Home Page",
   description: "Book Best Hotels for your Holiday",
};

export default function Index() {
   const { loading, ref, result } = useRoomList();
   return (
      <section className='container mt-5'>
         <h2 className='mb-3 ml-2 stays-heading'>Stays in New York</h2>

         <a href='#' className='ml-2 back-to-search'>
            {" "}
            <i className='fa fa-arrow-left'></i> Back to Search
         </a>
         <div className='row g-5'>
            {result?.rooms?.map((e, i) => (
               <RoomCards index={i} item={e} />
            ))}
         </div>
      </section>
   );
}
