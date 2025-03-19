import NextAuth, { DefaultSession, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";
import { userIFC } from "@/interfaces/userIFC";

// Session 타입 확장
declare module "next-auth" {
    interface Session extends DefaultSession {
        user?: userIFC;
        token?: string;
        accessToken?: string;
    }
}

// JWT 타입 확장
declare module "next-auth/jwt" {
    interface JWT {
        token?: string;
        user?: userIFC;
    }
}

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth({
    pages: {
        signIn: "/",
        signOut: "/",
        newUser: "/register",
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<string, any>) {
                const { email, password } = credentials ?? {};

                // const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`, {
                console.log("Request >>>> ", credentials);
                console.log(email, password, " : user info");
                console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`);
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`, {
                    email: email,
                    password: password,
                });

                console.log("response >>>> ", response);
                const user = await response.data;
                return user ?? null;
            },
        }),
    ],
    cookies: {
        sessionToken: {
            name: "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: userIFC | null }): Promise<JWT> {
            console.log("jwt");
            console.log(token);
            console.log(user);
            console.log("jwt end");

            if (user) {
                token.token = user.token;
                token.user = user.user;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
            console.log("session");
            console.log(token);

            session.user = token.user;
            session.token = token.token;

            return session;
        },
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 1,
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 1,
    },
});
