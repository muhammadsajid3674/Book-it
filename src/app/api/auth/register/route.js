import User from "@/models/user";
import connectToDB from "@/utils/connectToDB";
import { v2 as cloudinary } from "cloudinary";

//* Setup Cloudinary Config
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_CLOUD_KEY,
   api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

export const POST = async (req) => {
   const { name, email, password, avatar } = await req.json();
   if (!name || !email || !password || !avatar)
      return new Response(
         JSON.stringify({ success: false, error: "Fields are required" }),
         { status: 500 }
      );
   try {
      await connectToDB();
      const result = await cloudinary.uploader.upload(avatar, {
         folder: "bookIt/avatars",
      });
      const user = new User({
         name,
         email,
         password,
         avatar: { public_id: result.public_id, url: result.secure_url },
      });
      await user.save();
      return new Response(JSON.stringify({ success: true, user }), {
         status: 201,
      });
   } catch (error) {
      return new Response(
         JSON.stringify({ success: false, error: error.message }),
         { status: 500 }
      );
   }
};
