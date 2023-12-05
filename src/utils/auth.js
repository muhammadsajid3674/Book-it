import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                console.log('credentials :>> ', credentials);
                if (!email || !password) {
                    return null;
                }
                const response = await fetch(`${process.env.BASE_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message);
                }
                return result?.user;
            },
        }),
    ],
    callbacks: {
        session({ session, token }) {
            // session.user.token = token.accessToken;
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.avatar = token.avatar;
            return session;
        },
        jwt({ token, trigger, session, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                if ("_id" in user) token.id = user?._id;
                if ("name" in user) token.name = user?.name;
                if ("email" in user) token.email = user?.email;
                if ("avatar" in user) token.avatar = user?.avatar;
                // if ("accessToken" in user) token.accessToken = user.accessToken;
            }
            return token;
        },
    },
};