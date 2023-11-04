import express from "express";
import bcrypt from "bcryptjs";
import { generateToken, getUserByEmail } from "../controllers/user.js";

const router = express.Router();

//Login
router.post("/", async (req, res) => {
  try {
    //Check User Exist or Not
    const user = await getUserByEmail(req);
    if (!user) {
      return res.status(400).json({
        error: "User Not Register, Signup to continue",
      });
    } else {
      //console.log("Login with", user);
    }
    //validating the password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(400).json({
        error: "Invalid authorization, Password not match",
      });
    }

    //Generate AuthToken and send response
    const authToken = generateToken(user._id);
    const userName = user.username;
    res.status(200).json({
      message: "User Logged In",
      authToken,
      userName,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server" });
  }
});

export const userLogin = router;
