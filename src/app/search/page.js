"use client";
import SearchCmp from "@/components/SearchCmp";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const Search = () => {
   const locationRef = useRef();
   const guestRef = useRef();
   const categoryRef = useRef();
   const router = useRouter();
   const submitHandler = (e) => {
      e.preventDefault();
      if (
         locationRef.current.value.trim() ||
         guestRef.current.value.trim() ||
         categoryRef.current.value.trim()
      ) {
         router.push(
            `/?location=${locationRef.current.value}&guestCapacity=${guestRef.current.value}&category=${categoryRef.current.value}`
         );
      } else {
         router.push("/");
      }
   };
   return (
      <SearchCmp
         onSubmit={submitHandler}
         reference={{ locationRef, guestRef, categoryRef }}
      />
   );
};

export default Search;
