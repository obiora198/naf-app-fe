import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        const email = (credentials.email as string).toLowerCase();
        console.log(`[auth] Attempting guest lookup for: ${email}`);

        const user = await User.findOne({ email });
        if (!user) {
          console.warn(`[auth] No guest found with email: ${email}`);
          return null;
        }

        const isValid = await user.matchPassword(credentials.password as string);
        if (!isValid) {
          console.warn(`[auth] Invalid secure key provided for: ${email}`);
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
});
