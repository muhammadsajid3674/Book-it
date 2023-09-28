import User from "@/models/user";
import connectToDB from "@/utils/connectToDB";
import crypto from "crypto";

export const PATCH = async (req) => {
   const { password, confirmPassword } = await req.json();
   // ? As of Next.js 13.4 you can get search params like this from the url:
   const queryParams = Object.fromEntries(req.nextUrl.searchParams);
   try {
      await connectToDB();
      //* Hash URL token
      const resetPasswordToken = crypto
         .createHash("sha256")
         .update(queryParams.token)
         .digest("hex");
      let user = await User.findOne({
         resetPasswordToken,
         resetPasswordExpire: { $gt: Date.now() },
      });
      if (!user)
         return new Response(
            JSON.stringify({
               success: false,
               error: "Password reset token is invalid or has been expired",
            }),
            { status: 404 }
         );
      console.log("passwords :>> ", { password, confirmPassword });
      if (password !== confirmPassword)
         return new Response(
            JSON.stringify({
               success: false,
               error: "Password does not match",
            }),
            { status: 404 }
         );
      // * Setup the new password
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return new Response(
         JSON.stringify({
            success: true,
            message: "Password reset updated successfully",
         }),
         {
            status: 200,
         }
      );
   } catch (error) {
      return new Response(
         JSON.stringify({ success: false, error: error.message }),
         { status: 500 }
      );
   }
};
