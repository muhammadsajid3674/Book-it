import User from "@/models/user";
import { authOptions } from "@/utils/auth";
import connectToDB from "@/utils/connectToDB";
import nextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import { setCookie } from "nookies";

// export const authOptions = {
//    session: {
//       strategy: "jwt",
//    },
//    secret: process.env.NEXTAUTH_SECRET,
//    pages: "/auth/login",
//    providers: [
//       CredentialsProviders({
//          name: "credentials",
//          async authorize(credentials) {
//             const { email, password } = credentials;
//             await connectToDB();
//             //* check if email and password is entered
//             if (!email || !password)
//                throw new Error("Please enter email and password");

//             //* Find user in the database
//             const user = await User.findOne({ email }).select("+password");
//             if (!user) throw new Error("Invalid Email and Password");

//             //* Check if password matched
//             const isPasswordCorrect = await user.comparePassword(password);
//             if (!isPasswordCorrect) throw new Error("Incorrect Password");

//             // setCookie({ user }, "user", JSON.stringify(user), {
//             //    maxAge: 2 * 24 * 60 * 60,
//             //    path: "/",
//             //    httpOnly: true,
//             // });
//             return Promise.resolve(user);
//             // return fetch(`${process?.env?.BASE_URL}/auth/login`, {
//             //    method: "POST",
//             //    headers: {
//             //       "Content-Type": "application/json",
//             //    },
//             //    body: JSON.stringify({
//             //       email,
//             //       password,
//             //    }),
//             // })
//             //    .then((response) => response.json())
//             //    .then((data) => {
//             //       console.log("data :>> ", data);
//             //       return Promise.resolve(data);
//             //    });
//             // const user = await res.json();
//             // console.log("user :>> ", user);
//          },
//       }),
//    ],
//    callbacks: {
//       jwt: async ({ token, user }) => {
//          return { ...token, ...user };
//       },
//       session: async ({ session, token }) => {
//          console.log('token :>> ', token);
//          const accessTokenData = JSON.parse(
//             atob(token.token.split(".")?.at(1))
//          );
//          session.user = accessTokenData;
//          token.accessTokenExpires = accessTokenData.exp;

//          session.token = token?.token;

//          return Promise.resolve(session);
//       },
//    },
// };

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
