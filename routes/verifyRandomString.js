import express from "express";
import { getUserByRS } from "../controllers/user.js";

const router = express.Router();

router.get("/:randomString", async (req, res) => {
  try {
    const user = await getUserByRS(req);
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid Link or Link Expired" });
    }

    // If the random string is valid, you can update the user's status to mark it as verified if needed.

    res.status(200).json({ message: "Random String Verified" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
    console.error(error);
  }
});

export const verifyRandomString = router;
