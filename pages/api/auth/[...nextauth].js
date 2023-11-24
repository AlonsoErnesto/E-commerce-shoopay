import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

export const authOptions = {
   adapter:MongoDBAdapter(clientPromise),
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET,
      }),
      AppleProvider({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET,
      }),
   ],
   pages : {
      signIn : "/signin"
   },
   session : {
      strategy : "jwt",
   },
   secret : process.env.JWT_SECRET,
}

export default NextAuth(authOptions)