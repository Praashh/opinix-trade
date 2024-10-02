import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/server/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    phoneNumber?: string;
    isVerified?: boolean;
    balance?: number;
  }
  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      phoneNumber?: string;
      isVerified?: boolean;
      balance?: number;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    phoneNumber?: string;
    isVerified?: boolean;
    balance?: number;
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: {
          label: "Phone",
          type: "text",
          placeholder: "+91-98765*****",
        },
      },
      async authorize(credentials) {
        const isUserExists = await prisma.user.findFirst({
          where: {
            phoneNumber: credentials?.phoneNumber,
          },
        });
        //  console.log("inside Auth--------------------------------");
        const isUserVerified = await prisma.oTP.findUnique({
          where: { otpID: credentials?.phoneNumber },
        });
        if (!isUserVerified?.isVerified) {
          return null;
        }

        // console.log("isUserExists", isUserExists);

        if (isUserExists) {
          return { ...isUserExists, isVerified: false };
        }
        const user = await prisma.user.create({
          data: {
            phoneNumber: credentials?.phoneNumber as string,
            role: "USER",
            balance: 0.0,
          },
        });
        await prisma.oTP.update({
          where: { otpID: credentials?.phoneNumber },
          data: {
            userId: user.id,
          },
        });
        // console.log("user", user);
        if (user) {
          return {
            ...user,
            isVerified: isUserVerified?.isVerified ?? false,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, credentials }) {
      console.log("User during signIn:", user);

      if (!user.isVerified) {
        // console.log("User not verified");
        return false;
      }

      // console.log("User verified, allowing sign-in");
      const isUserExists = await prisma.user.findUnique({
        where: {
          phoneNumber: credentials?.phoneNumber as string,
        },
      });

      if (isUserExists) {
        // console.log("User already exists, allowing sign-in");
        return true;
      }

      return false;
    },
    async jwt({ token, user }) {
      if (user) {
        token.phoneNumber = user.phoneNumber;
        token.isVerified = user.isVerified;
        token.id = user.id;
        token.balance = user.balance;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.phoneNumber = token.phoneNumber;
        session.user.isVerified = token.isVerified;
        session.user.id = token.id;
        session.user.balance = token.balance;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
} satisfies NextAuthOptions;
