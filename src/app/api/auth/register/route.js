import User from "@/models/user";
import connectToDB from "@/utils/connectToDB";

export const POST = async (req) => {
   const { name, email, password } = await req.json();
   try {
      await connectToDB();
      const user = new User({
         name,
         email,
         password,
         avatar: { public_id: "PUBLIC_ID", url: "URL" },
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
