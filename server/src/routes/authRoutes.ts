import { Router, Request, Response } from "express";
import { User } from "../entity/User";
import { compare, hash } from "bcryptjs";
import { getAccessToken } from "../utils/tokenStuff";
import { getRepository } from "typeorm";

const router = Router();

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = getRepository(User);
    const { email, password } = req.body;

    const gotUser = await user.findOne({ email: email });
    if (!gotUser) {
      throw new Error("User not found");
    }

    const correctPass = gotUser.password;
    if (!correctPass) {
      res.json({ done: false, err: "Something went wrong" });
      return;
    }
    const isValid = await compare(password, correctPass!);

    if (!isValid) {
      // Todo: correct this to incorrect input or something
      throw new Error("Incorrct password");
    } else {
      const token = getAccessToken(gotUser);
      res.status(200).json({
        done: true,
        accessToken: token,
      });
    }
  } catch (err) {
    console.log("my Error: " + err);
    res.json({
      done: false,
      error: err,
    });
  }
});

// Register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const user = getRepository(User);
    const {
      username,
      email,
      password,
      website_name,
      about,
      education,
      projects,
      info,
      linkedin_profile,
      github_profile,
      codechef_profile,
      codeforces_profile,
    } = req.body;
    if (!username || !email || !password) {
      res.json({ done: false, err: "Invalid Input" });
      return;
    }

    const existingUser = await user.findOne({ email: email });
    if (existingUser) {
      res.json({ done: false, err: "Email already exists" });
      return;
    }
    const hashedPassword = await hash(password, 12);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      website_name,
      about,
      education,
      projects,
      info,
      linkedin_profile,
      github_profile,
      codechef_profile,
      codeforces_profile,
    };

    user.save(newUser);
    res.status(200).json({ done: "true" });
  } catch (err) {
    console.log("my error: " + err);
    res.json({ done: false, error: err });
  }
});

// Reset Password
router.post("/reset", async (req: Request, res: Response) => {
  try {
    const user = getRepository(User);
    const { email, password, newPassword } = req.body;
    const myUser = await user.findOne({ email: email });
    if (!myUser) {
      throw new Error("No user found");
    }
    const correctPassword = myUser.password;
    const isValid = await compare(password, correctPassword!);
    if (isValid) {
      const newPasswordHash = await hash(newPassword, 12);
      myUser.password = newPasswordHash;
      await user.save(myUser);
      res.json({ done: true });
    } else {
      throw new Error("Incorrect Password");
    }
  } catch (err) {
    console.log("My Error: " + err);
    res.json({ done: false, err: err });
  }
});

// Logout
// Just delete token from local storage in the browser

// Get User
router.get("/get/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = getRepository(User);
    if (!id) {
      return res.status(404).json({ done: false, err: "UserId not found" });
    }
    const myUser = await user.findOne(id);
    if (!myUser) {
      return res.status(404).json({ done: false, err: "User not found" });
    }

    return res.json({ done: true, data: user });
  } catch (err) {
    console.log("My error: " + err);
    return res.json({ done: false, err: "Something went wrong" });
  }
});

// TEST ROUTES BELOW NOT FOR PRODUCTION

// Test route to get all users
router.get("/test", async (_, res: Response) => {
  try {
    const user = getRepository(User);
    const allUsers = await user.find();
    res.json({ data: allUsers });
  } catch (err) {
    console.log(err);
    res.json({ done: false, err: err });
  }
});
// Delete user
router.delete("/test/:id", async (req: Request, res: Response) => {
  try {
    const user = getRepository(User);
    const id = req.params.id;
    const data = await user.delete(id);
    res.json({ data });
  } catch (err) {
    console.log(err);
    res.json({ done: false, err: err });
  }
});

export default router;
