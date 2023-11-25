import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

export const authOptions = {
   adapter:MongoDBAdapter(clientPromise),
   providers: [
      GithubProvider({
         clientId: process.env.CLIENT_ID_GITHUB,
         clientSecret: process.env.CLIENT_SECRET_GITHUB,
      }),
      GoogleProvider({
         clientId: process.env.CLIENT_ID_GOOGLE,
         clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      }),
      FacebookProvider({
         clientId: process.env.CLIENT_ID_FACEBOOK,
         clientSecret: process.env.CLIENT_SECRET_FACEBOOK,
      }),
      TwitterProvider({
         clientId: process.env.CLIENT_ID_TWITTER,
         clientSecret: process.env.CLIENT_SECRET_TWITTER,
      }),
      Auth0Provider({
         clientId: process.env.CLIENT_ID_AUTH0,
         clientSecret: process.env.CLIENT_SECRET_AUTH0,
         issuer:process.env.CLIENT_SECRET_AUTH0_ISSUER,
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