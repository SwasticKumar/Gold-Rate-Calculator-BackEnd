import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken, getUserByEmail } from "../controllers/user.js";
import { User} from "../models/user.js";

const router = express.Router();

//Signup
router.post("/", async (req, res) => {
  try {
    //Check user already exist
    let user = await getUserByEmail(req);
    if (user) {
      return res.status(400).json({ error: "User Already Exist!" });
    }
    //Generate Hashed Password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();
        
    //Generate AuthToken and send response
    const authToken = generateToken(user._id);
    res.status(201).json({
      message: "User Registered Successfully",
      authToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

export const userSignup = router;
