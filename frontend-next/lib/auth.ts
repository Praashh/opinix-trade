import  CredentialsProvider  from "next-auth/providers/credentials";
import prisma from "@/server/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, NextAuthOptions } from "next-auth";

declare module 'next-auth'{
  interface User{
    phoneNumber?: string;
    isVerified?: boolean;
  }
  interface Session {
    user: DefaultSession["user"] & {
      phoneNumber?: string;
      isVerified?: boolean;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    phoneNumber?: string;
    isVerified?: boolean;
  }
}

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              phoneNumber: { label: "Phone", type: "text", placeholder: "+91-98765*****" },
            },
            async authorize(credentials, req) {
              const isUserExists = await prisma.user.findFirst({
                                    where:{
                                      phoneNumber:credentials?.phoneNumber
                                    }
                                  });
              //  console.log("inside Auth--------------------------------");
              const isUserVerified = await prisma.oTP.findUnique({where:{otpID:credentials?.phoneNumber}});
              if(!isUserVerified?.isVerified){
                return null;
              }

              // console.log("isUserExists", isUserExists);
              
              if(isUserExists){
                return {...isUserExists, isVerified: false};
              }
              const user = await prisma.user.create({data:{
                            phoneNumber:credentials?.phoneNumber!,
                            role:"USER",
                            balance:0.0,
                          }})
              await prisma.oTP.update({
                where: { otpID: credentials?.phoneNumber },
                data: {
                  userId: user.id,
                }
              })
              // console.log("user", user);
              if (user) {
                return {
                  ...user,
                  isVerified: isUserVerified?.isVerified ?? false, 
                }
              } else {
                return null
              }
            }
          })
    ],
    callbacks:{
      async signIn({ user, account, profile, email, credentials }: any) {
        // console.log("User during signIn:", user);
    
        if (!user.isVerified) {
          // console.log("User not verified");
          return false; 
        }
    
        // console.log("User verified, allowing sign-in");
    
        const isUserExists = await prisma.user.findUnique({
          where: {
            phoneNumber: credentials.phoneNumber,
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
          token.isVerified = user.isVerified
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
           session.user.phoneNumber = token.phoneNumber
           token.isVerified = token.isVerified
        }
        return session;
      }
    },
    pages: {
      signIn: "/auth/signin",
    },
    session: {
      strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET || "secret",
}satisfies NextAuthOptions