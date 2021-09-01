import { Router, Request, Response } from "express";
import { User } from "../entity/User";
import { compare, hash } from "bcryptjs";
import { getAccessToken } from "../utils/tokenStuff";
import { getRepository } from "typeorm";
import authValidation from "../middleware/authValidation";
import path from "path";
import { v4 as uuid } from "uuid";
import fs from "fs";

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
      // TODO: correct this to incorrect input or something
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

// returns true if JWT valid
router.get("/check", authValidation, (_req: Request, res: Response) => {
  return res.json({ done: true });
});

// Update
router.post("/update", authValidation, async (req: Request, res: Response) => {
  try {
    const user = getRepository(User);
    const {
      username,
      email,
      website_name,
      about,
      linkedin_profile,
      github_profile,
      codechef_profile,
      codeforces_profile,
    } = req.body;
    let { education, projects, info } = req.body;

    education = JSON.parse(education);
    projects = JSON.parse(projects);
    info = JSON.parse(info);

    const existingUser = await user.findOne({ email: email });
    if (!existingUser) {
      res.json({ done: false, err: "Invalid Email" });
      return;
    }
    const existingWebsite = await user.findOne({ website_name });
    if (existingWebsite && existingWebsite.id !== existingUser.id) {
      res.json({ done: false, err: "Website already exists" });
      return;
    }

    let profile_image: string | undefined;
    if (req.files && req.files.profile_image) {
      const location = path.join(process.cwd(), "images");
      // @ts-ignore
      const extension = req.files.profile_image.name.split(".").pop();
      const imageId = uuid();
      profile_image = `/images/${imageId}.${extension}`;
      fs.writeFile(
        path.join(location, imageId + "." + extension),
        // @ts-ignore
        req.files!.profile_image.data,
        (err) => {
          if (err) {
            console.log(err);
            res.json({ done: false, err: "Not able to upload image" });
            return;
          }
        }
      );
    }

    if (
      profile_image &&
      profile_image.length > 0 &&
      existingUser.profile_image &&
      existingUser.profile_image.length > 0
    ) {
      fs.unlink(path.join(process.cwd(), existingUser.profile_image), () => {
        console.log("deleted image");
      });
    }

    const newUser = {
      id: existingUser.id,
      username: username,
      password: existingUser.password,
      email: email,
      website_name: website_name,
      about: about,
      profile_image: profile_image ? profile_image : existingUser.profile_image,
      education: education,
      projects: projects,
      info: info,
      linkedin_profile: linkedin_profile,
      github_profile: github_profile,
      codechef_profile: codechef_profile,
      codeforces_profile: codeforces_profile,
    };

    user.save(newUser);
    res.status(200).json({ done: true });
  } catch (err) {
    console.log("my error: " + err);
    res.json({ done: false, error: err });
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
      linkedin_profile,
      github_profile,
      codechef_profile,
      codeforces_profile,
    } = req.body;

    let { education, projects, info } = req.body;

    education = JSON.parse(education);
    projects = JSON.parse(projects);
    info = JSON.parse(info);

    if (!username || !email || !password) {
      res.json({ done: false, err: "Invalid Input" });
      return;
    }

    const existingEmail = await user.findOne({ email: email });
    if (existingEmail) {
      res.json({ done: false, err: "Email already exists" });
      return;
    }
    const existingWebsite = await user.findOne({ website_name });
    if (existingWebsite) {
      res.json({ done: false, err: "Website already exists" });
      return;
    }
    const hashedPassword = await hash(password, 12);

    let profile_image: string | undefined;
    if (req.files && req.files.profile_image) {
      const location = path.join(process.cwd(), "images");
      // @ts-ignore
      const extension = req.files.profile_image.name.split(".").pop();
      const imageId = uuid();
      profile_image = `/images/${imageId}.${extension}`;
      fs.writeFile(
        path.join(location, imageId + "." + extension),
        // @ts-ignore
        req.files!.profile_image.data,
        (err) => {
          if (err) {
            console.log(err);
            res.json({ done: false, err: "Not able to upload image" });
            return;
          }
        }
      );
    }

    const newUser = {
      username,
      email,
      password: hashedPassword,
      website_name,
      about,
      profile_image,
      education,
      info,
      projects,
      linkedin_profile,
      github_profile,
      codechef_profile,
      codeforces_profile,
    };

    await user.save(newUser);
    res.status(200).json({ done: "true" });
  } catch (err) {
    console.log("my error: " + err);
    res.json({ done: false, error: "Something went wrong" });
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
