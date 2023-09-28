import nextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import { setCookie } from "nookies";

const handler = nextAuth({
   session: {
      strategy: "jwt",
   },
   secret: process.env.NEXTAUTH_SECRET,
   providers: [
      CredentialsProviders({
         name: "Credentials",
         credentials: {
            email: {
               label: "Email",
               type: "text",
               placeholder: "jsmith",
            },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            const { email, password } = credentials;
            console.log("credentials :>> ", { email, password });
            const res = await fetch(`${process?.env?.BASE_URL}/auth/login`, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  email,
                  password,
               }),
            });
            const user = await res.json();
            console.log("user :>> ", user);
            setCookie({ res }, "user", JSON.stringify(user), {
               maxAge: 2 * 24 * 60 * 60,
               path: "/",
               httpOnly: true,
            });
            return Promise.resolve(user);
         },
      }),
   ],
   callbacks: {
      jwt: async ({ token, user }) => {
         return { ...token, ...user };
      },
      session: async ({ session, token }) => {
         const accessTokenData = JSON.parse(
            atob(token.token.split(".")?.at(1))
         );
         session.user = accessTokenData;
         token.accessTokenExpires = accessTokenData.exp;

         session.token = token?.token;

         return Promise.resolve(session);
      },
   },
});

export { handler as GET, handler as POST };
