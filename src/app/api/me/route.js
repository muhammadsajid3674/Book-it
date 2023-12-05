import User from "@/models/user";
import connectToDB from "@/utils/connectToDB";
import { getToken } from "next-auth/jwt";

export const GET = async (req) => {
   const session = await getToken({
      req: req,
      secret: process?.env?.NEXTAUTH_SECRET,
      cookieName: "next-auth.session-token",
   });
   try {
      await connectToDB();
      const user = await User.findById(session?.id).select("-password");
      if (!user)
         return new Response(
            JSON.stringify({ success: false, error: "user not found" }),
            { status: 404 }
         );
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
