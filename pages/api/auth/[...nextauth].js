import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import clientPromise from "./lib/mongodb";
import User from "@/models/User";
import db from "@/utils/db";


db.connectDB();
export const authOptions = {
   adapter:MongoDBAdapter(clientPromise),
   providers: [
      CredentialsProvider({
         name:"Credentials",
         credentials: {
            username:{label:"Username",type:"text",placeholder:"usuario"},
            password:{label:"Password",type:"password"},
         },
         async authorize(credentials,req){
            const email = credentials.email;
            const password = credentials.password;
            const user = await User.findOne({email});
            if (user) {
               return SignInUser({password,user});
            } else {
               throw new Error('This Email does not exist.');
            }
         },
      }),
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
   callbacks : {
      async session({session,token}) {
         let user = await User.findById(token.sub);
         session.user.id = token.sub || user._id.toString();
         session.user.role = user.role || "user";
         return session;
      }
   },
   pages : {
      signIn : "/signin"
   },
   session : {
      strategy : "jwt",
   },
   secret : process.env.JWT_SECRET,
};

const SignInUser = async ({password, user}) => {
   if(!user.password) { 
      throw new Error("Please enter your password.")
   };
   const testPassword = await bcrypt.compare(password,user.password);
   if(!testPassword){
      throw new Error('Email or password is wrong!.');
   }
   return user;
}

export default NextAuth(authOptions)