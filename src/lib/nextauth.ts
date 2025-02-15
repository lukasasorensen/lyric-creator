import clientPromise from "@/lib/mongodb";
import type { NextAuthOptions, Session } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const user = await client.db("lyrical").collection("users").findOne({
          email: credentials?.email,
        });

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(credentials!.password, user.password);

        if (!passwordMatch) throw new Error("Wrong Password");

        return {
          _id: user._id.toString(),
          email: user.email,
          name: user.firstName + " " + user.lastName,
          token: user.token,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session?.user) {
        session.user._id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user._id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};
