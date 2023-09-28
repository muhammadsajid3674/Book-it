import User from "@/models/user";
import connectToDB from "@/utils/connectToDB";
import { getToken } from "next-auth/jwt";
import { v2 as cloudinary } from "cloudinary";

//* Setup Cloudinary Config
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_CLOUD_KEY,
   api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

export const PATCH = async (req) => {
   const session = await getToken({
      req: req,
      secret: process?.env?.NEXTAUTH_SECRET,
      cookieName: "next-auth.session-token",
   });
   const { name, email, password, avatar } = await req.json();
   try {
      await connectToDB();
      const user = await User.findById(session?.user?._id).select("+password");
      if (!user)
         return new Response(
            JSON.stringify({ success: false, error: "user not found" }),
            { status: 404 }
         );
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      if (avatar !== "") {
         const image_id = user?.avatar?.public_id;

         // * Delete user previous image/avatar
         await cloudinary.uploader.destroy(image_id);
         const result = await cloudinary.uploader.upload(avatar, {
            folder: "bookIt/avatar",
         });
         user.avatar =
            {
               public_id: result.public_id,
               url: result.url,
            } || user.avatar;
      }
      await user.save();
      return new Response(JSON.stringify({ success: true, user }), {
         status: 200,
      });
   } catch (error) {
      return new Response(
         JSON.stringify({ success: false, error: error.message }),
         { status: 500 }
      );
   }
};
