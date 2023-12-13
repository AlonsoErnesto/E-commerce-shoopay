import { createRouter } from "next-connect";
import bcrypt from 'bcrypt';
import db from "@/utils/db";
import { validateEmail } from "@/utils/validation";
import User from "@/models/User";
import {createActivationToken} from '@/utils/tokens.js';
import{sendEmail} from '@/utils/sendEmail';

const handler = createRouter();

handler.post(async (req, res) => {
   try {
      await db.connectDB();
      const { email } = req.body;
      const user = await User.findOne({email});
      const url = `${process.env.BASE_URL}/activate/${activation_token}`
      sendEmail(email,url,"","Activate your account.");
      await db.disconnectDb();
      res.json({message:'Register success! Please activate your email to start.'})
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
   }
});

export default handler.handler();
