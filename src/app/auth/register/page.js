"use client";
import { useRef, useState } from "react";
import Register from "@/components/auth/Register";
import { useRegisterUserMutation } from "@/redux/services/user.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Index = () => {
   const router = useRouter();
   const [avatar, setAvatar] = useState("");
   const [avatarPreview, setAvatarPreview] = useState(
      "/images/default_avatar.png"
   );
   const [registerUser, { isLoading }] = useRegisterUserMutation();
   const nameRef = useRef();
   const emailRef = useRef();
   const passwordRef = useRef();
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
      await registerUser({
         name: nameRef.current.value,
         email: emailRef.current.value,
         password: passwordRef.current.value,
         avatar,
      })
         .unwrap()
         .then(() => {
            toast.success("User Register Successfully");
            router.push("/auth/login");
         })
         .catch((err) => toast.error(err.data.error));
   };

   return (
      <Register
         reference={{ nameRef, emailRef, passwordRef }}
         onSubmit={handleSubmit}
         loading={isLoading}
         state={{ avatar, avatarPreview }}
         onChange={handleOnChange}
      />
   );
};

export default Index;
