"use client";
import Login from "@/components/auth/login";
import { useRef } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Index = () => {
   const emailRef = useRef();
   const passwordRef = useRef();
   const router = useRouter();
   const submitHandler = async (e) => {
      e.preventDefault();
      const result = await signIn("credentials", {
         redirect: false,
         email: emailRef.current.value,
         password: passwordRef.current.value,
      });
      if (result.error) {
         toast.error(result.error);
      } else {
         router.push("/");
      }
   };
   return (
      <Login reference={{ emailRef, passwordRef }} onSubmit={submitHandler} />
   );
};

export default Index;
