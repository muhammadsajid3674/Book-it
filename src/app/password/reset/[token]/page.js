"use client";
import { useRef } from "react";
import ResetPassword from "@/components/user/ResetPassword";
import { useResetPasswordMutation } from "@/redux/services/user.api";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

const page = ({ params }) => {
   const passwordRef = useRef();
   const confirmPasswordRef = useRef();
   const [resetPassword, { isLoading }] = useResetPasswordMutation();
   const handleSubmit = async (e) => {
      e.preventDefault();
      await resetPassword({
         password: passwordRef.current.value,
         confirmPassword: confirmPasswordRef.current.value,
         token: params?.token,
      })
         .unwrap()
         .then(async () => {
            toast.success("Password updated successfully");
            await signOut();
         })
         .catch((err) => toast.error(err?.data?.error));
   };
   return (
      <ResetPassword
         reference={{ passwordRef, confirmPasswordRef }}
         onSubmit={handleSubmit}
         isLoading={isLoading}
      />
   );
};

export default page;
