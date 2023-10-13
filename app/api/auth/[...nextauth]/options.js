import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/utils/getPrismaClient";
import { useMemo } from "react";

export const options = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        let bcrypt = require("bcryptjs");

        const userFoundbyEmail = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        console.log(userFoundbyEmail);

        if (!userFoundbyEmail) return null;

        const isValidPassword = bcrypt.compareSync(
          password,
          userFoundbyEmail.hashedPassword
        );

        if (!isValidPassword) return null;

        return {
          ...credentials,
          name: userFoundbyEmail.name,
          image: userFoundbyEmail.image,
          id: userFoundbyEmail.id,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
        };
      }
      return token;
    },
    async session({ session, token }) {
        
      return {
        user: {
          accessToken: token.accessToken,
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
