import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// Mongo-based auth (no Prisma adapter)
import { connectToMongo } from "./mongodb";
import { UserModel } from "./models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectToMongo();
          console.log("Looking for user with email:", credentials.email);
          
          const user = await UserModel.findOne({ email: credentials.email });
          console.log("Found user:", user ? "Yes" : "No");

          if (!user || !user.password) {
            console.log("User not found or no password");
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log("Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: String(user._id),
            email: user.email || undefined,
            name: user.name || undefined,
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile) {
        try {
          await connectToMongo();
          
          // Check if user exists by email
          let existingUser = await UserModel.findOne({ email: user.email });
          
          if (!existingUser) {
            // Create new user with Google profile data
            existingUser = await UserModel.create({
              name: user.name,
              email: user.email,
              image: user.image,
            });
            console.log("New Google user created:", existingUser);
          }
          
          // Set user ID for JWT token
          user.id = String(existingUser._id);
          console.log("Google user ID set:", user.id);
          
          return true;
        } catch (error) {
          console.error("Error in Google signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id;
        console.log("JWT callback - User ID set in token:", user.id);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as { id: string }).id = token.id as string;
        console.log("Session callback - User ID set:", token.id);
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
