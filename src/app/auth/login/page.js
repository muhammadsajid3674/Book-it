"use client";
import Login from "@/components/auth/login";
import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Index = () => {
   const [isLoading, setIsLoading] = useState(false);
   const emailRef = useRef();
   const passwordRef = useRef();
   const router = useRouter();
   const submitHandler = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const result = await signIn("credentials", {
         redirect: false,
         email: emailRef.current.value,
         password: passwordRef.current.value,
      })
      if (result.error) {
         setIsLoading(false);
         return router.replace("/");
      } else if (!result.error) {
         setIsLoading(false);
         return toast.error(result.error);
      }
   };

   return (
      <Login
         reference={{ emailRef, passwordRef }}
         onSubmit={submitHandler}
         loading={isLoading}
      />
   );
};

export default Index;
