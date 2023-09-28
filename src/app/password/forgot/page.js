"use client";
import ForgotPassword from "@/components/user/ForgotPassword";
import { useForgotPasswordMutation } from "@/redux/services/user.api";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "react-toastify";

const page = () => {
   const router = useRouter();
   const emailRef = useRef();
   const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
   const handleSubmit = async (e) => {
      e.preventDefault();
      await forgotPassword({
         email: emailRef.current.value,
      })
         .unwrap()
         .then(() => {
            toast.success("Password reset email send.");
            router.push("/");
         })
         .catch((err) => toast.error(err?.data?.error));
   };
   return (
      <ForgotPassword
         onSubmit={handleSubmit}
         reference={emailRef}
         isLoading={isLoading}
      />
   );
};

export default page;
