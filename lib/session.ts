import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID! as string,
      clientSecret: process.env.GITHUB_SECRET! as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID! as string,
      clientSecret: process.env.GOOGLE_SECRET! as string,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now()),
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;
      return decodedToken;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "../../public/vercel.svg",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;
      try {
        const data = (await getUser(email)) as { user: typeof session.user };
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };
        return newSession;
      } catch (error) {
        console.error(error);
        return session;
      }
    },
    async signIn({ user }: { user: User | AdapterUser }) {
      try {
        const userExists = (await getUser(user?.email as string)) as {
          user?: typeof user;
        };
        console.log("====================================");
        console.log(userExists);
        console.log("====================================");

        if (!userExists.user) {
          await createUser(
            user?.name as string,
            user?.email as string,
            user?.image as string
          );
        }
        return true;
      } catch (error) {
        console.log(error);
        return true;
      }
    },
  },
};

export async function getCurrentUser(): Promise<any> {
  const session = await getServerSession(authOptions);
  return session;
}
