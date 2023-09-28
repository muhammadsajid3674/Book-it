"use client";
import Profile from "@/components/user/Profile";
import {
   useCurrentUserQuery,
   useUpdateProfileMutation,
} from "@/redux/services/user.api";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const page = () => {
   const router = useRouter();
   const [avatar, setAvatar] = useState("");
   const [avatarPreview, setAvatarPreview] = useState(
      "/images/default_avatar.png"
   );
   const { data, isLoading: userLoading } = useCurrentUserQuery();
   const [updateProfile, { isLoading }] = useUpdateProfileMutation();
   const nameRef = useRef(null);
   const emailRef = useRef(null);
   const passwordRef = useRef(null);
   const handleOnChange = (e) => {
      if (e.target.name === "avatar") {
         const reader = new FileReader();
         reader.onload = () => {
            if (reader.readyState === 2) {
               setAvatar(reader.result);
               setAvatarPreview(reader.result);
            }
         };
         reader.readAsDataURL(e.target.files[0]);
      }
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      await updateProfile({
         name: nameRef.current.value,
         email: emailRef.current.value,
         password: passwordRef.current.value,
         avatar,
      })
         .unwrap()
         .then(() => {
            toast.success("User Register Successfully");
            router.push("/");
         })
         .catch((err) => toast.error(err?.data?.error));
   };
   useEffect(() => {
      if (data) {
         nameRef.current.value = data?.user?.name;
         emailRef.current.value = data?.user?.email;
         passwordRef.current.value = data?.user?.password;
         setAvatarPreview(data?.user?.avatar?.url)
      }
   }, [data]);

   return (
      !userLoading && (
         <Profile
            reference={{ nameRef, emailRef, passwordRef }}
            onSubmit={handleSubmit}
            loading={isLoading}
            state={{ avatar, avatarPreview }}
            onChange={handleOnChange}
         />
      )
   );
};

export default page;
