import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import getUserCollection from "@/utils/getUserCollection";

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

        const [client, collection] = await getUserCollection();

        try {
          let userFound = await collection.findOne({
            email: email,
          });

          if (!userFound) {
            client.close();
            return null;
          }

          const isValid = bcrypt.compareSync(password, userFound.password);

          if (!isValid) {
            client.close();
            return null;
          }

          return {...credentials, name: userFound.name};

        } catch (error) {
          return error;
        } finally {
          client.close();
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       return {
  //         ...token,
  //         id: user.id,
  //         name: user.name,
  //       };
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id,
  //         randomKey: token.randomKey,
  //       },
  //     };
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
