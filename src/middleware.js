import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

//? This function can be marked `async` if using `await` inside
export async function middleware(req) {
   const session = await getToken({
      req: req,
      secret: process?.env?.NEXTAUTH_SECRET,
      cookieName: "next-auth.session-token",
   });
   console.log("session :>> ", session);
   // redirect user without access to login
   if (!session) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
   }

   // redirect user without admin access to login
   //    if (!token?.user?.role === "admin") {
   //       return NextResponse.redirect(new URL("/auth/login", req.url));
   //    }
   return NextResponse.next();
}

export const config = { matcher: ["/api/me"] };
