import User from "@/models/user";
import connectToDB from "@/utils/connectToDB";
import nextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";

const handler = nextAuth({
   session: {
      jwt: true,
   },
   secret: process.env.NEXTAUTH_URL,
   providers: [
      CredentialsProviders({
         async authorize(credentials) {
            await connectToDB();
            const { email, password } = credentials;
            //* check if email and password is entered
            if (!email || !password)
               throw new Error("Please enter email and password");

            //* Find user in the database
            const user = await User.findOne({ email }).select("+password");
            if (!user) throw new Error("Invalid Email and Password");

            //* Check if password matched
            const isPasswordCorrect = await user.comparePassword(password);
            if (!isPasswordCorrect) throw new Error("Incorrect Password");

            return Promise.resolve(user);
         },
      }),
   ],
   callbacks: {
      jwt: async (token, user) => {
         user && (token.user = user);
         return Promise.resolve(token);
      },
      session: async (session, res) => {
         session.user = res.user;
         return Promise.resolve(session);
      },
   },
});

export { handler as GET, handler as POST };
