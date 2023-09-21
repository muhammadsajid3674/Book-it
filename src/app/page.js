"use client";
import RoomCards from "@/components/RoomCards";
import { useGetRoomQuery } from "@/redux/services/room.api";

export const metadata = {
   title: "Book it | Home Page",
   description: "Book Best Hotels for your Holiday",
};

export default function Index() {
   const { isLoading, data, error } = useGetRoomQuery(null);
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
         ) : //   <div
         //     style={{
         //       display: "grid",
         //       gridTemplateColumns: "1fr 1fr 1fr 1fr",
         //       gap: 20,
         //     }}
         //   >
         //     {data.map((user) => (
         //       <div
         //         key={user.id}
         //         style={{ border: "1px solid #ccc", textAlign: "center" }}
         //       >
         //         <img
         //           src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
         //           alt={user.name}
         //           style={{ height: 180, width: 180 }}
         //         />
         //         <h3>{user.name}</h3>
         //       </div>
         //     ))}
         //   </div>
         null}
      </section>
   );
}
