import clientPromise from "@/lib/mongodb";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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

        console.log(user)
        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(credentials!.password, user.password);

        if (!passwordMatch) throw new Error("Wrong Password");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.firstName + " " + user.lastName,
          token: user.token,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
