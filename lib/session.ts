import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID! as string,
      clientSecret: process.env.GITHUB_SECRET! as string,
    }),
  ],
  // j
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ user }: { user: User | AdapterUser }) {
      try {
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export async function getCurrentUser(): Promise<any> {
  const session = await getServerSession(authOptions);
  return session;
}
