import  CredentialsProvider  from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import prisma from "@/server/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone", type: "text", placeholder: "+91-98765*****" },
            },
            // TODO: User Authentication Logic
            async authorize(credentials, req) {
              const user = { id: "1", phone:"9520415864" }
            
              if (user) {
                return user
              } else {
                return null
              }
            }
          })
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
}