import User from "@/models/user";
import connectToDB from "@/utils/connectToDB";
import sendEmail from "@/utils/sentEmail";
import absoluteUrl from "next-absolute-url";

export const PATCH = async (req) => {
   const { email } = await req.json();
   try {
      await connectToDB();
      let user = await User.findOne({ email });
      if (!user)
         return new Response(
            JSON.stringify({
               success: false,
               error: "User not found with this email",
            }),
            { status: 404 }
         );
      // * Get reset token
      const resetToken = user.getResetPasswordToken();
      await user.save({ validateBeforeSave: false });

      // * Get origin
      const { origin } = absoluteUrl(req);

      // * Create reset password url
      const resetUrl = `${origin}/password/reset/${resetToken}`;

      const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n If you have not requested this email then ignore it.`;

      await sendEmail({
         email: user.email,
         subject: "BookIt Password Recovery",
         message,
      });
      return new Response(
         JSON.stringify({
            success: true,
            message: `Email send to: ${user.email}`,
         }),
         {
            status: 200,
         }
      );
   } catch (error) {
      //   user.resetPasswordToken = undefined;
      //   user.resetPasswordExpire = undefined;

      //   await user.save({ validateBeforeSave: false });
      console.log("error :>> ", error);
      return new Response(
         JSON.stringify({ success: false, error: error.message }),
         { status: 500 }
      );
   }
};
