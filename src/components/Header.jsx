"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCurrentUserQuery } from "@/redux/services/user.api";
import { signOut } from "next-auth/react";

const Header = () => {
   const { data, isLoading } = useCurrentUserQuery();
   return (
      <nav className='navbar row justify-content-center sticky-top'>
         <div className='container'>
            <div className='col-3 p-0'>
               <div className='navbar-brand'>
                  <Link href={"/"}>
                     <Image
                        src='/images/bookit_logo.png'
                        alt=''
                        style={{ cursor: "pointer" }}
                        width={145}
                        height={33}
                        priority
                     />
                  </Link>
               </div>
            </div>

            <div className='col-3 mt-3 mt-md-0 text-center'>
               {data ? (
                  <div className='ml-4 dropdown'>
                     <a
                        className='btn dropdown-toggle mr-4'
                        id='dropDownMEnuButton'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                     >
                        <figure className='avatar avatar-nav'>
                           <img
                              src={
                                 data?.user?.avatar && data?.user?.avatar?.url
                              }
                              alt={data?.user && data?.user?.name}
                              className='rounded-circle'
                           />
                        </figure>
                        <span>{data?.user && data?.user?.name}</span>
                     </a>
                     <div
                        className='dropdown-menu'
                        aria-labelledby='dropDownMenuButton'
                     >
                        <Link className='dropdown-item' href={"/bookings/me"}>
                           My Bookings
                        </Link>
                        <Link className='dropdown-item ' href={"/me/update"}>
                           Profile
                        </Link>
                        <Link
                           className='dropdown-item text-danger'
                           href={"/"}
                           onClick={() => signOut()}
                        >
                           Logout
                        </Link>
                     </div>
                  </div>
               ) : (
                  !isLoading && (
                     <Link
                        href={"/auth/login"}
                        className='btn btn-danger px-4 text-white login-header-btn float-right'
                     >
                        Login
                     </Link>
                  )
               )}
            </div>
         </div>
      </nav>
   );
};

export default Header;
