import User from "@/models/user";
import connectToDB from "@/utils/connectToDB";

export const POST = async (req) => {
   try {
      const { email, password } = await req.json();
      await connectToDB();
      //* check if email and password is entered
      if (!email || !password)
         throw new Error("Please enter email and password");

      //* Find user in the database
      const user = await User.findOne({ email }).select("+password");
      if (!user) throw new Error("Invalid Email and Password");

      //* Check if password matched
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) throw new Error("Incorrect Password");
      return new Response(JSON.stringify({ success: true, user }), {
         status: 200,
      });
   } catch (error) {
      return new Response(
         JSON.stringify({ success: false, error: error.message }),
         { status: 400 }
      );
   }
};
