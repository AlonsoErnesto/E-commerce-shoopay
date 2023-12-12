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
      const { name, email, password } = req.body;
      if(!name || !email || !password) return res.status(400).json({message:"Please fill insert all fields."});
      if(!validateEmail(email)) return res.status(400).json({message:"Invalid email."});
      if(password.length < 6) return res.status(400).json({message:"Password must be atleast 6 characters."});
      const user = await User.findOne({email});
      if(user) return res.status(400).json({message:"This email alrady "})
      const passEncrypt = await bcrypt.hash(password,12);
      const newUser = new User({name, email, password:passEncrypt});
      const addedUser = await newUser.save();
      const activation_token = createActivationToken({
         id:addedUser._id.toString(),
      });
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
