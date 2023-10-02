"use client";
import Login from "@/components/auth/login";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
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
      return signIn("credentials", {
         redirect: false,
         email: emailRef.current.value,
         password: passwordRef.current.value,
      }).then((res) => {
         if (res.error === null) {
            setIsLoading(false);
            router.push("/", undefined, { shallow: true });
         } else {
            setIsLoading(false);
            toast.error(res.error);
         }
      });
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
